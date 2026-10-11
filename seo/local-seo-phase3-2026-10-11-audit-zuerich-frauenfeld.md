# Local SEO Phase 3 — Audit Zürich (Hub + Oerlikon) und Frauenfeld (11.10.2026)

Status: **read-only audit. Nothing changed.** Basis: deployed `main` @ `6a9eadf` (local build = live),
live checks on tcm.ch and hwang.ch, `seo/master-keyword-url-map.csv`.

Data sources and confidence:
- **GSC** (verified baseline, 11 Sep–8 Oct 2026, page level only; no query export in the repo).
- **Semrush CH** (Oct 2026): search volume and tcm.ch positions per keyword. These are estimates and
  serve as a query-level proxy only, not as GSC truth.
- **hwang.ch** (fetched 11 Oct 2026): what the operator itself publishes (addresses, hours, Maps entry).

No ranking forecasts. Each proposal names its expected **mechanism**.

---

## 0. Pre-implementation checks (requested before any change)

### 0.1 "NAME EINSETZEN" and other placeholders (rendered + indexable)

| Route | Source | Rendered text | Proposal |
|---|---|---|---|
| /therapien/physiotherapie/dry-needling/ | `src/data/dry-needling-body.html:15` | "Fachlich geprüft von NAME EINSETZEN BSc Physiotherapie, SRK-anerkannt …" | Remove the reviewer line until a real reviewer has signed off. No invented name. |
| /therapien/physiotherapie/manuelle-therapie/ | `src/data/manuelle-therapie-body.html:15` | "NAME EINSETZEN BSc Physiotherapie …" | same |
| /therapien/gua-sha/gesichts-gua-sha/ | `src/data/gua-sha-gesicht-body.html:21` | "NAME EINSETZEN TCM-Therapeutin, EMR-anerkannt …" | same |
| /impressum/ | `src/data/legal/impressum.html:33` | "MwSt-Nummer CHE-[XXX.XXX.XXX] MWST" | **Owner:** real UID, or remove the line if there is no VAT registration. Legal page, not SEO. |
| /club/ | `src/pages/club.astro:136` (+ 5 TODO comments) | aria-label "Platzhalter: Morgen-Walk am Zürichsee" | Neutral aria-label; strip the TODO comments from the HTML output. |

The "Fachlich geprüft von" claims are an E-E-A-T claim without a person behind them. They are a
trust risk and may not stay up even temporarily. **This is fix 1 (P0) of the implementation.**

### 0.2 Opening hours

- **Verified source found:** for Frauenfeld (Rheinstrasse 25), Höngg (Limmattalstrasse 340), Kreuzlingen
  (Romanshornerstrasse 1), Oerlikon-Schulstrasse 3 and Winterthur Münzgasse 2, hwang.ch publishes
  "Mo–Fr 7:30–19:30, Sa 7:30–16:30". This matches the TCM.ch hours of the operating
  locations. The source is the operator's own site, not an independent check.
- **Contradiction on the same page:** FinalCta and the contact tiles say "Mo–Fr 8–19 Uhr" / "Telefonisch
  (Mo–Fr)". These are the phone/WhatsApp hours of the central team, but they read like practice hours.
  Proposal: label them as "Team per Telefon/WhatsApp: Mo–Fr 8–19 Uhr". Practice hours stay as they are.
- **Still open (owner):** Volketswil, Rorschach, Wil and Winterthur Marktgasse carry the same template
  hours, and hwang.ch does not list these addresses. Leave as is until verified, or remove.
- St. Gallen: the massage page (`massage-st-gallen-body.html:48` + schema) shows template hours that contradict the
  location's own Mo–Sa/So hours. Fix with the St. Gallen phase.

### 0.3 Local business identity: central finding

hwang.ch runs **"Praxis Hwang"** as its own clinic at each of these addresses, with an embedded Google Maps
place entry "Praxis Hwang", phone **+41 79 837 46 81**, and site-wide "4.89 | 570+ Bewertungen":
Rheinstrasse 25 Frauenfeld, Limmattalstrasse 340 Zürich Höngg, Schulstrasse 3 Zürich Oerlikon,
Romanshornerstrasse 1 Kreuzlingen, **Münzgasse 2 Winterthur**. St. Gallen (Oberer Graben 22) is also
listed there, with the TCM.ch number.

TCM.ch shows the same addresses as "TCM.ch Klinik · X" / schema "TCM.ch X" with phone +41 77 523 61 22
and `memberOf TCM.ch`, without a reference to the Praxis Hwang entity.

The result is **two domains, two names and two phone numbers for one business at one address**.
For local search this means:
- **Inconsistent NAP:** Google can't cleanly assign the TCM.ch page to the Maps entity.
- **Duplicate local owners for the same intent** (see Frauenfeld 2.1: hwang.ch ranks, TCM.ch does not).

Plus: DE and EN schema names differ for every location; Frauenfeld/Kreuzlingen say "Partnerklinik von
Praxis Hwang" in copy but "TCM.ch X" in schema. Höngg never names Praxis Hwang, although the hub
calls it "Praxis Hwang".

**Also changes an earlier assumption:** Winterthur Münzgasse 2 is published by hwang.ch as a Praxis Hwang
location with its own Maps entry. The status "review" stays until the owner confirms. If confirmed, the
location becomes "operational" with the operator named correctly (one status change in `locations.ts`; the gate checks the rest).

**Owner decision (blocks identity work, not content work):**
1. Whose website is the GBP website of each Praxis Hwang address: hwang.ch or tcm.ch?
2. Which name and phone may TCM.ch show for these addresses (operator = Praxis Hwang)?
3. Is the rating "4.89 | 570+" on hwang.ch an aggregate across several GBPs? It **must not** be carried over to TCM.ch (decided).

---

## 1. Zürich: baseline and diagnosis

| Keyword (Semrush CH) | Volume/mo | Best tcm.ch URL (pos.) | Hub (pos.) | Intended owner |
|---|---|---|---|---|
| tcm zürich | 1000 | Homepage (38) | 93 | Hub |
| akupunktur zürich | 480 | Oerlikon (38) | 80 | Hub |
| tcm oerlikon | 210 | Oerlikon (18) | 45 | Oerlikon ✓ |
| tcm praxis zürich | 110 | Hub (79) | 79 | Hub |
| chinesische medizin zürich | 90 | Homepage (38) | 47 | Hub |
| akupunktur oerlikon | 90 | Hub (55); Oerlikon page not in top 100 | 55 | Oerlikon |
| tcm zürich höngg | 30 | — | — | Höngg |

GSC (page level): hub 1 / 461 / 45.3 · Oerlikon 19 / 1265 / 14.4 · City 2 / 453 / 41.6 · Höngg 4 / 159 / 30.0.

**Diagnosis**
1. **Google does not yet treat the hub as the Zürich page.** For both head terms it ranks
   *behind* the homepage, Oerlikon and City (City: "akupunktur zürich" 65, hub 80). The hub has been the
   owner by internal links only since 11 Oct, so the effect cannot be measured yet. Measure first, don't
   rebuild (see 5).
2. **The hub's relevance signals are weak:**
   - Title "TCM Zürich & Akupunktur Zürich | TCM.ch" is pure keywords, with no practice reference.
   - The hub has no visible NAP of an operating practice and no breadcrumb.
   - Three explanatory H2s sit in a collapsed `<details>`.
   - Schema is a `MedicalClinic` without address whose `department` lists only Höngg (as "TCM.ch").
3. **Anchor quality:** 164 of 190 inbound links carry the card text "Ganze Stadt Zürich Alle Zürcher
   Praxen · City in Vorbereitung". Only 14 pages link with a descriptive anchor. The hub is in neither
   the drawer nor the footer.
4. **Oerlikon's relevance is good** (title/H1/body, quarters, transport, schema without hours), but
   **conversion and identity** are inconsistent:
   - Map, call and NAP point to the unopened Ohmstrasse 14.
   - Immediate bookings go to an external hwang.ch link.
   - Copy says "Komm vorbei" and shows "Krankenkassen-anerkannt" checkmarks for an unopened practice.
5. **Thin and duplicated:** City (302 words) ranks above the hub for "akupunktur zürich" and carries an
   H2 "Deine TCM.ch Standorte in Zürich", which is hub intent. The Höngg H1 "Akupunktur & TCM in Zürich
   Höngg" is fine (quarter qualifier).

## 2. Zürich: ranked proposals

Priority = expected effect × risk/effort. **(B) = blocked by owner decision 0.3.**

### Z1 — Strengthen hub title and lead with real practices (P1, small)
- Title: `TCM Zürich & Akupunktur Zürich | TCM.ch` → `Akupunktur & TCM in Zürich – Praxen in Höngg & Oerlikon | TCM.ch` (64 characters; Google may truncate "| TCM.ch", the core stays visible).
- Meta (156) stays, shortened by 6 to ≤155 if needed.
- **Mechanism:** both head terms stay in the title. Adding the real quarters sets the page apart from
  the spoke pages and the homepage and raises the expected relevance for "praxis/zürich" queries
  without keyword stuffing. Title rewrites take effect on the next crawl, and the hub is crawled daily.

### Z2 — Visible local substance on the hub (P1, medium)
- New compact block "So erreichst du unsere Zürcher Praxen", with no new design. Reuses the existing
  practice cards (`akupunktur-tcm-zuerich-body.html`) and adds per **operating** practice: address,
  "Praxis Hwang" as operator (B for the naming), hours as published by the operator, 1–2 transport facts.
  The transport facts come from the spoke pages and need verification (ZVV) before go-live.
- Move the collapsed `<details>` block "Mehr über Akupunktur & TCM in Zürich" out into the page. Content
  unchanged, open, under the treatment section (approved component, no new styles).
- **Mechanism:** the hub becomes the best page for the city intent, with real place references,
  instead of a pure routing page. Collapsed content is indexed but weighted less.

### Z3 — Hub schema as an organisation/area page (P1, small; name part B)
- Replace the `MedicalClinic` without address with `MedicalOrganization` (TCM.ch) +
  `areaServed: Zürich`.
  - `department`/`subOrganization` reference only **operating** Zürich practices, by `@id` of their
    location pages (Höngg; Oerlikon only after go-live).
  - No address on the hub.
  - Uniform phone format.
- Add a visible breadcrumb TCM.ch › Standorte › Zürich (schema exists).
- **Mechanism:** one entity per address on the spoke page, and the hub as the parent node. This removes
  the duplicate Höngg node and the contradictory naming.

### Z4 — Anchor text and navigation to the hub (P1, small)
- City card (`standort-cards.html` + copies): desc "Alle Zürcher Praxen · City in Vorbereitung" →
  "Akupunktur in ganz Zürich". Same design.
- Drawer and footer column "Standorte": add the entry "Zürich (alle Praxen)" → hub, **once**,
  site-wide in the existing list.
- 3–5 contextual links from pages that genuinely talk about Zürich (selection with a fit check during
  implementation, no mass insertion):
  - /therapien/akupunktur/ (location section)
  - /krankenkassen/ (regional note)
  - the 4 Zürich /wissen/ articles that link so far without a descriptive anchor
- **Mechanism:** descriptive anchors and a link from every page's navigation are the strongest internal
  owner signal. Today 164 links carry a weak anchor.

### Z5 — Hub conversion path (P1, small)
- Header "Termin finden" currently leads on the hub to /kontakt/. Scroll to `#zh-funnel` on the hub
  instead. The same pattern already exists on location pages with `#kontakt`.
- The City card says "Anfrage senden", but the funnel has no City option. Change the CTA to the funnel
  with "Egal – bitte empfehlen".
- Oerlikon card: "heute behandelt dich **hier** die bestehende Praxis Hwang" sits directly after the
  Ohmstrasse address. Change it to "Heute: Partnerpraxis Praxis Hwang, Schulstrasse 3. Neue Praxis
  Ohmstrasse 14 geplant ab 1.12.2026".
- **Mechanism:** fewer exits and unambiguous practice choice, which means more qualified enquiries. No SEO effect.

### Z6 — Oerlikon: practice choice and identity (P1, small)
- Move the "Zwei Praxen in Oerlikon" block **above** the form.
- Immediate option "Praxis Hwang, Schulstrasse 3": address, phone per B, link to hwang.ch.
- Hero "Komm vorbei" → "Für die Eröffnung vormerken". Change the checkmarks to "Abrechnung über
  Zusatzversicherung (nach Eröffnung)".
- WhatsApp prefill: "… Termin in Oerlikon (Praxis Hwang jetzt oder neue Praxis ab Eröffnung)".
- Schema: unify DE/EN names ("TCM.ch Zürich Oerlikon"), shared `@id`, keep the status description. No hours.
- **Mechanism:**
  - The patient sees which practice they can book now, and conversion runs on-site rather than out to hwang.ch.
  - Uniform entity names DE/EN.

### Z7 — Make Oerlikon content verifiable (P2, small)
- **Remove the transport list** (S-Bahn lines S2…S24, trams 10/11/14, buses 32/61/62/63/75) **or check
  it against ZVV**, plus the car parks and A1 exits. Keep only verified facts.
- Soften "einem der grössten ÖV-Knoten der Schweiz" to "grosser ÖV-Knoten".
- Owner: align the planned services (copy names Moxa/Elektroakupunktur, the cards Shiatsu/Gua Sha/Akupressur).
- **Mechanism:** fewer unverifiable details and consistent offering data (helpful-content / quality signals).

### Z8 — Sharpen City and Höngg ownership (P2, small)
- City:
  - H2 "Deine TCM.ch Standorte in Zürich" → "Neuer Standort im Zentrum: Stand der Vorbereitung".
  - Prominent link to the hub as the citywide entry point.
  - Meta 184 → ≤155 characters.
- Höngg (B): operator "Praxis Hwang" in visible text and schema name, `sameAs` the hwang.ch page.
- **Mechanism:** City stops competing with the hub for "akupunktur zürich", and Höngg's NAP matches its
  Maps entity.

### Z9 — Hub photo caption (P2, owner)
- "Das TCM.ch Behandlungsteam · Praxen des Netzwerks in Höngg und Oerlikon" plus alt "sechs
  Therapeutinnen und Therapeuten": is it the team of these practices? If not, use a neutral caption.
  The CREW picture stays unchanged.

---

## 3. Frauenfeld: baseline and diagnosis

| Keyword (Semrush CH) | Volume/mo | tcm.ch | Competition (top 10) |
|---|---|---|---|
| tcm frauenfeld | 170 | /standorte/frauenfeld/ **not in top 100**; homepage 45 | stgag.ch (Kantonsspital, #1), tcmswiss.ch, shengong.ch, **hwang.ch (#4)**, acumedica, tcm-frauenfeld.ch, tcmapfelgarten, **hwang.ch/standorte/frauenfeld (#8)**, tcm-schwarz, emr.ch |
| akupunktur frauenfeld | 110 | /standorte/frauenfeld/ **13** | — |
| massage frauenfeld | 590 | /massage-frauenfeld/ (only "medizinische massage frauenfeld" 28 found) | — |
| tcm thurgau / akupunktur weinfelden | 20 / 20 | — | — |

GSC: 4 / 524 / pos. 9.4 (page). Semrush is an estimate, but the gap "TCM" vs "Akupunktur" is clear.

**Diagnosis**
1. **"tcm frauenfeld" goes to hwang.ch (twice in the top 10), not to the TCM.ch page.** Same address,
   same business, but hwang.ch has the Maps entity "Praxis Hwang" with its reviews. TCM.ch competes with
   its own partner without its own entity: NAP name "TCM.ch Frauenfeld" and the TCM.ch phone match no
   Maps entry. **This is the main obstacle, and it is an identity question, not a copy question (B).**
2. **Content is solid** (~1760 words, address, train lines, car parks, service area, 3 EMR links, FAQ,
   costs, map), but has contradictions and over-claims:
   - "Unser Team ist EMR- und ASCA-anerkannt": Kim has EMR only, Muschal (physio) no registry entry,
     and there are no ASCA links.
   - Erstgespräch "60 Minuten" (Ablauf) vs "bis zu 90 Minuten" (FAQ).
   - "Der grösste Teil unserer Patient:innen kommt aus Frauenfeld", "ältere Adressen im Netzwerk",
     "17+ Jahre" are unverified.
   - Kicker "TCM.ch Klinik · Frauenfeld" vs "Partnerklinik von Praxis Hwang".
   - Krankenkassen card shows a fallback without names (`team: []`).
   - Grammar: "Akupunktur bei Schlafprobleme".
3. **Schema vs. visible text:** areaServed (Stettfurt, Pfyn, Eschlikon, Amriswil, Felben) does not match
   the visible copy (Kurzdorf, Islikon, Wil). No `sameAs`/Hwang reference.
4. **Internal links:**
   - 63 Beschwerden pages link in body text with the same template paragraph ("TCM Frauenfeld").
     This is boilerplate, but the anchor is good.
   - Therapy pages link only through the card block.
   - Nearby cards on the page are `<div onclick>`, not crawlable.
5. **Conversion (mobile):**
   - Two sticky bars are in the markup. The location bar calls the **undefined** `openTerminForm()`
     (error confirmed in the browser). It is currently hidden at 390 px, so the bug is latent.
   - Header "Termin finden" leads away from the page to /kontakt/.
   - The Yuna widget promises "Antwortet < 2 Min", an unverified response-time promise (not caught in
     the last cleanup).
   - Footer: "Die führende TCM-Vermittlung der Schweiz", an unverified superlative.

## 4. Frauenfeld: ranked proposals

### F1 — Identity alignment with the operator (P1, **B**)
- Two coherent options (owner decides):
  - **A — TCM.ch page as the network page of the partner practice (recommended if TCM.ch should win
    "tcm/akupunktur frauenfeld")**
    - Visible: "Praxis Hwang Frauenfeld · Partnerpraxis im TCM.ch Netzwerk".
    - Schema `MedicalClinic` name exactly as in the Maps entry, `sameAs` [hwang.ch page, Maps place
      URL], phone per decision.
    - DE/EN names identical.
    - The GBP website stays as the owner decides.
  - **B — hwang.ch is the local owner**
    - The TCM.ch page stays as the network/booking page, without its own `MedicalClinic` (`WebPage` +
      `about` → Praxis Hwang entity).
    - Content focus on insurance/costs/booking via TCM.ch.
- **Mechanism:** a consistent NAP and an explicit entity reference (`sameAs`) let Google assign the page
  to the existing Maps entity, instead of two competing representations of the same business.

### F2 — Title, kicker, meta (P1, small; name part B)
- Title (36 characters): `TCM & Akupunktur Frauenfeld | TCM.ch` → `TCM & Akupunktur Frauenfeld – Rheinstrasse 25 | TCM.ch` (54). Under option A, alternatively with "Praxis Hwang".
- Kicker "TCM.ch Klinik · Frauenfeld" → "Partnerpraxis · Frauenfeld".
- Meta 174 → ≤155: `TCM & Akupunktur in Frauenfeld, Rheinstrasse 25: Partnerpraxis Praxis Hwang, EMR-anerkannte Therapeut:innen, Abrechnung über die Zusatzversicherung.` (148).
- **Mechanism:** address + operator in the snippet = local relevance and entity consistency, plus a
  higher expected CTR with a concrete address. No keyword stuffing.

### F3 — Correct credentials and trust content (P1, small)
- Team claim per person, from `therapeuten.ts`:
  - EMR/ASCA badges only where the register status is "anerkannt".
  - Add ASCA links if verifiable.
  - Muschal as physiotherapist without the TCM register claim.
- Fill the Krankenkassen card with names from the team instead of the fallback.
- Remove "grösster Teil unserer Patient:innen …", "ältere Adressen …" and "17+ Jahre" (unless the
  profile proves it).
- Unify the Erstgespräch duration (owner: 60 or 90 minutes).
- Grammar fix "bei Schlafproblemen".
- **Mechanism:** verifiable expertise signals (YMYL) and no contradictions in the content.

### F4 — Unify local data (P2, small)
- areaServed in `locations.ts` and the visible "Wer aus der Region zu uns kommt" from **one** list.
- Verify the walking time from Bahnhof Frauenfeld (Maps) and give it in minutes. Name bus lines only if verified.
- Label phone hours as team hours (see 0.2).
- **Mechanism:** consistent locality signals in schema and text.

### F5 — Crawlable nearby links + sticky bug (P1, small, site-wide)
- `WeitereStandorte` cards: `<div onclick="nav(…)">` → `<a href="/standorte/…/">`. Same design; the
  click handler can stay. Applies to all location pages. Münzgasse card shows "Termin prüfen →"
  despite review status (the gate checks only `<a>` cards). Fix along with this and include it in the gate.
- `#standort-mobile-cta`: `openTerminForm()` → `openContactForm()` (or the bar's form anchor).
  Applies to all 12 location pages.
- **Mechanism:** real links between neighbouring locations (crawl paths, local relation), plus a
  working CTA.

### F6 — Remove unverified promises (P1, small, site-wide)
- Yuna "Antwortet < 2 Min" → "Persönliche Antwort per WhatsApp".
- Footer "Die führende TCM-Vermittlung der Schweiz" → neutral ("TCM-Netzwerk in der Deutschschweiz").
- **Mechanism:** trust and compliance. No ranking mechanism promised.

### F7 — Real practice photos (P2, owner)
- The page shows only the "Symbolbild". If Praxis Hwang provides photos of Rheinstrasse 25 (with rights),
  use them in the existing `praxisBilder` component.
- **Mechanism:** genuine local image signals and trust. GBP photo consistency.

### F8 — Massage Frauenfeld (P3, note)
- "massage frauenfeld" has 590/mo, more than all TCM Frauenfeld terms. /massage-frauenfeld/ is the owner
  but shows only weak rankings. A separate check is worthwhile (Phase 4 commercial), not in this batch.

---

## 5. Implementation proposal (after approval)

| Batch | Contents | Blocked? |
|---|---|---|
| 1 Trust/placeholder | 0.1 placeholders, F6 Yuna/footer, phone-hour label (0.2) | no |
| 2 Technical site-wide | F5 (nearby links, sticky handler, gate extension), Z5 conversion fixes | no |
| 3 Zürich hub | Z1, Z2, Z3 (without naming), Z4 | Z3 naming part B |
| 4 Oerlikon/City | Z6, Z7 (only verified facts), Z8 City | Z8 Höngg B |
| 5 Frauenfeld | F2 (without operator name), F3, F4 | F1 B |
| 6 Identity | F1, Z8 Höngg, unified DE/EN schema names, `sameAs` | owner decision 0.3 |

QA per batch: build, health-audit, check-professional, check-clinic-status, link/redirect/JSON-LD check,
mobile/desktop visual QA. Brand: only existing components (practice cards, UspGrid, praxisBilder,
location cards, CTA system). The CREW block stays unchanged.

## 6. Measurement (28 days after each deploy, vs. baseline 11 Sep–8 Oct)

- GSC page filter:
  - hub: impressions + position for "tcm zürich", "akupunktur zürich", "tcm praxis zürich"
  - Oerlikon: "tcm oerlikon", "akupunktur oerlikon"
  - Frauenfeld: "tcm frauenfeld", "akupunktur frauenfeld"
- Watch cannibalisation: for "akupunktur zürich", does the ranking URL move from Oerlikon/City to the hub?
- Conversions: form submits with `formular` = Zürich-Funnel / location form, broken down by standort option.
- Expectation: no ranking forecast. If the hub is not the ranking URL for the head terms after 28 days,
  check the next step (homepage → hub anchor).

## 7. Owner questions

1. GBP website and the name/phone TCM.ch may show for each Praxis Hwang address (0.3).
2. Winterthur Münzgasse 2: confirm operation as Praxis Hwang → status "operational"?
3. Hub team photo: which team or location?
4. Frauenfeld: Erstgespräch duration; ASCA status per therapist; real practice photos.
5. Impressum: UID/VAT number.
6. Hours for Volketswil, Rorschach, Wil and Winterthur Marktgasse.
7. Oerlikon: final planned services (treatment list).
