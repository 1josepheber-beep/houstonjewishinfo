/* Houston Jewish Info — shared inline search engine.
   Lazily fetches the same Google Sheet tabs as /search/ and exposes:
     HJISearch.load()        -> Promise (idempotent) that loads + indexes listings
     HJISearch.ready         -> boolean (true once loaded)
     HJISearch.suggest(q,n)  -> [{title,label,sectionName,href,ext}] ranked matches
   Keep this in sync with /search/ if listing keywords/tabs change. */
(function(){
  var SHEET_ID='1in7Ac7zknqyR9neWKOCAjOAG4jXCIVTJQfU6jJ72CV8';
  var TODAY=new Date(); TODAY.setHours(0,0,0,0);
  var MAZAL_CUTOFF=new Date(TODAY.getTime()-14*86400000);

  function norm(s){ return String(s==null?'':s).toLowerCase(); }
  function extURL(u){ u=String(u||'').trim(); if(!u) return ''; if(/^(https?:\/\/|mailto:|tel:|\/)/i.test(u)) return u; return 'https://'+u; }

  function cellStr(c){ if(!c) return ''; return c.f!=null? String(c.f) : (c.v==null?'':String(c.v)); }
  function parseDate(c){
    if(!c) return null;
    var v=c.v,f=c.f;
    if(typeof v==='string'&&/^Date\(/.test(v)){ var n=v.match(/\d+/g); if(n) return new Date(+n[0],+n[1],+(n[2]||1)); }
    if(Object.prototype.toString.call(v)==='[object Date]') return v;
    if(typeof f==='string'){ var t=Date.parse(f); if(!isNaN(t)) return new Date(t); }
    if(typeof v==='string'){ var t2=Date.parse(v); if(!isNaN(t2)) return new Date(t2); }
    return null;
  }
  function tabURL(tab){ return 'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?tqx=out:json&headers=1&sheet='+encodeURIComponent(tab); }
  function getTab(tab){
    return fetch(tabURL(tab)).then(function(r){ return r.text(); }).then(function(text){
      var json=JSON.parse(text.substring(47,text.length-2));
      var cols=json.table.cols.map(function(c){ return (c.label||'').toLowerCase().trim(); });
      return (json.table.rows||[]).map(function(row){
        var o={_cells:{}};
        cols.forEach(function(col,i){ if(!col) return; var c=row.c?row.c[i]:null; o[col]=cellStr(c); o._cells[col]=c; });
        return o;
      });
    }).catch(function(){ return []; });
  }
  function active(o){ return norm(o.status).trim()==='active'; }
  function pick(o,names){ for(var i=0;i<names.length;i++){ var v=o[names[i]]; if(v!=null&&String(v).trim()!=='') return String(v).trim(); } return ''; }
  function joinPick(o,names,max){ var out=[]; for(var i=0;i<names.length&&out.length<max;i++){ var v=o[names[i]]; if(v!=null&&String(v).trim()!=='') out.push(String(v).trim()); } return out.join(' \u00b7 '); }
  function firstShort(o){ for(var k in o){ if(k==='_cells'||k==='status'||k==='approved')continue; var v=o[k]; if(typeof v==='string'){ v=v.trim(); if(v&&v.length<=60) return v; } } return ''; }
  function fieldsText(o){ var s=[]; for(var k in o){ if(k==='_cells')continue; var v=o[k]; if(typeof v==='string'&&v) s.push(v); } return norm(s.join(' ')); }

  function mk(type,label,title,date,sub,body,link){
    return {type:type,label:label,title:title,date:date||null,sub:sub||'',body:body||'',link:link||'',section:'',badge:'',searchText:norm([title,sub,body,label].join(' '))};
  }
  function feedItem(kind,row){
    var d=parseDate(row._cells.date);
    if(kind==='news'){ if(!active(row)||!row.headline)return null; return mk('news','News',row.headline,d,row.byline||row.label||'',row.excerpt||'',row.linkurl||''); }
    if(kind==='event'){ if(!active(row)||!row.title)return null; var it=mk('event','Event',row.title,d,row.location||row.presenter||'',row.description||'',row.ticketurl||''); if(d&&d<TODAY) it.badge='Past event'; return it; }
    if(kind==='mazal'){ if(!active(row)||!row.name)return null; var m=mk('mazal',row.type||'Mazal Tov',row.name,d,row.city||'',row.message||'',''); if(d&&d<MAZAL_CUTOFF) m.badge='Archived'; return m; }
    if(kind==='passing'){ if(!active(row)||!row.name)return null; var p=[]; if(row.levaya)p.push('Levaya: '+row.levaya); if(row.shiva)p.push('Shiva: '+row.shiva); if(row.message)p.push(row.message); return mk('passing','In Memoriam',row.name,d,row.city||'',p.join(' \u00b7 '),''); }
    return null;
  }
  function dirItem(cfg,row){
    if(cfg.filter==='approved'){ if(norm(row.approved).trim()!=='yes') return null; }
    else if('status' in row){ if(norm(row.status).trim()!=='active') return null; }
    var title=pick(row,['name','title','business','businessname','company','organization','school','shul','headline']) || firstShort(row);
    if(!title) return null;
    var sub=joinPick(row,['category','city','neighborhood','area','address','location'],2);
    var body=pick(row,['description','about','details','summary','services','message','excerpt','notes','bio']);
    var it=mk('dir',cfg.label,title,null,sub,body,'');
    it.section=cfg.link;
    it.searchText=fieldsText(row)+(cfg.kw?(' '+cfg.kw):'');
    return it;
  }

  var CONFIGS=[
    {tab:'Stories',kind:'news'},{tab:'Events',kind:'event'},{tab:'MazalTov',kind:'mazal'},{tab:'Passings',kind:'passing'},
    {tab:'Education',kind:'dir',label:'School',link:'/education',kw:'school schools yeshiva education adult learning kollel'},
    {tab:'Shuls',kind:'dir',label:'Shul',link:'/shuls',kw:'shul shuls synagogue minyan davening congregation'},
    {tab:'Mikvahs',kind:'dir',label:'Mikvah',link:'/mikvahs',kw:'mikvah mikvahs mikveh'},
    {tab:'Jobs',kind:'dir',label:'Job',link:'/jobs',filter:'approved',kw:'job jobs hiring employment position career'},
    {tab:'Services',kind:'dir',label:'Service',link:'/services',kw:'service services business directory'},
    {tab:'KosherRestaurants',kind:'dir',label:'Kosher Restaurant',link:'/services',kw:'kosher restaurant restaurants dining eatery cafe food eat'},
    {tab:'KosherMarkets',kind:'dir',label:'Kosher Market',link:'/services',kw:'kosher market markets grocery groceries supermarket store shop food'},
    {tab:'BooksGifts',kind:'dir',label:'Books & Gifts',link:'/services',kw:'books gifts judaica seforim sefarim giftware'},
    {tab:'Catering',kind:'dir',label:'Catering',link:'/services',kw:'catering caterer food'},
    {tab:'CommunityOrgs',kind:'dir',label:'Community Org',link:'/services',kw:'community organization org nonprofit'},
    {tab:'Security',kind:'dir',label:'Security',link:'/services',kw:'security alarm camera'},
    {tab:'Marketing',kind:'dir',label:'Marketing',link:'/services',kw:'marketing advertising branding'},
    {tab:'Trades',kind:'dir',label:'Trades',link:'/services',kw:'trades contractor handyman plumber electrician hvac'},
    {tab:'Charities',kind:'dir',label:'Charity',link:'/charities',kw:'charity charities tzedakah donation chesed nonprofit'},
    {tab:'Gemachim',kind:'dir',label:'Gemach',link:'/charities',kw:'gemach gemachim'},
    {tab:'RealEstate',kind:'dir',label:'Real Estate',link:'/real-estate',kw:'real estate realtor apartment rental home house property mortgage'},
    {tab:'Activities',kind:'dir',label:'Things to Do',link:'/things-to-do',kw:'things to do activities attraction family outing fun'}
  ];
  var FEED_KINDS={news:1,event:1,mazal:1,passing:1};

  var PAGES=[
    {t:'Houston Eruv Map',lab:'Resource',link:'/shuls',kw:'eruv eiruv eruv map boundary'},
    {t:'Shuls & Synagogues',lab:'Section',link:'/shuls',kw:'shul shuls synagogue synagogues minyan minyanim minyon davening daven congregation temple orthodox'},
    {t:'Mikvahs',lab:'Section',link:'/mikvahs',kw:'mikvah mikvahs mikvaot mikveh mikva'},
    {t:'Schools & Education',lab:'Section',link:'/education',kw:'school schools education yeshiva yeshivas preschool day school orthodox'},
    {t:'Adult Learning',lab:'Section',link:'/education#adult-learning',kw:'adult learning kollel shiur shiurim classes torah learning'},
    {t:'Jobs Board',lab:'Section',link:'/jobs',kw:'job jobs hiring employment work position positions career careers'},
    {t:'Charities & Gemachim',lab:'Section',link:'/charities',kw:'charity charities gemach gemachim tzedakah donate donation chesed nonprofit'},
    {t:'Kosher Food & Restaurants',lab:'Section',link:'/services',kw:'kosher restaurant restaurants food dining eat eatery cafe takeout catering bakery'},
    {t:'Kosher Supermarkets & Groceries',lab:'Section',link:'/services',kw:'supermarket supermarkets grocery groceries market markets store stores shop shops shopping kosher market'},
    {t:'Real Estate',lab:'Section',link:'/real-estate',kw:'real estate realtor realty apartment rent rental house home homes property mortgage'},
    {t:'Things to Do',lab:'Section',link:'/things-to-do',kw:'things to do activities attraction attractions family outing fun'},
    {t:'Community Services Directory',lab:'Section',link:'/services',kw:'services business businesses directory plumber electrician attorney lawyer doctor contractor dentist'},
    {t:'Contact / Submit a Listing',lab:'Section',link:'/contact',kw:'contact submit advertise advertising sponsor add listing'}
  ];
  function pageItem(p){ var it=mk('page',p.lab,p.t,null,'','',''); it.section=p.link; it.searchText=norm(p.t+' '+p.kw); return it; }

  var SECTION_NAMES={'/services':'Services','/shuls':'Shuls','/mikvahs':'Mikvahs','/education':'Education','/jobs':'Jobs','/charities':'Charities','/real-estate':'Real Estate','/things-to-do':'Things to Do','/contact':'Contact','/':'Home'};

  var SYN_GROUPS=[
    ['supermarket','supermarkets','grocery','groceries','market','markets','store','stores','shop','shops','shopping'],
    ['restaurant','restaurants','dining','eatery','eateries','cafe','cafes','diner','takeout','eats'],
    ['shul','shuls','synagogue','synagogues','minyan','minyanim','minyon','davening','congregation','temple'],
    ['mikvah','mikvahs','mikvaot','mikveh','mikva'],
    ['school','schools','yeshiva','yeshivas','preschool','academy'],
    ['doctor','doctors','physician','physicians','pediatrician','dentist','dentists'],
    ['lawyer','lawyers','attorney','attorneys','legal'],
    ['realtor','realtors','realty','apartment','apartments','rental','rentals','condo','mortgage'],
    ['job','jobs','hiring','employment','position','positions','career','careers','vacancy'],
    ['charity','charities','tzedakah','donation','donations','nonprofit','chesed'],
    ['gemach','gemachim','gemachs'],
    ['catering','caterer','caterers'],
    ['bakery','bakeries','baker','challah'],
    ['plumber','plumbing','electrician','handyman','contractor','contractors','hvac'],
    ['cleaning','cleaner','cleaners','housekeeping','maid'],
    ['security','alarm','camera','cameras'],
    ['marketing','advertising','branding'],
    ['judaica','seforim','sefarim','gifts','giftware'],
    ['eruv','eiruv'],
    ['dairy','milchig','milchik','milchigs','chalavi'],
    ['meat','meaty','fleishig','fleishik','fleishigs','basari','glatt'],
    ['pareve','parve','pareveh','parev']
  ];
  var SYN={}; SYN_GROUPS.forEach(function(g){ g.forEach(function(w){ SYN[w]=g; }); });
  var _re={};
  function wordRe(w){ return _re[w] || (_re[w]=new RegExp('(^|[^a-z0-9])'+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'([^a-z0-9]|$)')); }
  function termMatch(text,term){
    if(text.indexOf(term)>-1) return true;
    var g=SYN[term]; if(!g) return false;
    for(var i=0;i<g.length;i++){ if(g[i]!==term && wordRe(g[i]).test(text)) return true; }
    return false;
  }
  function hit(terms,text){ for(var i=0;i<terms.length;i++){ if(!termMatch(text,terms[i])) return false; } return true; }
  function relScore(x,q){ var t=norm(x.title); if(t===q)return 4; if(t.indexOf(q)===0)return 3; if(t.indexOf(q)>-1)return 2; return 1; }
  function sectionHref(x){ return (x.type==='dir') ? (x.section+'?find='+encodeURIComponent(x.title)) : x.section; }
  function destFor(x){
    var u=extURL(x.link);
    if(u) return {href:u, ext:true};
    if(x.section) return {href:sectionHref(x), ext:false};
    return null;
  }

  var ALL=[], _loaded=false, _loading=null;
  function build(){
    return Promise.all(CONFIGS.map(function(cfg){
      return getTab(cfg.tab).then(function(rows){
        rows.forEach(function(row){
          var it=(cfg.kind in FEED_KINDS) ? feedItem(cfg.kind,row) : dirItem(cfg,row);
          if(it) ALL.push(it);
        });
      });
    })).then(function(){ PAGES.forEach(function(p){ ALL.push(pageItem(p)); }); _loaded=true; API.ready=true; });
  }
  function load(){ if(_loaded) return Promise.resolve(); if(!_loading) _loading=build(); return _loading; }

  function suggest(q, limit){
    limit=limit||8;
    q=norm(q).replace(/\s+/g,' ').trim();
    if(!q) return [];
    var terms=q.split(' ').filter(Boolean), out=[];
    for(var i=0;i<ALL.length;i++){ var x=ALL[i]; if(hit(terms,x.searchText)){ var d=destFor(x); if(d) out.push({x:x,d:d}); } }
    out.sort(function(a,b){
      var sa=relScore(a.x,q), sb=relScore(b.x,q); if(sb!==sa) return sb-sa;
      var la=a.x.title.length, lb=b.x.title.length; if(la!==lb) return la-lb;
      return a.x.title.localeCompare(b.x.title);
    });
    var seen={}, res=[];
    for(var j=0;j<out.length && res.length<limit;j++){
      var xx=out[j].x, dd=out[j].d, key=(dd.href+'|'+xx.title).toLowerCase();
      if(seen[key]) continue; seen[key]=1;
      var base=String(xx.section||'').split('#')[0].split('?')[0];
      res.push({title:xx.title, label:xx.label, sectionName:SECTION_NAMES[base]||'', href:dd.href, ext:!!dd.ext});
    }
    return res;
  }

  var API={ ready:false, load:load, suggest:suggest, items:function(){ return ALL; } };
  window.HJISearch=API;
})();
