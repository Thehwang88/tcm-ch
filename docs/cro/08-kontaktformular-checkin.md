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

## Server-Vertrag `/api/anfrage`
- Neue IDs `TCM_CHECKIN`, `ERSTTERMIN_BEHANDLUNG` (aus `kontakt-angebote.mjs`): Pflicht nur gültige Telefonnummer (7–15 Ziffern, `+41`, `0041`, internationale Vorwahlen, Leerzeichen) und nicht leerer Standort. Name, E-Mail, Anliegen optional; eine angegebene E-Mail wird validiert (422 `invalid_email`). Check-in nur für freigegebene Standorte (422 `invalid_offer_scope`), ohne Standort 422 `missing_standort`.
- Mail an termine@tcm.ch: Anfrageart / Terminart / Angebots-ID zuoberst, Betreff-Suffix « · TCM-Check-in» bzw. « · Ersttermin mit Behandlung». `reply_to` nur bei angegebener E-Mail. Keine Patientenmail (gab es nie).
- Historische IDs `FIRST30_WINTER_2026_SG`, `…_WARTELISTE`, `ERSTTERMIN_REGULAER_SG` bleiben mit unveränderten Regeln gültig (offene Browser-Tabs), werden von keinem Formular mehr gesendet.
- Honeypot, Turnstile, Formular-Präfix im Betreff unverändert.

## Tracking (Franca) — Code-Seite, keine GTM/GA4/Ads-Änderung
| Event | Vorher | Nachher |
|---|---|---|
| `formular_senden` | home.js-Familie + SG-Hero, nach HTTP-ok (auch Honeypot-Antwort) | gleiche Flächen, **genau einmal nach `res.ok && data.ok`**, Honeypot sendet nicht; Parameter `form_type`, `quelle` unverändert, **neu** `terminart` (`checkin`/`behandlung`) und `standort` (Ortsname) |
| `form_submit {form_id:'terminform', herkunft}` | TerminForm, **vor** dem Versand (zählte Fehlversuche, T1) | nur nach Server-Bestätigung; neu `terminart`, `standort`. gtag-Fallback unverändert |
| `first30_*` | SG-Kampagne | entfällt für neue Anfragen |
| `phone_click` | bestehender Name (Zürich-CTAs) | auch am Anruf-Button: `{quelle:'kontaktformular', form_instance, standort}` |
| `onedoc_click` | – (nur Widget-eigene Events) | **neu** am Button «Freie Termine ansehen»: `{quelle:'kontaktformular', form_instance, standort}`; der Link zeigt weiterhin auf `#online-buchen`, bestehende Klick-Trigger auf diese URL greifen weiter |
| `quelle` | `launch-hero-sg`, `sg-kontakt-bottom`, Pfad, `Beschwerde: …`, `Therapie: …`, `?quelle=` | unverändert |

Keine Telefonnummern, E-Mails, Namen oder Anliegen in Events. **Für Franca zu prüfen** (nicht im Repo sichtbar): (1) Wenn GTM `form_submit` als Conversion zählt, sinkt die Zahl ab Release auf echte Erfolge (T1-Korrektur, Lernphase Ads). (2) Etwaige Trigger/Tabellen auf `first30_*` oder `angebot = FIRST 30 …` liefern ab Release nichts mehr. (3) `terminart`/`standort` als Event-Parameter optional als Dimension anlegen. (4) GTM-Formular-Trigger auf `name="Hero-Gratis-30min-StGallen"` bleiben möglich (Name erhalten).

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
