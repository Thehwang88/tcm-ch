// Real Chromium regression: the second team card must be visibly peeking in,
// not merely present in an overflowed DOM. No patient form submissions.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

const dist=path.resolve('dist');
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
const server=http.createServer((req,res)=>{
  let route=decodeURIComponent(req.url.split('?')[0]);
  if(route.endsWith('/')) route+='index.html';
  const file=path.join(dist,route);
  if(!file.startsWith(dist+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){
    res.writeHead(404);return res.end('not found');
  }
  res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
let browser;
try{
  browser=await puppeteer.launch({executablePath:process.env.CHROMIUM||puppeteer.executablePath(),args:['--no-sandbox','--no-proxy-server']});
  for(const [route,width] of [['st-gallen',320],['st-gallen',375],['frauenfeld',390],['kreuzlingen',375]]){
    const page=await browser.newPage();
    await page.setViewport({width,height:850,isMobile:true,hasTouch:true,deviceScaleFactor:1});
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    await page.setRequestInterception(true);
    page.on('request',r=>r.url().startsWith(origin)?r.continue():r.abort());
    await page.goto(origin+'/standorte/'+route+'/',{waitUntil:'load',timeout:25000});
    await page.waitForFunction(()=>document.querySelector('.tc-team-section')?.dataset.teamCarouselReady==='1',{timeout:15000});
    const layout=await page.evaluate(()=>{
      const sec=document.querySelector('.tc-team-section');
      const track=sec.querySelector('.tc-team-track');
      const slides=track.querySelectorAll('.tc-team-slide');
      const r0=slides[0].getBoundingClientRect(),r1=slides[1].getBoundingClientRect();
      const visible=Math.max(0,Math.min(r1.right,innerWidth)-Math.max(r1.left,0));
      // Check actual paint visibility, not merely geometric position.
      const atX=Math.min(innerWidth-8,Math.max(8,r1.left+Math.min(23,visible/2)));
      const hit=document.elementFromPoint(atX,Math.min(innerHeight-10,Math.max(10,r1.top+35)));
      return {
        width:innerWidth,trackWidth:track.getBoundingClientRect().width,
        cardWidth:r0.width,firstLeft:r0.left,secondLeft:r1.left,
        visible,hitSecond:!!hit?.closest('.tc-team-slide')&&hit.closest('.tc-team-slide')===slides[1],
        total:slides.length,
        progress:!!sec.querySelector('.tc-team-progress[aria-valuenow="1"]'),
        nextButtonVisible:getComputedStyle(sec.querySelector('.tc-team-next')).display!=='none',
        animation:getComputedStyle(slides[0]).animationName,
      };
    });
    assert.equal(layout.total,16,route+' entire team roster must remain');
    assert.ok(layout.trackWidth>=width-3,route+' '+width+': track does not use full viewport '+JSON.stringify(layout));
    assert.ok(layout.cardWidth<=width-94,route+' '+width+': card too large to reveal next '+JSON.stringify(layout));
    assert.ok(layout.visible>=54,route+' '+width+': next card is not visibly peeking '+JSON.stringify(layout));
    assert.ok(layout.hitSecond,route+' '+width+': next card is clipped/covered '+JSON.stringify(layout));
    assert.ok(layout.progress&&layout.nextButtonVisible,route+' '+width+': controls invisible '+JSON.stringify(layout));
    assert.equal(layout.animation,'none',route+' motion reduction ignored');
    await page.click('.tc-team-next');
    await page.waitForFunction(()=>document.querySelector('.tc-team-current')?.textContent==='02',{timeout:5000});
    const moved=await page.evaluate(()=>{
      const sec=document.querySelector('.tc-team-section');
      return {scroll:sec.querySelector('.tc-team-track').scrollLeft,progress:sec.querySelector('.tc-team-progress').getAttribute('aria-valuenow')};
    });
    assert.ok(moved.scroll>50 && moved.progress==='2',route+' '+width+' next control/progress broken '+JSON.stringify(moved));
    console.log('OK: '+route+' '+width+'px, '+Math.round(layout.visible)+'px actual next-card peek + manual next/progress');
    await page.close();
  }
  const page=await browser.newPage();
  await page.setViewport({width:1440,height:900});
  await page.setRequestInterception(true);
  page.on('request',r=>r.url().startsWith(origin)?r.continue():r.abort());
  await page.goto(origin+'/standorte/st-gallen/',{waitUntil:'load',timeout:25000});
  await page.waitForFunction(()=>document.querySelector('.tc-team-section')?.dataset.teamCarouselReady==='1',{timeout:15000});
  const desktop=await page.evaluate(()=>{
    const sec=document.querySelector('.tc-team-section');
    return {prev:getComputedStyle(sec.querySelector('.tc-team-prev')).display,
      next:getComputedStyle(sec.querySelector('.tc-team-next')).display,
      track:sec.querySelector('.tc-team-track').getBoundingClientRect().width,
      slide:sec.querySelector('.tc-team-slide').getBoundingClientRect().width};
  });
  assert.ok(desktop.prev!=='none'&&desktop.next!=='none'&&desktop.slide*3<desktop.track,'desktop controls/visible cards changed');
  await page.close();
  console.log('Location-team swipe: viewport card peek, manual navigation, progress, reduced-motion and desktop controls OK');
}finally{
  if(browser) await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
