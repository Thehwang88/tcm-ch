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
