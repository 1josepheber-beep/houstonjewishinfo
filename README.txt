HOUSTON JEWISH INFO — SITE PACKAGE
====================================
Files in this ZIP and where to upload each one:

  home.html        → rename to index.html  → upload to /  (main home page)
  jobs.html        → upload to /jobs/       (or use at jobs.houstonjewishinfo.com)
  real-estate.html → upload to /classifieds/ (rename to index.html in that folder)
  contact.html     → upload to /contact/    (rename to index.html in that folder)

PAGES NOT INCLUDED (already on your server — just update the nav):
  mazaltov, events, business, synagogues, schools, charities

NAV UPDATE FOR OTHER PAGES
---------------------------
In every other HTML file, find your <nav> block and:

1. DELETE this line:
   <a href="/classifieds">Classifieds</a>

2. ADD these two lines AFTER the Business Directory link:
   <a href="https://jobs.houstonjewishinfo.com" target="_blank">Jobs</a>
   <a href="/classifieds">Real Estate</a>

3. UPDATE nav CSS (find and change):
   font-size: 11px   → font-size: 10.5px
   padding: 9px 16px → padding: 9px 10px
   letter-spacing: .08em → letter-spacing: .05em

REAL ESTATE GOOGLE SHEETS SETUP
---------------------------------
The real-estate.html page looks for a tab called "RealEstate" in your
existing Google Sheet (same ID as jobs). Create a tab with these columns:

  type | title | address | price | bedrooms | bathrooms | sqft | amenities | description | phone | email

Set "Real Estate" as the active tab name in Google Sheets.

REAL ESTATE $15 PAYMENT LINKS
--------------------------------
In real-estate.html, search for "YOURPAYPALHANDLE", "YOURVENMOHANDLE"
and replace with your actual PayPal.me / Venmo links.

Also update: info@houstonjewishinfo.com → your actual email address.

CNAME / JOBS SUBDOMAIN
------------------------
Upload CNAME.txt (containing: jobs.houstonjewishinfo.com) to the root
of the GitHub Pages repo hosting jobs.html.
