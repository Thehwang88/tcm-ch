# Perspektiven Welle 1: Struktur (Phase 2, 13.09.2026)

**Das sind freigegebene redaktionelle Themen, KEINE publizierten Artikel.**
Alle 8 Einträge stehen in src/data/perspektiven.ts mit status 'planned':
Route nur im Dev-Server, in Produktion physisch nicht vorhanden, indexable=false,
nicht in Sitemap, nicht in der Suche, kein Schema, keine Autor:innen, keine Daten,
kein Inhalt. Nicht in die GSC-Queue eintragen.

Statusmodell: 'planned' -> 'draft' -> 'published' (mock entfernt; die 3 Phase-1-Mocks
sind durch echte geplante Themen ersetzt).

| # | Titel | Slug | Topic | Primärzweck | Canonical Intent Owner | Overlap-Risiko | Autor-Typ |
|---|---|---|---|---|---|---|---|
| 1 | Wann wir von Akupunktur abraten | wann-wir-von-akupunktur-abraten | limits-transparency | Grenzen + Verweislogik, kein Akupunktur-Ranking | /therapien/akupunktur/, /gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/ | Red-Flag-Liste NICHT duplizieren, nur verlinken | senior-tcm-practitioner |
| 2 | Was wir tun, wenn eine Behandlung nicht hilft | wenn-eine-behandlung-nicht-hilft | clinical-judgement | Reassessment/Stoppregeln/Wechsel | KEINER (kein bestehendes SEO-Ziel besitzt diesen redaktionellen Intent; leeres Array bewusst) | Abgrenzung zur Sitzungsanzahl-Frage | practitioner-plus-reviewer |
| 3 | Physiotherapie oder Akupunktur? Oft ist das die falsche Frage. | physiotherapie-oder-akupunktur | integrative-medicine | aufgabenbasiertes integriertes Entscheiden | /therapien/physiotherapie/, /therapien/akupunktur/ | ergänzt physio-tcm-Modul, ersetzt es nicht | practitioner-with-physio-experience |
| 4 | Tradition ist kein Beweis | tradition-ist-kein-beweis | evidence | Evidenz-Haltung von TCM.ch | /gesundheitsbibliothek/tcm-verstehen/ | erklärt NICHT Qi/Meridiane (gehört TCM verstehen) | clinical-editorial |
| 5 | Das MRI sieht etwas. Aber erklärt es auch deine Schmerzen? | mri-und-schmerzen | clinical-judgement | Bildbefund vs. Diagnose vs. Symptom | /beschwerden/rueckenschmerzen/, /beschwerden/bandscheibenvorfall/, /beschwerden/ischias/ | keine Krankheits-Query anvisieren | practitioner-plus-reviewer |
| 6 | Wie viele Behandlungen sind genug? | wie-viele-behandlungen-sind-genug | treatment-decisions | Weiter-oder-Stopp-Entscheidungslogik | /gesundheitsbibliothek/fragen/akupunktur/ (#sitzungen), /therapien/akupunktur/ | Sitzungsanzahl-Frage bleibt bei Q&A/Leaf | senior-tcm-practitioner |
| 7 | Wann wir Patienten zurück zum Arzt schicken | wann-wir-zum-arzt-zurueckverweisen | limits-transparency | Rücküberweisung als Qualitätsmerkmal | /gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/, /gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/ | Red-Flags bleiben bei den Fragen-Seiten | senior-tcm-practitioner |
| 8 | Was integrative Medizin für uns tatsächlich bedeutet | was-integrative-medizin-fuer-uns-bedeutet | integrative-medicine | klare Rollen pro Methode statt Additionslogik | /therapien/, /therapien/akupunktur/, /therapien/physiotherapie/ | keine Methoden-Erklärungen | institutional-perspective |

Topic-Balance: clinical-judgement 2, evidence 1, integrative-medicine 2,
treatment-decisions 1, limits-transparency 2. Keine öffentlichen Topic-URLs.

Interne Links: related[] pro Eintrag befüllt (nur verifizierte bestehende URLs).
Reziproke Links aus Live-Seiten kommen ERST mit der Publikation, kuratiert.

Nächste Schritte pro Beitrag: echte:r Autor:in gewinnen -> Text nach editorialThesis/
primaryPurpose redigieren -> Quellen ergänzen -> Review -> status 'published' +
indexable true + Queue-Eintrag; Hub-Flip (HUB_INDEXABLE) erst ab 3-4 publizierten
Beiträgen (Launch-Kriterien in editorial-perspectives-architecture.md).
