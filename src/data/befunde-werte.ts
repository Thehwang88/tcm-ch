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
  /** Thematische Hub-Gruppe (nur Anzeige-Label, keine URL). Fallback: 'Weitere Werte'. */
  gruppe?: string;
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

// Regel: Hub bleibt noindex,follow bis mindestens 4 wirklich publizierte Leaves existieren.
// Seit 21.09.2026 sind 4 Leaves publiziert (crp, leukozyten, tsh, cholesterin) -> indexable.
export const HUB_INDEXABLE = true;

// Anzeige-Reihenfolge der Hub-Gruppen (Phase: Cluster-Ausbau 24.09.2026).
export const GRUPPEN_ORDER = ['Blutbild', 'Leber & Enzyme', 'Bauchspeicheldrüse', 'Elektrolyte', 'Stoffwechsel', 'Vitamine & Eisenspeicher', 'Entzündung', 'Schilddrüse', 'Niere & Blutdruck', 'Weitere Werte'];

export const befundeWerte: BefundWert[] = [
  {
    slug: 'crp-erhoeht',
    gruppe: 'Entzündung',
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
    slug: 'tsh-erhoeht',
    gruppe: 'Schilddrüse',
    title: 'TSH erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-21',
    deck: 'TSH ist das Steuerhormon der Schilddrüse. Ein erhöhter Wert ist ein Hinweis, keine Diagnose. Was dahinterstecken kann und wie der Befund eingeordnet wird.',
    primaryPurpose: 'Einordnung eines Schilddrüsen-Laborbefunds, kein Ersatz für eine Schilddrüsen-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: es existiert keine Schilddrüsen-Beschwerden-Seite (geprüft: kein Leaf zu Schilddrüse/Hypothyreose). Sollte später eine entstehen, übernimmt sie den Erkrankungs-Intent; diese Seite bleibt auf die Befund-Einordnung beschränkt. Konstellation "TSH erhöht, fT4 normal" wird als Abschnitt hier abgedeckt (Slug umbenannt am 21.09.2026, hatte nie eine Prod-Route).',
    suggestedReviewerType: 'Ärztliche Review (Endokrinologie/Innere Medizin)',
    shortAnswerHtml: `<p>TSH ist das Hormon, mit dem die Hirnanhangsdrüse die Schilddrüse steuert. Steigt der TSH-Wert, fordert der Körper die Schilddrüse stärker an, oft, weil sie etwas weniger leistet als gerade gebraucht wird. Ein erhöhter Wert ist damit ein <strong>Hinweis auf die Regulation</strong>, keine Diagnose. Ob er Bedeutung hat, ergibt sich erst aus den eigentlichen Schilddrüsenhormonen (vor allem fT4), deinen Beschwerden und dem Verlauf.</p>`,
    bodyHtml: `<h2>Was ist TSH?</h2>
<p>TSH (Thyreoidea-stimulierendes Hormon) wird nicht in der Schilddrüse gebildet, sondern in der Hirnanhangsdrüse. Es funktioniert wie ein Regler: Produziert die Schilddrüse weniger Hormone, steigt das TSH, um sie anzutreiben. Produziert sie mehr, sinkt es. Deshalb reagiert TSH oft früher und empfindlicher als die Schilddrüsenhormone selbst und deshalb ist es der übliche erste Suchtest.</p>
<h2>Warum kann TSH erhöht sein?</h2>
<ul>
<li><strong>Die Schilddrüse arbeitet etwas weniger:</strong> die häufigste Erklärung. Oft steckt eine schleichende, meist harmlos verlaufende Veränderung dahinter, die zunächst nur beobachtet wird.</li>
<li><strong>Vorübergehende Einflüsse:</strong> die Erholungsphase nach einem Infekt oder die Tageszeit der Blutentnahme können den Wert verschieben. Auch deshalb wird ein einzelner erhöhter Wert in der Regel zuerst kontrolliert.</li>
<li><strong>Medikamente:</strong> bestimmte Wirkstoffe beeinflussen die Schilddrüsenwerte. Wichtig ist, dass die Ärztin oder der Arzt deine aktuelle Medikation kennt.</li>
<li><strong>Andere, seltenere Ursachen:</strong> dafür gibt es meist zusätzliche Hinweise in Untersuchung und weiteren Werten; ein einzelner erhöhter TSH-Wert ist kein Grund, davon auszugehen.</li>
</ul>
<h2>TSH erhöht, fT4 normal: die häufige Konstellation</h2>
<p>Sehr oft zeigt das Labor ein erhöhtes TSH bei <strong>normalem fT4</strong>. Das bedeutet: Die Schilddrüse liefert (noch) genug Hormon, braucht dafür aber mehr Antrieb. Diese Konstellation wird als latente oder subklinische Veränderung bezeichnet. Sie macht häufig keine Beschwerden, kann sich bei einer Kontrolle wieder normalisieren und ist für sich allein kein Grund zur Sorge. Ob und wann daraus eine Behandlung wird, ist eine individuelle ärztliche Entscheidung, abhängig von Höhe und Verlauf des Werts, Beschwerden, Alter und Begleitumständen.</p>
<h2>Einzelwert oder Verlauf?</h2>
<p>Ein einzelner TSH-Wert ist eine Momentaufnahme, und der Wert schwankt auch bei Gesunden. Für die Einordnung zählen der Referenzbereich deines Labors, eine <strong>Kontrollmessung</strong> nach einigen Wochen bis Monaten, das fT4 und je nach Situation weitere Werte sowie deine Beschwerden. Erst dieses Gesamtbild trägt eine Entscheidung.</p>`,
    notProofHtml: `<p>Ein erhöhtes TSH beweist <strong>keine Schilddrüsenerkrankung</strong> und erklärt nicht automatisch Müdigkeit, Gewichtszunahme oder Stimmungstief, auch wenn diese Verknüpfung oft gezogen wird. Solche Beschwerden haben viele mögliche Ursachen. Umgekehrt schliesst ein normales TSH nicht jede Schilddrüsenfrage aus. Die Zuordnung von Beschwerden zu einem Laborwert ist eine ärztliche Aufgabe.</p>`,
    followUpHtml: `<p>Der übliche nächste Schritt ist unspektakulär: eine <strong>Kontrollmessung</strong> mit fT4 nach einigen Wochen bis Monaten, dazu das Gespräch über Beschwerden und Medikamente. Je nach Ergebnis folgen gezielt weitere Werte oder ein Ultraschall der Schilddrüse. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich besprechen solltest du den Befund, wenn gleichzeitig deutliche Beschwerden bestehen, etwa ausgeprägte Müdigkeit und Verlangsamung, starkes Frieren, deutliche Gewichtsveränderung, eine sichtbare Schwellung am Hals oder Schluckbeschwerden. In der Schwangerschaft oder bei Kinderwunsch gehört ein erhöhtes TSH immer und ohne Verzögerung in ärztliche Hände.</p>`,
    integrativeContextHtml: `<p>Schilddrüsenwerte gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert TSH nicht und stellt daraus keine Diagnosen. Erst wenn ärztlich geklärt ist, was hinter dem Befund steckt, kann sich die Frage stellen, ob eine komplementäre Behandlung, bezogen auf die Diagnose und deine konkreten Beschwerden, sinnvoll ist. Das besprechen wir ehrlich im Einzelfall.</p>`,
    relatedSignals: [
      { href: '/koerpersignale/hitzegefuehl-ohne-fieber/', label: 'Hitzegefühl ohne Fieber' },
      { href: '/koerpersignale/nachtschweiss-ohne-fieber/', label: 'Nachtschweiss ohne Fieber' },
    ],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/cholesterin-erhoeht/', label: 'Cholesterin erhöht: Was bedeutet das?' },
    ],
  },
  {
    slug: 'leukozyten-erhoeht',
    gruppe: 'Blutbild',
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
<p>Weisse Blutkörperchen sind die Abwehrzellen des Körpers. Sie erkennen Krankheitserreger, bekämpfen sie und räumen geschädigtes Gewebe ab. Es gibt verschiedene Typen mit unterschiedlichen Aufgaben, unter anderem <a href="/gesundheitsbibliothek/befunde-werte/neutrophile-erhoeht/">neutrophile Granulozyten</a> und <a href="/gesundheitsbibliothek/befunde-werte/lymphozyten-erhoeht/">Lymphozyten</a>. Im grossen Blutbild wird neben der Gesamtzahl auch die Verteilung dieser Typen gemessen.</p>
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
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/monozyten-erhoeht/', label: 'Monozyten erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/eosinophile-erhoeht/', label: 'Eosinophile erhöht: Was bedeutet das?' },
    ],
  },
  {
    slug: 'cholesterin-erhoeht',
    gruppe: 'Stoffwechsel',
    title: 'Cholesterin erhöht: Was bedeutet das?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-21',
    deck: 'Cholesterin ist ein körpereigener Baustoff, kein Fremdstoff. Was ein erhöhter Wert aussagt, warum er auch bei gesunder Ernährung vorkommt und wie er eingeordnet wird.',
    primaryPurpose: 'Einordnung eines Laborbefunds inkl. des häufigen Widerspruchs-Erlebens ("trotz gesunder Ernährung"), keine Herz-Kreislauf-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: keine Hypercholesterinämie-/Herz-Kreislauf-Beschwerden-Seite vorhanden (geprüft). Keine Therapie- oder Ernährungsberatungs-Versprechen; Abgrenzung dokumentieren, falls später eine kardiovaskuläre Seite entsteht. Slug umbenannt am 21.09.2026 von cholesterin-erhoeht-trotz-gesunder-ernaehrung (hatte nie eine Prod-Route); die Konstellation "trotz gesunder Ernährung" ist ein Abschnitt.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Kardiologie)',
    shortAnswerHtml: `<p>Cholesterin ist kein Fremdstoff, sondern ein Baustoff, den dein Körper selbst herstellt, für Zellwände, Hormone und Gallensäuren. Ein erhöhter Wert im Labor ist <strong>keine Erkrankung und kein Notfall</strong>, sondern ein Risikofaktor unter mehreren. Was er für dich bedeutet, hängt von der Aufschlüsselung der Blutfette und deinem persönlichen Gesamtrisiko ab, und das beurteilt die Ärztin oder der Arzt, nicht die einzelne Zahl.</p>`,
    bodyHtml: `<h2>Was ist Cholesterin?</h2>
<p>Cholesterin wird zum grössten Teil in der Leber gebildet; nur ein kleinerer Teil kommt aus der Nahrung. Im Blut wird es in Transportpaketen befördert, die im Labor getrennt gemessen werden: unter anderem LDL und HDL, dazu die Triglyceride. Deshalb sagt das Gesamtcholesterin allein wenig aus. Aussagekräftig wird der Befund erst durch die <strong>Aufschlüsselung</strong> dieser Werte.</p>
<h2>Warum kann Cholesterin erhöht sein?</h2>
<ul>
<li><strong>Veranlagung:</strong> ein grosser Teil des Cholesterinspiegels ist genetisch bestimmt. Deshalb haben auch schlanke, sportliche Menschen mit ausgewogener Ernährung teils erhöhte Werte.</li>
<li><strong>Lebensstil:</strong> Ernährung, Bewegung, Gewicht und Rauchen spielen mit, aber sie sind nur ein Teil des Bildes.</li>
<li><strong>Andere Ursachen:</strong> unter anderem können eine verminderte Schilddrüsenfunktion oder bestimmte Medikamente die Blutfette verändern. Auch das prüft die ärztliche Abklärung.</li>
</ul>
<h2>Erhöht trotz gesunder Ernährung: warum das kein Widerspruch ist</h2>
<p>Viele erleben den Befund als unfair: Die Ernährung stimmt, der Wert trotzdem nicht. Der Grund ist meist die Veranlagung. Weil die Leber den grössten Teil des Cholesterins selbst produziert, kann die Ernährung den Wert nur begrenzt bewegen. Ein erhöhter Wert bei gesundem Lebensstil bedeutet also <strong>nicht, dass du etwas falsch machst</strong>, und er bedeutet auch nicht, dass gesunde Gewohnheiten sinnlos wären: Sie wirken auf das Gesamtrisiko, nicht nur auf diese eine Zahl.</p>
<h2>Warum das Gesamtrisiko zählt, nicht die einzelne Zahl</h2>
<p>Ob und wie ein erhöhter Wert behandelt wird, richtet sich nicht nach einem festen Grenzwert für alle, sondern nach deinem persönlichen Risiko für Herz-Kreislauf-Erkrankungen. Dazu gehören Alter, Blutdruck, Rauchen, familiäre Vorgeschichte, Blutzucker und weitere Faktoren. Derselbe Cholesterinwert kann bei einer Person unbedenklich sein und bei einer anderen behandlungsbedürftig. Genau deshalb gehört die Bewertung in die ärztliche Sprechstunde.</p>`,
    notProofHtml: `<p>Ein erhöhtes Cholesterin beweist <strong>keine Gefässerkrankung</strong>: Es sagt nicht, dass deine Gefässe verengt sind oder ein Ereignis bevorsteht. Es ist ein Risikofaktor, der das Gesamtbild mitprägt, mehr nicht. Umgekehrt garantiert ein normaler Wert keine gesunden Gefässe. Cholesterin macht zudem in aller Regel keine Beschwerden; aktuelle Symptome haben fast immer eine andere Erklärung.</p>`,
    followUpHtml: `<p>Üblich sind: das Gespräch über Vorerkrankungen, Familiengeschichte und Medikamente, eine <strong>Kontrolle mit vollständigem Lipidprofil</strong> (LDL, HDL, Triglyceride), je nach Situation Blutdruck-, Blutzucker- und Schilddrüsenwerte und daraus die gemeinsame Einschätzung des Gesamtrisikos. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Der Laborwert selbst ist nie ein Notfall. Ärztliche Abklärung ohne Aufschub brauchen dagegen Warnzeichen wie Druck oder Schmerzen in der Brust, Atemnot bei geringer Belastung oder Schmerzen in den Beinen beim Gehen, unabhängig vom Cholesterinwert. Zügig besprechen solltest du den Befund auch bei sehr hohen Werten in jungen Jahren oder wenn nahe Angehörige früh Herzinfarkte oder Schlaganfälle hatten: Dahinter kann eine ausgeprägte familiäre Veranlagung stecken.</p>`,
    integrativeContextHtml: `<p>Die Bewertung von Blutfetten und die Entscheidung über eine Behandlung gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert Cholesterinwerte nicht und ersetzt keine ärztlich empfohlene Therapie. Erst auf Basis der ärztlichen Einordnung kann sich die Frage stellen, ob eine komplementäre Behandlung, bezogen auf konkrete Beschwerden, sinnvoll ist. Das besprechen wir ehrlich im Einzelfall.</p>`,
    relatedSignals: [
      { href: '/koerpersignale/herzklopfen-nach-dem-essen/', label: 'Herzklopfen nach dem Essen' },
    ],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/tsh-erhoeht/', label: 'TSH erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'leberwerte-erhoeht',
    gruppe: 'Leber & Enzyme',
    title: 'Leberwerte erhöht: Was bedeuten ALT, AST, GGT und andere Werte?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-22',
    deck: 'Erhöhte Leberwerte haben viele mögliche Ursachen. Welche Werte dazugehören, was sie aussagen und warum ein einzelner Laborwert noch keine Diagnose ist.',
    primaryPurpose: 'Einordnung des Sammelbefunds "Leberwerte erhöht", keine Lebererkrankungs-Seite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner für den Befund-Intent "leberwerte erhöht". /beschwerden/fettleber/ bleibt Owner des Erkrankungs-Intents Fettleber; nur Related.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hepatologie)',
    shortAnswerHtml: `<p>„Leberwerte“ ist ein Sammelbegriff für mehrere Laborwerte. Dazu gehören je nach Untersuchung unter anderem ALT, AST, GGT, alkalische Phosphatase und Bilirubin. Sie zeigen unterschiedliche Prozesse und dürfen deshalb nicht wie ein einzelner Wert interpretiert werden.</p>
<p>Ein erhöhter Leberwert bedeutet nicht automatisch, dass eine schwere Lebererkrankung vorliegt. Für die Einordnung sind Höhe, Muster, Verlauf, weitere Blutwerte, Medikamente, Alkoholkonsum, Vorerkrankungen und gegebenenfalls Bildgebung wichtig.</p>`,
    bodyHtml: `<h2>Welche Werte werden häufig betrachtet?</h2>
<ul>
<li><strong>ALT:</strong> Ein Enzym, das besonders stark in Leberzellen vorkommt. Erhöhungen können bei verschiedenen Formen einer Leberzellschädigung auftreten; Details unter <a href="/gesundheitsbibliothek/befunde-werte/gpt-alt-erhoeht/">GPT (ALT) erhöht</a>.</li>
<li><strong>AST:</strong> Kommt ausser in der Leber auch in anderen Geweben wie Muskeln vor. Der Wert ist deshalb weniger leberspezifisch; Details unter <a href="/gesundheitsbibliothek/befunde-werte/got-ast-erhoeht/">GOT (AST) erhöht</a>.</li>
<li><strong>GGT:</strong> Kann unter anderem bei Erkrankungen der Leber und Gallenwege sowie durch Alkohol oder bestimmte Medikamente erhöht sein.</li>
<li><strong>Alkalische Phosphatase:</strong> Wird unter anderem bei Fragestellungen rund um Gallenwege und Knochen beurteilt; Details unter <a href="/gesundheitsbibliothek/befunde-werte/alkalische-phosphatase-erhoeht/">Alkalische Phosphatase erhöht</a>.</li>
<li><strong>Bilirubin:</strong> Entsteht beim Abbau roter Blutkörperchen und wird über Leber und Galle verarbeitet; die Einzelheiten erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/bilirubin-erhoeht/">Bilirubin erhöht</a>.</li>
</ul>
<h2>Warum können Leberwerte erhöht sein?</h2>
<p>Mögliche Ursachen reichen von vorübergehenden Veränderungen bis zu Fettleber, Medikamentenwirkungen, Alkohol, Virusinfektionen, Erkrankungen der Gallenwege und anderen Lebererkrankungen. Auch intensive Muskelbelastung kann einzelne Werte beeinflussen.</p>
<p>Welche Ursache wahrscheinlich ist, lässt sich nicht aus einem einzelnen Laborwert ableiten.</p>`,
    notProofHtml: `<p>Ein erhöhter Laborwert zeigt nicht automatisch, wie gut die Leber insgesamt funktioniert und beweist keine bestimmte Erkrankung. Umgekehrt können manche Lebererkrankungen bestehen, obwohl einzelne Werte nur gering verändert sind.</p>`,
    followUpHtml: `<p>Je nach Befund können Werte kontrolliert, Medikamente und Risikofaktoren überprüft oder weitere Blutuntersuchungen durchgeführt werden. Bei bestimmten Konstellationen kommen Ultraschall oder andere Untersuchungen hinzu.</p>`,
    redFlagsHtml: `<p>Neu auffällige Leberwerte sollten ärztlich eingeordnet werden. Besonders wichtig ist eine rasche Abklärung bei Gelbfärbung von Haut oder Augen, sehr dunklem Urin, starken Oberbauchschmerzen, wiederholtem Erbrechen, ausgeprägter Benommenheit oder deutlicher allgemeiner Verschlechterung.</p>`,
    integrativeContextHtml: `<p>TCM-Begriffe wie „Leber-Qi“ sind traditionelle Konzepte und nicht mit modernen Leberwerten gleichzusetzen. Aus einem erhöhten Laborwert lässt sich kein TCM-Muster ableiten. Die medizinische Abklärung des Laborbefunds steht deshalb an erster Stelle.</p>`,
    relatedConditions: [{ href: '/beschwerden/fettleber/', label: 'Fettleber' }],
    relatedSignals: [{ href: '/koerpersignale/druck-im-oberbauch/', label: 'Druck im Oberbauch' }],
    relatedArticles: [{ href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' }],
  },
  {
    slug: 'gamma-gt-erhoeht',
    gruppe: 'Leber & Enzyme',
    title: 'Gamma-GT erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-23',
    deck: 'Die Gamma-GT (GGT) ist ein empfindlicher Leber- und Gallenwege-Wert. Warum sie erhöht sein kann, was ein isolierter Wert aussagt und wie er eingeordnet wird.',
    primaryPurpose: 'Einordnung des Einzelwerts Gamma-GT/GGT; der Sammelbefund bleibt bei leberwerte-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Generisches "Leberwerte erhöht" gehört /gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/ (dort ist GGT ein Listenpunkt). Diese Seite besitzt NUR den GGT-Einzelwert-Intent und verlinkt für das Gesamtbild dorthin.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hepatologie)',
    shortAnswerHtml: `<p>Die Gamma-GT (GGT, Gamma-Glutamyltransferase) ist ein Enzym, das vor allem in Leber und Gallenwegen vorkommt. Sie reagiert empfindlich auf viele Einflüsse, von Alkohol über Medikamente bis zu Leber- und Gallenwegserkrankungen. Genau deshalb gilt: Eine erhöhte Gamma-GT ist ein <strong>unspezifischer Hinweis, keine Diagnose</strong>. Was sie bedeutet, ergibt sich erst zusammen mit den übrigen Leberwerten, deiner Situation und dem Verlauf.</p>`,
    bodyHtml: `<h2>Was ist die Gamma-GT?</h2>
<p>Das Enzym sitzt in den Zellmembranen von Leber und Gallenwegen. Werden diese Zellen gereizt oder geschädigt oder staut sich Galle, steigt die Gamma-GT im Blut. Sie ist damit ein empfindlicher, aber wenig spezifischer Marker: Sie zeigt an, dass etwas auf Leber oder Gallenwege wirkt, nicht was.</p>
<h2>Warum kann die Gamma-GT erhöht sein?</h2>
<ul>
<li><strong>Alkohol:</strong> regelmässiger Konsum ist eine der häufigsten Erklärungen; der Wert kann schon bei Mengen steigen, die nicht als Missbrauch gelten.</li>
<li><strong>Medikamente:</strong> zahlreiche Wirkstoffe erhöhen die Gamma-GT als bekannte Begleitwirkung. Setze deswegen nie selbstständig ein Medikament ab, sondern besprich die Liste ärztlich.</li>
<li><strong>Stoffwechsel und Fettleber:</strong> Übergewicht und eine nicht-alkoholische Fettleber gehören zu den häufigsten Ursachen dauerhaft erhöhter Werte.</li>
<li><strong>Erkrankungen von Leber und Gallenwegen:</strong> von Entzündungen bis zum Gallestau; dafür gibt es meist weitere Hinweise in Untersuchung und Labor.</li>
</ul>
<h2>Isolierte Gamma-GT oder mehrere auffällige Leberwerte?</h2>
<p>Eine isoliert erhöhte Gamma-GT bei sonst normalen Werten hat oft eine harmlose oder gut adressierbare Erklärung und wird häufig zuerst kontrolliert. Sind gleichzeitig ALT, AST, alkalische Phosphatase oder Bilirubin verändert, wird gezielter gesucht. Das Gesamtbild erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/">Leberwerte erhöht</a>.</p>`,
    notProofHtml: `<p>Eine erhöhte Gamma-GT beweist keinen Alkoholmissbrauch, keine bestimmte Lebererkrankung und keinen Gallenstein. Sie sagt auch nicht, wie gut die Leber insgesamt arbeitet. Umgekehrt schliesst ein normaler Wert eine Lebererkrankung nicht sicher aus.</p>`,
    followUpHtml: `<p>Häufige nächste Schritte: das Gespräch über Alkohol, Medikamente und Stoffwechselfaktoren, eine <strong>Kontrollmessung</strong> nach einigen Wochen, die übrigen Leberwerte, je nach Bild ein Ultraschall des Oberbauchs. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören: Gelbfärbung von Haut oder Augen, sehr dunkler Urin oder entfärbter Stuhl, starke Oberbauchschmerzen, Fieber mit Schmerzen im rechten Oberbauch, ausgeprägte Müdigkeit mit Übelkeit oder eine deutliche allgemeine Verschlechterung.</p>`,
    integrativeContextHtml: `<p>Leberwerte gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert die Gamma-GT nicht, und der TCM-Begriff Leber ist nicht mit dem Laborwert gleichzusetzen. Erst wenn die Ursache ärztlich eingeordnet ist, kann sich die Frage nach einer komplementären Begleitung konkreter Beschwerden stellen.</p>`,
    relatedConditions: [{ href: '/beschwerden/fettleber/', label: 'Fettleber' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
      { href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'nierenwerte-erhoeht',
    gruppe: 'Niere & Blutdruck',
    title: 'Nierenwerte erhöht: Was bedeutet der Befund?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-23',
    deck: '"Nierenwerte" meint meist Kreatinin und eGFR. Was ein erhöhter Wert aussagen kann, welche Faktoren mitspielen und warum ein Einzelwert keine Diagnose ist.',
    primaryPurpose: 'Einordnung des Sammelbefunds "Nierenwerte erhöht" (Kreatinin/eGFR), keine Nierenerkrankungs-Seite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: keine Nieren-Beschwerden-Seite und kein Befund-Leaf vorhanden (geprüft). Sollte später eine Nierenerkrankungs-Seite entstehen, übernimmt sie Erkrankung/Therapie; diese Seite bleibt Befund-Einordnung.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Nephrologie)',
    shortAnswerHtml: `<p>"Nierenwerte" ist ein Sammelbegriff aus dem Alltag. Gemeint sind meist das <strong>Kreatinin</strong> im Blut und die daraus berechnete <strong>eGFR</strong>, ein Schätzwert für die Filterleistung der Nieren. Ein erhöhtes Kreatinin (beziehungsweise eine erniedrigte eGFR) kann auf eine eingeschränkte Nierenfunktion hinweisen, hat aber auch andere mögliche Erklärungen. Ein einzelner Wert ist deshalb keine Diagnose einer Nierenerkrankung.</p>`,
    bodyHtml: `<h2>Was wird gemessen?</h2>
<p><a href="/gesundheitsbibliothek/befunde-werte/kreatinin-erhoeht/">Kreatinin</a> ist ein Abbauprodukt des Muskelstoffwechsels, das über die Nieren ausgeschieden wird. Arbeiten die Nieren weniger, steigt es im Blut. Die eGFR wird aus dem Kreatinin zusammen mit Alter und Geschlecht berechnet und schätzt, wie viel die Nieren pro Minute filtern. Je nach Labor gehören auch Harnstoff oder weitere Werte zum Bild.</p>
<h2>Warum können Nierenwerte erhöht sein?</h2>
<ul>
<li><strong>Flüssigkeitsmangel:</strong> zu wenig trinken, Durchfall, Erbrechen oder starkes Schwitzen können das Kreatinin vorübergehend erhöhen.</li>
<li><strong>Muskelmasse und Belastung:</strong> viel Muskelmasse oder intensives Training können den Wert anheben, ohne dass die Nieren krank sind; bei sehr wenig Muskelmasse kann er umgekehrt zu gut aussehen.</li>
<li><strong>Medikamente:</strong> bestimmte Schmerzmittel, einige Blutdruck- und andere Medikamente beeinflussen die Nierenwerte. Die Medikamentenliste gehört deshalb ins ärztliche Gespräch; setze nichts selbstständig ab.</li>
<li><strong>Akute oder chronische Nierenfunktionsstörung:</strong> ob es sich um eine vorübergehende Reaktion oder eine dauerhafte Einschränkung handelt, zeigt erst der Verlauf über Wiederholungsmessungen.</li>
</ul>
<h2>Einzelwert oder Verlauf?</h2>
<p>Für die Einordnung zählen der Vergleich mit früheren Werten, eine Kontrollmessung unter besseren Bedingungen (ausreichend getrunken, ohne vorherige intensive Belastung), oft ein Urintest auf Eiweiss und der klinische Kontext wie Blutdruck und Diabetes. Ein einmalig leicht auffälliger Wert bei gutem Befinden wird häufig zuerst kontrolliert.</p>`,
    notProofHtml: `<p>Ein einmalig erhöhtes Kreatinin beweist keine chronische Nierenerkrankung, und eine einzelne eGFR-Zahl ist keine Prozentangabe der "Nierengesundheit". Umgekehrt schliessen normale Werte eine beginnende Nierenschädigung nicht sicher aus; dafür braucht es je nach Risiko zusätzlich den Urin-Befund.</p>`,
    followUpHtml: `<p>Üblich sind eine <strong>Wiederholungsmessung</strong>, ein Urintest (u.a. auf Eiweiss/Albumin), Blutdruckkontrolle, die Durchsicht der Medikamente und je nach Situation ein Ultraschall der Nieren. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah medizinisch beurteilt gehören: deutlich weniger oder kein Urin, starke Wassereinlagerungen, Atemnot, Übelkeit mit Verwirrtheit, Flankenschmerzen mit Fieber oder ein rasch angestiegener Wert. Solche Konstellationen können auf eine akute Nierenschädigung oder eine Infektion hinweisen.</p>`,
    integrativeContextHtml: `<p>Nierenwerte gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert Kreatinin und eGFR nicht, und der TCM-Begriff Niere ist nicht mit dem Organbefund gleichzusetzen. Eine komplementäre Begleitung ist, wenn überhaupt, ein Thema nach der ärztlichen Einordnung, nie ihr Ersatz.</p>`,
    relatedConditions: [{ href: '/beschwerden/bluthochdruck/', label: 'Bluthochdruck' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/kreatinin-erhoeht/', label: 'Kreatinin erhöht: Was bedeutet ein hoher Kreatininwert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/kalium-zu-hoch/', label: 'Kalium zu hoch: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/blutzucker-erhoeht/', label: 'Blutzucker erhöht: Was bedeutet der Messwert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
    ],
  },
  {
    slug: 'bilirubin-erhoeht',
    gruppe: 'Leber & Enzyme',
    title: 'Bilirubin erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-23',
    deck: 'Bilirubin entsteht beim Abbau roter Blutkörperchen und wird über Leber und Galle ausgeschieden. Warum der Wert erhöht sein kann und wie er eingeordnet wird.',
    primaryPurpose: 'Einordnung des Einzelwerts Bilirubin; der Sammelbefund bleibt bei leberwerte-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Generisches "Leberwerte erhöht" gehört leberwerte-erhoeht (dort ist Bilirubin ein Listenpunkt), Gamma-GT gehört gamma-gt-erhoeht. Diese Seite besitzt NUR den Bilirubin-Intent; keine allgemeine Lebererkrankungs-Seite.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hepatologie)',
    shortAnswerHtml: `<p>Bilirubin ist ein gelblicher Farbstoff, der beim Abbau roter Blutkörperchen entsteht. Die Leber verarbeitet ihn und scheidet ihn über die Galle aus. Steigt er im Blut, kann das am vermehrten Abbau von Blutzellen, an der Leber selbst oder am Galleabfluss liegen, und manchmal an einer harmlosen angeborenen Veranlagung. Ein erhöhter Einzelwert ist deshalb <strong>ein Hinweis, keine Diagnose</strong>.</p>`,
    bodyHtml: `<h2>Was ist Bilirubin?</h2>
<p>Beim Abbau alter roter Blutkörperchen entsteht zunächst sogenanntes indirektes (unkonjugiertes) Bilirubin. Die Leber wandelt es in eine wasserlösliche Form um, das direkte (konjugierte) Bilirubin, und gibt es an die Galle ab. Das Labor kann Gesamtbilirubin und diese beiden Anteile getrennt ausweisen; die Verteilung hilft der Ärztin bei der Einordnung, wo im Ablauf etwas hakt.</p>
<h2>Warum kann Bilirubin erhöht sein?</h2>
<ul>
<li><strong>Vermehrter Abbau roter Blutkörperchen:</strong> etwa nach einem grossen Bluterguss oder bei einer Hämolyse; dann steigt vor allem der indirekte Anteil.</li>
<li><strong>Die Leber selbst:</strong> Entzündungen oder andere Lebererkrankungen können die Verarbeitung beeinträchtigen.</li>
<li><strong>Der Galleabfluss:</strong> staut sich Galle, etwa durch Gallensteine, steigt vor allem der direkte Anteil.</li>
<li><strong>Harmlose Veranlagung:</strong> beim häufigen Gilbert-Syndrom (Morbus Meulengracht) ist das indirekte Bilirubin zeitweise leicht erhöht, besonders bei Fasten, Infekten oder Stress, ohne Krankheitswert. Diese Einordnung trifft die Ärztin, nicht die Tabelle im Internet.</li>
</ul>
<h2>Warum die Begleitwerte zählen</h2>
<p>Ein Bilirubinwert wird praktisch nie allein beurteilt. Aussagekräftig wird er zusammen mit den übrigen Leberwerten wie ALT, AST, Gamma-GT und alkalischer Phosphatase sowie dem Blutbild. Das Gesamtbild erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/">Leberwerte erhöht</a>; den empfindlichen Gallenwege-Wert beschreibt <a href="/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/">Gamma-GT erhöht</a>.</p>`,
    notProofHtml: `<p>Ein erhöhtes Bilirubin beweist keine bestimmte Leber- oder Gallenerkrankung und keine Blutkrankheit. Ein leicht erhöhter Einzelwert bei sonst normalen Leberwerten hat oft eine harmlose Erklärung. Umgekehrt schliesst ein normales Bilirubin eine Lebererkrankung nicht aus.</p>`,
    followUpHtml: `<p>Üblich sind die Aufschlüsselung in direktes und indirektes Bilirubin, die übrigen Leberwerte, ein Blutbild und je nach Bild ein <strong>Ultraschall</strong> von Leber und Gallenwegen oder eine Kontrollmessung. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah medizinisch beurteilt gehören: Gelbfärbung von Haut oder Augen, sehr dunkler Urin oder heller, entfärbter Stuhl, starke Schmerzen im rechten Oberbauch, Fieber mit Schüttelfrost oder ausgeprägter Juckreiz am ganzen Körper. Solche Zeichen können auf einen Gallestau oder eine relevante Lebererkrankung hinweisen.</p>`,
    integrativeContextHtml: `<p>Bilirubin gehört in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert den Wert nicht und leitet daraus keine Diagnosen ab. Erst wenn die Ursache ärztlich geklärt ist, kann sich die Frage nach einer komplementären Begleitung konkreter Beschwerden stellen.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
      { href: '/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/', label: 'Gamma-GT erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'lymphozyten-erhoeht',
    gruppe: 'Blutbild',
    title: 'Lymphozyten erhöht: Was bedeutet das?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-23',
    deck: 'Lymphozyten sind eine Untergruppe der weissen Blutkörperchen. Warum sie erhöht sein können, was relative von absoluten Werten unterscheidet und was ein Einzelwert nicht beweist.',
    primaryPurpose: 'Einordnung der Leukozyten-Untergruppe Lymphozyten; der Gesamtwert bleibt bei leukozyten-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Generisches "Leukozyten erhöht" gehört leukozyten-erhoeht. Diese Seite besitzt NUR den Subtyp Lymphozyten und erklärt die Zugehörigkeit explizit; Schwester-Seite neutrophile-erhoeht.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Lymphozyten sind eine Untergruppe der weissen Blutkörperchen (Leukozyten) und Teil der spezifischen Immunabwehr. Erhöhte Lymphozyten sind am häufigsten eine <strong>Reaktion auf Infekte, besonders Virusinfekte</strong>, und normalisieren sich danach wieder. Ein einzelner erhöhter Wert ist keine Diagnose; entscheidend sind Gesamtbild, Verlauf und die übrigen Blutwerte.</p>`,
    bodyHtml: `<h2>Was sind Lymphozyten?</h2>
<p>Lymphozyten erkennen Krankheitserreger gezielt und bilden das immunologische Gedächtnis. Im Differenzialblutbild machen sie bei Erwachsenen typischerweise einen guten Viertel bis gut ein Drittel der Leukozyten aus; bei Kindern ist ihr Anteil natürlicherweise höher. Den übergeordneten Gesamtwert erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/">Leukozyten erhöht</a>.</p>
<h2>Relativ oder absolut erhöht?</h2>
<p>Das Labor weist Lymphozyten als Prozentanteil und als absolute Zahl aus. Ein hoher Prozentwert bei normaler Gesamtzahl (relative Lymphozytose) entsteht oft nur, weil eine andere Zellgruppe vorübergehend niedrig ist. Aussagekräftiger ist die absolute Zahl. Diese Unterscheidung ist einer der häufigsten Gründe, warum ein Laborbericht bedrohlicher aussieht, als er ist.</p>
<h2>Warum können Lymphozyten erhöht sein?</h2>
<ul>
<li><strong>Virusinfekte:</strong> die häufigste Erklärung, von banalen Atemwegsinfekten bis zum Pfeifferschen Drüsenfieber; die Erhöhung kann dem Infekt einige Wochen nachlaufen.</li>
<li><strong>Andere Infektionen und Reizungen des Immunsystems:</strong> auch bestimmte bakterielle und chronische Infektionen verändern das Bild.</li>
<li><strong>Anhaltend deutlich erhöhte Werte:</strong> deutlich und dauerhaft erhöhte absolute Lymphozytenzahlen ohne Infekt gehören abgeklärt; dahinter können auch Erkrankungen des blutbildenden Systems stehen. Ein einzelner Wert ist dafür kein Beleg, ein unklarer Verlauf aber ein Grund für die Kontrolle.</li>
</ul>
<h2>Einzelwert oder Verlauf?</h2>
<p>Für die Einordnung zählen der Referenzbereich deines Labors, dein Alter, aktuelle oder kürzliche Infekte, die absolute Zahl, das übrige Blutbild inklusive <a href="/gesundheitsbibliothek/befunde-werte/neutrophile-erhoeht/">Neutrophilen</a> und der Verlauf über eine Kontrollmessung. Häufig wird schlicht nach einigen Wochen nachgemessen.</p>`,
    notProofHtml: `<p>Erhöhte Lymphozyten beweisen keine bestimmte Infektion und insbesondere keine Leukämie oder andere Bluterkrankung. Sie zeigen eine Aktivität der spezifischen Abwehr an, mehr nicht. Auch normale Werte schliessen eine Erkrankung nicht in jedem Fall aus.</p>`,
    followUpHtml: `<p>Üblich sind das Gespräch über kürzliche Infekte und Medikamente, eine <strong>Kontrolle des Blutbilds</strong> nach einigen Wochen und nur bei auffälligem Verlauf oder Begleitbefunden weitere gezielte Untersuchungen. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören erhöhte Lymphozyten zusammen mit anhaltendem Fieber, Nachtschweiss, ungewolltem Gewichtsverlust, geschwollenen Lymphknoten über mehrere Wochen, ausgeprägter Abgeschlagenheit oder auffälliger Blutungs- und Infektneigung.</p>`,
    integrativeContextHtml: `<p>Blutbild-Interpretation gehört in die schulmedizinische Beurteilung: Die chinesische Medizin übersetzt Lymphozytenzahlen nicht in eigene Diagnosen. Eine komplementäre Begleitung ist, wenn überhaupt, ein Thema nach der ärztlichen Einordnung.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/', label: 'Leukozyten erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/neutrophile-erhoeht/', label: 'Neutrophile erhöht: Was bedeutet das?' },
    ],
  },
  {
    slug: 'neutrophile-erhoeht',
    gruppe: 'Blutbild',
    title: 'Neutrophile erhöht: Was bedeutet das?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-23',
    deck: 'Neutrophile Granulozyten sind die grösste Untergruppe der weissen Blutkörperchen. Warum sie erhöht sein können und wie der Befund eingeordnet wird.',
    primaryPurpose: 'Einordnung der Leukozyten-Untergruppe Neutrophile; der Gesamtwert bleibt bei leukozyten-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Generisches "Leukozyten erhöht" gehört leukozyten-erhoeht, Lymphozyten gehören lymphozyten-erhoeht. Diese Seite besitzt NUR den Subtyp Neutrophile.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Neutrophile Granulozyten sind die zahlreichste Untergruppe der weissen Blutkörperchen (Leukozyten) und die schnelle Eingreiftruppe gegen Bakterien. Ihr Wert steigt bei <strong>akuten Entzündungen und Infekten, aber auch bei körperlichem Stress</strong>, nach Belastung, durch Rauchen oder bestimmte Medikamente wie Kortison. Ein erhöhter Einzelwert ist damit ein unspezifisches Aktivitätszeichen, keine Diagnose.</p>`,
    bodyHtml: `<h2>Was sind Neutrophile?</h2>
<p>Neutrophile machen bei Erwachsenen meist rund die Hälfte bis zwei Drittel der Leukozyten aus. Sie wandern als erste Zellen in entzündetes Gewebe ein und nehmen Erreger auf. Steigt ihre Zahl, steigt meist auch die Gesamtzahl der Leukozyten; die Übersicht dazu gibt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/">Leukozyten erhöht</a>.</p>
<h2>Warum können Neutrophile erhöht sein?</h2>
<ul>
<li><strong>Akute Infektionen und Entzündungen:</strong> besonders bakterielle Infekte sind die klassische Erklärung.</li>
<li><strong>Körperlicher Stress:</strong> intensive Anstrengung, Verletzungen, Operationen und auch starke Aufregung mobilisieren kurzfristig Neutrophile aus den Gefässwänden; der Wert kann dadurch vorübergehend steigen, ohne dass eine Erkrankung vorliegt.</li>
<li><strong>Rauchen:</strong> erhöht die Werte häufig chronisch leicht.</li>
<li><strong>Medikamente:</strong> Kortisonpräparate sind eine bekannte Ursache erhöhter Neutrophilenzahlen.</li>
<li><strong>Seltenere Ursachen:</strong> dauerhaft deutlich erhöhte Werte ohne Erklärung gehören abgeklärt; dafür gibt es im Blutbild in der Regel weitere Hinweise.</li>
</ul>
<h2>Relativ, absolut und das Differenzialblutbild</h2>
<p>Wie bei den <a href="/gesundheitsbibliothek/befunde-werte/lymphozyten-erhoeht/">Lymphozyten</a> gilt: Der Prozentanteil allein kann täuschen, aussagekräftiger ist die absolute Zahl. Beurteilt wird der Wert zusammen mit der Leukozyten-Gesamtzahl, den übrigen Zellreihen und Entzündungswerten wie dem <a href="/gesundheitsbibliothek/befunde-werte/crp-erhoeht/">CRP</a>.</p>`,
    notProofHtml: `<p>Erhöhte Neutrophile beweisen keine bestimmte Infektion, keinen Entzündungsort und keine Bluterkrankung. Nach Belastung, bei Stress oder unter Kortison sind erhöhte Werte erwartbar. Auch hier gilt der Umkehrschluss nicht: Normale Neutrophile schliessen eine Infektion nicht sicher aus.</p>`,
    followUpHtml: `<p>Häufige nächste Schritte: die klinische Untersuchung, der Abgleich mit Beschwerden, Medikamenten und Rauchstatus, eine <strong>Kontrolle des Blutbilds</strong> in Ruhe und nur bei konkreten Hinweisen weitere gezielte Diagnostik. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören erhöhte Neutrophile zusammen mit hohem oder anhaltendem Fieber, Schüttelfrost, starken lokalisierten Schmerzen, rascher Verschlechterung des Allgemeinzustands oder Atemnot; das Muster kann auf eine relevante bakterielle Infektion hinweisen.</p>`,
    integrativeContextHtml: `<p>Auch hier gilt: Die Interpretation des Blutbilds ist schulmedizinische Aufgabe. Die chinesische Medizin leitet aus Neutrophilenzahlen keine eigenen Diagnosen ab und ersetzt keine Infekt-Abklärung.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/', label: 'Leukozyten erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/lymphozyten-erhoeht/', label: 'Lymphozyten erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'thrombozyten-erhoeht',
    gruppe: 'Blutbild',
    title: 'Thrombozyten erhöht: Was bedeutet das?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-23',
    deck: 'Thrombozyten sind die Blutplättchen der Gerinnung. Warum ihre Zahl erhöht sein kann, welche Rolle Entzündungen und Eisenmangel spielen und was ein Einzelwert nicht beweist.',
    primaryPurpose: 'Einordnung des Blutbild-Befunds erhöhte Thrombozyten (Thrombozytose), keine Gerinnungs- oder Bluterkrankungs-Seite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner (geprüft; kein Blutbild-Leaf zu Thrombozyten, keine Gerinnungs-Seite). Vorsichtige, nicht alarmierende Rahmung; reaktive Ursachen im Vordergrund.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Thrombozyten (Blutplättchen) verschliessen kleine Gefässverletzungen und starten die Blutgerinnung. Eine erhöhte Zahl (Thrombozytose) ist im Alltag <strong>meist reaktiv</strong>: eine Begleitreaktion auf Entzündungen, Infekte, Eisenmangel, Blutungen oder Operationen, die sich mit der Ursache zurückbildet. Ein einzelner erhöhter Wert ist keine Diagnose und in aller Regel kein Notfall.</p>`,
    bodyHtml: `<h2>Was sind Thrombozyten?</h2>
<p>Blutplättchen entstehen im Knochenmark und leben rund eine gute Woche. Ihre Zahl schwankt auch bei Gesunden und reagiert empfindlich auf alles, was das Knochenmark stimuliert, von Entzündungsbotenstoffen bis zu Blutverlust.</p>
<h2>Warum können Thrombozyten erhöht sein?</h2>
<ul>
<li><strong>Entzündungen und Infekte:</strong> die häufigste Erklärung; die Plättchenzahl steigt als Teil der Akutreaktion, oft zusammen mit Entzündungswerten wie dem <a href="/gesundheitsbibliothek/befunde-werte/crp-erhoeht/">CRP</a>.</li>
<li><strong>Eisenmangel:</strong> reduzierte Eisenspeicher können mit erhöhten Thrombozyten einhergehen; die Einordnung des passenden Laborwerts erklärt <a href="/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/">Ferritin zu niedrig</a>.</li>
<li><strong>Nach Blutungen, Operationen oder Verletzungen:</strong> das Knochenmark produziert vorübergehend mehr.</li>
<li><strong>Nach Milzentfernung:</strong> die Milz baut normalerweise Plättchen ab; fehlt sie, liegen die Werte höher.</li>
<li><strong>Seltener:</strong> dauerhafte, deutliche Erhöhungen ohne erkennbare Ursache können auf eine Erkrankung des blutbildenden Systems hinweisen und gehören hämatologisch beurteilt. Ein einzelner Wert belegt das nicht.</li>
</ul>
<h2>Vorübergehend oder anhaltend?</h2>
<p>Die wichtigste Frage ist der Verlauf: Eine reaktive Thrombozytose bildet sich zurück, wenn Infekt, Entzündung oder Eisenmangel behandelt sind. Deshalb wird häufig zuerst die naheliegende Ursache angegangen und der Wert danach kontrolliert, zusammen mit dem übrigen Blutbild und den Eisenwerten.</p>`,
    notProofHtml: `<p>Erhöhte Thrombozyten beweisen keine Gerinnungsstörung, keine drohende Thrombose und keine Knochenmarkerkrankung. Der Wert zeigt zunächst nur, dass das Knochenmark stimuliert ist; die häufigsten Auslöser sind vorübergehend. Auch ein normaler Wert garantiert umgekehrt keine normale Gerinnung.</p>`,
    followUpHtml: `<p>Üblich sind die Suche nach der reaktiven Ursache (Infekt, Entzündung, Eisenstatus), eine <strong>Kontrollmessung</strong> nach einigen Wochen und erst bei anhaltend deutlich erhöhten Werten ohne Erklärung eine gezielte hämatologische Abklärung. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Unabhängig vom Laborwert rasch beurteilt gehören Zeichen einer Thrombose oder Embolie: einseitig geschwollenes, schmerzendes Bein, plötzliche Atemnot, Brustschmerz oder akute neurologische Ausfälle; im Notfall Telefon 144. Zügig besprechen solltest du auch wiederholt deutlich erhöhte Werte ohne erkennbaren Anlass.</p>`,
    integrativeContextHtml: `<p>Blutbild und Gerinnung gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert Thrombozytenzahlen nicht und behandelt keine Laborwerte. Eine komplementäre Begleitung ist höchstens nach der ärztlichen Einordnung ein Thema.</p>`,
    relatedConditions: [{ href: '/beschwerden/eisenmangel/', label: 'Eisenmangel' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/', label: 'Leukozyten erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/', label: 'Ferritin zu niedrig: Was bedeutet der Laborwert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'harnsaeure-erhoeht',
    gruppe: 'Stoffwechsel',
    title: 'Harnsäure erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Harnsäure entsteht beim Abbau von Purinen und wird über die Nieren ausgeschieden. Warum der Wert erhöht sein kann und warum das noch keine Gicht bedeutet.',
    primaryPurpose: 'Einordnung des Laborwerts Harnsäure; die Erkrankungsseite bleibt der Owner für Gicht.',
    canonicalIntentOwner: ['/beschwerden/gicht/'],
    overlapNotes: 'Gicht-Erkrankungs-/Behandlungs-Intent gehört /beschwerden/gicht/. Diese Seite beantwortet nur die Laborwert-Frage und verlinkt für Anfall/Behandlung dorthin.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Rheumatologie)',
    shortAnswerHtml: `<p>Harnsäure ist ein Abbauprodukt der Purine, die in jeder Körperzelle und in vielen Lebensmitteln vorkommen. Ausgeschieden wird sie vor allem über die Nieren. Ein erhöhter Wert bedeutet, dass mehr anfällt oder weniger ausgeschieden wird, und ist zunächst nur ein <strong>Laborbefund, keine Erkrankung</strong>: Viele Menschen mit erhöhter Harnsäure bekommen nie einen Gichtanfall.</p>`,
    bodyHtml: `<h2>Was ist Harnsäure?</h2>
<p>Purine stammen aus dem Zellstoffwechsel und aus der Nahrung. Ihr Endprodukt Harnsäure wird zum grössten Teil über die Nieren, zu einem kleineren Teil über den Darm ausgeschieden. Der Blutspiegel ist das Gleichgewicht aus Produktion und Ausscheidung.</p>
<h2>Warum kann die Harnsäure erhöht sein?</h2>
<ul>
<li><strong>Verminderte Ausscheidung:</strong> der häufigste Mechanismus, mitgeprägt von Veranlagung und Nierenfunktion.</li>
<li><strong>Ernährung und Alkohol:</strong> purinreiche Lebensmittel (etwa Innereien, viel Fleisch, bestimmte Fischsorten), Bier und fruktosereiche Süssgetränke können den Spiegel anheben. Die Ernährung ist aber selten die alleinige Erklärung; die Veranlagung wiegt meist schwerer.</li>
<li><strong>Medikamente:</strong> unter anderem bestimmte entwässernde Mittel erhöhen die Harnsäure. Die Medikamentenliste gehört ins ärztliche Gespräch; setze nichts selbstständig ab.</li>
<li><strong>Vermehrter Zellumsatz:</strong> etwa nach Fastenkuren, intensiver Belastung oder bei bestimmten Erkrankungen.</li>
</ul>
<h2>Harnsäure und Gicht</h2>
<p>Dauerhaft hohe Werte können dazu führen, dass sich Harnsäurekristalle in Gelenken ablagern und einen Gichtanfall auslösen, klassisch im Grosszehengrundgelenk. Der Umkehrschluss gilt aber nicht: Ein erhöhter Wert allein ist keine Gicht, und während eines akuten Anfalls kann die Harnsäure sogar normal sein. Was ein Anfall ist und wie er behandelt wird, erklärt die Seite <a href="/beschwerden/gicht/">Gicht</a>.</p>
<h2>Einzelwert oder Verlauf?</h2>
<p>Für die Einordnung zählen der Referenzbereich deines Labors, eine Wiederholungsmessung unter Alltagsbedingungen, deine Nierenwerte und die Frage, ob je Gelenkbeschwerden aufgetreten sind. Ob und ab wann eine dauerhaft erhöhte Harnsäure behandelt wird, ist eine individuelle ärztliche Entscheidung, keine Frage einer Universaltabelle.</p>`,
    notProofHtml: `<p>Ein erhöhter Harnsäurewert beweist keine Gicht, keinen Nierenschaden und keine falsche Ernährung. Er ist ein Risikomarker. Umgekehrt schliesst ein normaler Wert einen Gichtanfall nicht aus.</p>`,
    followUpHtml: `<p>Üblich sind eine <strong>Kontrollmessung</strong>, der Blick auf die <a href="/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/">Nierenwerte</a>, das Gespräch über Medikamente, Ernährung und Alkohol sowie bei Gelenkbeschwerden die gezielte Abklärung. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Rasch ärztlich gehört ein plötzlich stark schmerzendes, geschwollenes, gerötetes und überwärmtes Gelenk, besonders mit Fieber: Das kann ein Gichtanfall sein, aber auch eine Gelenkinfektion, und die Unterscheidung ist dringlich.</p>`,
    integrativeContextHtml: `<p>Die Beurteilung der Harnsäure und die Entscheidung über eine Therapie gehören in die schulmedizinische Betreuung: Die chinesische Medizin interpretiert den Laborwert nicht und ersetzt keine Gichtbehandlung. Eine komplementäre Begleitung ist höchstens nach der ärztlichen Einordnung ein Thema.</p>`,
    relatedConditions: [{ href: '/beschwerden/gicht/', label: 'Gicht' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/', label: 'Nierenwerte erhöht: Was bedeutet der Befund?' },
      { href: '/gesundheitsbibliothek/befunde-werte/cholesterin-erhoeht/', label: 'Cholesterin erhöht: Was bedeutet das?' },
    ],
  },
  {
    slug: 'ferritin-erhoeht',
    gruppe: 'Vitamine & Eisenspeicher',
    title: 'Ferritin erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Ein hoher Ferritinwert bedeutet nicht automatisch Eisenüberladung: Ferritin steigt auch bei Entzündungen und Leberbelastung. So wird der Befund eingeordnet.',
    primaryPurpose: 'Einordnung des Laborwerts Ferritin erhöht; der gegenteilige Befund bleibt bei ferritin-zu-niedrig.',
    canonicalIntentOwner: [],
    overlapNotes: 'Klar getrennt von ferritin-zu-niedrig (leere Speicher): dieser Eintrag besitzt NUR den erhöhten Wert; beide Seiten kreuzverlinkt. Kein Eisenüberladungs-Erkrankungs-Owner vorhanden.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Ferritin ist der Eisenspeicher-Marker, aber ein hoher Wert bedeutet <strong>nicht automatisch zu viel Eisen</strong>. Ferritin gehört zu den Akute-Phase-Proteinen und steigt auch bei Entzündungen, Infekten, Leberbelastung und Stoffwechselerkrankungen. Eine echte Eisenüberladung ist nur eine von mehreren Möglichkeiten; die Unterscheidung braucht weitere Werte, vor allem die Transferrinsättigung und Entzündungsmarker.</p>`,
    bodyHtml: `<h2>Warum Ferritin doppeldeutig ist</h2>
<p>Bei leeren Speichern ist ein tiefes Ferritin recht eindeutig. Beim erhöhten Ferritin ist es umgekehrt kompliziert: Der Wert steigt bei vielem, was mit Eisen nichts zu tun hat. Deshalb ist ein hoher Einzelwert erst einmal ein Anlass zur Einordnung, nicht zur Sorge.</p>
<h2>Häufige Gründe für ein erhöhtes Ferritin</h2>
<ul>
<li><strong>Entzündungen und Infekte:</strong> als Akute-Phase-Protein steigt Ferritin parallel zu Markern wie dem <a href="/gesundheitsbibliothek/befunde-werte/crp-erhoeht/">CRP</a>, auch Wochen nach einem Infekt.</li>
<li><strong>Leber und Stoffwechsel:</strong> eine <a href="/beschwerden/fettleber/">Fettleber</a>, erhöhte <a href="/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/">Leberwerte</a>, regelmässiger Alkoholkonsum und das metabolische Syndrom gehören zu den häufigsten Erklärungen dauerhaft erhöhter Werte.</li>
<li><strong>Eisenüberladung:</strong> etwa bei der erblichen Hämochromatose oder nach vielen Bluttransfusionen. Hier ist typischerweise auch die Transferrinsättigung erhöht; genau deshalb wird sie zur Abklärung mitbestimmt.</li>
<li><strong>Seltenere Ursachen:</strong> ausgeprägt hohe Werte können auf entzündliche oder hämatologische Erkrankungen hinweisen und gehören gezielt abgeklärt.</li>
</ul>
<h2>Welche Werte helfen bei der Einordnung?</h2>
<p>Vor allem die <strong>Transferrinsättigung</strong> (erhöht bei echter Eisenüberladung, meist normal bei Entzündung), Entzündungswerte, Leberwerte und das Blutbild. Erst dieses Set trennt "Eisenproblem" von "Ferritin als Entzündungs- oder Leberzeichen". Der gegenteilige Befund ist hier erklärt: <a href="/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/">Ferritin zu niedrig</a>.</p>`,
    notProofHtml: `<p>Ein erhöhtes Ferritin beweist keine Hämochromatose und keine Eisenüberladung; ohne erhöhte Transferrinsättigung ist Eisen oft gar nicht das Thema. Es beweist auch keine bestimmte Entzündung oder Lebererkrankung. Und: Eisenpräparate einzunehmen oder abzusetzen ist auf Basis dieses Werts allein nie die richtige Konsequenz.</p>`,
    followUpHtml: `<p>Üblich sind die <strong>Transferrinsättigung</strong>, CRP, Leberwerte und Blutbild, eine Kontrollmessung mit Abstand zu Infekten und je nach Konstellation weitere gezielte Abklärung (bei Verdacht auf Hämochromatose auch genetisch). Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zügig besprechen solltest du sehr hohe oder rasch steigende Werte, ein erhöhtes Ferritin zusammen mit deutlich erhöhten Leberwerten, Gelenkschmerzen, ausgeprägter Müdigkeit oder bekannter familiärer Eisenspeicherkrankheit.</p>`,
    integrativeContextHtml: `<p>Die Abklärung eines erhöhten Ferritins gehört in die schulmedizinische Betreuung: Die chinesische Medizin interpretiert den Wert nicht und behandelt keine Eisenüberladung. Eine komplementäre Begleitung ist höchstens nach der ärztlichen Einordnung ein Thema.</p>`,
    relatedConditions: [{ href: '/beschwerden/fettleber/', label: 'Fettleber' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/', label: 'Ferritin zu niedrig: Was bedeutet der Laborwert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
    ],
  },
  {
    slug: 'kalium-zu-hoch',
    gruppe: 'Elektrolyte',
    title: 'Kalium zu hoch: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Kalium steuert die elektrische Erregbarkeit von Herz, Nerven und Muskeln. Warum der Wert erhöht sein kann, welche Rolle die Probe selbst spielt und wann es dringlich wird.',
    primaryPurpose: 'Einordnung des Laborwerts Kalium erhöht (Hyperkaliämie), keine Nieren- oder Herz-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner (kein Elektrolyt-Leaf vorhanden). Sicherheitsrelevanter Wert: dringliche Konstellationen klar benannt, keine individuellen Grenzwerte, keine Anleitung zur Eigen-Manipulation von Elektrolyten.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Nephrologie)',
    shortAnswerHtml: `<p>Kalium ist ein Elektrolyt, das die elektrische Erregbarkeit von Herz, Nerven und Muskeln mitsteuert; reguliert wird es vor allem über die Nieren. Ein erhöhter Wert (Hyperkaliämie) hat viele mögliche Erklärungen, von einem <strong>Messartefakt bei der Blutentnahme</strong> über Medikamente bis zur eingeschränkten Nierenfunktion. Weil deutlich erhöhtes Kalium den Herzrhythmus beeinflussen kann, gehört der Befund immer zeitnah ärztlich eingeordnet.</p>`,
    bodyHtml: `<h2>Was macht Kalium im Körper?</h2>
<p>Der grösste Teil des Kaliums liegt in den Körperzellen; im Blut wird nur ein kleiner Ausschnitt gemessen. Schon kleine Verschiebungen verändern die elektrische Erregbarkeit von Muskel- und Herzzellen, deshalb hält der Körper den Blutspiegel normalerweise eng konstant.</p>
<h2>Warum kann Kalium erhöht sein?</h2>
<ul>
<li><strong>Die Probe selbst:</strong> überraschend häufig. Platzen rote Blutkörperchen bei oder nach der Entnahme (Hämolyse), etwa durch langes Stauen oder Transport, wird Kalium aus den Zellen frei und der Wert erscheint falsch hoch. Deshalb wird ein unerwartet hoher Wert oft zuerst mit einer frischen Probe kontrolliert.</li>
<li><strong>Nierenfunktion:</strong> arbeiten die Nieren eingeschränkt, wird weniger Kalium ausgeschieden; die Einordnung dazu liefert die Seite <a href="/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/">Nierenwerte erhöht</a>.</li>
<li><strong>Medikamente:</strong> mehrere häufig eingesetzte Blutdruck- und Herzmedikamente sowie bestimmte Schmerzmittel und kaliumsparende Entwässerungsmittel können den Spiegel anheben, besonders in Kombination. Nichts selbstständig absetzen, aber die Liste ärztlich besprechen.</li>
<li><strong>Weitere Ursachen:</strong> unter anderem hormonelle Störungen oder grosser Zellzerfall nach Verletzungen.</li>
</ul>
<h2>Warum der Wert ernst genommen wird</h2>
<p>Deutlich erhöhtes Kalium kann Herzrhythmusstörungen begünstigen, oft ohne Vorwarnung durch Beschwerden. Genau deshalb entscheidet die Ärztin je nach Höhe, Verlauf und Begleitumständen über das Tempo der Abklärung, manchmal inklusive EKG. Wichtig für dich: Der richtige Umgang mit einem erhöhten Wert ist die ärztliche Kontrolle, nicht die Eigenbehandlung; verändere weder Medikamente noch Elektrolyt- oder Salzersatzprodukte auf eigene Faust.</p>`,
    notProofHtml: `<p>Ein einzelner erhöhter Kaliumwert beweist keine Nierenerkrankung und keine Herzgefährdung; nicht selten steckt ein Probenartefakt dahinter. Umgekehrt ist ein normales Kalium keine Garantie: Beschwerden wie Herzstolpern haben ihre eigene Abklärung verdient.</p>`,
    followUpHtml: `<p>Üblich sind eine <strong>zeitnahe Kontrollmessung</strong> mit sauberer Abnahme, Nierenwerte, die Durchsicht der Medikamente und je nach Höhe des Werts ein EKG. Wie schnell das geschehen soll, legt die Ärztin anhand des konkreten Werts fest. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Rasch medizinisch gehören ein deutlich erhöhter Wert zusammen mit Herzstolpern oder sehr langsamem Puls, Muskelschwäche, Kribbeln, Übelkeit oder wenn gleichzeitig die Nierenwerte stark angestiegen sind. Bei Ohnmacht, Brustschmerz oder ausgeprägter Atemnot gilt in der Schweiz: Notruf 144.</p>`,
    integrativeContextHtml: `<p>Elektrolyte gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert Kaliumwerte nicht, und kein komplementäres Verfahren ersetzt deren Kontrolle oder Behandlung.</p>`,
    relatedConditions: [{ href: '/beschwerden/bluthochdruck/', label: 'Bluthochdruck' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/natrium-zu-hoch/', label: 'Natrium zu hoch: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/', label: 'Nierenwerte erhöht: Was bedeutet der Befund?' },
      { href: '/gesundheitsbibliothek/befunde-werte/blutdruck-140-90/', label: 'Blutdruck 140/90: Was bedeutet dieser Wert?' },
    ],
  },
  {
    slug: 'alkalische-phosphatase-erhoeht',
    gruppe: 'Leber & Enzyme',
    title: 'Alkalische Phosphatase erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Die alkalische Phosphatase (AP) stammt vor allem aus Leber, Gallenwegen und Knochen. Warum der Wert erhöht sein kann und wie er eingeordnet wird.',
    primaryPurpose: 'Einordnung des Einzelwerts alkalische Phosphatase; der Sammelbefund bleibt bei leberwerte-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Generisches "Leberwerte erhöht" gehört leberwerte-erhoeht (AP dort Listenpunkt, jetzt verlinkt); Gamma-GT eigener Owner und wichtigster Abgrenzungswert. Diese Seite besitzt NUR den AP-Intent.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hepatologie)',
    shortAnswerHtml: `<p>Die alkalische Phosphatase (AP) ist ein Enzym, das vor allem aus zwei Quellen stammt: aus <strong>Leber und Gallenwegen</strong> und aus dem <strong>Knochen</strong>. Ein erhöhter Wert kann deshalb ganz Unterschiedliches bedeuten, von Gallenwegsreizung über Knochenumbau bis zu normalen Lebensphasen wie Wachstum oder Schwangerschaft. Erst die Begleitwerte zeigen, aus welcher Richtung die Erhöhung kommt.</p>`,
    bodyHtml: `<h2>Woher kommt die alkalische Phosphatase?</h2>
<p>Das Enzym kommt in mehreren Geweben vor. Im Laboralltag relevant sind vor allem die Leber-/Gallenwegs-Form und die Knochen-Form; kleinere Beiträge liefern Darm und in der Schwangerschaft die Plazenta. Bei Kindern und Jugendlichen ist die AP wegen des Knochenwachstums natürlicherweise deutlich höher, und in der Schwangerschaft ist ein Anstieg normal.</p>
<h2>Warum kann die AP erhöht sein?</h2>
<ul>
<li><strong>Gallenwege und Leber:</strong> ein gestörter Galleabfluss oder Lebererkrankungen; typischerweise steigt dann auch die <a href="/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/">Gamma-GT</a>, oft auch das <a href="/gesundheitsbibliothek/befunde-werte/bilirubin-erhoeht/">Bilirubin</a>.</li>
<li><strong>Knochen:</strong> erhöhter Knochenumbau, etwa nach Brüchen, bei Vitamin-D-Mangel oder bestimmten Knochenerkrankungen. In dieser Konstellation bleibt die Gamma-GT meist normal.</li>
<li><strong>Physiologisch:</strong> Wachstum bei Kindern und Jugendlichen, Schwangerschaft.</li>
<li><strong>Weitere Ursachen:</strong> seltener Medikamente oder andere Erkrankungen; dafür gibt es meist zusätzliche Hinweise.</li>
</ul>
<h2>Warum die Gamma-GT der Schlüssel ist</h2>
<p>Die praktisch wichtigste Frage lautet: Kommt die Erhöhung aus Leber/Galle oder aus dem Knochen? Eine gleichzeitig erhöhte Gamma-GT spricht für Leber/Galle, eine normale eher für den Knochen. Das Gesamtbild der Leberwerte erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/">Leberwerte erhöht</a>.</p>`,
    notProofHtml: `<p>Eine erhöhte AP beweist keine bestimmte Leber-, Gallen- oder Knochenerkrankung. Bei Jugendlichen und Schwangeren ist sie häufig schlicht normal. Umgekehrt schliesst ein normaler Wert eine Erkrankung nicht sicher aus.</p>`,
    followUpHtml: `<p>Üblich sind die Begleitwerte (Gamma-GT, Bilirubin, ALT/AST, je nach Frage Vitamin D und Knochenmarker), eine <strong>Kontrollmessung</strong> und je nach Richtung ein Ultraschall von Leber und Gallenwegen oder eine gezielte Knochenabklärung. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören eine erhöhte AP zusammen mit Gelbfärbung von Haut oder Augen, dunklem Urin, hellem Stuhl, starken Oberbauch- oder neu aufgetretenen Knochenschmerzen sowie Fieber mit Schmerzen im rechten Oberbauch.</p>`,
    integrativeContextHtml: `<p>Auch hier gilt: Die Interpretation gehört in die schulmedizinische Beurteilung. Die chinesische Medizin leitet aus der alkalischen Phosphatase keine eigenen Diagnosen ab.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
      { href: '/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/', label: 'Gamma-GT erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/bilirubin-erhoeht/', label: 'Bilirubin erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'gpt-alt-erhoeht',
    gruppe: 'Leber & Enzyme',
    title: 'GPT (ALT) erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'GPT und ALT bezeichnen dasselbe Leberenzym. Warum der Wert erhöht sein kann, welche Rolle Medikamente und Stoffwechsel spielen und wie er eingeordnet wird.',
    primaryPurpose: 'Einordnung des Einzelwerts GPT/ALT (ein Enzym, eine Seite); der Sammelbefund bleibt bei leberwerte-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'GPT und ALT sind Synonyme (alte/neue Nomenklatur) und bewusst EIN Owner, keine zwei URLs. Generisches "Leberwerte erhöht" bleibt beim Umbrella (ALT dort Listenpunkt, jetzt verlinkt); Schwester-Seite got-ast-erhoeht.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hepatologie)',
    shortAnswerHtml: `<p>GPT (Glutamat-Pyruvat-Transaminase) und ALT (Alanin-Aminotransferase) sind <strong>zwei Namen für dasselbe Enzym</strong>: die ältere und die internationale Bezeichnung. Es kommt besonders konzentriert in Leberzellen vor. Ein erhöhter Wert spricht deshalb für eine Reizung oder Schädigung von Leberzellen, sagt aber nicht, wodurch, und ist für sich allein keine Diagnose.</p>`,
    bodyHtml: `<h2>GPT oder ALT: Warum zwei Namen?</h2>
<p>Auf Schweizer Laborbefunden steht je nach Labor GPT, ALT oder ALAT, gemeint ist immer dasselbe Enzym. Es arbeitet im Stoffwechsel der Leberzellen und gelangt ins Blut, wenn Leberzellen gestresst oder geschädigt werden. Von den gängigen Leberwerten ist es der leberspezifischste.</p>
<h2>Warum kann die GPT/ALT erhöht sein?</h2>
<ul>
<li><strong>Fettleber und Stoffwechsel:</strong> die häufigste Erklärung dauerhaft leicht erhöhter Werte, oft zusammen mit Übergewicht, erhöhten Blutfetten oder Blutzucker; mehr unter <a href="/beschwerden/fettleber/">Fettleber</a>.</li>
<li><strong>Medikamente und Substanzen:</strong> zahlreiche Wirkstoffe, auch rezeptfreie Präparate und pflanzliche Produkte, können die Leberwerte anheben. Die vollständige Liste gehört ins ärztliche Gespräch.</li>
<li><strong>Alkohol:</strong> regelmässiger Konsum belastet die Leberzellen; typischerweise steigt dann auch die <a href="/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/">Gamma-GT</a>.</li>
<li><strong>Virusinfektionen und andere Lebererkrankungen:</strong> von akuten Hepatitiden bis zu selteneren Ursachen; deutlich erhöhte Werte werden entsprechend gezielt abgeklärt.</li>
<li><strong>Muskel und Belastung:</strong> intensives Training kann die Transaminasen vorübergehend anheben, die GPT/ALT allerdings weniger stark als die <a href="/gesundheitsbibliothek/befunde-werte/got-ast-erhoeht/">GOT/AST</a>.</li>
</ul>
<h2>Höhe und Verlauf</h2>
<p>Leicht erhöhte Werte bei gutem Befinden werden häufig zuerst kontrolliert, mit Blick auf Gewicht, Alkohol und Medikamente. Mehrfach erhöhte oder steigende Werte werden gezielter abgeklärt. Wie die einzelnen Werte zusammenspielen, zeigt die Übersicht <a href="/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/">Leberwerte erhöht</a>.</p>`,
    notProofHtml: `<p>Eine erhöhte GPT/ALT beweist keine bestimmte Lebererkrankung und sagt nicht, wie gut die Leber insgesamt arbeitet. Ein einzelner leicht erhöhter Wert kann eine Momentaufnahme sein. Umgekehrt können relevante Lebererkrankungen mit nur gering veränderten Werten einhergehen.</p>`,
    followUpHtml: `<p>Üblich sind eine <strong>Kontrollmessung</strong>, die übrigen Leberwerte (GOT/AST, Gamma-GT, alkalische Phosphatase, Bilirubin), das Gespräch über Medikamente, Alkohol und Stoffwechselfaktoren und je nach Bild ein Ultraschall. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören stark erhöhte Werte sowie erhöhte Werte zusammen mit Gelbfärbung von Haut oder Augen, dunklem Urin, starken Oberbauchschmerzen, ausgeprägter Übelkeit oder deutlicher allgemeiner Verschlechterung.</p>`,
    integrativeContextHtml: `<p>Leberwerte gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert die GPT/ALT nicht, und der TCM-Begriff Leber ist nicht mit dem Laborwert gleichzusetzen.</p>`,
    relatedConditions: [{ href: '/beschwerden/fettleber/', label: 'Fettleber' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
      { href: '/gesundheitsbibliothek/befunde-werte/got-ast-erhoeht/', label: 'GOT (AST) erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/', label: 'Gamma-GT erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'got-ast-erhoeht',
    gruppe: 'Leber & Enzyme',
    title: 'GOT (AST) erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'GOT und AST bezeichnen dasselbe Enzym, das in Leber UND Muskulatur vorkommt. Warum der Wert erhöht sein kann und warum er weniger leberspezifisch ist als die GPT.',
    primaryPurpose: 'Einordnung des Einzelwerts GOT/AST (ein Enzym, eine Seite); der Sammelbefund bleibt bei leberwerte-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'GOT und AST sind Synonyme und bewusst EIN Owner. Schwester-Seite gpt-alt-erhoeht (leberspezifischer); Umbrella bleibt leberwerte-erhoeht. Keine Selbstdiagnose-Formeln (De-Ritis nur als Konzept erwähnt, ohne Rechenanleitung).',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hepatologie)',
    shortAnswerHtml: `<p>GOT (Glutamat-Oxalacetat-Transaminase) und AST (Aspartat-Aminotransferase) sind <strong>zwei Namen für dasselbe Enzym</strong>. Anders als die GPT/ALT kommt es nicht nur in der Leber vor, sondern auch in Skelettmuskulatur, Herzmuskel und anderen Geweben. Ein erhöhter Wert kann deshalb von der Leber stammen, aber genauso vom Muskel, etwa nach intensivem Training.</p>`,
    bodyHtml: `<h2>GOT oder AST: Warum zwei Namen?</h2>
<p>Wie bei GPT/ALT handelt es sich um die ältere deutsche und die internationale Bezeichnung; auf Befunden steht auch ASAT. Wichtig ist die Herkunftsfrage: Das Enzym sitzt in mehreren Geweben, deshalb ist es weniger leberspezifisch als die <a href="/gesundheitsbibliothek/befunde-werte/gpt-alt-erhoeht/">GPT/ALT</a>.</p>
<h2>Warum kann die GOT/AST erhöht sein?</h2>
<ul>
<li><strong>Leber:</strong> dieselben Ursachen wie bei der GPT/ALT, von Fettleber über Medikamente und Alkohol bis zu Virusinfektionen; meist sind dann beide Transaminasen erhöht.</li>
<li><strong>Muskel:</strong> intensives Krafttraining, ein Muskelkater nach ungewohnter Belastung, Verletzungen oder Muskelerkrankungen können die GOT/AST deutlich anheben, ohne dass die Leber beteiligt ist.</li>
<li><strong>Herz:</strong> historisch wurde der Wert zur Infarktdiagnostik genutzt; heute übernehmen das spezifischere Marker, die Herkunft bleibt aber möglich.</li>
<li><strong>Weitere Ursachen:</strong> unter anderem eine Hämolyse der Blutprobe kann den Wert verfälschen.</li>
</ul>
<h2>Zusammenspiel mit der GPT/ALT</h2>
<p>Ärztinnen betrachten beide Transaminasen zusammen: Das Verhältnis der beiden Werte (in der Fachsprache De-Ritis-Quotient) und die Begleitwerte geben Hinweise auf die wahrscheinliche Herkunft und Schwere. Für die Selbstinterpretation taugt das Verhältnis nicht; ohne Kontext führt es eher in die Irre. Das Gesamtbild erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/">Leberwerte erhöht</a>.</p>`,
    notProofHtml: `<p>Eine erhöhte GOT/AST beweist keine Lebererkrankung: Nach dem Training ist sie ein erwartbarer Muskelbefund. Sie beweist auch keinen Herzinfarkt und keine bestimmte Diagnose. Umgekehrt schliessen normale Werte eine Lebererkrankung nicht sicher aus.</p>`,
    followUpHtml: `<p>Üblich sind eine <strong>Kontrollmessung ohne vorherige intensive Belastung</strong>, GPT/ALT und die übrigen Leberwerte, bei Muskelverdacht die Kreatinkinase und je nach Bild ein Ultraschall. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören stark erhöhte Werte, erhöhte Werte mit Gelbfärbung, dunklem Urin oder starken Oberbauchschmerzen sowie Muskelschmerzen mit auffallend dunklem Urin nach extremer Belastung. Brustschmerz mit Atemnot ist unabhängig vom Laborwert ein Notfall: Telefon 144.</p>`,
    integrativeContextHtml: `<p>Auch die GOT/AST gehört in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert den Wert nicht und leitet daraus keine Diagnosen ab.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/gpt-alt-erhoeht/', label: 'GPT (ALT) erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
      { href: '/gesundheitsbibliothek/befunde-werte/gamma-gt-erhoeht/', label: 'Gamma-GT erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'vitamin-d-zu-niedrig',
    gruppe: 'Vitamine & Eisenspeicher',
    title: 'Vitamin D zu niedrig: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Gemessen wird meist das 25-OH-Vitamin-D. Was ein tiefer Wert bedeutet, welche Rolle Jahreszeit und Sonne spielen und warum die Dosierung nicht aus dem Internet stammen sollte.',
    primaryPurpose: 'Einordnung des Laborwerts Vitamin D (25-OH) zu niedrig, keine Supplement-Beratungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner (Vitamin D nur als Nebenerwähnung in KS-/Beschwerden-Texten). Keine Dosierungsempfehlungen; Substitution ist ärztliche Entscheidung.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Endokrinologie)',
    shortAnswerHtml: `<p>Im Labor wird üblicherweise das <strong>25-OH-Vitamin-D</strong> gemessen, die Speicherform des Vitamins. Ein tiefer Wert ist in der Schweiz vor allem im Winterhalbjahr häufig, weil der Körper Vitamin D überwiegend über Sonnenlicht in der Haut bildet. Ob und wie ein tiefer Wert ausgeglichen werden soll, hängt von Höhe, Situation und Risikofaktoren ab und gehört ins ärztliche Gespräch, nicht in eine Internet-Dosiertabelle.</p>`,
    bodyHtml: `<h2>Was wird gemessen?</h2>
<p>Vitamin D wirkt vor allem im Kalzium- und Knochenstoffwechsel. Der Bluttest erfasst die Speicherform 25-OH-Vitamin-D; sie bildet Sonnenexposition und Zufuhr der letzten Wochen ab. Referenz- und Zielbereiche unterscheiden sich je nach Labor und Fachgesellschaft, auch deshalb gehört die Bewertung zur Ärztin.</p>
<h2>Warum kann Vitamin D zu niedrig sein?</h2>
<ul>
<li><strong>Wenig Sonne:</strong> der häufigste Grund: Winterhalbjahr, viel Innenraumzeit, bedeckende Kleidung, konsequenter Sonnenschutz, dunklere Hauttypen in nördlichen Breiten.</li>
<li><strong>Ernährung:</strong> über die Nahrung allein (fetter Fisch, Eier, angereicherte Produkte) lässt sich der Bedarf nur begrenzt decken.</li>
<li><strong>Aufnahme und Verwertung:</strong> Magen-Darm-Erkrankungen mit gestörter Fettaufnahme, bestimmte Medikamente sowie Leber- oder Nierenerkrankungen können den Spiegel senken.</li>
<li><strong>Erhöhter Bedarf oder besondere Lebensphasen:</strong> etwa höheres Alter, in dem die Haut weniger Vitamin D bildet.</li>
</ul>
<h2>Warum die Dosierung nicht aus dem Internet stammen sollte</h2>
<p>Wie viel substituiert wird, hängt vom gemessenen Wert, vom Grund des Mangels, von Begleiterkrankungen und Medikamenten ab. Sehr hohe Eigendosierungen über lange Zeit können schaden. Sinnvoll ist deshalb: Wert ärztlich einordnen lassen, Substitution und Kontrolle gemeinsam festlegen.</p>`,
    notProofHtml: `<p>Ein tiefer Vitamin-D-Wert erklärt nicht automatisch Müdigkeit, Muskel- oder Stimmungsbeschwerden; diese haben viele mögliche Ursachen und verdienen eine eigene Einordnung. Umgekehrt schliesst ein normaler Wert eine Knochenstoffwechsel-Frage nicht in jedem Fall ab.</p>`,
    followUpHtml: `<p>Je nach Situation folgen eine <strong>ärztlich begleitete Substitution mit Verlaufskontrolle</strong>, bei Verdacht auf Aufnahme- oder Verwertungsstörungen weitere Werte (etwa Kalzium, Nieren- und Leberwerte) und die Suche nach der Ursache. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Der Wert selbst ist kein Notfall. Ärztlich besprochen gehören ausgeprägte Knochen- oder Muskelschmerzen, Knochenbrüche ohne adäquaten Anlass, wiederholte Stürze im Alter oder ein tiefer Wert bei bekannter Magen-Darm-, Leber- oder Nierenerkrankung.</p>`,
    integrativeContextHtml: `<p>Die Beurteilung des Vitamin-D-Status und die Substitution gehören in die schulmedizinische Betreuung: Die chinesische Medizin interpretiert den Laborwert nicht und ersetzt keine Substitution.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/vitamin-b12-zu-niedrig/', label: 'Vitamin B12 zu niedrig: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/tsh-erhoeht/', label: 'TSH erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'vitamin-b12-zu-niedrig',
    gruppe: 'Vitamine & Eisenspeicher',
    title: 'Vitamin B12 zu niedrig: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Vitamin B12 ist wichtig für Blutbildung und Nerven. Was ein tiefer Wert bedeutet, warum das Serum-B12 allein oft nicht reicht und wann eine Abklärung wichtig ist.',
    primaryPurpose: 'Einordnung des Laborwerts Vitamin B12 zu niedrig, keine Supplement- oder Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner (B12 nur als Nebenerwähnung in KS-Texten, u.a. beine-kribbeln-nachts). Keine Dosierungsempfehlungen; neurologische Relevanz ehrlich benannt.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Vitamin B12 braucht der Körper für die Blutbildung und für die Funktion der Nerven. Ein tiefer Serumwert kann auf einen Mangel hinweisen, ist aber <strong>interpretationsbedürftig</strong>: Das Standard-Serum-B12 hat eine Grauzone, in der erst Zusatzwerte klären, ob wirklich ein Mangel auf Zellebene besteht. Weil ein länger unbehandelter B12-Mangel Nerven schädigen kann, gehört ein tiefer Wert ärztlich eingeordnet.</p>`,
    bodyHtml: `<h2>Wofür braucht der Körper B12?</h2>
<p>B12 steckt praktisch nur in tierischen Lebensmitteln und wird im Endabschnitt des Dünndarms aufgenommen, wofür es einen Hilfsstoff aus dem Magen braucht (Intrinsic Factor). Die Leber speichert B12 über Jahre; ein Mangel entwickelt sich deshalb meist langsam.</p>
<h2>Warum kann B12 zu niedrig sein?</h2>
<ul>
<li><strong>Zufuhr:</strong> vegane und streng vegetarische Ernährung ohne Supplementierung.</li>
<li><strong>Aufnahme:</strong> chronische Magenschleimhautentzündung, die Autoimmunform mit fehlendem Intrinsic Factor, Magen- oder Darmoperationen, chronisch-entzündliche Darmerkrankungen.</li>
<li><strong>Medikamente:</strong> langfristige Magensäureblocker und Metformin können die Aufnahme vermindern; nichts davon selbstständig absetzen, aber ansprechen.</li>
<li><strong>Erhöhter Bedarf:</strong> unter anderem Schwangerschaft und Stillzeit.</li>
</ul>
<h2>Warum der Serumwert allein oft nicht reicht</h2>
<p>Im unteren Graubereich kann das Serum-B12 normal aussehen, obwohl auf Zellebene ein Mangel besteht, und umgekehrt. Je nach Situation zieht die Ärztin deshalb Zusatzwerte wie Holotranscobalamin oder Methylmalonsäure sowie das Blutbild bei. Relevante Begleiterscheinungen können Blutarmut und Nervensymptome wie Kribbeln in Händen und Füssen oder Gangunsicherheit sein.</p>`,
    notProofHtml: `<p>Ein einzelner tiefer Serumwert beweist noch keinen behandlungsbedürftigen Mangel, und ein grenzwertig normaler Wert schliesst ihn nicht aus. Müdigkeit allein ist kein Beweis für einen B12-Mangel; die Zuordnung von Beschwerden gehört zur ärztlichen Beurteilung.</p>`,
    followUpHtml: `<p>Üblich sind Zusatzwerte (je nach Labor Holotranscobalamin oder Methylmalonsäure), das Blutbild, die Suche nach der Ursache (Ernährung, Magen-Darm, Medikamente) und bei bestätigtem Mangel eine <strong>ärztlich festgelegte Substitution mit Verlaufskontrolle</strong>. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören ein tiefer B12-Wert zusammen mit Kribbeln oder Taubheit in Händen oder Füssen, Gangunsicherheit, Gedächtnisproblemen oder einer Blutarmut: Nervensymptome sollen nicht abgewartet werden, weil sie bei langem Bestehen bleiben können.</p>`,
    integrativeContextHtml: `<p>Abklärung und Substitution eines B12-Mangels gehören in die schulmedizinische Betreuung: Die chinesische Medizin interpretiert den Laborwert nicht und ersetzt keine Substitution.</p>`,
    relatedSignals: [{ href: '/koerpersignale/beine-kribbeln-nachts/', label: 'Beine kribbeln nachts' }],
    relatedConditions: [{ href: '/beschwerden/eisenmangel/', label: 'Eisenmangel' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/vitamin-d-zu-niedrig/', label: 'Vitamin D zu niedrig: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/', label: 'Ferritin zu niedrig: Was bedeutet der Laborwert?' },
    ],
  },
  {
    slug: 'haemoglobin-zu-niedrig',
    gruppe: 'Blutbild',
    title: 'Hämoglobin zu niedrig: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Hämoglobin transportiert den Sauerstoff im Blut. Was ein tiefer Hb-Wert bedeuten kann, welche Begleitwerte zählen und wann eine Abklärung wichtig ist.',
    primaryPurpose: 'Einordnung des Laborwerts Hämoglobin zu niedrig, keine Anämie- oder Eisenmangel-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Labor-Einordnungs-Seite: Erkrankungs-/Behandlungs-Intent Eisenmangel bleibt bei /beschwerden/eisenmangel/; Speicher-Wert bei ferritin-zu-niedrig, B12 bei vitamin-b12-zu-niedrig (alle kreuzverlinkt). Gegen-Intent haemoglobin-zu-hoch eigene Seite.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Hämoglobin (Hb) ist der rote Blutfarbstoff, der den Sauerstoff von der Lunge in den Körper transportiert. Ein zu tiefer Wert bedeutet, dass weniger Transportkapazität zur Verfügung steht (Blutarmut, medizinisch Anämie). Das ist ein <strong>Befund, keine Diagnose</strong>: Erst die Begleitwerte zeigen, ob Eisen, Vitamine, ein Blutverlust oder eine andere Ursache dahintersteckt.</p>`,
    bodyHtml: `<h2>Was ist Hämoglobin?</h2>
<p>Hämoglobin sitzt in den roten Blutkörperchen und bindet Sauerstoff. Sinkt der Wert, muss das Herz mehr arbeiten, um den Körper zu versorgen; typische Folgen sind Müdigkeit, Leistungsabfall, Blässe oder Atemnot bei Anstrengung. Frauen haben natürlicherweise etwas tiefere Referenzbereiche als Männer, und in der Schwangerschaft sinkt der Wert verdünnungsbedingt.</p>
<h2>Warum kann das Hämoglobin zu niedrig sein?</h2>
<ul>
<li><strong>Eisenmangel:</strong> weltweit die häufigste Ursache, oft durch Blutverluste (Menstruation, Magen-Darm-Trakt) oder zu geringe Aufnahme. Der Speicherwert dazu ist das <a href="/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/">Ferritin</a>, das Krankheitsbild erklärt die Seite <a href="/beschwerden/eisenmangel/">Eisenmangel</a>.</li>
<li><strong>Vitaminmangel:</strong> zu wenig <a href="/gesundheitsbibliothek/befunde-werte/vitamin-b12-zu-niedrig/">Vitamin B12</a> oder Folsäure stört die Blutbildung.</li>
<li><strong>Akuter oder chronischer Blutverlust:</strong> von der starken Menstruation bis zur unbemerkten Blutung im Magen-Darm-Trakt.</li>
<li><strong>Chronische Erkrankungen:</strong> länger dauernde Entzündungen, Nieren- oder andere Grunderkrankungen können die Blutbildung dämpfen.</li>
<li><strong>Seltenere Ursachen:</strong> Erkrankungen des Knochenmarks oder vermehrter Abbau roter Blutkörperchen; dafür liefert das Blutbild meist weitere Hinweise.</li>
</ul>
<h2>Warum die Begleitwerte entscheiden</h2>
<p>Der Hb-Wert sagt, DASS weniger roter Blutfarbstoff da ist, nicht warum. Die Grösse der roten Blutkörperchen (MCV), Ferritin, B12/Folsäure, Retikulozyten und Entzündungswerte grenzen die Ursache ein. Genau deshalb wird ein tiefer Hb-Wert nie isoliert behandelt, sondern zuerst eingeordnet.</p>`,
    notProofHtml: `<p>Ein tiefer Hb-Wert beweist keinen Eisenmangel; Eisen auf Verdacht einzunehmen kann die Abklärung verschleiern und bei falscher Ursache schaden. Er beweist auch keine ernste Erkrankung: Von der Verdünnung in der Schwangerschaft bis zum banalen Infekt gibt es viele Erklärungen. Umgekehrt schliesst ein normaler Hb-Wert leere Eisenspeicher nicht aus.</p>`,
    followUpHtml: `<p>Üblich sind das vollständige Blutbild mit Zellgrössen, <strong>Ferritin</strong> und je nach Bild B12/Folsäure, Retikulozyten und Entzündungswerte; bei unklarem Blutverlust die gezielte Quellensuche. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah medizinisch gehören ein deutlich tiefer Wert, rasche Verschlechterung, Atemnot in Ruhe, Brustschmerz, Ohnmacht, schwarzer Stuhl oder sichtbares Blut im Stuhl sowie ein tiefer Hb-Wert bei Männern und Frauen nach der Menopause ohne erkennbare Ursache: Dort gehört immer die Quelle gesucht.</p>`,
    integrativeContextHtml: `<p>Abklärung und Behandlung einer Blutarmut gehören in die schulmedizinische Betreuung: Die chinesische Medizin interpretiert den Hb-Wert nicht, und der TCM-Begriff Blut ist nicht mit dem Laborwert gleichzusetzen.</p>`,
    relatedConditions: [{ href: '/beschwerden/eisenmangel/', label: 'Eisenmangel' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/haemoglobin-zu-hoch/', label: 'Hämoglobin zu hoch: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/', label: 'Ferritin zu niedrig: Was bedeutet der Laborwert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/vitamin-b12-zu-niedrig/', label: 'Vitamin B12 zu niedrig: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'haemoglobin-zu-hoch',
    gruppe: 'Blutbild',
    title: 'Hämoglobin zu hoch: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Ein hoher Hb-Wert kann Eindickung durch Flüssigkeitsmangel oder echte Mehrproduktion bedeuten. Wie der Befund eingeordnet wird und wann er abgeklärt gehört.',
    primaryPurpose: 'Einordnung des Laborwerts Hämoglobin zu hoch; Gegen-Intent zur Low-Seite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Eigener Owner, klar getrennt von haemoglobin-zu-niedrig (beidseitig als Gegen-Befund verlinkt). Kein Erkrankungs-Owner (keine Polyglobulie-Seite).',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Ein erhöhter Hämoglobinwert hat zwei grundsätzlich verschiedene Erklärungen: Entweder ist das Blut <strong>eingedickt</strong> (zu wenig Flüssigkeit, dann ist die Konzentration hoch, ohne dass mehr rote Blutkörperchen da sind), oder der Körper bildet <strong>tatsächlich mehr</strong> rote Blutkörperchen, etwa als Reaktion auf Sauerstoffmangel. Eine Wiederholungsmessung in gut hydriertem Zustand ist deshalb oft der erste Schritt.</p>`,
    bodyHtml: `<h2>Konzentration oder echte Vermehrung?</h2>
<p>Hb wird als Konzentration gemessen. Nach starkem Schwitzen, Durchfall oder schlicht zu wenig Trinken steigt der Wert scheinbar, weil weniger Flüssigkeit im Gefässsystem ist. Beurteilt wird er deshalb zusammen mit Hämatokrit und der Zahl der roten Blutkörperchen und im Zweifel nach einer Kontrolle mit normaler Trinkmenge.</p>
<h2>Warum kann das Hämoglobin echt erhöht sein?</h2>
<ul>
<li><strong>Rauchen:</strong> eine der häufigsten Ursachen chronisch erhöhter Werte; Kohlenmonoxid verschlechtert den Sauerstofftransport, der Körper kompensiert mit mehr roten Blutkörperchen.</li>
<li><strong>Sauerstoffmangel:</strong> Aufenthalte in grosser Höhe, chronische Lungen- oder bestimmte Herzerkrankungen sowie unbehandelte nächtliche Atemaussetzer regen die Blutbildung an.</li>
<li><strong>Seltener:</strong> eine eigenständige Mehrproduktion im Knochenmark (Polyglobulie/Polycythaemia vera). Dafür sprechen anhaltend deutlich erhöhte Werte ohne die genannten Erklärungen; das klärt die Hämatologie.</li>
</ul>
<h2>Einzelwert oder Verlauf?</h2>
<p>Für die Einordnung zählen Hämatokrit und Erythrozytenzahl, Rauchstatus, Schlaf (Schnarchen mit Atempausen), Medikamente, Höhenaufenthalte und der Verlauf über eine Kontrollmessung. Ein einmalig leicht erhöhter Wert bei Flüssigkeitsmangel ist meist unspektakulär.</p>`,
    notProofHtml: `<p>Ein erhöhter Hb-Wert beweist keine Knochenmarkerkrankung; die häufigsten Erklärungen sind Flüssigkeitsmangel, Rauchen und Sauerstoff-Kompensation. Er ist auch kein Fitness-Beweis. Umgekehrt schliesst ein normaler Einzelwert eine relevante Ursache wie nächtliche Atemaussetzer nicht aus.</p>`,
    followUpHtml: `<p>Üblich sind eine <strong>Kontrollmessung in gut hydriertem Zustand</strong>, Hämatokrit und Blutbild, das Gespräch über Rauchen, Schlaf und Medikamente und nur bei anhaltend deutlich erhöhten Werten eine gezielte weitere Abklärung. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zügig besprechen solltest du anhaltend deutlich erhöhte Werte, besonders zusammen mit Kopfschmerzen, Sehstörungen, Juckreiz nach warmem Duschen, Rötung von Gesicht oder Handflächen oder früheren Thrombosen. Zeichen einer akuten Thrombose oder Embolie (einseitig geschwollenes Bein, plötzliche Atemnot, Brustschmerz) sind ein Notfall: Telefon 144.</p>`,
    integrativeContextHtml: `<p>Die Abklärung erhöhter Blutwerte gehört in die schulmedizinische Betreuung: Die chinesische Medizin interpretiert den Hb-Wert nicht und behandelt keine Polyglobulie.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/haemoglobin-zu-niedrig/', label: 'Hämoglobin zu niedrig: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/', label: 'Leukozyten erhöht: Was bedeutet das?' },
    ],
  },
  {
    slug: 'monozyten-erhoeht',
    gruppe: 'Blutbild',
    title: 'Monozyten erhöht: Was bedeutet das?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Monozyten sind die Aufräumzellen unter den weissen Blutkörperchen. Warum sie erhöht sein können, oft in der Erholungsphase nach Infekten, und was ein Einzelwert nicht beweist.',
    primaryPurpose: 'Einordnung der Leukozyten-Untergruppe Monozyten; der Gesamtwert bleibt bei leukozyten-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Leukozyten-SUBTYP-Owner wie lymphozyten-/neutrophile-erhoeht; Umbrella bleibt leukozyten-erhoeht. Geschwister-Seiten (Lymphozyten, Neutrophile, Eosinophile, Basophile) kreuzverlinkt.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Monozyten sind eine Untergruppe der weissen Blutkörperchen (Leukozyten). Sie wandern ins Gewebe ein, werden dort zu Fresszellen und räumen Erreger und Zelltrümmer ab. Erhöhte Monozyten sieht man deshalb häufig in der <strong>Erholungs- und Aufräumphase nach Infekten</strong> und bei länger laufenden Entzündungen. Ein einzelner, leicht erhöhter Wert ist keine Diagnose.</p>`,
    bodyHtml: `<h2>Was sind Monozyten?</h2>
<p>Monozyten machen normalerweise nur wenige Prozent der Leukozyten aus. Ihre Aufgabe beginnt oft dort, wo die Akutabwehr durch <a href="/gesundheitsbibliothek/befunde-werte/neutrophile-erhoeht/">Neutrophile</a> aufhört: aufräumen, Gewebe reparieren, dem Immunsystem Erreger präsentieren. Der übergeordnete Gesamtwert ist auf der Seite <a href="/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/">Leukozyten erhöht</a> erklärt.</p>
<h2>Relativ oder absolut erhöht?</h2>
<p>Wie bei allen Untergruppen gilt: Der Prozentanteil kann hoch aussehen, nur weil eine andere Zellgruppe gerade niedrig ist. Aussagekräftiger ist die absolute Monozytenzahl.</p>
<h2>Warum können Monozyten erhöht sein?</h2>
<ul>
<li><strong>Abklingende oder durchgemachte Infekte:</strong> die klassische Konstellation; die Monozyten steigen oft, wenn die Akutphase vorbei ist, und normalisieren sich über Wochen.</li>
<li><strong>Chronische Entzündungen und Infektionen:</strong> länger aktive Prozesse halten die Aufräumtruppe beschäftigt.</li>
<li><strong>Rauchen und Stressreaktionen:</strong> können die Werte leicht anheben.</li>
<li><strong>Anhaltend deutlich erhöhte Werte:</strong> ohne Erklärung gehören sie hämatologisch beurteilt; ein Einzelwert belegt keine Bluterkrankung.</li>
</ul>
<h2>Einzelwert oder Verlauf?</h2>
<p>Für die Einordnung zählen kürzliche Infekte, die absolute Zahl, das übrige Differenzialblutbild (<a href="/gesundheitsbibliothek/befunde-werte/lymphozyten-erhoeht/">Lymphozyten</a>, Neutrophile, <a href="/gesundheitsbibliothek/befunde-werte/eosinophile-erhoeht/">Eosinophile</a>, <a href="/gesundheitsbibliothek/befunde-werte/basophile-erhoeht/">Basophile</a>), Entzündungswerte und die Kontrollmessung nach einigen Wochen.</p>`,
    notProofHtml: `<p>Erhöhte Monozyten beweisen keine bestimmte Infektion, keine chronische Erkrankung und keine Leukämie. Sie zeigen Aufräum- und Abwehraktivität an. Nach einem Infekt sind vorübergehend erhöhte Werte erwartbar.</p>`,
    followUpHtml: `<p>Üblich sind das Gespräch über kürzliche Infekte, eine <strong>Kontrolle des Blutbilds</strong> nach einigen Wochen und nur bei anhaltend auffälligen Werten oder Begleitbefunden weitere gezielte Diagnostik. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören erhöhte Monozyten zusammen mit anhaltendem Fieber, Nachtschweiss, ungewolltem Gewichtsverlust, geschwollenen Lymphknoten über Wochen oder auffälligen weiteren Blutbildveränderungen.</p>`,
    integrativeContextHtml: `<p>Blutbild-Interpretation gehört in die schulmedizinische Beurteilung: Die chinesische Medizin leitet aus Monozytenzahlen keine eigenen Diagnosen ab.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/', label: 'Leukozyten erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/neutrophile-erhoeht/', label: 'Neutrophile erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/lymphozyten-erhoeht/', label: 'Lymphozyten erhöht: Was bedeutet das?' },
    ],
  },
  {
    slug: 'eosinophile-erhoeht',
    gruppe: 'Blutbild',
    title: 'Eosinophile erhöht: Was bedeutet das?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Eosinophile Granulozyten steigen oft bei Allergien, Asthma oder Hautentzündungen, haben aber viele mögliche Auslöser. Wie der Befund eingeordnet wird.',
    primaryPurpose: 'Einordnung der Leukozyten-Untergruppe Eosinophile; der Gesamtwert bleibt bei leukozyten-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Leukozyten-SUBTYP-Owner; Umbrella bleibt leukozyten-erhoeht. Allergie ausdrücklich NICHT als automatische Erklärung gerahmt; /beschwerden/allergien-heuschnupfen/ bleibt Erkrankungs-Owner.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Allergologie)',
    shortAnswerHtml: `<p>Eosinophile sind eine kleine Untergruppe der weissen Blutkörperchen, die bei allergischen Reaktionen und in der Abwehr von Parasiten eine Rolle spielt. Erhöhte Werte sieht man deshalb oft bei <strong>Allergien, Asthma oder entzündlichen Hauterkrankungen</strong>, aber längst nicht nur dort: Auch Medikamente und andere Erkrankungen kommen infrage. Ein erhöhter Wert benennt nie von selbst die Ursache.</p>`,
    bodyHtml: `<h2>Was sind Eosinophile?</h2>
<p>Eosinophile Granulozyten machen normalerweise nur wenige Prozent der Leukozyten aus. Sie sind auf die Abwehr grösserer Eindringlinge (klassisch: Parasiten) und auf allergisch-entzündliche Reaktionen spezialisiert, unter anderem in Atemwegen und Haut. Den Gesamtwert erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/">Leukozyten erhöht</a>.</p>
<h2>Relativ oder absolut erhöht?</h2>
<p>Auch hier zählt die absolute Zahl mehr als der Prozentanteil: Ein hoher Anteil bei niedriger Gesamtleukozytenzahl bedeutet oft wenig. Ärztinnen sprechen erst ab bestimmten absoluten Werten von einer relevanten Eosinophilie und stufen deren Ausmass ab.</p>
<h2>Warum können Eosinophile erhöht sein?</h2>
<ul>
<li><strong>Allergische Erkrankungen:</strong> Heuschnupfen, Asthma, allergische Hautreaktionen; die Erkrankungs-Seite dazu ist <a href="/beschwerden/allergien-heuschnupfen/">Allergien &amp; Heuschnupfen</a>.</li>
<li><strong>Hauterkrankungen:</strong> unter anderem Ekzeme und Nesselsucht.</li>
<li><strong>Medikamente:</strong> ein wichtiger und oft übersehener Auslöser; neue Präparate gehören ins ärztliche Gespräch.</li>
<li><strong>Parasitäre Infektionen:</strong> je nach Reiseanamnese relevant.</li>
<li><strong>Seltener:</strong> entzündliche Systemerkrankungen oder hämatologische Ursachen bei anhaltend deutlich erhöhten Werten.</li>
</ul>
<h2>Einzelwert oder Verlauf?</h2>
<p>Für die Einordnung zählen die absolute Höhe, Beschwerden (Atemwege, Haut, Verdauung), Reisen, Medikamente und der Verlauf über Kontrollmessungen. Ein leicht erhöhter Einzelwert bei bekannter Allergie ist meist wenig überraschend.</p>`,
    notProofHtml: `<p>Erhöhte Eosinophile beweisen keine Allergie, und eine bekannte Allergie erklärt nicht automatisch jeden erhöhten Wert. Sie beweisen auch keinen Parasitenbefall und keine Bluterkrankung. Umgekehrt schliessen normale Werte eine Allergie nicht aus.</p>`,
    followUpHtml: `<p>Üblich sind die absolute Zählung im Differenzialblutbild, das Gespräch über Beschwerden, Medikamente und Reisen, eine <strong>Kontrollmessung</strong> und je nach Verdacht gezielte Allergie- oder weitere Abklärung. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören anhaltend deutlich erhöhte Werte, erhöhte Eosinophile mit Atemnot, ausgeprägten Hautveränderungen, Fieber, Gewichtsverlust oder nach Beginn eines neuen Medikaments mit Krankheitsgefühl.</p>`,
    integrativeContextHtml: `<p>Blutbild-Interpretation gehört in die schulmedizinische Beurteilung: Die chinesische Medizin leitet aus Eosinophilenzahlen keine eigenen Diagnosen ab.</p>`,
    relatedConditions: [{ href: '/beschwerden/allergien-heuschnupfen/', label: 'Allergien & Heuschnupfen' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/', label: 'Leukozyten erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/basophile-erhoeht/', label: 'Basophile erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/monozyten-erhoeht/', label: 'Monozyten erhöht: Was bedeutet das?' },
    ],
  },
  {
    slug: 'basophile-erhoeht',
    gruppe: 'Blutbild',
    title: 'Basophile erhöht: Was bedeutet das?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Basophile sind die seltenste Untergruppe der weissen Blutkörperchen. Was ein erhöhter Wert bedeuten kann und warum er fast nie isoliert beurteilt wird.',
    primaryPurpose: 'Einordnung der Leukozyten-Untergruppe Basophile; der Gesamtwert bleibt bei leukozyten-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Leukozyten-SUBTYP-Owner; Umbrella bleibt leukozyten-erhoeht. Bewusst nicht alarmistisch: kleinste Zellgruppe, prozentuale Ausreisser häufig bedeutungsarm.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Basophile sind die mit Abstand seltenste Untergruppe der weissen Blutkörperchen, normalerweise unter einem Prozent. Sie sind an allergisch-entzündlichen Reaktionen beteiligt. Weil die Zahlen so klein sind, wirken prozentuale Veränderungen schnell dramatisch, ohne es zu sein: Ein leicht erhöhter Einzelwert ist <strong>häufig ohne Krankheitswert</strong> und wird praktisch nie isoliert beurteilt.</p>`,
    bodyHtml: `<h2>Was sind Basophile?</h2>
<p>Basophile Granulozyten tragen Botenstoffe wie Histamin und wirken bei allergischen und entzündlichen Reaktionen mit, ähnlich den Mastzellen im Gewebe. Im Differenzialblutbild sind sie die kleinste Gruppe; den übergeordneten Gesamtwert erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/">Leukozyten erhöht</a>.</p>
<h2>Warum die kleinen Zahlen täuschen können</h2>
<p>Wenn eine Zellart normalerweise unter einem Prozent liegt, verdoppelt schon eine minimale absolute Veränderung den Anteil. Deshalb zählt die absolute Basophilenzahl, und selbst diese wird immer im Kontext des gesamten Blutbilds gelesen.</p>
<h2>Warum können Basophile erhöht sein?</h2>
<ul>
<li><strong>Allergisch-entzündliche Zustände:</strong> unter anderem allergische Erkrankungen und chronische Entzündungen, auch die Abheilungsphase von Infekten.</li>
<li><strong>Weitere Zusammenhänge:</strong> unter anderem eine verminderte Schilddrüsenfunktion wird beschrieben.</li>
<li><strong>Anhaltend deutlich erhöhte Werte:</strong> sind selten und gehören zusammen mit dem übrigen Blutbild hämatologisch beurteilt, vor allem, wenn gleichzeitig andere Zellreihen auffällig sind.</li>
</ul>
<h2>Einzelwert oder Verlauf?</h2>
<p>Für die Einordnung zählen die absolute Zahl, das gesamte Differenzialblutbild (<a href="/gesundheitsbibliothek/befunde-werte/eosinophile-erhoeht/">Eosinophile</a>, <a href="/gesundheitsbibliothek/befunde-werte/neutrophile-erhoeht/">Neutrophile</a>, <a href="/gesundheitsbibliothek/befunde-werte/lymphozyten-erhoeht/">Lymphozyten</a>, <a href="/gesundheitsbibliothek/befunde-werte/monozyten-erhoeht/">Monozyten</a>) und der Verlauf über eine Kontrolle.</p>`,
    notProofHtml: `<p>Erhöhte Basophile beweisen keine Allergie und keine Bluterkrankung. Ein isolierter, leicht erhöhter Wert bei sonst normalem Blutbild ist häufig ein Zufallsbefund ohne Konsequenz.</p>`,
    followUpHtml: `<p>Üblich sind schlicht die <strong>Kontrolle des Blutbilds</strong> und der Blick auf das Gesamtbild; nur bei anhaltenden oder mehrreihigen Auffälligkeiten folgt gezielte Diagnostik. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Ärztlich besprochen gehören anhaltend erhöhte Basophile zusammen mit weiteren Blutbildveränderungen, Nachtschweiss, Gewichtsverlust, ausgeprägter Müdigkeit oder vergrösserter Milz im Ultraschall.</p>`,
    integrativeContextHtml: `<p>Blutbild-Interpretation gehört in die schulmedizinische Beurteilung: Die chinesische Medizin leitet aus Basophilenzahlen keine eigenen Diagnosen ab.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/leukozyten-erhoeht/', label: 'Leukozyten erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/eosinophile-erhoeht/', label: 'Eosinophile erhöht: Was bedeutet das?' },
    ],
  },
  {
    slug: 'ldh-erhoeht',
    gruppe: 'Leber & Enzyme',
    title: 'LDH erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Die Laktatdehydrogenase (LDH) kommt in fast allen Geweben vor. Warum der Wert bei vielem steigt, was er nicht lokalisieren kann und wie er eingeordnet wird.',
    primaryPurpose: 'Einordnung des unspezifischen Zellschaden-Markers LDH, keine Organ- oder Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner. Kernbotschaft: maximal unspezifisch, LDH allein lokalisiert nichts; bewusst NICHT als Pankreas- oder Leber-spezifisch gerahmt.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Labormedizin)',
    shortAnswerHtml: `<p>Die Laktatdehydrogenase (LDH) ist ein Enzym des Energiestoffwechsels, das in fast allen Körperzellen vorkommt: Leber, Muskeln, Herz, rote Blutkörperchen, Lunge und mehr. Steigt sie im Blut, sind irgendwo vermehrt Zellen zerfallen oder gestresst. Die LDH ist damit einer der <strong>unspezifischsten Laborwerte überhaupt</strong>: Sie zeigt an, dass etwas ist, aber praktisch nie, wo.</p>`,
    bodyHtml: `<h2>Was ist die LDH?</h2>
<p>Weil das Enzym überall vorkommt, gibt es kaum eine Erkrankung, bei der die LDH nicht steigen kann, und genau das macht sie als Einzelwert so wenig aussagekräftig. Nützlich ist sie vor allem als Verlaufs- und Zusatzwert im Kontext anderer Befunde.</p>
<h2>Warum kann die LDH erhöht sein?</h2>
<ul>
<li><strong>Die Blutprobe selbst:</strong> ein häufiger Grund. Zerfallen rote Blutkörperchen bei der Entnahme oder auf dem Transport (Hämolyse), steigt die LDH künstlich; oft wird deshalb zuerst mit frischer Probe kontrolliert.</li>
<li><strong>Muskel:</strong> intensives Training, Muskelkater oder Verletzungen; typischerweise zusammen mit anderen Muskelwerten wie der <a href="/gesundheitsbibliothek/befunde-werte/got-ast-erhoeht/">GOT/AST</a>.</li>
<li><strong>Leber:</strong> im Verbund mit den <a href="/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/">Leberwerten</a>.</li>
<li><strong>Vermehrter Zellabbau im Blut:</strong> etwa bei Hämolyse im Körper oder wenig effektiver Blutbildung, dann zusammen mit Blutbild und <a href="/gesundheitsbibliothek/befunde-werte/bilirubin-erhoeht/">Bilirubin</a> beurteilt.</li>
<li><strong>Weitere Ursachen:</strong> von Infektionen über Lungen- bis zu Tumorerkrankungen; für keine davon ist die LDH allein beweisend.</li>
</ul>
<h2>Wie der Wert sinnvoll gelesen wird</h2>
<p>Immer im Set: Beschwerden, Blutbild, Leber- und Muskelwerte, Entzündungsmarker. Die Frage ist nie "Was bedeutet die LDH?", sondern "Zu welchem Gesamtbild passt sie?".</p>`,
    notProofHtml: `<p>Eine erhöhte LDH beweist keine bestimmte Erkrankung, keinen Herzinfarkt, keine Leber- oder Tumorerkrankung, und sie lokalisiert kein Organ. Ein isolierter, leicht erhöhter Wert nach Sport oder mit hämolytischer Probe ist ein häufiger, meist banaler Befund.</p>`,
    followUpHtml: `<p>Üblich sind eine <strong>Kontrollmessung mit sauberer Abnahme und ohne vorherige intensive Belastung</strong> sowie die passenden Begleitwerte je nach Verdacht. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zeitnah ärztlich gehören deutlich oder anhaltend erhöhte Werte zusammen mit B-Symptomen (Fieber, Nachtschweiss, Gewichtsverlust), Blässe und Müdigkeit, dunklem Urin nach extremer Belastung oder auffälligen weiteren Befunden.</p>`,
    integrativeContextHtml: `<p>Die LDH gehört in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert den Wert nicht und leitet daraus keine Diagnosen ab.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/got-ast-erhoeht/', label: 'GOT (AST) erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
      { href: '/gesundheitsbibliothek/befunde-werte/bilirubin-erhoeht/', label: 'Bilirubin erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'lipase-erhoeht',
    gruppe: 'Bauchspeicheldrüse',
    title: 'Lipase erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Die Lipase ist das wichtigste Laborzeichen der Bauchspeicheldrüse. Warum sie erhöht sein kann, warum das nicht automatisch eine Entzündung bedeutet und wann es dringlich wird.',
    primaryPurpose: 'Einordnung des Laborwerts Lipase, keine Pankreatitis-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner. Sicherheitsseite: Symptom+Wert-Konstellation (dringlich) klar getrennt vom asymptomatischen Zufallsbefund; Schwester-Seite amylase-erhoeht kreuzverlinkt.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Gastroenterologie)',
    shortAnswerHtml: `<p>Die Lipase ist ein Verdauungsenzym der Bauchspeicheldrüse, das Fette spaltet. Deutlich erhöhte Werte zusammen mit starken Oberbauchschmerzen sprechen für eine Entzündung der Bauchspeicheldrüse und gehören <strong>rasch medizinisch beurteilt</strong>. Ein leicht erhöhter Wert ohne Beschwerden ist dagegen ein anderer Fall: Er hat viele mögliche Erklärungen und beweist keine Pankreatitis.</p>`,
    bodyHtml: `<h2>Was ist die Lipase?</h2>
<p>Die Bauchspeicheldrüse gibt Lipase in den Dünndarm ab, ein kleiner Teil zirkuliert im Blut. Wird das Organ gereizt oder entzündet, steigt der Blutwert, bei einer akuten Entzündung oft auf ein Mehrfaches. Für Fragen rund um die Bauchspeicheldrüse ist die Lipase heute aussagekräftiger als die <a href="/gesundheitsbibliothek/befunde-werte/amylase-erhoeht/">Amylase</a>.</p>
<h2>Warum kann die Lipase erhöht sein?</h2>
<ul>
<li><strong>Akute Pankreatitis:</strong> die wichtigste Ursache deutlich erhöhter Werte, typischerweise mit starken, gürtelförmigen Oberbauchschmerzen, Übelkeit und Krankheitsgefühl. Häufige Auslöser sind Gallensteine und Alkohol.</li>
<li><strong>Reizung ohne akute Entzündung:</strong> nach Gallenwegsproblemen, bei chronischen Veränderungen der Bauchspeicheldrüse oder nach endoskopischen Eingriffen.</li>
<li><strong>Eingeschränkte Nierenfunktion:</strong> die Lipase wird über die Nieren abgebaut; bei reduzierten <a href="/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/">Nierenwerten</a> kann sie erhöht sein, ohne dass die Bauchspeicheldrüse krank ist.</li>
<li><strong>Medikamente und weitere Ursachen:</strong> verschiedene Wirkstoffe sowie Magen-Darm-Erkrankungen können den Wert anheben; auch dauerhaft leicht erhöhte Werte ohne Krankheitswert kommen vor.</li>
</ul>
<h2>Der Kontext entscheidet</h2>
<p>Die zentrale Frage lautet: Gibt es Beschwerden? Ein deutlich erhöhter Wert mit akuten Oberbauchschmerzen ist ein medizinischer Fall für heute, nicht für nächste Woche. Ein leicht erhöhter Zufallsbefund ohne Symptome wird dagegen kontrolliert und eingeordnet, oft zusammen mit Leber-, Gallen- und Nierenwerten und je nach Bild einem Ultraschall.</p>`,
    notProofHtml: `<p>Eine erhöhte Lipase beweist keine Pankreatitis: Ohne passende Beschwerden ist eine leichte Erhöhung oft ein Nebenbefund, etwa bei eingeschränkter Nierenfunktion oder medikamentös bedingt. Umgekehrt schliesst ein normaler Wert eine chronische Bauchspeicheldrüsen-Erkrankung nicht sicher aus.</p>`,
    followUpHtml: `<p>Üblich sind je nach Situation eine <strong>Kontrollmessung</strong>, Leber-, Gallen- und Nierenwerte, ein Ultraschall des Oberbauchs und das Gespräch über Alkohol und Medikamente. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Rasch medizinisch beurteilt gehören starke, anhaltende Oberbauchschmerzen (oft gürtelförmig in den Rücken ziehend) mit Übelkeit oder Erbrechen, Fieber oder Gelbfärbung, erst recht zusammen mit einem erhöhten Lipasewert. Bei heftigen akuten Bauchschmerzen mit Kreislaufsymptomen gilt in der Schweiz: Notruf 144.</p>`,
    integrativeContextHtml: `<p>Bauchspeicheldrüsen-Befunde gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert die Lipase nicht und behandelt keine Pankreatitis.</p>`,
    relatedSignals: [{ href: '/koerpersignale/druck-im-oberbauch/', label: 'Druck im Oberbauch' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/amylase-erhoeht/', label: 'Amylase erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/', label: 'Nierenwerte erhöht: Was bedeutet der Befund?' },
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
    ],
  },
  {
    slug: 'amylase-erhoeht',
    gruppe: 'Bauchspeicheldrüse',
    title: 'Amylase erhöht: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Amylase stammt aus Bauchspeicheldrüse UND Speicheldrüsen. Warum der Wert erhöht sein kann und warum die Lipase bei Pankreas-Fragen oft aussagekräftiger ist.',
    primaryPurpose: 'Einordnung des Laborwerts Amylase; enge Schwester-Seite zu lipase-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner. Doppelte Herkunft (Pankreas + Speicheldrüsen) als Kernunterschied zur Lipase; beidseitig kreuzverlinkt; keine Pankreatitis-Diagnose aus dem Einzelwert.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Gastroenterologie)',
    shortAnswerHtml: `<p>Amylase ist ein Enzym, das Stärke spaltet, und stammt aus <strong>zwei Quellen</strong>: der Bauchspeicheldrüse und den Speicheldrüsen. Ein erhöhter Wert kann deshalb vom Bauch kommen, aber genauso vom Mundbereich, etwa bei einer Speicheldrüsenentzündung. Für Fragen zur Bauchspeicheldrüse ist die <a href="/gesundheitsbibliothek/befunde-werte/lipase-erhoeht/">Lipase</a> deshalb meist der aussagekräftigere Wert.</p>`,
    bodyHtml: `<h2>Was ist die Amylase?</h2>
<p>Das Enzym beginnt die Verdauung von Kohlenhydraten bereits im Mund und setzt sie im Dünndarm fort. Im Blut messen Labore die Gesamtamylase; die Herkunft (Pankreas oder Speicheldrüse) lässt sich daraus nicht direkt ablesen, wohl aber aus dem Kontext und gegebenenfalls einer Aufschlüsselung.</p>
<h2>Warum kann die Amylase erhöht sein?</h2>
<ul>
<li><strong>Bauchspeicheldrüse:</strong> Entzündung oder Reizung, meist zusammen mit erhöhter Lipase und passenden Beschwerden.</li>
<li><strong>Speicheldrüsen:</strong> Entzündungen (klassisch Mumps), Speichelsteine oder Reizungen erhöhen die Amylase, ohne dass der Bauch beteiligt ist.</li>
<li><strong>Eingeschränkte Nierenfunktion:</strong> wie die Lipase wird Amylase über die Nieren ausgeschieden; reduzierte Nierenleistung hebt den Wert an.</li>
<li><strong>Makroamylasämie:</strong> eine harmlose Laborbesonderheit, bei der Amylase an Eiweisse gebunden langsamer abgebaut wird; der Wert bleibt dauerhaft erhöht ohne Krankheitswert.</li>
<li><strong>Weitere Ursachen:</strong> unter anderem Magen-Darm-Erkrankungen und einzelne Medikamente.</li>
</ul>
<h2>Amylase und Lipase zusammen lesen</h2>
<p>Erhöhte Amylase bei normaler Lipase spricht eher gegen die Bauchspeicheldrüse und für eine andere Quelle. Sind beide deutlich erhöht und bestehen Oberbauchschmerzen, wird eine Pankreatitis abgeklärt. Diese Kombination ist der Hauptgrund, warum beide Werte oft gemeinsam bestimmt werden.</p>`,
    notProofHtml: `<p>Eine erhöhte Amylase beweist keine Pankreatitis und keine bestimmte Erkrankung; sie kann aus dem Mundbereich stammen, nierenbedingt oder eine harmlose Makroamylasämie sein. Umgekehrt schliesst ein normaler Wert Bauchspeicheldrüsen-Probleme nicht aus.</p>`,
    followUpHtml: `<p>Üblich sind die <strong>Lipase als Vergleichswert</strong>, Nieren- und Leberwerte, je nach Bild ein Ultraschall und bei dauerhaft unklar erhöhten Werten die Prüfung auf Makroamylasämie. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Rasch beurteilt gehören erhöhte Werte zusammen mit starken Oberbauchschmerzen, Fieber, Erbrechen oder Gelbfärbung sowie eine schmerzhafte Schwellung im Bereich der Speicheldrüsen mit Fieber.</p>`,
    integrativeContextHtml: `<p>Auch die Amylase gehört in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert den Wert nicht.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/lipase-erhoeht/', label: 'Lipase erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/', label: 'Nierenwerte erhöht: Was bedeutet der Befund?' },
    ],
  },
  {
    slug: 'natrium-zu-hoch',
    gruppe: 'Elektrolyte',
    title: 'Natrium zu hoch: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Ein hoher Natriumwert ist meist ein Wasser-Problem, kein Salz-Problem: Er zeigt in der Regel Flüssigkeitsmangel an. Wie der Befund eingeordnet wird.',
    primaryPurpose: 'Einordnung des Laborwerts Natrium erhöht (Hypernatriämie), Elektrolyt-Cluster zu kalium-zu-hoch.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner; Elektrolyt-Schwester zu kalium-zu-hoch (kreuzverlinkt). Kernbotschaft: Wasserbilanz statt Kochsalz-Konsum; keine DIY-Elektrolyt-Korrektur.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Nephrologie)',
    shortAnswerHtml: `<p>Natrium ist das wichtigste Elektrolyt im Blutplasma und wird gemeinsam mit dem Wasserhaushalt reguliert. Ein zu hoher Wert (Hypernatriämie) bedeutet fast immer: Es fehlt <strong>Wasser im Verhältnis zum Salz</strong>, meist durch zu wenig Trinken oder Flüssigkeitsverluste. Mit viel gesalzenem Essen allein hat der Laborwert dagegen wenig zu tun.</p>`,
    bodyHtml: `<h2>Natrium und Wasser gehören zusammen</h2>
<p>Der Körper hält die Natriumkonzentration über Durst und die Nieren eng konstant. Steigt sie, ist in aller Regel die Wasserseite der Gleichung gestört: Es wurde zu wenig getrunken oder zu viel Flüssigkeit verloren. Deshalb ist die Hypernatriämie vor allem ein Befund bei Menschen, die nicht genug trinken können oder ihr Durstgefühl verlieren, etwa im hohen Alter oder bei schwerer Krankheit.</p>
<h2>Warum kann Natrium erhöht sein?</h2>
<ul>
<li><strong>Zu geringe Flüssigkeitszufuhr:</strong> gerade bei älteren Menschen mit abgeschwächtem Durstgefühl die häufigste Erklärung.</li>
<li><strong>Flüssigkeitsverluste:</strong> Fieber, starkes Schwitzen, Durchfall, Erbrechen oder stark gesteigertes Wasserlassen.</li>
<li><strong>Medikamente und Erkrankungen:</strong> unter anderem entwässernde Medikamente und seltene hormonelle Störungen der Wasserregulation (Diabetes insipidus).</li>
</ul>
<h2>Warum der Wert ernst genommen wird</h2>
<p>Deutliche Verschiebungen betreffen vor allem das Gehirn: Verwirrtheit, Schläfrigkeit und Schwäche können Folgen sein. Wichtig zu wissen: Auch die Korrektur gehört in ärztliche Hände, weil ein zu schneller Ausgleich eigene Risiken hat. Ein auffälliger Wert ist deshalb kein Fall für Eigenrezepte mit Wasser- oder Salzmengen, sondern für die ärztliche Beurteilung von Ursache und Tempo.</p>`,
    notProofHtml: `<p>Ein erhöhter Natriumwert beweist keine Nieren- oder Hormonerkrankung und ist kein Mass für den Salzkonsum. Meist zeigt er eine negative Wasserbilanz an. Umgekehrt schliesst ein normaler Wert eine beginnende Austrocknung nicht aus.</p>`,
    followUpHtml: `<p>Üblich sind die Beurteilung von Trinkmenge und Flüssigkeitsverlusten, <strong>Kontrollmessungen</strong>, Nierenwerte und die Durchsicht der Medikamente; bei unklarer Ursache gezielte weitere Abklärung. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Rasch medizinisch gehören ein erhöhter Wert zusammen mit Verwirrtheit, ausgeprägter Schläfrigkeit, sehr wenig Urin, hohem Fieber mit grossen Flüssigkeitsverlusten oder wenn eine betroffene Person kaum trinken kann. Bei Bewusstseinsstörung gilt in der Schweiz: Notruf 144.</p>`,
    integrativeContextHtml: `<p>Elektrolyte gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert Natriumwerte nicht, und kein komplementäres Verfahren ersetzt deren Kontrolle oder Korrektur.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/kalium-zu-hoch/', label: 'Kalium zu hoch: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/', label: 'Nierenwerte erhöht: Was bedeutet der Befund?' },
    ],
  },
  {
    slug: 'calcium-zu-hoch',
    gruppe: 'Elektrolyte',
    title: 'Calcium zu hoch: Was bedeutet der Wert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-24',
    deck: 'Ein erhöhter Calciumwert wird oft erst nach Korrektur um das Eiweiss Albumin aussagekräftig. Welche Ursachen infrage kommen und wie der Befund eingeordnet wird.',
    primaryPurpose: 'Einordnung des Laborwerts Calcium erhöht (Hyperkalzämie), Teil des Elektrolyt-Clusters.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner; Standalone-Wert über Varianten (kalzium erhöht, hyperkalzämie) und distinkten Inhalt (Albumin-Korrektur, Nebenschilddrüse) bestätigt. Keine Behandlungsempfehlungen.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Endokrinologie)',
    shortAnswerHtml: `<p>Calcium wird im Blut zum Teil frei, zum Teil an das Eiweiss Albumin gebunden transportiert. Ein leicht erhöhter Gesamtwert wird deshalb oft erst nach <strong>Korrektur um das Albumin</strong> (oder als ionisiertes Calcium) aussagekräftig. Bestätigt sich die Erhöhung, sind die zwei häufigsten Richtungen eine Überfunktion der Nebenschilddrüsen und andere abklärungsbedürftige Ursachen; ein Einzelwert ist auch hier keine Diagnose.</p>`,
    bodyHtml: `<h2>Gesamt-Calcium, korrigiertes Calcium, ionisiertes Calcium</h2>
<p>Wirksam ist nur das freie (ionisierte) Calcium. Weil das Standardlabor meist das Gesamtcalcium misst, verfälschen hohe oder tiefe Albuminwerte und auch eine gestaute Blutentnahme das Bild. Der erste Schritt bei einem auffälligen Wert ist deshalb oft schlicht die Bestätigung: korrigiert um Albumin oder direkt ionisiert gemessen.</p>
<h2>Warum kann Calcium erhöht sein?</h2>
<ul>
<li><strong>Nebenschilddrüsen:</strong> eine Überfunktion (Hyperparathyreoidismus) ist ambulant die häufigste bestätigte Ursache; sie wird über das Parathormon abgeklärt.</li>
<li><strong>Vitamin-D- und Calcium-Präparate:</strong> hohe Eigendosierungen über längere Zeit können den Wert anheben; alle Supplemente gehören ins ärztliche Gespräch.</li>
<li><strong>Medikamente:</strong> unter anderem bestimmte Entwässerungsmittel und Lithium.</li>
<li><strong>Flüssigkeitsmangel:</strong> kann den Wert vorübergehend anheben.</li>
<li><strong>Ernstere Ursachen:</strong> deutlich erhöhte Werte können bei bestimmten Tumor- und granulomatösen Erkrankungen auftreten und werden entsprechend zügig abgeklärt.</li>
</ul>
<h2>Einzelwert oder Verlauf?</h2>
<p>Für die Einordnung zählen die Bestätigungsmessung, Albumin, Parathormon, Vitamin-D-Status, Nierenwerte und die Medikamenten- und Supplementliste. Viele leichte Erhöhungen entpuppen sich bei der Kontrolle als Mess- oder Bindungseffekt.</p>`,
    notProofHtml: `<p>Ein erhöhter Calciumwert beweist weder eine Nebenschilddrüsen- noch eine Tumorerkrankung; nicht selten relativiert ihn schon die Albumin-Korrektur. Er ist auch kein Grund, Calcium- oder Vitamin-D-Präparate eigenmächtig zu verändern, wohl aber, sie ärztlich zu besprechen.</p>`,
    followUpHtml: `<p>Üblich sind die <strong>Bestätigung (albuminkorrigiert oder ionisiert)</strong>, Parathormon, <a href="/gesundheitsbibliothek/befunde-werte/vitamin-d-zu-niedrig/">Vitamin-D-Status</a>, <a href="/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/">Nierenwerte</a> und die Supplement-/Medikamentenliste. Eine Übersicht findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Zügig beurteilt gehören deutlich erhöhte Werte sowie erhöhte Werte zusammen mit starkem Durst und viel Wasserlassen, Übelkeit, Verstopfung, Knochenschmerzen, Verwirrtheit oder ausgeprägter Müdigkeit.</p>`,
    integrativeContextHtml: `<p>Auch der Calciumhaushalt gehört in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert den Wert nicht und ersetzt keine Abklärung der Nebenschilddrüsen.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/kalium-zu-hoch/', label: 'Kalium zu hoch: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/vitamin-d-zu-niedrig/', label: 'Vitamin D zu niedrig: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'kreatinin-erhoeht',
    gruppe: 'Niere & Blutdruck',
    title: 'Kreatinin erhöht: Was bedeutet ein hoher Kreatininwert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-25',
    deck: 'Kreatinin wird zur Einschätzung der Nierenfunktion verwendet. Warum Muskelmasse, Flüssigkeitshaushalt und eGFR für die Interpretation wichtig sind.',
    primaryPurpose: 'Einordnung des Einzelwerts Kreatinin; der Sammelbefund bleibt bei nierenwerte-erhoeht.',
    canonicalIntentOwner: [],
    overlapNotes: 'Der Sammelbefund "Nierenwerte erhöht" gehört nierenwerte-erhoeht (dort ist Kreatinin Kernbestandteil). Diese Seite besitzt NUR den Einzelwert-Intent "kreatinin erhöht"; beidseitig verlinkt, analog zum Leberwerte/GGT-Muster.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Nephrologie)',
    shortAnswerHtml: `<p>Kreatinin wird häufig verwendet, um die Nierenfunktion einzuschätzen. Ein erhöhter Kreatininwert kann auf eine verminderte Filtration der Nieren hinweisen, muss aber immer zusammen mit eGFR, Verlauf und persönlichen Faktoren interpretiert werden. Ein einzelner erhöhter Wert bedeutet <strong>nicht automatisch</strong>, dass eine Nierenerkrankung vorliegt.</p>`,
    bodyHtml: `<h2>Was ist Kreatinin?</h2>
<p>Kreatinin entsteht beim normalen Stoffwechsel der Muskulatur. Es gelangt ins Blut und wird überwiegend über die Nieren ausgeschieden. Deshalb kann sich die Konzentration im Blut verändern, wenn die Nieren weniger Kreatinin herausfiltern.</p>
<h2>Bedeutet hohes Kreatinin automatisch eine schlechte Nierenfunktion?</h2>
<p>Nein. Die Nierenfunktion ist eine wichtige Ursache für Veränderungen des Kreatinins, aber nicht der einzige Einflussfaktor. Der Wert wird zum Beispiel auch beeinflusst durch:</p>
<ul><li>Muskelmasse</li><li>Alter</li><li>Körperbau</li><li>Flüssigkeitshaushalt</li><li>körperliche Belastung</li><li>bestimmte Medikamente</li><li>teilweise Ernährung und Nahrungsergänzungsmittel</li></ul>
<p>Deshalb sollte Kreatinin nicht isoliert interpretiert werden.</p>
<h2>Was hat Muskelmasse mit Kreatinin zu tun?</h2>
<p>Menschen mit mehr Muskelmasse können von Natur aus höhere Kreatininwerte haben. Bei sehr geringer Muskelmasse kann Kreatinin dagegen relativ niedrig sein, obwohl die Nierenfunktion nicht unbedingt optimal ist. Das ist einer der Gründe, weshalb zusätzlich die geschätzte glomeruläre Filtrationsrate, die eGFR, verwendet wird.</p>
<h2>Was ist die eGFR?</h2>
<p>eGFR steht für geschätzte glomeruläre Filtrationsrate. Sie soll abschätzen, wie gut die Nieren Blut filtern. Die Berechnung verwendet Kreatinin zusammen mit weiteren persönlichen Faktoren. Auch die eGFR ist eine Schätzung und muss im klinischen Zusammenhang betrachtet werden.</p>
<h2>Kann Flüssigkeitsmangel Kreatinin erhöhen?</h2>
<p>Ja. Wenn der Körper deutlich zu wenig Flüssigkeit enthält, kann sich das Blut stärker konzentrieren und die Nierendurchblutung verändern. Dadurch können Nierenwerte vorübergehend auffälliger sein. Das bedeutet jedoch nicht, dass jeder erhöhte Kreatininwert einfach durch zu wenig Trinken erklärt werden sollte.</p>
<h2>Welche Werte werden zusammen mit Kreatinin betrachtet?</h2>
<p>Je nach Situation sind unter anderem relevant: eGFR, Harnstoff, Elektrolyte, eine Urinuntersuchung, Albumin im Urin und frühere Kreatininwerte. Ein einzelner Wert ist deutlich weniger aussagekräftig als der Verlauf. Den Sammelbefund erklären wir unter <a href="/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/">Nierenwerte erhöht</a>.</p>
<h2>Wann ist der Verlauf besonders wichtig?</h2>
<p>Wenn ein Wert bereits früher auffällig war, lässt sich beurteilen, ob er stabil bleibt, langsam steigt oder plötzlich verändert ist. Eine akute deutliche Veränderung hat eine andere Bedeutung als ein langfristig stabiler Wert.</p>
<h2>Können Medikamente Kreatinin beeinflussen?</h2>
<p>Ja. Bestimmte Medikamente können Kreatinin oder die Nierenfunktion beeinflussen. Medikamente sollten deshalb bei der Interpretation berücksichtigt werden. Ändere oder stoppe verschriebene Medikamente aber nicht aufgrund eines Laborwertes selbstständig.</p>`,
    notProofHtml: `<p>Ein erhöhtes Kreatinin ist keine Diagnose einer Nierenerkrankung. Der Wert wird auch durch Muskelmasse, Flüssigkeitshaushalt, Belastung und Medikamente beeinflusst. Umgekehrt schliesst ein normales Kreatinin, besonders bei geringer Muskelmasse, eine beginnende Einschränkung nicht sicher aus. Referenzbereiche unterscheiden sich je nach Labor, Methode und persönlichen Faktoren; massgeblich ist der Referenzbereich auf deinem eigenen Laborbericht.</p>`,
    followUpHtml: `<p>Üblich sind eine Wiederholungsmessung unter besseren Bedingungen (ausreichend getrunken, ohne vorherige intensive Belastung), die eGFR, je nach Situation Harnstoff, Elektrolyte, eine Urinuntersuchung inklusive Albumin sowie der Vergleich mit früheren Werten und die Durchsicht der Medikamentenliste.</p>`,
    redFlagsHtml: `<p>Besonders wichtig ist eine ärztliche Einordnung bei neu deutlich erhöhtem Wert, sinkender eGFR, Veränderungen der Urinmenge, Schwellungen, Atemnot, ausgeprägter Schwäche, auffälligen Elektrolyten oder bekannten Nierenerkrankungen.</p>`,
    integrativeContextHtml: `<p>Kreatinin und eGFR gehören in die schulmedizinische Beurteilung: Die chinesische Medizin interpretiert Nieren-Laborwerte nicht, und der TCM-Begriff Niere ist nicht mit dem Organbefund gleichzusetzen. Eine komplementäre Begleitung ist, wenn überhaupt, ein Thema nach der ärztlichen Einordnung, nie ihr Ersatz.</p>`,
    relatedConditions: [{ href: '/beschwerden/bluthochdruck/', label: 'Bluthochdruck' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/', label: 'Nierenwerte erhöht: Was bedeutet der Befund?' },
      { href: '/gesundheitsbibliothek/befunde-werte/kalium-zu-hoch/', label: 'Kalium zu hoch: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/natrium-zu-hoch/', label: 'Natrium zu hoch: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'ferritin-zu-niedrig',
    gruppe: 'Vitamine & Eisenspeicher',
    title: 'Ferritin zu niedrig: Was bedeutet der Laborwert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-22',
    deck: 'Ein niedriger Ferritinwert kann auf geringe Eisenspeicher hinweisen. Was Ferritin misst, welche anderen Werte wichtig sind und wie der Befund eingeordnet wird.',
    primaryPurpose: 'Einordnung des Laborwerts Ferritin; die Erkrankungsseite bleibt der Owner für Eisenmangel.',
    canonicalIntentOwner: ['/beschwerden/eisenmangel/'],
    overlapNotes: 'Eisenmangel-Intent gehört /beschwerden/eisenmangel/. Diese Seite beantwortet nur die Labor-Einordnung und verlinkt für Symptome/Behandlung dorthin. Slug umbenannt am 22.09.2026 von ferritin-niedrig-haemoglobin-normal (nie live); Hb-Konstellation als Abschnitt abgedeckt.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Hämatologie)',
    shortAnswerHtml: `<p>Ferritin ist ein Eiweiss, das Eisen speichert. Ein niedriger Ferritinwert spricht häufig dafür, dass die Eisenspeicher reduziert sind. Für die genaue Einordnung werden jedoch Referenzbereich, Blutbild, weitere Eisenwerte, Beschwerden und mögliche Ursachen gemeinsam betrachtet.</p>
<p>Ein niedriger Ferritinwert ist damit ein wichtiger Hinweis, aber nicht die gesamte Diagnose.</p>`,
    bodyHtml: `<h2>Was misst Ferritin?</h2>
<p>Ferritin befindet sich vor allem in Zellen und speichert Eisen. Ein kleiner Teil lässt sich im Blut messen und dient als Marker für die Eisenspeicher.</p>
<p>Ferritin kann durch Entzündungen beeinflusst werden. Deshalb ist besonders bei normalen oder erhöhten Ferritinwerten wichtig, den klinischen Kontext und gegebenenfalls Entzündungswerte mit einzubeziehen.</p>
<h2>Warum kann Ferritin niedrig sein?</h2>
<ul>
<li><strong>Blutverlust:</strong> Zum Beispiel durch starke Menstruationsblutungen oder Blutungen im Magen-Darm-Trakt.</li>
<li><strong>Erhöhter Bedarf:</strong> Schwangerschaft, Wachstum oder andere Situationen können den Eisenbedarf erhöhen.</li>
<li><strong>Geringere Aufnahme:</strong> Ernährung oder Erkrankungen des Magen-Darm-Trakts können die Eisenaufnahme beeinflussen.</li>
<li><strong>Weitere Ursachen:</strong> Der individuelle Kontext entscheidet, welche Ursachen untersucht werden müssen.</li>
</ul>
<h2>Welche anderen Werte helfen?</h2>
<p>Zur Einordnung werden häufig Blutbild und weitere Parameter des Eisenstoffwechsels betrachtet. Ob bereits eine Blutarmut besteht, lässt sich beispielsweise nicht am Ferritin allein erkennen.</p>
<h2>Niedriges Ferritin und Eisenmangel</h2>
<p>Ein deutlich vermindertes Ferritin passt häufig zu leeren oder reduzierten Eisenspeichern. Für das Krankheitsbild und seine Behandlung gibt es auf TCM.ch eine eigene Seite zu <a href="/beschwerden/eisenmangel/">Eisenmangel</a>. Diese Befundseite erklärt dagegen ausschliesslich den Laborwert.</p>`,
    redFlagsHtml: `<p>Bei niedrigem Ferritin sollte nicht nur der Wert selbst betrachtet werden. Entscheidend ist auch, warum die Eisenspeicher reduziert sind. Besonders bei Männern, nach der Menopause oder bei unerklärtem beziehungsweise wiederkehrendem Eisenmangel kann eine gezielte ärztliche Ursachenabklärung notwendig sein.</p>`,
    integrativeContextHtml: `<p>Ein Laborwert wie Ferritin lässt sich nicht direkt in ein traditionelles TCM-Muster übersetzen. Die medizinische Abklärung des Eisenstatus und möglicher Ursachen steht im Vordergrund.</p>`,
    relatedConditions: [{ href: '/beschwerden/eisenmangel/', label: 'Eisenmangel' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/ferritin-erhoeht/', label: 'Ferritin erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/tsh-erhoeht/', label: 'TSH erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'hba1c-erhoeht',
    gruppe: 'Stoffwechsel',
    title: 'HbA1c erhöht: Was bedeutet der Langzeitwert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-23',
    deck: 'HbA1c spiegelt den durchschnittlichen Blutzucker der letzten Wochen bis Monate. Was ein erhöhter Wert aussagt, was nicht, und wie er eingeordnet wird.',
    primaryPurpose: 'Einordnung des Langzeit-Blutzuckerwerts, keine Diabetes-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: keine Diabetes-/Prädiabetes-Beschwerden-Seite vorhanden (geprüft). Slug umbenannt am 23.09.2026 von hba1c-leicht-erhoeht (nie live); "leicht erhöht" als Einordnungsfrage im Text. Abgrenzung zu blutzucker-erhoeht (Momentaufnahme) beidseitig verlinkt und dokumentiert.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Diabetologie)',
    shortAnswerHtml: `<p>HbA1c ist der sogenannte Langzeit-Blutzuckerwert: Er zeigt, wie viel Zucker in den letzten rund zwei bis drei Monaten durchschnittlich an den roten Blutfarbstoff gebunden war. Ein erhöhter Wert ist damit aussagekräftiger als eine einzelne Blutzuckermessung, aber auch er ist <strong>für sich allein keine Diagnose</strong>. Was er bedeutet, hängt vom Referenzbereich, von Wiederholungsmessungen, Begleitfaktoren und deiner gesamten Situation ab.</p>`,
    bodyHtml: `<h2>Was misst HbA1c?</h2>
<p>Glukose bindet sich im Blut an den roten Blutfarbstoff (Hämoglobin). Je höher der Blutzucker über Wochen ist, desto grösser ist der Anteil dieses gezuckerten Hämoglobins. Weil rote Blutkörperchen rund drei Monate leben, bildet der Wert ein Zeitfenster von etwa acht bis zwölf Wochen ab, mit stärkerem Gewicht auf den letzten Wochen.</p>
<h2>Warum HbA1c und Blutzucker nicht dasselbe sind</h2>
<p>Eine einzelne Blutzuckermessung ist eine Momentaufnahme: Sie hängt stark davon ab, wann und unter welchen Bedingungen gemessen wurde. HbA1c gleicht solche Schwankungen aus. Beide Werte ergänzen sich, ersetzen sich aber nicht; wie eine Momentaufnahme eingeordnet wird, erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/blutzucker-erhoeht/">Blutzucker erhöht</a>.</p>
<h2>Was einen erhöhten HbA1c beeinflussen kann</h2>
<ul>
<li><strong>Blutzuckerregulation:</strong> Wiederholt erhöhte Werte können auf eine gestörte Regulation bis hin zu einem Diabetes hinweisen. Die Diagnose folgt definierten Kriterien und meist einer Bestätigungsmessung.</li>
<li><strong>Leicht erhöhte Werte im Graubereich:</strong> Sie bedeuten nicht automatisch eine Erkrankung, sind aber ein Anlass, Risiko und Verlauf ärztlich zu besprechen.</li>
<li><strong>Störfaktoren:</strong> Zustände, die die Lebensdauer der roten Blutkörperchen verändern (etwa Blutarmut, Eisenmangel oder bestimmte Blutkrankheiten), können den Wert verfälschen, in beide Richtungen. Auch das gehört in die ärztliche Beurteilung.</li>
</ul>`,
    notProofHtml: `<p>Ein einzelner erhöhter HbA1c beweist keinen Diabetes und sagt nichts darüber, wie sich dein Blutzucker an einem bestimmten Tag verhält. Umgekehrt schliesst ein unauffälliger HbA1c kurzfristige Blutzuckerspitzen nicht aus. Und er erklärt aktuelle Beschwerden wie Müdigkeit oder Durst nicht automatisch; das gehört klinisch eingeordnet.</p>`,
    followUpHtml: `<p>Üblich sind eine <strong>Bestätigungs- oder Verlaufsmessung</strong>, je nach Situation Nüchternblutzucker oder weitere Werte, das Gespräch über Risikofaktoren (Gewicht, Blutdruck, Blutfette, Familiengeschichte) und daraus die gemeinsame Entscheidung über Kontrollintervalle. Eine Übersicht über gängige Abklärungen findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>`,
    redFlagsHtml: `<p>Der HbA1c-Wert selbst ist kein Notfall. Rasch medizinisch beurteilt gehören dagegen ausgeprägter Durst mit häufigem Wasserlassen, ungewollter Gewichtsverlust, starke Müdigkeit mit Übelkeit oder Erbrechen, tiefe oder auffällige Atmung sowie Verwirrtheit, unabhängig vom Laborwert.</p>`,
    integrativeContextHtml: `<p>Die Beurteilung des Zuckerstoffwechsels und die Entscheidung über eine Behandlung gehören in die schulmedizinische Betreuung: Die chinesische Medizin interpretiert HbA1c nicht und ersetzt weder Diagnostik noch eine notwendige Therapie. Erst auf Basis der ärztlichen Einordnung kann sich die Frage stellen, ob eine komplementäre Begleitung bei konkreten Beschwerden sinnvoll ist.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/blutzucker-erhoeht/', label: 'Blutzucker erhöht: Was bedeutet der Messwert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/cholesterin-erhoeht/', label: 'Cholesterin erhöht: Was bedeutet das?' },
    ],
  },
  {
    slug: 'blutzucker-erhoeht',
    gruppe: 'Stoffwechsel',
    title: 'Blutzucker erhöht: Was bedeutet der Messwert?',
    category: 'laborwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-22',
    deck: 'Ein erhöhter Blutzucker kann viele Gründe haben. Entscheidend sind Messzeitpunkt, Nüchternstatus, Wiederholungsmessungen und weitere Werte wie HbA1c.',
    primaryPurpose: 'Einordnung eines Blutzucker-Messwerts inkl. Messsituation, keine Diabetes-Erkrankungsseite.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner (keine Diabetes-Seite vorhanden). Slug umbenannt am 22.09.2026 von nuechternblutzucker-erhoeht (nie live); Nüchtern-Frage als Abschnitt abgedeckt. Interner Überlapp mit geplantem hba1c-leicht-erhoeht beachten: HbA1c = Langzeitwert, hier Momentaufnahme-Einordnung.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Diabetologie)',
    shortAnswerHtml: `<p>Ob ein Blutzuckerwert erhöht ist, hängt stark davon ab, wann und unter welchen Bedingungen gemessen wurde. Ein Wert nach einer Mahlzeit wird anders beurteilt als ein Nüchternwert.</p>
<p>Auch akute Erkrankungen, Stress, bestimmte Medikamente und andere Faktoren können Blutzuckerwerte beeinflussen. Deshalb wird eine Diabetesdiagnose nicht allein aufgrund eines zufälligen einzelnen Messwertes gestellt.</p>`,
    bodyHtml: `<h2>Nüchtern oder nach dem Essen?</h2>
<p>Für die Interpretation ist entscheidend, ob vor der Messung gegessen wurde. Nüchternblutzucker, zufällige Blutzuckermessungen und Werte nach einer Mahlzeit beantworten unterschiedliche Fragen.</p>
<p>Zusätzlich kann HbA1c Hinweise auf den durchschnittlichen Blutzucker über einen längeren Zeitraum geben.</p>
<h2>Warum kann Blutzucker erhöht sein?</h2>
<ul>
<li><strong>Nahrungsaufnahme:</strong> Nach einer Mahlzeit steigt der Blutzucker physiologisch an.</li>
<li><strong>Diabetes oder Vorstufen:</strong> Wiederholt auffällige Werte können auf eine gestörte Blutzuckerregulation hinweisen.</li>
<li><strong>Akute Erkrankung oder Stressreaktion:</strong> Stresshormone können Blutzucker vorübergehend erhöhen.</li>
<li><strong>Medikamente:</strong> Bestimmte Medikamente können die Blutzuckerregulation beeinflussen.</li>
</ul>`,
    notProofHtml: `<p>Ein einmal erhöhter Wert beweist weder Diabetes noch erklärt er automatisch Beschwerden wie Müdigkeit, Schwindel oder Durst. Für die Diagnose werden definierte Messbedingungen und gegebenenfalls Wiederholungsmessungen verwendet.</p>`,
    followUpHtml: `<p>Je nach Höhe und Messsituation kann der Wert wiederholt oder durch weitere Untersuchungen ergänzt werden. Dazu können Nüchternblutzucker, HbA1c oder andere Tests gehören.</p>`,
    redFlagsHtml: `<p>Sehr hohe gemessene Werte zusammen mit starker Übelkeit, Erbrechen, deutlicher Austrocknung, tiefer oder auffälliger Atmung, Verwirrtheit oder ausgeprägter allgemeiner Verschlechterung benötigen rasche medizinische Abklärung.</p>`,
    integrativeContextHtml: `<p>Ein erhöhter Blutzucker ist ein moderner medizinischer Messwert und lässt sich nicht direkt in ein TCM-Muster übersetzen. Akupunktur ersetzt weder Diagnostik noch notwendige medizinische Behandlung einer gestörten Blutzuckerregulation.</p>`,
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/hba1c-erhoeht/', label: 'HbA1c erhöht: Was bedeutet der Langzeitwert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/cholesterin-erhoeht/', label: 'Cholesterin erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/blutdruck-140-90/', label: 'Blutdruck 140/90: Was bedeutet dieser Wert?' },
    ],
  },
  {
    slug: 'blutdruck-140-90',
    gruppe: 'Niere & Blutdruck',
    title: 'Blutdruck 140/90: Wie lässt sich der Messwert einordnen?',
    category: 'messwert',
    status: 'published',
    indexable: true,
    publishedAt: '2026-09-22',
    deck: 'Was bedeutet ein Blutdruck von 140/90? Warum eine einzelne Messung nicht reicht und wie wiederholte Blutdruckwerte normalerweise eingeordnet werden.',
    primaryPurpose: 'Einordnung eines konkreten Messwerts (Grenzwert-Frage), nicht die Erkrankungsseite Bluthochdruck.',
    canonicalIntentOwner: ['/beschwerden/bluthochdruck/'],
    overlapNotes: 'Der Erkrankungs-Intent Bluthochdruck gehört /beschwerden/bluthochdruck/. Diese Seite beantwortet nur "ist dieser Wert schon zu hoch?" und verlinkt für Erkrankung/Behandlung dorthin.',
    suggestedReviewerType: 'Ärztliche Review (Innere Medizin/Kardiologie)',
    shortAnswerHtml: `<p>Ein Blutdruckwert besteht aus zwei Zahlen. Die erste Zahl ist der systolische, die zweite der diastolische Blutdruck. Ein Messwert von 140/90 mmHg liegt höher als Werte, die bei vielen gesunden Erwachsenen in Ruhe angestrebt werden.</p>
<p>Eine einzelne Messung reicht jedoch nicht aus, um dauerhaft erhöhten Blutdruck zu diagnostizieren. Blutdruck schwankt im Tagesverlauf und wird unter anderem durch Bewegung, Stress, Schmerzen, Koffein und die Messsituation beeinflusst.</p>`,
    bodyHtml: `<h2>Was bedeuten die zwei Zahlen?</h2>
<ul>
<li><strong>Systolisch:</strong> Der höhere Wert während der Auswurfphase des Herzens.</li>
<li><strong>Diastolisch:</strong> Der niedrigere Wert während der Entspannungsphase zwischen zwei Herzschlägen.</li>
</ul>
<h2>Warum eine einzelne Messung nicht reicht</h2>
<p>Für die Beurteilung zählt das Muster über mehrere Messungen. Deshalb werden Blutdruckwerte häufig wiederholt zu Hause, in der Praxis oder mit einer Langzeitmessung erfasst.</p>
<p>Auch die Messtechnik beeinflusst den Wert. Vor einer Ruheblutdruckmessung sollte man einige Minuten ruhig sitzen, der Arm sollte unterstützt sein und die Manschette muss zur Armgrösse passen.</p>
<h2>Was passiert bei wiederholt erhöhten Werten?</h2>
<p>Wenn der Blutdruck wiederholt erhöht ist, wird das persönliche Herz-Kreislauf-Risiko betrachtet. Dazu gehören unter anderem Alter, Rauchen, Diabetes, Blutfette, Nierenfunktion und bereits bestehende Herz-Kreislauf-Erkrankungen.</p>
<p>Für das Krankheitsbild selbst gibt es die Seite <a href="/beschwerden/bluthochdruck/">Bluthochdruck</a>. Diese Seite hier erklärt nur den einzelnen Messwert.</p>`,
    redFlagsHtml: `<p>Ein einzelner Wert von 140/90 ist normalerweise kein akuter Notfall. Sehr hohe Werte zusammen mit Brustschmerzen, schwerer Atemnot, neurologischen Ausfällen, Verwirrtheit oder anderen schweren akuten Beschwerden gehören jedoch sofort medizinisch beurteilt.</p>`,
    integrativeContextHtml: `<p>Akupunktur oder andere komplementäre Verfahren ersetzen keine medizinische Blutdruckdiagnostik und keine verordnete Behandlung. Ein gemessener Blutdruckwert lässt sich ausserdem nicht direkt einem traditionellen TCM-Muster zuordnen.</p>`,
    relatedConditions: [{ href: '/beschwerden/bluthochdruck/', label: 'Bluthochdruck' }],
    relatedArticles: [
      { href: '/gesundheitsbibliothek/befunde-werte/cholesterin-erhoeht/', label: 'Cholesterin erhöht: Was bedeutet das?' },
      { href: '/gesundheitsbibliothek/befunde-werte/blutzucker-erhoeht/', label: 'Blutzucker erhöht: Was bedeutet der Messwert?' },
    ],
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
