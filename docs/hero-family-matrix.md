# Hero family audit and large-desktop sizing (DE + EN)

Stand 12.10.2026 · Branch `feat/hero-refinement` · Baseline `origin/main` 2b06a955 · Rendered audit of 31 routes at 390×844, 768×1024, 1280×800, 1440×900, 1680×1050, 1920×1080, 2560×1440 (Puppeteer, fonts + hero images loaded). Metrics: `scratchpad/hero/{before,after}/metrics.json`, screenshots per route and viewport.

## 1. Audit matrix (before)

Occupancy = hero height ÷ (viewport height − header). "1920" = 1920×1080, "2560" = 2560×1440.

| Family | Routes (DE / EN) | Component · sizing rule (before) | Hero @1440 / 1920 / 2560 (occ) | Problems on large desktops | Target | Files |
|---|---|---|---|---|---|---|
| Homepage | `/` · `/en/` | `.sr-hero` / `.ev-hero--home`: `100svh − header` (≥1024) | 824 (1.0) / 1004 (1.0) / 1364 (1.0) | none; team photo `contain` centred, heads intact | 90–100svh (keep) | — |
| City funnel | `/akupunktur-tcm-zuerich/` · `/en/acupuncture-zurich/` | `.akzh .lsr-inner min(560px,62vh)` (inline style) · EN `.ev-hero__inner min(600px,66vh)` | 653 (0.79) / 637 (0.63) / 637 (0.47) · EN 595 (0.72) / 601 (0.60) / 601 (0.44) | banner-like from 1680 up; 1280×560 photo panel at 2560 crops 37 % of the team photo | 70–80svh | home.css, en-v2.css |
| Locations (operational, partner, planned, St. Gallen launch hero) | `/standorte/<slug>/` · `/en/locations/<slug>/` | `.lsr-inner min(600px,66vh)` (`HeroLaunchSG` shares it) · EN split | 676–813 (0.82–0.99) / 677–728 (0.67–0.73) / 677 (0.50) · EN 661–690 / 601–629 (0.60–0.63) / 601–629 (0.44–0.46) | fixed 600px floor becomes a strip on 1440p monitors; reception photo loses the sign | 65–80svh | home.css, en-v2.css |
| Location / therapy / conditions / knowledge hubs | `/standorte/`, `/therapien/` · `/en/locations/`, `/en/therapies/`, `/en/conditions/`, `/en/knowledge/`, `/en/acupuncture-near-me/` | `.hh-inner min(560px,62vh)` · EN split | 559 (0.68) / 561 (0.56) / 561 (0.41) · EN 595–621 / 601 (0.60) / 601 (0.44) | shallowest family at 1920+ | 60–75svh | home.css, en-v2.css |
| Treatment / condition detail | `/therapien/<slug>/` · `/en/therapies/<slug>/`, `/en/conditions/<slug>/`, `/en/health-insurance-acupuncture/` | `.tsr-inner min(560px,62vh)` (content-driven ≈ 661) · EN split | 661 (0.80) / 661 (0.66) / 637 (0.47) · EN 595 / 601 (0.60) / 601 (0.44) | acceptable to 1920, strip at 2560 | 50–65svh | home.css, en-v2.css |
| DE Beschwerden hub / leaf | `/beschwerden/`, `/beschwerden/<slug>/` | `#beschwerden-hero` (centred, content-driven) · leaf = Concrete/white hero (Wave 2C-2) | 710 (0.86) / 710 (0.71) / 710 (0.52) | intentional Concrete family, content-driven | keep | — |
| Knowledge / editorial | `/wissen/`, `/wissen/<slug>/` · `/en/knowledge/<slug>/` | DE `.wissen-hero` / `.hero > .wrap.narrow` (content) · EN split (`editorial`) | 421–552 (0.51–0.67) / 421–552 (0.42–0.55) / 0.31–0.40 · EN 597 / 601 / 601 | editorial by design | 35–55svh (keep) | — |
| Insurance, contact | `/krankenkassen/`, `/kontakt/` · `/en/contact/` | `.kk-hero` banner image, `.hero` Concrete, EN `ev-hero--hub` | 684 / 684 / 684 · 319 / 319 / 319 · EN 487 | legacy/Concrete, content-driven; contact is a form page | keep | — |

Photography (before): split heroes use `object-fit: cover` at `50% 50%` (DE) / `50% 40%` (EN) with the panel height pinned at 560–600px, so panel aspect goes from 1.2:1 (1440) to 2.1:1 (2560) and the crop grows with the monitor. No `object-position` change was needed once the panel height scales (after: ≤1.42:1 at 2560).

## 2. Sizing system (after)

Tokens in `public/styles/tokens.css`, one media block per language file, nothing below 1280px changes, and an outer `max()` keeps the previous `min(…vh)` floor so no viewport renders a shorter hero than before:

| Family | Token | Rule (≥1280px) | Result @1440 / 1680 / 1920 / 2560 (occ) |
|---|---|---|---|
| City | `--hero-city: 74svh` | `max(min(560px,62vh), clamp(560px, 74svh − header, 900px))` | DE 667 (0.81) / 778 (0.80) / 800 (0.80) / 977 (0.72) · EN 591 / 702 (0.72) / 724 (0.72) / 901 (0.66) |
| Location | `--hero-location: 72svh` | `max(min(600px,66vh), clamp(600px, 72svh − header, 880px))` | DE 677–813 / 757 (0.78) / 779 (0.78) / 957 (0.70) · EN 661–690 / 681 (0.70) / 703 (0.70) / 881 (0.65) |
| Hub | `--hero-hub: 66svh` | `max(min(560px,62vh), clamp(560px, 66svh − header, 800px))` | DE 561 (0.68) / 618 (0.63) / 638 (0.64) / 801 (0.59) · EN 595–621 / 618 / 638 (0.64) / 801 (0.59) |
| Detail | `--hero-detail: 60svh` | `max(min(560px,62vh), clamp(560px, 60svh − header, 720px))` | DE 661 / 661 / 661 (0.66) / 797 (0.58) · EN 595 / 601 / 601 (0.60) / 721 (0.53) |
| Home, Beschwerden, Wissen, Kontakt, Krankenkassen | — | unchanged | — |

EN: `HeroSplit.astro` derives `data-hero="city|location|hub|detail|editorial"` from the route (prop `family` overrides); `en-v2.css` scopes the rules to `.ev-hero--split[data-hero=…]`. DE: `.lsr-inner`, `.akzh.lsr-hero .lsr-inner`, `.hh-inner`, `.tsr-inner` in `home.css`.

## 3. Results

- 217 route × viewport renders: 59 heroes grew, 144 unchanged, **0 shrank**; mobile 390 and tablet 768 byte-identical in metrics.
- The remaining 14 renders are `/beschwerden/rueckenschmerzen/` and `/akupunktur-in-der-naehe/` at all 7 viewports: both pages have no element matching the audit's hero selectors (Concrete Wave 2C-2 leaf and the legacy near-me layout), so no height was recorded; they are outside this change and their built HTML is byte-identical to main.
- At every desktop viewport the hero CTAs stay in view and the next section (Zürich clinic strip, location USP cards, hub lists, EN USP strip) starts inside the first viewport.
- No horizontal overflow on any render. Team photo heads intact on the Zürich hubs at 1920/2560; Basel reception sign fully visible at 2560.
- DE HTML byte-identical to main (only `home.css` and `tokens.css` change); EN pages differ only by the `data-hero` attribute and the CSS bundle hash. No tracking file, layout, page or data file touched.

## 4. CRO and integration notes

- Larger heroes push the first content section down by at most 163px (Zürich, 1920) and 340px (2560); on all audited viewports the primary pathway remains visible without scrolling.
- `feat/tcm-conversion-engine-v2` touches `home-body.html` and the St. Gallen leaf only; this branch touches CSS and `HeroSplit.astro` only. No file overlap; merge order is free.
- Remaining per-asset options (not changed): DE split heroes keep `50% 50%`, EN `50% 40%`; if a specific photo still crops awkwardly on a 21:9 monitor, set `object-position` on that asset's rule rather than the family.
