# Monthly vehicle log (owner's own use, not part of the website)

Copy of the SA Health Motor Vehicle Log Sheet (A4 landscape). Not served by GitHub Pages (folder starts with a dot).
Each month the owner pastes the month's rows in chat; Claude saves them to a scratch text file and runs

    node .claude/vehicle-log/make.js rows.txt --serial <next serial> --out <scratchpad>

then sends the PDF with the file tool. Handwriting look (blue pen) by default; `--typed` for typed text.

Owner's rules (12 Nov 2026): one line per day with travel, days with no travel (annual leave, blank) left out;
start and end date the same, no times; purpose always TR/BM; all km business; destination "<place> return".
Rego S366BQH, health unit SAAS, work location LEP (edit SETTINGS in make.js if they change).
Codes: tb Tumby Bay, cu Cummins, pt Port Neill, cf Coffin Bay, pl Port Lincoln, vb Venus Bay, el Elliston,
wy Whyalla, lep LEP, ret = home from the previous day's place. Ask the owner about any new code.

Serial numbers run on from the last sheet: August 2026 used 1234002 and 1234003, so the next sheet is 1234004.
Update this line after each month.
