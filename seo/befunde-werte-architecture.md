# Befunde & Werte verstehen: Architektur (Phase 1, 15.09.2026)

Struktur-only. Kein Artikel-Inhalt, keine Referenzbereiche, keine Quellen.

## A. Zweck des Clusters

Neue Intent-Ebene: "Ein Test, Laborwert, Messwert oder Bericht sagt etwas.
Was bedeutet das?" Übersetzt Befundsprache in verständliches Deutsch, ohne aus
einem Wert eine Diagnose zu machen. Kein Symptom-, Diagnose-, Therapie- oder
TCM-Diagnostik-Cluster.

## B. Intent-Abgrenzung

- Körpersignale: "Ich bemerke etwas an meinem Körper."
- Beschwerden: "Ich kenne oder vermute das Problem."
- Befunde & Werte: "Ein Befund/Wert liegt vor. Was bedeutet er?"
- Fragen: "Konkrete Patienten-/Behandlungsfrage."
- Wissen: "Gesundheitsthema verstehen."
- TCM verstehen: "TCM-Begriffe/Modelle verstehen."

Dokumentiert auch im Kopf von src/data/befunde-werte.ts.

## C. Routen

- Hub: /gesundheitsbibliothek/befunde-werte/ (öffentlich, noindex,follow)
- Leaf: /gesundheitsbibliothek/befunde-werte/[slug]/ (nur status published
  erzeugt Prod-Routen)
- Keine Kategorie-URLs: Laborwerte/Messwerte/Bildgebung sind reine
  Gruppierungs-Labels auf dem Hub.

Namenswahl folgt den bestehenden Bibliotheks-Konventionen (tcm-verstehen,
perspektiven: sprechender Bindestrich-Slug direkt unter /gesundheitsbibliothek/).

## D. Kategorie-Modell

`BefundWertKategorie = 'laborwert' | 'messwert' | 'bildgebung'` mit Labels
Laborwerte / Messwerte / Bildgebung & Befundsprache (KATEGORIE_LABELS).

## E. Indexierungs-Regeln

- HUB_INDEXABLE = false: Hub ist noindex,follow, verlinkt aus der
  Gesundheitsbibliothek, nicht in Sitemap (Generator schliesst noindex aus),
  nicht in GSC eingereicht, nicht in seo/index-queue.md.
- Geplante Leaves: existieren in Produktion physisch nicht
  (getStaticPaths: DEV ? alle : published). Kein noindex-Verlass.
- Publizierte Leaves später: indexable-Flag pro Eintrag.

## F. Die 10 geplanten Themen

| Slug | Kategorie | Titel |
|---|---|---|
| crp-erhoeht | laborwert | CRP erhöht: Was bedeutet das? |
| tsh-erhoeht-ft4-normal | laborwert | TSH erhöht, fT4 normal: Wie wird das eingeordnet? |
| leukozyten-erhoeht | laborwert | Leukozyten erhöht: Was kann dahinterstecken? |
| cholesterin-erhoeht-trotz-gesunder-ernaehrung | laborwert | Cholesterin erhöht trotz gesunder Ernährung |
| ferritin-niedrig-haemoglobin-normal | laborwert | Ferritin niedrig trotz normalem Hämoglobin |
| hba1c-leicht-erhoeht | laborwert | HbA1c leicht erhöht: Was bedeutet das? |
| nuechternblutzucker-erhoeht | laborwert | Nüchternblutzucker erhöht |
| blutdruck-140-90 | messwert | Blutdruck 140/90: Wie ist der Wert einzuordnen? |
| bandscheibenprotrusion-mrt | bildgebung | Bandscheibenprotrusion im MRT: Was bedeutet der Befund? |
| degenerative-veraenderungen-mrt | bildgebung | Degenerative Veränderungen im MRT: Was heisst das? |

## G. Primary Purpose pro Thema

Durchgängig: Einordnung eines Befunds/Werts, nicht Erklärung/Behandlung einer
Erkrankung. Bildgebungs-Themen: Übersetzung von Befundsprache inkl. der
Diskrepanz Bild vs. Beschwerden. Details pro Eintrag in befunde-werte.ts
(primaryPurpose-Feld).

## H. Canonical Intent Owners

- blutdruck-140-90 -> /beschwerden/bluthochdruck/
- ferritin-niedrig-haemoglobin-normal -> /beschwerden/eisenmangel/
- bandscheibenprotrusion-mrt, degenerative-veraenderungen-mrt ->
  /beschwerden/bandscheibenvorfall/, /beschwerden/rueckenschmerzen/,
  /beschwerden/ischias/
- crp-erhoeht, leukozyten-erhoeht, tsh-erhoeht-ft4-normal,
  cholesterin-erhoeht-trotz-gesunder-ernaehrung, hba1c-leicht-erhoeht,
  nuechternblutzucker-erhoeht -> leeres Array. Begründung: Es existiert keine
  Beschwerden-Seite zu Schilddrüse, Diabetes/Prädiabetes oder
  Hypercholesterinämie (geprüft gegen src/data/symptom-leaves/), und
  /beschwerden/immunschwaeche/ besitzt den Infektanfälligkeits-Intent, nicht
  den Labor-Intent CRP/Leukozyten. Keine URLs erfunden; entsteht später eine
  solche Erkrankungsseite, übernimmt sie den Erkrankungs-Intent.

## I. Überlappungs-Risiken

- Grösstes Risiko: Befund-Seite driftet in Erkrankungs-Content (z.B.
  blutdruck-140-90 wird zweite Bluthochdruck-Seite). Gegenmittel:
  primaryPurpose + canonicalIntentOwner pro Eintrag, Verlinkung der
  Owner-Seite aus dem Artikel.
- Interner Überlapp hba1c-leicht-erhoeht vs. nuechternblutzucker-erhoeht:
  Langzeitwert vs. Momentaufnahme, in beiden Artikeln explizit abgrenzen.
- MRT-Paar vs. Beschwerden-Seiten: Befundbegriff erklären, Symptome/Therapie
  konsequent an die Owner delegieren.

## J. Internes Verlinkungs-Modell (Zukunft)

Phase 1: nur strukturelle related*-Arrays (verifizierte URLs), KEINE
reziproken Links von Live-Seiten. Nach Publikation: Links von den
Owner-Beschwerden-Seiten, passenden Körpersignalen, Untersuchungen und
Visuals auf publizierte Befund-Seiten (Muster wie fragenLinks/haut-links),
sonst bleiben sie "Gefunden - nicht indexiert".

## K. Medizinisches Review-Modell (Zukunft)

Jeder Eintrag trägt suggestedReviewerType (z.B. Ärztliche Review Innere
Medizin/Labormedizin, Radiologie/Orthopädie, Endokrinologie). Publikation nur
mit echtem Review; keine erfundenen Reviewer-Namen. Template erzwingt
Reihenfolge: konventionelle Einordnung, Sicherheit/Abklärung, Kontext, erst
danach optionaler integrativer Abschnitt (integrativeContextHtml, immer
zuletzt, Phase 1 leer). TCM erklärt keine Laborwerte medizinisch.

## L. Launch-Kriterien

Hub wird erst indexierbar (HUB_INDEXABLE = true, Sitemap, index-queue), wenn
mindestens 4 wirklich publizierte, ärztlich geprüfte Leaves existieren.
Leaves einzeln publizieren (status published + indexable), gleichzeitig
interne Links setzen und URL in seo/index-queue.md aufnehmen.

## M. Dateien (Phase 1)

- src/data/befunde-werte.ts (neu): Datenmodell, KATEGORIE_LABELS,
  HUB_INDEXABLE, 10 geplante Einträge, publishedBefundeWerte
- src/pages/gesundheitsbibliothek/befunde-werte/index.astro (neu): Hub,
  Gruppierung nach Kategorie, nicht-klickbare "In Vorbereitung"-Karten,
  Sicherheits-Block, Bibliotheks-Chips
- src/pages/gesundheitsbibliothek/befunde-werte/[slug].astro (neu):
  Artikel-Template mit optionalen Blöcken (Kurzantwort, Haupterklärung,
  Referenz & Kontext, Was der Befund nicht beweist, Wann abklären, Weitere
  Abklärung, Integrativer Kontext zuletzt, Quellen, Related), Dev-Badge
- src/pages/gesundheitsbibliothek/index.astro: neue Karte nach Therapien
- src/data/gesundheitsbibliothek.ts: Suchgruppe "Befunde & Werte"
  (nur published, aktuell 0 Einträge)
- scripts/health-audit.mjs: classify befunde-werte -> 'befund'
