# Conversion-Funnel-Audit & Welle 1 — 23.09.2026

Scope: 2 Template-CTA-Korrekturen + fehlendes WhatsApp-Klick-Tracking. Kein generelles CRO, kein SEO, keine Formular-/API-/GTM-Änderungen.

## A. Funnel-Struktur (gesund, unverändert)

Körpersignal → Beschwerde → Therapie/Treatment-Intent-Artikel → Standort → Buchung/Kontakt. Redaktioneller Funnel und Related-Arrays unangetastet; KEINE neuen kommerziellen Links in Körpersignale.

## B. High-Traffic-Körpersignale

Stichproben der Top-Seiten (u.a. hitzegefuehl-ohne-fieber, durchfall-am-morgen, finger-morgens-steif): verlinken bereits auf die passenden Beschwerden-Owner; direkte kommerzielle Links sind nicht nötig und wurden nicht ergänzt.

## C. Gefundene CTA-Friktion (behoben)

Der Mid-Page-CTA "Termin anfragen" führte auf /kontakt/, obwohl dieselbe Seite bereits ein vorausgefülltes TerminForm mit id="formular" rendert und der mobile StickyCta bereits auf #formular zeigt (unnötiger Seitenwechsel, Prefill-Verlust).

- src/pages/koerpersignale/[slug].astro: href /kontakt/ → #formular
- src/pages/gesundheitsbibliothek/fragen/[slug].astro: href /kontakt/ → #formular
- CTA-Text, Styling, Formular, Prefill, Platzierung: unverändert. Übrige /kontakt/-Links (Nav/Footer) unangetastet.

## D. WhatsApp-Tracking-Lücke (behoben)

StickyCta trackte bereits event 'whatsapp_click' (quelle 'sticky_cta'); die WhatsApp-Buttons in den Mid-Page-CTA-Karten nicht. Ergänzt mit identischem Event und defensivem StickyCta-Muster (window.dataLayer=window.dataLayer||[] + gtag-Fallback):

- Körpersignale-CTA: {event:'whatsapp_click', quelle:'koerpersignal_content_cta'}
- Fragen-CTA: {event:'whatsapp_click', quelle:'frage_content_cta'}

wa.me-Ziel, Prefill-Text, target="_blank", rel="noopener": unverändert. StickyCta selbst: unverändert. Kein neues Event erfunden.

## E. Form-Conversion-Tracking-Inkonsistenz — NUR DOKUMENTIERT

REQUIRES GA4/GTM VERIFICATION BEFORE CHANGE

1. TerminForm.astro (Zeile ~188): pusht 'form_submit' (form_id 'terminform') VOR der Bestätigung durch /api/anfrage (feuert also auch bei fehlgeschlagenem Submit).
2. public/home.js (Zeile ~46, SPA-Handler submitInlineFormGeneric): pusht 'formular_senden' NACH erfolgreicher Response (.then nach fetch-Erfolg).
3. HeadAnalytics.astro (Kommentar Zeile ~4): beschreibt, dass Form-Submit über den GTM-Container-eigenen Trigger feuert ("the live SPA has no inline ...").

Konsequenz: zwei unterschiedlich benannte Lead-Events mit unterschiedlicher Erfolgs-Semantik + potenzieller GTM-eigener Trigger = Zählung nicht konsistent. In dieser Welle bewusst NICHT verändert (kein Move/Remove/Rename von form_submit, kein Eingriff in formular_senden, keine neuen Lead-Events, kein GTM-/API-Eingriff). Normalisierung erst nach Sichtung der GA4-/GTM-Konfiguration.

## QA

URLs/Routen/Canonicals/Titles/Metas/H1s/Body/SEO-Links/Formulare/API geändert: 0. Bestehende Events umbenannt/gelöscht: 0. Funktionale Änderungen exakt 3 (2× CTA-href, 1× Tracking-Ergänzung auf 2 Templates). Build ok, Sitemap 447 unverändert, Health-Audit 0/0/0. Dist verifiziert: beide CTAs zeigen auf #formular, id="formular" vorhanden, beide quelle-Werte gerendert (dataLayer + gtag-Fallback).
