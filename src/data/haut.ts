// Single source of truth for the /haut section — Haut & Gesicht.
// Info-/Wirkstoff-/Methodenartikel rund um Haut, Gesichtsbehandlungen und K-Beauty.
// Jede Seite verlinkt auf genau EINE buchbare Behandlung (ctaHref).
// Long-Tail wird über <h2> im bodyHtml und über faqs[] abgedeckt, NICHT über eigene Seiten.
// Schema: MedicalWebPage + Person(author) + FAQPage + BreadcrumbList, wie /wissen.

export interface HautFaq { q: string; a: string }
export interface HautRelated { href: string; label: string; cat: string }
export interface HautAuthor { name: string; role: string; bio: string }
export interface HautArticle {
  slug: string;
  title: string;
  metaDesc: string;
  excerpt: string;
  category: string;
  h1: string;
  lead: string;
  readingTime: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaHref: string;
  ctaLabel: string;
  author: HautAuthor;
  reviewerName: string;
  datePublished: string;
  dateModified: string;
  lastReviewed: string;
  bodyHtml: string;
  faqs: HautFaq[];
  related: HautRelated[];
}

// TODO: role/bio an Simons tatsächliche Funktion anpassen.
// Bewusst OHNE Angabe wie «TCM-Therapeut» oder «EMR/ASCA zertifiziert» —
// solche Qualifikationsangaben dürfen nur stehen, wenn sie zutreffen.
const AUTOR: HautAuthor = {
  name: 'Simon Stüve',
  role: 'TCM.ch',
  bio: 'Verantwortlich für die Inhalte im Bereich Haut & Gesicht bei TCM.ch. Die Artikel entstehen in Abstimmung mit den behandelnden Therapeutinnen und Therapeuten unserer Praxen.',
};

export const haut: HautArticle[] = [
  // ─────────────────────────────────────────────────────────── Wirkstoffe
  {
    slug: 'centella',
    title: 'Centella asiatica (Cica): Was der Wirkstoff kann',
    metaDesc: 'Centella asiatica, in der Hautpflege als Cica bekannt und in der chinesischen Medizin als Jixuecao: Wirkung, Studienlage, wer davon profitiert und worauf du beim Kauf achtest.',
    excerpt: 'Der K-Beauty-Wirkstoff, den die chinesische Medizin seit Jahrhunderten kennt. Was belegt ist, was nicht, und für welche Haut er sich lohnt.',
    category: 'Wirkstoffe',
    h1: 'Centella asiatica: der Wirkstoff hinter «Cica»',
    lead: 'In koreanischen Seren steht Cica, auf der Verpackung Centella asiatica, in der chinesischen Kräuterkunde heisst sie Jixuecao. Drei Namen, eine Pflanze. Was sie kann, was sie nicht kann, und für welche Haut sie sich lohnt.',
    readingTime: '7 Min.',
    ctaTitle: 'Gereizte Haut, die nicht zur Ruhe kommt?',
    ctaText: 'Wenn Pflege allein nicht mehr reicht, schauen wir uns die Haut in der Praxis an und besprechen ehrlich, was sinnvoll ist.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Centella asiatica ist die Pflanze hinter dem Kürzel «Cica», das seit einigen Jahren auf koreanischen Cremes und Seren steht. Bekannt geworden ist sie über die K-Beauty, benutzt wird sie deutlich länger: In der chinesischen Kräuterkunde läuft sie als <strong>Jixuecao</strong> (積雪草), in der ayurvedischen Tradition als Gotu Kola, im deutschen Sprachraum manchmal als Tigergras.</p>

<p>Für uns ist das kein Marketing-Detail, sondern der Grund, warum wir überhaupt darüber schreiben: Centella steht in beiden Welten, in der modernen Hautpflege und in der Kräuterkunde, mit der wir ohnehin arbeiten.</p>

<h2>Was steckt drin?</h2>
<p>Wirksam sind vier Verbindungen, die zusammen als <strong>TECA</strong> bezeichnet werden: Asiaticosid, Madecassosid, Asiatsäure und Madecassinsäure. In Kosmetik findest du sie in zwei Formen.</p>
<p><strong>Als Gesamtextrakt.</strong> Auf der INCI-Liste steht dann «Centella Asiatica Extract» oder «Centella Asiatica Leaf Extract». Enthält alles, aber in schwankender und meist nicht deklarierter Konzentration.</p>
<p><strong>Als isolierter Einzelstoff.</strong> Steht «Madecassoside» oder «Asiaticoside» separat in der Liste, wurde gezielt dosiert. Das ist in der Regel das ernsthaftere Produkt.</p>
<div class="wa-callout"><div class="wa-callout-label">Beim Kauf achten auf</div><p>Steht Centella ganz am Ende der INCI-Liste, hinter Konservierung und Duftstoffen, ist kaum etwas drin. Weit vorne, idealerweise mit einem separat gelisteten Madecassosid, ist das Produkt ernst gemeint.</p></div>

<h2>Wie Centella wirkt</h2>
<p>Hier lohnt sich Genauigkeit, weil zwei sehr unterschiedliche Dinge oft vermischt werden.</p>
<p><strong>Gut untersucht: Wundheilung.</strong> Centella-Extrakte werden seit Jahrzehnten bei Wunden, Narben und Verbrennungen eingesetzt. Dazu gibt es klinische Daten, und in mehreren Ländern sind entsprechende Präparate als Arzneimittel zugelassen. Der Mechanismus, eine Anregung der Kollagensynthese und eine Beruhigung der Entzündungsreaktion, ist plausibel beschrieben.</p>
<p><strong>Schwächer untersucht: Kosmetik.</strong> Die Übertragung auf ein Serum mit ein bis fünf Prozent Extrakt ist ein Sprung. Es gibt Hinweise auf eine beruhigende Wirkung bei gereizter Haut und auf eine Unterstützung der Hautbarriere, aber die Studien sind kleiner und oft von Herstellern finanziert.</p>
<p>Ehrlich gesagt: Centella ist einer der besser belegten beruhigenden Wirkstoffe in der Kosmetik. Ein Anti-Aging-Wirkstoff ist er nicht, auch wenn er gelegentlich so verkauft wird. Wer Falten adressieren will, ist bei Retinoiden oder <a href="/haut/vitamin-c-serum/">Vitamin C</a> an der richtigeren Adresse.</p>
<div class="wa-pullquote">Centella beruhigt zuverlässig. Alles darüber hinaus verspricht die Verpackung, nicht die Datenlage.</div>

<h2>Für welche Haut lohnt es sich?</h2>
<ul>
<li><strong>Gereizte, gerötete Haut.</strong> Der Hauptanwendungsfall. Nach zu aggressivem Peeling, nach Sonne, nach einem Retinol-Einstieg, der zu schnell ging.</li>
<li><strong>Geschädigte Hautbarriere.</strong> Wenn die Haut spannt, schuppt und plötzlich auf Produkte reagiert, die vorher problemlos waren.</li>
<li><strong>Neigung zu Rötungen.</strong> Als tägliche Basispflege bei <a href="/beschwerden/rosacea/">Rosacea</a>-Neigung, ergänzend, nicht als Therapie.</li>
<li><strong>Unreine Haut in der Beruhigungsphase.</strong> Nach der Ausreinigung, wenn die Haut gereizt ist, aber keine weitere Wirkstoffbelastung verträgt.</li>
</ul>
<p>Weniger sinnvoll ist Centella, wenn dein Hauptthema <a href="/haut/pigmentflecken/">Pigmentflecken</a>, Falten oder verstopfte Poren sind. Dafür gibt es passendere Wirkstoffe, und ein Cica-Produkt kostet dann nur Platz in der Routine.</p>

<h2>Wie du Centella anwendest</h2>
<p>Centella verträgt sich mit praktisch allem und braucht keine besondere Reihenfolge. Als Faustregel: nach der Reinigung, vor der reichhaltigsten Textur. Morgens wie abends möglich.</p>
<p>Sinnvoll ist die Kombination mit Wirkstoffen, die reizen können. Wer Retinol oder Säuren benutzt, kann Centella an den Tagen dazwischen einsetzen oder direkt danach, um die Reaktion abzufedern. Genau dafür sind die koreanischen Cica-Balsame gedacht.</p>
<p>Nicht sinnvoll ist es, drei Centella-Produkte übereinanderzuschichten. Mehr Beruhigung als beruhigt gibt es nicht, und jede zusätzliche Formulierung ist ein zusätzliches Reizrisiko.</p>

<h2>Nebenwirkungen und Grenzen</h2>
<p>Centella gilt äusserlich als sehr gut verträglich. Allergische Reaktionen kommen vor, sind aber selten. Wie bei jedem neuen Produkt gilt: erst an einer kleinen Stelle testen, dann grossflächig.</p>
<p>Die eigentliche Grenze liegt woanders. Centella beruhigt einen Zustand, sie ändert nichts an dessen Ursache. Wenn deine Haut immer wieder reagiert, ist die nächste Tube nicht die Antwort.</p>

<h2>Der Blick aus der chinesischen Kräuterkunde</h2>
<p>Als Jixuecao wird Centella in der chinesischen Medizin traditionell innerlich eingesetzt, nicht als Creme. Die klassischen Anwendungsgebiete liegen im Bereich hitziger, entzündlicher Zustände, und das deckt sich erstaunlich gut damit, wofür die moderne Kosmetik sie verwendet: gerötete, überreizte, warme Haut.</p>
<p>Was daraus nicht folgt: dass ein Tee dasselbe tut wie ein Serum. In der <a href="/therapien/kraeutertherapie/">Kräutertherapie</a> arbeiten wir mit individuell zusammengestellten Rezepturen, nicht mit Einzelkräutern nach Hautbild.</p>

<h2>Wenn Pflege nicht mehr reicht</h2>
<p>Bei anhaltenden Hautveränderungen gehört ein dermatologischer Abklärungstermin an den Anfang, das sagen wir deutlich. Ergänzend arbeiten wir bei stressverstärkten und wiederkehrenden Hautthemen mit <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a>, und wer die Haut vor allem entstauen und beruhigen möchte, ist mit <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> gut bedient.</p>
`.trim(),
    faqs: [
      { q: 'Ist Cica dasselbe wie Centella asiatica?', a: 'Ja. «Cica» ist die Kurzform, die vor allem koreanische Marken verwenden. Auf der INCI-Liste steht der volle Name, meist als Centella Asiatica Extract oder als einzelner Wirkstoff wie Madecassoside.' },
      { q: 'Hilft Centella gegen Falten?', a: 'Dafür ist die Datenlage schwach. Centella ist ein beruhigender Wirkstoff mit guter Evidenz bei gereizter Haut und in der Wundheilung. Wer gezielt an Fältchen arbeiten möchte, ist mit Retinoiden oder Vitamin C besser bedient.' },
      { q: 'Kann ich Centella mit Retinol kombinieren?', a: 'Ja, das ist sogar einer der sinnvollsten Einsätze. Centella nach dem Retinol oder an den Tagen dazwischen kann die Reizung abfedern, die beim Einstieg typisch ist.' },
      { q: 'Wie erkenne ich ein gutes Centella-Produkt?', a: 'Schau auf die Position in der INCI-Liste. Steht Centella weit vorne oder ist ein Einzelstoff wie Madecassoside separat gelistet, wurde gezielt dosiert. Ganz am Ende der Liste ist kaum etwas drin.' },
      { q: 'Hat Centella Nebenwirkungen?', a: 'Äusserlich gilt sie als sehr gut verträglich. Allergische Reaktionen kommen vor, sind aber selten. Teste ein neues Produkt zuerst an einer kleinen Stelle.' },
      { q: 'Was ist Jixuecao?', a: 'Der chinesische Name derselben Pflanze, 積雪草. In der chinesischen Kräuterkunde wird sie traditionell innerlich bei hitzigen, entzündlichen Zuständen eingesetzt, nicht als Hautpflege.' },
    ],
    related: [
      { href: '/haut/vitamin-c-serum/', label: 'Vitamin-C-Serum', cat: 'Wirkstoff' },
      { href: '/haut/glass-skin/', label: 'Glass Skin', cat: 'K-Beauty' },
      { href: '/therapien/gua-sha/gesichts-gua-sha/', label: 'Gua Sha fürs Gesicht', cat: 'Behandlung' },
    ],
  },

  {
    slug: 'vitamin-c-serum',
    title: 'Vitamin-C-Serum: Formen, Wirkung, Anwendung',
    metaDesc: 'Vitamin C in der Hautpflege: welche Form wirklich wirkt, wie du Oxidation erkennst, womit du es kombinierst und warum es ohne Sonnenschutz halb verschenkt ist.',
    excerpt: 'Der am besten belegte Wirkstoff gegen Pigmentflecken, und der, bei dem am meisten schiefgeht. Welche Form, welche Konzentration, welche Kombination.',
    category: 'Wirkstoffe',
    h1: 'Vitamin-C-Serum: was wirkt und was oxidiert',
    lead: 'Vitamin C gehört zu den am besten untersuchten Wirkstoffen in der Hautpflege. Es ist auch der, bei dem am meisten Geld für Produkte ausgegeben wird, die nach vier Wochen nichts mehr tun. Woran das liegt und wie du es vermeidest.',
    readingTime: '8 Min.',
    ctaTitle: 'Pigmentflecken, die nicht weggehen?',
    ctaText: 'Pflege kann viel, aber nicht alles. Wir schauen uns die Haut an und sagen dir ehrlich, was in der Praxis noch geht und wann eine dermatologische Abklärung der bessere Weg ist.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Vitamin C ist der Wirkstoff, bei dem sich Dermatologie und Kosmetikindustrie ausnahmsweise einig sind: Er wirkt. Nur eben nicht in jeder Form, nicht in jeder Konzentration und nicht, wenn die Flasche seit drei Monaten offen im Bad steht.</p>

<h2>Was Vitamin C in der Haut macht</h2>
<p>Drei Dinge, die alle gut beschrieben sind.</p>
<p><strong>Antioxidans.</strong> Vitamin C fängt freie Radikale ab, die durch UV-Strahlung und Umweltbelastung entstehen. Das ist der Grund, warum es morgens angewendet wird: Es arbeitet als zweite Verteidigungslinie hinter dem Sonnenschutz.</p>
<p><strong>Kofaktor der Kollagensynthese.</strong> Ohne Vitamin C können die Enzyme, die Kollagen stabilisieren, nicht arbeiten. Das ist Biochemie, keine Werbung.</p>
<p><strong>Hemmung der Melaninbildung.</strong> Vitamin C greift in die Tyrosinase ein, das Schlüsselenzym der Pigmentbildung. Deshalb steht es in fast jedem seriösen Konzept gegen <a href="/haut/pigmentflecken/">Pigmentflecken</a>.</p>

<h2>Welche Form ist die richtige?</h2>
<p>Hier entscheidet sich, ob ein Produkt etwas taugt.</p>
<p><strong>L-Ascorbinsäure.</strong> Die reine, aktive Form und der Goldstandard der Studien. Wirkt am stärksten, ist aber instabil: Sie oxidiert bei Licht, Wärme und Luftkontakt. Braucht einen niedrigen pH-Wert, was empfindliche Haut reizen kann.</p>
<p><strong>Ethylascorbinsäure.</strong> Stabiler, dringt gut ein, in der Wirkung nahe an der reinen Form. Ein guter Kompromiss.</p>
<p><strong>Magnesium-Ascorbylphosphat und Natrium-Ascorbylphosphat.</strong> Deutlich stabiler, mildere Wirkung, hautfreundlicher pH. Sinnvoll bei empfindlicher Haut.</p>
<p><strong>THD-Ascorbat.</strong> Fettlöslich, sehr stabil, teuer. In Ölen und reichhaltigen Texturen zu finden.</p>
<div class="wa-callout"><div class="wa-callout-label">Faustregel</div><p>Robuste Haut und Wirkung im Vordergrund: L-Ascorbinsäure, 10 bis 20 Prozent. Empfindliche Haut oder Einstieg: ein stabiles Derivat. Beides ist besser als ein hochkonzentriertes Produkt, das du nach zwei Wochen wegen Reizung nicht mehr benutzt.</p></div>

<h2>Woran du erkennst, dass es oxidiert ist</h2>
<p>Frisches Vitamin-C-Serum ist farblos bis blassgelb. Wird es <strong>dunkelgelb, orange oder braun</strong>, ist der Wirkstoff oxidiert und tut nichts mehr. Das ist kein Qualitätsmangel, sondern Chemie.</p>
<p>Was hilft: dunkle oder undurchsichtige Flaschen, Pumpspender statt Pipette, kühl und dunkel lagern, und keine Vorratspackungen kaufen. Ein Serum, das du in drei Monaten aufbrauchst, ist besser als ein doppelt so grosses, das ein halbes Jahr hält.</p>

<h2>Wie du es anwendest</h2>
<p>Morgens, auf die gereinigte Haut, vor Feuchtigkeitspflege und Sonnenschutz. Vier bis fünf Tropfen reichen fürs ganze Gesicht.</p>
<p>Beim Einstieg jeden zweiten Tag, dann steigern. Ein leichtes Kribbeln direkt nach dem Auftragen ist bei L-Ascorbinsäure normal, Brennen ist es nicht.</p>
<p><strong>Ohne Sonnenschutz ist Vitamin C halb verschenkt.</strong> Das gilt besonders, wenn es dir um Pigmentflecken geht: Ohne konsequenten UV-Schutz baust du morgens ab, was die Sonne mittags wieder aufbaut.</p>

<h2>Womit du es kombinierst</h2>
<p><strong>Mit Sonnenschutz.</strong> Die stärkste Kombination überhaupt. Vitamin C verstärkt den Schutz, ersetzt ihn aber nicht.</p>
<p><strong>Mit Niacinamid.</strong> Der hartnäckigste Mythos in der Hautpflege besagt, die beiden würden sich neutralisieren. Das stammt aus Laborversuchen der 1960er-Jahre mit unrealistischer Hitze. In modernen Formulierungen ist die Kombination unproblematisch.</p>
<p><strong>Mit Retinol.</strong> Funktioniert, aber getrennt: Vitamin C morgens, Retinol abends. Zusammen aufgetragen steigt das Reizrisiko ohne Zusatznutzen.</p>
<p><strong>Mit Säuren.</strong> Nicht in derselben Anwendung. Wähle eins, sonst ist die Barriere in zwei Wochen hin.</p>
<p><strong>Mit <a href="/haut/centella/">Centella</a>.</strong> Sinnvoll als Puffer, wenn Vitamin C leicht reizt.</p>

<h2>Nebenwirkungen und Grenzen</h2>
<p>Reine L-Ascorbinsäure kann bei empfindlicher Haut brennen, röten oder schuppen. Bei <a href="/beschwerden/rosacea/">Rosacea</a>-Neigung eher zu einem milden Derivat greifen.</p>
<p>Und die grössere Grenze: Vitamin C wirkt auf oberflächliche, entzündungsbedingte Pigmentierung gut. Bei tiefliegenden Flecken und bei Melasma stösst jede Pflege an ihre Grenze. Dann geht es um Behandlung, nicht um ein weiteres Serum.</p>

<h2>Wenn Pflege nicht mehr reicht</h2>
<p>Wer seit Monaten konsequent pflegt und trotzdem keine Veränderung sieht, sollte den nächsten Schritt nicht in einem teureren Produkt suchen. Bei ausgeprägten oder plötzlich aufgetretenen Pigmentveränderungen gehört die dermatologische Abklärung an den Anfang. Was ergänzend geht, besprechen wir in der Praxis: <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> bei stressverstärkten Hautthemen, <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha</a> zum Entstauen.</p>
`.trim(),
    faqs: [
      { q: 'Welche Vitamin-C-Form ist die beste?', a: 'L-Ascorbinsäure hat die beste Studienlage, ist aber instabil und kann reizen. Für empfindliche Haut sind Ethylascorbinsäure oder Ascorbylphosphate der bessere Weg. Die beste Form ist die, die du täglich verträgst.' },
      { q: 'Mein Serum ist braun geworden, kann ich es noch benutzen?', a: 'Nein, jedenfalls nicht mehr als Vitamin-C-Produkt. Braunfärbung heisst Oxidation, der Wirkstoff ist verbraucht. Schädlich ist es nicht, wirksam aber auch nicht mehr.' },
      { q: 'Vitamin C morgens oder abends?', a: 'Morgens. Es arbeitet als Antioxidans gegen UV- und Umweltbelastung und ergänzt damit den Sonnenschutz. Abends ist es nicht falsch, aber weniger sinnvoll.' },
      { q: 'Darf ich Vitamin C und Niacinamid zusammen benutzen?', a: 'Ja. Der Mythos, die beiden würden sich neutralisieren, stammt aus alten Laborversuchen unter unrealistischen Bedingungen. In modernen Formulierungen ist die Kombination unproblematisch.' },
      { q: 'Welche Konzentration brauche ich?', a: 'Bei L-Ascorbinsäure liegt der untersuchte Bereich zwischen 10 und 20 Prozent. Mehr bringt nicht mehr, erhöht aber das Reizrisiko. Für den Einstieg reichen 10 Prozent.' },
      { q: 'Hilft Vitamin C gegen Pigmentflecken?', a: 'Bei oberflächlicher, entzündungsbedingter Pigmentierung ja, in Kombination mit konsequentem Sonnenschutz. Bei tiefliegenden Flecken und Melasma stösst Pflege an ihre Grenzen.' },
    ],
    related: [
      { href: '/haut/pigmentflecken/', label: 'Pigmentflecken', cat: 'Hautthema' },
      { href: '/haut/centella/', label: 'Centella (Cica)', cat: 'Wirkstoff' },
      { href: '/haut/glass-skin/', label: 'Glass Skin', cat: 'K-Beauty' },
    ],
  },

  // ─────────────────────────────────────────────────────────── Hautthemen
  {
    slug: 'pigmentflecken',
    title: 'Pigmentflecken im Gesicht: Formen, Ursachen, was hilft',
    metaDesc: 'Pigmentflecken entfernen: welche Formen es gibt, was zu Hause wirklich hilft, welche Hausmittel schaden und wann ein Fleck dermatologisch abgeklärt gehört.',
    excerpt: 'Nicht jeder braune Fleck ist dasselbe, und genau daran scheitern die meisten Versuche. Erst die Form bestimmen, dann behandeln.',
    category: 'Hautthemen',
    h1: 'Pigmentflecken im Gesicht',
    lead: 'Sonnenflecken, Melasma und Flecken nach einer Entzündung sehen ähnlich aus und reagieren völlig unterschiedlich. Wer das verwechselt, behandelt monatelang das Falsche. Hier steht, wie du sie auseinanderhältst.',
    readingTime: '9 Min.',
    ctaTitle: 'Unsicher, welche Art von Fleck du hast?',
    ctaText: 'Wir schauen uns die Haut an, ordnen ein und sagen dir ehrlich, was in der Praxis geht und wann die dermatologische Abklärung der richtige erste Schritt ist.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Pigmentflecken entstehen, wenn die pigmentbildenden Zellen der Haut örtlich zu viel Melanin produzieren. Der Auslöser ist fast immer einer von drei Reizen: UV-Strahlung, Hormone oder eine abgeheilte Entzündung.</p>
<p>Das klingt nach einem Thema. Es sind drei, und sie brauchen unterschiedliche Antworten.</p>

<h2>Die Formen unterscheiden</h2>
<p><strong>Sonnenflecken (Lentigines, Altersflecken).</strong> Scharf begrenzt, hellbraun bis dunkelbraun, einzeln stehend. Typisch auf Wangen, Stirn, Handrücken und Dekolleté, also dort, wo über Jahre Sonne hinkam. Reagieren am besten auf Behandlung.</p>
<p><strong>Melasma.</strong> Grossflächig, unscharf begrenzt, oft symmetrisch auf beiden Wangen, über der Oberlippe oder auf der Stirn. Hormonell mitbedingt, tritt häufig in der Schwangerschaft oder unter Pille auf. Hartnäckig, neigt stark zum Wiederkommen und verträgt aggressive Behandlung schlecht.</p>
<p><strong>Postinflammatorische Hyperpigmentierung.</strong> Flecken dort, wo vorher ein Pickel, ein Ekzem oder eine Verletzung war. Verblassen oft von selbst, brauchen aber Monate. Der häufigste Grund, warum <a href="/beschwerden/akne/">Akne</a> auch nach dem Abheilen noch sichtbar bleibt.</p>
<div class="wa-callout"><div class="wa-callout-label">Warum die Unterscheidung zählt</div><p>Ein Sonnenfleck reagiert gut auf aufhellende Wirkstoffe und gezielte Behandlung. Melasma kann durch dieselbe Behandlung schlimmer werden, weil Hitze und Reizung es triggern. Dieselbe Massnahme, gegensätzliches Ergebnis.</p></div>

<h2>Was zu Hause wirklich hilft</h2>
<p><strong>Sonnenschutz, jeden Tag.</strong> Das ist kein Zusatztipp, sondern die Grundlage. Ohne täglichen UV-Schutz ist jede weitere Massnahme verschenkt, weil die Sonne schneller nachpigmentiert als jeder Wirkstoff aufhellt. Auch im Winter, auch bei Bewölkung, auch am Fenster.</p>
<p><strong><a href="/haut/vitamin-c-serum/">Vitamin C</a>.</strong> Hemmt die Melaninbildung und schützt gleichzeitig antioxidativ. Gut belegt, gut verträglich, morgens.</p>
<p><strong>Niacinamid.</strong> Bremst die Weitergabe des Pigments an die Hautzellen. Mild, gut kombinierbar, wirkt langsam.</p>
<p><strong>Azelainsäure.</strong> Besonders bei postinflammatorischer Pigmentierung und bei Melasma eine der verträglicheren Optionen.</p>
<p><strong>Retinoide.</strong> Beschleunigen die Zellerneuerung. Wirksam, brauchen aber Geduld und einen vorsichtigen Einstieg.</p>
<p>Rechne mit <strong>drei bis sechs Monaten</strong>, bis sich sichtbar etwas tut. Wer nach vier Wochen wechselt, sieht nie ein Ergebnis.</p>

<h2>Was nicht hilft und was schadet</h2>
<p><strong>Zitronensaft.</strong> Der Klassiker unter den Hausmitteln und einer der schlechtesten. Reizt die Haut, und in Kombination mit Sonne können phototoxische Reaktionen mit dauerhaft dunkleren Flecken entstehen. Also genau das Gegenteil.</p>
<p><strong>Backpulver und Zahnpasta.</strong> Verschieben den pH-Wert der Haut massiv und zerstören die Barriere. Keinerlei aufhellende Wirkung.</p>
<p><strong>Aggressives mechanisches Peeling.</strong> Mikroverletzungen führen zu Entzündung, Entzündung führt zu Pigment. Der Fleck wird dunkler, nicht heller.</p>
<p><strong>Hydrochinon aus unklarer Quelle.</strong> In der Schweiz in Kosmetika nicht frei verkäuflich. Aus dem Ausland bestellte Cremes enthalten teils zusätzlich Quecksilber oder Kortison. Finger weg.</p>
<div class="wa-pullquote">Fast alles, was Pigmentflecken schlimmer macht, hat denselben Mechanismus: Es reizt die Haut, und gereizte Haut pigmentiert nach.</div>

<h2>Behandlungen im Vergleich</h2>
<p><strong>Chemisches Peeling.</strong> Trägt oberflächliche Pigmentierung schichtweise ab. Bei Sonnenflecken und postinflammatorischer Pigmentierung sinnvoll, bei Melasma nur vorsichtig dosiert.</p>
<p><strong>Laser und IPL.</strong> Am wirksamsten bei einzelnen, scharf begrenzten Sonnenflecken. Bei Melasma mit Vorsicht, weil Hitze es verschlimmern kann, und bei dunkleren Hauttypen mit erhöhtem Risiko für Nachpigmentierung. Gehört in erfahrene Hände.</p>
<p><strong>Microneedling.</strong> Kann bei postinflammatorischer Pigmentierung unterstützen, ist aber kein primäres Mittel gegen Pigment.</p>
<p>Was allen gemeinsam ist: Ohne konsequenten Sonnenschutz danach kommt der Fleck zurück. Jede Behandlung ist nur so gut wie die Nachsorge.</p>

<h2>Wann ein Fleck zum Arzt gehört</h2>
<p>Das ist der wichtigste Abschnitt auf dieser Seite. Lass einen Fleck dermatologisch abklären, wenn er</p>
<ul>
<li>asymmetrisch ist oder unregelmässig begrenzt,</li>
<li>mehrere Farben zeigt oder seine Farbe verändert,</li>
<li>grösser wird, insbesondere über fünf Millimeter,</li>
<li>juckt, blutet, nässt oder nicht abheilt,</li>
<li>sich deutlich von allen anderen Flecken unterscheidet,</li>
<li>oder neu auftritt, ohne dass es eine Erklärung gibt.</li>
</ul>
<p>Kosmetische Behandlung kommt danach, nicht davor. Ein abgeklärter Fleck ist ein sicherer Fleck.</p>

<h2>Was wir machen</h2>
<p>Wir behandeln keine Pigmentflecken mit Laser und stellen keine Diagnose, die in dermatologische Hände gehört. Was wir anbieten, ist die Einordnung und die begleitende Arbeit: <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> bei stressverstärkten und hormonell mitbedingten Hautthemen, <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> zum Entstauen, und ein ehrliches Gespräch darüber, was realistisch ist.</p>
`.trim(),
    faqs: [
      { q: 'Wie werde ich Pigmentflecken im Gesicht los?', a: 'Zuerst die Form bestimmen: Sonnenfleck, Melasma oder Fleck nach einer Entzündung reagieren unterschiedlich. Dann täglicher Sonnenschutz plus ein aufhellender Wirkstoff wie Vitamin C, Niacinamid oder Azelainsäure. Rechne mit drei bis sechs Monaten.' },
      { q: 'Hilft Zitrone gegen Pigmentflecken?', a: 'Nein, und sie kann schaden. Zitronensaft reizt die Haut, und zusammen mit Sonne sind phototoxische Reaktionen möglich, die dauerhaft dunklere Flecken hinterlassen.' },
      { q: 'Was ist der Unterschied zwischen Melasma und Altersflecken?', a: 'Altersflecken sind einzeln, scharf begrenzt und UV-bedingt. Melasma ist grossflächig, unscharf, oft symmetrisch auf beiden Wangen und hormonell mitbedingt. Melasma ist deutlich hartnäckiger und verträgt aggressive Behandlung schlecht.' },
      { q: 'Wie lange dauert es, bis Pigmentflecken verblassen?', a: 'Bei konsequenter Pflege drei bis sechs Monate, bis eine Veränderung sichtbar wird. Flecken nach einer Entzündung verblassen oft von selbst, brauchen aber ebenfalls Monate.' },
      { q: 'Kommen Pigmentflecken nach einer Behandlung zurück?', a: 'Ohne täglichen Sonnenschutz sehr wahrscheinlich, besonders bei Melasma. Jede Behandlung ist nur so gut wie die Nachsorge.' },
      { q: 'Wann muss ich einen Pigmentfleck abklären lassen?', a: 'Wenn er asymmetrisch ist, mehrere Farben zeigt, wächst, juckt, blutet oder sich deutlich von deinen anderen Flecken unterscheidet. Dann zuerst dermatologisch abklären, kosmetische Behandlung erst danach.' },
    ],
    related: [
      { href: '/haut/vitamin-c-serum/', label: 'Vitamin-C-Serum', cat: 'Wirkstoff' },
      { href: '/haut/centella/', label: 'Centella (Cica)', cat: 'Wirkstoff' },
      { href: '/therapien/gesichtsakupunktur/', label: 'Gesichtsakupunktur', cat: 'Behandlung' },
    ],
  },

  // ─────────────────────────────────────────────────────────── K-Beauty
  {
    slug: 'glass-skin',
    title: 'Glass Skin: was dahintersteckt und was davon erreichbar ist',
    metaDesc: 'Glass Skin aus Korea: was der Begriff wirklich meint, welcher Teil Pflege ist und welcher Filter, und welche Routine tatsächlich zu ebenmässiger, reflektierender Haut führt.',
    excerpt: 'Der bekannteste K-Beauty-Begriff, und der am meisten missverstandene. Was Pflege leisten kann und wo das Foto anfängt.',
    category: 'K-Beauty',
    h1: 'Glass Skin: der Anspruch und die Realität',
    lead: 'Glass Skin beschreibt Haut, die Licht gleichmässig reflektiert wie eine Glasscheibe. Ein Teil davon ist erreichbar und hat mit Feuchtigkeit und Hautbarriere zu tun. Ein anderer Teil ist Genetik, Make-up und Kameralinse. Hier steht, welcher Teil welcher ist.',
    readingTime: '7 Min.',
    ctaTitle: 'Haut, die auch ohne Filter ebenmässig aussieht?',
    ctaText: 'In 30 Minuten zeigen wir dir die Gua-Sha-Technik am eigenen Gesicht. Danach kannst du sie zu Hause selbst, und zwar richtig.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Glass Skin, auf Koreanisch 유리 피부, heisst wörtlich Glashaut. Gemeint ist ein Hautbild, das Licht gleichmässig zurückwirft statt es zu streuen: prall, feucht, ohne sichtbare Textur.</p>
<p>Der Begriff kommt aus der koreanischen Beauty-Kultur und ist über Social Media in den Westen gekommen. Dabei ist unterwegs etwas verloren gegangen: Ursprünglich beschreibt er einen <em>Zustand</em> der Haut, keine Eigenschaft, die man dauerhaft besitzt.</p>

<h2>Was tatsächlich dahintersteckt</h2>
<p>Wenn Haut Licht gleichmässig reflektiert, sind fast immer vier Dinge gleichzeitig erfüllt.</p>
<p><strong>Ausreichend Feuchtigkeit in den oberen Hautschichten.</strong> Prall gefüllte Zellen haben eine glattere Oberfläche. Das ist der Punkt, an dem Pflege am meisten ausrichtet.</p>
<p><strong>Eine intakte Hautbarriere.</strong> Beschädigte Barriere heisst raue, schuppige Oberfläche, und die streut Licht in alle Richtungen.</p>
<p><strong>Gleichmässige Textur.</strong> Keine losen Hornschüppchen, keine entzündeten Stellen.</p>
<p><strong>Kein Schwellungsgefühl.</strong> Ein entstautes Gesicht wirkt definierter, und Konturen reflektieren anders als aufgeschwemmte Flächen. Genau hier setzt <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha</a> an.</p>

<h2>Und was nicht dahintersteckt</h2>
<p>Ehrlichkeit an dieser Stelle spart dir viel Geld.</p>
<p><strong>Porengrösse ist nicht veränderbar.</strong> Sie ist genetisch festgelegt. Poren können durch Reinigung und Peeling weniger auffallen, weil sie nicht verstopft sind, aber sie schrumpfen nicht. Jedes Produkt, das das verspricht, verspricht zu viel.</p>
<p><strong>Ein Grossteil dessen, was du siehst, ist Licht und Linse.</strong> Weiches Frontlicht, glättende Kamerafilter und ein feuchtigkeitsspendendes Make-up erzeugen den Glass-Skin-Look zuverlässiger als jede Routine.</p>
<p><strong>Feuchtigkeit ist kein Dauerzustand.</strong> Der pralle Effekt hält Stunden, nicht Wochen. Deshalb ist Glass Skin ein Zustand, kein Ziel, das man abhakt.</p>
<div class="wa-pullquote">Erreichbar ist gesunde, gut befeuchtete Haut mit intakter Barriere. Das sieht sehr gut aus. Es sieht nur nicht aus wie ein Instagram-Post.</div>

<h2>Die Routine, die tatsächlich etwas bringt</h2>
<p>Die koreanische Zehn-Schritte-Routine ist berühmt und für die meisten Menschen unnötig. Was zählt, sind fünf Dinge.</p>
<ul>
<li><strong>Milde Reinigung.</strong> Abends doppelt, wenn du Make-up oder Sonnenschutz trägst: erst ölbasiert, dann wasserbasiert. Morgens reicht Wasser oder ein sehr mildes Produkt.</li>
<li><strong>Feuchtigkeit schichten, solange die Haut feucht ist.</strong> Das ist der eigentliche Kern der koreanischen Methode. Zwei dünne Schichten auf leicht feuchte Haut wirken besser als eine dicke auf trockene.</li>
<li><strong>Ein Feuchthaltemittel.</strong> Hyaluronsäure, Glycerin oder Panthenol, gefolgt von etwas, das die Feuchtigkeit einschliesst.</li>
<li><strong>Peeling in Massen.</strong> Ein- bis zweimal pro Woche chemisch, nicht mechanisch. Mehr ruiniert genau die Barriere, um die es geht.</li>
<li><strong>Sonnenschutz, täglich.</strong> Der einzige Schritt, der langfristig über das Hautbild entscheidet.</li>
</ul>
<p>Beruhigende Wirkstoffe wie <a href="/haut/centella/">Centella</a> passen gut dazu, besonders wenn die Barriere gereizt ist. Für Ebenmässigkeit über die Zeit ist <a href="/haut/vitamin-c-serum/">Vitamin C</a> der sinnvollere Wirkstoff.</p>

<h2>Was in der Praxis geht</h2>
<p>Der Anteil, den eine Behandlung beitragen kann, liegt beim Entstauen und bei der Textur, nicht bei den Poren.</p>
<p><a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> arbeitet entlang der Lymphbahnen und des Kiefers, das Gesicht wirkt danach entspannter und weniger geschwollen. <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> ist der Weg, wenn Hautbild und Spannung das eigentliche Thema sind.</p>
<p>Was beides nicht tut: die Hautstruktur dauerhaft verändern. Das sagen wir vorher, nicht nachher.</p>
`.trim(),
    faqs: [
      { q: 'Was bedeutet Glass Skin?', a: 'Der koreanische Begriff 유리 피부 beschreibt Haut, die Licht gleichmässig reflektiert statt es zu streuen: prall, feucht, ohne sichtbare Textur. Gemeint ist ein Zustand der Haut, keine dauerhafte Eigenschaft.' },
      { q: 'Kann jeder Glass Skin bekommen?', a: 'Gesunde, gut befeuchtete Haut mit intakter Barriere ist für die meisten erreichbar. Das Bild aus den sozialen Medien nicht, denn dort tragen Licht, Kamera und Make-up einen grossen Teil bei.' },
      { q: 'Werden Poren durch die Routine kleiner?', a: 'Nein. Porengrösse ist genetisch festgelegt. Poren fallen weniger auf, wenn sie nicht verstopft sind, aber sie schrumpfen nicht. Produkte, die das versprechen, versprechen zu viel.' },
      { q: 'Brauche ich wirklich zehn Schritte?', a: 'Nein. Milde Reinigung, Feuchtigkeit auf leicht feuchter Haut schichten, ein Feuchthaltemittel, massvolles Peeling und täglicher Sonnenschutz decken das Wesentliche ab.' },
      { q: 'Wie lange hält der Effekt?', a: 'Der pralle, reflektierende Effekt hält Stunden. Die Grundlage, also eine intakte Barriere und gleichmässige Textur, baust du über Wochen auf und musst sie erhalten.' },
      { q: 'Hilft Gua Sha für Glass Skin?', a: 'Beim Entstauen ja, ein entspanntes, abgeschwollenes Gesicht wirkt definierter. Die Hautstruktur selbst verändert Gua Sha nicht.' },
    ],
    related: [
      { href: '/therapien/gua-sha/gesichts-gua-sha/', label: 'Gua Sha fürs Gesicht', cat: 'Behandlung' },
      { href: '/haut/centella/', label: 'Centella (Cica)', cat: 'Wirkstoff' },
      { href: '/haut/vitamin-c-serum/', label: 'Vitamin-C-Serum', cat: 'Wirkstoff' },
    ],
  },
  // ─────────────────────────────────────────────────────────── Methoden
  {
    slug: 'microneedling',
    title: 'Microneedling: Ablauf, Kosten, was realistisch ist',
    metaDesc: 'Microneedling im Gesicht: wie die Behandlung abläuft, was sie realistisch bringt, wie oft sie nötig ist, was sie in der Schweiz kostet und wann sie nicht in Frage kommt.',
    excerpt: 'Die meistgesuchte Gesichtsbehandlung überhaupt. Was sie kann, was die Bilder im Netz verschweigen und wann eine sanftere Methode der bessere Weg ist.',
    category: 'Methoden',
    h1: 'Microneedling im Gesicht',
    lead: 'Feine Nadeln setzen kontrollierte Mikroverletzungen, der Körper repariert und bildet dabei neues Kollagen. Das Prinzip ist gut belegt. Was daraus im Einzelfall wird, hängt an Nadellänge, Anzahl der Sitzungen und daran, wer es macht.',
    readingTime: '10 Min.',
    ctaTitle: 'Unsicher, ob Microneedling das Richtige ist?',
    ctaText: 'Wir bieten kein Microneedling an. Wir sagen dir aber ehrlich, ob dein Thema eher eine Struktur- oder eine Spannungsfrage ist, und was in unserer Praxis dafür sinnvoll wäre.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Microneedling arbeitet mit einem einfachen Prinzip: Feine Nadeln erzeugen kontrollierte Mikroverletzungen in der Haut. Der Körper repariert diese Kanäle, und im Zuge dieser Reparatur bildet er neues Kollagen und Elastin. Nicht die Nadel wirkt, sondern die Heilung danach.</p>
<p>Gearbeitet wird heute fast immer mit einem <strong>Dermapen</strong>, einem stiftförmigen Gerät mit oszillierenden Nadeln. Der klassische Dermaroller ist in professionellen Händen weitgehend abgelöst, weil er die Haut schräg einsticht und dabei stärker reisst.</p>

<h2>Wie eine Behandlung abläuft</h2>
<p>Zuerst Reinigung und eine Betäubungscreme, die 20 bis 30 Minuten einwirkt. Ohne sie ist die Behandlung an Stirn und Nase unangenehm.</p>
<p>Danach wird das Gesicht in Bahnen abgefahren, mehrfach in unterschiedliche Richtungen. Die Nadellänge liegt in der Praxis meist zwischen 0,5 und 2,5 Millimetern, je nach Areal und Ziel: flacher an den Augenpartien, tiefer bei Narben.</p>
<p>Zum Abschluss folgt ein beruhigendes Serum. Die eigentliche Behandlung dauert 20 bis 30 Minuten, mit Vorbereitung rechne mit gut einer Stunde.</p>

<h2>Was realistisch dabei herauskommt</h2>
<p>Hier weichen Erwartung und Ergebnis am weitesten auseinander, deshalb der Reihe nach.</p>
<p><strong>Gut belegt:</strong> Verbesserung von Aknenarben, besonders bei eingesunkenen Narben. Das ist der Bereich mit der solidesten Studienlage.</p>
<p><strong>Ordentlich belegt:</strong> feinere Hauttextur, kleiner wirkende Poren, gleichmässigeres Hautbild über mehrere Sitzungen.</p>
<p><strong>Schwach belegt:</strong> deutliche Faltenreduktion. Feine Linien können weicher werden, tiefe Falten verschwinden nicht.</p>
<p><strong>Nicht belegt:</strong> Straffung im Sinne einer Konturveränderung. Wer hängende Konturen adressieren will, ist mit Microneedling an der falschen Adresse.</p>
<div class="wa-callout"><div class="wa-callout-label">Zu Vorher-Nachher-Bildern</div><p>Sie sind der meistgesuchte Begriff rund um diese Behandlung und der am wenigsten verlässliche. Licht, Winkel, Make-up und der Zeitpunkt im Heilungsverlauf verändern das Bild stärker als die Behandlung selbst. Wir zeigen keine, und du solltest denen im Netz mit Vorsicht begegnen.</p></div>

<h2>Wie oft und wie viele Sitzungen</h2>
<p>Üblich sind <strong>drei bis sechs Sitzungen im Abstand von vier bis sechs Wochen</strong>. Der Abstand ist nicht verhandelbar: Kollagenaufbau braucht Wochen, häufigeres Behandeln reizt nur.</p>
<p>Bei Narben eher am oberen Ende, bei reiner Texturverbesserung reichen oft drei. Danach Erhaltungssitzungen zwei- bis dreimal jährlich.</p>
<p>Das sichtbare Ergebnis kommt verzögert. Rechne mit <strong>zwei bis drei Monaten</strong> nach Abschluss der Serie, bis der Kollagenaufbau greift.</p>

<h2>Was es in der Schweiz kostet</h2>
<p>Eine Einzelsitzung liegt je nach Anbieter und Areal etwa zwischen <strong>CHF 250 und 450</strong>, Serienpreise entsprechend günstiger pro Sitzung. Kombinationen mit Wirkstoffinfusion oder Radiofrequenz liegen darüber.</p>
<p>Kosmetische Behandlungen werden von der Krankenkasse nicht übernommen. Eine Ausnahme kann bei medizinisch indizierter Narbenbehandlung bestehen, das klärst du mit deiner Versicherung vorab, nicht danach.</p>

<h2>Heilung und Ausfallzeit</h2>
<p>Direkt nach der Behandlung ist die Haut deutlich gerötet, vergleichbar mit einem kräftigen Sonnenbrand. Am zweiten Tag lässt die Rötung nach, es kann leicht spannen und schuppen. Nach drei bis fünf Tagen ist die Haut in der Regel wieder unauffällig.</p>
<p>In dieser Zeit: kein Make-up am Behandlungstag, keine Säuren, kein Retinol, keine Sauna, kein Sport am ersten Tag, und konsequent Sonnenschutz. Frisch behandelte Haut pigmentiert leicht nach, das ist der häufigste vermeidbare Fehler.</p>
<p>Plane die Behandlung nicht kurz vor einem wichtigen Termin. Eine Woche Abstand ist realistisch.</p>

<h2>Risiken und wann es nicht in Frage kommt</h2>
<p>In geübten Händen ist Microneedling risikoarm. Es ist aber kein harmloses Verwöhnprogramm.</p>
<ul>
<li>Bei aktiver, entzündlicher <a href="/beschwerden/akne/">Akne</a> werden Bakterien verschleppt, das verschlimmert das Bild.</li>
<li>Bei <a href="/beschwerden/rosacea/">Rosacea</a> im Schub und bei aktivem Lippenherpes nicht behandeln.</li>
<li>Bei <a href="/haut/pigmentflecken/">Melasma</a> mit Vorsicht: Die Entzündungsreaktion kann nachpigmentieren lassen.</li>
<li>Bei Neigung zu Keloiden, bei Blutgerinnungsstörungen und unter Isotretinoin gehört die Entscheidung in ärztliche Hände.</li>
</ul>
<p>Und der wichtigste Punkt: Wer es macht, entscheidet mehr als das Gerät. Unsaubere Technik hinterlässt Narben statt sie zu behandeln.</p>

<h2>Microneedling zu Hause</h2>
<p>Dermaroller für den Heimgebrauch gibt es überall, und sie sind etwas grundsätzlich anderes als die Behandlung in der Praxis. Was zu Hause sinnvoll ist, wo die Grenze verläuft und welche Nadellänge gefährlich wird, steht separat unter <a href="/haut/microneedling-zuhause/">Microneedling zu Hause</a>.</p>

<h2>Die sanftere Alternative</h2>
<p>Microneedling ist eine Strukturbehandlung. Wenn dein eigentliches Thema aber Spannung, Schwellungsgefühl oder ein müdes Hautbild ist, arbeitest du damit am falschen Problem, mit Ausfallzeit und Kosten obendrauf.</p>
<p>Dafür ist <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> der ruhigere Weg, und <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> der sanfteste. Beide ohne Ausfallzeit. Was sie nicht tun: eingesunkene Narben auffüllen. Da ist Microneedling die richtige Methode, und wir sagen dir das auch.</p>
`.trim(),
    faqs: [
      { q: 'Wie oft muss man Microneedling machen?', a: 'Üblich sind drei bis sechs Sitzungen im Abstand von vier bis sechs Wochen, danach Erhaltungssitzungen zwei- bis dreimal jährlich. Der Abstand ist wichtig, weil Kollagenaufbau Wochen braucht.' },
      { q: 'Was kostet Microneedling in der Schweiz?', a: 'Eine Einzelsitzung liegt je nach Anbieter und Areal etwa zwischen CHF 250 und 450. Serien sind pro Sitzung günstiger. Die Krankenkasse übernimmt kosmetische Behandlungen nicht.' },
      { q: 'Wie lange dauert die Heilung nach Microneedling?', a: 'Am Behandlungstag ist die Haut deutlich gerötet, ab dem zweiten Tag lässt es nach, nach drei bis fünf Tagen ist sie in der Regel wieder unauffällig. Plane eine Woche Abstand vor wichtigen Terminen.' },
      { q: 'Hilft Microneedling gegen Falten?', a: 'Bei feinen Linien kann sich die Textur verbessern. Tiefe Falten verschwinden nicht, und eine Straffung im Sinne einer Konturveränderung leistet Microneedling nicht. Am besten belegt ist die Wirkung bei eingesunkenen Aknenarben.' },
      { q: 'Wann sieht man Ergebnisse?', a: 'Verzögert. Der Kollagenaufbau braucht Zeit, sichtbare Veränderungen zeigen sich meist zwei bis drei Monate nach Abschluss der Serie.' },
      { q: 'Wann darf man kein Microneedling machen?', a: 'Bei aktiver entzündlicher Akne, Rosacea im Schub, aktivem Lippenherpes, Neigung zu Keloiden, Blutgerinnungsstörungen und unter Isotretinoin. Bei Melasma nur mit Vorsicht, weil die Entzündungsreaktion nachpigmentieren lassen kann.' },
    ],
    related: [
      { href: '/haut/microneedling-zuhause/', label: 'Microneedling zu Hause', cat: 'Methode' },
      { href: '/haut/pigmentflecken/', label: 'Pigmentflecken', cat: 'Hautthema' },
      { href: '/therapien/gesichtsakupunktur/', label: 'Gesichtsakupunktur', cat: 'Behandlung' },
    ],
  },

  {
    slug: 'microneedling-zuhause',
    title: 'Microneedling zu Hause: was geht und wo die Grenze ist',
    metaDesc: 'Dermaroller zu Hause: welche Nadellänge sicher ist, warum alles ab 0,5 mm in die Praxis gehört, wie Hygiene funktioniert und was realistisch dabei herauskommt.',
    excerpt: 'Ein Dermaroller kostet zwanzig Franken und kann Narben hinterlassen. Die Nadellänge entscheidet, und die meisten wählen sie falsch.',
    category: 'Methoden',
    h1: 'Microneedling zu Hause',
    lead: 'Heimgeräte und Praxisbehandlung teilen sich den Namen und sonst wenig. Bei 0,25 Millimetern geht es um bessere Wirkstoffaufnahme, ab 1,0 Millimetern um kontrollierte Verletzung. Wer den Unterschied nicht kennt, kauft sich ein Risiko.',
    readingTime: '7 Min.',
    ctaTitle: 'Lieber einmal richtig zeigen lassen?',
    ctaText: 'In 30 Minuten zeigen wir dir eine Technik, die zu Hause tatsächlich sicher ist: Druck, Richtung, Reihenfolge am eigenen Gesicht.',
    ctaHref: '/therapien/gua-sha/gesichts-gua-sha/',
    ctaLabel: 'Gua Sha fürs Gesicht',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Dermaroller für zu Hause kosten zwischen zwanzig und achtzig Franken und sind frei verkäuflich. Genau das ist das Problem: Die Geräte unterscheiden sich äusserlich kaum, in der Wirkung und im Risiko aber fundamental. Der Unterschied steht klein auf der Packung und heisst Nadellänge.</p>

<h2>Die Nadellänge entscheidet alles</h2>
<p><strong>0,2 bis 0,3 mm.</strong> Erreicht die oberste Hornschicht. Verletzt praktisch nichts, verbessert die Aufnahme von Wirkstoffen. Das ist der einzige Bereich, der zu Hause unbedenklich ist.</p>
<p><strong>0,5 mm.</strong> Erreicht die obere Lederhaut, es kann punktuell bluten. Grenzbereich. Wird oft für zu Hause verkauft, gehört aus unserer Sicht schon nicht mehr dorthin.</p>
<p><strong>1,0 mm und mehr.</strong> Echte Mikroverletzungen bis in die Lederhaut. Das ist Praxisterritorium, und zwar aus zwei Gründen: Sterilität und Technik. Ein unsauber geführter Roller reisst statt zu stechen, und aus einer Reissverletzung wird Narbengewebe.</p>
<div class="wa-callout"><div class="wa-callout-label">Die klare Linie</div><p>Bis 0,3 mm: zu Hause vertretbar, Wirkung bescheiden. Ab 0,5 mm: in die Praxis. Es gibt keine Nadellänge, bei der ein Heimgerät dieselbe Wirkung wie eine Praxisbehandlung erzielt, ohne dasselbe Risiko mitzubringen.</p></div>

<h2>Roller oder Stift?</h2>
<p>Der Roller sticht durch die Rollbewegung schräg ein und zieht die Nadel schräg wieder heraus. Das erzeugt eine längliche Verletzung statt eines Kanals. Bei kurzen Nadeln ist das egal, bei langen nicht.</p>
<p>Stiftgeräte für zu Hause stechen senkrecht und sind insofern schonender. Sie sind teurer, brauchen Wechselaufsätze, und sie verleiten dazu, tiefere Einstellungen zu wählen, weil es sich kontrollierter anfühlt. Es ist es nicht.</p>

<h2>Hygiene, der unterschätzte Teil</h2>
<p>Ein Heimgerät ist nach dem ersten Gebrauch nicht mehr steril, egal was auf der Packung steht.</p>
<ul>
<li>Vor und nach jeder Anwendung mindestens zehn Minuten in 70-prozentigem Isopropylalkohol.</li>
<li>Vollständig trocknen lassen, in der mitgelieferten Box lagern, nie offen im Bad.</li>
<li>Nach zehn bis fünfzehn Anwendungen ersetzen. Nadeln werden stumpf, und stumpfe Nadeln reissen.</li>
<li>Niemals teilen. Auch nicht in der Familie.</li>
</ul>
<p>Wer diesen Aufwand nicht betreiben will, sollte kein Gerät kaufen. Eine Infektion in der Gesichtshaut ist deutlich unangenehmer als ein Serum, das etwas schlechter einzieht.</p>

<h2>Was zu Hause realistisch dabei herauskommt</h2>
<p>Bei 0,25 mm regelmässig angewendet: Wirkstoffe ziehen besser ein, die Haut wirkt kurzfristig etwas frischer. Das ist ehrlich gesagt der ganze Effekt.</p>
<p>Was zu Hause nicht passiert: Narbenbehandlung, Kollagenaufbau in relevantem Umfang, Texturveränderung über Monate. Dafür braucht es Eindringtiefen, die zu Hause nicht sicher zu erreichen sind. Alles dazu steht unter <a href="/haut/microneedling/">Microneedling in der Praxis</a>.</p>

<h2>Wann du besser die Finger davon lässt</h2>
<ul>
<li>Bei aktiver entzündlicher <a href="/beschwerden/akne/">Akne</a>. Du verteilst Bakterien über das ganze Gesicht.</li>
<li>Bei <a href="/beschwerden/rosacea/">Rosacea</a>, gereizter Haut oder Sonnenbrand.</li>
<li>Bei aktivem Lippenherpes.</li>
<li>Bei Neigung zu <a href="/haut/pigmentflecken/">Pigmentflecken</a>. Jede Reizung kann nachpigmentieren.</li>
<li>Unter Blutverdünnern oder Isotretinoin.</li>
</ul>
<p>Nach der Anwendung gilt dasselbe wie in der Praxis: keine Säuren, kein Retinol, kein Duft, und am nächsten Tag Sonnenschutz.</p>

<h2>Die sinnvollere Heimroutine</h2>
<p>Wenn es dir um frischere, entstautere Haut geht, ist ein Gua-Sha-Stein die risikoärmere Investition. Er verletzt nichts, kostet weniger und arbeitet an Lymphfluss und Kieferspannung, also genau an dem, was viele eigentlich meinen, wenn sie «müde Haut» sagen.</p>
<p>Die Technik ist allerdings leichter falsch als richtig gemacht. Wir zeigen sie in 30 Minuten am eigenen Gesicht: <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha fürs Gesicht</a>.</p>
`.trim(),
    faqs: [
      { q: 'Welche Nadellänge ist für zu Hause sicher?', a: 'Bis 0,3 mm. Das erreicht nur die oberste Hornschicht und verbessert die Wirkstoffaufnahme. Ab 0,5 mm entstehen echte Verletzungen, das gehört in die Praxis.' },
      { q: 'Bringt Microneedling zu Hause überhaupt etwas?', a: 'Bei 0,25 mm ziehen Wirkstoffe besser ein und die Haut wirkt kurzfristig frischer. Kollagenaufbau, Narbenbehandlung oder Texturveränderung sind zu Hause nicht erreichbar.' },
      { q: 'Wie reinige ich einen Dermaroller?', a: 'Vor und nach jeder Anwendung mindestens zehn Minuten in 70-prozentigem Isopropylalkohol, vollständig trocknen lassen, in der Box lagern. Nach zehn bis fünfzehn Anwendungen ersetzen.' },
      { q: 'Wie oft darf ich zu Hause rollen?', a: 'Bei 0,25 mm ein- bis zweimal pro Woche. Häufiger reizt die Haut, ohne mehr zu bringen.' },
      { q: 'Ist ein Dermapen besser als ein Dermaroller?', a: 'Stiftgeräte stechen senkrecht statt schräg und sind insofern schonender. Sie verleiten aber zu tieferen Einstellungen, weil sie sich kontrollierter anfühlen. Die Nadellängen-Grenze gilt trotzdem.' },
      { q: 'Kann Microneedling zu Hause Narben verursachen?', a: 'Ja, bei zu langen Nadeln, schräger Führung oder stumpfen Nadeln. Aus einer Reissverletzung kann Narbengewebe entstehen. Das ist der Hauptgrund für die 0,3-mm-Grenze.' },
    ],
    related: [
      { href: '/haut/microneedling/', label: 'Microneedling in der Praxis', cat: 'Methode' },
      { href: '/therapien/gua-sha/gesichts-gua-sha/', label: 'Gua Sha fürs Gesicht', cat: 'Behandlung' },
      { href: '/haut/centella/', label: 'Centella (Cica)', cat: 'Wirkstoff' },
    ],
  },

  {
    slug: 'profhilo',
    title: 'Profhilo: was es ist, was es kostet, was es nicht kann',
    metaDesc: 'Profhilo ist kein Filler: stabilisierte Hyaluronsäure, fünf Injektionspunkte pro Seite, zwei Sitzungen. Ablauf, realistische Erwartung, Kosten in der Schweiz und Grenzen.',
    excerpt: 'Wird oft mit Filler verwechselt und funktioniert völlig anders. Was es tatsächlich macht und für wen es sich lohnt.',
    category: 'Methoden',
    h1: 'Profhilo',
    lead: 'Profhilo ist hochkonzentrierte, stabilisierte Hyaluronsäure, die sich im Gewebe verteilt statt Volumen aufzubauen. Es ist ausdrücklich kein Filler, und genau diese Verwechslung führt zu enttäuschten Erwartungen.',
    readingTime: '8 Min.',
    ctaTitle: 'Nicht sicher, ob es an der Struktur liegt?',
    ctaText: 'Wir bieten keine Injektionsbehandlungen an. Wir ordnen aber ein, ob dein Thema Struktur, Spannung oder Schwellung ist, und was davon wir sinnvoll behandeln können.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Profhilo ist ein Markenname für ein injizierbares Präparat aus stabilisierter Hyaluronsäure in sehr hoher Konzentration. Anders als ein Filler wird es nicht dort platziert, wo Volumen fehlt, sondern verteilt sich nach der Injektion im Gewebe.</p>
<p class="wa-callout"><strong>Zur Einordnung:</strong> Wir bieten diese Behandlung nicht an und verdienen nichts daran. Dieser Artikel erklärt sie, weil sie häufig gesucht wird und weil die Abgrenzung zu Fillern selten sauber gemacht wird.</p>

<h2>Kein Filler, und warum das wichtig ist</h2>
<p><strong>Ein Filler</strong> ist quervernetzt und bleibt, wo er gesetzt wird. Er baut gezielt Volumen auf: Wange, Lippe, Nasolabialfalte.</p>
<p><strong>Profhilo</strong> ist nicht quervernetzt. Es breitet sich nach der Injektion flächig aus und wirkt über die Feuchtigkeitsbindung im Gewebe. Es füllt keine einzelne Falte auf.</p>
<p>Wer mit der Erwartung hingeht, eine bestimmte Falte verschwinden zu sehen, wird enttäuscht. Wer eine allgemein besser hydrierte, etwas straffere Hautqualität erwartet, liegt näher an dem, was das Präparat leistet.</p>

<h2>Wie eine Behandlung abläuft</h2>
<p>Injiziert wird an <strong>fünf definierten Punkten pro Gesichtshälfte</strong>, dem sogenannten BAP-Schema. Diese Punkte sind so gewählt, dass sich das Material gleichmässig verteilt und grössere Gefässe gemieden werden.</p>
<p>Die Behandlung dauert 15 bis 20 Minuten. Betäubungscreme ist möglich, viele verzichten darauf. An den Einstichstellen bilden sich kurzfristig kleine Quaddeln, die innerhalb weniger Stunden verschwinden.</p>
<p>Das Standardprotokoll sind <strong>zwei Sitzungen im Abstand von vier Wochen</strong>, danach Auffrischung nach etwa sechs Monaten.</p>

<h2>Was realistisch dabei herauskommt</h2>
<p>Beschrieben und in Studien gemessen wird eine Verbesserung der Hautqualität: mehr Feuchtigkeit, etwas mehr Elastizität, ein gleichmässigeres Hautbild. Die Effekte sind real, aber moderat.</p>
<p>Nicht zu erwarten ist ein Lifting-Effekt, eine Konturveränderung oder das Verschwinden tiefer Falten. Wer das sucht, sucht eine andere Behandlung, und ehrliche Anbieter sagen das im Beratungsgespräch.</p>
<p>Sichtbar wird das Ergebnis <strong>etwa vier Wochen nach der zweiten Sitzung</strong>, nicht sofort.</p>

<h2>Was es in der Schweiz kostet</h2>
<p>Eine Sitzung liegt üblicherweise zwischen <strong>CHF 500 und 800</strong>. Da zwei Sitzungen zum Protokoll gehören, plane für den Zyklus mit <strong>CHF 1'000 bis 1'600</strong>, plus Auffrischung nach etwa sechs Monaten.</p>
<p>Keine Kassenleistung, es handelt sich um eine rein ästhetische Behandlung.</p>

<h2>Risiken und wann es nicht in Frage kommt</h2>
<p>Häufig und harmlos: kleine Blutergüsse an den Einstichstellen, kurzfristige Schwellung, Druckempfindlichkeit für ein bis zwei Tage.</p>
<p>Selten, aber ernst: Gefässverschluss durch versehentliche intravasale Injektion. Genau deshalb ist die Wahl der behandelnden Person keine Preisfrage. Injektionen im Gesicht gehören in ärztliche Hände mit anatomischer Ausbildung.</p>
<p>Nicht behandelt wird bei Schwangerschaft und Stillzeit, bei Autoimmunerkrankungen im aktiven Schub, bei Entzündungen im Behandlungsareal und bei bekannter Überempfindlichkeit gegen Hyaluronsäure-Präparate.</p>

<h2>Die sanftere Alternative</h2>
<p>Profhilo adressiert Hautqualität über Feuchtigkeitsbindung im Gewebe. Wenn dein Thema aber Spannung, ein müdes Hautbild oder ein Schwellungsgefühl am Morgen ist, liegt die Ursache woanders, und eine Injektion ist der aufwendigste denkbare Weg dorthin.</p>
<p><a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> arbeitet ohne Präparat, <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> ohne Nadeln. Beide ohne Ausfallzeit. Was sie nicht leisten: die Feuchtigkeitsbindung im Gewebe verändern. Wenn es genau darum geht, ist Profhilo die passendere Methode.</p>
`.trim(),
    faqs: [
      { q: 'Ist Profhilo ein Filler?', a: 'Nein. Ein Filler ist quervernetzt und baut gezielt Volumen auf. Profhilo ist nicht quervernetzt, verteilt sich flächig im Gewebe und wirkt über Feuchtigkeitsbindung. Es füllt keine einzelne Falte auf.' },
      { q: 'Wie viele Sitzungen braucht Profhilo?', a: 'Das Standardprotokoll sind zwei Sitzungen im Abstand von vier Wochen, danach eine Auffrischung nach etwa sechs Monaten.' },
      { q: 'Was kostet Profhilo in der Schweiz?', a: 'Eine Sitzung liegt üblicherweise zwischen CHF 500 und 800. Da zwei Sitzungen zum Protokoll gehören, plane für den Zyklus mit CHF 1000 bis 1600. Keine Kassenleistung.' },
      { q: 'Wann sieht man das Ergebnis?', a: 'Etwa vier Wochen nach der zweiten Sitzung. Direkt danach sieht man nur die Quaddeln an den Einstichstellen, die innerhalb weniger Stunden verschwinden.' },
      { q: 'Hilft Profhilo gegen tiefe Falten?', a: 'Nein. Erwartbar ist eine Verbesserung der Hautqualität, also Feuchtigkeit, Elastizität und Ebenmässigkeit. Ein Lifting-Effekt oder das Verschwinden tiefer Falten gehört nicht dazu.' },
      { q: 'Bietet TCM.ch Profhilo an?', a: 'Nein. Wir führen keine Injektionsbehandlungen durch. Dieser Artikel dient der Einordnung, nicht der Bewerbung.' },
    ],
    related: [
      { href: '/haut/ultherapy-hifu/', label: 'Ultherapy und HIFU', cat: 'Methode' },
      { href: '/haut/rejuran-pdrn/', label: 'Rejuran und PDRN', cat: 'Methode' },
      { href: '/therapien/gesichtsakupunktur/', label: 'Gesichtsakupunktur', cat: 'Behandlung' },
    ],
  },

  {
    slug: 'rejuran-pdrn',
    title: 'Rejuran und PDRN: der koreanische Hautbooster erklärt',
    metaDesc: 'Rejuran und PDRN aus Lachs-DNA: wie das Prinzip funktioniert, was die Studienlage hergibt, wie der Zulassungsstatus in der Schweiz aussieht und worauf du achten musst.',
    excerpt: 'Aus Korea, aus Lachs-DNA, und in der Schweiz regulatorisch nicht so klar wie oft dargestellt. Was du vor einer Behandlung wissen solltest.',
    category: 'Methoden',
    h1: 'Rejuran und PDRN',
    lead: 'PDRN sind Polynukleotide, gewonnen aus Lachs-DNA. Rejuran ist die bekannteste koreanische Marke dafür. Das Prinzip ist interessant, die Studienlage überschaubar, und der Zulassungsstatus in der Schweiz ist der Punkt, über den am wenigsten gesprochen wird.',
    readingTime: '8 Min.',
    ctaTitle: 'Fragen zu koreanischen Behandlungen?',
    ctaText: 'Wir arbeiten mit koreanischen Methoden, aber ohne injizierbare Präparate. Wir sagen dir ehrlich, was davon in der Schweiz seriös verfügbar ist.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>PDRN steht für Polydesoxyribonukleotid, eine Kette von DNA-Bausteinen, die aus der Keimdrüse von Lachsen gewonnen wird. Der Gedanke dahinter: Diese Bausteine ähneln menschlicher DNA stark genug, dass sie im Gewebe Reparaturprozesse anstossen können.</p>
<p><strong>Rejuran</strong> ist der bekannteste koreanische Markenname für ein solches Präparat und praktisch synonym mit der Behandlung geworden, ähnlich wie Tempo für Papiertaschentücher.</p>
<p class="wa-callout"><strong>Zur Einordnung:</strong> Wir bieten diese Behandlung nicht an. Wir schreiben darüber, weil sie zunehmend gesucht wird und weil rund um die Verfügbarkeit in der Schweiz viel Unklares steht.</p>

<h2>Wie das Prinzip funktioniert</h2>
<p>PDRN wirkt nicht mechanisch wie ein Filler und nicht über Feuchtigkeitsbindung wie <a href="/haut/profhilo/">Profhilo</a>. Beschrieben wird ein biologischer Weg: Anregung der Fibroblasten, Förderung der Kollagenbildung, entzündungshemmende Effekte.</p>
<p>In der Wundheilung und in der Behandlung von Verbrennungen wird PDRN seit längerem eingesetzt, dort gibt es eine belastbarere Datenbasis. Die ästhetische Anwendung im Gesicht ist die jüngere und deutlich schwächer untersuchte Verwendung.</p>

<h2>Wie eine Behandlung abläuft</h2>
<p>Injiziert wird oberflächlich in vielen kleinen Depots über das gesamte Gesicht, meist mit Betäubungscreme. Die Behandlung dauert 20 bis 30 Minuten.</p>
<p>Typisch sind <strong>drei bis vier Sitzungen im Abstand von zwei bis vier Wochen</strong>. Direkt danach sind die Quaddeln sichtbar, dazu Rötung und häufig kleine Blutergüsse. Rechne mit zwei bis drei Tagen, in denen man es sieht.</p>

<h2>Was die Studienlage hergibt</h2>
<p>Hier ist Zurückhaltung angebracht. Es gibt Studien, die eine Verbesserung von Hautelastizität und Feuchtigkeit zeigen. Sie sind überwiegend klein, häufig in Korea durchgeführt und oft ohne unabhängige Finanzierung.</p>
<p>Das heisst nicht, dass nichts passiert. Es heisst, dass die Evidenz nicht auf dem Niveau ist, das die Vermarktung nahelegt. Wer eine Behandlung mit dieser Preisklasse erwägt, sollte das wissen.</p>
<div class="wa-pullquote">Interessantes Prinzip, dünne ästhetische Datenlage, und in der Schweiz ein Zulassungsthema, das man vor der Behandlung klären muss, nicht danach.</div>

<h2>Der Punkt, über den kaum jemand spricht: Zulassung</h2>
<p>Injizierbare Präparate unterliegen in der Schweiz der Heilmittelgesetzgebung. Ob ein bestimmtes PDRN-Produkt hier verkehrsfähig ist, hängt am konkreten Präparat und an seiner Klassifizierung, und die Lage ist nicht bei jedem Anbieter dieselbe.</p>
<p>Was das für dich heisst, ganz praktisch: <strong>Frag vor der Behandlung nach dem konkreten Produktnamen und danach, auf welcher Grundlage es in der Schweiz eingesetzt wird.</strong> Eine seriöse Praxis beantwortet das ohne Zögern. Wer ausweicht oder auf «direkt aus Korea» verweist, ist die falsche Adresse.</p>
<p>Bei Präparaten aus Grauimport hast du im Schadensfall zudem keine belastbare Haftungsgrundlage.</p>

<h2>Risiken</h2>
<p>Häufig: Quaddeln, Rötung, Blutergüsse, Druckempfindlichkeit über einige Tage.</p>
<p>Zu beachten: Das Präparat stammt aus Fisch. Bei bekannter Fischallergie ist das ein Ausschlusskriterium, das im Beratungsgespräch aktiv angesprochen werden muss.</p>
<p>Wie bei jeder Injektion im Gesicht gilt: Infektionen und Gefässkomplikationen sind selten, aber möglich, und die Qualifikation der behandelnden Person entscheidet mehr als das Präparat.</p>

<h2>Was in der Schweiz kostet</h2>
<p>Eine Sitzung liegt je nach Anbieter etwa zwischen <strong>CHF 450 und 750</strong>. Für die übliche Serie von drei bis vier Sitzungen kommst du auf <strong>CHF 1'400 bis 3'000</strong>. Keine Kassenleistung.</p>

<h2>Die koreanische Alternative ohne Nadel</h2>
<p>Wenn dich am koreanischen Ansatz die Systematik interessiert, das Schichten, die Regelmässigkeit, die Geduld über Wochen, dann bekommst du davon einen guten Teil ohne Injektion.</p>
<p><a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> und <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> arbeiten beide mit dem Prinzip wiederholter, dosierter Reize über Zeit. Was sie nicht tun: Polynukleotide ins Gewebe bringen. Wenn es genau darum geht, führt kein Weg an der Injektion vorbei, und dann bitte mit geklärtem Präparat.</p>
`.trim(),
    faqs: [
      { q: 'Was ist PDRN?', a: 'Polydesoxyribonukleotid, eine Kette von DNA-Bausteinen aus der Keimdrüse von Lachsen. Sie soll im Gewebe Reparaturprozesse anstossen. In der Wundheilung ist der Einsatz besser untersucht als in der Ästhetik.' },
      { q: 'Ist Rejuran dasselbe wie PDRN?', a: 'Rejuran ist der bekannteste koreanische Markenname für ein PDRN-Präparat und wird oft synonym verwendet. Es gibt weitere Produkte mit demselben Wirkprinzip.' },
      { q: 'Ist Rejuran in der Schweiz zugelassen?', a: 'Das hängt am konkreten Präparat und seiner Klassifizierung. Frag vor der Behandlung nach dem Produktnamen und der Grundlage des Einsatzes in der Schweiz. Eine seriöse Praxis beantwortet das direkt.' },
      { q: 'Wie viele Sitzungen braucht man?', a: 'Üblich sind drei bis vier Sitzungen im Abstand von zwei bis vier Wochen. Danach werden Auffrischungen empfohlen.' },
      { q: 'Was kostet Rejuran in der Schweiz?', a: 'Eine Sitzung etwa CHF 450 bis 750, für die übliche Serie also CHF 1400 bis 3000. Keine Kassenleistung.' },
      { q: 'Kann ich Rejuran bei einer Fischallergie machen lassen?', a: 'Nein. Das Präparat wird aus Lachs gewonnen. Eine bekannte Fischallergie ist ein Ausschlusskriterium und gehört zwingend ins Beratungsgespräch.' },
    ],
    related: [
      { href: '/haut/profhilo/', label: 'Profhilo', cat: 'Methode' },
      { href: '/haut/glass-skin/', label: 'Glass Skin', cat: 'K-Beauty' },
      { href: '/therapien/gua-sha/gesichts-gua-sha/', label: 'Gua Sha fürs Gesicht', cat: 'Behandlung' },
    ],
  },

  {
    slug: 'ultherapy-hifu',
    title: 'Ultherapy und HIFU: fokussierter Ultraschall erklärt',
    metaDesc: 'HIFU und Ultherapy zur Hautstraffung: wie fokussierter Ultraschall arbeitet, wie schmerzhaft es ist, was realistisch herauskommt, Kosten in der Schweiz und Risiken.',
    excerpt: 'Die Behandlung, die am häufigsten als Alternative zum Lifting verkauft wird. Was fokussierter Ultraschall kann und wo die Grenze zum Skalpell verläuft.',
    category: 'Methoden',
    h1: 'Ultherapy und HIFU',
    lead: 'HIFU bündelt Ultraschall in einem Punkt tief im Gewebe und erzeugt dort gezielt Hitze. Das Gewebe zieht sich zusammen und bildet über Monate neues Kollagen. Ein Lifting ersetzt es nicht, auch wenn es oft so beworben wird.',
    readingTime: '8 Min.',
    ctaTitle: 'Geht es um Kontur oder um Spannung?',
    ctaText: 'Zwei sehr unterschiedliche Themen, die sich ähnlich anfühlen. Wir ordnen ein und sagen dir, was in unserer Praxis dafür sinnvoll ist und was nicht.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>HIFU steht für hochintensiven fokussierten Ultraschall. Die Schallwellen durchdringen die Hautoberfläche, ohne sie zu verletzen, und bündeln sich erst in einer definierten Tiefe. Dort entsteht punktuell Hitze von etwa 60 bis 70 Grad, das Gewebe zieht sich zusammen, und in den Wochen danach bildet der Körper an diesen Punkten neues Kollagen.</p>
<p><strong>Ultherapy</strong> ist ein Markenname für ein HIFU-Gerät und das einzige System, das zusätzlich Ultraschall-Bildgebung nutzt: Die behandelnde Person sieht während der Behandlung, in welche Gewebeschicht sie zielt.</p>
<p class="wa-callout"><strong>Zur Einordnung:</strong> Wir bieten HIFU nicht an. Dieser Artikel erklärt die Methode, weil sie häufig gesucht und häufig überversprochen wird.</p>

<h2>Wie eine Behandlung abläuft</h2>
<p>Nach der Reinigung wird Ultraschallgel aufgetragen und das Handstück in Bahnen über das Behandlungsareal geführt. Gearbeitet wird typischerweise in drei Tiefen: 4,5 mm für die tiefere Gewebeschicht, 3 mm für die Lederhaut, 1,5 mm für oberflächliche Feinheiten.</p>
<p>Eine Gesichtsbehandlung dauert 45 bis 90 Minuten, je nach Areal und Anzahl der gesetzten Punkte.</p>

<h2>Wie schmerzhaft ist es?</h2>
<p>Ehrlich: deutlich unangenehmer als die meisten anderen Gesichtsbehandlungen. Beschrieben wird ein kurzes, tiefes Stechen oder Hitzegefühl bei jedem gesetzten Punkt, besonders über Knochen wie Kiefer und Stirn.</p>
<p>Schmerzmittel vorab und eine reduzierte Energiestufe sind üblich. Eine niedrigere Energie ist aber auch eine geringere Wirkung, und dieser Zusammenhang wird im Verkaufsgespräch selten deutlich gemacht.</p>

<h2>Was realistisch dabei herauskommt</h2>
<p>Erwartbar ist eine <strong>moderate Straffung</strong> und eine etwas definiertere Kontur, vor allem entlang des Kieferbogens und am Hals. Bei guter Ausgangslage, also elastischer Haut und leichter Erschlaffung, sind die Ergebnisse am überzeugendsten.</p>
<p>Nicht erwartbar: das Ergebnis eines chirurgischen Liftings. Bei deutlich erschlafftem Gewebe stösst HIFU an eine harte Grenze, und ein Anbieter, der dort trotzdem behandelt, nimmt dein Geld für ein absehbar enttäuschendes Ergebnis.</p>
<p>Das Ergebnis entwickelt sich über <strong>zwei bis drei Monate</strong> und hält typischerweise ein bis anderthalb Jahre. Meist reicht eine Sitzung, Auffrischung nach etwa einem Jahr.</p>

<h2>Was es in der Schweiz kostet</h2>
<p>Je nach Areal und Anzahl der gesetzten Punkte liegt eine Behandlung etwa zwischen <strong>CHF 900 und 2'500</strong>. Nur Kinn und Kieferlinie deutlich darunter, ganzes Gesicht plus Hals am oberen Ende.</p>
<p>Ein auffällig günstiges Angebot bedeutet in der Regel weniger gesetzte Punkte oder ein Gerät ohne Bildgebung. Bei dieser Methode ist der Preis ein Hinweis auf die Dosis.</p>

<h2>Risiken und wann es nicht in Frage kommt</h2>
<p>Häufig: Rötung, Schwellung, Druckempfindlichkeit und ein Gefühl von Muskelkater im Gesicht für einige Tage bis zwei Wochen.</p>
<p>Selten: vorübergehende Nervenirritation mit Taubheitsgefühl, Verbrennungen bei falscher Energiewahl, und bei sehr schlanken Gesichtern ein unerwünschter Verlust von Wangenvolumen.</p>
<p>Nicht behandelt wird bei aktiven Entzündungen im Areal, bei Implantaten oder Metall im Behandlungsgebiet, in Schwangerschaft und Stillzeit und bei schwerer <a href="/beschwerden/akne/">Akne</a> im Behandlungsbereich.</p>

<h2>Die sanftere Alternative</h2>
<p>HIFU adressiert Kontur und Gewebestraffung. Das ist ein anderes Thema als ein müdes, geschwollenes oder verspanntes Gesicht, auch wenn beides im Spiegel ähnlich aussehen kann.</p>
<p>Wenn Spannung im Kiefer, Schwellungsgefühl am Morgen oder ein insgesamt erschöpftes Hautbild das eigentliche Thema sind, arbeiten <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> und <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> genau dort, ohne Schmerz und ohne Ausfallzeit. Was sie nicht tun: erschlafftes Gewebe straffen. Da ist HIFU die passende Methode, und wenn es darum geht, sagen wir das auch.</p>
`.trim(),
    faqs: [
      { q: 'Was ist der Unterschied zwischen HIFU und Ultherapy?', a: 'HIFU ist die Technologie, Ultherapy ein Markenname für ein bestimmtes Gerät. Ultherapy nutzt zusätzlich Ultraschall-Bildgebung, sodass die behandelnde Person die Zielschicht während der Behandlung sieht.' },
      { q: 'Ist HIFU schmerzhaft?', a: 'Deutlich unangenehmer als die meisten Gesichtsbehandlungen. Bei jedem gesetzten Punkt entsteht ein kurzes, tiefes Stechen, besonders über Kiefer und Stirn. Schmerzmittel vorab sind üblich.' },
      { q: 'Ersetzt HIFU ein Facelift?', a: 'Nein. Erwartbar ist eine moderate Straffung bei elastischer Haut und leichter Erschlaffung. Bei deutlich erschlafftem Gewebe stösst die Methode an eine harte Grenze.' },
      { q: 'Wie lange hält das Ergebnis?', a: 'Das Ergebnis entwickelt sich über zwei bis drei Monate und hält typischerweise ein bis anderthalb Jahre. Meist reicht eine Sitzung, Auffrischung nach etwa einem Jahr.' },
      { q: 'Was kostet HIFU in der Schweiz?', a: 'Je nach Areal etwa CHF 900 bis 2500. Auffällig günstige Angebote bedeuten meist weniger gesetzte Punkte oder ein Gerät ohne Bildgebung.' },
      { q: 'Wie viele Sitzungen braucht man?', a: 'In der Regel eine, mit Auffrischung nach etwa einem Jahr. Das unterscheidet HIFU von Methoden wie Microneedling, die in Serien gemacht werden.' },
    ],
    related: [
      { href: '/haut/profhilo/', label: 'Profhilo', cat: 'Methode' },
      { href: '/haut/microneedling/', label: 'Microneedling', cat: 'Methode' },
      { href: '/therapien/gesichtsakupunktur/', label: 'Gesichtsakupunktur', cat: 'Behandlung' },
    ],
  },
  {
    slug: 'niacinamid',
    title: 'Niacinamid: Wirkung, Konzentration, Kombinationen',
    metaDesc: 'Niacinamid in der Hautpflege: was Vitamin B3 in der Haut macht, welche Konzentration untersucht ist, womit du es kombinierst und wann es reizt statt hilft.',
    excerpt: 'Der Allrounder, der fast alles ein bisschen kann. Welche Konzentration sinnvoll ist und warum mehr hier nicht mehr bedeutet.',
    category: 'Wirkstoffe',
    h1: 'Niacinamid in der Hautpflege',
    lead: 'Niacinamid ist der vielleicht unaufgeregteste Wirkstoff der modernen Hautpflege: gut verträglich, breit einsetzbar, mit solider Datenlage. Genau deshalb steht er in fast jedem Produkt, und genau deshalb wird er auch überdosiert.',
    readingTime: '8 Min.',
    ctaTitle: 'Haut, die trotz guter Pflege reagiert?',
    ctaText: 'Wir schauen uns an, ob hinter wiederkehrenden Hautthemen mehr steckt als die Routine, und sagen ehrlich, was wir beitragen können.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Niacinamid ist die Amidform von Vitamin B3, auch Nicotinamid genannt. In der Haut greift es an mehreren Stellen gleichzeitig an, was es zum Allrounder macht, und gleichzeitig dazu führt, dass es für alles beworben wird.</p>

<h2>Wie Niacinamid wirkt</h2>
<p><strong>Hautbarriere.</strong> Niacinamid regt die Bildung von Ceramiden an, also der Fettstoffe, die die Zellen der obersten Hautschicht zusammenhalten. Eine intakte Barriere verliert weniger Feuchtigkeit und reagiert weniger empfindlich. Das ist der am besten belegte Effekt.</p>
<p><strong>Talgproduktion.</strong> In höheren Konzentrationen reduziert es die Talgmenge. Deshalb steht es in vielen Produkten für unreine und ölige Haut.</p>
<p><strong>Pigmentweitergabe.</strong> Niacinamid bremst nicht die Melaninbildung selbst, sondern dessen Weitergabe an die Hautzellen. Dadurch wirkt es bei <a href="/haut/pigmentflecken/">Pigmentflecken</a> ergänzend, langsamer als Vitamin C, dafür milder.</p>
<p><strong>Rötungen.</strong> Entzündungshemmende Effekte machen es bei geröteter, reaktiver Haut interessant, etwa bei <a href="/haut/couperose/">Couperose</a>-Neigung.</p>
<p><strong>Poren.</strong> Poren werden nicht kleiner. Sie fallen weniger auf, wenn weniger Talg und weniger Verhornung im Spiel sind. Der Unterschied ist wichtig.</p>

<h2>Welche Konzentration?</h2>
<p>Der untersuchte und sinnvolle Bereich liegt bei <strong>2 bis 5 Prozent</strong>. Dort passiert alles, was passieren soll.</p>
<p>Produkte mit 10 Prozent und mehr sind ein Marketingargument. Der Zusatznutzen ist nicht belegt, das Reizrisiko steigt messbar. Wer bei einem 10-Prozent-Serum Brennen oder Rötung bekommt, hat kein Verträglichkeitsproblem mit Niacinamid, sondern ein Dosierungsproblem.</p>
<div class="wa-callout"><div class="wa-callout-label">Einordnung</div><p>Ein 5-Prozent-Serum, das du täglich verträgst, wirkt mehr als ein 10-Prozent-Serum, das du nach zehn Tagen absetzt.</p></div>

<h2>Wie du es anwendest</h2>
<p>Morgens, abends oder beides, nach der Reinigung, vor der Feuchtigkeitspflege. Niacinamid ist stabil, lichtunempfindlich und unkompliziert in der Lagerung, anders als <a href="/haut/vitamin-c-serum/">Vitamin C</a>.</p>
<p>Erste Effekte auf die Barriere zeigen sich nach zwei bis vier Wochen, auf Pigmentierung nach zwei bis drei Monaten.</p>

<h2>Womit du es kombinierst</h2>
<p><strong>Mit Vitamin C.</strong> Der Mythos, die beiden würden sich gegenseitig neutralisieren, hält sich hartnäckig. Er stammt aus Laborversuchen unter Hitze, die mit Hautpflege nichts zu tun haben. In modernen Formulierungen unproblematisch.</p>
<p><strong>Mit Retinol.</strong> Eine der besten Kombinationen überhaupt. Niacinamid federt die typische Reizung beim Retinol-Einstieg ab.</p>
<p><strong>Mit Säuren.</strong> Funktioniert, aber nicht in derselben Anwendung schichten. Lieber abwechselnde Tage.</p>
<p><strong>Mit <a href="/haut/centella/">Centella</a>.</strong> Sinnvolle Ergänzung bei gereizter Haut, beide beruhigen über unterschiedliche Wege.</p>

<h2>Nebenwirkungen und Grenzen</h2>
<p>In üblicher Dosierung sehr gut verträglich. Bei hohen Konzentrationen kann ein kurzes Flush-Gefühl auftreten, also Wärme und Rötung. Harmlos, aber ein Hinweis, dass die Dosis zu hoch ist.</p>
<p>Die Grenze: Niacinamid kann fast alles ein bisschen. Wenn ein Thema im Vordergrund steht, gibt es fast immer einen Wirkstoff, der es besser kann. Bei Pigment ist Vitamin C stärker, bei Textur sind Retinoide stärker. Niacinamid ist die gute Basis, nicht die Speerspitze.</p>

<h2>Wenn Pflege nicht mehr reicht</h2>
<p>Wenn die Haut trotz sinnvoller Routine immer wieder reagiert, in Schüben schlechter wird oder auf Stress reagiert, ist das kein Produktproblem. Bei anhaltenden Hautveränderungen gehört die dermatologische Abklärung an den Anfang. Ergänzend arbeiten wir mit <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a>.</p>
`.trim(),
    faqs: [
      { q: 'Welche Niacinamid-Konzentration ist sinnvoll?', a: '2 bis 5 Prozent. Das ist der untersuchte Bereich, in dem alle beschriebenen Effekte auftreten. Höhere Konzentrationen bringen keinen belegten Zusatznutzen, erhöhen aber das Reizrisiko.' },
      { q: 'Darf man Niacinamid und Vitamin C zusammen benutzen?', a: 'Ja. Der Mythos der gegenseitigen Neutralisierung stammt aus alten Laborversuchen unter Hitze. In modernen Formulierungen ist die Kombination unproblematisch.' },
      { q: 'Macht Niacinamid die Poren kleiner?', a: 'Nein. Porengrösse ist genetisch festgelegt. Poren fallen weniger auf, wenn weniger Talg und weniger Verhornung im Spiel sind, aber sie schrumpfen nicht.' },
      { q: 'Wann sieht man erste Ergebnisse?', a: 'Auf die Hautbarriere nach zwei bis vier Wochen. Auf Pigmentierung deutlich langsamer, rechne mit zwei bis drei Monaten.' },
      { q: 'Warum brennt mein Niacinamid-Serum?', a: 'Meist ist die Konzentration zu hoch. Ein kurzes Wärmegefühl bei 10 Prozent und mehr ist typisch. Wechsle auf ein Produkt mit 5 Prozent.' },
      { q: 'Morgens oder abends?', a: 'Beides möglich. Niacinamid ist stabil und lichtunempfindlich, anders als Vitamin C. Viele nutzen es abends, um morgens Vitamin C zu verwenden.' },
    ],
    related: [
      { href: '/haut/vitamin-c-serum/', label: 'Vitamin-C-Serum', cat: 'Wirkstoff' },
      { href: '/haut/centella/', label: 'Centella (Cica)', cat: 'Wirkstoff' },
      { href: '/haut/couperose/', label: 'Couperose', cat: 'Hautthema' },
    ],
  },

  {
    slug: 'hydrafacial',
    title: 'Hydrafacial: Ablauf, Kosten, was es wirklich bringt',
    metaDesc: 'Hydrafacial in der Schweiz: wie die Behandlung abläuft, was sie kostet, wie lange der Effekt hält und für wen sie sich lohnt. Ehrlich eingeordnet.',
    excerpt: 'Sofort sichtbares Ergebnis, keine Ausfallzeit, und ein Effekt, der kürzer hält als der Preis vermuten lässt.',
    category: 'Methoden',
    h1: 'Hydrafacial',
    lead: 'Hydrafacial ist eine apparative Gesichtsreinigung, die Peeling, Ausreinigung per Unterdruck und Wirkstoffeinschleusung in einem Gerät kombiniert. Der Effekt ist sofort sichtbar, und genau darin liegt sowohl der Reiz als auch die Grenze.',
    readingTime: '7 Min.',
    ctaTitle: 'Etwas, das länger hält als bis Sonntag?',
    ctaText: 'Wenn dir die Wirkung einer Reinigungsbehandlung zu kurz greift, besprechen wir, was über die Zeit tatsächlich etwas verändert.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Hydrafacial ist ein Markenname, kein Verfahren. Das patentierte Gerät arbeitet mit einem Handstück, das gleichzeitig Flüssigkeit abgibt und per Unterdruck wieder absaugt. Dadurch werden Peeling, Ausreinigung und Wirkstoffauftrag in einem Schritt kombiniert.</p>
<p class="wa-callout"><strong>Zur Einordnung:</strong> Wir bieten Hydrafacial nicht an. Der Artikel erklärt die Behandlung, weil sie oft gesucht und selten nüchtern beschrieben wird.</p>

<h2>Wie eine Behandlung abläuft</h2>
<p>Der Ablauf ist standardisiert und dauert 30 bis 60 Minuten.</p>
<p><strong>Reinigung und Peeling.</strong> Eine milde Säurelösung löst abgestorbene Hautzellen.</p>
<p><strong>Ausreinigung.</strong> Per Unterdruck wird der Inhalt verstopfter Poren abgesaugt. Das ist der Teil, der sich am deutlichsten anfühlt und den Anbieter gern im Auffangbehälter zeigen.</p>
<p><strong>Einschleusung.</strong> Feuchtigkeitsspendende und antioxidative Wirkstoffe werden aufgetragen.</p>
<p>Je nach Anbieter kommen LED-Licht, Lymphdrainage oder zusätzliche Wirkstoff-Booster dazu, was den Preis erhöht.</p>

<h2>Was realistisch dabei herauskommt</h2>
<p><strong>Direkt danach:</strong> die Haut ist sauberer, glatter, wirkt praller und rosiger. Der Effekt ist real und sofort sichtbar, deshalb ist die Behandlung als Vorbereitung auf einen Anlass beliebt.</p>
<p><strong>Wie lange:</strong> etwa fünf bis sieben Tage. Danach ist die Haut da, wo sie vorher war.</p>
<p><strong>Was nicht passiert:</strong> Kollagenaufbau, Faltenreduktion, dauerhafte Texturveränderung. Hydrafacial ist eine sehr gute Reinigung, keine Strukturbehandlung. Wer Letzteres sucht, ist bei <a href="/haut/microneedling/">Microneedling</a> richtiger.</p>
<p>Poren werden nicht kleiner. Sie sind nach der Ausreinigung leerer und fallen deshalb weniger auf.</p>

<h2>Wie oft?</h2>
<p>Anbieter empfehlen meist monatlich. Das ist plausibel, wenn man den Effekt aufrechterhalten will, und es ist auch die Logik hinter Abo-Modellen.</p>
<p>Für die meisten reicht die Behandlung anlassbezogen: vor einem Termin, nach dem Winter, bei akut verstopfter Haut. Wer die Haut langfristig verändern will, investiert das Geld besser in Sonnenschutz und einen Wirkstoff, den man täglich benutzt.</p>

<h2>Was es in der Schweiz kostet</h2>
<p>Eine Basisbehandlung liegt etwa bei <strong>CHF 170 bis 220</strong>, mit zusätzlichen Wirkstoff-Boostern oder LED zwischen <strong>CHF 250 und 350</strong>. Zusatzareale wie Hals und Dekolleté kosten extra.</p>
<p>Keine Kassenleistung.</p>

<h2>Ausfallzeit und Risiken</h2>
<p>Praktisch keine Ausfallzeit, das ist das stärkste Argument der Methode. Eine leichte Rötung klingt innerhalb einer Stunde ab, Make-up ist am selben Tag möglich.</p>
<p>Vorsicht bei aktiver, entzündlicher <a href="/beschwerden/akne/">Akne</a>, bei <a href="/beschwerden/rosacea/">Rosacea</a> im Schub und bei sehr empfindlicher Haut: Der Unterdruck und die Säurekomponente können reizen. Bei Sonnenbrand und offenen Stellen nicht behandeln.</p>

<h2>Die Alternative mit längerer Wirkung</h2>
<p>Hydrafacial löst ein Oberflächenproblem sehr gut und für eine Woche. Wenn das für dich passt, ist es eine ehrliche Behandlung mit einem klaren Nutzen.</p>
<p>Wenn dein Thema aber Spannung, ein müdes Hautbild oder wiederkehrende Reaktionen sind, arbeitet <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> über Serien an etwas anderem, und <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> lässt sich zu Hause weiterführen, was keine Gerätebehandlung leistet.</p>
`.trim(),
    faqs: [
      { q: 'Wie lange hält ein Hydrafacial?', a: 'Etwa fünf bis sieben Tage. Der Effekt ist sofort sichtbar, aber nicht dauerhaft. Deshalb wird die Behandlung meist monatlich empfohlen.' },
      { q: 'Was kostet Hydrafacial in der Schweiz?', a: 'Eine Basisbehandlung etwa CHF 170 bis 220, mit Wirkstoff-Boostern oder LED zwischen CHF 250 und 350. Hals und Dekolleté kosten extra.' },
      { q: 'Hilft Hydrafacial gegen Falten?', a: 'Nein. Es ist eine apparative Reinigung mit Peeling und Wirkstoffauftrag, keine Strukturbehandlung. Kollagenaufbau und Faltenreduktion gehören nicht dazu.' },
      { q: 'Werden Poren durch Hydrafacial kleiner?', a: 'Sie sind nach der Ausreinigung leerer und fallen weniger auf. Die Porengrösse selbst ändert sich nicht, sie ist genetisch festgelegt.' },
      { q: 'Gibt es eine Ausfallzeit?', a: 'Praktisch keine. Eine leichte Rötung klingt innerhalb einer Stunde ab, Make-up ist am selben Tag möglich. Das ist der grösste Vorteil der Methode.' },
      { q: 'Für wen ist Hydrafacial nicht geeignet?', a: 'Bei aktiver entzündlicher Akne, Rosacea im Schub, sehr empfindlicher Haut, Sonnenbrand und offenen Stellen. Unterdruck und Säurekomponente können dort reizen.' },
    ],
    related: [
      { href: '/haut/microneedling/', label: 'Microneedling', cat: 'Methode' },
      { href: '/haut/mitesser/', label: 'Mitesser entfernen', cat: 'Hautthema' },
      { href: '/therapien/gua-sha/gesichts-gua-sha/', label: 'Gua Sha fürs Gesicht', cat: 'Behandlung' },
    ],
  },

  {
    slug: 'melasma',
    title: 'Melasma: warum es anders ist als Altersflecken',
    metaDesc: 'Melasma erkennen und behandeln: warum Hormone und Wärme eine Rolle spielen, welcher Sonnenschutz nötig ist, was hilft und welche Behandlung es verschlimmert.',
    excerpt: 'Die Pigmentstörung, bei der die üblichen Mittel oft das Gegenteil bewirken. Wärme ist hier genauso ein Auslöser wie UV.',
    category: 'Hautthemen',
    h1: 'Melasma',
    lead: 'Melasma ist grossflächig, unscharf begrenzt und meist symmetrisch. Es reagiert nicht wie ein Sonnenfleck, sondern oft genau umgekehrt: Was einen Altersfleck aufhellt, kann Melasma verschlimmern.',
    readingTime: '9 Min.',
    ctaTitle: 'Melasma, das nach jedem Sommer zurückkommt?',
    ctaText: 'Wir ordnen ein und sagen dir ehrlich, was hier realistisch ist und wann die dermatologische Begleitung der richtige Weg ist.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Melasma ist eine erworbene Pigmentstörung, die typischerweise symmetrisch auf beiden Wangen, über der Oberlippe, an der Stirn oder am Kinn auftritt. Die Ränder sind unscharf, die Farbe hell- bis mittelbraun, manchmal graubraun.</p>
<p>Es betrifft überwiegend Frauen, häufig zwischen 20 und 50, und tritt gehäuft in der Schwangerschaft oder unter hormoneller Verhütung auf. Der alte Begriff Schwangerschaftsmaske kommt daher.</p>

<h2>Warum Melasma anders reagiert</h2>
<p>Ein <a href="/haut/pigmentflecken/">Sonnenfleck</a> ist ein lokal begrenzter UV-Schaden. Melasma ist ein aktiver, hormonell mitgesteuerter Prozess, bei dem die pigmentbildenden Zellen dauerhaft überempfindlich reagieren.</p>
<p>Der entscheidende Unterschied in der Praxis: <strong>Nicht nur UV triggert, sondern auch Wärme.</strong> Sauna, heisses Duschen, Kochen über dem Herd, intensiver Sport in der Sonne. Und Behandlungen, die mit Hitze arbeiten, allen voran Laser, können Melasma verschlimmern statt verbessern.</p>
<div class="wa-callout"><div class="wa-callout-label">Die wichtigste Unterscheidung</div><p>Wer Melasma für Altersflecken hält und entsprechend behandeln lässt, riskiert eine deutliche Verschlechterung. Vor jeder Behandlung gehört die Einordnung, welche Art von Pigmentierung vorliegt.</p></div>

<h2>Die drei Tiefen</h2>
<p><strong>Epidermal.</strong> Das Pigment liegt in der Oberhaut, die Farbe ist eher hellbraun, die Ränder relativ deutlich. Beste Prognose.</p>
<p><strong>Dermal.</strong> Das Pigment liegt tiefer, die Farbe wirkt graublau. Reagiert deutlich schlechter auf alles.</p>
<p><strong>Gemischt.</strong> Der häufigste Fall.</p>
<p>Welche Form vorliegt, entscheidet über die realistische Erwartung. Das gehört in eine dermatologische Beurteilung, nicht in eine Selbsteinschätzung vor dem Spiegel.</p>

<h2>Was tatsächlich hilft</h2>
<p><strong>Sonnenschutz, und zwar der richtige.</strong> Bei Melasma reicht klassischer UV-Schutz nicht: Auch sichtbares Licht, besonders blaues, triggert die Pigmentbildung. Nötig sind getönte Sonnenschutzprodukte mit Eisenoxid, weil die Pigmente sichtbares Licht mitblocken. Täglich, ganzjährig, konsequent. Ohne das ist alles Weitere verschenkt.</p>
<p><strong>Azelainsäure.</strong> Eine der verträglichsten Optionen, auch in der Schwangerschaft üblicherweise vertretbar. Rücksprache mit der behandelnden Ärztin.</p>
<p><strong>Tranexamsäure.</strong> Topisch und in manchen Fällen oral, dann ausschliesslich ärztlich verordnet und überwacht.</p>
<p><strong><a href="/haut/niacinamid/">Niacinamid</a>.</strong> Mild, bremst die Pigmentweitergabe, gut kombinierbar.</p>
<p><strong><a href="/haut/vitamin-c-serum/">Vitamin C</a>.</strong> Ergänzend sinnvoll, allein selten ausreichend.</p>
<p>Rechne mit <strong>drei bis sechs Monaten</strong>, und rechne damit, dass es im Sommer zurückkommt.</p>

<h2>Was schadet</h2>
<ul>
<li><strong>Hitze in jeder Form.</strong> Sauna, Dampfbad, heisse Duschen ins Gesicht.</li>
<li><strong>Aggressive Peelings und mechanische Behandlungen.</strong> Entzündung führt zu mehr Pigment.</li>
<li><strong>Laser ohne sichere Einordnung.</strong> Bei Melasma ein bekanntes Risiko für Verschlechterung.</li>
<li><strong>Aufhellende Cremes aus unklarer Quelle.</strong> Teils mit Quecksilber oder Kortison belastet.</li>
<li><strong>Sporadische Anwendung.</strong> Melasma verzeiht keine Lücken.</li>
</ul>

<h2>Was realistisch ist</h2>
<p>Ehrlich: Melasma wird kontrolliert, nicht geheilt. Ziel ist eine deutliche Aufhellung und ein Zustand, der sich im Alltag halten lässt. Ein Rückfall nach einem Sonnensommer oder bei hormoneller Veränderung ist keine Behandlungsniederlage, sondern Teil des Verlaufs.</p>
<p>Wer das vorher weiss, geht anders damit um als jemand, dem eine dauerhafte Lösung versprochen wurde.</p>

<h2>Wann zum Arzt</h2>
<p>Bei Melasma gehört die Erstbeurteilung dermatologisch, allein schon zur Abgrenzung von anderen Pigmentstörungen. Ausserdem, wenn eine Pigmentveränderung einseitig auftritt, sich schnell verändert, erhaben ist oder juckt.</p>
<p>Wenn ein Zusammenhang mit hormoneller Verhütung besteht, lohnt das Gespräch mit der Gynäkologin über Alternativen.</p>

<h2>Was wir machen</h2>
<p>Wir behandeln Melasma nicht mit Geräten und stellen keine Diagnose. Was wir beitragen: die ehrliche Einordnung, und bei stressverstärkten oder hormonell mitbedingten Hautthemen die begleitende Arbeit mit <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a>. Hitzeintensive Anwendungen im Gesicht vermeiden wir bei Melasma bewusst.</p>
`.trim(),
    faqs: [
      { q: 'Was ist der Unterschied zwischen Melasma und Altersflecken?', a: 'Altersflecken sind einzeln, scharf begrenzt und UV-bedingt. Melasma ist grossflächig, unscharf, meist symmetrisch und hormonell mitgesteuert. Melasma reagiert auf Wärme und verträgt aggressive Behandlung schlecht.' },
      { q: 'Welcher Sonnenschutz bei Melasma?', a: 'Ein getöntes Produkt mit Eisenoxid, weil auch sichtbares Licht die Pigmentbildung triggert. Klassischer UV-Schutz allein reicht bei Melasma nicht. Täglich, ganzjährig.' },
      { q: 'Kann Laser Melasma verschlimmern?', a: 'Ja, das ist ein bekanntes Risiko. Hitze ist bei Melasma ein Auslöser. Laserbehandlung gehört hier in sehr erfahrene Hände und nach klarer Einordnung.' },
      { q: 'Geht Melasma nach der Schwangerschaft weg?', a: 'Bei manchen verblasst es nach der Geburt deutlich, bei anderen bleibt es. Ohne konsequenten Sonnenschutz ist ein Rückfall wahrscheinlich.' },
      { q: 'Wie lange dauert die Behandlung?', a: 'Rechne mit drei bis sechs Monaten bis zu einer sichtbaren Aufhellung, und mit Erhaltung danach. Melasma wird kontrolliert, nicht geheilt.' },
      { q: 'Darf ich bei Melasma in die Sauna?', a: 'Besser nicht. Wärme triggert die Pigmentbildung unabhängig von UV. Sauna, Dampfbad und heisses Duschen ins Gesicht gehören zu den vermeidbaren Auslösern.' },
    ],
    related: [
      { href: '/haut/pigmentflecken/', label: 'Pigmentflecken', cat: 'Hautthema' },
      { href: '/haut/niacinamid/', label: 'Niacinamid', cat: 'Wirkstoff' },
      { href: '/haut/vitamin-c-serum/', label: 'Vitamin-C-Serum', cat: 'Wirkstoff' },
    ],
  },

  {
    slug: 'couperose',
    title: 'Couperose: sichtbare Äderchen im Gesicht',
    metaDesc: 'Couperose im Gesicht: was der Unterschied zu Rosacea ist, welche Auslöser zählen, was in der Pflege hilft und welche Behandlung bei erweiterten Äderchen wirkt.',
    excerpt: 'Sichtbare Äderchen an Wangen und Nase. Was Pflege leisten kann, was nicht, und wo die Grenze zur Rosacea verläuft.',
    category: 'Hautthemen',
    h1: 'Couperose',
    lead: 'Couperose bezeichnet dauerhaft erweiterte, sichtbare Äderchen im Gesicht, meist an Nasenflügeln und Wangen. Sie ist keine Krankheit, kann aber die Vorstufe oder Begleiterscheinung einer Rosacea sein. Die Unterscheidung entscheidet über das Vorgehen.',
    readingTime: '8 Min.',
    ctaTitle: 'Haut, die auf alles rot reagiert?',
    ctaText: 'Wir schauen uns die Auslöser an und besprechen, was sich beruhigen lässt und wann eine dermatologische Abklärung sinnvoll ist.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Couperose beschreibt feine, dauerhaft erweiterte Blutgefässe direkt unter der Hautoberfläche, sichtbar als rötliche Äderchen. Betroffen sind meist Nasenflügel, Wangen und Kinn.</p>
<p>Die Gefässe haben ihre Elastizität verloren: Sie weiten sich bei einem Reiz und ziehen sich nicht mehr vollständig zusammen. Das ist ein mechanischer Vorgang, kein Entzündungsprozess.</p>

<h2>Couperose oder Rosacea?</h2>
<p><strong>Couperose</strong> ist ein rein kosmetischer Befund: sichtbare Äderchen, keine Entzündung, keine Papeln, kein Brennen.</p>
<p><strong><a href="/beschwerden/rosacea/">Rosacea</a></strong> ist eine chronisch-entzündliche Hauterkrankung. Dazu gehören anfallsartige Rötungsschübe, Brennen, Papeln und Pusteln, in fortgeschrittenen Stadien Gewebeveränderungen.</p>
<p>Die Übergänge sind fliessend, und Couperose ist bei einem Teil der Betroffenen ein frühes Zeichen einer Rosacea. Deshalb gilt: Wenn zu den Äderchen Brennen, Schübe oder Pusteln kommen, ist es kein kosmetisches Thema mehr, sondern gehört dermatologisch abgeklärt.</p>

<h2>Was Couperose begünstigt</h2>
<ul>
<li>Genetische Veranlagung, besonders bei heller, dünner Haut</li>
<li>Jahrelange UV-Belastung, der wichtigste beeinflussbare Faktor</li>
<li>Starke Temperaturwechsel, Kälte und Wind</li>
<li>Hitze: Sauna, heisse Bäder, heisse Getränke</li>
<li>Alkohol und scharfes Essen</li>
<li>Kortisonhaltige Cremes über längere Zeit im Gesicht</li>
</ul>

<h2>Was in der Pflege hilft</h2>
<p>Vorweg, ehrlich: <strong>Bereits sichtbare Äderchen verschwinden durch Pflege nicht.</strong> Was Pflege leisten kann, ist Rötungsneigung zu reduzieren und zu verhindern, dass mehr Gefässe dazukommen.</p>
<p><strong>Sonnenschutz täglich.</strong> Der stärkste Hebel überhaupt. UV schwächt das Bindegewebe um die Gefässe.</p>
<p><strong><a href="/haut/niacinamid/">Niacinamid</a>.</strong> Stärkt die Barriere und wirkt der Rötungsneigung entgegen.</p>
<p><strong>Azelainsäure.</strong> Bei Übergang zur Rosacea eine der wirksamsten Optionen.</p>
<p><strong><a href="/haut/centella/">Centella</a>.</strong> Beruhigend, gut verträglich, sinnvoll als Basispflege.</p>
<p><strong>Lauwarm statt heiss waschen</strong>, weich abtupfen statt reiben, keine alkoholhaltigen Gesichtswasser.</p>

<h2>Was schadet</h2>
<ul>
<li>Mechanisches Peeling und Bürsten</li>
<li>Sauna und Dampfbäder ins Gesicht</li>
<li>Hochprozentige Säuren und hochdosiertes Retinol ohne Begleitung</li>
<li>Duftstoffe und alkoholhaltige Tonics</li>
<li>Kortisoncremes im Gesicht über längere Zeit, ohne ärztliche Anweisung</li>
</ul>

<h2>Behandlungen im Vergleich</h2>
<p>Anders als bei den meisten Hautthemen gibt es hier eine klar überlegene Methode.</p>
<p><strong>Gefässlaser und IPL.</strong> Mittel der Wahl bei sichtbaren Äderchen. Die Energie wird vom roten Blutfarbstoff aufgenommen, das Gefäss verschliesst sich und wird abgebaut. Meist braucht es zwei bis vier Sitzungen. Gehört in erfahrene Hände.</p>
<p><strong>Was nicht funktioniert:</strong> Cremes, die versprechen, Äderchen zum Verschwinden zu bringen. Ein verschlossenes Gefäss lässt sich nicht wegcremen.</p>
<p>Wichtig auch nach der Behandlung: Ohne konsequenten Sonnenschutz und Trigger-Vermeidung bilden sich neue Gefässe.</p>

<h2>Wann zum Arzt</h2>
<p>Wenn zu den Äderchen Brennen, Stechen, Schübe, Papeln oder Pusteln kommen. Wenn die Rötung sich schnell ausbreitet. Wenn die Nase sich verdickt. Und wenn eine Kortisoncreme im Gesicht länger als angewiesen benutzt wurde.</p>

<h2>Was wir machen</h2>
<p>Wir behandeln keine Gefässe mit Laser. Was wir beitragen: die Einordnung, die Arbeit an den Auslösern, und bei stressverstärkter Rötungsneigung <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a>. Hitzeintensive Anwendungen und kräftiges <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha</a> im betroffenen Bereich vermeiden wir dabei bewusst.</p>
`.trim(),
    faqs: [
      { q: 'Was ist der Unterschied zwischen Couperose und Rosacea?', a: 'Couperose sind sichtbare erweiterte Äderchen ohne Entzündung, ein kosmetischer Befund. Rosacea ist eine chronisch-entzündliche Erkrankung mit Schüben, Brennen und Papeln. Kommen diese Zeichen dazu, gehört es dermatologisch abgeklärt.' },
      { q: 'Kann man Couperose wegcremen?', a: 'Nein. Bereits sichtbare Äderchen verschwinden durch Pflege nicht. Pflege kann die Rötungsneigung reduzieren und verhindern, dass neue Gefässe dazukommen.' },
      { q: 'Was hilft wirklich gegen sichtbare Äderchen?', a: 'Gefässlaser oder IPL. Die Energie wird vom Blutfarbstoff aufgenommen, das Gefäss verschliesst sich. Meist sind zwei bis vier Sitzungen nötig.' },
      { q: 'Darf ich mit Couperose in die Sauna?', a: 'Besser nicht. Hitze weitet die Gefässe, und bei bereits geschwächter Gefässwand begünstigt das die Entstehung neuer sichtbarer Äderchen.' },
      { q: 'Kommt Couperose nach der Laserbehandlung zurück?', a: 'Behandelte Gefässe kommen nicht zurück, neue können sich bilden. Ohne konsequenten Sonnenschutz und Trigger-Vermeidung ist das wahrscheinlich.' },
      { q: 'Hilft Gua Sha bei Couperose?', a: 'Im betroffenen Bereich raten wir davon ab. Mechanischer Reiz und Durchblutungsanregung sind bei geschwächten Gefässen nicht das Ziel.' },
    ],
    related: [
      { href: '/haut/niacinamid/', label: 'Niacinamid', cat: 'Wirkstoff' },
      { href: '/haut/centella/', label: 'Centella (Cica)', cat: 'Wirkstoff' },
      { href: '/beschwerden/rosacea/', label: 'Rosacea', cat: 'Beschwerde' },
    ],
  },

  {
    slug: 'augenringe',
    title: 'Augenringe: die drei Typen und was jeweils hilft',
    metaDesc: 'Augenringe entfernen: pigmentiert, durchscheinend oder Schatten? Wie du deinen Typ bestimmst, was jeweils hilft und warum die meisten Cremes am falschen Problem arbeiten.',
    excerpt: 'Drei völlig verschiedene Ursachen sehen gleich aus. Wer den Typ nicht bestimmt, kauft jahrelang die falsche Creme.',
    category: 'Hautthemen',
    h1: 'Augenringe',
    lead: 'Dunkle Augenringe haben drei mögliche Ursachen, und sie brauchen drei unterschiedliche Antworten. Ein einfacher Test vor dem Spiegel zeigt dir in einer Minute, welcher Typ bei dir vorliegt.',
    readingTime: '8 Min.',
    ctaTitle: 'Müdes Gesicht, das ausgeschlafen nicht besser wird?',
    ctaText: 'In 30 Minuten zeigen wir dir die Technik, die beim Entstauen tatsächlich etwas bringt, am eigenen Gesicht.',
    ctaHref: '/therapien/gua-sha/gesichts-gua-sha/',
    ctaLabel: 'Gua Sha fürs Gesicht',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Die Haut unter dem Auge ist mit etwa 0,5 Millimetern die dünnste des ganzen Körpers. Alles, was darunter liegt, schimmert leichter durch als anderswo. Das ist der gemeinsame Nenner aller Augenringe, aber der Grund für die Verfärbung ist dreimal ein anderer.</p>

<h2>Die drei Typen unterscheiden</h2>
<p><strong>Pigmentiert.</strong> Bräunliche Verfärbung durch vermehrtes Melanin. Häufiger bei dunkleren Hauttypen, oft familiär, kann durch Reiben und Sonne verstärkt werden.</p>
<p><strong>Vaskulär.</strong> Bläulich-violette Verfärbung durch durchscheinende Gefässe. Verstärkt sich bei Müdigkeit, Flüssigkeitsmangel, Allergien und im Winter.</p>
<p><strong>Strukturell.</strong> Keine Verfärbung, sondern ein Schatten. Entsteht durch eine Vertiefung zwischen Unterlid und Wange, oft altersbedingt durch Volumenverlust oder anatomisch bedingt.</p>
<div class="wa-callout"><div class="wa-callout-label">Der Test vor dem Spiegel</div><p><strong>Dehntest:</strong> Zieh die Haut unter dem Auge sanft zur Seite. Bleibt die Farbe, ist es pigmentiert. Verschwindet sie, ist es vaskulär.<br><strong>Lichttest:</strong> Beleuchte das Gesicht von unten. Verschwindet der dunkle Bereich, war es ein Schatten, also strukturell.</p></div>

<h2>Was bei welchem Typ hilft</h2>
<p><strong>Pigmentiert.</strong> Konsequenter Sonnenschutz auch unter dem Auge, dazu <a href="/haut/vitamin-c-serum/">Vitamin C</a>, <a href="/haut/niacinamid/">Niacinamid</a> oder Azelainsäure. Nicht reiben, auch nicht beim Abschminken. Geduld: Monate.</p>
<p><strong>Vaskulär.</strong> Schlaf, Flüssigkeit, Allergien behandeln lassen, Kälteanwendung am Morgen. Koffeinhaltige Augenprodukte verengen die Gefässe kurzfristig. Lymphabfluss unterstützen, hier hilft <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha</a> tatsächlich, aber sehr sanft und nur unterhalb des Knochens.</p>
<p><strong>Strukturell.</strong> Pflege bringt hier nichts, und das ist der wichtigste Satz auf dieser Seite. Ein Schatten entsteht durch Geometrie, nicht durch Farbe. Wer den Typ nicht kennt, kauft jahrelang Cremes gegen ein Problem, das keine Creme lösen kann.</p>

<h2>Was nicht hilft</h2>
<ul>
<li><strong>Gurkenscheiben und kalte Löffel.</strong> Kühlen kurzfristig, das war es. Beim vaskulären Typ am Morgen ein netter Effekt, sonst nichts.</li>
<li><strong>Teure Augencremes gegen Schatten.</strong> Siehe oben.</li>
<li><strong>Aggressives Reiben und Massieren.</strong> Verstärkt Pigmentierung und reizt die dünnste Haut des Körpers.</li>
<li><strong>Hausmittel mit Zitrone.</strong> Reizend und in Augennähe schlicht gefährlich.</li>
</ul>

<h2>Behandlungen im Vergleich</h2>
<p><strong>Bei pigmentiertem Typ:</strong> vorsichtige Peelings und aufhellende Wirkstoffe in ärztlicher Begleitung.</p>
<p><strong>Bei vaskulärem Typ:</strong> begrenzte Optionen, der Fokus liegt auf Lebensstil und Abfluss.</p>
<p><strong>Bei strukturellem Typ:</strong> Unterspritzung mit Hyaluronsäure ist die einzige Methode, die den Schatten wirklich adressiert. Das ist ein anspruchsvoller Bereich mit realem Komplikationsrisiko und gehört ausschliesslich in erfahrene ärztliche Hände.</p>

<h2>Wann zum Arzt</h2>
<p>Wenn Augenringe plötzlich und einseitig auftreten. Wenn zusätzlich Schwellungen, Juckreiz oder Atembeschwerden bestehen, dann Richtung Allergie abklären. Bei ausgeprägter Blässe und anhaltender Erschöpfung lohnt ein Blick auf Eisen- und Schilddrüsenwerte.</p>

<h2>Was wir machen</h2>
<p>Beim vaskulären Typ und bei allgemeinem Schwellungsgefühl arbeiten wir am Lymphabfluss, <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> ist dafür der direkteste Weg und lässt sich zu Hause weiterführen. Bei stressbedingter Erschöpfung ist <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> der ganzheitlichere Ansatz. Beim strukturellen Typ sagen wir ehrlich, dass wir nichts beitragen können.</p>
`.trim(),
    faqs: [
      { q: 'Wie finde ich heraus, welchen Typ Augenringe ich habe?', a: 'Dehntest: Haut sanft zur Seite ziehen. Bleibt die Farbe, ist es pigmentiert, verschwindet sie, vaskulär. Lichttest: Gesicht von unten beleuchten. Verschwindet der dunkle Bereich, war es ein Schatten, also strukturell.' },
      { q: 'Helfen Augencremes gegen Augenringe?', a: 'Beim pigmentierten Typ ja, mit Wirkstoffen wie Vitamin C oder Niacinamid und über Monate. Beim strukturellen Typ nicht, denn ein Schatten entsteht durch Geometrie, nicht durch Farbe.' },
      { q: 'Warum sind Augenringe morgens schlimmer?', a: 'Über Nacht sammelt sich Flüssigkeit im Gewebe, das Lymphsystem arbeitet im Liegen langsamer. Beim vaskulären Typ ist der Effekt am deutlichsten.' },
      { q: 'Hilft Schlaf gegen Augenringe?', a: 'Beim vaskulären Typ deutlich, weil Müdigkeit die Durchblutung und den Abfluss beeinflusst. Beim pigmentierten und strukturellen Typ kaum.' },
      { q: 'Was bringt Gua Sha bei Augenringen?', a: 'Beim vaskulären Typ kann es den Lymphabfluss unterstützen. Sehr sanft arbeiten, ohne Druck, und nur unterhalb des Knochens. Bei pigmentierten Augenringen ist Reiben eher schädlich.' },
      { q: 'Wann sollte ich Augenringe ärztlich abklären lassen?', a: 'Wenn sie plötzlich und einseitig auftreten, wenn Schwellung, Juckreiz oder Atembeschwerden dazukommen, oder wenn ausgeprägte Blässe und anhaltende Erschöpfung bestehen.' },
    ],
    related: [
      { href: '/therapien/gua-sha/gesichts-gua-sha/', label: 'Gua Sha fürs Gesicht', cat: 'Behandlung' },
      { href: '/haut/niacinamid/', label: 'Niacinamid', cat: 'Wirkstoff' },
      { href: '/haut/pigmentflecken/', label: 'Pigmentflecken', cat: 'Hautthema' },
    ],
  },

  {
    slug: 'mitesser',
    title: 'Mitesser entfernen: was hilft und was die Haut schädigt',
    metaDesc: 'Mitesser auf der Nase: der Unterschied zu Talgfilamenten, warum Ausdrücken und Porenstreifen schaden, welche Wirkstoffe wirken und was eine Ausreinigung bringt.',
    excerpt: 'Das meiste, was auf der Nase als Mitesser gilt, sind normale Talgfilamente. Der Unterschied entscheidet über alles Weitere.',
    category: 'Hautthemen',
    h1: 'Mitesser',
    lead: 'Bevor du etwas dagegen unternimmst, lohnt eine Unterscheidung: Die kleinen dunklen Punkte auf der Nase sind meist keine Mitesser, sondern Talgfilamente. Die gehören dorthin und kommen immer wieder.',
    readingTime: '7 Min.',
    ctaTitle: 'Immer wieder verstopfte Haut?',
    ctaText: 'Wir schauen uns an, ob dahinter mehr steckt als die Reinigungsroutine, und besprechen ehrlich, was sinnvoll ist.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Ein Mitesser entsteht, wenn eine Pore mit Talg und Hornmaterial verstopft. Bleibt die Pore offen, oxidiert der Inhalt an der Luft und wird dunkel: der offene Mitesser, umgangssprachlich Blackhead. Schliesst sich die Pore, bleibt er hell: der geschlossene Mitesser.</p>

<h2>Mitesser oder Talgfilamente?</h2>
<p>Das ist die wichtigste Unterscheidung, und sie erspart viel Frust.</p>
<p><strong>Talgfilamente</strong> sind kleine, gleichmässig verteilte, hell- bis graubraune Punkte, fast immer auf Nase und Nasenflügeln. Sie sind ein <em>normaler</em> Bestandteil der Haut: Talg, der den Follikel auskleidet. Jeder Mensch hat sie. Drückt man sie aus, sind sie in zwei bis vier Wochen wieder da, weil sie dorthin gehören.</p>
<p><strong>Mitesser</strong> sind einzeln, unregelmässig verteilt, dunkler und deutlich erhabener. Sie sind eine echte Verstopfung.</p>
<div class="wa-callout"><div class="wa-callout-label">Warum das zählt</div><p>Der grösste Teil dessen, was Menschen auf der Nase bekämpfen, sind Talgfilamente. Sie lassen sich nicht dauerhaft entfernen, nur weniger sichtbar halten. Wer das weiss, hört auf, dagegen anzukämpfen, und behandelt die Haut deutlich schonender.</p></div>

<h2>Was tatsächlich hilft</h2>
<p><strong>Salicylsäure (BHA).</strong> Der Wirkstoff der Wahl. Sie ist fettlöslich und gelangt dadurch in die Pore hinein, wo sie Talg und Hornmaterial löst. Zwei- bis dreimal pro Woche, 1 bis 2 Prozent.</p>
<p><strong>Retinoide.</strong> Regulieren die Verhornung und verhindern, dass Poren überhaupt verstopfen. Wirken vorbeugend statt entfernend, brauchen Wochen.</p>
<p><strong><a href="/haut/niacinamid/">Niacinamid</a>.</strong> Reduziert die Talgmenge, mild und gut kombinierbar.</p>
<p><strong>Regelmässige Reinigung, abends doppelt</strong>, wenn du Sonnenschutz oder Make-up trägst. Erst ölbasiert, dann wasserbasiert.</p>
<p><strong>Nicht-komedogene Produkte.</strong> Besonders bei reichhaltigen Cremes und Ölen lohnt der Blick.</p>

<h2>Was schadet</h2>
<ul>
<li><strong>Ausdrücken mit den Fingern.</strong> Der Druck verlagert einen Teil des Inhalts nach unten, es entsteht eine Entzündung, und aus einem Mitesser wird ein Pickel mit anschliessendem <a href="/haut/pigmentflecken/">Pigmentfleck</a>.</li>
<li><strong>Porenstreifen.</strong> Sie ziehen die Talgfilamente heraus, verletzen dabei aber die Poreneingänge und trocknen die Haut aus. Nach zwei Wochen ist alles wieder da, die Haut aber gereizt.</li>
<li><strong>Backpulver, Zahnpasta, Zitrone.</strong> Zerstören den Säureschutzmantel, ohne irgendetwas zu lösen.</li>
<li><strong>Gesichtsdampfbäder mehrmals pro Woche.</strong> Reizen und trocknen aus. Poren öffnen sich dabei nicht, sie haben keine Muskulatur.</li>
<li><strong>Scharfe mechanische Peelings.</strong> Mikroverletzungen, die die Verhornung eher verstärken.</li>
</ul>

<h2>Professionelle Ausreinigung</h2>
<p>Eine fachgerechte manuelle Ausreinigung nach Aufweichen der Haut ist die sichere Variante dessen, was viele zu Hause versuchen. Sinnvoll bei echten, hartnäckigen Mitessern, nicht bei Talgfilamenten.</p>
<p>Apparative Verfahren wie <a href="/haut/hydrafacial/">Hydrafacial</a> arbeiten mit Unterdruck und leisten dasselbe schonender, ebenfalls mit begrenzter Haltbarkeit.</p>
<p>Was für beides gilt: Ohne eine Routine, die die Verhornung reguliert, ist die Haut in wenigen Wochen wieder dort, wo sie war.</p>

<h2>Wann zum Arzt</h2>
<p>Wenn zu den Mitessern entzündete Papeln, Pusteln oder Knoten kommen, ist es keine Reinigungsfrage mehr, sondern <a href="/beschwerden/akne/">Akne</a>, und die gehört behandelt, bevor Narben entstehen. Auch wenn eine Routine über drei Monate konsequent durchgezogen wurde und nichts passiert, lohnt die dermatologische Abklärung.</p>

<h2>Was wir machen</h2>
<p>Wir führen keine kosmetische Ausreinigung durch. Was wir beitragen: die Einordnung, und bei hormonell oder stressbedingt schwankendem Hautbild die begleitende Arbeit mit <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a>. Bei akut entzündeter Haut behandeln wir im Gesicht bewusst nicht.</p>
`.trim(),
    faqs: [
      { q: 'Was ist der Unterschied zwischen Mitessern und Talgfilamenten?', a: 'Talgfilamente sind kleine, gleichmässig verteilte Punkte auf der Nase und ein normaler Bestandteil der Haut. Sie kommen nach dem Entfernen immer wieder. Mitesser sind einzeln, unregelmässig, dunkler und erhabener, also eine echte Verstopfung.' },
      { q: 'Was hilft wirklich gegen Mitesser?', a: 'Salicylsäure zwei- bis dreimal pro Woche, weil sie fettlöslich ist und in die Pore gelangt. Ergänzend Retinoide zur Regulierung der Verhornung und Niacinamid zur Talgreduktion.' },
      { q: 'Sind Porenstreifen schädlich?', a: 'Sie entfernen Talgfilamente kurzfristig, verletzen dabei die Poreneingänge und trocknen die Haut aus. Nach etwa zwei Wochen ist alles wieder da, die Haut aber gereizt.' },
      { q: 'Darf ich Mitesser ausdrücken?', a: 'Besser nicht. Der Druck verlagert einen Teil des Inhalts nach unten, es entsteht eine Entzündung, und daraus wird ein Pickel mit möglichem Pigmentfleck.' },
      { q: 'Öffnen sich Poren durch Dampfbäder?', a: 'Nein. Poren haben keine Muskulatur und können sich nicht öffnen oder schliessen. Wärme weicht den Inhalt auf, mehr passiert nicht. Häufige Dampfbäder reizen und trocknen aus.' },
      { q: 'Wie lange dauert es, bis sich etwas tut?', a: 'Bei konsequenter Routine sechs bis zwölf Wochen. Wenn nach drei Monaten nichts passiert oder entzündete Stellen dazukommen, gehört es dermatologisch abgeklärt.' },
    ],
    related: [
      { href: '/haut/hydrafacial/', label: 'Hydrafacial', cat: 'Methode' },
      { href: '/haut/niacinamid/', label: 'Niacinamid', cat: 'Wirkstoff' },
      { href: '/beschwerden/akne/', label: 'Akne', cat: 'Beschwerde' },
    ],
  },
  {
    slug: 'retinol',
    title: 'Retinol: Einstieg, Dosierung, Nebenwirkungen',
    metaDesc: 'Retinol richtig anwenden: welche Stärke für den Einstieg, wie du die Retinisierung übersteht, womit du es nicht kombinierst und wann es nicht in Frage kommt.',
    excerpt: 'Der wirksamste frei verkäufliche Anti-Aging-Wirkstoff, und der, bei dem die meisten nach drei Wochen aufgeben. Meist wegen eines Dosierungsfehlers.',
    category: 'Wirkstoffe',
    h1: 'Retinol',
    lead: 'Retinoide sind der einzige frei verkäufliche Wirkstoff mit belegter Wirkung auf Falten und Hauttextur. Sie sind auch der Wirkstoff, der am häufigsten falsch dosiert wird. Wer die ersten sechs Wochen übersteht, hat das Schwierigste hinter sich.',
    readingTime: '9 Min.',
    ctaTitle: 'Haut, die auf jeden Wirkstoff reagiert?',
    ctaText: 'Wenn die Barriere dauerhaft überfordert ist, hilft kein weiteres Produkt. Wir schauen uns an, was dahintersteckt.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Retinoide sind Vitamin-A-Abkömmlinge. Sie beschleunigen die Zellerneuerung, regulieren die Verhornung und regen langfristig die Kollagenbildung an. Kein anderer frei verkäuflicher Wirkstoff hat eine vergleichbare Datenbasis.</p>

<h2>Die Stärkestufen</h2>
<p>Alle Retinoide müssen in der Haut zu Retinsäure umgewandelt werden. Je mehr Umwandlungsschritte nötig sind, desto milder und desto langsamer.</p>
<p><strong>Retinylester.</strong> Die mildeste Stufe, drei Umwandlungsschritte. Für sehr empfindliche Haut, Wirkung entsprechend gering.</p>
<p><strong>Retinol.</strong> Zwei Schritte. Der Standard in der Kosmetik, üblich sind 0,1 bis 1 Prozent.</p>
<p><strong>Retinaldehyd.</strong> Ein Schritt. Deutlich wirksamer als Retinol bei ähnlicher Verträglichkeit, in der Schweiz noch wenig verbreitet.</p>
<p><strong>Tretinoin.</strong> Die Säure selbst, keine Umwandlung nötig. Verschreibungspflichtig, ärztlich begleitet.</p>
<div class="wa-callout"><div class="wa-callout-label">Für den Einstieg</div><p>0,2 bis 0,3 Prozent Retinol, zweimal pro Woche. Nicht 1 Prozent jeden Abend. Die häufigste Ursache für Abbrüche ist ein zu ambitionierter Start.</p></div>

<h2>Die Retinisierung</h2>
<p>In den ersten vier bis sechs Wochen reagiert die Haut fast immer: Rötung, Trockenheit, Schuppung, manchmal ein Aufflammen von Unreinheiten. Das ist die sogenannte Retinisierung, eine Anpassungsphase.</p>
<p>Sie ist normal, sie geht vorbei, und sie ist kein Zeichen dafür, dass das Produkt wirkt. Sie ist auch kein Zeichen dafür, dass mehr besser wäre.</p>
<p>Was durch die Phase hilft: Frequenz reduzieren statt absetzen, <a href="/haut/niacinamid/">Niacinamid</a> oder <a href="/haut/centella/">Centella</a> dazu, und die Sandwich-Methode, also Feuchtigkeitscreme vor und nach dem Retinol.</p>

<h2>Wie du es anwendest</h2>
<p>Abends, auf trockene Haut. Auf feuchter Haut dringt es stärker ein und reizt entsprechend mehr.</p>
<p>Erbsengrosse Menge fürs ganze Gesicht. Aussparen: Augenlider, Nasenflügelfalten, Mundwinkel.</p>
<p>Frequenz aufbauen: zwei Wochen zweimal pro Woche, dann jeden zweiten Abend, dann täglich, wenn die Haut es trägt. Manche bleiben dauerhaft bei dreimal pro Woche, das ist völlig in Ordnung.</p>
<p><strong>Sonnenschutz am Morgen ist nicht optional.</strong> Retinoide machen die Haut lichtempfindlicher, und ohne UV-Schutz arbeitest du gegen dich selbst.</p>
<p>Sichtbare Ergebnisse bei Textur nach etwa zwölf Wochen, bei feinen Linien nach sechs Monaten. Wer nach vier Wochen wechselt, sieht nie etwas.</p>

<h2>Womit du es nicht kombinierst</h2>
<p><strong>Nicht in derselben Anwendung mit Säuren.</strong> AHA, BHA und Retinol zusammen überfordern die Barriere zuverlässig.</p>
<p><strong>Nicht zusammen mit <a href="/haut/vitamin-c-serum/">Vitamin C</a>.</strong> Nicht wegen einer chemischen Unverträglichkeit, sondern wegen der kumulierten Reizung. Vitamin C morgens, Retinol abends.</p>
<p><strong>Gut kombinierbar:</strong> Niacinamid, Centella, Hyaluronsäure, reichhaltige Feuchtigkeitspflege.</p>

<h2>Wann Retinol nicht in Frage kommt</h2>
<ul>
<li><strong>Schwangerschaft und Stillzeit.</strong> Vitamin-A-Abkömmlinge sind hier ausgeschlossen, auch topisch. Das ist keine Vorsichtsmassnahme, sondern eine klare Empfehlung.</li>
<li>Bei stark geschädigter Hautbarriere, erst aufbauen, dann starten.</li>
<li>Bei <a href="/beschwerden/rosacea/">Rosacea</a> im Schub.</li>
<li>Rund um ein Peeling, eine Laserbehandlung oder <a href="/haut/microneedling/">Microneedling</a>, vorher und nachher pausieren.</li>
</ul>
<p>Bei <a href="/haut/melasma/">Melasma</a> und Pigmentierung kann Retinol helfen, aber die Reizung kann auch nachpigmentieren lassen. Vorsichtig einsteigen.</p>

<h2>Was Retinol nicht kann</h2>
<p>Tiefe Falten glätten, erschlafftes Gewebe straffen, Konturen verändern. Es verbessert Textur, feine Linien und Ebenmässigkeit, über Monate und bei konsequenter Anwendung. Das ist viel, aber es ist begrenzt.</p>
<p>Wenn dein Thema Kontur ist, arbeitest du mit Retinol am falschen Problem. Was dafür in Frage kommt und wo dessen Grenzen liegen, steht unter <a href="/haut/ultherapy-hifu/">Ultherapy und HIFU</a>.</p>
`.trim(),
    faqs: [
      { q: 'Mit welcher Retinol-Konzentration soll ich anfangen?', a: '0,2 bis 0,3 Prozent, zweimal pro Woche. Danach langsam steigern. Ein zu hoch dosierter Start ist der häufigste Grund, warum Menschen Retinol nach drei Wochen wieder absetzen.' },
      { q: 'Wie lange dauert die Retinisierung?', a: 'Vier bis sechs Wochen. Rötung, Trockenheit und Schuppung sind in dieser Phase normal. Frequenz reduzieren hilft besser als absetzen.' },
      { q: 'Darf ich Retinol in der Schwangerschaft benutzen?', a: 'Nein. Vitamin-A-Abkömmlinge sind in Schwangerschaft und Stillzeit ausgeschlossen, auch in der äusserlichen Anwendung. Azelainsäure ist eine übliche Alternative, Rücksprache mit der behandelnden Ärztin.' },
      { q: 'Kann ich Retinol und Vitamin C kombinieren?', a: 'Nicht in derselben Anwendung, aber am selben Tag. Vitamin C morgens, Retinol abends. Zusammen aufgetragen steigt nur die Reizung.' },
      { q: 'Wann sieht man Ergebnisse?', a: 'Bei der Hauttextur nach etwa zwölf Wochen, bei feinen Linien nach rund sechs Monaten. Retinol braucht Konsequenz über Monate.' },
      { q: 'Muss ich bei Retinol Sonnenschutz benutzen?', a: 'Ja, zwingend. Retinoide machen die Haut lichtempfindlicher. Ohne täglichen UV-Schutz am Morgen arbeitest du gegen den eigenen Fortschritt.' },
    ],
    related: [
      { href: '/haut/niacinamid/', label: 'Niacinamid', cat: 'Wirkstoff' },
      { href: '/haut/sonnencreme-gesicht/', label: 'Sonnencreme fürs Gesicht', cat: 'Wirkstoff' },
      { href: '/haut/falten-gesicht/', label: 'Falten im Gesicht', cat: 'Hautthema' },
    ],
  },

  {
    slug: 'sonnencreme-gesicht',
    title: 'Sonnencreme fürs Gesicht: LSF, Filter, koreanische Texturen',
    metaDesc: 'Sonnenschutz fürs Gesicht: welcher LSF nötig ist, Unterschied mineralisch und chemisch, warum koreanische Formulierungen angenehmer sind und wie viel du auftragen musst.',
    excerpt: 'Der einzige Pflegeschritt, der langfristig über das Hautbild entscheidet. Und der, bei dem fast alle zu wenig auftragen.',
    category: 'Wirkstoffe',
    h1: 'Sonnencreme fürs Gesicht',
    lead: 'Wenn du aus dieser ganzen Sektion nur eine Sache mitnimmst, dann diese: Täglicher Sonnenschutz verändert das Hautbild über Jahre mehr als jedes Serum. Und die meisten tragen weniger als die Hälfte der nötigen Menge auf.',
    readingTime: '8 Min.',
    ctaTitle: 'Hautbild, das trotz Pflege nicht besser wird?',
    ctaText: 'Wir schauen uns die ganze Routine an, nicht nur das eine Produkt, und sagen ehrlich, wo der Hebel liegt.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>UV-Strahlung ist für den grössten Teil dessen verantwortlich, was als Hautalterung sichtbar wird: <a href="/haut/pigmentflecken/">Pigmentflecken</a>, feine Linien, Elastizitätsverlust, erweiterte Äderchen. Der Anteil wird auf etwa 80 Prozent geschätzt.</p>
<p>Daraus folgt eine unbequeme Rangfolge: Sonnenschutz vor jedem Wirkstoff. Ein 80-Franken-Serum ohne täglichen UV-Schutz ist eine schlechte Investition.</p>

<h2>Welcher LSF?</h2>
<p>Fürs Gesicht täglich <strong>LSF 30 bis 50</strong>. Der Unterschied zwischen 30 und 50 ist geringer als oft angenommen: 30 blockt etwa 97 Prozent der UVB-Strahlung, 50 etwa 98.</p>
<p>Wichtiger als die Zahl ist, dass <strong>UVA-Schutz</strong> ausgewiesen ist. In Europa erkennst du ihn am eingekreisten UVA-Logo, bei koreanischen und japanischen Produkten am PA-System, wobei PA++++ der höchste Wert ist. UVA dringt tiefer ein und ist für Alterung und Pigment massgeblich.</p>
<p>Bei <a href="/haut/melasma/">Melasma</a> reicht UV-Schutz allein nicht, dort braucht es zusätzlich getönte Produkte mit Eisenoxid gegen sichtbares Licht.</p>

<h2>Mineralisch oder chemisch?</h2>
<p><strong>Mineralische Filter</strong> (Zinkoxid, Titandioxid) legen sich auf die Haut und reflektieren. Sehr gut verträglich, hinterlassen aber häufig einen Weissschleier und wirken auf dunkleren Hauttönen grau.</p>
<p><strong>Chemische Filter</strong> wandeln UV-Strahlung in Wärme um. Kosmetisch deutlich angenehmer, dünner, ohne Rückstand. Moderne Filter sind gut untersucht.</p>
<p>Die meisten Menschen fahren mit einem angenehmen chemischen oder gemischten Filter besser, aus einem simplen Grund: Sie benutzen ihn tatsächlich täglich. Der beste Sonnenschutz ist der, der aufgetragen wird.</p>

<h2>Warum koreanische und japanische Produkte oft angenehmer sind</h2>
<p>In der EU und der Schweiz ist die Liste zugelassener UV-Filter kürzer und wird langsamer erweitert als in Korea und Japan. Dort sind modernere Filter zugelassen, die höheren Schutz bei leichterer Textur erlauben.</p>
<p>Deshalb sind asiatische Formulierungen häufig dünner, ziehen schneller ein und hinterlassen keinen Film, bei gleichem oder höherem Schutz. Das ist einer der wenigen Bereiche, in denen der K-Beauty-Hype einen realen technischen Grund hat.</p>
<p>Beim Kauf beachten: seriöse Bezugsquelle, Verfallsdatum, und die Kennzeichnung sollte lesbar sein. Bei Importprodukten gilt europäisches Recht nicht, die Deklaration kann abweichen.</p>

<h2>Wie viel und wie oft</h2>
<p>Für das Gesicht rechnet man mit etwa <strong>zwei Fingerlängen</strong> Produkt, also je ein Strang auf Zeige- und Mittelfinger. Das ist deutlich mehr, als die meisten auftragen.</p>
<p>Wer nur die Hälfte aufträgt, erreicht nicht die Hälfte des Schutzes, sondern weniger. Der Zusammenhang ist nicht linear.</p>
<p>Nachlegen alle zwei Stunden, sobald du längere Zeit draussen bist. An einem normalen Bürotag reicht die Morgenanwendung. Auch bei Bewölkung, auch im Winter, auch am Fenster: UVA durchdringt Fensterglas.</p>

<h2>Häufige Fehler</h2>
<ul>
<li><strong>Zu wenig Produkt.</strong> Der mit Abstand häufigste Fehler.</li>
<li><strong>Ohren, Hals und Nacken vergessen.</strong> Genau dort zeigt sich Sonnenschaden später deutlich.</li>
<li><strong>Auf LSF im Make-up verlassen.</strong> Die Auftragsmenge liegt weit unter der nötigen Dosis.</li>
<li><strong>Nur im Sommer.</strong> UVA ist ganzjährig relevant.</li>
</ul>

<h2>Was das für alles andere bedeutet</h2>
<p>Sonnenschutz ist die Grundlage, auf der jede andere Massnahme aufbaut. <a href="/haut/vitamin-c-serum/">Vitamin C</a> gegen Pigment, <a href="/haut/retinol/">Retinol</a> gegen Textur, jede Behandlung gegen Flecken: alles verliert ohne UV-Schutz einen Grossteil seiner Wirkung, und bei Pigmentthemen praktisch die gesamte.</p>
`.trim(),
    faqs: [
      { q: 'Welcher LSF fürs Gesicht im Alltag?', a: 'LSF 30 bis 50, täglich. Wichtiger als die Zahl ist ein ausgewiesener UVA-Schutz, erkennbar am eingekreisten UVA-Logo oder am PA-System bei asiatischen Produkten.' },
      { q: 'Wie viel Sonnencreme brauche ich fürs Gesicht?', a: 'Etwa zwei Fingerlängen, also je ein Strang auf Zeige- und Mittelfinger. Wer die Hälfte aufträgt, erreicht deutlich weniger als die Hälfte des Schutzes.' },
      { q: 'Mineralisch oder chemisch, was ist besser?', a: 'Mineralisch ist sehr gut verträglich, hinterlässt aber oft einen Weissschleier. Chemische Filter sind kosmetisch angenehmer. Der beste Sonnenschutz ist der, den du tatsächlich täglich benutzt.' },
      { q: 'Warum sind koreanische Sonnencremes leichter?', a: 'In Korea und Japan sind modernere UV-Filter zugelassen als in der EU und der Schweiz. Sie erlauben hohen Schutz bei dünnerer Textur. Das ist ein realer technischer Vorteil.' },
      { q: 'Brauche ich Sonnenschutz auch im Winter und drinnen?', a: 'UVA ist ganzjährig relevant und durchdringt Fensterglas. Wer viel am Fenster sitzt oder täglich draussen ist, profitiert auch im Winter.' },
      { q: 'Reicht der LSF in meiner Tagescreme oder Foundation?', a: 'In der Regel nicht. Die aufgetragene Menge liegt weit unter der Dosis, mit der der Schutzfaktor gemessen wird.' },
    ],
    related: [
      { href: '/haut/pigmentflecken/', label: 'Pigmentflecken', cat: 'Hautthema' },
      { href: '/haut/melasma/', label: 'Melasma', cat: 'Hautthema' },
      { href: '/haut/retinol/', label: 'Retinol', cat: 'Wirkstoff' },
    ],
  },

  {
    slug: 'ampoule',
    title: 'Ampoule, Essence, Serum: was ist der Unterschied?',
    metaDesc: 'Ampoule, Essence, Serum und Toner in der koreanischen Hautpflege: was die Begriffe bedeuten, welche Reihenfolge sinnvoll ist und welche Schritte du weglassen kannst.',
    excerpt: 'Vier Produktkategorien, die sich überschneiden und deren Namen nicht geschützt sind. Was tatsächlich dahintersteckt.',
    category: 'K-Beauty',
    h1: 'Ampoule, Essence und Serum',
    lead: 'Die koreanische Hautpflege kennt mehr Produktkategorien als die europäische, und keine davon ist rechtlich definiert. Was drinsteht, entscheidet der Hersteller. Hier steht, was die Begriffe üblicherweise meinen und was du weglassen kannst.',
    readingTime: '6 Min.',
    ctaTitle: 'Zu viele Produkte, zu wenig Ergebnis?',
    ctaText: 'Manchmal ist weniger Routine und mehr Behandlung der einfachere Weg. Wir ordnen ein, was bei dir sinnvoll wäre.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Vorweg das Wichtigste: <strong>Keiner dieser Begriffe ist geschützt.</strong> Ob ein Produkt als Essence, Serum oder Ampoule verkauft wird, entscheidet die Marketingabteilung. Die INCI-Liste sagt mehr als der Name auf der Flasche.</p>
<p>Trotzdem gibt es eine gewachsene Konvention, und die ist nützlich zu kennen.</p>

<h2>Die Kategorien</h2>
<p><strong>Toner.</strong> In der koreanischen Logik kein Gesichtswasser zum Entfetten, sondern ein erster Feuchtigkeitsschritt direkt nach der Reinigung. Sehr dünnflüssig. Bereitet die Haut auf die folgenden Schichten vor.</p>
<p><strong>Essence.</strong> Etwas dickflüssiger als Toner, niedrigere Wirkstoffkonzentration als ein Serum. Der Schritt, der in europäischen Routinen meist fehlt. Ziel ist Hydration, nicht gezielte Wirkstoffabgabe.</p>
<p><strong>Serum.</strong> Höhere Wirkstoffkonzentration, gezielt auf ein Thema ausgerichtet: Pigment, Textur, Rötung.</p>
<p><strong>Ampoule.</strong> Konventionell die konzentrierteste Stufe, oft in kleinen Flaschen, gedacht als Kur über einige Wochen. In der Praxis ist der Unterschied zum Serum häufig fliessend.</p>
<div class="wa-callout"><div class="wa-callout-label">Praktisch</div><p>Wenn du wissen willst, ob eine Ampoule wirklich konzentrierter ist als das Serum daneben, vergleiche die INCI-Listen. Steht der Wirkstoff weiter vorne, ist mehr drin. Steht er an derselben Stelle, zahlst du für das Wort.</p></div>

<h2>Die sinnvolle Reihenfolge</h2>
<p>Die Regel ist einfach: <strong>von dünn nach dick.</strong> Ein dünnflüssiges Produkt dringt nicht durch eine Cremeschicht.</p>
<ol>
<li>Reinigung, abends doppelt</li>
<li>Toner oder Essence</li>
<li>Serum oder Ampoule</li>
<li>Feuchtigkeitscreme</li>
<li>Morgens: <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a> als letzter Schritt</li>
</ol>
<p>Zwischen den Schritten kurz warten, aber nicht bis zur völligen Trockenheit. Der eigentliche Trick der koreanischen Methode ist, auf <em>leicht feuchte</em> Haut zu schichten. Das ist wirksamer als jede zusätzliche Kategorie.</p>

<h2>Was du weglassen kannst</h2>
<p>Für die meisten Menschen reichen vier Schritte: Reinigung, ein Feuchtigkeitsschritt, ein Wirkstoff, Sonnenschutz.</p>
<p>Toner <em>und</em> Essence <em>und</em> Serum <em>und</em> Ampoule übereinander ist selten sinnvoll. Jede zusätzliche Formulierung ist ein zusätzliches Reizrisiko, und die Wirkstoffe konkurrieren um dieselbe Aufnahmekapazität.</p>
<p>Die berühmte Zehn-Schritte-Routine war nie als tägliche Pflicht gedacht. Sie ist eine Auswahl von Möglichkeiten, aus der man je nach Hautzustand kombiniert.</p>

<h2>Woran du Qualität erkennst</h2>
<ul>
<li><strong>Wirkstoff weit vorne in der INCI-Liste.</strong> Alles nach den Konservierungsstoffen ist Dekoration.</li>
<li><strong>Konzentration deklariert.</strong> Seriöse Marken schreiben, wie viel <a href="/haut/niacinamid/">Niacinamid</a> oder <a href="/haut/centella/">Centella</a> drin ist.</li>
<li><strong>Sinnvolle Verpackung.</strong> Lichtempfindliche Wirkstoffe wie <a href="/haut/vitamin-c-serum/">Vitamin C</a> gehören in dunkle, luftdichte Behälter, nicht in Klarglas mit Pipette.</li>
<li><strong>Kurze Zutatenliste bei empfindlicher Haut.</strong> Weniger Bestandteile heisst weniger mögliche Auslöser.</li>
</ul>
`.trim(),
    faqs: [
      { q: 'Was ist der Unterschied zwischen Ampoule und Serum?', a: 'Konventionell ist eine Ampoule konzentrierter und als Kur über einige Wochen gedacht. Beide Begriffe sind aber nicht geschützt, in der Praxis ist der Unterschied oft fliessend. Die INCI-Liste sagt mehr als der Name.' },
      { q: 'Brauche ich Toner und Essence?', a: 'Nein. Für die meisten reichen Reinigung, ein Feuchtigkeitsschritt, ein Wirkstoff und Sonnenschutz. Mehrere Schichten übereinander erhöhen vor allem das Reizrisiko.' },
      { q: 'In welcher Reihenfolge trage ich die Produkte auf?', a: 'Von dünn nach dick: Reinigung, Toner oder Essence, Serum oder Ampoule, Feuchtigkeitscreme, morgens zuletzt Sonnenschutz. Auf leicht feuchte Haut schichten wirkt besser als auf trockene.' },
      { q: 'Ist die koreanische Zehn-Schritte-Routine nötig?', a: 'Nein, sie war nie als tägliche Pflicht gedacht. Sie beschreibt eine Auswahl von Möglichkeiten, aus der je nach Hautzustand kombiniert wird.' },
      { q: 'Woran erkenne ich, ob ein Produkt genug Wirkstoff enthält?', a: 'An der Position in der INCI-Liste. Steht der Wirkstoff weit vorne, ist relevant viel drin. Alles hinter den Konservierungsstoffen ist in geringer Menge enthalten.' },
      { q: 'Was ist ein Toner in der koreanischen Pflege?', a: 'Kein Gesichtswasser zum Entfetten, sondern ein erster dünnflüssiger Feuchtigkeitsschritt direkt nach der Reinigung, der die Haut auf die folgenden Schichten vorbereitet.' },
    ],
    related: [
      { href: '/haut/glass-skin/', label: 'Glass Skin', cat: 'K-Beauty' },
      { href: '/therapien/hanbang/', label: 'Hanbang – Koreanische Gesichtsbehandlung', cat: 'Behandlung' },
      { href: '/haut/centella/', label: 'Centella (Cica)', cat: 'Wirkstoff' },
    ],
  },

  {
    slug: 'falten-gesicht',
    title: 'Falten im Gesicht: Zornesfalte, Nasolabial, Marionettenfalten',
    metaDesc: 'Falten im Gesicht verstehen: warum Mimikfalten, Volumenfalten und Schwerkraftfalten unterschiedlich behandelt werden und was bei welcher Falte realistisch möglich ist.',
    excerpt: 'Drei Faltentypen, drei völlig verschiedene Ursachen. Was bei welcher Falte funktioniert und was nicht.',
    category: 'Hautthemen',
    h1: 'Falten im Gesicht',
    lead: 'Eine Zornesfalte entsteht durch Muskelbewegung, eine Nasolabialfalte durch Volumenverlust, Marionettenfalten durch Schwerkraft und Gewebeabsenkung. Wer alle drei mit derselben Creme behandelt, wird bei mindestens zweien enttäuscht.',
    readingTime: '8 Min.',
    ctaTitle: 'Mehr Spannung als Falte?',
    ctaText: 'Bei vielen ist der Gesichtsausdruck angespannter als nötig. Daran lässt sich arbeiten, ohne Nadel und ohne Präparat.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Falten haben nicht eine Ursache, sondern drei. Welcher Typ vorliegt, entscheidet darüber, was überhaupt möglich ist, und ersparen kann diese Unterscheidung viel Geld.</p>

<h2>Die drei Faltentypen</h2>
<p><strong>Mimikfalten.</strong> Entstehen durch wiederholte Muskelbewegung. Dazu gehören die <strong>Zornesfalte</strong> zwischen den Augenbrauen, Stirnfalten und Krähenfüsse. Anfangs nur bei Bewegung sichtbar, mit den Jahren auch in Ruhe.</p>
<p><strong>Volumenfalten.</strong> Entstehen, wenn darunterliegendes Fettgewebe und Knochensubstanz abnehmen. Die <strong>Nasolabialfalte</strong> ist das bekannteste Beispiel. Sie ist keine Falte im eigentlichen Sinn, sondern eine Grenze zwischen zwei Gewebeabschnitten, die mit dem Volumenverlust deutlicher hervortritt.</p>
<p><strong>Schwerkraftfalten.</strong> Entstehen durch Absinken des Gewebes. <strong>Marionettenfalten</strong> vom Mundwinkel abwärts gehören hierher, ebenso die weiche Kieferlinie.</p>
<div class="wa-callout"><div class="wa-callout-label">Selbsttest</div><p>Sichtbar nur beim Stirnrunzeln oder Lächeln: Mimikfalte. Sichtbar auch in völliger Entspannung, verschwindet aber, wenn du dich hinlegst: eher Volumen und Schwerkraft. Sichtbar in jeder Position: strukturell verfestigt.</p></div>

<h2>Was Pflege leisten kann</h2>
<p>Ehrlich: Pflege verbessert die Hautqualität, nicht die Gesichtsstruktur. Sie wirkt auf feine Linien und Oberflächentextur, nicht auf Volumen und nicht auf Absenkung.</p>
<p><strong><a href="/haut/retinol/">Retinoide</a></strong> sind der einzige frei verkäufliche Wirkstoff mit belegter Wirkung auf feine Linien. Monate, nicht Wochen.</p>
<p><strong><a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a></strong> ist präventiv das Wirksamste überhaupt. Was nicht entsteht, muss nicht behandelt werden.</p>
<p><strong><a href="/haut/vitamin-c-serum/">Vitamin C</a></strong> ergänzend, antioxidativ und als Kofaktor der Kollagensynthese.</p>
<p>Was Pflege nicht kann: eine ausgeprägte Zornesfalte glätten, eine Nasolabialfalte auffüllen, Marionettenfalten anheben. Produkte, die das versprechen, halten es nicht.</p>

<h2>Was bei welchem Typ in Frage kommt</h2>
<p><strong>Mimikfalten.</strong> Muskelentspannende Injektionen sind hier das etablierte Verfahren. Es handelt sich um ein verschreibungspflichtiges Arzneimittel, das ausschliesslich ärztlich angewendet wird und über das wir aus rechtlichen Gründen nicht werbend informieren dürfen. Sprich darüber mit einer Fachärztin.</p>
<p><strong>Volumenfalten.</strong> Hyaluronsäure-Filler bauen gezielt Volumen auf. <a href="/haut/profhilo/">Profhilo</a> gehört ausdrücklich nicht dazu, es füllt nicht.</p>
<p><strong>Schwerkraftfalten.</strong> Hier stösst alles Nicht-Chirurgische an Grenzen. <a href="/haut/ultherapy-hifu/">HIFU</a> kann bei leichter Erschlaffung moderat straffen, bei deutlicher Absenkung nicht.</p>
<p><strong>Textur und feine Linien.</strong> <a href="/haut/microneedling/">Microneedling</a> über mehrere Sitzungen.</p>

<h2>Was wir beitragen können, und was nicht</h2>
<p>Ein Punkt, der selten angesprochen wird: Viele Menschen tragen dauerhaft mehr Spannung im Gesicht, als der Ausdruck bräuchte. Zusammengezogene Brauen bei Bildschirmarbeit, angespannter Kiefer bei Stress, nächtliches Zähneknirschen. Diese Dauerspannung vertieft Mimikfalten schneller.</p>
<p>An der Spannung lässt sich arbeiten. <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> und <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> setzen genau dort an, ohne Präparat und ohne Ausfallzeit.</p>
<p>Was sie nicht tun: Volumen aufbauen, abgesunkenes Gewebe anheben, eine tief eingegrabene Falte glätten. Wenn es darum geht, sagen wir das, statt eine Serie zu verkaufen, die das Thema nicht trifft.</p>
`.trim(),
    faqs: [
      { q: 'Was hilft gegen die Zornesfalte?', a: 'Sie ist eine Mimikfalte, entstanden durch wiederholte Muskelbewegung. Pflege wirkt darauf kaum. Muskelentspannende Injektionen sind das etablierte ärztliche Verfahren. An der zugrunde liegenden Dauerspannung lässt sich zusätzlich arbeiten.' },
      { q: 'Kann man Nasolabialfalten wegcremen?', a: 'Nein. Die Nasolabialfalte entsteht durch Volumenverlust im darunterliegenden Gewebe, nicht durch Hautqualität. Creme kann die Oberfläche verbessern, nicht das Volumen.' },
      { q: 'Was ist der Unterschied zwischen Mimik- und Volumenfalten?', a: 'Mimikfalten entstehen durch Muskelbewegung und sind anfangs nur in Bewegung sichtbar. Volumenfalten entstehen durch Abnahme von Fett- und Knochensubstanz und sind auch in Ruhe da.' },
      { q: 'Hilft Gesichtsakupunktur gegen Falten?', a: 'Sie arbeitet an Muskelspannung und Durchblutung. Wo Dauerspannung eine Mimikfalte mitverursacht, kann das etwas bewirken. Volumenverlust und abgesunkenes Gewebe adressiert sie nicht.' },
      { q: 'Was ist die beste Vorbeugung gegen Falten?', a: 'Täglicher Sonnenschutz. UV-Strahlung ist für den Grossteil der sichtbaren Hautalterung verantwortlich. Alles andere kommt danach.' },
      { q: 'Wirkt Retinol gegen tiefe Falten?', a: 'Auf feine Linien und Textur wirkt es belegt, über Monate. Tiefe Falten glättet es nicht, und erschlafftes Gewebe strafft es nicht.' },
    ],
    related: [
      { href: '/haut/retinol/', label: 'Retinol', cat: 'Wirkstoff' },
      { href: '/haut/ultherapy-hifu/', label: 'Ultherapy und HIFU', cat: 'Methode' },
      { href: '/therapien/gesichtsakupunktur/', label: 'Gesichtsakupunktur', cat: 'Behandlung' },
    ],
  },

  {
    slug: 'k-beauty',
    title: 'K-Beauty: was wirklich dahintersteckt',
    metaDesc: 'K-Beauty jenseits des Hypes: welche Prinzipien der koreanischen Hautpflege tatsächlich etwas taugen, welche Wirkstoffe von dort kommen und was Marketing ist.',
    excerpt: 'Weniger Zaubermittel, mehr Methode. Was die koreanische Hautpflege richtig macht und wo der Hype anfängt.',
    category: 'K-Beauty',
    h1: 'K-Beauty',
    lead: 'Koreanische Hautpflege hat der Welt einige wirklich gute Ideen gebracht und eine Menge Produktkategorien, die niemand braucht. Hier trennen wir das eine vom anderen.',
    readingTime: '8 Min.',
    ctaTitle: 'Koreanische Methode, Schweizer Praxis',
    ctaText: 'Wir arbeiten mit Techniken, die aus derselben Tradition stammen. Sag uns, worum es bei dir geht.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>K-Beauty steht für koreanische Hautpflege, und der Begriff transportiert zwei sehr verschiedene Dinge: eine ernst zu nehmende Herangehensweise an Haut, und eine Marketingmaschine mit hoher Produkttaktung.</p>

<h2>Die vier Prinzipien, die etwas taugen</h2>
<p><strong>Pflege statt Korrektur.</strong> Der grundlegende Unterschied zur westlichen Tradition. Der Fokus liegt auf dem Erhalt gesunder Haut über Jahre statt auf der Behandlung von Problemen, wenn sie da sind. Das erklärt auch, warum Sonnenschutz dort selbstverständlicher ist.</p>
<p><strong>Feuchtigkeit schichten.</strong> Mehrere dünne Schichten auf leicht feuchte Haut wirken besser als eine dicke Schicht auf trockene. Das ist der praktisch nützlichste Beitrag der koreanischen Methode und kostet nichts.</p>
<p><strong>Hautbarriere zuerst.</strong> Wo westliche Routinen oft mit dem stärksten Wirkstoff beginnen, wird dort erst die Barriere aufgebaut. Ein Grund, warum beruhigende Wirkstoffe wie <a href="/haut/centella/">Centella</a> so präsent sind.</p>
<p><strong>Konsequenz über Zeit.</strong> Nicht die Intensität einer Anwendung zählt, sondern dass sie über Monate stattfindet. Dieselbe Logik steht hinter jeder Behandlungsserie in unserer Praxis.</p>

<h2>Die Wirkstoffe, die von dort kommen</h2>
<p>K-Beauty hat mehrere Inhaltsstoffe in die westliche Hautpflege gebracht, lange bevor sie hier Standard wurden:</p>
<ul>
<li><strong><a href="/haut/centella/">Centella asiatica</a></strong>, als Cica bekannt. Beruhigend, gut belegt, und in der chinesischen Kräuterkunde als Jixuecao seit Jahrhunderten in Gebrauch.</li>
<li><strong><a href="/haut/niacinamid/">Niacinamid</a></strong> in alltagstauglichen Konzentrationen, lange bevor es hier in jedem Serum stand.</li>
<li><strong>Schneckensekret.</strong> Klingt nach Gimmick, hat aber Daten zur Barriereunterstützung. Kein Wundermittel.</li>
<li><strong>Moderne UV-Filter.</strong> Der praktisch bedeutsamste Punkt. Mehr dazu unter <a href="/haut/sonnencreme-gesicht/">Sonnencreme fürs Gesicht</a>.</li>
</ul>

<h2>Wo der Hype anfängt</h2>
<p><strong>Die Zehn-Schritte-Routine.</strong> Nie als tägliche Pflicht gedacht, sondern als Auswahl. Als Verkaufskonzept funktioniert sie hervorragend, für die Haut ist sie meist unnötig. Was die Kategorien tatsächlich bedeuten, steht unter <a href="/haut/ampoule/">Ampoule, Essence und Serum</a>.</p>
<p><strong><a href="/haut/glass-skin/">Glass Skin</a> als Ziel.</strong> Ein Zustand, kein erreichbarer Dauerzustand, und zu einem guten Teil Licht und Kamera.</p>
<p><strong>Produkttaktung.</strong> Der koreanische Markt bringt Neuheiten in einem Tempo heraus, dem keine Studienlage folgen kann. Neu heisst dort nicht besser untersucht, sondern nur neu.</p>
<p><strong>Fermentierte Zutaten und exotische Extrakte.</strong> Klingen besonders, sind es selten. Die Wirkung steckt fast immer in den bekannten Wirkstoffen im selben Produkt.</p>
<div class="wa-pullquote">Das Beste an K-Beauty ist die Methode, nicht das Produkt. Die Methode kostet nichts.</div>

<h2>Und die koreanische Tradition dahinter</h2>
<p>Hinter der modernen Kosmetikindustrie steht eine ältere Tradition: <strong>Hanbang</strong>, die koreanische traditionelle Medizin, eng verwandt mit der chinesischen. Viele Wirkstoffe, die heute in Seren stehen, sind dort seit Jahrhunderten in Gebrauch, nur meist innerlich statt äusserlich.</p>
<p>Für uns ist das keine Randnotiz. Wir arbeiten mit derselben Kräutertradition, und Techniken wie <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha</a> stammen aus demselben Umfeld. Der Unterschied: Wir behaupten nicht, dass ein Tee dasselbe leistet wie ein Serum.</p>

<h2>Was du praktisch mitnehmen kannst</h2>
<ol>
<li>Täglich <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a>, gern ein koreanisches Produkt wegen der Textur.</li>
<li>Feuchtigkeit auf leicht feuchte Haut schichten, zwei dünne statt einer dicken.</li>
<li>Barriere vor Wirkstoff. Erst beruhigen, dann behandeln.</li>
<li>Ein Wirkstoff pro Thema, konsequent über Monate.</li>
<li>Alles andere ist optional.</li>
</ol>
`.trim(),
    faqs: [
      { q: 'Was ist K-Beauty?', a: 'Koreanische Hautpflege. Der Begriff steht sowohl für eine Herangehensweise, die auf Erhalt statt Korrektur setzt, als auch für eine sehr aktive Kosmetikindustrie mit hoher Produkttaktung.' },
      { q: 'Ist die Zehn-Schritte-Routine sinnvoll?', a: 'Für die meisten nicht als tägliche Pflicht. Sie war als Auswahl gedacht, aus der je nach Hautzustand kombiniert wird. Vier Schritte decken das Wesentliche ab.' },
      { q: 'Was ist an koreanischer Hautpflege wirklich besser?', a: 'Vier Dinge: der Fokus auf Erhalt statt Korrektur, das Schichten auf leicht feuchte Haut, Barriere vor Wirkstoff, und modernere UV-Filter, die in Korea früher zugelassen wurden als in Europa.' },
      { q: 'Sind koreanische Produkte für europäische Haut geeignet?', a: 'Ja. Hautbedürfnisse unterscheiden sich individuell mehr als geografisch. Zu beachten ist bei Importprodukten die Deklaration, weil europäisches Recht dort nicht gilt.' },
      { q: 'Was ist Hanbang?', a: 'Die koreanische traditionelle Medizin, eng verwandt mit der chinesischen. Viele Wirkstoffe der modernen K-Beauty stammen aus dieser Tradition, dort allerdings meist in innerlicher Anwendung.' },
      { q: 'Lohnt sich der Kauf teurer K-Beauty-Produkte?', a: 'Selten. Die Wirkung steckt in den bekannten Wirkstoffen, nicht in exotischen Extrakten oder Fermentation. Ein günstiges Produkt mit gut dosiertem Wirkstoff schlägt ein teures ohne.' },
    ],
    related: [
      { href: '/therapien/hanbang/', label: 'Hanbang – Koreanische Gesichtsbehandlung', cat: 'Behandlung' },
      { href: '/haut/ampoule/', label: 'Ampoule, Essence, Serum', cat: 'K-Beauty' },
      { href: '/haut/centella/', label: 'Centella (Cica)', cat: 'Wirkstoff' },
    ],
  },
  {
    slug: 'peeling',
    title: 'Chemisches Peeling und Fruchtsäure: AHA, BHA, PHA erklärt',
    metaDesc: 'Chemisches Peeling verstehen: Unterschied AHA, BHA und PHA, welche Säure zu welcher Haut passt, wie oft du peelen darfst und woran du Überpeeling erkennst.',
    excerpt: 'Drei Säuregruppen für drei verschiedene Hautprobleme. Und die Frage, die wichtiger ist als die Auswahl: wie oft.',
    category: 'Methoden',
    h1: 'Chemisches Peeling',
    lead: 'AHA, BHA, PHA. Drei Abkürzungen, drei Wirkprofile, und ein Fehler, den fast alle machen: zu häufig. Überpeelte Haut sieht schlechter aus als ungepeelte, und braucht Wochen zur Erholung.',
    readingTime: '8 Min.',
    ctaTitle: 'Haut, die nach dem Peeling schlechter ist?',
    ctaText: 'Dann ist die Barriere überfordert. Wir schauen uns die Routine an und sagen, was reduziert gehört.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Chemische Peelings lösen die Verbindungen zwischen abgestorbenen Hautzellen, statt sie mechanisch abzureiben. Das ist schonender und kontrollierbarer als jedes Körnchen-Peeling.</p>

<h2>Die drei Säuregruppen</h2>
<p><strong>AHA, Alpha-Hydroxysäuren.</strong> Wasserlöslich, wirken an der Oberfläche. Glykolsäure dringt am tiefsten ein, Milchsäure ist milder und feuchtigkeitsspendend, Mandelsäure hat grössere Moleküle und ist die verträglichste. Für Textur, Ebenmässigkeit und oberflächliche <a href="/haut/pigmentflecken/">Pigmentierung</a>.</p>
<p><strong>BHA, Beta-Hydroxysäuren.</strong> Praktisch immer Salicylsäure. Fettlöslich, gelangt dadurch in die Pore hinein. Die Wahl bei <a href="/haut/mitesser/">Mitessern</a>, unreiner und öliger Haut.</p>
<p><strong>PHA, Polyhydroxysäuren.</strong> Gluconolacton, Lactobionsäure. Grösste Moleküle, dringen am wenigsten ein, wirken am mildesten und binden zusätzlich Feuchtigkeit. Für empfindliche Haut und bei <a href="/haut/couperose/">Couperose</a>-Neigung.</p>
<div class="wa-callout"><div class="wa-callout-label">Kurzformel</div><p>Textur und Flecken: AHA. Poren und Unreinheiten: BHA. Empfindlich: PHA.</p></div>

<h2>Wie oft?</h2>
<p>Das ist die Frage, an der die meisten scheitern. <strong>Ein- bis zweimal pro Woche reicht.</strong> Bei empfindlicher Haut einmal, bei robuster Haut und niedrigen Konzentrationen bis dreimal.</p>
<p>Nicht: täglich. Nicht: Toner mit Säure plus Serum mit Säure plus wöchentliche Maske. Das summiert sich, ohne dass es auffällt.</p>

<h2>Woran du Überpeeling erkennst</h2>
<ul>
<li>Die Haut glänzt speckig, wirkt aber gleichzeitig gespannt</li>
<li>Produkte, die vorher gut vertragen wurden, brennen plötzlich</li>
<li>Anhaltende Rötung, die nicht abklingt</li>
<li>Kleine, raue Stellen und ungewohnte Empfindlichkeit</li>
<li>Neue Unreinheiten trotz konsequenter Reinigung</li>
</ul>
<p>Wenn das zutrifft: alle Säuren und Retinoide absetzen, zwei bis vier Wochen nur Reinigung, Feuchtigkeit, <a href="/haut/centella/">Centella</a> und <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a>. Danach vorsichtig neu aufbauen.</p>

<h2>Peeling in der Praxis</h2>
<p>Professionelle Peelings arbeiten mit höheren Konzentrationen und niedrigerem pH. Oberflächliche Peelings kosten in der Schweiz etwa <strong>CHF 150 bis 300</strong> pro Sitzung, üblich sind Serien von vier bis sechs im Abstand von zwei bis vier Wochen.</p>
<p>Mitteltiefe und tiefe Peelings gehören ausschliesslich in ärztliche Hände, mit entsprechender Ausfallzeit und realem Risiko für Pigmentveränderungen.</p>

<h2>Wann kein Peeling</h2>
<p>Bei gereizter oder geschädigter Barriere, bei Sonnenbrand, bei aktivem Lippenherpes, bei <a href="/beschwerden/rosacea/">Rosacea</a> im Schub, in den Tagen um eine andere Behandlung herum, und bei <a href="/haut/melasma/">Melasma</a> nur sehr vorsichtig und dosiert.</p>
<p>Nach jedem Peeling ist Sonnenschutz Pflicht. Frisch gepeelte Haut pigmentiert leicht nach, und dann hast du das Gegenteil von dem erreicht, was du wolltest.</p>
`.trim(),
    faqs: [
      { q: 'Was ist der Unterschied zwischen AHA und BHA?', a: 'AHA ist wasserlöslich und wirkt an der Hautoberfläche, gut für Textur und oberflächliche Pigmentierung. BHA ist fettlöslich und gelangt in die Pore hinein, deshalb die Wahl bei Mitessern und unreiner Haut.' },
      { q: 'Wie oft darf ich chemisch peelen?', a: 'Ein- bis zweimal pro Woche reicht für die meisten. Wichtig ist, alle Säurequellen zusammenzuzählen: Toner, Serum und Maske summieren sich schneller als gedacht.' },
      { q: 'Woran erkenne ich überpeelte Haut?', a: 'Speckiger Glanz bei gleichzeitigem Spannungsgefühl, plötzliches Brennen bei vertrauten Produkten, anhaltende Rötung und neue Unreinheiten. Dann alle Säuren zwei bis vier Wochen absetzen.' },
      { q: 'Welche Säure bei empfindlicher Haut?', a: 'PHA, also Gluconolacton oder Lactobionsäure. Die Moleküle sind grösser, dringen weniger tief ein und binden zusätzlich Feuchtigkeit.' },
      { q: 'Was kostet ein Peeling in der Schweiz?', a: 'Oberflächliche Peelings etwa CHF 150 bis 300 pro Sitzung, üblich sind Serien von vier bis sechs Sitzungen. Mitteltiefe Peelings gehören in ärztliche Hände.' },
      { q: 'Kann ich Peeling und Retinol kombinieren?', a: 'Nicht in derselben Anwendung. Abwechselnde Abende funktionieren, wenn die Haut es trägt. Zusammen überfordert es die Barriere zuverlässig.' },
    ],
    related: [
      { href: '/haut/mitesser/', label: 'Mitesser', cat: 'Hautthema' },
      { href: '/haut/retinol/', label: 'Retinol', cat: 'Wirkstoff' },
      { href: '/haut/centella/', label: 'Centella (Cica)', cat: 'Wirkstoff' },
    ],
  },

  {
    slug: 'unreine-haut',
    title: 'Unreine Haut bei Erwachsenen: Ursachen und was hilft',
    metaDesc: 'Unreine Haut mit 30 oder 40: warum sie anders ist als Teenager-Akne, welche Rolle Hormone und Stress spielen und welche Routine tatsächlich funktioniert.',
    excerpt: 'Unreinheiten mit 35 sind kein zurückgekehrtes Teenager-Problem. Ursache, Hautzustand und Behandlung sind andere.',
    category: 'Hautthemen',
    h1: 'Unreine Haut bei Erwachsenen',
    lead: 'Erwachsenenakne sitzt meist an Kinn und Kieferlinie, kommt in Schüben und trifft Haut, die gleichzeitig trocken sein kann. Wer sie mit den Mitteln von damals behandelt, macht sie schlimmer.',
    readingTime: '7 Min.',
    ctaTitle: 'Unreinheiten, die im Takt kommen und gehen?',
    ctaText: 'Wo Zyklus und Stress mitspielen, greift eine reine Pflegeroutine oft zu kurz. Wir schauen uns das Gesamtbild an.',
    ctaHref: '/therapien/gesichtsakupunktur/',
    ctaLabel: 'Gesichtsakupunktur ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Unreine Haut im Erwachsenenalter ist häufig, betrifft überwiegend Frauen und unterscheidet sich in mehreren Punkten deutlich von der Akne im Jugendalter.</p>

<h2>Warum sie anders ist</h2>
<p><strong>Anderes Muster.</strong> Statt T-Zone sind Kinn, Kieferlinie und Hals betroffen. Das ist das typische Verteilungsmuster bei hormoneller Mitbeteiligung.</p>
<p><strong>Andere Beschaffenheit.</strong> Weniger Mitesser, mehr tiefsitzende, entzündete Knötchen, die lange brauchen und selten an die Oberfläche kommen.</p>
<p><strong>Andere Haut drumherum.</strong> Die Haut kann gleichzeitig trocken, empfindlich und unrein sein. Genau deshalb scheitern austrocknende Produkte aus der Teenagerzeit.</p>
<p><strong>Anderes Timing.</strong> Häufig in Schüben, oft in der zweiten Zyklushälfte, verstärkt unter Stress und Schlafmangel.</p>

<h2>Was mitspielt</h2>
<ul>
<li><strong>Hormonelle Schwankungen.</strong> Zyklus, Absetzen der Pille, <a href="/beschwerden/pcos/">PCOS</a>, Perimenopause.</li>
<li><strong>Stress.</strong> Erhöhtes Cortisol steigert die Talgproduktion und verzögert die Heilung.</li>
<li><strong>Überpflegung.</strong> Der häufigste selbstgemachte Faktor: zu viel Reinigung, zu viele Säuren, geschädigte Barriere.</li>
<li><strong>Komedogene Produkte</strong>, besonders reichhaltige Cremes und Öle.</li>
</ul>

<h2>Die Routine, die funktioniert</h2>
<p><strong>Milde Reinigung, zweimal täglich.</strong> Nicht mehr. Wer dreimal wäscht, produziert mehr Talg, nicht weniger.</p>
<p><strong>Salicylsäure</strong> zwei- bis dreimal pro Woche, siehe <a href="/haut/peeling/">chemisches Peeling</a>.</p>
<p><strong><a href="/haut/niacinamid/">Niacinamid</a></strong> täglich, reduziert Talg und beruhigt gleichzeitig.</p>
<p><strong>Azelainsäure</strong>, wirkt gegen Entzündung und gegen die Flecken danach.</p>
<p><strong><a href="/haut/retinol/">Retinoide</a></strong>, wenn die Haut sie trägt. Der wirksamste Baustein, braucht Geduld.</p>
<p><strong>Feuchtigkeit, nicht Austrocknung.</strong> Eine leichte, nicht-komedogene Pflege ist Teil der Behandlung, nicht das Gegenteil davon.</p>
<p><strong><a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a></strong> täglich, damit aus abgeheilten Stellen keine dauerhaften Flecken werden.</p>

<h2>Was schadet</h2>
<p>Austrocknende Waschgels aus der Teenagerzeit. Alkoholhaltige Gesichtswasser. Ausdrücken. Mechanische Peelings auf entzündeter Haut. Und der Produktwechsel alle zwei Wochen, weil noch nichts sichtbar ist.</p>
<p>Rechne mit <strong>acht bis zwölf Wochen</strong>, bis eine Routine zeigt, was sie kann.</p>

<h2>Wann zum Arzt</h2>
<p>Bei tiefen, schmerzhaften Knoten. Wenn Narben entstehen, dann eher früher als später. Wenn nach drei Monaten konsequenter Routine nichts besser wird. Und wenn zusätzlich starke Zyklusunregelmässigkeiten, vermehrte Körperbehaarung oder Haarausfall bestehen, dann Richtung hormonelle Abklärung.</p>
<p>Mehr zur ausgeprägten Form findest du unter <a href="/beschwerden/akne/">Akne</a>.</p>

<h2>Was wir beitragen</h2>
<p>Wo Zyklus und Stress erkennbar mitspielen, arbeiten wir mit <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a> und, wenn sinnvoll, mit <a href="/therapien/kraeutertherapie/">Kräutertherapie</a> am Gesamtbild statt nur an der Hautoberfläche. Bei akut entzündeter Haut behandeln wir im Gesicht bewusst nicht, und eine dermatologische Behandlung ersetzen wir nicht.</p>
`.trim(),
    faqs: [
      { q: 'Warum bekomme ich mit 35 noch Pickel?', a: 'Erwachsenenakne ist häufig und hat andere Auslöser als Teenager-Akne: hormonelle Schwankungen, Stress, Überpflegung. Sie sitzt typischerweise an Kinn und Kieferlinie und kommt in Schüben.' },
      { q: 'Warum sitzen die Pickel immer am Kinn?', a: 'Kinn und Kieferlinie sind das typische Verteilungsmuster bei hormoneller Mitbeteiligung. Häufig verstärkt in der zweiten Zyklushälfte.' },
      { q: 'Hilft häufigeres Waschen gegen unreine Haut?', a: 'Nein, im Gegenteil. Wer dreimal täglich wäscht, schädigt die Barriere, und die Haut produziert mehr Talg. Zweimal täglich mild reinigen reicht.' },
      { q: 'Brauche ich Feuchtigkeitspflege bei unreiner Haut?', a: 'Ja. Erwachsenenakne trifft oft Haut, die gleichzeitig trocken und empfindlich ist. Eine leichte, nicht-komedogene Pflege ist Teil der Behandlung.' },
      { q: 'Wie lange dauert es, bis eine Routine wirkt?', a: 'Acht bis zwölf Wochen. Der häufigste Fehler ist der Produktwechsel nach zwei Wochen, weil noch nichts sichtbar ist.' },
      { q: 'Wann sollte ich ärztlich abklären lassen?', a: 'Bei tiefen schmerzhaften Knoten, wenn Narben entstehen, wenn nach drei Monaten nichts besser wird, oder wenn Zyklusunregelmässigkeiten, vermehrte Behaarung oder Haarausfall dazukommen.' },
    ],
    related: [
      { href: '/haut/mitesser/', label: 'Mitesser', cat: 'Hautthema' },
      { href: '/haut/peeling/', label: 'Chemisches Peeling', cat: 'Methode' },
      { href: '/beschwerden/akne/', label: 'Akne', cat: 'Beschwerde' },
    ],
  },

  {
    slug: 'doppelkinn',
    title: 'Doppelkinn: Ursachen und was tatsächlich hilft',
    metaDesc: 'Doppelkinn loswerden: welche vier Ursachen es gibt, warum Übungen bei den meisten nichts bringen und welche Methoden bei welcher Ursache wirken.',
    excerpt: 'Fett, Haltung, Wassereinlagerung oder Anatomie. Vier Ursachen, von denen nur eine auf Übungen reagiert.',
    category: 'Hautthemen',
    h1: 'Doppelkinn',
    lead: 'Ein Doppelkinn kann vier sehr verschiedene Ursachen haben, und die meisten Ratschläge im Netz adressieren nur eine davon. Erst die Ursache klären, dann entscheiden.',
    readingTime: '7 Min.',
    ctaTitle: 'Eher Schwellung als Fett?',
    ctaText: 'Wenn die Kontur morgens deutlich weicher ist als abends, geht es um Abfluss. Daran lässt sich direkt arbeiten.',
    ctaHref: '/therapien/gua-sha/gesichts-gua-sha/',
    ctaLabel: 'Gua Sha fürs Gesicht',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Als Doppelkinn wird die Weichteilfülle unter dem Kinn bezeichnet. Der sichtbare Effekt ist derselbe, die Ursache dahinter aber nicht.</p>

<h2>Die vier Ursachen</h2>
<p><strong>Fettgewebe.</strong> Die häufigste Ursache, oft gewichtsabhängig, aber nicht immer. Manche Menschen lagern dort genetisch bedingt Fett ein, auch bei normalem Gewicht.</p>
<p><strong>Hautelastizität.</strong> Mit den Jahren lässt das Bindegewebe nach, die Haut folgt der Kontur nicht mehr. Häufig auch nach deutlicher Gewichtsabnahme.</p>
<p><strong>Wassereinlagerung.</strong> Die Lymphbahnen des Gesichts münden im Hals-Kiefer-Bereich. Ist der Abfluss träge, staut sich Flüssigkeit genau dort. Typisch: morgens deutlich, abends weniger.</p>
<p><strong>Anatomie und Haltung.</strong> Ein zurückliegender Unterkiefer oder ein kurzer Kiefer-Hals-Winkel lässt ein Doppelkinn entstehen, unabhängig vom Gewicht. Dazu kommt die Kopfhaltung: Wer den Kopf dauerhaft nach vorne schiebt, verkürzt den Winkel zusätzlich.</p>
<div class="wa-callout"><div class="wa-callout-label">Einfacher Test</div><p>Morgens deutlich, abends besser: Wassereinlagerung. Unverändert über den Tag: Fett oder Anatomie. Deutlich sichtbar erst beim Nach-vorne-Schieben des Kopfes: Haltung.</p></div>

<h2>Was bei welcher Ursache hilft</h2>
<p><strong>Bei Wassereinlagerung.</strong> Der Bereich, in dem am meisten geht und der am seltensten adressiert wird. Lymphabfluss unterstützen, Salzkonsum prüfen, Schlafposition, ausreichend trinken. <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha</a> arbeitet genau entlang dieser Bahnen und lässt sich zu Hause weiterführen.</p>
<p><strong>Bei Haltung.</strong> Bildschirmhöhe, Nackenmuskulatur, Kopfposition. Das gehört eher in den Bereich <a href="/beschwerden/nackenschmerzen/">Nackenbeschwerden</a> als in die Kosmetik, wirkt aber sichtbar.</p>
<p><strong>Bei Fettgewebe.</strong> Gezielte Fettreduktion an einer Stelle funktioniert nicht. Was wirkt, ist eine Gewichtsveränderung insgesamt, oder apparative Verfahren wie Kryolipolyse, oder chirurgische Verfahren.</p>
<p><strong>Bei nachlassender Elastizität.</strong> <a href="/haut/ultherapy-hifu/">HIFU</a> kann bei leichter Erschlaffung moderat straffen. Bei deutlicher Absenkung stösst jedes nicht-chirurgische Verfahren an eine Grenze.</p>

<h2>Was Gesichtsübungen bringen</h2>
<p>Wenig, und zwar aus einem einfachen Grund: Die Fülle unter dem Kinn ist meist Fett oder Flüssigkeit, kein untrainierter Muskel. Ein kräftigerer Platysma-Muskel verändert an einem Fettpolster nichts.</p>
<p>Wo Übungen etwas bringen: bei haltungsbedingtem Anteil, weil sie die Kopfposition korrigieren. Das ist aber Haltungsarbeit, nicht Muskelaufbau im Kinn.</p>

<h2>Was nicht hilft</h2>
<p>Straffende Cremes für den Kinnbereich. Kinnbänder und Kompressionsmasken über Nacht. Kaugummi in grossen Mengen, was eher den Kaumuskel verstärkt und die Kieferpartie breiter wirken lässt.</p>

<h2>Realistisch bleiben</h2>
<p>Beim Wasseranteil sind schnelle, sichtbare Veränderungen möglich, allerdings nur solange man dranbleibt. Beim Fettanteil braucht es Zeit oder ein Verfahren. Bei der Anatomie ändert sich ohne Chirurgie nichts, und das ist keine Frage der Disziplin.</p>
<p>Wer diese Anteile auseinanderhält, spart sich Enttäuschungen und Geld für Produkte, die am falschen Anteil ansetzen.</p>
`.trim(),
    faqs: [
      { q: 'Helfen Gesichtsübungen gegen ein Doppelkinn?', a: 'Kaum. Die Fülle unter dem Kinn ist meist Fett oder Flüssigkeit, kein untrainierter Muskel. Wo Übungen wirken, ist beim haltungsbedingten Anteil, weil sie die Kopfposition korrigieren.' },
      { q: 'Warum ist mein Doppelkinn morgens schlimmer?', a: 'Das spricht für Wassereinlagerung. Die Lymphbahnen des Gesichts münden im Hals-Kiefer-Bereich, und im Liegen arbeitet der Abfluss langsamer.' },
      { q: 'Kann man gezielt am Kinn abnehmen?', a: 'Nein. Gezielte Fettreduktion an einer einzelnen Körperstelle funktioniert nicht. Was wirkt, ist eine Gewichtsveränderung insgesamt oder ein apparatives beziehungsweise chirurgisches Verfahren.' },
      { q: 'Hilft Gua Sha gegen ein Doppelkinn?', a: 'Beim Anteil, der auf Wassereinlagerung beruht, ja. Die Arbeit entlang der Lymphbahnen unterstützt den Abfluss. Fettgewebe und Anatomie verändert es nicht.' },
      { q: 'Bringen straffende Cremes etwas?', a: 'Für den Kinnbereich nicht. Weder Fettgewebe noch abgesunkene Struktur reagieren auf äusserliche Pflege.' },
      { q: 'Kann ein Doppelkinn auch bei Normalgewicht auftreten?', a: 'Ja. Genetisch bedingte Fetteinlagerung, ein zurückliegender Unterkiefer oder ein kurzer Kiefer-Hals-Winkel führen unabhängig vom Gewicht dazu.' },
    ],
    related: [
      { href: '/therapien/gua-sha/gesichts-gua-sha/', label: 'Gua Sha fürs Gesicht', cat: 'Behandlung' },
      { href: '/haut/ultherapy-hifu/', label: 'Ultherapy und HIFU', cat: 'Methode' },
      { href: '/haut/gesichtsyoga/', label: 'Gesichtsyoga', cat: 'K-Beauty' },
    ],
  },

  {
    slug: 'gesichtsyoga',
    title: 'Gesichtsyoga: was die Studienlage hergibt',
    metaDesc: 'Gesichtsyoga und Facial Yoga: was die Übungen bewirken können, was die Studien zeigen, wo die Grenzen liegen und wann sie sogar kontraproduktiv sind.',
    excerpt: 'Es gibt Studien, sie sind klein, und das Ergebnis ist bescheidener als der Hype. Was daran trotzdem sinnvoll ist.',
    category: 'K-Beauty',
    h1: 'Gesichtsyoga',
    lead: 'Gesichtsyoga verspricht Straffung durch Muskeltraining. Es gibt tatsächlich Studien dazu, die Ergebnisse sind real, aber deutlich kleiner als die Versprechen. Und bei manchen Falten ist mehr Muskelaktivität genau das Gegenteil von hilfreich.',
    readingTime: '6 Min.',
    ctaTitle: 'Lieber etwas, das nachweislich entspannt?',
    ctaText: 'In 30 Minuten zeigen wir dir eine Technik am eigenen Gesicht, die an Spannung und Abfluss ansetzt statt an Muskelaufbau.',
    ctaHref: '/therapien/gua-sha/gesichts-gua-sha/',
    ctaLabel: 'Gua Sha fürs Gesicht',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Gesichtsyoga bezeichnet gezielte Übungen für die mimische Muskulatur, meist kombiniert mit Massagegriffen. Die Idee: Wie am Körper soll Training das Gewebe straffen.</p>

<h2>Was die Studien zeigen</h2>
<p>Es gibt Untersuchungen dazu, die bekannteste über 20 Wochen mit täglichem beziehungsweise jeden zweiten Tag durchgeführtem Training. Beurteilende Fachpersonen schätzten die Teilnehmerinnen danach im Schnitt um wenige Jahre jünger ein, gemessen wurde eine leichte Zunahme der Wangenfülle.</p>
<p>Einordnung ist hier wichtig: kleine Teilnehmerzahl, keine Kontrollgruppe im engeren Sinn, subjektive Bewertung. Das ist ein Hinweis, kein Beleg.</p>
<p>Und der Aufwand ist erheblich: 30 Minuten täglich über Wochen, mit Ergebnissen, die im Alltag kaum jemand bemerkt.</p>

<h2>Der Denkfehler mit dem Muskeltraining</h2>
<p>Gesichtsmuskeln sind anders als Skelettmuskeln: Sie setzen überwiegend direkt an der Haut an, nicht an Knochen. Sie sind auch schon jetzt sehr aktiv, mehrere tausend Bewegungen am Tag.</p>
<p>Das führt zu einem Problem: <strong>Mehr Muskelaktivität kann Mimikfalten vertiefen.</strong> Genau darum geht es bei muskelentspannenden Behandlungen, die in die Gegenrichtung arbeiten. Wer intensiv die Stirn trainiert, arbeitet der eigenen <a href="/haut/falten-gesicht/">Zornesfalte</a> zu.</p>
<div class="wa-pullquote">Am Körper ist mehr Muskelaktivität fast immer gut. Im Gesicht ist sie der Grund, warum Mimikfalten entstehen.</div>

<h2>Was trotzdem sinnvoll ist</h2>
<p>Der Teil, der wahrscheinlich am meisten bewirkt, ist nicht das Training, sondern die begleitende Massage und die Aufmerksamkeit.</p>
<p><strong>Durchblutung und Abfluss.</strong> Streichbewegungen entlang der Lymphbahnen wirken auf Schwellungsgefühl. Dafür braucht es aber keine Übungsroutine, sondern die richtige Richtung und wenig Druck.</p>
<p><strong>Wahrnehmung für Spannung.</strong> Wer sich täglich mit dem Gesicht beschäftigt, merkt, wann Kiefer und Stirn dauerhaft angespannt sind. Diese Erkenntnis ist oft mehr wert als die Übung selbst.</p>
<p><strong>Kiefer und Nacken.</strong> Lösende Arbeit am Kaumuskel ist bei Zähneknirschen sinnvoll, siehe <a href="/beschwerden/kieferschmerzen/">Kieferschmerzen</a>.</p>

<h2>Was es nicht leistet</h2>
<p>Abgesunkenes Gewebe anheben, Volumenverlust ausgleichen, Hautelastizität zurückbringen. Und es ersetzt keinen <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a>, der für das Hautbild über Jahre um ein Vielfaches mehr bewirkt als jede Übungsroutine.</p>

<h2>Die Alternative, die am selben Punkt ansetzt</h2>
<p>Wenn dich an Gesichtsyoga der Gedanke anspricht, täglich etwas fürs Gesicht zu tun, dann bekommst du den nützlichen Teil davon zielgerichteter.</p>
<p><a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> arbeitet an Lymphfluss und Kieferspannung, also genau an dem, was bei Gesichtsyoga vermutlich wirkt, ohne die Mimikmuskulatur zusätzlich zu aktivieren. Fünf bis zehn Minuten, zwei- bis dreimal pro Woche.</p>
`.trim(),
    faqs: [
      { q: 'Bringt Gesichtsyoga wirklich etwas?', a: 'Es gibt Studien mit messbaren, aber kleinen Effekten nach 20 Wochen täglichem Training. Die Untersuchungen sind klein und die Bewertung subjektiv. Der Aufwand ist hoch, das Ergebnis bescheiden.' },
      { q: 'Kann Gesichtsyoga Falten verstärken?', a: 'Bei Mimikfalten ist das möglich. Gesichtsmuskeln setzen direkt an der Haut an, und wiederholte Bewegung ist genau der Mechanismus, durch den Mimikfalten entstehen.' },
      { q: 'Wie oft muss man Gesichtsyoga machen?', a: 'In den Untersuchungen waren es etwa 30 Minuten täglich über Wochen. Das ist der Hauptgrund, warum die meisten es nicht durchhalten.' },
      { q: 'Ist Gua Sha besser als Gesichtsyoga?', a: 'Für Lymphabfluss und Kieferspannung ist es zielgerichteter und aktiviert die Mimikmuskulatur nicht zusätzlich. Für Muskelaufbau ist es nicht gedacht, aber der ist im Gesicht ohnehin fraglich.' },
      { q: 'Kann Gesichtsyoga ein Facelift ersetzen?', a: 'Nein. Abgesunkenes Gewebe und Volumenverlust adressiert es nicht. Es arbeitet an Muskulatur, nicht an Struktur.' },
      { q: 'Was ist der nützlichste Teil von Gesichtsyoga?', a: 'Vermutlich die begleitende Massage und die Aufmerksamkeit für Dauerspannung in Kiefer und Stirn, nicht das Muskeltraining selbst.' },
    ],
    related: [
      { href: '/therapien/gua-sha/gesichts-gua-sha/', label: 'Gua Sha fürs Gesicht', cat: 'Behandlung' },
      { href: '/haut/falten-gesicht/', label: 'Falten im Gesicht', cat: 'Hautthema' },
      { href: '/haut/doppelkinn/', label: 'Doppelkinn', cat: 'Hautthema' },
    ],
  },

  {
    slug: 'korean-skincare',
    title: 'Korean Skincare: Routine, Produkte, Kauf in der Schweiz',
    metaDesc: 'Korean Skincare in der Schweiz: welche Routine sinnvoll ist, welche Produkte sich lohnen, worauf du beim Import achten musst und was du getrost weglässt.',
    excerpt: 'Wie eine koreanische Routine praktisch aussieht, ohne zehn Produkte, und worauf du beim Kauf in der Schweiz achten solltest.',
    category: 'K-Beauty',
    h1: 'Korean Skincare',
    lead: 'Eine koreanische Routine lässt sich auf fünf Schritte eindampfen, ohne dass etwas Wesentliches verloren geht. Hier steht, welche das sind, und was beim Kauf in der Schweiz zu beachten ist.',
    readingTime: '8 Min.',
    ctaTitle: 'Routine steht, Ergebnis fehlt?',
    ctaText: 'Dann liegt es oft nicht am nächsten Produkt. Wir schauen uns an, was tatsächlich dahintersteckt.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Koreanische Hautpflege hat ihren Ruf nicht wegen einzelner Wunderprodukte, sondern wegen einer Herangehensweise: Barriere zuerst, Feuchtigkeit in Schichten, Sonnenschutz als Selbstverständlichkeit, Konsequenz über Monate. Warum das funktioniert, steht ausführlich unter <a href="/haut/k-beauty/">K-Beauty</a>.</p>
<p>Hier geht es um die Praxis.</p>

<h2>Die Routine auf fünf Schritte gekürzt</h2>
<p><strong>Abends</strong></p>
<ol>
<li><strong>Ölbasierte Reinigung.</strong> Löst Sonnenschutz, Make-up und Talg. Der Schritt, der in europäischen Routinen meist fehlt und am meisten ausmacht.</li>
<li><strong>Wasserbasierte Reinigung.</strong> Mildes Gel oder Schaum, entfernt den Rest.</li>
<li><strong>Feuchtigkeitsschritt.</strong> Toner oder Essence, auf leicht feuchte Haut. Siehe <a href="/haut/ampoule/">Ampoule, Essence, Serum</a>.</li>
<li><strong>Ein Wirkstoff.</strong> <a href="/haut/retinol/">Retinol</a>, <a href="/haut/niacinamid/">Niacinamid</a> oder Säure, je nach Thema und Tag. Nicht alles gleichzeitig.</li>
<li><strong>Feuchtigkeitscreme.</strong></li>
</ol>
<p><strong>Morgens</strong></p>
<ol>
<li>Wasser oder sehr milde Reinigung</li>
<li>Feuchtigkeitsschritt</li>
<li><a href="/haut/vitamin-c-serum/">Vitamin C</a>, wenn du es benutzt</li>
<li>Feuchtigkeitscreme</li>
<li><strong><a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a>.</strong> Nicht verhandelbar.</li>
</ol>
<div class="wa-callout"><div class="wa-callout-label">Der eigentliche Trick</div><p>Nicht die Anzahl der Produkte, sondern das Schichten auf <em>leicht feuchte</em> Haut. Zwei dünne Schichten auf feuchte Haut binden mehr Feuchtigkeit als eine dicke auf trockene. Das kostet nichts und ist der grösste Unterschied zur üblichen europäischen Routine.</p></div>

<h2>Welche Produkte sich lohnen</h2>
<p><strong>Sonnenschutz.</strong> Der stärkste Grund, koreanisch zu kaufen. Modernere Filter, leichtere Textur, kein Weissschleier, bei gleichem oder höherem Schutz.</p>
<p><strong>Reinigungsöl.</strong> Gut gemacht, günstig, und die Kategorie ist dort ausgereifter.</p>
<p><strong>Beruhigende Produkte mit <a href="/haut/centella/">Centella</a>.</strong> Breite Auswahl in allen Preisklassen.</p>
<p><strong>Sheet Masks.</strong> Nette Feuchtigkeitskur, kein Wirkstoffwunder. Als gelegentliche Anwendung völlig in Ordnung.</p>
<p>Was du dir sparen kannst: fermentierte Essenzen zu Luxuspreisen, Produkte mit zwölf exotischen Extrakten, und jedes Produkt, dessen Wirkstoff erst hinter den Konservierungsstoffen auftaucht.</p>

<h2>Kauf in der Schweiz</h2>
<p>Es gibt inzwischen mehrere Schweizer Onlineshops für koreanische Kosmetik, dazu europäische Händler mit Schweizer Versand. Direktimport aus Korea ist möglich, bringt aber Zollabwicklung und längere Wege mit sich.</p>
<p>Worauf du achten solltest:</p>
<ul>
<li><strong>Verfallsdatum und Herstellungsdatum.</strong> Bei Direktimporten teils knapp.</li>
<li><strong>Lagerung und Transport.</strong> Vitamin-C-Produkte und Sonnenschutz vertragen lange Transporte bei Hitze schlecht.</li>
<li><strong>Deklaration.</strong> Bei Importware gilt europäisches Kosmetikrecht nicht. Die INCI-Liste sollte trotzdem vollständig lesbar sein.</li>
<li><strong>Keine Aufhellungsprodukte aus unklarer Quelle.</strong> Präparate mit Hydrochinon oder unklaren Zusätzen sind ein reales Risiko, siehe <a href="/haut/pigmentflecken/">Pigmentflecken</a>.</li>
</ul>

<h2>Was eine Routine nicht leisten kann</h2>
<p>Sie kann die Haut in gutem Zustand halten und über Monate sichtbar verbessern. Sie kann keine Pigmentstörung auflösen, keine <a href="/beschwerden/akne/">Akne</a> behandeln, keine Falte glätten und keine Struktur verändern.</p>
<p>Wenn du seit Monaten konsequent pflegst und nichts passiert, ist das kein Grund für das nächste Produkt, sondern für eine Einordnung.</p>
`.trim(),
    faqs: [
      { q: 'Wie sieht eine koreanische Routine minimal aus?', a: 'Abends: ölbasierte Reinigung, wasserbasierte Reinigung, Feuchtigkeitsschritt, ein Wirkstoff, Creme. Morgens: milde Reinigung, Feuchtigkeit, gegebenenfalls Vitamin C, Creme, Sonnenschutz.' },
      { q: 'Was ist Double Cleansing und brauche ich das?', a: 'Erst ölbasiert, dann wasserbasiert reinigen. Sinnvoll abends, wenn du Sonnenschutz oder Make-up trägst, weil beides sich mit Wasser allein schlecht löst. Morgens nicht nötig.' },
      { q: 'Welche koreanischen Produkte lohnen sich wirklich?', a: 'Sonnenschutz an erster Stelle, wegen modernerer Filter und leichterer Textur. Dazu Reinigungsöle und beruhigende Produkte mit Centella. Fermentierte Luxusessenzen bringen selten mehr.' },
      { q: 'Wo kaufe ich koreanische Kosmetik in der Schweiz?', a: 'Über Schweizer Onlineshops oder europäische Händler mit Schweizer Versand. Bei Direktimport auf Verfallsdatum, Transportbedingungen und vollständige INCI-Liste achten.' },
      { q: 'Sind koreanische Produkte in der Schweiz reguliert?', a: 'Importware unterliegt nicht automatisch europäischem Kosmetikrecht. Die Deklaration kann abweichen. Bei aufhellenden Produkten aus unklarer Quelle ist besondere Vorsicht angebracht.' },
      { q: 'Wie lange dauert es, bis eine Routine wirkt?', a: 'Bei Feuchtigkeit und Barriere zwei bis vier Wochen, bei Textur und Pigment drei bis sechs Monate. Der häufigste Fehler ist der Produktwechsel, bevor etwas wirken konnte.' },
    ],
    related: [
      { href: '/haut/k-beauty/', label: 'K-Beauty', cat: 'K-Beauty' },
      { href: '/haut/ampoule/', label: 'Ampoule, Essence, Serum', cat: 'K-Beauty' },
      { href: '/haut/sonnencreme-gesicht/', label: 'Sonnencreme fürs Gesicht', cat: 'Wirkstoff' },
    ],
  },
  // ──────────────────────────────────────────────── Welle 6 · Wirkstoffe & Hautthemen
  {
    slug: 'salicylsaeure',
    title: 'Salicylsäure (BHA): Wirkung, Anwendung, Fehler',
    metaDesc: 'Salicylsäure in der Hautpflege: wie BHA in der Pore wirkt, welche Konzentration sinnvoll ist, wie oft du sie anwendest und wann sie mehr schadet als nützt.',
    excerpt: 'Der einzige gängige Säurewirkstoff, der in die Pore hineinkommt. Was das bringt, und warum die meisten ihn zu oft verwenden.',
    category: 'Wirkstoffe',
    h1: 'Salicylsäure',
    lead: 'Salicylsäure ist fettlöslich. Das klingt nach einem Detail, ist aber der ganze Grund, warum sie bei verstopften Poren funktioniert, wo andere Säuren an der Oberfläche bleiben.',
    readingTime: '7 Min.',
    ctaTitle: 'Unreinheiten, die immer wiederkommen?',
    ctaText: 'Wenn äusserliche Pflege den Ausschlag nicht mehr macht, lohnt sich der Blick auf das, was von innen mitspielt.',
    ctaHref: '/therapien/kraeutertherapie/',
    ctaLabel: 'Kräutertherapie ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Salicylsäure gehört zu den Beta-Hydroxysäuren, kurz BHA. In der Hautpflege steht sie meist als <em>Salicylic Acid</em> auf der Liste, in Konzentrationen zwischen 0,5 und 2 Prozent.</p>

<h2>Warum fettlöslich der entscheidende Punkt ist</h2>
<p>Fruchtsäuren wie Glykolsäure sind wasserlöslich. Sie arbeiten auf der Hautoberfläche und lösen dort die Verbindungen zwischen abgestorbenen Hornzellen.</p>
<p>Salicylsäure ist fettlöslich. Sie mischt sich mit dem Talg in der Pore und kommt so dorthin, wo die Verstopfung tatsächlich sitzt. Deshalb ist sie bei <a href="/haut/mitesser/">Mitessern</a> und <a href="/haut/unreine-haut/">unreiner Haut</a> das naheliegende Mittel und bei trockener Haut ohne Verstopfung meist die falsche Wahl.</p>
<p>Dazu kommt eine entzündungshemmende Komponente. Salicylsäure ist chemisch mit Acetylsalicylsäure verwandt, und ein Teil der beruhigenden Wirkung bei entzündeten Stellen kommt daher.</p>

<h2>Welche Konzentration</h2>
<p><strong>0,5 bis 1 Prozent</strong> — für den täglichen oder fast täglichen Gebrauch, in Reinigungen oder leichten Tonern. Der beste Einstieg.</p>
<p><strong>2 Prozent</strong> — die Obergrenze im frei verkäuflichen Bereich, meist als Leave-on-Produkt. Zwei- bis dreimal pro Woche reicht.</p>
<p><strong>Höher konzentriert</strong> gehört in die Hand von Fachpersonen, siehe <a href="/haut/peeling/">Peeling</a>.</p>
<div class="wa-pullquote">Mehr Prozent bringt nicht mehr Ergebnis. Es bringt schneller eine gestörte Hautbarriere.</div>

<h2>Der häufigste Fehler: zu oft</h2>
<p>Salicylsäure wirkt spürbar, und das verführt. Die Haut fühlt sich nach der Anwendung glatter an, also wird täglich angewendet, dann zweimal täglich, dazu ein Reinigungsgel mit BHA und ein Toner.</p>
<p>Das Ergebnis ist eine Haut, die spannt, glänzt und trotzdem mehr Unreinheiten zeigt als vorher. Eine gestörte Barriere reagiert mit mehr Talgproduktion, nicht mit weniger.</p>
<p>Wenn du das an dir erkennst: zwei Wochen alle Säuren weglassen, nur reinigen, Feuchtigkeit, Sonnenschutz. Danach mit zweimal pro Woche neu anfangen.</p>

<h2>Womit du sie nicht kombinierst</h2>
<p><strong>Nicht in derselben Anwendung mit <a href="/haut/retinol/">Retinol</a>.</strong> Beides beschleunigt die Zellerneuerung. Zusammen ist es zu viel. Wenn du beides nutzen willst: an unterschiedlichen Abenden.</p>
<p><strong>Nicht mit Fruchtsäuren stapeln.</strong> AHA und BHA am selben Abend ist selten sinnvoll.</p>
<p><strong>Kombinierbar</strong> ist sie gut mit <a href="/haut/niacinamid/">Niacinamid</a> und mit beruhigenden Wirkstoffen wie <a href="/haut/centella/">Centella</a>.</p>

<h2>Sonnenschutz ist nicht optional</h2>
<p>Säuren machen die Haut lichtempfindlicher. Ohne <a href="/haut/sonnencreme-gesicht/">täglichen Sonnenschutz</a> riskierst du bei Unreinheiten genau das, was du am wenigsten willst: dunkle Flecken an der Stelle, wo der Pickel war.</p>

<h2>Wann Salicylsäure nicht das Richtige ist</h2>
<p>Bei <a href="/haut/couperose/">Couperose</a> und geröteter, empfindlicher Haut ohne Verstopfung reizt sie meist mehr, als sie nützt. Bei entzündlicher Akne mit tiefen, schmerzhaften Knoten ist sie zu schwach — das gehört dermatologisch abgeklärt.</p>
<p>Und wenn Unreinheiten in Schüben kommen, die sich an Zyklus, Schlaf oder Belastungsphasen koppeln, dann arbeitest du mit Pflege an einem Symptom, dessen Auslöser woanders liegt. Genau da setzen wir mit der Kräutertherapie an.</p>
`.trim(),
    faqs: [
      { q: 'Wie oft sollte man Salicylsäure anwenden?', a: 'Bei 2 Prozent zwei- bis dreimal pro Woche. Produkte mit 0,5 bis 1 Prozent vertragen die meisten täglich. Mehr bringt kein besseres Ergebnis, sondern eine gestörte Barriere.' },
      { q: 'Salicylsäure oder Fruchtsäure?', a: 'Salicylsäure bei verstopften Poren, Mitessern und öliger Haut, weil sie fettlöslich ist und in die Pore kommt. Fruchtsäure bei Rauheit, fahlem Teint und oberflächlicher Textur.' },
      { q: 'Kann man Salicylsäure und Retinol zusammen verwenden?', a: 'Nicht in derselben Anwendung. Beides beschleunigt die Zellerneuerung, zusammen wird es schnell zu viel. Verwende sie an unterschiedlichen Abenden.' },
      { q: 'Hilft Salicylsäure gegen Pickelmale?', a: 'Indirekt, indem sie neue Entzündungen reduziert. Bestehende dunkle Male verblassen eher mit Niacinamid, Vitamin C und konsequentem Sonnenschutz.' },
      { q: 'Ist Salicylsäure in der Schwangerschaft erlaubt?', a: 'Äusserlich in niedriger Konzentration wird sie meist als unbedenklich eingestuft, grossflächige und hoch dosierte Anwendung nicht. Kläre das mit deiner Ärztin ab.' },
      { q: 'Warum wird meine Haut mit Salicylsäure schlechter?', a: 'Meist Überanwendung. Eine gereizte Barriere produziert mehr Talg, nicht weniger. Zwei Wochen Säurepause, dann mit zweimal pro Woche neu beginnen.' },
    ],
    related: [
      { href: '/haut/mitesser/', label: 'Mitesser', cat: 'Hautthema' },
      { href: '/haut/unreine-haut/', label: 'Unreine Haut', cat: 'Hautthema' },
      { href: '/haut/peeling/', label: 'Peeling', cat: 'Methode' },
    ],
  },

  {
    slug: 'azelainsaeure',
    title: 'Azelainsäure: der unterschätzte Wirkstoff',
    metaDesc: 'Azelainsäure bei Rötungen, Unreinheiten und Pigmentflecken: wie sie wirkt, welche Konzentration du brauchst, wie lange es dauert und was Apotheke von Kosmetik unterscheidet.',
    excerpt: 'Wirkt gegen Rötung, Unreinheiten und Pigment gleichzeitig — und ist trotzdem einer der verträglichsten Wirkstoffe überhaupt.',
    category: 'Wirkstoffe',
    h1: 'Azelainsäure',
    lead: 'Azelainsäure macht drei Dinge auf einmal, die sonst drei verschiedene Produkte brauchen. Sie ist gut verträglich, auch in der Schwangerschaft meist unproblematisch, und trotzdem kennt sie kaum jemand.',
    readingTime: '7 Min.',
    ctaTitle: 'Rötung, die bleibt?',
    ctaText: 'Wenn die Haut dauerhaft gerötet reagiert, schauen wir uns an, was den Schub auslöst — statt nur die Oberfläche zu behandeln.',
    ctaHref: '/therapien/kraeutertherapie/',
    ctaLabel: 'Kräutertherapie ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Azelainsäure kommt natürlich in Getreide vor und wird für die Hautpflege synthetisch hergestellt. Auf der Liste steht sie als <em>Azelaic Acid</em>.</p>

<h2>Drei Wirkungen in einem Wirkstoff</h2>
<p><strong>Entzündungshemmend.</strong> Sie beruhigt gerötete, reaktive Haut. Das ist der Grund, warum sie bei <a href="/haut/rosacea/">Rosacea</a> zu den etablierten Optionen gehört.</p>
<p><strong>Antibakteriell und porenklärend.</strong> Sie wirkt auf die Bakterien, die bei <a href="/haut/unreine-haut/">unreiner Haut</a> beteiligt sind, und normalisiert die Verhornung.</p>
<p><strong>Pigmenthemmend.</strong> Sie greift in die Melaninbildung ein, und zwar bevorzugt in überaktiven Zellen. Deshalb hellt sie <a href="/haut/pigmentflecken/">Flecken</a> auf, ohne die umgebende Haut mit aufzuhellen.</p>
<p>Diese Kombination ist selten. Wer gleichzeitig Rötung, Unreinheiten und Pickelmale hat — eine sehr häufige Konstellation — bekommt hier alles in einem Produkt.</p>

<h2>Welche Konzentration, und wo du sie bekommst</h2>
<p><strong>10 Prozent</strong> ist die übliche Konzentration in frei verkäuflicher Kosmetik. Gut verträglich, sichtbare Ergebnisse nach acht bis zwölf Wochen.</p>
<p><strong>15 und 20 Prozent</strong> sind in der Schweiz Arzneimittel und laufen über Rezept und Apotheke. Deutlich wirksamer bei ausgeprägter Rosacea, dafür in den ersten Wochen oft mit Brennen verbunden.</p>
<div class="wa-pullquote">Der häufigste Grund, warum Azelainsäure «nicht wirkt»: zu früh aufgegeben. Vor acht Wochen passiert sichtbar wenig.</div>

<h2>Wie du sie anwendest</h2>
<p>Einmal täglich abends auf die trockene Haut, dünn, danach Feuchtigkeitspflege. Wer sie gut verträgt, kann auf zweimal täglich gehen.</p>
<p>Ein leichtes Kribbeln in den ersten Minuten ist normal und lässt nach einigen Anwendungen nach. Anhaltendes Brennen ist es nicht — dann runter auf jeden zweiten Tag.</p>
<p>Die Textur ist bei manchen Produkten körnig oder klebrig. Das ist unangenehm, aber kein Qualitätsmangel.</p>

<h2>Kombinationen</h2>
<p>Azelainsäure ist unkompliziert. Sie verträgt sich mit <a href="/haut/niacinamid/">Niacinamid</a>, mit <a href="/haut/vitamin-c-serum/">Vitamin C</a> und mit <a href="/haut/retinol/">Retinol</a> — letzteres besser abwechselnd, wenn die Haut empfindlich ist.</p>
<p>Sie macht die Haut nicht lichtempfindlicher. <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a> brauchst du trotzdem, sonst arbeitet die Sonne dem Pigmenteffekt entgegen.</p>

<h2>Schwangerschaft und Stillzeit</h2>
<p>Azelainsäure gilt äusserlich als eine der wenigen Optionen, die in dieser Zeit meist vertretbar sind — anders als Retinoide, die tabu sind. Sprich es trotzdem mit deiner Ärztin ab, insbesondere bei den verschreibungspflichtigen Konzentrationen.</p>
<p>Das macht sie zur naheliegenden Wahl bei <a href="/haut/melasma/">Melasma</a>, das häufig in der Schwangerschaft auftritt.</p>

<h2>Wo die Grenze liegt</h2>
<p>Azelainsäure arbeitet an Entzündung und Pigment. Sie arbeitet nicht an sichtbaren Äderchen — die verschwinden nicht durch Creme, dafür braucht es <a href="/haut/couperose/">gefässbezogene Verfahren</a>. Und bei ausgeprägter Rosacea ist sie ein Baustein, nicht die ganze Behandlung.</p>
`.trim(),
    faqs: [
      { q: 'Wie lange dauert es, bis Azelainsäure wirkt?', a: 'Bei Rötung und Unreinheiten oft nach vier bis sechs Wochen erste Veränderungen, bei Pigmentflecken acht bis zwölf Wochen. Wer früher aufgibt, sieht nichts.' },
      { q: 'Azelainsäure 10 oder 20 Prozent?', a: '10 Prozent ist frei verkäuflich und für die meisten der richtige Einstieg. 15 und 20 Prozent sind in der Schweiz verschreibungspflichtig und kommen bei ausgeprägter Rosacea zum Einsatz.' },
      { q: 'Ist Azelainsäure in der Schwangerschaft erlaubt?', a: 'Sie gilt äusserlich meist als vertretbar, im Gegensatz zu Retinoiden. Kläre die Anwendung mit deiner Ärztin ab, besonders bei rezeptpflichtiger Konzentration.' },
      { q: 'Kann man Azelainsäure mit Retinol kombinieren?', a: 'Ja, bei robuster Haut auch in derselben Routine. Bei empfindlicher Haut besser abwechselnd an unterschiedlichen Abenden.' },
      { q: 'Brennt Azelainsäure?', a: 'Ein leichtes Kribbeln in den ersten Minuten ist normal und lässt nach einigen Anwendungen nach. Anhaltendes Brennen bedeutet, dass du die Frequenz reduzieren solltest.' },
      { q: 'Hilft Azelainsäure gegen Rosacea?', a: 'Sie gehört zu den etablierten äusserlichen Optionen bei entzündlichen Rosacea-Formen. Sichtbare Äderchen adressiert sie nicht.' },
    ],
    related: [
      { href: '/haut/rosacea/', label: 'Rosacea', cat: 'Hautthema' },
      { href: '/haut/pigmentflecken/', label: 'Pigmentflecken', cat: 'Hautthema' },
      { href: '/haut/niacinamid/', label: 'Niacinamid', cat: 'Wirkstoff' },
    ],
  },

  {
    slug: 'hyaluronsaeure',
    title: 'Hyaluronsäure: was sie kann und was nicht',
    metaDesc: 'Hyaluronsäure in Serum und Creme: wie sie wirkt, warum Molekülgrösse zählt, warum sie bei trockener Luft schaden kann und wo der Unterschied zur Unterspritzung liegt.',
    excerpt: 'Sie bindet Wasser. Mehr nicht — und genau darin liegt sowohl der Nutzen als auch das Missverständnis.',
    category: 'Wirkstoffe',
    h1: 'Hyaluronsäure',
    lead: 'Hyaluronsäure ist der meistverkaufte Feuchtigkeitswirkstoff überhaupt und gleichzeitig der am häufigsten falsch verstandene. Sie polstert nichts auf. Sie bindet Wasser — und braucht dafür Bedingungen, die im Schweizer Winter oft nicht gegeben sind.',
    readingTime: '6 Min.',
    ctaTitle: 'Haut, die trotz Pflege trocken bleibt?',
    ctaText: 'Manchmal liegt es nicht am Produkt, sondern an der Barriere. Wir schauen es uns in Ruhe an.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Hyaluronsäure ist ein körpereigener Stoff, der im Bindegewebe Wasser bindet. In der Pflege steht sie als <em>Sodium Hyaluronate</em> oder <em>Hyaluronic Acid</em> auf der Liste.</p>

<h2>Was sie tatsächlich tut</h2>
<p>Sie ist ein Feuchthaltemittel. Sie zieht Wasser an und hält es in der obersten Hautschicht. Das Ergebnis ist eine Haut, die praller aussieht, weil die Hornschicht aufgequollen ist.</p>
<p>Dieser Effekt ist real, sichtbar — und oberflächlich. Er hält, solange die Feuchtigkeit da ist. Sie baut kein Kollagen auf, sie füllt kein Volumen, sie verändert die Hautstruktur nicht.</p>
<div class="wa-pullquote">Hyaluronsäure im Serum und Hyaluronsäure als Unterspritzung sind derselbe Stoff mit völlig verschiedenen Aufgaben. Das eine bindet Wasser in der Hornschicht, das andere füllt Volumen in der Tiefe.</div>

<h2>Der Fehler, den fast alle machen</h2>
<p>Hyaluronsäure zieht Wasser dorthin, wo es am wenigsten davon gibt. Ist die Luft feucht, holt sie es aus der Umgebung. Ist die Luft trocken — geheizte Räume im Winter, Flugzeug, Föhnlage — holt sie es aus den tieferen Hautschichten und gibt es nach aussen ab.</p>
<p>Das Ergebnis: Die Haut fühlt sich nach dem Serum kurz gut an und danach trockener als vorher.</p>
<p><strong>Die Lösung ist simpel.</strong> Serum auf die noch leicht feuchte Haut auftragen, und immer eine Creme darüber. Die Creme verschliesst und verhindert, dass das gebundene Wasser verdunstet. Ohne diesen Schritt arbeitet Hyaluronsäure im Winter gegen dich.</p>

<h2>Molekülgrösse</h2>
<p>Grosse Moleküle bleiben auf der Oberfläche und bilden einen Film, der Wasserverlust bremst. Kleine Moleküle dringen etwas tiefer in die Hornschicht ein und wirken dort.</p>
<p>Gute Produkte mischen mehrere Grössen. Das ist der einzige Punkt, an dem sich ein Blick auf die Beschreibung lohnt — Angaben wie «multi-molecular» oder mehrere Hyaluron-Einträge in der Liste.</p>
<p>Was sich nicht lohnt: mehr bezahlen für höhere Prozentzahlen. Über etwa 2 Prozent wird die Textur klebrig, ohne dass mehr passiert.</p>

<h2>Wofür sie gut ist</h2>
<p>Als Basis unter der Pflege, täglich, morgens und abends. Sie ist verträglich, reizt praktisch nie, passt zu jedem Hauttyp und lässt sich mit allem kombinieren — <a href="/haut/vitamin-c-serum/">Vitamin C</a>, <a href="/haut/niacinamid/">Niacinamid</a>, <a href="/haut/retinol/">Retinol</a>, Säuren.</p>
<p>Besonders sinnvoll ist sie neben Wirkstoffen, die reizen können: Sie polstert die Hornschicht und macht die Anwendung angenehmer.</p>

<h2>Was sie nicht leistet</h2>
<p>Sie glättet keine <a href="/haut/falten-gesicht/">strukturellen Falten</a>. Feine Trockenheitsfältchen verschwinden, weil sie ein Feuchtigkeitsphänomen sind. Eine Nasolabialfalte bleibt, weil sie mit Volumen und Absinken zu tun hat, siehe <a href="/haut/nasolabialfalten/">Nasolabialfalten</a>.</p>
<p>Und sie ersetzt keine <a href="/haut/sonnencreme-gesicht/">Sonnencreme</a>. Der grösste Teil dessen, was als Hautalterung sichtbar wird, ist Lichtschaden.</p>
`.trim(),
    faqs: [
      { q: 'Kann Hyaluronsäure die Haut austrocknen?', a: 'Ja, bei trockener Umgebungsluft. Sie zieht dann Wasser aus tieferen Schichten nach aussen. Deshalb immer auf feuchte Haut auftragen und eine Creme darüber verwenden.' },
      { q: 'Wie viel Prozent Hyaluronsäure ist sinnvoll?', a: 'Etwa 1 bis 2 Prozent. Darüber wird die Textur klebrig, ohne dass die Wirkung zunimmt. Wichtiger als die Konzentration ist die Mischung verschiedener Molekülgrössen.' },
      { q: 'Was ist der Unterschied zwischen Hyaluronsäure im Serum und Unterspritzung?', a: 'Derselbe Stoff, verschiedene Ebenen. Das Serum bindet Wasser in der Hornschicht. Bei einer Unterspritzung wird vernetztes Hyaluron in die Tiefe eingebracht, um Volumen zu ersetzen. Das ist ein ärztlicher Eingriff und etwas völlig anderes.' },
      { q: 'Hilft Hyaluronsäure gegen Falten?', a: 'Gegen feine Trockenheitsfältchen sichtbar, weil diese ein Feuchtigkeitsphänomen sind. Gegen strukturelle Falten nicht.' },
      { q: 'Morgens oder abends?', a: 'Beides. Sie ist verträglich, reizt praktisch nie und lässt sich mit allen anderen Wirkstoffen kombinieren.' },
      { q: 'Reicht Hyaluronsäure allein als Pflege?', a: 'Nein. Ohne Creme darüber verdunstet das gebundene Wasser. Sie ist eine Basis, keine vollständige Pflege.' },
    ],
    related: [
      { href: '/haut/niacinamid/', label: 'Niacinamid', cat: 'Wirkstoff' },
      { href: '/haut/glass-skin/', label: 'Glass Skin', cat: 'K-Beauty' },
      { href: '/haut/falten-gesicht/', label: 'Falten im Gesicht', cat: 'Hautthema' },
    ],
  },

  {
    slug: 'rosacea',
    title: 'Rosacea: Formen, Auslöser, was hilft',
    metaDesc: 'Rosacea erkennen und einordnen: die vier Formen, typische Auslöser, was dermatologisch behandelt wird, was Pflege leisten kann und wo die Abgrenzung zur Couperose liegt.',
    excerpt: 'Erst die Form bestimmen, dann behandeln. Rötung, Äderchen und Pusteln brauchen unterschiedliche Wege.',
    category: 'Hautthemen',
    h1: 'Rosacea',
    lead: 'Rosacea ist eine chronisch-entzündliche Hauterkrankung und gehört dermatologisch abgeklärt. Was du hier findest, ist die Einordnung: welche Form du wahrscheinlich hast, was dagegen etabliert ist, und was ergänzend sinnvoll sein kann.',
    readingTime: '8 Min.',
    ctaTitle: 'Schübe, die sich an Stress und Schlaf koppeln?',
    ctaText: 'Wenn die Auslöser im Alltag liegen, ist die dermatologische Behandlung die eine Hälfte. Über die andere sprechen wir gern.',
    ctaHref: '/therapien/kraeutertherapie/',
    ctaLabel: 'Kräutertherapie ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Rosacea betrifft vor allem die Gesichtsmitte: Wangen, Nase, Stirn, Kinn. Sie verläuft in Schüben, beginnt meist zwischen dem 30. und 50. Lebensjahr und ist chronisch — behandelbar, aber nicht heilbar.</p>
<p><strong>Der wichtigste Satz zuerst:</strong> Rosacea gehört in dermatologische Abklärung. Sie wird häufig mit Akne, Kontaktekzem oder perioraler Dermatitis verwechselt, und die Behandlungen unterscheiden sich grundlegend.</p>

<h2>Die vier Formen</h2>
<p><strong>Erythematös-teleangiektatisch.</strong> Dauerhafte Rötung, sichtbare Äderchen, Brennen. Keine Pusteln. Das ist die Form, die der <a href="/haut/couperose/">Couperose</a> am nächsten kommt.</p>
<p><strong>Papulopustulös.</strong> Rötung mit entzündlichen Knötchen und Pusteln. Sieht aus wie Akne, ist aber keine — es fehlen die <a href="/haut/mitesser/">Mitesser</a>. Genau daran unterscheidet man die beiden.</p>
<p><strong>Phymatös.</strong> Verdickung des Gewebes, meist an der Nase. Betrifft überwiegend Männer und braucht eine eigene Behandlung.</p>
<p><strong>Okulär.</strong> Betrifft die Augen: Trockenheit, Fremdkörpergefühl, gerötete Lidränder. Wird oft übersehen und gehört augenärztlich mitbehandelt.</p>
<div class="wa-pullquote">Rosacea ohne Mitesser, Akne mit Mitessern. Dieses eine Merkmal trennt die beiden häufigsten Verwechslungen.</div>

<h2>Auslöser</h2>
<p>Die individuellen Trigger sind unterschiedlich, aber die Liste wiederholt sich: <strong>Sonne</strong> steht bei den meisten an erster Stelle. Dazu Hitze und Kälte, schnelle Temperaturwechsel, Alkohol — besonders Rotwein —, scharfes Essen, heisse Getränke, körperliche Anstrengung und Stress.</p>
<p>Ein Trigger-Tagebuch über vier bis sechs Wochen ist unspektakulär, aber es ist die zuverlässigste Methode, das eigene Muster zu erkennen.</p>

<h2>Was dermatologisch gemacht wird</h2>
<p>Äusserlich kommen unter anderem <a href="/haut/azelainsaeure/">Azelainsäure</a>, Metronidazol und Ivermectin zum Einsatz, bei ausgeprägten Formen zusätzlich Tabletten. Sichtbare Äderchen sprechen auf äusserliche Mittel nicht an — dafür werden gefässbezogene Laser- und Lichtverfahren eingesetzt.</p>
<p>Wir bieten diese Verfahren nicht an. Wir sagen dir trotzdem, dass sie bei diesem Befund das Mittel der Wahl sind.</p>

<h2>Pflege: weniger ist hier tatsächlich mehr</h2>
<p>Rosacea-Haut hat eine gestörte Barriere und reagiert auf fast alles. Die Regeln:</p>
<p><strong>Lauwarm waschen</strong>, milde Reinigung ohne Tenside, die schäumen wie Spülmittel. <strong>Keine Peelings</strong>, weder mechanisch noch chemisch. <strong>Kein Retinol</strong> in der Selbstanwendung. <strong>Keine Duftstoffe, kein Alkohol denat., kein Menthol.</strong></p>
<p>Was gut funktioniert: <a href="/haut/niacinamid/">Niacinamid</a> in niedriger Konzentration, <a href="/haut/centella/">Centella</a>, Panthenol, barrierestärkende Cremes mit Ceramiden.</p>
<p><strong>Sonnenschutz ist bei Rosacea keine Empfehlung, sondern Behandlung.</strong> Mineralische Filter werden meist besser vertragen, siehe <a href="/haut/sonnencreme-gesicht/">Sonnencreme fürs Gesicht</a>.</p>

<h2>Was wir tun und was nicht</h2>
<p>Wir behandeln Rosacea nicht. Was wir sehen: Bei einem Teil der Betroffenen koppeln sich die Schübe erkennbar an Belastungsphasen, schlechten Schlaf und Verdauungsthemen. Wo dieses Muster besteht, ist die Kräutertherapie ein möglicher ergänzender Weg — parallel zur dermatologischen Behandlung, nicht statt ihr.</p>
<p>Und ganz klar: Bei aktiver Rosacea ist <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> nicht geeignet. Reibung auf gereizter, gefässempfindlicher Haut verschlechtert das Bild.</p>
`.trim(),
    faqs: [
      { q: 'Was ist der Unterschied zwischen Rosacea und Couperose?', a: 'Couperose bezeichnet sichtbare erweiterte Äderchen ohne entzündliches Geschehen. Rosacea ist eine chronisch-entzündliche Erkrankung, bei der Äderchen ein Teilaspekt sein können. Couperose kann eine Vorstufe sein.' },
      { q: 'Ist Rosacea heilbar?', a: 'Nein, sie ist chronisch. Sie lässt sich aber gut kontrollieren, und schubfreie Phasen über lange Zeiträume sind möglich.' },
      { q: 'Wie unterscheide ich Rosacea von Akne?', a: 'An den Mitessern. Akne hat sie, Rosacea nicht. Rosacea betrifft ausserdem typischerweise die Gesichtsmitte und beginnt später im Leben.' },
      { q: 'Welche Pflege bei Rosacea?', a: 'Milde Reinigung, keine Peelings, kein Retinol, keine Duftstoffe. Barrierestärkende Pflege mit Ceramiden, Panthenol oder Niacinamid, und täglich mineralischer Sonnenschutz.' },
      { q: 'Hilft Ernährung bei Rosacea?', a: 'Bestimmte Auslöser sind gut belegt — Alkohol, scharfes Essen, heisse Getränke. Eine allgemeingültige Rosacea-Diät gibt es nicht, das individuelle Muster findest du über ein Trigger-Tagebuch.' },
      { q: 'Ist Gua Sha bei Rosacea sinnvoll?', a: 'Nein. Bei aktiver Rosacea ist Reibung auf gefässempfindlicher Haut kontraproduktiv.' },
    ],
    related: [
      { href: '/haut/couperose/', label: 'Couperose', cat: 'Hautthema' },
      { href: '/haut/azelainsaeure/', label: 'Azelainsäure', cat: 'Wirkstoff' },
      { href: '/haut/sonnencreme-gesicht/', label: 'Sonnencreme fürs Gesicht', cat: 'Wirkstoff' },
    ],
  },

  {
    slug: 'aknenarben',
    title: 'Aknenarben: Typen und was dagegen wirkt',
    metaDesc: 'Aknenarben unterscheiden: Boxcar, Rolling, Icepick und rote oder braune Male. Welche Behandlung zu welchem Typ passt, was realistisch möglich ist und was nicht.',
    excerpt: 'Die meisten «Narben» sind gar keine. Und für echte Narben entscheidet der Typ, welche Behandlung überhaupt Sinn hat.',
    category: 'Hautthemen',
    h1: 'Aknenarben',
    lead: 'Bevor irgendetwas behandelt wird, muss geklärt sein, was da überhaupt ist. Rote und braune Male verblassen von selbst. Echte Narben tun das nicht — und je nach Form hilft etwas völlig anderes.',
    readingTime: '8 Min.',
    ctaTitle: 'Erst die aktive Akne, dann die Narben',
    ctaText: 'Solange neue Entzündungen entstehen, entstehen neue Narben. Genau da setzen wir an.',
    ctaHref: '/therapien/kraeutertherapie/',
    ctaLabel: 'Kräutertherapie ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Das Wort «Aknenarbe» wird für drei sehr verschiedene Dinge verwendet. Die Unterscheidung ist der wichtigste Schritt, weil sie darüber entscheidet, ob überhaupt eine Behandlung nötig ist.</p>

<h2>Erst prüfen: ist es überhaupt eine Narbe?</h2>
<p><strong>Rote Male</strong> (postinflammatorisches Erythem) sind Gefässerweiterungen nach der Entzündung. Sie verblassen über Monate von selbst.</p>
<p><strong>Braune Male</strong> (postinflammatorische Hyperpigmentierung) sind Pigmentablagerungen. Auch sie verblassen, langsamer, und deutlich schneller mit konsequentem <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a>, <a href="/haut/niacinamid/">Niacinamid</a>, <a href="/haut/azelainsaeure/">Azelainsäure</a> oder <a href="/haut/vitamin-c-serum/">Vitamin C</a>. Mehr dazu unter <a href="/haut/pigmentflecken/">Pigmentflecken</a>.</p>
<p><strong>Echte Narben</strong> sind Veränderungen der Hautstruktur. Sie tasten sich als Delle oder Erhebung. Der Test ist einfach: Bei seitlichem Licht wirft eine Narbe einen Schatten, ein Mal nicht.</p>
<div class="wa-pullquote">Wenn bei seitlichem Licht kein Schatten entsteht, ist es keine Narbe. Dann brauchst du Geduld und Sonnenschutz, keine Behandlung.</div>

<h2>Die drei Narbentypen</h2>
<p><strong>Icepick.</strong> Schmal, tief, steil — wie mit einer Nadel eingestochen. Am schwersten zu behandeln, weil die Tiefe von der Oberfläche her kaum erreichbar ist. Flächige Verfahren bringen hier wenig; eingesetzt wird meist eine punktuelle Technik durch Fachpersonen.</p>
<p><strong>Boxcar.</strong> Kastenförmig, klare Kanten, mittlere Tiefe. Spricht auf abtragende und stimulierende Verfahren an.</p>
<p><strong>Rolling.</strong> Flache, wellige Dellen, weiche Ränder. Entsteht durch bindegewebige Stränge, die die Haut nach unten ziehen. Spricht am besten an, weil man diese Stränge lösen kann.</p>
<p>Die meisten Menschen haben eine Mischung. Das ist der Grund, warum ein einzelnes Verfahren selten reicht.</p>

<h2>Was bei welchem Typ eingesetzt wird</h2>
<p><a href="/haut/microneedling/">Microneedling</a> ist bei Rolling- und flachen Boxcar-Narben das gängigste Verfahren, meist in Serie von vier bis sechs Sitzungen. Kombiniert mit Radiofrequenz kommt es tiefer.</p>
<p>Fraktionierte Laser arbeiten in vergleichbarer Tiefe mit anderer Technik. <a href="/haut/peeling/">Tiefe chemische Peelings</a> werden ebenfalls eingesetzt. Subzision — das Lösen der bindegewebigen Stränge — ist bei Rolling-Narben oft der wirksamste Einzelschritt und ein ärztlicher Eingriff.</p>
<p>All das sind Verfahren, die wir nicht anbieten. Wir ordnen sie ein, damit du weisst, wonach du fragst.</p>

<h2>Was realistisch möglich ist</h2>
<p>Eine Verbesserung um 50 bis 70 Prozent über mehrere Sitzungen gilt bei geeigneten Narbentypen als gutes Ergebnis. Vollständig verschwinden Aknenarben nicht.</p>
<p>Wer mit der Erwartung «weg» hineingeht, wird enttäuscht — auch bei technisch gelungener Behandlung.</p>

<h2>Der Schritt, der zuerst kommt</h2>
<p><strong>Solange aktive Entzündungen bestehen, entstehen neue Narben.</strong> Narbenbehandlung bei aktiver Akne ist deshalb die falsche Reihenfolge, und die meisten seriösen Behandler lehnen sie ab.</p>
<p>Wenn <a href="/haut/unreine-haut/">unreine Haut</a> bei dir noch aktiv ist, ist das die eigentliche Baustelle. Wo Schübe sich an Zyklus, Belastung oder Verdauung koppeln, arbeiten wir mit der Kräutertherapie an dieser Ebene — und die dermatologische Behandlung läuft parallel weiter, wenn sie nötig ist.</p>
<p>Und: nicht drücken. Der grösste vermeidbare Anteil an Aknenarben entsteht durch Manipulation.</p>
`.trim(),
    faqs: [
      { q: 'Gehen Aknenarben von selbst weg?', a: 'Rote und braune Male ja, über Monate. Echte Narben, also Dellen in der Hautstruktur, nicht.' },
      { q: 'Wie erkenne ich, ob es eine echte Narbe ist?', a: 'Bei seitlichem Licht wirft eine echte Narbe einen Schatten, weil sie eine Vertiefung ist. Ein Mal ist flach und wirft keinen.' },
      { q: 'Was hilft am besten gegen Aknenarben?', a: 'Das hängt vom Typ ab. Rolling-Narben sprechen auf Subzision und Microneedling an, Boxcar auf abtragende Verfahren, Icepick am schlechtesten und nur punktuell.' },
      { q: 'Wie viele Microneedling-Sitzungen braucht man bei Narben?', a: 'Üblich sind vier bis sechs Sitzungen im Abstand von vier bis sechs Wochen, das Ergebnis baut sich über Monate auf.' },
      { q: 'Kann man Aknenarben komplett entfernen?', a: 'Nein. 50 bis 70 Prozent Verbesserung über mehrere Sitzungen gilt bei geeigneten Typen als gutes Ergebnis.' },
      { q: 'Kann man Aknenarben bei aktiver Akne behandeln?', a: 'Nein, das ist die falsche Reihenfolge. Solange neue Entzündungen entstehen, entstehen neue Narben. Erst die aktive Akne, dann die Narben.' },
    ],
    related: [
      { href: '/haut/unreine-haut/', label: 'Unreine Haut', cat: 'Hautthema' },
      { href: '/haut/microneedling/', label: 'Microneedling', cat: 'Methode' },
      { href: '/haut/pigmentflecken/', label: 'Pigmentflecken', cat: 'Hautthema' },
    ],
  },
  // ──────────────────────────────────────────────── Welle 6 · Methoden
  {
    slug: 'skin-booster',
    title: 'Skin Booster: was hinter dem Begriff steckt',
    metaDesc: 'Skin Booster im Vergleich: Was unterscheidet sie von Filler und Botox, welche Präparate gibt es, wie viele Sitzungen braucht es und für wen lohnt sich das überhaupt.',
    excerpt: 'Kein Filler, kein Botox, sondern eine dritte Kategorie. Was sie leistet — und die deutlich billigere Alternative, die vorher drankommt.',
    category: 'Methoden',
    h1: 'Skin Booster',
    lead: 'Skin Booster ist ein Marketingbegriff für eine ganze Gruppe injizierbarer Präparate. Sie füllen kein Volumen und entspannen keine Muskeln, sondern zielen auf Hautqualität. Was daran hält, was nicht, und was du zuerst ausschöpfen solltest.',
    readingTime: '7 Min.',
    ctaTitle: 'Bevor du zur Nadel greifst',
    ctaText: 'Ein grosser Teil dessen, was Skin Booster verspricht, ist Durchblutung, Abfluss und Entspannung. Das bekommst du auch ohne Injektion.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Der Begriff Skin Booster ist nicht geschützt. Darunter fallen sehr unterschiedliche Präparate, die eines gemeinsam haben: Sie werden in die Haut injiziert, nicht darunter, und sie sollen die Hautqualität verbessern statt die Form zu verändern.</p>

<h2>Die drei Kategorien auseinanderhalten</h2>
<p><strong>Filler</strong> füllen Volumen. Vernetztes Hyaluron wird in die Tiefe eingebracht, um Struktur zu ersetzen. Das Ergebnis ist sofort sichtbar.</p>
<p><strong>Muskelentspannende Injektionen</strong> reduzieren Mimikbewegung. Das ist ein verschreibungspflichtiges Arzneimittel und rein ärztliche Sache.</p>
<p><strong>Skin Booster</strong> machen weder das eine noch das andere. Sie bringen einen Reiz in die Haut, der die Zellen zu mehr Eigenproduktion anregen soll. Das Ergebnis kommt langsam, über Wochen.</p>
<div class="wa-pullquote">Wer nach einem Skin Booster sofort etwas sieht, sieht die Schwellung.</div>

<h2>Welche Präparate es gibt</h2>
<p><strong>Nicht vernetztes Hyaluron.</strong> Die klassische Variante. Bindet Wasser in der Haut, gibt einen milden Reiz. Hält wenige Monate.</p>
<p><strong>Stabilisiertes Hyaluron in hoher Konzentration.</strong> Hier ist <a href="/haut/profhilo/">Profhilo</a> das bekannteste Präparat. Arbeitet mit Verteilung im Gewebe statt mit Volumen.</p>
<p><strong><a href="/haut/polynukleotide/">Polynukleotide</a>.</strong> DNA-Fragmente, meist aus Lachs. <a href="/haut/rejuran-pdrn/">Rejuran</a> ist die bekannteste Marke aus Korea.</p>
<p><strong>Vitamin- und Aminosäurecocktails</strong>, oft als Mesotherapie bezeichnet. Die Datenlage ist hier am dünnsten.</p>

<h2>Was realistisch passiert</h2>
<p>Beschrieben wird meist: etwas mehr Feuchtigkeit in der Haut, ein gleichmässigerer Ton, ein leichter Glanz. Feine Trockenheitsfältchen wirken weniger sichtbar.</p>
<p>Was nicht passiert: Straffung von abgesunkenem Gewebe, Ausgleich von Volumenverlust, Glättung tiefer <a href="/haut/falten-gesicht/">Falten</a>. Wer eine Nasolabialfalte weghaben will, braucht etwas anderes, siehe <a href="/haut/nasolabialfalten/">Nasolabialfalten</a>.</p>
<p>Üblich sind zwei bis drei Sitzungen im Abstand von drei bis vier Wochen, danach eine Auffrischung nach sechs bis zwölf Monaten. Rechne in der Schweiz mit mehreren hundert Franken pro Sitzung, je nach Präparat und Praxis.</p>

<h2>Was danach kommt</h2>
<p>Quaddeln an den Einstichstellen für wenige Stunden bis zwei Tage, gelegentlich kleine Blutergüsse. Ein bis zwei Tage ohne wichtige Termine sind realistisch geplant.</p>

<h2>Wer das macht</h2>
<p>Injektionen in die Haut gehören in ärztliche Hände. Wir bieten sie nicht an und verweisen dafür an Dermatologie oder ästhetische Medizin.</p>

<h2>Was vorher drankommt</h2>
<p>Das klingt unspektakulär, ist aber der ehrlichste Rat: Wer noch keinen täglichen <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a> verwendet und noch nie konsequent <a href="/haut/retinol/">Retinol</a> über sechs Monate durchgezogen hat, holt aus diesen beiden Schritten mehr heraus als aus der ersten Skin-Booster-Serie — zu einem Bruchteil der Kosten.</p>
<p>Und wenn es dir vor allem um ein wacheres, weniger geschwollenes Gesicht geht: Das ist Abfluss und Spannung, nicht Hautqualität. Dafür gibt es <a href="/therapien/hanbang/">Hanbang</a> und <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a>.</p>
`.trim(),
    faqs: [
      { q: 'Was ist der Unterschied zwischen Skin Booster und Filler?', a: 'Filler füllen Volumen und wirken sofort. Skin Booster werden in die Haut injiziert und zielen auf Hautqualität, das Ergebnis baut sich über Wochen auf.' },
      { q: 'Wie lange hält ein Skin Booster?', a: 'Je nach Präparat sechs bis zwölf Monate. Üblich sind zwei bis drei Sitzungen zu Beginn, danach Auffrischungen.' },
      { q: 'Was kostet ein Skin Booster in der Schweiz?', a: 'Mehrere hundert Franken pro Sitzung, abhängig von Präparat, Menge und Praxis. Die Anfangsserie umfasst meist zwei bis drei Sitzungen.' },
      { q: 'Straffen Skin Booster die Haut?', a: 'Nicht im Sinne eines Liftings. Sie arbeiten an Feuchtigkeit und Hautqualität, nicht an abgesunkenem Gewebe.' },
      { q: 'Wer darf Skin Booster spritzen?', a: 'Injektionen in die Haut gehören in ärztliche Hände. TCM.ch bietet sie nicht an.' },
      { q: 'Was bringt mehr, Skin Booster oder gute Pflege?', a: 'Wer täglichen Sonnenschutz und ein konsequent durchgezogenes Retinol noch nicht ausgeschöpft hat, holt daraus mehr heraus als aus der ersten Serie — zu einem Bruchteil der Kosten.' },
    ],
    related: [
      { href: '/haut/profhilo/', label: 'Profhilo', cat: 'Methode' },
      { href: '/haut/polynukleotide/', label: 'Polynukleotide', cat: 'Methode' },
      { href: '/haut/rejuran-pdrn/', label: 'Rejuran und PDRN', cat: 'Methode' },
    ],
  },

  {
    slug: 'polynukleotide',
    title: 'Polynukleotide: Wirkprinzip, Präparate, Grenzen',
    metaDesc: 'Polynukleotide und PDRN in der Ästhetik: woher sie kommen, was die Studienlage hergibt, welche Präparate es gibt, wie viele Sitzungen nötig sind und für wen es sich lohnt.',
    excerpt: 'DNA-Fragmente aus Lachs, injiziert in die Haut. Was daran Substanz hat und wo die Studienlage endet.',
    category: 'Methoden',
    h1: 'Polynukleotide',
    lead: 'Polynukleotide sind der Wirkstoff hinter einer ganzen Generation koreanischer Behandlungen. Das Prinzip ist plausibel und teilweise untersucht. Was fehlt, sind grosse, unabhängige Studien — und genau das sollte man wissen, bevor man mehrere hundert Franken pro Sitzung zahlt.',
    readingTime: '7 Min.',
    ctaTitle: 'Erst einordnen, dann entscheiden',
    ctaText: 'Wir bieten keine Injektionen an. Wir sagen dir, was wir von einem Verfahren halten und was bei dir zuerst sinnvoll wäre.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Polynukleotide sind Ketten aus DNA-Bausteinen. Gewonnen werden sie meist aus der Keimdrüse von Lachs oder Forelle, gereinigt und fragmentiert. Die kurzkettige Variante heisst PDRN, siehe <a href="/haut/rejuran-pdrn/">Rejuran und PDRN</a>.</p>

<h2>Warum ausgerechnet Lachs</h2>
<p>Die DNA-Sequenzen von Fisch und Mensch sind sich in diesen Abschnitten sehr ähnlich. Das Material ist gut verfügbar, gut zu reinigen und löst kaum Immunreaktionen aus. Es geht nicht um «Fisch für die Haut», sondern um eine biologisch kompatible Molekülquelle.</p>

<h2>Das Wirkprinzip</h2>
<p>Zwei Mechanismen werden beschrieben. Erstens ein Rezeptoreffekt: Die Fragmente docken an Rezeptoren an, die an Reparatur- und Entzündungsprozessen beteiligt sind. Zweitens ein physikalischer Effekt: Das Gel bindet Wasser und gibt ein Gerüst, an dem sich Zellen orientieren.</p>
<p>Beides ist plausibel. Der Unterschied zu <a href="/haut/microneedling/">Microneedling</a> ist, dass dort ausschliesslich der Verletzungsreiz wirkt, während hier zusätzlich ein Material eingebracht wird.</p>
<div class="wa-pullquote">Plausibles Wirkprinzip und belegter Nutzen sind zwei verschiedene Dinge. Bei Polynukleotiden ist das erste solide, das zweite dünn.</div>

<h2>Was die Studienlage hergibt</h2>
<p>Es gibt Untersuchungen zu Hautelastizität, Feuchtigkeit und Wundheilung, überwiegend aus Korea und Italien. Sie zeigen Verbesserungen.</p>
<p>Die Einschränkungen: kleine Teilnehmerzahlen, kurze Beobachtungszeiträume, häufig Beteiligung der Hersteller, selten verblindete Kontrollgruppen. Für ein Verfahren, das seit Jahren breit vermarktet wird, ist das wenig.</p>
<p>Am besten belegt ist die Anwendung nicht in der Ästhetik, sondern in der Wundheilung.</p>

<h2>Präparate und Einsatzgebiete</h2>
<p>Die bekanntesten Marken sind Rejuran aus Korea sowie Plinest und verwandte Produkte aus Italien. Sie unterscheiden sich in Kettenlänge und Konzentration.</p>
<p>Eingesetzt werden sie vor allem bei dünner, trockener Haut, im Bereich der <a href="/haut/augenringe/">Augenpartie</a>, am Hals und ergänzend bei <a href="/haut/aknenarben/">Aknenarben</a>.</p>
<p>Üblich sind drei bis vier Sitzungen im Abstand von zwei bis vier Wochen. Das Ergebnis baut sich über zwei bis drei Monate auf und hält bei den meisten sechs bis zwölf Monate.</p>

<h2>Was danach kommt</h2>
<p>Quaddeln, Rötung und gelegentlich kleine Blutergüsse. Um die Augen ist die Ausfallzeit erfahrungsgemäss am längsten, rechne dort mit zwei bis vier Tagen sichtbarer Spuren.</p>

<h2>Wo die Grenze liegt</h2>
<p>Polynukleotide arbeiten an Hautqualität. Sie ersetzen kein Volumen, straffen kein abgesunkenes Gewebe und glätten keine tiefen Falten. Wer das erwartet, ist bei einer anderen Kategorie richtig, siehe <a href="/haut/skin-booster/">Skin Booster</a>.</p>

<h2>Unsere Position</h2>
<p>Wir bieten keine Injektionen an. Wenn du dieses Verfahren erwägst, gehört es in ärztliche Hände, und die Frage nach dem konkreten Präparat und der Erfahrung des Behandlers ist berechtigt.</p>
<p>Was wir sagen können: Bei dünner, müder Haut ohne strukturellen Substanzverlust lohnt es sich, zuerst <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a> und <a href="/haut/retinol/">Retinol</a> über Monate konsequent auszuschöpfen. Das kostet fast nichts und ist besser belegt als jedes injizierbare Präparat in dieser Gruppe.</p>
`.trim(),
    faqs: [
      { q: 'Was sind Polynukleotide?', a: 'Ketten aus DNA-Bausteinen, meist aus Lachs gewonnen, gereinigt und in die Haut injiziert. Sie sollen Reparaturprozesse anregen und Wasser binden.' },
      { q: 'Was ist der Unterschied zwischen PDRN und Polynukleotiden?', a: 'PDRN bezeichnet die kurzkettige Variante, Polynukleotide die längerkettige. Die Begriffe werden im Marketing oft synonym verwendet.' },
      { q: 'Wie viele Sitzungen braucht man?', a: 'Üblich sind drei bis vier Sitzungen im Abstand von zwei bis vier Wochen. Das Ergebnis baut sich über zwei bis drei Monate auf.' },
      { q: 'Wie gut ist die Studienlage?', a: 'Es gibt positive Untersuchungen, aber mit kleinen Teilnehmerzahlen, kurzen Zeiträumen und häufiger Herstellerbeteiligung. Am besten belegt ist der Einsatz in der Wundheilung, nicht in der Ästhetik.' },
      { q: 'Sind Polynukleotide für Veganer geeignet?', a: 'Nein, das Ausgangsmaterial stammt von Fisch.' },
      { q: 'Straffen Polynukleotide die Haut?', a: 'Nicht im Sinne eines Liftings. Sie arbeiten an Hautqualität, nicht an abgesunkenem Gewebe oder Volumenverlust.' },
    ],
    related: [
      { href: '/haut/rejuran-pdrn/', label: 'Rejuran und PDRN', cat: 'Methode' },
      { href: '/haut/skin-booster/', label: 'Skin Booster', cat: 'Methode' },
      { href: '/haut/microneedling/', label: 'Microneedling', cat: 'Methode' },
    ],
  },

  {
    slug: 'fruchtsaeurepeeling',
    title: 'Fruchtsäurepeeling: Wirkstoffe, Stärken, Ablauf',
    metaDesc: 'Fruchtsäurepeeling mit AHA: welche Säure für welche Haut, welche Konzentration zu Hause und welche in der Praxis, wie oft, und was danach zu beachten ist.',
    excerpt: 'Glykolsäure, Milchsäure, Mandelsäure — sie machen dasselbe, aber unterschiedlich schnell und unterschiedlich tief.',
    category: 'Methoden',
    h1: 'Fruchtsäurepeeling',
    lead: 'AHA lösen die Verbindungen zwischen abgestorbenen Hornzellen. Welche Säure du nimmst, entscheidet über Eindringtiefe, Reizpotenzial und darüber, ob du danach eine Woche gerötet herumläufst.',
    readingTime: '7 Min.',
    ctaTitle: 'Unsicher, was deine Haut verträgt?',
    ctaText: 'Wir schauen sie uns an und sagen dir, was sinnvoll ist — auch wenn die Antwort «erst mal weniger» lautet.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Fruchtsäuren, fachlich Alpha-Hydroxysäuren oder AHA, sind wasserlöslich. Sie arbeiten auf der Hautoberfläche. Das ist der Unterschied zur fettlöslichen <a href="/haut/salicylsaeure/">Salicylsäure</a>, die in die Pore hineinkommt. Die Übersicht über alle Peeling-Arten steht unter <a href="/haut/peeling/">Peeling</a>.</p>

<h2>Die vier gängigen Säuren</h2>
<p><strong>Glykolsäure.</strong> Das kleinste Molekül, dringt am tiefsten ein, wirkt am stärksten — und reizt am meisten. Die Standardwahl bei robuster Haut, Rauheit und fahlem Teint.</p>
<p><strong>Milchsäure.</strong> Grösser, dringt weniger tief ein, wirkt zusätzlich feuchtigkeitsbindend. Die verträglichere Alternative und der bessere Einstieg bei trockener Haut.</p>
<p><strong>Mandelsäure.</strong> Das grösste Molekül, dringt am langsamsten ein. Die Wahl bei empfindlicher Haut und bei dunkleren Hauttypen, weil das Risiko für <a href="/haut/pigmentflecken/">Pigmentreaktionen</a> geringer ist.</p>
<p><strong>Milde Säuren wie Gluconolacton</strong> (PHA) sind noch schonender und eignen sich für Haut, die auf alles andere reagiert.</p>
<div class="wa-pullquote">Die richtige Säure ist nicht die stärkste, sondern die, die du sechs Monate durchhältst.</div>

<h2>Zu Hause oder in der Praxis</h2>
<p><strong>Zu Hause:</strong> bis etwa 10 Prozent AHA in Leave-on-Produkten, ein- bis zweimal pro Woche abends. Auf saubere, trockene Haut, danach Feuchtigkeitspflege. Nicht zusätzlich am selben Abend <a href="/haut/retinol/">Retinol</a> oder Salicylsäure.</p>
<p><strong>In der Praxis:</strong> deutlich höhere Konzentrationen bei niedrigerem pH-Wert, in kurzer Einwirkzeit und mit Neutralisation. Das ist eine andere Kategorie und gehört in geschulte Hände.</p>
<p>Ein oberflächliches Praxispeeling bedeutet meist ein bis drei Tage leichte Rötung und Schuppung, üblicherweise in Serie von vier bis sechs Behandlungen. Tiefere Peelings haben deutlich längere Ausfallzeiten und gehören dermatologisch begleitet.</p>

<h2>Was es bringt</h2>
<p>Glattere Oberfläche, gleichmässigerer Ton, weniger fahles Aussehen. Bei oberflächlichen <a href="/haut/pigmentflecken/">Pigmentflecken</a> und Pickelmalen in Serie eine sichtbare Aufhellung.</p>
<p>Was es nicht bringt: Straffung, Volumen, echte Narbenkorrektur. Bei <a href="/haut/aknenarben/">Aknenarben</a> braucht es tiefer greifende Verfahren.</p>

<h2>Danach</h2>
<p><strong>Sonnenschutz ist Pflicht, nicht Empfehlung.</strong> Frisch gepeelte Haut reagiert stärker auf UV, und die häufigste Komplikation nach Peelings ist eine Pigmentverschiebung, siehe <a href="/haut/sonnencreme-gesicht/">Sonnencreme fürs Gesicht</a>. In den zwei Wochen danach: keine intensive Sonne, kein Solarium.</p>
<p>Kein weiteres Peeling, kein Retinol und keine Bürsten in den Tagen danach. Nur Reinigung, Feuchtigkeit, Schutz.</p>

<h2>Wann du die Finger davon lässt</h2>
<p>Bei aktiver <a href="/haut/rosacea/">Rosacea</a> und bei ausgeprägter <a href="/haut/couperose/">Couperose</a>. Bei gestörter Barriere — spannende, brennende, schuppende Haut — zuerst zwei bis vier Wochen aufbauen. Bei <a href="/haut/melasma/">Melasma</a> nur mit Fachbegleitung, weil ein zu aggressives Peeling das Bild verschlechtern kann.</p>
<p>Und in der Schwangerschaft: milde AHA äusserlich gelten meist als vertretbar, Praxispeelings bespricht man vorher ärztlich.</p>
`.trim(),
    faqs: [
      { q: 'Welche Fruchtsäure ist die beste?', a: 'Glykolsäure wirkt am stärksten und reizt am meisten, Milchsäure ist verträglicher und feuchtigkeitsbindend, Mandelsäure die Wahl bei empfindlicher und dunklerer Haut.' },
      { q: 'Wie oft Fruchtsäurepeeling zu Hause?', a: 'Ein- bis zweimal pro Woche abends bei Konzentrationen bis etwa 10 Prozent. Häufiger führt zu einer gestörten Barriere, nicht zu einem besseren Ergebnis.' },
      { q: 'Wie lange ist die Haut nach einem Peeling gerötet?', a: 'Bei oberflächlichen Praxispeelings ein bis drei Tage mit leichter Rötung und Schuppung. Tiefere Peelings haben deutlich längere Ausfallzeiten.' },
      { q: 'Fruchtsäure oder Salicylsäure?', a: 'Fruchtsäure bei Rauheit, fahlem Teint und oberflächlichen Pigmentflecken. Salicylsäure bei verstopften Poren und öliger Haut, weil sie fettlöslich ist.' },
      { q: 'Hilft ein Fruchtsäurepeeling gegen Aknenarben?', a: 'Gegen die roten und braunen Male ja. Gegen echte Narben, also Dellen in der Hautstruktur, braucht es tiefer greifende Verfahren.' },
      { q: 'Kann man im Sommer peelen?', a: 'Möglich, aber mit striktem täglichem Sonnenschutz und ohne intensive Sonne in den zwei Wochen danach. Die häufigste Komplikation ist eine Pigmentverschiebung.' },
    ],
    related: [
      { href: '/haut/peeling/', label: 'Peeling', cat: 'Methode' },
      { href: '/haut/salicylsaeure/', label: 'Salicylsäure', cat: 'Wirkstoff' },
      { href: '/haut/pigmentflecken/', label: 'Pigmentflecken', cat: 'Hautthema' },
    ],
  },

  {
    slug: 'nasolabialfalten',
    title: 'Nasolabialfalten: warum sie entstehen, was hilft',
    metaDesc: 'Nasolabialfalten verstehen: warum sie mit Volumenverlust und Absinken zu tun haben, was Cremes leisten können, welche Verfahren eingesetzt werden und was realistisch ist.',
    excerpt: 'Keine Mimikfalte, sondern eine Strukturfalte. Das erklärt, warum die meisten Ansätze daran scheitern.',
    category: 'Hautthemen',
    h1: 'Nasolabialfalten',
    lead: 'Die Linie zwischen Nasenflügel und Mundwinkel hat jeder. Tiefer wird sie nicht, weil die Haut dort altert, sondern weil darüber Volumen verloren geht und Gewebe absinkt. Das ändert alles daran, was hilft.',
    readingTime: '6 Min.',
    ctaTitle: 'Was du tatsächlich beeinflussen kannst',
    ctaText: 'Spannung, Abfluss und Hautqualität sind der Teil, an dem sich arbeiten lässt. Genau da setzen wir an.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Die Nasolabialfalte ist zunächst eine anatomische Grenze zwischen Wange und Oberlippenbereich. Sie ist bei jedem Menschen vorhanden, auch bei Kindern, und sie ist keine Alterserscheinung.</p>

<h2>Warum sie tiefer wird</h2>
<p><strong>Volumenverlust in der Wange.</strong> Die Fettkompartimente im Mittelgesicht verlieren über die Jahre an Substanz. Was oben fehlt, betont die Kante unten.</p>
<p><strong>Absinken.</strong> Halteapparat und Bindegewebe geben nach, das Gewebe wandert nach unten und legt sich über die Falte.</p>
<p><strong>Knöcherne Veränderung.</strong> Auch das Gesichtsskelett verändert sich, die Unterstützung von unten nimmt ab.</p>
<p><strong>Hautqualität</strong> spielt mit, ist aber der kleinste Anteil.</p>
<div class="wa-pullquote">Die Nasolabialfalte ist ein Schatten, den abgesunkenes Gewebe wirft. Deshalb kommt man an sie mit Pflege nicht heran.</div>

<h2>Warum sie keine Mimikfalte ist</h2>
<p>Eine <a href="/haut/falten-gesicht/">Zornesfalte</a> entsteht durch Muskelbewegung. Muskelentspannende Injektionen wirken dort, weil sie den Mechanismus ausschalten.</p>
<p>Die Nasolabialfalte funktioniert anders. Muskelentspannung im Mittelgesicht ist dort nicht nur wirkungslos, sondern kann das Bild verschlechtern, weil die Muskulatur die Wange mitträgt. Das ist der Grund, warum seriöse Behandler hier abwinken.</p>
<p>Und es ist auch der Grund, warum <a href="/haut/gesichtsyoga/">Gesichtsyoga</a> hier nichts ausrichtet: Mehr Muskelaktivität ist nicht das Thema.</p>

<h2>Was Pflege leisten kann</h2>
<p>Ehrlich: wenig an der Falte selbst. Über Jahre täglicher <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a> und konsequentes <a href="/haut/retinol/">Retinol</a> verbessern die Hautqualität im Mittelgesicht messbar und verlangsamen den Prozess. Das ist Prävention, keine Korrektur.</p>
<p><a href="/haut/hyaluronsaeure/">Hyaluronsäure</a> im Serum lässt feine Fältchen ringsum weniger sichtbar wirken. Die Nasolabialfalte selbst berührt sie nicht.</p>

<h2>Was in der Praxis gemacht wird</h2>
<p>Der etablierte Weg ist die Unterspritzung mit vernetztem Hyaluron — und zwar meist nicht in die Falte, sondern in die Wange darüber, um die verlorene Abstützung zu ersetzen. Wer nur die Falte auffüllt, bekommt oft ein schwerer wirkendes Mittelgesicht.</p>
<p>Straffende Verfahren wie <a href="/haut/ultherapy-hifu/">Ultherapy und HIFU</a> oder Fadenlifting arbeiten am Absinken. Die Ergebnisse sind moderat und die Auswahl der geeigneten Kandidaten entscheidet.</p>
<p>All das sind ärztliche Verfahren. Wir bieten sie nicht an.</p>

<h2>Was wir tun können</h2>
<p>Nicht die Falte. Was wir sehen: Ein Teil dessen, was Menschen an ihrem Mittelgesicht stört, ist Schwellung am Morgen, Dauerspannung im Kaumuskel und ein müder Gesamteindruck. Das ist Abfluss und Spannung, und daran lässt sich mit <a href="/therapien/hanbang/">Hanbang</a> und <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a> arbeiten.</p>
<p>Was dabei nicht passiert: Die Nasolabialfalte verschwindet nicht. Wenn dir jemand das verspricht, geh woanders hin.</p>
`.trim(),
    faqs: [
      { q: 'Warum werden Nasolabialfalten tiefer?', a: 'Vor allem durch Volumenverlust in der Wange und Absinken des Gewebes, nicht durch Hautalterung an der Falte selbst.' },
      { q: 'Hilft Botox gegen Nasolabialfalten?', a: 'Nein. Es ist keine Mimikfalte. Muskelentspannung im Mittelgesicht kann das Bild sogar verschlechtern, weil die Muskulatur die Wange mitträgt.' },
      { q: 'Welche Creme hilft gegen Nasolabialfalten?', a: 'Keine, im Sinne einer Korrektur. Täglicher Sonnenschutz und Retinol über Jahre verbessern die Hautqualität und verlangsamen den Prozess — das ist Prävention.' },
      { q: 'Wird bei einer Unterspritzung in die Falte gespritzt?', a: 'Meist nicht. Üblich ist der Aufbau der Wange darüber, um die verlorene Abstützung zu ersetzen. Wer nur die Falte füllt, bekommt oft ein schwereres Mittelgesicht.' },
      { q: 'Hilft Gesichtsyoga gegen Nasolabialfalten?', a: 'Nein. Das Problem ist Volumen und Absinken, nicht zu wenig Muskelaktivität.' },
      { q: 'Kann Gua Sha Nasolabialfalten reduzieren?', a: 'Nein. Es arbeitet an Abfluss und Spannung, was das Gesicht wacher wirken lässt. Die Falte selbst bleibt.' },
    ],
    related: [
      { href: '/haut/falten-gesicht/', label: 'Falten im Gesicht', cat: 'Hautthema' },
      { href: '/haut/ultherapy-hifu/', label: 'Ultherapy und HIFU', cat: 'Methode' },
      { href: '/haut/hyaluronsaeure/', label: 'Hyaluronsäure', cat: 'Wirkstoff' },
    ],
  },

  {
    slug: 'gesichtsbehandlung',
    title: 'Gesichtsbehandlung: welche passt zu deiner Haut',
    metaDesc: 'Gesichtsbehandlungen im Vergleich: klassische Kosmetik, apparative Verfahren, Injektionen und manuelle Methoden. Was wofür geeignet ist, was es kostet und wie du wählst.',
    excerpt: 'Ein Überblick über alle Kategorien — und eine Entscheidungshilfe, welche zu deinem Anliegen passt.',
    category: 'Methoden',
    h1: 'Gesichtsbehandlung',
    lead: 'Unter «Gesichtsbehandlung» läuft alles von der Reinigung beim Kosmetikinstitut bis zur ärztlichen Injektion. Hier steht, welche Kategorien es gibt, was jede leistet, was sie kostet — und welche wir selbst anbieten.',
    readingTime: '8 Min.',
    ctaTitle: 'Unsicher, was zu dir passt?',
    ctaText: 'Schreib uns kurz, was dich stört. Wir sagen dir ehrlich, ob wir die richtige Adresse sind — oder wer es ist.',
    ctaHref: '/therapien/hanbang/',
    ctaLabel: 'Hanbang ansehen',
    author: AUTOR,
    reviewerName: 'Simon Stüve',
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    lastReviewed: '2026-08-23',
    bodyHtml: `
<p>Der Begriff ist nicht geschützt und deckt vier sehr verschiedene Kategorien ab. Wer weiss, in welche sein Anliegen fällt, spart sich Geld und Enttäuschung.</p>

<h2>1 · Klassische kosmetische Behandlung</h2>
<p>Reinigung, Ausreinigung, Maske, Massage, Pflege. Dauer meist 60 bis 90 Minuten, in der Schweiz üblicherweise CHF 120 bis 250.</p>
<p><strong>Gut bei</strong> verstopften Poren und <a href="/haut/mitesser/">Mitessern</a>, weil die manuelle Ausreinigung etwas leistet, was zu Hause schlecht funktioniert.</p>
<p><strong>Wenig geeignet bei</strong> Falten, Pigment und Struktur. Der Effekt ist angenehm und kurzfristig.</p>

<h2>2 · Apparative Verfahren</h2>
<p>Geräte, die die Haut mechanisch, thermisch oder mit Licht behandeln: <a href="/haut/hydrafacial/">HydraFacial</a>, <a href="/haut/microneedling/">Microneedling</a>, Laser, IPL, <a href="/haut/ultherapy-hifu/">HIFU</a>.</p>
<p>Preisspanne CHF 200 bis 800 pro Sitzung, fast immer in Serie. <strong>Gut bei</strong> Struktur, Pigment, Gefässen, <a href="/haut/aknenarben/">Aknenarben</a> — je nach Gerät. <strong>Wichtig:</strong> Hier entscheidet nicht die Marke des Geräts, sondern wer es bedient.</p>

<h2>3 · Injektionen</h2>
<p><a href="/haut/skin-booster/">Skin Booster</a>, <a href="/haut/polynukleotide/">Polynukleotide</a>, Filler, muskelentspannende Mittel. Ärztliche Verfahren, CHF 300 bis 900 und mehr pro Sitzung.</p>
<p><strong>Gut bei</strong> Volumenverlust, tiefen Falten und Hautqualität. <strong>Nicht sinnvoll,</strong> solange Grundlagen wie <a href="/haut/sonnencreme-gesicht/">Sonnenschutz</a> und <a href="/haut/retinol/">Retinol</a> nicht ausgeschöpft sind.</p>

<h2>4 · Manuelle und therapeutische Verfahren</h2>
<p>Gesichtsakupunktur, <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha</a>, Lymphmassage. Arbeiten an Durchblutung, Abfluss und Spannung. CHF 140 bis 260 je nach Länge.</p>
<p><strong>Gut bei</strong> müdem Hautbild, Schwellungsgefühl, Dauerspannung in Kiefer und Stirn. <strong>Nicht geeignet bei</strong> Pigment, Struktur oder Volumenverlust.</p>
<div class="wa-pullquote">Die meisten Enttäuschungen entstehen nicht durch schlechte Behandlungen, sondern durch die falsche Kategorie für das eigene Anliegen.</div>

<h2>Welche Kategorie für welches Anliegen</h2>
<p><strong>Müde, fahle, gestresste Haut</strong> → manuell und therapeutisch. Hier liegt unser Angebot.</p>
<p><strong>Verstopfte Poren, Unreinheiten</strong> → kosmetische Ausreinigung, dazu die passende Pflege mit <a href="/haut/salicylsaeure/">Salicylsäure</a>. Bei wiederkehrenden Schüben lohnt der Blick nach innen, siehe <a href="/haut/unreine-haut/">unreine Haut</a>.</p>
<p><strong><a href="/haut/pigmentflecken/">Pigmentflecken</a>, <a href="/haut/melasma/">Melasma</a></strong> → erst die Form bestimmen, dann apparativ oder mit Wirkstoffen. Bei Melasma nie ungeprüft Laser.</p>
<p><strong><a href="/haut/couperose/">Couperose</a>, <a href="/haut/rosacea/">Rosacea</a></strong> → dermatologisch, gefässbezogene Verfahren.</p>
<p><strong>Falten, Volumenverlust</strong> → ärztlich, siehe <a href="/haut/falten-gesicht/">Falten im Gesicht</a>.</p>

<h2>Was wir anbieten</h2>
<p>Wir sind eine TCM-Klinikgruppe, keine ästhetische Praxis. Im Gesicht arbeiten wir mit drei Behandlungen: der <a href="/therapien/gesichtsakupunktur/">Gesichtsakupunktur</a>, die bei medizinischer Indikation und EMR/ASCA-Anerkennung von der Zusatzversicherung übernommen werden kann, mit <a href="/therapien/gua-sha/gesichts-gua-sha/">Gua Sha im Gesicht</a>, und mit <a href="/therapien/hanbang/">Hanbang</a>, der 75-minütigen Kombination aus beidem.</p>
<p>Was wir nicht machen: Laser, Injektionen, Filler, apparative Straffung. Wenn dein Anliegen dort liegt, sagen wir dir das — und schicken dich nicht in eine Serie, die daran nichts ändert.</p>
`.trim(),
    faqs: [
      { q: 'Was kostet eine Gesichtsbehandlung in der Schweiz?', a: 'Klassisch kosmetisch CHF 120 bis 250, apparative Verfahren CHF 200 bis 800 pro Sitzung, Injektionen ab CHF 300, manuelle und therapeutische Behandlungen CHF 140 bis 260.' },
      { q: 'Wie oft sollte man eine Gesichtsbehandlung machen?', a: 'Bei kosmetischen und manuellen Behandlungen alle vier bis sechs Wochen. Apparative Verfahren laufen in Serien von vier bis sechs Sitzungen mit anschliessenden Auffrischungen.' },
      { q: 'Welche Gesichtsbehandlung hilft gegen Falten?', a: 'Gegen strukturelle Falten wirken ärztliche Verfahren. Kosmetische und manuelle Behandlungen arbeiten an Hautbild und Spannung, nicht an Volumen.' },
      { q: 'Übernimmt die Krankenkasse eine Gesichtsbehandlung?', a: 'Kosmetische Behandlungen nein. Die Gesichtsakupunktur kann bei medizinischer Indikation und EMR/ASCA-Anerkennung über die Zusatzversicherung laufen. Hanbang ist eine Selbstzahlerleistung.' },
      { q: 'Was ist der Unterschied zwischen Kosmetikerin und Klinik?', a: 'Kosmetische Institute arbeiten an der Hautoberfläche und mit Pflege. Ärztliche Praxen arbeiten mit Injektionen und Geräten in der Tiefe. Wir arbeiten therapeutisch an Durchblutung, Abfluss und Spannung.' },
      { q: 'Welche Gesichtsbehandlung vor einem Anlass?', a: 'Eine manuelle Behandlung ein bis zwei Tage vorher. Peelings, Microneedling und Injektionen brauchen mehr Abstand, weil Rötung und Schwellung dazugehören.' },
    ],
    related: [
      { href: '/therapien/hanbang/', label: 'Hanbang', cat: 'Behandlung' },
      { href: '/therapien/gua-sha/gesichts-gua-sha/', label: 'Gua Sha fürs Gesicht', cat: 'Behandlung' },
      { href: '/haut/hydrafacial/', label: 'HydraFacial', cat: 'Methode' },
    ],
  },
];

export const hautBySlug = (slug: string): HautArticle | undefined => haut.find((a) => a.slug === slug);
export const hautCategories = (): string[] => Array.from(new Set(haut.map((a) => a.category)));
