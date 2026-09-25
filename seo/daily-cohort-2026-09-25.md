# Daily-Cohort 2026-09-25 — Organic Library Expansion

## Part 1 / URLs 1-10

Datum: 2026-09-25 · Typ: Daily organic library expansion (Editorial-Copy vorgegeben) · Max: 10 · **Ergebnis: 8 CREATED, 2 BLOCKED** · Indexierungs-Strategie: **Natural Discovery** — keine manuellen GSC-URL-Anfragen, keine manuelle Sitemap-Resubmission, URLs NICHT in seo/index-queue.md (verifiziert: 0 Treffer).

### Pre-Write-Audit & Tracking

| URL | Target (Semrush/GSC) | Nächster Owner | Verdict | Ownership-Grenze | Sitemap | Links |
|---|---|---|---|---|---|---|
| /koerpersignale/dumpfes-gefuehl-im-ohr/ | dumpfes gefühl im ohr (~170, KD17) | ohr-einseitig-verstopft; druck-auf-den-ohren; /beschwerden/hoersturz/ | **CREATED** (risk low) | Besitzt dumpfes Hörgefühl/Wattegefühl; Verstopfungs-, Druck- und Hörsturz-Intents bleiben bei ihren Ownern (Hörsturz prominent im Red-Flag-Block verlinkt) | ja | in: ohr-einseitig-verstopft related; out: 3 Ohr-Signale + Hörsturz |
| /koerpersignale/herzstolpern-im-ruhezustand/ | herzstolpern im ruhezustand (~110, KD20) | **/koerpersignale/herzstolpern-in-ruhe/** | **BLOCKED** (risk high) | Existierende Seite besitzt exakt diesen Intent; die vorgeschlagene Secondary „herzstolpern in ruhe" IST deren Slug. Repo neuer als Planungsstand. | — | — |
| /koerpersignale/kribbeln-im-nacken/ | kribbeln im nacken (~20) | kribbeln-vom-nacken-in-den-arm; nackenschmerzen | **CREATED** (risk low) | LOKALES Nacken-Kribbeln; Arm-Ausstrahlung bleibt beim bestehenden Owner (beidseitig verlinkt) | ja | in: kribbeln-vom-nacken related; out: Arm-Muster, Nacken knackt, Nackenschmerzen |
| /koerpersignale/harter-unterbauch/ | harter unterbauch (~20) | bauch-fuehlt-sich-hart-an; druckgefuehl-im-unterbauch | **CREATED** (risk medium→low) | UNTERBAUCH-Lokalisation inkl. Blase/gynäkologische Aspekte; ganzer Bauch und Druck-Intent bleiben bei ihren Ownern (beidseitig verlinkt) | ja | in: bauch-hart related; out: 3 Bauch-Signale + Verstopfung |
| /koerpersignale/kribbeln-im-mund/ | kribbeln im mund (~20) | kribbeln-an-der-lippe; kribbeln-im-gesicht; zungenbrennen | **CREATED** (risk low) | Mundraum gesamt (Lippen/Zunge/Gaumen); Lippe/Gesicht/Brennen bleiben eigene Owner | ja | in: kribbeln-an-der-lippe related; out: 4 Geschwister |
| /koerpersignale/taube-zunge/ | taube zunge (~10) | zungenbrennen (Brennen); kribbeln-im-mund (Schwester) | **CREATED** (risk low) | Taubheits-Intent; Brennen bleibt zungenbrennen (beidseitig verlinkt) | ja | in: zungenbrennen related, kribbeln-im-mund Body; out: 3 Geschwister |
| /koerpersignale/warmes-gesicht-kalte-haende/ | warmes gesicht kalte hände (~10 + GSC-Varianten) | hitzegefuehl-ohne-fieber; kalte-haende-trotz-waerme; kalte-haende-einseitig | **CREATED** (risk low) | Kombi-Muster; Gesamthitze und generische kalte Hände bleiben bei ihren Ownern; TCM-Abschnitt ohne Muster-Ableitung (wie vorgegeben) | ja | in: kalte-haende-trotz-waerme related; out: 3 Geschwister |
| /koerpersignale/morgens-flacher-bauch-abends-dicker/ | morgens flacher bauch abends dicker (~20) | blaehbauch-am-abend; voellegefuehl-nach-dem-essen | **CREATED** (risk medium→low) | Tag-Nacht-Variation als eigener Intent; Abend-Blähbauch bleibt Owner (beidseitig verlinkt) | ja | in: blaehbauch-am-abend related; out: 3 Bauch-Signale + Verstopfung |
| /gesundheitsbibliothek/befunde-werte/crp-erhoeht/ | crp erhöht (~260, KD22) | **identische URL existiert** (publiziert, mit Synonymen im Suchindex) | **BLOCKED** (risk high) | Exakte URL ist bereits der PRIMARY_OWNER. Kein Duplikat, keine Änderung an der Live-Seite. | — | — |
| /gesundheitsbibliothek/befunde-werte/kreatinin-erhoeht/ | kreatinin erhöht (~170, KD32) | nierenwerte-erhoeht (Umbrella) | **CREATED** (risk medium→low) | NUR Einzelwert Kreatinin (Leberwerte/GGT-Muster); Sammelbefund bleibt nierenwerte-erhoeht, Body + relatedArticles beidseitig verlinkt; Harnstoff-Link folgt sobald erstellt | ja | in: nierenwerte Body-Link + related; out: Nierenwerte, Kalium, Natrium |

### Hub / Kategorien

- Körpersignale-Hub (bestehende Kategorien, keine neuen): Kopf & Sinne (dumpfes Ohr), Hände & Nerven (Kribbeln Nacken), Hals & Mund (Kribbeln Mund, Taube Zunge), Bauch & Verdauung (Harter Unterbauch, Bauch abends dicker), Wärme & Schwitzen (Warmes Gesicht/kalte Hände).
- Befunde-Hub: Kreatinin automatisch in Gruppe „Niere & Blutdruck".
- 7 kontextuelle Inbound-Links in bestehende related-Arrays (ohr-einseitig-verstopft, kribbeln-vom-nacken-in-den-arm, bauch-fuehlt-sich-hart-an, blaehbauch-am-abend, kribbeln-an-der-lippe, zungenbrennen, kalte-haende-trotz-waerme) — bewusst nicht jede neue Seite mit jeder verlinkt.

### Suche / Technik / Build

- Suchindex: 288 → **296** (+8 via bestehende Loops) + 8 SYNONYMS (ohne Owner-Konkurrenz).
- Sitemap: 495 → **503** (+8, via Generator im normalen Build; alle 8 enthalten).
- Alle 8: 200, self-canonical, indexierbar, unique Title/H1/Meta, bestehendes Schema + Breadcrumbs, genau 1 H1, 0 sichtbare Em-Dashes.
- health-audit: 0 Orphans / 0 doppelte Titel / 0 kaputte Referenzen. Renders (KS-Hub + 3 Samples + beide Nieren-Seiten, 1440/390): 0 Overflow, 0 JS-Errors.
- Editorial: vorgegebene Copy technisch formatiert (bestehende Komponenten, wa-callouts für Red Flags, FAQs aus dem gelieferten Text ohne neue Fakten); keine Diagnose aus Symptom/Einzelwert, keine erfundenen Schwellenwerte, keine TCM-Normalisierungs-Claims.
- Tracking/Booking/Canonical-Architektur: unverändert.

### Indexierung

Natural Discovery. Manual URL indexing: NO. Manuelle Sitemap-Resubmission: NO. URLs nicht in seo/index-queue.md (verifiziert: 0 Treffer). Publikation: 2026-09-25.
