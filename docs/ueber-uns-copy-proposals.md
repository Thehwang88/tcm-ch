# Über uns — Copy-Vorschläge zu den fünf offenen Fakten (read-only, 11.10.2026)

Ergänzt `docs/ueber-uns-factual-review.md`. **Nichts davon ist umgesetzt.** Jede Zeile braucht eine Inhaber-Entscheidung; die «Nachher»-Texte verwenden ausschliesslich Formulierungen, die in kanonischen Quellen des Repos stehen (`src/data/locations.ts`, `src/data/therapeuten.ts`, `src/data/standorte.ts`, `src/data/legal/impressum.html`, Trust-Commits `1b6de495`, `98a6946d`, `e777ed51`). Wo keine Quelle existiert, steht «streichen» — kein erfundener Ersatz.

Schwere: **H** = widerspricht einer eigenen kanonischen Quelle oder der Trust-Linie · **M** = unbelegt, aber nicht widerlegt · **N** = Inkonsistenz ohne Aussenwirkung.

## 1. Hwang — Betreiber- und Standortstruktur (H/M)

| # | Stelle (`src/data/ueber-uns-body.html`) | Vorher (exakt) | Nachher (Vorschlag) | Evidenz | Schwere |
|---|---|---|---|---|---|
| 1a | CARE-Säule `care-pillar-desc` | «TCM & Akupunktur mit ärztlicher Kompetenz. Integrative Medizin – persönlich, gründlich, in Frauenfeld und Kreuzlingen.» | «TCM & Akupunktur in der Praxis Hwang – persönlich, gründlich, in Frauenfeld, Kreuzlingen und Zürich Höngg.» | `locations.ts` Z. 50/62/87: `betreiber.marke: 'Praxis Hwang'` für Kreuzlingen, Frauenfeld, Zürich Höngg. «ärztliche Kompetenz» ohne Beleg; `1b6de495` entfernte gleichartige Arzt-Claims. | H (Standorte) / M (Arzt) |
| 1b | `care-pillar-facts` Zeile 2 | «Ärztliche Einschätzung möglich» | streichen — oder belassen, wenn der Inhaber einen Beleg (Arztregister-Eintrag, hwang.ch-Angebotsseite) im Repo hinterlegt | wie 1a | M |
| 1c | `care-pillar-facts` Zeile 3 | «Frauenfeld & Kreuzlingen» | «Frauenfeld · Kreuzlingen · Zürich Höngg» | `locations.ts` Z. 87 | H |
| 1d | Vision-SVG `<text>` unter «hwang.ch» | «TCM Kliniken» | «Praxis Hwang» | Registry-Marke `marke: 'Praxis Hwang'`; keine Quelle für «Kliniken» | N |
| 1e | Oerlikon | — (nicht genannt) | **keine Ergänzung** | `standorte.ts` nennt «Praxis Hwang an der Schulstrasse 3» nur als Ausweich-Hinweis in `plannedNote`; `locations.ts` führt Oerlikon als TCM.ch-Standort `planned` ohne `betreiber` → nicht als Hwang-Standort listen | — |

## 2. «Alle EMR- oder ASCA-anerkannt» (H)

| # | Stelle | Vorher (exakt) | Nachher (Vorschlag) | Evidenz | Schwere |
|---|---|---|---|---|---|
| 2a | Intro, 2. Absatz | «Dahinter steht ein junges, engagiertes Team aus qualifizierten Therapeutinnen und Therapeuten, die ihr Handwerk ernst nehmen. **Alle EMR- oder ASCA-anerkannt, viele mit eidgenössischem Diplom.** Sie verbindet derselbe Anspruch: …» | «Dahinter steht ein junges, engagiertes Team aus qualifizierten Therapeutinnen und Therapeuten, die ihr Handwerk ernst nehmen. **Welche Ausbildung, Methoden und Anerkennungen vorliegen, zeigen wir bei jeder Person transparent.** Sie verbindet derselbe Anspruch: …» | Gerendertes Team-Grid derselben Seite: 13/17 mit EMR-Badge, 4/17 ohne (Inhaber, Mentor, Therapeutin in Ausbildung, Physiotherapeut). Ersatzsatz ist der bestehende `team-sub`-Wortlaut. `e777ed51` entfernte das pauschale «EMR- und ASCA-anerkannten Therapeut:innen» bereits site-weit. «viele mit eidgenössischem Diplom»: Registry zeigt OdA-AM-Zertifikat bei 2 Personen → ebenfalls nicht belegbar als «viele». | H |
| 2b | CARE-Säule TCM.ch `care-pillar-facts` | «EMR-/ASCA-anerkannte Therapeut:innen» | belassen **oder** «Registereinträge pro Therapeut:in sichtbar» | Ohne «alle» vertretbar; `e777ed51`-Logik spricht für die Pro-Person-Formulierung | M |

## 3. Gründer-Rollen (N)

| # | Stelle | Vorher (exakt) | Nachher (Vorschlag) | Evidenz | Schwere |
|---|---|---|---|---|---|
| 3a | Gründer-Note `founder-label` | «Von Simon, Co-Founder & Head of Patient Experience» | «Von Simon Stüve Hwang, Co-Founder» **oder** «Von Simon Stüve Hwang, Inhaber TCM.ch» | Impressum (`src/data/legal/impressum.html` Z. 40): «Simon Stüve, Co-Founder»; Registry `therapeuten.ts` Z. 134: `titel: 'Inhaber TCM.ch · TCM in Ausbildung'`. «Head of Patient Experience» kommt in keiner Quelle vor → streichen. | N |
| 3b | Advisor `uu-advisor-eyebrow` | «Gründer & Inhaber» | «Co-Founder & Inhaber» | Impressum «Co-Founder» + Registry «Inhaber TCM.ch»; «Gründer» (alleinig) widerspricht «Co-Founder» | N |
| 3c | Advisor `uu-advisor-role` | «Inhaber TCM.ch · TCM in Ausbildung» | unverändert | = Registry-Titel | — |

Empfehlung: eine Rolle festlegen (Impressum ist die rechtlich verbindliche Stelle) und die Gründer-Note daraus rendern.

## 4. Versicherungs-/Tempo-Versprechen (H)

| # | Stelle | Vorher (exakt) | Nachher (Vorschlag) | Evidenz | Schwere |
|---|---|---|---|---|---|
| 4a | Vergleich, TCM.ch-Spalte, Zeile 4 | «Krankenkasse-Status sofort geklärt» | «Krankenkasse: Was dein Vertrag hergibt, prüfen wir kostenlos vorab» | `standorte.ts` (Frauenfeld/Kreuzlingen): «Was dein Vertrag konkret hergibt, prüfen wir kostenlos, bevor du den ersten Termin nimmst.»; `1b6de495`: Antwortzeit-/Sofort-Garantien entfernt | H |
| 4b | Vergleich, Zeile 2 | «⚡ Termin direkt anfragen» | «Termin direkt anfragen» (⚡ entfernen) | Kanalbeschreibung ok; ⚡ suggeriert Tempo (`98a6946d`: «< 2 Min» entfernt) | M |
| 4c | Vergleich, Zeile 1 | «WhatsApp → persönliche Antwort» | unverändert | = `98a6946d` «Persönliche Antwort per WhatsApp» | — |
| 4d | Partner-Vorteilskarte | «⚡ Direkt weitergeleitet.» / «Nur qualifizierte Anfragen.» | «Direkt weitergeleitet.» / «Nur qualifizierte Anfragen.» (⚡ entfernen) | wie 4b; Partner-Konditionen bleiben unverändert (nur Symbol) | M |
| 4e | Vergleich, «Alte Welt»-Spalte | «2–3 Wochen Wartezeit» | unverändert (Beschreibung der Alternative, kein eigenes Versprechen) | — | — |
| 4f | CARE-Säule TCM.ch | «Termin direkt anfragen» | unverändert | — | — |
| 4g | Intro, 3. Absatz | «… transparente Kosten, persönliche Beratung per WhatsApp.» | unverändert | konform `98a6946d` | — |

## 5. Presse-/Medien- und Partnerreferenzen (M)

| # | Stelle | Vorher (exakt) | Nachher (Vorschlag) | Evidenz | Schwere |
|---|---|---|---|---|---|
| 5a | `.uu-press` «Bekannt aus» | Text-Logos «NZZ · Tages-Anzeiger · 20 Minuten · Handelszeitung · SRF · Beobachter» (keine Links) | **Option A:** Block entfernen (`<div class="uu-press">…</div>`, in sich geschlossen, kein Anker-Ziel). **Option B:** behalten, wenn pro Medium URL + Datum als `title`/Link hinterlegt wird. | Keine Quelle im Repo (`seo/`, `docs/`, Daten); Trust-Linie `1b6de495`/`98a6946d` (Superlativ/Beleg) | M |
| 5b | Vision-SVG Knoten «tcmd.ch — Medizinische Akupunktur», «aku.ch — Akupunktur» | wie links | entfernen, bis belegt (Knoten + Verbindungs-Linien im SVG) | Domains kommen ausserhalb des SVG nirgends im Repo vor (0 Treffer in `src/`, `seo/`, `docs/`) | M |
| 5c | Vision-SVG «hwang.ch — TCM Kliniken» | wie links | «hwang.ch — Praxis Hwang» | Registry-Marke | N |
| 5d | Vision-SVG «biohax.ch — Longevity», «physio.ch — Physiotherapie» | wie links | unverändert | BrandMarquee (BIOHAX), `src/data/physio-tcm.ts` («physio.ch … dedizierte Plattform für reine Physiotherapie/Domizilbehandlung») | — |
| 5e | CARE-Säule Physio.ch `care-pillar-facts` «Domizilphysiotherapie Zürich» | wie links | unverändert | `physio-tcm.ts` | — |

## Umsetzungsregeln (falls freigegeben)
- Ein Content-Commit, nur `src/data/ueber-uns-body.html` (Text/SVG-Text), kein CSS; Title/Description/Canonical/AboutPage-Schema unverändert; Anker-IDs unverändert.
- Gates + Text-Parität bewusst **nicht** identisch (Text ändert sich) → Diff muss exakt die freigegebenen Zeilen zeigen; alle anderen 765 Routen byteidentisch.
- Keine Änderung an `therapeuten.ts`/`locations.ts` aus dieser Seite heraus; falls Rollen (3) dort geändert werden sollen, eigener Registry-Commit.
