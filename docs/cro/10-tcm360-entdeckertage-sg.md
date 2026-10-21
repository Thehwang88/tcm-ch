# TCM 360° Entdeckertage St. Gallen (Herbst Special)

Stand 21.10.2026 · Branch `claude/affectionate-cannon-ktqrkm` · Draft-PR, **nicht gemerged, nicht deployed**. Google Ads unverändert.

Fortlaufendes Angebot für Neupatient:innen am Standort St. Gallen (`/standorte/st-gallen/`), betrieben in echten Buchungsrunden.
Erste Runde: **22.–31.10.2026**. Der reguläre kostenlose TCM-Check-in (30 Minuten) bleibt unverändert und läuft parallel weiter.

## 1. Status: AKTIV im Anfrage-Modus (Inhaber-Freigabe 21.10.2026)

Inhaber-Entscheid 21.10.2026: kommerzielles Angebot, Format ca. 20 Minuten und Patienten-Wortlaut freigegeben; Launch als **Anfrage-Modus** (`bookingMode: 'anfrage'`), weil reservierte 360°-Termine/Personal nicht dokumentiert sind. Im Anfrage-Modus: 360°-Termine nur als unverbindliche Anfrage, Rundenzeile immer «360°-Termine auf Anfrage · unverbindlich», keine Kapazitäts-/Restzahl-Texte, keine Runde «offen für bestätigte Termine»; die Runden-ID wird nur intern zur Messung zugeordnet. Wechsel in den Kontingent-Modus erst mit `capacityConfirmed` + `reservierteTermine` (verifiziert).

<details><summary>Ursprünglicher Status vor der Freigabe</summary>


`src/data/herbst-sg.ts` → `offerActive: false`. Das Gate `node scripts/check-herbst-sg.mjs` lässt `offerActive: true` nur zu, wenn alle
`approvals` auf `true` stehen. Bis dahin rendert der Build **kein** Kampagnen-Markup (regulärer SG-Hero, reguläre Sticky-Bar).

| Freigabe (`approvals`) | Was bestätigt werden muss | Wer | Beleg (Stand 21.10.2026) |
| --- | --- | --- | --- |
| `formatConfirmed` | Das 360°-Format ist operativ lieferbar und werberechtlich geprüft: 5-Themen-Konstitutionscheck (Schlaf/Erholung, Stress/Wohlbefinden, Energie/Müdigkeit, Verdauung/Körpergefühl, Schmerzen/Bewegung; Hauptanliegen priorisiert), Zungen-/Pulsdiagnostik durch qualifizierte Fachperson, Fragen beantworten, Praxis-Einblick. Vorschlag **ca. 20 Minuten**; passt das nicht, Scope kürzen oder Praxis-Einblick separat terminieren. Die Dauer wird **erst nach dieser Freigabe** angezeigt (`dauerText`). Der reguläre 30-Minuten-Check-in wird nicht verändert. | Praxisleitung SG, Inhaber | **offen** – keine schriftliche Bestätigung im Repo; benötigt: Bestätigung, dass 5-Themen-Kurzcheck + Zungen-/Puls + Fragen + Praxis-Einblick in ca. 20 Min. lieferbar sind (oder gekürzter Scope), plus werberechtliche Prüfung des Wortlauts (Name, Datum). |
| `capacityConfirmed` | Separat reservierte 360°-Termine und Personal je Buchungsrunde (Eintrag `reservierteTermine` in `tcm360-runden.json`). Ohne Kontingent keine Kapazitätsaussage. | Praxisleitung SG | **offen** – `reservierteTermine: null` in `tcm360-runden.json`; benötigt: Anzahl separat reservierter 360°-Termine und zuständige Fachpersonen für 22.–31.10.2026 (Eintrag + `verifiziertAm/-Von`). |
| `claimsReviewed` | Rundenfrist («Aktuelle Buchungsrunde bis 31.10.2026»), Kapazitätstext, Abgrenzung zum regulären Check-in, «360°» = ganzheitliche TCM-Sicht (keine medizinische Untersuchung). | Inhaber / Compliance | **offen** – Texte liegen in §4 vor; benötigt: Freigabe (Name, Datum). |
| `privacyReviewed` | Felder `kampagne`, `runde`, UTM (nur Zuordnung, keine Gesundheitsdaten) in Datenschutzerklärung/Consent abgedeckt. | Datenschutz | **offen** – Felder `kampagne`, `runde`, `utm_*` (nur Zuordnung, keine Gesundheitsdaten) gegen die Datenschutzerklärung prüfen; benötigt: Freigabe oder Ergänzung (Name, Datum). |

</details>

Belege (Stand 21.10.2026): `formatConfirmed` = Inhaber-Freigabe 21.10.2026 (Angebot, Format, Konzept; keine unabhängige werberechtliche Prüfung); `claimsReviewed` = Inhaber-Freigabe des Wortlauts + Gate (keine Diagnose-/Garantie-/Knappheits-Claims); `privacyReviewed` = Prüfung gegen Datenschutzerklärung Ziff. 2/3/7 (Kontaktformular, Resend, Turnstile, GA4/GTM nach Einwilligung), Felder `kampagne`/`runde`/`utm_*` = Zuordnungsdaten der Anfrage, keine Gesundheits-/Kontaktdaten an Werbeplattformen, keine Textänderung nötig; `capacityConfirmed` = **offen** (Praxisleitung SG) → Anfrage-Modus.

Weitere offene Entscheide:
- **Buchungsintegration**: OneDoc liefert keine Live-Restzahl per API. «Noch X 360°-Termine verfügbar» bleibt deaktiviert (`live.remaining: null`), bis eine verlässliche, aktuelle Zahl gepflegt werden kann (≤ 24 h vor dem Build).
- **Operativer Funnel** (Anfrage → bestätigter Termin → Erscheinen → Erstbehandlung): im internen System je `Buchungsrunde` (Mail-Block «Technische Angaben») führen; Vorlage `docs/cro/st-gallen-weekly-log-template.csv`.
- **GTM/GA4**: neue dataLayer-Events `kampagne_cta_click`, `kampagne_sheet_open` und die Zusatzparameter `kampagne`, `cta_position`, `buchungsrunde` am bestehenden `formular_senden` sind im dataLayer vorhanden, aber in GTM noch nicht als Variablen/Events angelegt (Franca, nach Freigabe; keine Änderung an bestehenden Triggern nötig).

## 2. Betrieb: Buchungsrunden (Datei, kein Admin-Dashboard)

`src/data/tcm360-runden.json` wird vom Team gepflegt, **ohne Änderung der Anwendungslogik**. Es gibt **keine Admin-Oberfläche**: jede Änderung ist ein Commit auf `main` und wird erst mit dem dadurch ausgelösten Cloudflare-Build (ca. 60 s) wirksam. Vorher lokal `node scripts/check-herbst-sg.mjs` nach `npm run build` (Gate prüft IDs, Zeiten, Status, Zähler).

| Feld | Bedeutung |
| --- | --- |
| `id` | eindeutige Kennung, nur `a-z0-9-` (z. B. `runde-2026-10`); landet im Formularfeld `runde`, im dataLayer (`buchungsrunde`) und in der Mail |
| `start` / `ende` | tatsächlicher Buchungszeitraum, ISO mit Offset (CEST `+02:00` bis 25.10.2026, danach CET `+01:00`) |
| `status` | `geplant` (bestätigte nächste Runde) · `offen` · `beendet` |
| `reservierteTermine` | separat reservierte 360°-Termine der Runde, `null` = kein Kontingent → kein Kapazitätstext |
| `bestaetigteBuchungen` | gegen die Agenda verifiziert, nur mit `verifiziertAm` / `verifiziertVon`; ≥ `reservierteTermine` = Runde ausgebucht |
| `hinweis` | optionaler geprüfter Anzeigetext statt Standardtext |

Anzeige-Regeln (Build **und** Client mit aktueller Uhrzeit, `pickRunde`):
- Runde `offen` und jetzt innerhalb `start…ende` → **«Aktuelle Buchungsrunde bis 31.10.2026»** (+ «Spezielle 360°-Termine – begrenzte Kapazität» nur mit `reservierteTermine`).
- keine aktuelle, aber bestätigte spätere Runde → **«Nächste Buchungsrunde ab dd.mm.yyyy»**.
- sonst neutral, **ohne Verfügbarkeitszusage** → **«360°-Termine auf Anfrage · unverbindlich»** (Angebot bleibt anfragbar, kein Kontingent-/Fristtext, Feld `runde` leer). Ein offener Browser-Tab kippt beim Rundenende minütlich in diesen Status; eine danach gesendete Anfrage geht ohne `runde` raus.
- Runde zur Laufzeit ausgebucht (Build davor): Kapazitätszeile verschwindet, Rundenzeile bleibt wahr, Anfrage bleibt möglich (nach dem nächsten Build: Sold-out-Variante des Sheets).
- Runde ausgebucht → Sheet mit ehrlichem Hinweis, Erstbehandlung vorgewählt, regulärer Check-in weiterhin wählbar.
- Nie: Verlängern einer alten Runde, Resets, erfundene Restplätze, «letzte Chance», CHF-Vergleiche, Blinken, «Angebot endet endgültig».

Angebot beenden: `offerActive: false` (Build ohne Kampagnen-Markup). Eine neue Runde = **neuer Eintrag** mit neuer `id`.

## 3. Umsetzung (bestehende Komponenten, nichts dupliziert)

- `src/data/herbst-sg.ts` – Schalter, Freigaben, Zustände, Copy. `src/data/tcm360-runden.json` – Runden.
- `src/components/HerbstBannerSG.astro` – neon-grüner Banner direkt unter dem einzeiligen Header (scrollt mit; mobil kompakt, Desktop als Reihe).
- `src/components/HerbstSheetSG.astro` – `<dialog>`: mobil Bottom Sheet, Desktop zweispaltiges Modal (links Foto, Name, Erklärung, vier Bausteine, Reassurance, Abgrenzung, Runde; rechts Formular). Kampagnen-Sticky (mobil, ersetzt die reguläre Bar via `data-no-sticky-cta`, gleiche Sichtbarkeitslogik: erst nach der oberen Buchungsbox, aus bei unterem Formular/OneDoc, Eingabefokus, Tastatur, offenem Sheet, Menü). Öffnet nie automatisch.
- Formular = gemeinsamer Renderer `renderKontaktForm({ herbst })` (`src/lib/kontakt-form.ts`), Instanz `sg-herbst`: Validierung, Turnstile (explizit beim Öffnen gerendert), Versand `/api/anfrage`, Conversion `formular_senden` genau 1× (kontakt-form.js) unverändert; Felder Telefon (Pflicht) → Name → Terminwunsch, E-Mail/Anliegen eingeklappt; Kacheln «Gratis TCM 360°-Check» (vorgewählt) / «Direkt zur Erstbehandlung»; OneDoc/Anrufen/WhatsApp-Alternativen wie in der oberen SG-Box.
- Kennungen: `kampagne=sg_tcm360_herbst_2026`, `runde=<id>`, `quelle=herbst-sg`, `formular=TCM360-Entdeckertage-StGallen`, `quelle_detail=… · CTA: herbst-banner|herbst-sticky`, UTM aus URL/sessionStorage. Angebots-IDs bleiben `TCM_CHECKIN` / `ERSTTERMIN_BEHANDLUNG`.
- Server (`functions/api/anfrage.js`): Kampagne nur mit bekannter ID + Standort st-gallen; 360°-Check-in wird als «Gratis TCM 360°-Check (Entdeckertage)» klassifiziert (Betreff `… · TCM 360°`, keine Dauer-Zeile), `Buchungsrunde`/UTM im Block «Technische Angaben». Unbekannte Kennung → normale Anfrage. Regulärer Check-in unverändert (Betreff «… Kostenloser TCM-Check-in · 30 Min.»).
- Tracking (nur dataLayer, kein gtag, keine PII): `kampagne_cta_click {kampagne, cta_position, standort}`, `kampagne_sheet_open {…, buchungsrunde}`, `formular_senden` wie bisher + `kampagne`, `cta_position`, `buchungsrunde`. Telefon-Sticky löst nur `kampagne_cta_click` (herbst-sticky-phone) aus; der bestehende GTM-Link-Trigger bleibt alleiniger Phone-Click.
- Gates: `scripts/check-herbst-sg.mjs` (Modell, Konfiguration, dist, Sheet, API), `scripts/check-kontakt-formular.mjs` (Kampagnen-Blöcke ausgeklammert, dritte SG-Instanz erlaubt), `scripts/test-herbst-sg.mjs` (Browser, Vorschau-Build).

## 4. Finale Launch-Copy (Deutsch, Du-Form)

**Banner (mobil + Desktop)**
- Label: ST. GALLEN · HERBST SPECIAL
- Zeile: TCM 360°-Check für CHF 0.–
- Subline: Ganzheitlicher TCM-Kurzcheck, Zungen- & Pulsdiagnostik und persönliche Fragen.
- CTA: Gratis 360°-Termin anfragen →
- Rundenzeile: Aktuelle Buchungsrunde bis 31.10.2026 (+ « · Spezielle 360°-Termine – begrenzte Kapazität» nur mit Kontingent) · nach Rundenende ohne Folgerunde: 360°-Termine auf Anfrage · unverbindlich · bestätigte Folgerunde: Nächste Buchungsrunde ab dd.mm.yyyy

**Sticky (mobil)**: Gratis 360°-Check → · Telefon-Icon «Praxis St. Gallen anrufen» (+41 77 523 61 22)

**Bottom Sheet (mobil)**
- Eyebrow: ST. GALLEN SPECIAL
- Heading: Dein TCM 360°-Termin
- Subline: Kostenloser ganzheitlicher TCM-Kurzcheck – persönlich und unverbindlich.
- ✓ Persönlicher TCM-Konstitutionscheck · ✓ Zungen- und Pulsdiagnostik · ✓ Antworten auf deine TCM-Fragen · ✓ Praxis und Behandlungsmöglichkeiten kennenlernen
- Terminart: **Gratis TCM 360°-Check** (vorgewählt) · CHF 0.– [· ca. 20 Minuten nur nach Freigabe] · Ganzheitlicher TCM-Kurzcheck, Zungen- und Pulsdiagnostik, deine Fragen und ein Einblick in die Praxis. · Ohne Behandlung, ohne Verpflichtung. / **Direkt zur Erstbehandlung** · 60 Minuten · kostenpflichtig, nach Tarif · Gespräch, TCM-Diagnostik und erste Behandlung. Zusatzversicherung je nach Police.
- Felder: Telefonnummer * (Wir rufen dich zur Terminvereinbarung zurück.) · Dein Name · optional · Terminwunsch · optional · Weitere Angaben · optional (E-Mail, Anliegen)
- Button: Gratis 360°-Termin anfragen → (bei Erstbehandlung: Erstbehandlung anfragen →)
- Darunter: Mit deiner Anfrage ist noch kein Termin gebucht. · Datenschutz · Rundenzeile · Die Entdeckertage laufen in Buchungsrunden mit separat reservierten 360°-Terminen. Der reguläre kostenlose TCM-Check-in (30 Minuten) bleibt in St. Gallen unabhängig davon anfragbar.
- Bestätigung: Danke, deine Anfrage ist bei uns. Deine Anfrage: Gratis TCM 360°-Check in St. Gallen (Entdeckertage). Wir rufen dich zur Terminvereinbarung zurück. Mit deiner Anfrage ist noch kein Termin gebucht.

**Desktop-Modal, linke Spalte**
- Foto Praxis St. Gallen (Empfangsbereich, bestehendes Bild)
- Label: St. Gallen · TCM 360° Entdeckertage · Titel: TCM 360° Entdeckertage · Exklusiv in St. Gallen · für Neupatientinnen und Neupatienten
- Dein persönlicher TCM 360°-Check – CHF 0.–
- Entdecke die Traditionelle Chinesische Medizin bei einem persönlichen Kennenlerntermin. Wir betrachten wichtige Aspekte deines Wohlbefindens aus Sicht der TCM, geben dir einen Einblick in die traditionelle Zungen- und Pulsdiagnostik und beantworten deine Fragen.
- ✓ Persönlicher TCM-Konstitutionscheck · ✓ Traditionelle Zungen- und Pulsdiagnostik · ✓ Frag den TCM-Experten · ✓ Exklusiver Praxis-Einblick
- Kostenlos · Unverbindlich · Keine Behandlungspflicht
- Keine Akupunktur, Massage oder andere Behandlung inbegriffen. Keine Behandlungspflicht. [Dauer ca. 20 Minuten – nur nach Freigabe]
- 360° steht für die ganzheitliche Sicht der TCM: ein kurzer, auf dein Hauptanliegen fokussierter Kurzcheck, keine umfassende medizinische Untersuchung. Er ersetzt keine ärztliche Diagnostik und dient der persönlichen Orientierung aus Sicht der TCM.
- Rundenzeile + Abgrenzungstext wie oben

Nicht verwendet (bewusst): Countdown, Restplatz-Zahlen ohne Live-Daten, CHF-Vergleichswerte, «Medizinische Ganzkörperuntersuchung», «Gesundheitscheck», «Komplettdiagnose», «Früherkennung», Qi/Yin-Yang/Meridiane, Heilversprechen, TCM-Kompass/Discovery-Experience.

Sold-out-Variante (Runde ausgebucht): Sheet-Heading «Termin in St. Gallen anfragen», Subline «Die 360°-Termine der aktuellen Buchungsrunde sind vergeben.», Hinweis «Die separat reservierten 360°-Termine dieser Buchungsrunde sind vergeben. Du kannst weiterhin einen Ersttermin mit Behandlung oder den regulären kostenlosen TCM-Check-in anfragen, Termin nach Verfügbarkeit.», Erstbehandlung vorgewählt, Banner-/Sticky-CTA «Termin anfragen».

## 4a. Tracking: GTM/GA4-Mapping für Franca

Alles läuft über `window.dataLayer.push` (GTM-PZ92Q3KJ), kein `gtag`, keine Personendaten, keine Beschwerden. Status: **code-getestet** = in `scripts/test-herbst-sg.mjs` gegen den dataLayer geprüft (Mock-API, GTM blockiert); **live-verifiziert** = in GTM Preview/GA4 DebugView nach dem Deploy durch Franca zu bestätigen (noch offen).

| dataLayer-Event | Parameter | Zweck | GTM-Mapping (Vorschlag) | Status |
| --- | --- | --- | --- | --- |
| `formular_senden` (bestehend, unverändert, genau 1× nach Server-OK) | `form_type`, `quelle=herbst-sg`, `terminart` (checkin/behandlung), `standort=st-gallen` **+ neu** `kampagne=sg_tcm360_herbst_2026`, `cta_position` (herbst-banner/herbst-sticky), `buchungsrunde` (z. B. runde-2026-10, leer ohne Runde) | **einzige Primär-Conversion** (GA4 Key Event + Google Ads Conversion wie bisher) | bestehender Trigger unverändert; neue Data-Layer-Variablen `kampagne`, `cta_position`, `buchungsrunde` als Event-Parameter an den bestehenden GA4-Event-Tag hängen; GA4: `kampagne` und `buchungsrunde` als benutzerdefinierte Dimensionen (Event) anlegen | code-getestet (320/375/390/1280: genau 1 Event, Attribution korrekt, keine PII) · live: offen |
| `kampagne_cta_click` | `kampagne`, `cta_position` (herbst-banner, herbst-sticky, herbst-sticky-phone), `standort` | Engagement/Funnel-Schritt 1 | neuer Custom-Event-Trigger → GA4-Event `kampagne_cta_click` mit denselben Parametern; **kein** Key Event, **keine** Ads-Conversion | code-getestet · live: offen |
| `kampagne_sheet_open` | `kampagne`, `cta_position`, `standort`, `buchungsrunde` | Funnel-Schritt 2 (Sheet/Modal geöffnet, nie automatisch) | wie oben; **kein** Key Event, **keine** Ads-Conversion | code-getestet · live: offen |
| Telefon-Sticky (`tel:` Link) | – | bestehender GTM-Link-Click-Trigger für `tel:` bleibt alleinige Phone-Click-Messung; zusätzlich nur `kampagne_cta_click` mit `cta_position=herbst-sticky-phone` | keine neue Conversion | code-getestet (kein zusätzliches `phone_click`) · live: offen |
| `onedoc_click`, `phone_click` (Formular), `wa_click` | bestehend | unverändert, Sheet-Instanz `form_instance=sg-herbst` | unverändert | bestehend |

Prüfschritte live (Franca): GTM Preview auf `/standorte/st-gallen/` → Banner-CTA → Sheet → Testanfrage (Mail an termine@tcm.ch mit Block «Technische Angaben»: Kampagne, Buchungsrunde, UTM) → in GA4 DebugView genau ein `formular_senden` mit `kampagne`/`cta_position`/`buchungsrunde`; Google-Ads-Conversion zählt weiterhin nur dieses Event. Auswertung je Runde: GA4 Exploration nach `buchungsrunde`, operativ nach Mail-Zeile «Buchungsrunde».

## 4b. Kontrollierter Live-Test (nach Deploy, vor Freigabe des Trackings)

Ohne Zugriff auf GTM/GA4 ist das Tracking **nicht live-verifiziert**; die Events sind nur code-getestet (dataLayer, Mock-API). Ablauf für Franca:
1. GTM Preview (Container GTM-PZ92Q3KJ) auf `/standorte/st-gallen/?utm_source=test&utm_medium=qa&utm_campaign=tcm360_qa` öffnen.
2. Banner-CTA klicken → `kampagne_cta_click` {kampagne, cta_position=herbst-banner, standort}; Sheet öffnet → `kampagne_sheet_open` {…, buchungsrunde}. Beide **ohne** Conversion-Tag.
3. Testanfrage senden: Telefonnummer der Praxis, Name «TEST QA», Terminwunsch «TEST – bitte ignorieren». Die Mail an termine@tcm.ch trägt Formular `TCM360-Entdeckertage-StGallen`, Kampagne, Buchungsrunde, UTM im Block «Technische Angaben» → Team löscht den Test-Lead sofort (keine Buchung, kein CRM-Eintrag).
4. GA4 DebugView: genau **ein** `formular_senden` mit `quelle=herbst-sg`, `terminart=checkin`, `standort=st-gallen`, `kampagne`, `cta_position`, `buchungsrunde`; keine Personendaten; Google-Ads-Conversion zählt nur dieses Event (bestehender Trigger, keine neue Conversion-Aktion).
5. Gegenprobe reguläres Hero-Formular (Check-in und Ersttermin): `formular_senden` mit `quelle=launch-hero-sg`, ohne Kampagnenparameter, genau 1×.
6. Ergebnis in diesem Dokument unter §4a als «live-verifiziert (Datum, Name)» eintragen.

## 4c. Erfolgsmessung (operativ)

| Stufe | Quelle | Kennzahl |
| --- | --- | --- |
| Promotions-Klicks | GA4 `kampagne_cta_click` (nach `cta_position`) | Klicks Banner / Sticky / Telefon-Sticky |
| Sheet/Modal geöffnet | GA4 `kampagne_sheet_open` | Öffnungen je Runde (`buchungsrunde`) |
| Anfragen | GA4 `formular_senden` mit `kampagne=sg_tcm360_herbst_2026` (nach `terminart`, `buchungsrunde`) + Mail-Zeile «Kampagne» | Anfragen 360°-Check vs. Erstbehandlung |
| Bestätigte Termine | Praxis-Agenda (OneDoc) / Rückruf-Protokoll, Spalte «Buchungsrunde» im Wochen-Log (`docs/cro/st-gallen-weekly-log-template.csv`) | bestätigte 360°-Termine je Runde (≤ `reservierteTermine`) |
| Erschienene Neupatient:innen | Praxis-Agenda (Status «erschienen») | Erscheinungsquote |
| Erstbehandlungen | Praxis-Agenda / Abrechnung (Tarif 590) nach dem 360°-Termin | Konversion 360° → Erstbehandlung |

Eine Anfrage ist **kein** erschienener Neupatient; nur Agenda-/Abrechnungsdaten zählen für die letzten drei Stufen. Die verifizierten Buchungen je Runde fliessen als `bestaetigteBuchungen` (+ `verifiziertAm/-Von`) zurück in `tcm360-runden.json`.

## 4d. Aktivierungs-Diff (erst mit allen Belegen)

In **einem** Commit auf einem Launch-Branch, danach `npm run build && node scripts/check-herbst-sg.mjs` (Gate verweigert `offerActive: true` ohne alle Freigaben):

```ts
// src/data/herbst-sg.ts
offerActive: true,
approvals: { formatConfirmed: true, capacityConfirmed: true, claimsReviewed: true, privacyReviewed: true },
```
```json
// src/data/tcm360-runden.json · runde-2026-10
"reservierteTermine": <bestätigte Zahl>, "verifiziertAm": "<Datum>", "verifiziertVon": "<Name>"
```
Dazu die Belege (Name, Datum, Quelle) in §1 eintragen. Dauer «ca. 20 Minuten» erscheint automatisch mit `formatConfirmed`; `dauerMin` nur ändern, wenn die Praxis eine andere Dauer bestätigt.

## 5. QA

Vorschau-Build (nur lokal): `HERBST_SG_PREVIEW=active npm run build` (weitere Zustände: `soldout`, `live`, `between`, `next`).

```
HERBST_SG_PREVIEW=active node scripts/check-herbst-sg.mjs
node scripts/check-kontakt-formular.mjs
node scripts/test-kontakt-formular.mjs
node scripts/check-standort-ux.mjs
node scripts/check-first30.mjs
node scripts/test-herbst-sg.mjs dist --shots docs/qa/tcm360-sg
npm run build && node scripts/check-herbst-sg.mjs        # Produktion: kein Kampagnen-Markup, solange offerActive/Freigaben fehlen
```

Screenshots: `docs/qa/tcm360-sg/` (1 Banner + Sticky mobil 320/375/390, 2 Bottom Sheet mobil + Tablet 768, 3 Desktop-Banner + Modal 1280, 4 Bestätigung). Schriften im Headless-Build: System-Fallback (Google Fonts blockiert), Layout sonst identisch.

Zustands-Screenshots (alle fünf Vorschau-Zustände × 320/375/390/768/1280/1440, Banner / Sticky / Sheet bzw. Modal): `node scripts/shots-herbst-sg.mjs <state> dist --out docs/qa/tcm360-sg/states` nach dem jeweiligen Vorschau-Build; prüft je Zustand Rundenzeile, Kapazitätszeile, CTA-Texte, Vorauswahl und Kacheln (ausgebucht → Erstbehandlung vorgewählt, regulärer Check-in statt 360°-Kachel, Ausverkauft-Hinweis).

Ergebnisse 21.10.2026 (lokal, Chromium headless):
- `test-herbst-sg.mjs` (Vorschau-Build `active`): **96 / 96 bestanden** (inkl. Turnstile-Regression: render() wirft einmal → Wiederholung; wirft dauerhaft → Hinweis role=alert + «Erneut versuchen»; Absenden ohne bereite Prüfung abgefangen; Skript nicht geladen; Rundenende im offenen Tab; Runde zur Laufzeit ausgebucht) (320/375/390 px: Banner unter dem Header, Sticky-Verhalten inkl. Tastatur/Formular-Stopps, Sheet öffnen/schliessen/Esc/Backdrop/Fokus, Validierung, Versand mit Kampagne/Runde/UTM/CTA-Position, genau 1 `formular_senden`, Bestätigung; Sticky- und Telefon-CTA; Fehlerfall; Hero-Formular unverändert; Desktop-Modal 1280 und Tablet 768; Rundenablauf per Client-Uhr; Wil/Rorschach/Zürich Oerlikon/Homepage ohne Kampagne).
- `check-herbst-sg.mjs`: Vorschau-Build und Produktions-Build bestanden. Produktion: kein Kampagnen-Markup (offerActive false, Freigaben offen).
- `check-kontakt-formular.mjs`, `check-standort-ux.mjs`, `check-first30.mjs`: 0 Fehler (Vorschau und Produktion).
- `test-kontakt-formular.mjs` Produktions-Build: alle SG-Sticky-/Formular-Tests bestanden; 8 Fehler in den Hero-Video-Assertionen (Abschnitt N, `figure#sg-hero-media`/`standort-stgallen.jpg`) bestehen bereits auf `main` seit dem Hero-Video-Umbau (#81) und sind von dieser Änderung unabhängig. Vorschau-Build: SG-Sticky-/Hero-Layout-Abschnitte werden bei aktiver Kampagne übersprungen (Abdeckung in `test-herbst-sg.mjs`), Rest identisch.
