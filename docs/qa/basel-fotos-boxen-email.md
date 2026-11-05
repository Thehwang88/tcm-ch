# Basel-Fotos, Basel-Beschwerden wie St. Gallen, E-Mail Pflicht (05.11.2026)

## Basel-Praxisbilder
- Die Bilder sind Fotos der Basler Praxisräume.
- Beschriftung beider Bilder: «Einblick in unsere Praxisräume in Basel».
- Alt-Texte ohne «Visualisierung», «Symbolbild» oder «geplant».
- Dateien umbenannt: `basel-empfang(-800).webp`, `basel-lounge(-600).webp`. Inhalt bytegleich, keine EXIF/XMP-Daten. Layout unverändert.
- Ältere QA-Dokumente (z. B. `pr105-abschluss.md`) beschreiben den damaligen Stand und bleiben als Protokoll unverändert.

## Basel-Beschwerden
- Gemeinsame Liste `NETZ_BESCHWERDEN` in `src/data/standorte.ts`, genutzt von St. Gallen (`SG_BESCHWERDEN` in `[slug].astro`) und Basel (`beschwerden`).
- Basel zeigt damit dieselben 8 Boxen in derselben Reihenfolge wie St. Gallen: Rücken, Nacken, Migräne, Schlaf, Stress/Burnout, Verdauung, Zyklus, Kinderwunsch.
- Ischias ist keine Box mehr, wird aber in der Basel-FAQ weiter genannt.
- Überschrift, Intro und CTA der Basel-Sektion bleiben Basel-spezifisch (bestehende Komponente `Beschwerden.astro`, gleicher Kartenaufbau wie St. Gallen).
- Andere Standorte sind unverändert. Die St.-Gallen-Ausgabe ist bis auf das E-Mail-Feld bytegleich zu main.

## EN-Review Basel (`location:basel`)
- Die DE-Änderungen betreffen `praxisBilder` (EN nutzt sie nicht) und `beschwerden`. Die EN-Seite bildet `beschwerden` auf ihre Condition-Karten ab.
- EN Basel zeigt neu dieselben 8 Themen, alle mit freigegebenen EN-Seiten (`/en/conditions/…`), statt bisher 6 plus «Ischias – Guide currently in German». Alle Ziele existieren und sind publiziert.
- Weitere EN-Inhalte unverändert. Deshalb wurde ausschliesslich der Fingerprint `location:basel` aktualisiert.
- Vorbestehend und separat: Warnung `condition:menstrual-issues`.

## E-Mail Pflicht (gemeinsames Patientenformular)
- Sichtbare Reihenfolge: «Dein Name *» → «Telefonnummer *» → «E-Mail *». Alle drei immer sichtbar; Anliegen und Wunschzeit bleiben optional (eingeklappt).
- Browser:
  - leer → «Bitte gib deine E-Mail-Adresse an.»
  - ungültig → bestehende Meldung «Bitte prüfe deine E-Mail-Adresse.»
  - Fokus auf das erste fehlerhafte Feld; kein Versand und keine Conversion.
- Server (nur im Pfad des gemeinsamen Formulars, Angebots-IDs): leer → `422 missing_email`, ungültig → `422 invalid_email`.
- Unverändert: Wartelisten, Akademie/QI Club, Partner/Nachfolge, Zürich-Funnel, Massage-Einzelformulare, EN-Formular (dort E-Mail bereits Pflicht), historische SG-IDs.
