# TCM verstehen: Foundation-Publish (Phase 4A) — 23.09.2026

## 1. Publizierte URLs (7)

- /gesundheitsbibliothek/tcm-verstehen/grundlagen/organuhr/
- /gesundheitsbibliothek/tcm-verstehen/grundlagen/qi/
- /gesundheitsbibliothek/tcm-verstehen/grundlagen/yin-und-yang/
- /gesundheitsbibliothek/tcm-verstehen/grundlagen/fuenf-elemente/
- /gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/meridiane/
- /gesundheitsbibliothek/tcm-verstehen/diagnostik/zungendiagnostik/
- /gesundheitsbibliothek/tcm-verstehen/diagnostik/pulsdiagnostik/

Alle: status published, indexable true, publishedAt 2026-09-23. Extern geliefertes Editorial-Copy 1:1 übernommen (7 Blöcke pro Seite), Quellen-Labels verbatim ohne erfundene URLs.

## 2. Titles/H1s

Wie in Phase 4A genehmigt, unverändert (z.B. "TCM-Organuhr: Das traditionelle 24-Stunden-Modell erklärt" / H1 "Die TCM-Organuhr: Was das Modell beschreibt und was nicht"). Jede Seite trägt zusätzlich den festen Hinweis "Traditionelles Modell, keine Diagnose".

## 3. Sektions-Hubs

- grundlagen, meridiane-punkte, diagnostik: indexable true (neu in Sitemap); listen ihre Leaves automatisch als Karten (4/1/2).
- muster: bleibt noindex + "im Aufbau". methoden: unverändert.
- geplant[] bereinigt: Qi/Yin und Yang/Fünf Elemente/TCM-Organuhr (Grundlagen), Die 12 Hauptmeridiane (Meridiane; im Leaf abgedeckt), Zungendiagnose + Pulsdiagnose und Pulsqualitäten (Diagnostik; "Zungenfarbe und Zungenbelag im Detail" bleibt als künftiges Vertiefungsthema).

## 4. Interne Links

Neu (genau die 4 genehmigten eingehenden Kanten):
- /therapien/akupunktur/ → Meridiane (1 kontextueller Satz im "Was ist Akupunktur?"-Abschnitt; Therapie-Ownership unangetastet)
- /gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/ → Pulsdiagnostik + Zungendiagnostik (bestehende Erwähnung "Puls- und Zungendiagnostik" verlinkt)
- /koerpersignale/immer-zur-gleichen-uhrzeit-aufwachen/ → Organuhr (die Seite hat bereits einen ehrlichen "Und die berühmte Organuhr?"-Abschnitt; genau 1 Link, echter Lesernutzen)

Ausgehend (aus den Relations, im Template gerendert): qi↔yin-und-yang↔fuenf-elemente, fuenf-elemente→organuhr, organuhr→schlafprobleme/herzklopfen-im-liegen/nachtschweiss-ohne-fieber, meridiane→akupunktur/akupressur, zungen↔puls→erster-termin, zungendiagnostik→zungenbrennen. Jede Seite verlinkt zurück auf Sektions-Hub + TCM-verstehen-Hub.

## 5. Such-Aliase

7 SYNONYMS-Einträge (qi/chi, yin yang bedeutung, organuhr-Varianten, meridiane/leitbahnen, zungendiagnose/tcm zunge/zungenbelag, pulsdiagnose/pulstasten, 5 elemente/wandlungsphasen) + neuer Loop: publizierte TcmEntities erscheinen in der Bibliothekssuche (Index 233 → 240).

## 6. Master-Keyword-Map

7 neue PRIMARY_OWNER-Zeilen (content_role tcm_concept) mit dokumentierten Nicht-Ownerships: Organuhr besitzt NICHT Schlafprobleme/Nachtaufwachen, Meridiane NICHT Akupunktur (Phase 3 LOCKED), Zungendiagnostik NICHT Zungenbrennen.

## 7. Index-Queue

10 Einträge oben unter "Offen": 7 Leaves + 3 neu indexierbare Sektions-Hubs (Muster-Hub bewusst nicht).

## 8./9. Routen & Sitemap

- Routen: +7 (exakt die genehmigten Leaf-Routen). Entfernt 0, umbenannt 0, Redirects 0, Canonical-Änderungen 0.
- Sitemap: 437 → 447 (= +7 Leaves +3 Sektions-Hubs, exakt wie erwartet; Generator unverändert).

## 10. Canonicals

Alle 7 Leaves self-canonical (geprüft in dist), Hubs unverändert self-canonical.

## 11. Tracking

0 Änderungen (GTM/dataLayer/Analytics/Forms/CTA/Telefon/WhatsApp unberührt; Diff enthält nur Daten-/Content-Dateien, einen Satz im Akupunktur-Leaf und zwei Link-Anreicherungen in bestehendem Text).

## 12./13. Build & Audits

Build ok. health-audit: 0 Orphans / 0 doppelte Titel / 0 kaputte Referenzen. Jede neue Seite: 200, genau 1 H1, korrekte Title/Meta, indexable (kein noindex), im richtigen Sektions-Hub, suchbar, mind. 1 eingehender Link, Related-Karten vorhanden. Muster-Hub weiterhin noindex. Renders 1440/768/390 ohne Overflow/Pageerrors. Keine sichtbaren Em-Dashes.

## 14. Technisches Escaping

Nur erlaubte technische Formatierung: Plaintext-Absätze in <p>, Aufzählungen in <ul><li> (Organuhr-Zeiten, Fünf-Elemente-Paarungen, Meridian-Paare, Zungen-Merkmale). Gerade Anführungszeichen aus der Lieferung beibehalten. Keine inhaltlichen Änderungen.

## 15. Phase 4B

Bestätigt: 0 Muster-Seiten erstellt (keine Leber-Qi-Stagnation, kein Qi-/Yin-/Yang-Mangel, keine Feuchtigkeit/Hitze/Kälte/Wind/Schleim-Routen). tcmEntities enthält exakt die 7 Foundation-Konzepte.
