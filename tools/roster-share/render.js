const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1080}});
for(let i=1;i<=7;i++){await p.goto('file://'+path.resolve(__dirname,'index.html')+'?s='+i);await p.waitForTimeout(300);await p.screenshot({path:process.argv[2]+`/slide-${i}.png`});}
await b.close()})();
