// TCM.ch FIRST 30 · Pre-Christmas Edition 2026 — St. Gallen only.
// EINZIGE Quelle für Angebots-IDs, Kapazität, Edition-Claims und den Angebots-Wähler des unteren Formulars.
// Server-seitige Whitelist der IDs: functions/api/anfrage.js (OFFERS) — bei Änderungen beide Stellen pflegen.
//
// Betrieb (Team): Die verifizierte Zahl bestätigter FIRST-30-Termine wird NUR hier gepflegt, aus der
// Praxis-Agenda, nie geschätzt. Ablauf: docs/cro/07-first30-winter-2026.md.
//   confirmedClaims: null → Indikator zeigt nur "Limitierte FIRST 30 Vorweihnachtsgeschenke" (kein Prozent, kein Restbestand).
//   confirmedClaims: 8    → "8 / 10 Geschenke vergeben", Balken 80 %, "Nur noch 2 Geschenke verfügbar" (einmalige Einblend-Animation).
//   confirmedClaims: 10 oder campaignActive: false → FIRST 30 wird zur explizit beschrifteten Warteliste; regulär bleibt.
//   totalAllocation 10 ist die genehmigte Kapazität; 30 ist ein Vorschlag und NICHT freigegeben.
// Design-Vorschau (nur lokale Review-Builds, nie Produktion): src/data/first30.preview.json temporär auf claims 8 / cutoff true setzen.
// Countdown im WhatsApp-Button NUR bei bestätigtem täglichem Bearbeitungs-Cutoff (dailyCutoff.approved); kein Angebots-
// Ablauf, kein Reset-Trick. Design-Vorschau: FIRST30_PREVIEW_CUTOFF=1.

import preview from './first30.preview.json';

export const FIRST30 = {
  campaign: 'FIRST 30 · Pre-Christmas Edition 2026',
  identity: 'Dein exklusives Vorweihnachtsgeschenk',
  standort: 'St. Gallen',
  /** Genehmigte Gesamtkapazität dieser Edition (fix, keine Wochenkontingente). */
  totalAllocation: 10,
  /** Vom Team verifizierte, bestätigte FIRST-30-Termine (Agenda). null = nicht verifiziert. Nie automatisch erhöht. */
  confirmedClaims: null as number | null,
  verifiedAt: '',   // z. B. '2026-11-20 09:00'
  verifiedBy: '',   // z. B. 'Corinna R.'
  /** false, sobald die Edition offiziell beendet ist → regulärer St.-Gallen-Hero (HeroStandardSG), kein Geschenk-CTA mehr. */
  campaignActive: true,
  /** Offizielles Kampagnenende (ISO-Datum, Europe/Zurich), NUR nach Inhaber-Freigabe; leer = kein Enddatum. Nach diesem Datum
   *  gilt die Kampagne beim nächsten Build als geschlossen (statische Seite: Rebuild/Merge nötig, siehe docs/cro/07). */
  campaignEnd: '',
  /** Ausverkauft (confirmedClaims >= totalAllocation): true = explizit beschriftete Warteliste, false = Kampagnen-Hero weg, regulärer Hero. */
  waitlistEnabled: true,
  /** "The Once-a-Year Edition" / "jährlich" nur nach Inhaber-Bestätigung, dass 2026 keine weitere FIRST-30-Aktion läuft. */
  onceAYearApproved: false,
  /** Täglicher Bearbeitungs-Cutoff (Anfragen bis dahin werden am selben Tag für eine Bestätigung geprüft). Nur aktiv,
   *  wenn das Praxisteam den Prozess bestätigt hat. Zeit in Europe/Zurich, days = ISO-Wochentage (1 = Mo). */
  dailyCutoff: { approved: false, time: '17:00', timeZone: 'Europe/Zurich', days: [1, 2, 3, 4, 5, 6] },
  offers: {
    first30: { id: 'FIRST30_WINTER_2026_SG', label: 'FIRST 30 Pre-Christmas Edition 2026 – kostenloser 30-Minuten-Termin – St. Gallen' },
    waitlist: { id: 'FIRST30_WINTER_2026_SG_WARTELISTE', label: 'FIRST 30 Pre-Christmas Edition 2026 – Warteliste – St. Gallen' },
    regular: { id: 'ERSTTERMIN_REGULAER_SG', label: 'Regulärer Ersttermin – St. Gallen' },
  },
} as const;

export interface First30Indicator { mode: 'unverified' | 'verified' | 'full'; pct: number; head: string; sub: string }
export type First30CampaignState = 'active' | 'soldout-waitlist' | 'soldout-closed' | 'closed';
export interface First30State {
  campaign: First30CampaignState;
  /** true, wenn der Kampagnen-Hero gerendert wird (active oder soldout-waitlist). */
  showCampaign: boolean;
  max: number;
  reserved: number | null;
  remaining: number | null;
  indicator: First30Indicator;
  soldOut: boolean;
  onceAYear: boolean;
  preview: boolean;
  cutoffApproved: boolean;
  cutoffTime: string;
  cutoffDays: string;
  scarcityText: string;
  ribbon: string;
  gift: { id: string; label: string };
}

export const first30State = (): First30State => {
  // Vorschau-Werte (nur lokale Review-Builds) aus first30.preview.json; Produktion hält claims null / cutoff false.
  const prevReserved = typeof preview.claims === 'number' ? preview.claims : null;
  const prevCutoff = preview.cutoff === true;
  const prevActive = (preview as any).campaignActive;
  const active = typeof prevActive === 'boolean' ? prevActive : FIRST30.campaignActive;
  const ended = !!FIRST30.campaignEnd && new Date().toISOString().slice(0, 10) > FIRST30.campaignEnd;
  const reserved = prevReserved ?? FIRST30.confirmedClaims;
  const max = FIRST30.totalAllocation;
  const remaining = reserved == null ? null : Math.max(0, max - reserved);
  const full = reserved != null && reserved >= max;
  const campaign: First30CampaignState = (!active || ended) ? 'closed' : full ? (FIRST30.waitlistEnabled ? 'soldout-waitlist' : 'soldout-closed') : 'active';
  const soldOut = campaign !== 'active';
  const cutoffApproved = FIRST30.dailyCutoff.approved || prevCutoff;
  const scarcityText = campaign === 'closed' ? 'Die Pre-Christmas Edition 2026 ist beendet'
    : reserved == null ? `Nur ${max} exklusive Geschenke`
    : soldOut ? `Alle ${max} Geschenke vergeben`
    : `${reserved} von ${max} Geschenken vergeben · Nur noch ${remaining} verfügbar`;
  const indicator: First30Indicator = reserved == null
    ? { mode: 'unverified', pct: 0, head: 'Limitierte FIRST 30 Vorweihnachtsgeschenke', sub: `Maximal ${max} Geschenke in dieser Edition` }
    : soldOut
    ? { mode: 'full', pct: 100, head: `${max} / ${max} Geschenke vergeben`, sub: campaign === 'closed' ? 'Die Edition ist beendet' : 'Alle Geschenke vergeben · Warteliste möglich' }
    : { mode: 'verified', pct: Math.round((reserved / max) * 100), head: `${reserved} / ${max} Geschenke vergeben`, sub: `Nur noch ${remaining} ${remaining === 1 ? 'Geschenk' : 'Geschenke'} verfügbar` };
  return {
    campaign, showCampaign: campaign === 'active' || campaign === 'soldout-waitlist',
    max, reserved, remaining, soldOut, indicator,
    onceAYear: FIRST30.onceAYearApproved, preview: prevReserved != null || prevCutoff || typeof prevActive === 'boolean', scarcityText,
    cutoffApproved, cutoffTime: FIRST30.dailyCutoff.time, cutoffDays: FIRST30.dailyCutoff.days.join(''),
    ribbon: FIRST30.onceAYearApproved ? 'Once-a-Year Edition' : 'Pre-Christmas',
    gift: soldOut ? FIRST30.offers.waitlist : FIRST30.offers.first30,
  };
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const GIFT_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>';
const CAL_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>';

/**
 * Angebots-Wähler ÜBER dem bestehenden unteren Kontaktformular (/standorte/st-gallen/, Leaf, build-time Injektion
 * in standorte/[slug].astro). Radios stehen AUSSERHALB des Formulars (home.js serialisiert sonst den letzten Radio-
 * Wert); der Hero-Script (HeroLaunchSG) spiegelt die Wahl in das hidden Feld angebot_id des Formulars und passt
 * CTA/Reassurance an. Standard = regulär. Styles: .f30b-* in public/home.css.
 */
export const first30BottomSelectorHtml = (): string => {
  const st = first30State();
  if (!st.showCampaign) return '';
  const O = FIRST30.offers;
  const giftTitle = st.soldOut ? 'FIRST 30 Warteliste' : 'FIRST 30 Vorweihnachtsgeschenk';
  const giftSub = st.soldOut ? `Alle ${st.max} Geschenke vergeben · Warteliste` : '30 Minuten · CHF 0.–';
  return (
    `<fieldset class="f30b" data-f30-bottom data-first30="${st.soldOut ? 'soldout' : 'open'}">` +
    `<legend class="f30b-h">Wie möchtest du starten?</legend><p class="f30b-sub">Wähle, was am besten zu dir passt.</p>` +
    `<div class="f30b-grid">` +
    `<label class="f30b-opt f30b-opt--regular"><input type="radio" name="f30b_wahl" value="${O.regular.id}" data-f30-label="${esc(O.regular.label)}" checked>` +
    `<span class="f30b-box"><span class="f30b-ic">${CAL_SVG}</span><span class="f30b-l">Regulärer Ersttermin</span><span class="f30b-s">Individuelle Abklärung und Behandlung, wenn sinnvoll.</span><span class="f30b-check" aria-hidden="true">✓ Gewählt</span></span></label>` +
    `<label class="f30b-opt f30b-opt--gift"><input type="radio" name="f30b_wahl" value="${st.gift.id}" data-f30-label="${esc(st.gift.label)}">` +
    `<span class="f30b-box"><span class="f30b-ic">${GIFT_SVG}</span><span class="f30b-l">${esc(giftTitle)}</span><span class="f30b-s">${esc(giftSub)}</span><span class="f30b-check" aria-hidden="true">✓ Gewählt</span></span></label>` +
    `</div>` +
    `<div class="f30b-summary" data-f30b-summary hidden>` +
    (st.soldOut
      ? `<p><strong>Alle ${st.max} Geschenke sind vergeben.</strong> Wir setzen dich unverbindlich auf die Warteliste und melden uns, falls ein Platz frei wird. Ein regulärer Ersttermin ist jederzeit möglich.</p>`
      : `<p><strong>Dein FIRST 30 Vorweihnachtsgeschenk:</strong> 30 Minuten vor Ort, CHF 0.– – persönliches Gespräch, TCM-Kurzeinschätzung, drei Empfehlungen für deinen Alltag, Hilfe beim Zusatzversicherungs-Check und, wenn fachlich und zeitlich möglich, eine erste kurze Anwendung. Nur für neue Patient:innen, einmal pro Person. ${esc(st.scarcityText)}.</p>`) +
    `</div></fieldset>`
  );
};
