# Daily-Cohort 2026-09-24-d — Pre-Treatment Fragen (Pre-Booking Objection Removers)

Datum: 2026-09-24 (tatsächliches Commit-/Deploy-Datum; im Prompt als 25.09 geplant) · Typ: Pre-Treatment Fragen-Cohort · Max: 10 · **Ergebnis: 9 CREATED, 1 BLOCKED** · Indexierungs-Strategie: **Natural Crawl only** — keine manuellen GSC-URL-Anfragen, URLs bewusst NICHT in seo/index-queue.md (verifiziert: 0 Treffer).

## Pre-Write-Ownership-Audit & Tracking

| URL | Query (Signal) | Rolle | Nächster Owner | Verdict | Ownership-Grenze | Sitemap | Links |
|---|---|---|---|---|---|---|---|
| /gesundheitsbibliothek/fragen/erster-akupunktur-termin/ | erster akupunktur termin | Cluster-Entry | **/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/** + erster-termin-Hub | **BLOCKED** (risk high) | Bestehende Seite besitzt exakt diesen Intent (Title „Erster TCM-Termin: So läuft er ab", Gespräch/Puls-Zunge/erste Behandlung/danach); Secondary „was passiert bei akupunktur" ist deren Kern-Query. Statt Duplikat: bestehende Seite als Cluster-Entry AUSGEBAUT (Links auf alle 9 neuen Geschwister + verwandt += wie-oft/wann-wirkt). | — | — |
| /gesundheitsbibliothek/fragen/essen-vor-akupunktur/ | essen vor akupunktur | Vorbereitung | erster-termin-Hub (Kurzantwort id essen) | **CREATED** (risk low) | Standalone besitzt Essen/Nüchtern-Frage; Hub-Kurzantwort bleibt und verlinkt hierher | ja | in: Hub-Antwort; out: Entry-Artikel, Kleidung, Hub |
| /gesundheitsbibliothek/fragen/kleidung-akupunktur/ | was anziehen akupunktur | Vorbereitung | erster-termin-Hub (id kleidung) | **CREATED** (risk low) | Kleidung/Zugang; Hub-Kurzantwort bleibt und verlinkt hierher | ja | in: Hub-Antwort; out: Entry-Artikel, Essen, Hub |
| /gesundheitsbibliothek/fragen/wie-lange-dauert-akupunktur/ | wie lange dauert akupunktur (~20, KD 0) | Erwartung | /wissen/wie-lange-bleiben-akupunkturnadeln-drin/ (Liegezeit); erster-termin-Hub (id dauer) | **CREATED** (risk medium→low) | Besitzt GESAMTE Termindauer; Nadel-Liegezeit bleibt beim Wissen-Owner (prominent verlinkt, nicht dupliziert); Hub-Kurzantwort bleibt | ja | in: Hub-Antwort; out: Entry-Artikel, Liegezeit-Artikel, Müdigkeit, wie-oft |
| /gesundheitsbibliothek/fragen/wie-viele-akupunkturnadeln/ | wie viele nadeln akupunktur | Erwartung | keiner | **CREATED** (risk none) | Nadelanzahl-Erwartung; keine Standardzahl, mehr ≠ besser | ja | out: Angst, Tiefe, tut-weh, Entry-Artikel |
| /gesundheitsbibliothek/fragen/wie-tief-akupunkturnadeln/ | wie tief akupunkturnadeln | Erwartung | akupunktur-nerv-getroffen (Nervensymptome) | **CREATED** (risk low) | Einstichtiefe; Nervensymptome bleiben beim bestehenden Owner (verlinkt) | ja | out: Nerv, tut-weh, Anzahl |
| /gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/ | angst vor akupunktur | Objection | tut-akupunktur-weh (Gefühl); Laserakupunktur/Akupressur (nadelfrei) | **CREATED** (risk low) | Nadelangst-Intent; nadelfreie Alternativen verlinken auf bestehende Owner statt neuer Ohne-Nadeln-Seite (24.09-c BLOCKED bestätigt) | ja | in: tut-weh-Body, Therapie-Chips; out: tut-weh, Anzahl, Akupressur, Laser |
| /gesundheitsbibliothek/fragen/ueberweisung-akupunktur/ | überweisung akupunktur | Zugang | /krankenkassen/akupunktur/ (Kosten); erster-termin-Hub (id ueberweisung) | **CREATED** (risk medium→low) | Praktische Zugangs-Frage; Kostenübernahme bleibt beim Krankenkassen-Owner (prominent verlinkt, kein Coverage-Versprechen); Hub-Kurzantwort bleibt | ja | in: Hub-Antwort; out: Krankenkasse, Entry-Artikel, Arzt-Seite |
| /gesundheitsbibliothek/fragen/wie-oft-akupunktur/ | wie oft akupunktur | Commitment | akupunktur-Hub #sitzungen (Anzahl); nach-der-behandlung #abstaende | **CREATED** (risk medium→low) | Frequenz/Rhythmus ≠ Sitzungsanzahl; beide Hub-Kurzantworten bleiben und verlinken hierher; kein universeller Behandlungsplan | ja | in: 2 Hub-Antworten, Therapie-Chips; out: wann-wirkt, #sitzungen, Entry-Artikel |
| /gesundheitsbibliothek/fragen/wann-wirkt-akupunktur/ | wann wirkt akupunktur (~20) + wann hilft (~10) | Erwartung | keiner (Wissens-FAQ-Antworten kontextgebunden) | **CREATED** (risk low) | Time-to-notice, KEINE generische Wirksamkeitsseite; ehrlich inkl. „kann auch nicht helfen"; keine Outcome-Versprechen | ja | in: #sitzungen-Hub-Antwort; out: wie-oft, Arzt-Seite, Entry-Artikel |

## Hub-Struktur & Entry-Artikel

- Kein neuer Hub: bestehende Kategorie **„Erster Termin & Vorbereitung"** (erster-termin) deckt „Vor dem ersten Termin" ab; alle 9 Standalones erscheinen automatisch unter „Häufig gestellt" auf dem Fragen-Index.
- **was-passiert-beim-ersten-termin** fungiert als Cluster-Entry: bodyHtml verlinkt neu auf Essen, Kleidung, Dauer, Nadelangst, Überweisung; verwandt += wie-oft + wann-wirkt.

## Conversion

- Bestehendes System wiederverwendet (Prompt-§3-Adaption): jede Standalone-Frage trägt bereits das Standard-Conversion-Modul des Templates (cta-card „Deine Frage ist nicht dabei?" mit Termin-CTA `#formular` + WhatsApp-CTA inkl. bestehendem whatsapp_click-Tracking) plus TerminForm mit Frage-Prefill. Kein neues CTA-Modul, kein dupliziertes Tracking, keine Buchungs-/GTM-Änderung.

## Interne Links (Bestand geändert)

- erster-termin-Hub: 4 Kurzantworten (dauer/kleidung/essen/ueberweisung) verlinken auf die Standalones.
- akupunktur-Hub #sitzungen → wie-oft + wann-wirkt; nach-der-behandlung #abstaende → wie-oft.
- tut-akupunktur-weh (Body) → angst-vor-akupunktur-nadeln.
- FRAGEN_FOR_THERAPIE akupunktur += „Was bei Angst vor Nadeln?" + „Wie oft braucht man Akupunktur?" (inbound von /therapien/akupunktur/).

## Suche / Technik / Build

- Suchindex: 279 → **288** (+9 via bestehenden Loop) + 9 SYNONYMS.
- Sitemap: 486 → **495** (+9); alle 9 enthalten, self-canonical, indexierbar, unique Title/H1/Meta, bestehendes Fragen-Schema + Breadcrumbs, 0 sichtbare Em-Dashes.
- health-audit: 0 Orphans / 0 doppelte Titel / 0 kaputte Referenzen. Renders (Fragen-Hub, Entry-Artikel, 2 Samples; 1440/390): 0 Overflow, 0 JS-Errors.
- Editorial: vorgegebene Copy technisch formatiert (Swiss-ss, Du-Form), keine Heilversprechen, keine Fake-Urgency, Link auf nicht existierende /fragen/akupunktur-ohne-nadeln/ durch bestehende Owner ersetzt.
- Tracking/Booking/Canonical-Architektur: unverändert.

## Indexierung

Natural crawl only. Manual URL indexing: NO. URLs nicht in seo/index-queue.md (verifiziert: 0 Treffer). Spätere Prüfung via GSC URL Inspection.
