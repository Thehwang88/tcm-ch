# Local SEO Phase 3: Audit of Winterthur Marktgasse, St. Gallen, Kreuzlingen and Basel (11 Oct 2026)

Status: **read-only.** No page changes from this audit.
- Basis: branch `claude/trusting-curie-hx4k3d` @ `e777ed5`, after batches 1–5. The local build is the rendered truth.
- GSC baseline: page level, 11 Sep–8 Oct 2026.
- Search volumes: Semrush CH, estimates only.
- Identity: see `seo/business-identity-mapping-2026-10-11.md`.

| Page | GSC clicks / impr. / pos. | Head terms (Semrush volume/mo) |
|---|---|---|
| /standorte/winterthur-marktgasse/ | 27 / 1958 / 4.5 | tcm winterthur 480, akupunktur winterthur 260 |
| /standorte/st-gallen/ | 60 / 1805 / 4.9 | tcm st. gallen 260, akupunktur st. gallen 170 |
| /standorte/kreuzlingen/ | 8 / 482 / 7.1 | akupunktur kreuzlingen 110, tcm kreuzlingen 90 |
| /standorte/basel/ | 7 / 330 / 17.9 | akupunktur basel 590, tcm basel 320 |

Shared rule for all four: **don't put good rankings at risk.** Marktgasse and St. Gallen are already ranking around
position 5. Change titles, H1s and URLs there only for accuracy reasons, not for keyword reasons.

---

## 1. Winterthur Marktgasse (priority 3)

**Finding**
1. **Identity unclear (blocker).**
   - hwang.ch lists Praxis Hwang Winterthur at **Münzgasse 2** (with a Maps place). Marktgasse 78 is not listed.
   - The Marktgasse page presents itself as "TCM.ch Klinik · Winterthur" and "ergänzt unsere bestehende Praxis an der
     Münzgasse".
   - The Münzgasse page calls Marktgasse the "Hauptstandort". It is itself in `review`.
   - Schema "TCM Winterthur – TCM.ch" (DE) vs. "TCM.ch - Acupuncture & TCM Winterthur Marktgasse" (EN).
2. **No team on the page** (`team: []`).
   - The "Transparenz" block promises register links, but there are none.
   - The five Winterthur therapists from `therapeuten.ts` are all assigned to Münzgasse (review).
3. **Unverified claims:**
   - "Alle Therapeut:innen sind EMR- und ASCA-anerkannt"
   - "Zu unseren Patient:innen zählen Menschen aus allen Stadtkreisen" / "kommen … regelmässig zu uns"
   - "vollständiges Spektrum" (Moxa/Elektro are not in the therapy cards)
   - "Beide Winterthurer Adressen bieten auch Massage"
   - Meta "Mo bis Sa geöffnet"
   - Template hours (match Praxis Hwang, but for the other address)
4. **Unverified transport details:** "Bahnhof in 6 Gehminuten", "Stadthaus 2 Gehminuten", car parks with walking times.
   Münzgasse: S-Bahn lines S7…S35 and car parks "(3 Min.)".
5. **Meta 178 characters**, too long.
6. **Inconsistent cost figures:** standort 80–100 %, /massage-winterthur/ "bis zu 90 %" / "50 bis 90 %",
   /wissen/akupunktur-winterthur-kosten/ "70 bis 90 Prozent".
7. **Wissen articles "Geprüft durch Corinna Reinhart"** (a St. Gallen therapist) on Winterthur topics. Reviewer
   attribution needs checking.
8. **Conversion:** form option only "Winterthur" (no Marktgasse/Münzgasse distinction). Two sticky bars in the DOM
   (the location bar is globally `display:none`).

**Proposals (ranked)**

| # | Change | Mechanism | Blocked? |
|---|---|---|---|
| W1 | Owner clarifies the operator of Marktgasse 78 and the role of Münzgasse 2. Then set `status`/`betreiber` in `locations.ts`. Make the "Hauptstandort"/"ergänzen" statements consistent. | NAP consistency with the real entity; no contradictory page pair | **Owner** |
| W2 | Remove unverified claims (EMR/ASCA blanket claim, patient origin, "vollständiges Spektrum", massage at both addresses, meta "Mo bis Sa geöffnet"). Meta ≤155 without hours. | Trust/quality signals; snippet without untenable promise | no |
| W3 | Remove transport details with minute figures and line numbers, or verify them via SBB/Stadtbus. Same on the Münzgasse page. | No unverifiable details | no |
| W4 | Team: assign the therapists who actually work at the Marktgasse in `therapeuten.ts` (owner input). Otherwise adjust the Transparenz copy ("Registereinträge auf Anfrage"). | E-E-A-T through verifiable people | Owner (assignment) |
| W5 | One insurance statement across standort, massage and wissen pages ("je nach Versicherer und Modell, häufig …"). | Consistency, fewer contradictions | no |
| W6 | Check the reviewer attribution of the Winterthur wissen articles (Corinna Reinhart, St. Gallen). If she did not review them, remove it. | Truthful E-E-A-T | Owner |
| W7 | Keep title/H1 (pos. 4.5). After W1, possibly add the address/operator to the meta. | Protect rankings | after W1 |

## 2. St. Gallen (priority 4, legacy branch, protected: OneDoc, GA4, Turnstile)

**Finding**
1. **Identity:**
   - Visible "TCM.ch Praxis/Kliniken St. Gallen", linked profile "TCM.ch St Gallen", DE schema "TCM St. Gallen" (no
     `memberOf`), EN "TCM.ch - Acupuncture & TCM St. Gallen".
   - /akupunktur-tcm-st-gallen/ creates a **third** clinic entity ("TCM.ch – Akupunktur & TCM St. Gallen",
     `#clinic`).
   - hwang.ch also lists the address. Who operates it is not settled.
2. **Hours:** St. Gallen Mo–Sa 7:30–19:30, So 8–17 (hero, NAP, schema, support page). They differ from the Praxis Hwang
   hours.
3. **Unverified claims:**
   - "Unser Team aus der Schweiz und Südkorea" (both therapists shown have Swiss training)
   - "Termine meist innert weniger Tage" (**removed in `e777ed5`**)
   - "Klinischer Hintergrund Onkologie St. Gallen" identical on both cards
   - "Patient:innen … häufig zu uns kommen"
   - "krankenkassenzertifiziert"
   - "Erster Termin … kostenlos", "30 Min. gratis", "Erste Akupunktur noch in derselben Sitzung": an offer.
     **Owner** confirms it is current.
4. **Keyword overlap:**
   - /akupunktur-tcm-st-gallen/ is SECONDARY_SUPPORT in the map ("Behandlung, Ablauf"), but its meta leads with
     "Akupunktur & TCM in St. Gallen, zentral am Oberen Graben …".
   - Its secondary keyword "akupunktur st gallen krankenkasse" overlaps the cost page.
5. **Cards not crawlable:** Beschwerden/Therapien cards on the St. Gallen leaf are `<div onclick>`. The nearby cards
   were already converted in batch 2.

**Proposals**

| # | Change | Mechanism | Blocked? |
|---|---|---|---|
| S1 | Settle operator and profile owner (business-identity mapping). Then **one** entity: DE/EN schema with the same `@id` and the profile name, and remove the clinic node from /akupunktur-tcm-st-gallen/ (keep WebPage/FAQ, reference the entity via `about`). | One entity per address; profile and website consistent | Owner (name); removing the node is not blocked |
| S2 | Adjust the support page's meta to its support role ("Ablauf, Behandlung, Studienlage …"); drop the "krankenkasse" keyword from the support page (cost page owns it). | Clear keyword ownership; protects pos. 4.9 of the standort page | no |
| S3 | Remove or substantiate the claims in the finding (Südkorea, oncology background, patient origin, "krankenkassenzertifiziert"). | Trust | no / owner (oncology) |
| S4 | Convert Beschwerden/Therapien cards in the leaf to `<a href>` (same approach as batch 2; markup only, protected hooks untouched). | Crawlable internal links to 14+ target pages | no |
| S5 | Have the owner confirm the free first appointment and its conditions. Keep it if it holds; it's a strong conversion argument. | Conversion, accuracy | Owner |

## 3. Kreuzlingen (priority 5)

**Finding**
1. **Identity:**
   - Operator per hwang.ch: **Praxis Hwang** (Maps place, +41 79 837 46 81).
   - The page shows "TCM.ch Klinik · Kreuzlingen", schema "TCM.ch Kreuzlingen" with the TCM.ch number, while the copy
     says "Partnerklinik von Praxis Hwang".
   - This is the same situation as Frauenfeld before batch 5. **Technically ready:** setting `betreiber` in
     `locations.ts` is enough (eyebrow, sidebar, DE/EN schema follow).
2. **Unverified/contradictory claims:**
   - "langjähriger Hauptstandort unseres Netzwerks. Hier hat TCM.ch angefangen …"
   - "Der grösste Teil unserer Patient:innen wohnt in Kreuzlingen"
   - "behandeln seit Jahren regelmässig deutsche Patient:innen"
   - "kurzfristig noch ein Termin" (the FAQ itself says "hängt von der Auslastung ab")
   - "Erfahrung aus der Schweiz und Südkorea" (the only therapist shown is not trained in Korea)
   - Erstgespräch "bis zu 90 Minuten" (same contradiction as Frauenfeld)
   - "Termine meist innert weniger Tage" (**removed in `e777ed5`**)
3. **Transport/parking with line numbers and walking times** (S14, 3 car parks, "wenige Minuten" to Konstanz):
   unverified. Operator only says "Parkmöglichkeiten in unmittelbarer Nähe" (Frauenfeld wording; check
   hwang.ch/standorte/kreuzlingen).
4. **Meta 195 characters.** areaServed (schema) vs. visible text don't match (Lengwil/Altnau/Meersburg vs. Ermatingen).
5. **Two entities at the same address:** /massage-kreuzlingen/ has its own MedicalBusiness "TCM.ch Massage
   Kreuzlingen".
6. **Neighbour Bottighofen** (TCM Pelican): mutual areaServed overlap. No problem (partner practice of its own), but
   the EN schema name says "TCM.ch …" instead of "TCM Pelican".
7. **Massage pages "Frag direkt Brenda."** Brenda Oviedo is only assigned to Münzgasse (review).

**Proposals**

| # | Change | Mechanism | Blocked? |
|---|---|---|---|
| K1 | Set `betreiber` (Praxis Hwang Kreuzlingen, hwang.ch URL, +41 79 837 46 81) as in Frauenfeld; copy "Partnerpraxis im TCM.ch Netzwerk". | Entity consistency with the Maps place; operator truthful | **GO needed** (identity mapping, question 5) |
| K2 | Remove claims in finding 2 and the Erstgespräch duration (as in Frauenfeld). | Trust | no |
| K3 | Replace transport/parking with verified facts, or with the operator's statement. | No unverifiable details | no |
| K4 | Title stays; meta ≤155 with operator and address; areaServed = visible list. | Snippet, local consistency | no (operator part via K1) |
| K5 | Massage-Kreuzlingen schema: link the MedicalBusiness to the practice entity (`parentOrganization`/same `@id`) instead of creating a second clinic. Check the "Brenda" CTA (right person for Kreuzlingen?). | No entity duplicates; correct contact person | Owner (person) |
| K6 | Align the Bottighofen EN schema name to "TCM Pelican". | Consistent partner identity | no |

## 4. Basel pre-opening (priority 6)

**Finding**
1. **Status page /standorte/basel/ is clean** in the essentials: eyebrow "Geplanter Standort", banner, form option
   "Vormerkung", no hours, schema with status description. **But** the copy implies an operating practice in places:
   - H2 "Dein TCM Team in Basel"
   - "Bei uns behandelt dich ein Team …"
   - "Wir führen eine Praxis in der Stadt"
   - FAQ "Termine ausserhalb der Bürozeiten"
   - USP "… in der bestehenden Partnerpraxis" (there is none for Basel)
2. **/akupunktur-tcm-basel/** (support page):
   - It **never says** that Basel is not open: "Unsere Praxis liegt an der Steinenvorstadt 73".
   - Its form has no Basel option.
   - Hero badge "Krankenkasse 80 bis 100%" contradicts its own body "70 bis 90 %".
3. **Other Basel pages without status:**
   - /massage-basel/ ("Unsere Praxis in Basel"), /wissen/tcm-basel-erfahrungen-ablauf/ ("Unsere Praxis liegt …"), EN
     Basel and the cost page have no "Basel – Vormerkung" option.
   - The status gate only checks options that **start with** "Basel". These pages have no Basel option at all, which
     is why the gate stays green.
4. **Date contradiction:** the keyword map says "Praxis ab 2028, Warteliste"; the site says "März 2027". Owner confirms.
5. **Team:** Janine Schmieder Trebes shown as "Basel"; no register link on the page. Does she already work for Basel
   (pre-opening)?
6. **Transport details unverified** ("ohne Umsteigen", "Liestal gut zwanzig, Sissach gut dreissig Minuten").
7. **Keyword ownership** (map): /standorte/basel/ PRIMARY "tcm basel" (+ "akupunktur basel"); /akupunktur-tcm-basel/
   SECONDARY "akupunktur basel angebot ablauf". The live title of the support page ("Akupunktur in Basel: Angebot,
   Ablauf & Kosten") competes with the main page for "akupunktur basel" (590/mo). Today it has hardly any inbound links
   (only from Basel pages).

**Proposals**

| # | Change | Mechanism | Blocked? |
|---|---|---|---|
| B1 | Pre-opening copy across **all** Basel pages: "geplante Praxis", no "wir behandeln/führen"; remove "Bürozeiten" and "bestehende Partnerpraxis"; H2 "Wer in Basel behandeln wird" only once the team is confirmed. | No pre-opening operating claim | no |
| B2 | /akupunktur-tcm-basel/: status note + form option "Basel – Vormerkung"; remove the "80 bis 100%" badge or align it with the body. | Honest snippet; conversion via pre-opening registration | no |
| B3 | Extend the status gate: on pages whose URL or title contains a planned location name, the form must offer that location's pre-opening option, and the copy must not contain "unsere Praxis liegt" without a status note. | Regression protection for future pre-openings | no |
| B4 | Sharpen ownership: support page title/meta to "Ablauf & Kosten" without competing with "Akupunktur Basel"; main page stays owner. | Clear owner for 590/mo | no |
| B5 | Clarify the opening date (March 2027 vs. 2028) and the Basel team assignment. | Accuracy | **Owner** |
| B6 | Remove or verify transport details. | No unverifiable details | no |

## 5. Cross-cutting (all four)

- **Erstgespräch duration and cost:**
  - hwang.ch advertises "Ersttermin ist kostenlos" / "Gratis Erstgespräch".
  - TCM.ch pages state 60/90 minutes and "liegt entsprechend höher" in places.
  - Owner decides **one** statement. Until then, no fixed duration or price.
- **Two sticky bars in the DOM:** the location bar `mobile-cta-bar` is globally `display:none!important`. Removing the
  dead markup is optional, low risk, no SEO effect.
- **Therapy component text** "Medizinisch anerkannte TCM-Methoden, krankenkassenzertifiziert" (all location pages):
  "krankenkassenzertifiziert" is vague. Proposal: "über die Zusatzversicherung abrechenbar (EMR)".
- **"Nahe Zürich"** as the description of the Münzgasse card (Frauenfeld/Basel nearby) is misleading. Use "Altstadt".

## 6. Recommended order (after GO)

1. B1–B3 (Basel pre-opening across all pages + gate). Highest risk of untrue statements.
2. K2, K3, K4 (Kreuzlingen claims/meta), W2, W3, W5 (Winterthur claims/meta), S2, S3, S4 (St. Gallen support
   page/claims/cards).
3. After owner answers: K1, W1, W4, S1, B5, Erstgespräch.

Measurement: GSC page + query per location 28 days after deploy vs. this baseline. Pay particular attention to
Marktgasse and St. Gallen (positions must not drop because of the accuracy edits).
