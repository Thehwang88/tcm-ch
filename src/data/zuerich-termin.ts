// Zürcher Terminpräferenz-Optionen - EINE Quelle für alle Zürich-Formulare.
// Standorte kommen aus src/data/locations.ts (city === 'Zürich'). Neue Zürcher Praxis
// = Eintrag in locations.ts; sie erscheint hier automatisch.
// Status: allein clinic.status ('operational' | 'planned') entscheidet. Geplante Standorte erscheinen
// mit ihren vorab-Optionen (sofortige Alternative + Vormerkung), nie als reguläre Terminoption.
// KEINE datumsbasierte Freischaltung: ein Eröffnungsdatum ist rein informativ, bis die Inhaber:in
// den Betrieb bestätigt (Regressionstest: scripts/check-clinic-status.mjs).
// Öffnungszeiten schränken die Auswahl bewusst NICHT ein (kein "montags" o. Ä.) -
// Verfügbarkeit klärt das Booking/Routing nach der Anfrage.
import { clinics, type Clinic } from './locations';

/** Reihenfolge im Dropdown; nicht gelistete Zürcher Standorte folgen danach. */
const REIHENFOLGE = ['zuerich-oerlikon', 'zuerich-hoengg'];

/** Letzte Option: patient ist standortflexibel, wir wählen den passenden/frühesten Zürcher Standort.
 *  value bleibt unverändert (wird so an /api/anfrage bzw. ins Mail übergeben). */
export const ZH_FLEXIBEL = { value: 'Zürich – nächster freier Termin', label: 'Nächster freier Termin in Zürich' };

const rank = (c: Clinic) => { const i = REIHENFOLGE.indexOf(c.id); return i < 0 ? 99 : i; };

export const zuerichStandorte = (): Clinic[] =>
  clinics.filter((c) => c.city === 'Zürich').sort((a, b) => rank(a) - rank(b));

const aktiv = (c: Clinic) => c.status === 'operational';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** <option>-Liste der Zürcher Standorte: operative als reguläre Option, geplante mit ihren vorab-Optionen. */
export const zhStandortOptionsHtml = (selected?: string): string =>
  zuerichStandorte()
    .flatMap((c) => aktiv(c)
      ? [`<option value="${esc(c.name)}"${c.name === selected ? ' selected' : ''}>${esc(c.name)}</option>`]
      : (c.vorab ?? []).map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`))
    .join('');
