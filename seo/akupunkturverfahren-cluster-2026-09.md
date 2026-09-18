# Akupunkturverfahren-Subcluster (18.09.2026)

Spezialverfahren-Ebene unter dem Akupunktur-Pillar. Kein neues Top-Level der
Gesundheitsbibliothek. Prinzip: eine Methode = genau eine kanonische Seite.

## A. Bestehende Methodenseiten (Pre-Flight-Audit)

Gefunden und unangetastet erhalten:
- /therapien/akupunktur/ (Pillar, SPA-Leaf)
- /therapien/ohrakupunktur/ (eigene Seite)
- /therapien/elektroakupunktur/ (SPA-Leaf) + /wissen/elektroakupunktur-wirkung/
- /therapien/dauernadeln/ (eigene Seite; NICHT wie vermutet nur Wissen) +
  /wissen/dauernadeln-akupunktur/ (Patienten-Explainer)
- /therapien/ear-seeds/, /therapien/gesichtsakupunktur/, /therapien/akupressur/
- /therapien/physiotherapie/dry-needling/ (Physio-Kontext)
- /therapien/massage/triggerpunktmassage/ (Triggerpunkte, Massage-Kontext)
- /therapien/akupunktur/schwangerschaft/ (bestehende Nested-Route)

Keine Treffer im Repo (0 Dateien): YNSA, Yamamoto, Skalpakupunktur,
Bauch-/Abdominalakupunktur, Bienengift, Pharmakopunktur. Schädelakupunktur und
Laserakupunktur nur als beiläufige Erwähnungen in Wissen-/Kinder-Texten.

## B. Kanonische Owner

- Akupunktur allgemein -> /therapien/akupunktur/
- Ohrakupunktur -> /therapien/ohrakupunktur/
- Elektroakupunktur -> /therapien/elektroakupunktur/ (Wissen-Artikel bleibt
  vertiefender Explainer)
- Dauernadeln -> /therapien/dauernadeln/ (Wissen-Artikel bleibt Patienten-Intent)
- Dry Needling -> /therapien/physiotherapie/dry-needling/ (KEINE TCM-Form; im
  Hub als "Verwandte Nadeltechnik" mit explizitem Konzept-Hinweis)
- Schädelakupunktur (Oberbegriff) -> NEU /therapien/akupunktur/schaedelakupunktur/
- YNSA (Yamamoto-System) -> NEU /therapien/akupunktur/ynsa/
- Bauchakupunktur -> NEU /therapien/akupunktur/bauchakupunktur/
- Laserakupunktur -> NEU /therapien/akupunktur/laserakupunktur/

## C. Fehlende Methoden

Schädelakupunktur, YNSA, Bauchakupunktur, Laserakupunktur: publiziert.
Bienengift-Akupunktur, Pharmakopunktur: nur geplante Daten-Entitäten (K/L).

## D. Erstellte Routen

- Hub: /therapien/akupunktur/verfahren/ (LayoutDe, CollectionPage+Breadcrumb)
- Leaves: /therapien/akupunktur/{schaedelakupunktur,ynsa,bauchakupunktur,laserakupunktur}/
  via src/pages/therapien/akupunktur/[slug].astro (nur published ohne canonicalUrl;
  planned erzeugt keine Route, auch nicht im Dev)
- WICHTIG (Infrastruktur): functions/therapien/[[path]].js liefert für
  2-Segment-Pfade 410 (Doorway-Schutz); alle 5 neuen Pfade sind in der
  ALLOW-Liste ergänzt.

## E. Hub-Indexierungs-Entscheid

INDEXIERBAR (VERFAHREN_HUB_INDEXABLE = true). Begründung: echter Navigations-
und Vergleichswert (10 Methodenkarten inkl. aller bestehenden Owner, eigene
Vergleichs- und Auswahl-Sektionen), kein Thin-Duplicate des Pillars, der
selbst keine Verfahrens-Übersicht enthält. Damit 5 neue indexierbare URLs
(Maximum laut Auftrag).

## F. Kannibalisierungs-Audit

- Jede neue Seite beantwortet "Was ist dieses Verfahren?", keine
  Beschwerde-Intents; KEINE Methode-x-Beschwerde-Kombiseiten erstellt.
- YNSA vs. Schädelakupunktur: gegenseitige Abgrenzung in beiden Texten
  explizit (YNSA = ein spezifisches System, kein Synonym).
- Bauchakupunktur: explizit abgegrenzt von Bauch-Punkten der
  Körperakupunktur, Bauchmassage und Verdauungs-Beschwerdeseiten.
- Laserakupunktur: explizit abgegrenzt von flächiger Lasertherapie.
- Bestehende Owner werden verlinkt, nicht dupliziert (canonicalUrl im
  Datenmodell erzwingt das strukturell).

## G. Such-Synonyme

- schaedelakupunktur: Skalpakupunktur, scalp acupuncture, Kopfhaut Akupunktur
- ynsa: Yamamoto Akupunktur, Yamamoto Neue Schädelakupunktur
- bauchakupunktur: Abdominalakupunktur, abdominal acupuncture
- laserakupunktur: Laser Akupunktur, Akupunktur ohne Nadeln, Lichtakupunktur

## H. Interne Links

Hub -> alle 10 kanonischen Methodenseiten + Pillar, Fragen, TCM verstehen,
Therapien. Leaves -> Pillar + 2-4 Geschwister-Methoden + je 1-2 passende
Fragen/Signale/Beschwerden. Reziprok (klein, je 1 Satz): Akupunktur-Pillar,
Elektroakupunktur-Leaf und Dauernadeln-Seite verlinken auf den Hub. Keine
grossen Linkblöcke, Dry-Needling-Seite unverändert (kein TCM-Framing
aufzwingen).

## I. Angebots-Status

Als angeboten dargestellt nur, was Geschäftsdaten belegen (bestehende
Therapie-Seiten/standorte.ts): Akupunktur, Ohr-, Elektro-, Gesichtsakupunktur,
Dauernadeln, Ear Seeds, Dry Needling. Die 4 neuen Methodenseiten sind
Bildungsseiten mit neutraler Verfügbarkeits-Box ("hängt von Ausbildung der
Fachperson ab, klären wir bei der Zuweisung"), offered: 'unverified'. Keine
erfundene Klinik-Verfügbarkeit, kein "bieten wir an".

## J. Evidenz-/Sicherheits-Notizen

Jede neue Seite trennt traditionelle Begründung, klinische Praxis und
wissenschaftliche Evidenz und trägt eine eigene Evidenz-Box (zurückhaltend,
keine Wirksamkeitsversprechen, keine Neuro-Heilungs-Claims) plus
Sicherheits-Box (Blutung/Hämatom, Schwindel, Hygiene, Blutverdünnung;
Bauch: Stichtiefe/Anatomie + Schwangerschaft + Red-Flag-Bauchschmerz zuerst
ärztlich; Laser: Augenschutz, keine DIY-Geräte-Anleitung). Keine
Quellenlisten: extern nicht verifizierbar in dieser Umgebung, Aussagen auf
Lehrbuch-Niveau beschränkt (Regel "omit or phrase cautiously"). Kein
erfundener Autor/Reviewer (nur Publisher-Schema).

## K. Bienengift-Akupunktur (planned)

Nur Daten-Entität (status planned, indexable false), KEINE Route, KEIN
Hub-Eintrag, KEINE Suche/Sitemap. Vor Veröffentlichung zu klären: Angebot
bei TCM.ch, Schweizer Rechts-/Zulassungslage, Qualifikation, Produkt- und
Anwendungsanforderungen, Allergie-/Anaphylaxie-Risiko und
Notfallbereitschaft, Evidenz.

## L. Pharmakopunktur (planned)

Gleiches Regime. Zu klären: Definition/Substanzen, regulatorischer Status
Schweiz, Verschreibungs-/Anwendungsregeln, Evidenz, tatsächliches Angebot.

## M. Sitemap

397 -> 402 (Hub + 4 Leaves). Keine planned-URLs enthalten (verifiziert:
0 Treffer bienengift/pharmakopunktur im gesamten dist).

## N. Suchindex

209 -> 214 (Hub + 4 Leaves in Gruppe Therapien, mit Synonymen).

## O. Build/Validierung

Build clean. health-audit: 0 Orphans, 0 doppelte Titel, 0 kaputte Refs.
Alle 5 Seiten: Self-Canonical, indexierbar, keine sichtbaren Em-Dashes
(je 1 Treffer = bekannter LayoutDe-HTML-Kommentar). Renders
1440/1280/1024/768/390 ohne Overflow und ohne Konsolenfehler. Bestehende
Seiten (Akupunktur, Ohr, Elektro, Dauernadeln, Dry Needling) erhalten,
nur je 1 Satz Hub-Link ergänzt. Cross-Domain: keine Änderungen an
physio.ch/hwang.ch. 5 URLs in seo/index-queue.md unter "Offen"
(CLAUDE.md-Regel, gleicher Commit).
