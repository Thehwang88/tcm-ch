# PR #105 – Abschluss (05.11.2026)

## Explizit gewünschter Check-in an einem Ziel ohne Check-in-Angebot
- Ziel ohne Check-in: zum Beispiel Basel (nur Ersttermin) oder ein globales Formular mit einem Standort ohne Freigabe.
- Ein expliziter Check-in-Wunsch löst dort die Terminart-Auswahl. Das gilt für alle Aufrufwege: `data-kf-terminart="checkin"`, `?terminart=checkin` als Direktlink, `window.kfGoto(…, { terminart: 'checkin' })`.
- Ein automatisch gewählter Ersttermin bleibt damit **nicht** als scheinbare Erfüllung des Wunsches stehen.
- Hinweis an der Auswahl: «Der kostenlose TCM-Check-in ist derzeit nur in … verfügbar. Bitte wähle eine Terminart.»
  - Globale Formulare zeigen stattdessen den bestehenden Standort-Hinweis (kein Doppelhinweis).
- Weitere Regeln:
  - Die automatische Ersttermin-Vorauswahl überschreibt diesen Zustand nicht, auch nicht nach einer generischen CTA oder einem Standortwechsel.
  - Eingaben bleiben erhalten.
  - Erst eine bewusste Wahl entfernt den Hinweis.
  - Generische CTAs behalten eine gültige manuelle Wahl.
  - Vormerkung und Routing sind unverändert.
- Regressionstests: `scripts/test-formular-vorauswahl.mjs`, Abschnitt C (Direktlink Basel) und Abschnitt G (CTA, Standortwechsel, Vormerkung, Kontrolle generische CTA).

## EN-Review Basel (`location:basel`)
- Die DE-Änderung in `src/data/standorte.ts#standorte.basel` betrifft nur `praxisBilder`, also die Visualisierungen in «Über die Praxis» der DE-Seite.
- `/en/locations/basel/` nutzt aus der DE-Quelle nur `hero.image` (`basel-reception.webp`, unverändert, als «Illustrative image» gekennzeichnet) und keine `praxisBilder`.
- Inhalte der EN-Seite (Adresse, Texte, FAQ, Bilder) sind gegenüber main unverändert. Der Build-Vergleich zeigt nur das gemeinsame Sticky-Skript.
- Die Galerie betrifft bewusst nur DE.
- Deshalb wurde ausschliesslich der Fingerprint `location:basel` aktualisiert; das Ergebnis von `--update` für andere Schlüssel wurde verworfen.
- Vorbestehend und separat: Warnung `condition:menstrual-issues` (`src/data/symptom-leaves/zyklusbeschwerden.html`, älter als dieser PR). Nicht angefasst.

## Tracking-Befund (keine Änderung in diesem PR)
- GTM-PZ92Q3KJ leitet GA4 `form_submit` aus `gtm.formSubmit` ab, ergänzt um GA4 Enhanced Measurement.
- Das ist ein **Absendeversuch**, keine bestätigte Anfrage.
- Er wird auch bei leerem bzw. ungültigem Formular und ohne Serveraufruf ausgelöst. Live geprüft am 03.11.2026: 2× `form_submit` plus eine Ads-Conversion je Versuch.
- Die bestätigte Anfrage (`formular_senden` bzw. `form_submit` nach Server-OK im dataLayer) wird von GTM nicht an GA4 weitergeleitet.
- Dieser PR ändert weder GTM noch GA4.
- Aus den Formularänderungen wird **kein** Conversion-Uplift abgeleitet. Ändern sich die GA4-Zahlen nach dem Release, kann das auch an der neuen Pflichtprüfung (Name) liegen, die Absendeversuche beeinflusst.
