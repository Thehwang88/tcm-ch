// Status-bewusste Formular-Optionen. EINE Quelle für TerminForm, KontaktForm, MassageAnfrageForm
// und den Zürich-Funnel. Steuerung ausschliesslich über clinic.status in src/data/locations.ts:
// solange 'planned', erscheinen statt des Standortnamens die vorab-Optionen (sofortige Alternative +
// Vormerkung). Kein Datum schaltet etwas frei. Captured Inline-Selects/Karten in den HTML-Bodies
// prüft scripts/check-clinic-status.mjs gegen denselben Status.
import { clinics } from './locations';

export type StandortOption = { value: string; label: string; labelEn?: string };

const geplant = () => clinics.filter((c) => c.status !== 'operational' && c.vorab?.length);

/** Ersetzt einen Standortnamen durch seine status-bewussten Optionen (sonst unverändert). */
export const expandStandort = (name: string): StandortOption[] =>
  geplant().find((c) => c.name === name)?.vorab ?? [{ value: name, label: name }];

/** Vorauswahl auf Standortseiten geplanter Standorte (Slug → value der Vormerk-Option). */
export const PLANNED_PRESELECT: Record<string, string> =
  Object.fromEntries(geplant().map((c) => [c.id, c.vorab!.at(-1)!.value]));
