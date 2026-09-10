# Gesundheitsbibliothek — Content-Architektur-Mapping (Phase 2)

Stand: 10.09.2026. Datenbasis: `seo/health-library-audit.json`
(generiert von `node scripts/health-audit.mjs`, läuft über die gebaute Site).
Kein Search-Console-/Traffic-Datenimport im Repo vorhanden — alle Priorisierung
ist qualitativ (Intent-Stärke, Cluster-Fit), keine erfundenen Suchvolumen.

## A. Inventar (255 Health-Seiten)

| Typ | Anzahl | Quelle |
|---|---|---|
| condition (Beschwerden) | 104 | symptom-leaves/*.html (3 davon kanonisieren: schlafstoerungen, burnout, heuschnupfen) |
| editorial (/wissen/ + /haut/) | 71 | wissen*.ts, haut.ts |
| therapy | 31 | therapie-leaves + eigene Seiten (inkl. 9 Massage-Subpages) |
| body_signal (Körpersignale) | 30 | koerpersignale.ts |
| body_region | 8 | gesundheitsbibliothek.ts (Phase 1) |
| visual | 4 gebaut (2 Visuals + 2 Handouts; 28 Drafts in visuals.ts) | visuals.ts — bewusst noindex |
| Hubs | 7 | /gesundheitsbibliothek/, /beschwerden/, /koerpersignale/, /therapien/, /visuals/, /wissen/, /haut/ |

EN-Zwillinge (/en/*) bewusst nicht Teil der Bibliothek (eigener Sprachraum, hreflang-gepaart).

## B. Orphans

Nach den Phase-1/2-Fixes: **0 indexierbare Health-Seiten ohne eingehende Content-Links**
(Links ausserhalb Header/Footer/Drawer). Schwächste Seiten (1–2 eingehende Links) —
Verbesserung lohnt, kein Notfall:
- 4 neue Beschwerden (rotatorenmanschette, wadenschmerzen, sprunggelenkschmerzen, schwere-beine): je 1 Link (Region-Hub). KS_FOR_BESCHWERDE-Rückrichtung existiert jetzt.
- ~20 /wissen/-Artikel: je 2 Links. Empfehlung: CONNECT — Beschwerden-Leaves sollten thematisch passende Wissen-Artikel verlinken (Muster ouchRow existiert schon; Phase 3).
- /beschwerden/prostata/, /beschwerden/schuppenflechte/: je 2 Links, keiner Region zugeordnet. Empfehlung: CONNECT über künftigen Becken-Hub bzw. /haut/-Querverlinkung.

## C. Overlap / Kannibalisierung

**HIGH**
1. `/beschwerden/zyklusbeschwerden/` vs `/beschwerden/menstruationsbeschwerden/` — nahezu synonyme Begriffe, identisches Titel-Template. Empfehlung: GSC-Impressionen vergleichen, schwächere Seite per Canonical auf die stärkere (gleiches Muster wie schlafstoerungen→schlafprobleme). Kein Redirect in dieser Phase.
2. `/wissen/kinderwunsch-akupunktur-tcm/` vs `/beschwerden/kinderwunsch/` ("Akupunktur bei Kinderwunsch") — gleicher Behandlungs-Intent auf zwei URLs. Empfehlung: Wissen-Artikel auf Studien/IVF-Begleitung schärfen, prominenter Link zur Beschwerden-Seite als Haupt-Ziel; GSC beobachten.
3. `/wissen/akupunktur-bei-kopfschmerzen/` (Titel zielt auf *Spannungskopfschmerzen*) vs `/beschwerden/spannungskopfschmerzen/` vs `/beschwerden/kopfschmerzen/` — drei Seiten im selben Intent-Raum. Empfehlung: Wissen-Artikel klar auf "Studienlage" positionieren (Titel ok), Beschwerden-Seiten gegenseitig differenzieren (breit vs. spezifisch) und verlinken; keine Konsolidierung ohne GSC-Daten.

**MEDIUM** (differenzieren + verlinken, koexistenzfähig)
- Übrige "Akupunktur bei X: Studienlage"-Wissen-Artikel vs. Beschwerden-X (nacken, ruecken, heuschnupfen, schlaf, pcos): Evidenz-Intent vs. Behandlungs-Intent — Differenzierung trägt, Querverlinkung fehlt teils.
- kopfschmerzen vs spannungskopfschmerzen; erschoepfung vs stress-burnout; reizdarm vs verdauungsprobleme; pms vs menstruationsbeschwerden: breit vs. spezifisch — ok mit klarer Abgrenzung im Lead + Links.

**LOW**: hexenschuss-was-tun (Akut-Selbsthilfe) vs beschwerden/hexenschuss; schwere-beine vs wassereinlagerungen/lymphoedem; burnout-symptome-erkennen vs stress-burnout. Bereits gelöst: haut/rosacea→beschwerden/rosacea, die 3 MERGED-Slugs.

## D. Thin Content

Kein struktureller Thin-Content-Befund (0 doppelte Titel, alle Leaves mit FAQ/Related/
Sidebar). REVIEW: 6 /wissen/tcm-<stadt>-erfahrungen-ablauf/-Artikel sind Local-SEO-
Editorial, kein Bibliotheks-Inhalt — im Graph als editorial belassen, nicht verknüpfen.
Visual-Drafts (28) sind nicht gebaut — korrekt, kein Handlungsbedarf.

## E./F. Cluster-Stärke (qualitativ, /100)

| Cluster | Hub | Beschwerden | KS | Visuals live | Diagnostik | Score |
|---|---|---|---|---|---|---|
| Rücken | ja | stark (8) | 3 | 1 (LWS) | Info-Block | **82** |
| Hals & Nacken | ja | gut (5) | 5 | 1 (HWS) + 2 Drafts | Info-Block | **78** |
| Schulter/Arm/Hand ("Nerven-Cluster") | ja | stark (9) | 5 | 0 (5 Drafts!) | Info-Block | **72** |
| Schlaf & Nervensystem | ja | stark (10) | 6 | 0 | Info-Block | **70** |
| Zyklus & Hormone | ja | stark (10) | 3 | 0 (pcos Draft) | Info-Block | **68** |
| Hüfte/Bein/Fuss | ja | stark (12) | 6 | 0 (8 Drafts) | Info-Block | **68** |
| Kopf & Gesicht | ja | stark (12) | 8 | 0 (Kiefer-Draft) | Info-Block | **66** |
| Bauch & Verdauung | ja | stark (11) | 1 | 0 | Info-Block | **62** — schwächste wichtige Lücke: nur 1 Körpersignal |
| Becken/Urologie | **kein Hub** | 5 (prostata, blasenentzuendung, reizblase, inkontinenz, haemorrhoiden) | 0 | 0 | — | **35** — wichtigster fehlender Hub |
| Haut | /haut/ (eigene Rubrik) | 6 + 34 Editorial | 0 | 0 | — | 75 (eigenes System, ok) |

## G. Top-Content-Gaps (Tier 1 = als Nächstes bauen)

Bewertung: Intent 25% / Topical Authority 20% / Patient-Relevanz 20% / Orphan-Anbindung 15% / Uniqueness 10% / Visual-Chance 10%.

**Tier 1 (Körpersignale — Bauch/Schlaf/Arm-Lücken schliessen):**
1. "Arm schläft nachts ein" (body_signal, Nerven-Cluster) — verbindet karpaltunnelsyndrom, nackenschmerzen, KS finger-schlafen-ein — **86**
2. "Völlegefühl nach dem Essen" (body_signal, Bauch) — Bauch-Cluster hat nur 1 KS; verbindet verdauungsprobleme, gastritis, reizdarm — **84**
3. "Magenknurren/Bauchgluckern ständig" o. "Blähbauch am Abend" (body_signal, Bauch) — reizdarm, blaehungen — **80**
4. "Nacken morgens steif" (body_signal, Nacken) — nackenschmerzen, spannungskopfschmerzen, Visual nacken-blockade — **80**
5. "Herzklopfen im Liegen" (body_signal, Schlaf) — schlafprobleme, angststoerungen, bluthochdruck — **78**
6. "Augenflimmern" (body_signal, Kopf) — augenmigraene, migraene — **76**
7. "Zehen kribbeln" (body_signal, Bein/Fuss) — polyneuropathie, morton-neurom, brennende-fuesse-nachts — **74**
8. "Schwindel beim Bücken" (body_signal, Kopf) — schwindel, bluthochdruck — **72**

**Tier 1 (Beschwerden — nur wo Visual-Draft + Cluster existieren):**
9. Kalkschulter (condition, Schulter) — Visual-Draft vorhanden, frozen-shoulder/schulterschmerzen verlinken natürlich — **78**
10. Achillessehnenentzündung (condition, Fuss) — Visual-Draft, plantarfasziitis/fersensporn/sprunggelenk — **76**
11. Meniskusbeschwerden (condition, Knie) — Visual-Draft, knieschmerzen/kniearthrose — **72**

**Tier 2:** weitere KS (Ohrensausen bei Stress, Hände zittern, kalte Füsse nachts, Lidzucken-Varianten NICHT — konsolidiert in augenlid-zuckt), Beschwerden Golferarm (in tennisarm abgedeckt — nur eigener Abschnitt), Skoliose, Patellaspitzensyndrom. Diagnostik-Detailseiten (s. I).
**Tier 3:** "Therapie+Beschwerde"-Kombinationsseiten, weitere Stadt-Editorials.
**REJECT:** Timing-/Seiten-Permutationen (Kribbeln morgens/abends/links/rechts), Synonym-Seiten (MRT vs MRI), leere Regionen (Brust, Auge, Kiefer als eigene Hubs).

## H. Top-Visual-Gaps (Drafts priorisieren statt neu erfinden)

Ranking nach Zahl der Seiten, die das Visual stützen würde:
1. **karpaltunnel** (Draft→live): stützt karpaltunnelsyndrom, finger-schlafen-ein, einzelne-finger-taub, hand-kribbelt-beim-velofahren, finger-morgens-steif (5 Seiten)
2. **ischias** (Draft→live): ischias, bein-wird-beim-sitzen-taub, piriformis-syndrom, bandscheibenvorfall (4)
3. **nacken-blockade / muskelverspannung-nacken** (Drafts): nackenschmerzen, nacken-knackt-beim-drehen, spannungskopfschmerzen (3–4)
4. **kniearthrose** (Draft): knieschmerzen, arthrose, knie-knackt-ohne-schmerzen (3)
5. **schulter-impingement + frozen-shoulder + kalkschulter** (Drafts): Schulter-Cluster (4+)
6. **plantarfasziitis/achillessehne** (Drafts): Fuss-Cluster (4)
7. **kiefergelenk-cmd** (Draft): kieferschmerzen, zaehneknirschen (2–3)
8. **pcos** (Draft): pcos, zyklusbeschwerden, kinderwunsch (3)
9. Neu zu erstellen (kein Draft): **Verdauungstrakt-Übersicht** (Bauch-Cluster, 6+ Seiten)
10. Neu: **HWS-Nerv-Ausstrahlung in den Arm** (Nerven-Cluster, 4 Seiten)

## I. Diagnostik-Gaps

Nur Knoten, die viele bestehende Seiten verbinden (heute: Info-Blöcke auf Hubs, keine URLs):
1. **Nervenleitgeschwindigkeit (NLG/ENG)** — karpaltunnelsyndrom, polyneuropathie, 5 KS-Nerven-Seiten → stärkster Kandidat für eine eigene Seite
2. **MRI/MRT** — Rücken-/Knie-/Schulter-Cluster (10+ Seiten referenzieren Bildgebung)
3. **Gastroskopie** — sodbrennen, gastritis, reizdarm, bitterer-geschmack-morgens
Rest (Blut, Röntgen, Ultraschall, neurologisch) als Info-Blöcke belassen.

## J. Interne-Link-Chancen (Rest nach dieser Phase)

ERLEDIGT in dieser Phase: 10 neue KS in KS_LINKS + KS_FOR_BESCHWERDE (25 neue Beschwerde→KS-Zuordnungen); Synonym-Suche; Suche deckt alle 101 kanonischen Beschwerden ab.
OFFEN (Phase 3, nach Impact):
1. Beschwerden-Leaves → passende /wissen/-Studienartikel (10 Zuordnungen, hebt die 2-Link-Wissen-Seiten)
2. Beschwerden-Leaves → live Visuals (heute verlinken nur Region-Hubs + KS-related die Visuals)
3. /wissen/-Artikel → Region-Hubs (editorial in den Graph holen)
4. prostata/schuppenflechte an Regionen anbinden (Becken-Hub bzw. /haut/)

## K. Body-Hub-Empfehlungen

- **Jetzt indexiert (bestehend, 8):** kopf, hals-nacken, schulter-arm-hand, ruecken, bauch-verdauung, huefte-bein-fuss, schlaf-nervensystem, zyklus-hormone — alle über Schwelle (>=10 Knoten, >=3 Entity-Typen).
- **Vorbereiten, noch NICHT bauen:** Becken & Urologie (5 Beschwerden, 0 KS, 0 Visuals — erst ab ~8 Knoten mit >=2 Typen bauen; 1–2 Becken-KS aus Tier 2 würden die Schwelle erfüllen).
- **REJECT:** Brust, Auge, Ohr, Kiefer, Arm einzeln, Fuss einzeln — unter Schwelle bzw. in bestehenden Hubs sinnvoll aufgehoben. Haut: bleibt /haut/.
- Schwelle (Regel): eigener indexierter Hub nur ab ~8 sinnvollen Knoten aus mind. 2 Entity-Typen + eigenständigem Erklärtext.

## L. Nächste Welle (empfohlen)

- 8 Körpersignale (Tier 1, Nr. 1–8) — schliesst die Bauch-/Schlaf-/Arm-KS-Lücken
- 2–3 Beschwerden (Kalkschulter, Achillessehne, optional Meniskus) — aktivieren vorhandene Visual-Drafts
- 3 Visuals live schalten (karpaltunnel, ischias, nacken-blockade) — je 3–5 stützende Seiten
- 1 Diagnostik-Seite (Nervenleitgeschwindigkeit) — verbindet 7 bestehende Seiten
- 10 Link-Fixes (J.1: Beschwerden→Wissen-Zuordnungen)
- danach: Becken-Hub, sobald 2 Becken-KS existieren

Begründung: jede Position verdichtet einen bestehenden Cluster (kein Neuland), nutzt
bereits bezahlte Assets (Visual-Drafts) und hebt schwach verlinkte Seiten — maximale
Wirkung pro neuer URL, null Graveyard-Risiko.
