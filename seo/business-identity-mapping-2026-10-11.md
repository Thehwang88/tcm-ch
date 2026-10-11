# Business-Identity-Mapping der Standorte (11.10.2026)

Status: **Dokumentation (Batch 6, Partial GO).** Umgesetzt ist nur Frauenfeld (Batch 5). Für alle anderen
Adressen wird nichts an Seiten, Schema oder Google-Profilen geändert, bis die Zuordnung bestätigt ist.

## Leitlinie (Entscheid 11.10.2026)

- **Praxis Hwang** ist Betreiberin und primäre lokale Marke ihrer bestehenden Praxen.
- **TCM.ch** ist das nationale Netzwerk und die Plattform: Suche, Anfrage, Terminkoordination und Sichtbarkeit der
  Partnerpraxen.
- Eine Praxis-Hwang-Adresse erscheint auf tcm.ch nie als eigenständige TCM.ch-Klinik. Die Schreibweise lautet
  «Praxis Hwang X – Partnerpraxis im TCM.ch Netzwerk».
- Die Google-Profile der Praxis Hwang verweisen weiterhin auf hwang.ch. Es werden keine TCM.ch-Profil-Dubletten
  angelegt und keine Profil-Links geändert.
- Die TCM.ch-Nummer +41 77 523 61 22 ist erlaubt, wenn sie als «Terminkoordination TCM.ch» bezeichnet ist und nicht
  als Praxistelefon.
- Schema beschreibt die reale Entität (Betreiberin). TCM.ch erscheint nur als Netzwerk (`memberOf` → `https://tcm.ch/#org`).
- Bewertungen werden nicht zwischen den Marken übertragen.
- Eigene TCM.ch-Praxen (Ohmstrasse 14, geplant) bleiben getrennt von der Praxis Hwang an der Schulstrasse 3.

## Quellen

- **hwang.ch** (abgerufen am 11.10.2026): Standortseiten mit Adresse, Telefon, Öffnungszeiten und eingebettetem
  Google-Maps-Ort. Das ist die **Selbstauskunft der Betreiberin**, keine unabhängige Prüfung.
- **tcm.ch**: Build `979c5ed` (Branch `claude/trusting-curie-hx4k3d`).
- Google-Profil-Daten (Inhaber, Website-Feld, Bewertungen) sind von hier aus nicht einsehbar. Für den Abgleich
  braucht es einen Zugang zum Business-Profile-Konto.

## Mapping

| Adresse | Betreiberin (Quelle) | Google-Maps-Ort (auf hwang.ch eingebettet) | Praxistelefon (Quelle) | TCM.ch-Seite | TCM.ch heute | Ziel | Status |
|---|---|---|---|---|---|---|---|
| Rheinstrasse 25, 8500 Frauenfeld | Praxis Hwang (hwang.ch/standorte/frauenfeld) | «Praxis Hwang» | +41 79 837 46 81 (hwang.ch) | /standorte/frauenfeld/ | seit Batch 5: «Praxis Hwang Frauenfeld · Partnerpraxis im TCM.ch Netzwerk»; Schema = Entität der Betreiberin (`@id` hwang.ch, Praxistelefon, `memberOf` TCM.ch); TCM.ch-Nummer als Terminkoordination | = heute | **umgesetzt** |
| Romanshornerstrasse 1, 8280 Kreuzlingen | Praxis Hwang (hwang.ch/standorte/kreuzlingen) | «Praxis Hwang» | +41 79 837 46 81 (hwang.ch) | /standorte/kreuzlingen/ | Text «Partnerklinik von Praxis Hwang», Eyebrow «TCM.ch Klinik», Schema «TCM.ch Kreuzlingen» mit TCM.ch-Nummer | wie Frauenfeld: `betreiber` in `locations.ts` setzen (Komponenten und Schema übernehmen es automatisch), Copy prüfen | **bereit**, wartet auf GO für die Kreuzlingen-Seite |
| Limmattalstrasse 340, 8049 Zürich (Höngg) | Praxis Hwang (hwang.ch/standorte/zurich-hongg) | «Praxis Hwang» | +41 79 837 46 81 (hwang.ch) | /standorte/zuerich-hoengg/ | Hub nennt «Praxis Hwang»; die Höngg-Seite selbst sagt «TCM.ch Klinik · Zürich Höngg» und Schema «TCM.ch Zürich Höngg» | wie Frauenfeld | **bereit**, wartet auf GO (Seite nicht in Batch 1–5) |
| Schulstrasse 3, 8050 Zürich (Oerlikon) | Praxis Hwang (hwang.ch/standorte/zurich-oerlikon) | «Praxis Hwang» | +41 79 837 46 81 (hwang.ch) | keine eigene Seite; Buchungsoption auf /standorte/zuerich-oerlikon/ und im Zürich-Funnel | korrekt als «Partnerpraxis Praxis Hwang (Termine jetzt)» | = heute; keine eigene TCM.ch-Seite und kein Schema-Knoten (die Entität gehört zu hwang.ch) | **ok** |
| Ohmstrasse 14, 8050 Zürich (Oerlikon) | TCM.ch (geplant, Eröffnung 1.12.2026, nicht final bestätigt) | – | – | /standorte/zuerich-oerlikon/ | `status: 'planned'`, Schema «TCM.ch Zürich Oerlikon» ohne Öffnungszeiten | Nach Inhaberbestätigung: `status: 'operational'`, verifizierte Zeiten und Telefon | **getrennt von Praxis Hwang**, ok |
| Münzgasse 2, 8400 Winterthur | hwang.ch führt diese Adresse als Praxis-Hwang-Standort «Winterthur» | «Praxis Hwang» | +41 79 837 46 81 (hwang.ch) | /standorte/winterthur-muenzgasse/ | `status: 'review'` («Standort in Prüfung»), kein Klinik-Schema | Bleibt `review`, bis das Betriebsarrangement ausdrücklich bestätigt ist; danach `operational` + `betreiber` | **offen (Owner)** |
| Marktgasse 78, 8400 Winterthur | **unbekannt**: auf hwang.ch nicht gelistet | – | – | /standorte/winterthur-marktgasse/ | «TCM.ch Klinik · Winterthur», Schema «TCM Winterthur – TCM.ch» | Betreiberin klären (TCM.ch selbst? andere Partnerin?) | **offen (Owner)** |
| Oberer Graben 22, 9000 St. Gallen | hwang.ch führt die Adresse ebenfalls, mit TCM.ch- **und** Hwang-Nummer; auf tcm.ch ist das Profil «TCM.ch St Gallen» verlinkt | auf hwang.ch nur eine Adresskarte, kein Ort | +41 77 523 61 22 / +41 79 837 46 81 (beide auf hwang.ch) | /standorte/st-gallen/ (Legacy, geschützt) | «TCM.ch St. Gallen», Schema «TCM St. Gallen», verlinktes Profil «TCM.ch St Gallen» | Betreiberin und Profil-Inhaber klären; ein Name für Schema und Profil | **offen (Owner)** |
| Hauptstrasse 34, 8598 Bottighofen | TCM Pelican (eigenständige Partnerpraxis laut tcm.ch) | – | +41 76 578 09 88 (tcm.ch) | /standorte/bottighofen/ | DE «TCM Pelican», EN-Schema «TCM.ch - Acupuncture & TCM Bottighofen» | EN-Schema-Name an «TCM Pelican» angleichen, ggf. `betreiber` setzen | **offen** (kleiner Fix, mit GO) |
| Volketswil, Rorschach, Wil | unbekannt (nicht auf hwang.ch) | – | – | /standorte/<slug>/ | «TCM.ch Klinik · X», Template-Öffnungszeiten | Betreiberin und Öffnungszeiten klären | **offen (Owner)** |

## Technik (umgesetzt in Batch 5, wiederverwendbar)

- In `src/data/locations.ts` gibt es pro Klinik ein Feld `betreiber` mit `name`, `marke`, `url`, `telefon` und `quelle`.
  Daraus folgt automatisch:
  - DE-Hero-Eyebrow, Sidebar (Betreiberin + «Praxis direkt»), Schema DE und EN mit gleicher `@id` (`<url>#praxis`),
  - EN-Anzeige der Betreiberin und des Praxistelefons.
- Ein weiterer Standort wird umgestellt, indem nur das `betreiber`-Feld gesetzt und die standortspezifische Copy
  in `standorte.ts` geprüft wird (keine «TCM.ch Klinik»-/Herkunfts-Claims).

## Offene Fragen (Owner)

1. Winterthur Münzgasse: Wie ist das Betriebsarrangement geregelt (Praxis Hwang laut hwang.ch)? Erst danach
   `operational`.
2. Winterthur Marktgasse, Volketswil, Rorschach, Wil: Wer betreibt diese Praxen, und gelten die Öffnungszeiten?
3. St. Gallen: Wer ist Inhaber des Google-Profils «TCM.ch St Gallen», und wer betreibt die Praxis?
4. Für die Frauenfelder Praxisnummer +41 79 837 46 81 (laut hwang.ch die allgemeine Mobilnummer): Ist das die
   richtige Praxis-Direktnummer, oder gibt es eine standortspezifische?
5. Kreuzlingen und Höngg: GO, beide wie Frauenfeld umzustellen?
