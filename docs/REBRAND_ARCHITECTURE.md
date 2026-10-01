# TCM.ch — Rebrand-Architektur-Inventar (Step 2)

Stand: 2026-10-01, ursprünglich analysiert auf `main` = `d1a4436` (Baseline
aus Step 1), aktualisiert auf `main` = `a783e61` (nach den gemergten
Komponenten-Piloten PR #3/#4/#5, siehe §5). Design-Entscheide sind, wo
markiert, **pending Hyejin** (Figma folgt).

## 1. Baseline

- Analysierter Stand: `d1a4436` (= origin/main). Session-Branch trägt zusätzlich
  `bc6b0d7` (nur regenerierte sitemap-`lastmod` + audit-JSON, keine Inhalte) —
  bewusst NICHT in diesen Branch übernommen.
- Build: 687 Routen (`index.html`) + `404.html` = 688 HTML-Dateien gesamt;
  Astros «688 page(s)» zählt die 404 mit. Beide früher kursierenden Zahlen
  (687/688) meinten also dasselbe. Dazu Cloudflare Worker, Sitemap 661 URLs.
- Deploy-Status (Einordnung der Evidenz): PR #3 (FaqBlock), PR #4
  (AuthorCard) und PR #5 (ArticleCta) sind nach main **gemerged** (direkt
  belegt: Merge-SHAs). «Deployed» stützt sich auf berichtete Live-Checks:
  separate Cloud-Sessions prüften tcm.ch per curl nach `1bf13c9` und
  `a783e61` — HTTP 200 auf den Stichproben-Seiten (wissen/narbenbehandlung,
  wissen/akupunktur-bei-kopfschmerzen, koerpersignale/haende-zittern) mit
  erwartetem CTA-/FAQ-/Author-Card-Markup inkl. Tracking-onclick.
  **Limitation:** HTTP 200 + erwartetes Markup identifizieren den
  deployten Commit nicht eindeutig (das Markup ist vor/nach den
  Extraktionen absichtlich gleich); ein Commit-genauer Beleg (z. B.
  Workers-Builds-Check am Commit) wurde nicht erhoben. Visuelle
  Live-Prüfung: nur Nutzer-Sichtung nach dem FaqBlock-Deploy.
- Bekannte Baseline-Limitierungen (aus Step 1):
  - `tcm.ch` ist aus der Agent-Umgebung egress-blockiert; alle Browser-Checks
    liefen gegen den lokalen Build. Webfonts (fonts.googleapis.com), GTM,
    CookieYes, Turnstile und OneDoc waren dabei blockiert → Font-Rendering,
    Consent-Banner, Turnstile-Widget und OneDoc-Iframe sind NICHT visuell
    verifiziert.
  - Erfolgreicher Formularversand wurde bewusst nicht getestet (keine echten
    Anfragen/Conversion-Events); getestet ist nur die Validierung (leerer
    Submit feuert keinen `/api/*`-Request).
  - `scripts/check-professional.mjs` hat einen vorbestehenden Fehler:
    `Freigabe-Blocker oda-am: Quelle sbfiTitel unpräzise (Startseite)`
    (`src/data/regulatorik/sources.ts:32`, `precise:false, checked:null`).
    Wird in einem eigenen Task behoben, nicht hier.

## 2. Layout- & CSS-System

### 2.1 Vier Layouts

| Layout | Verwendet von | CSS-Ladereihenfolge (Head) |
|---|---|---|
| `SpaPage.astro` | SPA-Erbe: Home, Beschwerden-Leaves, Therapien-Leaves, Standorte (alle Varianten), Massage-/Stadt-Seiten, Hubs mit `*-body.html` | `tokens.css` → `home.css` → `nav-rebrand.css` → Google Fonts → page-`<style>`; Scripts: Turnstile, `header.js`, `home.js` |
| `LayoutDe.astro` | Gesundheitsbibliothek komplett (Körpersignale, Wissen, Haut, Fragen, Untersuchungen, Was-jetzt, Befunde, TCM-verstehen, Körper, Team, Praxiswissen/Tools/Regulatorik-Doku) | `tokens.css` → `header.css` → `nav-rebrand.css` → `footer.css` → Fonts → scoped page-`<style>` |
| `Layout.astro` | `/en/*` (50 Seiten) | `src/styles/global.css` (139 Z., Astro-bundled) → `tokens.css` → `footer.css` → Fonts; eigener EN-Header (`Header.astro`) + Drawer |
| `PartnerLayout.astro` | NUR `/partner/[city]` (private Pitch-Decks, noindex) | `tokens.css` → Fonts → deck-eigene Styles |

### 2.2 Token-System (`public/styles/tokens.css`, 92 Zeilen)

Deklarierte Single Source of Truth, von allen 4 Layouts + Sonderseiten
(`longevity`, `selbsttest`, `visuals/handout`) geladen. Enthält Brand-Farben,
semantische Aliase (`--green`→`--blue` …), Typo-Skala, Layout-Rhythmus
(`--section-py` responsive), Radius-, Schatten-, Motion-Skalen.

**Tatsächliche Adoption / Konflikte (konkrete Fundstellen):**

1. `public/nav-rebrand.css:8-13` definiert ein ZWEITES `:root` mit eigener
   Palette `--nav-green:#1ED760`, `--nav-green-dark:#14532D` (Spotify-Grün,
   nicht Brand-Grün #2D9B6F). Gilt global, wird aber nur von Nav-Selektoren
   konsumiert. Für das Rebrand die wichtigste bewusste Abweichung.
2. `public/home.css`: 159 hartkodierte Brand-Grün-Vorkommen (`#2D9B6F`/
   `#1F7A54`/`#E8F5EE`) neben Token-Nutzung; kein eigenes `:root`.
3. `public/header.css`: 10 hartkodierte Grün-Werte.
4. Inline-Hardcodes in Komponenten (statt `var(--blue)`), u. a.
   `src/components/standort/UspGrid|UeberPraxis|Reviews|KrankenkassenTeam|
   Ablauf.astro`, `WhatsAppConcierge.astro`, `src/pages/404.astro`,
   `src/pages/standorte/luzern/index.astro` (`rgba(45,155,111,…)`-Literale).
5. `StickyCtaBar.astro` hardkodiert `#2D9B6F` + Schatten direkt.

Kein Wholesale-Cleanup hier; für das Rebrand gilt: **neue Werte zuerst in
tokens.css, Hardcodes familienweise beim jeweiligen Redesign ablösen.**
KEIN zweites Token-System einführen (nav-rebrand-`:root` beim Nav-Redesign in
tokens.css aufgehen lassen — pending Hyejin).

## 3. Seitenfamilien-Inventar

Zahlen = generierte Seiten im Build von `d1a4436` (gesamt 687).

### 3.1 Home (1)
- Route `/`, `src/pages/index.astro` + Markup `src/data/home-body.html`
  (`?raw`), Styles `public/home.css`. SpaPage-Familie.
- Hero: `.hero-bg`-Block im home-body; Conversion: `#home-contact-form`
  (`form[data-contact-form]` → `public/home.js:262` → `fetch('/api/anfrage')`
  → `dataLayer.push({event:'formular_senden', …})` in `home.js:48`).
- Standort-Karten (`.city-card.location-card`), Review-Cards, Therapie-Grid
  (`.svc-card`), KK-Akkordeon (`.kk-item`).

### 3.2 Standorte (21 + 7 Kosten-Spokes)
- Kanonischer Flow: `src/pages/standorte/[slug].astro` + `src/data/standorte.ts`
  (`cro:true` = SG-Master-Layout) mit geteilten Komponenten
  `src/components/standort/*` (Hero, UspGrid, Team, Beschwerden, Therapien,
  Ablauf, Reviews, KrankenkassenTeam, IntroNap, UeberPraxis, WeitereStandorte,
  FinalCta, KontaktForm). **Migriert sind ZEHN Standorte — alle Einträge in
  `standorte.ts`, alle mit `cro:true`:** basel, kreuzlingen, frauenfeld,
  rorschach, volketswil, wil, winterthur-muenzgasse, winterthur-marktgasse,
  zuerich-hoengg, zuerich-oerlikon.
- Legacy-Zweig: rendert nur noch **St. Gallen und Bottighofen** (Partner-Marke
  «TCM Pelican», eigene Sektionsfolge/ohne Reviews — Migration bräuchte
  Varianten, bewusst zurückgestellt). Von den 11 captured Leaves in
  `src/data/standort-leaves/*.html` sind die übrigen 9 totes Gewicht: ihr
  Slug hat einen `standorte.ts`-Eintrag, `getStandort()` schaltet auf den
  Daten-Zweig und der Leaf-Body wird nie gelesen. Eine überlebende
  Leaf-Datei belegt also NICHT, dass die Route unmigriert ist.
- Dedizierte eigene Seiten (ausserhalb `[slug].astro`): `zuerich-city/`,
  `luzern/` (Pre-Opening «Eröffnung 2027», Warteliste-Formular
  `[data-lu-waitlist]`, bewusst ohne MedicalClinic-Schema/Team) und
  `zuerich-bellevue/` («Neuer Standort in Vorbereitung», ohne Adresse/
  Clinic-Schema). Dazu Kosten-Spokes `*/kosten/` (msg-* Styles aus
  `src/data/massage-city.css?raw`).
- Hero: `standort/Hero.astro` (`#generic-premium-hero`, `.sg-*`-Klassen aus
  home.css). CTA: `openContactForm()` + WhatsApp; Sticky `#standort-mobile-cta`
  (CSS-inaktiv) + sitewide `.scb-bar`.
- **Echte Ausnahme St. Gallen:** Legacy-Leaf + `HeroLaunchSG.astro`
  (Offer-Flow `#offer-form`, „30 Min. gratis“), OneDoc-Embed wird in
  `[slug].astro` (Z. ~205) als `#online-buchen`-Sektion injiziert
  (Widget-ID `7a0d6d1b…`, GA4 `G-NHZ8Y6V840` im Widget-Script), Sticky-CTA
  rewired auf `#kontakt`/`#online-buchen` (`StickyCtaBar.astro`, sgPage-Regex).
  Beim Redesign separat behandeln; OneDoc nur hier.

### 3.3 Therapien (37)
- `src/pages/therapien/[slug].astro` (SpaPage) + Leaves
  `src/data/therapie-leaves/*.html`; Unterverzeichnisse für Akupunktur-
  Subseiten (schwangerschaft, schaedelakupunktur …), `massage/*`-Methodenseiten,
  Hub `therapien-body.html`. `buildTherapyLd()` für Schema.

### 3.4 Beschwerden (117)
- `src/pages/beschwerden/[slug].astro` (SpaPage) + `src/data/symptom-leaves/
  *.html` (captured, pro Slug gebaut via Kalkschulter-Template-Generator) +
  `beschwerden.ts` (Name/FAQs/Related) + `TITLES/DESCRIPTIONS`-Maps im Route-
  File. 410-Gate: `public/beschwerden-keep.js` + `functions/beschwerden/`.
  Hub `beschwerden-body.html` (Panels + A-Z-Directory, `data-alias`-Suche).
- FAQ: `.cp-faq-item`-Akkordeon (onclick-toggle) + `parseLeafFaqs` → FAQPage-LD.
- Auto-Linkblöcke am Leaf-Ende: haut-links, koerpersignale-links,
  massage-links, fragen-links, library-links (je `src/data/*-links.ts`).

### 3.5 Körpersignale (90)
- `src/pages/koerpersignale/[slug].astro` (LayoutDe, scoped `<style>`) +
  `src/data/koerpersignale.ts` (Interface inkl. optional `ctaHref`, `sources`).
  Hero schlicht (`.cat`/`h1`/`.lead`), Body `set:html` mit
  `:global(.wa-callout)`, FAQ `<details class="faq">`, CTA `.cta-card`
  (`#formular`-Default), Related `.rel-card`-Grid, Quellen `.ks-sources`.

### 3.6 Wissen (45) & Haut (37)
- `wissen/[slug].astro` bzw. `haut/[slug].astro` (beide LayoutDe) +
  `wissen.ts`/`wissen-herbst.ts`/`haut.ts`. Strukturell Zwillinge der
  Körpersignale-Leaves (Autoren-Card, FAQ-details, cta-card). Details §5.

### 3.7 Gesundheitsbibliothek (179 gesamt)
- Hub `/gesundheitsbibliothek/` mit client-seitigem Suchindex
  (`buildSearchIndex` + `SYNONYMS` in `gesundheitsbibliothek.ts`).
- Fragen (40): `fragen/[slug].astro` + Hubs (`fragenHubs`) aus `fragen.ts`.
- Untersuchungen (28): je eigene `.astro` (generiert, `kb-body`-Styles,
  `LibraryRelated.astro`, `info-note`, CTA `/sprechstunde/` bei Diagnostik).
- Befunde & Werte (59): `befunde-werte/[slug].astro` + `befunde-werte.ts`.
- Was jetzt (19): `was-jetzt/[slug].astro` + `was-jetzt.ts`
  (Selfcare-Module, `sources[]`, Kannibalisierungs-Pflichtfelder).
- TCM verstehen (22): `tcm-verstehen/[sektion]/[...slug]`-Flow +
  `tcm-verstehen.ts` (Entity-Modell, Scope-Ausnahme für Qi/Meridian-Begriffe).
- Körper (9 Regionen), Perspektiven (1, noindex).

### 3.8 Team (17)
- `team/[slug].astro` (LayoutDe) + `src/data/therapeuten.ts`
  (`teamCardHtml()` wird auch in Standort-Leaves injiziert — beim Redesign
  Karte nur dort ändern).

### 3.9 B2B / Professional / Regulatorik (~45)
- `fachpersonen`, `praxiswissen` (15), `branche` (7), `regulatorik` (11),
  `tools` (5), `karriere` (3) + noindex-Scaffolds (`jobs`, `verzeichnis`,
  `weiterbildungen`, `marktplatz`, `community`, `akademie`).
- Daten `src/data/pro/*` + `src/data/regulatorik/*`; Komponenten
  `components/pro|b2b|reg/*`; Gate `scripts/check-professional.mjs`
  (`REGULATORIK_VERIFIED`). Formulare: `ProSubmissionForm`,
  `PartnerLeadForm`, `NachfolgeForm` → `functions/api/einreichung.js`.

### 3.10 Partner-Seiten (4)
- `partner/[city].astro` auf `PartnerLayout` (privates Slide-Deck-UI,
  noindex) — nur diese Route nutzt PartnerLayout.
- `partner/index.astro`, `partner/modell.astro`, `partner/praxisnachfolge.astro`
  importieren dagegen `LayoutDe` (Korrektur ggü. Erstfassung) und gehören
  damit zur LayoutDe-Familie; Formulare `PartnerLeadForm`/`NachfolgeForm`.
- Deck-Design vom Patient:innen-Rebrand entkoppelt (pending Hyejin, ob überhaupt).

### 3.11 English (50)
- `en/*` auf `Layout.astro` (+ `Header/FooterEn`), Daten `locations.ts`,
  `src/content/knowledge/*.md` (Content Collections). Hreflang-Paarung via
  `deStandortPath/enLocationPath`.

### 3.12 Sonstige
- `visuals` (11, noindex + handout-Variante), `selbsttest`, `longevity`,
  `sprechstunde`, `kontakt`, `krankenkassen`, Rechtliches (`DocPage.astro`).

## 4. Conversion- & Tracking-Inventar (MUSS Extraktionen überleben)

| Baustein | Hooks |
|---|---|
| Inline-Formulare | `form[data-contact-form]`, Felder `name/telefon/email/standort/behandlung`, Honeypot `website`, Hidden `quelle`, `anfrage_typ`; Handler `public/home.js:262` → `POST /api/anfrage` (`functions/api/anfrage.js`) |
| dataLayer | `formular_senden` (`form_type`, `quelle`) `home.js:48`; Warteliste-Variante in Luzern-/Bellevue-Inline-Scripts; GTM `GTM-PZ92Q3KJ` + CookieYes via `HeadAnalytics.astro` |
| Turnstile | `.cf-turnstile` (+ `data-ts-mounted`), `window.tcmTsToken`, Sitekey-Branch-Switch (`CF_PAGES_BRANCH`) |
| SPA-Router/Nav | `nav('symptom'|'therapie'|'standort', slug)`, `openContactForm()`, `openTerminForm()`, `drawerNav()`, `#siteDrawer`, `#drawerOverlay`, `body.drawer-open`, `#mainNav` + `.nav-hidden` (header.js Hysterese), `__tcmNavShow/__tcmNavSync` |
| Sticky-CTA | `.scb-bar/.scb-primary/.scb-row/.scb-off`, IntersectionObserver auf ersten Primär-CTA, Opt-out `[data-no-sticky-cta]`, SG-Sonderpfad (`#kontakt`/`#online-buchen`, `.scb-book`) |
| Prefill | `prefillStandort()`/`prefillForm()` (`src/data/form-prefill.ts`), `select[name=standort]`-Preselect in `standort/KontaktForm.astro`, `?standort=`-Query |
| Kontaktkanäle | `wa.me/41775236122` (+ Varianten mit text-Param), `tel:+41775236122`, `termine@tcm.ch` |
| OneDoc (nur SG) | `iframe.od-widget`, Widget-ID `7a0d6d1b…`, postMessage-Höhe, GA4-Forwarding `G-NHZ8Y6V840` |
| Warteliste | `[data-lu-waitlist]` (Luzern/Bellevue), `MassageWartelisteForm` (Luzern), `quelle=warteliste-*` |

## 5. Wissen vs. Körpersignale (korrigierter Detailvergleich)

Methodik (Revision): Vergleich pro Regel-VORKOMMEN in Quellreihenfolge, mit
erhaltenem `@media`-Kontext, Selektor, Deklarationen und `!important`
(kein Selektor-Map, das Wiederholungen überschreibt — die Erstfassung hatte
dadurch den `.rel-grid`-Unterschied mit dessen Mobile-Override verschmolzen
und fälschlich «43/43 identisch, 0 abweichend» gemeldet).

Befund auf `d1a4436`:

- Wissen: 48 Regel-Vorkommen · Körpersignale: 58 · kein Selektor kommt im
  selben Kontext doppelt vor (keine Order-abhängigen Self-Overrides).
- **47 geteilte (Kontext, Selektor)-Schlüssel: 46 identisch, 1 abweichend.**
- Der eine ECHTE, gewollte Unterschied:
  - `[top] .rel-grid` — Wissen `repeat(3, 1fr)` vs. Körpersignale
    `repeat(2, 1fr)`; der `@media (max-width: 640px)`-Override auf `1fr`
    ist in beiden identisch.
- Nur-KS: `.ks-sources*` (5 Regeln), `.lib-row*` (5), `.avatar--sm`
  (einziges `!important` im Vergleich). Nur-Wissen:
  `.kb-body :global(.wa-pullquote)`.
- Die 46 identischen Schlüssel enthalten BREITE Selektoren: `h1`, `.dot`,
  `.avatar`, `.back`, `.cat`, `.meta-row`, `.wrap.narrow`, `.related` —
  heute durch Astro-Scoping (`[data-astro-cid-…]`-Attribut pro Selektor)
  auf die jeweilige Seite begrenzt. 14 davon nutzen Astro-`:global()`
  (`.kb-body :global(p|h2|h3|ul|ol|li|strong|a|a:hover|.wa-callout*)`) für
  `set:html`-Inhalte.
- Markup-Gegenprobe: der `faq`-Block war in beiden Templates BYTE-IDENTISCH.
  Der `author-card`-Block war strukturell identisch, trug aber
  Familienunterschiede, die die Extraktion als Props erhalten hat:
  Label («Geschrieben von» vs. «Erstellt von»), Avatar (Initialen vs.
  fixes «TCM» mit `avatar--sm`) und Review-Zeile (Wissen: konditional
  «Medizinisch geprüft durch …» bei `reviewerName`, sonst wie KS
  «Allgemeine Einordnung …»). `cta-card` unterschied sich nur in den
  Default-Fallback-Strings (`'Beschwerden abklären…'` vs.
  `'…einordnen lassen?'`), dem `ctaHref`-Default (`/kontakt/` vs.
  `#formular`) und dem KS-Tracking-`onclick` auf dem WhatsApp-Button.
  **Korrektur zur Erstfassung:** Der KS-Hero nutzt KEIN `.avatar` — die
  Hero-Meta-Zeile ist reiner Text (`.m-author`/`.meta-row`). `.avatar` und
  `.avatar--sm` kamen in KS ausschliesslich in der Autoren-Card vor; der
  Selektor überspannte also keine zwei Seitenregionen.

### Teilbarkeit, revidiert

Unscoped Shared-CSS (Erstvorschlag «library-article.css») ist als PILOT
verworfen, weil:
1. Breite Selektoren (`h1`, `.dot`, `.avatar`, `.back`, `.cat`) ohne
   Astro-Scoping seitenweit gälten; Containment bräuchte einen
   Wrapper-Präfix (z. B. `.lib-article h1`), was
2. die Spezifität verschiebt: Astro-Scoping = +1 Attribut-Selektor,
   Wrapper = +1 Klasse → gleiche Stufe, Gewinner hängt an der Reihenfolge;
   Astro bündelt Seiten-Styles in den `<head>`, ein
   `<style set:html>`-Inline-Block im Body käme DANACH und gewänne
   Gleichstände in der falschen Richtung. Beherrschbar, aber nicht «klein».
3. `:global()`-Syntax ist Astro-Compiler-Syntax: beim Verschieben in eine
   echte .css-Datei müssen diese 14 Regeln zu normalem CSS umgeschrieben
   werden (`.kb-body p` statt `.kb-body :global(p)`) — korrekt, aber ein
   weiterer Übersetzungsschritt mit Fehlerpotenzial.
4. Der gewollte `.rel-grid`-Unterschied müsste parametrisiert bleiben.

### Umgesetzte Piloten (Stand a783e61: alle drei gemerged; Deployment-Evidenz siehe §1)

`src/components/library/` enthält jetzt drei geteilte, scoped Komponenten,
Konsumenten jeweils `wissen/[slug].astro` + `koerpersignale/[slug].astro`
(44 + 89 = 133 Leaf-Routen):

1. **FaqBlock.astro** (PR #3): FAQ-Markup + die 7 `.faq`-Regeln verbatim;
   FAQPage-JSON-LD bleibt in den Seiten. Verifiziert: 135 gebaute Seiten
   0 Meta-/DOM-Diffs (Scope-IDs/Bundle-Hashes normalisiert), computed
   Styles + Keyboard (Enter öffnet, Space schliesst, Fokus sichtbar)
   identisch, FAQ-Screenshots pixelidentisch.
2. **AuthorCard.astro** (PR #4): Markup + 8 Regeln inkl. `.avatar--sm
   !important` + 640px-Media-Regel; Familien-Unterschiede als Props
   (`label`, `avatar`/`avatarSm`, fertig berechnete `review`-Zeile — die
   `reviewerName`-Bedingung bleibt in der Wissen-Seite). Gleiches
   Verifikationsraster, alle Screenshot-Paare inkl. KS-Hero pixelidentisch.
3. **ArticleCta.astro** (PR #5): Markup + 4 Regeln; Defaults, `waHref`
   und KS-Tracking-`onclick` bleiben in den Seiten (Props;
   `waOnclick=undefined` rendert wie zuvor kein Attribut). 0 Diffs inkl.
   byte-gleicher onclick-Attribute; `#formular`-Anker + Smoke geprüft.

Erwartbares Build-Artefakt solcher Extraktionen: gehashte CSS-Bundle-Namen
bzw. -Aufteilung der Seiten ändern sich (Astro-Bundling), Regelinhalt nicht.

**Anschluss-Kandidaten, geprüft und bewusst NICHT angeschlossen:**

- **Haut (`haut/[slug].astro`): bewusst eigenes Theme.** Markup des
  FAQ-Blocks ist zwar identisch, aber 2 von 7 Deklarationen nutzen den
  warmen «Haut-Pocket» (`.haut-scope`-Tokens: Border `--h-line` #E2D9C9,
  Chevron `--h-bronze-dk` #7A663F statt `--border`/`--blue`). Anschluss
  würde das Bronze-Theming zerstören oder Theming-Props erzwingen —
  Entscheid pending Hyejin.
- **Fragen (`gesundheitsbibliothek/fragen/[slug].astro`): hat KEIN
  FAQ-Akkordeon.** Kein `details/summary`, bewusst kein FAQPage-Schema
  (die Frage IST der Seiteninhalt, `kb-body`). Nichts zu extrahieren.
- `RelatedGrid` bliebe möglich (`cols`-Prop für 3 vs. 2 Spalten), ist aber
  nicht umgesetzt.

### Ursprüngliche Pilot-Begründung (historisch, FaqBlock)

- Warum dieser Block: Markup in beiden Templates byte-identisch; die
  7 FAQ-Regeln (`.faq-block h2`, `.faq details`, `.faq summary`,
  `.faq summary::-webkit-details-marker`, `.faq summary::after`-Chevron,
  `.faq details[open] summary::after`, `.faq p`) sind identisch, haben KEINE
  breiten Selektoren, keine `:global()`-Abhängigkeit, kein `!important`,
  keine Media-Query und keine Verwendung ausserhalb des Blocks.
  Scoped-Styles wandern mit der Komponente (eigener Scope-Hash auf eigenem
  Markup) → Spezifität, Ladeort und Erscheinung bleiben exakt erhalten.
- Props: `faqs: {q,a}[]` (+ optional `heading`), FAQPage-Schema bleibt in
  den Seiten (unverändert).
- Betroffene Dateien: NEU `src/components/library/FaqBlock.astro`;
  EDIT `src/pages/wissen/[slug].astro` + `src/pages/koerpersignale/[slug].astro`
  (FAQ-Markup + 7 Regeln raus, `<FaqBlock faqs={data.faqs} />` rein).
- Reichweite: alle Leaf-Routen beider Familien = **44 Wissen- + 89
  Körpersignale-Leaves = 133 Seiten** (Hubs `wissen/index` und
  `koerpersignale/index` konsumieren diese Styles nicht und zählen nicht).
- Gewollte Unterschiede bleiben unberührt (`.rel-grid`-Spalten,
  `.ks-sources`, `.lib-row`, `.wa-pullquote`, CTA-Default-Texte).
- Ausbaupfad danach (je eigener kleiner Schritt): `AuthorCard`, `CtaCard`,
  `RelatedGrid`. (Die Erstfassung nahm hier einen `.avatar`-Zweitnutzer im
  KS-Hero an — falsch, siehe Korrektur oben; AuthorCard liess sich dadurch
  komplett extrahieren. Haut/Fragen: siehe «bewusst NICHT angeschlossen».)
- Verifikation: `npm run build`; Pixel-Diff (1440/390) je 1 Wissen- und
  1 KS-Seite mit offenem und geschlossenem FAQ; Grep, dass `.faq`-Regeln in
  den Seiten-Styles nicht mehr vorkommen; bestehende QA-Battery.
- Rollback: 1 Commit, reiner Revert; keine URL-/Daten-/Schema-Änderung.

Inzwischen umgesetzt — siehe «Umgesetzte Piloten» oben.

## 6. Pending Hyejin (Design-Entscheide, hier nur gesammelt)

- Nav/Brand: `nav-rebrand.css`-Palette (#1ED760) vs. tokens-Grün — vereinheitlichen?
- Hero-Familie: SG-Premium-Hero vs. generischer Standort-Hero vs. Library-Hero.
- Karten-System: `.svc-card` / `.city-card` / `.rel-card` / `team-card` konsolidieren?
- CTA-Hierarchie sitewide (Termin anfragen vs. WhatsApp-first vs. SG-Offer).
- Partner-Decks: eigenes Design behalten oder ins neue System?
- EN-Layout: eigenes `global.css`-System angleichen?
- Typo-Skala & `--section-py`-Rhythmus: neue Werte → nur via tokens.css.

Erstellt als Arbeitsgrundlage für Hyejins Figma; Zahlen/Verweise gelten für
`a783e61` (§5-Vergleichszahlen: Ursprungsanalyse auf `d1a4436`) und sind bei
grösseren Content-Batches zu aktualisieren. Komponenten-Handoff: siehe
`docs/DESIGN_SYSTEM.md`.
