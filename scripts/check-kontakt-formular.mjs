// Gate: gemeinsames Kontaktformular «Wie können wir dir helfen?» (15.10.2026). Nach `npm run build`:
//   node scripts/check-kontakt-formular.mjs        (statisch + API mit gemocktem Turnstile/Resend)
//   node scripts/test-kontakt-formular.mjs         (Browser-Funktionstest, gemocktes /api/anfrage)
//  1. Konfiguration: Check-in-Freigaben nur für existierende, operative Standorte; OneDoc nur mit eingebettetem Widget.
//  2. Flächen: Homepage, /kontakt/ (TerminForm), operative Standortseiten, SG-Hero + SG unten, allgemeine Leaf-Formulare.
//     Kein allgemeines Altformular übrig (Ausnahmen: Massage-Anfragen, Zürich-Funnel, Vormerk-Formulare nicht operativer Standorte).
//  3. Angebot: Check-in nur dort, wo freigegeben; Pflichttexte exakt; keine FIRST-30-/Frist-/Kapazitätsreste.
//  4. Markup: eindeutige IDs je Seite, echte Radios mit Label, Telefon type=tel Pflicht, optionale Felder ohne required.
//  5. API: Telefon-only, optionale Felder, E-Mail-Validierung, Check-in-Scope, Mail-Klassifikation, historische IDs.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { build } from 'esbuild';
import { TERMINARTEN, CHECKIN_FREIGABE, ONEDOC, checkinStandortNamen, kontaktZiele } from '../src/data/kontakt-angebote.mjs';

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.error('  ✗ ' + m); } else console.log('  ✓ ' + m); };
const r = await build({ stdin: { contents: `export * from './src/data/locations';`, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent' });
const { clinics } = await import('data:text/javascript;base64,' + Buffer.from(r.outputFiles[0].text).toString('base64'));
const read = (p) => readFileSync(p, 'utf8');
const pages = []; const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f === 'index.html' && pages.push(p); } }; walk('dist');
const html = new Map(pages.map((p) => [p, read(p)]));
const text = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

console.log('1. Konfiguration');
for (const [id, f] of Object.entries(CHECKIN_FREIGABE)) {
  const c = clinics.find((x) => x.id === id);
  ok(c && c.status === 'operational' && c.name === f.name && !!f.freigabe, `Check-in-Freigabe ${id}: operativ, Name «${f.name}», Beleg «${f.freigabe}»`);
}
for (const [id, o] of Object.entries(ONEDOC)) {
  const page = html.get(`dist${o.href.split('#')[0]}index.html`) ?? '';
  ok(new RegExp(`id="${o.anchor}"`).test(page) && /onedoc\.ch\/de\/widget/.test(page), `OneDoc ${id}: ${o.href} mit eingebettetem Widget`);
}
ok(TERMINARTEN.checkin.id === 'TCM_CHECKIN' && TERMINARTEN.behandlung.id === 'ERSTTERMIN_BEHANDLUNG' && TERMINARTEN.vormerkung.id === 'VORMERKUNG' && TERMINARTEN.anfrage.id === 'STANDORT_ANFRAGE' && TERMINARTEN.routing.id === 'ROUTING_ANFRAGE', 'Anfrage-IDs stabil (TCM_CHECKIN, ERSTTERMIN_BEHANDLUNG, VORMERKUNG, STANDORT_ANFRAGE, ROUTING_ANFRAGE)');
const Z = kontaktZiele(); const zv = (v) => Z.find((z) => z.value === v);
ok(new Set(Z.map((z) => z.value)).size === Z.length, `${Z.length} kanonische Ziele mit eindeutigem value`);
const badZiel = Z.filter((z) => { const c = clinics.find((x) => x.id === z.id); return z.id !== 'andere' && (!c || (c.status === 'operational' ? z.art !== 'behandlung' || z.value !== c.name : !(c.vorab ?? []).some((o) => o.value === z.value))); });
ok(badZiel.length === 0, 'Ziele = operative Standorte (Name) bzw. vorab-Werte nicht operativer Standorte aus locations.ts');
ok(zv('Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3')?.art === 'behandlung' && zv('Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung')?.art === 'vormerkung' && !zv('Zürich Oerlikon'), 'Oerlikon: Partnerpraxis (Behandlung) und neue Praxis (Vormerkung) getrennt, kein Ziel «Zürich Oerlikon»');
ok(zv('Luzern – Vormerkung, Eröffnung 2027')?.art === 'vormerkung' && zv('Winterthur Münzgasse – Anfrage (Standort in Prüfung)')?.art === 'anfrage' && zv('Andere / in meiner Nähe')?.art === 'routing', 'Luzern Vormerkung · Münzgasse Anfrage · «Andere» Routing');
ok(Z.filter((z) => z.checkin).map((z) => z.value).join() === checkinStandortNamen().join(), 'Check-in nur am regulären Ziel freigegebener Standorte');
const nonOpTreat = Z.filter((z) => z.art === 'behandlung' && clinics.find((c) => c.id === z.id)?.status !== 'operational');
ok(nonOpTreat.every((z) => clinics.find((c) => c.id === z.id).vorab.find((o) => o.value === z.value).art === 'behandlung'), `Behandlung an nicht operativem Standort nur mit expliziter vorab-art (${nonOpTreat.map((z) => z.value).join('; ')})`);

console.log('2. Flächen');
const inst = (s) => [...s.matchAll(/ data-kf-instance="([^"]+)"/g)].map((m) => m[1]);
const has = (p, i) => inst(html.get(p) ?? '').includes(i);
ok(has('dist/index.html', 'home'), 'Homepage');
ok(has('dist/kontakt/index.html', 'terminform'), 'Standard-Kontaktseite /kontakt/');
const sg = html.get('dist/standorte/st-gallen/index.html');
// Herbst-Kennenlerntage (src/data/herbst-sg.ts): bei aktiver Kampagne zusätzlich das Sheet-Formular sg-herbst (Gate: check-herbst-sg.mjs).
const hsgOn = /data-hsg-mode=/.test(sg);
ok(inst(sg).join() === (hsgOn ? 'sg-hero,sg-herbst,sg-unten' : 'sg-hero,sg-unten'), `St. Gallen: genau Hero + unten${hsgOn ? ' + Kampagnen-Sheet' : ''}`);
const opClinics = clinics.filter((c) => c.status === 'operational');
const standortMiss = opClinics.filter((c) => html.has(`dist/standorte/${c.id}/index.html`) && !(html.get(`dist/standorte/${c.id}/index.html`).match(new RegExp(`data-kf-standort-id="${c.id}"`))));
ok(standortMiss.length === 0, `operative Standortseiten mit festem Standort${standortMiss.length ? ': fehlt ' + standortMiss.map((c) => c.id).join(', ') : ''}`);
const tf = pages.filter((p) => has(p, 'terminform')).length;
const leaf = pages.filter((p) => inst(html.get(p)).some((i) => /^leaf|^anfrage/.test(i))).length;
ok(tf >= 250 && leaf >= 170, `TerminForm-Seiten ${tf}, Leaf-/Komponenten-Formulare ${leaf}`);
const ALLOWED_LEGACY = (p, f) => /name="anfrage_typ" value="(massage|zuerich-routing)"/.test(f) || /name="quelle" value="[^"]*massage/.test(f)
  || clinics.some((c) => c.status !== 'operational' && p === `dist/standorte/${c.id}/index.html`);
const legacy = [];
for (const [p, s] of html) for (const m of s.matchAll(/<form class="inline-form"[\s\S]*?<\/form>/g)) if (!ALLOWED_LEGACY(p, m[0])) legacy.push(p.replace('dist', ''));
ok(legacy.length === 0, `kein allgemeines Altformular mehr${legacy.length ? ': ' + legacy.slice(0, 5).join(', ') : ''}`);
const homeSel = (html.get('dist/index.html').match(/<select[^>]*id="kf-home-standort"[\s\S]*?<\/select>/) || [''])[0];
const homeOpts = [...homeSel.matchAll(/<option value="([^"]*)" data-id="([^"]*)" data-art="([^"]*)"/g)].map((m) => [m[1].replace(/&amp;/g, '&'), m[2], m[3]]);
ok(homeOpts.length === Z.length && homeOpts.every(([v, id, a], i) => Z[i].value === v && Z[i].id === id && Z[i].art === a), `globale Auswahl = kanonische Ziele (value, Standort-ID, Zielart; ${homeOpts.length} Optionen)`);
ok((homeSel.match(/ selected/g) || []).length === 0 && !/<option value="Zürich Oerlikon"/.test(homeSel), 'keine Mehrfach-/Pseudo-Vorauswahl in der globalen Auswahl');
const tfOld = pages.filter((p) => /class="tf-form"/.test(html.get(p)));
ok(tfOld.length === 0, 'kein altes TerminForm-Markup (.tf-form)');

console.log('3. Angebot und Texte');
const approved = new Set(Object.keys(CHECKIN_FREIGABE));
const scopeLeaks = [];
for (const [p, s] of html) {
  for (const m of s.matchAll(/<div class="inline-form-card kf[^"]*"[^>]*>[\s\S]*?<script src="\/kontakt-form\.js"/g)) {
    const card = m[0]; const fixed = (card.match(/data-kf-standort-id="([^"]+)"/) || [])[1];
    const tile = /value="checkin"/.test(card);
    if (fixed && tile !== approved.has(fixed)) scopeLeaks.push(`${p.replace('dist', '')} (${fixed})`);
    for (const o of card.matchAll(/<option[^>]*data-checkin="1"[^>]*>([^<]+)</g)) if (!checkinStandortNamen().includes(o[1])) scopeLeaks.push(`${p.replace('dist', '')} option ${o[1]}`);
  }
}
ok(scopeLeaks.length === 0, `Check-in nur an freigegebenen Standorten (${[...approved].join(', ')})${scopeLeaks.length ? ': ' + scopeLeaks.slice(0, 4).join('; ') : ''}`);
const sgHero = sg.slice(sg.indexOf('data-kf-instance="sg-hero"'), sg.indexOf('/kontakt-form.js', sg.indexOf('data-kf-instance="sg-hero"')));
// Volltexte: unteres SG-Formular (unverändert). Der SG-Hero nutzt die kompakte Variante (heroKompakt, unten geprüft).
const sgUnten = sg.slice(sg.indexOf('data-kf-instance="sg-unten"'), sg.indexOf('/kontakt-form.js', sg.indexOf('data-kf-instance="sg-unten"')));
const t = text(sgUnten);
const tH = text(sgHero);
// Kurze Angebotstexte (Mockup 16.10.2026); die bisherigen langen SG-Texte stehen in GONE.
const OFFER = ['Ersttermin mit Behandlung', 'Persönliches Gespräch, TCM-Diagnostik und erste Behandlung.', 'Kostenloser TCM 360°-Check-in', '30 Minuten · CHF 0.–', 'Persönlicher TCM-Kurzcheck mit Zungen- und Pulsdiagnostik, Zeit für deine Fragen und Krankenkassen-Check.', 'Ohne Behandlung. Unverbindlich.'];
const KOPF = ['Dein nächster Schritt beginnt hier.', 'Direkt starten oder TCM zuerst kennenlernen.'];
const OLD_SG = ['Wie können wir dir helfen?', 'Wähle, was gerade zu dir passt.', 'Standort: St. Gallen', 'Noch unsicher?', 'Deine Beschwerden besprechen', 'Mit persönlicher Empfehlung für das weitere Vorgehen.', '30 Minuten für deine Fragen', 'Inklusive Zungen- und Pulsdiagnostik'];
const OFFER_GLOBAL = ['Ersttermin mit Behandlung', 'Persönliches Gespräch, TCM-Diagnostik und erste Behandlung.', 'Kostenloser TCM-Check-in', '30 Minuten', 'Zungen- und Pulsdiagnostik, persönliche Empfehlung und Krankenkassen-Check.', 'Ohne Behandlung.'];
const OLD_OFFER = ['Kostenloser TCM-Check-in · 30 Minuten', 'Finde heraus, ob TCM zu dir passt.', 'Dein Anliegen verstehen.', 'Gespräch zu deinen Beschwerden', 'TCM-Zungen- und Pulsdiagnostik', 'Persönliche Empfehlung zum weiteren Vorgehen', 'Gespräch und erste Behandlung.', 'Für alle, die direkt mit der Behandlung starten möchten.', 'TCM-Anamnese'];
const GONE = [...OLD_OFFER, ...OLD_SG, 'Hilfe bei der Abklärung deiner Zusatzversicherung.', 'Kostenlos · ohne Behandlung · ohne Verpflichtung', 'Deine Angaben verwenden wir nur', 'Mit deiner Anfrage ist noch kein Termin gebucht.', 'Lieber anrufen?', '+41 77 523 61 22', 'oder per WhatsApp schreiben'];
for (const s of [...KOPF, 'Terminart wählen', 'Oder direkt Kontakt aufnehmen', ...OFFER, 'Termin online buchen', 'Direkt bei OneDoc.', 'Weitere Angaben · optional', 'Telefonnummer', 'Wir rufen dich zur Terminvereinbarung zurück.', '* Pflichtfeld', 'Termin anfragen', 'Datenschutz']) ok(tH.includes(s), `SG-Hero: «${s}»`);
for (const [n, x] of [['Hero', tH], ['unten', t]]) ok(GONE.every((s) => !x.includes(s)), `SG ${n}: alte Angebotstexte/Leistungsliste und entfernte Hinweise fehlen (keine Doppelungen)`);
for (const [n, h, x] of [['Hero', sgHero, tH], ['unten', sgUnten, t]]) ok(h.indexOf('kf-opt--behandlung') > 0 && h.indexOf('kf-opt--behandlung') < h.indexOf('kf-opt--checkin') && OFFER.every((s) => x.split(s).length === 2) && (x.match(/30 Minuten/g) || []).length === 1 && !/kf-tag|kf-tagline|kf-benefit|kf-opt-foot|kf-opt-h"|Beliebteste|Empfohlen/.test(h) && /value="behandlung"[^>]*data-kf-angebot="ERSTTERMIN_BEHANDLUNG"/.test(h) && /value="checkin"[^>]*data-kf-angebot="TCM_CHECKIN"/.test(h) && !/name="terminart"[^>]*checked/.test(h), `SG ${n}: Erstbehandlung zuerst, Check-in zweitens; jeder Angebotstext genau 1×, «30 Minuten» 1×, keine Badges/Listen/Labels; Schlüssel unverändert, keine Vorauswahl`);
{ const km = html.get('dist/kontakt/index.html'); const c = (km.match(/<div class="inline-form-card kf[^"]*"[^>]*data-kf-instance="terminform"[\s\S]*?<script src="\/kontakt-form\.js"/) || [''])[0]; const tx = text(c);
  ok(/<section class="tf-section" id="formular"[ >]/.test(km) && /class="inline-form-card kf kf--ruhig" id="kf-terminform"[^>]*data-kf-conv="form_submit" data-kf-global="1"/.test(c) && /<form class="kf-form" novalidate data-kf-form id="terminform"/.test(c) && /<div class="kf-kopf"><h2 class="kf-h" id="kf-terminform-h">Dein nächster Schritt beginnt hier\.<\/h2>/.test(c) && c.indexOf('name="standort"') < c.indexOf('data-kf-ta-h') && c.indexOf('kf-opt--behandlung') < c.indexOf('kf-opt--checkin') && OFFER_GLOBAL.every((s) => tx.split(s).length === 2) && GONE.every((s) => !tx.includes(s)) && !/kf-call|kf-tag|Freie Termine ansehen|data-kf-to-fields/.test(c) && /<div class="kf-alt-wrap" data-kf-alt-wrap hidden>/.test(c) && /<div class="kf-optgroup" id="kf-terminform-opt" hidden>/.test(c) && /name="typ" value="termin"/.test(c), 'Rollout /kontakt/ (TerminForm): ruhige Karte, IDs #formular/#terminform, form_submit, Standort vor Kacheln, kurze Texte, Alternativen erst nach Zielwahl, Zusatzangaben eingeklappt'); }
// Homepage (16.10.2026): gleiche ruhige Gestaltung wie SG, aber globales Formular ohne SG-Standortlogik.
{ const hm = html.get('dist/index.html'); const c = (hm.match(/<div class="inline-form-card kf[^"]*"[^>]*data-kf-instance="home"[\s\S]*?<script src="\/kontakt-form\.js"/) || [''])[0]; const tx = text(c);
  ok(/class="inline-form-card kf kf--ruhig" id="kf-home"[^>]*data-kf-global="1"/.test(c) && !/data-kf-standort=|data-kf-od-mode|data-kf-checkin="1" data-kf-scope|kf--kompakt/.test(c.slice(0, c.indexOf('<form'))) && !/data-kf-od-mode="sg"/.test(c), 'Homepage: ruhige Karte, global (kein fester Standort, keine SG-OneDoc-Logik)');
  ok(new RegExp('aria-labelledby="kf-home-h"><div class="kf-kopf"><h3 class="kf-h" id="kf-home-h">Dein nächster Schritt beginnt hier\\.</h3><p class="kf-kopf-sub">Direkt starten oder TCM zuerst kennenlernen\\.</p></div><div class="kf-field"><label class="kf-label" for="kf-home-standort">Standort <span class="kf-star" aria-hidden="true">\\*</span></label><select[^>]*name="standort" required').test(c) && /<\/select><p class="kf-ferr" id="kf-home-standort-err" hidden><\/p><\/div><p class="kf-intro kf-sec-h" aria-hidden="true" data-kf-ta-h>Terminart wählen<\/p><fieldset/.test(c), 'Homepage: schwarzer Kopf, dann Standortauswahl (roter Stern), dann «Terminart wählen» + Kacheln');
  ok(c.indexOf('kf-opt--behandlung') < c.indexOf('kf-opt--checkin') && OFFER_GLOBAL.every((s) => tx.split(s).length === 2) && GONE.every((s) => !tx.includes(s)) && !/Rückruf anfragen|kf-tag|kf-benefit|kf-opt-foot|kf-call/.test(c) && !/name="terminart"[^>]*checked/.test(c) && !/<option[^>]*selected/.test(c) && /value="behandlung"[^>]*data-kf-angebot="ERSTTERMIN_BEHANDLUNG"/.test(c) && /value="checkin"[^>]*data-kf-angebot="TCM_CHECKIN"/.test(c) && /<span class="kf-scope" data-kf-scope>Derzeit nur in St\. Gallen<\/span>/.test(c) && /data-kf-sg-t="Kostenloser TCM 360°-Check-in" data-kf-sg-dur="30 Minuten · CHF 0\.–"/.test(c) && !/Kostenloser TCM 360°-Check-in<\/span>/.test(c), 'Homepage: Erstbehandlung zuerst, gleiche kurze Texte (je 1×), Check-in mit Freigabe-Hinweis, keine Vorauswahl (Terminart/Standort), keine Badges/Listen/«Rückruf anfragen»; Schlüssel unverändert');
  ok(/<label class="kf-label" for="kf-home-tel">Telefonnummer <span class="kf-star" aria-hidden="true">\*<\/span><\/label><input[^>]*required aria-required="true"/.test(c) && /<button type="button" class="kf-disclose kf-disclose--sub" id="kf-home-opt-btn" aria-expanded="false" aria-controls="kf-home-opt" data-kf-opt>/.test(c) && /<div class="kf-optgroup" id="kf-home-opt" hidden>/.test(c) && !/name="(name|email|anliegen)"[^>]*required/.test(c) && /data-kf-submit-leer="Termin anfragen"/.test(c) && /data-kf-submit>Termin anfragen <span aria-hidden="true">→<\/span><\/button><p class="kf-legal kf-legal--kurz"><a href="\/datenschutz\/">Datenschutz<\/a><\/p>/.test(c), 'Homepage: «Telefonnummer *» einziges Pflichtfeld, «Weitere Angaben · optional» eingeklappt (noscript offen), Button «Termin anfragen →» + Datenschutz-Link');
  const alt = (c.match(/<div class="kf-alt-wrap" data-kf-alt-wrap hidden>[\s\S]*?<\/p><\/div>(?=<\/form>)/) || [''])[0];
  ok(alt && /<p class="kf-od-sep"><span>Oder direkt Kontakt aufnehmen<\/span><\/p><div class="kf-onedoc kf-onedoc--sg" data-kf-onedoc-panel hidden><a class="kf-btn kf-btn--outline" href="#" data-kf-onedoc>/.test(alt) && /<p class="kf-alt" data-kf-kontakt-alt hidden><a href="tel:\+41775236122" data-kf-tel>/.test(alt) && /data-kf-wa="41775236122"/.test(alt) && (c.match(/data-kf-onedoc[ >]/g) || []).length === 1 && (c.match(/data-kf-tel[ >]/g) || []).length === 1 && !/41775236122\?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zur%20Behandlung%20in%20St\.%20Gallen/.test(c), 'Homepage: OneDoc (umrandet) + «Anrufen · WhatsApp» unter dem Button, im HTML verborgen bis ein Ziel gewählt ist; bestehender zentraler WhatsApp-Link, kein SG-WhatsApp');
  ok(/data-id="st-gallen"[^>]*data-checkin="1" data-onedoc="\/standorte\/st-gallen\/#online-buchen"/.test(c) && (c.match(/data-checkin="1"/g) || []).length === 1 && (c.match(/data-onedoc=/g) || []).length === 1, 'Homepage: Check-in-Freigabe und OneDoc-Kalender weiterhin nur am SG-Ziel (keine neuen Buchungswege)'); }
for (const [n, h, id] of [['Hero', sgHero, 'kf-sg-hero'], ['unten', sgUnten, 'kf-sg-unten']]) ok(new RegExp(`<label class="kf-label" for="${id}-tel">Telefonnummer <span class="kf-star" aria-hidden="true">\\*</span></label><input[^>]*name="telefon"[^>]*required aria-required="true"`).test(h)  && /data-kf-submit>[^<]*anfragen <span aria-hidden="true">→<\/span><\/button><p class="kf-legal kf-legal--kurz"><a href="\/datenschutz\/">Datenschutz<\/a><\/p>/.test(h) && !/class="kf-call"|<p class="kf-note"/.test(h) && (h.match(/data-kf-tel[ >]/g) || []).length === (n === 'Hero' ? 1 : 0) && !/name="(name|email|anliegen|wunschzeit)"[^>]*required/.test(h), `SG ${n}: «Telefonnummer *» (Stern, required, aria-required), Button «… anfragen» + kompakter Datenschutz-Link, kein Anrufbereich, Zusatzfelder freiwillig`);
{ const cards = [...html].flatMap(([f, h]) => [...h.matchAll(/<div class="inline-form-card (kf[^"]*)"[^>]*data-kf-instance="([^"]+)"/g)].map((m) => [f, m[1], m[2]]));
  ok(cards.length > 400 && cards.every(([, cls]) => /\bkf--ruhig\b/.test(cls)) && !cards.some(([f]) => f.startsWith('dist/en/')), `Rollout: alle ${cards.length} Patienten-Kontaktformulare (gemeinsamer Renderer) in ruhiger Gestaltung, keine auf EN-Seiten`);
  const sp = (f, re) => re.test(html.get(f) || '') && !/data-kf-instance/.test((html.get(f) || '').match(re)?.[0] ?? '');
  ok(/<form class="inline-form" onsubmit="submitInlineFormGeneric\(event, this\)">/.test(html.get('dist/massage-basel/index.html')) && /<form class="inline-form" data-contact-form novalidate="">/.test(html.get('dist/standorte/zuerich-oerlikon/index.html')) && /data-lu-waitlist/.test(html.get('dist/standorte/luzern/index.html')) && /id="pt-form"/.test(html.get('dist/karriere/index.html')) && /id="pl-form"/.test(html.get('dist/partner/index.html')) && /id="en-contact-form"/.test(html.get('dist/en/contact/index.html')) && ![...html].some(([f, h]) => f.startsWith('dist/en/') && /kf--ruhig|Dein nächster Schritt/.test(h)), 'Spezialabläufe behalten ihre Handler (Massage submitInlineFormGeneric, Zürich-Funnel/Vorbereitung data-contact-form, Wartelisten), EN-Formulare ohne deutsche Texte'); }
// Gemeinsame Hülle (16.10.2026): Massage-Anfragen, Zürich-Funnel, Standorte in Vorbereitung/Prüfung, Wartelisten.
{ const HUELLE = [['massage', 'dist/massage-basel/index.html', /<form class="inline-form" onsubmit="submitInlineFormGeneric\(event, this\)">/, /name="anfrage_typ" value="massage"/],
    ['zuerich-funnel', 'dist/akupunktur-tcm-zuerich/index.html', /<form class="inline-form" data-contact-form novalidate="">/, /name="anfrage_typ" value="zuerich-routing"[\s\S]*name="formular" value="Zürich-Funnel"/],
    ['vorbereitung', 'dist/standorte/zuerich-oerlikon/index.html', /<form class="inline-form" data-contact-form novalidate="">/, /name="behandlung"/],
    ['pruefung', 'dist/standorte/winterthur-muenzgasse/index.html', /<form class="inline-form" data-contact-form novalidate="">/, /name="behandlung"/],
    ['warteliste', 'dist/standorte/bern/index.html', /<form class="be-wl-form" data-be-interesse novalidate/, /name="quelle" value="warteliste-bern"/],
    ['warteliste', 'dist/standorte/luzern/index.html', /<form class="lu-wl-form" data-lu-waitlist novalidate/, /name="quelle" value="warteliste-luzern"/],
    ['warteliste', 'dist/massage-luzern/index.html', /<form class="mw-form" data-mw-waitlist novalidate/, /name="quelle" value="warteliste-luzern-massage"/]];
  for (const [fam, f, form, hid] of HUELLE) { const h = html.get(f) || ''; const c = (h.match(new RegExp(`<div class="[^"]*\\bkf kf--ruhig kf-huelle"[^>]*data-kf-huelle="${fam}"[\\s\\S]*?<\\/form>\\s*<script[^>]*>\\(function\\(c\\)\\{var e=c&&c\\.querySelector\\('\\.cf-turnstile'\\);if\\(e&&e\\.clientWidth&&e\\.clientWidth<300\\)e\\.setAttribute\\('data-size','compact'\\)\\}\\)\\(document\\.currentScript\\.parentNode\\)<\\/script>`)) || [''])[0];
    ok(c && /<link rel="stylesheet" href="\/kontakt-form\.css"/.test(c) && /<div class="kf-kopf"[^>]*>\s*<h[23] class="kf-h[^"]*"[^>]*>[^<]+<\/h[23]>\s*<p class="kf-kopf-sub"[^>]*>[^<]+<\/p>\s*<\/div>/.test(c) && form.test(c) && hid.test(c) && !/data-kf-instance|kf-opt--checkin|TCM-Check-in/.test(c) && !/(^|[^-])data-kf[ >=]/.test(c), `Hülle ${fam} (${f.replace('dist', '').replace('index.html', '')}): Karte/Kopf/Turnstile-Kompaktgrösse, eigener Handler und Routing-Felder erhalten, keine Check-in-Kachel, kein gemeinsames Formular-Skript`); }
  const wl = ['dist/standorte/bern/index.html', 'dist/standorte/luzern/index.html', 'dist/massage-luzern/index.html'].map((f) => text((html.get(f).match(/data-kf-huelle="warteliste"[\s\S]*?<\/form>/) || [''])[0]));
  ok(wl.every((t) => !/Termin anfragen|Ersttermin|Diagnostik|Einschätzung|Behandlung buchen/.test(t)), 'Wartelisten: keine Termin-/Behandlungs-/Diagnostik-Formulierungen (Vormerkung bleibt Vormerkung)');
  ok(['dist/karriere/index.html', 'dist/partner/index.html', 'dist/partner/praxisnachfolge/index.html', 'dist/zuweisen/index.html', 'dist/akademie/index.html', 'dist/club/index.html', 'dist/community/index.html', 'dist/visuals/index.html'].every((f) => !/ data-kf-huelle="| data-kf-instance="/.test(html.get(f) || '')) && ![...html].some(([f, h]) => f.startsWith('dist/en/') && / data-kf-huelle="| data-kf-instance="/.test(h)), 'Ausnahmen ohne Hülle: Karriere, Partner, Praxisnachfolge, Zuweisen, Akademie, Club, Community, Visuals; EN-Formulare unverändert'); }
ok(!tH.includes('Wähle, was gerade zu dir passt.') && /class="kf-intro kf-sec-h" aria-hidden="true">Terminart wählen<\/p>/.test(sgHero) && /<p class="kf-ferr" id="kf-sg-hero-ta-err" hidden><\/p><\/fieldset><div class="kf-fields" id="kf-sg-hero-fields"/.test(sgHero) && /<p class="kf-intro kf-sec-h" aria-hidden="true">Terminart wählen<\/p>/.test(sgUnten) && /<p class="kf-ferr" id="kf-sg-unten-ta-err" hidden><\/p><\/fieldset><div class="kf-fields" id="kf-sg-unten-fields"/.test(sgUnten) && !/Rückruf anfragen|kf-sec-h--2/.test(sgHero.replace('Lieber Rückruf anfragen', '') + sgUnten) && !/kf-step/.test(sgHero + sgUnten), 'SG beide: schlichte Überschrift «Terminart wählen», nach den Kacheln direkt das Telefonfeld (keine Zwischenüberschrift «Rückruf anfragen»), keine nummerierten Schrittmarker');
for (const [n, h] of [['Hero', sgHero]]) ok(/<\/div><p class="kf-od-sep"><span>Oder direkt Kontakt aufnehmen<\/span><\/p><div class="kf-onedoc kf-onedoc--sg"[^>]*data-kf-od-sekundaer[^>]*><a class="kf-btn kf-btn--outline"[^>]*data-kf-onedoc[^]*?<p class="kf-hint">Direkt bei OneDoc\.<\/p><p class="kf-alt" data-kf-kontakt-alt><a href="tel:\+41775236122" data-kf-tel><svg class="kf-alt-ic"[^>]*aria-hidden="true" focusable="false"><path d="M22 16\.92[^]*?<\/svg><span>Anrufen<\/span><\/a><span class="kf-alt-sep" aria-hidden="true">·<\/span><a href="https:\/\/wa\.me\/41775236122\?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zur%20Behandlung%20in%20St\.%20Gallen\." target="_blank" rel="noopener"><svg class="kf-alt-ic"[^>]*aria-hidden="true" focusable="false"><path d="M17\.472[^]*?<\/svg><span>WhatsApp<\/span><\/a><\/p><\/div><\/form><script>\(function\(e\)\{[^]*?<\/script><script src="$/.test(h) && (h.match(/data-kf-onedoc /g) || []).length === 1 && !/data-kf-to-fields/.test(h) && h.indexOf('data-kf-submit') < h.indexOf('kf-od-sep'), `SG ${n}: «Oder direkt Kontakt aufnehmen» → OneDoc (umrandet, 1×) → Textlinks «Anrufen · WhatsApp» mit dekorativen Bestands-Icons (Telefonhörer, WhatsApp-Logo; tel:+41775236122, kanonisches SG-WhatsApp, Punkt dekorativ); Formular endet danach`);
ok(!/data-kf-onedoc|kf-od-sep|data-kf-od-mode|kf-alt|Oder direkt|Anrufen|WhatsApp|Termin online buchen|Direkt bei OneDoc/.test(sgUnten) && /data-kf-submit>Termin anfragen <span aria-hidden="true">→<\/span><\/button><p class="kf-legal kf-legal--kurz"><a href="\/datenschutz\/">Datenschutz<\/a><\/p><p class="kf-err" role="alert" data-kf-err hidden><\/p><\/div><\/form><script>\(function\(e\)\{[^]*?<\/script><script src="$/.test(sgUnten) && /<section class="section" id="online-buchen"/.test(sg) && sg.indexOf('id="online-buchen"') > sg.indexOf('data-kf-instance="sg-unten"'), 'SG unten: ohne OneDoc-Alternativbereich, endet nach Anfragebutton + Datenschutz; OneDoc-Widget #online-buchen folgt erhalten');
for (const [n, h, id, tag] of [['Hero', sgHero, 'kf-sg-hero', 'h2'], ['unten', sgUnten, 'kf-sg-unten', 'h3']]) ok(new RegExp(`aria-labelledby="${id}-h"><div class="kf-kopf"><${tag} class="kf-h" id="${id}-h">Dein nächster Schritt beginnt hier\\.</${tag}><p class="kf-kopf-sub">Direkt starten oder TCM zuerst kennenlernen\\.</p></div><p class="kf-intro kf-sec-h" aria-hidden="true">Terminart wählen</p><fieldset`).test(h) && (h.match(/class="kf-kopf"/g) || []).length === 1 && !/<img|logo/i.test(h.slice(h.indexOf('kf-kopf'), h.indexOf('</div>', h.indexOf('kf-kopf')))), `SG ${n}: schwarzer Kopf (Überschrift ${tag} = Formularname, Subline), ohne Logo; darauf direkt «Terminart wählen» + Kacheln`);
ok(!/kf-ort/.test(sgHero + sgUnten) && !/data-kf-to-fields/.test(sgHero) && /class="inline-form-card kf kf--kompakt kf--ruhig" id="offer-form"[^>]*data-kf-instance="sg-hero"/.test(sg) && /class="inline-form-card kf kf--ruhig" id="kf-sg-unten"/.test(sg), 'SG beide ohne «Standort:»; Hero ohne Anfrage-Sprunglink; unteres Formular nicht kompakt; beide ruhig');
ok(!/data-kf-rr|kf-sg-hero-rr-btn|Lieber Rückruf anfragen|aria-controls="kf-sg-hero-fields"/.test(sgHero) && !/<div class="kf-fields" id="kf-sg-hero-fields"[^>]*hidden/.test(sgHero) && /<button type="submit"[^>]*data-kf-submit>Termin anfragen <span aria-hidden="true">→<\/span><\/button>/.test(sgHero) && /data-kf-submit-leer="Termin anfragen"/.test(sg), 'SG-Hero: Rückruf-Bereich im HTML offen, ohne Öffnungsbutton/Disclosure-Attribute; Button ohne Auswahl «Termin anfragen»');
ok(/<button type="button" class="kf-disclose kf-disclose--sub" id="kf-sg-hero-opt-btn" aria-expanded="false" aria-controls="kf-sg-hero-opt" data-kf-opt>/.test(sgHero) && /<noscript><style>#kf-sg-hero-opt\{display:block!important\}#kf-sg-hero-opt-btn\{display:none!important\}<\/style><\/noscript><div class="kf-optgroup" id="kf-sg-hero-opt" hidden>/.test(sgHero), 'SG-Hero: «Weitere Angaben · optional» echter Button, im HTML eingeklappt (kein Layoutsprung), ohne JS per noscript offen');
ok(!/data-kf-opt|data-kf-rr|kf-optgroup|kf-fields"[^>]*hidden/.test(sgUnten) && /data-kf-submit>Termin anfragen <span/.test(sgUnten), 'unteres SG-Formular: vollständig offen, ohne Disclosures; Button ohne Auswahl «Termin anfragen»');
ok(sgHero.indexOf('data-kf-submit>') < sgHero.indexOf('kf-legal--kurz') && sgHero.indexOf('class="cf-turnstile') > sgHero.indexOf('data-kf-err'), 'Hero: Datenschutz-Link direkt unter dem Anfragebutton, Turnstile ausserhalb des Feldbereichs');
ok(!/Unverbindliche Anfrage\. Ein Termin ist erst nach unserer Bestätigung vereinbart\./.test(sg) && !/<b>Geöffnet:<\/b>/.test(sg.slice(0, sg.indexOf('data-kf-instance="sg-hero"'))) && /Mo – Sa 07:30-19:30|Mo-Sa 07:30-19:30/.test(sg), 'linke Hero-Hälfte ohne «Unverbindliche Anfrage…» und «Geöffnet:»; Öffnungszeiten in «Über die Praxis»/Schema erhalten');
for (const s of [...KOPF, 'Terminart wählen', ...OFFER,
  'Telefonnummer', 'Wir rufen dich zur Terminvereinbarung zurück.', 'Dein Name', 'E-Mail', 'Dein Anliegen', 'Wunschzeit', '* Pflichtfeld', 'Termin anfragen', 'Datenschutz']) ok(t.includes(s), `Text: «${s}»`);
ok(/placeholder="Deine Telefonnummer"/.test(sgHero) && /placeholder="Vor- und Nachname"/.test(sgHero) && /placeholder="name@beispiel\.ch"/.test(sgHero) && /placeholder="Was möchtest du uns mitgeben\?"[^>]*>|rows="2"[^>]*placeholder="Was möchtest du uns mitgeben\?"/.test(sgHero), 'Platzhalter exakt, Anliegen zweizeilig');
// SG-Seite: beide Terminarten über OneDoc, EIN Buchungselement je Instanz, gemeinsame SG-Auswahl solange keine
// verifizierten Direktlinks konfiguriert sind (keine geratenen OneDoc-Links/Parameter).
const sgCards = [...sg.matchAll(/<div class="inline-form-card kf[^"]*"[^>]*data-kf-instance="(sg-hero)"[\s\S]*?<script src="\/kontakt-form\.js"/g)].map((m) => m[0]);
ok(sgCards.length === 1 && sgCards.every((c) => (c.match(/data-kf-onedoc[ >]/g) || []).length === 1 && /data-kf-od-mode="sg"/.test(c) && !/data-kf-onedoc-panel[^>]*hidden/.test(c.match(/<div class="kf-onedoc[^>]*>/)[0])), 'SG Hero: genau ein OneDoc-Element, schon ohne Auswahl sichtbar (unten bewusst keins)');
ok(ONEDOC['st-gallen'].direkt.checkin === null && ONEDOC['st-gallen'].direkt.behandlung === null ? sgCards.every((c) => !/data-kf-od-(checkin|behandlung)=/.test(c) && /data-kf-od-default="\/standorte\/st-gallen\/#online-buchen"/.test(c)) : true, 'ohne verifizierte Direktlinks: gemeinsame SG-Auswahl, keine termintyp-spezifischen Ziele im Markup');
const globalCards = [...html.entries()].filter(([p]) => p !== 'dist/standorte/st-gallen/index.html').map(([, s]) => s).filter((s) => /data-kf-od-mode="sg"/.test(s));
{ const lp = html.get('dist/akupunktur-tcm-st-gallen/index.html');
  ok(globalCards.length === 0 && ![...html].some(([, h]) => /Freie Termine ansehen|Ersttermin mit Behandlung direkt bei OneDoc buchen/.test(h)) && /<div class="kf-alt-wrap" data-kf-alt-wrap data-kf-alt-tel="\+41 77 523 61 22"><p class="kf-od-sep"><span>Oder direkt Kontakt aufnehmen<\/span><\/p><div class="kf-onedoc kf-onedoc--sg" data-kf-onedoc-panel hidden><a class="kf-btn kf-btn--outline" href="\/standorte\/st-gallen\/#online-buchen" data-kf-onedoc data-kf-onedoc-anchor="online-buchen">/.test(lp), 'Rollout: OneDoc nur mit konfiguriertem Kalender, umrandet im Alternativblock, nur bei Behandlung (SG-Landingpage); kein SG-OneDoc-Modus ausserhalb der SG-Seite'); }
ok(/text-transform:uppercase/.test(read('public/kontakt-form.css').match(/\.kf-tag\{[^}]*\}/)[0]), 'Label als KOSTENLOSER TCM-CHECK-IN (Versalien per CSS)');
// Kampagnen-Blöcke der Herbst-Kennenlerntage (Banner, Sheet, Sticky; je mit Endmarker data-hsg-end) haben ihre eigene,
// verifizierte Frist (check-herbst-sg.mjs) und werden hier ausgeklammert; der Rest der SG-Seite bleibt frist- und kapazitätsfrei.
const visSg = text(sg.replace(/<(section|dialog|div)\b[^>]*\sdata-hsg\b[\s\S]*?<i hidden data-hsg-end><\/i>/g, ' '));
ok(!/31\. Oktober|FIRST 30|Vorweihnacht|Weihnachten|limitierte|Nur noch \d|geschenkt/i.test(visSg), 'SG sichtbar ohne FIRST-30-, Weihnachts-, Frist- oder Kapazitätstexte (ausserhalb der Kampagnen-Blöcke)');
const allVis = [...html.values()].filter((s) => /data-kf-instance/.test(s)).map((s) => text(s.slice(s.indexOf('data-kf-instance'))));
ok(!allVis.some((v) => /inkl\.? Behandlung|Behandlung inklusive|garantiert|Rückerstattung garantiert/i.test(v)), 'keine Behandlungs-, Garantie- oder Erstattungszusage im Formular');

console.log('4. Markup');
const dupPages = [];
for (const [p, s] of html) { if (!/data-kf-instance/.test(s)) continue; const ids = [...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]); const d = ids.filter((x, i) => ids.indexOf(x) !== i); if (d.length) dupPages.push(`${p.replace('dist', '')}: ${[...new Set(d)].join(',')}`); }
ok(dupPages.length === 0, `eindeutige IDs auf allen Formularseiten${dupPages.length ? ': ' + dupPages.slice(0, 3).join(' | ') : ''}`);
ok((sgHero.match(/<input class="kf-radio" type="radio" name="terminart"/g) || []).length === 2 && (sgHero.match(/<label class="kf-opt[^"]*" for="kf-sg-hero-ta-(checkin|behandlung)"/g) || []).length === 2 && !/<select[^>]*terminart/.test(sgHero), 'echte Radios mit vollständig antippbaren Labels, kein Dropdown');
ok(!/name="terminart"[^>]*checked/.test(sgHero), 'SG-Hero: keine automatische Vorauswahl');
ok(/name="telefon" type="tel" inputmode="tel" autocomplete="tel"[^>]*required/.test(sgHero) && !/name="(name|email|anliegen)"[^>]*required/.test(sgHero), 'Telefon type/inputmode tel + Pflicht; Name/E-Mail/Anliegen optional');
ok(/class="cf-turnstile/.test(sgHero) && /name="website"/.test(sgHero) && /href="\/datenschutz\/"/.test(sgHero), 'Turnstile, Honeypot, Datenschutzlink');
// Turnstile in ruhigen Karten: Standard-Widget (300 px) nur, wenn es passt; sonst offizielle Grösse «compact», gesetzt vor dem
// impliziten Rendern. Kein Verstecken/Clipping des Widgets, Token-Feld und Container unverändert; andere Formulare unverändert.
{ const SZ = `<script>(function(e){if(e&&e.clientWidth&&e.clientWidth<300)e.setAttribute('data-size','compact')})(document.currentScript.parentNode.querySelector('.kf-ts'))</script><script src="/kontakt-form.js" defer></script></div>`;
  const TS = /<div class="cf-turnstile kf-ts" data-sitekey="[^"]+" data-appearance="interaction-only"><\/div>/g;
  const home = html.get('dist/index.html'), km = html.get('dist/kontakt/index.html');
  // Kampagnen-Sheet (kf--herbst): Turnstile wird beim Öffnen explizit gerendert (Grösse dort entschieden), daher ohne Inline-Script.
  const cardsN = [...html].reduce((n, [, h]) => n + (h.match(/<div class="inline-form-card kf(?![^"]*kf--herbst)[^"]*"[^>]*data-kf-instance=/g) || []).length, 0), szN = [...html].reduce((n, [, h]) => n + (h.match(/e\.setAttribute\('data-size','compact'\)\}\)\(document\.currentScript\.parentNode\.querySelector\('\.kf-ts'\)\)<\/script><script src="\/kontakt-form\.js" defer><\/script><\/div>/g) || []).length, 0);
  ok(home.split(SZ).length === 2 && sg.split(SZ).length === 3 && (home.match(TS) || []).length === 1 && (sg.match(TS) || []).length === 2 && (km.match(TS) || []).length === 1 && szN === cardsN && !/data-kf-ts-state|data-before-interactive-callback|data-size="/.test(sg + home + km), `Turnstile: alle ${cardsN} ruhigen Karten setzen bei < 300 px Platz die Grösse «compact» (am Kartenende, vor dem Rendern); Container/Token unverändert`); }
const js = read('public/kontakt-form.js');
const iOk = js.indexOf("if (!(res.ok && res.j && res.j.ok))"); const iConv = js.indexOf("event: 'formular_senden'"); const iConv2 = js.indexOf("event: 'form_submit'");
ok(iOk > 0 && iConv > iOk && iConv2 > iOk && (js.match(/event: 'formular_senden'/g) || []).length === 1 && (js.match(/event: 'form_submit'/g) || []).length === 1, 'Conversion-Events nur nach Server-Bestätigung, je genau eine Push-Stelle');
ok(!/telefon|email|anliegen|name:/.test(js.slice(js.indexOf("event: 'formular_senden'") - 10, js.indexOf("event: 'formular_senden'") + 160)), 'Conversion-Event ohne Telefon/E-Mail/Name/Anliegen');
ok(!/first30_/.test(js), 'kein first30_*-Event für neue Anfragen');
ok(!/gtag\s*\(/.test(js.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '')), 'genau ein Versandweg: kein gtag()-Aufruf neben dataLayer.push');
ok(/data\.standort = tg\.value; data\.standort_id = tg\.id;/.test(js) && !/standort: data\.standort/.test(js), 'Client sendet kanonischen value + Standort-ID; Analytics nur Standort-ID');

console.log('5. API (Turnstile + Resend gemockt)');
const { onRequestPost } = await import('../functions/api/anfrage.js');
const realFetch = globalThis.fetch; const sent = [];
globalThis.fetch = async (url, init) => { if (String(url).includes('turnstile')) return new Response(JSON.stringify({ success: true })); sent.push(JSON.parse(init.body)); return new Response('{}', { status: 200 }); };
const post = async (d) => { const res = await onRequestPost({ request: new Request('https://tcm.ch/api/anfrage', { method: 'POST', body: JSON.stringify(d) }), env: { RESEND_API_KEY: 'x', TURNSTILE_SECRET: 'y' } }); return [res.status, await res.json(), sent[sent.length - 1]]; };
const base = { standort: 'St. Gallen', quelle: 'launch-hero-sg', turnstileToken: 't' };
let [st, j, mail] = await post({ ...base, telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN' });
ok(st === 200 && /KOSTENLOSER TCM-CHECK-IN/.test(mail.html) && /Kostenloser TCM-Check-in – St\. Gallen/.test(mail.html) && mail.subject === 'Neue Anfrage · St. Gallen · Kostenloser TCM-Check-in · 30 Min.' && />30 Minuten</.test(mail.html) && />kostenlos, ohne Behandlung</.test(mail.html) && !mail.reply_to && !/>Name</.test(mail.html), 'nur Telefon + Check-in SG → 200, Betreff/Dauer/Kosten aus Terminart, kein reply_to, kein erfundener Name');
[st, j, mail] = await post({ ...base, telefon: '0041 79 123 45 67', angebot_id: 'ERSTTERMIN_BEHANDLUNG', name: 'Test', email: 'a@b.ch', anliegen: 'Rücken', wunschzeit: 'Do' });
ok(st === 200 && /ERSTTERMIN MIT BEHANDLUNG/.test(mail.html) && mail.reply_to === 'a@b.ch' && /Wunschzeit/.test(mail.html) && /Rücken/.test(mail.html) && mail.subject === 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 60 Min.' && />60 Minuten</.test(mail.html) && />kostenpflichtig, Abrechnung nach Tarif</.test(mail.html), 'Behandlung mit allen optionalen Feldern → 200, reply_to, Wunschzeit/Anliegen, 60 Minuten, kostenpflichtig');
[st, j] = await post({ ...base, standort: 'Wil', quelle: 'Beschwerde: Akne', telefon: '+49 30 1234 5678', angebot_id: 'ERSTTERMIN_BEHANDLUNG' });
ok(st === 200, 'Behandlung an anderem Standort, internationale Nummer → 200');
// Neutraler SG-Hero-Identifier (21.10.2026): Terminart/Dauer/Kosten NUR aus der Angebots-ID, Formularname nur unter «Technische Angaben».
const heroNeu = { ...base, formular: 'Hero-Termin-StGallen', quelle_detail: 'Hero St. Gallen · reguläres Terminformular', seite: '/standorte/st-gallen/', telefon: '+41 79 123 45 67' };
[st, j, mail] = await post({ ...heroNeu, angebot_id: 'ERSTTERMIN_BEHANDLUNG' });
ok(st === 200 && mail.subject === 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 60 Min.' && />60 Minuten</.test(mail.html) && />kostenpflichtig, Abrechnung nach Tarif</.test(mail.html) && /Formular<\/strong><\/td><td[^>]*>Hero-Termin-StGallen</.test(mail.html) && /Quelle \(Detail\)<\/strong><\/td><td[^>]*>Hero St\. Gallen · reguläres Terminformular</.test(mail.html) && /Seite<\/strong><\/td><td[^>]*>\/standorte\/st-gallen\//.test(mail.html) && !/Gratis|30min|30 Minuten/.test(mail.html), 'SG-Hero neutral, Ersttermin mit Behandlung: 60 Min., kostenpflichtig; Formular «Hero-Termin-StGallen» nur technisch, kein «Gratis/30min»');
[st, j, mail] = await post({ ...heroNeu, angebot_id: 'TCM_CHECKIN' });
ok(st === 200 && mail.subject === 'Neue Anfrage · St. Gallen · Kostenloser TCM-Check-in · 30 Min.' && />30 Minuten</.test(mail.html) && />kostenlos, ohne Behandlung</.test(mail.html) && /Formular<\/strong><\/td><td[^>]*>Hero-Termin-StGallen</.test(mail.html), 'SG-Hero neutral, Check-in: 30 Min., kostenlos; gleicher Formularname, Klassifikation aus der Angebots-ID');
[st, j, mail] = await post({ ...base, formular: 'Hero-Gratis-30min-StGallen', quelle_detail: 'Hero St. Gallen Neueroeffnung', seite: '/standort/st-gallen', telefon: '+41 79 123 45 67', angebot_id: 'ERSTTERMIN_BEHANDLUNG' });
ok(st === 200 && mail.subject === 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 60 Min.' && /Hero-Gratis-30min-StGallen/.test(mail.html), 'historischer Formularname aus offenen Tabs weiterhin zustellbar (nur technisch)');
const before = sent.length;
for (const [label, body, code] of [
  ['ungültige Nummer', { ...base, telefon: '12', angebot_id: 'TCM_CHECKIN' }, 'invalid_phone'],
  ['ohne Telefon', { ...base, angebot_id: 'ERSTTERMIN_BEHANDLUNG', name: 'X', email: 'a@b.ch' }, 'invalid_phone'],
  ['ungültige E-Mail', { ...base, telefon: '+41 79 123 45 67', email: 'kaputt', angebot_id: 'TCM_CHECKIN' }, 'invalid_email'],
  ['Check-in Basel', { ...base, standort: 'Basel', telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN' }, 'invalid_offer_scope'],
  ['Check-in «Andere»', { ...base, standort: 'Andere / in meiner Nähe', telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN' }, 'invalid_offer_scope'],
  ['ohne Standort', { ...base, standort: '', telefon: '+41 79 123 45 67', angebot_id: 'ERSTTERMIN_BEHANDLUNG' }, 'missing_standort'],
]) { [st, j] = await post(body); ok(st === 422 && j.error === code, `${label} → 422 ${code}`); }
ok(sent.length === before, 'abgelehnte Anfragen erzeugen keine Mail');
const tel = '+41 79 123 45 67'; const P = 'Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3', N = 'Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung';
const LU = 'Luzern – Vormerkung, Eröffnung 2027', MZ = 'Winterthur Münzgasse – Anfrage (Standort in Prüfung)', AN = 'Andere / in meiner Nähe';
for (const [label, ort, id, angebot, code, art] of [
  ['Oerlikon Partnerpraxis + Ersttermin', P, 'zuerich-oerlikon', 'ERSTTERMIN_BEHANDLUNG', 200, 'ERSTTERMIN MIT BEHANDLUNG'],
  ['Oerlikon neue Praxis + Vormerkung', N, 'zuerich-oerlikon', 'VORMERKUNG', 200, 'VORMERKUNG (STANDORT NOCH NICHT OFFEN)'],
  ['Luzern + Vormerkung', LU, 'luzern', 'VORMERKUNG', 200, 'VORMERKUNG (STANDORT NOCH NICHT OFFEN)'],
  ['Münzgasse + Anfrage', MZ, 'winterthur-muenzgasse', 'STANDORT_ANFRAGE', 200, 'ANFRAGE (STANDORT IN PRÜFUNG)'],
  ['«Andere» + Routing', AN, 'andere', 'ROUTING_ANFRAGE', 200, 'ROUTING-ANFRAGE (KEIN STANDORT GEWÄHLT)'],
  ['Oerlikon neue Praxis + Ersttermin', N, 'zuerich-oerlikon', 'ERSTTERMIN_BEHANDLUNG', 'invalid_offer_scope'],
  ['Oerlikon Partnerpraxis + Check-in', P, 'zuerich-oerlikon', 'TCM_CHECKIN', 'invalid_offer_scope'],
  ['Oerlikon Partnerpraxis + Vormerkung', P, 'zuerich-oerlikon', 'VORMERKUNG', 'invalid_offer_scope'],
  ['Luzern + Ersttermin', LU, 'luzern', 'ERSTTERMIN_BEHANDLUNG', 'invalid_offer_scope'],
  ['Luzern + Check-in', LU, 'luzern', 'TCM_CHECKIN', 'invalid_offer_scope'],
  ['Münzgasse + Ersttermin', MZ, 'winterthur-muenzgasse', 'ERSTTERMIN_BEHANDLUNG', 'invalid_offer_scope'],
  ['«Andere» + Ersttermin', AN, 'andere', 'ERSTTERMIN_BEHANDLUNG', 'invalid_offer_scope'],
  ['St. Gallen + Vormerkung', 'St. Gallen', 'st-gallen', 'VORMERKUNG', 'invalid_offer_scope'],
  ['Basel + Routing', 'Basel', 'basel', 'ROUTING_ANFRAGE', 'invalid_offer_scope'],
  ['Pseudo-Ziel «Zürich Oerlikon»', 'Zürich Oerlikon', undefined, 'ERSTTERMIN_BEHANDLUNG', 'invalid_standort'],
  ['unbekannter Ort', 'Fakeort', undefined, 'ERSTTERMIN_BEHANDLUNG', 'invalid_standort'],
  ['manipulierter Label-Text', 'Luzern (Eröffnung 2027)', undefined, 'VORMERKUNG', 'invalid_standort'],
  ['Standort-ID passt nicht zum Ziel', 'St. Gallen', 'basel', 'TCM_CHECKIN', 'invalid_standort'],
]) {
  const n0 = sent.length; const body = { ...base, quelle: '/', standort: ort, telefon: tel, angebot_id: angebot, ...(id ? { standort_id: id } : {}) };
  [st, j, mail] = await post(body);
  if (code === 200) ok(st === 200 && sent.length === n0 + 1 && mail.html.includes(`>${art}<`) && mail.html.includes(`>${ort}<`) && mail.html.includes(`>${id}<`) && mail.subject.startsWith('Neue Anfrage · ') && !/\[/.test(mail.subject), `${label} → 200, Mail «${art}», Standort kanonisch + ID, Betreff ohne Formularpräfix`);
  else ok(st === 422 && j.error === code && sent.length === n0, `${label} → 422 ${code}, keine Mail`);
}
[st, j, mail] = await post({ ...base, telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN', angebot: 'GRATIS FÜR IMMER' });
ok(st === 200 && !/GRATIS FÜR IMMER/.test(mail.html), 'Angebotstext kommt nie vom Client');
[st, j, mail] = await post({ ...base, telefon: '+41 79 123 45 67', angebot_id: 'FIRST30_WINTER_2026_SG' });
ok(st === 200 && /FIRST 30 PRE-CHRISTMAS EDITION/.test(mail.html), 'historische FIRST-30-ID aus offenem Tab weiter zustellbar (unverändert klassifiziert)');
globalThis.fetch = realFetch;

console.log(fails ? `\n${fails} Fehler` : '\nKontaktformular-Gate: 0 Fehler');
process.exit(fails ? 1 : 0);
