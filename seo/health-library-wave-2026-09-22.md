# Health-Library-Welle 22.09.2026 (Welle 5)

Workflow-Änderung: Das redaktionelle Copy dieser Welle wurde extern (ChatGPT) final geliefert. Claude Code hat Audit, Routen/Daten, Metadaten, Verlinkung, Suche, Sitemap, CSV, Queue und Validierung umgesetzt; das Body-Copy wurde unverändert übernommen (nicht umgeschrieben, nicht erweitert).

## A. GSC-Kontext (bis 19.09.2026)

Letzte 7 Tage: 343 Klicks / 21'057 Impressionen / CTR 1.63% / Pos. 14.06 (Vorwoche: ~123 / ~8'004 / Pos. ~21.97). Körpersignale sind die stärkste Discovery-Ebene (u.a. Hitzegefühl ohne Fieber 33 Klicks Pos. 4.65). Befunde validiert: crp-erhoeht mit frühen Impressionen um Pos. 5.3. Alle 9 Seiten der Welle 21.09. sind gecrawlt und indexiert.

## B./C. Kandidaten & Verdicts

| # | Kandidat | Verdict | Route |
|---|----------|---------|-------|
| 1 | Kalte Füsse (~590/mo, KD 13) | CREATE | /koerpersignale/kalte-fuesse/ |
| 2 | Kribbeln im Körper (~390, KD 29) | CREATE | /koerpersignale/kribbeln-im-koerper/ |
| 3 | Metallischer Geschmack (~390, KD 15) | CREATE | /koerpersignale/metallischer-geschmack-im-mund/ |
| 4 | Druck auf den Ohren (~320, KD 17) | CREATE | /koerpersignale/druck-auf-den-ohren/ |
| 5 | Kribbeln im Kopf/Kopfhaut (~210+~110) | CREATE | /koerpersignale/kribbeln-im-kopf/ |
| 6 | Zittern am ganzen Körper (~110, KD 26) | CREATE | /koerpersignale/zittern-am-ganzen-koerper/ |
| 7 | Leberwerte erhöht (~720, KD 31) | CREATE | /gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/ |
| 8 | Ferritin zu niedrig (~210, KD 17) | CREATE | /gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/ |
| 9 | Blutdruck 140/90 (~110, KD 36) | CREATE | /gesundheitsbibliothek/befunde-werte/blutdruck-140-90/ |
| 10 | Blutzucker erhöht (~90, KD 33) | CREATE | /gesundheitsbibliothek/befunde-werte/blutzucker-erhoeht/ |

10 CREATE, 0 STOP. 10 neue indexierbare URLs (Maximum, kein Kandidat nachgeschoben).

## D./E. Overlap-Findings & Owner-Vergleich

- kalte-fuesse: /koerpersignale/ein-fuss-kaelter-als-der-andere/ besitzt das einseitige Muster (bleibt Owner, kreuzverlinkt); /beschwerden/raynaud-syndrom/ bleibt Erkrankungs-Owner. Neue Seite besitzt NUR das beidseitige Muster.
- kribbeln-im-koerper: regionale Kribbeln-Signale (Gesicht, Beine nachts, Zehen, Lippe) und Polyneuropathie bleiben Owner; neue Seite besitzt das generalisierte Muster.
- metallischer-geschmack: bitterer-geschmack-morgens bleibt Owner des Bitter-Musters; explizite Abgrenzung im Text.
- druck-auf-den-ohren: ohr-einseitig-verstopft und ohr-knackt-beim-schlucken bleiben Owner ihrer Muster (beide kreuzverlinkt); Tinnitus/Sinusitis bleiben Erkrankungs-Owner.
- kribbeln-im-kopf: eine URL besitzt Kopf- und Kopfhaut-Varianten; druck-im-kopf-ohne-kopfschmerzen und kribbeln-im-gesicht bleiben eigene Owner.
- zittern-am-ganzen-koerper: kein bestehender Owner (geprüft; kein inneres-zittern-Signal vorhanden).
- leberwerte-erhoeht: kein Befund-Owner; /beschwerden/fettleber/ bleibt Erkrankungs-Owner (nur Related). Grösste Befunde-Chance dieser Welle.
- ferritin-zu-niedrig: /beschwerden/eisenmangel/ bleibt Erkrankungs-Owner (canonicalIntentOwner gesetzt); Seite erklärt nur den Laborwert. Slug-Rename von ferritin-niedrig-haemoglobin-normal (nie live), Hb-Konstellation als Abschnitt.
- blutdruck-140-90: geplante Entity publiziert; /beschwerden/bluthochdruck/ bleibt Owner (canonicalIntentOwner gesetzt).
- blutzucker-erhoeht: Slug-Rename von nuechternblutzucker-erhoeht (nie live); Nüchtern-Frage als Abschnitt; hba1c-leicht-erhoeht bleibt geplant (Langzeitwert, eigener Intent, dokumentierter interner Überlapp).

## F./G. Routen & Semrush

Alle 10 Routen wie oben erstellt; Semrush-CH-Daten aus dem Briefing in Spalte 1 dokumentiert. Titles/Metas/H1 exakt wie geliefert (eine Abweichung: keine).

## H. Interne Links (pro Seite 3-6)

Inline im gelieferten Copy: ein-fuss-kaelter (kalte-fuesse), bitterer-geschmack (metallisch), ohr-knackt (ohren), druck-im-kopf (kribbeln-kopf), eisenmangel (ferritin), bluthochdruck (blutdruck). Zusätzlich Related-Karten mit ausschliesslich verifizierten Zielen (KS/Beschwerden/Artikel), u.a. tinnitus, kieferschmerzen, migraene, nackenschmerzen, stress-burnout, polyneuropathie, raynaud-syndrom, fettleber, crp/tsh/cholesterin-Artikel; zittern verlinkt blutzucker-erhoeht (Befund).

## I. Reziproke Links (8)

koerpersignale.ts related[]: ein-fuss-kaelter-als-der-andere → kalte-fuesse; kalte-haende-trotz-waerme → kalte-fuesse; bitterer-geschmack-morgens → metallischer-geschmack; ohr-einseitig-verstopft → druck-auf-den-ohren; kribbeln-im-gesicht → kribbeln-im-koerper. Beschwerden-Leaves (chirurgische Inline-Links): eisenmangel (Red-Flag-Box, "Ferritin" → ferritin-zu-niedrig), bluthochdruck ("140/90" → blutdruck-140-90), fettleber ("Leberwerte erhöht" → leberwerte-erhoeht).

## J. Sitemap

429 → **439** URLs (+10, erwartet). Nur CREATE-Seiten; geplante Befunde-Slugs (hba1c, bandscheibenprotrusion-mrt, degenerative-veraenderungen-mrt) weiterhin ohne Prod-Route.

## K. Bibliothekssuche

223 → **233** Einträge (+10; KS + Befunde via bestehende Loops). 10 neue SYNONYMS-Einträge (inkl. füße/füsse, Metallgeschmack, Ohrendruck, Kopfhaut, inneres Zittern, ALT/AST/GGT, 140/90, Glukose).

## L. Master-Keyword-Map

10 neue PRIMARY_OWNER-Zeilen (Welle 5) mit Overlap-URLs, Ownership-Notizen und Rename-Hinweisen.

## M. Index-Queue

10 URLs oben unter "## Offen", gleicher Commit.

## N. Build & Audits

Build ok. health-audit: 0 Orphans / 0 ohne ausgehende Links / 0 doppelte Titel / 0 kaputte Referenzen. Alle 10 Seiten: HTTP-Route vorhanden, self-canonical korrekt, kein noindex, genau 1 H1, je 1 "—" (erlaubter Layout-Kommentar, kein sichtbarer Em-Dash). Befunde-Hub listet alle 8 publizierten Leaves; KS-Hub gruppiert die 6 neuen Signale (Muskeln & Beine, Hände & Nerven, Hals & Mund, 2× Kopf & Sinne) in bestehender Taxonomie. Puppeteer-Renders 1440/1024/768/390 auf 6 Sample-Seiten: kein Overflow, keine Pageerrors.

## O. Abgelehnte Kandidaten

Keine. Alle 10 haben den Overlap-Gate bestanden.

Hinweise: KS-Seiten dieser Welle ohne FAQ-Block (kein FAQ-Copy geliefert; Template blendet Sektion und FAQ-Schema automatisch aus). Keine Quellenlisten, keine erfundenen Reviewer (suggestedReviewerType dokumentiert nur den Review-Bedarf).
