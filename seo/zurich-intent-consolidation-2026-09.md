# Zürich Intent-Konsolidierung (20.09.2026)

Audit-first-Task. Zentrales Ergebnis vorweg: Die Hub-&-Spoke-Architektur, die
der Auftrag verlangt, EXISTIERT bereits und ist in seo/master-keyword-url-map.csv
als bewusste Ownership dokumentiert. Die GSC-Streuung ist überwiegend Google-
Testing, kein Struktur-Chaos. Entsprechend wurden nur drei chirurgische
Schwächen behoben statt Seiten umgebaut; ein rankender Hub wurde bewusst nicht
umgetitelt.

## A. Overlap-Karte (Ist-Zustand vor den Edits)

| Seite | Title | H1 | Canonical | Robots | Broad-Zürich-Overlap? |
|---|---|---|---|---|---|
| /akupunktur-tcm-zuerich/ | TCM Zürich, Akupunktur & Chinesische Medizin | TCM Zürich: Akupunktur & Chinesische Medizin | self | index | JA (gewollt: Owner) |
| /standorte/zuerich-city/ | TCM & Akupunktur Zürich City | TCM & Akupunktur Zürich City | self | index | nein (Modifier City) |
| /standorte/zuerich-oerlikon/ | TCM Oerlikon, Akupunktur in Zürich Oerlikon | TCM Oerlikon: Akupunktur in Zürich Oerlikon | self | index | nein |
| /standorte/zuerich-hoengg/ | TCM & Akupunktur Zürich Höngg | Akupunktur & TCM in Zürich Höngg | self | index | nein |
| /standorte/zuerich/kosten/ | Akupunktur Kosten Zürich, Preise & Krankenkasse | Was kostet Akupunktur in Zürich? | self | index | nein (Kosten-Intent) |
| /akupunktur-in-der-naehe/ | Akupunktur in deiner Nähe: 14 Standorte Schweiz | Akupunktur in deiner Nähe | self | index | nein (national) |
| / (Homepage) | (Marken-Hero) | Wir geben nicht auf... | self | index | nur als Verweis auf Hub |

Einziger echter Qualitätsbefund: Der Hub selbst trug unter dem Standort-Grid
einen Keyword-Stuffing-Absatz ("Wir sind deine TCM Praxis Zürich... Akupunktur
Zürich, Tuina-Massage Zürich... Seefeld, Enge, Altstetten, Wiedikon, Kreise 1
bis 11. TCM Zürich, ..."), Doorway-Stil im Sinne von §18. Dazu zwei sichtbare
Em-Dash-Verstösse auf der Kosten-Seite (Meta + Fliesstext).

## B. Intent-Owner pro Query-Familie (bestätigt, CSV-konform)

- tcm zürich / akupunktur zürich / chinesische medizin zürich / tcm praxis
  zürich -> /akupunktur-tcm-zuerich/ (PRIMARY_OWNER, Stadt-Hub & Router)
- tcm/akupunktur zürich city, Innenstadt-/Paradeplatz-Umfeld -> /standorte/zuerich-city/
- tcm/akupunktur (zürich) oerlikon, Zürich Nord -> /standorte/zuerich-oerlikon/
- tcm/akupunktur (zürich) höngg, Kreis 10 -> /standorte/zuerich-hoengg/
- akupunktur/tcm kosten zürich -> /standorte/zuerich/kosten/
- national "in der Nähe" -> /akupunktur-in-der-naehe/ (kein Zürich-Fokus,
  bestätigt: Title/H1 national, Zürich nur als Aufzählung)

## C. Title/Meta/H1-Änderungen

KEINE. Alle sieben Seiten waren bereits korrekt differenziert (Hub breit,
Spokes quartier-spezifisch, Kosten eng kommerziell). Der Hub rankt auf der
Ziel-Familie; Umtiteln auf die Vorschlags-Variante hätte nur Churn erzeugt.
Einzige Meta-Änderung: Kosten-Meta wegen Em-Dash umformuliert ("Tarif 590,
gleich in allen drei Praxen" statt "Tarif 590 — gleich...").

## D./E. Interne Links & Anker (Ist bestätigt, 1 Verbesserung)

Bereits vorhanden und belassen:
- Homepage -> Hub mit Anker "TCM Zürich" (genau 1x, breit); Standort-Karten
  verlinken weiterhin direkt auf City/Oerlikon/Höngg (spezifisch).
- Hub -> alle 3 Spokes (Karten + Fliesstext) + /standorte/zuerich/kosten/.
- Jeder Spoke -> Hub mit kontextuellem Anker ("Teil unseres Netzwerks für
  Akupunktur & TCM in Zürich" bzw. "Netzwerk TCM Zürich"), kein Linkblock.
- Auch massage-zuerich/-oerlikon und die Kosten-Seite verlinken auf den Hub.

Neu: Der gestrippte Stuffing-Absatz wurde durch die §7C-Sektion "Welcher
Standort passt zu dir?" ersetzt: 3 Sätze Patient-Guidance mit akkurater
Geografie (City = Innenstadt, Oerlikon = Zürich Nord/Bahnhof Oerlikon,
Höngg = Westen/Kreis 10) und je einem Link pro Spoke. Stärkt die Router-Rolle
des Hubs mit natürlichem Text statt Keyword-Liste.

## F. Homepage-Änderungen

Keine nötig: Genau ein breiter "TCM Zürich"-Anker zeigt auf den Hub, die
Karten zeigen spezifisch auf die Quartiere. Signale sind sauber getrennt.

## G. Standortseiten-Änderungen

Keine. Prüfung der "generischen" Zürich-Phrasen ergab: Jede generische
Erwähnung ist entweder der gewollte Hub-Backlink-Anker oder ein Patienten-
Zitat mit Quartier-Bezug ("Akupunktur in Zürich-Oerlikon"). Kein
De-Optimierungs-Bedarf; Quartier-Modifier dominieren Title/H1/Copy bereits.

## H. Kosten-Seite

Bleibt eng auf Kosten-Intent. 2 Fixes: Meta-Description ohne Em-Dash
umformuliert, 1 sichtbarer Em-Dash im Fliesstext ersetzt. (Die verbleibenden
Treffer in beiden Seiten sind CSS-Kommentare, unsichtbar.)

## I. Englische Seiten

/en/locations/zuerich-{city,hoengg,oerlikon}/: englische Titles
("Acupuncture & TCM in Zürich City"), self-canonical, korrektes
hreflang-Paar (en <-> de-CH) mit x-default auf die DEUTSCHE Seite. Damit
konkurrieren sie nicht um deutsche Zürich-Intents. Kein EN-Zwilling des Hubs
vorhanden, entsprechend kein hreflang am Hub, korrekt. Keine Änderungen.

## J. Canonicals & Schema

- Alle Seiten self-canonical, keine Spoke-Kanonisierung auf den Hub
  (bewusst unterlassen, §14).
- Hub-Schema: MedicalClinic OHNE eigene Strassenadresse, mit areaServed
  Stadt/Kanton Zürich und den 3 echten Praxen als department-MedicalClinics
  (inkl. deren URLs/PLZ). Funktional ein Location-Group-Schema; stellt den
  Hub nicht als einzelne physische Praxis dar. Belassen.
- Spokes: eigenes LocalBusiness-/Standort-Schema mit realen Adressen,
  unverändert. Keine Adressen/Öffnungszeiten erfunden.
- FAQ-Schema am Hub gedeckt durch sichtbares FAQ ("Das Wichtigste in Kürze").

## K. Redirects

Keine ausgeführt, keine empfohlen. Jede Seite hat eigenständigen lokalen
Wert; das Overlap-Problem ist ein Ownership-/Anker-Thema, kein Duplikat.

## L. Build/Audit

Build clean. Sitemap unverändert 417 URLs (keine neuen Zürich-URLs).
health-audit 0/0/0. Titles/H1s im Zürich-Set alle unterschiedlich. Kein
noindex eingeschleppt, Robots unverändert. Buchungs-Links/Tracking (WhatsApp,
tel, OneDoc, GTM) unangetastet. Renders 1440/1024/768/390 der zwei
geänderten Seiten ohne Overflow/Konsolenfehler. Navigation/Suche
unterscheiden die drei Standorte eindeutig ("Zürich City/Oerlikon/Höngg").

## Geänderte Dateien

- src/data/akupunktur-tcm-zuerich-body.html (Stuffing-Absatz -> "Welcher
  Standort passt zu dir?"-Guidance)
- src/pages/standorte/zuerich/kosten/index.astro (Meta ohne Em-Dash)
- src/data/zuerich-kosten-body.html (1 sichtbarer Em-Dash ersetzt)
