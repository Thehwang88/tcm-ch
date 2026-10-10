# GSC 404 + robots.txt Audit (Export 10.10.2026)

Zeile-für-Zeile: `seo/gsc-404-robots-audit-2026-10-10.csv` (80 URLs aus "Nicht gefunden (404)").
Geprüft gegen den lokal laufenden Worker (`wrangler dev`: Middleware + Functions + `_redirects`
wie in Produktion), die generierte Sitemap, `seo/master-keyword-url-map.csv` und alle internen
Links/JSON-LD-URLs im Build. Hinweis: GSC bucketet 410 unter "Nicht gefunden (404)".

## Ergebnis 404-Liste (80)

| Klasse | Anzahl | Status heute |
|---|---|---|
| intentionally gone | 59 | 52× 410 (Prune-Functions/Middleware), 6× 404 (Kurzlink-Müll, `/api/anfrage`), 1× 410 neu (`/suche`) |
| missing active page | 9 | bereits live (200, Sitemap, KEEP): hyperhidrose, wadenschmerzen, endometriose, nervenschmerzen, fersensporn, sprunggelenkschmerzen, hitzewallungen, asthma, pcos. GSC-Crawl lag vor der Aufnahme. |
| exact-equivalent redirect | 8 | 6× 301 neu, 2× 301 bestehend (blaehbauch, energiemangel-fatigue) |
| needs manual review | 4 | unverändert, siehe unten |

## Such-Platzhalter `/suche?q=%7Bsearch_term_string%7D`

Herkunft: `WebSite.potentialAction.SearchAction.urlTemplate` im `<head>` der alten SPA
(`https://tcm.ch/suche?q={search_term_string}`), entfernt am 10.06.2026 (Commit 7d00295).
Eine Suchseite gab es nie. Heute erzeugt nichts im Repo/Build die URL (0 Treffer für
`search_term_string`/`SearchAction`). Fix: `/suche` und `/suche/` liefern 410 (Middleware `GONE`).

## Neue 301 (Abweichung vom Audit 21.09.2026)

Das Audit vom 21.09. lief ohne lokalen Build und klassifizierte diese URLs als "kein Nachfolger".
Heute existiert jeweils eine live, indexierbare, selbst-kanonische Owner-Seite ohne HIGH-Konflikt:

| Alte URL | Ziel | Owner laut Master-Map |
|---|---|---|
| /wissen/akupunktur-st-gallen-kosten-krankenkasse | /akupunktur-st-gallen-kosten/ | PRIMARY_OWNER "akupunktur st. gallen kosten" |
| /wissen/akupunktur-zuerich-kosten-krankenkasse | /standorte/zuerich/kosten/ | PRIMARY_OWNER "akupunktur kosten zürich" |
| /wissen/akupunktur-st-gallen-erfahrungen-was-erwartet-dich | /wissen/tcm-st-gallen-erfahrungen-ablauf/ | SECONDARY_SUPPORT "tcm st. gallen erfahrungen" |
| /therapien/akupunktur/zuerich-city | /standorte/zuerich-city/ | PRIMARY_OWNER, sekundär "akupunktur zürich city" |
| /krankenkassen/css | /krankenkassen/ | PRIMARY_OWNER; Hub enthält die CSS-Zeile im Kassenvergleich |
| /beschwerden/naechtliches-schwitzen | /koerpersignale/nachtschweiss-ohne-fieber/ | PRIMARY_OWNER "nachtschweiss ohne fieber" (Alias vorher auf hitzewallungen) |

Alle übrigen Doorways bleiben 410 (`WISSEN_KILL`, Prune-Functions unverändert).

## Needs manual review (nicht geändert)

- `/beschwerden/geschmacks-geruchsstoerungen` → bestehender Alias auf `/beschwerden/long-covid/` passt nur teilweise. Optionen: 410 oder belassen.
- `/therapien/akupunktur/st-gallen` und `/wissen/tcm-st-gallen-bahnhof-stadt-anfahrt-parking` → Ziel läge im offenen HIGH-Konflikt St. Gallen (Standortseite vs. Stadt-Lander). Erst nach GSC-Entscheid.
- `/wissen/tcm-arzt-st-gallen-vs-naturheilpraktiker-unterschied` → nur Teil-Match zu `/wissen/tcm-naturheilpraktiker-schweiz/`.

## robots.txt-blockiert (12)

Alle 12 sind gewollte Ausschlüsse (`/api/`, `?standort=`, `?beschwerde=`, `?therapie=`) und
bleiben blockiert; `robots.txt` unverändert. Aktuelle Erzeuger sind die Formular-Prefill-Links
der EN-Seiten (gewollt). Veraltete Werte (`?standort=Zürich Bellevue`, `/?standort=rorschach|wil`)
werden nicht mehr erzeugt. Die 5 "Indexiert, obwohl durch robots.txt blockiert" sind im Export
nur als Zahl enthalten (keine URL-Liste).

## Interne Links / strukturierte Daten

- Gefixt: `src/components/standort/KrankenkassenTeam.astro` verlinkte auf 10+ Standortseiten
  `/krankenkasse/` (301) statt `/krankenkassen/`.
- 0 interne Links oder JSON-LD-URLs auf 404/410-Ziele, 0 auf die 80 GSC-URLs (ausser den 9 heute live).
- Bereinigt (Commit 10ae1e4): 66 interne Links und 204 JSON-LD-URLs ohne Trailing Slash (je 1×308)
  zeigen jetzt auf die kanonische Slash-Form. Quellen: Sprachumschalter in `Header.astro`,
  Schema-`url` in 10 Templates und 10 Einzelseiten, 97 Linkziele in `src/content/knowledge/*.md`
  und `src/data/wissen.ts` (nur wenn `dist/<pfad>/index.html` existiert; Query, Anker, Dateien,
  `/api/`, externe URLs unberührt). Danach: 0 Slash-Hops in Links und JSON-LD.
- Bekannt, bewusst unverändert: Die drei MERGED-Duplikate (`/beschwerden/schlafstoerungen|burnout|heuschnupfen/`)
  kanonisieren auf ihren Owner, ihr Breadcrumb nennt die eigene URL. `/404/` (noindex) referenziert sich selbst.

## Re-Check der 6 Redirects gegen die Ownership-Map (Stand nach Merge von main 146e603)

Master-Map, Intent-Conflicts und Do-not-create seit Commit f0a7161 unverändert. Alle 6 Ziele sind
`live`, indexierbar, selbst-kanonisch und in der Sitemap; kein konkurrierender Owner mit gleicher Intention.

| Redirect | Ergebnis |
|---|---|
| kosten-krankenkasse St. Gallen → /akupunktur-st-gallen-kosten/ | PASS: PRIMARY_OWNER "akupunktur st. gallen kosten" |
| kosten-krankenkasse Zürich → /standorte/zuerich/kosten/ | PASS: PRIMARY_OWNER "akupunktur kosten zürich" |
| erfahrungen St. Gallen → /wissen/tcm-st-gallen-erfahrungen-ablauf/ | PASS: Owner "tcm st. gallen erfahrungen", Titel enthält "was dich erwartet"; Do-not-create weist genau diese Seite als Owner des Musters "tcm erfahrungen {stadt}" aus |
| /therapien/akupunktur/zuerich-city → /standorte/zuerich-city/ | PASS: PRIMARY_OWNER, sekundär "akupunktur zürich city" |
| /krankenkassen/css → /krankenkassen/ | PASS: gepinnter Owner "tcm krankenkasse" (health-audit Ownership-Gate). Der Kassenvergleich mit CSS-Zeile existiert nur dort (0 Treffer auf /krankenkassen/akupunktur/). Der bestehende Medium-Konflikt Hub ↔ Wissen-Deep-Dive wird nicht verschoben. |
| naechtliches-schwitzen → /koerpersignale/nachtschweiss-ohne-fieber/ | PASS: PRIMARY_OWNER "nachtschweiss ohne fieber"; Do-not-create nennt dieselbe Seite als Owner |

## Offene Entscheidungen (bewusst unverändert)

| URL | Heute | Entscheidung nötig |
|---|---|---|
| /beschwerden/geschmacks-geruchsstoerungen | 301 → /beschwerden/long-covid/ (Alias 10.09.) | Intent passt nur teilweise. 410 oder belassen? |
| /therapien/akupunktur/st-gallen | 410 | Exakter lokaler Intent, aber Ziel liegt im offenen HIGH-Konflikt St. Gallen. Nach GSC-Entscheid. |
| /wissen/tcm-st-gallen-bahnhof-stadt-anfahrt-parking | 410 | Anfahrt gehört zur St.-Gallen-Standortseite (HIGH-Konflikt). Nach GSC-Entscheid. |
| /wissen/tcm-arzt-st-gallen-vs-naturheilpraktiker-unterschied | 410 | Teil-Match zu /wissen/tcm-naturheilpraktiker-schweiz/. Redaktionell entscheiden. |

## Checks (finaler Lauf nach Slash-Bereinigung)

Build grün · Sitemap 742 URLs: alle 200, self-canonical, indexierbar, 0 Duplikate ·
80/80 URLs getraced: 56× 410, 18× 200, 6× 404, max. 2 Hops, 0 Loops, identisch zum Stand vor
der Slash-Bereinigung · 12/12 robots-URLs weiter blockiert · Interne Links: 0 auf 404/410,
0 Slash-Hops · JSON-LD: 745 Blöcke, 0 ungültig, 0 Slash-Hops, Seiten-url = Canonical ·
`health-audit.mjs`: 0 Orphans, 0 doppelte Titel, Ownership-Gate 0 Fehler ·
`check-professional.mjs`: 0 Fehler · Master-Map, Do-not-create, Intent-Conflicts unverändert.
