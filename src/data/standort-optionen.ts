// Formular-Optionen für Standorte, die noch nicht eröffnet sind (Stand 11.10.2026).
// EINE Quelle für TerminForm, KontaktForm, MassageAnfrageForm, den Zürich-Funnel und die
// captured Inline-Selects. Der value landet unverändert im Betreff der Anfrage
// ("Terminanfrage – …"), damit das Team ohne Rückfrage richtig routet.
// Nach bestätigter Eröffnung: Einträge hier zurück auf den reinen Standortnamen setzen.
export type StandortOption = { value: string; label: string };

export const OERLIKON_JETZT: StandortOption = {
  value: 'Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3',
  label: 'Zürich Oerlikon – Partnerpraxis Praxis Hwang (Termine jetzt)',
};
export const OERLIKON_NEU: StandortOption = {
  value: 'Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung',
  label: 'Zürich Oerlikon – neue Praxis (Eröffnung geplant 1.12.2026)',
};
export const BASEL_VORMERKEN: StandortOption = {
  value: 'Basel – Vormerkung, Eröffnung geplant März 2027',
  label: 'Basel (Eröffnung geplant März 2027)',
};
export const LUZERN_VORMERKEN: StandortOption = {
  value: 'Luzern – Vormerkung, Eröffnung 2027',
  label: 'Luzern (Eröffnung 2027)',
};

/** Ersetzt einen Standortnamen durch seine status-bewussten Optionen (sonst unverändert). */
export const expandStandort = (name: string): StandortOption[] =>
  name === 'Zürich Oerlikon' ? [OERLIKON_JETZT, OERLIKON_NEU]
    : name === 'Basel' ? [BASEL_VORMERKEN]
      : name === 'Luzern' ? [LUZERN_VORMERKEN]
        : [{ value: name, label: name }];

/** Vorauswahl auf Standortseiten geplanter Standorte (Slug → value). */
export const PLANNED_PRESELECT: Record<string, string> = {
  'zuerich-oerlikon': OERLIKON_NEU.value,
  basel: BASEL_VORMERKEN.value,
  luzern: LUZERN_VORMERKEN.value,
};
