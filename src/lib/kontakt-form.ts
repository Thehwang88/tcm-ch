// Gemeinsames Kontaktformular «Wie können wir dir helfen?» (15.10.2026). EIN Renderer für alle Flächen:
// Homepage, TerminForm (/kontakt/ u. a.), Standortseiten (KontaktForm, Legacy-Leaves), SG-Hero, SG unten und die
// allgemeinen Leaf-Formulare (Beschwerden, Therapien, Krankenkassen …) via upgradeLegacyForms() in SpaPage.
// Client-Logik: public/kontakt-form.js · Styles: public/kontakt-form.css · Angebote/Freigaben: src/data/kontakt-angebote.mjs
import { clinics } from '../data/locations';
import { site } from '../data/site';
import { TERMINARTEN, CHECKIN_FREIGABE, ONEDOC, checkinStandortNamen, kontaktZiele } from '../data/kontakt-angebote.mjs';

export type KfConv = 'formular_senden' | 'form_submit';
export interface KontaktFormOpts {
  /** Eindeutig pro Seite (IDs, Zustände): z. B. 'home', 'sg-hero', 'sg-unten', 'standort', 'leaf', 'terminform'. */
  instance: string;
  /** Fester Standort (Standortseiten): keine Auswahl, Check-in nur bei Freigabe. */
  standortId?: string;
  /** Globale Formulare: Vorauswahl (Option-Value, Name oder ID). */
  preselectStandort?: string;
  quelle?: string; formular?: string; quelleDetail?: string; seite?: string; anfrageTyp?: string; typ?: string;
  /** Prefill des Anliegen-Felds (bleibt editierbar). */
  anliegen?: string;
  /** Explizite Vorauswahl (Link/Prefill); ohne Vorgabe bleiben beide Kacheln ungewählt. */
  terminart?: 'checkin' | 'behandlung';
  wunschzeit?: boolean;
  sitekey?: string;
  /** Bestehender Conversion-Vertrag der Fläche: home.js-Familie = formular_senden, TerminForm = form_submit. */
  conv?: KfConv;
  /** TerminForm-Prefill (?von=, Referrer, data-prefill) clientseitig übernehmen. */
  autoprefill?: 'terminform';
  headingTag?: 'h2' | 'h3';
  /** id der Karte (Kompatibilitätsanker, z. B. 'offer-form'); sonst kf-<instance>. */
  cardId?: string;
  /** id des <form> (Kompatibilität, z. B. 'terminform'). */
  formId?: string;
  /** name/data-name des <form> (bestehender Formular-Identifier, z. B. 'Hero-Gratis-30min-StGallen'). */
  formName?: string;
  /** Zusätzliche Anker vor der Karte (Kompatibilität alter Links, z. B. ['first30']). */
  compatAnchors?: string[];
  /** Nur /standorte/st-gallen/ (Hero + unten): OneDoc für beide Terminarten und schon ohne Auswahl (sekundärer Link). */
  onedocBeideTerminarten?: boolean;
  /** Nur SG-Hero: kompakte Karte. Angebotstexte gekürzt (alle vier Vorteile bleiben sichtbar), Rückruf-Anfrage hinter
   *  «Lieber Rückruf anfragen» und optionale Felder hinter «Weitere Angaben · optional» (echte Disclosure-Buttons;
   *  ohne JavaScript bleibt alles offen). OneDoc bleibt dauerhaft erreichbar. */
  heroKompakt?: boolean;
  /** Nur mit heroKompakt (SG-Instanz sg-hero): Rückruf-Bereich dauerhaft offen, ohne «Lieber Rückruf anfragen».
   *  «Weitere Angaben · optional» ist bereits im HTML eingeklappt (ohne JS per noscript offen); Button ohne Auswahl
   *  «Termin anfragen», Terminart beim Absenden Pflicht. */
  rueckrufOffen?: boolean;
  /** Standard für alle Patienten-Kontaktformulare (seit Rollout 16.10.2026; `false` = alte Gestaltung): ruhige Gestaltung. Schwarzer Kopf, Erstbehandlung zuerst, kurze
   *  Angebotstexte ohne Badge, gekürzte Hinweise (kompakter Datenschutz-Link), «Telefonnummer *», kein Anruf-Block.
   *  Global (ohne standortId, Homepage): Standortauswahl vor den Kacheln, optionale Angaben eingeklappt, Check-in-Kachel
   *  nur für freigegebene Ziele, OneDoc/Kontaktlinks nur mit kanonischen Daten des gewählten Ziels. Styling über .kf--ruhig. */
  ruhig?: boolean;
  /** Nur SG unten (sg-unten): optionale Angaben offen statt eingeklappt. */
  zusatzOffen?: boolean;
  /** Nur SG unten (sg-unten): ohne OneDoc-Alternativbereich im Formular (Trennlinie, Button, Hinweis); das echte
   *  OneDoc-Widget #online-buchen folgt direkt darunter. Formular endet nach Anfragebutton + Datenschutz. */
  ohneOnedocAlternative?: boolean;
  /** Nur SG oben (sg-hero): dezente Textlinks «Anrufen · WhatsApp» unter OneDoc; Überschrift «Oder direkt Kontakt
   *  aufnehmen». tel aus dem festen Standort, wa = bestehendes kanonisches SG-WhatsApp-Ziel (inkl. Nachrichtentext). */
  kontaktLinks?: { wa: string };
  /** Bestehender WhatsApp-Link der ersetzten Karte (bleibt als Textlink erhalten). */
  waHref?: string;
  cardStyle?: string;
  extraClass?: string;
}

const esc = (s: string) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtTel = (digits: string) => '+' + digits.replace(/^(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
const telHref = (t: string) => 'tel:' + t.replace(/[^\d+]/g, '');
/** Zentrale Terminkoordination (bestehende Kontaktlogik der globalen Formulare). */
export const ZENTRAL_TEL = fmtTel(site.whatsapp);

export const clinicById = (id: string) => clinics.find((c) => c.id === id);
export const checkinFreigegeben = (id?: string) => !!id && Object.prototype.hasOwnProperty.call(CHECKIN_FREIGABE, id);
const onedocFor = (id?: string) => (id && (ONEDOC as Record<string, { href: string; anchor: string; direkt?: { checkin: string | null; behandlung: string | null } }>)[id]) || null;

const GIFT = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"/></svg>';
// WhatsApp-Logo (gleicher Pfad wie StickyCtaBar), dekorativ.
const WA_ICON = '<svg class="kf-alt-ic" viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>';
const PHONE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2.01z"/></svg>';

// Kanonische Ziele (src/data/kontakt-angebote.mjs, abgeleitet aus locations.ts) + OneDoc nur für Ziele der Art
// «behandlung» des regulären Standorts (nie für Partnerpraxis-, Vormerk- oder Routing-Ziele).
const globalOptions = () => kontaktZiele().map((z: any) => ({ ...z, tel: z.tel ?? ZENTRAL_TEL,
  onedoc: z.art === 'behandlung' && z.value === clinicById(z.id)?.name ? onedocFor(z.id)?.href ?? '' : '' }));
/** Vorauswahl: exakter kanonischer value > sichtbares Label > Standort-ID (dann das Standard-Ziel dieses Standorts,
 *  wie PLANNED_PRESELECT) > Altwert «<id>-<n>» der früheren Homepage-Liste. Nie mehrere Optionen markieren. */
export const pickZiel = (opts: { value: string; label: string; id: string; standard: boolean }[], v?: string) => {
  if (!v) return -1;
  let i = opts.findIndex((x) => x.value === v); if (i >= 0) return i;
  i = opts.findIndex((x) => x.label === v); if (i >= 0) return i;
  i = opts.findIndex((x) => x.id === v && x.standard); if (i >= 0) return i;
  const m = v.match(/^(.+)-(\d+)$/); if (m) { const same = opts.filter((x) => x.id === m[1]); if (same[+m[2]]) return opts.indexOf(same[+m[2]]); }
  return -1;
};

export function renderKontaktForm(o: KontaktFormOpts): string {
  const inst = o.instance.replace(/[^a-z0-9-]/gi, '-');
  const p = `kf-${inst}`;
  const fixed = o.standortId ? clinicById(o.standortId) : undefined;
  if (o.standortId && !fixed) throw new Error(`kontakt-form: unbekannter Standort ${o.standortId}`);
  if (fixed && fixed.status !== 'operational') throw new Error(`kontakt-form: fester Standort ${fixed.id} ist nicht operativ (Vormerk-Formular verwenden)`);
  const checkinOk = fixed ? checkinFreigegeben(fixed.id) : true; // global: Kachel sichtbar, Wahl an Freigabe gebunden
  const onlyBehandlung = !!fixed && !checkinOk;
  const pre = onlyBehandlung ? 'behandlung' : o.terminart;
  const fixedTel = fixed ? fixed.phone : ZENTRAL_TEL;
  const onedoc = fixed ? onedocFor(fixed.id) : null;
  const H = o.headingTag ?? 'h3';
  const sitekey = o.sitekey ?? '__TURNSTILE_SITEKEY__';
  const scopeNames = checkinStandortNamen().join(', ');
  const hidden = (n: string, v?: string) => (v ? `<input type="hidden" name="${n}" value="${esc(v)}">` : '');

  const K = !!o.heroKompakt;
  const RO = K && !!o.rueckrufOffen;
  const optOffen = !!(o.anliegen ?? '').trim();
  const Q = o.ruhig !== false;
  const QG = Q && !fixed; // ruhig + global (Homepage, /kontakt/, Leaves): keine SG-spezifische Standortlogik
  const OE = RO || (Q && !o.zusatzOffen); // «Weitere Angaben · optional» als eingeklappte Disclosure
  // Ruhig (SG): kurze Angebotstexte (Mockup 16.10.2026); Erstbehandlung zuerst (dezent mint), Check-in als zweite Option.
  const tileCheckin = onlyBehandlung ? '' :
    `<label class="kf-opt kf-opt--checkin" for="${p}-ta-checkin">` +
    `<input class="kf-radio" type="radio" name="terminart" id="${p}-ta-checkin" value="checkin"${pre === 'checkin' ? ' checked' : ''} data-kf-angebot="${TERMINARTEN.checkin.id}">` +
    `<span class="kf-opt-body">` +
    (Q ? `<span class="kf-opt-t">${TERMINARTEN.checkin.label}</span><span class="kf-opt-dur">${TERMINARTEN.checkin.dauerMin} Minuten</span>` +
      `<span class="kf-opt-d">Zungen- und Pulsdiagnostik, persönliche Empfehlung und Krankenkassen-Check.</span>` +
      `<span class="kf-opt-note">Ohne Behandlung.</span>`
    : `<span class="kf-tag">${GIFT}<span>Kostenloser TCM-Check-in</span></span>` +
      (K ? `<span class="kf-opt-h">Finde heraus, ob TCM zu dir passt.</span><span class="kf-opt-d">30 Minuten persönliche TCM-Anamnese und Diagnostik.</span>`
         : `<span class="kf-opt-h">Dein Anliegen verstehen. Deinen nächsten Schritt finden.</span><span class="kf-opt-d">30 Minuten für eine persönliche TCM-Anamnese und Diagnostik.</span>`) +
      `<span class="kf-benefits" role="list">` +
      ['Gespräch zu deinen Beschwerden', 'TCM-Zungen- und Pulsdiagnostik', K ? 'Persönliche Empfehlung' : 'Persönliche Empfehlung zum weiteren Vorgehen'].map((t) => `<span class="kf-benefit" role="listitem">${CHECK}<span>${t}</span></span>`).join('') +
      `<span class="kf-benefit" role="listitem">${CHECK}<span>Krankenkassen-Check<span class="kf-benefit-sub">Hilfe bei der Abklärung deiner Zusatzversicherung.</span></span></span></span>` +
      `<span class="kf-opt-foot">Kostenlos · ohne Behandlung · ohne Verpflichtung</span>`) +
    (fixed ? '' : `<span class="kf-scope" data-kf-scope>Derzeit nur in ${esc(scopeNames)}</span>`) +
    `</span></label>`;
  const tileBehandlung =
    `<label class="kf-opt kf-opt--behandlung" for="${p}-ta-behandlung">` +
    `<input class="kf-radio" type="radio" name="terminart" id="${p}-ta-behandlung" value="behandlung"${pre === 'behandlung' ? ' checked' : ''} data-kf-angebot="${TERMINARTEN.behandlung.id}">` +
    `<span class="kf-opt-body"><span class="kf-opt-t">${TERMINARTEN.behandlung.label}</span>` + (Q ? `<span class="kf-opt-dur">${TERMINARTEN.behandlung.dauerMin} Minuten</span>` : '') +
    (Q ? `<span class="kf-opt-d">Persönliches Gespräch, TCM-Diagnostik und erste Behandlung.</span>`
    : `<span class="kf-opt-d">${K ? 'Gespräch und erste Behandlung.' : 'Für alle, die direkt mit der Behandlung starten möchten.'}</span>`) +
    `</span></label>`;

  const select = fixed ? '' :
    `<div class="kf-field"><label class="kf-label" for="${p}-standort">Standort ${Q ? '<span class="kf-star" aria-hidden="true">*</span>' : '<span aria-hidden="true">*</span>'}</label>` +
    `<select class="kf-input kf-select" id="${p}-standort" name="standort" required aria-describedby="${p}-standort-err">` +
    `<option value="">Standort auswählen</option>` +
    (() => { const opts = globalOptions(); const pi = pickZiel(opts, o.preselectStandort); return opts.map((x: any, i: number) =>
      `<option value="${esc(x.value)}" data-id="${x.id}" data-art="${x.art}"${x.standard ? ' data-default="1"' : ''} data-tel="${esc(x.tel)}"${x.checkin ? ' data-checkin="1"' : ''}${x.onedoc ? ` data-onedoc="${esc(x.onedoc)}"` : ''}${i === pi ? ' selected' : ''}>${esc(x.label)}</option>`).join(''); })() +
    `</select>` +
    `<p class="kf-ferr" id="${p}-standort-err" hidden></p></div>`;

  const sgOd = !!(o.onedocBeideTerminarten && fixed && onedoc);
  const onedocPanel = sgOd ?
    // SG-Seite: EIN Buchungselement, je nach Zustand sekundärer Link (ohne Auswahl) oder Hauptbutton (mit Auswahl).
    // Direktlinks je Termintyp nur aus der Konfiguration (verifiziert); sonst gemeinsame SG-Auswahl, neutral beschriftet.
    // Beide SG-Formulare: OneDoc unter dem Anfragebereich, dauerhaft sekundär (umrandet), Trennlinie «Oder direkt online buchen».
    `<p class="kf-od-sep"><span>${o.kontaktLinks ? 'Oder direkt Kontakt aufnehmen' : 'Oder direkt online buchen'}</span></p>` +
    `<div class="kf-onedoc kf-onedoc--sg" data-kf-onedoc-panel data-kf-od-mode="sg" data-kf-od-sekundaer` +
    ` data-kf-od-default="${esc(onedoc!.href)}"` +
    (onedoc!.direkt?.checkin ? ` data-kf-od-checkin="${esc(onedoc!.direkt.checkin)}"` : '') +
    (onedoc!.direkt?.behandlung ? ` data-kf-od-behandlung="${esc(onedoc!.direkt.behandlung)}"` : '') + `>` +
    `<a class="kf-btn kf-btn--outline" href="${esc(onedoc!.href)}" data-kf-onedoc data-kf-onedoc-anchor="${onedoc!.anchor}"><span class="kf-lt" data-kf-od-label>Termin online buchen</span> <span class="kf-arrow" aria-hidden="true">→</span></a>` +
    `<p class="kf-hint">Direkt bei OneDoc.</p>` +
    // Tracking: Anrufen → phone_click (data-kf-tel, kontakt-form.js); WhatsApp → globales wa_click (home.js, quelle form).
    (o.kontaktLinks ? `<p class="kf-alt" data-kf-kontakt-alt><a href="${telHref(fixed!.phone)}" data-kf-tel>${PHONE.replace('<svg ', '<svg class="kf-alt-ic" ')}<span>Anrufen</span></a><span class="kf-alt-sep" aria-hidden="true">·</span><a href="${esc(o.kontaktLinks.wa)}" target="_blank" rel="noopener">${WA_ICON}<span>WhatsApp</span></a></p>` : '') +
    `</div>`
  : (fixed ? onedoc : globalOptions().some((x) => x.onedoc)) ?
    `<div class="kf-onedoc" data-kf-onedoc-panel hidden>` +
    `<a class="kf-btn kf-btn--primary" href="${esc(onedoc?.href ?? '#')}" data-kf-onedoc${onedoc ? ` data-kf-onedoc-anchor="${onedoc.anchor}"` : ''}>Freie Termine ansehen <span aria-hidden="true">→</span></a>` +
    `<p class="kf-hint">Ersttermin mit Behandlung direkt bei OneDoc buchen.</p>` +
    `<a class="kf-link" href="#${p}-fields" data-kf-to-fields>Lieber einen Termin anfragen <span aria-hidden="true">↓</span></a></div>` : '';

  // Ruhig (ohne SG-OneDoc-Panel): Alternativen unter dem Anfragebutton wie in der oberen SG-Box. OneDoc nur mit
  // verifiziertem Kalender und nur bei «Ersttermin mit Behandlung» (wie bisher). Anrufen: fester Standort = dessen
  // kanonische Nummer (sofort sichtbar); global = Nummer des gewählten Ziels (data-tel), Block erst nach Zielwahl.
  // WhatsApp nur, wenn die bestehende WhatsApp-Nummer dieselbe ist (keine fremde/pauschale Nummer).
  const QA = Q && !sgOd;
  const waNr = (o.waHref ?? '').match(/wa\.me\/(\d+)/)?.[1] ?? '';
  const fixedNr = fixed ? fixed.phone.replace(/\D/g, '') : '';
  const odAlt = fixed ? onedoc : globalOptions().some((x) => x.onedoc) ? { href: '#', anchor: '' } : null;
  const altRuhig = QA ?
    `<div class="kf-alt-wrap" data-kf-alt-wrap${fixed ? ` data-kf-alt-tel="${esc(fixed.phone)}"` : ' hidden'}><p class="kf-od-sep"><span>Oder direkt Kontakt aufnehmen</span></p>` +
    (odAlt ? `<div class="kf-onedoc kf-onedoc--sg" data-kf-onedoc-panel hidden><a class="kf-btn kf-btn--outline" href="${esc(odAlt.href)}" data-kf-onedoc${odAlt.anchor ? ` data-kf-onedoc-anchor="${odAlt.anchor}"` : ''}><span class="kf-lt">Termin online buchen</span> <span class="kf-arrow" aria-hidden="true">→</span></a><p class="kf-hint">Direkt bei OneDoc.</p></div>` : '') +
    `<p class="kf-alt" data-kf-kontakt-alt${fixed ? '' : ' hidden'}><a href="${telHref(fixed ? fixed.phone : ZENTRAL_TEL)}" data-kf-tel>${PHONE.replace('<svg ', '<svg class="kf-alt-ic" ')}<span>Anrufen</span></a>` +
    (waNr ? `<span class="kf-alt-sep" aria-hidden="true" data-kf-wa-sep${fixed && waNr !== fixedNr ? ' hidden' : ''}>·</span><a href="${esc(o.waHref!)}" target="_blank" rel="noopener" data-kf-wa="${waNr}"${fixed && waNr !== fixedNr ? ' hidden' : ''}>${WA_ICON}<span>WhatsApp</span></a>` : '') +
    `</p></div>` : '';

  // Ruhig (SG, Homepage): verlangt Turnstile eine Interaktion, ist das Standard-Widget 300 px breit und würde in schmalen
  // Karten (z. B. 320 px Viewport: 234–252 px Inhalt) abgeschnitten bzw. die Karte verbreitern. Dann offizielle Grösse
  // «compact» (150×140). Inline am Kartenende (Karte dann vollständig geparst, kein Zwischen-Paint), weil Turnstile
  // implizit schon vor DOMContentLoaded rendert (kontakt-form.js ist dafür zu spät).
  const ts = `<div class="cf-turnstile kf-ts" data-sitekey="${esc(sitekey)}" data-appearance="interaction-only"></div>`;
  const tsSize = Q ? `<script>(function(e){if(e&&e.clientWidth&&e.clientWidth<300)e.setAttribute('data-size','compact')})(document.currentScript.parentNode.querySelector('.kf-ts'))</script>` : '';
  const note = `<p class="kf-note">Mit deiner Anfrage ist noch kein Termin gebucht.</p>`;
  const legalKurz = `<p class="kf-legal kf-legal--kurz"><a href="/datenschutz/">Datenschutz</a></p>`;
  const legal = `<p class="kf-legal">Deine Angaben verwenden wir nur zur Bearbeitung deiner Anfrage. Mehr in der <a href="/datenschutz/">Datenschutzerklärung</a>.</p>`;
  const field = (name: string, label: string, input: string, hint = '') =>
    `<div class="kf-field"><label class="kf-label" for="${p}-${name}">${label}</label>${input}${hint}<p class="kf-ferr" id="${p}-${name}-err" hidden></p></div>`;

  return (
    (o.compatAnchors ?? []).map((a) => `<span id="${esc(a)}" class="kf-compat-anchor" aria-hidden="true"></span>`).join('') +
    `<div class="inline-form-card kf${K ? ' kf--kompakt' : ''}${Q ? ' kf--ruhig' : ''}${o.extraClass ? ' ' + o.extraClass : ''}" id="${esc(o.cardId ?? p)}" data-kf data-kf-instance="${inst}"${RO || Q ? ' data-kf-submit-leer="Termin anfragen"' : ''} data-kf-conv="${o.conv ?? 'formular_senden'}"` +
    (fixed ? ` data-kf-standort="${esc(fixed.name)}" data-kf-standort-id="${fixed.id}" data-kf-standort-art="behandlung"` : ' data-kf-global="1"') +
    (fixed && checkinOk ? ' data-kf-checkin="1"' : '') + (o.autoprefill ? ` data-kf-autoprefill="${o.autoprefill}"` : '') +
    ` data-kf-scope-names="${esc(scopeNames)}"` + (o.cardStyle ? ` style="${esc(o.cardStyle)}"` : '') + `>` +
    `<link rel="stylesheet" href="/kontakt-form.css">` +
    `<form class="kf-form" novalidate data-kf-form${o.formId ? ` id="${esc(o.formId)}"` : ''}${o.formName ? ` name="${esc(o.formName)}" data-name="${esc(o.formName)}"` : ''} aria-labelledby="${p}-h">` +
    // Ruhig (SG): schwarzer Kopfbereich mit Überschrift und Subline, darunter weisser Formularbereich.
    (Q ? `<div class="kf-kopf"><${H} class="kf-h" id="${p}-h">Dein nächster Schritt beginnt hier.</${H}><p class="kf-kopf-sub">Direkt starten oder TCM zuerst kennenlernen.</p></div>`
      : `<${H} class="kf-h" id="${p}-h">Wie können wir dir helfen?</${H}>`) +
    // Kompakt: Schrittmarker ersetzt die Einleitung (Klasse kf-intro bleibt als JS-Einfügepunkt); Legend nennt Schritt 1 für Screenreader.
    // Ruhig (SG): schlichte Abschnittsüberschrift statt Schrittmarker; Legend nennt «Terminart wählen» für Screenreader.
    // Ruhig global: Standortauswahl vor «Terminart wählen» (Überschrift blendet bei Nicht-Behandlungszielen mit aus).
    (QG ? select : '') +
    (Q ? `<p class="kf-intro kf-sec-h" aria-hidden="true"${QG ? ' data-kf-ta-h' : ''}>Terminart wählen</p>`
      : K ? `<p class="kf-intro kf-step" aria-hidden="true"><span class="kf-step-n">1</span>Terminart wählen</p>` : `<p class="kf-intro">Wähle, was gerade zu dir passt.</p>`) +
    (fixed ? (K || Q ? '' : `<p class="kf-ort">Standort: <strong>${esc(fixed.name)}</strong></p>`) : QG ? '' : select) +
    `<fieldset class="kf-opts${onlyBehandlung ? ' kf-opts--single' : ''}" aria-describedby="${p}-ta-err"><legend class="kf-sr">Terminart wählen</legend>` +
    (Q ? tileBehandlung + tileCheckin : tileCheckin + tileBehandlung) + `<p class="kf-ferr" id="${p}-ta-err" hidden></p></fieldset>` +
    (fixed ? '' : `<p class="kf-note-scope" data-kf-scope-note hidden>Der kostenlose TCM-Check-in ist derzeit nur in ${esc(scopeNames)} verfügbar.</p>`) +
    // Nicht-Behandlungsziele (Vormerkung, Standort in Prüfung, Routing): Kacheln ausgeblendet, Bedeutung klar benannt.
    (fixed ? '' : `<div class="kf-ziel" data-kf-ziel hidden><p class="kf-ziel-h" data-kf-ziel-h></p><p class="kf-ziel-t" data-kf-ziel-t></p></div>`) +
    // Ruhig (SG): keine Zwischenüberschrift, nach den Kacheln folgt direkt «Telefonnummer *».
    (Q ? '' : K ? `<p class="kf-step kf-step--2"><span class="kf-step-n" aria-hidden="true">2</span>Rückruf anfragen</p>` : '') +
    (sgOd || QA ? '' : onedocPanel) +
    // Kompakt: Disclosure-Button (ohne JS verborgen, Bereich dann offen); JS schliesst den Bereich initial.
    (K && !RO ? `<button type="button" class="kf-disclose" id="${p}-rr-btn" aria-expanded="true" aria-controls="${p}-fields" data-kf-rr hidden><span>Lieber Rückruf anfragen</span><span class="kf-chev" aria-hidden="true"></span></button>` : '') +
    `<div class="kf-fields" id="${p}-fields" tabindex="-1">` +
    field('tel', Q ? 'Telefonnummer <span class="kf-star" aria-hidden="true">*</span>' : 'Telefon <span aria-hidden="true">*</span>', `<input class="kf-input" id="${p}-tel" name="telefon" type="tel" inputmode="tel" autocomplete="tel" placeholder="Deine Telefonnummer" required aria-required="true" aria-describedby="${p}-tel-hint ${p}-tel-err">`, `<p class="kf-fhint" id="${p}-tel-hint">Wir rufen dich zur Terminvereinbarung zurück.</p>`) +
    (OE ? `<button type="button" class="kf-disclose kf-disclose--sub" id="${p}-opt-btn" aria-expanded="${optOffen}" aria-controls="${p}-opt" data-kf-opt><span>Weitere Angaben · optional</span><span class="kf-chev" aria-hidden="true"></span></button>` +
      `<noscript><style>#${p}-opt{display:block!important}#${p}-opt-btn{display:none!important}</style></noscript><div class="kf-optgroup" id="${p}-opt"${optOffen ? '' : ' hidden'}>`
    : K ? `<button type="button" class="kf-disclose kf-disclose--sub" id="${p}-opt-btn" aria-expanded="true" aria-controls="${p}-opt" data-kf-opt hidden><span>Weitere Angaben · optional</span><span class="kf-chev" aria-hidden="true"></span></button><div class="kf-optgroup" id="${p}-opt">` : '') +
    field('name', 'Dein Name <span class="kf-opt-l">· optional</span>', `<input class="kf-input" id="${p}-name" name="name" type="text" autocomplete="name" placeholder="Vor- und Nachname">`) +
    field('email', 'E-Mail <span class="kf-opt-l">· optional</span>', `<input class="kf-input" id="${p}-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="name@beispiel.ch" aria-describedby="${p}-email-err">`) +
    field('anliegen', 'Dein Anliegen <span class="kf-opt-l">· optional</span>', `<textarea class="kf-input kf-textarea" id="${p}-anliegen" name="anliegen" rows="2" placeholder="Was möchtest du uns mitgeben?">${esc(o.anliegen ?? '')}</textarea>`) +
    (o.wunschzeit ? field('wunschzeit', 'Wunschzeit <span class="kf-opt-l">· optional</span>', `<input class="kf-input" id="${p}-wunschzeit" name="wunschzeit" type="text" placeholder="z. B. Do Nachmittag">`) : '') +
    (K || OE ? `</div>` : '') +
    `<p class="kf-req"><span aria-hidden="true">*</span> Pflichtfeld</p>` +
    `<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="kf-hp">` +
    (fixed ? hidden('standort', fixed.name) : '') +
    hidden('quelle', o.quelle) + hidden('formular', o.formular) + hidden('quelle_detail', o.quelleDetail) + hidden('seite', o.seite) +
    hidden('anfrage_typ', o.anfrageTyp) + hidden('typ', o.typ) + `<input type="hidden" name="cta_pos" value="">` +
    (K ? '' : ts) +
    `<button type="submit" class="kf-btn kf-btn--primary kf-submit" data-kf-submit>${RO || Q ? 'Termin anfragen' : 'Anfrage senden'} <span aria-hidden="true">→</span></button>` +
    (Q ? legalKurz : K ? legal + note : note + legal) +
    `<p class="kf-err" role="alert" data-kf-err hidden></p>` +
    // Kompakt: Turnstile ausserhalb des aufklappbaren Bereichs, damit das Widget nicht in einem verborgenen Container rendert.
    `</div>` + (K ? ts : '') + (sgOd ? (o.ohneOnedocAlternative ? '' : onedocPanel) : altRuhig) + `</form>` +
    // Ruhig (SG): Formular endet nach OneDoc; Anrufwege stehen im Hero und bei den Praxisangaben.
    (Q ? '' : `<div class="kf-call"><p class="kf-call-h">Lieber anrufen?</p>` +
    `<a class="kf-btn kf-btn--outline" href="${telHref(fixedTel)}" data-kf-tel>${PHONE}<span data-kf-tel-text>${esc(fixedTel)}</span></a>` +
    (o.waHref ? `<a class="kf-wa" href="${esc(o.waHref)}" target="_blank" rel="noopener">oder per WhatsApp schreiben</a>` : '') +
    `</div>`) +
    tsSize + `<script src="/kontakt-form.js" defer></script></div>`
  );
}

// ── Legacy-Upgrade: ersetzt allgemeine .inline-form-card-Formulare in erfassten Leaf-Bodies ─────────────────
const endOfDiv = (s: string, start: number): number => {
  const re = /<div\b|<\/div>/g; re.lastIndex = start; let depth = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(s))) { depth += m[0] === '</div>' ? -1 : 1; if (depth === 0) return m.index + 6; }
  return -1;
};
const attr = (html: string, name: string) => {
  const m = html.match(new RegExp(`<input[^>]*name="${name}"[^>]*value="([^"]*)"`)) || html.match(new RegExp(`<input[^>]*value="([^"]*)"[^>]*name="${name}"`));
  return m ? m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"') : '';
};
const decode = (s: string) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

/** Ausnahmen (bewusst NICHT umgewandelt): Massage-Anfragen, Zürich-Routing-Funnel, Wartelisten (andere Klassen). */
export const isSpecialLegacyForm = (card: string) =>
  /name="anfrage_typ" value="(massage|zuerich-routing)"/.test(card) || /name="formular" value="Zürich-Funnel"/.test(card) ||
  /name="quelle" value="[^"]*massage[^"]*"/.test(card);

export interface UpgradeCtx { path: string; standortId?: string; instancePrefix?: string; sitekey?: string; extra?: Partial<KontaktFormOpts> }
/** Ersetzt jede allgemeine Legacy-Karte (.inline-form-card mit .inline-form) durch das gemeinsame Formular. */
export function upgradeLegacyForms(html: string, ctx: UpgradeCtx): string {
  let out = ''; let pos = 0; let n = 0;
  const marker = /<div class="inline-form-card"[^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = marker.exec(html))) {
    const start = m.index; const end = endOfDiv(html, start);
    if (end < 0) break;
    const card = html.slice(start, end);
    if (!/<form class="inline-form"/.test(card) || isSpecialLegacyForm(card)) { marker.lastIndex = end; continue; }
    const ta = card.match(/<textarea[^>]*name="(?:anliegen|behandlung)"[^>]*>([\s\S]*?)<\/textarea>/);
    const sel = card.match(/<option[^>]*value="([^"]*)"[^>]*selected[^>]*>/) || card.match(/<option[^>]*selected[^>]*value="([^"]*)"/);
    const wa = card.match(/<a href="(https:\/\/wa\.me\/[^"]*)"[^>]*class="form-wa-alt-new"/);
    const style = (m[0].match(/style="([^"]*)"/) || [])[1];
    n += 1;
    out += html.slice(pos, start) + renderKontaktForm({
      instance: `${ctx.instancePrefix ?? 'leaf'}${n > 1 ? '-' + n : ''}`,
      standortId: ctx.standortId,
      preselectStandort: sel ? decode(sel[1]) : undefined,
      quelle: attr(card, 'quelle') || undefined,
      formular: attr(card, 'formular') || undefined,
      quelleDetail: attr(card, 'quelle_detail') || undefined,
      anfrageTyp: attr(card, 'anfrage_typ') || undefined,
      anliegen: ta ? decode(ta[1]) : undefined,
      waHref: wa ? decode(wa[1]) : undefined,
      sitekey: ctx.sitekey,
      cardStyle: style,
      ...(ctx.extra ?? {}),
    });
    pos = end; marker.lastIndex = end;
  }
  return out + html.slice(pos);
}
