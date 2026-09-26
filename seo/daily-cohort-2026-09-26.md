# Daily-Cohort 2026-09-26 — GSC/Semrush-getriebene Expansion (10 Kandidaten auditiert)

**Ergebnis: 10 CREATED (6 Original + 4 Ersatz), 4 Original-Kandidaten BLOCKED** · Natural Discovery (keine Index-Queue, keine manuelle Sitemap-Submission; verifiziert 0 Treffer).

## Audit der 10 vorgegebenen Kandidaten

| # | Kandidat | Verdict | Grund / Owner |
|---|---|---|---|
| 1 | /koerpersignale/harter-oberbauch-ohne-schmerzen/ | **CREATED** | Kein Owner für schmerzloses Hart-Gefühl Oberbauch; druck-im-oberbauch (Druck), magendruck-im-liegen (Liegen), bauch-fuehlt-sich-hart-an (ganzer Bauch), harter-unterbauch (unten) bleiben Owner, alle verlinkt. 4/5-Test bestanden. |
| 2 | /koerpersignale/eine-hand-kalt-die-andere-warm/ | **BLOCKED** | /koerpersignale/kalte-haende-einseitig/ besitzt exakt den Seitenunterschieds-Intent (eine Hand kalt = einseitig). |
| 3 | /koerpersignale/geschwollene-nasenschleimhaut-ohne-schnupfen/ | **BLOCKED** | /koerpersignale/verstopfte-nase-ohne-erkaeltung/ besitzt den Intent; Schleimhautschwellung IST dort der erklärte Mechanismus, keine tragfähige Trennung. |
| 4 | /koerpersignale/heisser-kopf-ohne-fieber/ | **BLOCKED** | hitzegefuehl-ohne-fieber (generell) + warmes-gesicht-kalte-haende (25.09, Gesichts-Wärme) besitzen das Muster; dritte Wärme-Kopf-Seite = Kannibalisierung. |
| 5 | /koerpersignale/knirschen-im-knie-ohne-schmerzen/ | **BLOCKED** | knie-knackt-ohne-schmerzen behandelt Knirschen/Krepitation bereits explizit (3 Erwähnungen); kein eigenständiger Intent übrig. |
| 6 | befunde-werte/triglyceride-erhoeht/ (~260, KD29) | **CREATED** | Einzelwert-Leaf; cholesterin-erhoeht bleibt Blutfett-Umbrella (beidseitig verlinkt). |
| 7 | befunde-werte/kalium-niedrig/ (~110) | **CREATED** | Gegen-Intent zu kalium-zu-hoch; Sicherheitsseite (keine DIY-Korrektur/Dosierung, Red Flags inkl. 144). |
| 8 | befunde-werte/ldl-erhoeht/ | **CREATED** | LDL-Leaf unter Cholesterin-Umbrella (Leberwerte/GGT-Muster); Zielwerte als Risikoabwägung, keine festen Grenzwerte/Medikamenten-Empfehlungen. |
| 9 | befunde-werte/ck-erhoeht/ | **CREATED** | Kein Owner; Muskel-/Gewebemarker mit Sport-Einfluss; GOT/AST-Abgrenzung beidseitig verlinkt; Statin-Hinweis ohne Absetz-Empfehlung. |
| 10 | tcm-verstehen/meridiane-punkte/akupunkturpunkte/ (~170, KD26) | **CREATED** | Kein Owner; Meridiane bleibt Leitbahnen-Owner (beidseitig verlinkt), Therapie bleibt /therapien/akupunktur/; keine Punkt-Kataloge, keine DIY-Anleitung, Evidenz-Teil mit Punktspezifitäts-Kontroverse. |

## Ersatzseiten für die 4 Blocks (alle Befunde, stärkste Kategorie lt. Learnings)

| Ersatz | Audit | Grenze |
|---|---|---|
| befunde-werte/hdl-niedrig/ | kein Owner; Blutfett-Cluster komplettiert | NUR HDL-Niedrig; „mehr HDL ≠ besser" evidenzbewusst |
| befunde-werte/natrium-zu-niedrig/ | kein Owner; Gegen-Intent zu natrium-zu-hoch | Sicherheitsseite (Korrektur-Tempo, keine Selbstanleitung) |
| befunde-werte/magnesium-zu-niedrig/ | kein Owner (nur Nebenerwähnungen in PMS/Wadenkrämpfe-Content) | NUR Laborwert; Wadenkrämpfe-Signal bleibt Owner; keine Dosierungen |
| befunde-werte/bsg-erhoeht/ | kein Owner; Entzündungs-Cluster neben CRP | NUR BSG inkl. BSG-vs-CRP-Abgrenzung, beidseitig verlinkt |

## Integration & Zahlen

- Hub-Gruppen: Stoffwechsel +3 (Triglyceride/LDL/HDL), Elektrolyte +3 (Kalium-/Natrium-/Magnesium-niedrig), Entzündung +1 (BSG), Weitere Werte +1 (CK); KS-Hub Bauch & Verdauung +1; TCM-verstehen Sektion Meridiane & Punkte +1.
- Inbound neu: cholesterin→LDL+Triglyceride, kalium-hoch→niedrig, natrium-hoch→niedrig, crp→bsg, got-ast→ck, meridiane→akupunkturpunkte, druck-im-oberbauch+bauch-hart→oberbauch (9 Bestands-Links).
- Jede Seite 3-6 kontextuelle Outbound-Links; Blutfett-Trio untereinander vernetzt; Elektrolyt-Trio inkl. Magnesium↔Kalium-Zusammenhang.
- Suchindex 316 → **326** (+10) + 10 Synonyme (Hypokaliämie, Hyponatriämie, Kreatinkinase, Blutsenkungsgeschwindigkeit u.a.).
- Sitemap 524 → **534** (+10). CSV +10 PRIMARY_OWNER-Zeilen.
- QA: Build sauber; alle 10 self-canonical/indexierbar, unique Title/H1/Meta, Schema+Breadcrumbs nach Bestand, 0 Em-Dashes; health-audit 0/0/0/0 (keine Duplicate Titles/H1s, keine broken Links, keine Route-Kollisionen); Renders 1440/390 clean.
- YMYL: keine Diagnosen aus Einzelwerten, keine erfundenen Grenzwerte, keine Medikamenten-/Supplement-Dosierungen, TCM interpretiert keine Laborwerte, Akupunkturpunkte-Seite ohne Selbstbehandlungs-Listen.

## Verbleibende Kannibalisierungs-Risiken

- Blutfett-Cluster: cholesterin-erhoeht (Umbrella) vs. LDL/HDL/Triglyceride-Leaves — sauber getrennt, aber Google könnte Umbrella/LDL anfangs mischen; GSC-Query-Zuordnung beobachten.
- harter-oberbauch vs. bauch-fuehlt-sich-hart-an: Lokalisierungs-Trennung wie beim Unterbauch-Paar; bei Query-Überlappung im GSC ggf. Title schärfen.
- Sonst keine offenen Konflikte.

## Teil 2 (Cluster-Tiefe: TCM verstehen + Blutbild/Lipide/Niere)

**Ergebnis: 10 CREATED, 0 BLOCKED** · Natural Discovery (nicht in index-queue, verifiziert 0 Treffer).

| URL | Keyword (CH) | Owner-Grenze | Gruppe/Sektion |
|---|---|---|---|
| tcm-verstehen/grundlagen/organuhr-leber/ | organuhr leber (~140, KD18) | Leaf unter Organuhr-Hub; ordnet „Aufwachen=Leberproblem" explizit ein; KS-Aufwachseite + Leberwerte bleiben Owner | Grundlagen |
| tcm-verstehen/grundlagen/wei-qi/ | wei qi (~30) | NICHT mit Immunsystem gleichgesetzt, keine Schutzversprechen; Infekt-Intent bleibt Wissen-Artikel | Grundlagen |
| tcm-verstehen/grundlagen/jing/ | jing tcm (~20) | keine Substanz/Anti-Aging/Supplements; aus geplant-Liste eingelöst | Grundlagen |
| tcm-verstehen/grundlagen/shen/ | shen tcm (~20) | keine Psycho-Diagnostik aus Shen; Krisen-Hinweis 143/144; aus geplant-Liste eingelöst | Grundlagen |
| befunde-werte/erythrozyten-erhoeht/ | erythrozyten erhöht (~10+Longtail) | Gegen-Intent zu -niedrig; Hb-hoch/HKT-hoch bleiben Owner | Blutbild |
| befunde-werte/haematokrit-niedrig/ | hämatokrit niedrig (~20) | Gegen-Intent zu -erhoeht; Anämie-Kern bleibt Hb-low, kein Eisenmangel-Automatismus | Blutbild |
| befunde-werte/rdw-erhoeht/ | rdw erhöht (~20) | Cluster-Verbindungsseite RDW+MCV-Muster; Ursachen-Owner bleiben | Blutbild |
| befunde-werte/mch-erhoeht/ | mch erhöht (~20) | 4/5 bestanden via relationalem Aufbau: MCH folgt MCV, Ursachen-Tiefe an mcv-erhoeht delegiert (keine Duplikation); MCH≠MCHC als Kern | Blutbild |
| befunde-werte/lipoprotein-a-erhoeht/ | lipoprotein a erhöht (~10) | genetischer Risikomarker, Einordnungs-Seite ohne Conversion/Medikamente/TCM-Senkungs-Claims | Stoffwechsel |
| befunde-werte/harnstoff-niedrig/ | harnstoff niedrig (~20) | Gegen-Intent zu -erhoeht; meist-harmlos-Rahmung | Niere & Blutdruck |

Inbound neu (9): qi→wei-qi/jing/shen, organuhr→organuhr-leber, erythrozyten-niedrig→erhoeht, haematokrit-erhoeht→niedrig, harnstoff-erhoeht→niedrig, ldl→lp(a), mcv-erhoeht+mcv-niedrig→rdw, mchc-erhoeht→mch. Cluster-Ketten komplettiert: RDW↔MCV↔MCH/MCHC↔Hb↔Ferritin↔B12; Cholesterin↔LDL↔HDL↔Triglyceride↔Lp(a); Nierenwerte↔Kreatinin↔Harnstoff hoch/niedrig; Qi↔WeiQi↔Jing↔Shen↔Organuhr(+Leber).
Suchindex 326→**336** (+10 Synonyme inkl. Anisozytose, Lp(a), HbE). Sitemap 534→**544**. CSV +10. geplant-Liste bereinigt (Jing/Shen eingelöst).
QA: Build sauber, alle 10 self-canonical/indexierbar/1 H1/0 Em-Dashes, health-audit 0/0/0/0, Renders 1440/390 clean.
Restrisiko: MCH-erhoeht vs. MCV-erhoeht ist das engste Paar der Welle (bewusst relational gelöst); im GSC beobachten, bei Query-Mischung MCH weiter zuspitzen.
