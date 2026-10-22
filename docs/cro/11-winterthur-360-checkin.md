# Winterthur Marktgasse & Münzgasse: identisches TCM 360°-Angebot wie St. Gallen (22.10.2026)

Inhaber-Bestätigung 22.10.2026: beide Winterthurer Praxen (Marktgasse 78, Münzgasse 2) sind offen. Beide erhalten den
kostenlosen TCM 360°-Check-in exakt wie St. Gallen. Keine eigenen Winterthur-Angebote, keine Sonderaktionen, keine OneDoc-Kalender
(keine verifizierten Links), keine erfundenen Öffnungszeiten für die Münzgasse.

## Vorher / Nachher

| Bereich | Vorher (main `d6e741ab`) | Nachher |
|---|---|---|
| `locations.ts` Münzgasse | `status: 'review'`, `openingNote: 'Status under review'`, `vorab` «Winterthur Münzgasse – Anfrage (Standort in Prüfung)» | `status: 'operational'`, kein `vorab`, `openingHours: []` (nicht bestätigt, bleibt leer) |
| `CHECKIN_FREIGABE` | nur `st-gallen` | + `winterthur-marktgasse`, `winterthur-muenzgasse` (Beleg «Inhaber-Auftrag 22.10.2026») |
| Check-in-Wortlaut (`kontakt-form.ts`) | `CHECKIN_SG`, nur für festen Standort St. Gallen (`SG360`) | `CHECKIN_360`, für jeden festen freigegebenen Standort (`freigabe360`); globale Kachel `data-kf-360-*` |
| Globales Formular (`kontakt-form.js`) | 360°-Wortlaut nur bei `data-id="st-gallen"` | 360°-Wortlaut bei jedem Ziel mit `data-checkin="1"` |
| Standortauswahl (alle globalen Formulare, EN Finder) | «Winterthur Münzgasse (Standort in Prüfung)», Zielart Anfrage | «Winterthur Münzgasse», Zielart Behandlung + Check-in |
| Server `/api/anfrage` | Münzgasse: nur `STANDORT_ANFRAGE`; Marktgasse: nur `ERSTTERMIN_BEHANDLUNG` | beide: `TCM_CHECKIN` + `ERSTTERMIN_BEHANDLUNG` (altes Anfrage-Ziel → 422 `invalid_standort`) |
| `/standorte/winterthur-muenzgasse/` | Status-Hülle «Passende Praxis anfragen», Eyebrow «Standort in Prüfung», Hero/Intro/Meta «wird derzeit geprüft» | reguläre Standortseite: obere Box + #kontakt mit Ersttermin (60 Min.) und Kostenloser TCM 360°-Check-in (30 Min., CHF 0.–), Hero/Intro/Meta neutral mit Münzgasse 2 |
| `/standorte/winterthur-marktgasse/` | nur Ersttermin; FAQ «Münzgasse … derzeit in Prüfung»; «Zwei Adressen» mit Prüfungs-Hinweis | Ersttermin + 360°-Check-in; FAQ und «Zwei Adressen» ohne Status, beide Praxen mit denselben Terminarten |
| Sticky-Bar | zweizeiliges Primärlabel («Termin anfragen» / «Auch als Gratis 360°-Check») nur SG | zusätzlich auf beiden Winterthurer Standortseiten; Ziel bleibt `#anfrage-box` |
| Standortkarten (23 Seiten: Home, Standorte-Hub, Therapie-Leaves, 4 Standort-Leaves, 5 Methodenseiten) | «Standort in Prüfung» | «Altstadt, Münzgasse 2» |
| Massage-Karten (10 Massage-Seiten) | «Standort in Prüfung, Termine aktuell nicht bestätigt …» | «Zweite Adresse in der Altstadt, wenige Gehminuten von der Marktgasse.» |
| `/akupunktur-in-der-naehe/` | Münzgasse «Standort in Prüfung» | «Altstadt, Münzgasse 2» |
| EN `locations-content.ts` Münzgasse | «currently under review» | neutral, zweite Winterthurer Praxis |

Unverändert: Angebots-IDs `TCM_CHECKIN` / `ERSTTERMIN_BEHANDLUNG`, Mail-Betreff (`terminBetreff`), Erfolgstexte, dataLayer-Verträge
`formular_senden` / `form_submit` (einmal je erfolgreicher Sendung, `standort` = Standort-ID), `phone_click` / `wa_click` / `onedoc_click`,
UTM/GCLID-Übernahme, OneDoc nur St. Gallen, Kampagnen-IDs. Alle anderen Standorte: Build-Diff nur Sticky-Skript bzw. Standortauswahl.

## Bewusst nicht gemacht

- Kachel-Reihenfolge: wie in St. Gallen bleibt «Ersttermin mit Behandlung» erste, der Check-in zweite Kachel (Inhaber-Entscheid #59/#81,
  Tests prüfen diese Reihenfolge). Ein Tausch nur für Winterthur würde vom SG-Muster abweichen; auf Wunsch eine Zeile in `kontakt-form.ts`.
- Keine Öffnungszeiten Münzgasse, kein MedicalClinic-`openingHours`, kein OneDoc für Winterthur.
- i18n-Fingerprints nicht aktualisiert (siehe unten).

## Tests und Gates (Build `npm run build`, 895 URLs)

| Gate | Ergebnis |
|---|---|
| `check-kontakt-formular` | 0 Fehler (147 Prüfungen; neu: Münzgasse/Marktgasse + Check-in/Ersttermin → 200, altes Prüfungs-Ziel → 422) |
| `test-kontakt-formular` (Browser) | siehe PR (Abschnitt S: beide Winterthurer Seiten mit 360°-Kacheln, keine Statushinweise; Home: Winterthur-Ziele mit 360°-Wortlaut) |
| `test-anfrage-betreff` | 86 PASS / 0 FAIL |
| `test-en-analytics` | 48 passed / 0 failed (T7 angepasst: Winterthur zwei operative Praxen, kein Review-Standort mehr) |
| `check-clinic-status` | 0 Fehler (Eröffnungs-Simulation nur noch Oerlikon/Basel) |
| `check-standort-ux`, `check-first30`, `health-audit`, `check-professional`, `check-entscheidungsfragen`, `check-wissen-neun` | 0 Fehler |
| `check-i18n --strict` | 19 Outdated (main: 1, `location:winterthur-marktgasse`). Neu durch diesen PR: `location:winterthur-muenzgasse`, `hub:locations`, `page:contact`, `page:near-me`, `page:home`, 11 `therapy:*` (Standortkarte «Altstadt, Münzgasse 2» in den Therapie-Leaves). Keine Fingerprint-Updates ohne EN-Review (docs/i18n.md). |

Angepasste Test-Fixtures (keine Assertion abgeschwächt): Prüfungs-Hülle Münzgasse entfällt (kein `review`-Standort mehr),
Münzgasse-Serverfälle von Anfrage auf Check-in/Ersttermin, Check-in-Zielvergleich reihenfolgeunabhängig, T7 ohne Review-Standort.
