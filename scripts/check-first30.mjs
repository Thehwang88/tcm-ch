// Gate: TCM.ch FIRST 30 · Pre-Christmas Edition 2026 (St. Gallen). Nach `npm run build`: node scripts/check-first30.mjs
//  1. Zustandsabhängig: aktiv mit/ohne verifizierte Zahl, 30/30 mit Warteliste, ausverkauft-geschlossen, manuell geschlossen.
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
const home = readFileSync('dist/index.html', 'utf8');
const text = (s) => s.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const vis = text(sg);

console.log('1. Kapazität');
const pv = JSON.parse(readFileSync('src/data/first30.preview.json', 'utf8'));
ok(pv.claims === null && pv.cutoff === false && pv.campaignActive === null && !/data-first30-preview/.test(sg), 'kein Vorschau-Build (first30.preview.json: claims null, cutoff false, campaignActive null) in dist');
// Das Gate muss jede legitime, manuell deploybare Konfiguration prüfen (27/30, 30/30, CLOSED).
// Keine automatische Datums-Schliessung und kein Produktions-Zähler ohne Verifikation.
const full = FIRST30.confirmedClaims != null && FIRST30.confirmedClaims >= FIRST30.totalAllocation;
const expectedState = !FIRST30.campaignActive ? 'closed' : full ? (FIRST30.waitlistEnabled ? 'soldout-waitlist' : 'soldout-closed') : 'active';
ok(!Object.prototype.hasOwnProperty.call(FIRST30, 'campaignEnd'), 'kein automatisch ablaufendes Kampagnen-Enddatum');
ok(typeof FIRST30.campaignActive === 'boolean' && typeof FIRST30.waitlistEnabled === 'boolean', 'Lifecycle-Switches sind manuell gesetzte Booleans');
ok(FIRST30.confirmedClaims === null || (Number.isInteger(FIRST30.confirmedClaims) && FIRST30.confirmedClaims >= 0 && FIRST30.confirmedClaims <= FIRST30.totalAllocation), 'bestätigte Vergaben null oder Integer 0–30');
ok(FIRST30.confirmedClaims == null || (!!FIRST30.verifiedAt && !!FIRST30.verifiedBy), 'verifizierter Zähler hat verifiedAt und verifiedBy');
ok(FIRST30.totalAllocation === 30, `Gesamtkapazität 30 (betriebliche Verfügbarkeit vor Launch prüfen); aktuell ${FIRST30.totalAllocation}`);
ok(st.campaign === expectedState, `zustandsabhängig: erwarteter Zustand ${expectedState}, gerendert ${st.campaign}`);
ok(st.showCampaign === (expectedState === 'active' || expectedState === 'soldout-waitlist'), 'Kampagnen-Hero nur für active/soldout-waitlist');
// Reine Zustandsmatrix: testet die Modell- und CTA-Logik ohne Produktionsdateien oder Preview-Schalter zu ändern.
const originalState = { active: FIRST30.campaignActive, count: FIRST30.confirmedClaims, waitlist: FIRST30.waitlistEnabled };
const modelCases = [
  ['unverified', true, null, true, 'active', 'unverified', true],
  ['27/30', true, 27, true, 'active', 'verified', true],
  ['28/30', true, 28, true, 'active', 'verified', true],
  ['30/30-waitlist', true, 30, true, 'soldout-waitlist', 'full', true],
  ['30/30-closed', true, 30, false, 'soldout-closed', 'full', false],
  ['manual-closed', false, null, true, 'closed', 'unverified', false],
  ['manual-closed-full', false, 30, true, 'closed', 'full', false],
];
try {
  for (const [label, active, count, waitlist, wanted, indicatorMode, visible] of modelCases) {
    FIRST30.campaignActive = active;
    FIRST30.confirmedClaims = count;
    FIRST30.waitlistEnabled = waitlist;
    const state = m.first30State();
    const currentCta = m.campaignCtaFor('st-gallen');
    ok(state.campaign === wanted && state.indicator.mode === indicatorMode && state.showCampaign === visible && (!!currentCta) === visible,
      `Modellzustand ${label}: ${wanted}, Indikator ${indicatorMode}, Geschenk-CTA ${visible ? 'sichtbar' : 'verborgen'}`);
  }
} finally {
  FIRST30.campaignActive = originalState.active;
  FIRST30.confirmedClaims = originalState.count;
  FIRST30.waitlistEnabled = originalState.waitlist;
}
if (st.showCampaign) {
  const expectedHero = st.campaign === 'soldout-waitlist' ? 'soldout' : st.reserved == null ? 'max-only' : 'verified';
  ok(new RegExp(`data-first30="${expectedHero}"`).test(sg) && !/hlsg-card/.test(sg), `Promo-Hero Zustand ${st.campaign} / ${expectedHero}, regulärer Hero fehlt`);
if (FIRST30.confirmedClaims == null) {
  ok(/data-mode="unverified"/.test(sg) && vis.includes(`${FIRST30.totalAllocation} limitierte Willkommensgeschenke`) && !/Limitierte FIRST 30 Vorweihnachtsgeschenke/.test(vis), 'nur Maximum kommuniziert; Indikator unverifiziert ("30 limitierte Willkommensgeschenke")');
  ok(!/f30-avail-bar/.test(sg) && !/\d+ \/ \d+ Geschenke vergeben/.test(vis) && !/Nur noch \d+ (Geschenke? verfügbar|verfügbar|übrig)/.test(vis) && !/%/.test(text(sg.slice(sg.indexOf('data-f30-avail'), sg.indexOf('</div>', sg.indexOf('data-f30-avail'))))), 'kein Balken, kein "x / 30 vergeben", kein Restbestand, kein Prozent');
} else {
  ok(new RegExp(`data-confirmed="${FIRST30.confirmedClaims}"`).test(sg) && vis.includes(st.indicator.head) && vis.includes(st.indicator.sub), `Indikator: "${st.indicator.head}" · "${st.indicator.sub}"`);
  ok(!!FIRST30.verifiedAt && !!FIRST30.verifiedBy, 'verifizierte Zahl trägt verifiedAt + verifiedBy');
  if (st.campaign === 'soldout-waitlist') {
    ok(st.reserved === st.max && /Auf die FIRST 30 Warteliste/.test(vis) && !/Nur noch 0 (Geschenke? verfügbar|verfügbar)/.test(vis), 'bei 30/30 Warteliste statt unhaltbarer Verfügbarkeitsbehauptung');
  }
}

console.log('2. Claims');
ok(/once-a-year/i.test(vis) === FIRST30.onceAYearApproved, `"Once-a-Year" nur nach Freigabe (approved=${FIRST30.onceAYearApproved})`);
ok(!/jährlich/i.test(vis) || FIRST30.onceAYearApproved, '"jährlich" nur nach Freigabe');
ok(/<span[^>]*data-f30-timer\b/.test(sg) === FIRST30.dailyCutoff.approved, `Countdown nur mit bestätigtem Cutoff (approved=${FIRST30.dailyCutoff.approved})`);
ok(FIRST30.dailyCutoff.approved || !/f30-wa-strip/.test(sg), 'ohne Cutoff: kein Strip im WhatsApp-Button (Kapazität nur im Verfügbarkeits-Indikator)');
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
// 3 statt 4 seit 15.10.2026: der Ablauf-Block samt wiederholtem FIRST-30-CTA wurde durch die FAQ vor #kontakt ersetzt.
ok((sg.match(/data-offer="first30"/g) ?? []).length >= 3, 'FIRST-30-CTAs (Leaf, Desktop-Pill) mit data-offer; regulärer Weg über OneDoc-Link + unteren Wähler');

console.log('4. Scope + WhatsApp');
const pages = []; const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); } }; walk('dist');
const leaks = pages.filter((p) => p !== 'dist/standorte/st-gallen/index.html' && /FIRST30_WINTER_2026_SG|data-sg-hero-form|f30-float|data-f30-bottom/.test(readFileSync(p, 'utf8')));
ok(leaks.length === 0, `FIRST-30-Markup nur auf St. Gallen (${leaks.length} andere Seiten${leaks.length ? ': ' + leaks.slice(0, 3).join(', ') : ''})`);
const waLinks = [...sg.matchAll(/href="(https:\/\/wa\.me\/41775236122\?text=[^"]+)"[^>]*data-f30-wa/g)].map((x) => x[1].replace(/&amp;/g, '&'));
ok(waLinks.length === 2 && waLinks.every((h) => h === cta.whatsappHref), `2 WhatsApp-Geschenk-CTAs (Hero + Floating) mit identischem Deeplink auf ${'41775236122'}`);
const decoded = decodeURIComponent(new URL(cta.whatsappHref).searchParams.get('text') || '');
ok(decoded === cta.whatsappMessage && /FIRST 30/.test(decoded) && /St\. Gallen/.test(decoded) && /30 Minuten/.test(decoded) && /CHF 0/.test(decoded) && !/Beschwerde|Diagnose|Versicherung|Symptom/i.test(decoded), `Nachricht korrekt kodiert (ä/ö/ü/Emoji) und ohne Gesundheitsdaten: "${decoded.replace(/\n/g, ' / ')}"`);
ok((sg.match(/<div[^>]*data-f30-float="mobile"/g) ?? []).length === 1 && (sg.match(/<div[^>]*data-f30-float="desktop"/g) ?? []).length === 1 && (sg.match(/<button[^>]*data-f30-dismiss/g) ?? []).length === 2, 'je ein kompakter FIRST-30-Zusatz mobil/desktop mit eigenem Dismiss');
const heroSrc = readFileSync('src/components/HeroLaunchSG.astro', 'utf8');
ok(/class="scb-bar"/.test(sg) && /class="scb-primary"/.test(sg) && /class="scb-row"/.test(sg), 'normale Sticky-Leiste (Ersttermin + Kontaktzeile) auf der St.-Gallen-Seite vorhanden');
ok(/bar\.insertBefore\(mobileFloat, bar\.firstChild\)/.test(heroSrc)
   && /\.f30-float--m\s*\{\s*position:\s*static/.test(heroSrc)
   && !/bar\.classList\.add\(['"]scb-off['"]\)/.test(heroSrc),
   'mobiler Geschenk-Hinweis innerhalb der normalen Sticky-Leiste; kein scb-off/zweites Fixed-Overlay');
ok(/fl\.hidden\s*=\s*!show/.test(heroSrc)
   && /sessionStorage\.setItem\('f30-float-dismissed', '1'\)/.test(heroSrc)
   && /first30_cta_dismiss/.test(heroSrc)
   && !/bar\.classList\.(add|remove|toggle)\(['"]scb-off/.test(heroSrc),
   'X schliesst ausschliesslich den FIRST-30-Zusatz (ohne Sticky-Verlust oder unsichtbare Leerzeile)');
ok(/@media \(min-width: 1024px\)\s*\{\s*\.f30-intro, \.f30-more/.test(heroSrc),
   'Hero-Inhalt nur auf Desktop höher positioniert, mobile Layout unverändert');
const mainSg = (() => { try { return readFileSync('/home/user/tcm-ch-lead/dist/standorte/st-gallen/index.html', 'utf8'); } catch { return ''; } })();
const meta = (s, re) => (s.match(re) || [])[1];
ok(meta(sg, /<title>([^<]*)/) === 'Akupunktur & TCM St. Gallen | TCM.ch Kliniken' || /St\. Gallen/.test(meta(sg, /<title>([^<]*)/) || ''), `Title unverändert ortsbezogen: "${meta(sg, /<title>([^<]*)/)}"`);
ok(meta(sg, /rel="canonical" href="([^"]*)"/) === 'https://tcm.ch/standorte/st-gallen/', 'Canonical unverändert');
ok(/"@type":\s*"MedicalClinic"/.test(sg) && (!mainSg || JSON.stringify((sg.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g) || [])) === JSON.stringify((mainSg.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g) || []))), 'JSON-LD (MedicalClinic etc.) identisch zum main-Build');
const h1 = text(meta(sg, /<h1[^>]*>([\s\S]*?)<\/h1>/) || '');
ok(/St\. Gallen/.test(h1) && /TCM/.test(h1), `H1 trägt Ort und Fach: "${h1}"`);
ok(/Akupunktur &amp; TCM in St\. Gallen/.test(sg) && /TCM\.ch Klinik · St\. Gallen · FIRST 30/.test(vis)
   && /Weihnachten kommt dieses Jahr früher\./.test(h1),
   'H1 und Hero tragen sichtbar Klinik/TCM.ch, Akupunktur, St. Gallen UND die unveränderte Weihnachtsheadline');
ok((home.match(/class="home-first30-tag"/g) ?? []).length === 1
   && /href="\/standorte\/st-gallen\/#first30"/.test(home)
   && !/href="\/standorte\/st-gallen\/#first30"[^>]*onclick=/.test(home)
   && (st.soldOut ? /FIRST 30 · Warteliste/.test(home) && /Zur Warteliste →/.test(home)
                  : /FIRST 30 · 30 Min\. geschenkt/.test(home) && /Geschenk ansehen →/.test(home)),
   'Homepage: EIN dezenter, verlinkter FIRST-30-Hinweis NUR bei St. Gallen; bei 30/30 Warteliste statt Geschenkversprechen');
ok((sg.match(/<h1[\s>]/g) || []).length === 1, 'genau eine H1');
ok(vis.includes('Ja, ich will mein Geschenk!') && vis.includes('Ja, ich möchte mein Geschenk!') && vis.includes('30 Minuten · CHF 0.–') && !/Du zahlst CHF 0/.test(vis) && vis.includes('Weihnachten kommt dieses Jahr früher.') && vis.includes('30 Minuten TCM in St. Gallen geschenkt.') && !/Winter Gift Edition|Herbst-Winter/.test(vis), 'finale Hero-Copy (Pre-Christmas Edition, Headline, Preis, CTA), keine alten Editionsnamen');
const heroVis = text(sg.slice(sg.indexOf('class="lsr-hero f30-hero"'), sg.indexOf('</section>', sg.indexOf('class="lsr-hero f30-hero"'))));
ok((heroVis.match(/CHF 0\.–/g) ?? []).length === 1 && (vis.match(/CHF 0\.–/g) ?? []).length >= 3 && !/CHF 0\.-[^–]/.test(vis), `ein Preisanker im Hero (${(heroVis.match(/CHF 0\.–/g) ?? []).length}×), einheitlich CHF 0.– in Floating + Wähler`);

} else {
  console.log('2–4. Geschlossene Kampagne: regulärer Hero, keine Geschenk-CTAs');
  ok(st.campaign === 'closed' || st.campaign === 'soldout-closed', `geschlossener Zustand: ${st.campaign}`);
  // Seit 16.10.2026: regulärer Hero (Text 4adc79c8) mit Praxisfoto; die bisherige Hero-Buchungsbox (gemeinsames
  // Kontaktformular, src/lib/kontakt-form.ts) steht in der Kontaktsektion direkt unter Hero + USP-Reihe.
  // Seit dem gemeinsamen Hero-Video (standort/HeroMedia.astro): Praxisfoto als optimiertes WebP-Poster im Hero.
  const hero = sg.slice(sg.indexOf('class="lsr-hero hlsg"'), sg.indexOf('</section>', sg.indexOf('class="lsr-hero hlsg"')));
  const k0 = sg.indexOf('<section class="sgk" id="sg-kontakt-praxis">');
  const heroSec = k0 >= 0 ? sg.slice(k0, sg.indexOf('</section>', k0)) : '';
  const between = k0 >= 0 ? sg.slice(sg.indexOf('class="lsr-hero hlsg"'), k0) : '';
  ok(/class="lsr-hero hlsg"/.test(sg) && /Akupunktur &amp; TCM in/.test(hero) && /src="\/images\/standort-stgallen\.(jpg|webp)"/.test(hero) && !/data-kf-instance/.test(hero) && !/<form|data-kf-instance/.test(between.slice(hero.length))
     && /data-kf-instance="sg-hero"/.test(heroSec) && /id="offer-form"/.test(heroSec) && /id="first30"/.test(heroSec), 'regulärer St.-Gallen-Hero mit Praxisfoto; Buchungsbox (Anker #offer-form, #first30) direkt darunter in der Kontaktsektion statt FIRST 30');
  ok(!/class="f30-hero"/.test(sg) && !/data-f30-bottom|data-f30-float|data-f30-wa/.test(sg), 'kein Promo-Hero, Geschenk-Wähler oder schwebender Geschenk-CTA');
  ok(!/data-offer="first30"|FIRST30_WINTER_2026_SG/.test(sg), 'keine alte Geschenk-ID oder Geschenk-CTA im geschlossenen HTML');
  ok(/name="Hero-Gratis-30min-StGallen"/.test(heroSec) && /name="quelle" value="launch-hero-sg"/.test(heroSec) && /name="quelle_detail" value="Hero St\. Gallen Neueroeffnung"/.test(heroSec) && /name="seite" value="\/standort\/st-gallen"/.test(heroSec)
     && /name="telefon"[^>]*required/.test(heroSec) && /name="name"/.test(heroSec) && !/name="name"[^>]*required/.test(heroSec) && /href="\/datenschutz\/"/.test(heroSec)
     && /data-kf-angebot="TCM_CHECKIN"/.test(heroSec) && /data-kf-angebot="ERSTTERMIN_BEHANDLUNG"/.test(heroSec) && !/FIRST30_|data-sg-hero-form/.test(heroSec),
     'Hero-Formular: bestehende Identifier (Formularname, quelle, Quelle, Seite), Telefon Pflicht, Name optional, neue Terminarten, keine FIRST-30-ID');
  ok(/id="online-buchen"/.test(sg) && /onedoc\.ch\/de\/widget/.test(sg) && /id="kontakt"/.test(sg), 'OneDoc und unteres Kontaktformular unverändert');
  ok(/<h1[^>]*>Akupunktur &amp; TCM in/.test(sg) && (sg.match(/<h1[\s>]/g) || []).length === 1, 'genau eine reguläre St.-Gallen-H1');
  const closedTitle = (sg.match(/<title>([^<]*)/) || [])[1] || '';
  ok(/St\. Gallen/.test(closedTitle) && /rel="canonical" href="https:\/\/tcm\.ch\/standorte\/st-gallen\/"/.test(sg) && /"@type":\s*"MedicalClinic"/.test(sg), 'Titel, Canonical und MedicalClinic-Schema bleiben erhalten');
  ok(cta === undefined, 'kein saisonaler CTA nach Kampagnen-Schliessung');
  ok(!/class="home-first30-tag"/.test(home)
     && !/href="\/standorte\/st-gallen\/#first30"/.test(home)
     && /href="\/standorte\/st-gallen\/"/.test(home),
     'Homepage: nach manueller Schliessung bzw. soldout-closed kein FIRST-30-Hinweis; Standortkarte regulär');
  const pagesClosed = []; const walkClosed = (dir) => { for (const n of readdirSync(dir)) { const p = join(dir, n); statSync(p).isDirectory() ? walkClosed(p) : p.endsWith('.html') && pagesClosed.push(p); } }; walkClosed('dist');
  const leaksClosed = pagesClosed.filter(p => p !== 'dist/standorte/st-gallen/index.html' && /FIRST30_WINTER_2026_SG|data-f30-float|data-f30-bottom/.test(readFileSync(p, 'utf8')));
  ok(leaksClosed.length === 0, `geschlossener Zustand: ${leaksClosed.length} fremde Seiten mit FIRST-30-Teasern`);
}

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
// Auch spätere gültige Anfragen werden weiterhin entgegengenommen; das Team prüft Kapazität/Anspruch persönlich.
res = await post({ ...hero0, zeit: '2027-01-05T10:00:00Z', angebot_id: 'FIRST30_WINTER_2026_SG' });
mail = sent[sent.length - 1];
ok(res.status === 200 && /FIRST 30 PRE-CHRISTMAS EDITION/.test(mail.html), 'gültige FIRST-30-Anfrage bleibt auch nach Weihnachten empfangbar (kein Datumssperrfilter)');
res = await post({ ...hero0, telefon: '12', angebot_id: 'FIRST30_WINTER_2026_SG' }); ok(res.status === 422 && (await res.json()).error === 'invalid_phone', 'FIRST 30 phone-only: ungültige Nummer → 422 invalid_phone');
const beforeSpam = sent.length;
res = await post({ ...hero0, angebot_id: 'FIRST30_WINTER_2026_SG', website: 'spam' }); ok(res.status === 200 && sent.length === beforeSpam, 'Honeypot: 200 ohne Mailversand');
res = await post({ ...hero0, angebot_id: 'ERSTTERMIN_REGULAER_SG' }); ok(res.status === 422 && (await res.json()).error === 'missing_fields', 'launch-hero-sg mit regulärer ID: Name bleibt Pflicht (phone-only NUR für FIRST 30)');
res = await post({ telefon: '079 123 45 67', standort: 'St. Gallen', quelle: 'sg-kontakt-bottom', angebot_id: 'FIRST30_WINTER_2026_SG', turnstileToken: 't' }); ok(res.status === 422, 'unteres Formular mit FIRST-30-ID ohne Name/E-Mail: Regeln unverändert (422)');
res = await post({ name: 'Test Person', telefon: '079 123 45 67', email: 'a@b.ch', standort: 'St. Gallen', quelle: 'sg-kontakt-bottom', angebot_id: 'FIRST30_WINTER_2026_SG', wunschzeit: 'Do Nachmittag', turnstileToken: 't' }); mail = sent[sent.length - 1];
ok(res.status === 200 && /FIRST 30 PRE-CHRISTMAS EDITION/.test(mail.html) && /Wunschzeit/.test(mail.html) && /sg-kontakt-bottom/.test(mail.html), 'unteres Formular FIRST 30: Klassifikation + Wunschzeit + Quelle sg-kontakt-bottom');
res = await post({ name: 'Test Person', telefon: '079 123 45 67', email: 'a@b.ch', standort: 'St. Gallen', quelle: 'sg-kontakt-bottom', angebot_id: 'ERSTTERMIN_REGULAER_SG', turnstileToken: 't' }); mail = sent[sent.length - 1];
ok(res.status === 200 && /REGULÄRER ERSTTERMIN/.test(mail.html) && /Regulärer Ersttermin – St\. Gallen/.test(mail.html) && !/gratis|kostenlos|FIRST 30/.test(mail.html) && !/FIRST 30/.test(mail.subject), 'regulär: keine Gratis-/FIRST-30-Kennzeichnung');
res = await post({ ...hero0, name: 'X', angebot_id: 'FREE_FOREVER' }); ok(res.status === 422 && (await res.json()).error === 'invalid_offer', 'unbekannte Angebots-ID → 422 invalid_offer');
// Scope: FIRST-30-ID nur mit St. Gallen + St.-Galler Quelle
const forged = [
  ['Basel-Formular', { name: 'X', telefon: '079 123 45 67', email: 'a@b.ch', standort: 'Basel', quelle: '/standorte/basel/', angebot_id: 'FIRST30_WINTER_2026_SG', turnstileToken: 't' }],
  ['Home-Formular mit St. Gallen', { name: 'X', telefon: '079 123 45 67', email: 'a@b.ch', standort: 'St. Gallen', quelle: '/', angebot_id: 'FIRST30_WINTER_2026_SG', turnstileToken: 't' }],
  ['Hero-Quelle, anderer Standort', { ...hero0, standort: 'Zürich Höngg', angebot_id: 'FIRST30_WINTER_2026_SG' }],
  ['Hero-Quelle, Standort leer', { ...hero0, standort: '', angebot_id: 'FIRST30_WINTER_2026_SG' }],
  ['Kontakt-Quelle, Warteliste-ID, anderer Standort', { name: 'X', telefon: '079 123 45 67', email: 'a@b.ch', standort: 'Wil', quelle: 'sg-kontakt-bottom', angebot_id: 'FIRST30_WINTER_2026_SG_WARTELISTE', turnstileToken: 't' }],
  ['Reguläre SG-ID aus Basel', { name: 'X', telefon: '079 123 45 67', email: 'a@b.ch', standort: 'Basel', quelle: '/standorte/basel/', angebot_id: 'ERSTTERMIN_REGULAER_SG', turnstileToken: 't' }],
];
for (const [label, body] of forged) { const before = sent.length; const r2 = await post(body); const j = await r2.json(); ok(r2.status === 422 && j.error === 'invalid_offer_scope' && sent.length === before, `gefälschter Scope (${label}) → 422 invalid_offer_scope, keine Mail`); }
res = await post({ ...hero0, angebot_id: 'FIRST30_WINTER_2026_SG', angebot: 'GRATIS FÜR IMMER', preis: '0', berechtigt: 'ja', verfuegbar: '99' }); mail = sent[sent.length - 1];
ok(res.status === 200 && !/GRATIS FÜR IMMER|berechtigt|verfuegbar|99/.test(mail.html), 'Client-Text zu Preis/Berechtigung/Kapazität wird nie übernommen');
res = await post({ name: 'Test Person', telefon: '079', email: 'a@b.ch', standort: 'Basel', quelle: '/standorte/basel/', turnstileToken: 't' }); mail = sent[sent.length - 1];
ok(res.status === 200 && !/Anfrageart/.test(mail.html), 'andere Standorte/Formulare ohne ID: Mail-Format unverändert');
globalThis.fetch = realFetch;
console.log(fails ? `\n${fails} Fehler` : '\nFIRST-30-Gate: 0 Fehler');
process.exit(fails ? 1 : 0);
