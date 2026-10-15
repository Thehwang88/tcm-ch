// Gemeinsames Kontaktformular (seit 15.10.2026): EINZIGE Quelle für Terminarten, Angebots-IDs und die
// Standort-Freigabe des kostenlosen TCM-Check-ins. Plain JS (ESM), damit Astro-Build (src/lib/kontakt-form.ts),
// Pages Function (functions/api/anfrage.js) und Gates (scripts/check-kontakt-formular.mjs) dieselbe Datei lesen.
//
// Freigabe-Regel: Ein Standort erhält den Check-in NUR mit explizitem Eintrag in CHECKIN_FREIGABE (Name exakt wie
// im Formular-/Mail-Feld «Standort»). Kein Eintrag = keine Check-in-Kachel auf der Standortseite, im globalen
// Formular nicht wählbar, und der Server lehnt TCM_CHECKIN für diesen Standort ab (422 invalid_offer_scope).
// Historische IDs (FIRST30_*, ERSTTERMIN_REGULAER_SG) bleiben serverseitig gültig (offene Browser-Tabs), werden
// aber von keinem Formular mehr gesendet.

export const TERMINARTEN = {
  checkin: {
    id: 'TCM_CHECKIN',
    terminart: 'checkin',
    label: 'Kostenloser TCM-Check-in',
    /** Mail: Klassifikation zuoberst, Betreff-Suffix. Texte kommen NIE vom Client. */
    art: 'KOSTENLOSER TCM-CHECK-IN',
    beschreibung: 'Kostenloser TCM-Check-in: 30 Minuten persönliche TCM-Anamnese und Diagnostik, ohne Behandlung, ohne Verpflichtung',
    betreff: ' · TCM-Check-in',
    submit: 'TCM-Check-in anfragen →',
  },
  behandlung: {
    id: 'ERSTTERMIN_BEHANDLUNG',
    terminart: 'behandlung',
    label: 'Ersttermin mit Behandlung',
    art: 'ERSTTERMIN MIT BEHANDLUNG',
    beschreibung: 'Ersttermin mit Behandlung (kostenpflichtig, Abrechnung nach Tarif)',
    betreff: ' · Ersttermin mit Behandlung',
    submit: 'Ersttermin anfragen →',
  },
};

/** Standort-Freigaben für den kostenlosen TCM-Check-in. Schlüssel = Standort-ID (src/data/locations.ts). */
export const CHECKIN_FREIGABE = {
  'st-gallen': { name: 'St. Gallen', freigabe: 'Inhaber-Auftrag 15.10.2026 (ersetzt FIRST 30)' },
};

/** Verifizierte OneDoc-Kalender für «Ersttermin mit Behandlung». Nur bestehende Ziele, keine erfundenen Kalender.
 *  href = Seite mit eingebettetem OneDoc-Widget; auf dieser Seite selbst springt der Button zum Anker. */
export const ONEDOC = {
  'st-gallen': { href: '/standorte/st-gallen/#online-buchen', anchor: 'online-buchen', terminart: 'behandlung' },
};

export const checkinStandortNamen = () => Object.values(CHECKIN_FREIGABE).map((f) => f.name);
export const OFFER_BY_ID = Object.fromEntries(Object.values(TERMINARTEN).map((t) => [t.id, t]));
