// Gate: TCM 360° Entdeckertage St. Gallen (src/data/herbst-sg.ts, src/data/tcm360-runden.json). Nach `npm run build`:
//   node scripts/check-herbst-sg.mjs                        (Produktionszustand)
//   HERBST_SG_PREVIEW=active node scripts/check-herbst-sg.mjs  (gegen einen Vorschau-Build, nur lokal)
//  1. Modell: Zustände active / soldout / live / between / next; Kapazitätstext nur verifiziert; Runden-Status aus echten Daten.
//  2. Konfiguration: Angebot nur mit allen Freigaben; Runden plausibel (ids, Zeiten, Status, Zähler belegt); keine Fake-Muster.
//  3. dist: Kampagnen-Markup nur auf /standorte/st-gallen/ und nur bei aktivem Angebot; kein Vorschau-Build in Produktion;
//     Banner unter dem Header vor dem Hero, EIN Sheet, EINE Sticky-Leiste, Marker für die reguläre Bar, reguläre Formulare erhalten.
//  4. Sheet-Formular: gemeinsamer Renderer (Validierung/Versand/Conversion), Kampagnen-/Runden-/UTM-Felder, Vorauswahl, Turnstile lazy.
//  5. API: Kampagne nur mit bekannter ID und passendem Standort; 360°-Klassifikation + Runde serverseitig; UTM nur technisch.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { build } from 'esbuild';
import { TERMINARTEN, KAMPAGNEN } from '../src/data/kontakt-angebote.mjs';

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.error('  ✗ ' + m); } else console.log('  ✓ ' + m); };
const r = await build({ stdin: { contents: `export * from './src/data/herbst-sg';`, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent', define: { 'import.meta.env': '{}' } });
const m = await import('data:text/javascript;base64,' + Buffer.from(r.outputFiles[0].text).toString('base64'));
const { HERBST_SG, HERBST_COPY, RUNDEN, NEUTRAL_TEXT } = m;
const envPreview = process.env.HERBST_SG_PREVIEW || '';
const withPreview = (v, fn) => { const old = process.env.HERBST_SG_PREVIEW; if (v) process.env.HERBST_SG_PREVIEW = v; else delete process.env.HERBST_SG_PREVIEW; try { return fn(); } finally { if (old == null) delete process.env.HERBST_SG_PREVIEW; else process.env.HERBST_SG_PREVIEW = old; } };

console.log('1. Modell (Zustandsmatrix)');
for (const [pv, mode, kind, sc, textRe] of [
  ['active', 'active', 'aktuell', 'quota', /^Aktuelle Buchungsrunde bis \d\d\.\d\d\.\d{4}$/],
  ['soldout', 'soldout', 'aktuell', 'none', /^Aktuelle Buchungsrunde bis/],
  ['live', 'active', 'aktuell', 'live', /^Aktuelle Buchungsrunde bis/],
  ['between', 'active', 'keine', 'none', new RegExp('^' + NEUTRAL_TEXT + '$')],
  ['next', 'active', 'naechste', 'none', /^Nächste Buchungsrunde ab \d\d\.\d\d\.\d{4}$/],
  ['anfrage', 'active', 'aktuell', 'none', new RegExp('^' + NEUTRAL_TEXT + '$')]]) {
  const s = withPreview(pv, () => m.herbstState());
  ok(s.show && s.mode === mode && s.rundeKind === kind && s.scarcityKind === sc && textRe.test(s.rundeText) && (kind === 'aktuell' ? !!s.rundeId : s.rundeId === ''), `Vorschau ${pv}: mode ${mode}, Runde ${kind} («${s.rundeText}»), Kapazität ${sc}${sc === 'live' ? ` («${s.scarcity}»)` : ''}, Feld runde ${kind === 'aktuell' ? 'gesetzt' : 'leer'}`);
}
const prod = withPreview('', () => m.herbstState());
const A = HERBST_SG.approvals; const anfrageMode = HERBST_SG.bookingMode === 'anfrage';
const ready = A.formatConfirmed && A.claimsReviewed && A.privacyReviewed && (A.capacityConfirmed || anfrageMode);
ok(['anfrage', 'kontingent'].includes(HERBST_SG.bookingMode), `Buchungsmodus ${HERBST_SG.bookingMode}`);
ok(prod.show === (HERBST_SG.offerActive && ready), `Produktion: Markup nur mit offerActive (${HERBST_SG.offerActive}) UND Freigaben (${ready ? 'erteilt' + (anfrageMode ? ', Anfrage-Modus ohne Kapazitäts-Freigabe' : '') : 'NICHT BEREIT: ' + Object.entries(A).filter(([, v]) => !v).map(([k]) => k).join(', ')}) → show ${prod.show}`);
ok(!HERBST_SG.offerActive || ready, 'offerActive nur mit Format-, Claims- und Datenschutz-Freigabe und (Kapazitäts-Freigabe oder Anfrage-Modus)');
ok(!anfrageMode || (prod.scarcityKind === 'none' && (!prod.show || prod.rundeText === NEUTRAL_TEXT)), 'Anfrage-Modus: keine Kapazitätsaussage, Rundenzeile immer neutral');
ok(anfrageMode || !HERBST_SG.offerActive || RUNDEN.some((x) => x.status !== 'beendet' && x.reservierteTermine != null), 'Kontingent-Modus nur mit reservierten Terminen');
ok(prod.scarcityKind !== 'live' || (HERBST_SG.live.remaining > 0 && !!HERBST_SG.live.verifiedAt), 'Live-Zahl nur mit remaining > 0 und verifiedAt');
ok(prod.dauerText === '' || A.formatConfirmed, 'Dauer nur mit freigegebenem Format');
// Runden-Regeln mit echten Daten: beendete Runde kippt in neutral/nächste, nie Reset.
const first = RUNDEN[0];
const afterFirst = m.pickRunde(RUNDEN, new Date(first.ende).getTime() + 1000);
ok(afterFirst.kind !== 'aktuell' || afterFirst.runde.id !== first.id, 'nach Rundenende ist diese Runde nie mehr «aktuell»');

console.log('2. Konfiguration');
ok(Array.isArray(RUNDEN) && RUNDEN.length >= 1, `Buchungsrunden vorhanden (${RUNDEN.length})`);
ok(new Set(RUNDEN.map((x) => x.id)).size === RUNDEN.length && RUNDEN.every((x) => /^[a-z0-9-]{3,40}$/.test(x.id)), 'Runden-IDs eindeutig, nur a-z0-9-');
ok(RUNDEN.every((x) => /[+-]\d\d:\d\d$/.test(x.start) && /[+-]\d\d:\d\d$/.test(x.ende) && new Date(x.start) < new Date(x.ende)), 'Runden: Start vor Ende, ISO mit Zeitzonen-Offset');
ok(RUNDEN.every((x) => ['geplant', 'offen', 'beendet'].includes(x.status)), 'Runden-Status geplant | offen | beendet');
ok(RUNDEN.every((x) => x.reservierteTermine === null || (Number.isInteger(x.reservierteTermine) && x.reservierteTermine > 0)), 'reservierteTermine null oder positive Ganzzahl');
ok(RUNDEN.every((x) => x.bestaetigteBuchungen === null || (Number.isInteger(x.bestaetigteBuchungen) && x.bestaetigteBuchungen >= 0 && x.reservierteTermine != null && !!x.verifiziertAm && !!x.verifiziertVon)), 'bestaetigteBuchungen: null oder verifiziert (Kontingent, verifiziertAm/-Von)');
ok(first.id === 'runde-2026-10' && first.start === '2026-10-22T00:00:00+02:00' && first.ende === '2026-10-31T23:59:59+01:00', 'erste Runde: 22.10. 00:00 CEST bis 31.10.2026 23:59 CET (Zeitumstellung 25.10. berücksichtigt)');
ok(!A.capacityConfirmed || RUNDEN.some((x) => x.status !== 'beendet' && x.reservierteTermine != null), 'capacityConfirmed nur mit reservierten Terminen einer laufenden/geplanten Runde');
ok(HERBST_SG.dauerMin === 20 && TERMINARTEN.checkin.dauerMin === 30, 'Vorschlag 360°-Termin ca. 20 Min. getrennt vom unveränderten regulären Check-in (30 Min.)');
ok(KAMPAGNEN[HERBST_SG.id] && KAMPAGNEN[HERBST_SG.id].standortId === HERBST_SG.standortId && HERBST_SG.id === 'sg_tcm360_herbst_2026', 'Kampagnen-ID sg_tcm360_herbst_2026 in der Server-Whitelist mit Standort st-gallen');
const src = ['src/components/HerbstBannerSG.astro', 'src/components/HerbstSheetSG.astro', 'src/data/herbst-sg.ts'].map((f) => readFileSync(f, 'utf8')).join('\n');
const code = src.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->/g, ' ');
ok(!/countdown|setInterval|Math\.random|Restplätze|nur heute|letzte Chance|gerade gebucht|statt CHF|animation:[^;]*(pulse|blink)/i.test(code), 'kein Countdown, keine Zufallszahlen, keine Fake-Buchungen, kein CHF-Vergleich, kein Blinken/Pulsen');
ok(!/(?<![\w-])(Qi|Yin|Yang|Meridian)/.test(src) && !/heil(t|ung)\b/i.test(src), 'keine energetische Sprache, keine Heilversprechen');
ok(!/Ganzkörperuntersuchung|Gesundheitscheck|Komplettdiagnose|Früherkennung|Diagnose(?!n)|ersetzt (den|die) Arzt/i.test(code.replace(/Zungen- und Pulsdiagnos|Pulsdiagnos|TCM-Diagnos/g, '')), 'keine medizinischen Untersuchungs-/Diagnose-Claims im Wortlaut (360° = ganzheitliche TCM-Sicht; Kommentare ausgeklammert)');
ok(/TCM-Kompass|Discovery Experience|Mitnehmen/i.test(src) === false, 'kein TCM-Kompass / keine Discovery-Experience-Reste');
ok(!/verfügbar|frei|neue Termine/i.test(NEUTRAL_TEXT) && /unverbindlich/.test(NEUTRAL_TEXT), `neutraler Status ohne Verfügbarkeitszusage («${NEUTRAL_TEXT}»)`);
ok(/kurzer, auf dein Hauptanliegen fokussierter Kurzcheck, keine umfassende medizinische Untersuchung/.test(HERBST_COPY.boundary), '360° als kurze, priorisierte Orientierung beschrieben (keine umfassende Untersuchung)');

console.log('3. dist');
const pages = []; const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f === 'index.html' && pages.push(p); } }; walk('dist');
const sgPath = 'dist/standorte/st-gallen/index.html';
const sg = readFileSync(sgPath, 'utf8');
const others = pages.filter((p) => p !== sgPath && /data-hsg\b|hsg-sheet|hsg-bar/.test(readFileSync(p, 'utf8')));
ok(others.length === 0, `Kampagnen-Markup auf keiner anderen Seite (${pages.length} Seiten geprüft)`);
ok(!!envPreview === /data-hsg-preview=/.test(sg), envPreview ? `Vorschau-Build (${envPreview}) nur lokal` : 'kein Vorschau-Build (data-hsg-preview) in dist');
const shown = /id="hsg-banner"/.test(sg);
ok(envPreview ? shown : shown === prod.show, `Markup ${shown ? 'vorhanden' : 'nicht vorhanden'} = Modellzustand show ${envPreview ? 'true (Vorschau)' : prod.show}`);
if (shown) {
  const st = withPreview(envPreview, () => m.herbstState());
  const text = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  ok(sg.indexOf('id="hsg-banner"') < sg.indexOf('class="lsr-hero hlsg"') && /<\/section>\s*<i hidden data-hsg-end><\/i>\s*<section class="lsr-hero hlsg">/.test(sg.slice(sg.indexOf('id="hsg-banner"'))), 'Banner steht direkt vor dem SG-Hero (unter dem Header, scrollt mit)');
  ok((sg.match(/<dialog class="hsg-sheet"/g) || []).length === 1 && (sg.match(/class="hsg-bar"/g) || []).length === 1 && /<i hidden data-no-sticky-cta data-hsg-marker><\/i>/.test(sg), 'genau ein Sheet, eine Kampagnen-Sticky-Leiste, Marker ersetzt die reguläre Sticky-Bar');
  ok(!/<dialog class="hsg-sheet"[^>]*\sopen\b/.test(sg), 'Sheet im HTML geschlossen (öffnet nie automatisch)');
  ok(/data-kf-instance="sg-hero"/.test(sg) && /data-kf-instance="sg-unten"/.test(sg) && /id="online-buchen"/.test(sg) && sg.indexOf('data-kf-instance="sg-hero"') < sg.indexOf('id="hsg-sheet"'), 'reguläre SG-Formulare und OneDoc bleiben erreichbar; Hero-Formular bleibt erstes Formular');
  const opens = sg.match(/<a [^>]*data-hsg-open[^>]*>/g) || [];
  ok(opens.length === 2 && /herbst-banner/.test(opens.join()) && /herbst-sticky/.test(opens.join()) && opens.every((o) => /href="#offer-form"/.test(o) && /data-care-cta="herbst-[a-z-]+"/.test(o)), 'genau zwei CTAs (Banner, Sticky) mit Positionskennung, No-JS-Fallback auf die obere Buchungsbox');
  ok(/class="hsg-bar-tel" href="tel:\+41775236122"/.test(sg) && new RegExp(`class="hsg-bar-primary"[^>]*>${st.soldOut ? HERBST_COPY.stickyPrimarySoldout : HERBST_COPY.stickyPrimary} <span`).test(sg), `Sticky: «${st.soldOut ? HERBST_COPY.stickyPrimarySoldout : HERBST_COPY.stickyPrimary} →» + kanonische SG-Nummer`);
  // Sichtbarer Kampagnentext = Banner-Block + Sheet/Sticky-Block (der reguläre SG-Hero dazwischen bleibt aussen vor).
  const vis = text(sg.slice(sg.indexOf('id="hsg-banner"'), sg.indexOf('data-hsg-end')) + ' ' + sg.slice(sg.indexOf('id="hsg-sheet"'), sg.indexOf('data-hsg-marker')));
  ok((vis.match(new RegExp(st.rundeText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length === 3 && vis.includes(HERBST_COPY.rundeNote), `Rundenzeile «${st.rundeText}» in Banner, Modal-Spalte und Sheet + Abgrenzung zum regulären Check-in`);
  ok(st.scarcity ? vis.includes(st.scarcity) : !/Noch \d+ 360°-Termine|begrenzte Kapazität/.test(vis), st.scarcity ? `Kapazitätstext genau wie Modell: «${st.scarcity}»` : 'kein Kapazitätstext ohne Verifikation/Kontingent');
  ok(!/Nur noch \d|Restplätze|nur heute|letzte Chance|endet (für immer|endgültig)|statt CHF|\d+ ?%|Countdown/i.test(vis), 'keine unzulässigen Dringlichkeits-/Preisvergleichs-Muster');
  ok(st.bookingMode !== 'anfrage' || !/Aktuelle Buchungsrunde|Nächste Buchungsrunde|begrenzte Kapazität|Noch \d+ 360°/.test(vis), 'Anfrage-Modus: keine Rundenfrist, keine Kapazität, keine Restzahl im sichtbaren Text');
  ok(vis.includes(HERBST_COPY.bannerH) && vis.includes(st.soldOut ? HERBST_COPY.sheetSubSoldout : HERBST_COPY.bannerSub) && vis.includes(HERBST_COPY.name) && vis.includes(HERBST_COPY.headline) === false && vis.includes(HERBST_COPY.offer) && vis.includes(HERBST_COPY.support) && HERBST_COPY.components.every((k) => vis.includes(k.t)) && vis.includes(HERBST_COPY.reassurance) && vis.includes(HERBST_COPY.noTreatment) && vis.includes(HERBST_COPY.boundary), 'Launch-Copy (Banner, Name, Angebot, Erklärung, vier Bausteine, Reassurance, keine Behandlung, 360°-Abgrenzung) exakt');
  ok(st.dauerText ? vis.includes(st.dauerText) : !/\b\d+ Minuten\b/.test(vis.replace(/TCM-Check-in \(30 Minuten\)|60 Minuten · kostenpflichtig|30 Minuten · nach Verfügbarkeit/g, '')), st.dauerText ? `Dauer «${st.dauerText}» (Format freigegeben)` : 'keine 360°-Dauer ohne Freigabe (nur regulärer 30-Minuten-Check-in und 60-Minuten-Erstbehandlung benannt)');
  console.log('4. Sheet-Formular');
  const card = (sg.match(/<div class="inline-form-card kf kf--ruhig kf--herbst"[^>]*data-kf-instance="sg-herbst"[\s\S]*?<script src="\/kontakt-form\.js" defer><\/script><\/div>/) || [''])[0];
  ok(card && /data-kf-standort="St\. Gallen" data-kf-standort-id="st-gallen"/.test(card) && /data-kf-checkin="1"/.test(card) && /data-kf-conv="formular_senden"/.test(card), 'gemeinsamer Renderer (ruhig + herbst), fester Standort St. Gallen, Check-in freigegeben, Conversion formular_senden');
  ok(/data-kf-kampagne="sg_tcm360_herbst_2026"/.test(card) && /<input type="hidden" name="kampagne" value="sg_tcm360_herbst_2026">/.test(card) && new RegExp(`<input type="hidden" name="runde" value="${st.rundeId}" data-kf-runde>`).test(card) && ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].every((n) => card.includes(`name="${n}" value="" data-kf-utm`)), `Kampagnenfeld + Runde («${st.rundeId || 'leer'}») + leere UTM-Felder (Client füllt)`);
  ok(/name="quelle" value="herbst-sg"/.test(card) && /name="formular" value="TCM360-Entdeckertage-StGallen"/.test(card) && /name="seite" value="\/standorte\/st-gallen\/"/.test(card), 'Identifier quelle=herbst-sg, Formular TCM360-Entdeckertage-StGallen, Seite');
  ok(card.indexOf('kf-opt--checkin') < card.indexOf('kf-opt--behandlung') && new RegExp(`value="${st.soldOut ? 'behandlung' : 'checkin'}"[^>]*checked`).test(card) && (card.match(/name="terminart"[^>]*checked/g) || []).length === 1, `Kacheln: 360°-Check zuerst, Vorauswahl ${st.soldOut ? 'Erstbehandlung (Runde ausgebucht)' : 'Gratis TCM 360°-Check'}`);
  ok(/value="checkin"[^>]*data-kf-angebot="TCM_CHECKIN"/.test(card) && /value="behandlung"[^>]*data-kf-angebot="ERSTTERMIN_BEHANDLUNG"/.test(card), 'Angebots-IDs der bestehenden Terminarten (keine neue ID)');
  ok(st.soldOut || (/<span class="kf-opt-t">Gratis TCM 360°-Check<\/span><span class="kf-opt-dur">CHF 0\.–/.test(card) && card.includes(HERBST_COPY.tileCheckinD) && /<span class="kf-opt-t">Direkt zur Erstbehandlung<\/span><span class="kf-opt-dur">60 Minuten · kostenpflichtig, nach Tarif<\/span>/.test(card)), 'Kacheltexte: «Gratis TCM 360°-Check · CHF 0.–» / «Direkt zur Erstbehandlung · 60 Minuten · kostenpflichtig»');
  ok(/data-kf-submit-checkin="Gratis 360°-Termin anfragen" data-kf-submit-behandlung="Erstbehandlung anfragen"/.test(card) || st.soldOut, 'Button-Text je Terminart («Gratis 360°-Termin anfragen →» / «Erstbehandlung anfragen →»)');
  ok(st.soldOut || /data-kf-ok-checkin="Deine Anfrage: Gratis TCM 360°-Check in St\. Gallen \(Entdeckertage\)\./.test(card), 'zutreffende Bestätigung für den 360°-Check (keine Buchungszusage)');
  ok(/name="telefon"[^>]*required aria-required="true"/.test(card) && !/name="(name|email|anliegen|wunschzeit)"[^>]*required/.test(card) && card.indexOf('name="telefon"') < card.indexOf('name="name"') && card.indexOf('name="name"') < card.indexOf('name="wunschzeit"') && card.indexOf('name="wunschzeit"') < card.indexOf('data-kf-opt') && /Terminwunsch <span class="kf-opt-l">· optional<\/span>/.test(card), 'Felder: Telefonnummer (Pflicht) → Name → Terminwunsch (optional), Rest hinter «Weitere Angaben»; kein Fragebogen');
  ok(st.soldOut ? /class="kf-soldout"/.test(card) : /<ul class="kf-hb-list">(<li>[^<]+<\/li>){4}<\/ul>/.test(card) && HERBST_COPY.benefits.every((b) => card.includes(`<li>${b}</li>`)), st.soldOut ? 'Ausverkauft-Hinweis im Sheet, reguläre Alternativen bleiben' : 'vier kompakte Vorteile im Sheet-Kopf');
  ok(/<div class="kf-ts" data-kf-ts-lazy data-sitekey="[^"]+"><\/div>/.test(card) && !/class="cf-turnstile/.test(card), 'Turnstile-Container ohne implizites Rendern (lazy beim Öffnen)');
  ok(/<p class="kf-note">Mit deiner Anfrage ist noch kein Termin gebucht\.<\/p><p class="kf-legal kf-legal--kurz"><a href="\/datenschutz\/">Datenschutz<\/a><\/p>/.test(card), 'Hinweis «noch kein Termin gebucht» + Datenschutz-Link');
  ok(/<span class="kf-eyebrow">St\. Gallen Special<\/span><h2 class="kf-h" id="kf-sg-herbst-h">(Dein TCM 360°-Termin|Termin in St\. Gallen anfragen)<\/h2>/.test(card), 'Sheet-Kopf: Label «St. Gallen Special», Überschrift h2');
  // Reguläre SG-Formulare unverändert (Texte des Check-ins).
  const hero = sg.slice(sg.indexOf('data-kf-instance="sg-hero"'), sg.indexOf('/kontakt-form.js', sg.indexOf('data-kf-instance="sg-hero"')));
  ok(/Kostenloser TCM-Check-in<\/span><span class="kf-opt-dur">30 Minuten<\/span>/.test(hero) && !/360|kampagne|runde/.test(hero), 'regulärer Check-in im SG-Hero unverändert (30 Minuten, keine Kampagnenfelder)');
}

console.log('5. API');
const { onRequestPost } = await import('../functions/api/anfrage.js');
const realFetch = globalThis.fetch; const sent = [];
globalThis.fetch = async (url, init) => { if (String(url).includes('turnstile')) return new Response(JSON.stringify({ success: true })); sent.push(JSON.parse(init.body)); return new Response('{}', { status: 200 }); };
const post = async (d) => { const res = await onRequestPost({ request: new Request('https://tcm.ch/api/anfrage', { method: 'POST', body: JSON.stringify(d) }), env: { RESEND_API_KEY: 'x', TURNSTILE_SECRET: 'y' } }); return [res.status, await res.json(), sent[sent.length - 1]]; };
const base = { standort: 'St. Gallen', standort_id: 'st-gallen', quelle: 'herbst-sg', formular: 'TCM360-Entdeckertage-StGallen', seite: '/standorte/st-gallen/', telefon: '+41 79 123 45 67', turnstileToken: 't' };
let [stt, , mail] = await post({ ...base, angebot_id: 'TCM_CHECKIN', kampagne: 'sg_tcm360_herbst_2026', runde: 'runde-2026-10', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'herbst-sg', utm_content: 'banner', wunschzeit: 'Do' });
ok(stt === 200 && mail.subject === 'Neue Anfrage · St. Gallen · Gratis TCM 360°-Check (Entdeckertage) · TCM 360°' && /Terminart<\/strong><\/td><td[^>]*>Gratis TCM 360°-Check \(Entdeckertage\)/.test(mail.html) && !/Dauer<\/strong>/.test(mail.html) && /Kosten<\/strong><\/td><td[^>]*>kostenlos, ohne Behandlung, separat reserviertes 360°-Kontingent/.test(mail.html) && /Gratis TCM 360°-Check · Entdeckertage<\/strong> · St\. Gallen/.test(mail.html), '360°-Check: Terminart/Betreff/Kosten serverseitig als Entdeckertage klassifiziert, keine Dauer-Zeile');
ok(/Kampagne<\/strong><\/td><td[^>]*>TCM 360° Entdeckertage St\. Gallen 2026 \(sg_tcm360_herbst_2026\)/.test(mail.html) && /Buchungsrunde<\/strong><\/td><td[^>]*>runde-2026-10/.test(mail.html) && /UTM Source<\/strong><\/td><td[^>]*>google/.test(mail.html) && /UTM Campaign<\/strong><\/td><td[^>]*>herbst-sg/.test(mail.html) && mail.html.indexOf('Technische Angaben') < mail.html.indexOf('Kampagne<'), 'Kampagne, Buchungsrunde und UTM unter «Technische Angaben»');
[stt, , mail] = await post({ ...base, angebot_id: 'ERSTTERMIN_BEHANDLUNG', kampagne: 'sg_tcm360_herbst_2026', runde: 'runde-2026-10' });
ok(stt === 200 && mail.subject === 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 60 Min. · TCM 360°' && />60 Minuten</.test(mail.html) && /Buchungsrunde<\/strong><\/td><td[^>]*>runde-2026-10/.test(mail.html), 'Erstbehandlung aus dem Sheet: reguläre Terminart (60 Min., kostenpflichtig), Kampagnen-Suffix + Runde');
[stt, , mail] = await post({ ...base, quelle: 'launch-hero-sg', formular: 'Hero-Termin-StGallen', angebot_id: 'TCM_CHECKIN' });
ok(stt === 200 && mail.subject === 'Neue Anfrage · St. Gallen · Kostenloser TCM-Check-in · 30 Min.' && />30 Minuten</.test(mail.html) && !/Kampagne<|Buchungsrunde|360/.test(mail.html), 'regulärer Check-in (SG-Hero) ohne Kampagne: unverändert (30 Min., kein Kampagnenblock)');
[stt, , mail] = await post({ ...base, angebot_id: 'TCM_CHECKIN', kampagne: 'FOO_2026', runde: 'runde-2026-10', utm_source: 'x' });
ok(stt === 200 && !/TCM 360°/.test(mail.subject) && !/Kampagne<|Buchungsrunde|UTM Source/.test(mail.html) && />30 Minuten</.test(mail.html), 'unbekannte Kampagnen-ID: Anfrage geht als regulärer Check-in durch, keine Kampagnenzeilen');
[stt, , mail] = await post({ ...base, standort: 'Wil', standort_id: 'wil', angebot_id: 'ERSTTERMIN_BEHANDLUNG', kampagne: 'sg_tcm360_herbst_2026', utm_source: 'x' });
ok(stt === 200 && !/TCM 360°/.test(mail.subject) && !/Kampagne</.test(mail.html), 'Kampagne an fremdem Standort: ignoriert (kein Label, kein Suffix)');
[stt, , mail] = await post({ ...base, angebot_id: 'TCM_CHECKIN', kampagne: 'sg_tcm360_herbst_2026', runde: 'runde-2026-10"><script>', utm_source: '<b>x</b>\nBetreff', name: 'Test' });
ok(stt === 200 && !/<b>x/.test(mail.html) && /&lt;b&gt;x&lt;\/b&gt; Betreff/.test(mail.html) && /Buchungsrunde<\/strong><\/td><td[^>]*>runde-2026-10script</.test(mail.html) && !/x<\/b>|Betreff|script/.test(mail.subject), 'UTM/Runde escaped bzw. auf a-z0-9- reduziert, nie im Betreff');
[stt] = await post({ ...base, angebot_id: 'TCM_CHECKIN', kampagne: 'sg_tcm360_herbst_2026', telefon: '12' });
ok(stt === 422, 'Validierung unverändert (ungültige Nummer → 422)');
globalThis.fetch = realFetch;

console.log(fails ? `\n${fails} Prüfung(en) fehlgeschlagen` : '\nAlle Prüfungen bestanden');
process.exit(fails ? 1 : 0);
