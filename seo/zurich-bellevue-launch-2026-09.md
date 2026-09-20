# Zürich Bellevue Launch (20.09.2026)

## A. Route

/standorte/zuerich-bellevue/ (neu), vierter Zürcher Spoke im Hub-&-Spoke-System
unter /akupunktur-tcm-zuerich/. Keine weiteren Bellevue-URLs (keine Kosten-/
Massage-/FAQ-/Quartier-Seiten, Stop-Regel).

## B. Template

Pre-Opening-Template von /standorte/basel/ bzw. /standorte/luzern/ (das
kanonische Muster des Repos für angekündigte Standorte, selbst auf dem
St.-Gallen-CRO-Layout). Oerlikon diente als Referenz für das Ziel-Layout;
da Bellevue aber noch nicht operativ ist (keine Öffnungszeiten, kein Team,
keine Buchung), wäre das Oerlikon-Vollformat faktenwidrig gewesen. Identisches
visuelles System (lu-Hero, USP-Grid, svc-Karten, city-grid, FAQ, CTA-Band).

## C. Eröffnungs-Status

In Geschäftsdaten NICHT als operativ verifiziert. Umsetzung als Pre-Launch:
Badge "In Vorbereitung", Formulierung "entsteht an der Rössligasse 8 ...
Weitere Informationen zur Terminverfügbarkeit folgen", KEIN Eröffnungsdatum,
keine Fake-Urgency. CTA = bestehender Wartelisten-Flow (siehe H unten).

## D. Verifizierte Daten

Nur: Name "TCM.ch Zürich Bellevue", Adresse Rössligasse 8, 8001 Zürich, CH.
Wiederverwendet aus Repo-Daten: zentrale Netzwerk-Kontakte (+41 77 523 61 22,
termine@tcm.ch; auf allen Standorten identisch), Netzwerk-Preis-/Kassen-Fakten
(Tarif 590, EMR/ASCA, 80-100%). NICHT erfunden: Öffnungszeiten, Etage, Zugang,
Parken, Tram-Details, Therapeut:innen, Eröffnungsdatum, Standort-Therapieliste
(Therapien-Sektion ist explizit als Netzwerk-Angebot mit "was am Bellevue
verfügbar ist, kommunizieren wir zur Eröffnung" gerahmt).

## E. Title / Meta / H1

- Title: TCM & Akupunktur Zürich Bellevue | TCM.ch
- H1: TCM & Akupunktur in Zürich Bellevue
- Meta: "TCM und Akupunktur in Zürich Bellevue: TCM.ch entsteht an der
  Rössligasse 8, 8001 Zürich, mitten im Kreis 1. Jetzt auf die Warteliste
  für die ersten Termine."

## F. Intent-Ownership

Besitzt NUR: tcm/akupunktur (zürich) bellevue, tcm kreis 1, Rössligasse-Intent.
Generisches "TCM/Akupunktur Zürich" bleibt beim Hub (im Seitenkopf-Kommentar
und in der CSV festgeschrieben); Altstadt-/Kreis-1-Sprache nur wo geografisch
korrekt (Rössligasse liegt in der Altstadt auf der Seeseite des Kreis 1).

## G. Overlap-Audit Bellevue vs. Zürich City

Beide liegen in 8001/Kreis 1, Risiko dokumentiert (CSV: overlapping_urls =
/standorte/zuerich-city/, risk low). Abgrenzung in BEIDEN Richtungen textlich
explizit: City = Achse Hauptbahnhof/Bahnhofstrasse/Paradeplatz (bestehende
Seite unverändert), Bellevue = Seeseite, Bellevueplatz, Opernhaus, Altstadt.
Eigene FAQ "Was ist der Unterschied zu eurem Standort Zürich City?" macht die
Trennung auch für Google lesbar. Keine kopierten Lokal-Textbausteine (Seiten
manuell verglichen; City-Copy nicht wiederverwendet).

## H. Buchung / CTA

Keine Buchung für Bellevue live -> KEIN Buchungs-CTA. Wiederverwendet wurde
der bestehende Wartelisten-Flow der Pre-Opening-Standorte (POST /api/anfrage,
Turnstile, dataLayer-Event formular_senden/warteliste) mit
quelle=warteliste-zuerich-bellevue, standort="Zürich Bellevue". Für sofortige
Termine verweist die Seite auf Oerlikon/Höngg. Kein Tracking geändert, nur die
bestehende quelle-Konvention um den neuen Wert erweitert.

## I. Hub-Integration (/akupunktur-tcm-zuerich/)

- 4. Standort-Karte (8001 · Rössligasse 8, Kreis 1 · Warteliste offen,
  "Standort ansehen" statt "Termin prüfen").
- "Welcher Standort passt?"-Guidance um einen Bellevue-Satz ergänzt.
- Meta-Description, Hero-Sub, Trust-Zeile und 2 FAQ-Antworten (sichtbar +
  FAQPage-Schema im .astro synchron) von "City, Oerlikon und Höngg" auf die
  Vierer-Liste erweitert.
- MedicalClinic-Schema: 4. department (TCM.ch Zürich Bellevue inkl. Adresse).
- Primäre Keyword-Ownership des Hubs unverändert, kein Rewrite.

## J. Standorte-Hub + Navigation

- /standorte/: Bellevue-Karte in der Zürich-Gruppe direkt nach Zürich City
  (bestehende Reihenfolge-Logik, einmalig, Desc "Rössligasse 8, Kreis 1 ·
  Warteliste offen").
- Drawer (Standorte & Kliniken) und Footer-Standortliste: je 1 Link ergänzt
  (Standort-Navigation ist site-weit; ohne Eintrag wäre Bellevue der einzige
  Standort ausserhalb der Navigation).
- Homepage bewusst NICHT angefasst (Stop-Regel; Hub ist der Router).

## K. Schema

Bellevue-Seite: MedicalClinic MIT verifizierter PostalAddress (anders als
Basel, dort fehlt die Adresse und das Schema wurde weggelassen), telephone/
email = zentrale Netzwerk-Kontakte, parentOrganization TCM.ch; BEWUSST OHNE
openingHours und OHNE geo (nicht verifiziert). Dazu BreadcrumbList + FAQPage
(gedeckt durch sichtbares FAQ). locations.ts (EN/Nearest-Logik verlangt geo):
Stadtzentrum-Näherung identisch zum bestehenden zuerich-city-Eintrag
wiederverwendet, im Code kommentiert; keine neuen Koordinaten erfunden.

## L. Sitemap

417 -> 419. +1 DE (/standorte/zuerich-bellevue/) und +1 EN
(/en/locations/zuerich-bellevue/, siehe O). Keine Slash-Duplikate.

## M. Master-Keyword-Map

Neue Zeile /standorte/zuerich-bellevue/ (location, live, PRIMARY_OWNER,
primary "tcm zürich bellevue", secondary akupunktur zürich bellevue/tcm
bellevue/akupunktur bellevue/tcm kreis 1, supporting Hub, overlapping
zuerich-city, risk low, Anker "TCM Zürich Bellevue") mit Notiz zur
Nie-generisch-Regel.

## N. Suchindex

Die Bibliotheks-Suche indexiert keine Standortseiten (kein Standorte-Loop in
buildSearchIndex) -> bewusst nichts ergänzt, kein zweites Suchsystem gebaut.
Standort-Navigation (Hub-Karten, /standorte/, Drawer, Footer, EN-Liste)
führt Bellevue eindeutig gelabelt ("Zürich Bellevue", keine Duplikate).

## O. EN / hreflang

EN-Twins sind im Repo systematisch: /en/locations/[slug].astro generiert aus
locations.ts für ALLE Standorte inkl. Pre-Opening (Basel, Luzern, City).
Der locations.ts-Eintrag erzeugt den Twin daher automatisch:
/en/locations/zuerich-bellevue/ (Title "Acupuncture & TCM in Zürich Bellevue",
self-canonical) + korrektes hreflang-Paar de-CH/en mit x-default auf die
deutsche Seite (auf beiden Seiten verifiziert). Die 8 Em-Dashes auf der
EN-Seite stammen aus dem bestehenden EN-Template (Basel identisch), nicht aus
dieser Änderung.

## P. Build / Audit

Build clean. health-audit 0/0/0, keine doppelten Titles/H1s (Bellevue-Titel
einzigartig). DE-Seite: self-canonical, indexierbar (kein robots-Meta), 0
sichtbare Em-Dashes, in seo/index-queue.md unter "Offen" (gleicher Commit).
Renders 1440/1024/768/390 von Bellevue, Zürich-Hub und /standorte/ ohne
Overflow und ohne Konsolenfehler. Kein Redirect, keine bestehende Zürich-Seite
über die dokumentierten Link-/Listen-Ergänzungen hinaus verändert.

## Geänderte/neue Dateien

src/pages/standorte/zuerich-bellevue/index.astro (neu),
src/data/locations.ts, src/data/site.ts, src/data/standorte-body.html,
src/data/akupunktur-tcm-zuerich-body.html, src/pages/akupunktur-tcm-zuerich.astro,
src/data/header.html, src/data/footer.html, seo/master-keyword-url-map.csv,
seo/index-queue.md, seo/zurich-bellevue-launch-2026-09.md
