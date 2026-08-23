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
    reviewerName: 'NAME EINSETZEN',
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
    reviewerName: 'NAME EINSETZEN',
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
    reviewerName: 'NAME EINSETZEN',
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
    reviewerName: 'NAME EINSETZEN',
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
    reviewerName: 'NAME EINSETZEN',
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
];

export const hautBySlug = (slug: string): HautArticle | undefined => haut.find((a) => a.slug === slug);
export const hautCategories = (): string[] => Array.from(new Set(haut.map((a) => a.category)));
