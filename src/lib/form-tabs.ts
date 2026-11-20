// Terminart-Tabs für die Anfragekarte (St.-Gallen-Vorlage, 20.11.2026): macht aus der gerenderten Karte des gemeinsamen
// Kontaktformulars (src/lib/kontakt-form.ts, Instanz mit festem, Check-in-freigegebenem Standort und checkinZuerst) eine Karte
// mit zwei Tabs (Radios bleiben), Angebotstext je Tab, vier Feldern mit Platzhaltern (Labels nur für Screenreader),
// ohne Anliegen/Hinweise, Turnstile nur bei Bedarf sichtbar. Reine String-Anpassung; Komponente, JS, IDs und Tracking
// bleiben unverändert. Styles: src/components/standort/SgLayoutStyles.astro (.kf.sgf.sgf). Guards statt stiller Fallbacks.
export interface TabsFormCopy {
  /** ID-Präfix der Instanz (kf-<instance>) und Karten-ID. */
  p: string; cardId: string;
  /** Inhalt Tab A (checkin) und Tab B (behandlung), jeweils <div class="sgf-panel sgf-panel--…">…</div>. */
  panelA: string; panelB: string;
  /** Optional: eigener Submit-Text für den Check-in (Standard «Gratis Check-in anfragen») und eigene Erfolgsmeldung (data-kf-ok-checkin). */
  submitCheckin?: string; okCheckin?: string;
  /** Alternativen-Block «Oder direkt Kontakt aufnehmen» (ruhige Karten ohne OneDoc) entfernen. */
  ohneAlternativen?: boolean;
}

/** Netzwerkweite Bewertungszeile (Werte wie /kontakt/), direkt über der Formularkarte. Nie als Bewertung eines einzelnen Standorts beschriften. */
export const NETWORK_REVIEW_STRIP = `
  <div class="sgt-network-proof" aria-label="TCM.ch Netzwerk: 4.89 von 5 Sternen aus über tausend Rezensionen">
    <div class="sgt-network-proof-label">
      <strong>Patientenbewertungen</strong>
      <span>TCM.ch Netzwerk · standortübergreifend</span>
    </div>
    <div class="sgt-network-proof-metrics">
      <div class="sgt-network-proof-metric">
        <strong>4.89</strong>
        <span class="sgt-network-proof-stars" aria-label="4.89 von 5 Sternen">★★★★★</span>
      </div>
      <div class="sgt-network-proof-metric sgt-network-proof-count">
        <strong>1'000+</strong>
        <span>Rezensionen</span>
      </div>
    </div>
  </div>`;

export const tabsForm = (raw: string, c: TabsFormCopy): string => {
  let card = raw;
  const { p, cardId } = c;
  const sub = (from: string | RegExp, to: string, name: string, optional = false) => {
    const n = typeof from === 'string' ? card.split(from).length - 1 : (card.match(from) || []).length;
    if (n > 1 || (n === 0 && !optional)) throw new Error(`form-tabs: «${name}» (${p}) ${n === 0 ? 'nicht' : 'mehrfach'} gefunden - kontakt-form.ts geändert?`);
    if (n === 1) card = card.replace(from, to);
  };
  const submitCheckin = c.submitCheckin ?? 'Gratis Check-in anfragen';
  // SSR lässt die Radios ungesetzt (JS wählt den Standard checkin), damit ?terminart=behandlung / #first30 / data-kf-terminart Vorrang haben.
  sub('value="checkin" checked data-kf-angebot="TCM_CHECKIN"', 'value="checkin" data-kf-angebot="TCM_CHECKIN"', 'Check-in-Radio');
  sub(`class="inline-form-card kf kf--ruhig kf--gelb" id="${cardId}"`, `class="inline-form-card kf kf--ruhig kf--gelb kf--checkin sgf" id="${cardId}"`, 'Karte');
  sub('data-kf-default="checkin" data-kf-submit-checkin="Gratis Check-in anfragen"',
    `data-kf-default="checkin"${c.okCheckin ? ` data-kf-ok-checkin="${c.okCheckin}"` : ''} data-kf-submit-checkin="${submitCheckin}"`, 'Submit-Label Check-in');
  sub('<p class="kf-kopf-sub">TCM zuerst kennenlernen oder direkt starten.</p>', '', 'Kopf-Subline');
  sub('<span class="kf-opt-t">Kostenloser TCM 360°-Check-in</span><span class="kf-opt-gueltig" data-kf-gueltig hidden>Buchung bis <span data-kf-gueltig-bis></span>, Termin auch später möglich.</span><span class="kf-opt-dur">30 Minuten</span><span class="kf-opt-d">Persönlicher TCM-Kurzcheck mit Zungen- und Pulsdiagnostik, Zeit für deine Fragen und Krankenkassen-Check.</span><span class="kf-opt-note">Ohne Behandlung. Unverbindlich.</span>',
    '<span class="kf-opt-t">30 Min. gratis</span>', 'Tab A');
  sub('<span class="kf-opt-t">Ersttermin mit Behandlung</span><span class="kf-opt-dur">90 Minuten · Krankenkasse anerkannt (Zusatzversicherung)</span><span class="kf-opt-d">Persönliches Gespräch, TCM-Diagnostik und erste Behandlung.</span>',
    '<span class="kf-opt-t">Ersttermin mit Behandlung</span>', 'Tab B');
  sub('</fieldset>', '</fieldset>' + c.panelA + c.panelB, 'Tab-Inhalte');
  sub(`for="${p}-name">Dein Name <span`, `for="${p}-name">Name <span`, 'Label Name');
  sub('placeholder="Vor- und Nachname"', 'placeholder="Name *"', 'Platzhalter Name');
  sub(`for="${p}-tel">Telefonnummer <span`, `for="${p}-tel">Handynummer <span`, 'Label Handynummer');
  sub(`placeholder="Deine Telefonnummer" required aria-required="true" aria-describedby="${p}-tel-hint ${p}-tel-err"`, `placeholder="Handynummer *" required aria-required="true" aria-describedby="${p}-tel-err"`, 'Platzhalter Handynummer');
  sub(`<p class="kf-fhint" id="${p}-tel-hint">Wir rufen dich zur Terminvereinbarung zurück.</p>`, '', 'Telefon-Hinweis');
  sub('placeholder="name@beispiel.ch" required aria-required="true"', 'placeholder="E-Mail *" required aria-required="true"', 'Platzhalter E-Mail');
  sub(new RegExp('<div class="kf-field"><label class="kf-label" for="' + p + '-anliegen">[\\s\\S]*?<p class="kf-ferr" id="' + p + '-anliegen-err" hidden></p></div>'), '', 'Feld Anliegen');
  sub('placeholder="z. B. Do Nachmittag"', 'placeholder="Wunschzeit (optional, z. B. Do Nachmittag)"', 'Platzhalter Wunschzeit');
  sub('data-appearance="always"', 'data-appearance="interaction-only"', 'Turnstile');
  sub('data-kf-submit>Gratis Check-in anfragen <span', `data-kf-submit>${submitCheckin} <span`, 'Submit-Text');
  sub('<p class="kf-legal kf-legal--kurz">', '<p class="sgf-note">Unverbindlich. Bestätigung per WhatsApp oder Telefon.</p><p class="kf-legal kf-legal--kurz">', 'Hinweis unter dem Button');
  if (c.ohneAlternativen) sub(/<div class="kf-alt-wrap"[\s\S]*?<\/p><\/div>/, '', 'Alternativen-Block', true);
  return card;
};
