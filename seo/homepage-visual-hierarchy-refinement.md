# Homepage: visuelle Hierarchie-Verfeinerung (13.09.2026)

Prinzip: kein Redesign, keine Umsortierung, kein Conversion-Risiko. Gezielte,
kleine Eingriffe mit dem besten Hebel; alles Übrige bewusst dokumentiert statt
riskant umgebaut.

## A. Identifizierte Probleme (Audit)

1. **Doppeltes Rating-Signal im Hero:** Textzeile "4.9 Google-Bewertungen ..."
   UND Review-Badge auf dem Hero-Bild ("4.9 · 500+ Bewertungen / Google"),
   zusätzlich inkonsistent (500+ vs 12'500+). Zwei konkurrierende Trust-Boxen
   direkt nebeneinander.
2. **Therapie-Grid:** 8 identisch gewichtete Karten (4x2), keine Hierarchie
   zwischen Kernmethoden und Ergänzungen.
3. **Zwei getönte Sektionen hintereinander:** kennst-section (surface) direkt
   gefolgt vom St.-Gallen-Banner (bg): kein Rhythmus, sondern Grauzone.
4. Spacing weitgehend konsistent (96/72/64-Kaskade in home.css mit
   Responsive-Overrides); einzelne konkurrierende cta-band-Regeln, die sich
   deterministisch auflösen. Kein Ausreisser mit sichtbarem Schaden.
5. Die Reviews-Sektion ist mit Abstand der grösste Markup-Block der Seite.
6. Eine CARE-/Concierge-Sektion existiert auf der Homepage NICHT (nur auf
   /ueber-uns); der Auftragspunkt 7 läuft dort ins Leere.

## B-F. Umgesetzte Änderungen

1. **Hero-Trust konsolidiert (Punkt 5/6):** Die 4.9-Nennung ist aus der
   hero-trust-Textzeile entfernt; das Bild-Badge ist jetzt das EINE starke
   Rating-Signal. Die Textzeile trägt stattdessen die komplementären Fakten:
   "EMR/ASCA-anerkannt · Krankenkasse übernimmt 80 bis 100% · 12'500+
   Patienten". Kein Faktenverlust, ein Rating-Widerspruch (500+ vs 12'500+)
   entschärft. Drittes 4.9 (Stats-Count-up weiter unten) bleibt: kontextuell,
   anderes Format.
2. **Therapie-Grid (Punkt 9, revidiert 13.09.):** Der erste Ansatz (flachere
   Fotos für Reihe 2) beschnitt die Cover-Bilder zu aggressiv und wurde
   zurückgenommen. Final: ALLE Karten mit identischer 4/3-Bildfläche; die
   Karten sind flex-Spalten mit CTA am unteren Rand (margin-top:auto), so
   bleiben CTAs pro Reihe ausgerichtet, ohne Bilder zu verkleinern.
3. **Hintergrund-Rhythmus (Punkt 13):** St.-Gallen-Banner von var(--bg) auf
   Weiss: Sequenz ist jetzt weiss -> surface (kennst) -> weiss -> schwarz (wa)
   -> weiss-Block (Therapien/Ergänzend/Bibliothek) -> bg (Fragen) -> ...
   Getönte Flächen markieren wieder Betonung statt Zufall.

## G-M. Bewusst NICHT geändert (mit Begründung)

- **Spacing-System-Rebuild (Punkt 4):** home.css steuert Abstände über eine
  gewachsene Kaskade inkl. !important-Schichten und --section-py. Ein
  globales Neusystem hätte hohes Regressionsrisiko auf einer Conversion-Seite
  bei geringem sichtbarem Gewinn; die Ist-Werte folgen bereits grob der
  48/64/72/96-Skala. Empfehlung: erst bei einem echten Redesign anfassen.
- **Sektions-Reihenfolge (Punkt 17):** Standorte stehen vor den Therapien;
  das ist eine bewusste Conversion-Entscheidung (lokale Intents dominieren
  die GSC-Daten). Keine Umsortierung ohne A/B-Beleg.
- **Reviews/Team/FAQ-Unterseite (Punkt 16):** grösster Markup-Block der Seite,
  eng mit Tracking/Interaktion verwoben; Vereinheitlichung dort ist ein
  eigenes, sorgfältiges Projekt.
- **CARE-Sektion (Punkt 7):** existiert nur auf /ueber-uns. Sie auf die
  Homepage zu holen wäre neue Informationsarchitektur, nicht Refinement.
- Typografie/Buttons/Farben: bereits token-basiert und konsistent.

## Mobile (Punkt 18)

390px geprüft: Sekundär-Karten fallen auf das normale 2-Spalten-Layout zurück
(kein doppeltes Kompakt-Schema auf kleinen Screens), Hero-Trust einzeilig
umbrechend, kein Overflow.

## N/O. Dateien & Build

- src/data/home-body.html (2 gezielte Edits: hero-trust, Banner-Background)
- public/home.css (1 Regelblock: Sekundär-Therapiekarten)
- Build clean, Renders 1440/1280/1024/768/390 ohne Overflow/Konsolenfehler.

## Warum es jetzt premium-iger wirkt

Das Auge bekommt pro Zone genau ein starkes Signal: im Hero ein einziges
Rating-Badge statt zweier konkurrierender Zahlen, im Therapie-Grid vier
Kernmethoden mit klarer Zweitreihe statt acht gleich lauter Karten, und
getönte Flächen, die wieder Betonung bedeuten. Weniger simultane Ansprüche
an die Aufmerksamkeit = ruhiger, absichtsvoller, glaubwürdiger.
