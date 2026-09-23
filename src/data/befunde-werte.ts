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

// Regel: Hub bleibt noindex,follow bis mindestens 4 wirklich publizierte Leaves existieren.
// Seit 21.09.2026 sind 4 Leaves publiziert (crp, leukozyten, tsh, cholesterin) -> indexable.
export const HUB_INDEXABLE = true;

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
    slug: 'tsh-erhoeht',
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
    relatedArticles: [{ href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' }],
  },
  {
    slug: 'cholesterin-erhoeht',
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
<li><strong>ALT:</strong> Ein Enzym, das besonders stark in Leberzellen vorkommt. Erhöhungen können bei verschiedenen Formen einer Leberzellschädigung auftreten.</li>
<li><strong>AST:</strong> Kommt ausser in der Leber auch in anderen Geweben wie Muskeln vor. Der Wert ist deshalb weniger leberspezifisch.</li>
<li><strong>GGT:</strong> Kann unter anderem bei Erkrankungen der Leber und Gallenwege sowie durch Alkohol oder bestimmte Medikamente erhöht sein.</li>
<li><strong>Alkalische Phosphatase:</strong> Wird unter anderem bei Fragestellungen rund um Gallenwege und Knochen beurteilt.</li>
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
<p>Kreatinin ist ein Abbauprodukt des Muskelstoffwechsels, das über die Nieren ausgeschieden wird. Arbeiten die Nieren weniger, steigt es im Blut. Die eGFR wird aus dem Kreatinin zusammen mit Alter und Geschlecht berechnet und schätzt, wie viel die Nieren pro Minute filtern. Je nach Labor gehören auch Harnstoff oder weitere Werte zum Bild.</p>
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
      { href: '/gesundheitsbibliothek/befunde-werte/blutzucker-erhoeht/', label: 'Blutzucker erhöht: Was bedeutet der Messwert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht: Wie lässt sich der Befund einordnen?' },
    ],
  },
  {
    slug: 'bilirubin-erhoeht',
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
    slug: 'ferritin-zu-niedrig',
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
      { href: '/gesundheitsbibliothek/befunde-werte/crp-erhoeht/', label: 'CRP erhöht: Was bedeutet der Wert?' },
      { href: '/gesundheitsbibliothek/befunde-werte/tsh-erhoeht/', label: 'TSH erhöht: Was bedeutet der Wert?' },
    ],
  },
  {
    slug: 'hba1c-erhoeht',
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
