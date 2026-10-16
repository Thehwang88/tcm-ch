# Standortseiten nach der St.-Gallen-Vorlage (16.10.2026)

Status: Draft-PR, nicht gemergt, nicht deployed. Branch `layout/standorte-sg-vorlage` (Basis `main` 8f2dfabc).
St. Gallen ist die visuelle Master-Vorlage und bleibt selbst unverändert. OneDoc und der kostenlose TCM-Check-in bleiben St. Gallen vorbehalten.

## Referenz: gerenderte deutsche SG-Seite (Reihenfolge aus dem Code)
Quelle: `src/pages/standorte/[slug].astro` (Legacy-Leaf `src/data/standort-leaves/st-gallen.html` + Umbauten) und `src/components/HeroStandardSG.astro`.

1. Hero `lsr-hero hlsg`: Eyebrow, H1, Lead, drei Vertrauenspunkte, «Ersttermin anfragen» (#offer-form) + «Termin direkt online buchen» (OneDoc), «Anrufen · WhatsApp», Praxisfoto rechts
2. USP-Reihe kompakt (`.sgu`)
3. Kontaktsektion (`.sgk`): «Über die Praxis» links (Adresse, Öffnungszeiten, Telefon, E-Mail, Karte, Anreise-Accordion, Links), Anfragebox rechts (gemeinsames Formular, schwarzer Kopf, neongrüner Button); mobil Box zuerst
4. Hinweis «Du weisst nicht, welche Behandlung du brauchst?»
5. Therapien (svc-Karten, «Weitere Therapien»)
6. Team (klinische Leitung + zwei lokale Therapeutinnen in einem Raster)
7. Beschwerden «Wobei können wir helfen?» (svc-Karten + CTA)
8. Transparenz, 9. Krankenkasse (CHF 130–160, SG-Kostenseite), 10. Praxen in der Nähe
11. WhatsApp-Band (Corinna), 12. FAQ «Fragen zu deinem ersten Termin» (kk-Accordion)
13. Unteres Formular (eine Spalte), 14. OneDoc-Widget, 15. «Weiterlesen» (kompakte Textlinks)
Mobile Sticky-Leiste: aus im Hero und bei der oberen Box, an nach dem Box-Ende, aus bei #kontakt/#online-buchen, Eingabefokus und Bildschirmtastatur.

## Inventar Standortseiten
| URL | Renderer / Datenquelle | Betriebsstatus | Team (therapeuten.ts) | Leistungen (standorte.ts) | Formular | Sonderfunktionen |
|---|---|---|---|---|---|---|
| /standorte/st-gallen/ | Legacy-Leaf + HeroStandardSG | operativ | Kim (Leitung), Reinhart, Lenggenhager | 8 inkl. Physio | gemeinsames Formular oben (sg-hero) + unten (sg-unten), Check-in | **Master**; OneDoc, Check-in, Google-Bewertungslink |
| /standorte/basel/ | data-driven | operativ (ohne Öffnungszeiten) | Janine Trebes (Standortleitung) | 8 | gemeinsames Formular | FAQ 7, Einzugsgebiet, «auf einen Blick», Massage-/Wissen-Link |
| /standorte/kreuzlingen/ | data-driven | operativ, Partnerpraxis Praxis Hwang | Ken Uehara | 12 inkl. Physio | gemeinsames Formular | FAQ 8, Betreiber-Schema, Massage-/Wissen-Link |
| /standorte/frauenfeld/ | data-driven | operativ, Partnerpraxis Praxis Hwang | Muschal, Lee Tremmel, Seiler, Kim | 12 inkl. Physio | gemeinsames Formular | FAQ 8, «auf einen Blick», Betreiber-Schema |
| /standorte/rorschach/ | data-driven | operativ | keins | 9 inkl. Physio | gemeinsames Formular | keins |
| /standorte/volketswil/ | data-driven | operativ | keins | 9 inkl. Physio | gemeinsames Formular | keins |
| /standorte/wil/ | data-driven | operativ | keins | 9 inkl. Physio | gemeinsames Formular | keins |
| /standorte/winterthur-marktgasse/ | data-driven | operativ | keins | 9 inkl. Physio | gemeinsames Formular | FAQ 6, Praxisfoto, Massage-/Wissen-Link |
| /standorte/winterthur-muenzgasse/ | data-driven | **in Prüfung** | 5 zugeordnet, nicht angezeigt | 9 inkl. Physio | Anfrage-Hülle (pruefung) | Praxisfoto (nicht angezeigt) |
| /standorte/zuerich-hoengg/ | data-driven | operativ, Partnerpraxis Praxis Hwang | keins | 9 inkl. Physio | gemeinsames Formular | Betreiber-Schema |
| /standorte/zuerich-oerlikon/ | data-driven | **geplant** (1.12.2026, nicht final) | keins | 8 | Vormerk-Hülle (vorbereitung), Partnerpraxis als Sofort-Option | FAQ 5, «Zwei Praxen in Oerlikon» |
| /standorte/bottighofen/ | Legacy-Leaf | operativ, Partnerpraxis TCM Pelican | Emanuela Pelican | Leaf | gemeinsames Formular | eigene Leaf-Inhalte |
| /standorte/bern/ | eigene Seite | geplant, ohne Adresse | keins | keins | Warteliste | Interesse-Formular |
| /standorte/luzern/ | eigene Seite | geplant 2027, ohne Adresse | keins | keins | Warteliste | keins |

Nicht als Standortseiten behandelt: /standorte/ (Hub), /standorte/zuerich-city/ (Intent-/Routing-Seite ohne Praxis), /standorte/*/kosten/, Stadt-Hubs und Landingpages (/akupunktur-tcm-zuerich/, /akupunktur-tcm-st-gallen/, /akupunktur-tcm-basel/, /akupunktur-in-der-naehe/, /massage-*), Partnergewinnung (/partner/…).

## Umsetzung
Eine Vorlage für alle zehn data-driven Seiten (`src/pages/standorte/[slug].astro`), gemeinsame Komponenten statt kopierter SG-Blöcke:

| Teil | Datei |
|---|---|
| Kontakt-/Praxisbereich (USP, Praxisangaben links, Box rechts, Desktop-Sticky), auch von SG genutzt | `src/components/standort/KontaktPraxis.astro` |
| Anfragekarte je Status (gemeinsames Formular bzw. bestehende Vormerk-/Prüfungs-Hülle), oben und unten | `src/components/standort/AnfrageKarte.astro` |
| FAQ im SG-Accordion | `src/components/standort/Faq.astro` |
| Hero, Team, Beschwerden, unteres Formular, USP, Praxisangaben | bestehende Komponenten in `src/components/standort/` angepasst |
| Mobile Sticky-Leiste | `src/components/StickyCtaBar.astro` (SG-Zweig nutzt jetzt auch `[data-std-box-oben]`) |
| Styles (gescoped, SG-Selektoren per `:is()` erweitert, gleiche Spezifität) | `public/home.css` |

Formulare: obere Box operativ = Instanz `standort-oben` (Karte `#anfrage-box`, kompakt wie SG-Hero, Wunschzeit optional, `quelle_detail` «Anfragebox oben», Quelle weiterhin der Seitenpfad); unten unverändert Instanz `standort` in `#kontakt`. Geplant/in Prüfung: dieselbe Hülle oben (ID-Präfix `kto-`) und unten (bisherige IDs `kt-`). Telefon bleibt im gemeinsamen Formular einziges Pflichtfeld; Hülle unverändert (Name, Telefon, E-Mail, Backend-Vertrag der Hülle). Kein OneDoc, kein Check-in (Freigaben nur in `kontakt-angebote.mjs`).

Tracking: keine neuen Events oder Listener; `formular_senden` nur nach erfolgreichem Versand, Sticky-/Hero-Klicks ohne Conversion, keine Personendaten im dataLayer. GTM/GA4/Ads unverändert.

## Begründete Ausnahmen
| Seite | Grund |
|---|---|
| /standorte/st-gallen/ | Master, bleibt unverändert (Build-Diff: nur Leerraum und das gemeinsame Sticky-Script; Pixelvergleich ohne Bilder 1440 px identisch, übrige Breiten im Rauschen) |
| /standorte/bottighofen/ | Partnerpraxis TCM Pelican als Legacy-Leaf ohne Eintrag in `standorte.ts` und ohne Betreiberdaten in `locations.ts`; Umstellung braucht Datenmigration und Freigabe der Betreiberin |
| /standorte/bern/, /standorte/luzern/ | Pre-Opening ohne Adresse, Warteliste statt Anfrage, eigene Vorlagen; für Praxisspalte, Karte und Anfragebox fehlen belegte Daten |

## Status-, Team- und Leistungsunterschiede (bewusst erhalten)
- Geplant/in Prüfung (Oerlikon, Münzgasse): Status-Banner direkt unter dem Hero, Hero-Button «Anfrage stellen» bzw. «Passende Praxis anfragen», Vormerk-/Anfrage-Hülle oben und unten, keine Teamkarten, keine Öffnungszeiten, keine Praxisfotos, keine Transparenz-Registerlinks; Physio-Verfügbarkeitshinweis jetzt auch auf Münzgasse ausgeblendet (vorher sichtbar). Schema unverändert (Münzgasse ohne MedicalClinic, Oerlikon mit Vorbereitungs-Beschreibung).
- Partnerpraxen (Kreuzlingen, Frauenfeld, Höngg): Eyebrow «Partnerpraxis im TCM.ch Netzwerk», Betreiber in Praxisangaben, FAQ und Schema; TCM.ch-Nummer als Terminkoordination.
- Team: nur Personen mit `therapeuten.ts`-Zuordnung zum Standort; Desktop SG-Kartenraster (3 Spalten, bei 4 Personen 4), mobil eine Spalte mit Querkarten. Die netzwerkweite klinische Leitung bleibt eine eigene Sektion mit dem Hinweis, dass vor Ort das Praxisteam behandelt. Kein SG-Raster «Leitung oben» auf andere Teams.
- Leistungen: unverändert aus `standorte.ts` (`therapien[]`); keine Leistung ergänzt.
- FAQ: vorhandene `faqs[]` unverändert (inkl. FAQPage-Schema). Rorschach, Volketswil, Wil, Höngg erhalten «Fragen zu deinem ersten Termin» nur aus Angaben, die bereits auf der Seite stehen (Anfragewege, Tarif 590, Zusatzversicherung, keine Überweisung, Adresse), ohne Schema. Münzgasse ohne FAQ (keine belegten Daten).
- Marktgasse: vorhandenes Praxisfoto jetzt rechts im Hero (wie SG); alle anderen behalten das Symbolbild.

## SEO und EN
- URLs, Titles, Meta, Canonicals, hreflang, H1 und JSON-LD aller zehn Seiten byte-gleich zum Basis-Build; alle internen Links erhalten (Haut-/Körpersignale-Links jetzt als kompakte «Weiterlesen»-Zeile).
- EN: keine EN-Seite inhaltlich verändert (Build-Diff nur gemeinsames Sticky-Script, dort wirkungslos). Einziger Fingerprint-Wechsel `standorte.winterthur-marktgasse` (Hero-Bild); EN nutzt dort einen eigenen Hero-Override mit demselben Bild, geprüft, danach aktualisiert.

## Prüfungen
Build, `health-audit`, `check-i18n --strict`, `test-en-analytics`, `check-kontakt-formular`, `test-kontakt-formular` (gemockte API, inkl. neuer Sektion S), `check-clinic-status`, `check-standort-ux`, `check-first30`, `check-professional`: 0 Fehler. Screenshots 320/390/768/1440 px aller elf Standortseiten ohne horizontalen Overflow.

## Offene Entscheidungen
- Bottighofen auf die Vorlage migrieren (Betreiberdaten + Freigabe nötig).
- Physiotherapie steht in `therapien[]` von Rorschach, Volketswil, Wil, Marktgasse, Höngg (und Münzgasse); bitte Angebot je Standort bestätigen.
- Seongsu Kim ist in `therapeuten.ts` Frauenfeld zugeordnet und erscheint dort im lokalen Team (bestehende Zuordnung).
- EN zeigt für Oerlikon (geplant) und Münzgasse (in Prüfung) Praxisfotos im Hero, DE bewusst nicht.
- Vormerk-/Prüfungs-Hülle verlangt weiterhin Name, Telefon und E-Mail (Backend-Pfad ohne Angebots-ID).
