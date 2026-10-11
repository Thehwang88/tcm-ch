// Built-output and mocked form checks. Does not substitute for browser/visual QA.
import {readFileSync, readdirSync, existsSync} from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const read=p=>readFileSync(p,'utf8');
const walk=d=>readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const pages=walk('dist/en').filter(p=>p.endsWith('.html'));
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"');
const local=p=>path.join('dist',decodeURIComponent(p),p.endsWith('/')?'index.html':'');
const failures=[];
let schemas=0;
for(const file of pages){
 const html=read(file);
 if(html.includes('[verify citation]')) failures.push(`${file}: unresolved citation`);
 if(!html.includes('class="en-premium"')) failures.push(`${file}: missing premium layout`);
 const url='https://tcm.ch/'+file.slice(5).replace(/index\.html$/,'');
 const canonical=/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/.exec(html)?.[1];
 if(!file.endsWith('/404.html') && canonical!==url) failures.push(`${file}: canonical ${canonical} != ${url}`);
 for(const s of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)){try{JSON.parse(s[1]);schemas++;}catch{failures.push(`${file}: invalid JSON-LD`);}}
 for(const image of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
  if(image[1].startsWith('/') && !existsSync(local(new URL(decode(image[1]),url).pathname))) failures.push(`${file}: missing image ${image[1]}`);
 }
 const de=/<link[^>]*hreflang="de-CH"[^>]*href="([^"]+)"/.exec(html)?.[1];
 if(de){const other=local(new URL(de).pathname);if(!existsSync(other)||!read(other).includes(`hreflang="en" href="${canonical}"`))failures.push(`${file}: nonreciprocal DE alternate ${de}`);}
 // Parse anchors only: no scripts, templates or navigation action strings.
 for(const a of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)){
  const href=decode(a[1]);if(!href.startsWith('/') && !href.startsWith('#'))continue;
  const u=new URL(href,url);const target=local(u.pathname);
  if(!existsSync(target)){failures.push(`${file}: missing link ${href}`);continue;}
  if(u.hash && target.endsWith('.html') && !read(target).includes(`id="${decodeURIComponent(u.hash.slice(1))}"`))failures.push(`${file}: missing anchor ${href}`);
 }
}
// Exercise the actual inline form handler in an isolated VM; all network is mocked.
const html=read('dist/en/contact/index.html');
const code=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes("getElementById('en-contact-form')"));
assert(code,'contact script present');
const optionHtml=/<select[^>]*id="c-loc"[\s\S]*?<\/select>/.exec(html)[0];
const optionValues=[...optionHtml.matchAll(/<option[^>]*value="([^"]*)"/g)].map(m=>decode(m[1]));
function setup({pre='',token='test-token',honeypot='',valid=true,result='success',topic='',concern='',messageValue=''}={}){
 let handler, calls=[],resets=0;const classes=new Set();
 const message={value:messageValue};
 const select={options:optionValues.map(value=>({value})),selectedIndex:0};
 const status={hidden:true,setAttribute(k,v){this[k]=v;}};
 const label={textContent:'Send request',dataset:{}};const button={disabled:false};
 const form={classList:{contains:c=>classes.has(c),add:c=>classes.add(c),remove:c=>classes.delete(c)},reportValidity:()=>valid,
  elements:{namedItem:()=>({value:' Test Patient '})},email:{value:'test@example.invalid'},telefon:{value:'+41000000000'},standort:{get value(){return select.options[select.selectedIndex].value}},anliegen:message,
  reset:()=>{resets++;},addEventListener:(event,fn)=>handler=fn,
  querySelector:s=>({'button[type=submit]':button,'.form-status':status,'.btn-label':label,'[name="website"]':{value:honeypot},'[name="cf-turnstile-response"]':{value:token}}[s])};
 const win={dataLayer:[],turnstile:{reset(){}}};
 const ctx={URLSearchParams,location:{search:'?standort='+encodeURIComponent(pre)+'&therapie='+encodeURIComponent(topic)+'&beschwerde='+encodeURIComponent(concern)},document:{getElementById:id=>id==='c-loc'?select:id==='c-msg'?message:form},window:win,
 fetch:async(url,init)=>{calls.push({url,payload:JSON.parse(init.body)});if(result==='network')throw Error('network');return {ok:result==='success',json:async()=>result==='success'?{ok:true}:{error:'Try again'}};}};
 vm.runInNewContext(code,ctx);
 return {select,message,status,button,win,calls,submit:()=>handler({preventDefault(){},target:form}),get resets(){return resets}};
}
for(const pre of optionValues.filter(Boolean)){const t=setup({pre});assert.equal(t.select.options[t.select.selectedIndex].value,pre,`prefill ${pre}`);}
const planned=optionValues.filter(x=>x.startsWith('Zürich Oerlikon – '));
assert.equal(planned.length,2);let t=setup({pre:'Zürich Oerlikon'});assert.equal(t.select.options[t.select.selectedIndex].value,planned.at(-1));
for(const config of [{token:''},{honeypot:'spam'},{valid:false}]){t=setup(config);await t.submit();assert.equal(t.calls.length,0);assert.equal(t.win.dataLayer.length,0);}
for(const result of ['success','error','network']){
 t=setup({result,pre:planned[0]});await t.submit();assert.equal(t.calls.length,1);assert.equal(t.calls[0].url,'/api/anfrage');assert.equal(t.calls[0].payload.standort,planned[0]);assert.equal(t.calls[0].payload.name,'Test Patient');assert.equal(t.button.disabled,false);assert.equal(t.status['data-state'],result==='success'?'success':'error');assert.equal(t.win.dataLayer.length,result==='success'?1:0);assert.equal(t.resets,result==='success'?1:0);
}
t=setup({topic:'Acupuncture',concern:'Back Pain'});await t.submit();assert.equal(t.calls[0].payload.anliegen,'Treatment interest: Acupuncture\nMain concern: Back Pain');
t=setup({topic:'Acupuncture',messageValue:'My own question'});assert.equal(t.message.value,'My own question','never replace an existing message');
t=setup({topic:'<img src=x onerror=alert(1)>'});assert.ok(t.message.value.includes('<img'),'URL context is assigned as text, not HTML');
t=setup();await Promise.all([t.submit(),t.submit()]);assert.equal(t.calls.length,1,'double submit blocked');
console.log(JSON.stringify({pages:pages.length,jsonLdBlocks:schemas,form:'PASS: all prefill options, validation, token, honeypot, success/error/network, duplicate submission',failures:[...new Set(failures)]},null,2));
if(failures.length)process.exitCode=1;
