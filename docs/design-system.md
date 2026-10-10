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

Zielbild (Cohort 2): EIN `.btn`-System in neuem `public/styles/ui.css` — Varianten `--solid` (Mint/Rich-Black), `--outline` (Rich-Black), `--ghost`, `--whatsapp` (geschütztes Grün), Grössen `--lg/--sm`. Migration je Sektion mit Klick-Ziel- und Tracking-Parität; alte Klassen bleiben, bis ihr letzter Konsument migriert ist. Kanonischer Radius (12px vs. Pill): **PENDING BRAND GUIDELINES / Entscheid Simon.**

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
