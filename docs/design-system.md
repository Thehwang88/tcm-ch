# TCM.ch Design System V1 — Kanonisches Implementierungsdokument

Stand: 2026-10-10 · Baseline `main = d20a7d3` · Cohort 1
Status-Vokabular: **APPROVED** (freigegeben und live) · **DEPLOYED** (live, aber nie formal als Brand-Entscheid freigegeben) · **PROPOSED** (Vorschlag, braucht Freigabe) · **PENDING BRAND GUIDELINES** (wartet auf die offizielle `TCM.ch Complete Brand Guidelines.pdf`, die ausserhalb des Repos liegt — Inhalte hier NICHT daraus übernommen).

---

## 1. Architektur (Ist)

- **Framework:** Astro 5.6, rein statisch (161 Routen-Dateien → `dist/`), Deploy als Cloudflare Worker `tcm-ch-2`; Push auf `main` = live in ~60–130s.
- **Styling:** `public/styles/tokens.css` (Single Source of Truth, von allen Layouts geladen) → `public/home.css` (462KB Monolith: SPA-Altbestand + Sektions-/Scope-Styles, wird von **allen** Seiten geladen) + `header.css`/`footer.css`/`nav-rebrand.css` + `src/styles/{global,b2b,partner,tool-wizard}.css`. Captured Leaf-HTMLs (`src/data/*-leaves/`) tragen Inline-Styles.
- **Komponenten:** domänenweise (`src/components/standort/` datengetrieben via `src/data/standorte.ts` — Zielmuster; `b2b/`, `partner/`, `library/`, `pro/`, `reg/`; global DeHeader/Footer/StickyCta/TerminForm/…). Header-Markup zentral: `src/data/header.html`.
- **Fonts:** Google Fonts Link in den Layouts — Figtree 400/500/600/700/800, Nunito italic 900. Tokens: `--font-sans`, `--font-accent`. (Self-Hosting = späteres Perf-/DSG-Thema, PROPOSED.)
- **Logos (Quelle = SVG-Dateien, keine Guideline-Doku):** `public/images/logo/` — `tcm-ch-logo-kliniken-black.svg` (aktiv im Header via `header.html`), `tcm-ch-logo-kliniken-mint.svg`, `tcm-kliniken-logo{,-wordmark}.svg`, PNG/WebP-Ableger. Schutzraum-/Kombinationsregeln: **PENDING BRAND GUIDELINES**.
- **Tests/Audits:** `scripts/check-professional.mjs` (B2B-Registry), `scripts/gen-sitemap.mjs` (Build-Step), `scripts/health-audit.mjs`; ab Cohort 1: `scripts/visual-baseline.mjs` (Abschnitt 8).

## 2. Farb-Tokens

### APPROVED (live + in Releases dieses Projekts freigegeben)
| Token | Wert | Rolle |
|---|---|---|
| `--brand` | `#1AE288` | Softriver-Mint, **Flächenfarbe**; Text darauf immer `--brand-black` (11.6:1) |
| `--brand-black` | `#020B10` | Rich Black — Text/Buttons auf Mint, dunkle Flächen |
| `--brand-surface` | `#F2F4F2` | Concrete — helle CTA-Bänder (ZH3-Muster) |
| `--brand-tint` | `#DFFBEE` | sanfter Mint-Tint |
| `--brand-ink` | `#0B7A4C` | barrierefreier Text-/Link-Ableger auf Weiss (5.4:1) |
| `--brand-hover` *(neu, Cohort 1)* | `#14C97A` | Hover/Active auf Mint (war 21× hartcodiert) |
| Geschützt | WhatsApp `#25D366`, Rating-Gold `#F5A623` (nur echte Sterne) | nie umfärben |

### DEPLOYED (Legacy-CI, breit im Einsatz — nicht global flippen!)
`--blue #2D9B6F`, `--blue-dark #1F7A54`, `--blue-light #E8F5EE`, `--green-mint #EAF6F0`, `--surface #F7F8F9`, Neutrals `--black/--charcoal/--mid/--muted/--border`.
**Harte Regel (bewährt):** Legacy-Aliasse (`--blue`, `--green`) werden NIE global remapped. Migration ausschliesslich per Opt-in-Scope (Muster: `.therapie-scope`-Block in home.css remappt nur innerhalb des Wrappers).

### Neue semantische Aliasse (Cohort 1, additiv, noch ohne Konsumenten)
`--text-on-brand`, `--surface-brand`, `--surface-concrete` → ab Cohort 2 die bevorzugten Namen in neuen Regeln.

### PROPOSED (nicht umgesetzt)
- Grau-Konsolidierung: die Tailwind-artigen Hexes in home.css (`#374151` 32×, `#6B7280` 26×, `#E5E7EB` 21×) sind nirgends als Brand definiert → beim Anfassen auf `--mid/--muted/--border` mappen (je Sektion, mit Screenshot-Gate — Werte sind NICHT identisch, daher nie als «stille» Ersetzung).
- `--text-muted-on-dark` für dunkle Bänder.

### PENDING BRAND GUIDELINES
Sekundärfarben, Akzent-Verwendungsquoten, Gradient-/Foto-Overlay-Regeln, finale Freigabe der Gesamtpalette.

## 3. Typografie

- **DEPLOYED:** Figtree 800 für Headings, Nunito 900 italic für `<em>`-Akzente im Heading (Muster `…in <em>deiner Stadt</em>`). Skala in tokens.css: `--fs-hero/h1` clamp(32→50), `--fs-h2` clamp(26→40), `--fs-h3` 20, `--fs-sub` 18, `--fs-body` 16, `--fs-small` 14.5; `--lh-*`, `--tracking-*`.
- **Regel:** neue Komponenten nutzen ausschliesslich `--fs-*`-Tokens, keine neuen px-Festwerte.
- **PENDING BRAND GUIDELINES:** offizielle Hierarchie-Definition, Mindestgrössen, Sprach-/Satzregeln.

## 4. Breakpoint-Kanon (PROPOSED → ab sofort Policy für NEUE Regeln)

`600 · 768 · 900 · 1024 · 1280 · 1440` (max-width-first; 767px-Query des Hero-Mobile-Fixes bleibt als Bestand).
Ist-Zustand: 20+ verschiedene Queries in home.css (900×43, 768×27, 600×20, 560×8, 1024×8, 480×6, …). Bestand wird **nur beim ohnehin Anfassen** einer Sektion migriert, nie pauschal.

## 5. Buttons — Ist und Konsolidierung (PROPOSED, Umsetzung = Cohort 2)

| Generation | Klassen | Vorkommen |
|---|---|---|
| Legacy SPA | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-call`, `.btn-wa`, `.btn-white`, `.btn-outline-white`, `.btn--primary`, `.btn--ghost`, `.btn-lg/.btn-sm` | sitewide |
| Softriver-Hero | `.sr-btn`, `.sr-btn--solid`, `.sr-btn--outline` | Homepage-Hero |
| Therapie-Hero | `.tsr-btn-primary`, `.tsr-btn-ghost` | 11 Therapieseiten |
| Form | `.form-submit` | Formulare |

**Cohort 2a (umgesetzt):** `public/styles/ui.css` mit namespaced `.tcm-btn` + `.tcm-btn--mint` (Pill 999px, min-height 44px, `--surface-brand`/`--text-on-brand`, Hover `--brand-hover`, `:focus-visible`-Outline). Erste Konsumenten: die beiden Homepage-`glb-btn` (Bibliothek- + FAQ-CTA). Befund dabei: Produktion renderte sie bereits Mint/Rich-Black (eine `#home-content .glb-btn`-Regel in home.css überschreibt die Inline-Farben per ID-Spezifität, nicht aber den Radius) — das sichtbare Delta der Migration ist exakt der freigegebene Wechsel 14px → Pill; Box-Metrik (46px, padding 14/24) bewusst identisch gehalten, null Layout-Shift. Die alten `.glb-btn`-Regeln (Inline-`<style>` im Body + home.css) bleiben vorerst als tote Regeln stehen (Dependency-Analyse: keine weiteren Konsumenten; Entfernung in einer Konsolidierungs-Kohorte). `ui.css` ist nur in `index.astro` verlinkt. s-offer-Buttons bewusst NICHT migriert (shiatsu-Slice ohne ui.css).

**Cohort 2b (umgesetzt):** Die beiden Zürich-Funnel-CTAs in `#s-standorte` auf `.tcm-btn--mint.--lg` bzw. neu `.tcm-btn--outline` migriert. Die `#home-content`-!important-Schicht greift nach dem Swap nicht mehr; ui.css baut deren computed styles paritätisch nach (48px, Paddings, Fonts, Border, Mint-Glow, Hover, mobile width:100% @≤600px, reduced-motion) — einzige gewollte Abweichung: Radius 14px → Pill. dataLayer-Events (`homepage_zurich_find_appointment`, `homepage_zurich_hub_click`) und hrefs byte-gleich.

Zielbild (Cohort 2): EIN `.tcm-btn`-System in neuem `public/styles/ui.css` — Varianten `--solid` (Mint/Rich-Black), `--outline` (Rich-Black), `--ghost`, `--whatsapp` (geschütztes Grün), Grössen `--lg/--sm`. Migration je Sektion mit Klick-Ziel- und Tracking-Parität; alte Klassen bleiben, bis ihr letzter Konsument migriert ist. Kanonischer Radius (12px vs. Pill): **PENDING BRAND GUIDELINES / Entscheid Simon.**

**Cohort 3b-A (umgesetzt):** Homepage-Flächenpalette auf exakt Weiss · Concrete · `--brand-tint` · Rich Black (+ Hero-Mint): wa-section und home-cta-Band `#0d0d0d`→`#020B10` (ui.css, `#home-content`-Scope), svc-section-Zebra-Unfall (`.section:nth-child(even)` global) nur auf der Homepage →Weiss, Formular-Sektion inline `--surface`→`--brand-surface`. home.css und alle Fremdrouten unberührt; s-offer/kkc waren bereits auf Token.

**Cohort 3c-A (umgesetzt):** Karten-Angleichung Homepage — city-/svc-Card-Hover von Mint-Tint auf Rich-Black-Border (`#home-content`-Scope, Fremdrouten behalten Mint; translateY/Shadow unverändert); hf-item-Radius 14→`--r-card` 16 (Inline-Styleblock); Kassen-Kompakt-Box 14→16px + `#fafafa`→Weiss (inline). Kein neues Card-Primitive — die 16px/`--border`/`--sh-md`-Sprache ist de-facto-Standard, Shadow-Zweiteilung (Content- vs. Link-Karten) bewusst beibehalten.

**Cohort 3c-B (umgesetzt):** `:focus-visible`-Ring für city- und svc-Cards der Homepage (3px `rgba(2,11,16,.55)`, Offset 3px; ui.css). **Bekannte Lücke:** die 8 svc-Cards sind `<div role="button" tabindex="0" onclick=…>` ohne Enter/Space-Aktivierung (kein keydown-Handler in home.js) — eigene Kohorte.

**Cohort 3c-C (umgesetzt):** Die 8 svc-Cards und die Kräutertherapie-Feature-Card der Homepage sind native `<a href="/therapien/<slug>/">` statt `div/article role="button" onclick="nav(…)"` (Massage-Card war bereits das Vorbild). Gewinn: Enter/Middle-Click/neuer Tab/Kontextmenü nativ, korrekte Link-Semantik, Funktion ohne JavaScript, kein verschachteltes interaktives Element und keine Doppel-Aktivierung mehr in der Kräuter-Card (innerer `<button class="kt-cta">` → `<span>`). Parität: die 8 svc-Anchors tragen `style="text-decoration:none;color:inherit"` inline (Massage-Präzedenz) — eine `a.svc-card`-Regel in der sitewide home.css hätte 106 Routen mit bestehenden Legacy-`<a class="svc-card">` getroffen; die Kräuter-Card nutzt die homepage-only Regel in ui.css. **Scope (explizit freigegeben):** Homepage **und** `/standorte/bottighofen/` (siehe Build-Abhängigkeiten). **SEO:** freigegeben +9 interne Links auf der Homepage, +8 auf Bottighofen; Ziele identisch zu `nav()`. **Bestand:** auf den übrigen Routen existieren `svc-card` weiterhin als Legacy-Implementierung (115 Routen mit der Klasse, 26 davon mit `onclick`) — unverändert, Migration nur in eigener Kohorte. **GTM:** Container liegt ausserhalb des Repos; klassenbasierte Click-Trigger matchen weiter, ein «Just Links»-Trigger würde für diese 9 Karten neu feuern — im GTM-Interface zu prüfen.

### Build-Abhängigkeiten von `home-body.html` (PFLICHT-Check)

`src/data/home-body.html` ist **nicht** homepage-exklusiv. Teile werden zur Buildzeit in andere Routen kopiert:

| Quelle (home-body) | Ziel-Route | Mechanik |
|---|---|---|
| `<section id="s-offer">` | `/therapien/shiatsu/` | `src/pages/therapien/[slug].astro` slict den Block vor `therapie-cities-section` |
| `<div class="svc-grid">` (8 Therapie-Karten) | `/standorte/bottighofen/` | `src/pages/standorte/[slug].astro` ersetzt das Leaf-Grid 1:1 durch das Homepage-Grid |
| `<section id="s-offer">` | `/akupunktur-in-der-naehe/` | `src/pages/akupunktur-in-der-naehe.astro` (Z. 48–49) slict denselben Block (nachgetragen W1B-1-Preflight) |

Weitere Konsumenten von `home-body.html`: `BrandMarquee.astro`. **Regel:** Bevor eine Änderung an `home-body.html` als «homepage-only» bezeichnet wird, ist ein Voll-Diff aller generierten Routen Pflicht und `grep -rl home-body src/` auszuwerten. Homepage-only-Styles in `ui.css` wirken in den kopierten Blöcken **nicht** (ui.css lädt nur auf `/`).

### Wave 1 · Standort-Familie (10.10.2026, live `146e603`)

**Template-Familie (maschinell verifiziert):** `src/pages/standorte/[slug].astro`, data-driven Branch aus `src/data/standorte.ts` = **10 Routen**: basel (cro/v2/planned), frauenfeld (cro/v2), winterthur-marktgasse (cro/v2), zuerich-oerlikon (cro/v2), kreuzlingen, rorschach, volketswil, wil, winterthur-muenzgasse, zuerich-hoengg (cro). Scope-Hook: Klasse `std-ds` am `#page-standort`-Wrapper, gesetzt nur im data-driven Branch.

**Ausnahmen der Familie (unverändert):** Leaf-Branch `/standorte/st-gallen/` (Absolutschutz) und `/standorte/bottighofen/` (Leaf + Homepage-svc-grid-Slice); eigene Templates `/standorte/bern/` und `/standorte/luzern/` (Luzern-Template), `/standorte/zuerich-city/`, Kosten-Seiten (`/standorte/{basel,frauenfeld,kreuzlingen,luzern,zuerich}/kosten/`) — Bern, Luzern, Zürich City und Kosten ×4 seit W1B-1 migriert (siehe unten), Hub `/standorte/`, `/akupunktur-tcm-{basel,st-gallen,zuerich}/`, `/massage-*/`.

**Änderungen (alle aus freigegebenen Homepage-Mustern, home.css-Block mit `#page-standort.std-ds`-Scope):** Karten-Anchors `a.svc-card` ohne UA-Linkblau/Unterstreichung (vorher sichtbar unterstrichen — echter Live-Bug); Marketing-`btn-primary` als Pill (Form-Submit bleibt 14px); Dark-Band `sg-merged-cta` `#0d0d0d`→Rich Black; Zebra-Sektionen `#FAFAFA`→Weiss; svc-Card-Hover Rich Black + Fokusring. **Nachtrag:** `.city-card`-Hover Rich Black + Fokusring per Opt-in über bestehende Familien-Hooks (Beschwerden 153, Therapien 16, Standort-Template 10, `/standorte/`, `/akupunktur-in-der-naehe/`); bewusst ausgenommen: Homepage (hat es bereits), St. Gallen, Bottighofen, Zürich-Hub, `/akupunktur-tcm-st-gallen/`.

**Offene Issues Standort-Familie (nicht umgesetzt):** (1) Bottighofen svc-Cards ohne sichtbaren Tastatur-Fokus; (2) Bottighofen eigene Kräuter-Card `article role=button` ohne Enter; (3) Bottighofen 8 Leaf-eigene `div.svc-card role=button` ohne Enter; (4) `div.city-card` mit onclick (19 Routen inkl. Standort-Template) nicht tastaturfokussierbar; (5) Sektionsflächen `#F7F8F9` statt Concrete (Folgekohorte); (6) Fliesstext `#0d0d0d` statt `#020B10` (visuell vernachlässigbar).

### Wave 1B-1 · `.standort-scope`-Familie (10.10.2026, lokal, Freigabe ausstehend)

**Kohorte (exakt 7 Routen):** `/standorte/{frauenfeld,kreuzlingen,luzern,zuerich}/kosten/`, `/standorte/bern/`, `/standorte/luzern/`, `/standorte/zuerich-city/`. **Hook:** bestehende Opt-in-Klasse `.standort-scope` (Alias-Remap Z. ~4969 + CTA-Regel); neu gesetzt nur am `<div class="akz">` der 4 Kosten-Bodies (`src/data/*-kosten-body.html`). `.akz` allein ist NIE Selektor (teilt sich mit `/akupunktur-st-gallen-kosten/`, `/akupunktur-tcm-st-gallen/`, `/akupunktur-tcm-zuerich/`). Reichweite build-verifiziert: `standort-scope` auf exakt 7 von 767 Routen.

**Änderungen (home.css-Block «WAVE 1B-1», alle Selektoren mit `.standort-scope`):** Alias-Remap greift jetzt auch auf den Kosten-Seiten (Body-Links/CTA Legacy-Grün → Rich Black/Mint, CTA-Band `#2D9B6F` → Rich Black, Hero/Hinweisboxen `#EAF6F0` → Tint); Token-Remap `--black` → Rich Black, `--surface` → Concrete, `--muted` → `--mid`, `--green-mid` → `#BDF4DC` (Homepage-Wert), `--sh-btn(-hover)` → Mint-Schatten des Standort-Templates; Zebra `#FAFAFA` → Weiss (wie W1); Marketing-CTAs (`btn-primary/-secondary/-white`, Outline-CTAs im Dark-Band) Pill; `.section-label` Rich Black (wie Homepage/Template); `.usp-sub` `--mid`; `.usp-title` Rich Black; Zeit-/Micro-Badges Legacy-Grün-Tint → Concrete + `--border`.

**Verifiziert (computed, 7 Routen × 360/390/430/768/1280/1440):** 0 Geometrie-Shifts, 0 Overflow; ausschliesslich Farb-/Flächen-/Radius-/CTA-Schatten-Transitions; 0 Legacy-Werte (`#2D9B6F`, `#1F7A54`, `rgba(47,163,107,…)`, `#EAF6F0`, `#F7F8F9`, `#FAFAFA`, `#0d0d0d`, `#888`) im routeneigenen Content; 0 Kontrast-Fails (AA) im routeneigenen Content (vorher 10/Kosten-Seite, 1 Bern, 1 Luzern); Tab-Reihenfolge, Ziele, dataLayer-Events, Akkordeons (Enter/Space, `<details>`), Wartelisten-Formulare Bern/Luzern (gemockter POST `/api/anfrage`, identischer Payload) paritätisch; einzige Fokus-Änderung: Kosten-CTA erhält den freigegebenen 3px-Rich-Black-Ring. HTML-Diff der Kosten-Seiten = nur die Klasse; Bern/Luzern/Zürich City byte-identisch.

**Bewusst unverändert (dokumentierte Ausnahmen):** Formular-Submit der Wartelisten (10px, funktionale Control-Variante); WhatsApp-Grün; sitewide Chrome (Header, Footer `#0d0d0d`, Drawer, WhatsApp-Widget-CTA 12px, ~70 Kontrast-Fails pro Seite im Shared Chrome) → W6, nicht routenspezifisch.

**Acceptance je Route:** `/standorte/zuerich-city/` **FULL** (routeneigener Content). Bern, Luzern, Kosten ×4 **PARTIAL** — offen nur Karten-Radien ausserhalb der 16px-Karte (Bern/Luzern `usp-card` 14px, `be-/lu-card` 24px; Kosten `akz-table-wrap` 14px) und Luzern `kt-feature`-Fläche `#F8FAF9` (nicht Palette). Severity: Low. Familienweit offen (auch Standort-Template): `btn-secondary` 14px und `#F7F8F9`-Flächen auf den 10 Template-Routen (W1-Nachzug).

## 6. Seiten-Archetypen

| Archetyp | Quelle | Status |
|---|---|---|
| Homepage | `index.astro` + `home-body.html` | Softriver-Hero live; Rest Legacy |
| Standort | `standorte/[slug].astro` + `standorte.ts` (+ Leaf-Ausnahmen) | datengetrieben = Zielmuster |
| Therapie | `therapien/[slug].astro` + Leaves | CRO-modernisiert (AKU1-Standard), `.therapie-scope` |
| Beschwerde/Symptom | `beschwerden/…` | Legacy |
| Körpersignale | `koerpersignale/` | Legacy |
| Wissen/Bibliothek | `gesundheitsbibliothek/`, `wissen/`, `library/*`-Komponenten | teilmodern |
| Hub/Index | `therapien/index`, `standorte/index`, `beschwerden` | Legacy |
| Partner/B2B | `partner/`, `b2b/*`, PartnerLayout | eigenes Styling (b2b.css) |
| Conversion-Landings | `massage-*`, `akupunktur-tcm-{stadt}`, `selbsttest`, `kontakt` | gemischt |
| Doc/Legal | DocPage (agb, impressum, datenschutz) | separat, niedrige Prio |
| EN | `en/` | separat (Build-Nondeterminismus en/knowledge dokumentiert) |

**Ausnahmen (nie generisch migrieren):** `/standorte/st-gallen/` (Absolutschutz: OneDoc-Widget `7a0d…794`, GA4 `G-NHZ8Y6V840`, Turnstile, Build-Guards werfen Fehler), `/akupunktur-tcm-zuerich/` (eigener Funnel + zuerich-termin.ts), B2B-Scaffolds (noindex, keine Einträge ohne Freigabe).

## 7. Geschützte Conversion-Komponenten & SEO-Regeln

**Ohne separates Gate niemals ändern:** URLs/Slugs, Canonicals, Metadata, Heading-Semantik, Structured Data (`buildTherapyLd()`, FAQ_OVERRIDE elektroakupunktur, parseLeafFaqs), sitemap/robots, interne Link-Ziele (href-Multiset-Beweis!), Inline-Formular → `/api/anfrage` + `formular_senden`-Event, `wa.me`-Links + wa_click, tel:-Links, dataLayer-Events (z. B. homepage_zurich_*), StickyCta, Turnstile, Honeypot-Status (fehlt in Therapie-Leaves — dokumentierte Lücke, eigenes Follow-up).
**Build-Abhängigkeit:** Homepage `#s-offer` wird zur Buildzeit 1:1 in `/therapien/shiatsu/` geslict — jede Homepage-Änderung an dieser Sektion erscheint im shiatsu-Diff (erwartet führen!).
**Medizin/Copy:** keine Outcome-/Heilversprechen, Qi/Meridiane nur unter `/gesundheitsbibliothek/tcm-verstehen/` erklärt, keine erfundenen Testimonials, Du-Form.

## 8. Visuelle Regression (ab Cohort 1)

Werkzeug: `scripts/visual-baseline.mjs` (Puppeteer, nutzt vorhandenes devDependency — nichts installiert).

```
node scripts/visual-baseline.mjs --out .visual-baseline/<label>   # Baseline erzeugen
node scripts/visual-baseline.mjs --compare .visual-baseline/A .visual-baseline/B
```

- **Routen:** `/` · `/standorte/frauenfeld/` (Standort v2) · `/team/astrid-lenggenhager/` (Therapeutin) · `/therapien/akupunktur/` (Therapie-Referenz) · `/beschwerden/rueckenschmerzen/` (Condition) · `/gesundheitsbibliothek/` (Wissen-Hub).
- **Breiten:** 360, 390, 430, 768, 1280, 1440.
- **Stabilität:** fester Viewport (deviceScaleFactor 1), `document.fonts.ready`; lazy-Images auf eager gestellt, Scroll-Through (lädt Bilder, triggert `.reveal`-IntersectionObserver), `img.decode()` je Bild + Nachprüf-Schleife auf `naturalWidth` (bis 5×1s); Animationen/Transitions per injiziertem Style deaktiviert, `prefers-reduced-motion` emuliert; serviert aus `dist/` über einen lokalen Node-HTTP-Server (kein Netz, kein GTM — Analytics lädt lokal nicht, dokumentierte Abweichung zur Produktion). Determinismus-Nachweis Cohort 1: zwei unabhängige Läufe aus zwei Builds → 36/36 Screenshots byte-identisch.
- **Dynamische Regionen (dokumentiert und neutralisiert):** Homepage-`#stats-bar` mit `.count-up[data-target]`-Zahlenanimation (home.js) — das Skript **wartet**, bis jede Zahl ihren data-target-Endwert erreicht hat (hartes Setzen würde vom rAF-Loop überschrieben); Turnstile rendert lokal nicht (env-gated) — bekannter, stabiler Unterschied. Keine Carousels/Zeit-Widgets auf den 6 Referenzrouten.
- **Vergleich:** `--compare` prüft SHA-256 + Dateigrösse je Shot und listet Abweichungen. Byte-Gleichheit gilt **nur in derselben Umgebung** (gleiches Chromium/OS) als Erwartung; über Umgebungen hinweg gilt: Abweichungsliste manuell visuell prüfen.
- **Retention:** Screenshots werden NICHT committed (`.visual-baseline/` in `.gitignore`; ~36 PNGs/Lauf, mehrere MB). Baseline wird je Kohorte frisch vom Basis-Build erzeugt, verglichen, danach verworfen.

## 9. Validierungs-Standard je Kohorte (bewährt, bindend)

1. Cache-clean Builds (`rm -rf node_modules/.astro node_modules/.vite .astro dist`), nie parallel; Build-Artefakte danach via `git checkout -- public/sitemap.xml seo/health-library-audit.json`.
2. Voll-Diff `dist/` (SHA-Tree) gegen frische main-Baseline mit **expliziter Erwartungsliste**; `en/knowledge` nur per Set-Beweis (href-Multiset + @type-Multiset) als Nondeterminismus klassifizierbar.
3. Pro betroffener Route: Canonical/Title/DESC/H1, LD-JSON-Validität, @type-Multiset, href-Multiset, Claim-Residuen.
4. Visual Baseline (Abschnitt 8) vorher/nachher.
5. 7-Breiten-Overflow-Check, Mock-Submits (fetch gemockt — nie echte Anfragen), `check-professional.mjs`.
6. Byte-Identität aller Schutzrouten.
7. Rollback: eine Kohorte = ein Commit = `git revert`.

## 10. Barrierefreiheit & Responsive-Anforderungen

- Kontraste: Text auf Mint = `--brand-black` (11.6:1); Mint-Text auf Weiss nie `--brand`, immer `--brand-ink` (5.4:1); Ziel WCAG AA (4.5:1 Fliesstext, 3:1 Large/UI).
- Fokus: sichtbare `:focus-visible`-Outline (Hero-Muster: 3px rgba-Outline) für alle neuen Interaktiven.
- Touch-Ziele ≥44px; `prefers-reduced-motion` respektieren (12 Queries existieren — beibehalten).
- Mobile-first: kein horizontaler Overflow (Gate), 16px-Gutter-Minimum für Text, Bilder full-bleed nur als bewusstes Muster (Hero: `aspect-ratio:1/1`, `object-position:36% center` — **eingefroren, nicht anfassen**).

## 11. Migrationsstrategie (inkrementell)

Kohortenplan siehe Preflight-Report (Chat, 2026-10-10): 1 Foundations (dieses Dokument) → 2 Button-/CTA-Primitives (`ui.css`, nur Homepage) → 3 Sektions-Rhythmus Homepage → 4 Cards/Trust Homepage → 5 Nav/Footer → 6 Harmonisierung → 7 Rollout je Seitenfamilie (Therapien → Standorte → Hubs → Wissen → B2B). Jede Kohorte: eigener Branch ab main, ein Commit, Gates aus Abschnitt 9, separate Freigabe, Rollback = revert. Alte Klassen/Styles werden erst entfernt, wenn ihr letzter Konsument migriert ist (PurgeCSS bleibt deaktiviert bis zu einem eigenen Audit).

## 12. Rebrand-Programm, Coverage & Abschluss-Kriterien (verbindlich)

**North Star:** Das Redesign ist erst abgeschlossen, wenn JEDE öffentliche HTML-Route auditiert und in das freigegebene Designsystem gebracht ist. Konsistenz = gemeinsame Markensprache, nicht identische Layouts.

**Wellen:** W1 Standorte · W2 Therapien · W3 Beschwerden · W4 Gesundheitsbibliothek/Körpersignale/Wissen · W5 Therapeut:innen, Hubs, B2B, Sondertemplates · **W6 Full-Site-Konsistenz-Audit & Remediation (Pflicht)**.

**Pro Kohorte Pflicht:** Coverage-Matrix unten aktualisieren; Wirkung über **gerenderte computed styles** belegen (nicht über CSS-Quelländerungen); generated-route-Dependency-Check (siehe Build-Abhängigkeiten); Ausnahmen nur dokumentiert und begründet (zulässig z. B. WhatsApp-Grün, Rating-Gold, bildgetriebene Sonder-Heroes, klinische/B2B-Templates, funktionale Control-Varianten) — keine Ausnahme als Schlupfloch für Altbranding.

**Abschluss-Gates (A–J):** A 100 % Routen enumeriert/klassifiziert · B 100 % automatisierte Brand-Assertions bestanden oder dokumentierte Ausnahme · C jedes Template/jede Ausnahme visuell geprüft · D keine offenen High-Severity-Inkonsistenzen · E Logos, Headings, Buttons, Cards, Forms, Flächen konform · F repräsentative Screenshots 360/390/430/768/1280/1440 bestanden · G Buchung, Formulare, CTAs, Analytics funktional · H SEO/Content/Canonical/Schema/Indexierbarkeit intakt · I A11y-Checks bestanden, Restgrenzen benannt · J finaler Route-Coverage-Report (getestet/bestanden/offen). Kein «complete» aus Stichproben-Screenshots allein.

### Coverage-Matrix (Stand 11.10.2026, Build `6a9eadf`+Wave 4: 766 HTML-Routen, davon 21 noindex; `/sprechstunde/` seit 6a9eadf stillgelegt)

| Familie | Routen | Status |
|---|---|---|
| Homepage | 1 | Kohorten 1–3c live (Hero, CTAs, Flächen, Karten, Fokus, native Karten-Links) |
| Standorte (data-driven Template) | 10 | **W1 live** (`146e603`); offen: `btn-secondary` 14px, `#F7F8F9`-Flächen, div-city-cards |
| Standorte (Ausnahmen: St. Gallen, Bottighofen, Bern, Luzern, Zürich City, Kosten ×5, Hub) | 11 | **W1B-1 lokal:** Zürich City FULL; Bern, Luzern, Kosten Frauenfeld/Kreuzlingen/Luzern/Zürich PARTIAL (nur Karten-Radien, Luzern kt-feature-Fläche); offen: Hub (nur Hover), Basel-Kosten (massage-city.css); geschützt: St. Gallen, Bottighofen |
| Standort-Landingpages (`akupunktur-tcm-*`, `massage-*`, `akupunktur-in-der-naehe`, `akupunktur-st-gallen-kosten`) + Kosten-Seiten ×5 | 13 + 5 | **Wave 4A lokal** (§18): 17 Routen `.city-scope` FULL; `/akupunktur-tcm-zuerich/` geschützt (Mint-led, unverändert) |
| Therapien | 37 | **Wave 2A+2B lokal** (Tokens, Flächen, Eyebrows, H2, Pillen-CTAs, Karten, Chips, FAQ, Formulare, Kontrast) — Template PARTIAL bis 2C (Hero/Layout) |
| Beschwerden | 155 | **Wave 2A+2B lokal** (wie Therapien) — Template PARTIAL bis 2C (Hero/Layout) |
| Gesundheitsbibliothek / Körpersignale / Wissen | 201 / 95 / 54 | **Wave 3 live `e951e74`** (§17): Artikel 297 + Hubs 53 = 350 Routen Template-Layer konform (Hero Concrete, Prosa 640px, Links, Labels, Karten, Boxen, CTA-Card, FAQ, Autor, Formular-Geometrie); kein TOC (Markup-Entscheid offen) |
| `/wissen/` Hub (SpaPage) · Haut (`.haut-scope`, Gold-Sub-Brand) · Praxiswissen/Regulatorik/Branche (`.b2`, B2B) · Visuals | 1 / 37 / 37 / 11 | offen (W4b: Haut nach Design-Entscheid Gold vs. Brand; B2B separat; Visuals) |
| Team-Profile `team/[slug]` | 17 | **Wave 4B lokal** (§19): Template FULL |
| Partner, Branche, Regulatorik, Praxiswissen, Tools, Karriere, Krankenkassen, Ergebnisse, Sonderseiten | ~60 | offen (W5) |
| EN | 51 | offen (W5/W6) |
| Legal (AGB, Impressum, Datenschutz) | 3 | offen (W6, niedrige Prio) |

## 13. Global Shell (Header · Drawer · Footer) — Batch 01

Shell-Compliance wird **getrennt** von Seiten-Template-Compliance geführt: eine Route kann eine konforme Shell und ein noch offenes Template haben (Coverage-Matrix oben = Templates).

**Stacks & Konsumenten (Build 10.10.2026, 768 HTML):** LayoutDe 478 · SpaPage 229 + 3 Eigen-Heads mit Shell (Home, Longevity, Selbsttest) · EN `Layout.astro` 51 = **761 Shell-Routen**. Ohne Shell (unberührt): `/club/`, `/partner/bern/` (PartnerLayout), 5 Visual-Handouts.

**Dateien:** Footer-Markup `src/data/footer.html` (DE) + `src/components/FooterEn.astro` (EN), beide `<footer class="site-footer">`; Footer-Layer `public/footer-rebrand.css` (als **letztes** Stylesheet in LayoutDe, SpaPage, Layout/EN und den 3 Eigen-Heads); Header/Drawer DE `public/nav-rebrand.css`; Header/Drawer EN scoped in `Header.astro`.

**Footer-Spezifikation:** Fläche `--brand-black`; Logo `tcm-ch-logo-kliniken-mint.svg` (168px); Spalten-Labels 11px/700/.16em uppercase in `--brand` (wie Brand-Signature-Eyebrow, 11.6:1); Links 14.5px/500 `rgba(255,255,255,.74)` (≈10:1), Hover Weiss + Mint-Unterstreichung, 36px-Rhythmus (mobil 40px); Copy/Labels `rgba(255,255,255,.62)` (≈7:1); Trennlinie `rgba(255,255,255,.12)`; Grid Desktop `1.5fr + 3×1fr`, ≤1024 Marke voll + 3 Spalten, ≤600 2 Spalten (Standorte voll, Liste 2-spaltig); mobil bleibt der Sticky-CTA-Abstand (88px) erhalten. Keine Social-Icons ohne echte URLs.

**Header/Drawer-Regeln:** Neutral-Töne nur als `rgba(2,11,16,α)` (Rich Black), keine `#191414`/Legacy-Grün-Reste; Sekundärtexte im Drawer/Mega-Panel α ≥ .6 (AA); Drawer-Gruppen `role="group"` + `aria-labelledby`; Header-Höhen (76/80px), Logo-Grössen, Nav-Struktur und Ziele unverändert. EN: nur semantische Farb-Tokens (Hover/Akzente Rich Black, Drawer-CTA Mint + Rich-Black-Text) — EN-Layout-Redesign = eigene Kohorte.

**Fokus:** helle Flächen `outline:3px solid rgba(2,11,16,.55)` (Outline folgt der Elementform, kein Radius-Override); Footer `outline:3px solid var(--brand)` offset 3px.

**Accessibility-Status (Batch 01):** Footer 0 Kontrastfehler auf 761 Routen × 390/1440 (vorher bis zu 47 Textelemente unter AA je Route, min. 1.5:1); Drawer 0 (vorher Labels 2.7:1, Beschreibungen 2.2:1); S1-Verhalten (Fokus-Falle, Escape + Fokus-Rückgabe, inert/visibility, reduced motion) unverändert verifiziert DE + EN.

**Stacking (B2, behoben):** Root-Stacking-Kontext, alle Shell-Schichten sind direkte `body`-Kinder. Reihenfolge: Drawer 901 > Overlay 900 > Footer 600 > InsuranceBanner-Sticky 560 > Sticky-CTA/Concierge 540 > WhatsApp-FAB 500 > Header 200. Der Footer liegt über allen schwebenden Bottom-Controls, aber nie über dem offenen Drawer. Seiteneigene `<footer>`-Elemente in Shell-Seiten: `z-index:auto` (Sprechstunde-Panel).

**Behoben (B1):** `/datenschutz/` — SPA-Altlast nach dem Rechtstext (Modal, Legacy-Footer, ungeschlossenes `<script>`) entfernt; Shell-Footer und WhatsApp-FAB wieder vorhanden, Rechtstext byte-identisch.

**Verbleibende Ausnahmen:** Sprechstunde-Panel-Footer bleibt Template-Sache. Footer-Brandleiste (Partner-Logos) und «QI CLUB»-Markenname unverändert. Live-404: `/404.html` läuft in eine Redirect-Schleife und unbekannte URLs liefern einen leeren 404-Body (Routing/Config, separates Ticket).

## 14. Wave 2A+2B — Therapien & Beschwerden (Template-Layer)

**Reichweite (Build 10.10.2026):** 192 Routen = `.symptom-scope` 155 (154 Beschwerde-Leaves + Hub) + `.therapie-scope` 37 (32 SpaPage + 5 LayoutDe: `akupunktur/{bauch,laser,schaedel}akupunktur`, `ynsa`, `verfahren`). Die Scope-Wrapper umschliessen die Seite zwischen Header und Footer und kommen auf keiner anderen Route vor. Nachweis: 0 Style-Änderungen auf den 45 übrigen SpaPage-Routen; 0 HTML-Änderungen auf den 187 SpaPage-Zielrouten (nur `/home.css`, `no-cache`); 5 LayoutDe-Seiten nur Scoped-Style-Diff.

**Dateien:** `public/home.css` (Block «Wave 2A+2B», am Dateiende); Token-Zeile im Page-Style von `src/pages/therapien/akupunktur/[slug].astro` und `…/verfahren/index.astro`.

**Regeln:**
- *Tokens im Scope:* `--black`/`--charcoal` → Rich Black, `--surface` → Concrete, `--muted` → `--mid` (AA), `--border` → `rgba(2,11,16,.1)`, `--sh-md`/`--sh-lg` → ruhige Rich-Black-Schatten. Harte Legacy-Flächen: `.section:nth-child(even)` #FAFAFA → Concrete, `.sg-merged-cta` #0d0d0d → Rich Black.
- *Eyebrow (`.section-label`):* 11px/700/.16em, `--brand-ink` (5.4:1 auf Weiss, ≈4.9:1 auf Concrete) mit 16×2px-Mint-Strich.
- *H2:* `.section-title` mit `--tracking-heading`; Inhalts-H2 Figtree 800, Rich Black.
- *CTAs:* `.btn-primary`, `.btn-secondary`, `.btn-white` als Pille (100px); Höhe und Padding unverändert; Secondary-Hover Concrete und Rich-Black-Rand.
- *Karten:* `--r-card` 16px; Haarlinie `rgba(2,11,16,.1)`; Hover-Rand `rgba(2,11,16,.22)` statt Mint-Tint; Link-Karten mit Fokus-Ring.
- *Chips:* Rand `rgba(2,11,16,.14)`, Hover Tint #DFFBEE; Fokus-Ring 3px `rgba(2,11,16,.55)` (auch FAQ-Buttons/-`summary`, A–Z).
- *FAQ:* Radius 14px, Token-Rand. *Formularfelder:* Rand `rgba(2,11,16,.45)` (3:1, WCAG 1.4.11), Radius 12px, Fokus Rich-Black-Rand + Mint-Ring.
- *WhatsApp:* Icon/Fläche bleiben #25D366; Text auf Weiss bzw. auf Grün in Rich Black.
- *Spezifität:* `:not(#w2)` hebt Regeln auf ID-Spezifität, um die `[id^="page-"]:not(#page-longevity)`-Schicht (1,2,0 !important) per Quellreihenfolge zu schlagen.

**Bewusst unverändert:** Hero-Struktur (nur Kontrastfarben in Crumb/Meta/Eyebrow/A–Z), Rating-Sterne Gold (freigegebene Ausnahme), WhatsApp-Markengrün für Icon/Fläche, Copy, Medizin-/Evidenz-/Red-Flag-Texte, Links, Formular-Logik, Sektionsreihenfolge.

**Geometrie:** Eyebrows −1 bis −2px Höhe (11.5/12.5 → 11px), sonst keine Massänderung an Buttons, Karten, Textumbruch.

**Accessibility-Status:** Content-Kontrast auf allen 192 Routen × 390/1440: 11'352 → 0 Textelemente unter AA (Rating-Sterne ausgenommen; Text auf Bildern nicht automatisch messbar). Fokus sichtbar auf Chips, FAQ, Karten-Links, Inputs.

**Compliance-Zählung (getrennt):** Shell konform 761/761 · Template-Layer 2A/2B: 192/192 Therapie-/Beschwerde-Routen · voll konform (Shell + Template inkl. Hero/Layout): 0 dieser 192 bis Wave 2C. Kein «complete» aus Token-Assertions allein.

**Verbleibende Lücken:** Hero-Varianten uneinheitlich (Beschwerde weiss/Foto, Therapie Mint, Massage eigene `msg-*`-Heroes, Hubs `bx-`/`hh-`); Sektionsdichte der Beschwerde-Leaves (≈16'000px bei 1440); `/akupunktur-kinder/` (Therapie-Markup ohne Scope) ausserhalb Wave 2; Massage-Stadtseiten `massage-*` und Krankenkassen-Seiten nutzen dieselben Komponenten ohne Scope.

**Wave 2C (Richtung, freigegeben):** Beschwerde-Hero primär Concrete/Weiss mit kontrollierten Mint-Akzenten (verwandt, aber unterscheidbar vom Mint-Therapie-Hero); Sektions-Rhythmus und -Zusammenfassung, Lesebreite ≈68ch für Langtext, mobile Abstände; Markup-Änderungen in `beschwerden/[slug].astro` und den Leaf-Daten nur mit SEO-/Link-Paritätsnachweis.

## 15. Wave 2C-1 — Typografie & Inhalts-Rhythmus (Therapien & Beschwerden)

**Reichweite:** dieselben 192 Routen wie §14 (`.symptom-scope` 155 · `.therapie-scope` 37). Nur CSS (`public/home.css`, Block «Wave 2C-1»); 0 HTML-Änderungen; Hero-Markup und Sektionsreihenfolge unverändert.

**Regeln:**
- *Fliesstext:* `.content-body`, `.therapie-text`, `.msg-prose` — 16.5px / 1.7, max. 640px (≈72–76 Zeichen bei 1440/768, 35–41 mobil); Absätze/Listen zusätzlich selbst auf 640px begrenzt (robust gegen seitenspezifische Container wie `.msg-kk-grid`). ≤768px: 16px / 1.65.
- *Hierarchie:* H2 Figtree 800, `clamp(24px,2.4vw,30px)`, `--tracking-heading`, Rich Black, Abstand 48/14 (mobil 40/12); H3 18px/700.
- *Inline-Links:* nur klassenlose `<a>` in Prosa (`.content-body`/`.therapie-text`/`.msg-prose` sowie `p`/klassenlose `div` direkt unter `.wrap`, inkl. Verschachtelung in strong/em/span): Rich Black 600, 2px Mint-Unterstreichung (Offset 3px), Hover Tint + Brand-Ink-Linie, Fokus 3px-Ring. Ursache des Browser-Blaus: SpaPage lädt `global.css` (`a{color:inherit}`) nicht. Buttons, Karten, Crumbs, Navigation tragen Klassen oder stehen direkt in `.wrap` und sind damit ausgeschlossen (nachgewiesen: 0 Style-Änderungen an klassierten Ankern/Buttons/Crumbs auf 8 Routen).
- *Eyebrows:* `.cp-blick-label`, `.cp-blick-item-label`, `.sub-eyebrow`, `.sg-eyebrow` (Premium-Heroes), `.kt-intro-label` → 11px/700/.16em Brand-Ink (`!important` gegen die globale `#374151!important`-Schicht, home.css Z.1003); `.cp-blick-label` und `.sg-eyebrow` mit Mint-Strich. Auf Mint-Flächen (`.tsr-eyebrow`, `.hh-eyebrow`, `.bx-eyebrow`) Rich Black 11px/700/.16em.
- *Rhythmus:* `.section` 80px (mobil 48) · Link-Module `.section.cl-related` 56px (mobil 36, `!important` gegen Inline-Padding) · `.related-section`/`#kontakt` 80 (56) · `.subpage-reviews` 64 (48) · `.cta-band` 88 (64).

**Nicht angefasst (Ausnahmen):** LayoutDe-Akupunktur-Unterseiten (`.kb-body` 17.5px/720px, `.box-label`, `.rel-label` in Page-Styles), `/akupunktur-kinder/` (kein Scope), Hub-Heroes (`bx-`, `hh-`) ausser Eyebrow-Farbe, Premium-Hero-Layout (→ 2C-2).

**Messwerte:** Rückenschmerzen 1440: 16'172 → 16'462px (+1.8%, grössere Schrift überwiegt die Modul-Kompaktierung); mobil 390: 25'036 → 26'258px. Kein Clipping, kein Overflow; vorbestehend bei 360px: `.content-card`-Grid auf Sub-Hero-Seiten ragt 30px über den Viewport (innerhalb `overflow:hidden`, unverändert).

## 16. Wave 2C-2 — Hero-Designsystem (Therapien Mint-led · Beschwerden Concrete/Weiss)

**Umsetzung:** CSS-only (`public/home.css`, Block «Wave 2C-2») auf dem bestehenden Hero-Markup; die Heroes liegen in den Leaf-/Body-HTML-Dateien (`src/data/symptom-leaves/*`, `therapie-leaves/*`, `massage-*-body.html`), 0 HTML-Änderungen. Bilder bleiben die bestehenden Originalfotos.

**Reichweite (192 Routen):**

| Hero-System | Routen | Behandlung |
|---|---|---|
| `#symptom-premium-hero` (Beschwerde) | 137 (128 ohne Bild, 9 mit Foto) | Concrete-Fläche, Mint-Strich beim Eyebrow, Mint-Primär-CTA, weisse Meta-Pills, Foto 24px-Radius mit Mint-Akzentbalken; ohne Bild einspaltig (`:has()`), Textblock 820px |
| `#symptom-hero.sub-hero` (Beschwerde) | 17 | Concrete statt Verlauf, Pill-Badge weiss, Meta-Pills, gleiche Typo |
| `.tsr-hero` (Therapie, Mint) | 11 (8 Basis + 3 Varianten `--solo` Elektro, `--kt` Kräuter, `--ga` Gesichtsakupunktur) | Typo/Labels/Meta-Pills harmonisiert, Foto als 24px-Panel statt Vollbleed; Varianten über die generischen `.tsr-hero`-Regeln abgedeckt (Nachweis 11.10.2026: Mint-Fläche, Rich-Black-Pill-CTA, Bild 24px; `--ga` behält ihre eigene H1-Clamp 30–52px) |
| `#therapie-premium-hero` (vorher weiss) | 9 inkl. Hanbang | → Mint-led: Mint-Fläche, Rich-Black-Primär-CTA, Ghost-Sekundär, Meta-Pills, Foto 24px |
| `section.msg-hero` (Massage/Ohrakupunktur) | 11 | → Mint-led, Crumb/CTAs/Trust-Pills im selben System; Inhalte, Anker und Formular-Links unverändert |
| Hubs `.bx-hero` (/beschwerden/), `.hh-hero` (/therapien/) | 2 | unverändert (eigene Templates) |
| LayoutDe `.hero` (Akupunktur-Unterseiten) | 5 | unverändert (kein home.css) |
| `/akupunktur-kinder/` | — | ausserhalb der 192 (kein Scope); nur zur Vollständigkeit |

**Gemeinsame Hero-Sprache:** Eyebrow 11px/700/.16em (Brand-Ink + Mint-Strich auf hellen Flächen, Rich Black auf Mint); H1 Figtree 800, `clamp(38–40px, 4.6vw, 64px)`, line-height 1.02, `--tracking-heading`; Lead 18px/1.6 (`--mid` bzw. Rich Black 82 % auf Mint); Pillen-CTAs; Meta als Pills (weiss auf Concrete, weiss 55 % auf Mint); Bildradius 24px, Schatten `0 24px 60px` Rich Black 10–18 %. Mobil ≤768: Padding 32/36, H1 `clamp(32px, 8.4vw, 42px)`, Lead 16.5px, Foto 4:3, Silbentrennung (`hyphens:auto`, `lang="de-CH"`) für lange Titel, Crumb-Umbruch.

**Fokus/Kontrast:** Rich-Black-CTA auf Mint mit weissem 3px-Fokusring; Mint-CTA auf Concrete mit Rich-Black-Ring; min. Textkontrast in allen Heroes ≥ 4.87:1 (Trenner `›` 5.09:1). Kein Text auf Bildern.

**Technik:** `:not(#w2)`-Spezifität gegen die `[id^="page-"]`-Schicht für Sekundär-Buttons; absolut positionierte `.tsr-right img` mit expliziten Breiten (`width:auto` streckt ersetzte Elemente nicht).

**Ausnahmen/Risiken:** `:has()` ohne Support (ältere Browser) → bildlose Heroes bleiben zweispaltig wie bisher; Hubs und LayoutDe-Heroes folgen in einer eigenen Kohorte.

**Hero-Zählung (abgeglichen 11.10.2026):** 137 + 17 + 11 + 9 + 11 = **185/192 Heroes im 2C-2-System**, 7 dokumentierte Ausnahmen (Hubs `/beschwerden/`, `/therapien/` · LayoutDe-Akupunktur-Unterseiten ×5). Die frühere Angabe «182/192, 10 Ausnahmen» war ein Zählfehler: die drei `.tsr-hero`-Varianten (`--solo`, `--kt`, `--ga`) waren in der Tabelle als «8» statt 11 geführt, und `/akupunktur-kinder/` wurde als Ausnahme mitgezählt, obwohl es nicht zu den 192 Scope-Routen gehört.


## 17. Wave 3 — Gesundheitsbibliothek · Körpersignale · Wissen (Template-Layer, **live `e951e74`**, 11.10.2026)

**Umsetzung:** neues Stylesheet `public/knowledge-rebrand.css`, in `LayoutDe.astro` nach `footer-rebrand.css` verlinkt (ein `<link>` auf allen 478 LayoutDe-Routen; `_headers` `no-cache` wie nav-/footer-rebrand). 0 Markup-, 0 Copy-, 0 Reihenfolge-Änderungen; keine Page-Scoped-Styles angefasst. Reichweite ausschliesslich über Strukturanker, die nur in den Wissensvorlagen vorkommen (Fingerprint über alle 478 LayoutDe-Routen):

| Anker | Routen | Templates |
|---|---|---|
| `main > article:not([class])` (Artikel) | 297 = Bibliothek 149 · Körpersignale 94 · Wissen 54 | `koerpersignale/[slug]`, `wissen/[slug]`, `fragen/[slug]`, `was-jetzt/[slug]`, `befunde-werte/[slug]`, `untersuchungen/*` (27), `perspektiven/[slug]` + Shared `ArticleCta`, `AuthorCard`, `FaqBlock`, `LibraryRelated`, `TerminForm` |
| `main > section.hero/.section > .wrap.narrow` (Hubs + TCM-verstehen-Leaves) | 53 = Bibliothek 52 · `/koerpersignale/` | `gesundheitsbibliothek/index`, `koerpersignale/index`, `koerper/[region]`, `fragen/`, `was-jetzt/`, `befunde-werte/`, `untersuchungen/`, `tcm-verstehen/`, `tcm-verstehen/[sektion]`, `tcm-verstehen/[sektion]/[slug]`, `perspektiven/` |

**Ausgeschlossen (keine Stiländerung, per Sweep belegt):** `article.therapie-scope` (5 Akupunktur-Unterseiten, einzige andere `.wrap.narrow`-Konsumenten), `article/div.haut-scope` (37, Gold-Sub-Brand), `div.b2` (Praxiswissen 17 · Regulatorik 12 · Branche 8), `/wissen/` (SpaPage, `home.css`), Kontakt/Zuweisen/Ergebnisse (`section.hero` ohne `.wrap.narrow`), Legal, Team, Visuals. Spezifität: `:not(#w3)` über Astro-Scoped-Styles (`[data-astro-cid]` auf jedem Element); `!important` nur bei `.faq summary` (global.css pinnt `#0D0D0D!important`).

**Designsystem (gerenderte computed styles, 21 Repräsentanten × 390/1440):**
- Hero: Concrete-Fläche (`--brand-surface`) mit Hairline, Padding `clamp(48–72px) / clamp(40–52px)` (mobil 40/32); Eyebrow `.cat` 11px/700/.16em Brand-Ink + Mint-Strich; H1 Figtree 800 `clamp(32px, 4vw, 46px)`/1.06 Rich Black, max. 820px (mobil `clamp(28px, 7.6vw, 34px)`); Lead/Deck 18px/1.6 `--mid`, max. 680px (mobil 16.5px); Crumbs/Zurück/Meta Rich Black 60–70 % statt Grün; Hub-Hero-Bild 20px-Radius + weicher Schatten.
- Prosa `.kb-body`: 16.5px/1.7 (mobil 16/1.65), Lesebreite 640px am Element (`p, ul, ol, h2, h3, blockquote, Callouts`), `.read` 640px; H2 `clamp(24px, 2.4vw, 30px)`/800, 48/14 Abstand; H3 18px/700; Gruppen-/Modultitel `clamp(22px, 2.2vw, 26px)`; `strong` Rich Black.
- Inline-Links (Prosa, Quellen, Einordnung, Listen, Kurz-Boxen): Rich Black + 2px Mint-Unterstreichung, Hover Tint-Fläche; Listen-Links (`.q-list`, `.back`) ohne Dauer-Unterstreichung; Karten-Weiterlinks («Mehr →») Brand-Ink, Rich Black bei Karten-Hover. Kein Mint-Text.
- Sektionslabels einheitlich 11px/700/.16em: Brand-Ink auf Weiss (`rel-label`, `ks-sources-label`, `lib-row-label`, `mr-label`, `a-label`, `diag-label`, `lib-rel-label`, `axis-label`), Rich Black auf Tint/Boxen (`box-label`, `ein-label`, `wa-callout-label`, `cta-eyebrow`); Karten-Kicker 10.5px/.14em Brand-Ink. **Sicherheits-Labels bleiben Amber** (`.box--warn`, `.about--safety`, `#92400E`/`#c8842a`).
- Hinweis-/Kurz-Boxen (`.kurz`, `.short`, `.wa-callout`, `.info-note`): Tint-Fläche, 3px Mint-Kante, Radius 0/16; `.box` Hairline 16px; `.box--pro` Concrete; `.einordnung`/`.about` Mint-Kante (im Concrete-Hero weiss).
- Karten (`rel-, cat-, hub-, sig-, diag-, region-, leaf-, p-card, feat, soon-card, author-card`): Hairline `rgba(2,11,16,.1)`, 16px, Standard-Hover (Rahmen .3, Schatten `0 12px 28px` 7 %, −2px); Chips Pill, Hover Tint; Fokus überall 3px Rich-Black-Ring (Sticky-CTA-Buttons ausgenommen).
- CTA-Card Tint-Fläche, 20px, 28px Padding; `.btn` Pill 15px/700: Primär Mint/Rich Black (Hover `--brand-hover`, Lift), Ghost weiss/Rich Black (Hover Concrete). Autor-Avatar Rich Black; FAQ Hairline, Summary Rich Black, geöffnet Rahmen .28; Bibliothek-Suche Fokus Rich-Black-Rahmen + Mint-Ring. Terminformular: nur Submit-Pill, Feld-Radius 12px, Titel/Hinweis-Farbe; Felder, Logik, Tracking unverändert (Anker auch für `article + section.tf-section` in was-jetzt/befunde-werte; `/kontakt/` und Standorte unberührt).
- Rhythmus: Hero → Inhalt 56px (mobil 40), Artikel-/Hub-Sektion unten 80px (mobil 56); Related 56/28.

**QA (11.10.2026, Build `feat/wave3-knowledge`):** Build grün; `check-professional` 103 Einträge / 0 Fehler; `health-audit` 0 Fehler. Generated-Route-Diff gegen `91ea8a2`: 478 Routen nur `<link>`-Zeile, 508 byteidentisch, 0 sonstige HTML-Diffs (Titles, Metas, Canonicals, Schema, interne Links, noindex unverändert). Unrelated-Routen-Sweep (474 Checks SpaPage + Therapie/Beschwerde-Scope): 473 identisch, 1× ±1px Höhe (Silbentrennung). Text-/Link-/Tel-/WhatsApp-Parität der 350 Wissensrouten gerendert (siehe Report). Interaktion: Hover/Fokus auf Karten, Chips, Buttons, Prosa-Links, FAQ, Suche verifiziert; Formular-Submit (gemockt) sendet unverändert `POST /api/anfrage` + `dataLayer form_submit`; Sticky-CTA-Klassen unverändert; Overflow 360/390/430 = 0. Screenshots 360/390/430/768/1280/1440 für 14 Repräsentanten vorher/nachher; Seitenhöhen: Artikel mobil −3 bis −9 % (16.5px statt 17.5–20px), Desktop +2 bis +12 % (Hero-Fläche, Abstände).

**Kontrast (Sweep 351 Wissensrouten × 390/1440):** 13'852 → 12 Textelemente unter AA, alle ausserhalb der Vorlagen-CSS: Inline-Styles im Inhalt (`.ouch-mag-row` «Aus dem Magazin» in 2 Wissen-Artikeln: `#8a919c`-Label, `var(--blue)`-Link — Markup-Sache, Content-HTML geschützt). Mobil-Overflow: vorbestehender Langwort-Überlauf (H1 «Wechseljahresbeschwerden», CTA-Card-Titel neben Portrait, 19px über 390px) per `overflow-wrap:anywhere` + `hyphens` behoben → 0.

**Bewusst nicht:** kein Inhaltsverzeichnis (TOC = Markup-Entscheid, keine Vorlage hat eines → Vorschlag für Wave 3b), kein Hero-Umbau (Concrete-Fläche genügt der Hierarchie), keine Änderung an Krankheits- vs. Entscheidungsseiten-Struktur, keine Bilder.

**Verbleibende Ausnahmen / nächste Batches:** Haut (`.haut-scope`, Gold-Palette → Design-Entscheid), `/wissen/`-Hub (SpaPage, 2 blaue Default-Links), Perspektiven «Demnächst»-Karten (nur Concrete-Fläche), B2B (`.b2`), Visuals; LayoutDe-Akupunktur-Unterseiten (teilen Klassen `.kb-body`, `.rel-card` — bewusst ausgeschlossen, eigener Batch mit `.therapie-scope`-Hook). `:has()`-Fallback: ohne Support bleibt nur die Hub-Hero-Fläche weiss (Artikel-Hero nutzt kein `:has()`).

**Compliance-Zählung:** Shell 761/761 · Template-Layer Therapien/Beschwerden 192/192 · Heroes 2C-2 185/192 (§16) · **Wissens-Template-Layer 350/350 live** (Artikel 297 + Hubs 53), Hero-System Wissen 350/350 (Concrete) · gesamt Template-konform lokal 542 Routen von 767.

**Live-Verifikation 11.10.2026:** `/knowledge-rebrand.css` 200 · text/css · no-cache · byteidentisch; 17 Routen (Wissen, Home, geschützte) byteidentisch zum Release-Build; Formular-Endpoint unverändert (308 → 422 bei leerem Body).

**Offener Content-Fix (separat, nicht Teil einer Design-Wave):** 3 Elemente in `/wissen/akupunktur-bei-rueckenschmerzen/` und `/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/` (`.ouch-mag-row` aus `src/data/ouch-links.ts`; dieselbe Zeile in `src/data/ueber-uns-body.html`): Label «Aus dem Magazin.» `#8a919c` 11px → 3.18:1, Link `var(--blue)` 15.5px → 3.48:1, Pfeil-Span. Vorbestehend, durch Wave 3 unverändert. Zweizeilige Korrektur im Inline-Style: `color:#8a919c` → `color:rgba(2,11,16,.62)` und `color:var(--blue,#2D9B6F)` → `color:var(--brand-black,#020B10);text-decoration:underline;text-decoration-color:var(--brand,#1AE288);text-decoration-thickness:2px;text-underline-offset:3px`.

**Wave-6-Abschluss (Wissen):** TOC-Entscheid; Haut-Entscheid; LayoutDe-Akupunktur-Batch; danach Gate C (visuelle Prüfung aller 13 Wissens-Templates) und Gate J (Route-Report) für die Familie.

## 18. Wave 4A — Standort- und City-Landingpages (Template-Layer, lokal)

**Scope-Gate (34 Kandidaten = 21 `/standorte/*` + 13 Landingpages):**

| Klasse | Routen | Behandlung |
|---|---|---|
| Standard-Standorte, W1 fertig (`#standort-flagship-hero`, datengetrieben) | 11 (basel, bottighofen, frauenfeld, kreuzlingen, rorschach, volketswil, wil, winterthur-marktgasse, winterthur-muenzgasse, zuerich-hoengg, zuerich-oerlikon) | unverändert (byteidentisch) |
| Hub `/standorte/` (`.hh-hero`, Mint) | 1 | unverändert |
| `.lsr-hero`-Standorte (`.standort-scope`, Mint-led) | 3 (bern, luzern, zuerich-city) | nur klassenlose Prosa-Links (`.wrap > p a`, `.usp-sub a`) von Browser-Default-Blau → Rich Black + Mint-Strich; Zürich City: Links waren bereits Rich Black, erhalten den Strich (bewusst, ein Link-System) |
| **msg-Familie** (`massage-city.css`, City-Landing) | 10 (massage-{basel,frauenfeld,kreuzlingen,luzern,oerlikon,st-gallen,winterthur,zuerich}, akupunktur-tcm-basel, standorte/basel/kosten) | **`.city-scope`** → Mint-Hero wie Massage-Therapieseiten (2C-2), Prosa 2C-1, Pillen-CTAs, Karten/Chips/FAQ, InsuranceBanner-CTA Rich Black |
| **akz-Familie** (Body-HTML mit Inline-`<style>`) | 6 (standorte/{frauenfeld,kreuzlingen,luzern,zuerich}/kosten, akupunktur-tcm-st-gallen, akupunktur-st-gallen-kosten) | **`.city-scope`** → Concrete-Hero (wie Beschwerden/Wissen), Brand-Ink-Eyebrow mit Mint-Strich, H1 clamp(34–52px), Bild 24px, Tabellen-Hairlines; OneDoc-Widget (St. Gallen ×2) unberührt (Script/Markup identisch, nur umgebende Flächen) |
| `/akupunktur-in-der-naehe/` (Inline-Styles) | 1 | **`.city-scope`** → Inline-Tint-Hero → Concrete, CTA-Band Rich Black (Token-Remap `--blue`), City-Cards 16px |
| Geschützt | `/standorte/st-gallen/` (Absolutschutz, OneDoc/GA4/Build-Guards), `/akupunktur-tcm-zuerich/` (eigener Funnel, Build-Guards) | unverändert (Sweep + Screenshots identisch) |
| Nicht Standort | `/akupunktur-kinder/` (Therapie-Leaf) | ausserhalb |

**Mechanik:** Wrapper `<div class="city-scope">` in 17 Astro-Vorlagen (Slot-Seiten: um die Fragments/Komponenten; Body-Prop-Seiten: um den Body-String) — einzige HTML-Änderung (17 Routen «wrapper-only», 751 HTML-Routen byteidentisch). `public/home.css`: die 69 `:is(.symptom-scope,.therapie-scope)`-Listen und die 19 `.therapie-scope .msg-*`-Regeln um `.city-scope` erweitert (Wirkung auf die bestehenden Scopes unverändert, Sweep-Nachweis), plus Block «Wave 4A» (Token-Remap `--green*`/`--blue*` → Brand, akz-Hero, Karten, Chips, InsuranceBanner, Kontrast-Nachzug, `.standort-scope`-Prosa-Links). `massage-city.css` nicht angefasst → 11 Massage-/Ohrakupunktur-Therapieseiten byteidentisch und im Sweep unverändert.

**Bewusste Geometrie-/Layout-Änderungen:** msg-City-Heroes 38/26 → 72/64px Padding, H1 46 → 60px, Foto als 24px-Panel; akz-Heroes 96px Tint → Concrete 72/52px; Sektions-Rhythmus 80px (2C-1); Seitenhöhen Desktop +0.1 … +2.3 % (msg), −3.7 … −4.6 % (akz, naehe), mobil −0.2 … +1.2 %.

**QA (11.10.2026):** Build grün; check-professional 103/0; health-audit 0. Route-Diff: 17 wrapper-only, 751 identisch, 0 sonstige; nur `home.css` geändert. Kontrollsweep (474 SpaPage-/Scope-Checks): 432 identisch, 2× ±1px Höhe (Silbentrennung), 40 City-Checks geändert = genau die 20 Zielrouten. Rendered-Parität 34 Standort-/Landing-Routen (Text, Links, tel, WhatsApp): 34/34 identisch. Formular (MassageAnfrageForm, gemockt): `POST /api/anfrage` Payload + `dataLayer formular_senden` identisch zu vorher; OneDoc-Script auf beiden St.-Gallen-Landingpages vorhanden und unverändert. Hover/Fokus auf Karten, Pillen, Buttons, Prosa-Links, FAQ, InsuranceBanner verifiziert; Overflow 360/390/430 = 0. Screenshots 15 Routen × 6 Breiten vorher/nachher inkl. geschützter Routen (St. Gallen, Zürich-Funnel, Basel-Flagship, Klassische Massage, Home: identische Höhen). Kontrast Kohorte (20 Routen × 390/1440): 431 → 0 Textelemente unter AA (Rich Black 62 % für Meta-Texte, WhatsApp-Alternativlink als Rich-Black-Text mit grünem Icon).

**Verbleibende Ausnahmen:** `/standorte/st-gallen/` und `/akupunktur-tcm-zuerich/` (geschützt, bereits Mint-led); 11 Flagship-Standorte (W1, offen: `btn-secondary` 14px, `#F7F8F9`-Flächen, FIGCAPTION-Text auf Bild); Bern/Luzern-eigene Scoped-Styles (Karten 24px, bereits brand-nah).

## 19. Wave 4B — Therapeut:innen-Profile `team/[slug]` (Template-Layer, lokal)

**Scope:** 17 Profile aus `src/data/therapeuten.ts` (eine Vorlage, `article.tp`). Nur der Scoped-`<style>`-Block der Vorlage wurde ersetzt; Markup, Klassen, Daten, `bookingHref`, Person-/Breadcrumb-Schema, Meta, Canonical, Bilder und Alt-Texte unverändert (17 Routen: ausschliesslich der Hash des gebündelten `_astro/_slug_.*.css`; 751 übrige HTML-Routen byteidentisch).

**Design:** Hero als Concrete-Panel (28px, 44px Innenabstand; mobil 20px/20px) mit Portrait-Panel 24px-Radius und weichem Rich-Black-Schatten (mobil 18px); Eyebrow (Berufsbezeichnung aus `t.titel`, unverändert) 11px/700/.16em Brand-Ink + Mint-Strich; H1 Figtree 800 `clamp(32px, 4.2vw, 50px)` Rich Black (mobil `clamp(28px, 7.6vw, 34px)`); Ort Rich Black 70 %; Kurztext 16.5px/1.7, max. 560px; Pills Tint/Rich Black, Badges weiss mit Hairline; Primär-CTA «Termin buchen» Rich-Black-Pille (WhatsApp-Icon bleibt im Button), Sekundär-CTA Ghost; Standort-Karten Hairline 16px mit Standard-Hover, «Termin buchen» Mint-Pille, «Standort ansehen» Rich Black + Mint-Strich; Fakten-Karten 16px mit Brand-Ink-Labels; Sektionen H2 `clamp(24px, 2.4vw, 30px)`, Prosa 16.5px/1.7 bei 640px, Tags als Pillen, Ausbildungs-/Register-Listen mit Hairlines, Status-Pillen Tint; Abschluss-CTA Tint-Fläche 24px; alle Links Rich Black mit Mint-Strich; Fokus 3px Rich-Black-Ring; `prefers-reduced-motion` ohne Transitions/Lift; mobile Sticky-CTA unverändert (fixed, z 150), Rich Black.

**Fachliche Korrektheit (geprüft, gerendert):** Markus Muschal → «Physiotherapeut» (kein TCM-Label); Ji Eun Lee Tremmel → «Heilpraktikerin TCM», Standorte Frauenfeld + Winterthur Münzgasse; Natalia Goc → «Naturheilpraktikerin TCM & Physiotherapeutin»; alle 17 Profile: Text, Links, tel/WhatsApp gerendert identisch zu vorher (17/17). Keine Änderung an `therapeuten.ts`.

**QA (11.10.2026):** Build grün; check-professional 103/0; health-audit 0. Hover/Fokus (CTA, Ghost, Standort-Buchen, Links, Crumbs, Register-Link, Details-Summary) verifiziert; Tastatur: erstes Tab-Ziel mit 3px-Ring; `prefers-reduced-motion: reduce` → kein Transform; Overflow 360/390/430 = 0; Portraits laden (630px, Alt «Name, Titel bei TCM.ch»); Initialen-Fallback Tint→Concrete. Screenshots 17 Profile ATF 390/1440 und 5 Repräsentanten × 6 Breiten vorher/nachher. Kontrast 17 Profile × 390/1440: 541 → 0 Textelemente unter AA (Crumb-Trenner 58 %, Meta-Texte Rich Black 62 %).

**Bewusst nicht:** keine neuen Angaben, Spezialisierungen oder Qualifikationen; keine Nunito-Zitate ausser dem bestehenden `.tp-quote`-Slot; keine Änderung an Buchungszielen (WhatsApp-Team-Nummer bzw. `bookingUrl`).

## 20. Wave 4 — Transplantation auf `6a9eadf` und Compliance-Stand (11.10.2026)

**Basis-Wechsel:** Wave 4A/4B wurden lokal auf `e951e74` entwickelt (`89b20fc`, `64c866a`); `origin/main` ist zwischenzeitlich um 12 Local-SEO-Commits auf `6a9eadf` vorgerückt (298 Dateien: Trust-Claims, Betriebsstatus-Gate `locations.ts`/`check-clinic-status.mjs`, Zürich-Hub, `/sprechstunde/` 410). Überlappung mit Wave-4-Quellen: 10 Dateien, in allen Fällen nur Copy/Frontmatter/FAQ-Text bzw. eine `<p>`-Zeile (team/[slug]) gegen Wrapper-/Style-only-Änderungen → koexistent, SEO-Inhalt massgebend. Transplantation per `cherry-pick -x` in isoliertem Worktree `feat/wave4-rebase`: **4A `0f59902`** (aus 89b20fc), **4B `dee9aaf`** (aus 64c866a); hinzugefügte/entfernte Zeilenmengen identisch zum Original; alle neueren SEO-Zeilen erhalten («Wir melden uns persönlich» statt «innert Minuten»; Münzgasse «Standort in Prüfung»; Basel «Eröffnung geplant März 2027»).

**Re-QA auf neuer Basis:** Build, check-professional 103/0, health-audit 0, **check-clinic-status 0** (neues Gate). Route-Diff 4A: 17 wrapper-only, 749 identisch, nur `home.css`; 4B: 17 Routen nur CSS-Hash, 749 identisch. Reichweite der erweiterten Selektoren im Build: `.symptom-scope` 155 · `.therapie-scope` 37 · `.city-scope` 17 · `.standort-scope` 3 (bern, luzern, zuerich-city) — 20 Zielrouten = 17 Wrapper-Routen (einzige HTML-Änderung) + 3 `.standort-scope`-Routen, deren Default-Blau-Prosa-Links per computed style von `rgb(0,0,238)` → Rich Black + Mint-Strich wechseln (Zürich City: bereits Rich Black, nur Strich). Kontrollsweep 474 Checks: 430 identisch, 2 transiente Höhen-Messungen (St. Gallen 1440, Bindegewebsmassage 390) bei Wiederholung 3× identisch (12357px / 7535px); City-Checks 40/40 geändert. Parität Text/Links/tel/WhatsApp 34/34 Standort-/Landing-Routen und 17/17 Profile; Formulare (massage, termin, deckung, allgemein) senden identische Payloads + `dataLayer formular_senden`; OneDoc-`widgetConfigs` auf St. Gallen ×3 byteidentisch; `/akupunktur-tcm-zuerich/`, `/standorte/basel/`, Klassische Massage, Home an 6 Breiten pixel-/höhenidentisch. Kontrast Kohorte 433 → 0, Profile 541 → 0; Overflow 0.

**Compliance (766 Routen, getrennt geführt):**

| Ebene | Konform | Offen / Ausnahmen |
|---|---|---|
| Shell (Header · Drawer · Footer) | 759/759 Shell-Konsumenten | 7 ohne Site-Shell (5 Visual-Handouts, `/club/`, `/partner/bern/`) — bewusst |
| Template-Layer FULL | 576 = Therapien/Beschwerden 192 · Wissen 350 · City-Landing 17 · Team 17 | PARTIAL: Bern/Luzern/Zürich City 3 (Links), 11 Flagship-Standorte (W1), Kosten/Landing geschützt 2; offen: Haut 37, B2B 53+3, `/wissen/`-Hub, 5 LayoutDe-Akupunktur, EN 51, Legal 3, Sonderseiten |
| Hero-System | 569 = 185 (2C-2) · 350 (Concrete, Wissen) · 17 (Mint msg / Concrete akz / Concrete naehe) · 17 (Team-Panel) | Mint-led, aber nicht formal abgenommen: Hubs `/beschwerden/`, `/therapien/`, `/standorte/`, 4 `.lsr-hero`, Funnel Zürich; alle übrigen offen |
| Routen vollständig (Shell + Template + Hero) | 576 | — |
| Geschützte Ausnahmen (nie generisch migrieren) | `/standorte/st-gallen/`, `/akupunktur-tcm-zuerich/`, B2B-Scaffolds (noindex) | — |

Keine Route gilt als FULL allein durch CSS-Reichweite; Grundlage sind computed styles, Parität und Screenshots je Vorlage (§18/§19). Wave-6-Gesamtaudit bleibt Pflicht.

**Release-Transplantation auf `d25d0a2` (11.10.2026, Freigabe):** `origin/main` rückte erneut vor (`5665256` → `d25d0a2`, Phase-3 Local-SEO: Basel aktiv, Praxis-Hwang-Identität, St. Gallen/Winterthur Claims). Überlappung mit Wave 4: `home.css` (eine fremde `#page-standort a.svc-card`-Zeile) und 7 Seiten (Titles/Descriptions/FAQ/Schema/`standort`-Prop) — koexistent, SEO massgebend. Cherry-pick auf `d25d0a2`: **4A `40e44461`**, **4B `4f54fc7f`**, Docs `c6eed2dc`; Zeilenmengen identisch. Gates: professional 103/0, health 0, clinic-status 0, standort-ux 0. Route-Diff: 732 identisch + 17 wrapper-only + 17 CSS-Hash = 766; nur `home.css`. Kontrollsweep 474: 431 identisch, 1 transiente ±1px. Parität 34/34 + 17/17; Formulare (massage/termin/deckung/allgemein) Payload + `dataLayer` identisch; OneDoc auf beiden St.-Gallen-Landingpages vorhanden; Status-Aussagen (Oerlikon, Basel, Münzgasse) wortgleich zur Basis, alte Claims («~1h», «innert 24», «drei Adressen») 0 Treffer. Kontrast 433 → 0 / 543 → 0. Geschützte Routen an 6 Breiten höhen-/pixelidentisch.

**Routenzahl 768 → 766:** `/sprechstunde/` (6a9eadf, 410) und `/wissen/akupunktur-in-meiner-naehe-schweiz/` (ab68390, 301 → `/akupunktur-in-der-naehe/`) wurden upstream entfernt; keine Generierungsänderung durch Wave 4 (0 Routen hinzugefügt/entfernt).

## 21. Wave 5A — B2B-/Professional-Layer `src/styles/b2b.css` (Template-Layer, lokal)

**Inventar (reconciled):** 56 Professional-/B2B-Routen = 53 `.b2`-Routen (Praxiswissen 7 · Regulatorik 6 · Branche 5 · Tools 4 · Partner 3 · Fachpersonen 1 · Karriere-Standortleitung 1 · Scaffolds `/jobs/`, `/verzeichnis/`, `/weiterbildungen/`, `/marktplatz/`, `/community/` 5 · Einträge/Übersichten 21) + 3 ausserhalb `.b2`: `/karriere/` (Scoped `pt-*`), `/akademie/` (Scoped `ak-*`), `/partner/bern/` (PartnerLayout, `partner.css`, noindex, ohne Shell). `b2b.css` wird ausschliesslich von den 53 `.b2`-Routen konsumiert (25 Importer, gebündelt in `_astro/_slug_.*.css`); `partner.css`, `tool-wizard.css` (`rn-*`) und die Scoped-Styles von Karriere/Akademie sind getrennte Bäume. Formulare: `.b2-form`/`.field` (Partner, Standortleitung, Fachpersonen), Tools-Wizard (`rn-*`), alle Endpoints/`tcmTsToken`/dataLayer unverändert.

**Design (nur `src/styles/b2b.css`, 420 → 552 Zeilen):** (1) Token-Migration des bestehenden Blocks: Legacy-Grau `#8f8f8f … #b8b8b8` → Rich Black 62 %, Hairlines `#e3e3e3 … #efefef` → `rgba(2,11,16,.1)`, `var(--blue*)` → `--brand`/`--brand-ink`/`--brand-tint`, Radien `--r-card`/`--r-hero` → 16/24px, `--surface` → Concrete, Flow-/Modell-Markierungen Rich Black bzw. Tint. (2) Premium-Block «Wave 5A»: Hero Concrete mit Hairline-Abschluss, `clamp(64px, 9vh, 112px)` Padding, H1 `clamp(38px, 5vw, 64px)`/1.02 (Artikel-Hero `clamp(32px, 4.2vw, 50px)`), Lead 17–19.5px bei 34em; Eyebrows (`.b2-label`, `.b2-cat h2`, `legend`, `.reg-map__h`, `.pro-wiw > p`) 11px/700/.16em Brand-Ink mit Mint-Strich, in dunklen Panels Weiss 72 %; Sektionen `clamp(64px, 9vh, 104px)`; Buttons als Pillen — Primär Rich Black/Weiss (Hover `#1f2a30`, Lift), Ghost Hairline, innerhalb `.b2-cta`/`.b2-dossier` Mint/Rich Black; Karten Hairline 16px, Hover Border 30 % + Schatten + 2px-Lift; Prosa 16.5px/1.7 Rich Black 70 % bei 640px, H2 `clamp(24px, 2.4vw, 30px)`; alle Inline-Links Rich Black mit 2px-Mint-Strich (Hover Tint); Kurzantwort Tint mit Mint-Kante, Take-aways Concrete 20px, Callouts Tint, dunkle Panels 24px; Formularfelder 12px/Hairline 18 %, Fokus Rich Black + Mint-Halo; Checkboxen `accent-color` Rich Black, gewählte `.b2-check` Tint; KPI-/Journey-Akzente Brand-Ink; Fokus `3px rgba(2,11,16,.55)` (dunkle Panels Weiss); `prefers-reduced-motion` ohne Transition/Lift; mobile Grössen < 600px. Kontrast-Anhang: Tools-Gruppen-Titel (`.b2 .tl-grp .tl-h`), `rn-time`/`rn-trust` 62 %, `rn-btn` Rich-Black-Pille.

**Bewusste B2B-Differenzierung erhalten:** Concrete-Hero statt Mint-Hero, Rich-Black-Primär-CTA (Mint nur in dunklen Abschluss-Panels), Dossier-/Flow-/Rechner-Module, Kennzahlen-Hierarchie; keine neuen Kennzahlen, Claims, Testimonials, Konditionen.

**QA (11.10.2026):** Build grün; check-professional 103/0; health-audit 0; clinic-status 0; standort-ux 0. Route-Diff gegen `2b552ad8`: 53 Routen nur CSS-Hash (`_slug_.Dax5NdJv` → `_slug_.Dnxn5V4-`), 713 identisch, 0 sonstige; 766 Routen, keine hinzugefügt/entfernt; keine weitere Datei im Build geändert. Rendered-Parität (Text, Links, tel, WhatsApp, Formular-Attribute) 57/57 B2B-Routen identisch. Kontrast Kohorte 53 `.b2`-Routen × 390/1440 (106 Checks): 1522 → 0 Textelemente unter AA; die 85 verbleibenden Treffer der Sweep-Kohorte liegen ausschliesslich auf `/karriere/`, `/akademie/`, `/ueber-uns/` (5B/5C). Overflow 360/390/430: 0 neu; `/tools/bab-navigator/@390` 21px ist Bestand (vor und nach identisch, `rn-*`-Wizard). Interaktionen (CDP forcePseudoState): Primär-/Ghost-Pillen, Karten-Lift, Link-Strich, Fokus-Ringe, Summary/Details, Formular-Fokus verifiziert; `prefers-reduced-motion` → kein Transform; gemockte Submits (Partner, Standortleitung, Fachpersonen) verhalten sich identisch zur Basis (kein JS verändert). Screenshots: 20 Repräsentanten ATF 390/1440 vorher/nachher; 16 Routen × 6 Breiten (360/390/430/768/1280/1440) — Seitenhöhen −1 … −10 % (dichtere Prosa-Masse, kleinere Legacy-Abstände), keine Layout-Brüche.

**Ausnahmen:** `/partner/bern/` (private Präsentation, PartnerLayout + Progress-JS) bewusst nicht angefasst; `/karriere/` und `/akademie/` folgen in 5B (eigene Scoped-Styles), `/ueber-uns/` in 5C.

**Compliance-Update (766):** Template-Layer FULL 576 → 629 (+53 B2B); Hero-System 569 → 622 (+53 Concrete-B2B-Heroes); offen im B2B-Umfeld: 3 (Karriere, Akademie, Partner/Bern). Wave-6-Gesamtaudit bleibt Pflicht.

## 22. Wave 5B — Karriere-Hub `/karriere/` und Akademie `/akademie/` (Scoped-Styles, lokal)

**Scope:** die beiden Professional-Routen ausserhalb `.b2` mit eigenen Scoped-`<style>`-Blöcken (`pt-*`, `ak-*`). Nur die Style-Blöcke wurden ersetzt (Karriere 107 → 152 Zeilen, Akademie 94 → 138 Zeilen); Markup, Copy, FAQ-Daten, Schema (WebPage/BreadcrumbList/FAQPage), Meta, Formular-IDs, Endpoints (`/api/partner` mit `quelle=karriere`, `/api/anfrage` mit `quelle=akademie`), Turnstile und Inline-JS unverändert. Token-Remap auf Seitenebene (`--surface`, `--border`, `--blue*`, `--muted`, `--mid`, `--ink` → Softriver) deckt die Inline-`style="background:var(--surface)"`-Sektionen und die globalen `.req`/`.btn:focus-visible`-Regeln ab.

**Design Karriere:** Hero behält das authentische Teamfoto (`/images/partner-hero.webp`, inkl. des im Bild eingebrannten Legacy-Logos — Bild unverändert) mit Rich-Black-Verlauf statt `#0d0d0d`; Eyebrow Mint mit Strich, H1 `clamp(36px, 5vw, 64px)`/1.02, Lead 17–19.5px/34em; Primär-CTA im dunklen Hero als Mint-Pille (Text Rich Black, Hover `--brand-hover`), Ghost weiss-transparent, Trust-Pillen Weiss 10 %; ausserhalb des Heros Rich-Black-Pillen (Hover `#1f2a30`, Lift) und Ghost Hairline 22 %; `.section-label` und `legend` 11px/700/.16em Brand-Ink + Mint-Strich; Titel `clamp(28px, 3.2vw, 42px)`/1.08; Prosa 16.5px/1.7 Rich Black 72 % bei 640px; Lösungs-Box Tint mit Mint-Kante (0 16 16 0); Karten Hairline 16px ohne Schatten, Link-Karten Hover Border 30 % + Schatten + 2px-Lift; Inline-Links/Card-Links Rich Black mit 2px-Mint-Strich (Hover Tint); Tags Tint, Pillen Hairline, Checkliste Brand-Ink, Negativliste behält `#B91C1C`; Ablauf-Nummern Rich-Black-Kreis mit Mint-Ziffer; Formular-Karte 20px, Felder 12px/Hairline 18 %, Fokus Rich Black + Mint-Halo, Checkboxen `accent-color` Rich Black, Upload-Feld Concrete gestrichelt (Hover Tint, `:focus-within`-Ring), Erfolgs-Status Tint/Brand-Ink; FAQ-Karten Hairline 16px (Hover/`[open]` 30 %), Summary-Fokus innen; Magazin-Links (Inline-Styles) per Attribut-Selektor auf Rich Black + Mint-Strich, Label 62 %; Fokus `3px rgba(2,11,16,.55)` überall, im Hero Weiss; `prefers-reduced-motion` ohne Transition/Lift.

**Design Akademie:** Hero Concrete mit Hairline-Abschluss, Eyebrow Brand-Ink + Strich, H1 `clamp(38px, 5vw, 64px)`/1.02 bei 14em, Lead 34em; Statement Weiss `clamp(28px, 4.2vw, 52px)`; Manifest Rich Black (statt `#0d0d0d`) mit Weiss 78 %, Schlusssatz Mint; Weg-Nummern Brand-Ink, Labels 11px/.16em, Badge Tint → Hover Rich Black; Formate-Karten Hairline 16px mit Hover-Lift, CTA Rich Black + Mint-Strich; Differenzierungs-Bild 24px mit weichem Schatten; Pfad-Pillen Hairline (Hover Tint), letzter Schritt Rich Black; Checkliste Brand-Ink; Formular wie Karriere; Closing Tint statt `--surface`; Fokus/Reduced-Motion wie oben. `BrandMarquee` (geteilte Komponente, `.bmq-label` 3.40:1) bewusst nicht angefasst.

**QA (11.10.2026):** Build grün; professional 103/0, health 0, clinic-status 0, standort-ux 0. Route-Diff gegen `2b552ad8` (kumulativ 5A+5B): 55 Routen nur CSS-Hash (53 `.b2` + `/karriere/` + `/akademie/`), 711 identisch, 0 sonstige. Rendered-Parität (Text, Links, tel, WhatsApp) 57/57 inkl. beider Routen (Legend-Zusatz «(optional)» bleibt wie zuvor in Versalien gerendert). Kontrast 390/1440: Karriere 16 → 0, Akademie 11 → 1 (`.bmq-label` in `BrandMarquee`, Bestand, ausserhalb des Scoped-Blocks). Overflow 360/390/430 = 0. Interaktionen (CDP): Hero-Mint-Pille, Rich-Black-Pillen, Ghost, Link-Karten-Lift, Mint-Strich-Links, FAQ-Summary, Checkbox, Feld-Fokus, Upload-Hover, Magazin-Links, Akademie-Badge/Karten/Pfad verifiziert; `prefers-reduced-motion` → kein Transform; gemockte Submits beider Formulare verhalten sich identisch zur Basis (Turnstile-Token-Prüfung greift vor dem POST, JS unverändert). Screenshots ATF 390/1440 und 6 Breiten vorher/nachher; Seitenhöhen +1.8 … +3.4 % (grössere Hero-/Sektions-Typo). Kontrollsweep der 53 `.b2`-Routen gegen den 5A-Build: 0 Änderungen.

**Compliance-Update (766):** Template-Layer FULL 629 → 631; Hero-System 622 → 624 (Karriere Foto-Hero Rich Black, Akademie Concrete). Offen im Professional-Umfeld: `/partner/bern/` (Präsentation, bewusst).

## 23. Wave 5C — Über uns Flagship `/ueber-uns/` (seitenlokal, lokal)

**Scope:** eine SpaPage-Route (`src/pages/ueber-uns.astro` + `src/data/ueber-uns-body.html`, Team-Grid registry-getrieben via `teamGridHtml()`). Umsetzung als zusätzlicher, seitenlokaler `<style>`-Block im Body (Prefix `#page-ueber-uns`, doppelte ID gegen die `[id^="page-"]:not(#page-longevity)`-Regeln aus `home.css`); `home.css`, `therapeuten.ts`, Markup, Copy, Bilder, Videos, Links, Title/Description/Canonical/AboutPage-Schema unverändert. Gerendertes HTML ist bis auf den eingefügten Style-Block byteidentisch (766 Routen: 710 identisch, 55 CSS-Hash (5A/5B), 1 HTML = diese Route). Inline-Styles werden über einen Token-Remap am Seitenwurzel (`--surface/--border/--blue*/--muted/--mid/--black/--charcoal`) und gezielte `[style*=…]`-Selektoren mit `!important` übersteuert.

**Design:** Hero Concrete ohne Verlauf/grüne Oberkante, 96–120px oben, H1 `clamp(38px, 5vw, 64px)`/1.02 mit Brand-Ink-Kursiv-Akzent, Lead 17–19.5px/34em, Teamfoto als 24px-Panel mit weichem Rich-Black-Schatten, Intro-Prosa 16.5px/1.7 bei 640px; alle Labels (`.sub-eyebrow`, `.section-label`, `.signal-overline`, `.bts-label`, `.vision-eyebrow`, `.uu-advisor-eyebrow`, `.founder-label`) einheitlich 11px/700/.16em Brand-Ink mit Mint-Strich (Pill-Hintergrund entfernt); Titel 800/`clamp(28px, 3.2vw, 42px)` mit Brand-Ink-Kursiv; Presse-Leiste Rich Black 62 %, Anker-Tabs 62 % → Rich Black mit Mint-Unterkante (aktiv) und Fokus-Ring; Vergleich «Alte Welt / TCM.ch» mit Hairlines, Tint-Checks, Rich-Black-Pfeil; Vision Concrete, Netzwerk-SVG Mint-Zentrum + Rich-Black-Beschriftung; CARE-System Concrete mit 24px-Engine, Flow-Nummern 62 %/aktiv Brand-Ink, Beschreibungen 62 %, Brücke Brand-Ink, TCM.ch-Säule Tint mit Mint-Oberkante und Mint-Badge, Partner-Punkte (Hwang/Physio) behalten ihre Markenfarben, Säulen-Links Rich Black mit Mint-Strich; Team-Karten (nur hier) Hairline 16px, Hover 30 %/Schatten/Lift, Titel Brand-Ink, Fokus 72 %, Ort 62 %, Badges Hairline, «Profil ansehen» Rich Black + Mint-Strich, Initialen-Fallback Tint→Concrete; Behind the Scenes Concrete mit 800er-Titel, weissen Pillars (Hover Tint), Nummern Brand-Ink; Gründer-Note Weiss, Foto 24px, Prosa 16.5px, CTA «Schreib mir auf WhatsApp» als Rich-Black-Pille mit grünem WhatsApp-Icon (#25D366 nur im Icon); Advisor Concrete mit 24px-Porträt, Mint-Zitatkante, Hairline-Pillen; Partner-CTA Weiss, Mail-Button Rich-Black-Pille, Bild 24px, Vorteilskarten Hairline 16px mit Tint-Icons; Magazin-Zeile (`.ouch-mag-row`, liegt im DOM ausserhalb von `#page-ueber-uns`) Rich Black + Mint-Strich statt Legacy-Grün; `prefers-reduced-motion` ohne Lift/Flow-Animationen; Mobile: Hero 84px oben, 18px-Radien, kleinere Titel. Bestehende Mobile-Entscheidungen (Vision/CARE `display:none` < 768px, BTS-Marquee) unverändert.

**Fakten-/Trust-Audit (gerendert, vor dem Design):** ✓ Markus Muschal «Physiotherapeut» (kein TCM-Label); ✓ Janine wird als «Janine Trebes» aus der Registry gerendert; ✓ keine `[Standort]`-Platzhalter; ✓ kein «innert Minuten»/«24 Stunden»; ✓ Team-Grid vollständig registry-getrieben; ✓ WhatsApp/Tel (`41775236122`) = `site.whatsapp`. **Offen, nicht geändert (Freigabe nötig):** (1) Hwang.ch-Säule nennt nur «Frauenfeld und Kreuzlingen», Registry führt Praxis Hwang auch als Betreiber von Zürich Höngg; (2) Intro-Claim «Alle EMR- oder ASCA-anerkannt» vs. Registry: 4 von 17 Profilen ohne EMR/ASCA-Badge (Inhaber, Mentor, Therapeutin in Ausbildung, Physiotherapeut); (3) Rollenbezeichnung «Co-Founder & Head of Patient Experience» (Gründer-Note) vs. «Gründer & Inhaber · Inhaber TCM.ch» (Advisor/Registry); (4) Versprechen «Krankenkasse-Status sofort geklärt», «⚡ Termin direkt anfragen», «⚡ Direkt weitergeleitet» gegen die Trust-Claims-Linie prüfen (Clinic-Status-Gate schlägt nicht an); (5) «Bekannt aus NZZ / Tages-Anzeiger / 20 Minuten / Handelszeitung / SRF / Beobachter» ist hier nicht verifizierbar; (6) Netzwerk-SVG-Beschriftungen (hwang.ch «TCM Kliniken», tcmd.ch, biohax.ch, aku.ch, physio.ch) nicht gegen eine Quelle prüfbar. «Schröpfen» ×2 liegt im Footer (Therapien-Liste), nicht im Seitentext.

**QA (11.10.2026):** Build grün; professional 103/0, health 0, clinic-status 0, standort-ux 0. Route-Diff s. o.; Kontrollsweep 56 Professional-Routen gegen den 5B-Build: 0 Änderungen. Rendered-Parität `/ueber-uns/`: Text, Links, tel ×3, WhatsApp ×6 identisch; einziger Zähler-Unterschied: 1 zusätzliches `display:none`-Element = der eingefügte `<style>`-Knoten. Kontrast 390/1440: 31 → 0 Textelemente unter AA (Presse-Logos, Flow-Nummern, Pillar-Facts, Advisor-Rolle, Magazin-Label auf 62 %). Overflow 360/390/430 = 0. Interaktionen (CDP): Anker-Tabs (Hover/Fokus/aktiv), Team-Karten-Lift, Profil-Link, Pillar-Links, Founder-CTA, Advisor-Pillen, Partner-Mail-Button, Magazin-Link, Zurück-Button, BTS-Pillars verifiziert; `prefers-reduced-motion` → kein Transform; Sticky-Anker-Nav bleibt `position:sticky` (top 68/64px). Screenshots 6 Breiten vorher/nachher; Seitenhöhen 1440 −0.5 %, 390 +1.6 %.

**Compliance-Update (766):** Template-Layer FULL 631 → 632; Hero-System 624 → 625 (Concrete-Flagship-Hero). Wave-6-Gesamtaudit bleibt Pflicht.

## 24. Wave 5 — Produktionsrelease (11.10.2026) und Stand

**Release (Fast-forward, je Schritt live byteverifiziert, `curl --cacert /root/.ccr/ca-bundle.crt`):** Basis `2b552ad8` (vor jedem Push erneut gefetcht, unverändert) → **5A `d01d4a70`** → **5B `9a8c5a03`** → **5C `69a4a13e`** = `origin/main`. Vor dem Release: Worktrees/Branches vollständig (12 Worktrees, 18 Branches, 0 dirty), Parent-Kette geprüft, Clean-Rebuild des Kandidaten (766 HTML), Builds der Zwischen-Commits in Detached-Worktrees `tcm-ch-rel5a`/`tcm-ch-rel5b` (identische Chunk-/HTML-Hashes zum Endstand), Gates professional 103/0 · health 0 · clinic-status 0 · standort-ux 0 (keine neuen Gates vorhanden). Route-Reconcile gegen `2b552ad8`: 710 identisch, 55 nur CSS-Hash, 1 HTML (`/ueber-uns/`, nur Style-Block); `robots.txt`, `sitemap.xml`, `_redirects`, `_headers` identisch; 21 noindex-Routen (5 Scaffolds nur CSS-Hash), geschützte Routen (St. Gallen, Zürich-Funnel, Basel, Home, Club, Partner/Bern) byteidentisch. Tupel-Parität (Title, Description, Canonical, Robots, JSON-LD, H1–H3, Links, Formulare, Inputs, dataLayer, `/api/*`, sichtbarer Text) auf allen 56 geänderten Routen: 0 Abweichungen. Gerendert: Kontrast 755 → 2 (beide `.bmq-label`, Bestand, s. u.), Overflow 0 neu (bab-navigator 21px Bestand), Text-/Link-/tel-/WhatsApp-Parität 57/57, Interaktionen und gemockte Formulare auf 10 Routen identisch zur Basis.

**Live-Verifikation:** 5A: neuer Chunk `_astro/_slug_.Dnxn5V4-.css` nach 70 s live und md5-identisch; 28 Routen (B2B, Karriere, Akademie, Über uns, geschützte) byteidentisch zum 5A-Build; alter Chunk 404; Header (HSTS, nosniff, `cache-control: public, max-age=0, must-revalidate` für Routen/Assets, `no-cache` für `home.css`) wie `_headers`. 5B nach 50 s, 5C nach 60 s live; je Schritt gespiegelte Produktionsbytes (HTML + referenzierte Assets, `home.css` identisch) lokal an 6 Breiten gerendert: Heroes, Karten, Pillen, Labels wie abgenommen, Drawer (390) und Footer intakt, 0 Konsolenfehler (nur Mirror-404s für nicht gespiegelte Videos), Overflow 0, Formular-Mocks identisch. `/partner/bern/` live byteidentisch.

**Coverage nach Wave 5 (766 Routen):**

| Ebene | Konform | Offen / Ausnahmen |
|---|---|---|
| Shell | 759/759 | 7 ohne Shell (bewusst) |
| Template FULL | **632** = 192 Therapien/Beschwerden · 350 Wissen · 17 City · 17 Team · 53 B2B · Karriere · Akademie · Über uns | PARTIAL 3 Standort-Scopes, 11 Flagship-Standorte (W1), 2 geschützte Landing; offen: Haut 37, `/wissen/`-Hub, 5 LayoutDe-Akupunktur, EN 51, Legal 3, Sonderseiten (Club, Longevity, Kontakt, Krankenkasse u. a.), `/partner/bern/` |
| Hero-System | **625** | Hubs/`.lsr-hero`/Funnel Mint-led ohne formale Abnahme; Rest offen |
| Routen vollständig | 632 | — |
| Geschützt (nie generisch) | St. Gallen, Zürich-Funnel, B2B-Scaffolds, `/partner/bern/` | — |

**Bekannte Restpunkte:** `.bmq-label` (BrandMarquee) 3.40:1 — siehe Remediation unten; `/tools/bab-navigator/@390` 21px Overflow (Wizard, Bestand); Karriere-Hero-Foto trägt eingebranntes Legacy-Logo (Bilddatei, unverändert); Über-uns-Fakten: `docs/ueber-uns-factual-review.md` (5 Punkte, Entscheidung Inhaber).

**BrandMarquee-Kontrast — Empfehlung (nicht umgesetzt):** Konsumenten: `/` (`src/data/home-body.html` + `public/home.css:4663`), `/akademie/` und `/club/` (`src/components/BrandMarquee.astro`, `is:global`-Style). Label «Teil der TCM.ch Gruppe» `#8a8781` auf `#FAF9F7` = **3.40:1** (10px/700, AA 4.5 verlangt). Fix: `color: rgba(2,11,16,.62)` an beiden Stellen (Komponente + `home.css`) → **5.66:1** auf `#FAF9F7` (5.92 auf Weiss, 5.35 auf Concrete); Alternative Brand-Ink `#0B7A4C` 5.15:1. Zwei Zeilen, keine Geometrie; QA: Route-Diff erwartet 3 Routen (`/` HTML unverändert, nur `home.css`; Akademie/Club CSS-Hash), Kontrastsweep 2 → 0, Marquee-Animation/`prefers-reduced-motion` unverändert. Eigener Commit, eigene Freigabe.

**Wave 6 — Pflicht-Gesamtaudit (vor weiterer Implementierung):** alle 766 Routen mit computed-style-Zensus (Buttons, Labels, Karten, Links, Heroes, Flächen) gegen das Softriver-System; Klassifikation FULL/PARTIAL/OFFEN pro Route mit Vorlage-Zuordnung; Kontrast- und Overflow-Sweep sitewide (nicht nur Kohorten); Haut 37, EN 51, Legal 3, Sonderseiten, `/wissen/`-Hub, LayoutDe-Akupunktur 5 und Flagship-Standorte 11 explizit bewerten; `/partner/bern/` und St. Gallen/Zürich-Funnel als geschützt dokumentieren; Ergebnis als Tabelle in diesem Dokument, bevor Wave 6 Design beginnt.

## 25. Wave 6 — Gesamtaudit aller Routen (11.10.2026, lokal, keine Design-Änderung)

**Basis:** `origin/main` = `51a53665` (gefetcht, verifiziert); Worktree `tcm-ch-w6` (`feat/wave6-audit`), Clean-Build **766 HTML-Routen** (986 Dateien; 220 Nicht-HTML: 97 webp, 33 css, 27 png, 17 js, 15 jpg, 12 avif, 7 svg, 6 mp4, sitemap, webmanifest). `_redirects`: 46 × 301, 1 × 410 (`/sprechstunde/`). 21 noindex-Routen (5 B2B-Scaffolds, 11 Visuals, `/partner/bern/`, `/404.html`, `/en/404/`, `/ergebnisse/rueckenschmerzen/`, `/gesundheitsbibliothek/perspektiven/`), 5 Routen mit Fremd-Canonical (`/404.html`, 3 Beschwerden-Aliasse, `/haut/rosacea/`). Layouts: LayoutDe 477 · SpaPage 231 · EN-Layout 51 · PartnerLayout 1 · Club (eigener Shell) 1 · Handouts ohne Shell 5. Vollständige Matrix: `docs/wave6-route-matrix.csv` (766 Zeilen, 36 Spalten: Route, Familie, Layout, Shell, noindex, Hero, H1, Typo/Farben, CTA, Karten, Formular, Links, Kontrast, Fokus, Overflow, Höhen, tel/WhatsApp/OneDoc/Formulare, Fixed-Elemente, Gesamtstatus, Ausnahme, Kohorte).

**Methode:** gerenderter Zensus aller 766 Routen × 1440/390 (Puppeteer, computed styles, Fonts lokal, Bilder blockiert): Hero (H1-Grösse/Gewicht/Font/Farbe, Flächenfarbe, Foto), Farbklassen aller sichtbaren Text-/Flächen-/Rahmenknoten (Rich Black, Mint, Tint, Concrete, Brand-Ink, Legacy-Grün `#2D9B6F`/`#1F7A54`/`#E8F5EE`, Browser-Blau, Legacy-Grau, Gold, WhatsApp), Fonts, CTA-Geometrie (Fläche/Radius/Höhe), Karten-Radien/Rahmen, Formularfelder, Prosa-Link-Farben, AA-Kontrast, Fokus-Ring (CDP `focus-visible`), Overflow, Fixed/Sticky-Elemente, Header/Footer, tel/WhatsApp/OneDoc/Formulare. Plus 37 Repräsentanten/Anomalien × 6 Breiten als Screenshots (Scratchpad `w6/shots`, Familien-Sheets). Regelwerk kalibriert an abgenommenen Vorlagen (Beschwerden-Leaf, Team-Profil, B2B, Massage-City): toleriert werden Slate-Akzente, Meta-Grau ohne AA-Verstoss, Gold-Sterne, Hub-Suchfelder mit Unterstrich, 1–2 versteckte Arial-Knoten.

**Ergebnis (Routen vollständig konform = Hero ∧ Typo/Farben ∧ Komponenten ∧ AA/Fokus ∧ Overflow ∧ Shell):**

| Ebene | Zahl | Bemerkung |
|---|---|---|
| Shell (nav-rebrand + Rich-Black-Footer) | **708/766** | 58 ohne Shell by design: 51 EN (eigener Header ohne `nav-rebrand.css`), 5 Handouts, `/club/`, `/partner/bern/` |
| Template-Abdeckung laut §24 (Stylesheet-Reichweite) | 632 | **nicht** gleich visuelle Konformität |
| **Routen tatsächlich vollständig konform** | **595/766** | 37 Routen der 632 fallen durch (s. u.); keine Route ausserhalb der 632 ist voll konform |
| Hero konform | 638 | |
| Typo/Farben ohne Legacy-Grün/-Blau | 632 | |
| Komponenten (CTA, Karten, Formular, Links) | 618 | |
| AA-Kontrast 0 Verstösse (1440+390) | 634 | Summe Verstösse: EN 882 · Haut 610 · Wissen 438 (Hub 426) · Sonderseiten 186 · Standorte 148 · B2B 130 (Bern 128) · City-akz 104 · Legal 62 · Visuals 56 · Home 14 · 404 4 |
| Overflow 0 (1440+390) | 763 | `/tools/bab-navigator/` 21px, zwei Handouts 74/80px (Druck-Layout) |
| Fokus sichtbar | 765 | `/club/` (UA-Default 1px) |

Je Familie (voll konform / n): Gesundheitsbibliothek+Körpersignale 296/296 · Beschwerden 153/155 · Team 17/17 · Wissen 51/54 · B2B 47/56 · Therapien 22/37 · City-Massage 0/8 · City-Akz 3/6 · Standorte 5/21 · Über uns 1/1 · Home 0/1 · Haut 0/37 · EN 0/51 · Sonderseiten 0/11 · Visuals 0/11 · Legal 0/3 · 404 0/1.

**Die 37 Abweichungen innerhalb der 632 (Komponenten-Nachzug, geringes Risiko):** 18 × InsuranceBanner-CTA `.ib-cta` Rich Black mit 12px-Radius statt Pille (10 Massage-Therapien, 8 City-Massage); 9 × H1 in Legacy-Charcoal `#0d0d0d` (5 Akupunktur-Unterseiten `verfahren/bauch/laser/schaedel/ynsa`, 4 Tools `rn-*`); 7 × Legacy-Grün/-Blau-Reste (`/therapien/massage/`, `/massage-zuerich/`, `/beschwerden/wechseljahre/`, `/standorte/zuerich-city/`, 2 Wissen-Leaves mit 6 AA-Verstössen, `/beschwerden/`-Hub Font-Knoten); 2 × Formularfelder `rgb(157,150,142)`/0px (`/partner/modell/`, `/praxiswissen/praxisrechner/`); 2 × H1 Gewicht 700 (`/karriere/`, `/akademie/`); 1 × Overflow (`bab-navigator`). Wave 1–5-Verbesserungen sind sonst intakt (Hubs, Leaves, Profile, B2B, Über uns).

**Sechs-Breiten-Höhen der Ausnahmen (px, 360/390/430/768/1280/1440):**

| Route | 360 | 390 | 430 | 768 | 1280 | 1440 |
|---|---|---|---|---|---|---|
| `/en/` | 4079 | 3948 | 3695 | 3295 | 2826 | 2829 |
| `/haut/` | 17942 | 17337 | 17175 | 13304 | 9271 | 9270 |
| `/standorte/frauenfeld/` | 16583 | 16385 | 16103 | 14797 | 12144 | 12263 |
| `/standorte/bern/` | 11828 | 11459 | 11067 | 9770 | 8190 | 8191 |
| `/wissen/` | 31719 | 31626 | 31963 | 38078 | 12121 | 12123 |
| `/kontakt/` | 3949 | 3925 | 3878 | 2861 | 2486 | 2487 |
| `/krankenkassen/` | 8862 | 8793 | 8621 | 6164 | 5306 | 5306 |
| `/club/` | 7966 | 7795 | 7606 | 7677 | 9193 | 9304 |
| `/longevity/` | 7389 | 7116 | 6781 | 5418 | 4927 | 4930 |
| `/akupunktur-kinder/` | 8255 | 7903 | 7499 | 5666 | 5695 | 5730 |
| `/visuals/ischias/handout/` | 1045 | 989 | 946 | 924 | 1211 | 1211 |
| `/partner/bern/` | 16375 | 16181 | 15986 | 16103 | 15943 | 16134 |
| `/impressum/` | 4499 | 4417 | 4308 | 3458 | 3137 | 3137 |

**Visuelle Befunde (Sheets `w6/sheet-*.png`):** EN: weisse Heroes, H1 50/800, Legacy-Grün-CTAs 14px, eigener Header ohne Rebrand-Styles, Footer bereits Rich Black, 882 AA-Verstösse. Haut: weisse Heroes mit Gold-Eyebrow (bewusst), Grün-CTAs 14px, Charcoal-Text, Karten mit Gold-Hairline `rgb(226,217,201)` (bewusst), 610 AA-Verstösse. Standorte-Flagships: Mint-Hero `lsr-hero` bereits brand, aber Karten `#e5e5e5`-Rahmen (27–35 je Seite), grüne Formular-Kacheln (Bern/Luzern), Mint-`btn-primary` 14px (Bottighofen, St. Gallen), 6–15 AA-Verstösse je Seite; `/standorte/`-Hub 47. Home: 44 Legacy-Rahmen, 14 AA, Formular `#e5e5e5`/14px. Wissen-Hub: komplett Legacy (426 AA, grüne Links, Charcoal-H1). Kontakt: grüne WhatsApp-Kachel + grüner Button. Krankenkassen ×4: grüne Pillen/Buttons, grüne Links, Legacy-Formulare. Ergebnisse/Selbsttest/Zuweisen/404: grüne 14px-Buttons, Charcoal-H1. Legal ×3: grüne Links. Visuals: Illustrations-Seiten mit Outline-Buttons, Handouts Druck-Layout. Club: eigene Sub-Brand-Shell (QI CLUB), Charcoal-Buttons 0px, Fokus UA-Default. Longevity: Dunkelgrün/Gold-Sub-Brand, H1 Gewicht 300.

**Kohorten-Ranking (visuelle Divergenz × kommerzielle Wirkung × Template-Hebel × Risiko):**

| Rang | Kohorte | Routen | Divergenz | Wirkung | Hebel | Risiko |
|---|---|---|---|---|---|---|
| 1 | **B0 Komponenten-Nachzug** | 32 (s. o. 37 abzgl. Bern) | gering | mittel (Massage/City-Conversion) | sehr hoch (3 Stylesheets) | sehr gering |
| 2 | **B1 Haut** | 37 | hoch (Grün-CTAs, Charcoal) | hoch (K-Beauty-Funnel) | hoch (`.haut-scope`, 1 Vorlage + Hub) | gering; Gold-Differenzierung bleibt |
| 3 | **B2 EN** | 51 | hoch | mittel-hoch (internationale Patient:innen, Versicherungs-Seiten) | hoch (`Layout.astro` + 5 Vorlagen) | gering; kein Text, keine Übersetzung |
| 4 | **B3 Standorte/City/Home** | 20 (11 Flagships + Hub + Bern/Luzern/Zürich-City + Kinder + Zürich-Funnel + Basel-akz + Home) | mittel (Heroes ok, Karten/Formulare/Kontrast nicht) | **sehr hoch** (Buchung, OneDoc, Formulare) | mittel (`#page-standort`, `.standort-scope`, W1-Komponenten) | **hoch** → nur Komponenten-Layer, geschützte Routen byte-/funktionsgleich testen |
| 5 | **B4 Sonderseiten/Hubs/Legal** | 30 (Wissen-Hub, Kontakt, Krankenkassen 4, Ergebnisse 2, Selbsttest, Zuweisen, 404, Legal 3, Visuals 11, Beschwerden-/Bibliothek-Hub-Suchfeld, Club, Longevity) | hoch, heterogen | mittel (Kontakt/Krankenkassen konvertieren) | gering (Einzelvorlagen) | mittel; Club/Longevity nur nach Sub-Brand-Entscheidung |
| — | Ausnahme | 1 (`/partner/bern/`) | — | — | — | bleibt |

Erwartete Abdeckung: nach B0 627/766 · B1 664 · B2 715 · B3 735 · B4 760–765 (Club/Longevity/Handouts je nach Entscheidung).

**Umsetzungsplan (4 Batches, je eigener Worktree, eigener Commit, volle Gates + Route-Diff-Klassifikation + Paritäten + Kontrast/Fokus/Overflow + 6 Breiten; STRICT STOP vor Release):**

*B0 — Komponenten-Nachzug (Prompt):* «Nur CSS: `.ib-cta`/`.ib-sticky-cta` auf 999px-Pille (home.css, City-Scope-Regel beibehalten); H1-Farbe Rich Black für `/therapien/akupunktur/{verfahren,bauchakupunktur,laserakupunktur,schaedelakupunktur,ynsa}/` (LayoutDe-Vorlage) und `tool-wizard.css` (`rn-*`-H1, Charcoal → Rich Black); `.ak-hero h1`/`.pt-hero-text h1` `font-weight:800`; Formularfelder `.b2-calc`/`/partner/modell/` auf b2b-Feldstil; Legacy-Grün-Reste auf `/therapien/massage/`, `/massage-zuerich/`, `/beschwerden/wechseljahre/`, `/standorte/zuerich-city/` (je 1–3 Knoten, per Matrix-Spalte `ctaInfo`/`linkLegacy` lokalisieren); 2 Wissen-Leaves AA (6 Treffer); `bab-navigator` 390px-Overflow. Erwarteter Route-Diff: ≤ 40 Routen CSS-Hash, 0 HTML-Textänderung.»

*B1 — Haut (Prompt):* «`.haut-scope` (37 Routen, 1 Leaf-Vorlage + Hub): Gold bleibt als Eyebrow/Akzent/Karten-Hairline; CTAs `btn--primary` → Rich-Black-Pille, Ghost → Hairline-Pille; Text Charcoal → Rich Black, Meta ≥ 62 %; Hero Typo-Skala wie Beschwerden-Concrete-Hero (H1 `clamp(38px,5vw,64px)`), Fläche Weiss/Concrete nach Wahl; Prosa-Links Rich Black + Gold- oder Mint-Strich (Entscheidung: Gold im Haut-Kontext); Formulare/Sticky-CTA wie 4A; Kontrast 610 → 0. Medizinische Inhalte, Preise, `/haut/rosacea/`-Canonical unverändert.»

*B2 — EN (Prompt):* «`src/layouts/Layout.astro` + EN-Vorlagen (Home, Conditions 9, Therapies 11, Locations 15, Knowledge 10, Contact, Insurance, 404): Header auf Rebrand-Shell (nav-rebrand-Parität, Drawer), CTAs Rich-Black-/Mint-Pillen, Heroes Concrete mit Brand-Skala, Karten Hairline 16px, Links Rich Black + Mint, Formular `/en/contact/` wie Kontakt-Vorlage, Kontrast 882 → 0. Keine Übersetzungs-/Textänderung, hreflang/Canonicals unverändert; Rendered-Text-Parität 51/51 Pflicht.»

*B3 — Standorte/City/Home (Prompt):* «Komponenten-Layer in `#page-standort`/`.standort-scope`/`.city-scope`/Home: Karten `#e5e5e5` → `rgba(2,11,16,.1)`, Formular-Kacheln (Bern/Luzern) Tint statt Grün, `btn-primary` 14px → Pille (Bottighofen, St. Gallen, Hub), Kontrast 148 + 14 + 104 → 0, Legacy-Grün-Links in Zürich-Funnel/Kinder. Geschützt: `/standorte/st-gallen/`, `/akupunktur-tcm-zuerich/` (OneDoc-`widgetConfigs` byteidentisch, Funnel-JS unverändert), Betriebsstatus-Texte wortgleich; Formular-Mocks (massage/termin/deckung/allgemein) Payload-identisch; Clinic-Status- und Standort-UX-Gate Pflicht.»

*B4 — Sonderseiten/Hubs/Legal (Prompt):* «Einzelvorlagen: Wissen-Hub (SpaPage, 426 AA, Hero Concrete + Karten), Kontakt (WhatsApp-Kachel Rich Black mit grünem Icon, Button Pille, Felder 12px), Krankenkassen ×4 (Pillen, Links, Rechner-Felder), Ergebnisse ×2, Selbsttest, Zuweisen (Formular), 404/EN-404, Legal ×3 (Links Rich Black + Mint-Strich, H1 Rich Black), Visuals ×6 (Outline-Buttons → Ghost-Pillen; Handouts ×5 unverändert, Druck), Beschwerden-/Bibliothek-Hub-Suchfeld (Radius/Hairline). Club und Longevity erst nach Entscheidung «Sub-Brand behalten vs. angleichen» (Club: eigener Shell und Rot-Akzent; Longevity: Dunkelgrün/Gold).»

**Ausnahmen (explizit):** `/partner/bern/` (Präsentation, noindex); 5 Handouts (Druck, kein Shell, Overflow by design); `/club/` und `/longevity/` (Sub-Brands, Entscheidung offen); Haut-Gold (bewusst); `/standorte/st-gallen/`, `/akupunktur-tcm-zuerich/` (geschützt, nur Komponenten-Layer); BrandMarquee `.bm-label` im Footer (`#8a8781` auf Rich Black 5.5:1, konform).

**Wave 6 Teil A (lokal):** BrandMarquee-Label `rgba(2,11,16,.62)` in `BrandMarquee.astro` + `home.css` — Commit `967d1cf7`; Konsumenten `/`, `/akademie/`, `/club/`; Kontrast 3.40 → 5.66; Höhen/Text/Animation/`prefers-reduced-motion` identisch; Build-Diff: `home.css` + 2 Routen (Inline-`is:global`-Style), 764 Routen byteidentisch; Gates grün. Nicht gepusht.

**Teil B (read-only):** `docs/ueber-uns-copy-proposals.md` — exakte Vorher/Nachher-Texte, Evidenz, Schwere (H: EMR/ASCA-Pauschale, Hwang-Standorte, «sofort geklärt»; M: Arzt-Claim, Presse, tcmd/aku; N: Gründer-Rollen — Impressum «Co-Founder», Registry «Inhaber TCM.ch»).

## 26. Wave 6 — Implementation B0 · B1 · B2 (11.10.2026, lokal, nicht released)

**Basis:** `origin/main` = `51a53665` (vor Start erneut gefetcht, unverändert). Worktree `tcm-ch-w6b` (`feat/wave6-impl`) auf `2f865930` = main + `967d1cf7` (BrandMarquee) + `2f865930` (Audit-Docs); beide Commits unverändert erhalten, BrandMarquee bleibt eigenständig releasbar. 14 Worktrees/Branches intakt, 0 dirty. Clean-Build 766 HTML (unverändert), Referenz-Builds: `base2-dist` (2f865930), `b0-dist`, `b1-dist`, `final-dist`.

**Shell-Abgleich (759 vs. 708):** §20 zählte 759 «Shell-Konsumenten» = alle Routen mit Site-Header/Footer (DE-Shell 708 + EN-Shell 51); das Wave-6-Audit zählt nur Routen mit `nav-rebrand.css` + Rich-Black-Footer. Stand jetzt: **708 geteilte DE-Shell · 51 separate EN-Shell** (`Header.astro` + `FooterEn.astro`, bereits Rich-Black-CTA-Pille, Mint-Hover, Rich-Black-Footer — brand-aligned, nicht `nav-rebrand.css`) · 5 Handouts ohne Shell (Druck) · `/club/` eigener Sub-Brand-Shell · `/partner/bern/` Präsentation ohne Shell. **0 Routen mit nicht-konformer Shell.**

**B0 — Komponenten-Nachzug, Commit `11f953e4`.** Ausgangsliste 32 Routen ⇒ reconciled auf **31 echte Fixes + 2 Nicht-Defekte** (`/partner/modell/`, `/praxiswissen/praxisrechner/`: «Formularfeld rgb(157,150,142)/0px» war der UA-Rahmen des Range-Sliders, Matrix-Regel korrigiert) **+ 2 Bonus** (`/beschwerden/`-Hub A–Z-Buttons in Figtree, `/akademie/` BrandMarquee). Änderungen, je Konsument gemappt: `InsuranceBanner.astro` `.ib-cta`/`.ib-sticky-cta` 999px-Pille (18 Routen: 10 Massage-Therapien, 8 City-Massage); Akupunktur-Unterseiten `[slug].astro` + `verfahren/index.astro` `--ink` → Rich Black (5 Routen); `tool-wizard.css` `.rn-h1`/`.rn-h2` Rich Black, `.rn-eyebrow` Brand-Ink, Fokus-Ring 3px Rich Black, Combo-Fokus Mint-Halo, H1-Silbentrennung (4 Tools; BAB-Navigator Overflow 21 → 0px @390); `karriere`/`akademie` Hero-H1 800; `home.css` (ungehasht, HTML unverändert): Browser-Blau-Links in `.msg-kk-aside`/`.msg-faq-a` (Scope therapie/city, 24 Konsumenten, 2 mit Links), `.standort-scope .cl-links .cl-chip` (Zürich City), `.symptom-scope #page-symptom > p a` (Wechseljahre), A–Z-Buttons `font-family`, Fokus-Ringe; `knowledge-rebrand.css` `.ouch-mag-row` (2 Wissen-Leaves). Build-Diff: 737 identisch, 7 CSS-Hash, 22 nur Inline-Komponentenstyle (Radius), 0 Text-/Markup-Änderung; Tupel-Parität (Title/Description/Canonical/JSON-LD/Links/Formulare/Text) 29/29. Rendered vorher/nachher auf 42 Routen (31 Ziel + 11 Kontrollen): Legacy-Farben 0, Kontrast 2 Wissen-Leaves 3 → 0, Overflow 0, Fokus 3px auf allen neuen Zielen, Formular-Mocks identisch (Terminform, Massage), Kontrollen unverändert. Screenshots 8 Repräsentanten × 6 Breiten vorher/nachher.

**B1 — Haut, Commit `7d179a93`.** Scope verifiziert: **37 Routen** = Hub `/haut/` (`index.astro`) + 36 Leaves (`[slug].astro`), beide LayoutDe mit `.haut-scope`. Brand-Block je Vorlage angehängt: lokaler Token-Remap (Rich Black, Meta-Grau 62/72 %), Figtree-800-Skala (Hub H1 `clamp(36px,5vw,60px)`, Leaf `clamp(34px,4.6vw,56px)`), Leaf-Hero Concrete mit Hairline, Hub-Hero bleibt Porzellan (Gold-Familie), CTAs Rich-Black-/Ghost-Pillen 999px, Karten Hairline 16px mit Hover/Lift/Fokus, Prosa-Links Rich Black mit **Gold-Strich**, Gold (`#7A663F`, 5.5:1 auf Weiss / 4.9:1 auf Porzellan) behalten für Eyebrows mit Gold-Strich, Badges, Callout-Kanten, Matcher/Closing-Flächen, Karten-Akzentlinien; Bilder 24px; Reduced-Motion; Mobile. Build-Diff: genau 37 Routen CSS-Hash, 729 identisch; Tupel-Parität 37/37 (inkl. Bilder, `/haut/rosacea/`-Canonical). Rendered 37 × 390/1440: Kontrast **506 → 0**, Legacy-Grün 0, H1 37/37 Rich Black 800 Figtree, CTAs 100 % Pillen, Fokus 3px 144/144, Overflow 0; Kontrollen (`/beschwerden/rosacea/`, `/therapien/akupunktur/`, `/gesundheitsbibliothek/`) identisch. Höhen 1440 +1 … +6 % (grössere Hero-Typo). Screenshots Hub + 2 Leaves × 6 Breiten vorher/nachher.

**B2 — EN, Commit `d5788b90`.** Scope verifiziert: **51 Routen**, alle `Layout.astro` (kein DE-Konsument), 13 Vorlagen (Home, Conditions Index+9, Therapies Index+11, Locations Index+15, Knowledge Index+10, Contact, Insurance, Near-me, 404). Neues `src/styles/en-rebrand.css` (nur in `Layout.astro` importiert, alle Selektoren `html[lang="en"]`-präfigiert, schlägt die Scoped-Vorlagenregeln): Concrete-Heroes `clamp(36px,5vw,62px)` mit 24px-Bildpanel, Eyebrows Brand-Ink + Mint-Strich, Pillen Rich Black/Ghost, Karten Hairline 16px, Prosa/Inline-Links Rich Black + Mint-Strich, Callouts Tint, FAQ-Akkordeons, Kontaktformular (Felder 12px, Fokus-Halo, Status Tint), Fokus/Reduced-Motion/Mobile. Header-Komponente unverändert (bereits brand-aligned: Rich-Black-CTA-Pille, Mint-Hover, Drawer mit Mint-CTA, Call/WhatsApp). Sprachschutz: Text, Titles, Descriptions, `hreflang`, Canonicals, Robots, JSON-LD, Links, Formulare, Inputs, Bilder **51/51 identisch**; keine deutschen Labels eingeführt. Build-Diff: 715 identisch, 49 CSS-Hash, 2 EN-Routen nur Chunk-Link; 0 DE-Änderung. Rendered 51 × 390/1440: Kontrast **882 → 0**, Legacy-Grün/-Blau 0, Heroes 51/51 Concrete + Rich Black 800, CTAs 100 % Pillen, Karten 100 % Hairline, Links 96/96 Rich Black, Fokus 3px 204/204, Overflow 0; Formular-Mock `/en/contact/` identisch (Turnstile-Prüfung vor POST); Drawer 390 öffnet (Mint-CTA, Call/WhatsApp), Footer Rich Black; DE-Kontrollen (`/beschwerden/rueckenschmerzen/`, `/agb/`, `/impressum/`, `/kontakt/`) identisch. Screenshots 10 Archetypen × 6 Breiten (4 vorher).

**Teil C — Gesamtregression (final-dist = `d5788b90`):** Gates professional 103/0 · health 0 · clinic-status 0 · standort-ux 0. Build-Diff gesamt gegen `2f865930`: **649 identisch · 93 CSS-Hash (EN 49, Haut 37, Tools 4, Akademie, Karriere, Verfahren) · 22 Inline-Komponentenstyle · 2 EN Chunk-Link · 0 Text-/Markup-Diff**; `robots`/`sitemap`/`_redirects`/`_headers` identisch; geschützte Routen (St. Gallen, Zürich-Funnel, Basel, Home, Club, Partner/Bern, Longevity, Über uns, Kontakt) byteidentisch. Vollzensus 766 × 1440/390 neu gerendert: 649 unveränderte Routen rendern identisch (Höhe/Farben/CTAs/Kontrast) bis auf die erwarteten CSS-Effekte (BrandMarquee auf `/`, `/club/`; B0-`home.css`-Regeln auf Wechseljahre/Zürich City) — zwei Flagships (Basel 1440, St. Gallen 390) zeigten im Grosslauf abweichende Kontrastzahlen, bei 2 × 2 Wiederholungen identisch (3/3, 2/2; Mess-Transiente des Grosslaufs, kein Leak).

**Coverage (gerendert, nicht Stylesheet-Reichweite):**

| Ebene | vorher (§25) | nachher |
|---|---|---|
| Shell konform / by design | 708 + 58 | 708 + 58 (0 nicht-konform) |
| Hero konform | 638 | 737 |
| Typo/Farben ohne Legacy | 632 | 730 |
| Komponenten | 620 | 727 |
| AA-Kontrast 0 | 634 | 725 (Summe 2634 → 1107: Wissen-Hub 426, Sonderseiten 184, Standorte 131, Partner/Bern 128, City-akz 104, Legal 62, Visuals 56, Home 12, 404 4) |
| Overflow 0 | 763 | 764 (2 Druck-Handouts 74/80px offen, by design) |
| **Routen vollständig konform** | **597** | **718 / 766** (+121: EN 51 · Haut 37 · Therapien 15 · City-Massage 8 · B2B 6 · Wissen 2 · Beschwerden 1 · Zürich City 1; keine Doppelzählung, kein Verlust) |

**Verbleibende 48 nicht-konforme Routen (alle erwartet, keine neuen):** B3 (19): `/standorte/`-Hub, 11 Flagships + Bottighofen/Winterthur ×2/Oerlikon/Höngg (Legacy-Rahmen, Formular-Kacheln, Kontrast), `/akupunktur-tcm-zuerich/` (geschützt), `/akupunktur-tcm-st-gallen/`, `/akupunktur-kinder/`, `/` (44 Legacy-Rahmen, 12 AA, Formular). B4 (26): `/wissen/`-Hub, `/kontakt/`, `/krankenkassen/` ×4, `/ergebnisse/` ×2, `/selbsttest/`, `/zuweisen/`, `/404.html`, Legal ×3, Visuals ×11 (6 Seiten + 5 Handouts), `/beschwerden/`-Hub (Suchfeld-Unterstrich, Regel-Ausnahme offen). Entscheidung (2): `/club/`, `/longevity/`. Ausnahme (1): `/partner/bern/`.

**Teil D:** `docs/ueber-uns-copy-proposals.md` unverändert (keine Faktenänderung); BrandMarquee `967d1cf7` eigenständig releasbar (nur `BrandMarquee.astro` + `home.css`).

**Nächste Batches:** B3 Standorte/City/Home (19) — Komponenten-Layer in `#page-standort`/`.standort-scope`/`.city-scope`/Home: Karten-Rahmen, Formular-Kacheln Bern/Luzern, `btn-primary` 14px → Pille, Kontrast 131+104+12, Zürich-Funnel/Kinder-Links; OneDoc-`widgetConfigs` byteidentisch, Funnel-JS unverändert, Formular-Mocks identisch, Clinic-Status/Standort-UX-Gate. B4 Sonderseiten/Hubs/Legal/Visuals (26) — Einzelvorlagen wie §25; Club/Longevity nach Sub-Brand-Entscheidung. Risiken: Flagship-Conversion (OneDoc, Formulare), Home-Formular, Handout-Overflow (Druck-Layout bewusst), BrandMarquee-Release vor B3 empfohlen.

## 27. Wave 6 — Produktionsrelease B0/B1/B2 (11.10.2026) und B3/B4-Preflight (read-only)

**Release (Fast-forward, normale Pushes, je Schritt live byteverifiziert):** Basis `51a53665` (gefetcht, unverändert) → `967d1cf7` BrandMarquee (live nach 60 s; `home.css` + `/akademie/` + `/club/` + `/` + St. Gallen byteidentisch) → `2f865930` Docs (Assets unverändert) → `11f953e4` B0 (live nach 50 s; `home.css`, `knowledge-rebrand.css`, 14 Routen inkl. Massage Zürich, Klassische Massage, YNSA, BAB-Navigator, Karriere, Akademie, Zürich City, Wechseljahre, Wissen-Leaf, St. Gallen, Zürich-Funnel, Home, EN, Haut byteidentisch; 6 Chunks identisch) → `7d179a93` B1 (live nach 60 s; 5 Haut-Routen + 4 Kontrollen byteidentisch, Haut-Chunks identisch) → `d5788b90` B2 (live nach 60 s; 10 EN-Archetypen + 9 DE-/geschützte Routen byteidentisch, EN-Chunk identisch, `hreflang` en/de-CH/x-default und `lang="en"` live geprüft) → **`f9c9731f` = `origin/main`** (Docs, Assets unverändert). Vor dem Release: Kette FF-fähig, 16 Worktrees 0 dirty, Clean-Rebuild byteidentisch zum getesteten `final-dist` (0 Dateien Differenz), Gates professional 103/0 · health 0 · clinic-status 0 · standort-ux 0. Build-Diff Kandidat vs. `51a53665`: 648 identisch · 92 CSS-Hash (EN 49, Haut 37, Tools 4, Karriere, Verfahren) · 24 Inline-Komponentenstyle (18 InsuranceBanner-Konsumenten, 4 Akupunktur-Unterseiten, BrandMarquee Akademie/Club) · 2 EN Chunk-Link; `knowledge-rebrand.css`, `home.css`, 7 Chunks; EN 51/51 und Haut 37/37 erfasst; 8 geschützte Routen byteidentisch (St. Gallen inkl. OneDoc-`widgetConfigs`, Zürich-Funnel, Basel, Home, Partner/Bern, Über uns, 2 Team-Profile). Live-Render (gespiegelte Produktionsbytes, 16 Routen × 1440/390): 32/32 Checks identisch zum Kandidaten, Fokus 3px überall, Formular-Mocks EN-Kontakt/Partner identisch (Turnstile vor POST), EN- und Haut-Drawer öffnen, Header `cache-control: public, max-age=0, must-revalidate` (Routen/Chunks), `no-cache` (`home.css`), HSTS, nosniff. Home-Kontrast 2×2 gemessen: 7 → 6 (nur BrandMarquee); eine 47er-Messung im Spot-Lauf war eine Transiente.

**Accounting:** (1) 595 → 597: Matrix-Regel korrigiert — der UA-Rahmen `rgb(157,150,142)`/0px des Range-Sliders auf `/partner/modell/` und `/praxiswissen/praxisrechner/` ist kein Formularfeld-Defekt; beide waren bereits konform. (2) 718 = 597 + 121 neu konform (EN 51, Haut 37, Therapien 15, City-Massage 8, B2B 6, Wissen 2, Beschwerden 1, Zürich City 1), 0 verloren, kein Routen-Overlap; Zählung aus frischem Vollzensus, nicht aus Stylesheet-Reichweite. (3)–(4) 48 verbleibend = **B3 19** (`/`, `/akupunktur-kinder/`, `/akupunktur-tcm-st-gallen/`, `/akupunktur-tcm-zuerich/`, `/standorte/`, `/standorte/{basel,bern,bottighofen,frauenfeld,kreuzlingen,luzern,rorschach,st-gallen,volketswil,wil,winterthur-marktgasse,winterthur-muenzgasse,zuerich-hoengg,zuerich-oerlikon}/`) + **B4 26** (`/404.html`, `/agb/`, `/beschwerden/`, `/datenschutz/`, `/ergebnisse/`, `/ergebnisse/rueckenschmerzen/`, `/impressum/`, `/kontakt/`, `/krankenkassen/`, `/krankenkassen/{akupunktur,massage,shiatsu}/`, `/selbsttest/`, `/visuals/`, `/visuals/{bandscheibenvorfall-hws,bandscheibenvorfall-lws,ischias,karpaltunnel,nacken-ausstrahlung}/` ×5, deren `/handout/` ×5, `/wissen/`, `/zuweisen/`) + **3 Entscheidungen/Ausnahmen** (`/club/`, `/longevity/`, `/partner/bern/`) = 48; vollständig in `docs/wave6-route-matrix.csv` (Spalte `next_cohort`). (5) Shell: 708 geteilte DE-Shell · 51 separate EN-Shell (brand-aligned) · 5 Handouts · Club · Partner/Bern = 766, 0 nicht-konform.

### B3 — Standorte / City / Home (19 Routen) — Preflight

**Inventar & Vorlagen:** 12 × `standorte/[slug].astro` (datengetrieben aus `standorte.ts`/`locations.ts`; Basel, Bottighofen, Frauenfeld, Kreuzlingen, Rorschach, St. Gallen, Volketswil, Wil, Winterthur ×2, Zürich Höngg, Zürich Oerlikon) · `standorte/bern/index.astro` + `standorte/luzern/index.astro` (eigene Scoped-Styles 53/54 Zeilen, `.standort-scope`) · `standorte/index.astro` (Hub, `.hh-*`) · `akupunktur-tcm-zuerich.astro` (Funnel, `.lsr-*`, geschützt) · `akupunktur-tcm-st-gallen.astro` (akz) · `akupunktur-kinder.astro` · `index.astro`/`home-body.html` (Home). Alle SpaPage/`home.css` (Regelfamilien `.lsr-*` 20, `.hh-*` 14, `#page-standort` 3, W1-Komponenten `.subpage-sidebar`, `.svc-card`, `.location-plz`, `.inline-form-*`, `.form-wa-alt-new`).

**Gerenderte Legacy-Befunde:** Heroes bereits Mint/Concrete (Rich Black 800) — nur Kinder-Seite weiss mit H1 `#111`; Karten `#e5e5e5`-Rahmen 27–35 je Flagship (Bern/Luzern 11); `btn-primary` Mint 14px (Bottighofen, St. Gallen, Hub-Formular `form-s` Grün 14px), Winterthur `btn-secondary` 14px; Browser-Blau-Links Basel 4, St. Gallen 1, Oerlikon 1; Zürich-Funnel 35 Legacy-Grün-Textknoten, 11 Flächen, 10 Links, 54 AA; Kinder 17/3, Grün-CTA, 50 AA; Hub 7/11, 47 AA; Home 44 Legacy-Rahmen, Formular `#e5e5e5`/14px, 1 Browser-Blau, 12 AA; Sidebar-Meta (`location-plz`, `inline-form-sub`, `form-divider-quiet` `#888`, `tmc-loc #777`, `form-wa-alt-new` Grün-Text 1.94:1) auf jedem Flagship 6–8 AA.

**Richtung vorher → nachher:** Heroes unverändert (bereits brand); Karten/Sidebar auf Hairline `rgba(2,11,16,.1)` 16px; Mint-/Grün-`btn-primary` 14px → Pillen (Mint im Mint-Hero bleibt als Rich-Black-Pille wie 4A); Formular-Kacheln Bern/Luzern Tint statt Grün; Meta 62 %; WhatsApp-Alternativlink als Rich-Black-Text mit grünem Icon (wie 4A); Zürich-Funnel: nur Farb-/Rahmen-Layer, Funnel-Markup/JS unverändert; Kinder-Seite: Hero Concrete, CTA Pille, Tint-Box; Home: Karten-Rahmen, Formular-Feld 12px/Hairline, 1 Link.

**Shared vs. seitenspezifisch:** shared (`home.css`): `.standort-scope`/`#page-standort`-Karten, `.lsr-*`-Sidebar/Formular, `.hh-*`, `.subpage-sidebar`-Meta, `.form-wa-alt-new` (Konsumenten: 12 Flagships + Hub + Funnel + St. Gallen-akz = 15); seitenspezifisch: Bern/Luzern Scoped-Blöcke, Kinder-Seite, Home-Formular (`home-body.html`-Inline-Styles → `#page-home`-Regeln).

**Schutz:** OneDoc-`widgetConfigs` (St. Gallen, St. Gallen-akz) byteidentisch; Funnel-JS (`#zh-funnel`) unverändert; Formulare massage/termin/deckung/allgemein Payload + `dataLayer formular_senden` identisch (Mock); Betriebsstatus-Texte wortgleich (Clinic-Status-Gate); tel/WhatsApp-Ziele unverändert (7–11 je Route); Title/Description/Canonical/LocalBusiness-Schema/Links identisch; Standort-UX-Gate. **Six-Width-QA:** 19 Routen × 1440/390 Zensus, 6 Breiten für `[slug]`-Repräsentant (Frauenfeld), St. Gallen, Zürich-Funnel, Bern, Hub, Kinder, Home; Sticky-Sidebar/FAB-Verhalten 390/768; Formular-Mocks. **Erwarteter Beitrag:** +19 → 737/766. **Freigabe nötig:** Eingriff in St. Gallen und Zürich-Funnel (bisher «nie generisch migrieren») — nur Komponenten-Layer, mit Byte-/Funktionsnachweis.

### B4 — Sonderseiten / Hubs / Legal / Visuals (26 Routen) — Preflight

**Inventar & Vorlagen:** `/wissen/` (SpaPage, `.wissen-*` 28 Regeln, 426 AA — grösster Einzelposten) · `/kontakt/` (LayoutDe, scoped 27 l, WhatsApp-Kachel Grün, Formular) · `/krankenkassen/` (SpaPage, `.kk-*` 44 Regeln) + `krankenkassen/[slug].astro` ×3 (SpaPage, `btn-primary` 12px Grün, Rechner-Felder) · `/ergebnisse/` + `ergebnisse/[slug]` (LayoutDe, scoped 22/55 l, noindex-Leaf) · `/selbsttest/` (SpaPage, scoped 68 l) · `/zuweisen/` (LayoutDe, scoped 30 l, Zuweisungsformular) · Legal ×3 (LayoutDe, Inhalt aus `src/data/legal/*.html` 76–174 l, grüne Links 3–16 je Seite) · `/404.html` (LayoutDe, `404.astro`) · `/beschwerden/`-Hub (nur Suchfeld-Unterstrich: Regel-Ausnahme oder 12px-Feld) · Visuals: `visuals/index.astro` (scoped 221 l, 30 Karten Legacy-Rahmen, grüne Links 30), `visuals/[slug]/index.astro` ×5 (Illustrations-Seiten, grüne Flächen 4–12, Outline-Buttons), `visuals/[slug]/handout.astro` ×5 (Druck, kein Shell, `handout.*.css`, Overflow 74/80px @390 by design).

**Richtung:** Hero Concrete + Brand-Skala (Wissen, Kontakt, Krankenkassen, Ergebnisse, Selbsttest, Zuweisen, 404, Legal — H1 Rich Black); CTAs Pillen Rich Black (Kontakt-WhatsApp-Kachel: Rich Black mit grünem Icon), Links Rich Black + Mint-Strich (Legal 34 Links), Karten Hairline 16px, Formularfelder 12px (Kontakt, Zuweisen, Krankenkassen-Rechner), Tint-Callouts; Visuals: Outline-Buttons → Ghost-Pillen, Grün-Flächen → Tint, Illustrationen unverändert; Handouts: nur Farbtoken (Grün → Rich Black/Mint) falls gewünscht, Druck-Layout und Overflow unangetastet.

**Shared vs. seitenspezifisch:** fast alles seitenspezifisch (Scoped-Blöcke bzw. `home.css`-Familien `.wissen-*`, `.kk-*`); shared nur Legal (eine Regel für `.legal-body a` o. ä. in LayoutDe-CSS) und 404/EN-404.

**Schutz:** Legal-Texte, Impressum-Angaben, Datenschutz unverändert; Kontakt-/Zuweisungs-Formular Endpoints + dataLayer (Mock); Krankenkassen-Rechner-Logik; `/ergebnisse/rueckenschmerzen/` noindex; Visuals-Illustrationen/Alt-Texte; Title/Description/Canonical/Schema. **Six-Width-QA:** 26 × 1440/390, 6 Breiten für Wissen-Hub, Kontakt, Krankenkassen-Hub + Leaf, Zuweisen, Legal-Repräsentant, Visuals-Seite + Handout (Druck-Emulation `print`), 404. **Erwarteter Beitrag:** +21 (ohne 5 Handouts) → 758/766, +5 bei Handout-Tokenisierung → 763/766.

### Entscheidungen (explizite Freigabe nötig)
- **`/club/` (QI CLUB):** eigener Sub-Brand-Shell, Rot-Akzent, 240px-Wortmarke, Charcoal-Buttons 0px, Fokus UA-Default. Empfehlung: Sub-Brand behalten, nur Fokus-Ringe + Charcoal → Rich Black (2 Zeilen); nicht in Pillen zwingen.
- **`/longevity/`:** Dunkelgrün/Gold-Sub-Brand, H1 300. Empfehlung: Entscheidung Inhaber (Sub-Brand behalten = Ausnahme dokumentieren; angleichen = eigener Batch, 157 `.lng-*`-Regeln).
- **`/partner/bern/`:** private Präsentation, noindex, 128 AA, Georgia-Font. Empfehlung: Ausnahme belassen.
- **Handouts ×5:** Druck-Layout, Overflow by design. Empfehlung: Farbtoken optional, Layout nie.

**Nach B3 + B4 (ohne Entscheidungen):** 758/766; mit Club-Minimalfix 759; Rest = Longevity, Partner/Bern, 5 Handouts (dokumentierte Ausnahmen). `docs/ueber-uns-copy-proposals.md` unverändert, Fakten weiterhin offen.

## 28. Wave 6 — Implementation B3 · B4 · Club (11.10.2026, lokal, nicht released)

**Basis:** `origin/main` = `432a1cae` (gefetcht, verifiziert, keine fremden Commits); Worktree `tcm-ch-w6c` (`feat/wave6-b3b4`), Clean-Build 766 Routen als Baseline (`base-dist`). Vier fokussierte lokale Commits, jeder einzeln revertierbar: **B3 `905e445b`** (nur `public/home.css`, +85 Zeilen) → **B4 `c2db04fe`** (14 Dateien: `home.css` +98, neu `src/styles/de-special-rebrand.css` 113 Zeilen, 10 Seiten-Imports, Selbsttest-`is:global`, Handout-Tokens) → **Club `9e2c0dee`** (nur `club.astro`, 3 Zeilen) → **Nachzug `4b7da650`** (nur `home.css`: Foto-Caption-Verlauf auf 14 Standort-/Funnel-Routen, `.bx-az-btn` Figtree — aus dem Gesamtaudit). Kein Push, kein Merge, kein Deploy. `docs/ueber-uns-copy-proposals.md` unverändert.

### B3 — Standorte · Hub · Funnels · Home · Kinder (19 Routen, `905e445b`)

**Scope-Technik:** Seitenwrapper (`#page-standort`, `#page-standorte`, `#home-content`, `.akz`, `.standort-scope`, `#page-therapie`) liegen *neben* angehängten body-Sektionen (`cl-related`, `scb-bar`, Inline-Formulare, LSR-Blöcke), daher Scope `body:is(:has(> …))` statt Wrapper-Präfix; Spezifität über `:not(#w2)`, `!important` nur gegen Inline-Styles (`#standorte-zuerich`, `zhx`-Badges, `cp-tldr`, `usp-icon`) und die globale `.section-label{#6B7280!important}`-Schicht. St. Gallen-Funnel ist `.city-scope` (Wave-2-Template) und bleibt es; dort nur zwei gezielte Korrekturen (USP-Icons mit Legacy-Grün inline → Tint + Rich-Black-Stroke; Sticky `.scb-book`).

**Was sich ändert (nur Darstellung):** Karten `.svc-card/.city-card/.location-card/.usp-card/.glb-card/.hf-item/.offer-cardx/.zhx-praxis/.inline-form-card/.kt-feature` Hairline `rgba(2,11,16,.1)` 16/20px, Hover Rahmen .3 + Schatten + 2px-Lift; Chips (`cl/zhx/akz`) Hairline mit Tint-Hover; Meta-Grau 62 % (`location-plz`, `sg-crumb`, `sg-meta`, `a-label`, `svc-sub`, Home-Trenner `·`), `kk-ico` 72 %; Labels (`section-label`, `kt-intro-label`, `svc-cta`, `cp-tldr`-Titel, `zhx-steps`, `faq`-Zähler, Inline-`2D9B6F`-Labels) Brand-Ink 11px/.16em; Textlinks Rich Black + 2px Mint-Unterstrich mit Tint-Hover (Karten-Anker `.tmc`/Block-Anker ausgenommen); `btn-primary` Rich-Black-Pille (LSR-/HH-Hero-Buttons unberührt), `btn-secondary` Ghost-Pille, Formular-Buttons/`st-home-banner`/`scb-primary` Pillen, `form-wa-alt-new` weisse Pille mit WhatsApp-grünem Icon, Home-Concierge Mint-Pille; Formfelder 12px, Rahmen .18, Fokus Rich Black + Mint-Halo; `cp-tldr` Tint mit Mint-Kante; `cta-band`-Deko Mint .16; Bern/Luzern-Ribbon amber → Rich Black/Mint; Kinder-Seite: Hero Concrete, einspaltig (Template rechnete mit Bildspalte), Eyebrow Brand-Ink, H1 Rich Black, FAQ/CTA-Karten Hairline 16/20px; Fokusring 3px `rgba(2,11,16,.55)` (Hero-/Nav-/Drawer-Elemente ausgenommen); `prefers-reduced-motion` ohne Hover-Transform. USP-Icons bleiben wie im Standort-Template (Tint-Fläche, Rich-Black-Stroke) — ein erster Rich-Black-Versuch machte die Icons unsichtbar und wurde zurückgenommen.

**Bug-Fix mitgenommen:** `StickyCtaBar` (Footer-Komponente) fügt auf SG-Seiten per Script `.scb-book` ein; die Styles dafür lagen nur im SG-Leaf → auf `/akupunktur-tcm-st-gallen/` und `/akupunktur-st-gallen-kosten/` war der Button unstyled (Browser-Blau, unterstrichen). Jetzt `body:has(#online-buchen) > .scb-bar .scb-book` = weisse Pille (identisch zum Leaf). Einzige Nicht-Zielroute mit Render-Diff (4 Sticky-Elemente, nur ≤ 768 px).

**QA (Probe 19 × 1440/390, Element-Inventar):** Legacy-Text 140 → 0 · Legacy-Flächen 53 → 0 · Legacy-Rahmen 2052 → 0 · farbige CTAs ohne Pille 114 → 2 (`.kt-feature` = Karte r16) · AA-Kontrast 231 → 26 (alle: `lsr-right figcaption` weiss über Foto mit Verlauf; Zensus misst Mint-Fallback statt Bild — Messartefakt, live korrekt) · Fonts 6 → 0 · Fokus-lose 0 · Overflow 69 = 69 (BrandMarquee-Laufband, dekorative Blur-Spans, Ribbon-Ecken — vorbestehend, unverändert). Screenshots 6 Breiten (360/390/430/768/1024/1440) je Vorlagenfamilie (Hub, Standort-Leaf, Bern, Luzern, St. Gallen, Funnel ZH, Funnel SG, Kinder, Home ATF + volle Seite) gesichtet. **Funktionsparität zu main (Mock-Harness, je Route):** `tel:`/`wa.me`/OneDoc-/`#online-buchen`-/`data-care-cta`-Links Hash identisch; `widgetConfigs` (St. Gallen, SG-Funnel) byteidentisch (1858 Zeichen); Formulare massage/termin/allgemein/`be-wl`/`lu-wl`/`hlsg`/ZH-Funnel: Payload (ohne Zeitstempel), `/api/anfrage`-Ziel, `dataLayer` (`formular_senden`, `zh_funnel_start/submit`) und Erfolgszustand identisch; Drawer öffnet/fokussiert gleich; Sticky-Leisten gleich sichtbar; Hover/Fokus-Zustände per CDP geprüft; Reduced-Motion ohne Transform; JS-Fehler 0 = 0; Overflow 0 auf 360–1440. **Leak-Check (24 Kontrollrouten × 2 Breiten, computed-style-Signaturen):** 0 Diffs (Massage-City, Therapie-Leaf, Beschwerden-Leaf, Team, B2B, EN, Haut, Über uns, Bibliothek, Club, Longevity, Hubs, Kosten-Seiten, Partner/Bern) — Ausnahme der dokumentierte `.scb-bar`-Fix oben. **Build-Diff gegen main:** nur `home.css`; alle 766 HTML byteidentisch (JSON-LD, Canonical, Status-Texte, Formulare, GTM).

### B4 — Sonderseiten · Hubs · Legal · Visuals · Handouts (26 Routen, `c2db04fe`)

**Vorlagen & Technik:** LayoutDe-Seiten (Kontakt, Zuweisen, Ergebnisse ×2, 404, Legal ×3, Visuals-Index, Viewer ×5) erhalten `src/styles/de-special-rebrand.css` per Seiten-Import (nicht im Layout → kein anderer LayoutDe-Konsument betroffen; HTML-Diff = ein zusätzlicher Stylesheet-Link). Selektoren unter `body > main`, Token-Remap (`--blue/--green*/--border/--surface/--muted/--mid/--text-*/--black/--ink`) auf `main`, Header/Footer/Sticky unberührt (Sticky nur Hairline/Pille über `body > .scb-bar`). SpaPage-Hubs (`/wissen/`, `/krankenkassen/`, 3 KK-Leaves mit `.msg-page` als body-Kind, `/beschwerden/` via `.symptom-scope > #page-beschwerden`) über `home.css`: B3-Komponenten-Scope um die vier Hub-Wurzeln erweitert plus Hub-Regeln. Selbsttest (eigene HTML-Seite): Override-Block am Ende des vorhandenen `is:global`-Styles. Handouts: Tokens im eigenen `:root` (nach `tokens.css`), Marker-Fläche Mint .45, Druck-Button Pille, Problem-Chip Brand-Ink. Club separat (s. u.).

**Design je Seite:** Wissen-Hub redaktionell (Hero Concrete, Säulen-/Artikelkarten Hairline 16px mit Lift, Meta 62 %, Icons Tint, H1/Titel Rich Black, Links Mint-Strich); Kontakt (Hero Concrete, WhatsApp-Kachel Rich Black mit Mint-Link, Telefon/E-Mail-Kacheln Hairline, Felder 12px + Mint-Fokus, Submit Pille); Zuweisen (Fieldset-Legenden Brand-Ink, Pflicht-Stern Brand-Ink, Hinweis Tint mit Mint-Kante, Upload 12px, Formularkarte 20px, Submit Rich-Black-Pille); Krankenkassen (Hero-Buttons Rich Black/Ghost-Pille, TL;DR und Rechner-Resultat Tint, Tabellenkopf Concrete, Gruppenzeilen Brand-Ink, Links Mint-Strich, Rechner-Felder 12px); KK-Leaves (H1-Italic Rich Black, Pillen, Hinweiskarte Tint, Textlinks); Ergebnisse (nur Präsentation: Krümel/Notiz/Tabellen/FAQ-Karten 16px, `MUSTER`-Banner und Draft-Badge bewusst amber); Selbsttest (Karte 20px, Progress Rich Black, CTA-Pille, Optionen 16px mit Tint-Hover und Mint-Fokus, Methoden-Chips Tint, Ghost-Pille; `hidden`-Attribut der Startansicht wird jetzt respektiert — vorher überdeckte `display:flex` die Rück-/Fortschrittsleiste auf dem Startscreen); Legal (H1–H4 Rich Black, Prosa 80 %, Links Rich Black + Mint-Strich, Tabellen Hairline — Texte byteidentisch); 404 (Inline-Styles greifen über die Tokens: Label Brand-Ink, Primär Rich-Black-Pille, Ghost-Hairline); Beschwerden-Hub (Suchfeld Hairline 16px, `focus-within` Rich Black + Mint-Halo, Ergebnis-Fokus sichtbar, Fallback-Button in Figtree, Kategorie-Panels 16px — Tastatur/JS unverändert); Visuals-Index (Overline Brand-Ink, Suche/Chips Hairline, aktiver Filter Rich Black, Karten 16px, Request-Buttons Pillen); Viewer (Marker Mint .45/Rich Black, aktiv Rich Black, Controls Hairline → Rich Black aktiv, `vv-more` Pille, Chips Tint/Brand-Ink, Boxen 16px, Links Mint-Strich, `vv-flag` klinischer Hinweis bewusst amber; Illustrationen, Alt-Texte, QR unverändert); Handouts (Rich Black statt Legacy-Grün, Tint-Chip, Marker Mint/Rich Black — druckfest).

**QA (Probe 26 × 1440/390):** Legacy-Text 236 → 0 · Legacy-Flächen 202 → 0 · Legacy-Rahmen 650 → 0 · AA-Kontrast 706 → 0 · Fonts 2 → 0 · farbige CTAs ohne Pille 83 → 2 (Kontakt-WhatsApp-Kachel = Karte r16) · Fokus-lose 0 · Overflow 188 = 188 (Scroll-Tabellen mit `is-scrollx`-Hinweis, A–Z-Leiste, Handout-Marker — vorbestehend). **Interaktionen (Mock-Harness, vor/nach identisch):** Selbsttest Start → 5 Antworten → Resultat (Methoden-Links, CTAs gleich); Beschwerden-Suche «rück» → 5 Treffer, `ArrowDown` fokussiert sichtbar, `Escape` schliesst; Visuals-Filter (aria-pressed, 6 sichtbare Karten), Suche; Viewer Control-Toggle (Panels, Marker-Opazität), Marker-Klick; KK-Rechner (Eigenanteil 325); Ergebnisse-FAQ `details`; Kontakt/Zuweisen-Formular unter Turnstile-Stub identisch (kein POST ohne Widget, beide Seiten), KK-Leaf-Formular POST `/api/anfrage` + `dataLayer formular_senden` identisch; JS-Fehler identisch (KK-Hub 2 vorbestehend); Overflow 0 auf 360–1440. **Druck (5 Handouts, `emulateMediaType('print')` + PDF A4):** Blattgeometrie, Umbrüche (`@page a4 portrait`), Text-Länge, Bilder, Toolbar-Ausblendung vor/nach identisch; PDF je 1 Seite 595.92 × 841.92 pt vor und nach. **Fidelity:** Legal-HTML, Metadaten, Canonical, `noindex` (`/ergebnisse/rueckenschmerzen/`, 404, Handouts), JSON-LD byteidentisch (HTML-Diff ausschliesslich Stylesheet-Link/CSS-Hash). **Leak-Check (16 Kontrollrouten × 2):** 0 Diffs; alle nicht adressierten HTML-Dateien byteidentisch (22 geänderte Ausgabedateien = 21 Zielseiten + `home.css`, plus Club).

### Club · Longevity · Partner/Bern

- **`/club/` (`9e2c0dee`, a11y only):** `--qi-grey` `#6b6661` → `#5c5853` (3 AA-Verstösse 3.97–4.24 auf Sand → 5.9:1); `focus-visible` 3px Rich Black für Links/Buttons (vorher UA-Default 1px), Rot auf Solid-Buttons/Join. Shell, Rot-Akzent, 0px-Buttons, 240px-Wortmarke unverändert → Matrix weiterhin «nicht voll konform» (bewusste Ausnahme Sub-Brand).
- **`/longevity/` (read-only geprüft):** Dunkelgrün/Gold-Sub-Brand mit shared DE-Shell; Figtree durchgehend (3 versteckte Arial-Knoten), H1 76px/**300** weiss auf Bild, Fokusringe 3px Rich Black vorhanden, Overflow 0 auf 360–1440, 12 AA-Verstösse 1440 (Gold `#C9A96E`/Champagner-Text auf Dunkelgrün 1.96–2.24, `lng-lead` .65), 4 Legacy-Rahmen. Einstufung: **dokumentierte Ausnahme** (Sub-Brand), nicht konform nach Brand-Matrix; Angleichung wäre eigener Batch (157 `.lng-*`-Regeln, Entscheidung Inhaber). Keine Änderung.
- **`/partner/bern/` (read-only geprüft):** private Präsentation, noindex, PartnerLayout ohne Shell, Georgia-Akzent, Legacy-Grün-Pillen, 60 AA-Verstösse (`#9a9a9a`-Labels). Keine Designänderung, **Ausnahme bleibt**.

### Teil D — Release-Candidate-Audit (766 Routen × 1440/390, final-dist `4b7da650`)

**Methode:** identischer Zensus wie §25/§27 (Puppeteer, computed styles, 1440 + 390, Bilder blockiert) über alle **766 Routen** des final-dist (`4b7da650`), danach Matrix-Regeln unverändert (`matrix.py`) — plus eine neue, explizit gezählte **Kalibrierung**: die weisse Foto-Caption `.lsr-right figcaption` (14 Routen: 13 Standort-Leaves + ZH-Funnel) liegt über einem Bild mit Verlauf; ohne Bild misst der Zensus den Mint-Fallback (1.71). Nach dem Verlaufs-Fix in `4b7da650` ergibt die Pixelmessung mit geladenem Bild (`figcap.mjs`, Captionfläche) mittlere Kontraste 7.8–16.6:1 (vorher 3.9–7.0; schlechtester Pixel 2.4–6.4 statt 1.3–2.4). Nur dieser eine Schlüssel wird ausgenommen (13 Routen, 26 Messungen) und unten getrennt ausgewiesen. Zusatzbreiten 360/768/1024 für Ausnahmen und geschützte Routen (Club, Longevity, Partner/Bern, 2 Handouts, SG-Funnel, ZH-Funnel, St. Gallen): Overflow 0 ausser LWS-Handout 360 (104px, Druck-Layout), Fokus/H1/Fonts konsistent, nur der Caption-Schlüssel (1) auf SG/ZH.

| Ebene | vorher (§27, `d5788b90`) | **jetzt (`4b7da650`)** | Bemerkung |
|---|---|---|---|
| Routen auditiert | 766 | **766** (1532 Messungen + 24 Zusatzbreiten) | |
| **Voll konform (strikt, Matrix-Regeln)** | 718 | **748** | ohne Kalibrierung |
| **Voll konform inkl. Caption-Kalibrierung** | — | **761** | +13 Routen, deren einziger Rest der Caption-Messfehler ist |
| Hero konform | 739 | 763 | Rest: Club (Charcoal, Sub-Brand), Longevity (300), Partner/Bern |
| Typo/Farben ohne Legacy | 736 | 764 | Rest: Longevity (3 Arial-Knoten), Partner/Bern |
| Komponenten (CTA/Karten/Formular/Links) | 735 | 763 | Rest: Club, Longevity, Partner/Bern |
| AA-Kontrast 0 (1440+390) | 725 | 764 (751 unkalibriert) | Rest: Longevity 24, Partner/Bern 128 |
| Overflow 0 | 764 | 764 | HWS-/LWS-Handout 80/74 px bei 390 (A4-Marker, by design) |
| Fokus sichtbar | 765 | **766** | Club jetzt 3px |
| Shell | 708 | 708 | unverändert by design (51 EN, 5 Handouts, Club, Partner/Bern) |
| **Genehmigte Ausnahmen (nicht konform, dokumentiert)** | — | **5** | `/club/`, `/longevity/`, `/partner/bern/`, 2 Handouts (Overflow) |
| **Nicht konform ohne Ausnahme** | 48 | **0** | |
| **Regressionen gegenüber §27** | — | **0** | keine Route, die vorher konform war, ist es jetzt nicht |

Je Familie (voll konform / n): Bibliothek+Körpersignale 296/296 · Beschwerden 155/155 · B2B 55/56 (Partner/Bern) · Wissen 54/54 · EN 51/51 · Haut 37/37 · Therapien 37/37 · Standorte 21/21 · Team 17/17 · Sonderseiten 10/12 (Club, Longevity) · Visuals 9/11 (2 Handouts) · City-Massage 8/8 · City-Akz 6/6 · Legal 3/3 · Home 1/1 · 404 1/1.

**Nebenwirkung des Template-Layers (gewollt, geprüft):** `/standorte/zuerich-city/` (gleiches `standort-scope`-Template, nicht in der B3-Liste) erhält dieselben Komponentenregeln (Chips, FAQ-Labels, Sekundär-CTAs, `section-sub`, Sticky): 6–8 Elemente je Breite, Route bleibt voll konform. `/standorte/zuerich/` (Weiche) und alle `city-scope`-/`therapie-scope`-Routen ohne Diff.

**Verbleibende Reste innerhalb konformer Routen (bewusst):** Kontakt-WhatsApp-Kachel und `.kt-feature` sind Karten (r16), keine Buttons; `MUSTER`-Banner/Draft-Badge (Ergebnisse) und `vv-flag` (klinischer Hinweis) amber; Partnerklinik-Badge (Home/Hub) amber als Status; Scroll-Tabellen/A–Z-Leiste/Marquee-Overflow by design; KK-Hub 2 vorbestehende JS-Konsolenfehler (identisch zu main).

**Gates (final-dist, nach jedem Build):** Build ok · check-professional 103 Registry-Einträge / 0 Fehler · health-audit 0 · clinic-status 0 · standort-ux 0. Build-Diff gegen main `432a1cae`: 22 Ausgabedateien (`home.css` + 21 B4-Zielseiten + `/club/`; davon 10 LayoutDe-Seiten nur mit zusätzlichem Stylesheet-Link, 11 nur CSS-Hash), **744 HTML byteidentisch**, Sitemap/robots unverändert, keine neuen Dateien ausser den gehashten CSS-Chunks.

### Vorgeschlagene Release-Reihenfolge (Fast-forward, je Schritt live byteverifiziert)

1. `905e445b` B3 — nur `home.css`; Rollback = Revert dieses einen Commits (HTML unberührt).
2. `c2db04fe` B4 — `home.css` + 21 Seiten; Rollback = Revert (entfernt Stylesheet-Import und Hub-Block).
3. `9e2c0dee` Club a11y — unabhängig, Revert jederzeit.
4. `4b7da650` Nachzug — nur `home.css`, Revert jederzeit (Caption fällt auf 0→.55-Verlauf zurück).
5. Docs-Commit (dieser Abschnitt + Matrix).

Jeder Schritt: `origin/main` erneut prüfen (`merge-base --is-ancestor`), normaler Push ohne Force, Live-Byte-Watch mit `curl --cacert`, Mirror-Render der Zielrouten; bei Abweichung sofortiger Revert des jeweiligen Commits. **STRICT STOP: nichts davon ist gepusht.**
