# Cross-Domain-Link-Audit TCM.ch → Physio.ch / Hwang.ch — 2026-09-25

Scope: Audit + Cleanup im TCM.ch-Repo. Hwang.ch läuft in Framer (kein Repo); Änderungen dort nur als Empfehlung dokumentiert. Kein automatischer Merge.

## 1. Ursache der ~782 Semrush-Backlinks TCM.ch → Physio.ch

Der sitewide Footer (`src/data/footer.html`) enthält ZWEI Physio.ch-Links pro Seite:

1. **Therapien-Spalte** (Textlink): `<a href="https://physio.ch/" target="_blank">Domizil-Physiotherapie: physio.ch</a>` — keyword-haltiger Anker, sitewide.
2. **Brand-Leiste** (footer-bottom, „Teil der TCM.ch Gruppe"): Logo-Link `aria-label="Physio.ch"` mit `alt="Physio.ch"` — brand-led, sitewide.

Gemessen im aktuellen dist: **534 gebaute Seiten**, davon **479 mit Footer** → **959 Physio.ch-Links total** (479 Textlinks mit Keyword-Anker + 480 Brand-Logo-Links, +1 auf /club/ mit eigener Brand-Leiste). Semrush ~782 entspricht der gecrawlten Teilmenge davon. Die Implementierung ist die im August 2026 bewusst eingeführte Gesundheitsnetzwerk-Architektur, kein Unfall.

## 2. Verantwortliche Dateien/Komponenten

- `src/data/footer.html` (beide sitewide Links)
- `src/pages/club.astro` (eigene Brand-Leiste, 1 Seite)
- Kontextuelle Einzel-Links (Bestand, ok): `src/data/ueber-uns-body.html` (CARE-Pillar „Physio.ch entdecken"), `src/data/therapie-leaves/physiotherapie.html` (Anker „physio.ch")
- Nicht gerendert: `src/data/physio-tcm.ts` + `src/data/was-jetzt.ts` (nur Kommentare/overlapNotes)

## 3. Betroffene Seiten

~479 von 534 dist-Seiten (Footer-Träger). 55 Seiten ohne Footer (u.a. EN-/Sonderseiten).

## 4. Desktop/Mobile-Duplikate

Keine. Ein einziger Footer-Render pro Seite; Header/Drawer/StickyCtaBar enthalten keine Physio.ch-Links (StickyCtaBar: nur Code-Kommentar). Die Verdopplung pro Seite kommt aus Textlink + Logo-Link im selben Footer, nicht aus Desktop/Mobile-Varianten.

## 5. Bisheriger Anker & Ziel

- Textlink: Anker „Domizil-Physiotherapie: physio.ch" → `https://physio.ch/` (ohne rel="noopener")
- Logo-Link: aria/alt „Physio.ch" → `https://physio.ch`

## 6. Entscheidung

**KEEP BUT NEUTRALISE, dann REDUCE (Follow-up):** Erst wurde der Keyword-Anker neutralisiert; im Follow-up wurde der Therapien-Spalten-Textlink komplett entfernt, weil dieselbe externe Domain nicht zweimal sitewide verlinkt sein muss. Finale Architektur: **ein** neutraler sitewide Brand-/Netzwerk-Link (Logo in der „Teil der TCM.ch Gruppe"-Leiste) + selektive kontextuelle Editorial-Links.

## 7. Implementierte Änderung

`src/data/footer.html`, Therapien-Spalte, in zwei Schritten:

1. Anker neutralisiert: „Domizil-Physiotherapie: physio.ch" → „Physio.ch – Physiotherapie zu Hause" + rel="noopener" (Commit 8061f51).
2. **Follow-up:** Textlink (inkl. `<li>`) vollständig entfernt, ohne Ersatz. Brand-Logo-Link in der Netzwerk-Leiste bleibt unverändert; kontextuelle Links (Über-uns, Physiotherapie-Leaf, Club) unangetastet; Hwang.ch unangetastet.

## 8. Sitewide-Link-Zahl vorher/nachher

- Ausgangslage: **959** Physio.ch-Links (479 keyword-anchored Textlinks + 480 brand-led Logos)
- Nach Follow-up: **481** Links = 480 Brand-Logo-Links (479 Footer-Seiten + /club/) + 1 kontextueller Link im Physiotherapie-Leaf. 0 keyword-anchored, 0 Duplikate pro Seite.

## 9. Neue kontextuelle TCM.ch → Physio.ch Links

**0 hinzugefügt.** Grund: Externe HTTP-Verifikation (Status/Redirect/Canonical/Indexierbarkeit) ist aus dieser Build-Umgebung nicht möglich (Egress zu physio.ch/hwang.ch blockiert, alle Anfragen ohne Antwort). Task-Regel: ohne Verifikation kein neuer Link → alle Kandidaten unter Future/Opportunity (Abschnitt 10/12).

## 10. Future / Opportunity (nach manueller HTTP-/Canonical-/Index-Prüfung setzen)

| Quelle (TCM.ch, bestehend) | Ziel (Physio.ch, Kandidat) | Grund |
|---|---|---|
| /therapien/physiotherapie/ | https://physio.ch/leistungen/post-op-rehabilitation/ | Praxis-Physio vs. Domizil-Reha, ergänzender Ausstieg |
| /beschwerden/knieschmerzen/ | https://physio.ch/ratgeber/muskelaufbau-nach-knie-op/ | Post-OP-Intent gehört Physio.ch (siehe was-jetzt overlapNotes) |
| /was-jetzt/knieschmerzen-beim-treppensteigen/ (falls live) | https://physio.ch/ratgeber/treppensteigen-nach-knie-op/ | dokumentierte Ownership-Grenze Reha vs. Einordnung |
| /beschwerden/schlaganfall-reha-begleitung/ o.ä. (falls vorhanden) | https://physio.ch/ratgeber/physiotherapie-nach-schlaganfall/ | Schlaganfall-Reha ist Physio.ch-Kernintent |
| /standorte/zuerich/ (Hub) | https://physio.ch/einzugsgebiet/zuerich-stadt/ | Domizil-Angebot im gleichen Einzugsgebiet |
| /standorte/winterthur/ | https://physio.ch/einzugsgebiet/winterthur/ | dito |
| /gesundheitsbibliothek/fragen/ueberweisung-akupunktur/ | https://physio.ch/ (Verordnungs-Kontext) | Physio braucht Verordnung; natürlicher Kontrast im Text |

TCM.ch → Hwang.ch (bestehend ausreichend: Footer-Logo sitewide, Über-uns-Pillar, Kreuzlingen/Frauenfeld-Standortseiten). Zusätzliche Kandidaten nur bei klarem Nutzen: /akupunktur-kinder/ → hwang.ch (falls dort pädiatrisches Angebot dokumentiert ist) — vorher manuell prüfen.

## 11. Empfehlungen Physio.ch / Hwang.ch (manuell, ausserhalb dieses Repos)

- **Physio.ch → TCM.ch**: 1 neutraler Netzwerk-Link im Footer (Anker „TCM.ch", nicht „Akupunktur Zürich"); kontextuell aus Ratgeber-Artikeln (z.B. Schlaganfall/Knie) auf passende TCM.ch-Beschwerden-Owner, max. 1 pro Artikel.
- **Hwang.ch (Framer)**: Brand-Leiste analog TCM.ch mit neutralem Anker „TCM.ch" + „Physio.ch"; auf Standort-Seiten Frauenfeld/Kreuzlingen kontextueller Link auf die TCM.ch-Standortseiten (Gegenrichtung existiert bereits).
- Kein reziprokes Massen-Linking; pro Domain-Paar 1 sitewide Brand-Link + wenige redaktionelle Links genügen.

## 12. Verworfene Opportunities

- Mass-Insertion Standort→Einzugsgebiet über alle 11 Standorte: verworfen (wirkt wie Linkschema; nur ZH/Winterthur mit echter Abdeckung als Kandidaten gelistet).
- Befunde-/Körpersignale-Seiten → Physio.ch: verworfen (YMYL-Einordnungsseiten, kein Reha-Kontext).
- Footer-Link REMOVE: verworfen (bewusste Netzwerk-Architektur, legitimer Zweck).
- ~~Zweiten Textlink behalten~~: im Follow-up revidiert — Textlink entfernt, eine Domain wird sitewide nur noch einmal verlinkt (Brand-Leiste).

## 13. Kannibalisierung

- `/therapien/physiotherapie/` (TCM.ch, Praxis-Physio an Kliniken) vs. Physio.ch (Domizil): Grenze sauber, Leaf verlinkt bereits brand-led auf physio.ch. Keine Kollision gefunden.
- `was-jetzt.ts` overlapNotes dokumentieren die Grenze „kein Reha-Programm (physio.ch-Terrain)" bereits konsistent.
- Keine TCM.ch-Seite targetet „Domizil-Physiotherapie"-Queries → nach Anker-Neutralisierung keine internen/externen Anker-Konflikte.

## 14. HTTP-/Canonical-Verifikation

Aus dieser Umgebung nicht durchführbar (Egress-Policy blockiert physio.ch/hwang.ch; curl → kein Response). Deshalb 0 neue Links. Manuelle Prüfliste pro Kandidat: HTTP 200, kein Redirect, self-canonical, indexierbar (kein noindex/draft/staging).

## 15. Build-/Link-Validierung (final)

Build sauber, Sitemap unverändert 513. dist-Verifikation nach Follow-up: 0 Textlinks in Footer-Spalten (Desktop und Mobile identisch, kein Layout-Bruch, keine leeren Listenpunkte), 480× Brand-Logo-Link (479 Footer-Seiten + Club), 1× kontextueller Link im Physiotherapie-Leaf, Über-uns-Pillar intakt; hwang unverändert (480 Logos + 2 Standort-Links). health-audit 0/0/0/0.

## 16. Commit

Branch `claude/friendly-pasteur-bdbypz`: 8061f51 (Neutralisierung) + Follow-up-Commit (Textlink-Entfernung, Hash im Abschlussreport). **Nicht gemerged** (per Auftrag).

## 17. Offene manuelle Entscheidungen

1. Merge des Branches (bewusst offen gelassen).
3. Freigabe + HTTP-Prüfung der Future/Opportunity-Links (Abschnitt 10).
4. Framer-Umsetzungen auf Hwang.ch (Abschnitt 11).

## 18. Recrawl-Empfehlung nach Deployment

Kein manueller Recrawl nötig: Die Anker-Änderung ist sitewide im Footer und wird beim normalen Crawl organisch erfasst. Optional (nur falls schneller Effekt gewünscht): GSC-URL-Prüfung für 3 Crawl-Hubs (/, /therapien/, /standorte/) — keine Pflicht, kein Konflikt mit dem Natural-Crawl-Experiment, da es Bestands-URLs sind.
