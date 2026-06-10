// Single source of truth for migrated Therapien (Astro static pages).
// Route: src/pages/therapien/[slug].astro (getStaticPaths). All 11 therapies.
// VOICE: evidence-based. Energetic healing claims removed (Qi/Energiefluss/Yin-Yang/
// "Blockaden lösen"/"Selbstheilungskräfte aktivieren"); Akupunkturpunkt/Meridian kept
// but framed as the TCM model, never asserted physiology. Schema: MedicalTherapy +
// FAQPage + BreadcrumbList.
export interface TherapieFaq { q: string; a: string }
export interface TherapieLink { slug: string; label: string }
export interface Therapie { slug: string; name: string; title: string; metaDesc: string; lead: string; duration: string; sessions: string; insurance: string; bodyHtml: string; faqs: TherapieFaq[]; beschwerden: TherapieLink[]; therapies: TherapieLink[]; }
export const therapien: Therapie[] = [
  {
    "slug": "akupunktur",
    "name": "Akupunktur",
    "title": "Akupunktur Schweiz – EMR-anerkannt, Termin in 24h",
    "metaDesc": "Akupunktur in der Schweiz: 11 geprüfte TCM-Praxen, EMR/ASCA anerkannt, Krankenkasse 80–100%. Termin oft in 24h. Zürich · Basel · St. Gallen · Winterthur.",
    "lead": "Feine Nadeln an definierten Körperpunkten — eine der am besten erforschten komplementärmedizinischen Methoden. EMR-/ASCA-anerkannt, Termin oft innert 24 Stunden.",
    "duration": "45–60 Min",
    "sessions": "6–10",
    "insurance": "Zusatzversicherung oft anerkannt",
    "bodyHtml": "<h2>Was ist Akupunktur?</h2><p>Akupunktur ist die bekannteste Methode der Traditionellen Chinesischen Medizin und wird seit über 2000 Jahren angewendet. Feine, sterile Einmalnadeln werden an definierten Punkten des Körpers gesetzt. Die moderne Forschung erklärt die Wirkung über die Reizung von Nerven, die Ausschüttung körpereigener Botenstoffe (unter anderem Endorphine) und Einflüsse auf die Schmerzverarbeitung im Nervensystem. Heute ist Akupunktur eine der weltweit am besten erforschten komplementärmedizinischen Methoden, die WHO listet über 100 Indikationen, bei denen die Wirksamkeit klinisch dokumentiert ist.</p><h2>Wissenschaftliche Evidenz</h2><p>Akupunktur zählt zu den am besten untersuchten ergänzenden Therapien. Meta-Analysen zeigen signifikante Wirksamkeit bei chronischen Schmerzen (Rücken, Nacken, Knie), Migräne, Spannungskopfschmerzen, Fertilitätsbehandlung, Schwangerschaftsübelkeit und postoperativer Übelkeit. In der Schweiz ist Akupunktur seit 2012 wieder als ärztliche Leistung über die Grundversicherung erstattbar (bei entsprechender FMH-Fähigkeit), und über die Zusatzversicherung (EMR/ASCA-anerkannt) breit gedeckt.</p><h2>Behandlungsablauf bei TCM.ch</h2><ul><li><strong>Erstgespräch und Diagnose:</strong> ausführliche Anamnese, Puls- und Zungendiagnose</li><li><strong>Individuelle Behandlungsplanung:</strong> abgestimmt auf dein Beschwerdebild</li><li><strong>Nadelsetzen:</strong> 8–20 sterile Einmalnadeln, schmerzarm. Meist nur leichter Druck spürbar</li><li><strong>Ruhezeit:</strong> 20–30 Minuten Liegen mit Nadeln, viele Patient:innen entspannen tief</li><li><strong>Nachbesprechung:</strong> Beobachtungen, ggf. Kräuterverschreibung oder Ernährungsempfehlungen</li></ul><h2>Kosten und Krankenkassenübernahme</h2><p>Eine Sitzung kostet bei TCM.ch zwischen CHF 130 und CHF 160 (45–60 Minuten). Mit anerkannter Zusatzversicherung (EMR/ASCA) übernimmt die Krankenkasse 80–100% der Kosten. Wir prüfen die Deckung für dich kostenlos vor der ersten Sitzung, viele Versicherungen erstatten 10–20 Sitzungen pro Jahr.</p><h2>Wie viele Sitzungen brauche ich?</h2><p>Bei akuten Beschwerden zeigen sich meist nach 4–6 Sitzungen deutliche Verbesserungen. Chronische Themen brauchen 8–12 Sitzungen für nachhaltige Effekte. Wir empfehlen anfangs 1–2 Termine pro Woche, später monatliche Erhaltungstermine. Wenn nach 4 Sitzungen keinerlei Veränderung spürbar ist, besprechen wir gemeinsam, ob eine andere Methode geeigneter wäre.</p><h2>Wann ist Akupunktur nicht geeignet?</h2><p>Bei schweren Blutgerinnungsstörungen, akuten Infektionen, unbehandelten Tumoren im Behandlungsgebiet und während chemotherapeutischer Akutphasen wird Akupunktur nicht oder nur sehr zurückhaltend eingesetzt. In der Schwangerschaft werden bestimmte Punkte (Triggerpunkte) vermieden, moderne Akupunktur kann jedoch gezielt bei Schwangerschaftsbeschwerden helfen.</p>",
    "faqs": [
      {
        "q": "Übernimmt die Krankenkasse Akupunktur in der Schweiz?",
        "a": "Ja, die meisten Schweizer Zusatzversicherungen (EMR/ASCA-anerkannt) übernehmen 80–100% der Kosten für Akupunktur. Über die Grundversicherung nur bei ärztlicher Akupunktur durch Mediziner mit FMH-Fähigkeitsausweis. Wir prüfen die Deckung kostenlos vor der ersten Sitzung."
      },
      {
        "q": "Wie viel kostet eine Akupunkturbehandlung?",
        "a": "Eine Sitzung kostet bei TCM.ch zwischen CHF 130 und CHF 160 (45–60 Minuten). Mit anerkannter Zusatzversicherung beträgt der Eigenanteil meist nur CHF 0–30 pro Sitzung."
      },
      {
        "q": "Wie viele Akupunktur-Sitzungen brauche ich?",
        "a": "Bei akuten Beschwerden meist 4–6 Sitzungen, bei chronischen Themen 8–12 Sitzungen. Wir empfehlen am Anfang 1–2 Termine pro Woche, später zur Erhaltung 1× monatlich."
      },
      {
        "q": "Tut Akupunktur weh?",
        "a": "Die Nadeln sind so fein wie ein Haar, meist spürbar als leichter Druck oder ein kurzes Ziehen beim Einstich. Schmerzen sind nicht normal und sollten dem Therapeuten gemeldet werden."
      },
      {
        "q": "Ist Akupunktur in der Schwangerschaft sicher?",
        "a": "Ja, Akupunktur wird in der Schwangerschaft eingesetzt, bei Übelkeit, Rückenschmerzen und zur Geburtsvorbereitung. Bestimmte Punkte werden vermieden. Wichtig: Informiere die Therapeutin über die Schwangerschaft."
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "kopfschmerzen",
        "label": "Kopfschmerzen"
      }
    ],
    "therapies": [
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ]
  },
  {
    "slug": "schroepfen",
    "name": "Schröpfen",
    "title": "Schröpfen Schweiz – TCM-Therapie bei Verspannungen",
    "metaDesc": "Schröpfen löst tiefe Muskelverspannungen und Faszien, bewährt seit 3000 Jahren. 11 EMR-anerkannte TCM-Praxen: Frauenfeld · Kreuzlingen · Basel · Zürich.",
    "lead": "Löst tiefe Verspannungen und fördert die Durchblutung.",
    "duration": "20–40 Min",
    "sessions": "3–6",
    "insurance": "Oft als Zusatzleistung anerkannt",
    "bodyHtml": "<h2>Was ist Schröpfen?</h2><p>Schröpfen ist eine der ältesten manuellen Therapieformen der Welt und seit über 3000 Jahren in der chinesischen, aber auch arabischen und europäischen Heilkunst verankert. Beim Schröpfen werden Schröpfgläser aus Glas oder Silikon auf die Haut aufgesetzt, durch den entstehenden Unterdruck wird das Gewebe angehoben, die Durchblutung stark angeregt und Faszien gelöst. Es gibt trockenes Schröpfen (Sauggläser, am häufigsten), Schröpfmassage (bewegte Gläser mit Öl) und blutiges Schröpfen (selten, spezifische Indikationen).</p><h2>Wirkung und Anwendungsgebiete</h2><ul><li>Löst tief sitzende Muskelverhärtungen und Faszienverklebungen</li><li>Verbessert die lokale und tiefe Durchblutung deutlich</li><li>Entgiftend: fördert den Abtransport von Stoffwechselprodukten und Schlackenstoffen</li><li>Besonders effektiv bei Rücken-, Nacken- und Schulterverspannungen</li><li>Bei Erkältungen (klassische TCM-Indikation): löst Wind-Kälte aus den oberen Atemwegen</li><li>Unterstützt bei Migräne, Hexenschuss und chronischen Spannungskopfschmerzen</li></ul><h2>Was sind die runden Abdrücke?</h2><p>Die typischen runden Abdrücke nach dem Schröpfen sind kein Bluterguss, sondern Petechien, eine gewollte Gewebsreaktion. Sie zeigen den Grad der Stagnation (je dunkler, desto stärker) und sind nicht schmerzhaft. Die Verfärbung verschwindet nach 3–7 Tagen vollständig. In der TCM gilt die Farbintensität als diagnostisches Zeichen.</p><h2>Behandlungsablauf</h2><ul><li><strong>Anamnese:</strong> Wo sind die Beschwerden, wie lange bestehen sie?</li><li><strong>Hautvorbereitung:</strong> bei Schröpfmassage mit Öl</li><li><strong>Aufsetzen der Gläser:</strong> 4–10 Gläser, meist auf Rücken/Nacken/Schultern</li><li><strong>Einwirkzeit:</strong> 10–20 Minuten (statisches Schröpfen) oder 5–10 Minuten gleitend</li><li><strong>Nachruhe:</strong> 5–10 Minuten zur Anpassung des Kreislaufs</li></ul><h2>Kosten und Krankenkasse</h2><p>Eine Sitzung kostet zwischen CHF 80 und CHF 130 (20–40 Minuten), oft als Teil einer kombinierten TCM-Behandlung. Schröpfen ist im Rahmen einer TCM-Sitzung über die meisten Zusatzversicherungen (EMR/ASCA) anerkannt. Als alleinige Behandlung ist die Deckung uneinheitlich, wir klären die Kostenübernahme vor Behandlungsbeginn.</p><h2>Wann sollte ich nicht schröpfen lassen?</h2><p>Kontraindikationen sind: Blutgerinnungsstörungen, Einnahme von Blutverdünnern (Marcoumar, Eliquis, ASS in hoher Dosis), schwere Hautkrankheiten im Behandlungsgebiet, akute Fieberinfekte, Schwangerschaft (relative Kontraindikation, mit Vorsicht möglich), direkt über Krampfadern, großen Blutgefässen oder offenen Wunden. Bei sehr empfindlicher Haut starten wir mit reduziertem Unterdruck.</p>",
    "faqs": [
      {
        "q": "Was sind die roten Abdrücke nach dem Schröpfen?",
        "a": "Die runden Abdrücke (Petechien) entstehen durch den Unterdruck und sind kein Bluterguss. Sie sind nicht schmerzhaft und verschwinden nach 3–7 Tagen. Die Intensität der Verfärbung zeigt den Grad der Gewebsstauung an."
      },
      {
        "q": "Wird Schröpfen von der Krankenkasse übernommen?",
        "a": "Schröpfen ist als Teil einer TCM-Behandlung über die Zusatzversicherung (EMR/ASCA) anerkannt. Allein als Behandlung meist nur teilweise. Wir klären die Deckung vor Behandlungsbeginn."
      },
      {
        "q": "Wie viel kostet eine Schröpfbehandlung?",
        "a": "Eine Sitzung kostet zwischen CHF 80 und CHF 130 (20–40 Minuten), oft als Teil einer kombinierten TCM-Behandlung."
      },
      {
        "q": "Wann sollte ich nicht schröpfen lassen?",
        "a": "Nicht geeignet bei Blutgerinnungsstörungen, Marcoumar-Einnahme, schweren Hautkrankheiten, akuten Fieberinfekten oder direkt über Krampfadern und großen Blutgefäßen."
      },
      {
        "q": "Wie oft Schröpfen?",
        "a": "Bei akuten Verspannungen 1× pro Woche für 3–4 Wochen. Bei chronischen Beschwerden alle 2–3 Wochen, oft kombiniert mit Akupunktur."
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "schulterschmerzen",
        "label": "Schulterschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "elektroakupunktur",
        "label": "Elektroakupunktur"
      }
    ]
  },
  {
    "slug": "tuina",
    "name": "Tuina Massage",
    "title": "Tuina Massage Schweiz – medizinische TCM-Massage",
    "metaDesc": "Tuina ist die medizinische TCM-Massage für Verspannungen und funktionelle Beschwerden des Bewegungsapparats. Krankenkasse anerkannt. Praxen: Zürich · Winterthur · St. Gallen · Basel.",
    "lead": "Medizinische TCM-Massage für Verspannungen und funktionelle Beschwerden des Bewegungsapparats.",
    "duration": "45–60 Min",
    "sessions": "6–10",
    "insurance": "Je nach Versicherung",
    "bodyHtml": "<h2>Was ist Tuina?</h2><p>Tuina (auch: Tui Na, übersetzt \"schieben und greifen\") ist die traditionelle chinesische Heilmassage und eine der ältesten manuellen Therapieformen weltweit. Im Gegensatz zu einer westlichen Entspannungsmassage ist Tuina eine medizinische Behandlung, sie wirkt gezielt auf Akupunkturpunkte, Faszien und muskuloskelettale Strukturen, im TCM-Modell entlang der Meridianlinien. In China ist Tuina als eigenständige Fachdisziplin an medizinischen Universitäten etabliert; in der Schweiz wird sie als Teil der TCM von ausgebildeten Therapeut:innen praktiziert.</p><h2>Techniken und Wirkung</h2><ul><li><strong>An Mo:</strong> Druckmassage entlang der Meridiane</li><li><strong>Tui Fa:</strong> schiebende Bewegungen zur Lösung von Stagnationen</li><li><strong>Na Fa:</strong> Greif- und Knetechniken auf Muskelbäuchen</li><li><strong>Gun Fa:</strong> Rolltechnik mit der Hand für grossflächige Bereiche</li><li><strong>Dian Fa:</strong> punktueller Druck auf Akupunkturpunkten</li><li><strong>Gelenkmobilisierung:</strong> sanfte Traktion und Drehbewegungen der Wirbelsäule</li></ul><h2>Wirkungsmechanismen</h2><p>Tuina arbeitet auf zwei Ebenen: <strong>mechanisch</strong> (Faszien lösen, Durchblutung verbessern), <strong>neuroreflektorisch</strong> (über Akupunkturpunkte auf innere Organe und das Nervensystem wirken). Diese Mehrschichtigkeit macht Tuina besonders wirksam bei Beschwerden, die sich auf reine westliche Massage allein nicht zurückbilden.</p><h2>Hauptindikationen</h2><ul><li>Akute und chronische Rücken-, Nacken- und Schulterbeschwerden</li><li>Verspannungen aus Stress oder einseitiger Belastung</li><li>Funktionelle Verdauungsbeschwerden (Reizmagen, Reizdarm)</li><li>Cranio-mandibuläre Dysfunktion (CMD/Kieferprobleme)</li><li>Spannungskopfschmerzen und Migräne</li><li>Schlafstörungen mit körperlichem Ursprung</li><li>Bei Kindern: Bauchschmerzen, Unruhe, Erkältungen (Kinder-Tuina)</li></ul><h2>Unterschied zu westlicher Massage</h2><p>Während westliche Massagen primär auf Muskelentspannung abzielen, behandelt Tuina gezielt funktionelle Beschwerden des Bewegungsapparats. Die Behandlung kann auch innere Organe und das vegetative Nervensystem ansprechen. Dadurch wirkt Tuina oft tiefer und länger anhaltend, verlangt aber auch eine fundierte TCM-Ausbildung der Therapeut:innen.</p><h2>Kosten und Krankenkasse</h2><p>Eine Tuina-Sitzung kostet bei TCM.ch CHF 130–160 (45–60 Minuten). Mit anerkannter Zusatzversicherung (EMR/ASCA) übernimmt die Krankenkasse 80–100% der Kosten. Wir empfehlen 6–10 Sitzungen, anfangs 1× wöchentlich. Die Wirkung baut sich auf, meist sind bereits nach 3–4 Sitzungen deutliche Verbesserungen spürbar.</p>",
    "faqs": [
      {
        "q": "Was ist der Unterschied zwischen Tuina und klassischer Massage?",
        "a": "Tuina ist eine medizinische TCM-Behandlung, sie arbeitet im TCM-Modell entlang der Meridiane und an definierten Akupunkturpunkten und behandelt gezielt funktionelle Beschwerden des Bewegungsapparats. Klassische Massage zielt primär auf Muskelentspannung."
      },
      {
        "q": "Übernimmt die Krankenkasse Tuina?",
        "a": "Ja, Tuina ist bei den meisten Schweizer Zusatzversicherungen (EMR/ASCA-anerkannt) als TCM-Therapie abgedeckt, Übernahme meist 80–100%."
      },
      {
        "q": "Wie viel kostet eine Tuina-Sitzung?",
        "a": "Bei TCM.ch CHF 130–160 für 45–60 Minuten. Mit anerkannter Zusatzversicherung Eigenanteil meist CHF 0–30."
      },
      {
        "q": "Tut Tuina weh?",
        "a": "Tuina arbeitet teils mit starkem Druck, leichte Druckdolenz an verspannten Stellen ist normal und gewollt. Starke Schmerzen sind nicht normal, sag es dem Therapeuten."
      },
      {
        "q": "Wie viele Tuina-Behandlungen brauche ich?",
        "a": "Akute Verspannungen: 4–6 Sitzungen. Chronische Themen: 8–12 Sitzungen, dann monatliche Erhaltungstermine."
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "schulterschmerzen",
        "label": "Schulterschmerzen"
      },
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      }
    ]
  },
  {
    "slug": "kraeutertherapie",
    "name": "Kräutertherapie",
    "title": "Chinesische Kräutertherapie Schweiz – individuell",
    "metaDesc": "Individuelle TCM-Kräuterrezepturen: zertifizierte Qualität, Schadstoffanalyse, Wechselwirkungs-Check. Praxen: Zürich · Winterthur · St. Gallen · Basel.",
    "lead": "Individuell zusammengestellte Kräuterformeln, begleitend zur Behandlung.",
    "duration": "Tägl. Einnahme",
    "sessions": "4–12 Wochen",
    "insurance": "Teilweise anerkannt",
    "bodyHtml": "<h2>Was ist chinesische Kräutermedizin?</h2><p>Die Chinesische Kräutermedizin (Phytotherapie) ist nach der Akupunktur die wichtigste Säule der TCM. Sie arbeitet mit individuell zusammengestellten Rezepturen aus meist 8–15 pflanzlichen, gelegentlich mineralischen Substanzen, abgestimmt auf deine spezifische Konstitution, dein TCM-Krankheitsbild und deine aktuellen Beschwerden. Anders als bei vorgefertigten Präparaten ist jede Rezeptur ein individuelles Gesamtkonzept.</p><h2>Formen der Einnahme</h2><ul><li><strong>Granulat:</strong> hochkonzentrierte Pulver, in heissem Wasser aufgelöst, 2× täglich, am häufigsten verwendet und alltagstauglich</li><li><strong>Tee (Dekokt):</strong> klassische Form, Kräuter werden abgekocht: intensivste Wirkung, aber zeitaufwändig und bitter</li><li><strong>Tabletten/Kapseln:</strong> standardisierte Rezepturen, geschmacksneutral, praktisch für unterwegs</li><li><strong>Tinkturen:</strong> alkoholische Auszüge, schnelle Aufnahme</li></ul><h2>Qualität und Sicherheit bei TCM.ch</h2><p>Alle Kräuter, die wir verwenden, stammen aus GMP-zertifizierten europäischen oder chinesischen Lieferanten mit Schadstoffanalyse (Schwermetalle, Pestizide, mikrobielle Reinheit). Wir verzichten konsequent auf gefährdete Tier- und Pflanzenarten (CITES-konform). Unsere Therapeut:innen prüfen jede Rezeptur auf Wechselwirkungen mit deiner Schulmedizin, wichtig insbesondere bei Blutverdünnern, Antidepressiva, Immunsuppressiva und in der Schwangerschaft.</p><h2>Typische Einsatzgebiete</h2><p>Kräuterformeln eignen sich besonders für chronische und konstitutionelle Beschwerden, die längerfristige Unterstützung brauchen:</p><ul><li>Schlafstörungen und nervöse Erschöpfung</li><li>Verdauungsbeschwerden (Reizdarm, Reflux, Blähungen)</li><li>Hormonelle Dysbalancen (PMS, Wechseljahre, Zyklusunregelmässigkeiten)</li><li>Kinderwunsch und Fertilitätsunterstützung</li><li>Chronische Hauterkrankungen (Neurodermitis, Akne, Psoriasis)</li><li>Atemwegserkrankungen (chronische Bronchitis, Heuschnupfen)</li><li>Erschöpfungszustände und Long-COVID</li></ul><h2>Ablauf einer Kräutertherapie</h2><ul><li><strong>TCM-Anamnese:</strong> 60–90 Minuten, mit Puls- und Zungendiagnose</li><li><strong>Rezepturerstellung:</strong> individuell zusammengestellt, meist 8–15 Substanzen</li><li><strong>Einnahmeplan:</strong> wir erklären Zubereitung, Dosierung und mögliche Reaktionen</li><li><strong>Verlaufskontrolle:</strong> nach 2–4 Wochen, Rezeptur wird angepasst</li><li><strong>Dauer:</strong> bei akuten Themen 2–4 Wochen, bei chronischen 8–12 Wochen oder länger</li></ul><h2>Kosten und Krankenkasse</h2><p>Die TCM-Beratung mit Rezeptierung (60–90 Minuten) ist über die meisten Zusatzversicherungen (EMR/ASCA) anerkannt, Kostenübernahme 80–100%. Die Kräuter selbst sind meist Selbstzahlerleistung: CHF 80–200 pro Monat je nach Rezeptur und Form. Bei Kombination mit Akupunktur trägt die Krankenkasse oft die Beratungszeit, du nur die Kräuter.</p>",
    "faqs": [
      {
        "q": "Sind chinesische Kräuter sicher?",
        "a": "Ja, bei TCM.ch verwenden wir ausschliesslich zertifizierte Kräuter aus geprüften Quellen mit Schadstoffanalyse. Unsere Therapeuten prüfen Wechselwirkungen mit deiner Schulmedizin individuell."
      },
      {
        "q": "Übernimmt die Krankenkasse Kräutertherapie?",
        "a": "Die Beratung und Rezeptierung ist über Zusatzversicherungen oft anerkannt (EMR/ASCA). Die Kräuter selbst sind meist Selbstzahlerleistung, monatlich CHF 80–200 je nach Rezeptur."
      },
      {
        "q": "Wie nehme ich chinesische Kräuter ein?",
        "a": "Drei Formen: Granulat (in heissem Wasser auflösen, 2× täglich), Tee/Dekokt (Abkochen, intensivste Wirkung), Tabletten/Kapseln (alltagstauglich). Wir wählen die passende Form mit dir gemeinsam."
      },
      {
        "q": "Schmecken die Kräuter unangenehm?",
        "a": "Klassische Dekokte schmecken bitter, das ist Teil der Wirkung. Granulate sind milder, Tabletten geschmacksneutral. Sag uns deine Präferenz, wir passen die Form an."
      },
      {
        "q": "Wie lange dauert eine Kräuterkur?",
        "a": "Akute Themen: 2–4 Wochen. Chronische Beschwerden: 8–12 Wochen mit Rezepturanpassungen alle 2–4 Wochen."
      }
    ],
    "beschwerden": [
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "menstruationsbeschwerden",
        "label": "Menstruationsbeschwerden"
      },
      {
        "slug": "kinderwunsch",
        "label": "Kinderwunsch"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "moxibustion",
        "label": "Moxibustion"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "moxibustion",
    "name": "Moxibustion",
    "title": "Moxibustion Schweiz – TCM-Wärmetherapie",
    "metaDesc": "Moxibustion bei Kältegefühl, Erschöpfung, Kinderwunsch und Zyklusproblemen. 11 EMR-anerkannte Praxen. Frauenfeld · Kreuzlingen · Winterthur · Zürich.",
    "lead": "Wärmetherapie mit Beifuss (Moxa), wohltuend bei Kältegefühl und Erschöpfung.",
    "duration": "20–40 Min",
    "sessions": "6–10",
    "insurance": "Je nach Versicherung",
    "bodyHtml": "<h2>Was ist Moxibustion?</h2><p>Bei der Moxibustion wird getrockneter und gepresster Beifuss (Artemisia vulgaris, chinesisch: Moxa) über oder auf Akupunkturpunkten verbrannt. Die Wärme dringt tief ins Gewebe und wirkt tief wärmend und durchblutungsfördernd.</p><h2>Formen der Moxibustion</h2><ul><li><strong>Zigarre:</strong> Moxa-Zigarre wird über den Punkt gehalten – angenehme Wärme ohne Kontakt</li><li><strong>Auf der Nadel:</strong> Moxa wird auf die Akupunkturnadel gesteckt und angezündet</li><li><strong>Indirekt:</strong> Über Ingwer- oder Knoblauchscheiben für spezifische Wirkung</li></ul><h2>Anwendungsgebiete</h2><p>Moxibustion wird im TCM-Modell besonders eingesetzt bei Kältegefühl, Erschöpfung, Kinderwunsch, Verdauungsschwäche und Zyklusbeschwerden. Viele Patienten empfinden die Behandlung als sehr wohltuend.</p>",
    "faqs": [
      {
        "q": "Was riecht so beim Moxen?",
        "a": "Verbrennender Beifuss (Artemisia) hat einen charakteristischen, kräuterartigen Geruch. Wir lüften gut und verwenden bei Bedarf rauchfreies Moxa. Der Geruch hält sich kurz in Kleidung."
      },
      {
        "q": "Tut Moxen weh oder verbrennt man sich?",
        "a": "Nein, die Wärme wird kontrolliert appliziert und sollte nur angenehm warm sein. Sobald es zu heiss wird, wird der Punkt gewechselt. Verbrennungen kommen bei korrekter Anwendung nicht vor."
      },
      {
        "q": "Übernimmt die Krankenkasse Moxibustion?",
        "a": "Als Teil einer TCM-Behandlung über die Zusatzversicherung (EMR/ASCA) meist anerkannt. Wir klären die Deckung vor Behandlungsbeginn."
      },
      {
        "q": "Moxibustion in der Schwangerschaft, ist das sicher?",
        "a": "Moxa auf Punkt BL67 wird klassisch zur Drehung bei Beckenendlage ab der 32. SSW eingesetzt und ist gut untersucht. Andere Anwendungen nur durch erfahrene TCM-Therapeut:innen, niemals selbst."
      },
      {
        "q": "Wann ist Moxibustion sinnvoll?",
        "a": "Besonders bei Kältegefühl, Erschöpfung, Kinderwunsch, Zyklusbeschwerden und schwacher Verdauung. Bei Hitze-Mustern wird Moxa nicht eingesetzt."
      }
    ],
    "beschwerden": [
      {
        "slug": "kinderwunsch",
        "label": "Kinderwunsch"
      },
      {
        "slug": "menstruationsbeschwerden",
        "label": "Menstruationsbeschwerden"
      },
      {
        "slug": "verdauungsprobleme",
        "label": "Verdauungsprobleme"
      },
      {
        "slug": "arthrose",
        "label": "Arthrose"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "kraeutertherapie",
        "label": "Kräutertherapie"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "elektroakupunktur",
    "name": "Elektroakupunktur",
    "title": "Elektroakupunktur Schweiz – chronische Schmerzen",
    "metaDesc": "Elektroakupunktur bei chronischen Schmerzen, Nervenreizung und Bandscheibenproblemen, stärkste Wirkstufe der Akupunktur. Krankenkasse 80–100%. 7 Praxen.",
    "lead": "Verstärkte Akupunktur durch elektrische Impulse, besonders bei Schmerzen.",
    "duration": "40–50 Min",
    "sessions": "6–10",
    "insurance": "Zusatzversicherung oft anerkannt",
    "bodyHtml": "<h2>Was ist Elektroakupunktur?</h2><p>Die Elektroakupunktur kombiniert klassische Akupunkturnadeln mit schwachen elektrischen Impulsen. Ein kleines Gerät verbindet jeweils zwei Nadeln und lässt einen sanften Wechselstrom fliessen. Dies verstärkt die Wirkung der Nadeln deutlich.</p><h2>Vorteile gegenüber klassischer Akupunktur</h2><ul><li>Stärkere analgetische (schmerzlindernde) Wirkung</li><li>Bessere Wirkung bei chronischen Schmerzzuständen</li><li>Effizienter bei Nervenschmerzen und Muskelverspannungen</li><li>Gut erforscht und evidenzbasiert</li></ul><h2>Für wen ist Elektroakupunktur geeignet?</h2><p>Elektroakupunktur eignet sich besonders für Patienten mit chronischen Schmerzen, die auf klassische Akupunktur nicht ausreichend angesprochen haben. Auch bei postoperativen Schmerzen und Nervenschmerzen wird sie erfolgreich eingesetzt.</p>",
    "faqs": [
      {
        "q": "Spürt man den Strom bei der Elektroakupunktur?",
        "a": "Ja, meist als leichtes Kribbeln oder rhythmisches Pulsieren. Die Stärke wird individuell eingestellt und sollte angenehm sein, nie schmerzhaft."
      },
      {
        "q": "Bei welchen Beschwerden hilft Elektroakupunktur besonders?",
        "a": "Stärkste Evidenz bei chronischen Schmerzzuständen, Nervenschmerzen (Neuralgien), Bandscheibenproblemen, Arthrose und postoperativen Schmerzen."
      },
      {
        "q": "Übernimmt die Krankenkasse Elektroakupunktur?",
        "a": "Ja, als Akupunkturvariante über die meisten Zusatzversicherungen (EMR/ASCA-anerkannt) abgedeckt, meist 80–100%."
      },
      {
        "q": "Wer darf keine Elektroakupunktur erhalten?",
        "a": "Personen mit Herzschrittmacher, Defibrillator, in der Schwangerschaft (Vorsicht), bei Epilepsie und an bestimmten Körperstellen (Hals, Brust nicht über das Herz hinweg)."
      },
      {
        "q": "Wie unterscheidet sich Elektroakupunktur von TENS?",
        "a": "TENS-Geräte arbeiten oberflächlich über Hautelektroden. Elektroakupunktur leitet den Reiz über Nadeln direkt an Akupunkturpunkte, präziser und tiefer wirkend."
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "schulterschmerzen",
        "label": "Schulterschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "gesichtsakupunktur",
    "name": "Gesichtsakupunktur",
    "title": "Gesichtsakupunktur Schweiz – natürliches Anti-Aging",
    "metaDesc": "Cosmetic Acupuncture: natürliches Anti-Aging ohne Botox, regt Kollagen an. 6 spezialisierte Praxen in Zürich, Basel, St. Gallen und Winterthur.",
    "lead": "Natürliche Verjüngung und Hauterneuerung durch gezielte Nadelstimulation im Gesicht.",
    "duration": "40–50 Min",
    "sessions": "6–10",
    "insurance": "Je nach Versicherung",
    "bodyHtml": "<h2>Was ist Gesichtsakupunktur?</h2><p>Die Gesichtsakupunktur (auch: kosmetische Akupunktur) ist eine natürliche Methode zur Hautverjüngung. Feine Nadeln werden an gezielten Punkten im Gesicht und am Körper gesetzt, um die Kollagenproduktion anzuregen, die Durchblutung zu verbessern.</p><h2>Wirkung</h2><ul><li>Straffung und Verbesserung des Hautbildes</li><li>Reduktion feiner Linien und Falten</li><li>Verbesserter Teint und mehr Hautleuchtkraft</li><li>Entspannung der mimischen Muskulatur</li><li>Wirkung auf Körper und Geist</li></ul><h2>Für wen geeignet?</h2><p>Gesichtsakupunktur eignet sich für Menschen, die eine natürliche Alternative zu Botox oder Fillern suchen. Auch bei Akne, Rosacea und Hautunreinheiten zeigt die Behandlung gute Ergebnisse.</p>",
    "faqs": [
      {
        "q": "Ist Gesichtsakupunktur eine Alternative zu Botox?",
        "a": "Gesichtsakupunktur ist eine natürliche Methode, die Kollagenproduktion und Durchblutung anregt. Sie ersetzt Botox nicht 1:1, bietet aber eine sanfte Option ohne Substanzen, bevorzugt von Patient:innen, die natürliche Ansätze suchen."
      },
      {
        "q": "Sieht man nach der Behandlung Spuren?",
        "a": "Möglich sind leichte Rötungen oder kleine Punkte an Einstichstellen, meist nach 30–60 Minuten verschwunden. Selten kleine Blutergüsse, die nach 2–4 Tagen abklingen."
      },
      {
        "q": "Wie viele Sitzungen brauche ich für sichtbare Resultate?",
        "a": "Erste Effekte (Hauttextur, Frische) nach 2–3 Sitzungen. Optimaler Effekt nach einer Kur von 8–10 Sitzungen (1× wöchentlich), danach 1× monatlich zur Erhaltung."
      },
      {
        "q": "Übernimmt die Krankenkasse Gesichtsakupunktur?",
        "a": "Bei rein kosmetischer Indikation: nein. Bei medizinischer Indikation (Akne, Rosacea, Trigeminusneuralgie) je nach Versicherung möglich. Wir klären das vor Behandlungsbeginn."
      },
      {
        "q": "Was kostet Gesichtsakupunktur in der Schweiz?",
        "a": "Bei TCM.ch CHF 140–180 pro Sitzung (40–50 Minuten). Kurpakete (8–10 Sitzungen) oft günstiger."
      }
    ],
    "beschwerden": [
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "akupressur",
        "label": "Akupressur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      }
    ]
  },
  {
    "slug": "akupressur",
    "name": "Akupressur",
    "title": "Akupressur Schweiz – TCM ohne Nadeln",
    "metaDesc": "Akupressur, TCM-Behandlung ohne Nadeln. Ideal bei Nadelangst, für Kinder, Schwangere und Senioren. 11 EMR-anerkannte Praxen in der Deutschschweiz.",
    "lead": "Sanfte Stimulation der Akupunkturpunkte ohne Nadeln, ideal für empfindliche Patienten.",
    "duration": "30–45 Min",
    "sessions": "4–8",
    "insurance": "Ohne Versicherung",
    "bodyHtml": "<h2>Was ist Akupressur?</h2><p>Akupressur arbeitet nach denselben Prinzipien wie die Akupunktur – jedoch ohne Nadeln. Stattdessen werden Akupunkturpunkte durch gezielten Fingerdruck stimuliert. Die Methode ist sanft, nebenwirkungsarm und für alle Altersgruppen geeignet.</p><h2>Vorteile der Akupressur</h2><ul><li>Keine Nadeln – ideal für nadelscheue Patienten</li><li>Sofortige Entspannung spürbar</li><li>Geeignet für Kinder, Schwangere und ältere Patienten</li><li>Einfache Selbstanwendung für zu Hause lernbar</li></ul><h2>Anwendungsgebiete</h2><p>Akupressur eignet sich besonders bei Spannungskopfschmerzen, Übelkeit, Schlafproblemen, Stress und leichten Schmerzzuständen. Als ergänzende Methode verstärkt sie die Wirkung anderer TCM-Behandlungen.</p>",
    "faqs": [
      {
        "q": "Was ist der Unterschied zu Akupunktur?",
        "a": "Akupressur arbeitet mit Fingerdruck statt Nadeln, sanfter, ohne Hautverletzung, ideal für nadelscheue Personen, Kinder, Schwangere und ältere Patient:innen."
      },
      {
        "q": "Kann ich Akupressur zuhause anwenden?",
        "a": "Ja, wir zeigen dir gerne Punkte zur Selbstanwendung bei Kopfschmerzen, Übelkeit, Stress und Schlafproblemen. Die Behandlung beim Therapeuten ist tiefgreifender, Selbstanwendung gut zur Ergänzung."
      },
      {
        "q": "Wirkt Akupressur wirklich oder ist das Placebo?",
        "a": "Akupressur ist klinisch untersucht, besonders bei Übelkeit (Punkt PC6), Spannungskopfschmerzen und Schlafproblemen liegt Evidenz vor. Wirkung ist meist sanfter als bei Akupunktur, dafür ohne Nadeln."
      },
      {
        "q": "Übernimmt die Krankenkasse Akupressur?",
        "a": "Als Teil einer TCM-Behandlung über die Zusatzversicherung (EMR/ASCA) oft anerkannt. Reine Akupressur-Sitzungen sind seltener gedeckt, wir klären die Deckung im Voraus."
      },
      {
        "q": "Akupressur in der Schwangerschaft, erlaubt?",
        "a": "Ja, sehr beliebt bei Übelkeit, Rückenschmerzen und zur Geburtsvorbereitung. Bestimmte Punkte werden vermieden, am besten von ausgebildeten TCM-Therapeut:innen."
      }
    ],
    "beschwerden": [
      {
        "slug": "kopfschmerzen",
        "label": "Kopfschmerzen"
      },
      {
        "slug": "migraene",
        "label": "Migräne"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      }
    ],
    "therapies": [
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "shiatsu",
        "label": "Shiatsu"
      }
    ]
  },
  {
    "slug": "shiatsu",
    "name": "Shiatsu",
    "title": "Shiatsu Schweiz – japanische Körpertherapie",
    "metaDesc": "Shiatsu: japanische Körperarbeit bei Stress, Burnout, Schlafproblemen und Trauma. KSI/SGS-zertifiziert, Krankenkasse anerkannt. 6 spezialisierte Praxen.",
    "lead": "Japanische Druckmassage für tiefe Entspannung und mehr Beweglichkeit.",
    "duration": "50–60 Min",
    "sessions": "4–8",
    "insurance": "Je nach Versicherung",
    "bodyHtml": "<h2>Was ist Shiatsu?</h2><p>Shiatsu ist eine japanische Form der manuellen Therapie, die aus der chinesischen Medizin entstammt. Der Begriff bedeutet wörtlich \"Fingerdruck\". Durch rhythmischen Druck auf Meridiane und Akupunkturpunkte werden Muskulatur und Bindegewebe gezielt entspannt.</p><h2>Wirkung und Besonderheiten</h2><ul><li>Tiefe Entspannung des Nervensystems</li><li>Lösung muskulärer Verspannungen</li><li>Mehr Beweglichkeit und tiefe Entspannung</li><li>Behandlung erfolgt vollständig bekleidet auf einer Matte</li></ul><h2>Wann ist Shiatsu sinnvoll?</h2><p>Shiatsu eignet sich besonders bei chronischem Stress, Burnout, Schlafproblemen, Verspannungen und dem allgemeinen Bedürfnis nach tiefer Entspannung und Zentrierung.</p>",
    "faqs": [
      {
        "q": "Was zieht man bei Shiatsu an?",
        "a": "Du bleibst während der ganzen Behandlung bekleidet, bequeme, lockere Kleidung (Baumwolle, kein Jeans). Wir behandeln meist auf einer Matte am Boden oder auf einer Liege."
      },
      {
        "q": "Wie unterscheidet sich Shiatsu von Tuina?",
        "a": "Beide arbeiten im TCM-Modell entlang der Meridiane, kommen aber aus unterschiedlichen Traditionen, Shiatsu aus Japan (oft am Boden, rhythmischer Druck), Tuina aus China (oft auf der Liege, mit zusätzlichen Mobilisationen)."
      },
      {
        "q": "Übernimmt die Krankenkasse Shiatsu?",
        "a": "Ja, Shiatsu ist bei den meisten Schweizer Zusatzversicherungen (EMR/ASCA, mit anerkanntem KSI/SGS-Diplom) abgedeckt. Wir klären die Deckung vor Behandlungsbeginn."
      },
      {
        "q": "Wie viel kostet eine Shiatsu-Behandlung?",
        "a": "Bei TCM.ch CHF 130–160 für 60 Minuten. Mit anerkannter Zusatzversicherung Eigenanteil meist CHF 0–30."
      },
      {
        "q": "Wann hilft Shiatsu besonders?",
        "a": "Bei chronischem Stress, Burnout, Schlafproblemen, Angststörungen, posttraumatischen Belastungen und unspezifischen körperlichen Spannungszuständen."
      }
    ],
    "beschwerden": [
      {
        "slug": "stress-burnout",
        "label": "Stress & Burnout"
      },
      {
        "slug": "schlafstoerungen",
        "label": "Schlafstörungen"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      }
    ],
    "therapies": [
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "akupressur",
        "label": "Akupressur"
      },
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "gua-sha",
    "name": "Gua Sha",
    "title": "Gua Sha Schweiz – TCM-Schabetechnik",
    "metaDesc": "Gua Sha löst Muskelverspannungen, fördert Lymphfluss und hilft bei beginnenden Erkältungen. 8 TCM-Praxen: Zürich · Basel · St. Gallen · Frauenfeld.",
    "lead": "Traditionelle Schabetechnik zur Lösung tiefsitzender Verspannungen und Förderung der Durchblutung.",
    "duration": "30–40 Min",
    "sessions": "3–6",
    "insurance": "Ohne Versicherung",
    "bodyHtml": "<h2>Was ist Gua Sha?</h2><p>Gua Sha ist eine traditionelle chinesische Technik, bei der mit einem glatten Instrument (aus Jade, Stein oder Horn) Schaber-Bewegungen auf der mit Öl einmassieren Haut ausgeführt werden. Dies löst oberflächliche Verspannungen und fördert die Mikrozirkulation.</p><h2>Wirkung</h2><ul><li>Löst chronische Muskelverspannungen und Faszienverklebungen</li><li>Verbessert die Durchblutung lokal und systemisch</li><li>Unterstützt bei Erkältungen und Immunschwäche</li><li>Wirksam bei Nacken-, Schulter- und Rückenproblemen</li></ul><h2>Die typischen roten Streifen</h2><p>Nach Gua Sha erscheinen rötliche Streifen (Sha) auf der Haut – kein Bluterguss, sondern ein Zeichen von Gewebereaktion. Diese sind schmerzlos und verschwinden nach 3–5 Tagen vollständig.</p>",
    "faqs": [
      {
        "q": "Sind die roten Striemen nach Gua Sha gefährlich?",
        "a": "Nein, die \"Sha\"-Reaktion (rote, fleckige Hautrötung) ist gewollt und Teil der Wirkung. Sie verschwindet nach 2–5 Tagen, ist nicht schmerzhaft und kein Bluterguss."
      },
      {
        "q": "Tut Gua Sha weh?",
        "a": "Das Schaben kann anfangs intensiv sein, wird aber nach kurzer Zeit angenehm. Die Intensität wird mit dir abgestimmt, sag es, wenn es zu stark wird."
      },
      {
        "q": "Übernimmt die Krankenkasse Gua Sha?",
        "a": "Als Teil einer TCM-Sitzung über die Zusatzversicherung (EMR/ASCA) anerkannt. Wir klären die Deckung im Voraus."
      },
      {
        "q": "Wann ist Gua Sha besonders wirksam?",
        "a": "Bei beginnenden Erkältungen (klassische Indikation), Muskelverspannungen im Nacken/Schulter, festsitzendem Husten und chronischen Verspannungen, die auf Massage allein nicht ansprechen."
      },
      {
        "q": "Wer sollte kein Gua Sha bekommen?",
        "a": "Personen mit Blutgerinnungsstörungen, Marcoumar-Einnahme, akuten Hautkrankheiten, Sonnenbrand oder direkt über offenen Wunden, Muttermalen oder Krampfadern."
      }
    ],
    "beschwerden": [
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "schulterschmerzen",
        "label": "Schulterschmerzen"
      },
      {
        "slug": "heuschnupfen",
        "label": "Heuschnupfen"
      }
    ],
    "therapies": [
      {
        "slug": "schroepfen",
        "label": "Schröpfen"
      },
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      }
    ]
  },
  {
    "slug": "physiotherapie",
    "name": "Physiotherapie",
    "title": "Physiotherapie Schweiz – Verordnung & TCM kombiniert",
    "metaDesc": "Physiotherapie über die Grundversicherung (90% Übernahme), ergänzt durch TCM wo sinnvoll. 7 Standorte in der Deutschschweiz. Termin oft in 48h.",
    "lead": "Bewegungstherapie und Rehabilitation, ergänzend zur TCM oder als eigenständiger Behandlungsweg.",
    "duration": "40–60 Min",
    "sessions": "6–12",
    "insurance": "Grundversicherung",
    "bodyHtml": "<h2>Physiotherapie bei TCM.ch</h2><p>Physiotherapie und TCM ergänzen sich ideal: Wo die TCM die Energetik und innere Balance behandelt, setzt die Physiotherapie bei Beweglichkeit, Kraft und funktioneller Rehabilitation an. Viele unserer Standorte bieten beide Ansätze unter einem Dach.</p><h2>Leistungen</h2><ul><li>Manuelle Therapie und Mobilisation</li><li>Gezielte Übungstherapie und Rehabilitation</li><li>Behandlung nach Operationen und Verletzungen</li><li>Haltungsschulung und ergonomische Beratung</li></ul><h2>Kostenübernahme</h2><p>Physiotherapie mit ärztlicher Verordnung wird von der Grundversicherung (KVG) übernommen. Frag uns nach den genauen Bedingungen an deinem Standort.</p>",
    "faqs": [
      {
        "q": "Brauche ich eine ärztliche Verordnung für Physiotherapie?",
        "a": "Ja, für die Übernahme durch die Grundversicherung benötigst du eine Verordnung deiner Ärztin/deines Arztes. Eine Verordnung deckt meist 9 Sitzungen ab, danach kann verlängert werden."
      },
      {
        "q": "Übernimmt die Krankenkasse Physiotherapie?",
        "a": "Ja, mit ärztlicher Verordnung deckt die Grundversicherung 90% der Kosten (nach Franchise und Selbstbehalt). Ohne Verordnung sind die Kosten selbst zu tragen."
      },
      {
        "q": "Was kostet eine Physiotherapie-Sitzung?",
        "a": "Tarif TARMED: CHF 48 für 25 Minuten Standard, CHF 78 für aufwändigere Sitzung. Mit Verordnung trägst du nur Franchise/Selbstbehalt der Grundversicherung."
      },
      {
        "q": "Wie viele Physiotherapie-Sitzungen brauche ich?",
        "a": "Standard-Verordnung: 9 Sitzungen. Bei chronischen Beschwerden, postoperativ oder bei neurologischen Diagnosen können mehrere Serien sinnvoll sein, der Arzt verlängert die Verordnung."
      },
      {
        "q": "Was unterscheidet Physiotherapie von TCM?",
        "a": "Physiotherapie ist evidenzbasierte westliche Medizin, strukturierte Übungen, manuelle Therapie, biomechanische Korrekturen. TCM ergänzt dies aus komplementärmedizinischer Sicht. Bei TCM.ch kombinieren wir beides wo sinnvoll."
      }
    ],
    "beschwerden": [
      {
        "slug": "rueckenschmerzen",
        "label": "Rückenschmerzen"
      },
      {
        "slug": "nackenschmerzen",
        "label": "Nackenschmerzen"
      },
      {
        "slug": "schulterschmerzen",
        "label": "Schulterschmerzen"
      },
      {
        "slug": "arthrose",
        "label": "Arthrose"
      }
    ],
    "therapies": [
      {
        "slug": "tuina",
        "label": "Tuina Massage"
      },
      {
        "slug": "akupunktur",
        "label": "Akupunktur"
      },
      {
        "slug": "akupressur",
        "label": "Akupressur"
      }
    ]
  }
];
export const therapieBySlug = (slug: string): Therapie | undefined => therapien.find((t) => t.slug === slug);
