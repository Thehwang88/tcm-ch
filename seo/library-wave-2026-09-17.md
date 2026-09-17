# Library-Welle 17.09.2026: kontrollierte SEO-Welle (max. 5 URLs)

Kandidaten aus GSC + Schweizer Keyword-Analyse. Overlap-Audit vor jeder Seite;
2 von 5 Kandidaten wurden als bereits abgedeckt GESTOPPT, kein Ersatz nachgeschoben.

## Ergebnis auf einen Blick

- Geprüft: 5 Kandidaten. Publiziert: 3 neue URLs. Gestoppt: 2 (Duplikate).
- Sitemap: 394 -> 397 URLs. Suchindex: 206 -> 209 Einträge.
- Build clean, health-audit 0 Orphans / 0 Dup-Titel / 0 kaputte Refs.

## Kandidat 1: Schwindel beim Aufstehen — GESTOPPT (existiert bereits)

- Geplanter Slug: /koerpersignale/schwindel-beim-aufstehen/
- Audit-Befund: Diese Seite EXISTIERT bereits als eigenes Körpersignal
  (koerpersignale.ts, live, in Sitemap), sauber abgegrenzt von
  schwindel-beim-buecken und schwindel-beim-umdrehen-im-bett und intern
  mehrfach verlinkt. Eine zweite Seite wäre 1:1-Kannibalisierung.
- Entscheid: keine neue URL. Die Nachfrage (ca. 480/Mt., KD 22) trifft auf
  die bestehende Seite; Hebel liegt bei GSC-Monitoring/Verbesserung, nicht
  bei Neuanlage.

## Kandidat 2: CRP erhöht — PUBLIZIERT

- Titel: CRP erhöht: Was bedeutet der Wert?
- URL: /gesundheitsbibliothek/befunde-werte/crp-erhoeht/ (laborwert)
- Primärer Intent: Einordnung eines erhöhten CRP-Laborbefunds.
- Nächste bestehende Seite: /beschwerden/immunschwaeche/ (Infektanfälligkeit,
  anderer Intent). Keine Seite besitzt den Labor-Intent; canonicalIntentOwner
  bleibt dokumentiert leer.
- Warum keine Kannibalisierung: reine Befund-Einordnung, keine Infektions-
  oder Behandlungsseite; Erkrankungs-Fragen werden delegiert.
- Interne Links (5): #diagnostik (2x im Text), immunschwaeche,
  KS nachtschweiss-ohne-fieber, Befunde-Artikel leukozyten-erhoeht.
- Reziprok: immunschwaeche.html verlinkt neu kontextuell auf CRP + Leukozyten.
- Indexierbar: ja (kein robots-Meta, Canonical self). Sitemap: enthalten.
- Inhaltliche Leitplanken: keine universellen Grenzwerte (Referenzbereich
  des Labors massgeblich), starker "beweist nicht"-Block, TCM-Abschnitt
  minimal und zuletzt (TCM interpretiert keine Laborwerte). Keine
  Quellenliste: In dieser Umgebung sind externe Quellen nicht verifizierbar;
  statt riskierter Zitate wurden alle Aussagen auf unstrittiges
  Lehrbuch-Niveau beschränkt und vorsichtig formuliert (Regel: "omit or
  phrase cautiously"). Bei späterem ärztlichem Review Quellen nachrüsten.

## Kandidat 3: Herzklopfen nach dem Essen — PUBLIZIERT

- Titel: Herzklopfen nach dem Essen: Was kann dahinterstecken?
- URL: /koerpersignale/herzklopfen-nach-dem-essen/ (Körpersignal,
  Kategorie Bauch & Verdauung)
- Primärer Intent: spürbarer/schnellerer Herzschlag zeitlich nach Mahlzeiten.
- Nächste bestehende Seiten: herzklopfen-im-liegen (Kontext Liegen/Nacht),
  herzstolpern-in-ruhe (unregelmässig/Extraschläge), herzschlag-im-ohr.
  Differenzierung NACH DEM ESSEN ist im Text explizit (Abgrenzung
  Klopfen/Rasen/Stolpern verlinkt auf herzstolpern-in-ruhe).
- Interne Links (8): herzstolpern-in-ruhe, voellegefuehl-nach-dem-essen,
  sodbrennen, #diagnostik, akupunktur, standorte + Related-Block
  (herzklopfen-im-liegen, verdauungsprobleme).
- Reziprok: herzklopfen-im-liegen und voellegefuehl-nach-dem-essen
  verlinken neu im Related-Block auf die Seite.
- Indexierbar: ja. Sitemap: enthalten. Standard-KS-Schema/Template
  (Fachredaktions-Autorin, kein erfundener Reviewer).

## Kandidat 4: Leukozyten erhöht — PUBLIZIERT

- Titel: Leukozyten erhöht: Was bedeutet das?
- URL: /gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/ (laborwert)
- Primärer Intent: Einordnung erhöhter weisser Blutkörperchen.
- Nächste bestehende Seite: /beschwerden/immunschwaeche/ (umgekehrter Fall:
  Anfälligkeit). Kein bestehender Owner; canonicalIntentOwner leer,
  dokumentiert.
- Warum keine Kannibalisierung: Befund-Einordnung inkl.
  Differenzialblutbild-Prinzip, keine Erkrankungsseite; keine
  Selbstdiagnose-Anleitung, ernste Ursachen bewusst niedrig gewichtet.
- Interne Links (4): #diagnostik, immunschwaeche,
  KS hitzegefuehl-ohne-fieber, KS nachtschweiss-ohne-fieber (im
  Red-Flags-Block), Befunde-Artikel crp-erhoeht.
- Reziprok: via immunschwaeche.html (siehe oben) und Querlink von der
  CRP-Seite.
- Indexierbar: ja. Sitemap: enthalten. Quellen-Handling wie Kandidat 2.

## Kandidat 5: Druck im Kopf ohne Schmerzen — GESTOPPT (existiert bereits)

- Geplanter Slug: /koerpersignale/druck-im-kopf-ohne-schmerzen/
- Audit-Befund: /koerpersignale/druck-im-kopf-ohne-kopfschmerzen/ EXISTIERT
  und deckt exakt diesen Intent (Druck-/Engegefühl ohne klassischen
  Kopfschmerz). Die GSC-Impressionen für "druck im kopf ohne schmerzen"
  stammen mit hoher Wahrscheinlichkeit von genau dieser Seite; eine zweite
  Slug-Variante würde die eigene Seite kannibalisieren.
- Entscheid: keine neue URL. Empfehlung: bestehende Seite in GSC beobachten;
  falls die Formulierung "ohne Schmerzen" im Snippet fehlt, dort im Title/
  Meta ergänzen statt eine Parallelseite zu bauen.

## Hub-Status Befunde & Werte

- 2 publizierte Beiträge erscheinen als klickbare Karten, 8 geplante bleiben
  nicht-klickbar ("In Vorbereitung") und existieren in Produktion nicht.
- HUB_INDEXABLE bleibt false (Regel: erst ab 4 publizierten Leaves).
  Die beiden Artikel sind einzeln indexierbar.

## Systempflege in derselben Welle

- Suchindex: 3 neue Einträge (KS automatisch, Befunde via published-Filter)
  + SYNONYMS für alle drei URLs.
- seo/index-queue.md: 3 URLs unter "Offen" (CLAUDE.md-Regel, gleicher Commit).
- Kein Homepage-Change, keine Änderungen an physio.ch/hwang.ch.

## Abschlussbericht

A. Overlap-Audit bestanden: CRP, Herzklopfen nach dem Essen, Leukozyten.
   Gestoppt: Schwindel beim Aufstehen, Druck im Kopf ohne Schmerzen
   (beide bereits durch eigene Seiten abgedeckt).
B. Publiziert: die 3 bestandenen Kandidaten.
C. Neue URLs:
   /koerpersignale/herzklopfen-nach-dem-essen/
   /gesundheitsbibliothek/befunde-werte/crp-erhoeht/
   /gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/
D. Sitemap: 394 -> 397.
E. Suchindex: 206 -> 209.
F. Build: clean (astro + sitemap + worker), Renders 1440/1024/768/390 ohne
   Overflow und ohne Konsolenfehler, keine sichtbaren Em-Dashes.
G. Audit: 0 Orphans, 0 doppelte Titel, 0 kaputte Beziehungs-Slugs;
   Befunde-Hub weiter noindex,follow, geplante Slugs ohne Prod-Routen.
