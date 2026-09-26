# „Was jetzt?"-Cluster — Publish-Report 2026-09-26

Ausgangslage: Das Cluster existierte bereits als auditiertes Phase-1-Scaffold (`src/data/was-jetzt.ts` + Hub/Routen, alle 10 Entries `planned`/noindex, Hub noindex bis ≥4 publizierte Beiträge, strenger 4-von-5-Seiten-Test dokumentiert). Dieser Sprint: Kandidaten-Audit bestätigt, Content verfasst, 10 Seiten + Hub publiziert.

## Kandidaten-Audit (32 geprüft)

**CREATED (10)** = die im Scaffold vorauditierten Gewinner, Audit gegen aktuellen main + CSV erneut bestätigt:
akuter-hexenschuss, ischias-schmerzen, nackenschmerzen-nach-dem-schlafen, migraene-im-anflug, voellegefuehl-nach-dem-essen, blaehbauch-am-abend, muskelverspannungen, knieschmerzen-nach-belastung, schlafprobleme-heute-nacht, leichter-schwindel.

**BLOCKED / NICHT ERSTELLT (22)** mit Grund:

| Kandidat | Grund |
|---|---|
| Was tun bei Rückenschmerzen? | Zu breit; /beschwerden/rueckenschmerzen/ besitzt Query samt Behandlungsintent. Hexenschuss-Akutseite deckt den echten Akut-Intent. |
| Was hilft bei Nackenschmerzen? (generisch) | /beschwerden/nackenschmerzen/ Owner; nur das engere Schlaf-Muster hat eigenen Intent (created). |
| Was hilft bei Spannungskopfschmerzen? | /beschwerden/spannungskopfschmerzen/ + Kopfschmerz-Owner decken Intent; Akut-Handlungsteil dort sinnvoller als neue URL. |
| Was hilft bei Kopfdruck? | Körpersignale kopfdruck-beim-buecken / druck-im-kopf-ohne-kopfschmerzen besitzen das Muster (CTR-Test läuft, nicht kannibalisieren). |
| Was hilft bei Schulterschmerzen? | /beschwerden/schulterschmerzen/ Owner; kein distinkter Akut-Intent mit Substanz jenseits der Owner-Seite. |
| Was tun bei Schlafproblemen? (generisch) | /beschwerden/schlafprobleme/ Owner; nur die Akut-Nacht-Situation ist distinkt (created). |
| Was hilft bei innerer Unruhe? / Was tun bei Stress? | /beschwerden/stress-burnout/ + /wissen/tcm-stress-burnout/ decken Intent; hohes Duplikationsrisiko, kein 4/5. |
| Was hilft bei Blähungen? (generisch) | /beschwerden/blaehungen/ Owner; nur das Abend-Muster distinkt (created). |
| Was tun bei Verstopfung? | /beschwerden/verstopfung/ besitzt Query inkl. Behandlungsintent; Selbsthilfe gehört dort ergänzt statt neue URL. |
| Was tun bei Regelschmerzen? / Was hilft bei PMS? | /beschwerden/menstruationsbeschwerden/ (+ PMS-Kontext) Owner; medizinisch sensibler Selbsthilfe-Rahmen dort besser aufgehoben. |
| Was tun bei kalten Händen und Füssen? | Körpersignale kalte-haende-trotz-waerme / kalte-fuesse besitzen das Muster inkl. Alltagstipps. |
| Was hilft bei Spannung im Nacken? | Deckungsgleich mit muskelverspannungen + nackenschmerzen (created/Owner). |
| Was tun bei morgendlicher Steifigkeit? | finger-morgens-steif / nacken-morgens-steif (Körpersignale) besitzen die Muster. |
| Was hilft bei leichter Übelkeit? | Kein sauberer Owner, aber 4/5-Test verfehlt (dünner Selbsthilfe-Kern, hohes Red-Flag-Gewicht) → bewusst nicht erzwungen. |
| Was tun bei Sodbrennen? | /beschwerden/reflux/-Terrain; Selbsthilfe dort ergänzen. |
| Was tun bei Wadenkrämpfen nachts? | Körpersignal wadenkraempfe-nachts besitzt Muster inkl. Praxis-Tipps. |
| Was tun bei schweren Beinen? | Körpersignal schwere-beine-abends Owner. |
| Was hilft bei Erschöpfung? | /beschwerden/erschoepfung/ Owner. |
| Was tun bei Schwindel? (generisch) | /beschwerden/schwindel/ Owner; nur „leichter Schwindel" mit strikten Red Flags distinkt (created). |
| Was tun bei Hitzewallungen? | /beschwerden/wechseljahre/ Owner (YMYL, hormonelles Terrain). |
| Was hilft bei Augenflimmern? | Körpersignal augenflimmern; Red-Flag-lastig, medical-first → kein Selbsthilfe-Artikel (Safety-Regel). |
| Was tun bei Herzstolpern? | herzstolpern-in-ruhe (KS) Owner; Selbsthilfe-Framing bei Herzsymptomen bewusst vermieden (medical-first). |

## Publizierte Seiten (Hub + 10)

Hub: https://tcm.ch/gesundheitsbibliothek/was-jetzt/ (jetzt indexierbar; HUB_INDEXABLE=true, Bedingung ≥4 publizierte Beiträge erfüllt)

Leaves (alle `/gesundheitsbibliothek/was-jetzt/<slug>/`): akuter-hexenschuss, ischias-schmerzen, nackenschmerzen-nach-dem-schlafen, migraene-im-anflug, voellegefuehl-nach-dem-essen, blaehbauch-am-abend, muskelverspannungen, knieschmerzen-nach-belastung, schlafprobleme-heute-nacht, leichter-schwindel.

## Ownership & Same-Slug-Paare

- Jede Seite besitzt NUR den Handlungs-Intent; Ursachen/Diagnose/Behandlung inkl. TCM-Behandlungsdetail delegieren per Link an die Owner (Beschwerde/Körpersignal), dokumentiert in canonicalIntentOwner/overlapNotes + CSV.
- Höchstes internes Risiko: die Same-Slug-Paare voellegefuehl-nach-dem-essen und blaehbauch-am-abend (Körpersignal ↔ Was-jetzt). Getrennt über H1-Logik (Warum...? vs. Was tun...?), strikt handlungs-only Inhalt und beidseitige Links. Restrisiko: Google könnte die Paare als nahe Duplikate werten → im GSC-Verlauf beobachten; falls Kannibalisierung sichtbar wird, Handlungsteil in die KS-Seite mergen (dokumentierte Fallback-Option des Scaffolds).

## Inhalt & Safety

- Template-Blöcke: Kurz gesagt, Was du jetzt tun kannst, Vermeiden, Tool-Module nur gemäss selfCareTools (Bewegung/Ernährung/Wärme-Kälte/Schlaf/Stress/Ergonomie/Akupressur), Wann ärztlich abklären (alle 10), Wenn es nicht besser wird (Owner-Link), Professionelle Behandlung (evidenzbewusste TCM-Brücke „kann ergänzend eingesetzt werden", nie Ersatz für Abklärung).
- Keine Medikamenten-/Supplement-/Kräuter-Dosierungen (Kräuter nur als Verweis auf /therapien/kraeutertherapie/), Akupressur nur bei Migräne (1-2 Punkte, mit Schwangerschafts-Hinweis), Notruf 144 bei den relevanten Red-Flag-Blöcken, keine TCM-Muster-Diagnosen, keine Garantien.

## Interne Links

- Jede Seite: 3-6 Owner-/Therapie-/Signal-Links im Text + related-Gruppen (verifizierte Ziele, 0 kaputte Links).
- Inbound neu: 5 Körpersignal-related-Links (nacken-morgens-steif, voellegefuehl, blaehbauch, schwindel-beim-aufstehen, immer-zur-gleichen-uhrzeit-aufwachen → passende Was-jetzt-Seiten). Hub war bereits auf dem Bibliotheks-Index verlinkt.

## Technik / Zahlen

- Sitemap: 513 → **524** (+11: 10 Leaves + Hub). Suchindex: 306 → **316** (+10 via bestehendem publishedWasJetzt-Loop) + 10 SYNONYMS („was tun bei..."-Varianten, keine Owner-Konkurrenz).
- CSV: +10 PRIMARY_OWNER-Zeilen (content role action-intent, Grenz-Notizen).
- Alle 10 + Hub: self-canonical, indexierbar, unique Title/H1/Meta, Article+Breadcrumb-Schema, 0 Em-Dashes, „Wann ärztlich abklären"-Block überall.
- health-audit 0/0/0/0; Renders (Hub + 3 Leaves + KS-Inbound-Sample, 1440/390): 0 Overflow, 0 JS-Errors. Build sauber.
- Tracking/Booking/CTA: bestehendes System (Template war fertig), nichts verändert.
- Natural Discovery: URLs NICHT in seo/index-queue.md (verifiziert 0 Treffer).
