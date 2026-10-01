# TCM.ch — Design-System-Handoff (Rebrand-Vorbereitung)

Stand: 2026-10-01, `main` = `a783e61`. Kompakter Handoff für Hyejin (Figma)
und die Implementierung. Architektur-Details: `docs/REBRAND_ARCHITECTURE.md`.

**Wichtig: Die Site ist NICHT durchgängig «skin-ready».** Grosse Familien
rendern aus captured HTML (`src/data/*-leaves/*.html`, `*-body.html`) mit
Inline-Styles; `home.css`/`header.css` tragen Hardcodes; GTM/CookieYes/
Turnstile/OneDoc/Webfonts sind in der QA-Umgebung blockiert und daher nur
eingeschränkt verifiziert. Token-Änderungen allein restylen diese Teile nicht.

## 1. Tokens: Ist-Zustand und Grenzen

- Single Source of Truth: `public/styles/tokens.css` (92 Z.), geladen von
  allen 4 Layouts. Brand-Farben (`--blue` #2D9B6F, `--blue-dark` #1F7A54,
  `--blue-light` #E8F5EE), semantische Aliase, Typo-Skala, `--section-py`,
  Radius-/Schatten-/Motion-Skalen.
- Bekannte Grenzen (Fundstellen in REBRAND_ARCHITECTURE.md §2.2):
  - `public/nav-rebrand.css` definiert ein zweites `:root` mit eigener
    Nav-Palette (#1ED760 «Spotify-Grün») — wichtigste bewusste Abweichung.
  - `public/home.css`: ~159 hartkodierte Brand-Grün-Vorkommen;
    `public/header.css`: 10.
  - Inline-Hardcodes in `standort/*`-Komponenten, `StickyCtaBar.astro`,
    `404.astro`, `luzern/index.astro` u. a.
  - Captured Leaves/Bodies (Beschwerden, Therapien, Home, SG/Bottighofen)
    tragen Inline-Styles im HTML — ausserhalb jeder Token-Reichweite.
- Regel: neue Design-Werte zuerst in `tokens.css`; Hardcodes familienweise
  beim jeweiligen Redesign ablösen; KEIN zweites Token-System.

## 2. Geteilte Komponenten und ihre tatsächlichen Konsumenten

| Komponente | Konsumenten (Ist) |
|---|---|
| `library/FaqBlock.astro` | `wissen/[slug]`, `koerpersignale/[slug]` (44+89=133 Leaves) |
| `library/AuthorCard.astro` | dieselben 133 Leaves |
| `library/ArticleCta.astro` | dieselben 133 Leaves |
| `standort/*` (Hero, UspGrid, Team, IntroNap, Therapien, Kraeuter, Beschwerden, Ablauf, KrankenkassenTeam, Reviews, UeberPraxis, WarumTcm, WeitereStandorte, KontaktForm, FinalCta, CtaBand) | 10 datengetriebene Standorte via `standorte/[slug].astro`; `KontaktForm` zusätzlich `zuerich-bellevue/` |
| `StickyCtaBar.astro` | sitewide (SpaPage/LayoutDe), Opt-out `[data-no-sticky-cta]` |
| `HeroLaunchSG.astro` | nur St. Gallen |
| `LibraryRelated.astro` | Untersuchungen |
| `pro|b2b|reg/*` | B2B-/Regulatorik-Familie |

NICHT komponentisiert (captured HTML): Home-Body, Beschwerden-Leaves (117),
Therapien-Leaves (37), SG- und Bottighofen-Standortseiten, EN (`Layout.astro`,
eigenes `global.css`).

## 3. Repräsentative Templates für Figma

Je eines pro Familie deckt den Grossteil der Site ab:

1. **Home** (`/`) — SpaPage, Conversion-Referenz.
2. **Standort CRO-Flow** (`/standorte/kreuzlingen/` oder `/basel/`) — die
   kanonische Sektionsfolge der 10 migrierten Standorte.
3. **Bibliotheks-Leaf** (`/wissen/narbenbehandlung/` + 1 Körpersignal) —
   Hero, kb-body, ArticleCta, AuthorCard, FaqBlock, Related.
4. **Beschwerden-Leaf** (`/beschwerden/rueckenschmerzen/`) — captured
   Template, grösste SEO-Familie.
5. **Haut-Leaf** (`/haut/…`) — bewusster warmer Theme-Pocket (Bronze).
6. **Hub** (`/gesundheitsbibliothek/`) — Suche + Kartenraster.
7. **Team-Profil** (`/team/…`) + `teamCardHtml()`-Karte.
8. Sonderfälle nur zur Kenntnis: St. Gallen (Flagship/OneDoc), Luzern/
   Bellevue (Pre-Opening), Partner-Decks, EN.

## 4. Bewusste Ausnahmen und geschützte Conversion-Hooks

Ausnahmen (nicht «vereinheitlichen», ohne Entscheid):
- Haut-Theme (`.haut-scope`: `--h-bronze-dk`, `--h-line` …) — gewollt.
- Fragen-Leaves: KEIN FAQ-Akkordeon, kein FAQPage-Schema — gewollt.
- `.rel-grid`: 3 Spalten (Wissen) vs. 2 (KS), identischer Mobile-Override.
- St. Gallen: Offer-Hero + OneDoc (einziger Standort mit Online-Buchung).
- Bottighofen: Fremdmarke «TCM Pelican», eigene Sektionsfolge, keine Reviews.
- Luzern/Zürich-Bellevue: Pre-Opening ohne Clinic-Schema, Warteliste.

Geschützte Hooks (müssen jedes Redesign unverändert überleben; Details
REBRAND_ARCHITECTURE.md §4): `form[data-contact-form]` → `/api/anfrage` →
`dataLayer formular_senden`; GTM `GTM-PZ92Q3KJ` + CookieYes; Turnstile
(`.cf-turnstile`, `tcmTsToken`); `openContactForm()/openTerminForm()/nav()`;
`#siteDrawer`/`body.drawer-open`/`.nav-hidden`; `.scb-bar`-Sticky-CTA;
Prefill (`form-prefill.ts`, `?standort=`); `wa.me/41775236122`-Varianten
inkl. KS-`whatsapp_click`-onclick; OneDoc-Widget (nur SG); `[data-lu-waitlist]`.

## 5. Mapping: Figma-Foundations/-Komponenten → Code

| Figma | Code-Ziel |
|---|---|
| Color/Type/Spacing/Radius/Shadow Styles | ausschliesslich `public/styles/tokens.css` (Werte ersetzen, Namen stabil halten) |
| Button-Komponente | `.btn/.btn--primary/.btn--ghost` in `src/styles/global.css` + `.btn-primary/.btn-white` (SpaPage-Welt, home.css) — zwei Welten, Konsolidierung pending |
| Karten (Service/City/Related/Team/Review) | `.svc-card`, `.city-card`, `.rel-card`, `teamCardHtml()`, Review-Markup — pending-Hyejin-Konsolidierung (§6 Architektur-Doc) |
| Artikel-Bausteine | `library/FaqBlock|AuthorCard|ArticleCta.astro` (Props stehen, nur Styles tauschen) |
| Standort-Sektionen | `components/standort/*` 1:1 |
| Navigation/Footer | `header.css` + `nav-rebrand.css` (Palette dabei in tokens aufgehen lassen) bzw. `footer.css` |
| Formulare | `standort/KontaktForm.astro`, Inline-Form im home-body (captured!), Pro-/Partner-Forms |

## 6. Restarbeit, nach konkretem Rebrand-Nutzen geordnet

**Vor Figma sinnvoll (senkt Umbaukosten, kein Designentscheid nötig):**
1. Tote Standort-Leaves löschen (9 Dateien, nachweislich ungenutzt) —
   weniger irreführende Quellen beim Umbau. Günstig, risikoarm.
2. `RelatedGrid`-Extraktion (`cols`-Prop) — letzter Zwilling der
   Bibliotheks-Leaves, gleiche Verifikationsmethodik wie die drei Piloten.
3. Inventar-Pflege: `nav-rebrand`-`:root`-Werte + `home.css`-Hardcode-Liste
   als Checkliste, damit Token-Swaps nichts übersehen.

**Auf approved Design warten (Designentscheid zwingend):**
4. Nav-Palette (#1ED760) vs. Brand-Grün vereinheitlichen.
5. Button-/Karten-Konsolidierung (zwei Button-Welten, vier Kartenfamilien).
6. Hero-Familie (SG-Premium vs. generisch vs. Library).
7. Haut-Theme: behalten oder ins neue System überführen.
8. Captured-HTML-Familien (Beschwerden/Therapien/Home) restylen — grösster
   Aufwand, erst mit finalen Styles sinnvoll; danach ggf. St. Gallen/
   Bottighofen-Migration mit den dann nötigen Varianten.
9. EN-Layout angleichen; Partner-Decks: eigenes Design behalten?

## Verifikations-Standard (für jeden weiteren Schritt)

Before/After vom selben Baseline-Commit: Build, 0 Meta-/DOM-Diffs
(normalisiert um Scope-IDs/Bundle-Hashes), computed Styles + Screenshots
1440/390 pixelidentisch, `health-audit` + `check-professional` (bekannter
vorbestehender OdA-AM-Fail), keine echten Anfragen/Events. Limitation:
tcm.ch ist aus der Agent-Umgebung egress-blockiert; Live-Checks laufen als
separate Cloud-Session per curl (HTML-Marker), nicht visuell.
