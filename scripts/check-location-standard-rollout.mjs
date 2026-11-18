// Single shared SG-standard page and full 16-profile team on all clinic routes.
// Validates rendered HTML without submitting forms, booking or any analytics event.
import assert from 'node:assert/strict';
import {readdirSync,readFileSync,statSync} from 'node:fs';
import {join} from 'node:path';

const base='dist/standorte';
const rosterSource=readFileSync('src/data/therapeuten.ts','utf8');
const slugs=[...rosterSource.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map(m=>m[1]);
assert(slugs.length >= 12 && new Set(slugs).size===slugs.length,'Public therapist registry invalid');
const dirs=readdirSync(base).filter(x=>statSync(join(base,x)).isDirectory());
const skipped = new Set();
const clinicPages=dirs.map(slug=>({slug,path:join(base,slug,'index.html')}))
  .filter(x=>!skipped.has(x.slug)).map(x=>({slug:x.slug,html:readFileSync(x.path,'utf8')}));
assert(clinicPages.length>=8,'Unexpectedly few clinic routes');
const errors=[];
const check=(okay,slug,reason)=>{if(!okay)errors.push(slug+': '+reason)};
for(const {slug,html} of clinicPages){
  const start=html.indexOf('<section class="section tc-team-section"');
  const end=html.indexOf('</section>',start);
  check(start>=0&&end>start,slug,'full team section missing');
  if(start<0||end<0)continue;
  const section=html.slice(start,end+10);
  const teamSlugs=[...section.matchAll(/href="\/team\/([^/"]+)\//g)].map(m=>m[1]);
  check(teamSlugs.length===slugs.length,slug,'team roster size '+teamSlugs.length+' != '+slugs.length);
  check(teamSlugs.every((v,i)=>v===slugs[i]),slug,'team order not identical to the original full-team list');
  check(!section.includes('data-local-therapist')&&!section.includes('data-network-therapist'),slug,'local/network sorting or labels remain');
  check(!section.includes('An diesem Standort')&&!section.includes('tc-team-marker'),slug,'staff grouping labels remain');
  check(section.includes('tc-team-track')&&section.includes('tc-team-swipe'),slug,'mobile swipe track missing');
  check((html.match(/class="section tc-team-section"/g)||[]).length===1,slug,'duplicate full team blocks');
  if(slug!=='st-gallen' && slug!=='kreuzlingen' && slug!=='bottighofen'){
    check(html.includes('std-sg-layout'),slug,'new SG-standard location-first layout missing');
    check(html.includes('sgt-fact-icon'),slug,'clinic facts should have unboxed blue icons');
    check(html.includes('class="sg-cro-grid"'),slug,'compact therapies / symptoms missing');
    check(html.includes('href="/location-sg-standard.css"'),slug,'shared SG layout CSS missing');
    check(html.includes('id="termin-formular"'),slug,'booking anchor not preserved');
  }
}
const css=readFileSync('public/location-team-carousel.css','utf8');
assert(css.includes('scroll-snap-type:x mandatory')&&css.includes('@media(max-width:767px)'), 'Native mobile swiping missing');
assert(css.includes('.tc-team-prev')&&css.includes('.tc-team-next'), 'Desktop carousel navigation missing');
if(errors.length)throw new Error('Location rollout errors:\n'+errors.join('\n'));
console.log('Location rollout: '+clinicPages.length+' clinic pages, '+slugs.length+' same-order therapist profiles, mobile swipe and shared SG layout verified');
