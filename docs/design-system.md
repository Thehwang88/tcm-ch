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
