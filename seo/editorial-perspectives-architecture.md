# Perspektiven: Architektur der redaktionellen Ebene (Phase 1, 13.09.2026)

Status: Infrastruktur + Layout fertig, KEINE Artikel publiziert.

## A. Gewählte Architektur

Content-Type mit Hub innerhalb der Gesundheitsbibliothek (Option C), exakt nach dem
etablierten Muster von Fragen/TCM-verstehen:

- Daten: `src/data/perspektiven.ts` (Typen, TOPIC_LABELS, HUB_INDEXABLE, Einträge)
- Hub: `src/pages/gesundheitsbibliothek/perspektiven/index.astro`
- Artikel: `src/pages/gesundheitsbibliothek/perspektiven/[slug].astro`

## B. Warum

Kleinste saubere Lösung: kein Parallel-System, keine neue Taxonomie, kein zweiter
Suchindex. LayoutDe, kb-body-Typografie, rel-card/mr-chip-Patterns, indexable-Flag-
und noindex,follow-Konvention (Visuals/TCM-verstehen) werden 1:1 wiederverwendet.
Es entstanden KEINE neuen Komponenten-Dateien; die redaktionellen Blöcke (These,
klinische Sicht, Grenzen, Evidenz, Quellen, Byline, Featured-Card) leben als
scoped Markup in den zwei Templates, bis mindestens ein zweiter Konsument existiert.

## C. Abgrenzung zu /wissen/

Wissen = Referenz: erklärt Gesundheitsthemen und Studienlagen neutral und
suchintent-getrieben. Perspektiven = Haltung: erklärt klinisches Urteilen,
Unsicherheit, Behandlungsentscheidungen, Verweislogik und Evidenz-Interpretation
mit Autorenstimme. Ein Perspektiven-Beitrag beantwortet nie primär eine
Referenz-Suchanfrage.

## D. Abgrenzung zu TCM verstehen

TCM verstehen erklärt Konzepte, Begriffe, Methoden, traditionelle Modelle (das Was).
Perspektiven erklärt das Abwägen dazwischen (das Wie und Warum der Entscheidungen).

## E. Content-Modell

`Perspektive` in perspektiven.ts: slug, status ('mock'|'published'), indexable,
featured, title, deck, topic (6 Werte, nur Metadaten, KEINE /topic/-URLs),
metaDesc, author {name, role, credentials, href}, reviewerName, publishedAt,
updatedAt, readingTime, thesisHtml, bodyHtml, klinischeSichtHtml, grenzenHtml,
evidenzHtml, sources[{label, detail, href}], related[{href, label, cat}],
relatedPerspektiven, cta {label, href}, primaryPurpose, canonicalIntentOwner[].
Alle redaktionellen Blöcke optional; Artikel dürfen strukturell variieren.

## F. Indexierungs-Regeln

- Hub: noindex,follow bis HUB_INDEXABLE=true (siehe J). Nicht in der Sitemap
  (gen-sitemap schliesst noindex automatisch aus). Sitemap-Delta Phase 1: 0.
- Beiträge: indexierbar nur bei status 'published' UND indexable=true.
- status 'mock': baut für Layout-QA, ist aber immer noindex, nie in Sitemap,
  nie in der Suche, nirgends verlinkt; auf dem Hub nur im Dev-Server sichtbar
  (import.meta.env.DEV), mit sichtbarem Entwurf-Badge.
- Keine Topic-/Archiv-/Filter-URLs.

## G. Autor:innen-/Review-Modell

Echte menschliche Autorschaft: benannte Therapeut:in, Ärzt:in oder Fachredaktion.
Nie automatisch zuweisen, keine erfundenen Credentials oder Meinungen. reviewerName
nur bei echtem Review (gleiche Regel wie Wissen/Fragen). Article-Schema wird NUR
gerendert, wenn published + author + publishedAt real vorhanden sind.

## H. Interne Verlinkung (künftig)

related[] verlinkt Therapien, Beschwerden, Körpersignale, Diagnostik, Standorte;
relatedPerspektiven verlinkt Beiträge untereinander. Rückverlinkung aus der Site
(Bibliothek-Karte, Beschwerde-Seiten) erst NACH Launch echter Beiträge, kuratiert,
kein Sitewide-Crosslinking. Kein Homepage-Auftritt, keine Hauptnavigation.

## I. Kannibalisierungs-Leitplanken

Pflichtfelder-Praxis für jede Ausgabe: primaryPurpose (ein Satz, was der Beitrag
leistet, das keine bestehende Seite leistet) + canonicalIntentOwner (URLs, die den
Such-Intent behalten; der Beitrag verlinkt sie prominent). Beispiel im Mock
'Physiotherapie oder Akupunktur?': Intent-Owner bleiben /therapien/physiotherapie/
und /therapien/akupunktur/. Ein Beitrag, der primär ranken statt einordnen will,
gehört nach /wissen/ oder wird nicht publiziert.

## J. Launch-Kriterien für Indexierung des Hubs

1. Mindestens 2-3 publizierte Beiträge mit echten Autor:innen und Quellen.
2. Redaktionelle Prüfung (Simon oder Fachperson) pro Beitrag.
3. Dann: HUB_INDEXABLE=true, indexable=true pro Beitrag, URLs in seo/index-queue.md
   (gleicher Commit), Bibliothek-Hub-Karte NACH den Kern-Kategorien ergänzen,
   Suchgruppe füllt sich automatisch (publishedPerspektiven).

## K. Dateien Phase 1

- src/data/perspektiven.ts (neu)
- src/pages/gesundheitsbibliothek/perspektiven/index.astro (neu)
- src/pages/gesundheitsbibliothek/perspektiven/[slug].astro (neu)
- src/data/gesundheitsbibliothek.ts (Suche: publishedPerspektiven, Gruppe 'Perspektiven')
- src/pages/gesundheitsbibliothek/index.astro (GROUPS + 'Perspektiven', rendert nur bei Treffern)
- scripts/health-audit.mjs (Typ 'perspective')
- 3 Mock-Einträge (mock-*) als Entwicklungsdaten, siehe F.
