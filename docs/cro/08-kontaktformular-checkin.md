# Gemeinsames Kontaktformular + kostenloser TCM-Check-in (15.10.2026)

Status: Draft-PR, nicht gemergt, nicht deployed. Ersetzt für neue St.-Galler Anfragen die FIRST-30-Mechanik (`docs/cro/07-first30-winter-2026.md`).

## Architektur
| Teil | Datei |
|---|---|
| Angebote, IDs, Check-in-Freigaben, OneDoc-Ziele (eine Quelle für Build, Server, Gates) | `src/data/kontakt-angebote.mjs` |
| Renderer + Legacy-Upgrade der erfassten Leaf-Karten | `src/lib/kontakt-form.ts` |
| Client (Auswahl, OneDoc-Weg, Validierung, Versand, Tracking, Prefill) | `public/kontakt-form.js` |
| Styles (mobile first, nur bestehende Tokens) | `public/kontakt-form.css` |
| Server-Vertrag | `functions/api/anfrage.js` |
| Gates | `scripts/check-kontakt-formular.mjs` (statisch + API), `scripts/test-kontakt-formular.mjs` (Browser), `scripts/check-first30.mjs` (geschlossener Zustand) |

## Formularinventar (gerenderter Build, vorher → nachher)
| Familie | Seiten | Quelle | Handler vorher | Nachher |
|---|---|---|---|---|
| Homepage `#home-contact-form` | 1 | `src/data/home-body.html` via `index.astro` | `home.js` `[data-contact-form]` → `formular_senden` | gemeinsames Formular, global (Standortwahl) |
| Standard-Kontaktformular `TerminForm` (`/kontakt/`, Wissen, Gesundheitsbibliothek, Körpersignale) | 269 | `src/components/TerminForm.astro` | eigenes Inline-Script → `form_submit` **vor** dem Versand | gemeinsames Formular, global; `form_submit` erst nach Erfolg |
| Leaf-Karten Beschwerden (154), Therapien (21), Standort-Übersicht `/standorte/` (1) | 176 | `src/data/symptom-leaves/*`, `*-body.html` via `SpaPage` | `submitInlineFormGeneric` → `formular_senden` | gemeinsames Formular, global (Build-Upgrade in `SpaPage`) |
| `MassageAnfrageForm` mit allgemeinem Anliegen (Basel-Landingpage, Basel-Kosten, Krankenkassen Akupunktur/Shiatsu, Ohrakupunktur) | 5 | `src/components/MassageAnfrageForm.astro` | `submitInlineFormGeneric` | gemeinsames Formular (Basel-Landingpage mit festem Standort) |
| Standortseiten, datengetrieben, operativ | 8 | `src/components/standort/KontaktForm.astro` | `home.js` `[data-contact-form]` | gemeinsames Formular, fester Standort |
| Standortseiten Legacy (St. Gallen unten, Bottighofen), SG-Landingpage | 3 | `src/data/standort-leaves/*`, `akupunktur-tcm-st-gallen-body.html` | `home.js` | gemeinsames Formular, fester Standort |
| SG-Hero (FIRST-30-Karte bzw. reguläres Hero-Formular) | 1 | `HeroLaunchSG.astro` / `HeroStandardSG.astro` | eigenes Script → `formular_senden` + `first30_*` | gemeinsames Formular rechts im 50/50-Hero |
| **Bewusst unverändert** | | | | |
| Massage-Anfragen (`anfrage_typ=massage`, Krankenkassen-Massage) | 17 | `MassageAnfrageForm` | `submitInlineFormGeneric` | unverändert: Check-in (TCM-Anamnese/Diagnostik) passt nicht zur Massage-Anfrage |
| Zürich-Routing-Funnel | 1 | `akupunktur-tcm-zuerich-body.html` | `anfrage_typ=zuerich-routing` | unverändert (eigener Routing-Vertrag) |
| Vormerk-Formulare geplanter/in Prüfung stehender Standorte (Zürich Oerlikon, Winterthur Münzgasse) | 2 | `KontaktForm.astro` | `home.js` | unverändert: keine Behandlungs- oder Check-in-Zusage für nicht offene Praxen |
| Wartelisten (Bern, Luzern, Massage Luzern), Karriere, Partner, Praxisnachfolge, Akademie, Community, QI Club, Zuweisen, Visuals, Rechner | 16 | diverse | eigene | unverändert (Spezialformulare) |
| EN (`/en/contact/`, `/en/locations/*`, near-me, zurich) | 17 | `src/components/en/AppointmentForm.astro` | `form_submit` / `form_submit_success` | unverändert; EN enthielt nie FIRST 30. Check-in auf EN erst mit freigegebener englischer Copy |

## Angebotsverfügbarkeit
| Standort | Status | Check-in | Begründung |
|---|---|---|---|
| St. Gallen | operativ | **ja** | Freigabe Inhaber-Auftrag 15.10.2026 (ersetzt FIRST 30) |
| Kreuzlingen, Frauenfeld, Zürich Höngg | operativ (Partnerpraxis Praxis Hwang) | nein | keine belastbare Freigabe im Repo; Betreiberin ist eine Partnerpraxis |
| Bottighofen, Winterthur Marktgasse, Volketswil, Rorschach, Wil, Basel | operativ | nein | keine belastbare Freigabe im Repo |
| Zürich Oerlikon, Luzern, Bern | geplant | nein | nicht offen |
| Winterthur Münzgasse | in Prüfung | nein | Betriebsstatus unbestätigt |

Freischalten: Eintrag in `CHECKIN_FREIGABE` (Name exakt wie im Formular). Server, Standortseiten, globale Auswahl und Gate folgen automatisch.

OneDoc: einziger verifizierter Kalender ist das St.-Galler Widget (`/standorte/st-gallen/#online-buchen`). Er wird nur bei «Ersttermin mit Behandlung» angeboten, auf globalen Formularen erst nach Wahl von St. Gallen. Kein Gratis-Termintyp in OneDoc verifiziert, daher läuft der Check-in immer über die Anfrage.

## Standort-Ziele und Anfrageart (Review 15.10.2026)
Quelle: `kontaktZiele()` in `src/data/kontakt-angebote.mjs`, abgeleitet aus `src/data/locations.ts` (`status`, `vorab[].art`). Dieselbe Liste speist Auswahl, Client, Server und Gates.

| Ziel (kanonischer `value`, geht unverändert an Server und Mail) | Standort-ID | Zielart | Kacheln | Button | Angebots-ID |
|---|---|---|---|---|---|
| operativer Standort (z. B. `St. Gallen`, `Basel`, Partnerpraxen Kreuzlingen/Frauenfeld/Höngg) | Slug | behandlung | Check-in (nur freigegeben) + Ersttermin | Check-in / Ersttermin anfragen | `TCM_CHECKIN` / `ERSTTERMIN_BEHANDLUNG` |
| `Zürich Oerlikon – Partnerpraxis Praxis Hwang, Schulstrasse 3` | zuerich-oerlikon | behandlung (explizit `art`) | Ersttermin (Check-in gesperrt), kein OneDoc | Ersttermin anfragen | `ERSTTERMIN_BEHANDLUNG` |
| `Zürich Oerlikon – neue Praxis Ohmstrasse 14, Termin nach Eröffnung` | zuerich-oerlikon | vormerkung | keine | Vormerkung senden | `VORMERKUNG` |
| `Luzern – Vormerkung, Eröffnung 2027` | luzern | vormerkung | keine | Vormerkung senden | `VORMERKUNG` |
| `Winterthur Münzgasse – Anfrage (Standort in Prüfung)` | winterthur-muenzgasse | anfrage | keine | Anfrage senden | `STANDORT_ANFRAGE` |
| `Andere / in meiner Nähe` | andere | routing | keine | Passende Praxis anfragen | `ROUTING_ANFRAGE` |

Bei Vormerkung, Anfrage und Routing sind die Kacheln ausgeblendet; ein neutraler Hinweis benennt die Bedeutung (Vormerkung: «Eine Behandlung oder Diagnostik vor der Eröffnung ist damit nicht verbunden.»). Bestätigung und Mail-Klassifikation folgen derselben Zielart. Prefill: exakter `value` > sichtbares Label > Standort-ID (Standardziel = letzte vorab-Option, wie bisher `PLANNED_PRESELECT`) > Altwert `<id>-<n>`; eine explizite Partnerpraxis-Auswahl springt nie auf die Vormerkung.

## Server-Vertrag `/api/anfrage`
- Neue IDs (`TCM_CHECKIN`, `ERSTTERMIN_BEHANDLUNG`, `VORMERKUNG`, `STANDORT_ANFRAGE`, `ROUTING_ANFRAGE`): Pflicht nur gültige Telefonnummer (7–15 Ziffern, `+41`, `0041`, internationale Vorwahlen, Leerzeichen) und ein **kanonisches Ziel**. Unbekannter oder manipulierter Standortwert (auch Label-Text statt `value`, Pseudo-Ziel «Zürich Oerlikon») → 422 `invalid_standort`; `standort_id`, die nicht zum Ziel passt → 422 `invalid_standort`; Angebots-ID passt nicht zur Zielart (z. B. Ersttermin für Luzern, Check-in für die Oerlikon-Partnerpraxis, Vormerkung für St. Gallen) → 422 `invalid_offer_scope`; leerer Standort → 422 `missing_standort`. Name, E-Mail, Anliegen optional; eine angegebene E-Mail wird validiert (422 `invalid_email`).
- Mail an termine@tcm.ch: Anfrageart / Terminart / Angebots-ID zuoberst, Zeilen «Standort» (kanonischer value) und «Standort-ID», Betreff-Suffix je Art (« · TCM-Check-in», « · Ersttermin mit Behandlung», « · Vormerkung», « · Standort in Prüfung», « · Routing»). `reply_to` nur bei angegebener E-Mail. Keine Patientenmail.
- Historische IDs `FIRST30_WINTER_2026_SG`, `…_WARTELISTE`, `ERSTTERMIN_REGULAER_SG` bleiben mit unveränderten Regeln gültig (offene Browser-Tabs), werden von keinem Formular mehr gesendet. Spezialformular-Verträge (Massage, Zürich-Routing, Wartelisten, Akademie, Partner, Praxisnachfolge) unverändert.
- Honeypot, Turnstile, Formular-Präfix im Betreff unverändert.

## Tracking — Code-Seite (keine GTM/GA4/Ads-Änderung)
**Ein Versandweg:** alle Events gehen ausschliesslich per `window.dataLayer.push` an GTM. Der frühere zusätzliche `gtag('event','form_submit',…)`-Aufruf des Standardformulars ist entfernt (er wäre bei vorhandenem `gtag` ein zweiter Versand gewesen; auf den gebauten Seiten definiert der Code selbst kein `gtag`).

| Event | Vorher | Nachher |
|---|---|---|
| `formular_senden` | home.js-Familie + SG-Hero, nach HTTP-ok (auch Honeypot-Antwort) | gleiche Flächen, genau einmal nach `res.ok && data.ok`, Honeypot sendet nicht; `form_type`, `quelle` unverändert; neu `terminart` (`checkin`/`behandlung`/`vormerkung`/`anfrage`/`routing`) und `standort` (**Standort-ID**, z. B. `st-gallen`, `andere`) |
| `form_submit {form_id:'terminform', herkunft}` | TerminForm, **vor** dem Versand, plus gtag-Aufruf falls vorhanden | nur nach Server-Bestätigung, nur dataLayer; neu `terminart`, `standort` (ID) |
| `first30_whatsapp_click`, `first30_cta_click`, `first30_cta_dismiss`, `first30_bottom_select`, `first30_phone_form_submit`, `first30_bottom_form_submit` | SG-Kampagne | **abgeschaltet** (Kampagnen-Hero/Pill/Wähler nicht mehr gerendert) |
| `phone_click` | bestehender Name (Zürich-CTAs) | auch am Anruf-Button: `{quelle:'kontaktformular', form_instance, standort (ID)}` |
| `onedoc_click` | – (nur Widget-eigene Events) | neu am Button «Freie Termine ansehen»: `{quelle:'kontaktformular', form_instance, standort (ID)}`; Link weiterhin `#online-buchen` |
| `quelle` | `launch-hero-sg`, `sg-kontakt-bottom`, Pfad, `Beschwerde: …`, `Therapie: …`, `?quelle=` | unverändert |

Keine Telefonnummern, E-Mails, Namen, Anliegen oder freien Standort-Texte in Events.

**Im Code und mit Mocks nachgewiesen** (`scripts/test-kontakt-formular.mjs`, gemocktes `/api/anfrage`, externe Requests blockiert): je erfolgreichem Versand genau ein logisches Conversion-Ereignis über den dataLayer, auch mit einem realistisch instrumentierten `gtag`-Stub (Argumente in den dataLayer + Aufrufprotokoll) kein zweiter Versand; 0 Ereignisse bei Validierungsfehler, API 422/500, Honeypot; Doppelklick = 1; `onedoc_click` und `phone_click` je 1×; keine Personendaten im dataLayer. Eine Mutation (zusätzlicher gtag-Aufruf) wird vom Test erkannt.

**Noch nicht geprüft — Francas GTM-/Ads-Setup** (nicht im Repo sichtbar, nichts veröffentlicht):
1. Zählt GTM `form_submit` als Key-Event/Ads-Conversion, sinkt die Zahl ab Release auf echte Erfolge (vorher inkl. Fehlversuche). Lernphase/Annotation einplanen.
2. Falls ein GTM-Tag zusätzlich auf einen gtag-Aufruf reagierte, entfällt dieser Pfad; der dataLayer-Event bleibt.
3. Trigger, Variablen oder Tabellen auf `first30_*` oder auf `angebot = FIRST 30 …` liefern ab Release nichts mehr; Berichte mit diesen Events enden am Release-Datum.
4. Neue Parameter `terminart`/`standort` (ID statt Ortsname) und das Event `onedoc_click` sind ungemappt, bis Franca sie anlegt.
5. GTM-Formular-Trigger auf `name="Hero-Gratis-30min-StGallen"` bleiben möglich (Name erhalten), sehen aber jetzt das neue Formular.
6. Ob die tatsächliche Verarbeitung (Consent/CookieYes, GA4-Key-Events, Ads-Conversion-Aktionen) korrekt einmal zählt, ist erst in GTM-Preview auf `/`, `/kontakt/` und `/standorte/st-gallen/` nachweisbar.

## Prefill
| Einstieg | Wirkung |
|---|---|
| `?standort=<id\|Name>` | Standort vorgewählt (home.js `openContactForm` + Formular) |
| `?anliegen=…&quelle=…` (Selbsttest) | Anliegen + Quelle in der Homepage-Karte |
| TerminForm: Prop, `?von=`, same-origin Referrer, `data-care-cta` | Text, Standort, Herkunft, CTA-Position wie bisher |
| Leaf-Karten | Anliegen-Text, `quelle`, `formular`, `quelle_detail`, Vorauswahl `/standorte/<id>/…` |
| `?terminart=checkin\|behandlung` | explizite Vorauswahl (neu) |
| `?first30=1`, `#first30`, `#first30-kontakt` (alte Kampagnenlinks) | sichtbarer Hinweis «Das FIRST-30-Angebot ist beendet. Neu für dich: der kostenlose TCM-Check-in.» + Check-in vorgewählt (nur SG) |
| Anker `#offer-form`, `#kontakt`, `#formular`, `#terminform`, `#online-buchen` | erhalten |
Prefill wird einmal beim Laden gesetzt; Kachelwechsel überschreiben keine Eingaben. Jede Instanz hat eigene IDs (`kf-<instanz>-…`) und eigenen Zustand.

## SG-Hero
Linke Hälfte wörtlich aus Commit `4adc79c8` (`src/components/HeroLaunchSG.astro`, 12.10.2026, letzter regulärer Stand vor `1531b7fe` FIRST 30): Eyebrow «TCM.ch Praxis · St. Gallen», H1 «Akupunktur & TCM in St. Gallen», Lead «Medizinisch fundierte TCM wenige Gehminuten vom Bahnhof St. Gallen. Wir begleiten dich persönlich, egal worum es geht.», Trust «Krankenkassen anerkannt (EMR/ASCA) · Oberer Graben 22, St. Gallen · Termin direkt anfragen», CTAs «Ersttermin anfragen» / «Termin direkt online buchen», «Anrufen · WhatsApp», Hinweis zur unverbindlichen Anfrage, Öffnungszeiten Mo–Sa 07:30–19:30 · So 08:00–17:00 (deckungsgleich mit Schema und «Über die Praxis»). Rechte Hälfte: gemeinsames Formular. `FIRST30.campaignActive = false` schaltet Kampagnen-Hero, Pill/Strip, Homepage-Tag, Leaf-Geschenk-CTAs und unteren Wähler ab.

## i18n
`src/data/locations.ts` erhielt nur das Steuerfeld `vorab[].art` (Münzgasse, Oerlikon ×2, Luzern); `value`, `label` und `labelEn` sind unverändert. Geprüft: alle 52 EN-Seiten byte-identisch zum main-Build, EN-Formulare (`AppointmentForm.astro`) nutzen die neuen IDs nicht. Daher keine EN-Textänderung nötig; die sechs betroffenen Fingerprints (hub:locations, page:contact, page:near-me, location:winterthur-muenzgasse, location:zuerich-oerlikon, location:luzern) wurden nach dieser Prüfung mit `check-i18n.mjs --update` neu erfasst.

## OneDoc auf der SG-Seite für beide Terminarten (15.10.2026, Draft)
Laut Inhaber sind auf `/standorte/st-gallen/` beide Terminarten über OneDoc buchbar, auch der kostenlose TCM-Check-in. Umgesetzt nur in den zwei SG-Formularen (Hero, unten; Option `onedocBeideTerminarten`):

| Zustand | Element (genau eines) | Ziel |
|---|---|---|
| ohne Auswahl | sekundärer Link «Termin online buchen →» | gemeinsame SG-Auswahl (eingebettetes Widget `#online-buchen`) |
| Check-in gewählt | Hauptbutton «Termin online buchen →» | gemeinsame SG-Auswahl |
| Ersttermin gewählt | Hauptbutton «Termin online buchen →» | gemeinsame SG-Auswahl |

Darunter «Direkt bei OneDoc.» und «Lieber einen Termin anfragen ↓» (Sprung zum Anfrageformular).

**Verifikation der OneDoc-Ziele:** Die angemeldete Chrome-Sitzung (OneDoc-Verwaltung) war in der Arbeitsumgebung nicht verfügbar. Öffentlich geprüft (ohne Anmeldung, ohne Buchung): Widget `7a0d6d1b…` und Praxisprofil `onedoc.ch/de/praxis-fur-alternative-medizin/st-gallen/ebfrb/tcm-ch-st-gallen` listen keine Termintypen und keine Direktlinks je Behandlungsgrund; die Behandlungsgründe lädt die Widget-App erst zur Laufzeit. Daher keine geratenen Links/Parameter, sondern der vorgesehene Fallback: gemeinsame SG-Auswahl, neutrale Beschriftung, keine behauptete Vorauswahl.

**Umschalten nach Verifikation:** In `src/data/kontakt-angebote.mjs` → `ONEDOC['st-gallen'].direkt.checkin` / `.behandlung` den in der OneDoc-Verwaltung verifizierten Direktlink eintragen. Dann wechselt die Beschriftung automatisch auf «Kostenlosen TCM-Check-in online buchen →» bzw. «Ersttermin online buchen →» (im Browser-Test mit Platzhaltern geprüft). OneDoc-Terminarten und Kalenderregeln wurden nicht verändert.

Tracking: `onedoc_click` je Klick genau einmal, neu mit `terminart` (`keine`/`checkin`/`behandlung`); keine Conversion. Homepage und andere Seiten unverändert (OneDoc dort weiterhin nur bei Behandlung + St. Gallen).

## Kompakter SG-Hero (`heroKompakt`, 15.10.2026, Draft)
Nur `/standorte/st-gallen/` Hero (`HeroStandardSG.astro`). Gleicher Renderer, gleiche Engine; unteres SG-Formular unverändert offen.
- Angebotskacheln gekürzt (alle vier Vorteile sichtbar), «Standort:» entfällt, ein OneDoc-Element «Termin online buchen →» + «Direkt bei OneDoc.» (ohne Auswahl Link, mit Auswahl Primärbutton; PR-#55-Logik).
- «Lieber Rückruf anfragen» (Button, `aria-expanded`/`aria-controls`, initial zu): Telefon * → Hinweis → «Weitere Angaben · optional» (Name, E-Mail, Anliegen, Wunschzeit) → «* Pflichtfeld» → Submit → Datenschutz → «noch kein Termin gebucht».
- Ohne JS: Buttons `hidden`, alles offen. Anker `#offer-form`, `#first30`, `?first30=1` öffnen den Bereich und fokussieren Telefon; Fehler öffnen ihren Bereich. Aufklappen pusht kein Event.
- Pfeile (Hero + unten): Text `.kf-lt` unterstrichen, `.kf-arrow` ohne Unterstreichung.
- Linke Hero-Hälfte ohne «Unverbindliche Anfrage …» und «Geöffnet: …» (Öffnungszeiten bleiben in «Über die Praxis» und im Schema).
- Kachelwahl (Zeiger, Tastatur) oder gültige Vorauswahl öffnet den Rückruf-Bereich automatisch – ohne Fokuswechsel, Scrollsprung oder Tastatur-Popup; der Öffnungsbutton verschwindet, der Bereich bleibt für den Seitenbesuch offen. «Lieber Rückruf anfragen» öffnet ohne Terminart (Fokus auf den Bereich, nicht auf Telefon).
- Feldanker `#kf-sg-hero-fields` wie `#offer-form`: Laden, Klick (auch erneut), Hash-Wechsel → offen, Telefon fokussiert und unter dem Sticky-Header sichtbar.
- Schrittmarker «1 Terminart wählen» (ersetzt die Einleitung) und «2 Online buchen oder Rückruf anfragen» (über OneDoc, keine Sperre). Auswahl: gefülltes Radio, Rahmen + Mint, 180 ms Transition, Hover-Rahmen nur bei `(hover: hover)`, keine Grössenänderung. Erstes Öffnen von Rückruf/optionalen Angaben: 180 ms Ein-Blenden (Opazität/Versatz, keine Max-Höhe); nicht beim Laden; `prefers-reduced-motion: reduce` ohne Animation.

| Viewport | Hero vorher → nachher | Karte vorher → nachher | OneDoc-Y vorher → nachher |
|---|---|---|---|
| 1440×900 | 1734 → 974 | 1545 → 785 | 740 → 644 |
| 390×844 | 2419 → 1526 | 1691 → 900 | 1431 → 1218 |
| 320×700 | 2650 → 1768 | 1898 → 1117 | 1627 → 1440 |

## SG-Formulare: Reihenfolge und Aktionshierarchie (15.10.2026)
Beide SG-Formulare (Hero + unten, `onedocBeideTerminarten`): 1 Terminart → 2 Rückruf-Anfrage (Telefon *, optionale Angaben, neongrüner Anfrage-Button, Datenschutz/Hinweis) → Trennlinie «Oder direkt online buchen» + OneDoc als umrandeter Sekundärbutton «Termin online buchen →» / «Direkt bei OneDoc.» → «Lieber anrufen?». OneDoc immer sichtbar (auch ohne Wahl), nie gefüllt; Ziel-/Fallback-Logik (PR #55) unverändert. Hero: Schritt 2 heisst «Rückruf anfragen», Aufklapp-Logik bleibt nur im Hero; unteres Formular vollständig offen ohne Schrittmarker, Sprunglink «Lieber einen Termin anfragen ↓» entfällt (Felder stehen jetzt davor).

## SG: Hero mit Praxisfoto, USP-Reihe, Kontaktsektion (16.10.2026, Draft)
`HeroStandardSG.astro`: Hero = Text (unverändert) + ursprüngliches Foto `/images/standort-stgallen.jpg` (4adc79c8), Höhe nach Inhalt. Darunter die drei Leaf-USPs als kompakte Reihe und `#sg-kontakt-praxis`: Buchungsbox (dieselbe Instanz `sg-hero`, `#offer-form`, alle Identifier) + «Über die Praxis» (aus dem Leaf verschoben, nicht kopiert; Foto dort entfernt). DOM/Mobile: Box vor Praxisangaben; ab 1024 px Praxis links, Box rechts. Sticky nur ab 1024 px, wenn die ganze Box unter dem Header ins Fenster passt und die Praxisspalte ≥ 120 px länger ist (ResizeObserver; Auswahl/Aufklappen/Fehler schalten automatisch ab). USP-CTA-Wiederholung entfällt.

## SG-Formulare: Rückruf offen, ruhige Gestaltung (16.10.2026, Draft)
- `rueckrufOffen` (nur `sg-hero`): Rückruf-Felder im HTML offen, kein «Lieber Rückruf anfragen»; «Weitere Angaben · optional» im HTML eingeklappt (ohne JS per noscript offen). Ohne Auswahl «Termin anfragen →»; Terminart beim Absenden Pflicht (Fehler an der Auswahl, Fokus darauf).
- `ruhig` (beide SG-Formulare, CSS nur `.kf--ruhig`): weisse Box mit weichem Schatten, Kacheln ohne Schatten (Gratis sehr leicht mint, Ersttermin weiss), Auswahl = dunkler Rand + gefülltes Radio; Angebotszeile «Kostenloser TCM-Check-in · 30 Minuten» statt Badge; Überschriften «Terminart wählen» / «Rückruf anfragen» statt Schrittmarker; «Telefonnummer *» (roter Stern); Datenschutz als kompakter Link; ohne Zusatzversicherungs-Unterzeile, «Kostenlos · ohne …», langen Datenschutztext, «noch kein Termin gebucht» und ohne «Lieber anrufen?» (Anrufwege im Hero und bei den Praxisangaben). Check-in-Beschreibung «…, ohne Behandlung.» Erfolgsmeldungen unverändert.
- Angebot (beide SG-Formulare, `ruhig`, Stand 16.10.2026): «Ersttermin mit Behandlung» zuerst (dezent mint): «Deine Beschwerden besprechen, mit TCM-Diagnostik einordnen und direkt mit der ersten Behandlung starten.» / «Mit persönlicher Empfehlung für das weitere Vorgehen.» (vom Inhaber bestätigt). Danach «Noch unsicher? Kostenloser TCM-Check-in» (weiss): «30 Minuten für deine Fragen und eine persönliche Einschätzung, ob TCM zu deinem Anliegen passt.» / «Inklusive Zungen- und Pulsdiagnostik, persönlicher Empfehlung und Krankenkassen-Check.» / «Ohne Behandlung.» Ersetzt Badge, Angebotszeile und Leistungsliste. Schlüssel `behandlung`/`checkin` und Angebots-IDs unverändert; FIRST-30-/Check-in-Prefill wählt weiter `checkin`; Validierungsfokus auf die erste sichtbare Option.
- `ohneOnedocAlternative` (nur `sg-unten`): kein OneDoc-Alternativbereich im unteren Formular (endet nach Anfragebutton + Datenschutz); das Widget `#online-buchen` folgt direkt darunter. Obere Box behält den umrandeten OneDoc-Button.
- `kontaktLinks` (nur `sg-hero`): unter OneDoc dezente Textlinks «Anrufen · WhatsApp» (tel:+41775236122, kanonisches SG-WhatsApp-Ziel mit neutralem Text wie im Hero); Überschrift «Oder direkt Kontakt aufnehmen». Tracking: Anrufen → `phone_click` (quelle kontaktformular, über `data-kf-tel`), WhatsApp → bestehendes globales `wa_click` (home.js, quelle `form`); je Klick genau ein Event, keine Conversion, keine Personendaten. Unten weiterhin ohne Alternativbereich.

## SG Mobile: Sticky-CTA-Bar und Kontaktlink-Icons (16.10.2026, Draft)
- `StickyCtaBar.astro` (bestehende globale Bar, keine zweite Leiste): Zweig nur für `/standorte/st-gallen/` mit oberer Box. Sichtbar erst, wenn das tatsächliche Ende der Box `[data-kf-instance="sg-hero"]` über dem oberen Rand liegt (ResizeObserver/IntersectionObserver + rAF-gedrosselter Scroll, deckt aufgeklappte Felder/Fehler ab); aus, sobald `#kontakt` oder `#online-buchen` im Bild ist, bei fokussiertem Eingabefeld oder Bildschirmtastatur (visualViewport < 75 %). Verborgen = `inert` + `aria-hidden` (nicht klick-/tabbar). Initial verborgen (CSS), Neuentscheid bei Scroll/Resize/Fokus/pageshow/hashchange. Primär «Ersttermin anfragen» → `#offer-form` (obere Box, bestehendes Anker-/Fokusverhalten). Beschriftungen, übrige Ziele und Tracking unverändert (WhatsApp `wa_click` quelle sticky). Andere Seiten: bisherige Logik.
- Kontaktlinks oben (Mobile ≤ 767 px): dekorative Bestands-Icons (Telefonhörer aus `kontakt-form.ts`, WhatsApp-Logo aus `StickyCtaBar`), 17 px, Linkfarbe, `aria-hidden`; Desktop ohne Icons.

## DE-Homepage Mobile: Sticky-Bar und Formularsektion (16.10.2026, Draft)
`StickyCtaBar.astro`, nur Pfad `/`: Die bisherige Hero-CTA-Logik bleibt Basis; zusätzlich verborgen (inert + aria-hidden), solange irgendein Teil von `section#home-contact-form` (Intro, Formular inkl. dynamischer Felder/Fehler/Erfolgsmeldung) im Bild ist, bei fokussiertem Eingabefeld und offener Bildschirmtastatur. Beobachtung per IntersectionObserver/ResizeObserver + rAF-gedrosseltem Scroll, Neuentscheid bei Fokus, visualViewport, pageshow, load, hashchange. Ziele (`/kontakt/` → Formular-Scroll mit Prefill), WhatsApp/Anrufen und Tracking unverändert.
