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
import { TERMINARTEN, CHECKIN_FREIGABE, ONEDOC, checkinStandortNamen, kontaktZiele, HWANG_ZIEL } from '../src/data/kontakt-angebote.mjs';

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
const badZiel = Z.filter((z) => { const c = clinics.find((x) => x.id === z.id); return z.id !== 'andere' && !(HWANG_ZIEL[z.id] && z.value === HWANG_ZIEL[z.id].value && z.art === 'behandlung' && !z.checkin) && (!c || (c.status === 'operational' ? z.art !== 'behandlung' || z.value !== c.name : !(c.vorab ?? []).some((o) => o.value === z.value))); });
ok(badZiel.length === 0, 'Ziele = operative Standorte (Name) bzw. vorab-Werte nicht operativer Standorte aus locations.ts');
ok(zv('Zürich Oerlikon')?.art === 'behandlung' && zv('Zürich Bahnhofstrasse')?.art === 'behandlung' && !zv('Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3') && !zv('Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung'), 'Oerlikon und Bahnhofstrasse operativ (reguläres Ziel), keine Pre-Opening-Ziele mehr (Eröffnung 02.11.2026)');
ok(zv('Luzern – Vormerkung, Eröffnung 2027')?.art === 'vormerkung' && !zv('Winterthur Münzgasse – Anfrage (Standort in Prüfung)') && !zv('Winterthur Münzgasse') && zv('Winterthur (Praxis Hwang)')?.art === 'behandlung' && zv('Winterthur (Praxis Hwang)')?.checkin === false && zv('Winterthur Marktgasse')?.art === 'behandlung' && zv('Winterthur Marktgasse')?.checkin === true && zv('Andere / in meiner Nähe')?.art === 'routing', 'Luzern Vormerkung · Winterthur Marktgasse/Münzgasse operativ mit Check-in (kein Anfrage-Ziel mehr) · «Andere» Routing');
ok(Z.filter((z) => z.checkin).map((z) => z.value).sort().join() === [...checkinStandortNamen()].sort().join() && Z.filter((z) => z.checkin).every((z) => z.art === 'behandlung'), 'Check-in genau an den regulären Zielen der freigegebenen Standorte (CHECKIN_FREIGABE), unabhängig von der Reihenfolge');
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
ok(inst(sg).join() === (hsgOn ? 'sg-hero,sg-herbst' : 'sg-hero'), `St. Gallen: genau EIN Formular (sg-hero in der Kontaktsektion #termin, 05.11.2026)${hsgOn ? ' + Kampagnen-Sheet' : ''}`);
const opClinics = clinics.filter((c) => c.status === 'operational');
// Partner-Umleitung (data-sticky-cta-href, z. B. Marktgasse → Praxis Hwang): kein Formular auf der Seite.
const standortMiss = opClinics.filter((c) => html.has(`dist/standorte/${c.id}/index.html`) && !/data-sticky-cta-href=/.test(html.get(`dist/standorte/${c.id}/index.html`)) && !(html.get(`dist/standorte/${c.id}/index.html`).match(new RegExp(`data-kf-standort-id="${c.id}"`))));
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
ok((homeSel.match(/ selected/g) || []).length === 0, 'keine Mehrfach-/Pseudo-Vorauswahl in der globalen Auswahl');
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
const tH = text(sgHero);
// SG (05.11.2026): EIN Formular in der Kontaktsektion #termin (drei Karten → OneDoc-Widget → Formular), Check-in zuerst und
// vorausgewählt, Button «Gratis Check-in anfragen» / «Ersttermin anfragen», ohne OneDoc-/Alternativbereich im Formular.
const OFFER = ['Ersttermin mit Behandlung', 'Persönliches Gespräch, TCM-Diagnostik und erste Behandlung.', 'Kostenloser TCM 360°-Check-in', '30 Minuten', 'Persönlicher TCM-Kurzcheck mit Zungen- und Pulsdiagnostik, Zeit für deine Fragen und Krankenkassen-Check.', 'Ohne Behandlung. Unverbindlich.'];
const KOPF = ['Dein nächster Schritt beginnt hier.', 'TCM zuerst kennenlernen oder direkt starten.'];
const OLD_SG = ['Wie können wir dir helfen?', 'Wähle, was gerade zu dir passt.', 'Standort: St. Gallen', 'Noch unsicher?', 'Deine Beschwerden besprechen', 'Mit persönlicher Empfehlung für das weitere Vorgehen.', '30 Minuten für deine Fragen', 'Inklusive Zungen- und Pulsdiagnostik'];
const OFFER_GLOBAL = ['Ersttermin mit Behandlung', 'Persönliches Gespräch, TCM-Diagnostik und erste Behandlung.', 'Kostenloser TCM-Check-in', '30 Minuten', 'Zungen- und Pulsdiagnostik, persönliche Empfehlung und Krankenkassen-Check.', 'Ohne Behandlung.'];
const OLD_OFFER = ['Kostenloser TCM-Check-in · 30 Minuten', 'Finde heraus, ob TCM zu dir passt.', 'Dein Anliegen verstehen.', 'Gespräch zu deinen Beschwerden', 'TCM-Zungen- und Pulsdiagnostik', 'Persönliche Empfehlung zum weiteren Vorgehen', 'Gespräch und erste Behandlung.', 'Für alle, die direkt mit der Behandlung starten möchten.', 'TCM-Anamnese'];
const GONE = [...OLD_OFFER, ...OLD_SG, 'Hilfe bei der Abklärung deiner Zusatzversicherung.', 'Kostenlos · ohne Behandlung · ohne Verpflichtung', 'Deine Angaben verwenden wir nur', 'Mit deiner Anfrage ist noch kein Termin gebucht.', 'Lieber anrufen?', 'oder per WhatsApp schreiben'];
// Nur im SG-Formular entfallen (globale Formulare behalten Alternativen-Block und Disclosure):
const SG_GONE = ['Oder direkt Kontakt aufnehmen', 'Termin online buchen', 'Direkt bei OneDoc.', 'Weitere Angaben · optional', 'Direkt starten oder TCM zuerst kennenlernen.'];
ok(!/data-kf-instance="sg-unten"/.test(sg) && !/id="kontakt"/.test(sg), 'St. Gallen: kein unteres Formular / keine #kontakt-Sektion mehr (Buchung in #termin)');
for (const s of [...KOPF, 'Terminart wählen', ...OFFER, 'Dein Name', 'Telefonnummer', 'Wir rufen dich zur Terminvereinbarung zurück.', 'E-Mail', 'Dein Anliegen', 'Wunschzeit', '* Pflichtfeld', 'Gratis Check-in anfragen', 'Datenschutz']) ok(tH.includes(s), `SG-Formular: «${s}»`);
ok(GONE.every((s) => !tH.includes(s)) && SG_GONE.every((s) => !tH.includes(s)), 'SG-Formular: alte Angebotstexte, OneDoc-/Alternativbereich und Disclosures fehlen; Subline in Check-in-Reihenfolge');
ok(sgHero.indexOf('kf-opt--checkin') > 0 && sgHero.indexOf('kf-opt--checkin') < sgHero.indexOf('kf-opt--behandlung') && OFFER.every((s) => tH.split(s).length === 2) && (tH.match(/30 Minuten/g) || []).length === 1 && !/kf-tag|kf-tagline|kf-benefit|kf-opt-foot|kf-opt-h"|Beliebteste|Empfohlen/.test(sgHero) && /value="checkin" checked data-kf-angebot="TCM_CHECKIN"/.test(sgHero) && /value="behandlung" data-kf-angebot="ERSTTERMIN_BEHANDLUNG"/.test(sgHero), 'SG-Formular: Check-in zuerst und vorausgewählt, Erstbehandlung zweitens; jeder Angebotstext genau 1×, «30 Minuten» 1×, keine Badges/Listen/Labels');
ok(/class="inline-form-card kf kf--ruhig kf--gelb" id="offer-form"[^>]*data-kf-instance="sg-hero"[^>]*data-kf-default="checkin" data-kf-submit-checkin="Gratis Check-in anfragen" data-kf-submit-behandlung="Ersttermin anfragen"/.test(sg) && /<button type="submit"[^>]*data-kf-submit>Gratis Check-in anfragen <span aria-hidden="true">→<\/span><\/button><p class="kf-legal kf-legal--kurz"><a href="\/datenschutz\/">Datenschutz<\/a><\/p>/.test(sgHero), 'SG-Formular: ruhige Karte #offer-form, Button «Gratis Check-in anfragen» / «Ersttermin anfragen» je Auswahl, kompakter Datenschutz-Link');
ok(/aria-labelledby="kf-sg-hero-h"><div class="kf-kopf"><h3 class="kf-h" id="kf-sg-hero-h">Dein nächster Schritt beginnt hier\.<\/h3><p class="kf-kopf-sub">TCM zuerst kennenlernen oder direkt starten\.<\/p><\/div><p class="kf-intro kf-sec-h" aria-hidden="true">Terminart wählen<\/p><fieldset/.test(sgHero) && /<p class="kf-ferr" id="kf-sg-hero-ta-err" hidden><\/p><\/fieldset><div class="kf-fields" id="kf-sg-hero-fields"/.test(sgHero) && /<span class="kf-opt-t">Kostenloser TCM 360°-Check-in<\/span><span class="kf-opt-gueltig" data-kf-gueltig hidden>Buchung bis <span data-kf-gueltig-bis><\/span>, Termin auch später möglich\.<\/span>/.test(sgHero) && !/kf-fhint" data-kf-gueltig/.test(sgHero) && !/kf-ort|data-kf-to-fields|data-kf-rr|data-kf-opt|kf-optgroup|kf-disclose|kf-step|Rückruf anfragen/.test(sgHero), 'SG-Formular: schwarzer Kopf (h3 + Subline), «Terminart wählen», nach den Kacheln direkt die Felder, alle Angaben offen (keine Disclosures/Schrittmarker)');
ok(!/data-kf-onedoc|kf-od-sep|data-kf-od-mode|kf-alt-wrap|data-kf-kontakt-alt|kf-call/.test(sgHero), 'SG-Formular: ohne OneDoc-Button, Anruf-/WhatsApp-Block (Karten und Widget stehen in #termin)');
ok(new RegExp(`<label class="kf-label" for="kf-sg-hero-tel">Telefonnummer <span class="kf-star" aria-hidden="true">\\*</span></label><input[^>]*name="telefon"[^>]*required aria-required="true"`).test(sgHero) && /for="kf-sg-hero-name">Dein Name <span class="kf-star"/.test(sgHero) && /for="kf-sg-hero-email">E-Mail <span class="kf-star"/.test(sgHero) && sgHero.indexOf('for="kf-sg-hero-name"') < sgHero.indexOf('for="kf-sg-hero-tel"') && sgHero.indexOf('for="kf-sg-hero-tel"') < sgHero.indexOf('for="kf-sg-hero-email"'), 'SG-Formular: «Dein Name *» → «Telefonnummer *» → «E-Mail *» (Stern, required, aria-required)');
ok(sgHero.indexOf('class="cf-turnstile') < sgHero.indexOf('data-kf-submit>') && sgHero.indexOf('data-kf-submit>') < sgHero.indexOf('kf-legal--kurz'), 'SG-Formular: Turnstile vor dem Anfragebutton, Datenschutz-Link direkt darunter');
ok(/placeholder="Deine Telefonnummer"/.test(sgHero) && /placeholder="Vor- und Nachname"/.test(sgHero) && /placeholder="name@beispiel\.ch"/.test(sgHero) && /rows="2"[^>]*placeholder="Was möchtest du uns mitgeben\?"/.test(sgHero), 'Platzhalter exakt, Anliegen zweizeilig');
// Kontaktsektion #termin: Vor-Anker, drei Karten (Check-in → #online-buchen, Anrufen, WhatsApp), OneDoc-Widget mit direktem src, dann das Formular.
const termin = sg.slice(sg.indexOf('id="termin"'), sg.indexOf('data-kf-instance="sg-hero"'));
ok(termin.length > 0 && (termin.match(/class="sgt-ch[ "]/g) || []).length === 3 && /class="sgt-ch sgt-ch--primary" href="#online-buchen"/.test(termin) && /href="tel:\+41775236122"/.test(termin) && /wa\.me\/41775236122/.test(termin) && termin.indexOf('class="sgt-channels"') < termin.indexOf('id="online-buchen"'), 'Kontaktsektion #termin: drei Karten → OneDoc (#online-buchen) → Formular (#offer-form)');
ok(/<iframe class="od-widget"[^>]*src="https:\/\/www\.onedoc\.ch\/de\/widget\/[0-9a-f]+"/.test(sg) && !/src="about:blank"/.test(sg) && (sg.match(/onedoc\.ch\/de\/widget\//g) || []).length >= 1 && /widgetConfigs\["7a0d6d1be45b44d5cbe90243187f9e7c30949c5dd23682bf770e7b5808674794"\]\.measurementIds=\["G-NHZ8Y6V840"\]/.test(sg), 'OneDoc-Widget: direktes src (kein about:blank), GA4-Embed unverändert');
ok(/<p class="sgt-od-fallback">[^<]*<a href="https:\/\/www\.onedoc\.ch\/de\/widget\/[0-9a-f]+" target="_blank" rel="noopener">/.test(sg), 'OneDoc: permanenter Direktlink unter dem Widget');
ok(!/Unverbindliche Anfrage\. Ein Termin ist erst nach unserer Bestätigung vereinbart\./.test(sg) && !/<b>Geöffnet:<\/b>/.test(sg.slice(0, sg.indexOf('id="termin"'))) && /Mo – Sa 07:30-19:30|Mo-Sa 07:30-19:30/.test(sg) && !/CHF 130|Tarif 590/.test(text(sg)), 'SG: ohne «Unverbindliche Anfrage…»/«Geöffnet:» im Hero; Öffnungszeiten in «Über die Praxis»/Schema; keine Preisangaben');
{ const km = html.get('dist/kontakt/index.html'); const c = (km.match(/<div class="inline-form-card kf[^"]*"[^>]*data-kf-instance="terminform"[\s\S]*?<script src="\/kontakt-form\.js"/) || [''])[0]; const tx = text(c);
  ok(/<section class="tf-section" id="formular"[ >]/.test(km) && /class="inline-form-card kf kf--ruhig kf--gelb" id="kf-terminform"[^>]*data-kf-conv="form_submit"[^>]*data-kf-global="1"/.test(c) && /<form class="kf-form" novalidate data-kf-form id="terminform"/.test(c) && /<div class="kf-kopf"><h2 class="kf-h" id="kf-terminform-h">Dein nächster Schritt beginnt hier\.<\/h2>/.test(c) && c.indexOf('name="standort"') < c.indexOf('data-kf-ta-h') && c.indexOf('kf-opt--checkin') < c.indexOf('kf-opt--behandlung') && /class="inline-form-card kf kf--ruhig kf--gelb" id="kf-terminform"[^>]*data-kf-default="checkin" data-kf-submit-checkin="Gratis Check-in anfragen" data-kf-submit-behandlung="Ersttermin anfragen"/.test(c) && /value="checkin" checked/.test(c) && /<span class="kf-opt-t">[^<]+<\/span><span class="kf-opt-gueltig" data-kf-gueltig hidden>Buchung bis <span data-kf-gueltig-bis><\/span>, Termin auch später möglich\.<\/span>/.test(c) && !/kf-fhint" data-kf-gueltig/.test(c) && OFFER_GLOBAL.every((s) => tx.split(s).length === 2) && GONE.every((s) => !tx.includes(s)) && !/kf-call|kf-tag|Freie Termine ansehen|data-kf-to-fields/.test(c) && /<div class="kf-alt-wrap" data-kf-alt-wrap hidden>/.test(c) && /<div class="kf-optgroup" id="kf-terminform-opt" hidden>/.test(c) && /name="typ" value="termin"/.test(c), 'Rollout /kontakt/ (TerminForm): ruhige Karte, IDs #formular/#terminform, form_submit, Standort vor Kacheln, Check-in zuerst + vorausgewählt (gelb, Button je Auswahl, Hinweis «Buchung bis»), kurze Texte, Alternativen erst nach Zielwahl, Zusatzangaben eingeklappt'); }
// Homepage (16.10.2026): gleiche ruhige Gestaltung wie SG, aber globales Formular ohne SG-Standortlogik.
{ const hm = html.get('dist/index.html'); const c = (hm.match(/<div class="inline-form-card kf[^"]*"[^>]*data-kf-instance="home"[\s\S]*?<script src="\/kontakt-form\.js"/) || [''])[0]; const tx = text(c);
  ok(/class="inline-form-card kf kf--ruhig" id="kf-home"[^>]*data-kf-global="1"/.test(c) && !/data-kf-standort=|data-kf-od-mode|data-kf-checkin="1" data-kf-scope|kf--kompakt/.test(c.slice(0, c.indexOf('<form'))) && !/data-kf-od-mode="sg"/.test(c), 'Homepage: ruhige Karte, global (kein fester Standort, keine SG-OneDoc-Logik)');
  ok(new RegExp('aria-labelledby="kf-home-h"><div class="kf-kopf"><h3 class="kf-h" id="kf-home-h">Dein nächster Schritt beginnt hier\\.</h3><p class="kf-kopf-sub">Direkt starten oder TCM zuerst kennenlernen\\.</p></div><div class="kf-field"><label class="kf-label" for="kf-home-standort">Standort <span class="kf-star" aria-hidden="true">\\*</span></label><select[^>]*name="standort" required').test(c) && /<\/select><p class="kf-fhint" data-kf-ziel-hinweis hidden><\/p><p class="kf-ferr" id="kf-home-standort-err" hidden><\/p><\/div><p class="kf-intro kf-sec-h" aria-hidden="true" data-kf-ta-h>Terminart wählen<\/p><fieldset/.test(c), 'Homepage: schwarzer Kopf, dann Standortauswahl (roter Stern), dann «Terminart wählen» + Kacheln');
  ok(c.indexOf('kf-opt--behandlung') < c.indexOf('kf-opt--checkin') && OFFER_GLOBAL.every((s) => tx.split(s).length === 2) && GONE.every((s) => !tx.includes(s)) && !/Rückruf anfragen|kf-tag|kf-benefit|kf-opt-foot|kf-call/.test(c) && !/name="terminart"[^>]*checked/.test(c) && !/<option[^>]*selected/.test(c) && /value="behandlung"[^>]*data-kf-angebot="ERSTTERMIN_BEHANDLUNG"/.test(c) && /value="checkin"[^>]*data-kf-angebot="TCM_CHECKIN"/.test(c) && c.includes(`<span class="kf-scope" data-kf-scope>Derzeit nur in ${checkinStandortNamen().join(', ')}</span>`) && /data-kf-360-t="Kostenloser TCM 360°-Check-in" data-kf-360-dur="30 Minuten" data-kf-360-d="Persönlicher TCM-Kurzcheck mit Zungen- und Pulsdiagnostik, Zeit für deine Fragen und Krankenkassen-Check\." data-kf-360-note="Ohne Behandlung\. Unverbindlich\."/.test(c) && !/data-kf-sg-/.test(c) && !/Kostenloser TCM 360°-Check-in<\/span>/.test(c), 'Homepage: Erstbehandlung zuerst, gleiche kurze Texte (je 1×), Check-in mit Freigabe-Hinweis, keine Vorauswahl (Terminart/Standort), keine Badges/Listen/«Rückruf anfragen»; Schlüssel unverändert');
  ok(/<label class="kf-label" for="kf-home-tel">Telefonnummer <span class="kf-star" aria-hidden="true">\*<\/span><\/label><input[^>]*required aria-required="true"/.test(c) && /<button type="button" class="kf-disclose kf-disclose--sub" id="kf-home-opt-btn" aria-expanded="false" aria-controls="kf-home-opt" data-kf-opt>/.test(c) && /<div class="kf-optgroup" id="kf-home-opt" hidden>/.test(c) && /<label class="kf-label" for="kf-home-name">Dein Name <span class="kf-star" aria-hidden="true">\*<\/span><\/label><input[^>]*name="name"[^>]*required aria-required="true"/.test(c) && c.indexOf('id="kf-home-name"') < c.indexOf('id="kf-home-tel"') && c.indexOf('id="kf-home-name"') < c.indexOf('id="kf-home-opt"') && /<label class="kf-label" for="kf-home-email">E-Mail <span class="kf-star" aria-hidden="true">\*<\/span><\/label><input[^>]*name="email"[^>]*required aria-required="true"/.test(c) && c.indexOf('id="kf-home-tel"') < c.indexOf('id="kf-home-email"') && c.indexOf('id="kf-home-email"') < c.indexOf('id="kf-home-opt"') && !/name="anliegen"[^>]*required/.test(c) && !/(Dein Name|E-Mail) <span class="kf-opt-l">/.test(c) && /data-kf-submit-leer="Termin anfragen"/.test(c) && /data-kf-submit>Termin anfragen <span aria-hidden="true">→<\/span><\/button><p class="kf-legal kf-legal--kurz"><a href="\/datenschutz\/">Datenschutz<\/a><\/p>/.test(c), 'Homepage: «Dein Name *» → «Telefonnummer *» → «E-Mail *» sichtbar vor den optionalen Angaben (Pflicht), Anliegen optional, «Weitere Angaben · optional» eingeklappt (noscript offen), Button «Termin anfragen →» + Datenschutz-Link');
  const alt = (c.match(/<div class="kf-alt-wrap" data-kf-alt-wrap hidden>[\s\S]*?<\/p><\/div>(?=<\/form>)/) || [''])[0];
  ok(alt && /<p class="kf-od-sep"><span>Oder direkt Kontakt aufnehmen<\/span><\/p><div class="kf-onedoc kf-onedoc--sg" data-kf-onedoc-panel hidden><a class="kf-btn kf-btn--outline" href="#" data-kf-onedoc>/.test(alt) && /<p class="kf-alt" data-kf-kontakt-alt hidden><a href="tel:\+41775236122" data-kf-tel>/.test(alt) && /data-kf-wa="41775236122"/.test(alt) && (c.match(/data-kf-onedoc[ >]/g) || []).length === 1 && (c.match(/data-kf-tel[ >]/g) || []).length === 1 && !/41775236122\?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zur%20Behandlung%20in%20St\.%20Gallen/.test(c), 'Homepage: OneDoc (umrandet) + «Anrufen · WhatsApp» unter dem Button, im HTML verborgen bis ein Ziel gewählt ist; bestehender zentraler WhatsApp-Link, kein SG-WhatsApp');
  ok(/data-id="st-gallen"[^>]*data-checkin="1" data-onedoc="\/standorte\/st-gallen\/#online-buchen"/.test(c) && /<option value="Winterthur Marktgasse" data-id="winterthur-marktgasse" data-art="behandlung" data-default="1" data-tel="\+41 77 523 61 22" data-checkin="1">Winterthur Marktgasse<\/option>/.test(c) && /<option value="Winterthur \(Praxis Hwang\)" data-id="winterthur-muenzgasse" data-art="behandlung" data-default="1" data-tel="\+41 77 523 61 22" data-hinweis="[^"]+praxis@hwang\.ch[^"]*">Winterthur \(Praxis Hwang\)<\/option>/.test(c) && (c.match(/data-checkin="1"/g) || []).length === checkinStandortNamen().length && ['Zürich Bahnhofstrasse', 'Zürich Oerlikon', 'Zürich Höngg'].every((n) => new RegExp(`<option value="${n}"[^>]*data-checkin="1">${n}</option>`).test(c)) && (c.match(/data-onedoc=/g) || []).length === 1 && !/Standort in Prüfung|Münzgasse – Anfrage/.test(c), 'Homepage: Check-in-Freigabe genau an SG, Winterthur Marktgasse/Münzgasse und den drei Zürcher Standorten (reguläre Ziele, kein Anfrage-Ziel), OneDoc-Kalender weiterhin nur am SG-Ziel (keine neuen Buchungswege)'); }
{ const cards = [...html].flatMap(([f, h]) => [...h.matchAll(/<div class="inline-form-card (kf[^"]*)"[^>]*data-kf-instance="([^"]+)"/g)].map((m) => [f, m[1], m[2]]));
  ok(cards.length > 400 && cards.every(([, cls]) => /\bkf--ruhig\b/.test(cls)) && !cards.some(([f]) => f.startsWith('dist/en/')), `Rollout: alle ${cards.length} Patienten-Kontaktformulare (gemeinsamer Renderer) in ruhiger Gestaltung, keine auf EN-Seiten`);
  const sp = (f, re) => re.test(html.get(f) || '') && !/data-kf-instance/.test((html.get(f) || '').match(re)?.[0] ?? '');
  ok(/<form class="inline-form" onsubmit="submitInlineFormGeneric\(event, this\)">/.test(html.get('dist/massage-basel/index.html')) && /data-lu-waitlist/.test(html.get('dist/standorte/luzern/index.html')) && /id="pt-form"/.test(html.get('dist/karriere/index.html')) && /id="pl-form"/.test(html.get('dist/partner/index.html')) && /id="en-contact-form"/.test(html.get('dist/en/contact/index.html')) && ![...html].some(([f, h]) => f.startsWith('dist/en/') && /kf--ruhig|Dein nächster Schritt/.test(h)), 'Spezialabläufe behalten ihre Handler (Massage submitInlineFormGeneric, Zürich-Funnel/Vorbereitung data-contact-form, Wartelisten), EN-Formulare ohne deutsche Texte'); }
// Gemeinsame Hülle (16.10.2026): Massage-Anfragen, Zürich-Funnel, Standorte in Vorbereitung/Prüfung, Wartelisten.
{ const HUELLE = [['massage', 'dist/massage-basel/index.html', /<form class="inline-form" onsubmit="submitInlineFormGeneric\(event, this\)">/, /name="anfrage_typ" value="massage"/],
    ['zuerich-funnel', 'dist/akupunktur-tcm-zuerich/index.html', /<form class="inline-form" data-contact-form novalidate="">/, /name="anfrage_typ" value="zuerich-routing"[\s\S]*name="formular" value="Zürich-Funnel"/],
    ['warteliste', 'dist/standorte/bern/index.html', /<form class="be-wl-form" data-be-interesse novalidate/, /name="quelle" value="warteliste-bern"/],
    ['warteliste', 'dist/standorte/luzern/index.html', /<form class="lu-wl-form" data-lu-waitlist novalidate/, /name="quelle" value="warteliste-luzern"/],
    ['warteliste', 'dist/massage-luzern/index.html', /<form class="mw-form" data-mw-waitlist novalidate/, /name="quelle" value="warteliste-luzern-massage"/]];
  for (const [fam, f, form, hid] of HUELLE) { const h = html.get(f) || ''; const c = (h.match(new RegExp(`<div class="[^"]*\\bkf kf--ruhig kf-huelle"[^>]*data-kf-huelle="${fam}"[\\s\\S]*?<\\/form>\\s*<script[^>]*>\\(function\\(c\\)\\{var e=c&&c\\.querySelector\\('\\.cf-turnstile'\\);if\\(e&&e\\.clientWidth&&e\\.clientWidth<300\\)e\\.setAttribute\\('data-size','compact'\\)\\}\\)\\(document\\.currentScript\\.parentNode\\)<\\/script>`)) || [''])[0];
    ok(c && /<link rel="stylesheet" href="\/kontakt-form\.css"/.test(c) && /<div class="kf-kopf"[^>]*>\s*<h[23] class="kf-h[^"]*"[^>]*>[^<]+<\/h[23]>\s*<p class="kf-kopf-sub"[^>]*>[^<]+<\/p>\s*<\/div>/.test(c) && form.test(c) && hid.test(c) && !/data-kf-instance|kf-opt--checkin|TCM-Check-in/.test(c) && !/(^|[^-])data-kf[ >=]/.test(c), `Hülle ${fam} (${f.replace('dist', '').replace('index.html', '')}): Karte/Kopf/Turnstile-Kompaktgrösse, eigener Handler und Routing-Felder erhalten, keine Check-in-Kachel, kein gemeinsames Formular-Skript`); }
  const wl = ['dist/standorte/bern/index.html', 'dist/standorte/luzern/index.html', 'dist/massage-luzern/index.html'].map((f) => text((html.get(f).match(/data-kf-huelle="warteliste"[\s\S]*?<\/form>/) || [''])[0]));
  ok(wl.every((t) => !/Termin anfragen|Ersttermin|Diagnostik|Einschätzung|Behandlung buchen/.test(t)), 'Wartelisten: keine Termin-/Behandlungs-/Diagnostik-Formulierungen (Vormerkung bleibt Vormerkung)');
  ok(['dist/karriere/index.html', 'dist/partner/index.html', 'dist/partner/praxisnachfolge/index.html', 'dist/zuweisen/index.html', 'dist/akademie/index.html', 'dist/club/index.html', 'dist/community/index.html', 'dist/visuals/index.html'].every((f) => !/ data-kf-huelle="| data-kf-instance="/.test(html.get(f) || '')) && ![...html].some(([f, h]) => f.startsWith('dist/en/') && / data-kf-huelle="| data-kf-instance="/.test(h)), 'Ausnahmen ohne Hülle: Karriere, Partner, Praxisnachfolge, Zuweisen, Akademie, Club, Community, Visuals; EN-Formulare unverändert'); }
const sgCards = [...sg.matchAll(/<div class="inline-form-card kf[^"]*"[^>]*data-kf-instance="(sg-hero)"[\s\S]*?<script src="\/kontakt-form\.js"/g)].map((m) => m[0]);
ok(sgCards.length === 1 && sgCards.every((c) => !/data-kf-onedoc[ >]|data-kf-od-mode/.test(c)), 'SG: genau eine Formularkarte, OneDoc nur als Widget in #termin (kein Buchungselement in der Karte)');
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
ok(/value="checkin" checked/.test(sgHero) && !/value="behandlung" checked/.test(sgHero), 'SG-Formular: Check-in vorausgewählt (data-kf-default), Erstbehandlung nicht');
ok(/name="telefon" type="tel" inputmode="tel" autocomplete="tel"[^>]*required/.test(sgHero) && /name="name" type="text" autocomplete="name"[^>]*required/.test(sgHero) && !/name="(vorname|nachname)"/.test(sgHero) && /name="email" type="email" inputmode="email" autocomplete="email"[^>]*required/.test(sgHero) && !/name="anliegen"[^>]*required/.test(sgHero), 'Telefon type/inputmode tel + Pflicht; ein Namensfeld Pflicht (keine Vor-/Nachname-Aufteilung); E-Mail type/inputmode email + Pflicht; Anliegen optional');
ok(/class="cf-turnstile/.test(sgHero) && /name="website"/.test(sgHero) && /href="\/datenschutz\/"/.test(sgHero), 'Turnstile, Honeypot, Datenschutzlink');
// Turnstile in ruhigen Karten: Standard-Widget (300 px) nur, wenn es passt; sonst offizielle Grösse «compact», gesetzt vor dem
// impliziten Rendern. Kein Verstecken/Clipping des Widgets, Token-Feld und Container unverändert; andere Formulare unverändert.
{ const SZ = `<script>(function(e){if(e&&e.clientWidth&&e.clientWidth<300)e.setAttribute('data-size','compact')})(document.currentScript.parentNode.querySelector('.kf-ts'))</script><script src="/kontakt-form.js" defer></script></div>`;
  const TS = /<div class="cf-turnstile kf-ts" data-sitekey="[^"]+" data-appearance="interaction-only"><\/div>/g;
  const home = html.get('dist/index.html'), km = html.get('dist/kontakt/index.html');
  // Kampagnen-Sheet (kf--herbst): Turnstile wird beim Öffnen explizit gerendert (Grösse dort entschieden), daher ohne Inline-Script.
  const cardsN = [...html].reduce((n, [, h]) => n + (h.match(/<div class="inline-form-card kf(?![^"]*kf--herbst)[^"]*"[^>]*data-kf-instance=/g) || []).length, 0), szN = [...html].reduce((n, [, h]) => n + (h.match(/e\.setAttribute\('data-size','compact'\)\}\)\(document\.currentScript\.parentNode\.querySelector\('\.kf-ts'\)\)<\/script><script src="\/kontakt-form\.js" defer><\/script><\/div>/g) || []).length, 0);
  ok(home.split(SZ).length === 2 && sg.split(SZ).length === 2 && (home.match(TS) || []).length === 1 && (sg.match(TS) || []).length === 1 && (km.match(TS) || []).length === 1 && szN === cardsN && !/data-kf-ts-state|data-before-interactive-callback|data-size="/.test(sg + home + km), `Turnstile: alle ${cardsN} ruhigen Karten setzen bei < 300 px Platz die Grösse «compact» (am Kartenende, vor dem Rendern); Container/Token unverändert`); }
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
const base = { standort: 'St. Gallen', quelle: 'launch-hero-sg', turnstileToken: 't', name: 'Test Person', email: 'test@beispiel.ch' };
let [st, j, mail] = await post({ ...base, telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN' });
ok(st === 200 && /KOSTENLOSER TCM-CHECK-IN/.test(mail.html) && /Kostenloser TCM-Check-in – St\. Gallen/.test(mail.html) && mail.subject === 'Neue Anfrage · St. Gallen · Kostenloser TCM-Check-in · 30 Min.' && />30 Minuten</.test(mail.html) && />kostenlos, ohne Behandlung</.test(mail.html) && mail.reply_to === 'test@beispiel.ch' && />Test Person</.test(mail.html), 'Name + Telefon + E-Mail + Check-in SG → 200, Betreff/Dauer/Kosten aus Terminart, reply_to = E-Mail, Name in der Mail');
[st, j, mail] = await post({ ...base, telefon: '0041 79 123 45 67', angebot_id: 'ERSTTERMIN_BEHANDLUNG', name: 'Test', email: 'a@b.ch', anliegen: 'Rücken', wunschzeit: 'Do' });
ok(st === 200 && /ERSTTERMIN MIT BEHANDLUNG/.test(mail.html) && mail.reply_to === 'a@b.ch' && /Wunschzeit/.test(mail.html) && /Rücken/.test(mail.html) && mail.subject === 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 90 Min.' && />90 Minuten</.test(mail.html) && /Carlos: 90 Minuten im Kalender reservieren\./.test(mail.html) && />kostenpflichtig, Abrechnung nach Tarif</.test(mail.html), 'Behandlung mit allen optionalen Feldern → 200, reply_to, Wunschzeit/Anliegen, 90 Minuten intern (SG) + Carlos-Hinweis, kostenpflichtig');
[st, j] = await post({ ...base, standort: 'Wil', quelle: 'Beschwerde: Akne', telefon: '+49 30 1234 5678', angebot_id: 'ERSTTERMIN_BEHANDLUNG' });
ok(st === 200, 'Behandlung an anderem Standort, internationale Nummer → 200');
// Neutraler SG-Hero-Identifier (21.10.2026): Terminart/Dauer/Kosten NUR aus der Angebots-ID, Formularname nur unter «Technische Angaben».
const heroNeu = { ...base, formular: 'Hero-Termin-StGallen', quelle_detail: 'Hero St. Gallen · reguläres Terminformular', seite: '/standorte/st-gallen/', telefon: '+41 79 123 45 67' };
[st, j, mail] = await post({ ...heroNeu, angebot_id: 'ERSTTERMIN_BEHANDLUNG' });
ok(st === 200 && mail.subject === 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 90 Min.' && />90 Minuten</.test(mail.html) && />kostenpflichtig, Abrechnung nach Tarif</.test(mail.html) && /Formular<\/strong><\/td><td[^>]*>Hero-Termin-StGallen</.test(mail.html) && /Quelle \(Detail\)<\/strong><\/td><td[^>]*>Hero St\. Gallen · reguläres Terminformular</.test(mail.html) && /Seite<\/strong><\/td><td[^>]*>\/standorte\/st-gallen\//.test(mail.html) && !/Gratis|30min|30 Minuten/.test(mail.html), 'SG-Hero neutral, Ersttermin mit Behandlung: 90 Min. intern, kostenpflichtig; Formular «Hero-Termin-StGallen» nur technisch, kein «Gratis/30min»');
[st, j, mail] = await post({ ...heroNeu, angebot_id: 'TCM_CHECKIN' });
ok(st === 200 && mail.subject === 'Neue Anfrage · St. Gallen · Kostenloser TCM-Check-in · 30 Min.' && />30 Minuten</.test(mail.html) && />kostenlos, ohne Behandlung</.test(mail.html) && /Formular<\/strong><\/td><td[^>]*>Hero-Termin-StGallen</.test(mail.html), 'SG-Hero neutral, Check-in: 30 Min., kostenlos; gleicher Formularname, Klassifikation aus der Angebots-ID');
[st, j, mail] = await post({ ...base, formular: 'Hero-Gratis-30min-StGallen', quelle_detail: 'Hero St. Gallen Neueroeffnung', seite: '/standort/st-gallen', telefon: '+41 79 123 45 67', angebot_id: 'ERSTTERMIN_BEHANDLUNG' });
ok(st === 200 && mail.subject === 'Neue Anfrage · St. Gallen · Ersttermin mit Behandlung · 90 Min.' && /Hero-Gratis-30min-StGallen/.test(mail.html), 'historischer Formularname aus offenen Tabs weiterhin zustellbar (nur technisch)');
const before = sent.length;
for (const [label, body, code] of [
  ['ohne Name', { ...base, name: undefined, telefon: '+41 79 123 45 67', angebot_id: 'ERSTTERMIN_BEHANDLUNG' }, 'missing_name'],
  ['Name nur Leerzeichen', { ...base, name: '   ', telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN' }, 'missing_name'],
  ['Vormerkung ohne Name', { ...base, name: '', standort: 'Luzern – Vormerkung, Eröffnung 2027', telefon: '+41 79 123 45 67', angebot_id: 'VORMERKUNG' }, 'missing_name'],
  ['ohne E-Mail', { ...base, email: undefined, telefon: '+41 79 123 45 67', angebot_id: 'ERSTTERMIN_BEHANDLUNG' }, 'missing_email'],
  ['E-Mail nur Leerzeichen', { ...base, email: '   ', telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN' }, 'missing_email'],
  ['Routing ohne E-Mail', { ...base, email: '', standort: 'Andere / in meiner Nähe', telefon: '+41 79 123 45 67', angebot_id: 'ROUTING_ANFRAGE' }, 'missing_email'],
  ['ungültige Nummer', { ...base, telefon: '12', angebot_id: 'TCM_CHECKIN' }, 'invalid_phone'],
  ['ohne Telefon', { ...base, angebot_id: 'ERSTTERMIN_BEHANDLUNG', name: 'X', email: 'a@b.ch' }, 'invalid_phone'],
  ['ungültige E-Mail', { ...base, telefon: '+41 79 123 45 67', email: 'kaputt', angebot_id: 'TCM_CHECKIN' }, 'invalid_email'],
  ['Check-in Basel', { ...base, standort: 'Basel', telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN' }, 'invalid_offer_scope'],
  ['Check-in «Andere»', { ...base, standort: 'Andere / in meiner Nähe', telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN' }, 'invalid_offer_scope'],
  ['ohne Standort', { ...base, standort: '', telefon: '+41 79 123 45 67', angebot_id: 'ERSTTERMIN_BEHANDLUNG' }, 'missing_standort'],
]) { [st, j] = await post(body); ok(st === 422 && j.error === code, `${label} → 422 ${code}`); }
ok(sent.length === before, 'abgelehnte Anfragen erzeugen keine Mail');
const tel = '+41 79 123 45 67'; const P = 'Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3', N = 'Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung', OE = 'Zürich Oerlikon', BH = 'Zürich Bahnhofstrasse';
const LU = 'Luzern – Vormerkung, Eröffnung 2027', MZ_ALT = 'Winterthur Münzgasse – Anfrage (Standort in Prüfung)', MZ = 'Winterthur (Praxis Hwang)', MG = 'Winterthur Marktgasse', AN = 'Andere / in meiner Nähe';
for (const [label, ort, id, angebot, code, art] of [
  ['Oerlikon + Ersttermin', OE, 'zuerich-oerlikon', 'ERSTTERMIN_BEHANDLUNG', 200, 'ERSTTERMIN MIT BEHANDLUNG'],
  ['Bahnhofstrasse + Ersttermin', BH, 'zuerich-bahnhofstrasse', 'ERSTTERMIN_BEHANDLUNG', 200, 'ERSTTERMIN MIT BEHANDLUNG'],
  ['Luzern + Vormerkung', LU, 'luzern', 'VORMERKUNG', 200, 'VORMERKUNG (STANDORT NOCH NICHT OFFEN)'],
  ['Münzgasse (Praxis Hwang) + Check-in', MZ, 'winterthur-muenzgasse', 'TCM_CHECKIN', 'invalid_offer_scope'],
  ['Münzgasse alter Name', 'Winterthur Münzgasse', 'winterthur-muenzgasse', 'ERSTTERMIN_BEHANDLUNG', 'invalid_standort'],
  ['Münzgasse (Praxis Hwang) + Ersttermin', MZ, 'winterthur-muenzgasse', 'ERSTTERMIN_BEHANDLUNG', 200, 'ERSTTERMIN MIT BEHANDLUNG'],
  ['Marktgasse + Check-in', MG, 'winterthur-marktgasse', 'TCM_CHECKIN', 200, 'KOSTENLOSER TCM-CHECK-IN'],
  ['Marktgasse + Ersttermin', MG, 'winterthur-marktgasse', 'ERSTTERMIN_BEHANDLUNG', 200, 'ERSTTERMIN MIT BEHANDLUNG'],
  ['«Andere» + Routing', AN, 'andere', 'ROUTING_ANFRAGE', 200, 'ROUTING-ANFRAGE (KEIN STANDORT GEWÄHLT)'],
  ['Oerlikon altes Pre-Opening-Ziel (neue Praxis)', N, 'zuerich-oerlikon', 'VORMERKUNG', 'invalid_standort'],
  ['Oerlikon altes Partnerpraxis-Ziel', P, 'zuerich-oerlikon', 'ERSTTERMIN_BEHANDLUNG', 'invalid_standort'],
  ['Oerlikon + Vormerkung', OE, 'zuerich-oerlikon', 'VORMERKUNG', 'invalid_offer_scope'],
  ['Luzern + Ersttermin', LU, 'luzern', 'ERSTTERMIN_BEHANDLUNG', 'invalid_offer_scope'],
  ['Luzern + Check-in', LU, 'luzern', 'TCM_CHECKIN', 'invalid_offer_scope'],
  ['Münzgasse + Anfrage (altes Prüfungs-Ziel)', MZ_ALT, 'winterthur-muenzgasse', 'STANDORT_ANFRAGE', 'invalid_standort'],
  ['Münzgasse + Vormerkung', MZ, 'winterthur-muenzgasse', 'VORMERKUNG', 'invalid_offer_scope'],
  ['Marktgasse + Anfrage', MG, 'winterthur-marktgasse', 'STANDORT_ANFRAGE', 'invalid_offer_scope'],
  ['«Andere» + Ersttermin', AN, 'andere', 'ERSTTERMIN_BEHANDLUNG', 'invalid_offer_scope'],
  ['St. Gallen + Vormerkung', 'St. Gallen', 'st-gallen', 'VORMERKUNG', 'invalid_offer_scope'],
  ['Basel + Routing', 'Basel', 'basel', 'ROUTING_ANFRAGE', 'invalid_offer_scope'],
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
[st, j, mail] = await post({ ...base, quelle: '/', standort: MZ, standort_id: 'winterthur-muenzgasse', telefon: tel, angebot_id: 'ERSTTERMIN_BEHANDLUNG' });
ok(st === 200 && mail.to.join() === 'praxis@hwang.ch' && (mail.cc || []).join() === 'termine@tcm.ch', 'Winterthur (Praxis Hwang): Mail an praxis@hwang.ch, Kopie an termine@tcm.ch');
[st, j, mail] = await post({ ...base, telefon: tel, angebot_id: 'ERSTTERMIN_BEHANDLUNG' });
ok(st === 200 && mail.to.join() === 'termine@tcm.ch' && !mail.cc, 'übrige Ziele: Mail an termine@tcm.ch ohne Kopie');
globalThis.fetch = realFetch;

console.log(fails ? `\n${fails} Fehler` : '\nKontaktformular-Gate: 0 Fehler');
process.exit(fails ? 1 : 0);
