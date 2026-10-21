// Kräutercluster (10 Artikel, Textpaket 18.10.2026): Entscheidungshilfe zur chinesischen
// Kräutertherapie bei sechs Beschwerdebildern plus vier Methoden-/Produktartikel.
// Gleiches Modell wie wissen-herbst.ts / wissen-akupunktur-bei.ts (Wissen-Interface, FAQ und
// Quellen im bodyHtml, faqs: [] => kein FAQPage-Schema). KEIN Teil der Akupunktur-bei-Serie.
// Datum bis Release ungesetzt (PUBLISHED_KRAEUTER_2026_10 in befunde-werte.ts).
import type { Wissen } from './wissen';
import { PUBLISHED_KRAEUTER_2026_10, PUBLISHED_WISSEN_NEUN_2026_10 } from './befunde-werte';

const REDAKTION = {
  name: 'Redaktion TCM.ch',
  role: 'Redaktionelle Einordnung',
  bio: 'Redaktionelle Einordnung auf Basis der im Artikel verlinkten Quellen. Keine ärztliche Diagnose und keine individuelle Therapieempfehlung.',
};
const DATEN_K = { datePublished: PUBLISHED_KRAEUTER_2026_10 ?? '', dateModified: PUBLISHED_KRAEUTER_2026_10 ?? '' };
// Neun-Artikel-Paket 21.10.2026 (Artikel 01 bis 06, Kräuter-Entscheidungen; eigene Kohorten-Konstante)
const DATEN_N = { datePublished: PUBLISHED_WISSEN_NEUN_2026_10 ?? '', dateModified: PUBLISHED_WISSEN_NEUN_2026_10 ?? '' };

export const wissenKraeuter: Wissen[] = [
  {
    slug: 'chinesische-kraeuter-bei-schlafstoerungen',
    title: 'Chinesische Kräuter bei Schlafstörungen: Nutzen & Grenzen',
    metaDesc: 'Können chinesische Kräuter bei Schlafstörungen helfen? Was Studien zeigen, welche Grenzen bestehen und worauf du vor einer Behandlung achten solltest.',
    region: 'Schweizweit',
    excerpt: 'Du liegst lange wach, schläfst unruhig oder bist morgens kaum erholt. Wenn du chinesische Kräuter ausprobieren möchtest, lohnt sich eine klare Einordnung: Für einzelne Präparate gibt es Hinweise auf einen Nutzen. Eine verlässlich wirksame Kräuterlösung für jede Schlafstörung lässt sich daraus nicht ableiten.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Schlafstörungen: Was ist belegt?',
    lead: 'Du liegst lange wach, schläfst unruhig oder bist morgens kaum erholt. Wenn du chinesische Kräuter ausprobieren möchtest, lohnt sich eine klare Einordnung: Für einzelne Präparate gibt es Hinweise auf einen Nutzen. Eine verlässlich wirksame Kräuterlösung für jede Schlafstörung lässt sich daraus nicht ableiten.',
    readingTime: '3 Min.',
    ctaTitle: 'Beratung zur Kräutertherapie anfragen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Was die Forschung tatsächlich untersucht</h2>
<p>Eine 2025 veröffentlichte Netzwerk-Metaanalyse wertete 109 randomisierte Studien mit insgesamt 11’488 Erwachsenen aus. Untersucht wurden verschiedene chinesische Fertigarzneimittel, teilweise zusammen mit konventionellen Medikamenten.</p>
<p>Für einzelne Präparate zeigten sich Vorteile bei subjektiver Schlafqualität oder anderen Schlafmassen. Die Sicherheit der Ergebnisse bewerteten die Forschenden jedoch als niedrig bis sehr niedrig. Daraus folgt weder eine allgemeine Empfehlung für chinesische Kräuter noch ein Wirknachweis für jede individuell zusammengestellte Rezeptur.</p>
<p>Entscheidend ist deshalb nicht nur die Frage, ob irgendwo ein positives Studienergebnis vorliegt. Es muss auch um ein vergleichbares Präparat, eine passende Patientengruppe und einen für dich relevanten Nutzen gehen.</p>
<h2>Die Ursache gehört zur Entscheidung</h2>
<p>Schlafprobleme können mit Stress, Schmerzen, Medikamenten oder anderen Erkrankungen zusammenhängen. Auch Atemaussetzer im Schlaf können die Erholung beeinträchtigen. Wenn die Beschwerden seit Monaten bestehen oder deinen Alltag deutlich belasten, ist eine ärztliche Einordnung sinnvoll.</p>
<p>Zu den etablierten Behandlungsmöglichkeiten gehört die kognitive Verhaltenstherapie für Schlafstörungen. Kräuter ersetzen diese Abklärung und Behandlung nicht. Hintergründe findest du auf unserer Seite zu <a href="/beschwerden/schlafprobleme/">Schlafproblemen</a>.</p>
<h2>Was vor einer Kräuterbehandlung geklärt werden sollte</h2>
<p>Notiere vor dem Gespräch, wann du ins Bett gehst, wie oft du aufwachst und wie du dich tagsüber fühlst. Bringe eine Liste deiner Medikamente und bereits verwendeten Schlafmittel mit.</p>
<p>Vor Beginn sollten ein konkretes Ziel und ein Zeitpunkt zur Überprüfung vereinbart werden. «Ich möchte tagsüber wieder belastbarer sein» ist hilfreicher als die Erwartung, ein Mittel müsse einfach allgemein den Schlaf verbessern.</p>
<p>Wie sich die Methode von der Nadelbehandlung unterscheidet, erklärt der Vergleich <a href="/wissen/akupunktur-oder-kraeutertherapie/">Akupunktur oder Kräutertherapie</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Sind chinesische Kräuter pflanzliche Schlafmittel?</h3>
<p>Einige Präparate werden bei Schlafbeschwerden eingesetzt. Sie unterscheiden sich aber in Zusammensetzung und Studienlage. «Pflanzlich» bedeutet nicht automatisch passend oder risikofrei.</p>
<h3>Kann ich meine bisherigen Schlafmedikamente ersetzen?</h3>
<p>Ändere verordnete Medikamente nicht aufgrund eines Artikels oder einer Produktwerbung. Besprich einen möglichen Wechsel mit der behandelnden Ärztin oder dem behandelnden Arzt.</p>
<h3>Wann müsste eine Wirkung eintreten?</h3>
<p>Eine allgemeingültige Frist lässt sich aus den unterschiedlichen Untersuchungen nicht ableiten. Vereinbare eine individuelle Verlaufskontrolle und klare Kriterien dafür, ob die Behandlung fortgeführt wird.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Du möchtest wissen, ob eine Beratung zur <a href="/therapien/kraeutertherapie/">chinesischen Kräutertherapie</a> für dich infrage kommt? Über unsere <a href="/kontakt/">Kontaktseite</a> kannst du dein Anliegen schildern und die passende Fachperson anfragen.</p>
<h2>Quellen</h2>
<ul><li><a href="https://pubmed.ncbi.nlm.nih.gov/39701221/" target="_blank" rel="noopener">Ma et al. Comparative efficacy and safety of Chinese patent medicines for primary insomnia. Journal of Ethnopharmacology, 2025. PMID 39701221</a></li><li><a href="https://www.nhs.uk/conditions/insomnia/" target="_blank" rel="noopener">NHS. Insomnia</a></li><li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/schlafprobleme/', label: 'Schlafprobleme', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-schlafprobleme/', label: 'Akupunktur bei Schlafproblemen', cat: 'Artikel' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/wissen/akupunktur-oder-kraeutertherapie/', label: 'Akupunktur oder Kräutertherapie?', cat: 'Artikel' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-reizdarm',
    title: 'Chinesische Kräuter bei Reizdarm: Studien & Grenzen',
    metaDesc: 'Chinesische Kräuter bei Reizdarm: Was Untersuchungen zeigen, warum der Reizdarmtyp wichtig ist und welche Fragen vor einer Behandlung geklärt sein sollten.',
    region: 'Schweizweit',
    excerpt: 'Bei Reizdarm gibt es nicht die eine Kräuterrezeptur für alle. Ein grosser Teil der Forschung betrifft Menschen mit überwiegendem Durchfall. Diese Ergebnisse lassen sich nicht einfach auf Verstopfung oder wechselnde Beschwerden übertragen.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Reizdarm: Können sie helfen?',
    lead: 'Bei Reizdarm gibt es nicht die eine Kräuterrezeptur für alle. Ein grosser Teil der Forschung betrifft Menschen mit überwiegendem Durchfall. Diese Ergebnisse lassen sich nicht einfach auf Verstopfung oder wechselnde Beschwerden übertragen.',
    readingTime: '3 Min.',
    ctaTitle: 'Beratung zur Kräutertherapie anfragen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Warum der Reizdarmtyp wichtig ist</h2>
<p>Bauchschmerzen, Blähungen und veränderter Stuhlgang können den Alltag stark einschränken. Für die Auswahl einer Behandlung macht es einen Unterschied, ob Durchfall, Verstopfung oder beides im Vordergrund steht.</p>
<p>Die medizinische Einordnung und die allgemeinen Behandlungsmöglichkeiten gehören auf die Seite zum <a href="/beschwerden/reizdarm/">Reizdarmsyndrom</a>. Hier geht es gezielt darum, was sich über chinesische Kräuter sagen lässt.</p>
<h2>Die Studien liefern kein einheitliches Bild</h2>
<p>Eine systematische Übersicht von 2022 untersuchte die Rezeptur Tongxie Yaofang bei Reizdarm mit überwiegendem Durchfall. Sie fand Hinweise auf eine Besserung, betonte aber erhebliche Einschränkungen der Studienqualität und die geringe Zahl aussagekräftiger Placebovergleiche.</p>
<p>Eine neuere, 2025 veröffentlichte Studie verglich die Rezeptur bei 96 Erwachsenen acht Wochen lang mit Placebo. Beim primären Endpunkt zeigte sich kein statistisch signifikanter Unterschied zwischen den Gruppen. Eine Besserung innerhalb der Kräutergruppe allein belegt deshalb keinen spezifischen Behandlungseffekt.</p>
<p>Das rechtfertigt weder die Aussage «Kräuter wirken bei Reizdarm sicher» noch das pauschale Urteil, jede Rezeptur sei wirkungslos. Die Ergebnisse müssen präparatbezogen betrachtet werden.</p>
<h2>Was eine sinnvolle Beratung klärt</h2>
<p>Hilfreich sind Angaben zu Stuhlhäufigkeit, Beschwerden nach Mahlzeiten, bisherigen Untersuchungen und bereits erprobten Behandlungen. Auch Medikamente und Nahrungsergänzungsmittel gehören auf die Liste.</p>
<p>Lege gemeinsam mit der Fachperson fest, woran ihr einen möglichen Nutzen erkennen würdet: beispielsweise weniger schmerzhafte Tage oder weniger Einschränkungen unterwegs. Ohne ein konkretes Ziel ist schwer zu beurteilen, ob sich die Behandlung lohnt.</p>
<p>Die Entscheidung zwischen <a href="/wissen/akupunktur-oder-kraeutertherapie/">Akupunktur und Kräutertherapie</a> sollte ebenfalls nicht allein vom Namen der Methode abhängen.</p>
<h2>Häufige Fragen</h2>
<h3>Gilt die Forschung auch für Reizdarm mit Verstopfung?</h3>
<p>Nicht automatisch. Untersuchungen zu durchfallbetontem Reizdarm beantworten diese Frage nicht.</p>
<h3>Kann ich eine Studienrezeptur selbst bestellen?</h3>
<p>Ein Studienname reicht nicht als persönliche Empfehlung. Zusammensetzung, Produktqualität und deine übrige Behandlung müssen berücksichtigt werden.</p>
<h3>Sind Kräuter besser als Akupunktur?</h3>
<p>Aus den hier beschriebenen Studien lässt sich kein allgemeiner Vergleich ableiten. Informationen zur Nadelbehandlung stehen im Artikel <a href="/wissen/akupunktur-bei-reizdarm/">Akupunktur bei Reizdarm</a>.</p>
<h2>Beratung anfragen</h2>
<p>Wenn du eine ergänzende Behandlung erwägst, kannst du über <a href="/kontakt/">Kontakt</a> eine Beratung zur Kräutertherapie anfragen. Vorhandene Befunde und bisherige Behandlungsversuche helfen bei der Einordnung.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2022.904657/full" target="_blank" rel="noopener">Liang et al. Systematic review and meta-analysis of Chinese herbal formula Tongxie Yaofang for diarrhea-predominant irritable bowel syndrome. Frontiers in Pharmacology, 2022</a></li><li><a href="https://bmjopen.bmj.com/content/15/1/e088410" target="_blank" rel="noopener">Liang et al. Chinese herbal formula Tongxie Yaofang granules for diarrhoea-predominant irritable bowel syndrome: a randomised, double-blind, placebo-controlled, phase II trial. BMJ Open, 2025</a></li><li><a href="https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/" target="_blank" rel="noopener">NHS. Irritable bowel syndrome</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/reizdarm/', label: 'Reizdarm', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-reizdarm/', label: 'Akupunktur bei Reizdarm', cat: 'Artikel' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/wissen/chinesische-kraeuter-bei-funktioneller-dyspepsie/', label: 'Chinesische Kräuter bei funktioneller Dyspepsie', cat: 'Artikel' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-funktioneller-dyspepsie',
    title: 'Chinesische Kräuter bei Reizmagen: Studien & Einordnung',
    metaDesc: 'Chinesische Kräuter bei funktioneller Dyspepsie: Was die Forschung zu Reizmagen zeigt und welche Grenzen, Sicherheitsfragen und nächsten Schritte wichtig sind.',
    region: 'Schweizweit',
    excerpt: 'Du fühlst dich nach kleinen Mahlzeiten schon voll oder hast wiederkehrende Beschwerden im Oberbauch. Wenn eine funktionelle Dyspepsie festgestellt wurde, können Fragen nach ergänzenden Behandlungen entstehen. Für einzelne chinesische Rezepturen gibt es Untersuchungen. Die Aussagekraft ist jedoch begrenzt.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei funktioneller Dyspepsie: Was spricht dafür?',
    lead: 'Du fühlst dich nach kleinen Mahlzeiten schon voll oder hast wiederkehrende Beschwerden im Oberbauch. Wenn eine funktionelle Dyspepsie festgestellt wurde, können Fragen nach ergänzenden Behandlungen entstehen. Für einzelne chinesische Rezepturen gibt es Untersuchungen. Die Aussagekraft ist jedoch begrenzt.',
    readingTime: '3 Min.',
    ctaTitle: 'Beratung zur Kräutertherapie anfragen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Reizmagen ist nicht gleich Reizdarm</h2>
<p>Die <a href="/beschwerden/funktionelle-dyspepsie/">funktionelle Dyspepsie</a> betrifft Beschwerden im oberen Verdauungstrakt. Beim <a href="/beschwerden/reizdarm/">Reizdarm</a> stehen andere Beschwerdemuster im Vordergrund. Beide können gemeinsam auftreten, bleiben aber unterschiedliche Behandlungsfragen.</p>
<p>Auch Sodbrennen oder eine Magenschleimhautentzündung sind nicht einfach andere Namen für funktionelle Dyspepsie. Vor einer Kräuterbehandlung sollte deshalb geklärt sein, welche Diagnose vorliegt.</p>
<h2>Was eine aktuelle Übersicht zeigt</h2>
<p>Eine Metaanalyse von 2024 untersuchte Xiangsha Liujunzi, eine bestimmte chinesische Rezeptur. Sie umfasste 23 Studien mit 2’101 Teilnehmenden und berichtete Vorteile bei verschiedenen Beschwerdemassen.</p>
<p>Die Autor:innen weisen zugleich auf die niedrige Qualität der eingeschlossenen Studien hin. Der häufig verwendete Endpunkt «klinische Wirksamkeitsrate» ist zudem nicht dasselbe wie eine verlässlich nachgewiesene Verbesserung der Lebensqualität. Das Ergebnis lässt sich nicht auf jede chinesische Kräutermischung übertragen.</p>
<p>Für deine Entscheidung zählt deshalb auch: Welche Beschwerden sollen sich verändern, wie stark müsste die Verbesserung sein und wann wird das überprüft?</p>
<h2>Was zuerst ärztlich abgeklärt gehört</h2>
<p>Wiederkehrende Oberbauchbeschwerden sollten medizinisch eingeordnet werden. Ungewollter Gewichtsverlust, Schluckbeschwerden, anhaltendes Erbrechen oder Blut im Erbrochenen beziehungsweise Stuhl gehören ärztlich abgeklärt. Eine Kräuterberatung ersetzt das nicht.</p>
<p>Bestehende Befunde, etwa zu einer Magenspiegelung oder bisherigen Medikamenten, sind für das Gespräch hilfreich.</p>
<h2>Die Behandlung nachvollziehbar planen</h2>
<p>Eine individuelle Verordnung sollte erklären, welches Präparat vorgesehen ist und wie der Verlauf beurteilt wird. Zur Entscheidung gehören auch Aufwand, Verträglichkeit und Kosten.</p>
<p>Die grundlegenden Abläufe findest du unter <a href="/therapien/kraeutertherapie/">chinesische Kräutertherapie</a>. Informationen zur möglichen Beteiligung deiner Zusatzversicherung stehen unter <a href="/krankenkassen/">Kosten und Krankenkasse</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Sind Kräuter bei jedem Reizmagen geeignet?</h3>
<p>Nein. Diagnose, Begleiterkrankungen und bisherige Behandlung müssen berücksichtigt werden. Ein positives Studienergebnis ist keine individuelle Eignungsprüfung.</p>
<h3>Kann ich säurehemmende Medikamente dadurch ersetzen?</h3>
<p>Die beschriebene Übersicht rechtfertigt keinen eigenständigen Medikamentenwechsel. Kläre das mit deiner behandelnden Fachperson.</p>
<h3>Ist ein bitterer Tee wirksamer als Granulat?</h3>
<p>Der Geschmack belegt keine stärkere Wirkung. Unterschiede erklärt der Artikel zu <a href="/wissen/tcm-granulat-dekokt-tabletten/">Granulat, Dekokt und Tabletten</a>.</p>
<h2>Deinen nächsten Schritt besprechen</h2>
<p>Über <a href="/kontakt/">Kontakt</a> kannst du eine Beratung anfragen und angeben, dass es um Kräutertherapie bei bereits abgeklärten Oberbauchbeschwerden geht.</p>
<h2>Quellen</h2>
<ul><li><a href="https://pubmed.ncbi.nlm.nih.gov/38933675/" target="_blank" rel="noopener">Wang et al. Efficacy and safety of Xiangsha liujunzi decoction for functional dyspepsia: a systematic review and meta-analysis. Frontiers in Pharmacology, 2024. PMID 38933675</a></li><li><a href="https://www.nhs.uk/conditions/indigestion/" target="_blank" rel="noopener">NHS. Indigestion</a></li><li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/funktionelle-dyspepsie/', label: 'Funktionelle Dyspepsie (Reizmagen)', cat: 'Beschwerde' },
      { href: '/beschwerden/reizdarm/', label: 'Reizdarm', cat: 'Beschwerde' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/wissen/tcm-granulat-dekokt-tabletten/', label: 'Granulat, Dekokt oder Tabletten?', cat: 'Artikel' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-verstopfung',
    title: 'Chinesische Kräuter bei Verstopfung: Nutzen & Risiken',
    metaDesc: 'Was können chinesische Kräuter bei chronischer Verstopfung leisten? Studien zu MaZiRenWan, Grenzen und Fragen vor einer individuellen Behandlung.',
    region: 'Schweizweit',
    excerpt: 'Wenn der Stuhlgang dauerhaft schwierig ist, klingt eine pflanzliche Behandlung oft attraktiv. Für eine bestimmte chinesische Rezeptur gibt es einen grösseren Placebovergleich. Daraus entsteht jedoch keine Empfehlung, Verstopfung auf eigene Faust mit beliebigen Kräutern zu behandeln.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei chronischer Verstopfung: Was zeigen Studien?',
    lead: 'Wenn der Stuhlgang dauerhaft schwierig ist, klingt eine pflanzliche Behandlung oft attraktiv. Für eine bestimmte chinesische Rezeptur gibt es einen grösseren Placebovergleich. Daraus entsteht jedoch keine Empfehlung, Verstopfung auf eigene Faust mit beliebigen Kräutern zu behandeln.',
    readingTime: '3 Min.',
    ctaTitle: 'Beratung zur Kräutertherapie anfragen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Was zu MaZiRenWan untersucht wurde</h2>
<p>Eine randomisierte, verblindete Studie verglich MaZiRenWan bei 291 Menschen mit funktioneller Verstopfung mit Senna und Placebo. Die Behandlung dauerte acht Wochen, anschliessend folgte eine weitere Beobachtungsphase.</p>
<p>Nach acht Wochen erreichten 68 Prozent unter MaZiRenWan den definierten Behandlungserfolg, gegenüber 33 Prozent unter Placebo. Gegenüber Senna mit 57,7 Prozent war der Unterschied statistisch nicht signifikant; das belegt keine Gleichwertigkeit der beiden Mittel.</p>
<p>Als Erfolg galt dabei mindestens ein zusätzlicher vollständiger spontaner Stuhlgang pro Woche gegenüber dem Ausgangswert. Das ist keine Heilungsquote und kein Beleg, dass alle Beschwerden verschwanden.</p>
<h2>Warum die Ursache trotzdem wichtig bleibt</h2>
<p>Verstopfung kann unter anderem mit Ernährung, Bewegung, veränderten Gewohnheiten oder Medikamenten zusammenhängen. Die passende Behandlung hängt deshalb von mehr ab als der Häufigkeit des Stuhlgangs.</p>
<p>Wenn Verstopfung regelmässig wiederkehrt, sich dein Stuhlverhalten plötzlich verändert oder Blut im Stuhl beziehungsweise ungewollter Gewichtsverlust hinzukommen, ist eine ärztliche Einordnung wichtig. Die allgemeinen Hintergründe erklärt unsere Seite zu <a href="/beschwerden/verstopfung/">Verstopfung</a>.</p>
<h2>Was vor einer Verordnung geklärt wird</h2>
<p>Notiere, welche Mittel du bisher verwendet hast und wie häufig du sie brauchst. Zur Beurteilung gehören auch Pressen, Schmerzen und das Gefühl einer unvollständigen Entleerung.</p>
<p>Vereinbare vor Beginn, was sich verbessern soll und wann ihr Bilanz zieht. Ein Präparat allein wegen seiner pflanzlichen Herkunft unbegrenzt weiterzunehmen, ist kein sinnvoller Behandlungsplan.</p>
<p>Wenn du dich auch für eine Nadelbehandlung interessierst, findest du die getrennte Einordnung unter <a href="/wissen/akupunktur-bei-verstopfung/">Akupunktur bei Verstopfung</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Ist MaZiRenWan besser als ein gewöhnliches Abführmittel?</h3>
<p>In der beschriebenen Studie war es nach acht Wochen Senna beim primären Endpunkt nicht statistisch überlegen.</p>
<h3>Kann ich die Studienrezeptur selbst dosieren?</h3>
<p>Nein. Die Studienangaben sind keine persönliche Einnahmeempfehlung. Produkt, Zusammensetzung und individuelle Eignung müssen geprüft werden.</p>
<h3>Sind Ergebnisse bei funktioneller Verstopfung auf andere Ursachen übertragbar?</h3>
<p>Nicht automatisch. Beispielsweise beantworten sie nicht dieselbe Frage wie Untersuchungen zu einer durch Medikamente verursachten Verstopfung.</p>
<h2>Beratung zur Kräutertherapie anfragen</h2>
<p>Über <a href="/kontakt/">Kontakt</a> kannst du eine passende Fachperson anfragen. Halte vorhandene Befunde und eine Liste bisher verwendeter Mittel bereit.</p>
<h2>Quellen</h2>
<ul><li><a href="https://pubmed.ncbi.nlm.nih.gov/29654915/" target="_blank" rel="noopener">Zhong et al. Efficacy of MaZiRenWan, a Chinese Herbal Medicine, in Patients With Functional Constipation in a Randomized Controlled Trial. Clinical Gastroenterology and Hepatology, 2019. PMID 29654915</a></li><li><a href="https://scholars.hkbu.edu.hk/en/publications/efficacy-of-mazirenwan-a-chinese-herbal-medicine-in-patients-with-2/" target="_blank" rel="noopener">Hong Kong Baptist University. Studienabstract und bibliografische Angaben</a></li><li><a href="https://www.nhs.uk/conditions/constipation/" target="_blank" rel="noopener">NHS. Constipation</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/verstopfung/', label: 'Verstopfung', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-verstopfung/', label: 'Akupunktur bei Verstopfung', cat: 'Artikel' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/wissen/chinesische-kraeuter-bei-reizdarm/', label: 'Chinesische Kräuter bei Reizdarm', cat: 'Artikel' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-regelschmerzen',
    title: 'Chinesische Kräuter bei Regelschmerzen: Evidenz & Grenzen',
    metaDesc: 'Können chinesische Kräuter Regelschmerzen lindern? Studienlage, Grenzen und wichtige Unterschiede zwischen primären Schmerzen und zugrunde liegenden Erkrankungen.',
    region: 'Schweizweit',
    excerpt: 'Regelschmerzen können deinen Alltag jeden Monat einschränken. Wenn du nach weiteren Behandlungsmöglichkeiten suchst, können auch chinesische Kräuter zum Thema werden. Entscheidend ist zuerst, ob es sich um primäre Regelschmerzen handelt oder eine Erkrankung dahintersteht.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Regelschmerzen: Eine mögliche Ergänzung?',
    lead: 'Regelschmerzen können deinen Alltag jeden Monat einschränken. Wenn du nach weiteren Behandlungsmöglichkeiten suchst, können auch chinesische Kräuter zum Thema werden. Entscheidend ist zuerst, ob es sich um primäre Regelschmerzen handelt oder eine Erkrankung dahintersteht.',
    readingTime: '3 Min.',
    ctaTitle: 'Beratung zur Kräutertherapie anfragen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Welche Schmerzen wurden untersucht?</h2>
<p>Primäre Dysmenorrhö bezeichnet Regelschmerzen ohne festgestellte zugrunde liegende Erkrankung. Davon zu unterscheiden sind Beschwerden beispielsweise bei <a href="/beschwerden/endometriose/">Endometriose</a> oder <a href="/beschwerden/adenomyose/">Adenomyose</a>.</p>
<p>Eine Cochrane-Übersicht fand vielversprechende Hinweise auf eine Schmerzlinderung durch chinesische Kräuter bei primärer Dysmenorrhö. Die Autor:innen betonten jedoch die überwiegend niedrige methodische Qualität der Studien. Die Übersicht stammt aus dem Jahr 2008 und liefert keine sichere Empfehlung für eine bestimmte aktuelle Verordnung.</p>
<p>Diese Ergebnisse belegen weder eine Behandlung der Endometriose noch einen allgemeinen Ausgleich von Hormonen.</p>
<h2>Wann die gynäkologische Abklärung vorgeht</h2>
<p>Wenn deine Blutungen schmerzhafter, stärker oder unregelmässig werden, solltest du das ärztlich besprechen. Auch Zwischenblutungen oder Schmerzen beim Geschlechtsverkehr, Wasserlassen oder Stuhlgang gehören abgeklärt.</p>
<p>Bei ungewöhnlich starken oder deutlich schlimmeren Schmerzen ist eine zeitnahe medizinische Beurteilung wichtig. Die ausführliche Einordnung findest du unter <a href="/beschwerden/menstruationsbeschwerden/">Menstruationsbeschwerden</a>.</p>
<h2>Wie du eine ergänzende Behandlung beurteilen kannst</h2>
<p>Hilfreich ist eine kurze Aufzeichnung über mehrere Zyklen: Wann beginnen die Schmerzen, wie stark sind sie und welche Tätigkeiten fallen dadurch aus? Notiere auch die bisherige Behandlung.</p>
<p>So lässt sich ein konkretes Ziel vereinbaren. Weniger Ausfalltage oder eine erkennbare Verringerung der Schmerzen sind nachvollziehbarer als die unbestimmte Erwartung, der Zyklus müsse «ins Gleichgewicht» kommen.</p>
<p>Eine Kräuterverordnung sollte mit deiner übrigen Behandlung abgestimmt sein. Informationen zu den grundsätzlichen Abläufen stehen unter <a href="/therapien/kraeutertherapie/">chinesische Kräutertherapie</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Sind Regelschmerzen und PMS dasselbe?</h3>
<p>Nein. Sie können gemeinsam auftreten, beschreiben aber unterschiedliche Beschwerden. Dieser Artikel betrifft die Entscheidung über Kräuter bei Regelschmerzen.</p>
<h3>Kann ich dadurch Schmerzmittel oder hormonelle Medikamente ersetzen?</h3>
<p>Das lässt sich aus der beschriebenen Forschung nicht pauschal ableiten. Änderungen gehören mit der behandelnden Fachperson besprochen. Wer hormonell verhütet, sollte eine Rezeptur vorab prüfen lassen, siehe <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-und-pille/">TCM-Kräuter und die Pille</a>.</p>
<h3>Gilt die Kräuterforschung auch für Akupunktur?</h3>
<p>Nein. Die Nadelbehandlung wird getrennt unter <a href="/wissen/akupunktur-bei-menstruationsbeschwerden/">Akupunktur bei Menstruationsbeschwerden</a> eingeordnet.</p>
<h2>Beratung anfragen</h2>
<p>Du kannst über <a href="/kontakt/">Kontakt</a> klären lassen, welche Fachperson für eine ergänzende Kräuterberatung infrage kommt. Eine notwendige gynäkologische Abklärung bleibt davon unabhängig.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.cochrane.org/evidence/CD005288_chinese-herbal-medicine-may-help-reduce-menstrual-pain" target="_blank" rel="noopener">Zhu et al. Chinese herbal medicine for primary dysmenorrhoea. Cochrane Database of Systematic Reviews, 2008</a></li><li><a href="https://www.nhs.uk/symptoms/period-pain/" target="_blank" rel="noopener">NHS. Period pain</a></li><li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/menstruationsbeschwerden/', label: 'Menstruationsbeschwerden', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-menstruationsbeschwerden/', label: 'Akupunktur bei Menstruationsbeschwerden', cat: 'Artikel' },
      { href: '/beschwerden/endometriose/', label: 'Endometriose', cat: 'Beschwerde' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-allergischem-schnupfen',
    title: 'Chinesische Kräuter bei Heuschnupfen: Studien & Grenzen',
    metaDesc: 'Chinesische Kräuter bei Heuschnupfen und allergischem Schnupfen: Was Studien zeigen und warum sie eine abgestimmte Allergiebehandlung nicht ersetzen.',
    region: 'Schweizweit',
    excerpt: 'Niesen, eine verstopfte Nase und juckende Augen können während der Pollensaison stark belasten. Chinesische Kräuter werden als ergänzende Behandlung untersucht. Die Forschung rechtfertigt aber weder ein Heilungsversprechen noch die Empfehlung, bewährte Allergiemedikamente eigenständig zu ersetzen.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei allergischem Schnupfen: Was ist realistisch?',
    lead: 'Niesen, eine verstopfte Nase und juckende Augen können während der Pollensaison stark belasten. Chinesische Kräuter werden als ergänzende Behandlung untersucht. Die Forschung rechtfertigt aber weder ein Heilungsversprechen noch die Empfehlung, bewährte Allergiemedikamente eigenständig zu ersetzen.',
    readingTime: '3 Min.',
    ctaTitle: 'Beratung zur Kräutertherapie anfragen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Heuschnupfen ist eine Form des allergischen Schnupfens</h2>
<p>Allergischer Schnupfen kann durch Pollen, aber auch durch andere Allergene wie Hausstaubmilben ausgelöst werden. Nicht jede laufende Nase ist allergisch.</p>
<p>Die Abklärung und allgemeinen Behandlungsmöglichkeiten findest du unter <a href="/beschwerden/allergien-heuschnupfen/">Allergien und Heuschnupfen</a>. Bei unklaren Auslösern kann eine medizinische Allergieabklärung sinnvoll sein. Wie diese funktioniert, erklärt die Seite zum <a href="/gesundheitsbibliothek/untersuchungen/allergietest/">Allergietest</a>.</p>
<h2>Was die Forschung zu Kräutern zeigt</h2>
<p>Besonders häufig wurde die Rezeptur Yu Ping Feng San untersucht. Eine Übersicht von 2017 fand keine Überlegenheit gegenüber Medikamenten beim zusammengefassten Endpunkt «Wirksamkeitsrate». Als Ergänzung zur medikamentösen Behandlung zeigten sich günstigere Ergebnisse, allerdings bei niedriger Evidenzqualität.</p>
<p>Eine neuere Übersicht von 2025 berichtet ebenfalls positive Ergebnisse für bestimmte Anwendungen. Sämtliche bewerteten Endpunkte hatten jedoch nur niedrige bis sehr niedrige Evidenzsicherheit. Daraus lässt sich keine verlässliche Wirkung jeder Kräuterrezeptur ableiten.</p>
<h2>Was vor einer ergänzenden Behandlung wichtig ist</h2>
<p>Für das Gespräch sind deine Auslöser, die saisonale Belastung und die bisher verwendeten Medikamente relevant. Ein konkretes Ziel könnte sein, wie stark dich die Nase im Alltag beeinträchtigt. Auch die bisher nötige Bedarfsmedikation sollte dokumentiert werden.</p>
<p>Zur üblichen Behandlung gehören je nach Situation beispielsweise Antihistaminika oder kortisonhaltige Nasensprays. Welche Behandlung für dich passt, klärst du mit deiner medizinischen Fachperson.</p>
<h2>Häufige Fragen</h2>
<h3>Können Kräuter die Allergie dauerhaft beseitigen?</h3>
<p>Ein solches Versprechen wird durch die hier beschriebenen Übersichten nicht gestützt.</p>
<h3>Muss ich meine Allergiemedikamente dafür absetzen?</h3>
<p>Nein. Beginne keine eigenständige Umstellung. Eine ergänzende Kräuterverordnung muss auf die bestehende Behandlung abgestimmt sein.</p>
<h3>Ist das dieselbe Behandlung wie Akupunktur?</h3>
<p>Nein. Informationen zur Nadelbehandlung findest du unter <a href="/wissen/akupunktur-bei-heuschnupfen/">Akupunktur bei Heuschnupfen</a>.</p>
<h2>Passende Beratung finden</h2>
<p>Über <a href="/kontakt/">Kontakt</a> kannst du eine Beratung zur Kräutertherapie anfragen. Gib an, ob bereits eine Allergiediagnose besteht und welche Behandlung du aktuell nutzt.</p>
<h2>Quellen</h2>
<ul><li><a href="https://pubmed.ncbi.nlm.nih.gov/29110710/" target="_blank" rel="noopener">Luo et al. Potential effectiveness of Chinese herbal medicine Yu ping feng san for adult allergic rhinitis. BMC Complementary and Alternative Medicine, 2017. PMID 29110710</a></li><li><a href="https://pubmed.ncbi.nlm.nih.gov/41031154/" target="_blank" rel="noopener">The efficacy and safety of Yupingfengsan in the treatment of allergic rhinitis: a systematic review and meta-analysis, 2025. PMID 41031154</a></li><li><a href="https://www.nhs.uk/conditions/allergic-rhinitis/" target="_blank" rel="noopener">NHS. Allergic rhinitis</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/allergien-heuschnupfen/', label: 'Allergien und Heuschnupfen', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-heuschnupfen/', label: 'Akupunktur bei Heuschnupfen', cat: 'Artikel' },
      { href: '/gesundheitsbibliothek/untersuchungen/allergietest/', label: 'Allergietest', cat: 'Untersuchung' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-oder-kraeutertherapie',
    title: 'Akupunktur oder Kräutertherapie: Was passt zu dir?',
    metaDesc: 'Akupunktur und chinesische Kräutertherapie unterscheiden sich bei Anwendung, Aufwand und Risiken. So kannst du die Entscheidung mit einer Fachperson vorbereiten.',
    region: 'Schweizweit',
    excerpt: 'Du musst vor dem ersten Gespräch nicht selbst entscheiden, welche TCM-Methode du brauchst. Es hilft aber, die Unterschiede zu kennen. Akupunktur und chinesische Kräutertherapie sind eigenständige Behandlungen mit unterschiedlichen Anwendungen und Sicherheitsfragen.',
    category: 'Therapien verstehen',
    h1: 'Akupunktur oder Kräutertherapie: Was passt zu deinem Anliegen?',
    lead: 'Du musst vor dem ersten Gespräch nicht selbst entscheiden, welche TCM-Methode du brauchst. Es hilft aber, die Unterschiede zu kennen. Akupunktur und chinesische Kräutertherapie sind eigenständige Behandlungen mit unterschiedlichen Anwendungen und Sicherheitsfragen.',
    readingTime: '3 Min.',
    ctaTitle: 'Passende Methode besprechen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Der praktische Unterschied</h2>
<p>Bei der <a href="/therapien/akupunktur/">Akupunktur</a> werden feine Nadeln an ausgewählten Körperstellen eingesetzt. Die Behandlung findet während eines Termins statt.</p>
<p>Bei der <a href="/therapien/kraeutertherapie/">chinesischen Kräutertherapie</a> wird ein Arzneimittel verordnet, das nach einem individuellen Plan angewendet wird. Zusammensetzung, Darreichungsform und Anwendung gehören zur Verordnung.</p>
<p>Für deine Entscheidung ist deshalb auch wichtig, was im Alltag umsetzbar ist. Wie gut passen wiederkehrende Praxistermine? Möchtest und kannst du einen Einnahmeplan zuverlässig einhalten? Gibt es Medikamente oder Erkrankungen, die bei der Auswahl berücksichtigt werden müssen? Was ein vollständiger Einnahmeplan enthalten muss, steht unter <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/">TCM-Kräuter einnehmen: Einnahmeplan</a>.</p>
<h2>Welche Methode ist wirksamer?</h2>
<p>Eine pauschale Rangliste wäre unseriös. Die Studienlage hängt vom Beschwerdebild und der konkreten Behandlung ab.</p>
<p>Für Akupunktur gibt es bei bestimmten Schmerzbeschwerden und Kopfschmerzformen Hinweise auf einen Nutzen. Bei chinesischen Kräutern sind die Ergebnisse je nach Präparat und Anwendung unterschiedlich und häufig durch die Studienqualität begrenzt. Das erlaubt keinen allgemeinen Schluss, eine der beiden Methoden sei grundsätzlich besser.</p>
<p>Ein Vergleich ist nur sinnvoll, wenn er dieselbe Behandlungsfrage beantwortet. Eine Kräuterstudie bei Reizdarm und eine Akupunkturstudie bei Rückenschmerzen lassen sich nicht gegeneinander ausspielen.</p>
<h2>Wann eine Kombination sinnvoll erscheint</h2>
<p>Dass zwei Methoden eingesetzt werden können, beweist noch keinen zusätzlichen Nutzen ihrer Kombination. Frage deshalb nach, welches konkrete Ziel jede Massnahme verfolgt.</p>
<p>Ein nachvollziehbarer Plan erklärt, weshalb eine Methode vorgeschlagen wird, wann die Wirkung überprüft wird und was bei fehlendem Nutzen geschieht. Nicht jede Beratung muss mit mehreren Behandlungen enden.</p>
<h2>Was du zum Gespräch mitbringen kannst</h2>
<p>Hilfreich sind vorhandene Befunde, eine Medikamentenliste und eine Übersicht bisheriger Behandlungen. Beschreibe auch, was du dir erhoffst und was dich möglicherweise verunsichert.</p>
<p>Fragen zur möglichen Kostenbeteiligung deiner Versicherung findest du unter <a href="/krankenkassen/">Kosten und Krankenkasse</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Muss ich beides machen?</h3>
<p>Nein. Eine Kombination ist kein verpflichtender Bestandteil jeder TCM-Behandlung.</p>
<h3>Sind Kräuter die Alternative bei Nadelangst?</h3>
<p>Nadelangst ist ein wichtiger Gesprächspunkt, aber allein noch kein Grund für eine Kräuterverordnung. Die Eignung muss unabhängig davon geprüft werden.</p>
<h3>Kann ich zuerst nur eine Beratung anfragen?</h3>
<p>Du kannst bei der <a href="/kontakt/">Kontaktaufnahme</a> schildern, dass du die geeignete Behandlungsmethode zunächst besprechen möchtest. Umfang und Kosten des Termins sollten vorab geklärt werden.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know</a></li><li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH. Acupuncture: Effectiveness and Safety</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/krankenkassen/', label: 'Kosten und Krankenkasse', cat: 'Übersicht' },
      { href: '/wissen/tcm-granulat-dekokt-tabletten/', label: 'Granulat, Dekokt oder Tabletten?', cat: 'Artikel' },
    ],
  },
  {
    slug: 'tcm-granulat-dekokt-tabletten',
    title: 'TCM-Granulat, Dekokt oder Tabletten: die Unterschiede',
    metaDesc: 'Wie unterscheiden sich TCM-Granulat, Kräuterdekokt und Tabletten? Ein Vergleich zu Zubereitung, Alltag und den richtigen Fragen vor einer Verordnung.',
    region: 'Schweizweit',
    excerpt: 'Chinesische Kräuterarzneimittel können unterschiedlich zubereitet sein. Manche werden als Granulat verwendet, andere als flüssiges Dekokt oder in fester Form. Welche Form passt, lässt sich nicht allein daran erkennen, was traditioneller aussieht oder angenehmer schmeckt.',
    category: 'Therapien verstehen',
    h1: 'TCM-Granulat, Dekokt oder Tabletten: Was unterscheidet die Formen?',
    lead: 'Chinesische Kräuterarzneimittel können unterschiedlich zubereitet sein. Manche werden als Granulat verwendet, andere als flüssiges Dekokt oder in fester Form. Welche Form passt, lässt sich nicht allein daran erkennen, was traditioneller aussieht oder angenehmer schmeckt.',
    readingTime: '3 Min.',
    ctaTitle: 'Beratung zur Kräutertherapie anfragen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Drei Formen, unterschiedliche praktische Fragen</h2>
<p>Ein Dekokt ist eine flüssige Zubereitung, die durch das Auskochen geeigneter Ausgangsstoffe entsteht. Granulate können beispielsweise aus getrockneten Dekokten hergestellt werden. Tabletten und Kapseln sind feste Darreichungsformen.</p>
<p>Für die Anwendung zählt die genaue Produktinformation. Nicht jedes Pulver wird gleich zubereitet, und nicht jede Tablette enthält denselben Extrakt. Die Schweizer Regelungen unterscheiden entsprechend verschiedene Stoffe, Zubereitungen und Darreichungsformen.</p>
<h2>Gibt es eine stärkste Form?</h2>
<p>Eine allgemeine Aussage wie «Tee wirkt am stärksten» ist nicht ausreichend begründet. Entscheidend sind unter anderem das konkrete Arzneimittel und die dafür vorliegenden Untersuchungen.</p>
<p>Auch ein intensiver Geschmack ist kein Wirksamkeitsnachweis. Umgekehrt bedeutet eine praktische Tablettenform nicht automatisch eine schwächere Wirkung.</p>
<p>Wenn eine Studie ein bestimmtes Granulat untersucht hat, belegt sie nicht ohne Weiteres dieselbe Wirkung einer anders zusammengesetzten Zubereitung. Fragen nach dem Präparat sind deshalb wichtiger als eine pauschale Rangfolge der Formen.</p>
<h2>Was im Alltag geklärt werden sollte</h2>
<p>Lass dir erklären, wie die verordnete Zubereitung angewendet und aufbewahrt wird. Welche Angaben ein vollständiger Einnahmeplan enthalten sollte, steht unter <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/">TCM-Kräuter einnehmen: Einnahmeplan</a>. Sprich an, wenn du viel unterwegs bist, Schwierigkeiten beim Schlucken hast oder eine Zubereitung geschmacklich nicht bewältigen kannst.</p>
<p>Hilfreiche Fragen sind:</p>
<ul><li>Welche genaue Zubereitung bekomme ich?</li><li>Welche Vorbereitung ist notwendig?</li><li>Was mache ich bei einer vergessenen Anwendung?</li><li>An wen wende ich mich bei Unverträglichkeit?</li></ul>
<p>Eigenständige Umrechnungen zwischen Granulat, Flüssigkeit und Tabletten sind keine sichere Lösung. Änderungen gehören mit der verordnenden Fachperson besprochen.</p>
<h2>Qualität bleibt bei jeder Form wichtig</h2>
<p>Eine ansprechende Verpackung beantwortet noch nicht, wie ein Produkt hergestellt und geprüft wurde. Die Seite zur <a href="/wissen/chinesische-kraeuter-qualitaet-schweiz/">Qualität chinesischer Kräuter in der Schweiz</a> erklärt die entsprechenden Fragen.</p>
<p>Wie sich die Methode insgesamt einordnet, steht unter <a href="/therapien/kraeutertherapie/">chinesische Kräutertherapie</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Ist Granulat dasselbe wie gemahlenes Kraut?</h3>
<p>Nicht unbedingt. Der Begriff allein beschreibt die Herstellung nicht vollständig. Entscheidend sind die Angaben zum konkreten Produkt.</p>
<h3>Kann ich eine Rezeptur selbst in einer anderen Form kaufen?</h3>
<p>Nicht ohne Rücksprache. Gleich klingende Namen garantieren keine identische Zusammensetzung oder Anwendung.</p>
<h3>Welche Form bietet TCM.ch an?</h3>
<p>Das hängt von der konkreten Verordnung und dem verfügbaren Angebot ab. Kläre die passende Form bei deiner <a href="/kontakt/">Anfrage</a>, bevor du etwas bestellst.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.swissmedic.ch/swissmedic/de/home/kpa/asiatische-am.html" target="_blank" rel="noopener">Swissmedic. Asiatische Arzneimittel</a></li><li><a href="https://www.swissmedic.ch/dam/swissmedic/it/dokumente/zulassung/KPA/anforderungen_andiequalitaetsdokumentationvonasiatischenarzneimi.pdf.download.pdf/anforderungen_andiequalitaetsdokumentationvonasiatischenarzneimi.pdf" target="_blank" rel="noopener">Swissmedic. Anforderungen an die Qualitätsdokumentation von asiatischen Arzneimitteln</a></li><li><a href="https://www.swissmedic.ch/dam/swissmedic/en/dokumente/zulassung/KPA/zl103_00_003d_hb_handbuch_homant_asia.pdf.download.pdf/ZL103_00_003d_HB_Handbuch_HOMANT_Asia_HMV4.pdf" target="_blank" rel="noopener">Swissmedic. Handbuch HOMANT Asia HMV4</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/wissen/chinesische-kraeuter-qualitaet-schweiz/', label: 'Qualität chinesischer Kräuter in der Schweiz', cat: 'Artikel' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'Nebenwirkungen und Wechselwirkungen', cat: 'Frage' },
      { href: '/wissen/akupunktur-oder-kraeutertherapie/', label: 'Akupunktur oder Kräutertherapie?', cat: 'Artikel' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-qualitaet-schweiz',
    title: 'Chinesische Kräuter: Qualität und Zulassung in der Schweiz',
    metaDesc: 'Woran erkennst du nachvollziehbare Qualität chinesischer Kräuter? Schweizer Zulassungsarten, Produktangaben und wichtige Fragen vor einer Behandlung.',
    region: 'Schweizweit',
    excerpt: 'Ein traditioneller Rezepturname sagt noch nicht, wie ein Arzneimittel hergestellt oder geprüft wurde. Für eine nachvollziehbare Entscheidung brauchst du Informationen zum konkreten Produkt, zu seinem rechtlichen Status und zur fachlichen Begleitung.',
    category: 'Therapien verstehen',
    h1: 'Chinesische Kräuter in der Schweiz: Wie lässt sich Qualität beurteilen?',
    lead: 'Ein traditioneller Rezepturname sagt noch nicht, wie ein Arzneimittel hergestellt oder geprüft wurde. Für eine nachvollziehbare Entscheidung brauchst du Informationen zum konkreten Produkt, zu seinem rechtlichen Status und zur fachlichen Begleitung.',
    readingTime: '3 Min.',
    ctaTitle: 'Beratung zur Kräutertherapie anfragen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Qualität und Wirksamkeit sind unterschiedliche Fragen</h2>
<p>Ein Produkt kann Qualitätsanforderungen erfüllen, ohne dass sein Nutzen für jede beworbene Erkrankung klinisch belegt ist. Diese Unterscheidung ist bei chinesischen Arzneimitteln besonders wichtig.</p>
<p>Swissmedic unterscheidet asiatische Arzneimittel mit und ohne Indikation. Für bestimmte Zulassungswege ohne Indikation können traditionell hergeleitete Angaben bibliografisch dokumentiert werden. Die Anforderungen an die Qualitätsdokumentation bleiben dabei bestehen.</p>
<p>Eine entsprechende Zulassung darf deshalb nicht als pauschaler klinischer Wirksamkeitsnachweis für Schlafprobleme, Reizdarm oder andere Beschwerden dargestellt werden.</p>
<h2>Welche Angaben du erfragen kannst</h2>
<p>Lass dir das genaue Produkt und die dafür verantwortliche Stelle nennen. Bei einer individuell verordneten Mischung sollte für dich nachvollziehbar sein, was du erhältst und wer Fragen zur Anwendung beantwortet.</p>
<p>Sinnvolle Fragen sind:</p>
<ul><li>Wie heisst das Arzneimittel beziehungsweise die konkrete Rezeptur?</li><li>Wer stellt es her oder gibt es ab?</li><li>Welche Produkt- und Anwendungshinweise bekomme ich?</li><li>Wie werden Rückfragen oder unerwünschte Reaktionen bearbeitet?</li></ul>
<p>Nicht jede Information muss auf der Vorderseite einer Verpackung stehen. Sie sollte aber über die zuständige Fachperson oder Abgabestelle nachvollziehbar sein.</p>
<h2>Was Qualitätsaussagen nicht ersetzen</h2>
<p>Bezeichnungen wie «natürlich», «Premium» oder «traditionell» beantworten keine konkrete Sicherheitsfrage. Auch die Aussage «in der Schweiz erhältlich» ist für sich allein keine Erklärung des Zulassungsstatus.</p>
<p>Berichte über verunreinigte oder falsch zusammengesetzte chinesische Kräuterprodukte zeigen, warum Herkunft und Kontrolle relevant sind. Sie erlauben umgekehrt kein pauschales Urteil über jedes einzelne Produkt.</p>
<h2>Qualität ersetzt keine individuelle Prüfung</h2>
<p>Auch ein nachvollziehbar hergestelltes Arzneimittel muss zu deiner Situation passen. Mögliche <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">Nebenwirkungen und Wechselwirkungen</a> bleiben eine eigene Frage.</p>
<p>Wenn es dir hauptsächlich um Bestellung und Bezugsweg geht, lies <a href="/wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/">chinesische Kräuter online kaufen oder individuell verordnen lassen</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Bedeutet eine Zulassung, dass jede beworbene Wirkung bewiesen ist?</h3>
<p>Nein. Entscheidend sind Zulassungsart und konkrete Indikation. Allgemeine Werbeaussagen gehen daraus nicht automatisch hervor.</p>
<h3>Sind individuell verordnete Mischungen immer besser?</h3>
<p>Eine individuelle Verordnung ist kein automatischer Überlegenheitsnachweis. Sie muss fachlich begründet und nachvollziehbar sein.</p>
<h3>Wie kann ich das vor einem Termin klären?</h3>
<p>Frage bei der <a href="/kontakt/">Kontaktaufnahme</a> nach der zuständigen Fachperson und dem Ablauf einer Kräuterverordnung. Konkrete Produktfragen gehören zur jeweiligen Verordnung.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.swissmedic.ch/swissmedic/de/home/kpa/asiatische-am.html" target="_blank" rel="noopener">Swissmedic. Asiatische Arzneimittel</a></li><li><a href="https://www.swissmedic.ch/swissmedic/de/home/kpa/asiatische-am/vereinfachte-zl-ohne-indikation.html" target="_blank" rel="noopener">Swissmedic. Vereinfachte Zulassung ohne Indikation</a></li><li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'Nebenwirkungen und Wechselwirkungen', cat: 'Frage' },
      { href: '/wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/', label: 'Online kaufen oder verordnen lassen?', cat: 'Artikel' },
      { href: '/wissen/tcm-granulat-dekokt-tabletten/', label: 'Granulat, Dekokt oder Tabletten?', cat: 'Artikel' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-online-kaufen-oder-verordnen',
    title: 'Chinesische Kräuter online kaufen: Was vorher wichtig ist',
    metaDesc: 'Chinesische Kräuter online bestellen? Was du über Bezugswege, Produktangaben und eine individuelle Verordnung wissen solltest, bevor du dich entscheidest.',
    region: 'Schweizweit',
    excerpt: 'Du hast von einer Rezeptur gelesen und findest sie mit wenigen Klicks in einem Onlineshop. Vor der Bestellung bleiben zwei entscheidende Fragen: Ist das Produkt nachvollziehbar und ist es für dich überhaupt geeignet? Eine Produktbeschreibung beantwortet beides nicht zuverlässig.',
    category: 'Therapien verstehen',
    h1: 'Chinesische Kräuter online kaufen oder individuell verordnen lassen?',
    lead: 'Du hast von einer Rezeptur gelesen und findest sie mit wenigen Klicks in einem Onlineshop. Vor der Bestellung bleiben zwei entscheidende Fragen: Ist das Produkt nachvollziehbar und ist es für dich überhaupt geeignet? Eine Produktbeschreibung beantwortet beides nicht zuverlässig.',
    readingTime: '3 Min.',
    ctaTitle: 'Beratung zur Kräutertherapie anfragen',
    ctaText: 'Schildere kurz dein Anliegen, vorhandene Befunde und deine bisherige Behandlung. Wir klären, welche Fachperson und welcher Standort für eine Kräuterberatung infrage kommen. Umfang und Kosten des Termins werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_K,
    bodyHtml: `<h2>Die Auswahl beginnt vor dem Warenkorb</h2>
<p>Eine Empfehlung in einem Forum oder ein positiver Erfahrungsbericht ist keine individuelle Verordnung. Gleiche Beschwerden bedeuten nicht automatisch dieselbe Diagnose oder dieselbe geeignete Behandlung.</p>
<p>Auch ein bekannter Rezepturname garantiert nicht, dass zwei angebotene Produkte in allen relevanten Eigenschaften übereinstimmen. Eine Entscheidung allein nach Name, Preis oder Sternebewertung greift deshalb zu kurz.</p>
<h2>Was beim Onlinebezug in der Schweiz wichtig ist</h2>
<p>Swissmedic warnt vor Arzneimitteln aus unsicheren Internetquellen. Dabei können beispielsweise falsche Wirkstoffmengen, Verunreinigungen oder nicht deklarierte Bestandteile ein Problem sein.</p>
<p>Für Schweizer Versandapotheken gelten besondere Voraussetzungen. Der Versandhandel mit Arzneimitteln ist nicht mit dem gewöhnlichen Einkauf eines Lebensmittels gleichzusetzen. Die aktuellen Vorgaben und Ausnahmen sollten direkt anhand der Swissmedic-Informationen geprüft werden.</p>
<p>Die ausführliche Einordnung von Produktqualität und Zulassungsarten findest du unter <a href="/wissen/chinesische-kraeuter-qualitaet-schweiz/">Qualität chinesischer Kräuter in der Schweiz</a>.</p>
<h2>Was eine individuelle Beratung zusätzlich klärt</h2>
<p>In einer fachlichen Beratung können dein Anliegen, vorhandene Diagnosen und die bisherige Behandlung gemeinsam betrachtet werden. Auch die Frage, ob überhaupt eine Kräuterverordnung sinnvoll ist, gehört dazu.</p>
<p>Eine nachvollziehbare Verordnung erklärt:</p>
<ul><li>was genau vorgesehen ist,</li><li>wie die Anwendung erfolgen soll,</li><li>welches Ziel verfolgt wird,</li><li>wann der Verlauf überprüft wird,</li><li>wer bei Fragen erreichbar ist.</li></ul>
<p>Das macht eine Behandlung überprüfbar. Es garantiert keinen Erfolg.</p>
<h2>Vor dem Kauf vergleichen</h2>
<p>Frage nach den Kosten für Beratung, Arzneimittel und Verlaufskontrollen. Kläre eine mögliche Beteiligung deiner Zusatzversicherung vorab. Hinweise findest du unter <a href="/krankenkassen/">Kosten und Krankenkasse</a>.</p>
<p>Wenn du bereits etwas bestellt hast, halte Verpackung und Produktinformationen für das Gespräch bereit. Informationen zu möglichen Problemen stehen unter <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">Nebenwirkungen und Wechselwirkungen</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Reicht eine Empfehlung aus einem TCM-Buch?</h3>
<p>Nein. Sie kann Hintergrundwissen vermitteln, ersetzt aber keine Prüfung deiner persönlichen Situation.</p>
<h3>Kann ich eine laufende Verordnung einfach nachbestellen?</h3>
<p>Kläre das mit der zuständigen Fachperson. Auch die geplante Dauer und Verlaufskontrolle gehören zur Behandlung.</p>
<h3>Kann ich bei TCM.ch eine Beratung dazu anfragen?</h3>
<p>Über <a href="/kontakt/">Kontakt</a> kannst du dein Anliegen schildern. Vor einer Buchung wird geklärt, welche Fachperson und welcher Standort dafür infrage kommen.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.swissmedic.ch/swissmedic/de/home/humanarzneimittel/marktueberwachung/arzneimittel-aus-dem-internet/leitfaden-arzneimittel-aus-dem-internet.html" target="_blank" rel="noopener">Swissmedic. Leitfaden Arzneimittel aus dem Internet</a></li><li><a href="https://www.swissmedic.ch/swissmedic/de/home/humanarzneimittel/marktueberwachung/arzneimittel-aus-dem-internet/drug-safety-current-threats/medicinal-products-and-sales-platforms.html" target="_blank" rel="noopener">Swissmedic. Vermitteln von Arzneimitteln auf Verkaufsplattformen</a></li></ul>`,
    faqs: [],
    related: [
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/wissen/chinesische-kraeuter-qualitaet-schweiz/', label: 'Qualität chinesischer Kräuter in der Schweiz', cat: 'Artikel' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'Nebenwirkungen und Wechselwirkungen', cat: 'Frage' },
      { href: '/krankenkassen/', label: 'Kosten und Krankenkasse', cat: 'Übersicht' },
    ],
  },
  // Neun-Artikel-Paket 21.10.2026: Kräuter-Entscheidungen 01 bis 06 (Texte Teil B, Quellen Teil C; Kohorte PUBLISHED_WISSEN_NEUN_2026_10)
  {
    slug: 'chinesische-kraeuter-bei-migraene',
    title: 'Chinesische Kräuter bei Migräne: Nutzen und Grenzen',
    metaDesc: 'Chinesische Kräuter zur Migränevorbeugung: Was Studien zeigen, warum die Rezeptur zählt und was du vor einer ergänzenden Behandlung klären solltest.',
    region: 'Schweizweit',
    excerpt: 'Du suchst eine zusätzliche Möglichkeit, Migräneattacken vorzubeugen. Zu einzelnen chinesischen Kräuterpräparaten gibt es positive Studien. Ob sie zu deiner Behandlung passen, entscheidet sich aber an mehr als einem Studienergebnis.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Migräne: Was ist zur Vorbeugung belegt?',
    lead: 'Du suchst eine zusätzliche Möglichkeit, Migräneattacken vorzubeugen. Zu einzelnen chinesischen Kräuterpräparaten gibt es positive Studien. Ob sie zu deiner Behandlung passen, entscheidet sich aber an mehr als einem Studienergebnis.',
    readingTime: '3 Min.',
    ctaTitle: 'Kräuterberatung bei Migräne anfragen',
    ctaText: 'Nenne deine bisherige Migränebehandlung und was du zusätzlich klären möchtest. Wir helfen dir, eine passende Fachperson für die Beratung zu finden. Ob eine Rezeptur infrage kommt, wird im Gespräch geprüft.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_N,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Chinesische Kräuter sind keine einheitliche Migränebehandlung. Studien untersuchen konkrete Zusammensetzungen, nicht jede individuell angepasste Rezeptur. Es gibt Hinweise auf weniger Attacken unter einzelnen Präparaten. Ein gesicherter Ersatz für deine Akutmedikamente oder eine ärztlich vereinbarte Vorbeugung lässt sich daraus nicht ableiten.</p>
<p>Dieser Artikel hilft bei der Entscheidung über Kräuter. Die Einordnung deiner Beschwerden bleibt auf der Seite zu <a href="/beschwerden/migraene/">Migräne</a>. Die andere Methode behandeln wir getrennt unter <a href="/wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/">Akupunktur bei Migräne</a>.</p>
<h2>Was die Forschung untersucht hat</h2>
<p>Eine systematische Übersicht von 2022 schloss 18 randomisierte Studien mit 3'015 Erwachsenen ein. Verglichen wurden oral eingenommene chinesische Kräuterpräparate mit Placebo. Die Suche reichte bis Mai 2021. Für Attackenhäufigkeit und Schmerzstärke berichtete die Übersicht Vorteile, die Vertrauenswürdigkeit wichtiger Ergebnisse wurde als moderat eingestuft.</p>
<p>Die Auswertung zeigt zugleich Grenzen: Rezepturen und Ergebnisse unterschieden sich deutlich, die Nachbeobachtung war auf vier Wochen begrenzt. Für Migränetage und weniger Bedarf an Akutmedikamenten waren die Aussagen weniger gesichert. Ein positiver Mittelwert beantwortet deshalb weder die Frage nach langfristigem Nutzen noch die nach deiner konkreten Mischung.</p>
<h2>Attackenvorbeugung ist etwas anderes als Akutbehandlung</h2>
<p>Wenn du mitten in einer Attacke steckst, brauchst du deinen vereinbarten Akutplan. Die hier besprochene Forschung ist keine Anleitung, ein Kräuterprodukt statt eines verordneten Akutmittels einzunehmen. Die ärztliche Migränebehandlung unterscheidet ebenfalls zwischen Hilfe während einer Attacke und Vorbeugung.</p>
<p>Für ein Beratungsgespräch ist deshalb eine konkrete Frage hilfreich: Geht es um weniger Attacken, besser erträgliche Attacken oder darum, eine bisherige Vorbeugung wegen Nebenwirkungen zu besprechen? Diese Ziele verlangen unterschiedliche Entscheidungen. Eine gewünschte Medikamentenumstellung gehört zur behandelnden Ärztin oder zum behandelnden Arzt.</p>
<h2>Mit welchen Angaben die Beratung sinnvoll beginnt</h2>
<p>Bringe dein Kopfschmerztagebuch, vorhandene Befunde und eine vollständige Medikamentenliste mit. Notiere auch bereits ausprobierte Vorbeugungen und warum du sie beendet hast. So muss das Gespräch nicht bei null anfangen.</p>
<p>Frage bei einer vorgeschlagenen Rezeptur nach Zusammensetzung, Bezugsquelle, Einnahmeplan und dem vereinbarten Prüfzeitpunkt. Ein nachvollziehbarer Plan soll erklären, woran ihr einen Nutzen erkennt und wann ihr nicht weiterbehandelt. Ein festes Paket über viele Monate lässt sich aus der genannten Übersicht nicht begründen.</p>
<p>Zur <a href="/therapien/kraeutertherapie/">chinesischen Kräutertherapie</a> gehört eine eigene Produktentscheidung. Informiere Apotheke und behandelnde Fachpersonen über geplante Kräuter, insbesondere wenn du bereits Medikamente einnimmst. Eine natürliche Herkunft schliesst Wechselwirkungen nicht aus.</p>
<h2>Wann die Abklärung vorgeht</h2>
<p>Neue oder deutlich veränderte Kopfschmerzen gehören ärztlich beurteilt. Bei schlagartig einsetzendem extremem Kopfschmerz oder neu auftretender Lähmung, Sprachstörung oder Sehverlust sofort 144 wählen. Ein solches einzelnes Warnzeichen darf nicht als bekannte Migräne abgetan werden.</p>
<h2>Häufige Fragen</h2>
<h3>Sind Kräuter besser als Akupunktur gegen Migräne?</h3>
<p>Die genannte Übersicht beantwortet diesen Vergleich nicht. Sie prüft Kräuter gegen Placebo. Für die Entscheidung müssen beide Methoden mit ihrer jeweils eigenen Evidenz und deinen Zielen betrachtet werden.</p>
<h3>Kann ich damit meine bisherigen Medikamente absetzen?</h3>
<p>Ändere deine verordnete Behandlung nicht aufgrund eines Artikels. Besprich ausdrücklich, ob es um eine Ergänzung oder einen ärztlich begleiteten Wechsel geht.</p>
<h3>Welche Rezeptur soll ich kaufen?</h3>
<p>Diese Seite empfiehlt kein Produkt. Die Zusammensetzung muss zur individuellen Prüfung gehören. Hinweise zu Bezugswegen findest du unter <a href="/wissen/chinesische-kraeuter-online-kaufen-oder-verordnen/">Kräuter online kaufen oder verordnen lassen</a>.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Du möchtest eine zusätzliche Option besprechen, ohne deine bisherige Behandlung aus dem Blick zu verlieren? Über die <a href="/kontakt/">Kontaktseite</a> kannst du eine Kräuterberatung anfragen. Was bei einer möglichen Beteiligung zu prüfen ist, erklärt <a href="/krankenkassen/">Krankenkasse und TCM</a>.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9296769/" target="_blank" rel="noopener">Lyu et al. Efficacy and Safety of Oral Chinese Herbal Medicine for Migraine: A Systematic Review and Meta-Analyses Using Robust Variance Estimation Model. Frontiers in Neurology, 2022. PMID 35873759. (Volltext PMC; Abstract, Limitationen und Schlussfolgerung geprüft)</a></li>
<li><a href="https://www.nhs.uk/conditions/migraine/" target="_blank" rel="noopener">NHS. Migraine. Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nhs.uk/tests-and-treatments/herbal-medicines-and-complementary-therapies/" target="_blank" rel="noopener">NHS. Herbal medicines and complementary therapies. Patienteninformation. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/migraene/', label: 'Migräne', cat: 'Beschwerde' },
      { href: '/wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/', label: 'Akupunktur bei Migräne', cat: 'Wissen' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'TCM-Kräuter: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-wechseljahresbeschwerden',
    title: 'Chinesische Kräuter bei Wechseljahren: Was ist belegt?',
    metaDesc: 'Chinesische Kräuter bei Wechseljahresbeschwerden: Studien zu Hitzewallungen, Grenzen des Hormonvergleichs und Fragen vor einer persönlichen Beratung.',
    region: 'Schweizweit',
    excerpt: 'Du möchtest Hitzewallungen oder andere Wechseljahresbeschwerden lindern und suchst nach einer Behandlung, die zu dir passt. Chinesische Kräuter werden dafür angeboten. Ihr Nutzen ist jedoch je nach Präparat und Ziel unterschiedlich gut untersucht.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Wechseljahresbeschwerden: Eine Alternative zu Hormonen?',
    lead: 'Du möchtest Hitzewallungen oder andere Wechseljahresbeschwerden lindern und suchst nach einer Behandlung, die zu dir passt. Chinesische Kräuter werden dafür angeboten. Ihr Nutzen ist jedoch je nach Präparat und Ziel unterschiedlich gut untersucht.',
    readingTime: '3 Min.',
    ctaTitle: 'Deine Fragen zur Kräutertherapie besprechen',
    ctaText: 'Schildere, welche Beschwerden dich belasten und welche Behandlungen du bereits nutzt. Wir klären mit dir, welche Fachperson für eine ergänzende Beratung infrage kommt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_N,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Chinesische Kräuter sind kein nachgewiesen gleichwertiger Ersatz für eine menopausale Hormontherapie. Die Forschung liefert für einzelne Beschwerden und Präparate Hinweise, aber keine allgemeine Zusage. «Ohne Hormone» bedeutet auch nicht automatisch «ohne Risiken».</p>
<p>Die medizinische Einordnung bleibt auf unserer Seite zu <a href="/beschwerden/wechseljahre/">Wechseljahren</a>. Hier geht es darum, was du vor einer Entscheidung über Kräuter wissen solltest.</p>
<h2>Was ältere und neuere Übersichten zeigen</h2>
<p>Eine Cochrane-Übersicht von 2016 wertete 22 randomisierte Studien mit 2'902 Frauen aus. Für Hitzewallungen und ähnliche Beschwerden reichten die Daten nicht für eine klare Aussage gegenüber Placebo oder Hormontherapie. Auch die Sicherheit blieb unzureichend geklärt. Die zugrunde liegende Suche endete im März 2015.</p>
<p>Eine neuere Übersicht von 2026 berücksichtigt Forschung bis Ende 2024 zu verschiedenen komplementären Verfahren. Sie beschreibt für chinesische Kräuter bei bestimmten Beschwerdeskalen und Schlafmassen auch Hinweise mit moderater Evidenzsicherheit, bewertet die Gesamtlage aber weiter als begrenzt. Das ist keine pauschale Bestätigung jeder Rezeptur und kein Nachweis einer Gleichwertigkeit mit Hormonen.</p>
<p>Die praktische Konsequenz: Frage nicht nur, ob «TCM bei Wechseljahren hilft». Frage, welches Präparat für welches konkrete Ziel vorgeschlagen wird und wie belastbar die passende Untersuchung ist.</p>
<h2>Deine Entscheidung muss nicht auf Hormone oder Kräuter reduziert werden</h2>
<p>Wenn eine Hormontherapie für dich nicht infrage kommt oder du sie nicht möchtest, lohnt ein ärztliches Gespräch über weitere Möglichkeiten. Der NHS beschreibt auch nicht hormonelle Behandlungswege. Eine Abneigung gegen eine Option verpflichtet dich nicht zur nächsten beworbenen Alternative.</p>
<p>Geht es vor allem um <a href="/beschwerden/hitzewallungen/">Hitzewallungen</a>, um Schlaf oder um mehrere Beschwerden gleichzeitig? Ein Gesamtwert in einer Studie sagt nicht, dass jeder einzelne dieser Bereiche besser wird. Besprich deshalb das für dich wichtigste Ziel zuerst.</p>
<h2>Was vor einer Rezeptur geprüft werden sollte</h2>
<p>Bringe eine Liste laufender Behandlungen und bereits gekaufter Präparate mit. Wenn du Hormone einnimmst, sollen beide behandelnden Seiten davon wissen. Auch pflanzliche Mittel können mit Medikamenten wechselwirken; «zusätzlich» ist keine automatische Freigabe.</p>
<p>Lass dir Zusammensetzung, Einnahmeplan und Kosten verständlich erklären. Vereinbart, wie ihr den Verlauf festhaltet. Du könntest beispielsweise die Zahl störender Hitzewallungen und ihre Auswirkung auf deinen Alltag notieren. Das ist ein Gesprächswerkzeug, keine Garantie, dass sich die Werte durch Kräuter verändern.</p>
<p>Die <a href="/wissen/tcm-granulat-dekokt-tabletten/">Darreichungsformen Granulat, Dekokt und Tabletten</a> unterscheiden sich im Alltag. Welche Form bequemer ist, beweist aber keine stärkere Wirkung. Für die andere Methode gibt es einen eigenen Artikel zu <a href="/wissen/akupunktur-bei-wechseljahresbeschwerden/">Akupunktur bei Wechseljahresbeschwerden</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Sind chinesische Kräuter pflanzliche Hormone?</h3>
<p>Die Bezeichnung ist irreführend. Eine Kräutermischung ist keine standardisierte Hormontherapie. Entscheidend sind ihre konkreten Bestandteile und die dazu passende Untersuchung.</p>
<h3>Kann ich Kräuter zusätzlich zu meiner Hormontherapie nehmen?</h3>
<p>Das lässt sich nicht für alle Kombinationen beantworten. Lass das konkrete Präparat vor Beginn mit deiner behandelnden Fachperson oder Apotheke prüfen. Dieser Artikel bestätigt keine Kombination als sicher.</p>
<h3>Wie lange sollte ich es ausprobieren?</h3>
<p>Eine allgemeine Frist für jede Mischung ist nicht belegt. Bitte vor Beginn um einen vereinbarten Prüfzeitpunkt und Kriterien für Fortführung, Änderung oder Beendigung.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Wenn du eine <a href="/therapien/kraeutertherapie/">Kräuterberatung</a> erwägst, kannst du über die <a href="/kontakt/">Kontaktseite</a> deine Fragen und die bisherige Behandlung nennen. Die Beratung soll eine nachvollziehbare Entscheidung ermöglichen. Sie verpflichtet dich nicht, eine Rezeptur zu beginnen.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.cochrane.org/evidence/CD009023_title-chinese-herbal-medicines-menopausal-symptoms" target="_blank" rel="noopener">Zhu, Liew und Liu. Chinese herbal medicine for menopausal symptoms. Cochrane Database of Systematic Reviews, 2016. CD009023. (Cochrane-Zusammenfassung und Abstract)</a></li>
<li><a href="https://doi.org/10.1080/13697137.2025.2584061" target="_blank" rel="noopener">Maunder et al. Complementary therapies for management of menopausal symptoms: a systematic review to inform the update of the International Menopause Society recommendations on women's midlife health. Climacteric, 2026. PMID 41498229. DOI 10.1080/13697137.2025.2584061. (Abstract im Publikationsverzeichnis der University of Bristol)</a></li>
<li><a href="https://www.nhs.uk/conditions/menopause-and-perimenopause/treatment/" target="_blank" rel="noopener">NHS. Treatment for menopause and perimenopause. Patienteninformation. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/wechseljahre/', label: 'Wechseljahre', cat: 'Beschwerde' },
      { href: '/beschwerden/hitzewallungen/', label: 'Hitzewallungen', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-wechseljahresbeschwerden/', label: 'Akupunktur bei Wechseljahresbeschwerden', cat: 'Wissen' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-neurodermitis',
    title: 'Chinesische Kräuter bei Neurodermitis: Nutzen und Risiken',
    metaDesc: 'Chinesische Kräuter bei Neurodermitis: Was aktuelle Studien zeigen, warum Einnahme und Hautanwendung getrennt zählen und was vor einer Beratung wichtig ist.',
    region: 'Schweizweit',
    excerpt: 'Wenn Juckreiz und Schübe trotz Behandlung belasten, ist der Wunsch nach einer weiteren Möglichkeit verständlich. Chinesische Kräuter werden zum Einnehmen und für die Haut angeboten. Für beide Wege muss die Evidenz getrennt betrachtet werden.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Neurodermitis: Nutzen, Risiken und Grenzen',
    lead: 'Wenn Juckreiz und Schübe trotz Behandlung belasten, ist der Wunsch nach einer weiteren Möglichkeit verständlich. Chinesische Kräuter werden zum Einnehmen und für die Haut angeboten. Für beide Wege muss die Evidenz getrennt betrachtet werden.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Kräuterberatung bei Neurodermitis anfragen',
    ctaText: 'Beschreibe deine bisherige Hautbehandlung und was du zusätzlich klären möchtest. Wir prüfen, welche Fachperson eine Beratung übernehmen kann. Eine Rezeptur ist kein automatischer nächster Schritt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_N,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Ein gesicherter allgemeiner Nutzen chinesischer Kräuter bei Neurodermitis lässt sich aus der Forschung nicht ableiten. Einzelne Ergebnisse sind positiv, andere zeigen keinen klaren Vorteil. Besonders wichtig: Ein Ergebnis für eine Creme beweist nicht die Wirkung einer Mischung zum Einnehmen.</p>
<p>Was die Erkrankung ausmacht und wann sie abgeklärt gehört, erklärt <a href="/beschwerden/neurodermitis/">Neurodermitis</a>. Dieser Artikel konzentriert sich auf die Entscheidung über Kräuter.</p>
<h2>Was sich seit der älteren Cochrane-Übersicht getan hat</h2>
<p>Cochrane schloss 2013 insgesamt 28 Studien mit 2'306 Kindern und Erwachsenen ein. Die meisten hatten ein hohes Verzerrungsrisiko, die Ergebnisse unterschieden sich stark. Die Autor:innen fanden keinen abschliessenden Wirksamkeitsnachweis für die orale oder äusserliche Anwendung. Auch unerwünschte Ereignisse wurden berichtet.</p>
<p>Eine Übersicht von 2025 beschränkte sich auf registrierte randomisierte Studien und schloss sieben Untersuchungen mit 862 Teilnehmenden ein. Bei äusserlicher Anwendung zeigte sich gegenüber Placebo ein Vorteil auf einer ärztlich bewerteten Hautskala, mit niedriger Evidenzsicherheit. Beim Juckreiz und bei der gesundheitsbezogenen Lebensqualität war dagegen kein statistisch klarer Unterschied nachgewiesen. In den Kräutergruppen wurden mehr unerwünschte Ereignisse berichtet. Die Autor:innen sahen nur begrenzte Grundlage für eine Änderung der Versorgung.</p>
<p>Das ist keine Aussage, dass jede Anwendung nutzlos wäre. Es reicht aber nicht für das Versprechen, Kräuter würden zuverlässig den Juckreiz stoppen oder die Haut «von innen heilen».</p>
<h2>Entscheidend ist, was du tatsächlich verbessern möchtest</h2>
<p>Ein besserer Hautscore und eine ruhigere Nacht sind nicht dasselbe. Im Gespräch sollte klar werden, ob dich vor allem Juckreiz, Schlafunterbrechungen oder sichtbare Hautveränderungen belasten. Bitte um eine Erklärung, welche Daten überhaupt zu diesem Ziel und zum vorgeschlagenen Produkt passen.</p>
<p>Für einen möglichen Verlauf kannst du notieren, wie häufig der Juckreiz deinen Schlaf unterbricht und welche Hautbehandlungen du verwendest. Ein solches Protokoll hilft bei der gemeinsamen Bewertung, ohne eine Wirkung vorauszusetzen. Wenn gleichzeitig die dermatologische Behandlung geändert wird, lässt sich eine Verbesserung nicht einfach den Kräutern zuschreiben.</p>
<h2>Bestehende Hautbehandlung erhalten</h2>
<p>Die Behandlung der Neurodermitis richtet sich nach Schwere und Verlauf. Hautpflege und verordnete Therapien gehören weiter in den dermatologischen Plan. Ein ergänzendes Produkt ist kein Anlass, sie eigenständig zu ersetzen.</p>
<p>Bei einer Kräuterberatung sollten Produktname, Bestandteile und Bezugsquelle nachvollziehbar sein. Allgemeine Informationen zu <a href="/wissen/chinesische-kraeuter-qualitaet-schweiz/">Qualität chinesischer Arzneimittel in der Schweiz</a> ersetzen die Prüfung des konkreten Präparats nicht. Risiken und Wechselwirkungen behandelt die Seite zu <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">Nebenwirkungen chinesischer Kräuter</a>.</p>
<p>Wird die Haut plötzlich deutlich schlechter, schmerzhaft oder heiss, entstehen Bläschen oder Eiterstellen oder kommt Fieber hinzu, braucht es noch am selben Tag eine ärztliche Beurteilung. Warte dann nicht auf eine Kräuterwirkung.</p>
<h2>Häufige Fragen</h2>
<h3>Sind Kräutercremes und Kräuter zum Einnehmen austauschbar?</h3>
<p>Nein. Anwendung und Zusammensetzung unterscheiden sich. Ergebnisse für eine äusserliche Zubereitung dürfen nicht als Beleg für eine orale Rezeptur verwendet werden.</p>
<h3>Kann ich damit Kortison oder andere Hautmedikamente ersetzen?</h3>
<p>Dieser Artikel begründet keinen Ersatz. Eine gewünschte Änderung gehört zur behandelnden dermatologischen Fachperson. Besprich Nebenwirkungen oder Sorgen offen, statt die Therapie selbst zu beenden.</p>
<h3>Ist Akupunktur die besser belegte Alternative?</h3>
<p>Eine allgemeine Rangliste lässt sich aus diesen Kräuterstudien nicht ableiten. Die separate Frage behandelt <a href="/wissen/akupunktur-bei-neurodermitis/">Akupunktur bei Neurodermitis</a>.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Für eine ergänzende <a href="/therapien/kraeutertherapie/">Kräuterberatung</a> kannst du über die <a href="/kontakt/">Kontaktseite</a> deine Diagnose und laufende Behandlung nennen. Das Ziel ist zuerst eine begründete Entscheidung darüber, ob überhaupt ein zusätzlicher Versuch sinnvoll ist.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.cochrane.org/evidence/CD008642_chinese-herbal-medicine-taken-mouth-or-applied-skin-atopic-eczema-children-and-adults" target="_blank" rel="noopener">Gu et al. Chinese herbal medicine for atopic eczema. Cochrane Database of Systematic Reviews, 2013. CD008642. (Cochrane-Zusammenfassung und Abstract)</a></li>
<li><a href="https://onlinelibrary.wiley.com/doi/abs/10.1155/dth/9920370" target="_blank" rel="noopener">Coyle et al. Chinese Herbal Medicine for Atopic Dermatitis: A Systematic Review of Registered Randomised Controlled Trials. Dermatologic Therapy, 2025. Article 9920370. DOI 10.1155/dth/9920370. (Abstract über Crossref; Verlagsseite beim Abruf gesperrt)</a></li>
<li><a href="https://www.nhs.uk/conditions/atopic-eczema/" target="_blank" rel="noopener">NHS. Atopic eczema. Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/neurodermitis/', label: 'Neurodermitis', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-neurodermitis/', label: 'Akupunktur bei Neurodermitis', cat: 'Wissen' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'TCM-Kräuter: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-schuppenflechte',
    title: 'Chinesische Kräuter bei Schuppenflechte: Was ist belegt?',
    metaDesc: 'Chinesische Kräuter bei Schuppenflechte: Studien zu oralen Rezepturen, Grenzen der Ergebnisse und wichtige Fragen zur ergänzenden dermatologischen Behandlung.',
    region: 'Schweizweit',
    excerpt: 'Du möchtest zusätzlich zu deiner Hautbehandlung etwas gegen Schuppenflechte tun. Zu chinesischen Kräutern gibt es Studien mit positiven Ergebnissen. Sie belegen aber weder eine Heilung noch, dass jede Rezeptur zu jeder Psoriasis passt.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Schuppenflechte: Was bringt die ergänzende Behandlung?',
    lead: 'Du möchtest zusätzlich zu deiner Hautbehandlung etwas gegen Schuppenflechte tun. Zu chinesischen Kräutern gibt es Studien mit positiven Ergebnissen. Sie belegen aber weder eine Heilung noch, dass jede Rezeptur zu jeder Psoriasis passt.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Kräuterberatung bei Schuppenflechte anfragen',
    ctaText: 'Nenne deine Hautdiagnose und die laufenden Therapien. Wir klären, welche Fachperson eine ergänzende Beratung übernehmen kann. Die dermatologische Behandlung bleibt dabei Teil der Entscheidung.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_N,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Für einzelne chinesische Kräuterpräparate gibt es Hinweise auf bessere Hautwerte bei Psoriasis vulgaris. Die untersuchten Mischungen und die Qualität der Studien unterscheiden sich jedoch stark. Daraus entsteht keine allgemeine Empfehlung und kein Grund, eine wirksame dermatologische Behandlung selbst abzusetzen.</p>
<p>Für das Beschwerdebild und die medizinische Abklärung bleibt die Seite zu <a href="/beschwerden/schuppenflechte/">Schuppenflechte</a> zuständig. Hier geht es um die zusätzliche Entscheidung für oder gegen eine orale Kräuterrezeptur.</p>
<h2>Was der Placebovergleich zeigt</h2>
<p>Eine 2017 veröffentlichte systematische Übersicht schloss sieben randomisierte Studien zu oralen chinesischen Kräutern gegenüber Placebo ein. Keine Studie verwendete dieselbe Mischung wie eine andere. Bei einem zusammengefassten Mass für deutliche Hautbesserung war der Vorteil statistisch nicht klar gesichert. Andere Auswertungen zu Hautscores zeigten Vorteile, waren aber ausgesprochen uneinheitlich.</p>
<p>Die Autor:innen sahen möglichen Nutzen, begrenzten ihre Schlussfolgerungen jedoch wegen unterschiedlicher Präparate, Messgrössen und Studienqualität. Das rechtfertigt keine pauschale Aussage wie «chinesische Kräuter wirken gegen Psoriasis». Ein Ergebnis für einen bestimmten Hautscore ist zudem kein Nachweis für dauerhafte Beschwerdefreiheit oder weniger Rückfälle.</p>
<h2>Ergänzung und Ersatz sind unterschiedliche Entscheidungen</h2>
<p>Welche Behandlung bei Psoriasis infrage kommt, hängt unter anderem von Art, Schwere und betroffenen Stellen ab. Die dermatologischen Möglichkeiten reichen von Hautpräparaten über Lichtbehandlung bis zu systemischen Therapien.</p>
<p>Wenn du Kräuter erwägst, sollte klar sein, was zusätzlich erreicht werden soll. Eine Rezeptur als Ergänzung zu einer laufenden Therapie ist eine andere Fragestellung als ein Ersatz. Auch Forschung zu einer Kombination beweist nicht, dass die Kräuter allein denselben Nutzen hätten.</p>
<p>Notiere vor der Beratung, welche Hautstellen besonders belasten und ob Juckreiz, Schmerzen oder der Alltag im Vordergrund stehen. Bitte die Fachperson, den vorgeschlagenen Versuch mit einem konkreten Prüfziel zu verbinden. Ein Fotoverlauf kann im Gespräch hilfreich sein; er ersetzt keine medizinische Bewertung.</p>
<h2>Die vollständige Medikamentenliste gehört dazu</h2>
<p>Bringe auch Lichttherapie, Spritzen, Tabletten und äusserliche Mittel zur Sprache. Unter bestimmten Medikamenten kann eine zusätzliche Kräutereinnahme problematisch sein. Bei <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-immunsuppressiva/">Immunsuppressiva</a> braucht es deshalb eine konkrete Abstimmung mit Behandlungsteam und Apotheke. Die dortige Information ersetzt nicht die Prüfung deiner Mischung.</p>
<p>Lass dir die Bestandteile und den Bezugsweg erklären. Die <a href="/wissen/chinesische-kraeuter-qualitaet-schweiz/">Qualität chinesischer Arzneimittel</a> ist eine eigene Frage neben der Wirksamkeit. Eine nachvollziehbare Herstellung allein beweist noch keinen Nutzen bei Schuppenflechte.</p>
<h2>Welche Beschwerden zuerst medizinisch beurteilt werden müssen</h2>
<p>Wiederkehrende Gelenkschmerzen, Schwellungen oder Steifigkeit sollten ärztlich abgeklärt werden. Sie können auf eine <a href="/beschwerden/psoriasis-arthritis/">Psoriasis-Arthritis</a> hinweisen, für die Hautstudien keine Behandlungsempfehlung liefern.</p>
<p>Wenn die Haut rasch stark rot wird, ausgedehnte eitrige Pusteln entstehen oder Fieber und deutliches Krankheitsgefühl hinzukommen, ist eine sofortige medizinische Beurteilung auf einer Notfallstation nötig. Bei schwerem Allgemeinzustand 144 wählen. Das ist keine Situation, um erst einen ergänzenden Versuch abzuwarten.</p>
<h2>Häufige Fragen</h2>
<h3>Sind chinesische Kräuter eine Alternative zu Biologika?</h3>
<p>Die hier besprochene Übersicht belegt keine Gleichwertigkeit. Ein gewünschter Wechsel gehört in die dermatologische Betreuung und darf nicht allein aus einem positiven Kräuterergebnis abgeleitet werden.</p>
<h3>Gilt das auch für Psoriasis-Arthritis?</h3>
<p>Nein. Dieser Artikel behandelt die Kräuterentscheidung bei Plaque-Psoriasis der Haut. Eine Gelenkbeteiligung ist eine eigene Erkrankungs- und Behandlungsfrage.</p>
<h3>Welche Mischung ist die wirksamste?</h3>
<p>Die Unterschiede zwischen Studien erlauben keine zuverlässige Rangliste für deinen Fall. Frage nach der Begründung für das konkret vorgeschlagene Produkt, statt nach einem allgemeinen «Psoriasis-Kraut» zu suchen.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Über die <a href="/kontakt/">Kontaktseite</a> kannst du eine Beratung zur <a href="/therapien/kraeutertherapie/">Kräutertherapie</a> anfragen. Nenne dabei deine bisherige Behandlung. Ob eine Ergänzung vertretbar und sinnvoll ist, muss vor einer Einnahme geklärt sein.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/27366921/" target="_blank" rel="noopener">Parker et al. Oral Chinese herbal medicine versus placebo for psoriasis vulgaris: A systematic review. Journal of Dermatological Treatment, 2017. PMID 27366921. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/psoriasis/" target="_blank" rel="noopener">NHS. Psoriasis. Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/schuppenflechte/', label: 'Schuppenflechte', cat: 'Beschwerde' },
      { href: '/beschwerden/psoriasis-arthritis/', label: 'Psoriasis-Arthritis', cat: 'Beschwerde' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-immunsuppressiva/', label: 'TCM-Kräuter unter Immunsuppressiva', cat: 'Frage' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-endometriose',
    title: 'Chinesische Kräuter bei Endometriose: Nutzen und Grenzen',
    metaDesc: 'Chinesische Kräuter bei Endometriose: Was Studien zu Schmerzen zeigen, weshalb Kombinationen keine Einzelwirkung beweisen und was du vor Beginn klären solltest.',
    region: 'Schweizweit',
    excerpt: 'Du möchtest Schmerzen besser bewältigen und suchst eine zusätzliche Möglichkeit zur gynäkologischen Behandlung. Chinesische Kräuter werden bei Endometriose eingesetzt. Die Studienlage trägt jedoch keine Heilungs- oder Fruchtbarkeitsversprechen.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Endometriose: Was lässt sich realistisch erwarten?',
    lead: 'Du möchtest Schmerzen besser bewältigen und suchst eine zusätzliche Möglichkeit zur gynäkologischen Behandlung. Chinesische Kräuter werden bei Endometriose eingesetzt. Die Studienlage trägt jedoch keine Heilungs- oder Fruchtbarkeitsversprechen.',
    readingTime: '3 Min.',
    ctaTitle: 'Kräuterberatung bei Endometriose anfragen',
    ctaText: 'Schildere dein Behandlungsziel und die laufende gynäkologische Therapie. Wir prüfen, welche Fachperson eine ergänzende Beratung übernehmen kann. Geplante Eingriffe oder eine Kinderwunschbehandlung bitte vorab nennen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_N,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Es gibt Hinweise auf eine mögliche Schmerzlinderung durch einzelne chinesische Kräuterbehandlungen. Wie zuverlässig dieser Nutzen ist und auf welche Rezepturen er sich übertragen lässt, bleibt begrenzt geklärt. Aus den Studien lässt sich nicht ableiten, dass Kräuter Endometrioseherde beseitigen oder eine Schwangerschaft wahrscheinlicher machen.</p>
<p>Die Diagnose und die gynäkologische Behandlung gehören zur Seite <a href="/beschwerden/endometriose/">Endometriose</a>. Die Entscheidung über Nadeln behandelt <a href="/wissen/akupunktur-bei-endometriose/">Akupunktur bei Endometriose</a>.</p>
<h2>Was die älteren kontrollierten Studien hergeben</h2>
<p>Die Cochrane-Übersicht von 2012 enthielt zwei chinesische Studien mit insgesamt 158 Frauen und operativ bestätigter Endometriose. Verglichen wurden Kräuterbehandlungen mit Gestrinon oder Danazol, nicht mit Placebo. Ein Teil der Anwendungen fand nach einer Operation statt; teilweise wurden zusätzlich Kräutereinläufe eingesetzt.</p>
<p>Die Ergebnisse lieferten Hinweise auf Nutzen bei bestimmten Schmerzen, waren aber wegen kleiner Studien und begrenzter Qualität vorsichtig zu interpretieren. Ein nicht nachgewiesener Unterschied zu einem Medikament belegt keine Gleichwertigkeit. Die Ergebnisse sind auch keine Grundlage, heute jede orale Rezeptur als Alternative zur aktuellen Behandlung zu empfehlen.</p>
<h2>Warum auch neuere Kombinationen genau gelesen werden müssen</h2>
<p>Eine Übersicht von 2025 prüfte Akupunktur zusammen mit Kräutern gegenüber Kräutern allein. Solche Untersuchungen können eine Frage zur zusätzlichen Nadelbehandlung beantworten. Sie zeigen aber nicht, wie gut die Kräuter selbst gegenüber Placebo oder einer gynäkologischen Standardbehandlung wirken. Eine Meta-Analyse von 2025 mit elf Studien und 1'401 Teilnehmerinnen berichtet unter Kräuterbehandlungen weniger Regelschmerzen und weniger Schmerzen beim Geschlechtsverkehr, bei stark uneinheitlichen Studien und ohne klaren Effekt auf Beckenschmerzen; welche Präparate dort eingeschlossen wurden, liess sich nur auf Abstract-Ebene prüfen.</p>
<p>Für deine Entscheidung zählt daher nicht allein, ob ein Artikel positive Ergebnisse nennt. Entscheidend ist, ob die untersuchte Behandlung mit dem vorgeschlagenen Vorgehen vergleichbar ist. Eine Kombination, eine Anwendung nach einer Operation und eine einzelne orale Rezeptur sind keine austauschbaren Verfahren.</p>
<h2>Schmerzen, Herde und Kinderwunsch nicht gleichsetzen</h2>
<p>Ein niedrigerer Schmerzscore ist wichtig, bedeutet aber nicht, dass Endometriose verschwunden ist. Auch weniger Schmerzen, weniger Rückfälle und eine Lebendgeburt sind unterschiedliche Ziele. Bitte um eine klare Erklärung, welches Ziel mit einer zusätzlichen Behandlung überhaupt verfolgt wird.</p>
<p>Die gynäkologischen Optionen richten sich auch danach, ob aktuell ein Kinderwunsch besteht. Hormonelle Behandlungen, Schmerzbehandlung und Operationen werden individuell besprochen. Eine Kräuterberatung darf diese Entscheidung nicht verzögern. Die Forschung zu <a href="/wissen/chinesische-kraeuter-bei-regelschmerzen/">primären Regelschmerzen</a> ist zudem nicht automatisch auf Endometriose übertragbar.</p>
<h2>Was vor der Beratung auf den Tisch gehört</h2>
<p>Bringe Befunde, einen vorhandenen Operationsbericht, deine Medikamentenliste und den Verlauf der Beschwerden mit. Wenn du bereits einen Termin für einen Eingriff oder eine Kinderwunschbehandlung hast, soll das vor der Rezepturentscheidung bekannt sein.</p>
<p>Bei einer geplanten Operation gehören alle Präparate in das Vorbereitungsgespräch. Wer eine Pause und den Wiederbeginn festlegt, erklärt <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-vor-operation/">TCM-Kräuter vor einer Operation</a>. Für eine Einnahme parallel zu Hormonen oder anderen Medikamenten ist eine konkrete Prüfung erforderlich; dieser Artikel gibt keine Kombination frei.</p>
<p>Vereinbart ein nachvollziehbares Prüfziel. Ein Symptomtagebuch kann helfen, Alltag, Schmerzen und Einnahmen zu besprechen. Eine vorab versprochene Zahl von Zyklen bis zum Erfolg wäre durch die genannten Daten nicht gedeckt.</p>
<h2>Häufige Fragen</h2>
<h3>Können chinesische Kräuter Endometriose heilen?</h3>
<p>Aus der hier besprochenen Forschung lässt sich kein Heilungsnachweis ableiten. Eine ergänzende Entscheidung betrifft mögliche Beschwerden, nicht die Zusage, dass die Erkrankung verschwindet.</p>
<h3>Sind die Ergebnisse auf Adenomyose übertragbar?</h3>
<p>Nein. Eine andere Diagnose braucht eine eigene Bewertung. Die allgemeinen Unterschiede erklärt die Seite zu <a href="/beschwerden/adenomyose/">Adenomyose</a>.</p>
<h3>Kann ich Kräuter statt meiner Hormonbehandlung nehmen?</h3>
<p>Die Studien begründen keinen eigenständigen Austausch. Besprich Wünsche und Nebenwirkungen mit deiner gynäkologischen Fachperson. Wenn eine Ergänzung erwogen wird, müssen beide Behandelnden den vollständigen Plan kennen.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Eine Anfrage zur <a href="/therapien/kraeutertherapie/">Kräuterberatung</a> kannst du über die <a href="/kontakt/">Kontaktseite</a> stellen. Nenne, was du erreichen möchtest und welche gynäkologische Behandlung bereits läuft. Zuerst wird geklärt, ob eine zusätzliche Beratung für deine Situation passt.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.cochrane.org/evidence/CD006568_chinese-herbs-endometriosis" target="_blank" rel="noopener">Flower et al. Chinese herbal medicine for endometriosis. Cochrane Database of Systematic Reviews, 2012. CD006568. (Cochrane-Zusammenfassung und Abstract)</a></li>
<li><a href="https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2025.1649980/full" target="_blank" rel="noopener">Xu et al. Acupuncture combined with Chinese herbal medicine versus Chinese herbal medicine alone to improve clinical efficacy in treating endometriosis-associated pain: a systematic review and meta-analysis. Frontiers in Medicine, 2025. DOI 10.3389/fmed.2025.1649980. (Verlagsvolltext und Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/endometriosis/" target="_blank" rel="noopener">NHS. Endometriosis. Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nhs.uk/tests-and-treatments/herbal-medicines-and-complementary-therapies/" target="_blank" rel="noopener">NHS. Herbal medicines and complementary therapies. Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/41268238/" target="_blank" rel="noopener">Efficacy and safety of traditional Chinese medicine for endometriosis-related pain: a meta-analysis. 2025. PMID 41268238. (PubMed-Abstract; Volltext nicht abrufbar)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/endometriose/', label: 'Endometriose', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-endometriose/', label: 'Akupunktur bei Endometriose', cat: 'Wissen' },
      { href: '/wissen/chinesische-kraeuter-bei-regelschmerzen/', label: 'Chinesische Kräuter bei Regelschmerzen', cat: 'Wissen' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-vor-operation/', label: 'TCM-Kräuter vor einer Operation', cat: 'Frage' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-pcos',
    title: 'Chinesische Kräuter bei PCOS und Kinderwunsch: Evidenz',
    metaDesc: 'Chinesische Kräuter bei PCOS und Kinderwunsch: Was die Forschung zu Schwangerschaft und Lebendgeburt aussagt und was vor einer ergänzenden Beratung wichtig ist.',
    region: 'Schweizweit',
    excerpt: 'Du möchtest bei PCOS deinen Kinderwunsch unterstützen und überlegst, chinesische Kräuter einzunehmen. Gerade hier lohnt es sich, genau hinzusehen: Ein regelmässigerer Zyklus, ein Eisprung und eine Lebendgeburt sind unterschiedliche Ergebnisse.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei PCOS und Kinderwunsch: Was zeigen die Studien?',
    lead: 'Du möchtest bei PCOS deinen Kinderwunsch unterstützen und überlegst, chinesische Kräuter einzunehmen. Gerade hier lohnt es sich, genau hinzusehen: Ein regelmässigerer Zyklus, ein Eisprung und eine Lebendgeburt sind unterschiedliche Ergebnisse.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Kräuterberatung bei PCOS besprechen',
    ctaText: 'Nenne deine PCOS-Diagnose, aktuelle Medikamente und eine allfällige Kinderwunschbehandlung. Wir klären, welche Fachperson die Beratung übernehmen kann. Eine Verbesserung der Schwangerschaftschance wird nicht zugesagt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_N,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Für chinesische Kräuter bei PCOS mit Kinderwunsch fehlt ein verlässlicher Nachweis, dass sie die Chance auf eine Lebendgeburt erhöhen. Einzelne Studien berichten andere günstige Ergebnisse. Sie beantworten aber nicht automatisch die für dich wichtigste Frage: ob am Ende häufiger ein Kind geboren wird.</p>
<p>Die allgemeinen Grundlagen findest du auf der Seite zu <a href="/beschwerden/pcos/">PCOS</a>. Der Überblick <a href="/wissen/pcos-akupunktur-tcm/">PCOS und TCM</a> ordnet weitere Methoden ein. Dieser Artikel konzentriert sich auf Kräuter bei bestehendem Kinderwunsch.</p>
<h2>Was Cochrane geprüft hat</h2>
<p>Die 2021 veröffentlichte Cochrane-Übersicht berücksichtigte acht randomisierte Studien mit 609 Frauen mit PCOS und eingeschränkter Fruchtbarkeit. Die Suche reichte bis Juni 2020. Untersucht wurden unterschiedliche Kräuterbehandlungen, allein oder zusätzlich zu medizinischen Verfahren.</p>
<p>Keine der eingeschlossenen Studien berichtete die Lebendgeburtenrate. Schwangerschaft wurde zwar erfasst, Nebenwirkungen aber nur in einer Studie. Die Evidenzsicherheit war niedrig bis sehr niedrig. Für einzelne Kombinationen gab es Hinweise auf mehr Schwangerschaften, insgesamt jedoch keine verlässliche Grundlage für eine Empfehlung. Eine allgemein sichere Anwendung wurde damit ebenfalls nicht nachgewiesen.</p>
<p>Das betrifft eine konkrete Gruppe und Fragestellung. Die Übersicht sagt nicht, ob jede andere PCOS-Beschwerde auf Kräuter anspricht. Umgekehrt darf eine Verbesserung eines Laborwerts nicht als Beleg für höhere Fruchtbarkeit ausgegeben werden.</p>
<h2>Vor einer Rezeptur das Ziel klar benennen</h2>
<p>Frage im Gespräch ausdrücklich, welches Ergebnis angestrebt und wie es überprüft werden soll. Geht es um Beschwerden während einer bereits laufenden Kinderwunschbehandlung oder um die Hoffnung, eine solche Behandlung zu ersetzen? Diese Unterscheidung muss vor der Einnahme geklärt sein.</p>
<p>«Den Zyklus regulieren» ist als alleinige Begründung zu ungenau. Ein Blutungsereignis ist noch keine Aussage über Eisprung, Schwangerschaft oder Lebendgeburt. Bitte darum, Nutzen und Unsicherheit in verständlichen Worten zu besprechen, ohne aus einem Zwischenwert einen Behandlungserfolg abzuleiten.</p>
<h2>Laufende Behandlung vollständig angeben</h2>
<p>Die Kräuterberatung soll nicht parallel im Unwissen über den gynäkologischen Plan stattfinden. Bringe Befunde, Medikamentenliste und gegebenenfalls den Ablauf deiner Kinderwunschklinik mit. Geplante Änderungen und bereits gekaufte Produkte gehören ebenfalls ins Gespräch.</p>
<p>Wenn du Metformin oder andere Medikamente einnimmst, lass ein geplantes Kräuterprodukt vor Beginn durch Apotheke und Behandlungsteam prüfen. Eine zusätzliche Einnahme kann Wechselwirkungen verursachen. Eine neue Rezeptur während einer Stimulation sollte nicht ohne Abstimmung begonnen werden. Das ist eine Frage des gemeinsamen Behandlungsplans, keine Freigabe durch diesen Artikel.</p>
<p>Ein schriftlicher <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/">Einnahmeplan für TCM-Kräuter</a> macht Bestandteile, Anwendung und Ansprechpartner nachvollziehbar. Er ist jedoch kein Wirksamkeitsnachweis. Auch Herkunft und <a href="/wissen/chinesische-kraeuter-qualitaet-schweiz/">Qualität der Präparate</a> müssen von der Frage nach einem Nutzen getrennt werden.</p>
<h2>Welche Erwartung seriös ist</h2>
<p>Eine Beratung kann die Möglichkeiten und Grenzen einer Ergänzung klären. Sie kann auch ergeben, dass aktuell keine Rezeptur empfohlen wird. Eine versprochene Schwangerschaft, eine fest zugesagte Zahl von Zyklen oder ein angeblich notwendiges Kräuterpaket lassen sich aus der genannten Übersicht nicht rechtfertigen.</p>
<p>Wenn du allgemeine Fragen zu einer Begleitung hast, findest du die Abgrenzung unter <a href="/wissen/kinderwunsch-akupunktur-tcm/">Kinderwunsch und TCM</a>. Dieser Artikel begründet keine Verzögerung einer ärztlich empfohlenen Fruchtbarkeitsabklärung.</p>
<h2>Häufige Fragen</h2>
<h3>Können chinesische Kräuter meine Schwangerschaftschance erhöhen?</h3>
<p>Die Daten reichen nicht für eine verlässliche persönliche Zusage. Besonders wichtig ist, dass in der genannten Übersicht keine Studie die Lebendgeburtenrate berichtete.</p>
<h3>Kann ich damit Metformin oder eine Stimulation ersetzen?</h3>
<p>Die beschriebenen Studien begründen keinen eigenständigen Ersatz. Wenn du eine Änderung möchtest, besprich sie mit deiner behandelnden gynäkologischen oder endokrinologischen Fachperson.</p>
<h3>Ist eine natürliche Rezeptur bei Kinderwunsch automatisch unbedenklich?</h3>
<p>Nein. Die genaue Zusammensetzung und die laufende Behandlung müssen geprüft werden. Eine Anwendung nach Eintritt einer Schwangerschaft braucht eine neue medizinische Beurteilung und ist durch diesen Artikel nicht freigegeben.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Über die <a href="/kontakt/">Kontaktseite</a> kannst du eine <a href="/therapien/kraeutertherapie/">Kräuterberatung</a> anfragen. Nenne PCOS, Kinderwunsch und die bereits beteiligte Praxis oder Klinik, damit die Beratung mit dem bestehenden Plan abgestimmt werden kann.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.cochrane.org/evidence/CD007535_chinese-herbal-medicines-subfertile-women-polycystic-ovarian-syndrome" target="_blank" rel="noopener">Zhou et al. Chinese herbal medicines for subfertile women with polycystic ovarian syndrome. Cochrane Database of Systematic Reviews, 2021. CD007535. (Cochrane-Zusammenfassung und Abstract)</a></li>
<li><a href="https://www.nhs.uk/tests-and-treatments/herbal-medicines-and-complementary-therapies/" target="_blank" rel="noopener">NHS. Herbal medicines and complementary therapies. Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/pcos/', label: 'PCOS', cat: 'Beschwerde' },
      { href: '/wissen/pcos-akupunktur-tcm/', label: 'PCOS und TCM', cat: 'Wissen' },
      { href: '/wissen/kinderwunsch-akupunktur-tcm/', label: 'Kinderwunsch und TCM', cat: 'Wissen' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-einnahme/', label: 'TCM-Kräuter einnehmen: Einnahmeplan', cat: 'Frage' },
    ],
  },
];
