# TCM.ch Professional Architecture

**North Star:** TCM.ch wird die professionelle Infrastruktur der Schweizer TCM: lernen, Anerkennung verstehen, Mentor:in finden, Stelle finden und besetzen, Praxisraum finden, Praxis eröffnen und rechnen, Praxis inserieren, Nachfolge finden, Kurse entdecken, Expertise beitragen, benchmarken und als Partner mit TCM.ch wachsen.

**Prinzip:** Zuerst das System, dann Inhalte. Keine dünnen Seiten, keine erfundenen Profile, Inserate, Kurse, Jobs, Zitate oder Statistiken.

## 1. Ebenen und Owner-Fragen

| Säule | Ebene | Route | Frage | Status |
|---|---|---|---|---|
| — | Gateway | `/fachpersonen/` | Wo fange ich an? | live, index |
| LEARN | Akademie | `/akademie/` | Wie lerne ich mit TCM.ch? (M7, Mentorat, Praktikum, Weiterbildung, Business-Mentoring) | live |
| LEARN | Weiterbildungen | `/weiterbildungen/` | Welche Kurse/Events gibt es branchenweit? | Gerüst, noindex |
| WORK | Jobs | `/jobs/` | Welche TCM-Stellen gibt es in der Schweiz? | Gerüst, noindex |
| WORK | Karriere | `/karriere/` | Wie arbeite ich bei TCM.ch? (interim auch TCM Jobs Schweiz) | live |
| CONNECT | Verzeichnis | `/verzeichnis/` | Wer ist in der Branche tätig? | Gerüst, noindex |
| BUILD | Praxiswissen | `/praxiswissen/` | Wie führe ich eine Praxis? | live |
| BUILD | Tools | `/tools/` | Hilf mir rechnen/entscheiden | planned |
| TRADE & MATCH | Marktplatz | `/marktplatz/` | Praxis, Raum, Nachfolge, Praxispartner, Vertretung | Gerüst, noindex |
| GROW | Partner | `/partner/` (+ `/modell/`, `/praxisnachfolge/` geplant) | Mit TCM.ch aufbauen/ausbauen? | live |
| READ | Branche | `/branche/` | Wie funktionieren Beruf & Markt? | planned |
| READ | Regulatorik | `/regulatorik/` | Welche Regeln/Register gelten? | planned |
| READ | Daten | `/daten/` | Wie sieht der Markt aus? | planned |
| CONTRIBUTE | Mitmachen | `/community/` | Wie beteilige ich mich? | Gerüst, noindex |

Code-Registry: `src/data/pro/architecture.ts` (Ebenen, Gateway-Karten, Lebenszyklus, Cluster). Topic-Registry: `seo/professional-topic-map.csv`.

### Status-Werte
`live` · `scaffold_noindex` (echte Route, `noindex,follow`, keine Einträge, nicht in Sitemap) · `planned` (keine Route) · `blocked` · `editorial_only` (OUCH) · `tool_candidate` · `data_candidate`. **Geplante Einträge sind nie Sitemap-URLs.** Priorität (P1–P3) ist reine Planungsinformation.

## 2. Lebenszyklus
Ausbildung → Praktikum → M7/Mentorat → Berufseinstieg → Anstellung → Senior/Standortleitung → Selbstständigkeit → Eigene Praxis → Wachstum/Team → TCM.ch Partnerschaft → Praxisnachfolge. (`LIFECYCLE_STAGES`, Spalte `lifecycle_stage`.)

## 3. Owner-Trennungen (verbindlich)

| Intent | Commercial | Neutral/Referenz | Editorial |
|---|---|---|---|
| TCM Jobs Schweiz | `/jobs/` (nach Owner-Wechsel; bis dahin `/karriere/` interim) | `/branche/tcm-arbeitsmarkt-schweiz/` (planned) | OUCH `tcm-jobs-schweiz` |
| Arbeiten bei TCM.ch | `/karriere/` | – | – |
| M7 / Mentorat | `/akademie/` | `/verzeichnis/mentoren/` (neutral) | OUCH `m7-mentorat-tcm` |
| Weiterbildung | `/akademie/` (TCM.ch) | `/weiterbildungen/` (branchenweit) | – |
| EMR / ASCA | – | Fachperson: `/regulatorik/emr|asca/` · Patient: `/krankenkassen/` | OUCH `emr-asca-labyrinth` |
| Kantone / BAB | – | `/regulatorik/kantone/` Navigator | OUCH `kantons-lotterie` |
| Praxis verkaufen / Nachfolge | `/partner/praxisnachfolge/` (TCM.ch) | `/marktplatz/praxisverkauf/` (neutral) · Info `/praxiswissen/tcm-praxis-verkaufen/` | – |
| Praxispartner | `/partner/` (TCM.ch) | `/marktplatz/praxispartner/` («Praxispartner gesucht», extern) | – |
| Therapeut:in finden | `/standorte/` (Patient:innen) | `/verzeichnis/` (professionell) | – |

**Owner-Wechsel Jobs:** Auslöser = `/jobs/` hat ≥ `HUB_INDEX_MIN_ENTRIES` (10) geprüfte aktive Inserate. Dann: `/jobs/` indexieren, master map umstellen, `/karriere/` Title/Meta auf «Karriere bei TCM.ch», interne Anker «TCM Jobs» → `/jobs/`. Kein Redirect.

**OUCH vs. TCM.ch:** OUCH = Meinung, Kritik, Provokation, Fallstudien, «Obduktion», persönliche Stimme. TCM.ch = Referenz, Rechner, Guides, aktuelle Regeln, Tools, Checklisten, Frameworks, Commercial Next Step. Querverlinken, nie kopieren, OUCH nicht glätten.

## 4. Datenmodelle (`src/data/pro/`)
- `taxonomy.ts` — Profil-/Listing-Typen, **Verifizierung** (`unclaimed → claimed → identity_verified → professional_info_verified`, `tcmch_team`, `tcmch_partner`, Badges in Klartext, keiner = klinische Empfehlung), **Moderation** (`draft, submitted, needs_review, verified, published, rejected, expired, archived` + erlaubte Übergänge; nie submitted→published), **Ablauf** (`EXPIRY_RULES`: Jobs/Vertretung per `expiresAt`, Kurse per `endDate`, Räume 60 d, Praxisverkauf/Gesuche/Partner 90 d, Profile 365 d, Mentor:innen 180 d Reconfirm; `effectiveStatus()`), **Indexregeln** (`profileRobots()`, `FILTER_ROBOTS = noindex,follow`, `HUB_INDEX_MIN_ENTRIES`, Mindestlängen), Kategorien, Sortierung ohne Qualitätsanspruch, Promotion-Flags (ohne Billing, immer gekennzeichnet), `fingerprint()` für Dubletten.
- `entities.ts` — Therapist/Clinic/Mentor/School/Organisation-Profile, JobListing (+ `jobPostingSchema()` nur für echte, aktive, vollständige Inserate; Lohn nur vom Arbeitgeber), CourseEvent (Anerkennung nur mit Beleg; `isTcmchOffer` sichtbar), Marketplace-Listings (Praxisverkauf mit `Disclosed<>`: public / range / on-request; vertraulich ohne Adresse; `publicListing()` entfernt private Felder VOR dem Rendern). Alle Arrays leer.
- `contributions.ts` — `ExpertContribution` (profileId, displayName, role, organisation, quote, sourceType interview|survey|public-source|internal, consentConfirmed), `renderableQuotes()` (nur mit Einwilligung; öffentliche Quellen nur mit Link), Interviews, First-Party-Beobachtungen (immer «TCM.ch-Netzwerkdaten»), Quellen getrennt nach Fakt/Analyse, anonymer `BenchmarkResponse` (nur Bandbreiten; `BENCHMARK_PUBLISHING_ENABLED = false`).
- `submissions.ts` — modulare Formschemata: Profil, Stelle, Praxisverkauf, Praxisraum, Praxisgesuch, Praxispartner*, Vertretung*, Weiterbildung, Mentor:in, Expertise, Benchmark* (*nicht öffentlich in Phase 1). Private Felder werden nie gerendert.
- `regulatorik-kantone.ts` — Kanton-Record mit `Verified<T>` (ehrliches «unverified»), amtlichen Quellen, `lastVerified`; `CANTON_RECORDS = []`; `isPublishable()`.
- `daten-methodik.ts` — `DatasetMeta` (Stichprobe, Zeitraum, Standorte, Methodik, Ausschlüsse, Limitationen, Stand); `DATASETS = []`.

Praxiswissen-Artikel erben `ProfessionalContentExtras` und rendern optional «Stimme aus der Praxis», Netzwerk-Beobachtungen und Quellen (Fakt vs. Analyse).

## 5. Einreichungen & Moderation (Phase 1)
`/community/` → `ProSubmissionForm` → `POST /api/einreichung` (Consent × 2, Datenschutz, Honeypot, Turnstile, Feldlimits, Server-Timestamp, ID) → E-Mail-Queue an termine@tcm.ch mit Status **submitted**. Nichts wird automatisch veröffentlicht. Kontakt standardmässig «über TCM.ch». Ablehnungsgründe: `REJECTION_REASONS`.

**Bewusst nicht gebaut:** Forum, Kommentare, Messaging, Follower, Likes, Bewertungen, Benachrichtigungen, Newsletter-Versand, Payments, Accounts.

## 6. Persistenz & Accounts (Migrationspfad)
1. **Heute:** statische TS-Arrays (leer) + E-Mail-Queue. Freigegebene Einträge würden manuell in TS erfasst → Build.
2. **Stufe 2 (ab ~20 Einreichungen/Monat):** Cloudflare D1 (Tabellen `submissions`, `profiles`, `jobs`, `courses`, `listings`, alle mit `status`, `submitted_at`, `last_confirmed_at`, `expires_at`, `fingerprint`); `/api/einreichung` schreibt zusätzlich in D1; einfache Moderations-UI hinter Cloudflare Access; Seiten via Worker-SSR oder Build-Hook.
3. **Stufe 3:** Accounts (User → ProfessionalProfile → Listings/Jobs/Courses/MentorProfile/Contributions), Magic-Link-Login, Claim-Flow für Profile, Reconfirm-Mails aus `EXPIRY_RULES`.
Die Typen in `src/data/pro/` sind bewusst persistenzneutral und bleiben die Vertragsschicht.

## 7. SEO-Regeln
- Nur indexieren: Gateway, echte Owner-Seiten, Hubs ab Mindestanzahl echter Einträge, substanzielle Profile (`profileRobots()`), aktive echte Inserate/Kurse.
- Filter/Suche immer `noindex,follow`; keine Stadt × Rolle × Methode-Seiten; keine Rankings.
- Ein Eintrag = eine kanonische URL. Abgelaufene Jobs: Stufe 1 «Stelle nicht mehr aktiv» + noindex, Stufe 2 410; nie auf fremde Stellen umleiten.
- Schema nur für reale, vollständige Entitäten (JobPosting, Course/Event, Person, Organization); nie erfundene Ratings, Reviews, Löhne, Credentials.
- Profil-Meta nur aus Fakten generiert («Name – Rolle in Ort | TCM.ch Fachpersonen»), keine freien Meta-Titel, Feldlimits gegen Keyword-Stuffing.
- **Eigene Sitemap** (`sitemap-professionals.xml`): derzeit nicht nötig – `gen-sitemap.mjs` schliesst noindex bereits aus. Einführen, sobald Profile/Inserate dynamisch dazukommen.
- **Suche:** künftig eine Fachpersonen-Suche über `SearchEntity` (Profile, Kliniken, Jobs, Kurse, Mentor:innen, Inserate, Praxiswissen, Branche, Regulatorik), klar getrennt von der Patientensuche.

## 8. Wissensgraph (künftige Querverlinkung)
Profil → Klinik, Mentor-Status, Kurse, Artikel mit Zitat, aktuelle Inserate · Klinik → Jobs, Raum, Nachfolge, Team · Kurs → Anbieter, Mentor:in, Akademie-Abgrenzung · Artikel → zitierte Person, Tool, CTA · Praxisverkauf → Nachfolge-Ratgeber, Praxiswert-Tool, TCM.ch Nachfolge.

## 9. Qualitäts- und Vertrauensregeln
- Unabhängige Fachpersonen nie als TCM.ch-Team darstellen («Ein professionelles Verzeichnis auf TCM.ch», nicht «Unser Team»).
- Jedes Profil zeigt «Zuletzt aktualisiert» und «Angaben der Fachperson»; «Profil bestätigt» = nur Identität/Inhaberschaft.
- M7-Akkreditierung, Kurs-Credits, Schul-Anerkennungen nur mit Nachweis.
- Bezahlte Platzierungen (künftig) immer gekennzeichnet; organische Reihenfolge nie zahlungsabhängig.

## 10. Governance-Check
`node scripts/check-professional.mjs` (nach `npm run build`): prüft Registry-Duplikate, dass geplante URLs nicht gebaut/in der Sitemap sind, dass Gerüste noindex und nicht in der Sitemap sind, dass live-URLs gebaut + indexierbar + self-canonical sind, und die Moderations-/Ablauf-/Indexlogik.

## Content-Kohorte 1 (2026-09-30)
- Live: /branche/ (Hub) + 4 Leaves, /partner/praxisnachfolge/, /praxiswissen/tcm-praxis-uebernehmen/, /praxiswissen/tcm-praxis-verkaufen/.
- Gebaut, aber `noindex,follow`: /regulatorik/ (Hub) + 5 Leaves. Gate `REGULATORIK_VERIFIED` in `src/data/pro/regulatorik.ts`.
  Freischalten: jede Quelle in `SOURCES` im Browser prüfen, `checked` datieren, Gate auf `true`, Status in `professional-topic-map.csv` / `master-keyword-url-map.csv` auf `live`. Dann erscheint «Zuletzt fachlich geprüft» automatisch.
- Wortgetreue Fliesstexte: `src/data/pro/cohort-bodies.ts`. Komponenten: `ProWasIstWas`, `ProSources` (src/components/pro/), Formular `NachfolgeForm` (quelle=praxisnachfolge).
