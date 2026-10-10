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

### Coverage-Matrix (Stand 10.10.2026, Build mit 767 HTML-Routen, davon 20 noindex)

| Familie | Routen | Status |
|---|---|---|
| Homepage | 1 | Kohorten 1–3c live (Hero, CTAs, Flächen, Karten, Fokus, native Karten-Links) |
| Standorte (data-driven Template) | 10 | **W1 live** (`146e603`); offen: `btn-secondary` 14px, `#F7F8F9`-Flächen, div-city-cards |
| Standorte (Ausnahmen: St. Gallen, Bottighofen, Bern, Luzern, Zürich City, Kosten ×5, Hub) | 11 | **W1B-1 lokal:** Zürich City FULL; Bern, Luzern, Kosten Frauenfeld/Kreuzlingen/Luzern/Zürich PARTIAL (nur Karten-Radien, Luzern kt-feature-Fläche); offen: Hub (nur Hover), Basel-Kosten (massage-city.css); geschützt: St. Gallen, Bottighofen |
| Standort-Landingpages (`akupunktur-tcm-*`, `massage-*`, `akupunktur-in-der-naehe`, `akupunktur-st-gallen-kosten`) | 13 | offen; `/akupunktur-in-der-naehe/` nur city-card-Hover (W1) |
| Therapien | 37 | 11 Leaves CRO-modernisiert (`.therapie-scope`); city-card-Hover (W1, 16 Routen); Rest W2 |
| Beschwerden | 155 | `.symptom-scope`; city-card-Hover (W1, 153 Routen); Rest W3 |
| Gesundheitsbibliothek / Körpersignale / Wissen / Haut / Praxiswissen / Visuals | 201 / 95 / 55 / 37 / 17 / 11 | offen (W4) |
| Team, Partner, Branche, Regulatorik, Tools, Karriere, Krankenkassen, Ergebnisse, Sonderseiten | ~60 | offen (W5) |
| EN | 51 | offen (W5/W6) |
| Legal (AGB, Impressum, Datenschutz) | 3 | offen (W6, niedrige Prio) |
