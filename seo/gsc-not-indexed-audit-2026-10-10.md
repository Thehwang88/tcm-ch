# GSC Indexierungs-Audit Phase 2 – nicht indexierte URLs (Export 10.10.2026)

READ-ONLY. Keine Seiten, Redirects, Canonicals, Ownership oder Inhalte geändert, kein Commit.
Zeile für Zeile: `seo/gsc-not-indexed-audit-2026-10-10.csv` (97 URLs, 25 Spalten).

Datengrundlage: GSC-Drilldowns vom 10.10.2026 (22× "Gecrawlt – zurzeit nicht indexiert",
75× "Gefunden – zurzeit nicht indexiert"), Live-Abruf aller 97 URLs (Status, Kette, Canonical,
Robots, Sitemap tcm.ch + ouch.tcm.ch), lokaler Build von main (`9368ff8` = Stand nach Merge `0a1d8e6`):
eigene Wörter (5-Wort-Shingles, die in ≥20 % der Sektionsseiten vorkommen, gelten als Template),
interne Content-Links (ohne Header/Footer/Nav/Drawer), Links von täglich gecrawlten Seiten
(Startseite, /standorte/*, Beschwerden-Leaves), Klicktiefe, Master-Map, Intent-Conflicts,
Do-not-create, `seo/index-queue.md`, git-Historie.

## Executive Summary

1. **Kein technisches Indexierungsproblem.** Alle 75 "Gefunden"-URLs und alle 14 heute erreichbaren
   "Gecrawlt"-URLs sind 200, self-canonical, ohne noindex, in der Sitemap. Phase 1 hat die Hygiene erledigt.
2. **75 "Gefunden" = Crawl-Priorität, nicht Qualität.** Keine dieser URLs wurde je gecrawlt
   (GSC "1970-01-01"). Google hat den Inhalt also noch gar nicht bewertet. 56 liegen auf tcm.ch
   (veröffentlicht 11.–30.09.), 19 auf ouch.tcm.ch (30.08.–06.09., separate Codebasis).
3. **Drei bestätigte Ursachen auf tcm.ch:** (a) 332 neue datierte URLs seit 01.09. (von 742 in der
   Sitemap), (b) 55 der 56 URLs wurden beim Deploy nicht in `seo/index-queue.md` eingetragen
   (Repo-Kopie mit 293 offenen Einträgen; die Routine arbeitet auf einer lokalen Kopie, siehe Nachtrag), (c) 51 der 56 haben 0 Links von täglich gecrawlten Seiten,
   24 liegen auf Klicktiefe 3.
4. **Die echten "Gecrawlt"-Fälle sind die 10 neuen Beschwerden-Seiten (Cohort 20, 04.10.).**
   Google hat sie 1–2 Tage nach Livegang gecrawlt und nicht indexiert. Messbar: nur 207–306 eigene
   Wörter (Adenomyose 431) gegenüber Median 821 der Sektion, rund 70–76 % Template-Text, kein
   Quellenblock, Vulvodynie/Vaginismus/Dyspareunie zu ~60 % textgleich. Das ist der einzige Block mit
   klarem Inhaltsbedarf (C).
5. **12 "Gecrawlt"-URLs sind Altlasten aus Juni-Crawls:** 4 leiten heute korrekt auf live Owner weiter,
   8 sind 410. Kein Handlungsbedarf, ausser 2 Redirect-Vorschlägen (Achillessehne, Winterthur-Kosten).
6. **ouch.tcm.ch:** 14 von 19 Artikeln bedienen eine Patienten-Intention, die auf tcm.ch bereits einen
   PRIMARY_OWNER hat (Cross-Host-Kannibalisierung), und 0 Links von tcm.ch zeigen auf diese 19.
   Nicht indexieren lassen, sondern Owner-Entscheid treffen (D).

**Empfehlung:** Nicht alle 97 zur Indexierung einreichen. 10 URLs aktiv fördern (A), 10
Beschwerden-Seiten inhaltlich ausbauen (C), YMYL-Härtung der 21 Laborwert-Seiten (alle ohne Quellen),
2 Redirects und 14 OUCH-Owner-Entscheide zur Freigabe, Rest abwarten oder bewusst ausschliessen.

## Ergebnis nach Kategorie

| Kategorie | Anzahl | Inhalt |
|---|---|---|
| A – Indexierung fördern | 10 | Schilddrüsenunterfunktion, Venenschwäche (P1); 7 konversionsnahe Fragen-Seiten, /regulatorik/kantone/ (P2) |
| B – Abwarten | 30 | Untersuchungen (7), Körpersignale (3), Wissen (3), Nischen-Fragen (7), Meridiane-Punkte (3), Branche (2), 5 OUCH-Editorials ohne tcm.ch-Owner |
| C – Inhalt verbessern | 31 | 10 neue Beschwerden-Seiten (Cohort 20), 21 Laborwerte ohne Quellen (YMYL) |
| D – Konsolidieren | 16 | 2 Redirect-Vorschläge (410 → live Owner), 14 OUCH-Artikel mit tcm.ch-Owner |
| E – Bewusst ausschliessen | 10 | 4 Alt-Varianten mit Redirect auf live Owner, 6 × 410 ohne Nachfolger |

| Herkunft | Anzahl | Befund |
|---|---|---|
| Gefunden, tcm.ch | 56 | alle 200/indexierbar/Sitemap, nie gecrawlt, 11.–30.09. veröffentlicht |
| Gefunden, ouch.tcm.ch | 19 | alle 200/self-canonical/Sitemap, nie gecrawlt, 0 Links von tcm.ch |
| Gecrawlt, neu | 10 | Cohort 20 (04.10.), gecrawlt 05./06.10., dünner Eigenanteil |
| Gecrawlt, Altlast | 12 | Crawl 01.–18.06.: 4× Redirect auf live Owner, 8× 410 |

## Top-10-Massnahmen nach SEO-Potenzial (alle zur Freigabe)

| # | Massnahme | URLs | Warum | Aufwand/Risiko |
|---|---|---|---|---|
| 1 | Index-Queue nachziehen: die 10 A-URLs **oben** in "Offen" einsortieren, übrige neue tcm.ch-URLs (B) nachtragen, 293er-Rückstau nach kommerzieller Relevanz sortieren (Standorte, Beschwerden vor Glossar) | 56 | 55/56 beim Deploy nicht eingetragen, obwohl CLAUDE.md das im selben Commit verlangt; Wirkung = Crawl-Anfrage, keine Garantie | gering / kein Risiko |
| 2 | Cohort 20 inhaltlich ausbauen: eigener klinischer Kern ≥500 eigene Wörter, spezifische Red Flags, Evidenzlage mit Quellen, med. Review; Start mit Funktioneller Dyspepsie und Adenomyose | 10 | einzige Seiten, die Google gecrawlt und abgelehnt hat; 70–76 % Template | mittel / YMYL-Review nötig |
| 3 | Kontextlinks von täglich gecrawlten Seiten (Muster `src/data/haut-links.ts`): je 2–3 Links von thematisch passenden, indexierten Beschwerden-Leaves bzw. Standort-FAQ | 51 | 51/56 haben 0 solche Links; CLAUDE.md: Links wichtiger als Queue | gering–mittel / gering |
| 4 | Publikationstempo drosseln, bis Rückstau abgebaut ist (keine neuen Kohorten ohne Indexierungs-Monitoring) | systemisch | 332 neue URLs in ~6 Wochen übersteigen sichtbar die Crawl-Nachfrage | 0 / Opportunitätskosten |
| 5 | 301 `/wissen/akupunktur-winterthur-kosten-krankenkasse` → `/wissen/akupunktur-winterthur-kosten/` | 1 | exakter Owner live, gleiches Muster wie St. Gallen/Zürich (Phase 1) | sehr gering |
| 6 | 301 `/beschwerden/achillessehne` → `/beschwerden/achillessehnenentzuendung/` | 1 | exakter Owner live, gleiche Intention | sehr gering |
| 7 | Venenschwäche + Schilddrüsenunterfunktion aktiv indexieren lassen (Queue oben + Kontextlinks) | 2 | kommerzielle Beschwerden-Leaves mit Standort-Funnel | gering |
| 8 | Konversionsnahe Fragen (wie oft, wann wirkt, wie lange, Angst vor Nadeln, Schröpfen-Fragen, Überweisung) aus Standort-FAQ und /therapien/akupunktur/ verlinken | 7 | Vor-Behandlungs-Intents, nah an Terminbuchung; 4 Wochen ungecrawlt | gering |
| 9 | Laborwert-Seiten YMYL härten (Quellen, fachliche Prüfung) vor Indexierungsantrag | 21 | YMYL-Thema ohne Quellen-/Reviewer-Signal; Konkurrenz sind Spitäler/Labore | mittel / gering |
| 10 | OUCH-Owner-Entscheid: tcm.ch bleibt Owner; OUCH-Artikel differenzieren + auf Owner verlinken oder canonical auf tcm.ch | 14 | gleiche Intention auf zwei Hosts, beide nicht indexiert | Entscheid nötig / ausserhalb Repo |

Nicht empfohlen: pauschale Indexierungsanträge für alle 97, Redirects für die 6 × 410 ohne
Nachfolger (Nasenbluten, Chemotherapie, Analfisteln, Parkinson, 2 Doorways), Indexierungsanträge
für Meridiane-Punkte und OUCH vor dem Owner-Entscheid.

## Bestätigte Befunde vs. Hypothesen

**Bestätigt (gemessen):**
- 97/97 URLs aus den Exporten geprüft, keine erfunden. 75 Gefunden + 14 Gecrawlt live 200, self-canonical, kein noindex, in Sitemap; 8 Gecrawlt heute 410.
- 75/75 "Gefunden" nie gecrawlt. 56 tcm.ch-URLs veröffentlicht 11.09. (14), 23./24.09. (23), 27.–30.09. (16), ohne Datum 3.
- 55/56 nie in `seo/index-queue.md` (git-Historie: 0 Treffer); "Offen" der Repo-Kopie enthält 293 URLs.
- 21/21 Laborwert-Seiten ohne Quellen: `sources` ist in `src/data/befunde-werte.ts` bei allen 62 Einträgen leer (Template rendert sie, Daten fehlen).
- 51/56 ohne Link von täglich gecrawlten Seiten; 24/56 auf Klicktiefe 3 (alle Laborwerte + Meridiane).
- Cohort 20: 207–306 eigene Wörter (Adenomyose 431) vs. Median 821; Kosten-Info 2× pro Seite (Abschnitt + FAQ), 262-Wörter-Regionalblock, Concierge-Block; kein Quellenblock.
- 0 Links von tcm.ch auf die 19 OUCH-URLs; 14 davon mit tcm.ch-Owner gleicher Intention (Master-Map).
- 2 der 8 × 410 haben heute einen exakten live Owner (Achillessehne, Winterthur-Kosten).

**Hypothesen (plausibel, nicht beweisbar aus den Daten):**
- Crawl-Nachfrage für tcm.ch reicht nicht für das Publikationstempo; Google priorisiert nach Links und Seitenwert.
- Cohort 20 scheitert an der Qualitätsschwelle (hoher Template-Anteil); ein Teil kann sich mit der Zeit auch ohne Änderung erledigen (Seiten erst 6 Tage alt).
- YMYL-Laborwerte ohne Quellen-/Reviewer-Signal werden niedriger priorisiert.
- Die OUCH-Überschneidung bremst beide Hosts; OUCH als junge Subdomain ohne eingehende Links wird kaum gecrawlt.
- Das H1-Muster "X TCM.ch Behandlung Schweiz" (135 von 155 Beschwerden-Seiten) ist sitewide und erklärt die Auswahl nicht; geringe Relevanz.

## Mögliche systematische Ursachen

| Ursache | Evidenz | Betroffen | Typ |
|---|---|---|---|
| Publikationstempo > Crawl-Nachfrage | 332 neue URLs seit 01.09., 75 nie gecrawlt | alle Gefunden | Hypothese mit starker Evidenz |
| Index-Queue-Prozess nicht eingehalten | 55/56 beim Deploy nicht eingetragen | 56 | bestätigt |
| Interne Verlinkung nur aus Hubs, nicht aus täglich gecrawlten Seiten | 51/56 mit 0 Daily-Links, Klicktiefe 3 | 51 | bestätigt |
| Template-lastige Kohorten-Produktion | 70–76 % Template, ~60 % Text-Überlappung im Gyn-Dreier | 10 (Cohort 20) | bestätigt (Messung) |
| YMYL ohne E-E-A-T-Signale | 21/21 Laborwerte ohne Quellen, kein Reviewer im Schema | 21 | bestätigt (Fehlen); Wirkung Hypothese |
| Zwei Hosts für dieselben Patienten-Intents | 14 OUCH-Artikel mit tcm.ch-Owner | 14 + Owner | bestätigt (Überschneidung) |
| GSC-Altlasten aus Juni | 12 URLs, Crawl 01.–18.06., heute 301/410 | 12 | bestätigt |

## Änderungsvorschläge zur Freigabe (nicht umgesetzt)

1. `functions/wissen/[[path]].js` ALIAS: `"akupunktur-winterthur-kosten-krankenkasse": "/wissen/akupunktur-winterthur-kosten/"` (wirkt vor `WISSEN_KILL`).
2. `functions/beschwerden/[[path]].js` ALIAS: `"achillessehne": "achillessehnenentzuendung"`.
3. `seo/index-queue.md`: 10 A-URLs an den Anfang von "Offen", 42 übrige tcm.ch-URLs (ohne 3 Meridiane-Punkte und die bereits eingetragene Urinuntersuchung) ans Ende; C-URLs erst nach Ausbau einreichen.
4. Kontextlinks gemäss Massnahme 3/7/8 (Datei-Muster `src/data/haut-links.ts`), je Seite 2–3 Links.
5. Redaktions-Briefing Cohort 20 (Massnahme 2) und Laborwerte (Massnahme 9) – Inhalte nicht automatisch umschreiben.
6. OUCH: Owner-Entscheid je Artikel (Liste in CSV, Kategorie D, Host ouch.tcm.ch).

Wiedervorlage: GSC-Export am ~10.11.2026 neu ziehen; B-URLs, die dann weiter "Gefunden" sind,
auf A (Links) oder D (Konsolidierung, z. B. "nach der Akupunktur"-Fragen in den Hub) heben.

## Nachtrag 10.10.2026: Umsetzung auf Feature-Branch (nicht gemergt)

Freigegeben und umgesetzt auf `claude/trusting-curie-hx4k3d`:

1. **Redirects:** `/wissen/akupunktur-winterthur-kosten-krankenkasse` → `/wissen/akupunktur-winterthur-kosten/`
   (ALIAS in `functions/wissen/[[path]].js`, Slug bleibt in `WISSEN_KILL`) und `/beschwerden/achillessehne` →
   `/beschwerden/achillessehnenentzuendung/` (ALIAS in `functions/beschwerden/[[path]].js`).
2. **Kontextlinks für A-URLs** (nur an Stellen, die das Thema im Text bereits nennen; Quellseiten seit
   mindestens 4 Wochen live und in keinem Nicht-indexiert-Export vom 10.10.):
   - /beschwerden/erschoepfung/ ("Häufige Ursachen": Schilddrüsenunterfunktion) → /beschwerden/schilddruesenunterfunktion/
   - /beschwerden/gewichtsmanagement/ ("Verdacht auf Schilddrüsenunterfunktion") → /beschwerden/schilddruesenunterfunktion/
   - /beschwerden/schwere-beine/ ("Venenabklärung") → /beschwerden/venenschwaeche/
   - /therapien/massage/lymphdrainage/ ("bei Venenschwäche") → /beschwerden/venenschwaeche/
   - /krankenkassen/akupunktur/ ("ärztliche Verordnung nicht nötig") → /gesundheitsbibliothek/fragen/ueberweisung-akupunktur/
   - /therapien/akupunktur/ (bestehender Block "Häufige Fragen vor der Behandlung") + wann-wirkt-akupunktur, wie-lange-dauert-akupunktur
   - Ohne neuen Link, weil bereits von einer etablierten Seite verlinkt: angst-vor-akupunktur-nadeln und
     wie-oft-akupunktur (/therapien/akupunktur/), schroepfen-nebenwirkungen und tut-schroepfen-weh
     (/therapien/schroepfen/), /regulatorik/kantone/ (17 B2B-Links; Patienten-Seiten bewusst nicht).
3. **Index-Queue:** Funktion dokumentiert, 10 A-URLs oben in "Offen" (siehe unten).
4. Qualitätsplan Cohort 20: `seo/beschwerden-cohort20-qualitaetsplan-2026-10-10.md`
5. Quellenprüfung Laborwerte: `seo/laborwerte-quellenpruefung-2026-10-10.md` + `.csv`
6. OUCH-Entscheidungsprojekt: `seo/ouch-owner-entscheid-2026-10-10.md`

**Was die Index-Queue tatsächlich ist:** Input der Routine "tcm.ch + physio.ch — Indexierung beantragen"
(täglich 08:00 UTC). Sie liest die Datei auf Simons Rechner (`C:\dev\tcm-ch\seo\index-queue.md`), nicht
die Repo-Datei, und klickt pro URL in der GSC-URL-Prüfung "Indexierung beantragen" (ca. 11/Tag, Kontingent
pro Google-Konto, geteilt mit physio.ch). Das ist eine Crawl-Anfrage ohne Indexierungsgarantie. Erledigt-
Vermerke werden nur lokal geschrieben: Die Repo-Datei hat keine Einträge nach dem 20.09.2026. Die Zahl
"293 offen" beschreibt deshalb die Repo-Kopie, nicht zwingend den echten Rückstau. Die A-Priorisierung
wirkt erst, wenn die lokale Kopie den Branch-Stand übernimmt.

**Korrektur gegenüber der ersten Fassung:** Laborwerte haben alle keine Quellen (vorher 3 als "mit
Quellenblock" gezählt; der Treffer war Fliesstext wie "zwei Quellen"). Damit 21 statt 18 Seiten in C,
B von 33 auf 30.

## Alle 97 URLs

Vollständige Begründungen und Messwerte in der CSV.

| # | URL | GSC | Crawl | HTTP | Eigene Wörter | Links tägl. | Kat. | Prio | Massnahme (Kurzform) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | tcm.ch/beschwerden/schilddruesenunterfunktion/ | Gefunden | nie | 200 | 470 | 3 | A | P1 | In index-queue.md (oben) aufnehmen und Indexierung beantragen; 2–3 Kontextlinks von thematisch nahen, indexierten Bes… |
| 2 | tcm.ch/beschwerden/venenschwaeche/ | Gefunden | nie | 200 | 479 | 0 | A | P1 | In index-queue.md (oben) aufnehmen und Indexierung beantragen; 2–3 Kontextlinks von thematisch nahen, indexierten Bes… |
| 3 | tcm.ch/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/ | Gefunden | nie | 200 | 278 | 0 | A | P2 | In Index-Queue aufnehmen; Link aus FAQ/Ablauf-Abschnitt der Standortseiten bzw. /therapien/akupunktur/ (dort bisher n… |
| 4 | tcm.ch/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/ | Gefunden | nie | 200 | 233 | 0 | A | P2 | In Index-Queue aufnehmen; Link aus FAQ/Ablauf-Abschnitt der Standortseiten bzw. /therapien/akupunktur/ (dort bisher n… |
| 5 | tcm.ch/gesundheitsbibliothek/fragen/tut-schroepfen-weh/ | Gefunden | nie | 200 | 224 | 0 | A | P2 | In Index-Queue aufnehmen; Link aus FAQ/Ablauf-Abschnitt der Standortseiten bzw. /therapien/akupunktur/ (dort bisher n… |
| 6 | tcm.ch/gesundheitsbibliothek/fragen/ueberweisung-akupunktur/ | Gefunden | nie | 200 | 237 | 0 | A | P2 | In Index-Queue aufnehmen; Link aus FAQ/Ablauf-Abschnitt der Standortseiten bzw. /therapien/akupunktur/ (dort bisher n… |
| 7 | tcm.ch/gesundheitsbibliothek/fragen/wann-wirkt-akupunktur/ | Gefunden | nie | 200 | 278 | 0 | A | P2 | In Index-Queue aufnehmen; Link aus FAQ/Ablauf-Abschnitt der Standortseiten bzw. /therapien/akupunktur/ (dort bisher n… |
| 8 | tcm.ch/gesundheitsbibliothek/fragen/wie-lange-dauert-akupunktur/ | Gefunden | nie | 200 | 232 | 0 | A | P2 | In Index-Queue aufnehmen; Link aus FAQ/Ablauf-Abschnitt der Standortseiten bzw. /therapien/akupunktur/ (dort bisher n… |
| 9 | tcm.ch/gesundheitsbibliothek/fragen/wie-oft-akupunktur/ | Gefunden | nie | 200 | 259 | 0 | A | P2 | In Index-Queue aufnehmen; Link aus FAQ/Ablauf-Abschnitt der Standortseiten bzw. /therapien/akupunktur/ (dort bisher n… |
| 10 | tcm.ch/regulatorik/kantone/ | Gefunden | nie | 200 | 2246 | 0 | A | P2 | In index-queue.md aufnehmen und Indexierung beantragen |
| 11 | tcm.ch/beschwerden/adenomyose/ | Gecrawlt | 2026-10-05 | 200 | 431 | 2 | C | P1 | Inhalt verbessern |
| 12 | tcm.ch/beschwerden/funktionelle-dyspepsie/ | Gecrawlt | 2026-10-05 | 200 | 258 | 2 | C | P1 | Inhalt verbessern |
| 13 | tcm.ch/beschwerden/dyspareunie/ | Gecrawlt | 2026-10-05 | 200 | 235 | 3 | C | P2 | Inhalt verbessern |
| 14 | tcm.ch/beschwerden/interstitielle-zystitis/ | Gecrawlt | 2026-10-06 | 200 | 221 | 1 | C | P2 | Inhalt verbessern |
| 15 | tcm.ch/beschwerden/vaginismus/ | Gecrawlt | 2026-10-05 | 200 | 207 | 2 | C | P2 | Inhalt verbessern |
| 16 | tcm.ch/beschwerden/vulvodynie/ | Gecrawlt | 2026-10-05 | 200 | 211 | 3 | C | P2 | Inhalt verbessern |
| 17 | tcm.ch/beschwerden/costochondritis/ | Gecrawlt | 2026-10-05 | 200 | 306 | 0 | C | P3 | Inhalt verbessern |
| 18 | tcm.ch/beschwerden/divertikulitis/ | Gecrawlt | 2026-10-05 | 200 | 254 | 0 | C | P3 | Inhalt verbessern |
| 19 | tcm.ch/beschwerden/gastroparese/ | Gecrawlt | 2026-10-05 | 200 | 219 | 0 | C | P3 | Inhalt verbessern |
| 20 | tcm.ch/beschwerden/zoeliakie/ | Gecrawlt | 2026-10-05 | 200 | 243 | 0 | C | P3 | Inhalt verbessern |
| 21 | tcm.ch/gesundheitsbibliothek/befunde-werte/alkalische-phosphatase-erhoeht/ | Gefunden | nie | 200 | 352 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 22 | tcm.ch/gesundheitsbibliothek/befunde-werte/amylase-erhoeht/ | Gefunden | nie | 200 | 326 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 23 | tcm.ch/gesundheitsbibliothek/befunde-werte/basophile-erhoeht/ | Gefunden | nie | 200 | 313 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 24 | tcm.ch/gesundheitsbibliothek/befunde-werte/bilirubin-erhoeht/ | Gefunden | nie | 200 | 409 | 1 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 25 | tcm.ch/gesundheitsbibliothek/befunde-werte/calcium-zu-hoch/ | Gefunden | nie | 200 | 318 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 26 | tcm.ch/gesundheitsbibliothek/befunde-werte/eosinophile-erhoeht/ | Gefunden | nie | 200 | 356 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 27 | tcm.ch/gesundheitsbibliothek/befunde-werte/ferritin-erhoeht/ | Gefunden | nie | 200 | 382 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 28 | tcm.ch/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/ | Gefunden | nie | 200 | 401 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 29 | tcm.ch/gesundheitsbibliothek/befunde-werte/got-ast-erhoeht/ | Gefunden | nie | 200 | 376 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 30 | tcm.ch/gesundheitsbibliothek/befunde-werte/gpt-alt-erhoeht/ | Gefunden | nie | 200 | 365 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 31 | tcm.ch/gesundheitsbibliothek/befunde-werte/haemoglobin-zu-hoch/ | Gefunden | nie | 200 | 355 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 32 | tcm.ch/gesundheitsbibliothek/befunde-werte/haemoglobin-zu-niedrig/ | Gefunden | nie | 200 | 407 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 33 | tcm.ch/gesundheitsbibliothek/befunde-werte/harnsaeure-erhoeht/ | Gefunden | nie | 200 | 426 | 1 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 34 | tcm.ch/gesundheitsbibliothek/befunde-werte/kalium-zu-hoch/ | Gefunden | nie | 200 | 434 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 35 | tcm.ch/gesundheitsbibliothek/befunde-werte/ldh-erhoeht/ | Gefunden | nie | 200 | 345 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 36 | tcm.ch/gesundheitsbibliothek/befunde-werte/lipase-erhoeht/ | Gefunden | nie | 200 | 384 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 37 | tcm.ch/gesundheitsbibliothek/befunde-werte/monozyten-erhoeht/ | Gefunden | nie | 200 | 331 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 38 | tcm.ch/gesundheitsbibliothek/befunde-werte/natrium-zu-hoch/ | Gefunden | nie | 200 | 345 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 39 | tcm.ch/gesundheitsbibliothek/befunde-werte/neutrophile-erhoeht/ | Gefunden | nie | 200 | 371 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 40 | tcm.ch/gesundheitsbibliothek/befunde-werte/vitamin-b12-zu-niedrig/ | Gefunden | nie | 200 | 355 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 41 | tcm.ch/gesundheitsbibliothek/befunde-werte/vitamin-d-zu-niedrig/ | Gefunden | nie | 200 | 368 | 0 | C | P3 | Vor Indexierungsantrag YMYL härten: Quellen (Referenzbereiche, Fachgesellschaft) + fachliche Prüfung ergänzen |
| 42 | tcm.ch/beschwerden/achillessehne | Gecrawlt | 2026-06-06 | 410 | – | – | D | P2 | FREIGABE: 301 /beschwerden/achillessehne → /beschwerden/achillessehnenentzuendung/ (ALIAS in functions/beschwerden/[[… |
| 43 | tcm.ch/wissen/akupunktur-winterthur-kosten-krankenkasse | Gecrawlt | 2026-06-07 | 410 | – | – | D | P2 | FREIGABE: 301 → /wissen/akupunktur-winterthur-kosten/ (ALIAS in functions/wissen/[[path]].js, vor KILL). |
| 44 | ouch.tcm.ch/insights/acu-land-nach-der-behandlung/ | Gefunden | nie | 200 | 543 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 45 | ouch.tcm.ch/insights/akupunktur-nebenwirkungen/ | Gefunden | nie | 200 | 586 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 46 | ouch.tcm.ch/insights/akupunktur-schwangerschaft/ | Gefunden | nie | 200 | 566 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 47 | ouch.tcm.ch/insights/dinge-die-patienten-fragen/ | Gefunden | nie | 200 | 643 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 48 | ouch.tcm.ch/insights/elektroakupunktur/ | Gefunden | nie | 200 | 445 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 49 | ouch.tcm.ch/insights/gua-sha-jugendamt/ | Gefunden | nie | 200 | 359 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 50 | ouch.tcm.ch/insights/moxa-und-der-rauchmelder/ | Gefunden | nie | 200 | 317 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 51 | ouch.tcm.ch/insights/nadelphobie/ | Gefunden | nie | 200 | 562 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 52 | ouch.tcm.ch/insights/ohrakupunktur-nada/ | Gefunden | nie | 200 | 448 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 53 | ouch.tcm.ch/insights/pulsdiagnose-28-geschichten/ | Gefunden | nie | 200 | 551 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 54 | ouch.tcm.ch/insights/schroepfen-kreise/ | Gefunden | nie | 200 | 563 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 55 | ouch.tcm.ch/insights/tuina-massage/ | Gefunden | nie | 200 | 549 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 56 | ouch.tcm.ch/insights/was-kostet-tcm/ | Gefunden | nie | 200 | 596 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 57 | ouch.tcm.ch/insights/zungendiagnose-selbstversuch/ | Gefunden | nie | 200 | 262 | 0 | D | P3 | FREIGABE/Owner-Entscheid: Owner bleibt tcm.ch |
| 58 | tcm.ch/gesundheitsbibliothek/untersuchungen/belastungs-ekg/ | Gefunden | nie | 200 | 506 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen. |
| 59 | tcm.ch/gesundheitsbibliothek/untersuchungen/ct/ | Gefunden | nie | 200 | 483 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen. |
| 60 | tcm.ch/gesundheitsbibliothek/untersuchungen/hormontest/ | Gefunden | nie | 200 | 436 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen. |
| 61 | tcm.ch/gesundheitsbibliothek/untersuchungen/langzeit-blutdruckmessung/ | Gefunden | nie | 200 | 401 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen. |
| 62 | tcm.ch/gesundheitsbibliothek/untersuchungen/szintigrafie/ | Gefunden | nie | 200 | 440 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen. |
| 63 | tcm.ch/gesundheitsbibliothek/untersuchungen/ultraschall/ | Gefunden | nie | 200 | 458 | 3 | B | P3 | Abwarten; in Index-Queue nachtragen. |
| 64 | tcm.ch/gesundheitsbibliothek/untersuchungen/urinuntersuchung/ | Gefunden | nie | 200 | 654 | 1 | B | P3 | Abwarten (steht bereits in Queue "Offen"). |
| 65 | tcm.ch/koerpersignale/bruechige-naegel/ | Gefunden | nie | 200 | 383 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen; 1 Kontextlink von passendem Beschwerden-Leaf. |
| 66 | tcm.ch/koerpersignale/eingerissene-mundwinkel/ | Gefunden | nie | 200 | 428 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen; 1 Kontextlink von passendem Beschwerden-Leaf. |
| 67 | tcm.ch/koerpersignale/juckreiz-nach-dem-duschen/ | Gefunden | nie | 200 | 401 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen; 1 Kontextlink von passendem Beschwerden-Leaf. |
| 68 | tcm.ch/wissen/narbenbehandlung/ | Gefunden | nie | 200 | 547 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen; Kontextlink von der zugehörigen Therapieseite. |
| 69 | tcm.ch/wissen/schroepfmassage/ | Gefunden | nie | 200 | 564 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen; Kontextlink von der zugehörigen Therapieseite. |
| 70 | tcm.ch/wissen/shiatsu-selbstbehandlung/ | Gefunden | nie | 200 | 535 | 0 | B | P3 | Abwarten; in Index-Queue nachtragen; Kontextlink von der zugehörigen Therapieseite. |
| 71 | ouch.tcm.ch/insights/archaik-check-blutegel-bienengift-baunscheidt/ | Gefunden | nie | 200 | 582 | 0 | B | P4 | Abwarten |
| 72 | ouch.tcm.ch/insights/aristolochia-kapitel/ | Gefunden | nie | 200 | 329 | 0 | B | P4 | Abwarten |
| 73 | ouch.tcm.ch/insights/dolmetscher-luecke/ | Gefunden | nie | 200 | 341 | 0 | B | P4 | Abwarten |
| 74 | ouch.tcm.ch/insights/erstgespraech-bingo/ | Gefunden | nie | 200 | 342 | 0 | B | P4 | Abwarten |
| 75 | ouch.tcm.ch/insights/wetter-im-knie/ | Gefunden | nie | 200 | 595 | 0 | B | P4 | Abwarten |
| 76 | tcm.ch/branche/organisationen/ | Gefunden | nie | 200 | 685 | 0 | B | P4 | Abwarten; in index-queue.md (unteres Drittel) nachtragen. |
| 77 | tcm.ch/branche/tcm-international-schweiz/ | Gefunden | nie | 200 | 750 | 0 | B | P4 | Abwarten; in index-queue.md (unteres Drittel) nachtragen. |
| 78 | tcm.ch/gesundheitsbibliothek/fragen/alkohol-nach-akupunktur/ | Gefunden | nie | 200 | 236 | 0 | B | P4 | Abwarten |
| 79 | tcm.ch/gesundheitsbibliothek/fragen/kleidung-akupunktur/ | Gefunden | nie | 200 | 251 | 0 | B | P4 | Abwarten; in Index-Queue (unteres Drittel) nachtragen. |
| 80 | tcm.ch/gesundheitsbibliothek/fragen/schwimmen-nach-akupunktur/ | Gefunden | nie | 200 | 278 | 0 | B | P4 | Abwarten |
| 81 | tcm.ch/gesundheitsbibliothek/fragen/sport-nach-akupunktur/ | Gefunden | nie | 200 | 360 | 0 | B | P4 | Abwarten |
| 82 | tcm.ch/gesundheitsbibliothek/fragen/tuina-nebenwirkungen/ | Gefunden | nie | 200 | 222 | 0 | B | P4 | Abwarten; in Index-Queue (unteres Drittel) nachtragen. |
| 83 | tcm.ch/gesundheitsbibliothek/fragen/wie-tief-akupunkturnadeln/ | Gefunden | nie | 200 | 234 | 0 | B | P4 | Abwarten; in Index-Queue (unteres Drittel) nachtragen. |
| 84 | tcm.ch/gesundheitsbibliothek/fragen/wie-viele-akupunkturnadeln/ | Gefunden | nie | 200 | 246 | 0 | B | P4 | Abwarten; in Index-Queue (unteres Drittel) nachtragen. |
| 85 | tcm.ch/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/dreifacher-erwaermer/ | Gefunden | nie | 200 | 416 | 0 | B | P4 | Abwarten |
| 86 | tcm.ch/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/hegu/ | Gefunden | nie | 200 | 328 | 0 | B | P4 | Abwarten |
| 87 | tcm.ch/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/lebermeridian/ | Gefunden | nie | 200 | 348 | 0 | B | P4 | Abwarten |
| 88 | tcm.ch/beschwerden/analfisteln | Gecrawlt | 2026-06-08 | 410 | – | – | E | – | 410 belassen. |
| 89 | tcm.ch/beschwerden/chemotherapie | Gecrawlt | 2026-06-09 | 410 | – | – | E | – | 410 belassen |
| 90 | tcm.ch/beschwerden/ischias | Gecrawlt | 2026-06-08 | 200 | 1133 | 13 | E | – | Keine |
| 91 | tcm.ch/beschwerden/nasenbluten | Gecrawlt | 2026-06-09 | 410 | – | – | E | – | 410 belassen |
| 92 | tcm.ch/beschwerden/parkinson | Gecrawlt | 2026-06-06 | 410 | – | – | E | – | 410 belassen. |
| 93 | tcm.ch/beschwerden/rotatorenmanschette | Gecrawlt | 2026-06-06 | 200 | 1181 | 2 | E | – | Keine |
| 94 | tcm.ch/beschwerden/sodbrennen-reflux | Gecrawlt | 2026-06-08 | 200 | 812 | 7 | E | – | Keine |
| 95 | tcm.ch/therapien/gua-sha/basel | Gecrawlt | 2026-06-01 | 410 | – | – | E | – | 410 belassen. |
| 96 | tcm.ch/therapien/physiotherapie/zuerich-hoengg | Gecrawlt | 2026-06-08 | 410 | – | – | E | – | 410 belassen. |
| 97 | www.tcm.ch/standorte/ | Gecrawlt | 2026-06-18 | 200 | 334 | 158 | E | – | Keine |
