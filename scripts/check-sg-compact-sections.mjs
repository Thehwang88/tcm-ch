// SG Ads/CRO presentation contract. Runs on built HTML, no patient form sends.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const sg = readFileSync('dist/standorte/st-gallen/index.html','utf8');
const other = readFileSync('dist/standorte/frauenfeld/index.html','utf8');
const therapiesAt = sg.indexOf('<section class="section sg-cro-section sg-cro-therapien"');
const symptomsAt = sg.indexOf('<section class="section sg-cro-section sg-cro-beschwerden"');
assert(therapiesAt > 0 && symptomsAt > therapiesAt, 'SG therapies then complaints order');
const therapy = sg.slice(therapiesAt,symptomsAt);
const symptom = sg.slice(symptomsAt,sg.indexOf('</section>',symptomsAt)+10);
assert((therapy.match(/class="sg-cro-card sg-cro-therapy-card"/g)||[]).length===4,'Exactly four key therapies visible');
assert((symptom.match(/class="sg-cro-card sg-cro-symptom-card"/g)||[]).length===4,'Exactly four symptom groups visible');
assert(therapy.includes('<details class="sg-cro-more" id="sg-more-therapien">'),'Native optional therapies disclosure');
assert(symptom.includes('<details class="sg-cro-more" id="sg-more-beschwerden">'),'Native optional complaints disclosure');
for(const slug of ['akupunktur','tuina','schroepfen','kraeutertherapie','gesichtsakupunktur','akupressur','shiatsu','gua-sha','physiotherapie','massage'])
  assert(therapy.includes('/therapien/'+slug+'/?standort=st-gallen'),'Missing original therapy link '+slug);
for(const slug of ['rueckenschmerzen','nackenschmerzen','migraene','schlafprobleme','stress-burnout','verdauungsprobleme','zyklusbeschwerden','kinderwunsch'])
  assert(symptom.includes('/beschwerden/'+slug+'/?standort=st-gallen'),'Missing original complaint link '+slug);
assert((therapy.match(/href="\/therapien\//g)||[]).length === 10,'Ten original therapy link targets preserved');
assert((symptom.match(/href="\/beschwerden\//g)||[]).length === 8,'Eight original complaint link targets preserved');
assert(!therapy.includes('svc-badge')&&!therapy.includes('svc-photo-wrap'), 'No repetitive treatment duration/insurance pills or photo gallery');
assert(!symptom.includes('svc-card')&&!symptom.includes('Mehr erfahren'), 'No eight-card outbound distraction grid');
assert(symptom.includes('href="#termin-formular"') && sg.includes('id="termin-formular"'),'Booking CTA must target the actual SG form');
assert(!symptom.includes('href="#kontakt"'),'Old removed #kontakt anchor must not be used');
assert(sg.includes('href="/sg-compact.css"'), 'SG-only compact CSS must load');
assert(!other.includes('href="/sg-compact.css"') && !other.includes('sg-cro-therapien'), 'Other clinic pages must remain unchanged');
const style=readFileSync('public/sg-compact.css','utf8');
assert(style.includes('@media(max-width:480px)')&&style.includes('.sg-cro-more summary:focus-visible'),'Mobile and keyboard treatment retained');
console.log('SG CRO: four key therapies, four symptom groups, 18 indexed detail links, direct booking and isolation confirmed');
