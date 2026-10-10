# Quellen- und Qualitätsprüfung Laborwert-Seiten (Vorbereitung, 10.10.2026)

Arbeitsliste: `seo/laborwerte-quellenpruefung-2026-10-10.csv` (21 Seiten aus dem GSC-Export
"Gefunden – zurzeit nicht indexiert"; Spalten für Reviewer, Prüfdatum, neue Quellen sind leer).
Es wurden **keine Inhalte geändert und keine medizinischen Aussagen ergänzt**.

## Ausgangslage (bestätigt)

- Datenquelle: `src/data/befunde-werte.ts`. Das Feld `sources` existiert im Typ und wird vom Template
  (`src/pages/gesundheitsbibliothek/befunde-werte/[slug].astro`) als Quellenliste gerendert, ist aber bei
  **allen 62 Einträgen leer**, also auch bei allen 21 betroffenen Seiten.
- Jeder Eintrag nennt einen `suggestedReviewerType` (z. B. "Ärztliche Review (Innere Medizin/Hepatologie)"),
  ein Review ist aber nirgends dokumentiert, und das Schema enthält keinen `reviewedBy`.
- Positiv: Die Seiten nennen keine festen Referenzwerte (laborabhängig), trennen "was der Wert nicht
  beweist" sauber ab, haben Red Flags und ordnen TCM ausdrücklich nicht als Interpretation des Werts ein.
- Struktur je Seite: Kurzantwort, 3 bis 4 Sachabschnitte, "Was der Wert nicht beweist", Folgeabklärung,
  Red Flags, integrative Einordnung.

## Prüfkriterien je Seite

1. **Jede Sachaussage belegbar:** Ursachenlisten, "Schlüsselwert"-Aussagen (z. B. Gamma-GT bei AP,
   Transferrinsättigung bei Ferritin, Lipase vor Amylase) und Red Flags gegen eine zitierfähige Quelle
   prüfen. Nicht belegbare Aussagen streichen oder abschwächen, nicht ersetzen.
2. **Absolute Formulierungen** ("immer", "nie", "praktisch nie", "fast immer"; in der CSV je Seite
   aufgelistet): nur stehen lassen, wenn die Quelle das trägt.
3. **Keine Zahlen ohne Laborbezug:** Referenzbereiche nur mit Hinweis auf das jeweilige Labor oder gar nicht.
4. **Red Flags vollständig und konkret:** Was heisst "zügig" (gleicher Tag, Tage)? Notfallzeichen
   (z. B. bei Kalium) klar vom Routine-Befund trennen.
5. **Integrative Einordnung:** keine Wirkaussage zu TCM am Laborwert; Wortwahl gemäss CLAUDE.md.
6. **Review dokumentieren:** Name, Fachrichtung, Datum; erst danach `reviewedBy`/`lastReviewed` im Schema.

## Zulässige Quellentypen (Rangfolge)

1. Aktuelle Leitlinien von Fachgesellschaften (AWMF-Register, Schweizer bzw. europäische Fachgesellschaften).
2. Referenz- und Präanalytik-Handbücher von Schweizer Laboren bzw. Spitallaboren (für Einflussfaktoren,
   nicht für allgemeine Grenzwerte).
3. Etablierte Lehrbücher der Inneren Medizin / Labormedizin, aktuelle Auflage.
4. Systematische Reviews für Einzelaussagen.

Nicht als Quelle: Patientenforen, Anbieter-Blogs, KI-generierte Zusammenfassungen, Quellen ohne Datum.
Jede Quelle wird vor der Aufnahme geöffnet und die konkrete Aussage darin gefunden; keine Quelle
"aus dem Gedächtnis" eintragen.

## Ablauf

1. Reviewer je Fachrichtung zuordnen (Spalte `reviewer_typ`): Hämatologie 7, Hepatologie 5,
   Gastroenterologie 2, Endokrinologie 2, Nephrologie 2, Allergologie 1, Rheumatologie 1, Labormedizin 1.
2. Pilot mit 3 Seiten: ferritin-erhoeht, gamma-gt-erhoeht, vitamin-d-zu-niedrig (Auswahl nach
   erwarteter Nachfrage; Suchvolumen vor Start mit Semrush/GSC bestätigen).
3. Pro Seite: Aussagen prüfen, Quellen in `sources` eintragen, nötige Korrekturen als Diff zur
   Freigabe vorlegen (keine automatische Umschreibung).
4. Danach Review-Angaben ins Schema, Seite in die Index-Queue, Wirkung nach 3 bis 4 Wochen in GSC prüfen.
5. Bei Erfolg auf die übrigen 41 Laborwert-Seiten ausweiten (gleiches Problem, nicht Teil dieses Exports).

## Seiten

| Gruppe | Seiten |
|---|---|
| Leber & Enzyme | alkalische-phosphatase-erhoeht, bilirubin-erhoeht, gamma-gt-erhoeht, got-ast-erhoeht, gpt-alt-erhoeht, ldh-erhoeht |
| Bauchspeicheldrüse | amylase-erhoeht, lipase-erhoeht |
| Blutbild | basophile-erhoeht, eosinophile-erhoeht, monozyten-erhoeht, neutrophile-erhoeht, haemoglobin-zu-hoch, haemoglobin-zu-niedrig |
| Elektrolyte | calcium-zu-hoch, kalium-zu-hoch, natrium-zu-hoch |
| Stoffwechsel | harnsaeure-erhoeht |
| Vitamine & Eisenspeicher | ferritin-erhoeht, vitamin-b12-zu-niedrig, vitamin-d-zu-niedrig |
