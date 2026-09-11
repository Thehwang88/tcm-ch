# Quality- & Indexation-Audit — Gesundheitsbibliothek + Fragen-Layer (11.09.2026)

Datenbasis: Semrush CH (organische Top-100), health-library-audit.json (Link-Graph
über dist), index-queue.md, Content-Review der 13 Fragen-URLs. GSC-API ist aus der
Session nicht erreichbar; indexed/not-indexed-Status pro URL braucht einen
GSC-Export (siehe F.1). Keine neuen URLs, keine Änderungen in diesem Audit.

## A. Executive Summary

**Gesund:**
- Struktur sauber: 0 Orphans, 0 Titel-Duplikate, 0 kaputte Refs, Sitemap (392)
  vollständig konsistent (0 indexierbare Seiten fehlen, 0 noindex enthalten).
- Fragen-Layer gut angebunden: jede der 13 URLs hat 6-25 eingehende Content-Links
  (Median Beschwerden-Leaves zum Vergleich: ~10). Kein Silo.
- Kein Crawl-Bloat: keine Such-/Filter-/Tag-URLs, Visuals konsequent noindex,
  410-Doorways nicht in der Sitemap, EN sauber getrennt.
- Kein Thin-Content-Kandidat unter den 6 Standalones (alle Antwort-zuerst,
  eigener Intent, klinischer/CH-Mehrwert). Verdikt: 6x KEEP, 0 MERGE/NOINDEX.

**Grösste Risiken:**
1. **Indexierungs-Backlog:** 120 offene Queue-URLs bei 10/Tag GSC-Quota = ~12 Tage
   Rückstau. Die Bibliothek ist grossteils schlicht noch nicht eingereicht/indexiert.
2. **Domain-Autorität ist der Flaschenhals, nicht der Content:** Semrush CH zeigt
   fast alle Rankings auf Pos. 26-90 ohne Traffic; nur 2 Standort-Seiten + Home
   bringen Besucher. Neue URLs verschärfen das, solange nichts davon in die Top 10 kommt.
3. **Versicherungs-Cluster (3 URLs):** /krankenkassen/* + wissen/krankenkasse-tcm +
   fragen/kosten-versicherung teilen sich einen Query-Raum (WATCH, kein Merge).

**Grösste Chancen:** Beschwerden-Seiten ranken bereits Pos. 54-90 für kommerzielle
Queries (akupunktur rückenschmerzen/migräne/kinderwunsch) — die sind mit interner
Verlinkung + Content-Pflege am nächsten an Sichtbarkeit, nicht neue URLs.

## B. URL-Level-Aktionen

| URL | Befund | Aktion | Prio |
|---|---|---|---|
| /wissen/akupressurmatte-was-bringt-sie/ | 1 eingehender Link (Near-Orphan) | 2 interne Links ergänzen (z.B. von akupressur-Leaf, ruecken-Wissen) | hoch |
| /wissen/akupunktur-zum-abnehmen/ | 1 eingehender Link | Link von dauernadeln-Artikel + therapien/ohrakupunktur | hoch |
| /wissen/akupunktur-in-meiner-naehe-schweiz/ | 1 eingehender Link | Link von /standorte/ oder akupunktur-in-der-naehe | mittel |
| /haut/fruchtsaeurepeeling/ | 1 eingehender Link | Link aus haut-links-Rotation prüfen | mittel |
| fragen/blaue-flecken-nach-akupunktur/ | KEEP, aber schwächster Standalone-Intent | 60-90 Tage GSC beobachten; bei 0 Impressionen: in sicherheit-Hub mergen | beobachten |
| fragen/was-passiert-beim-ersten-termin/ vs fragen/erster-termin/ | gleicher Query-Cluster, Differenzierung ok (Ablauf vs. Vorbereitung) | nichts tun; falls GSC beide für dieselben Queries zeigt: Hub-Titel schärfen | beobachten |
| beschwerden/plantarfasziitis/ | rankt Pos. 64-67 für "plantarfasziitis" (4400 Vol.) | bester Kandidat für gezielte Stärkung (interne Links, Snippet) | hoch |
| beschwerden/kinderwunsch/ | Pos. 41-57 auf 4 Kinderwunsch-Queries | zweitbester Kandidat | hoch |

Alle 13 Fragen-URLs: KEEP. Titel unique, 35-59 Zeichen, Frage als natürlicher
Titel, Kurzantwort im ersten Absatz — Differenzierung zu Therapie/Wissen/KS intakt.

## C. Indexierungs-Befunde

| Befund | Umfang | Fix |
|---|---|---|
| Queue-Backlog "Offen" | 120 URLs (~12 Tage bei 10/Tag) | Reihenfolge ist korrekt (Fragen+Herbst zuoberst); Backlog akzeptieren, NICHT das Quota mit Alt-URLs verbrennen; interne Links sind wichtiger als Einreichung |
| Indexed-Status pro URL | unbekannt (kein GSC-Zugriff aus Session) | GSC-Export "Seiten"-Bericht bereitstellen, dann URL-genaues Follow-up |
| Sitemap-Konsistenz | 0 Fehler | keiner nötig |
| Noindex-Inventar | 13 Seiten (10 Visuals+Handouts, /visuals/, ergebnisse-Draft, en/404) | korrekt, keiner in Sitemap |

## D. Kannibalisierung

| Cluster | URLs | Primär | Aktion |
|---|---|---|---|
| Versicherung/Kosten | /krankenkassen/ (+Unterseiten), wissen/krankenkasse-tcm-…, fragen/kosten-versicherung/ | /krankenkassen/* für "krankenkasse akupunktur"-Queries | Titel bereits differenziert ("häufige Fragen" vs. Übernahme-Detail); Hub verlinkt auf krankenkassen ✓; beobachten |
| Akupunktur bei Migräne/Kopfschmerz | beschwerden/migraene (rankt Pos. 62-86!), wissen/akupunktur-bei-kopfschmerzen, wissen/migraene-tcm-warum… | beschwerden/migraene (einzige rankende URL) | bestehendes HIGH-Paar aus Welle 5; kein Merge ohne GSC-Daten; Wissen-Artikel sollen weiter auf die Beschwerde-Seite verlinken (tun sie) |
| Erster Termin | fragen/erster-termin/ vs fragen/was-passiert-beim-ersten-termin/ | Standalone für "was passiert…", Hub für Vorbereitung | Differenzierung ausreichend; WATCH |
| Tut Akupunktur weh | nur fragen/tut-akupunktur-weh/ | — | kein Konflikt (Therapie-Seite hat keinen Schmerz-Abschnitt) |

Fragen-Layer hat KEINE neue Kannibalisierung erzeugt: abgedeckte Intents wurden in
Welle 10 bewusst als Hub-Antworten mit Link gelöst statt als eigene URLs.

## E. Interne Verlinkung

- **Unterversorgt:** die 4 Near-Orphans unter B (alle Alt-Wissen/Haut, kein Fragen-Problem).
- **Überversorgung schwacher URLs:** nicht festgestellt; die meistverlinkten Seiten
  (Fragen-Haupthub 25, tut-akupunktur-weh 15, kosten-versicherung 14) sind zugleich
  die konversionsrelevantesten — Prioritätsfluss stimmt.
- KS-Schwächste (3-5 Links) sind die jüngsten Wellen; Rotation ksLinksFor gleicht
  das über den Cluster aus. Kein Handlungsbedarf.

## F. 30-Tage-Plan

**1. Kritisch**
- GSC-Export ziehen (Seiten-Bericht + Suchanfragen, 28 Tage) und URL-genauen
  Abgleich nachziehen — erst dann Merge-/Noindex-Entscheide über Standalones.
- Publikationsstopp halten: nächste Content-Welle erst nach GSC-Review der
  Fragen-/Herbst-URLs (frühestens ~10.10., ein Indexierungszyklus).

**2. High-Impact**
- 6-8 interne Links für die 4 Near-Orphans (ein kleiner Commit).
- Plantarfasziitis + Kinderwunsch gezielt stärken (Snippet-Review, je 2-3
  zusätzliche interne Links von stark gecrawlten Seiten) — realste Chance auf
  erste Beschwerden-Rankings in den Top 20.
- Klinisches Review durch Fachperson für die 2 medizinisch heikelsten Fragen-Seiten
  (akupunktur-blutverduenner, wann-zuerst-zum-arzt), danach reviewerName setzen.

**3. Optional**
- Fragen-Hub-Antworten mit >0 GSC-Impressionen später zu Standalones promoten
  (selektiv, Quality-Gate wie bisher).
- Visual-Assets für Schröpfmale/Nadeltiefe erwägen — erst dann ergibt die
  Fragen↔Visual-Verknüpfung Sinn.

## Fragen-Verdikt (§13)

Hubs und Standalones sind strukturell gesund (Verlinkung, Titel, Differenzierung,
Sitemap). Indexierung/Impressionen: zu früh für ein Urteil (0-3 Tage alt, Queue
läuft). Keine Kannibalisierung erzeugt, interne Verlinkung gestärkt (~26 neue
eingehende Kontexte). Kein Standalone ist heute zu schwach. **Empfehlung: Pause
halten, in 4 Wochen GSC-basiert nachprüfen; danach höchstens selektiv erweitern
(einzelne Hub-Antworten mit nachgewiesener Nachfrage promoten), keine breite Welle.**
