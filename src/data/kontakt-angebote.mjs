// Gemeinsames Kontaktformular (seit 15.10.2026): EINZIGE Quelle für Terminarten, Angebots-IDs und die
// Standort-Freigabe des kostenlosen TCM-Check-ins. Plain JS (ESM), damit Astro-Build (src/lib/kontakt-form.ts),
// Pages Function (functions/api/anfrage.js) und Gates (scripts/check-kontakt-formular.mjs) dieselbe Datei lesen.
//
// Freigabe-Regel: Ein Standort erhält den Check-in NUR mit explizitem Eintrag in CHECKIN_FREIGABE (Name exakt wie
// im Formular-/Mail-Feld «Standort»). Kein Eintrag = keine Check-in-Kachel auf der Standortseite, im globalen
// Formular nicht wählbar, und der Server lehnt TCM_CHECKIN für diesen Standort ab (422 invalid_offer_scope).
// Historische IDs (FIRST30_*, ERSTTERMIN_REGULAER_SG) bleiben serverseitig gültig (offene Browser-Tabs), werden
// aber von keinem Formular mehr gesendet.
//
// Standort-Ziele (kontaktZiele): kanonisch aus src/data/locations.ts (status + vorab[].art). Jedes Ziel hat eine
// Zielart, die Auswahl, Button, Bestätigung, Mail und Server-Validierung bestimmt:
//   behandlung = operative Praxis bzw. ausdrücklich verfügbare Partnerpraxis → Check-in (falls freigegeben) oder Ersttermin
//   vormerkung = geplanter Standort → Termininteresse nach Eröffnung (keine Diagnostik, keine sofortige Behandlung)
//   anfrage    = Standort in Prüfung → neutrale Anfrage ohne Behandlungszusage
//   routing    = «Andere / in meiner Nähe» → passende Praxis vorschlagen, kein Praxisstatus
// Der Client sendet den kanonischen value (Ziel) + standort_id; der Server akzeptiert nur bekannte Ziele und die
// zur Zielart passende Angebots-ID.
import { clinics } from './locations.ts';

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
  vormerkung: {
    id: 'VORMERKUNG',
    terminart: 'vormerkung',
    label: 'Vormerkung',
    art: 'VORMERKUNG (STANDORT NOCH NICHT OFFEN)',
    beschreibung: 'Termininteresse nach Eröffnung – keine Behandlung und keine Diagnostik vor der Eröffnung zugesagt',
    betreff: ' · Vormerkung',
    submit: 'Vormerkung senden →',
  },
  anfrage: {
    id: 'STANDORT_ANFRAGE',
    terminart: 'anfrage',
    label: 'Anfrage',
    art: 'ANFRAGE (STANDORT IN PRÜFUNG)',
    beschreibung: 'Neutrale Anfrage – Betrieb am Standort nicht bestätigt, keine Behandlungszusage; passende Praxis vorschlagen',
    betreff: ' · Standort in Prüfung',
    submit: 'Anfrage senden →',
  },
  routing: {
    id: 'ROUTING_ANFRAGE',
    terminart: 'routing',
    label: 'Anfrage passende Praxis',
    art: 'ROUTING-ANFRAGE (KEIN STANDORT GEWÄHLT)',
    beschreibung: 'Passende Praxis in der Nähe vorschlagen – kein Praxisstatus zugesagt',
    betreff: ' · Routing',
    submit: 'Passende Praxis anfragen →',
  },
};

/** Zielart, die eine Angebots-ID verlangt (checkin/behandlung → behandlung). */
export const ZIELART_FUER = { checkin: 'behandlung', behandlung: 'behandlung', vormerkung: 'vormerkung', anfrage: 'anfrage', routing: 'routing' };

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

/** Reihenfolge der globalen Standortauswahl (Vereinigung der bisherigen Listen; Bern nur mit eigener Warteliste). */
export const GLOBAL_ORDER = ['zuerich-oerlikon', 'zuerich-hoengg', 'winterthur-marktgasse', 'winterthur-muenzgasse', 'volketswil', 'frauenfeld', 'kreuzlingen', 'bottighofen', 'st-gallen', 'wil', 'rorschach', 'basel', 'luzern'];
export const ANDERE = { value: 'Andere / in meiner Nähe', label: 'Andere / in meiner Nähe', id: 'andere', art: 'routing' };

/** Kanonische Formularziele. value = bisheriger Options-/Mail-Wert (Routing durchs Team), unverändert übernommen.
 *  standard = Ziel bei Vorauswahl nur über die Standort-ID (planned: letzte vorab-Option, wie PLANNED_PRESELECT). */
export const kontaktZiele = () => {
  const out = [];
  for (const id of GLOBAL_ORDER) {
    const c = clinics.find((x) => x.id === id);
    if (!c) continue;
    if (c.status === 'operational') {
      out.push({ value: c.name, label: c.name, id, art: 'behandlung', standard: true, tel: c.phone, checkin: Object.prototype.hasOwnProperty.call(CHECKIN_FREIGABE, id) && CHECKIN_FREIGABE[id].name === c.name });
    } else {
      const vorab = c.vorab ?? [];
      vorab.forEach((o, i) => out.push({ value: o.value, label: o.label, id, art: o.art ?? (c.status === 'review' ? 'anfrage' : 'vormerkung'), standard: i === vorab.length - 1, tel: c.phone, checkin: false }));
    }
  }
  out.push({ ...ANDERE, standard: true, tel: null, checkin: false });
  return out;
};
export const zielFuer = (value) => kontaktZiele().find((z) => z.value === String(value ?? '').trim());
