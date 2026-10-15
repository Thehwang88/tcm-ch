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
const inst = (s) => [...s.matchAll(/data-kf-instance="([^"]+)"/g)].map((m) => m[1]);
const has = (p, i) => inst(html.get(p) ?? '').includes(i);
ok(has('dist/index.html', 'home'), 'Homepage');
ok(has('dist/kontakt/index.html', 'terminform'), 'Standard-Kontaktseite /kontakt/');
const sg = html.get('dist/standorte/st-gallen/index.html');
ok(inst(sg).join() === 'sg-hero,sg-unten', 'St. Gallen: genau Hero + unten');
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
const t = text(sgHero);
for (const s of ['Wie können wir dir helfen?', 'Wähle, was gerade zu dir passt.', 'Kostenloser TCM-Check-in', 'Dein Anliegen verstehen. Deinen nächsten Schritt finden.', '30 Minuten für eine persönliche TCM-Anamnese und Diagnostik.',
  'Gespräch zu deinen Beschwerden', 'TCM-Zungen- und Pulsdiagnostik', 'Persönliche Empfehlung zum weiteren Vorgehen', 'Krankenkassen-Check', 'Hilfe bei der Abklärung deiner Zusatzversicherung.',
  'Kostenlos · ohne Behandlung · ohne Verpflichtung', 'Ersttermin mit Behandlung', 'Für alle, die direkt mit der Behandlung starten möchten.', 'Termin online buchen', 'Direkt bei OneDoc.',
  'Lieber einen Termin anfragen', 'Wir rufen dich zur Terminvereinbarung zurück.', '* Pflichtfeld', 'Mit deiner Anfrage ist noch kein Termin gebucht.', 'Lieber anrufen?', '+41 77 523 61 22']) ok(t.includes(s), `Text: «${s}»`);
ok(/placeholder="Deine Telefonnummer"/.test(sgHero) && /placeholder="Vor- und Nachname"/.test(sgHero) && /placeholder="name@beispiel\.ch"/.test(sgHero) && /placeholder="Was möchtest du uns mitgeben\?"[^>]*>|rows="2"[^>]*placeholder="Was möchtest du uns mitgeben\?"/.test(sgHero), 'Platzhalter exakt, Anliegen zweizeilig');
// SG-Seite: beide Terminarten über OneDoc, EIN Buchungselement je Instanz, gemeinsame SG-Auswahl solange keine
// verifizierten Direktlinks konfiguriert sind (keine geratenen OneDoc-Links/Parameter).
const sgCards = [...sg.matchAll(/<div class="inline-form-card kf[^"]*"[^>]*data-kf-instance="(sg-hero|sg-unten)"[\s\S]*?<script src="\/kontakt-form\.js"/g)].map((m) => m[0]);
ok(sgCards.length === 2 && sgCards.every((c) => (c.match(/data-kf-onedoc[ >]/g) || []).length === 1 && /data-kf-od-mode="sg"/.test(c) && !/data-kf-onedoc-panel[^>]*hidden/.test(c.match(/<div class="kf-onedoc[^>]*>/)[0])), 'SG Hero + unten: genau ein OneDoc-Element, schon ohne Auswahl sichtbar');
ok(ONEDOC['st-gallen'].direkt.checkin === null && ONEDOC['st-gallen'].direkt.behandlung === null ? sgCards.every((c) => !/data-kf-od-(checkin|behandlung)=/.test(c) && /data-kf-od-default="\/standorte\/st-gallen\/#online-buchen"/.test(c)) : true, 'ohne verifizierte Direktlinks: gemeinsame SG-Auswahl, keine termintyp-spezifischen Ziele im Markup');
const globalCards = [...html.entries()].filter(([p]) => p !== 'dist/standorte/st-gallen/index.html').map(([, s]) => s).filter((s) => /data-kf-od-mode="sg"/.test(s));
ok(globalCards.length === 0 && /Freie Termine ansehen/.test(html.get('dist/index.html')) && /Ersttermin mit Behandlung direkt bei OneDoc buchen\./.test(html.get('dist/akupunktur-tcm-st-gallen/index.html')), 'andere Seiten (Homepage, SG-Landingpage) unverändert: OneDoc nur bei Behandlung');
ok(/text-transform:uppercase/.test(read('public/kontakt-form.css').match(/\.kf-tag\{[^}]*\}/)[0]), 'Label als KOSTENLOSER TCM-CHECK-IN (Versalien per CSS)');
const visSg = text(sg);
ok(!/31\. Oktober|FIRST 30|Vorweihnacht|Weihnachten|limitierte|Nur noch \d|geschenkt/i.test(visSg), 'SG sichtbar ohne FIRST-30-, Weihnachts-, Frist- oder Kapazitätstexte');
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
ok(st === 200 && /KOSTENLOSER TCM-CHECK-IN/.test(mail.html) && /Kostenloser TCM-Check-in – St\. Gallen/.test(mail.html) && mail.subject.endsWith(' · TCM-Check-in') && !mail.reply_to && !/>Name</.test(mail.html), 'nur Telefon + Check-in SG → 200, Mail klassifiziert, kein reply_to, kein erfundener Name');
[st, j, mail] = await post({ ...base, telefon: '0041 79 123 45 67', angebot_id: 'ERSTTERMIN_BEHANDLUNG', name: 'Test', email: 'a@b.ch', anliegen: 'Rücken', wunschzeit: 'Do' });
ok(st === 200 && /ERSTTERMIN MIT BEHANDLUNG/.test(mail.html) && mail.reply_to === 'a@b.ch' && /Wunschzeit/.test(mail.html) && /Rücken/.test(mail.html) && mail.subject.endsWith(' · Ersttermin mit Behandlung'), 'Behandlung mit allen optionalen Feldern → 200, reply_to, Wunschzeit/Anliegen in Mail');
[st, j] = await post({ ...base, standort: 'Wil', quelle: 'Beschwerde: Akne', telefon: '+49 30 1234 5678', angebot_id: 'ERSTTERMIN_BEHANDLUNG' });
ok(st === 200, 'Behandlung an anderem Standort, internationale Nummer → 200');
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
  if (code === 200) ok(st === 200 && sent.length === n0 + 1 && mail.html.includes(`<strong>${art}</strong>`) && mail.html.includes(`>${ort}<`) && mail.html.includes(`>${id}<`), `${label} → 200, Mail «${art}», Standort kanonisch + ID`);
  else ok(st === 422 && j.error === code && sent.length === n0, `${label} → 422 ${code}, keine Mail`);
}
[st, j, mail] = await post({ ...base, telefon: '+41 79 123 45 67', angebot_id: 'TCM_CHECKIN', angebot: 'GRATIS FÜR IMMER' });
ok(st === 200 && !/GRATIS FÜR IMMER/.test(mail.html), 'Angebotstext kommt nie vom Client');
[st, j, mail] = await post({ ...base, telefon: '+41 79 123 45 67', angebot_id: 'FIRST30_WINTER_2026_SG' });
ok(st === 200 && /FIRST 30 PRE-CHRISTMAS EDITION/.test(mail.html), 'historische FIRST-30-ID aus offenem Tab weiter zustellbar (unverändert klassifiziert)');
globalThis.fetch = realFetch;

console.log(fails ? `\n${fails} Fehler` : '\nKontaktformular-Gate: 0 Fehler');
process.exit(fails ? 1 : 0);
