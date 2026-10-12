// Gate: TCM.ch FIRST 30 · Winter Gift Edition 2026 (St. Gallen). Nach `npm run build`: node scripts/check-first30.mjs
//  1. Kapazität: ohne verifizierte Zahl nur das Maximum; nie gefüllte Segmente, "x von 10 vergeben" oder Restbestand.
//  2. Claims: "Once-a-Year" nur nach Freigabe; Countdown nur mit bestätigtem Cutoff; kein Vorschau-Build in Produktion.
//  3. Formulare: Hero (phone-only) mit kanonischer ID, Tracking-Identifier unverändert; unteres Formular mit Wähler + ID.
//  4. Scope: FIRST-30-Markup nur auf /standorte/st-gallen/; WhatsApp-Deeplink korrekt (Nummer, Text, Kodierung).
//  5. API: Whitelist (FIRST 30 phone-only / regulär / Warteliste), unbekannte ID → 422, Telefonvalidierung, Klassifikation zuoberst.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { build } from 'esbuild';

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.error('  ✗ ' + m); } else console.log('  ✓ ' + m); };
const r = await build({ stdin: { contents: `export * from './src/data/first30'; export * from './src/data/campaign-cta';`, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent', define: { 'import.meta.env': '{}' } });
const m = await import('data:text/javascript;base64,' + Buffer.from(r.outputFiles[0].text).toString('base64'));
const { FIRST30 } = m; const st = m.first30State(); const cta = m.campaignCtaFor('st-gallen');
const sg = readFileSync('dist/standorte/st-gallen/index.html', 'utf8');
const text = (s) => s.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const vis = text(sg);

console.log('1. Kapazität');
const pv = JSON.parse(readFileSync('src/data/first30.preview.json', 'utf8'));
ok(pv.claims === null && pv.cutoff === false && !/data-first30-preview/.test(sg), 'kein Vorschau-Build (first30.preview.json: claims null, cutoff false) in dist');
ok(FIRST30.totalAllocation === 10, `Gesamtkapazität 10 (genehmigt); aktuell ${FIRST30.totalAllocation}`);
if (FIRST30.confirmedClaims == null) {
  ok(vis.includes(`Nur ${FIRST30.totalAllocation} exklusive Geschenke`) && /data-mode="unverified"/.test(sg) && vis.includes('Limitierte FIRST 30 Vorweihnachtsgeschenke'), 'nur Maximum kommuniziert; Indikator unverifiziert ("Limitierte FIRST 30 Vorweihnachtsgeschenke")');
  ok(!/f30-avail-bar/.test(sg) && !/\d+ \/ \d+ Geschenke vergeben/.test(vis) && !/Nur noch \d+ (Geschenke? verfügbar|verfügbar|übrig)/.test(vis) && !/%/.test(text(sg.slice(sg.indexOf('data-f30-avail'), sg.indexOf('</div>', sg.indexOf('data-f30-avail'))))), 'kein Balken, kein "x / 10 vergeben", kein Restbestand, kein Prozent');
} else {
  ok(new RegExp(`data-confirmed="${FIRST30.confirmedClaims}"`).test(sg) && vis.includes(st.indicator.head) && vis.includes(st.indicator.sub), `Indikator: "${st.indicator.head}" · "${st.indicator.sub}"`);
  ok(!!FIRST30.verifiedAt && !!FIRST30.verifiedBy, 'verifizierte Zahl trägt verifiedAt + verifiedBy');
}

console.log('2. Claims');
ok(/once-a-year/i.test(vis) === FIRST30.onceAYearApproved, `"Once-a-Year" nur nach Freigabe (approved=${FIRST30.onceAYearApproved})`);
ok(!/jährlich/i.test(vis) || FIRST30.onceAYearApproved, '"jährlich" nur nach Freigabe');
ok(/<span[^>]*data-f30-timer\b/.test(sg) === FIRST30.dailyCutoff.approved, `Countdown nur mit bestätigtem Cutoff (approved=${FIRST30.dailyCutoff.approved})`);
ok(FIRST30.dailyCutoff.approved || /Nur 10 exklusive Geschenke/.test(text(sg.slice(sg.indexOf('data-f30-wa'), sg.indexOf('</a>', sg.indexOf('data-f30-wa'))))), 'ohne Cutoff: Kapazitätsaussage im WhatsApp-Button');
ok(!/läuft ab|Angebot endet|nur heute/i.test(vis), 'kein Angebots-Ablauf-Wording');

console.log('3. Formulare');
const hero = sg.slice(sg.indexOf('data-sg-hero-form'), sg.indexOf('</form>', sg.indexOf('data-sg-hero-form')));
ok(/name="Hero-Gratis-30min-StGallen"/.test(sg) && /name="quelle" value="launch-hero-sg"/.test(hero) && /value="Hero St. Gallen Neueroeffnung"/.test(hero) && /value="\/standort\/st-gallen"/.test(hero), 'Hero-Form: name, quelle, Quelle, Seite unverändert');
ok((sg.match(/event: 'formular_senden'/g) ?? []).length === 1 && /first30_phone_form_submit/.test(sg), 'Hero-Script: genau ein formular_senden-Push + first30_phone_form_submit');
ok(new RegExp(`name="angebot_id" value="${st.gift.id}"`).test(hero) && /name="telefon"/.test(hero) && !/name="name"/.test(hero) && /name="website"/.test(hero), `Hero: phone-only, angebot_id=${st.gift.id}, Honeypot, kein Namensfeld`);
ok(/href="\/datenschutz\/"/.test(hero), 'Hero: Datenschutz-Link in der Einwilligung');
const bottom = sg.slice(sg.indexOf('data-f30-bottom'), sg.indexOf('</form>', sg.indexOf('data-contact-form')));
ok(/name="f30b_wahl" value="ERSTTERMIN_REGULAER_SG"[^>]*checked/.test(bottom) && new RegExp(`name="f30b_wahl" value="${st.gift.id}"`).test(bottom), `unterer Wähler: regulär (Standard) + ${st.gift.id}`);
ok(/name="angebot_id" value="ERSTTERMIN_REGULAER_SG"/.test(bottom) && /name="quelle" value="sg-kontakt-bottom"/.test(bottom) && /name="wunschzeit"/.test(bottom), 'unteres Formular: hidden angebot_id regulär, quelle sg-kontakt-bottom, Wunschzeit');
ok(sg.indexOf('data-f30-bottom') < sg.indexOf('class="inline-form-card"') && sg.indexOf('<fieldset class="f30b"') > sg.indexOf('id="kontakt"'), 'Wähler steht ÜBER der Formularkarte innerhalb #kontakt');
ok(/id="online-buchen"/.test(sg) && /onedoc\.ch\/de\/widget/.test(sg), 'OneDoc-Widget (reguläre Buchung) vorhanden');
ok((sg.match(/data-offer="first30"/g) ?? []).length >= 4 && /data-offer="regular"/.test(sg), 'FIRST-30-CTAs (Leaf, Desktop-Pill) und regulärer CTA mit data-offer');

console.log('4. Scope + WhatsApp');
const pages = []; const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); } }; walk('dist');
const leaks = pages.filter((p) => p !== 'dist/standorte/st-gallen/index.html' && /FIRST30_WINTER_2026_SG|data-sg-hero-form|f30-float|data-f30-bottom/.test(readFileSync(p, 'utf8')));
ok(leaks.length === 0, `FIRST-30-Markup nur auf St. Gallen (${leaks.length} andere Seiten${leaks.length ? ': ' + leaks.slice(0, 3).join(', ') : ''})`);
const waLinks = [...sg.matchAll(/href="(https:\/\/wa\.me\/41775236122\?text=[^"]+)"[^>]*data-f30-wa/g)].map((x) => x[1].replace(/&amp;/g, '&'));
ok(waLinks.length === 2 && waLinks.every((h) => h === cta.whatsappHref), `2 WhatsApp-Geschenk-CTAs (Hero + Floating) mit identischem Deeplink auf ${'41775236122'}`);
const decoded = decodeURIComponent(new URL(cta.whatsappHref).searchParams.get('text') || '');
ok(decoded === cta.whatsappMessage && /FIRST 30/.test(decoded) && /St\. Gallen/.test(decoded) && /30 Minuten/.test(decoded) && /CHF 0/.test(decoded) && !/Beschwerde|Diagnose|Versicherung|Symptom/i.test(decoded), `Nachricht korrekt kodiert (ä/ö/ü/Emoji) und ohne Gesundheitsdaten: "${decoded.replace(/\n/g, ' / ')}"`);
ok((sg.match(/<div[^>]*data-f30-float="mobile"/g) ?? []).length === 1 && (sg.match(/<div[^>]*data-f30-float="desktop"/g) ?? []).length === 1 && (sg.match(/<button[^>]*data-f30-dismiss/g) ?? []).length === 2, 'je ein schwebender CTA mobil/desktop mit Dismiss');
ok(vis.includes('Ja, ich will mein Geschenk!') && vis.includes('Du zahlst CHF 0.–') && vis.includes('Weihnachten kommt dieses Jahr früher.') && vis.includes('30 Minuten TCM geschenkt.') && !/Winter Gift Edition|Herbst-Winter/.test(vis), 'finale Hero-Copy (Pre-Christmas Edition, Headline, Preis, CTA), keine alten Editionsnamen');
ok((vis.match(/CHF 0\.–/g) ?? []).length >= 4 && !/CHF 0\.-[^–]/.test(vis), 'einheitliche Preisangabe CHF 0.– in Hero, Floating, Wähler');

console.log('5. API');
const { onRequestPost } = await import('../functions/api/anfrage.js');
const realFetch = globalThis.fetch; const sent = [];
globalThis.fetch = async (url, init) => { if (String(url).includes('turnstile')) return new Response(JSON.stringify({ success: true })); sent.push(JSON.parse(init.body)); return new Response('{}', { status: 200 }); };
const post = (d) => onRequestPost({ request: new Request('https://tcm.ch/api/anfrage', { method: 'POST', body: JSON.stringify(d), headers: { 'Content-Type': 'application/json' } }), env: { RESEND_API_KEY: 'x', TURNSTILE_SECRET: 'y' } });
const hero0 = { telefon: '+41 79 123 45 67', standort: 'St. Gallen', quelle: 'launch-hero-sg', formular: 'Hero-Gratis-30min-StGallen', quelle_detail: 'Hero St. Gallen Neueroeffnung', seite: '/standort/st-gallen', turnstileToken: 't', zeit: '2026-11-20T10:00:00Z' };
let res = await post({ ...hero0, angebot_id: 'FIRST30_WINTER_2026_SG', angebot: 'CLIENT TEXT (ignored)' });
let mail = sent[sent.length - 1];
ok(res.status === 200 && /FIRST 30 PRE-CHRISTMAS EDITION/.test(mail.html) && mail.html.indexOf('Anfrageart') < mail.html.indexOf('>Telefon<') && /FIRST 30 Pre-Christmas Edition 2026 – kostenloser 30-Minuten-Termin – St\. Gallen/.test(mail.html) && !/CLIENT TEXT/.test(mail.html) && !/>Name</.test(mail.html), 'FIRST 30 phone-only: akzeptiert ohne Name, Klassifikation zuoberst, kanonisches Angebot, kein erfundener Name');
ok(mail.subject.startsWith('[Hero-Gratis-30min-StGallen] Neue Anfrage — St. Gallen') && mail.subject.endsWith(' · FIRST 30'), `Betreff: "${mail.subject}"`);
res = await post({ ...hero0, telefon: '12', angebot_id: 'FIRST30_WINTER_2026_SG' }); ok(res.status === 422 && (await res.json()).error === 'invalid_phone', 'FIRST 30 phone-only: ungültige Nummer → 422 invalid_phone');
res = await post({ ...hero0, angebot_id: 'FIRST30_WINTER_2026_SG', website: 'spam' }); ok(res.status === 200 && sent.length === 1, 'Honeypot: 200 ohne Mailversand');
res = await post({ ...hero0, angebot_id: 'ERSTTERMIN_REGULAER_SG' }); ok(res.status === 422 && (await res.json()).error === 'missing_fields', 'launch-hero-sg mit regulärer ID: Name bleibt Pflicht (phone-only NUR für FIRST 30)');
res = await post({ telefon: '079 123 45 67', standort: 'St. Gallen', quelle: 'sg-kontakt-bottom', angebot_id: 'FIRST30_WINTER_2026_SG', turnstileToken: 't' }); ok(res.status === 422, 'unteres Formular mit FIRST-30-ID ohne Name/E-Mail: Regeln unverändert (422)');
res = await post({ name: 'Test Person', telefon: '079 123 45 67', email: 'a@b.ch', standort: 'St. Gallen', quelle: 'sg-kontakt-bottom', angebot_id: 'FIRST30_WINTER_2026_SG', wunschzeit: 'Do Nachmittag', turnstileToken: 't' }); mail = sent[sent.length - 1];
ok(res.status === 200 && /FIRST 30 PRE-CHRISTMAS EDITION/.test(mail.html) && /Wunschzeit/.test(mail.html) && /sg-kontakt-bottom/.test(mail.html), 'unteres Formular FIRST 30: Klassifikation + Wunschzeit + Quelle sg-kontakt-bottom');
res = await post({ name: 'Test Person', telefon: '079 123 45 67', email: 'a@b.ch', standort: 'St. Gallen', quelle: 'sg-kontakt-bottom', angebot_id: 'ERSTTERMIN_REGULAER_SG', turnstileToken: 't' }); mail = sent[sent.length - 1];
ok(res.status === 200 && /REGULÄRER ERSTTERMIN/.test(mail.html) && /Regulärer Ersttermin – St\. Gallen/.test(mail.html) && !/gratis|kostenlos|FIRST 30/.test(mail.html) && !/FIRST 30/.test(mail.subject), 'regulär: keine Gratis-/FIRST-30-Kennzeichnung');
res = await post({ ...hero0, name: 'X', angebot_id: 'FREE_FOREVER' }); ok(res.status === 422 && (await res.json()).error === 'invalid_offer', 'unbekannte Angebots-ID → 422 invalid_offer');
res = await post({ name: 'Test Person', telefon: '079', email: 'a@b.ch', standort: 'Basel', quelle: '/standorte/basel/', turnstileToken: 't' }); mail = sent[sent.length - 1];
ok(res.status === 200 && !/Anfrageart/.test(mail.html), 'andere Standorte/Formulare ohne ID: Mail-Format unverändert');
globalThis.fetch = realFetch;
console.log(fails ? `\n${fails} Fehler` : '\nFIRST-30-Gate: 0 Fehler');
process.exit(fails ? 1 : 0);
