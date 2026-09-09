# TCM.ch — Master Keyword / Search-Intent / URL Ownership Map

Interne SEO-Dokumentation (nicht öffentlich, keine Route). Stand: 2026-09-09.
Kanonische, maschinenlesbare Quelle: **`seo/master-keyword-url-map.csv`** (UTF-8, 309 Zeilen).

---

## REGEL FÜR JEDE NEUE SEO-SEITE (zuerst lesen)

**BEVOR irgendeine neue SEO-Seite erstellt wird:**

1. `master-keyword-url-map.csv` prüfen — wem gehört der Intent bereits?
2. `do-not-create-intents.csv` prüfen — steht der Intent auf der Blacklist?
3. `intent-conflicts.csv` prüfen — liegt der Intent in einem offenen Konfliktfeld?
4. Den nächstliegenden bestehenden Owner identifizieren.
5. Nur bauen, wenn der Intent **genuin verschieden** ist — niemals nur, weil eine
   Keyword-Variante existiert. **Search-Intent-Ownership schlägt Keyword-Variation.**

Zusatzregeln:
- Neue Seite ⇒ Eintrag in `master-keyword-url-map.csv` **im selben Commit** (analog `index-queue.md`).
- Kanonisierte URLs (`status=canonicalized`) nie als Owner behandeln oder intern pushen.
- Interne Anker: Haupt-Keyword-Anker gehören dem PRIMARY_OWNER; Support-Seiten mit
  beschreibenden Ankern verlinken (Spalte `recommended_internal_anchor`).
- Verlinkungsrichtung: Wissen-Artikel → Beschwerdeseite → Therapie → Standort.

---

## Ownership-Hierarchie (Default-Logik)

| Intent-Familie | Owner |
|---|---|
| Beschwerde, Symptome, Behandlung, "TCM/Akupunktur bei X" | `/beschwerden/{x}/` |
| Studienlage, Evidenz, Mechanismus, Vergleich, Ratgeber-Frage | `/wissen/…` (Support) |
| Methode (Akupunktur, Schröpfen, Tuina, …) | `/therapien/{methode}/` |
| TCM/Akupunktur + Stadt | `/standorte/{stadt}/` (Zürich: Hub `/akupunktur-tcm-zuerich/`) |
| Kosten + Stadt | `/standorte/{stadt}/kosten/` |
| Massage + Stadt | `/massage-{stadt}/` |
| Krankenkasse + Methode | `/krankenkassen/{methode}/` |
| Wirkstoff/Ästhetik Haut & Gesicht | `/haut/{thema}/` (eigenständiges Magazin) |
| Medizinische Hautbeschwerde | `/beschwerden/{x}/` (Präzedenz: rosacea) |
| "Akupunktur in der Nähe" | `/akupunktur-in-der-naehe/` |

## Kennzahlen (Stand 2026-09-09)

- 309 Seiten gemappt, davon 302 indexierbar (2 noindex, 5 kanonisiert)
- 264 PRIMARY_OWNER · 20 SECONDARY_SUPPORT · 15 SHARED_INTENT_REVIEW · 5 REDUNDANT (kanonisiert) · 5 TECHNICAL_ONLY
- Offene Konflikte: siehe `intent-conflicts.csv` (3 high: St. Gallen-Doppel, Basel-Doppel, Kinderwunsch)
- Kandidaten: `unowned-search-intents.csv` (25 Zeilen, davon 15 Körpersignal-Kandidaten, 5×P1)
- Blacklist: `do-not-create-intents.csv` (26 gesperrte Intents)

## Datenlage

**Kein Search-Console-Export im Repo vorhanden** (Stand 2026-09-09; gesucht unter
`seo/`, `data/`, `analytics/`, `*.csv`). Alle Ownership-Zuordnungen basieren auf
Architektur, Titles/H1s, Content-Struktur und interner Verlinkung — nicht auf
Query-Daten. Spalte `source_confidence` markiert das. Keine Suchvolumen/KD/CPC
erfunden. Fälle mit `requires_gsc_data=yes` in `intent-conflicts.csv` erst nach
einem GSC-Export (Query, Page, Clicks, Impressions, Position; 6–12 Monate) entscheiden —
Export als `seo/gsc-export.csv` ablegen.
