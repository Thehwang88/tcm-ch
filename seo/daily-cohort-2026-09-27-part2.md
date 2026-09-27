# Daily SEO Cohort 2026-09-27 — Teil 2 (Untersuchungen-Vertiefung)

Zweite Kohorte des Tages (nach den 12 Seiten von Teil 1). Fokus gemäss Indexierungssignal: Untersuchungen & Diagnostik (indexiert sehr schnell), bewusst KEIN Befunde-Batch.

## Ergebnis: 10/10 sauber publiziert (9 Primärkandidaten + 1 Reserve)

Alle `/gesundheitsbibliothek/untersuchungen/<slug>/`:

| Seite | Keyword-Demand (Semrush CH) | Besonderheit |
|---|---|---|
| knochendichtemessung | knochendichtemessung ~1300 + dexa scan ~1300 (KD 19/11) | EIN Owner für beide Terme; T-/Z-Score high-level ohne Schwellen-Zahlen |
| allergietest | ~1300 (KD 16) | Prick/IgE/Epikutan; Sensibilisierung ≠ Allergie; Antihistaminika-Pause nur per Praxis-Instruktion |
| schlaflabor | ~720 (KD 41) | Polysomnografie; Heimmessung vs. Labor; keine Apnoe-Diagnose aus Symptomen |
| echokardiografie | ~590 + herzultraschall ~320 | EIN Owner; Ultraschall bleibt Umbrella; keine Herzkrankheits-Seite |
| hoertest | hörtest ~590 + audiometrie ~170 | EIN Owner; Ton-/Sprachaudiometrie; Muster nur high-level |
| eeg | ~260 (KD 20) | auffälliges EEG ≠ Diagnose, normales schliesst nicht aus |
| blutgasanalyse | ~260 (KD 25) | besitzt den TEST; Einzelwerte werden NICHT als Befunde-Seiten fragmentiert |
| langzeit-blutdruckmessung | 24h ~210 + langzeit ~30 (KD 9) | Dreier-Grenze: bluthochdruck=Erkrankung / blutdruck-140-90=Messwert / diese Seite=Methode |
| szintigrafie | ~1000 (KD 22) | NUR genereller Owner; Organ-Children (R1) bewusst nicht erstellt |
| duplexsonografie | ~390 + doppler ultraschall ~170 | Reserve R2, ersetzt geblockte Schwangerschafts-Frage; Kind der Ultraschall-Umbrella |

## BLOCKED

- **/gesundheitsbibliothek/fragen/akupunktur-schwangerschaft/**: Beim Strict-Audit zeigte sich neben /beschwerden/schwangerschaftsbeschwerden/ vor allem **/therapien/akupunktur/schwangerschaft/** als bestehender PRIMARY_OWNER (commercial) für exakt "akupunktur in der schwangerschaft" inkl. Sicherheits-Subintent; dazu SECONDARY_SUPPORT /wissen/akupunktur-geburtsvorbereitung-beckenendlage/. Der GSC-Traffic (~62 Impressions) gehört mit hoher Wahrscheinlichkeit bereits dieser Seite. Eine separate Fragen-URL wäre ein direkter Kannibalisierungs-Kandidat → GEBLOCKT. Empfehlung: Sicherheits-/„Was sage ich der Therapeutin?"-Absatz auf dem Therapie-Owner ausbauen statt neuer URL.
- **R1 Schilddrüsenszintigrafie**: Parent (Szintigrafie) deckt den Intent initial; Child erst bei Suchsignal.
- **Belastungs-EKG-artige Erweiterungen**: unverändert beim EKG-Owner.

## Owner-Grenzen (alle 10)

Untersuchungs-Intent only: keine Krankheits-, Symptom-, Befund- oder Behandlungs-Keywords. Dokumentiert pro CSV-Zeile; kritischste Grenzen: Echo/Duplex als Kinder der Ultraschall-Umbrella (beidseitig verlinkt, overlapping_urls gesetzt), Blutgasanalyse als Anti-Fragmentierungs-Grenze zum Befunde-Cluster, 24h-Blutdruck im Dreieck mit bluthochdruck + blutdruck-140-90.

## Interne Links

- Inbound neu (11): KS schnarchen-jede-nacht→Schlaflabor, dumpfes-gefuehl-im-ohr→Hörtest, schwere-beine-abends→Duplex; Befunde blutdruck-140-90→24h-Blutdruck, eosinophile-erhoeht→Allergietest, tsh-erhoeht→Szintigrafie, vitamin-d-zu-niedrig→Knochendichte (relatedDiagnostics); Bestandsseiten EKG→Echo, Ultraschall→Echo+Duplex, Lungenfunktion→Blutgasanalyse.
- Outbound: jede Seite 4-7 kontextuelle Links auf KS/Beschwerden/Befunde/Untersuchungen; 0 kaputte Links (dist-verifiziert).

## Hub-Gruppierung (Design unverändert, nur Struktur)

20 Leaves neu in 6 klinischen Gruppen: Bildgebung (7) / Herz & Kreislauf (3) / Nerven & Gehirn (2) / Lunge, Schlaf & Atmung (3) / Magen & Darm (2) / Labor, Allergie & Gehör (3). Umsetzung: `groups`-Array + `group-heading` im bestehenden leaf-grid-Design; lange Kartennamen mit Soft-Hyphens (sauberer Umbruch, QA-verifiziert).

## Technik / Zahlen

- Sitemap 560 → **570** (+10). Suchindex 351 → **361** (+10 via DIAGNOSTICS-hrefs).
- CSV +10 PRIMARY_OWNER (579 Zeilen, Spalten validiert). health-audit 0/0/0.
- QA: Canonicals self, 0 noindex, 0 Em-Dashes, 0 kaputte Links; Renders 390/1440 (Hub + 5 Leaves): 0 Overflow (2 Long-Word-Fixes: &shy; im Knochendichte-H1, Kartennamen), 0 JS-Errors.
- Natural Discovery: keine der 10 URLs in seo/index-queue.md, keine manuelle Einreichung.

## Kannibalisierungs-Beobachtung

- Echo/Duplex vs. Ultraschall-Umbrella: sauber getrennt, aber in GSC beobachten (Query-Zuordnung herzultraschall/doppler).
- Szintigrafie: falls GSC organ-spezifische Queries (schilddrüsenszintigrafie ~110/mt) auf die Generalseite zieht und CTR schwach bleibt → R1 als Child nachziehen.

## Nächste Welle (Empfehlung)

- Untersuchungen: Ergometrie/Belastungs-EKG NUR falls GSC-Nachfrage am EKG-Owner sichtbar; Kapselendoskopie (klein); Urin-/Stuhluntersuchung (R3/R4) bei klinischem Anlass; Schilddrüsen-Ultraschall + Schilddrüsenszintigrafie als Paar bei Suchsignal.
- Akupunktur-Schwangerschaft: Sicherheits-Sektion auf /therapien/akupunktur/schwangerschaft/ ausbauen (kein neuer URL-Owner).
- Danach Rückkehr zu Was-jetzt-/Fragen-Kandidaten aus Teil-1-Liste (Herzultraschall-Frage jetzt obsolet, da Echo-Seite existiert).

Deploy normally. Do not manually submit these URLs or resubmit the sitemap. We will measure natural discovery, crawl and indexing in Google Search Console.
