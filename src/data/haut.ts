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

const AUTOR: HautAuthor = {
  name: 'NAME EINSETZEN',
  role: 'TCM-Therapeutin · EMR & ASCA zertifiziert',
  bio: 'Behandelt schwerpunktmässig Hautbeschwerden und Gesichtsbehandlungen und verbindet chinesische Kräuterkunde mit moderner Hautpflege.',
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
    reviewerName: 'NAME EINSETZEN',
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
    reviewerName: 'NAME EINSETZEN',
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
    reviewerName: 'NAME EINSETZEN',
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
    ctaHref: '/therapien/gua-sha/gesichts-gua-sha/',
    ctaLabel: 'Gua Sha fürs Gesicht',
    author: AUTOR,
    reviewerName: 'NAME EINSETZEN',
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
];

export const hautBySlug = (slug: string): HautArticle | undefined => haut.find((a) => a.slug === slug);
export const hautCategories = (): string[] => Array.from(new Set(haut.map((a) => a.category)));
