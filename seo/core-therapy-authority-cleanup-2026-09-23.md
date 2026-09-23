# Core Therapy Authority Cleanup (Phase 3) — 23.09.2026

Regeln: URLs, Routen, Canonicals, Redirects, Navigation, Booking, Tracking eingefroren. Nur Titles/Meta/H1-Prüfung/Links/CSV. Kein neues Artikel-Copy erfunden.

## A.-I. Cluster

### Akupunktur (~6'600/mo, KD 38; GSC Pos. ~52 auf /therapien/akupunktur/)
- OWNER: /therapien/akupunktur/ (bestätigt). ISSUE: Title generisch schwach ("Akupunktur – TCM-Behandlung").
- CHANGE: Title → "Akupunktur: Wirkung, Ablauf & Behandlung | TCM.ch". H1 "Akupunktur TCM.ch Schweiz" belassen (Entity führt, §24: kein Stil-Rewrite).
- Kinder-Methoden (bauch/laser/schaedel/ynsa/schwangerschaft/verfahren): je 3-5 Parent-Links verifiziert, Titles methodenspezifisch → NO CHANGE.
- Fragen/Wissen-Longtails (Dauernadeln, Nebenwirkungen, Müdigkeit, Kosten etc.): Parent-Verlinkung besteht via Fragen-Hubs → NO CHANGE (Longtail-Rankings nicht anfassen).

### Schröpfen (~3'600/mo, KD 26)
- OWNER: /therapien/schroepfen/. ISSUE: GSC zeigte /gesundheitsbibliothek/fragen/schroepfen-methoden/ Pos. ~22 für generisches "schröpfen"; Wissen-Artikel-Title begann mit "Schröpfen:".
- CHANGES: Owner-Title → "Schröpfen: Wirkung, Ablauf & Methoden | TCM.ch". Fragen-Hub Title/H1 → "Schröpfen-Methoden & weitere Anwendungen: häufige Fragen" (Frage-Intent, kein nackter Head mehr; 2 Parent-Links bestehen). Wissen-Artikel-Title → "Schröpfen-Wirkung: Warum Flecken entstehen und wie lange sie bleiben" (H1 bleibt, war bereits narrow; 4 Parent-Links bestehen).

### Hijama vs. Blutiges Schröpfen
- ISSUE: blutiges-schroepfen-Title trug "(Hijama)" = beide Seiten auf Hijama.
- CHANGE: Title → "Blutiges Schröpfen in der Schweiz | TCM.ch". Hijama-Seite unverändert (Owner Hijama). SHARED_INTENT_REVIEW beidseitig aufgelöst (risk medium → low). Keine Routen-/Canonical-Änderung.

### Shiatsu (~4'400/mo, KD 38)
- OWNER: /therapien/shiatsu/. CHANGE: Title → "Shiatsu: Behandlung, Wirkung & Ablauf | TCM.ch". Wissen-Artikel ("Was bringt Shiatsu?...") bleibt Frage-Intent, 4 Parent-Links bestehen → NO CHANGE dort.

### Tuina (~1'300/mo)
- OWNER: /therapien/tuina/. CHANGE: Title → "Tuina Massage: Traditionelle chinesische Massage | TCM.ch" (deckt "chinesische massage"-Intent, inhaltlich gestützt: Seite beschreibt Tuina als chinesische manuelle Therapie; keine Gleichsetzung aller chinesischen Massagen behauptet).

### Kräutertherapie
- OWNER: /therapien/kraeutertherapie/. CHANGE: Title → "Chinesische Kräutertherapie: TCM-Kräutermedizin | TCM.ch"; pk auf "chinesische kräutertherapie". Lokale Kräuter-Inhalte (z.B. Winterthur) bleiben Support, unangetastet.

### Elektroakupunktur
- OWNER: /therapien/elektroakupunktur/ ("Elektroakupunktur in der Schweiz", bereits distinct) → Title NO CHANGE. /wissen/elektroakupunktur-wirkung/ → SECONDARY_SUPPORT (Wirkung/Funktionsweise); 4 Parent-Links bestehen. SHARED aufgelöst per CSV.

### Moxibustion (~720/mo)
- OWNER: /therapien/moxibustion/. CHANGE: Title → "Moxibustion: Moxa-Therapie, Wirkung & Ablauf | TCM.ch" (deckt moxa/moxa therapie). Keine konkurrierende TCM-verstehen-/Wissen-Seite gefunden.

### Ohrakupunktur / Ear Seeds
- Beide Titles bereits distinct → NO CHANGE an Titles. NEUER Kontextlink: Ear-Seeds-Body → /therapien/ohrakupunktur/ ("mit Nadeln arbeitet die klassische Ohrakupunktur"; vorher 0 Links).

### Gua Sha
- Parent + Gesichts-Child bereits sauber getrennt (Titles/H1s), 4 Parent-Links vom Child → NO CHANGE.

### /therapien/ Hub
- Bleibt Hub ("TCM-Methoden"), rankt nicht auf Head-Terms, verlinkt alle Owner → NO CHANGE.

### Homepage
- Erwähnt Methoden, verlinkt auf Therapie-Owner → NO CHANGE (Phase-3-Regel §20).

## F./G. Titles/H1 vorher → nachher

| Seite | Title vorher | Title nachher | H1 |
|---|---|---|---|
| /therapien/akupunktur/ | Akupunktur – TCM-Behandlung | Akupunktur: Wirkung, Ablauf & Behandlung | unverändert |
| /therapien/schroepfen/ | Schröpfen – TCM-Behandlung | Schröpfen: Wirkung, Ablauf & Methoden | unverändert |
| /therapien/shiatsu/ | Shiatsu – Behandlung & Wirkung | Shiatsu: Behandlung, Wirkung & Ablauf | unverändert |
| /therapien/tuina/ | Tuina Massage – TCM-Behandlung | Tuina Massage: Traditionelle chinesische Massage | unverändert |
| /therapien/kraeutertherapie/ | Kräutertherapie – TCM-Behandlung | Chinesische Kräutertherapie: TCM-Kräutermedizin | unverändert |
| /therapien/moxibustion/ | Moxibustion – TCM-Behandlung | Moxibustion: Moxa-Therapie, Wirkung & Ablauf | unverändert |
| /therapien/schroepfen/blutiges-schroepfen/ | Blutiges Schröpfen (Hijama) in der Schweiz | Blutiges Schröpfen in der Schweiz | unverändert |
| fragen/schroepfen-methoden/ | Schröpfen & weitere Methoden: häufige Fragen | Schröpfen-Methoden & weitere Anwendungen: häufige Fragen | analog geändert |
| /wissen/schroepfen-wirkung-flecken/ | Schröpfen: Wirkung und warum die Flecken entstehen | Schröpfen-Wirkung: Warum Flecken entstehen und wie lange sie bleiben | unverändert |

H1s geändert: 1 (Fragen-Hub). Alle Therapie-H1s ("X TCM.ch Schweiz") belassen: Entity führt, Ownership klar, kein Stil-Rewrite (§24).

## H. Link-Änderungen

- NEU: ear-seeds-body → /therapien/ohrakupunktur/ (1 kontextueller Link).
- Verifiziert vorhanden (keine Änderung nötig): alle Akupunktur-Kinder → Parent (3-5×), Fragen-Hub → Schröpfen-Parent (2×), Schröpfen-Wissen → Parent (4×), Elektro-Wissen → Parent (4×), Shiatsu-Wissen → Parent (4×), Hijama/Blutiges → Parent (4/3×), Gesichts-Gua-Sha → Parent (4×).

## J. Content Gaps (EDITORIAL EXPANSION REQUIRED)

Keine akuten: alle 8 Kern-Therapieseiten haben substanzielle Leaves (41-52 KB). Optional für später (ChatGPT-Copy): (1) /therapien/akupunktur/ könnte einen expliziten "Was ist Akupunktur?"-Definitionsabschnitt früh im Body vertragen (aktueller Einstieg ist CTA-orientiert); (2) /therapien/tuina/ könnte den Begriff "Chinesische Massage" explizit einordnen. Beides bewusst NICHT von Claude erfunden.

## K. Bewusst unangetastet

Alle Akupunktur-Kinder-Seiten, alle Fragen-Hubs ausser schroepfen-methoden, Shiatsu-Wissen, Elektro-Wissen (nur CSV), Gua-Sha beide, Ohrakupunktur, /therapien/-Hub, Homepage, TCM-verstehen, Körpersignale, Befunde, Phase-1/2-Seiten.

## L.-O. Freeze & QA

- Routen: ADDED 0 / REMOVED 0 / RENAMED 0. Canonical-Änderungen: 0.
- Tracking: Diff enthält nur Title-Strings, Fragen-Hub-Title/H1/Lead-Text und einen Body-Link; keine onclick/dataLayer/Form/CTA-Änderungen.
- Sitemap: 437 → 437.
- Build ok; health-audit 0 Orphans / 0 doppelte Titel / 0 kaputte Referenzen; keine sichtbaren Em-Dashes auf editierten Seiten.
