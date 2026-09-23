# Daily-Cohort 2026-09-23-b — Organic Library Expansion

Datum: 2026-09-23 · Typ: Daily organic library expansion · Ziel: bis zu 10 Seiten · **Ergebnis: 6 CREATED, 4 BLOCKED** (Qualität vor Quote, keine Ersatzseiten erzwungen) · Indexierungs-Strategie: **Natural Crawl** — KEINE manuellen GSC-URL-Anfragen, URLs bewusst NICHT in seo/index-queue.md (deren Daily-Task submittet automatisch).

## 1. Pre-Write-Ownership-Audit

| # | Kandidat | Verdict | Nächste bestehende URL(s) | Risiko | Begründung |
|---|----------|---------|---------------------------|--------|------------|
| 1 | /koerpersignale/kopfschmerzen-beim-buecken/ | **BLOCKED** | /koerpersignale/kopfdruck-beim-buecken/ | high | Diese Seite besitzt "kopfschmerzen beim bücken" seit CTR-Welle 1 (23.09.): Title "Kopfschmerzen & Kopfdruck beim Bücken: Ursachen", Top-GSC-Query dieser Seite (~108 Impr.), Artikel deckt Schmerz + Druck substanziell ab. Eine neue Seite würde den laufenden CTR-Test kannibalisieren. |
| 2 | /koerpersignale/juckreiz-nachts-ohne-ausschlag/ | **BLOCKED** | identische URL existiert | high | Exakte URL ist bereits live (Körpersignal-Bestand). Duplikat. |
| 3 | /gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/ | CREATE | nach-der-behandlung-Hub (Erstverschlimmerungs-Antwort) | medium→low | Hub-Antwort bleibt Kurzform-Owner; Standalone besitzt das breitere "starke/ungewöhnliche Reaktion"-Muster, Grenze in Title/Intro/Links explizit; keine Heilkrise-Behauptung. |
| 4 | /gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/ | CREATE | keine | none | Kein Owner; YMYL-Sicherheitsseite. |
| 5 | /fragen/tut-akupunktur-weh/ | **BLOCKED** | /gesundheitsbibliothek/fragen/tut-akupunktur-weh/ | high | Standalone-Frage existiert bereits mit exakt diesem Intent. |
| 6 | /gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/ | CREATE | sicherheit-nebenwirkungen-Hub (Kurzantwort) | medium→low | Kein Standalone-Umbrella-Owner vorhanden; Hub-Antwort bleibt und verlinkt neu auf die Übersicht; Umbrella verlinkt auf enge Seiten (blaue Flecken, Müdigkeit, Nerv, starke Reaktion) statt zu duplizieren. |
| 7 | /gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/ | CREATE | leberwerte-erhoeht | medium→low | Generisches "Leberwerte erhöht" bleibt beim Umbrella-Owner (GGT dort nur Listenpunkt); neue Seite besitzt NUR den GGT-Einzelwert, Grenze in Body + CSV dokumentiert, beidseitig verlinkt. |
| 8 | /gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/ | CREATE | keine | none | Kein Owner (keine Nieren-Seite im Bestand). |
| 9 | /gesundheitsbibliothek/befunde-werte/blutzucker-erhoeht/ | **BLOCKED** | identische URL existiert (publiziert 22.09., Welle 5) | high | Exakte URL ist der bestehende PRIMARY_OWNER. Statt Duplikat: bestehende Seite per Related-Link mit neuer HbA1c-Seite verstärkt. |
| 10 | /gesundheitsbibliothek/befunde-werte/hba1c-erhoeht/ | CREATE | geplante Entity hba1c-leicht-erhoeht (nie live) | low | Per etabliertem Muster umbenannt + publiziert; "leicht erhöht" als Abschnitt; Grenze zu blutzucker-erhoeht (Momentaufnahme vs. Langzeitwert) beidseitig verlinkt. |

## 2. CREATED (6) — Cohort-Tracking

| URL | Cluster | Target-Query | Publiziert | Ownership | Risiko | Sitemap | Hub | Links |
|---|---|---|---|---|---|---|---|---|
| /gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/ | Fragen | starke reaktion nach akupunktur | 2026-09-23 | PRIMARY_OWNER | low | ja | Fragen (auto) | in: Umbrella; out: Müdigkeit, blaue Flecken, Nerv, Hub, Arzt-Seite |
| /gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/ | Fragen | akupunktur nerv getroffen | 2026-09-23 | PRIMARY_OWNER | low | ja | Fragen (auto) | in: Umbrella, starke Reaktion; out: Umbrella, tut-weh, Akupunktur |
| /gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/ | Fragen | akupunktur nebenwirkungen | 2026-09-23 | PRIMARY_OWNER (Umbrella) | low | ja | Fragen (auto) + Hub-Antwort verlinkt | out: 4 enge Seiten + Therapie |
| /gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/ | Befunde | gamma gt erhöht | 2026-09-23 | PRIMARY_OWNER (GGT-Einzelwert) | low | ja | Befunde-Hub (auto) | out: leberwerte, crp, fettleber |
| /gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/ | Befunde | nierenwerte erhöht | 2026-09-23 | PRIMARY_OWNER | low | ja | Befunde-Hub (auto) | out: blutzucker, leberwerte, bluthochdruck |
| /gesundheitsbibliothek/befunde-werte/hba1c-erhoeht/ | Befunde | hba1c erhöht | 2026-09-23 | PRIMARY_OWNER (Langzeitwert) | low | ja | Befunde-Hub (auto) | in+out: blutzucker-erhoeht (beidseitig), cholesterin |

## 3.-7. Integrationen

- Interne Links neu: Hub-Antwort "Welche Nebenwirkungen hat Akupunktur?" → Umbrella-Seite; blutzucker-erhoeht → hba1c-erhoeht (Related); alle neuen Seiten 3-6 kontextuelle Links auf bestehende Owner, natürliche Anker-Variation.
- Suche: 6 neue Einträge via bestehende Loops (Index 240 → 246) + 6 SYNONYMS.
- CSV: 6 neue PRIMARY_OWNER-Zeilen mit Grenz-Notizen (GGT vs. Leberwerte, HbA1c vs. Blutzucker, Umbrella vs. enge Reaktions-Seiten, starke Reaktion vs. Erstverschlimmerungs-Hub-Antwort).
- Keine Quellenlisten erfunden (Projekt-Konvention: extern nicht verifizierbar in dieser Umgebung; vorsichtige Formulierungen; suggestedReviewerType dokumentiert Review-Bedarf).

## 8.-11. Technik & Build

- Sitemap: 447 → **453** (+6, via bestehenden Generator; Sitemap-URL: https://tcm.ch/sitemap.xml).
- Alle 6: 200, self-canonical, indexable, unique Title/H1, Schema nach bestehendem Muster, suchbar, im Hub, keine Orphans, keine sichtbaren Em-Dashes.
- hba1c-leicht-erhoeht: keine Route mehr (sauber umbenannt, war nie live). Geplante MRT-Befunde weiterhin ohne Route.
- health-audit: 0 Orphans / 0 doppelte Titel / 0 kaputte Referenzen. Renders 1440/390 ohne Overflow/Errors.
- Tracking/Booking: unverändert.
- Warnung: keine.

## 12. Finale Produktions-URLs

- https://tcm.ch/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/
- https://tcm.ch/gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/
- https://tcm.ch/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/
- https://tcm.ch/gesundheitsbibliothek/befunde-werte/hba1c-erhoeht/

## 13. Deployment-Hinweis

After deployment, verify the updated sitemap in Google Search Console. Do not manually request indexing for this cohort yet.

Spätere Cohort-Audits: discovered/indexed-Status, erste Impressionen, Klicks, Ø-Position, natürliche Crawl-Geschwindigkeit.
