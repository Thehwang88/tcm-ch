# St. Gallen Local-SEO-Audit — 2026-09-26 (konservativ)

Oberstes Ziel: `/standorte/st-gallen/` (Pos. ~1.2-1.5 für tcm/akupunktur st gallen) als Haupt-Owner SCHÜTZEN. Regel: "If it ranks, protect it."

## 1. Bestehende SG-Landschaft

/standorte/st-gallen/ (Haupt-Owner, standort-leaves/st-gallen.html) · /akupunktur-st-gallen-kosten/ · /akupunktur-tcm-st-gallen/ · /wissen/tcm-st-gallen-erfahrungen-ablauf/ · /massage-st-gallen/ · 9 Massage-Methodenseiten „<Methode> Winterthur & St. Gallen" · /en/locations/st-gallen/.

## 2./3. Query-Owner-Map VORHER + erkannte Risiken

| Query | Owner (vorher) | Risiko |
|---|---|---|
| tcm st gallen / akupunktur st gallen | /standorte/st-gallen/ | **Risiko 1:** /akupunktur-tcm-st-gallen/ führte Title+H1 mit „Akupunktur & TCM in St. Gallen:" an (Head-Term-first). **Risiko 2:** Wissen-Seite führte mit „TCM in St. Gallen:" an. Beide konkurrieren formal um den Head-Term. |
| akupunktur st gallen kosten | /akupunktur-st-gallen-kosten/ | sauber (Title inkl. „Kosten & Krankenkasse 2026") |
| massage st gallen | /massage-st-gallen/ | sauber; Methodenseiten titeln ausschliesslich „<Methode> Winterthur & St. Gallen", kein Generik-Konflikt |
| tcm st gallen erfahrungen | Wissen-Seite | ok, aber Title-Reihenfolge (s.o.) |
| anreise/parken tcm st gallen | Hauptseite (Accordion „Anreise & Parkieren" mit Parkhaus Oberer Graben, A1, Marktplatz Bohl) | kein Konflikt |

**Risiko 3 (dokumentiert, nicht akut):** /akupunktur-tcm-st-gallen/ und die Wissen-Seite überlappen sich gegenseitig im „Ablauf"-Thema.

## 4./5. Supporting-Page-Kandidaten: ALLE 6 BLOCKED (0 neue Seiten)

| Kandidat | Verdict | Begründung |
|---|---|---|
| /standorte/st-gallen/anreise-parken/ | **BLOCKED** | Hauptseite enthält bereits ein vollwertiges Anreise-&-Parkieren-Modul mit realen Daten (Parkhaus Oberer Graben direkt vor der Praxis, A1-Ausfahrt, ÖV-Haltestellen). Subpage = Duplikation + Authority-Split bei Mikro-Volumen. |
| /standorte/st-gallen/erster-termin/ | **BLOCKED** | Nationale Owner existieren (was-passiert-beim-ersten-termin + erster-termin-Hub). Keine verifizierten standortspezifischen Prozess-Fakten im Repo; Seite wäre dünn/dupliziert (Daten-Erfinden-Verbot). |
| /standorte/st-gallen/team/ | **BLOCKED** | Keine Therapeuten-Profildaten für SG im Repo; keine Biografien erfinden. Empfehlung: erst bauen, wenn reale Profile geliefert werden. |
| /standorte/st-gallen/krankenkasse/ | **BLOCKED** | /akupunktur-st-gallen-kosten/ beantwortet Kosten UND Krankenkasse bereits gemeinsam (Title-Beleg). Keine zweite Seite. |
| /standorte/st-gallen/praxis(-rundgang)/ | **BLOCKED** | Nur 1 Standortbild (standort-stgallen.jpg), keine Raum-/Empfangsfotos im Repo. Ohne echten Bildcontent keine Seite. |
| /standorte/st-gallen/termine-oeffnungszeiten/ | **BLOCKED** | Öffnungszeiten stehen auf der Hauptseite + im LocalBusiness-Schema (Mo-Sa 07:30-19:30, So 08:00-17:00). Kein eigenständiger Utility-Intent. |

Kein Doorway-Cluster gebaut; Beschwerde-/Therapie-Intents bleiben national.

## 6./7. Durchgeführte Änderungen (nur Protection, Phase 5)

1. **/akupunktur-tcm-st-gallen/**: Title/H1 gedreht → „Behandlung, Ablauf & Orientierung: Akupunktur & TCM am Standort St. Gallen". Supporting-Intent führt, kein Head-Term-first mehr, kein Exact-Match des Hauptseiten-Titles.
2. **/wissen/tcm-st-gallen-erfahrungen-ablauf/**: Title → „Erfahrungen & Ablauf: TCM-Behandlung in St. Gallen"; H1 → „Erfahrungen & Ablauf: Was dich bei einer TCM-Behandlung in St. Gallen erwartet".

Query-Owner-Map NACHHER: identisch zur Soll-Erwartung aus Phase 10; nur noch die Hauptseite ist intentional auf die Head-Terms optimiert.

## 8. /standorte/st-gallen/ selbst: KEINE Änderung

Geprüft und in Ordnung: Title „Akupunktur & TCM St. Gallen", eindeutiger H1, self-canonical, LocalBusiness/MedicalClinic-Schema mit realen NAP-Daten (Oberer Graben 22, +41 77 523 61 22, Öffnungszeiten), Anreise-Modul, Links auf Kosten- und Massage-Seite (3 interne SG-Links), Breadcrumbs. Pos. 1-2 → bewusst nicht angefasst.

## 9./10. Interne Links & Schema

Keine neuen Links nötig (Hauptfluss national → Beschwerde/Therapie → Standortfinder → Hauptseite existiert; Hauptseite verlinkt Kosten/Massage bereits). Kein Sitewide-Exact-Match-Linking ergänzt. Schema unverändert (Daten real, nichts erfunden).

## 11./12. Sitemap & Master Map

Sitemap unverändert **544** (0 neue URLs — gewollt). CSV: Owner-Zeilen unverändert gültig (/standorte/st-gallen/ bleibt PRIMARY_OWNER der Head-Terms; Support-Rollen unverändert) — die Änderung betrifft nur Title/H1, nicht die Ownership.

## 13. Build/QA

Build sauber, health-audit 0/0/0 (keine Duplicate Titles), Renders Hauptseite + beide Support-Seiten 1440/390 ohne Overflow, Canonicals/Indexierbarkeit unverändert, keine sichtbaren Em-Dashes. Natural Discovery: nichts manuell eingereicht.

## 14. Verbleibende Risiken & Empfehlungen

- **Ablauf-Überlappung** akupunktur-tcm-st-gallen ↔ Wissen-Erfahrungsseite bleibt strukturell: Empfehlung mittelfristig stärker differenzieren (Support-Seite = Angebot/Orientierung am Standort mit CTA; Wissen = redaktioneller Erfahrungs-/Ablaufbericht). Konsolidierung nur erwägen, falls GSC über ~8 Wochen zeigt, dass beide um dieselben Queries rotieren; dann Wissen → Support per 301 (Entscheid Simon, nicht automatisch).
- Title-Änderungen an Support-Seiten können deren eigene Rankings kurz bewegen; Hauptseiten-Rankings sind nicht betroffen (Seite unangetastet).
- Team-/Praxis-Seiten: sinnvoll, sobald reale Profile/Fotos vorliegen.

## SG SEO MONITORING BASELINE (Referenz für künftige SEO-TODAY-Audits)

| URL | Intent | Owner-Rolle |
|---|---|---|
| /standorte/st-gallen/ | tcm st gallen, akupunktur st gallen, chinesische medizin st gallen, tcm/akupunktur praxis st gallen, Anreise/Parken/Öffnungszeiten am Standort | **PRIMARY_OWNER (Haupt-Owner, geschützt; Pos. ~1.2/1.5/1.2/3.9 Stand 26.09.2026)** |
| /akupunktur-st-gallen-kosten/ | akupunktur st gallen kosten, krankenkasse st gallen | PRIMARY_OWNER (Kosten+Krankenkasse) |
| /akupunktur-tcm-st-gallen/ | Behandlung/Ablauf/Orientierung am Standort | SECONDARY_SUPPORT (Title/H1 seit 26.09. supporting-first) |
| /wissen/tcm-st-gallen-erfahrungen-ablauf/ | tcm st gallen erfahrungen (+Ablauf redaktionell) | SECONDARY_SUPPORT (einzige Erfahrungs-Seite) |
| /massage-st-gallen/ | massage st gallen (generisch) | PRIMARY_OWNER |
| /therapien/massage/<methode>/ (9x) | <Methode> (+Winterthur/St. Gallen) | PRIMARY_OWNER nur für Methoden-Intent, nie generisch |
| Neue SG-Support-Seiten | keine (alle 6 Kandidaten 26.09. BLOCKED) | — |
