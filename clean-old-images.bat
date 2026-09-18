@echo off
setlocal enabledelayedexpansion
title HJI - clean up old images

REM ============================================================
REM  HJI - remove the image files that WebP versions replaced
REM ============================================================
REM  Put this file in your repository folder (the one with
REM  index.html in it) and double-click it.
REM
REM  It will not delete anything unless the .webp replacement is
REM  actually sitting there next to it. Anything without one is
REM  reported and left alone.
REM
REM  It also moves images\HJI_logos_FINAL to your Desktop rather
REM  than deleting it - that folder is your logo source artwork,
REM  and nothing on the site uses it.
REM ============================================================

if not exist "images" (
  echo.
  echo  This does not look like your repository folder.
  echo  There is no "images" folder here.
  echo.
  echo  Move this file into the folder that contains index.html
  echo  and run it again.
  echo.
  pause
  exit /b 1
)

set /a removed=0
set /a kept=0

echo.
echo  Removing originals that have a .webp replacement...
echo.

if exist "images\realestate\10835-1.webp" (
  if exist "images\realestate\10835-1.jpg" ( del /q "images\realestate\10835-1.jpg" & set /a removed+=1 )
) else (
  if exist "images\realestate\10835-1.jpg" ( echo   KEPT - no webp for: images\realestate\10835-1.jpg & set /a kept+=1 )
)
if exist "images\education\Collel1.webp" (
  if exist "images\education\Collel1.jpg" ( del /q "images\education\Collel1.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\Collel1.jpg" ( echo   KEPT - no webp for: images\education\Collel1.jpg & set /a kept+=1 )
)
if exist "images\education\Collel2.webp" (
  if exist "images\education\Collel2.jpg" ( del /q "images\education\Collel2.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\Collel2.jpg" ( echo   KEPT - no webp for: images\education\Collel2.jpg & set /a kept+=1 )
)
if exist "images\education\Collel3.webp" (
  if exist "images\education\Collel3.jpg" ( del /q "images\education\Collel3.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\Collel3.jpg" ( echo   KEPT - no webp for: images\education\Collel3.jpg & set /a kept+=1 )
)
if exist "images\education\Collel4.webp" (
  if exist "images\education\Collel4.jpg" ( del /q "images\education\Collel4.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\Collel4.jpg" ( echo   KEPT - no webp for: images\education\Collel4.jpg & set /a kept+=1 )
)
if exist "images\education\Collel5.webp" (
  if exist "images\education\Collel5.jpg" ( del /q "images\education\Collel5.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\Collel5.jpg" ( echo   KEPT - no webp for: images\education\Collel5.jpg & set /a kept+=1 )
)
if exist "images\education\Kollel of Houston Banner.webp" (
  if exist "images\education\Kollel of Houston Banner.jpg" ( del /q "images\education\Kollel of Houston Banner.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\Kollel of Houston Banner.jpg" ( echo   KEPT - no webp for: images\education\Kollel of Houston Banner.jpg & set /a kept+=1 )
)
if exist "images\education\MHLV Camp.webp" (
  if exist "images\education\MHLV Camp.png" ( del /q "images\education\MHLV Camp.png" & set /a removed+=1 )
) else (
  if exist "images\education\MHLV Camp.png" ( echo   KEPT - no webp for: images\education\MHLV Camp.png & set /a kept+=1 )
)
if exist "images\education\Mesivta of Houston.webp" (
  if exist "images\education\Mesivta of Houston.jpg" ( del /q "images\education\Mesivta of Houston.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\Mesivta of Houston.jpg" ( echo   KEPT - no webp for: images\education\Mesivta of Houston.jpg & set /a kept+=1 )
)
if exist "images\education\Ohr Zahava School Banner.webp" (
  if exist "images\education\Ohr Zahava School Banner.jpg" ( del /q "images\education\Ohr Zahava School Banner.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\Ohr Zahava School Banner.jpg" ( echo   KEPT - no webp for: images\education\Ohr Zahava School Banner.jpg & set /a kept+=1 )
)
if exist "images\education\TDS School Banner.webp" (
  if exist "images\education\TDS School Banner.jpg" ( del /q "images\education\TDS School Banner.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\TDS School Banner.jpg" ( echo   KEPT - no webp for: images\education\TDS School Banner.jpg & set /a kept+=1 )
)
if exist "images\education\Torah Girls Academy Banner.webp" (
  if exist "images\education\Torah Girls Academy Banner.png" ( del /q "images\education\Torah Girls Academy Banner.png" & set /a removed+=1 )
) else (
  if exist "images\education\Torah Girls Academy Banner.png" ( echo   KEPT - no webp for: images\education\Torah Girls Academy Banner.png & set /a kept+=1 )
)
if exist "images\education\YTE School Banner.webp" (
  if exist "images\education\YTE School Banner.jpg" ( del /q "images\education\YTE School Banner.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\YTE School Banner.jpg" ( echo   KEPT - no webp for: images\education\YTE School Banner.jpg & set /a kept+=1 )
)
if exist "images\education\camp ruach.webp" (
  if exist "images\education\camp ruach.jpg" ( del /q "images\education\camp ruach.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\camp ruach.jpg" ( echo   KEPT - no webp for: images\education\camp ruach.jpg & set /a kept+=1 )
)
if exist "images\education\robert-m-beren-academy.webp" (
  if exist "images\education\robert-m-beren-academy.jpg" ( del /q "images\education\robert-m-beren-academy.jpg" & set /a removed+=1 )
) else (
  if exist "images\education\robert-m-beren-academy.jpg" ( echo   KEPT - no webp for: images\education\robert-m-beren-academy.jpg & set /a kept+=1 )
)
if exist "images\stories\114225.webp" (
  if exist "images\stories\114225.png" ( del /q "images\stories\114225.png" & set /a removed+=1 )
) else (
  if exist "images\stories\114225.png" ( echo   KEPT - no webp for: images\stories\114225.png & set /a kept+=1 )
)
if exist "images\stories\115417.webp" (
  if exist "images\stories\115417.png" ( del /q "images\stories\115417.png" & set /a removed+=1 )
) else (
  if exist "images\stories\115417.png" ( echo   KEPT - no webp for: images\stories\115417.png & set /a kept+=1 )
)
if exist "images\stories\132114.webp" (
  if exist "images\stories\132114.jpg" ( del /q "images\stories\132114.jpg" & set /a removed+=1 )
) else (
  if exist "images\stories\132114.jpg" ( echo   KEPT - no webp for: images\stories\132114.jpg & set /a kept+=1 )
)
if exist "images\stories\9days.webp" (
  if exist "images\stories\9days.png" ( del /q "images\stories\9days.png" & set /a removed+=1 )
) else (
  if exist "images\stories\9days.png" ( echo   KEPT - no webp for: images\stories\9days.png & set /a kept+=1 )
)
if exist "images\stories\Mesivta-HPD.webp" (
  if exist "images\stories\Mesivta-HPD.jpg" ( del /q "images\stories\Mesivta-HPD.jpg" & set /a removed+=1 )
) else (
  if exist "images\stories\Mesivta-HPD.jpg" ( echo   KEPT - no webp for: images\stories\Mesivta-HPD.jpg & set /a kept+=1 )
)
if exist "images\stories\Mikvah Reopening.webp" (
  if exist "images\stories\Mikvah Reopening.jpeg" ( del /q "images\stories\Mikvah Reopening.jpeg" & set /a removed+=1 )
) else (
  if exist "images\stories\Mikvah Reopening.jpeg" ( echo   KEPT - no webp for: images\stories\Mikvah Reopening.jpeg & set /a kept+=1 )
)
if exist "images\stories\Mikvah-CLC.webp" (
  if exist "images\stories\Mikvah-CLC.png" ( del /q "images\stories\Mikvah-CLC.png" & set /a removed+=1 )
) else (
  if exist "images\stories\Mikvah-CLC.png" ( echo   KEPT - no webp for: images\stories\Mikvah-CLC.png & set /a kept+=1 )
)
if exist "images\stories\School Uniform.webp" (
  if exist "images\stories\School Uniform.jpeg" ( del /q "images\stories\School Uniform.jpeg" & set /a removed+=1 )
) else (
  if exist "images\stories\School Uniform.jpeg" ( echo   KEPT - no webp for: images\stories\School Uniform.jpeg & set /a kept+=1 )
)
if exist "images\stories\TDS-fundraiser-2026.webp" (
  if exist "images\stories\TDS-fundraiser-2026.jpeg" ( del /q "images\stories\TDS-fundraiser-2026.jpeg" & set /a removed+=1 )
) else (
  if exist "images\stories\TDS-fundraiser-2026.jpeg" ( echo   KEPT - no webp for: images\stories\TDS-fundraiser-2026.jpeg & set /a kept+=1 )
)
if exist "images\stories\bertha.webp" (
  if exist "images\stories\bertha.png" ( del /q "images\stories\bertha.png" & set /a removed+=1 )
) else (
  if exist "images\stories\bertha.png" ( echo   KEPT - no webp for: images\stories\bertha.png & set /a kept+=1 )
)
if exist "images\stories\cgi-houston-2026-1.webp" (
  if exist "images\stories\cgi-houston-2026-1.jpeg" ( del /q "images\stories\cgi-houston-2026-1.jpeg" & set /a removed+=1 )
) else (
  if exist "images\stories\cgi-houston-2026-1.jpeg" ( echo   KEPT - no webp for: images\stories\cgi-houston-2026-1.jpeg & set /a kept+=1 )
)
if exist "images\stories\cgi-houston-2026-2-2.webp" (
  if exist "images\stories\cgi-houston-2026-2-2.png" ( del /q "images\stories\cgi-houston-2026-2-2.png" & set /a removed+=1 )
) else (
  if exist "images\stories\cgi-houston-2026-2-2.png" ( echo   KEPT - no webp for: images\stories\cgi-houston-2026-2-2.png & set /a kept+=1 )
)
if exist "images\stories\hatzalathon.webp" (
  if exist "images\stories\hatzalathon.png" ( del /q "images\stories\hatzalathon.png" & set /a removed+=1 )
) else (
  if exist "images\stories\hatzalathon.png" ( echo   KEPT - no webp for: images\stories\hatzalathon.png & set /a kept+=1 )
)
if exist "images\stories\https-houstonjewishinfo.com-images-stories-bertha.png.webp" (
  if exist "images\stories\https-houstonjewishinfo.com-images-stories-bertha.png.png" ( del /q "images\stories\https-houstonjewishinfo.com-images-stories-bertha.png.png" & set /a removed+=1 )
) else (
  if exist "images\stories\https-houstonjewishinfo.com-images-stories-bertha.png.png" ( echo   KEPT - no webp for: images\stories\https-houstonjewishinfo.com-images-stories-bertha.png.png & set /a kept+=1 )
)
if exist "images\stories\meat-prices-rise.webp" (
  if exist "images\stories\meat-prices-rise.png" ( del /q "images\stories\meat-prices-rise.png" & set /a removed+=1 )
) else (
  if exist "images\stories\meat-prices-rise.png" ( echo   KEPT - no webp for: images\stories\meat-prices-rise.png & set /a kept+=1 )
)
if exist "images\stories\shaitel.webp" (
  if exist "images\stories\shaitel.png" ( del /q "images\stories\shaitel.png" & set /a removed+=1 )
) else (
  if exist "images\stories\shaitel.png" ( echo   KEPT - no webp for: images\stories\shaitel.png & set /a kept+=1 )
)
if exist "images\stories\shautel7_27.webp" (
  if exist "images\stories\shautel7_27.png" ( del /q "images\stories\shautel7_27.png" & set /a removed+=1 )
) else (
  if exist "images\stories\shautel7_27.png" ( echo   KEPT - no webp for: images\stories\shautel7_27.png & set /a kept+=1 )
)
if exist "images\stories\tishabeav.webp" (
  if exist "images\stories\tishabeav.png" ( del /q "images\stories\tishabeav.png" & set /a removed+=1 )
) else (
  if exist "images\stories\tishabeav.png" ( echo   KEPT - no webp for: images\stories\tishabeav.png & set /a kept+=1 )
)
if exist "images\hechsher\HKA.webp" (
  if exist "images\hechsher\HKA.png" ( del /q "images\hechsher\HKA.png" & set /a removed+=1 )
) else (
  if exist "images\hechsher\HKA.png" ( echo   KEPT - no webp for: images\hechsher\HKA.png & set /a kept+=1 )
)
if exist "images\hechsher\MKT.webp" (
  if exist "images\hechsher\MKT.png" ( del /q "images\hechsher\MKT.png" & set /a removed+=1 )
) else (
  if exist "images\hechsher\MKT.png" ( echo   KEPT - no webp for: images\hechsher\MKT.png & set /a kept+=1 )
)
if exist "images\hechsher\mikvaorg.webp" (
  if exist "images\hechsher\mikvaorg.png" ( del /q "images\hechsher\mikvaorg.png" & set /a removed+=1 )
) else (
  if exist "images\hechsher\mikvaorg.png" ( echo   KEPT - no webp for: images\hechsher\mikvaorg.png & set /a kept+=1 )
)
if exist "images\synagogues\Aishel-House.webp" (
  if exist "images\synagogues\Aishel-House.jpg" ( del /q "images\synagogues\Aishel-House.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\Aishel-House.jpg" ( echo   KEPT - no webp for: images\synagogues\Aishel-House.jpg & set /a kept+=1 )
)
if exist "images\synagogues\Chabad of Sugarland.webp" (
  if exist "images\synagogues\Chabad of Sugarland.jpg" ( del /q "images\synagogues\Chabad of Sugarland.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\Chabad of Sugarland.jpg" ( echo   KEPT - no webp for: images\synagogues\Chabad of Sugarland.jpg & set /a kept+=1 )
)
if exist "images\synagogues\Chabad-of-West Houston.webp" (
  if exist "images\synagogues\Chabad-of-West Houston.jpg" ( del /q "images\synagogues\Chabad-of-West Houston.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\Chabad-of-West Houston.jpg" ( echo   KEPT - no webp for: images\synagogues\Chabad-of-West Houston.jpg & set /a kept+=1 )
)
if exist "images\synagogues\Congregation-Beth-Rambam.webp" (
  if exist "images\synagogues\Congregation-Beth-Rambam.jpg" ( del /q "images\synagogues\Congregation-Beth-Rambam.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\Congregation-Beth-Rambam.jpg" ( echo   KEPT - no webp for: images\synagogues\Congregation-Beth-Rambam.jpg & set /a kept+=1 )
)
if exist "images\synagogues\Heimish of Houston.webp" (
  if exist "images\synagogues\Heimish of Houston.jpg" ( del /q "images\synagogues\Heimish of Houston.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\Heimish of Houston.jpg" ( echo   KEPT - no webp for: images\synagogues\Heimish of Houston.jpg & set /a kept+=1 )
)
if exist "images\synagogues\Meyerland-Minyon.webp" (
  if exist "images\synagogues\Meyerland-Minyon.jpg" ( del /q "images\synagogues\Meyerland-Minyon.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\Meyerland-Minyon.jpg" ( echo   KEPT - no webp for: images\synagogues\Meyerland-Minyon.jpg & set /a kept+=1 )
)
if exist "images\synagogues\Torah-Vachesed.webp" (
  if exist "images\synagogues\Torah-Vachesed.jpg" ( del /q "images\synagogues\Torah-Vachesed.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\Torah-Vachesed.jpg" ( echo   KEPT - no webp for: images\synagogues\Torah-Vachesed.jpg & set /a kept+=1 )
)
if exist "images\synagogues\United Orthodox Synagogues.webp" (
  if exist "images\synagogues\United Orthodox Synagogues.jpg" ( del /q "images\synagogues\United Orthodox Synagogues.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\United Orthodox Synagogues.jpg" ( echo   KEPT - no webp for: images\synagogues\United Orthodox Synagogues.jpg & set /a kept+=1 )
)
if exist "images\synagogues\Young-Israel-of-Houston.webp" (
  if exist "images\synagogues\Young-Israel-of-Houston.jpg" ( del /q "images\synagogues\Young-Israel-of-Houston.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\Young-Israel-of-Houston.jpg" ( echo   KEPT - no webp for: images\synagogues\Young-Israel-of-Houston.jpg & set /a kept+=1 )
)
if exist "images\synagogues\chabad-lubavitch-center.webp" (
  if exist "images\synagogues\chabad-lubavitch-center.png" ( del /q "images\synagogues\chabad-lubavitch-center.png" & set /a removed+=1 )
) else (
  if exist "images\synagogues\chabad-lubavitch-center.png" ( echo   KEPT - no webp for: images\synagogues\chabad-lubavitch-center.png & set /a kept+=1 )
)
if exist "images\synagogues\chabad-uptown.webp" (
  if exist "images\synagogues\chabad-uptown.jpg" ( del /q "images\synagogues\chabad-uptown.jpg" & set /a removed+=1 )
) else (
  if exist "images\synagogues\chabad-uptown.jpg" ( echo   KEPT - no webp for: images\synagogues\chabad-uptown.jpg & set /a kept+=1 )
)
if exist "images\charities\Aishel-House.webp" (
  if exist "images\charities\Aishel-House.png" ( del /q "images\charities\Aishel-House.png" & set /a removed+=1 )
) else (
  if exist "images\charities\Aishel-House.png" ( echo   KEPT - no webp for: images\charities\Aishel-House.png & set /a kept+=1 )
)
if exist "images\charities\Chabad of Texas.webp" (
  if exist "images\charities\Chabad of Texas.png" ( del /q "images\charities\Chabad of Texas.png" & set /a removed+=1 )
) else (
  if exist "images\charities\Chabad of Texas.png" ( echo   KEPT - no webp for: images\charities\Chabad of Texas.png & set /a kept+=1 )
)
if exist "images\charities\TORCH.webp" (
  if exist "images\charities\TORCH.png" ( del /q "images\charities\TORCH.png" & set /a removed+=1 )
) else (
  if exist "images\charities\TORCH.png" ( echo   KEPT - no webp for: images\charities\TORCH.png & set /a kept+=1 )
)
if exist "images\charities\beren-academy.webp" (
  if exist "images\charities\beren-academy.png" ( del /q "images\charities\beren-academy.png" & set /a removed+=1 )
) else (
  if exist "images\charities\beren-academy.png" ( echo   KEPT - no webp for: images\charities\beren-academy.png & set /a kept+=1 )
)
if exist "images\charities\emery-weiner.webp" (
  if exist "images\charities\emery-weiner.png" ( del /q "images\charities\emery-weiner.png" & set /a removed+=1 )
) else (
  if exist "images\charities\emery-weiner.png" ( echo   KEPT - no webp for: images\charities\emery-weiner.png & set /a kept+=1 )
)
if exist "images\charities\houston-chaverim.webp" (
  if exist "images\charities\houston-chaverim.png" ( del /q "images\charities\houston-chaverim.png" & set /a removed+=1 )
) else (
  if exist "images\charities\houston-chaverim.png" ( echo   KEPT - no webp for: images\charities\houston-chaverim.png & set /a kept+=1 )
)
if exist "images\charities\houston-hatzalah.webp" (
  if exist "images\charities\houston-hatzalah.png" ( del /q "images\charities\houston-hatzalah.png" & set /a removed+=1 )
) else (
  if exist "images\charities\houston-hatzalah.png" ( echo   KEPT - no webp for: images\charities\houston-hatzalah.png & set /a kept+=1 )
)
if exist "images\charities\levechadhouston.webp" (
  if exist "images\charities\levechadhouston.png" ( del /q "images\charities\levechadhouston.png" & set /a removed+=1 )
) else (
  if exist "images\charities\levechadhouston.png" ( echo   KEPT - no webp for: images\charities\levechadhouston.png & set /a kept+=1 )
)
if exist "images\charities\torah-day-school.webp" (
  if exist "images\charities\torah-day-school.png" ( del /q "images\charities\torah-day-school.png" & set /a removed+=1 )
) else (
  if exist "images\charities\torah-day-school.png" ( echo   KEPT - no webp for: images\charities\torah-day-school.png & set /a kept+=1 )
)
if exist "images\cards\Hatzalah Card Sample 2.webp" (
  if exist "images\cards\Hatzalah Card Sample 2.jpeg" ( del /q "images\cards\Hatzalah Card Sample 2.jpeg" & set /a removed+=1 )
) else (
  if exist "images\cards\Hatzalah Card Sample 2.jpeg" ( echo   KEPT - no webp for: images\cards\Hatzalah Card Sample 2.jpeg & set /a kept+=1 )
)
if exist "images\cards\hatzalah-card-example-old.webp" (
  if exist "images\cards\hatzalah-card-example-old.jpg" ( del /q "images\cards\hatzalah-card-example-old.jpg" & set /a removed+=1 )
) else (
  if exist "images\cards\hatzalah-card-example-old.jpg" ( echo   KEPT - no webp for: images\cards\hatzalah-card-example-old.jpg & set /a kept+=1 )
)
if exist "images\cards\lieberman-mohel-premium.webp" (
  if exist "images\cards\lieberman-mohel-premium.jpg" ( del /q "images\cards\lieberman-mohel-premium.jpg" & set /a removed+=1 )
) else (
  if exist "images\cards\lieberman-mohel-premium.jpg" ( echo   KEPT - no webp for: images\cards\lieberman-mohel-premium.jpg & set /a kept+=1 )
)
if exist "images\passings\Rodney Palte.webp" (
  if exist "images\passings\Rodney Palte.jpeg" ( del /q "images\passings\Rodney Palte.jpeg" & set /a removed+=1 )
) else (
  if exist "images\passings\Rodney Palte.jpeg" ( echo   KEPT - no webp for: images\passings\Rodney Palte.jpeg & set /a kept+=1 )
)
if exist "images\events\Chabad Ed Campus1.webp" (
  if exist "images\events\Chabad Ed Campus1.jpeg" ( del /q "images\events\Chabad Ed Campus1.jpeg" & set /a removed+=1 )
) else (
  if exist "images\events\Chabad Ed Campus1.jpeg" ( echo   KEPT - no webp for: images\events\Chabad Ed Campus1.jpeg & set /a kept+=1 )
)
if exist "images\events\Gimmel Tamuz Mens.webp" (
  if exist "images\events\Gimmel Tamuz Mens.jpeg" ( del /q "images\events\Gimmel Tamuz Mens.jpeg" & set /a removed+=1 )
) else (
  if exist "images\events\Gimmel Tamuz Mens.jpeg" ( echo   KEPT - no webp for: images\events\Gimmel Tamuz Mens.jpeg & set /a kept+=1 )
)
if exist "images\events\Gimmel Tamuz Womens.webp" (
  if exist "images\events\Gimmel Tamuz Womens.jpeg" ( del /q "images\events\Gimmel Tamuz Womens.jpeg" & set /a removed+=1 )
) else (
  if exist "images\events\Gimmel Tamuz Womens.jpeg" ( echo   KEPT - no webp for: images\events\Gimmel Tamuz Womens.jpeg & set /a kept+=1 )
)
if exist "images\events\JBC.webp" (
  if exist "images\events\JBC.jpeg" ( del /q "images\events\JBC.jpeg" & set /a removed+=1 )
) else (
  if exist "images\events\JBC.jpeg" ( echo   KEPT - no webp for: images\events\JBC.jpeg & set /a kept+=1 )
)
if exist "images\events\Mikvah-CLC.webp" (
  if exist "images\events\Mikvah-CLC.png" ( del /q "images\events\Mikvah-CLC.png" & set /a removed+=1 )
) else (
  if exist "images\events\Mikvah-CLC.png" ( echo   KEPT - no webp for: images\events\Mikvah-CLC.png & set /a kept+=1 )
)
if exist "images\events\TDS-fundraiser-2026.webp" (
  if exist "images\events\TDS-fundraiser-2026.jpeg" ( del /q "images\events\TDS-fundraiser-2026.jpeg" & set /a removed+=1 )
) else (
  if exist "images\events\TDS-fundraiser-2026.jpeg" ( echo   KEPT - no webp for: images\events\TDS-fundraiser-2026.jpeg & set /a kept+=1 )
)
if exist "images\events\boneiolam.webp" (
  if exist "images\events\boneiolam.jpg" ( del /q "images\events\boneiolam.jpg" & set /a removed+=1 )
) else (
  if exist "images\events\boneiolam.jpg" ( echo   KEPT - no webp for: images\events\boneiolam.jpg & set /a kept+=1 )
)
if exist "images\events\business-101.webp" (
  if exist "images\events\business-101.jpg" ( del /q "images\events\business-101.jpg" & set /a removed+=1 )
) else (
  if exist "images\events\business-101.jpg" ( echo   KEPT - no webp for: images\events\business-101.jpg & set /a kept+=1 )
)
if exist "images\events\chabad-ed-campus2-2.webp" (
  if exist "images\events\chabad-ed-campus2-2.jpeg" ( del /q "images\events\chabad-ed-campus2-2.jpeg" & set /a removed+=1 )
) else (
  if exist "images\events\chabad-ed-campus2-2.jpeg" ( echo   KEPT - no webp for: images\events\chabad-ed-campus2-2.jpeg & set /a kept+=1 )
)
if exist "images\events\giborah.webp" (
  if exist "images\events\giborah.jpg" ( del /q "images\events\giborah.jpg" & set /a removed+=1 )
) else (
  if exist "images\events\giborah.jpg" ( echo   KEPT - no webp for: images\events\giborah.jpg & set /a kept+=1 )
)
if exist "images\events\mhlv-dance-2026.webp" (
  if exist "images\events\mhlv-dance-2026.jpg" ( del /q "images\events\mhlv-dance-2026.jpg" & set /a removed+=1 )
) else (
  if exist "images\events\mhlv-dance-2026.jpg" ( echo   KEPT - no webp for: images\events\mhlv-dance-2026.jpg & set /a kept+=1 )
)
if exist "images\events\workshop-6.webp" (
  if exist "images\events\workshop-6.jpg" ( del /q "images\events\workshop-6.jpg" & set /a removed+=1 )
) else (
  if exist "images\events\workshop-6.jpg" ( echo   KEPT - no webp for: images\events\workshop-6.jpg & set /a kept+=1 )
)
if exist "images\site\fav-icon.webp" (
  if exist "images\site\fav-icon.png" ( del /q "images\site\fav-icon.png" & set /a removed+=1 )
) else (
  if exist "images\site\fav-icon.png" ( echo   KEPT - no webp for: images\site\fav-icon.png & set /a kept+=1 )
)
if exist "images\ads\111832.webp" (
  if exist "images\ads\111832.jpg" ( del /q "images\ads\111832.jpg" & set /a removed+=1 )
) else (
  if exist "images\ads\111832.jpg" ( echo   KEPT - no webp for: images\ads\111832.jpg & set /a kept+=1 )
)
if exist "images\ads\111897.webp" (
  if exist "images\ads\111897.png" ( del /q "images\ads\111897.png" & set /a removed+=1 )
) else (
  if exist "images\ads\111897.png" ( echo   KEPT - no webp for: images\ads\111897.png & set /a kept+=1 )
)
if exist "images\ads\zbiltong-square.webp" (
  if exist "images\ads\zbiltong-square.jpg" ( del /q "images\ads\zbiltong-square.jpg" & set /a removed+=1 )
) else (
  if exist "images\ads\zbiltong-square.jpg" ( echo   KEPT - no webp for: images\ads\zbiltong-square.jpg & set /a kept+=1 )
)
if exist "images\ads\zbiltong-wide.webp" (
  if exist "images\ads\zbiltong-wide.jpg" ( del /q "images\ads\zbiltong-wide.jpg" & set /a removed+=1 )
) else (
  if exist "images\ads\zbiltong-wide.jpg" ( echo   KEPT - no webp for: images\ads\zbiltong-wide.jpg & set /a kept+=1 )
)

echo.
if exist "images\HJI_logos_FINAL" (
  echo  Moving your logo source artwork to the Desktop...
  move "images\HJI_logos_FINAL" "%USERPROFILE%\Desktop\HJI_logos_FINAL" >nul
  if exist "%USERPROFILE%\Desktop\HJI_logos_FINAL" (
    echo  Saved to your Desktop as HJI_logos_FINAL
  ) else (
    echo  Could not move it - it has been left where it was.
  )
)

echo.
echo  ============================================
echo   Deleted:  !removed! old image files
echo   Kept:     !kept! (no webp replacement found)
echo  ============================================
echo.
echo  Now open GitHub Desktop. You will see the deletions
echo  listed. Commit them and push.
echo.
pause