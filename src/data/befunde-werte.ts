// Befunde & Werte verstehen: Daten-Layer für /gesundheitsbibliothek/befunde-werte/
//
// INTENT-ABGRENZUNG innerhalb der Gesundheitsbibliothek (nicht verwischen):
// - Körpersignale:      "Ich bemerke etwas an meinem Körper."
// - Beschwerden:        "Ich kenne oder vermute das Problem/die Erkrankung."
// - Befunde & Werte:    "Ein Test, Laborwert, Messwert oder Bericht sagt etwas. Was bedeutet das?"
// - Fragen:             "Ich habe eine konkrete Patienten-/Behandlungsfrage."
// - Wissen:             "Ich will ein Gesundheitsthema verstehen."
// - TCM verstehen:      "Ich will TCM-Begriffe/Modelle verstehen."
//
// Dieses Cluster ist KEIN Symptom-, Diagnose-, Therapie- oder TCM-Diagnostik-Cluster.
// Es ordnet vorliegende Befunde ein: konventionelle Interpretation zuerst, dann
// Sicherheit/Abklärung, dann Kontext; ein optionaler integrativer Abschnitt kommt,
// wenn überhaupt, zuletzt (integrativeContextHtml, in Phase 1 leer).
//
// Sicherheitsprinzip: Ein Labor- oder Bildbefund ist für sich allein keine Diagnose.

export type BefundWertKategorie = 'laborwert' | 'messwert' | 'bildgebung';

export const KATEGORIE_LABELS: Record<BefundWertKategorie, string> = {
  laborwert: 'Laborwerte',
  messwert: 'Messwerte',
  bildgebung: 'Bildgebung & Befundsprache',
};

export interface BefundWertLink {
  href: string;
  label: string;
}

export interface BefundWert {
  slug: string;
  title: string;
  category: BefundWertKategorie;
  // planned = freigegebenes Thema ohne Artikel; nur published erzeugt Prod-Routen.
  status: 'planned' | 'draft' | 'published';
  indexable: boolean;
  deck: string;
  // Kannibalisierungs-Leitplanken (Pflicht pro Eintrag):
  primaryPurpose: string;
  // Bestehende URL(s), die den überlappenden Intent bereits besitzen. Leeres Array
  // NUR wenn kein Owner existiert; Begründung in overlapNotes. Keine URLs erfinden.
  canonicalIntentOwner: string[];
  overlapNotes: string;
  suggestedReviewerType: string;
  // Nur verifizierte, existierende URLs:
  relatedConditions?: BefundWertLink[];
  relatedSignals?: BefundWertLink[];
  relatedDiagnostics?: BefundWertLink[];
  relatedVisuals?: BefundWertLink[];
  relatedTherapies?: BefundWertLink[];
  relatedArticles?: BefundWertLink[];
  // Phase 2 (Inhalt): alle Blöcke optional, bleiben in Phase 1 leer.
  shortAnswerHtml?: string;   // Kurzantwort
  bodyHtml?: string;          // Was der Wert/Befund bedeutet (Haupterklärung)
  contextHtml?: string;       // Referenz-/Kontext-Hinweise
  notProofHtml?: string;      // Was der Befund NICHT beweist
  redFlagsHtml?: string;      // Wann eine (dringliche) Abklärung sinnvoll ist
  followUpHtml?: string;      // Welche weiteren Untersuchungen infrage kommen
  sources?: { label: string; url?: string }[];
  publishedAt?: string;
  updatedAt?: string;
  // Optionaler integrativer Kontext, steht im Template IMMER zuletzt.
  // TCM erklärt keine Laborwerte medizinisch; Feld in Phase 1 leer.
  integrativeContextHtml?: string;
}

// Hub bleibt noindex,follow bis mindestens 4 wirklich publizierte Leaves existieren.
export const HUB_INDEXABLE = false;

export const befundeWerte: BefundWert[] = [
  {
    slug: 'crp-erhoeht',
    title: 'CRP erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-17',
    deck: 'CRP ist ein unspezifischer Entzündungsmarker: Der Wert zeigt an, dass im Körper entzündliche Aktivität sein kann, aber nicht wo und nicht warum. So wird ein erhöhtes CRP eingeordnet.',
    primaryPurpose: 'Einordnung eines Laborbefunds (Entzündungsmarker), nicht Erklärung einer Erkrankung.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: keine Beschwerden-Seite besitzt den Intent "CRP erhöht". /beschwerden/immunschwaeche/ ist verwandt (Infektanfälligkeit), beantwortet aber nicht die Befund-Frage; nur als Related verlinken, nicht konkurrenzieren.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Labormedizin)',
    shortAnswerHtml: `<p>CRP (C-reaktives Protein) ist ein Eiweiss, das der Körper vermehrt bildet, wenn irgendwo entzündliche Aktivität besteht. Ein erhöhter Wert sagt: Da reagiert etwas. Er sagt nicht, <strong>wo</strong> die Ursache liegt, <strong>was</strong> sie ist und wie ernst sie ist. Deshalb wird CRP nie allein bewertet, sondern immer zusammen mit deinen Beschwerden, der Untersuchung und weiteren Werten.</p>`,
    bodyHtml: `<h2>Was ist CRP?</h2>
<p>CRP wird in der Leber gebildet und gehört zu den sogenannten Akute-Phase-Proteinen: Eiweissen, deren Konzentration im Blut ansteigt, wenn das Immunsystem aktiv wird. Der Wert reagiert schnell. Er kann innerhalb von Stunden bis wenigen Tagen deutlich steigen und fällt nach Abklingen der Ursache wieder ab. Genau deshalb wird CRP so häufig bestimmt: als empfindlicher, aber unspezifischer Hinweisgeber.</p>
<h2>Warum kann CRP erhöht sein?</h2>
<p>Hinter einem erhöhten CRP stehen keine einzelne Krankheit, sondern Kategorien von Ursachen:</p>
<ul>
<li><strong>Infektionen:</strong> von banalen Atemwegsinfekten bis zu bakteriellen Entzündungen. Bakterielle Infektionen treiben den Wert tendenziell stärker als virale, verlässlich unterscheiden lässt sich das am Wert allein aber nicht.</li>
<li><strong>Entzündliche Erkrankungen:</strong> zum Beispiel rheumatische oder chronisch-entzündliche Prozesse.</li>
<li><strong>Gewebereizung und Heilung:</strong> nach Verletzungen, Operationen oder intensiver körperlicher Belastung kann CRP vorübergehend erhöht sein.</li>
<li><strong>Andere medizinische Zusammenhänge:</strong> auch Übergewicht, Rauchen und bestimmte chronische Erkrankungen können den Wert beeinflussen.</li>
</ul>
<p>Wie der Wert zu deuten ist, hängt von der Höhe der Erhöhung, deinen Symptomen, dem klinischen Kontext, weiteren Laborwerten und dem Verlauf über die Zeit ab.</p>
<h2>Leicht erhöht oder deutlich erhöht?</h2>
<p>Grundsätzlich gilt: Je höher der Wert, desto wahrscheinlicher steckt eine relevante entzündliche Ursache dahinter, und ein leicht erhöhter Wert hat viele mögliche, oft harmlose Erklärungen. Feste Grenzwerte, die für alle Menschen und Situationen gelten, gibt es aber nicht: Referenzbereiche unterscheiden sich je nach Labor und Messmethode, und die Bewertung hängt immer vom Zusammenhang ab. Verlass dich deshalb auf den Referenzbereich auf deinem Laborbefund und auf die ärztliche Einordnung, nicht auf universelle Tabellen aus dem Internet.</p>`,
    notProofHtml: `<p>Ein erhöhtes CRP beweist <strong>keine bestimmte Diagnose</strong>: keine bestimmte Infektion, keinen bestimmten Entzündungsort, keinen Tumor und keine chronische Erkrankung. Es beweist auch nicht, dass etwas Ernstes vorliegt: Nach einem Infekt kann der Wert noch erhöht sein, obwohl du dich schon wieder gesund fühlst. Umgekehrt schliesst ein normales CRP nicht jede Erkrankung aus. Der Wert ist ein Hinweisgeber, kein Urteil.</p>`,
    followUpHtml: `<p>Wie es weitergeht, hängt vom Gesamtbild ab. Häufige nächste Schritte sind: den Wert nach einiger Zeit <strong>kontrollieren</strong>, um den Verlauf zu sehen, ihn mit weiteren Werten wie dem Blutbild kombinieren oder gezielt nach einer Ursache suchen, wenn Beschwerden bestehen. Bei einem leicht erhöhten Wert ohne Symptome ist die Verlaufskontrolle oft wichtiger als jede Einzelmessung. Welche Untersuchungen infrage kommen, entscheidet die Ärztin oder der Arzt anhand von Anamnese und Befund; eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Für die Dringlichkeit zählt nicht die Zahl allein, sondern dein Zustand. Ärztliche Abklärung zeitnah suchen solltest du bei erhöhtem CRP zusammen mit hohem oder anhaltendem Fieber, Schüttelfrost, starken Schmerzen, rascher Verschlechterung des Allgemeinzustands, Atemnot oder wenn du dich insgesamt zunehmend krank fühlst. Auch ein wiederholt erhöhter Wert ohne erkennbare Ursache gehört abgeklärt, nur eben ohne Dringlichkeit.</p>`,
    integrativeContextHtml: `<p>Laborwerte gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert CRP nicht und stellt daraus keine Diagnosen. Erst wenn die Ursache ärztlich eingeordnet ist, kann sich die Frage stellen, ob eine komplementäre Behandlung, bezogen auf die diagnostizierte Erkrankung und deine konkreten Beschwerden, sinnvoll ist. Das besprechen wir ehrlich im Einzelfall.</p>`,
    relatedConditions: [{ href: '/beschwerden/immunschwaeche/', label: 'Immunschwäche & Infektanfälligkeit' }],
    relatedSignals: [{ href: '/koerpersignale/nachtschweiss-ohne-fieber/', label: 'Nachtschweiss ohne Fieber' }],
    relatedArticles: [{ href: '/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/', label: 'Leukozyten erhöht: Was bedeutet das?' }],
  },
  {
    slug: 'tsh-erhoeht-ft4-normal',
    title: 'TSH erhöht, fT4 normal: Wie wird das eingeordnet?',
    category: 'laborwert',
    status: 'planned',
    indexable: false,
    deck: 'Was die Kombination aus erhöhtem TSH und normalem fT4 bedeutet und wann eine Kontrolle sinnvoll ist.',
    primaryPurpose: 'Einordnung einer Laborwert-Konstellation der Schilddrüse, kein Ersatz für eine Schilddrüsen-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: es existiert keine Schilddrüsen-Beschwerden-Seite (geprüft: kein Leaf zu Schilddrüse/Hypothyreose). Sollte später eine entstehen, übernimmt sie den Erkrankungs-Intent; diese Seite bleibt auf die Befund-Konstellation beschränkt.',
    suggestedReviewerType: 'Ärztliche Review (Endokrinologie/Innere Medizin)',
  },
  {
    slug: 'leukozyten-erhoeht',
    title: 'Leukozyten erhöht: Was bedeutet das?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-17',
    deck: 'Leukozyten sind die weissen Blutkörperchen der Immunabwehr. Ein erhöhter Wert kann viele Gründe haben und ist für sich allein keine Diagnose. So wird der Befund eingeordnet.',
    primaryPurpose: 'Einordnung eines Blutbild-Befunds, keine Infektions- oder Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: keine Seite besitzt den Intent "Leukozyten erhöht". /beschwerden/immunschwaeche/ ist thematisch benachbart, adressiert aber den umgekehrten Fall (Anfälligkeit); nur Related.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Labormedizin)',
    shortAnswerHtml: `<p>Leukozyten sind weisse Blutkörperchen, die Abwehrzellen deines Immunsystems. Ihre Zahl im Blut steigt, wenn das Immunsystem gefordert ist, und das kann viele Gründe haben: einen Infekt, eine Entzündung, körperlichen Stress oder anderes. Ein erhöhter Wert ist damit ein Zeichen von Aktivität, <strong>keine Diagnose</strong>. Was er bedeutet, ergibt sich erst aus Beschwerden, Verlauf und den übrigen Blutwerten.</p>`,
    bodyHtml: `<h2>Was sind Leukozyten?</h2>
<p>Weisse Blutkörperchen sind die Abwehrzellen des Körpers. Sie erkennen Krankheitserreger, bekämpfen sie und räumen geschädigtes Gewebe ab. Es gibt verschiedene Typen mit unterschiedlichen Aufgaben, unter anderem Granulozyten und Lymphozyten. Im grossen Blutbild wird neben der Gesamtzahl auch die Verteilung dieser Typen gemessen.</p>
<h2>Warum können Leukozyten erhöht sein?</h2>
<ul>
<li><strong>Infektionen:</strong> die häufigste Erklärung, von der Erkältung bis zur bakteriellen Entzündung.</li>
<li><strong>Entzündliche Prozesse:</strong> auch ohne Erreger, etwa bei rheumatischen Erkrankungen.</li>
<li><strong>Körperlicher Stress:</strong> intensive Anstrengung, Verletzungen, Operationen und auch Rauchen können die Zahl vorübergehend erhöhen. Selbst starke Aufregung kurz vor der Blutentnahme kann den Wert beeinflussen.</li>
<li><strong>Medikamente:</strong> bestimmte Wirkstoffe, zum Beispiel Kortisonpräparate, erhöhen die Leukozytenzahl als bekannte Begleitwirkung.</li>
<li><strong>Andere medizinische Ursachen:</strong> deutlich seltener stecken Erkrankungen des blutbildenden Systems dahinter. Dafür gibt es im Blutbild in der Regel weitere Hinweise; ein einzelner erhöhter Wert ist kein Grund, davon auszugehen.</li>
</ul>
<h2>Warum das Differenzialblutbild wichtig ist</h2>
<p>Aussagekräftig wird der Befund oft erst durch das Differenzialblutbild: die Aufschlüsselung, <strong>welche</strong> Zelltypen vermehrt sind. Verschiedene Ursachen verändern die Verteilung unterschiedlich und geben der Ärztin oder dem Arzt so zusätzlichen Kontext. Für dich als Patient:in gilt: Versuche nicht, aus einzelnen Zellzahlen selbst eine Diagnose abzuleiten. Die Muster sind vieldeutig und brauchen die Zusammenschau mit Klinik und Verlauf.</p>
<h2>Einzelwert oder Verlauf?</h2>
<p>Ein einzelner Wert ist eine Momentaufnahme. Für die Einordnung zählen der Referenzbereich deines Labors, frühere Werte im Vergleich, deine aktuellen Beschwerden, das Differenzialblutbild und weitere Laborwerte wie das CRP. Ein leicht erhöhter Einzelwert bei gutem Befinden hat ein anderes Gewicht als ein steigender Verlauf mit Symptomen. Deshalb wird häufig zuerst kontrolliert statt sofort weiter gesucht.</p>`,
    notProofHtml: `<p>Erhöhte Leukozyten beweisen <strong>keine bestimmte Erkrankung</strong>: keine bestimmte Infektion, keine chronische Entzündung und insbesondere keine Bluterkrankung. Sie zeigen Aktivität des Immunsystems oder eine Stressreaktion an, mehr nicht. Auch der Umkehrschluss gilt nicht: Normale Leukozyten schliessen eine Erkrankung nicht in jedem Fall aus.</p>`,
    followUpHtml: `<p>Je nach Situation sind die nächsten Schritte: die klinische Untersuchung und das Gespräch über Beschwerden und Medikamente, eine <strong>Kontrolle des Blutbilds</strong> nach einiger Zeit, das Differenzialblutbild, falls noch nicht bestimmt, und nur bei konkreten Hinweisen weitere gezielte Untersuchungen. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich abklären lassen solltest du erhöhte Leukozyten, wenn gleichzeitig hohes oder anhaltendes Fieber, Schüttelfrost, starke Schmerzen, ausgeprägte Abgeschlagenheit, ungewollter Gewichtsverlust, <a href="/koerpersignale/nachtschweiss-ohne-fieber/">Nachtschweiss</a> oder auffällige Blutungsneigung bestehen. Ohne solche Zeichen ist ein leicht erhöhter Wert meist kein Notfall, sondern ein Fall für die geplante Kontrolle.</p>`,
    integrativeContextHtml: `<p>Die Interpretation von Blutwerten gehört in die schulmedizinische Beurteilung: Die chinesische Medizin übersetzt eine erhöhte Leukozytenzahl nicht in ein eigenes Diagnose-Muster. Erst wenn ärztlich geklärt ist, was hinter dem Befund steckt, kann eine komplementäre Behandlung, bezogen auf die Diagnose und deine Beschwerden, ein Thema sein.</p>`,
    relatedConditions: [{ href: '/beschwerden/immunschwaeche/', label: 'Immunschwäche & Infektanfälligkeit' }],
    relatedSignals: [{ href: '/koerpersignale/hitzegefuehl-ohne-fieber/', label: 'Hitzegefühl ohne Fieber' }],
    relatedArticles: [{ href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' }],
  },
  {
    slug: 'cholesterin-erhoeht-trotz-gesunder-ernaehrung',
    title: 'Cholesterin erhöht trotz gesunder Ernährung',
    category: 'laborwert',
    status: 'planned',
    indexable: false,
    deck: 'Warum Cholesterinwerte auch bei gesunder Ernährung erhöht sein können und welche Faktoren mitspielen.',
    primaryPurpose: 'Einordnung eines Laborbefunds inkl. des häufigen Widerspruchs-Erlebens, keine Herz-Kreislauf-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: keine Hypercholesterinämie-/Herz-Kreislauf-Beschwerden-Seite vorhanden (geprüft). Keine Therapie- oder Ernährungsberatungs-Versprechen; Abgrenzung dokumentieren, falls später eine kardiovaskuläre Seite entsteht.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Kardiologie)',
  },
  {
    slug: 'ferritin-niedrig-haemoglobin-normal',
    title: 'Ferritin niedrig trotz normalem Hämoglobin',
    category: 'laborwert',
    status: 'planned',
    indexable: false,
    deck: 'Was leere Eisenspeicher bei noch normalem Hämoglobin bedeuten und wann das relevant wird.',
    primaryPurpose: 'Einordnung der Befund-Konstellation Eisenspeicher vs. Blutbild; die Erkrankungsseite bleibt der Owner für Eisenmangel.',
    canonicalIntentOwner: ['/beschwerden/eisenmangel/'],
    overlapNotes: 'Eisenmangel-Intent gehört /beschwerden/eisenmangel/. Diese Seite beantwortet nur die Labor-Konstellation (Speicher leer, Hb normal) und verlinkt für Symptome/Behandlung dorthin.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    relatedConditions: [{ href: '/beschwerden/eisenmangel/', label: 'Eisenmangel' }],
  },
  {
    slug: 'hba1c-leicht-erhoeht',
    title: 'HbA1c leicht erhöht: Was bedeutet das?',
    category: 'laborwert',
    status: 'planned',
    indexable: false,
    deck: 'Was der Langzeit-Blutzuckerwert aussagt und wie ein leicht erhöhter HbA1c eingeordnet wird.',
    primaryPurpose: 'Einordnung eines Laborbefunds im Graubereich, keine Diabetes-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: keine Diabetes-/Prädiabetes-Beschwerden-Seite vorhanden (geprüft). Sollte eine entstehen, übernimmt sie Erkrankung/Therapie; diese Seite bleibt Befund-Einordnung.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Diabetologie)',
  },
  {
    slug: 'nuechternblutzucker-erhoeht',
    title: 'Nüchternblutzucker erhöht',
    category: 'laborwert',
    status: 'planned',
    indexable: false,
    deck: 'Wie ein erhöhter Nüchternwert zustande kommen kann und wann eine weitere Abklärung sinnvoll ist.',
    primaryPurpose: 'Einordnung eines einzelnen Messbefunds inkl. Fehlerquellen, keine Diabetes-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner (wie hba1c-leicht-erhoeht: keine Diabetes-Seite vorhanden). Interner Überlapp mit hba1c-leicht-erhoeht beachten: Nüchternwert = Momentaufnahme, HbA1c = Langzeitwert; Abgrenzung in den Artikeln explizit machen.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Diabetologie)',
  },
  {
    slug: 'blutdruck-140-90',
    title: 'Blutdruck 140/90: Wie ist der Wert einzuordnen?',
    category: 'messwert',
    status: 'planned',
    indexable: false,
    deck: 'Was ein einzelner Messwert von 140/90 aussagt, was nicht, und wie Blutdruck korrekt beurteilt wird.',
    primaryPurpose: 'Einordnung eines konkreten Messwerts (Grenzwert-Frage), nicht die Erkrankungsseite Bluthochdruck.',
    canonicalIntentOwner: ['/beschwerden/bluthochdruck/'],
    overlapNotes: 'Der Erkrankungs-Intent Bluthochdruck gehört /beschwerden/bluthochdruck/. Diese Seite beantwortet nur "ist dieser Wert schon zu hoch?" und verlinkt für Erkrankung/Behandlung dorthin.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Kardiologie)',
    relatedConditions: [{ href: '/beschwerden/bluthochdruck/', label: 'Bluthochdruck' }],
  },
  {
    slug: 'bandscheibenprotrusion-mrt',
    title: 'Bandscheibenprotrusion im MRT: Was bedeutet der Befund?',
    category: 'bildgebung',
    status: 'planned',
    indexable: false,
    deck: 'Was eine Protrusion im MRT-Bericht bedeutet, wie häufig sie ohne Beschwerden vorkommt und was der Befund nicht beweist.',
    primaryPurpose: 'Übersetzung eines Bildgebungs-Befundbegriffs, keine Rücken-Erkrankungs- oder Therapieseite.',
    canonicalIntentOwner: ['/beschwerden/bandscheibenvorfall/', '/beschwerden/rueckenschmerzen/', '/beschwerden/ischias/'],
    overlapNotes: 'Erkrankungs- und Behandlungs-Intents gehören den Beschwerden-Seiten (Bandscheibenvorfall, Rückenschmerzen, Ischias). Diese Seite erklärt nur den Befundbegriff und die Diskrepanz Bild vs. Beschwerden; für Symptome/Therapie dorthin verlinken.',
    suggestedReviewerType: 'Ärztliche Review (Radiologie/Orthopädie)',
    relatedConditions: [
      { href: '/beschwerden/bandscheibenvorfall/', label: 'Bandscheibenvorfall' },
      { href: '/beschwerden/rueckenschmerzen/', label: 'Rückenschmerzen' },
      { href: '/beschwerden/ischias/', label: 'Ischias' },
    ],
    relatedVisuals: [
      { href: '/visuals/bandscheibenvorfall-lws/', label: 'Visual: Bandscheibenvorfall LWS' },
      { href: '/visuals/bandscheibenvorfall-hws/', label: 'Visual: Bandscheibenvorfall HWS' },
    ],
  },
  {
    slug: 'degenerative-veraenderungen-mrt',
    title: 'Degenerative Veränderungen im MRT: Was heisst das?',
    category: 'bildgebung',
    status: 'planned',
    indexable: false,
    deck: 'Warum "degenerative Veränderungen" im Befund oft normale Alterungszeichen beschreiben und wie der Begriff einzuordnen ist.',
    primaryPurpose: 'Übersetzung von Befundsprache (Sammelbegriff), keine muskuloskelettale Diagnose- oder Therapieseite.',
    canonicalIntentOwner: ['/beschwerden/bandscheibenvorfall/', '/beschwerden/rueckenschmerzen/', '/beschwerden/ischias/'],
    overlapNotes: 'Muskuloskelettale Diagnose-Intents gehören den Beschwerden-Seiten (inkl. /beschwerden/arthrose/ für Gelenke). Diese Seite bleibt beim Befundbegriff und seiner Häufigkeit bei Beschwerdefreien.',
    suggestedReviewerType: 'Ärztliche Review (Radiologie/Orthopädie)',
    relatedConditions: [
      { href: '/beschwerden/rueckenschmerzen/', label: 'Rückenschmerzen' },
      { href: '/beschwerden/arthrose/', label: 'Arthrose' },
    ],
    relatedVisuals: [
      { href: '/visuals/bandscheibenvorfall-lws/', label: 'Visual: Bandscheibenvorfall LWS' },
    ],
  },
];

export const publishedBefundeWerte = befundeWerte.filter((b) => b.status === 'published');
