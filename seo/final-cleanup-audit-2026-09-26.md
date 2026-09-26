# Final Non-Content SEO Cleanup — 2026-09-26

Keine neuen URLs, keine neuen Artikel. Sitemap unverändert **548**. Reine Konsolidierung: Ownership, Redirects, Link-Graph.

## OWNERSHIP (9 Fälle geprüft, 9 aufgelöst; alle nach Seiten-Inspektion, nicht nur CSV)

| Fall | Entscheid | Begründung / Änderung |
|---|---|---|
| gewichtsmanagement vs. akupunktur-zum-abnehmen | PRIMARY (Condition) / SECONDARY (Evidenz-Explainer) | Titles bestätigen Trennung („TCM-Behandlung" vs. „Was dran ist"); fehlender Cross-Link ergänzt (Wissen→Beschwerde); keiner targetet generisch „abnehmen". |
| menstruationsbeschwerden vs. zyklusbeschwerden | beide PRIMARY | Titles bereits scharf getrennt (Regelschmerzen/starke Menstruation vs. unregelmässiger Zyklus), 3 Cross-Links vorhanden; Grenze in CSV fixiert. Kein Duplikat. |
| immunschwaeche vs. haeufige-infekte-immunsystem | PRIMARY (Condition) / PRIMARY (nur Explainer-Intent) | Inhalte tragen die Trennung; fehlender Cross-Link ergänzt (Wissen→Beschwerde). |
| /krankenkassen/(+akupunktur) vs. Wissen-2026-Artikel | Hierarchie bestätigt; Wissen → SECONDARY_SUPPORT | Artikel ist datiert („Stand 2026") und verlinkt den Hub 2×; Evergreen-Terms gehören der /krankenkassen/-Hierarchie. Kein Titel-Eingriff nötig. |
| schmerzen-unterer-ruecken vs. rueckenschmerzen/ischias | SECONDARY_SUPPORT | 4 Owner-Links im Artikel vorhanden; informationeller Sub-Intent; bewusst kein Titel-Eingriff (Ranking-Stabilität). |
| blutiges-schroepfen vs. hijama | PRIMARY bestätigt | Phase-3-Split stabil; Review-Flag entfernt. |
| 9 KS↔Beschwerden-Paare (finger-schlafen-ein/karpaltunnel u.a.) | alle KEEP, keine Änderung | Architektur-Regel erfüllt: jede KS-Seite verlinkt ihren Condition-Owner (2-4 Links, dist-verifiziert); Prä-Diagnose-Intent bleibt legitim. |

SHARED_INTENT_REVIEW: **5 → 0** im owner_status. Bewusst offen (per Notes-Flag, nicht SHARED): die Phase-G-Action-Intent-Wissen-Artikel (erkaeltung-im-anflug, heizungsluft, was-hilft-gegen-kopfschmerzen, faszien) — Entscheid fällt, wenn ein Was-jetzt-Gegenstück entsteht; Datenbasis: GSC-Query-Zuordnung.

## MALFORMED URLS (11 Varianten)

Alle 11 im gesamten Repo gesucht: **keine interne Quelle** (weder Links noch Daten noch Routen) → historische Crawl-/Referrer-Artefakte. Für `/en/therapies/shiatsu/%7C`: kein Pipe-Zeichen in EN-Quellen; Ursache extern (vermutlich Text-Liste „…/shiatsu/ | …"), daher nur Redirect, keine Quell-Änderung nötig.

22 exakte 301-Zeilen in `public/_redirects` (je mit/ohne Trailing-Slash, Datei-Konvention wegen Cloudflare-Slash-Normalisierung): feber→fieber, feuer→fieber, 4× bauch-Varianten (inkl. `]`-Suffix), esssen→herzklopfen-nach-dem-essen, trotrocken→trotz-waerme, schlucker/ohrnackt→ohr-knackt-beim-schlucken, %7C→/en/therapies/shiatsu/. Keine Wildcards, keine Redirect-Ketten (alle Ziele sind kanonische Live-URLs), keine Typo-URL in Sitemap/CSV/Links.

## LINK-GRAPH (kontextuell, Header/Footer/Nav exkludiert; 396 Health-URLs)

- CRITICAL (0 inbound): **0 vorher / 0 nachher**
- DEEP (>3 Klicks ab Bibliothek/Root): **0 / 0**
- Unreachable über Content-Links: **0 / 0**
- Hub-only/WEAK (inbound ≤1) unter den 95 Cohort-URLs: **5 → 0** (ischias-schmerzen, migraene-im-anflug, muskelverspannungen, knieschmerzen-nach-belastung, harnsaeure-erhoeht)

**10 kontextuelle Links ergänzt** (keine Blöcke, je 1 passender related-Eintrag): 4 KS→Was-jetzt (bein-taub→Ischias-WJ, augenflimmern→Migräne-WJ, nacken-knackt→Verspannungen-WJ, knie-knackt→Knie-WJ), 2 KS→EKG (herzstolpern-in-ruhe, herzklopfen-im-liegen), nierenwerte→harnsäure, leukozyten→grosses Blutbild, 2 Wissen→Beschwerden-Owner (abnehmen, infekte). Untersuchungen-Leaves jetzt inbound 3-7.

## RECENT COHORT (95 URLs aus cohort-handoff-gsc-2026-09-26.csv)

Alle 95: Sitemap ✓, indexierbar ✓, self-canonical ✓, Cluster-Hub-Link ✓, keine kaputten related-Referenzen. Schwächen gefunden: die 5 Hub-only-Seiten oben → behoben. Keine Content-Änderungen wegen fehlender Indexierung (Natural-Discovery-Experiment unangetastet, nichts manuell eingereicht).

## HUBS

Root-Bibliothek, Körper (9), Was-jetzt, Befunde, Untersuchungen, Fragen, TCM-verstehen: Kinder-Listing/Canonical/Breadcrumbs/Suche geprüft — sauber; keine versteckten Orphan-Leaves; keine Hub-Copy-Änderungen nötig.

## QA

Build sauber · Sitemap 548 (unverändert, keine neue URL) · health-audit 0/0/0 · 0 Duplicate Titles/H1 · Canonicals korrekt · keine Malformed-URL in Sitemap/internen Links · Tracking/Mobile unangetastet.

## Noch offen (bewusst)

1. GSC-Verifikation der 95 Handoff-URLs (extern).
2. Phase-G-Flags (4 Action-Wissen-Artikel) bei nächster Was-jetzt-Welle entscheiden.
3. Redirect-Wirksamkeit der 11 Varianten nach Deploy in GSC beobachten (Live-HTTP aus Build-Umgebung nicht prüfbar, Egress-Policy).
