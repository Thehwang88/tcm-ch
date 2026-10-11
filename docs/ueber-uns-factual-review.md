# Über uns — Faktenreview (read-only, 11.10.2026)

Status: **Review, keine Änderung.** Wave 5C (`69a4a13e`) war design-only; der Seitentext von `/ueber-uns/` ist unverändert (gerenderte Text-Parität verifiziert). Jede Korrektur unten braucht eine Freigabe und einen eigenen Content-Commit. Keine erfundenen Ersatztexte: die Vorschläge nennen nur Formulierungen, die durch eine kanonische Quelle gedeckt sind.

Quelle der Seite: `src/data/ueber-uns-body.html` (Team-Grid aus `src/data/therapeuten.ts` via `teamGridHtml()`).

## 1. Hwang.ch — Betreiber und Standorte

**Aktueller Text (CARE-System, Säule «Hwang.ch»):**
- `care-pillar-desc`: «TCM & Akupunktur mit ärztlicher Kompetenz. Integrative Medizin – persönlich, gründlich, **in Frauenfeld und Kreuzlingen**.»
- `care-pillar-facts`: «TCM · Akupunktur · Integrative Medizin» · «Ärztliche Einschätzung möglich» · «**Frauenfeld & Kreuzlingen**»
- Netzwerk-SVG (Vision): Knoten «hwang.ch — TCM Kliniken»

**Kanonische Evidenz:**
- `src/data/locations.ts`: `betreiber: { marke: 'Praxis Hwang' … }` auf **Kreuzlingen** (Z. 50), **Frauenfeld** (Z. 62) **und Zürich Höngg** (Z. 87, `hwang.ch/standorte/zurich-hongg`, Quelle «hwang.ch, abgerufen 11.10.2026»).
- `src/data/standorte.ts` (Oerlikon `plannedNote`): «Sofort einen Termin in Oerlikon bekommst du bei unserer Partnerpraxis Praxis Hwang an der Schulstrasse 3» (`hwang.ch/standorte/zurich-oerlikon`).
- Commit `d872b498` «Kreuzlingen und Zürich Höngg als Praxis Hwang (Partnerpraxis) – Identitätsmodell wie Frauenfeld».

**Befund:** Die Standortliste der Säule ist unvollständig (Zürich Höngg fehlt; Oerlikon-Partnerpraxis fehlt). Die Aussagen «ärztliche Kompetenz» / «Ärztliche Einschätzung möglich» sind in der Registry nicht belegt; Commit `1b6de495` hat vergleichbare Arzt-Claims («Partnerklinik mit Ärzt:innen», «Ärztliche Begleitung») site-weit entfernt. Die SVG-Beschriftung «TCM Kliniken» entspricht nicht der Registry-Marke «Praxis Hwang».

**Vorschlag (nur Registry-gedeckt):** Standorte auf «Frauenfeld, Kreuzlingen & Zürich Höngg» erweitern (Oerlikon nur, wenn die Partnerpraxis-Nennung aus `standorte.ts` als kanonisch gilt); «ärztliche Kompetenz» / «Ärztliche Einschätzung möglich» entweder mit Beleg (Arztregister/Eintrag auf hwang.ch) versehen oder im Sinn von `1b6de495` streichen; SVG-Label «TCM Kliniken» → «Praxis Hwang» (Marke laut Registry).

## 2. «Alle EMR- oder ASCA-anerkannt»

**Aktueller Text (Intro, 2. Absatz):** «Dahinter steht ein junges, engagiertes Team aus qualifizierten Therapeutinnen und Therapeuten, die ihr Handwerk ernst nehmen. **Alle EMR- oder ASCA-anerkannt**, viele mit eidgenössischem Diplom.»

**Kanonische Evidenz (gerendertes Team-Grid derselben Seite, 17 Karten):** ohne EMR-/ASCA-Badge: Simon Stüve Hwang («Inhaber TCM.ch · TCM in Ausbildung»), Yuna Stüve («TCM-Therapeutin in Ausbildung»), Markus Muschal («Physiotherapeut»), Dr. tcm Johann Stüve («Mentor»). 13 Karten tragen EMR (davon 6 zusätzlich ASCA, 1 Visana). Commit `e777ed51` hat «das pauschale „EMR- und ASCA-anerkannten Therapeut:innen“ entfernt (Registereinträge stehen pro Person)».

**Befund:** Pauschalaussage widerspricht der eigenen Registry-Darstellung auf derselben Seite. Die CARE-Säule TCM.ch wiederholt «EMR-/ASCA-anerkannte Therapeut:innen» (ohne «alle» — vertretbar).

**Vorschlag:** «Alle EMR- oder ASCA-anerkannt» → Formulierung, die auf die Pro-Person-Transparenz verweist (die Seite hat sie bereits im Team-Sub: «Deshalb zeigen wir bei jeder Person transparent, welche Ausbildung, Methoden und Anerkennungen tatsächlich vorliegen»), z. B. den Satz streichen oder durch «Die Therapeut:innen mit TCM-Ausbildung sind beim EMR registriert» (Wortlaut aus `standorte.ts`, Frauenfeld) ersetzen — nur wenn das für alle TCM-behandelnden Personen der Registry stimmt (Yuna Stüve: in Ausbildung → Satz müsste «in Ausbildung» ausnehmen).

## 3. Gründer-Titel

**Aktueller Text:**
- Gründer-Note (`founder-label`): «Von Simon, **Co-Founder & Head of Patient Experience**»
- Advisor-Block (`uu-advisor-eyebrow` / `-role`): «**Gründer & Inhaber**» / «Inhaber TCM.ch · TCM in Ausbildung»

**Kanonische Evidenz:** `therapeuten.ts` `simon-stueve`: `titel: 'Inhaber TCM.ch · TCM in Ausbildung'`, `untertitel: 'Administration und Praxisorganisation'`. Kein «Co-Founder», kein «Head of Patient Experience» in der Registry; `seo/business-identity-mapping-2026-10-11.md` kennt diese Rolle ebenfalls nicht.

**Befund:** Zwei verschiedene Titel für dieselbe Person auf einer Seite; nur «Inhaber TCM.ch» ist Registry-gedeckt.

**Vorschlag:** Gründer-Note-Label auf den Registry-Titel angleichen («Von Simon Stüve Hwang, Inhaber TCM.ch») oder — falls Co-Founder/Head-of-PX korrekt ist — Registry (`titel`/`untertitel`) als Single Source nachführen und beide Stellen daraus rendern. Entscheidung Inhaber.

## 4. Sofort-/Geschwindigkeits-Claims

**Aktueller Text:**
- Vergleich «Alte Welt / TCM.ch»: «✓ WhatsApp → persönliche Antwort» · «✓ ⚡ Termin direkt anfragen» · «✓ Wir finden die richtige Praxis für dich» · «✓ **Krankenkasse-Status sofort geklärt**»
- Partner-Vorteilskarte: «**⚡ Direkt weitergeleitet.** Nur qualifizierte Anfragen.»
- CARE-Säule TCM.ch: «Termin direkt anfragen»

**Kanonische Evidenz (Trust-Linie):** Commits `1b6de495` («Antwortzeit-Garantien entfernt … → „persönliche Antwort vom Team“»), `98a6946d» («WhatsApp-Concierge „Antwortet < 2 Min“ → „Persönliche Antwort per WhatsApp“»), `e777ed51` («Termine meist innert weniger Tage» entfernt). Für Krankenkassen gilt site-weit der Wortlaut aus `standorte.ts`: «Ob und wie viel deine Zusatzversicherung übernimmt, hängt von Versicherer und Modell ab … Was dein Vertrag hergibt, prüfen wir kostenlos, bevor du das erste Mal kommst.»

**Befund:** «sofort geklärt» ist ein Zeit-/Ergebnisversprechen derselben Klasse, die Phase 3 entfernt hat; der Clinic-Status-Gate prüft solche Formulierungen nicht (deshalb grün). «Termin direkt anfragen» und «Direkt weitergeleitet» beschreiben den Kanal, nicht eine Frist — vertretbar, aber das ⚡-Zeichen suggeriert Tempo.

**Vorschlag:** «Krankenkasse-Status sofort geklärt» → «Krankenkasse: wir prüfen vorab, was dein Vertrag hergibt» (Wortlaut-Basis `standorte.ts`). ⚡-Zeichen vor «Termin direkt anfragen» / «Direkt weitergeleitet» entfernen; Texte selbst können bleiben. «WhatsApp → persönliche Antwort» ist konform (`98a6946d`).

## 5. Medienreferenzen und Partnernamen

**Aktueller Text:** Presse-Leiste «Bekannt aus» mit Text-Logos **NZZ, Tages-Anzeiger, 20 Minuten, Handelszeitung, SRF, Beobachter** (reine `<span>`, keine Links, keine Quellen). Netzwerk-SVG: hwang.ch «TCM Kliniken», tcmd.ch «Medizinische Akupunktur», biohax.ch «Longevity», aku.ch «Akupunktur», physio.ch «Physiotherapie». BrandMarquee (`/`, `/akademie/`, `/club/`): Praxis Hwang, Physio.ch, BIOHAX, Bencao, OUCH., QI CLUB.

**Kanonische Evidenz:** Für die sechs Medien existiert im Repo keine Quelle (kein Link, kein Datum, kein Artikel in `seo/`). Für die Partnermarken: `locations.ts` (Praxis Hwang), `src/data/physio-tcm.ts` («physio.ch bleibt die dedizierte Plattform für reine Physiotherapie/Domizilbehandlung»), BrandMarquee-Komponente (BIOHAX, Bencao, OUCH., QI CLUB). **tcmd.ch** und **aku.ch** kommen ausserhalb des SVG nirgends im Repo vor.

**Befund:** «Bekannt aus» ist im Sinne von `1b6de495`/`98a6946d` (Superlativ-/Beleg-Linie) ein unbelegter Trust-Claim. tcmd.ch und aku.ch sind im Netzwerk-SVG genannt, aber nirgends sonst belegt; die SVG-Partnerliste weicht von der BrandMarquee-Liste ab (Bencao, OUCH., QI CLUB fehlen; tcmd.ch, aku.ch zusätzlich).

**Vorschlag:** Presse-Leiste nur behalten, wenn pro Medium Beleg (URL + Datum) hinterlegt wird; sonst entfernen (`.uu-press` ist ein in sich geschlossener Block). SVG-Knoten tcmd.ch/aku.ch entweder belegen oder entfernen; Label hwang.ch → «Praxis Hwang». Partnernamen in SVG und BrandMarquee aus einer gemeinsamen Datenquelle rendern (Folgearbeit, nicht Wave 6 Design).

## Zusammenfassung

| # | Thema | Schwere | Minimalkorrektur | Entscheidung |
|---|---|---|---|---|
| 1 | Hwang-Standorte / Arzt-Claim / «TCM Kliniken» | mittel | Standorte ergänzen, Arzt-Claim belegen/streichen, Label «Praxis Hwang» | Inhaber |
| 2 | «Alle EMR- oder ASCA-anerkannt» | hoch (Widerspruch auf derselben Seite) | Satz streichen oder pro-Person-Verweis | Inhaber |
| 3 | Gründer-Titel | niedrig | auf Registry-Titel angleichen | Inhaber |
| 4 | «sofort geklärt», ⚡ | mittel (Trust-Linie) | Wortlaut aus `standorte.ts`, ⚡ entfernen | Inhaber |
| 5 | «Bekannt aus», tcmd.ch/aku.ch | mittel | belegen oder entfernen | Inhaber |
