# TCM.ch Gesundheitsbibliothek — Architektur & Governance (Source of Truth)

Stand: 2026-09-26 (Phase 0/1). Dieses Dokument definiert die semantische Architektur, Intent-Grenzen und Publishing-Regeln. Ergänzend: `seo/master-keyword-url-map.csv` = vollständige Ownership-Karte aller intendierten indexierbaren URLs (Pflicht VOR jeder Publikation, keine Ausnahmen).

## Ziel

Maximale nützliche Suchabdeckung mit genau EINEM klaren Owner pro relevantem Intent — nicht maximale Seitenzahl. Der strategische Graben ist der Graph, nicht die Artikelmenge. Jede Expansion schützt gegen: Kannibalisierung, doppelte Intents, Thin/Programmatic Content, Doorways, unsichere Gesundheitsratschläge, erzwungene TCM-Bezüge, unkontrolliertes Index-Wachstum.

## Cluster & Intent-Grenzen (eine Zeile pro Cluster)

| Cluster | Route | User-Intent | Rolle |
|---|---|---|---|
| Körpersignale | /koerpersignale/ | „Ich bemerke X. Was könnte dahinterstecken?" | Prä-diagnostische Symptom-Discovery. KEINE Behandlungsseiten, keine Diagnose-Head-Terms. |
| Beschwerden | /beschwerden/ | „Ich kenne/vermute Diagnose X." | Erkrankungs-Owner: Was/Symptome/Ursachen/Abklärung/Behandlung inkl. evidenzbewusster TCM-Rolle; Brücke zu Therapie/Termin. |
| Körper & Regionen | /gesundheitsbibliothek/koerper/ | „Zeig mir Probleme dieser Körperregion." | HUB_NAVIGATION_OWNER. Verbindet Signale/Beschwerden/Untersuchungen/Visuals/Was-jetzt/Therapien. Besitzt NIE Krankheits-Head-Terms (z. B. koerper/ruecken konkurriert nie mit beschwerden/rueckenschmerzen). |
| Was jetzt? | /gesundheitsbibliothek/was-jetzt/ | „Was kann ich jetzt tun?" | Action-Intent-Owner (was tun/was hilft/selbsthilfe/hausmittel). Es gibt genau EINEN Action-Owner pro Thema; keine separaten Hausmittel-/Selbsthilfe-Cluster. Struktur: Kurzantwort, risikoarme Massnahmen, Vermeiden, Abklärung/Red Flags, wenn es bleibt, professionelle Behandlung. |
| Befunde & Werte | /gesundheitsbibliothek/befunde-werte/ | „Mein Messwert ist auffällig." | Interpretation, NIE Diagnose aus Einzelwert. Pflicht: Kontext, häufige Gründe, Grenzen, Begleitwerte, Follow-up, Dringlichkeit, Referenzbereich-Hinweis. Keine TCM-Interpretation von Laborwerten. |
| Untersuchungen & Diagnostik | /gesundheitsbibliothek/untersuchungen/ | „Was ist diese Untersuchung, warum, was erwartet mich?" | First-Class-Cluster (formalisiert 26.09.2026). Untersuchung = „Was ist ein MRT?"; Befund = „Was bedeutet das Resultat?"; getrennte Owner, verlinkt. Aktuell 1 Leaf (nervenleitmessung); eigene Hub-Route erst ab >=4 publizierten Leaves (kein Thin-Hub; Muster wie was-jetzt HUB_INDEXABLE). |
| Patientenfragen | /gesundheitsbibliothek/fragen/ | „Was muss ich rund um die Behandlung wissen?" | Praktische Behandlungsfragen (vorher/während/nachher). Absorbiert KEINE Symptom-/Krankheitsfragen. Muster: Kategorie-Hub hält Kurzantworten, Standalone-Seite besitzt den breiteren Einzel-Intent (beidseitig verlinkt). |
| TCM verstehen | /gesundheitsbibliothek/tcm-verstehen/ | „Was bedeutet dieses TCM-Konzept?" | TCM-Wissensgraph/Topical Authority. Traditionelle Konzepte IMMER als traditionelle Modelle gekennzeichnet, getrennt von Biomedizin; keine Muster-Diagnosen aus Einzelzeichen. |
| Therapien | /therapien/ | „Welche professionelle Behandlung gibt es?" | Kommerzielle Behandlungs-Owner (Head-Terms LOCKED seit Phase 3). |
| Wissen | /wissen/ | Editorial | Editorial-/Explainer-Layer: Evidenz, Vergleiche, Saisonales, Perspektiven, Themen ohne anderes semantisches Zuhause. NICHT mehr Default-Ablage für sonstige SEO-Seiten; hat ein Thema einen klaren Owner anderswo, wird Ownership geprüft (URL-Migration nur wenn nötig — SEO-Stabilität vor Ordnung). |
| Visual Library | /visuals/ | „Zeig es mir." | Produkt-Layer, verbindet Signal/Beschwerde/Untersuchung/Therapie kontextuell. |
| Standorte | /standorte/ | lokal-kommerziell | Lokale Owner; Supporting-Local-Seiten nur mit echtem Utility-Intent (siehe sg-local-seo-audit). |

## Owner-Hierarchie (CSV `owner_status`)

- **PRIMARY_OWNER** — besitzt den Such-Intent (nur nach bestandenem Audit; nie zwei PRIMARY für materiell identischen Intent).
- **SECONDARY_SUPPORT** — stützt einen Primary, targetet dessen Query nicht aggressiv (Title/H1 supporting-first).
- **HUB_NAVIGATION_OWNER** — organisiert Entitäten, besitzt bewusst keine Kind-Head-Keywords (auch als „HUB / NAVIGATION_OWNER" lesbar; Bestandswerte bleiben rückwärtskompatibel).
- **SHARED_INTENT_REVIEW** — temporär, braucht menschlichen Entscheid.
- **REDUNDANT** — konkurriert nicht mehr (z. B. kanonisierte Alt-Routen).
- **TECHNICAL_ONLY** — Rechtliches/System/Redirect/Noindex.

## Interner Link-Graph

Kern-Journey (nicht linear, lateral erwünscht):
Körpersignal → Was jetzt? → Beschwerde → Untersuchung → Therapie → Standort — plus Befund↔Befund-Cluster, Frage↔Therapie-Chips, TCM-Konzept↔Konzept, Visual↔Entity. Beispiel: Finger schlafen ein → Karpaltunnelsyndrom → Nervenleitmessung → Akupunktur/Physio → Visual → Standort. Jeder neue Artikel: 3-6 kontextuelle Links + mindestens 1 Inbound aus dem Bestand. Kommerzieller Local-CTA zeigt auf den Standort-Hauptowner. Keine Sitewide-Exact-Match-Anker; Anchor-Mix natürlich.

## Zukunfts-Layer (dokumentiert, NICHT gebaut — keine leeren Seiten)

1. **Termin & Arztgespräch** — geplant unter `/gesundheitsbibliothek/arzttermin/` (Slug bei Bau final entscheiden). Intent: „Wie bereite ich das Arztgespräch vor?" (Symptomtagebuch, Fragen bei Befund X). Bewusst klein; wächst nur mit Suchdaten. Owner-Regel: ergänzt Signale/Befunde, besitzt nie deren Head-Terms.
2. **TCM Arzneien & Heilpflanzen** — geplant unter `/gesundheitsbibliothek/tcm-arzneien/`. Entity-Enzyklopädie (Huang Qi, Dang Gui, ...): botanische Identität, traditionelle Klassifikation, Evidenz, Sicherheit/Interaktionen/Schwangerschaft, Rolle in Rezepturen. NIE: DIY-Verordnungen, Dosierungen, „nimm X gegen Y". Kommerzieller Owner bleibt /therapien/kraeutertherapie/.
3. **Symptom Navigation / Checker** — Produkt/Tool, KEIN programmatischer URL-Generator. Dynamische Kombinationen erzeugen keine indexierbaren URLs; nur validierte High-Value-Muster werden redaktionelle Seiten (dann regulär durch das Gate).

## Publishing-Gate (Pflicht vor jeder neuen URL)

1. Ownership-Map + Repo-/Live-Suche (exakter Intent + Synonyme) → nächster Owner, Overlap, Grenze.
2. GSC-/Keyword-Signal wo verfügbar; richtiger Cluster; interner Link-Plan (3-6 out, >=1 in).
3. **4/5-Qualitätstest**: distinkter Intent · materiell anderer Inhalt · 3-5+ sinnvolle Verknüpfungen · Standalone-Nutzen · SEO-/Navigationswert. <4/5 → BLOCK (Alternative: Owner-Seite verbessern).
4. YMYL-Review: keine Diagnose aus Einzelsymptom/-wert, keine erfundenen Studien/Reviewer/Schwellenwerte, keine Medikamenten-/Supplement-Dosierungen, verhältnismässige Red Flags (Notruf 144, Krisen 143), Schweizer Kontext (ss, Du-Form), keine sichtbaren Em-Dashes, TCM evidenzbewusst und nie als Ersatz notwendiger Abklärung.
5. Publish → CSV-Zeile (vorher!) → Sitemap via Build → Natural Discovery (keine manuelle Einreichung für Kohorten ab 23.09.2026) → Indexierung beobachten.

## Täglicher Betrieb

GSC-Daten → neue Queries → Gewinner/Verlierer → Indexierung der Kohorten → malformed/duplicate URLs → Sitemap → neue Seiten gegen Ownership-Map → Kannibalisierung → fehlende Knoten in erfolgreichen Graphen → Chancen ranken. Aktionen klassifizieren: URGENT FIX / OPTIMIZATION / EXPANSION / ARCHITECTURE / OBSERVE. Nie Content nur wegen Tagesquote.

## Bekannte Governance-Entscheide (Referenz)

- Hub-Kurzantwort vs. Standalone-Frage: Hub bleibt Kurzform-Owner, Standalone besitzt den breiten Intent (etabliertes Muster, beidseitig verlinkt).
- Same-Slug-Paare Körpersignal↔Was-jetzt (voellegefuehl, blaehbauch): KS=Einordnung, WJ=Handlung; H1-Logik „Warum?" vs. „Was tun?"; GSC-beobachtet.
- Umbrella→Leaf-Muster: leberwerte→GGT/ALT/AST/AP/Bilirubin; nierenwerte→Kreatinin/Harnstoff; cholesterin→LDL/HDL/Triglyceride/Lp(a); leukozyten→Subtypen; Organuhr→Organuhr-Leber.
- Kanonisierte Alt-Routen (burnout, heuschnupfen, schlafstoerungen, haut/rosacea, wissen/akupunktur-in-meiner-naehe) = REDUNDANT, bleiben als Canonical-Quellen bestehen.
- Wissen-Artikel mit Action-Intent (hexenschuss-was-tun, was-hilft-gegen-kopfschmerzen, erkaeltung-im-anflug, heizungsluft, faszien-verklebt-was-hilft): hexenschuss-was-tun = SECONDARY_SUPPORT des Was-jetzt-Owners (cross-verlinkt); übrige bleiben PRIMARY, solange kein Was-jetzt-Gegenstück existiert — entsteht eines, wandert die Ownership dorthin (CSV-Flag gesetzt).
