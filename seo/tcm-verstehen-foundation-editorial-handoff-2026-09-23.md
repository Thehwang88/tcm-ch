# TCM verstehen: Foundation-Cluster (Phase 4A) — Editorial-Handoff, 23.09.2026

## Architektur-Entscheid

Bestehende Architektur (unverändert genutzt, kein Parallelsystem): Hub `/gesundheitsbibliothek/tcm-verstehen/` + 5 Sektions-Hubs (`grundlagen`, `muster`, `meridiane-punkte`, `diagnostik`, `methoden`; nur `methoden` indexable). Datenmodell `src/data/tcm-verstehen.ts` (TcmEntity, war leer vorbereitet).

**URL-Schema der Leaves:** `/gesundheitsbibliothek/tcm-verstehen/<sektion>/<slug>/` (Hub → Kategorie → Leaf; folgt dem vorhandenen `section`-Feld des Datenmodells).

**Publikationsregel (Projekt-Konvention, strenger als noindex):** Drafts erzeugen KEINE Prod-Route. Erst wenn das finale Editorial-Copy eingespielt ist, wird `status: 'published'` + `indexable: true` gesetzt; dann erscheint die Seite automatisch als Route, als Karte im Sektions-Hub, in Sitemap und Index-Queue. Aktuell: **0 neue Routen, 0 neue indexierbare URLs, Sitemap unverändert.**

Beim ersten Publish einer Sektion zusätzlich: Sektion `indexable: true` setzen, Thema aus `geplant[]` entfernen, SYNONYMS-Aliase eintragen (Liste unten), CSV-Zeile ergänzen, URL in index-queue.md.

## Overlap-Audit (alle 7: CREATE als Draft, kein STOP)

Kein bestehender Owner für organuhr, qi, yin-und-yang, fuenf-elemente, meridiane, zungendiagnostik, pulsdiagnostik (Routen-Inventar + CSV geprüft; GSC zeigt bereits Impressionen des Hubs für "meridiane tcm" ohne eigenes Leaf). `zungenbrennen` (Körpersignal) ist ein anderer Intent. Ownership-Schutz: Meridiane-Seite ist informational, `/therapien/akupunktur/` bleibt Therapie-Owner (Phase 3 LOCKED); Organuhr besitzt NUR das TCM-Konzept, alle Schlaf-/Nacht-Symptom-Intents bleiben bei Körpersignalen/Beschwerden.

## Die 7 Seiten

Gemeinsame Pflicht-Sektionen (Template rendert in dieser Reihenfolge, Felder in tcm-verstehen.ts):
1. `kurzantwortHtml` (präzise Definition) 2. `traditionellHtml` (was das Konzept traditionell meint) 3. `praxisHtml` (Verwendung in der TCM-Praxis) 4. `abgrenzungHtml` (was es NICHT bedeutet) 5. `evidenzHtml` (moderne medizinische Perspektive) 6. `relevanzHtml` (praktische Relevanz) 7. `arztHinweisHtml` (wo anwendbar) 8. `sources` (optional). Jede Seite trägt automatisch den festen Hinweis "Traditionelles Modell, keine Diagnose".

Gemeinsame Kautelen (nicht verhandelbar): Meridiane sind keine nachgewiesenen anatomischen Strukturen; Qi ist keine messbare biomedizinische Grösse ("Energie/Funktion/Aktivität" nur als kontextabhängige Annäherungen); Zungen-/Pulsbild ersetzt keine medizinische Diagnostik und lädt nicht zur Selbstdiagnose ein; Organuhr ist keine etablierte Physiologie (kein "3 Uhr wach = Leber krank"); Fünf Elemente/Organ-Zuordnungen sind kein biomedizinischer Fakt; TCM-Muster ≠ Erkrankung. Schweizer "ss", Du-Form, keine sichtbaren Em-Dashes.

### 1. Organuhr — WAITING_FOR_CHATGPT_EDITORIAL
- URL: /gesundheitsbibliothek/tcm-verstehen/grundlagen/organuhr/
- PK: tcm organuhr (~320/mo, KD 22-28) | SK: organuhr tcm, chinesische organuhr | Intent: informational
- Konkurrenz intern: keine
- Title: "TCM-Organuhr: Das traditionelle 24-Stunden-Modell erklärt" | H1: "Die TCM-Organuhr: Was das Modell beschreibt und was nicht"
- Zusätzlich gefordert (§9): 24h-Modell + Organzeiten, historischer Kontext, was Menschen mit nächtlichem Aufwachen meinen, Grenzen der Deutung, normale Schlafphysiologie, wann wiederkehrendes nächtliches Erwachen ärztlich gehört. KEINE deterministische Symptom-Diagnose-Tabelle.
- Links out (vorbereitet): fuenf-elemente, qi, /koerpersignale/herzklopfen-im-liegen/, /koerpersignale/nachtschweiss-ohne-fieber/, /beschwerden/schlafprobleme/ | Links in (bei Publish): Grundlagen-Hub; optional 1 Link aus schlafprobleme-Umfeld

### 2. Qi — WAITING_FOR_CHATGPT_EDITORIAL
- URL: /gesundheitsbibliothek/tcm-verstehen/grundlagen/qi/
- PK: was ist qi (~20) | SK: qi bedeutung (~20), qi tcm (~20), chi
- Title: "Qi in der TCM: Was der Begriff bedeutet" | H1: "Qi: Was meint die TCM damit?"
- §10: Qi als traditioneller Konzeptbegriff; Übersetzungen (Energie, Lebenskraft, Funktion, Aktivität) als kontextabhängige Annäherungen, nicht als messbare "Energie".
- Links: ↔ yin-und-yang, ↔ fuenf-elemente, → /therapien/akupunktur/

### 3. Yin und Yang — WAITING_FOR_CHATGPT_EDITORIAL
- URL: /gesundheitsbibliothek/tcm-verstehen/grundlagen/yin-und-yang/
- PK: yin und yang bedeutung (~170/mo, KD ~26) | SK: yin yang tcm, yin und yang tcm
- Title: "Yin und Yang: Bedeutung in der Chinesischen Medizin" | H1: "Yin und Yang: Bedeutung in der TCM"
- §13: relationales Gegensatz-/Wandlungskonzept, traditionelle medizinische Verwendung, warum "Yin-Mangel" etc. Musterbegriffe sind (keine Diagnosen). Kein Spiritual-/Lifestyle-Filler; konkurriert nicht mit künftigen Muster-Seiten (4B).
- Links: ↔ qi, ↔ fuenf-elemente

### 4. Fünf Elemente — WAITING_FOR_CHATGPT_EDITORIAL
- URL: /gesundheitsbibliothek/tcm-verstehen/grundlagen/fuenf-elemente/
- PK: fünf elemente tcm / 5 elemente tcm (~20) | SK: wandlungsphasen (wo semantisch passend)
- Title: "Fünf Elemente der TCM: Holz, Feuer, Erde, Metall, Wasser" | H1: "Die Fünf Elemente der TCM"
- §14: Holz/Feuer/Erde/Metall/Wasser, traditionelle Rolle; Organ-Element-Zuordnungen nicht als Fakt; keine Einzel-Organ-Muster-Seiten.
- Links: ↔ qi, ↔ yin-und-yang, → organuhr

### 5. Meridiane — WAITING_FOR_CHATGPT_EDITORIAL
- URL: /gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/meridiane/
- PK: meridiane tcm (~20) | SK: tcm meridiane (~20), akupunktur meridiane (informational), leitbahnen
- Konkurrenz: Hub bekommt bereits Impressionen für "meridiane tcm" → Leaf übernimmt
- Title: "Meridiane in der TCM: Das Leitbahnen-Modell erklärt" | H1: "Meridiane: Das Leitbahnen-Modell der TCM"
- §11: Leitbahnen-Modell vs. Anatomie strikt trennen; keine Behauptung, Meridiane seien als Nerven/Faszien/Gefässe/elektrische Kanäle nachgewiesen; Hypothesen später nur sauber gequellt, nie als Fakt. NICHT auf generisches "Akupunktur" optimieren (Phase-3-Schutz).
- Links: → qi, → /therapien/akupunktur/, → /therapien/akupressur/ | Links in: 1 kontextueller Link von /therapien/akupunktur/ (bei Publish setzen)

### 6. Zungendiagnostik — WAITING_FOR_CHATGPT_EDITORIAL
- URL: /gesundheitsbibliothek/tcm-verstehen/diagnostik/zungendiagnostik/
- PK: zungendiagnostik tcm (~20) | SK: tcm zunge (~30), zungendiagnose tcm
- Title: "Zungendiagnostik in der TCM: Was die Zunge zeigt und was nicht" | H1: "Zungendiagnostik: Wie die TCM die Zunge betrachtet"
- §12: traditionelle Beobachtung (Farbe/Form/Belag) als TCM-Einschätzung; keine Anleitung zur Selbstdiagnose aus Farbe/Belag/Rissen; TCM-Muster-Einschätzung ≠ medizinische Diagnose.
- Links: ↔ pulsdiagnostik, → /gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/, → /koerpersignale/zungenbrennen/ | Links in: 1 Link aus was-passiert-beim-ersten-termin (bei Publish)

### 7. Pulsdiagnostik — WAITING_FOR_CHATGPT_EDITORIAL
- URL: /gesundheitsbibliothek/tcm-verstehen/diagnostik/pulsdiagnostik/
- PK: pulsdiagnostik tcm (~20) | SK: tcm pulsdiagnostik, tcm puls
- Title: "Pulsdiagnostik in der TCM: Was das Pulstasten erfasst" | H1: "Pulsdiagnostik: Wie die TCM den Puls tastet"
- §12: beidseitiges Tasten, traditionelle Pulsqualitäten; keine verlässliche Diagnose biomedizinischer Erkrankungen aus dem Puls allein.
- Links: ↔ zungendiagnostik, → was-passiert-beim-ersten-termin | Links in: 1 Link aus was-passiert-beim-ersten-termin (bei Publish)

## Hub-Platzierung (bei Publish automatisch/manuell)

Grundlagen & Begriffe: Qi, Yin und Yang, Fünf Elemente, Organuhr · Meridiane & Punkte: Meridiane · Diagnostik: Zungendiagnostik, Pulsdiagnostik · Muster: bleibt "In Vorbereitung" (Phase 4B). Publizierte Leaves erscheinen automatisch als Karten im jeweiligen Sektions-Hub (in [sektion].astro verdrahtet).

## SYNONYMS-Aliase (bei Publish in gesundheitsbibliothek.ts eintragen)

- qi: `qi chi Qi Bedeutung Lebensenergie Begriff`
- yin-und-yang: `yin yang Yin und Yang Bedeutung`
- organuhr: `Organuhr TCM Organuhr chinesische Organuhr`
- meridiane: `Meridian Meridiane Leitbahnen`
- zungendiagnostik: `Zungendiagnose TCM Zunge Zungenbelag`
- pulsdiagnostik: `Pulsdiagnose TCM Puls Pulstasten`
- fuenf-elemente: `fünf Elemente 5 Elemente Wandlungsphasen`

## CSV-Vorlage (Zeilen erst bei Publish anlegen; owner_status PRIMARY_OWNER, page_type knowledge, content_role tcm_concept)

Angrenzende künftige Muster-Seiten (Phase 4B, NICHT erstellt, nur notiert): Leber-Qi-Stagnation, Milz-Qi-Mangel, Qi-Mangel/-Stagnation, Yin-/Yang-Mangel, Nieren-Yin-/Yang-Mangel, Blut-Mangel/-Stase, Feuchtigkeit, Hitze, Kälte, Wind, Schleim.

## Status

Alle 7: Datensatz als `status: 'draft'`, `indexable: false` in src/data/tcm-verstehen.ts. Leaf-Template implementiert (`[sektion]/[slug].astro`), rendert nur `published`. 0 Routen erzeugt, Sitemap unverändert (437), Hub bleibt indexierbar. WAITING_FOR_CHATGPT_EDITORIAL auf allen 7.
