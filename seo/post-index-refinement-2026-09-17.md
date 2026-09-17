# Post-Index-Verifikation + Kopfdruck-Refinement (17.09.2026)

Kein neuer Content, keine neuen indexierbaren URLs. Zwei Ziele: die 3 frisch
in GSC eingereichten Seiten technisch/redaktionell verifizieren und die
bestehende Kopfdruck-Seite für die exakte GSC-Phrase "druck im kopf ohne
schmerzen" schärfen.

## A. Status der 3 eingereichten Seiten

Geprüft: /koerpersignale/herzklopfen-nach-dem-essen/,
/gesundheitsbibliothek/befunde-werte/crp-erhoeht/,
/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/

Alle drei:
- Self-Canonical korrekt, indexierbar (kein robots-Meta, kein noindex)
- in Sitemap (397 URLs) und im Bibliotheks-Suchindex (209 Einträge, inkl.
  Synonyme)
- Titel und H1 einzigartig (Audit: 0 doppelte Titel; H1-Duplikat-Check über
  koerpersignale.ts leer)
- keine Orphans (0), keine kaputten internen Links (0 kaputte Refs)
- keine Platzhalter-Daten, kein erfundener Reviewer (KS: Fachredaktions-
  Attribution; Befunde: nur Publisher-Schema mit publishedAt)
- keine unbelegten Zahlen-/Grenzwert-Claims (bewusst ohne Referenzbereiche)
- keine sichtbaren Em-Dashes (je 1 Treffer = bekannter HTML-Kommentar in
  LayoutDe), kein Mobile-Overflow 1440/390
- Schema konsistent mit dem jeweiligen Seitentyp (KS-Template-Schema bzw.
  Befunde-Template: BreadcrumbList + Article)

## B. Nötige Fixes an den 3 Seiten

Keine. Es wurde nichts an den drei Seiten geändert.

Statuspflege: Die 3 URLs sind in seo/index-queue.md von "Offen" nach
"Erledigt" verschoben (17.09.2026, manuell), damit die tägliche
GSC-Aufgabe sie nicht doppelt einreicht.

## C. Kopfdruck-Seite: Zustand vorher

- URL (unverändert): /koerpersignale/druck-im-kopf-ohne-kopfschmerzen/
- Title: "Druck im Kopf ohne Kopfschmerzen: mögliche Ursachen"
- Meta: "Druck im Kopf, aber kein richtiger Kopfschmerz? Nebenhöhlen,
  Muskelspannung und andere Faktoren können eine Rolle spielen. Erfahre,
  wann du es abklären solltest."
- H1: "Warum habe ich Druck im Kopf, obwohl ich keine Kopfschmerzen habe?"
- Die exakte Phrase "ohne Schmerzen" kam nirgends vor.

## D. Vorgenommenes Refinement

- Title neu: "Druck im Kopf ohne Schmerzen: mögliche Ursachen" (bevorzugte
  Richtung aus dem Auftrag; "ohne Kopfschmerzen" bleibt über H1, Slug und
  Fliesstext prominent, keine doppelte Heading-Konkurrenz).
- Meta neu: "Druck im Kopf ohne Schmerzen? Ein Enge- oder Druckgefühl ohne
  richtigen Kopfschmerz ist häufig: Nebenhöhlen, Nacken- und Kieferspannung
  können eine Rolle spielen."
- H1: unverändert.
- Lead: um die natürliche Formulierung "ein Druck im Kopf ohne Schmerzen,
  wie viele es beschreiben" ergänzt (First-Screen-Abdeckung der Variante,
  kein Stuffing; die Kurzantwort deckt die Bedeutung bereits ab).
- Canonical/Slug: unverändert, kein Duplikat für die Phrase angelegt.

## E. Synonyme

SYNONYMS-Eintrag erweitert auf: "Benommenheit dumpfer Kopf Druck im Kopf
ohne Schmerzen Kopfdruck ohne Schmerzen Druckgefühl keine Kopfschmerzen".
Damit matchen die Varianten "druck im kopf ohne schmerzen", "kopfdruck ohne
schmerzen", "druckgefühl im kopf ohne kopfschmerzen" und "kopfdruck aber
keine kopfschmerzen" in der Bibliotheks-Suche (bestehendes System, kein
neues).

Interne Links, klein gehalten: Im Nebenhöhlen-Absatz verlinken "verstopfte
Nase" und "Druck beim Bücken" jetzt auf die passenden Körpersignale
(verstopfte-nase-ohne-erkaeltung, kopfdruck-beim-buecken); Related-Block um
"Kopfdruck beim Bücken" ergänzt. Bestehende Links (Spannungskopfschmerzen,
Nackenschmerzen, Sinusitis, Schwindel, Kopfschmerzen) unverändert.

## F. Sitemap

397 URLs, unverändert (keine neue indexierbare URL). Befunde-Hub weiter
noindex,follow, HUB_INDEXABLE = false (Regel "ab 4 publizierten Leaves"
unangetastet), geplante Befunde-Slugs weiterhin ohne Prod-Routen.

## G. Suchindex

209 Einträge, unverändert (nur Synonym-Erweiterung einer bestehenden URL).

## H. Build/Audit

Build clean (astro + sitemap + worker). health-audit: 0 Orphans, 0 doppelte
Titel, 0 kaputte Beziehungs-Slugs. Kopfdruck-Seite rendert 1440/390 ohne
Overflow und ohne Konsolenfehler; neuer Title/Meta im dist verifiziert.
