# Monthly vehicle log (owner's own use, not part of the website)

Copy of the SA Health Motor Vehicle Log Sheet (A4 landscape). Not served by GitHub Pages (folder starts with a dot).
Each month the owner pastes the month's rows in chat; Claude saves them to a scratch text file and runs

    node .claude/vehicle-log/make.js rows.txt --serial <next serial> --out <scratchpad>

then sends the PDF with the file tool. Handwriting look (blue pen) by default; `--typed` for typed text.

Owner's rules (12 Nov 2026): one line per day with travel, days with no travel (annual leave, blank) left out;
start and end date the same, no times; purpose always TR/BM; all km business; destination "<place> return".
Rego S366BQH, health unit SAAS, work location LEP (edit SETTINGS in make.js if they change).
Codes: tb Tumby Bay, cu Cummins, pt Port Neill, cf Coffin Bay, pl Port Lincoln, vb Venus Bay, el Elliston,
wy Whyalla, lep LEP, ceduna Ceduna, cleve Cleve, lock Lock, arno Arno Bay, wudinna Wudinna, "<code> area" = "<place> area", "x2" = "<place> return x2", ret = home from the previous day's place, "ret from cu" = "Cummins to home". Ask the owner about any new code.

Serial numbers run on from the last sheet: July 2026 (16 to 31 July) used 1234001 and 1234002, August 1234003 and 1234004, September 1234005 to 1234007, October 1234008 to 1234010, so the next sheet is 1234011.
Update this line after each month.

## Travel Diary (from November 2026)

The owner says each day's trip on a private page: https://claude.ai/artifact/GnuNYP3ebCTaPAVh6Tcy3T (only the owner can
open it). Trips are in its database, collection `trips`, one document per day (id `YYYY-MM-DD`; fields date, startOdo,
endOdo, km, codes = the same codes as above, where, said). `meta/start` holds the odometer the first trip starts from
(70165, end of October 2026). At month end: `ArtifactData` list `trips` with that url, keep the month's rows, write one
line per trip in the spreadsheet format (`Monday, 2 November 2026<TAB>start<TAB>end<TAB>km<TAB>codes`), run make.js,
check the odometer chain (each start = the previous end) and ask about any gap or unknown place before sending.

Odometer photos (12 Nov 2026): the diary has a photo button. Claude (the page's sample capability) reads the odometer;
the photo's time and GPS (exifr) name the nearest town (list in the page). A photo near Port Lincoln (home base, within
8 km) is the closing reading; elsewhere it names the destination. Each trip saved with photos keeps a `photos` list
(kind away/home, time, lat, lon, town, odo) as an evidence log; the owner keeps the original photos in their iPhone Photos.
