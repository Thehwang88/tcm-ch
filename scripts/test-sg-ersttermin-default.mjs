// Mocked browser smoke: SG booking defaults to Ersttermin but explicit free
// check-in deep links and manual changes remain possible. No API submissions.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const dist = path.resolve('dist');
const mime = { '.html':'text/html', '.js':'application/javascript',
  '.css':'text/css', '.webp':'image/webp', '.svg':'image/svg+xml', '.png':'image/png' };
const server = http.createServer((req,res)=>{
  let route = decodeURIComponent(req.url.split('?')[0]);
  if(route.endsWith('/')) route += 'index.html';
  const filename = path.join(dist,route);
  if(!filename.startsWith(dist+path.sep) || !fs.existsSync(filename) || fs.statSync(filename).isDirectory()){
    res.writeHead(404);return res.end('not found');
  }
  res.writeHead(200,{'content-type':mime[path.extname(filename)]||'application/octet-stream'});
  fs.createReadStream(filename).pipe(res);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
let browser;
try {
  browser=await puppeteer.launch({executablePath:process.env.CHROMIUM||puppeteer.executablePath(),args:['--no-sandbox','--no-proxy-server']});
  const scenarios=[
    ['/standorte/st-gallen/','behandlung','Default SG ad landing'],
    ['/standorte/st-gallen/?terminart=behandlung','behandlung','Explicit Ersttermin'],
    ['/standorte/st-gallen/?terminart=checkin','checkin','Explicit free check-in'],
    ['/standorte/st-gallen/?first30=1','checkin','Legacy free check-in link'],
  ];
  for(const [url,expected,label] of scenarios){
    const page=await browser.newPage();
    await page.setViewport({width:1280,height:900});
    await page.setRequestInterception(true);
    page.on('request',r=>r.url().startsWith(origin)?r.continue():r.abort());
    await page.goto(origin+url,{waitUntil:'load',timeout:25000});
    await page.waitForSelector('[data-kf-instance="sg-hero"][data-kf-friendly-ready="1"]',{timeout:15000});
    const got=await page.$eval('[data-kf-instance="sg-hero"]',el=>({
      radio:el.querySelector('input[name="terminart"]:checked')?.value,
      select:el.querySelector('[data-kf-friendly-service]')?.value,
      freeEnabled:!!el.querySelector('input[name="terminart"][value="checkin"]:not([disabled])'),
      location:el.getAttribute('data-kf-standort-id'),
    }));
    if(got.radio!==expected||got.select!==expected||!got.freeEnabled||got.location!=='st-gallen')
      throw new Error(label+': got '+JSON.stringify(got)+', expected '+expected);
    if(label==='Default SG ad landing'){
      // Patient can freely switch from the paid appointment to the free intro.
      await page.select('[data-kf-instance="sg-hero"] [data-kf-friendly-service]','checkin');
      const changed=await page.$eval('[data-kf-instance="sg-hero"]',el=>({
        radio:el.querySelector('input[name="terminart"]:checked')?.value,
        select:el.querySelector('[data-kf-friendly-service]')?.value,
      }));
      if(changed.radio!=='checkin'||changed.select!=='checkin')
        throw new Error('Free check-in manual selection broken: '+JSON.stringify(changed));
    }
    await page.close();
    console.log('OK: '+label+' → '+expected);
  }
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
