// Artikelreihe "Akupunktur bei X".
//
// Warum als eigene Datei: wissen.ts ist bereits ~290 KB. Neue Reihen kommen hier rein und
// werden in wissen.ts angehängt, damit die Basisdatei nicht weiter wächst.
//
// Auswahl nach Suchvolumen CH x Difficulty (Semrush, 09/2026):
//   akupunktur heuschnupfen 210 / KD 8 · akupunktur abnehmen 140 / KD 21
//   akupunktur kinderwunsch 110 / KD 9 · akupunktur kopfschmerzen 110 / KD 15
//   akupunktur migräne 110 / KD 16
//
// Kopfschmerzen und Migräne bewusst getrennt: Cochrane führt dafür zwei eigene Reviews,
// und die Beschwerdebilder unterscheiden sich klinisch. Damit sich die beiden Seiten nicht
// kannibalisieren (wie es dauernadeln-akupunktur und wie-lange-bleiben-akupunkturnadeln-drin
// getan haben), zielt die eine strikt auf Spannungskopfschmerz, die andere strikt auf Migräne.
//
// Alle Studienangaben sind vor dem Schreiben gegen die Primärquelle geprüft worden.
import type { Wissen } from './wissen';

const AUTOR = {
  name: 'Corinna Reinhart',
  role: 'TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen',
  bio: 'Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen.',
};

const DATEN = { datePublished: '2026-09-02', dateModified: '2026-09-02', lastReviewed: '2026-09-02' };

export const wissenAkupunkturBei: Wissen[] = [
  // ───────────────────────────────────────────────────────── HEUSCHNUPFEN
  {
    slug: 'akupunktur-bei-heuschnupfen',
    title: 'Akupunktur bei Heuschnupfen: Was die Studien zeigen',
    metaDesc: 'Hilft Akupunktur bei Heuschnupfen? Was die grösste Studie dazu ergeben hat, wann du mit der Behandlung beginnen solltest und was sie realistisch leisten kann.',
    region: 'Schweizweit',
    excerpt: 'Für Akupunktur bei saisonalem Heuschnupfen gibt es eine der besten Studien im ganzen Feld. Was sie zeigt und was nicht.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Heuschnupfen: Was die Studien wirklich zeigen',
    lead: 'Heuschnupfen ist eines der wenigen Themen, bei denen die Studienlage zur Akupunktur ungewöhnlich solide ist. Das Ergebnis ist trotzdem differenzierter, als es die meisten Praxis-Websites darstellen. Hier steht, was tatsächlich gemessen wurde, wann eine Behandlung sinnvoll beginnt und wann du besser bei deinem Antihistaminikum bleibst.',
    readingTime: '8 Min.',
    ctaTitle: 'Heuschnupfen behandeln lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN,
    bodyHtml: `<p>Wer im Frühling regelmässig mit juckenden Augen und verstopfter Nase durch die Pollensaison geht, hat meist schon einiges probiert. Antihistaminika helfen zuverlässig, machen aber müde. Kortisonspray wirkt, wird aber ungern über Monate genommen. Die Frage, ob Akupunktur eine sinnvolle Ergänzung ist, kommt bei uns jedes Jahr ab Februar auf.</p>
<h2>Die Studie, um die es geht</h2>
<p>Die aussagekräftigste Untersuchung dazu ist die deutsche ACUSAR-Studie, veröffentlicht 2013 in den <em>Annals of Internal Medicine</em> (<a href="https://pubmed.ncbi.nlm.nih.gov/23420231/" target="_blank" rel="noopener">Brinkhaus et al., 2013</a>). 422 Patientinnen und Patienten mit saisonalem Heuschnupfen wurden in drei Gruppen aufgeteilt: echte Akupunktur, Schein-Akupunktur an nicht wirksamen Punkten, und eine Gruppe, die ausschliesslich ein Antihistaminikum bei Bedarf bekam.</p>
<p>Nach acht Wochen ging es der Akupunkturgruppe messbar besser als beiden Vergleichsgruppen: weniger Beschwerden und ein geringerer Verbrauch an Notfallmedikation. Der Unterschied war statistisch klar.</p>
<div class="wa-callout"><div class="wa-callout-label">Der Haken</div><p>Der Unterschied zur Schein-Akupunktur war zwar vorhanden, aber klein. Und im Nachbeobachtungszeitraum nach der Pollensaison verlor er sich weitgehend. Akupunktur wirkt hier also, aber sie ist keine Kur, die einen Sommer lang trägt.</p></div>
<h2>Was das praktisch bedeutet</h2>
<p>Realistisch formuliert: Akupunktur kann die Beschwerden während der Saison dämpfen und den Bedarf an Medikamenten senken. Sie ersetzt weder die Notfallmedikation noch eine Hyposensibilisierung, wenn deine Allergie schwer verläuft. Wer Asthma hat oder auf mehrere Pollen gleichzeitig reagiert, gehört ohnehin in allergologische Abklärung.</p>
<p>Was sie kann: einen Teil des Leidensdrucks nehmen, sodass die Saison erträglicher wird. Was sie nicht kann: die Allergie beseitigen. Wer dir das verspricht, hat die Studien nicht gelesen.</p>
<h2>Wann anfangen?</h2>
<p>Die meisten Patient:innen kommen zu spät, nämlich dann, wenn die Nase schon eine Woche läuft. Sinnvoller ist der Start etwa vier bis sechs Wochen vor deiner üblichen Saison. Bei Birkenpollen heisst das in der Schweiz je nach Höhenlage Anfang bis Mitte Februar, bei Gräsern eher im April.</p>
<p>Üblich ist eine Serie von acht bis zwölf Behandlungen über die Saison, zu Beginn ein- bis zweimal pro Woche, später in grösseren Abständen. Wenn sich nach fünf bis sechs Terminen gar nichts tut, sagen wir dir das, statt die Serie einfach durchzuziehen.</p>
<h2>Wie eine Behandlung abläuft</h2>
<p>Genadelt wird meist an Punkten im Gesicht, an den Händen und Unterarmen. Die Behandlung dauert 20 bis 30 Minuten, mit Gespräch planst du 45 bis 60 Minuten ein. Häufig kombinieren wir mit <a href="/therapien/kraeutertherapie/">Kräutertherapie</a>, weil sich der Zeitraum damit besser überbrücken lässt.</p>
<p>Was du weiterhin nimmst, entscheidest du. Wir raten niemandem, ein Medikament abzusetzen — schon gar nicht bei einer Allergie, die sich zu Asthma auswachsen kann.</p>
<h2>Kosten und Krankenkasse</h2>
<p>Bei EMR- und ASCA-anerkannten Therapeut:innen beteiligt sich deine Zusatzversicherung in der Regel mit 70 bis 90 Prozent pro Sitzung. Eine ärztliche Verordnung brauchst du nicht. Die Details stehen unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur wirklich bei Heuschnupfen?', a: 'Die ACUSAR-Studie mit 422 Teilnehmenden zeigte nach acht Wochen weniger Beschwerden und einen geringeren Medikamentenbedarf als in den Vergleichsgruppen. Der Unterschied zur Schein-Akupunktur war allerdings klein und hielt nach der Saison nicht an. Akupunktur kann die Saison erträglicher machen, sie beseitigt die Allergie nicht.' },
      { q: 'Wann sollte ich mit der Behandlung beginnen?', a: 'Etwa vier bis sechs Wochen vor deiner üblichen Saison. Bei Birkenpollen also im Februar, bei Gräsern eher im April. Wer erst anfängt, wenn die Nase schon läuft, verschenkt einen Teil der Wirkung.' },
      { q: 'Wie viele Sitzungen brauche ich?', a: 'Üblich sind acht bis zwölf Behandlungen über die Saison, zu Beginn ein- bis zweimal pro Woche. Tut sich nach fünf bis sechs Terminen nichts, besprechen wir Alternativen statt weiterzumachen.' },
      { q: 'Kann ich meine Allergietabletten weglassen?', a: 'Das entscheidest du zusammen mit deiner Ärztin, nicht mit uns. Wir raten grundsätzlich nicht dazu, Medikamente abzusetzen. Viele brauchen im Verlauf weniger, das ergibt sich von selbst.' },
      { q: 'Übernimmt die Krankenkasse die Behandlung?', a: 'Bei EMR- oder ASCA-anerkannten Therapeut:innen beteiligt sich die Zusatzversicherung in der Regel mit 70 bis 90 Prozent pro Sitzung. Die Grundversicherung übernimmt Akupunktur nur bei Ärzt:innen mit entsprechender Weiterbildung.' },
    ],
    related: [
      { href: '/beschwerden/heuschnupfen/', label: 'Heuschnupfen', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/krankenkassen/akupunktur/', label: 'Kosten & Krankenkasse', cat: 'Kosten' },
    ],
  },

  // ─────────────────────────────────────────────────────────────── MIGRÄNE
  {
    slug: 'akupunktur-bei-migraene',
    title: 'Akupunktur bei Migräne: Studienlage und Ablauf',
    metaDesc: 'Akupunktur zur Migräneprophylaxe: Was der Cochrane-Review zeigt, wie viele Attacken realistisch wegfallen, wie viele Sitzungen nötig sind und wann du neurologisch abklären musst.',
    region: 'Schweizweit',
    excerpt: 'Migräne gehört zu den am besten untersuchten Anwendungen der Akupunktur. Was der Cochrane-Review dazu sagt.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Migräne: Was sie leisten kann',
    lead: 'Migräne ist eine der wenigen Indikationen, für die Akupunktur in grossen Übersichtsarbeiten ordentlich abschneidet. Die Zahlen sind allerdings nüchterner, als viele erwarten. Hier steht, wie viele Attacken realistisch wegfallen, wie eine Serie aufgebaut ist und wann du zuerst in die Neurologie gehörst.',
    readingTime: '9 Min.',
    ctaTitle: 'Migräne behandeln lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN,
    bodyHtml: `<p>Wer regelmässig Migräne hat, kennt die Rechnung: Wie viele Tage im Monat gehen verloren, und was ist man bereit dafür zu tun, dass es zwei oder drei weniger werden. Genau in dieser Grössenordnung bewegt sich das, was Akupunktur belegbar leistet.</p>
<h2>Was der Cochrane-Review zeigt</h2>
<p>Die massgebliche Übersichtsarbeit ist der Cochrane-Review zur Migräneprophylaxe (<a href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001218.pub3/full" target="_blank" rel="noopener">Linde et al., 2016</a>), der 22 Studien mit knapp 5.000 Teilnehmenden auswertete.</p>
<p>Die Kernaussagen: Akupunktur reduziert die Häufigkeit von Migräneattacken deutlicher als keine prophylaktische Behandlung. Gegenüber Schein-Akupunktur bleibt ein kleiner, aber messbarer Vorteil. Und im Vergleich mit medikamentöser Prophylaxe schneidet Akupunktur mindestens gleichwertig ab — bei weniger Nebenwirkungen und weniger Therapieabbrüchen.</p>
<div class="wa-pullquote">Die Grössenordnung: In den Studien halbierte sich die Zahl der Kopfschmerztage bei etwa der Hälfte der Behandelten. Unter Schein-Akupunktur schaffte das gut ein Drittel.</div>
<p>Dieser Abstand zwischen echter und Schein-Akupunktur ist der ehrliche Kern der Debatte. Ein grosser Teil des Effekts entsteht offenbar unabhängig davon, wo genau genadelt wird. Ein Teil aber eben nicht.</p>
<h2>Was das für dich bedeutet</h2>
<p>Akupunktur ist eine Prophylaxe, kein Akutmittel. Sie soll die Attacken seltener machen, nicht eine laufende Attacke stoppen. Dein Triptan bleibt dein Triptan.</p>
<p>Sinnvoll ist der Versuch besonders dann, wenn du medikamentöse Prophylaxe nicht verträgst, sie nicht nehmen willst oder wenn sie zu wenig gebracht hat. Auch in der Schwangerschaft, wo viele Prophylaktika wegfallen, ist Akupunktur eine der wenigen verbleibenden Optionen.</p>
<h2>Wie eine Serie aussieht</h2>
<p>Üblich sind acht bis zwölf Sitzungen über sechs bis acht Wochen, zu Beginn zweimal wöchentlich. Eine Wirkung zeigt sich selten sofort; die Studien messen typischerweise nach acht Wochen. Wir führen mit dir ein einfaches Kopfschmerztagebuch, sonst lässt sich hinterher nicht sagen, ob es besser geworden ist oder ob der Monat einfach ruhiger war.</p>
<p>Nach der Serie folgen bei gutem Ansprechen Erhaltungstermine, meist alle vier bis sechs Wochen.</p>
<h2>Wann du zuerst zum Arzt gehörst</h2>
<p>Neu aufgetretene Kopfschmerzen ab etwa 50, Kopfschmerz mit Fieber oder Nackensteife, ein plötzlicher Vernichtungskopfschmerz, Kopfschmerz nach einem Sturz, Kopfschmerz mit neurologischen Ausfällen oder eine deutliche Änderung des gewohnten Musters: Das gehört abgeklärt, bevor irgendjemand eine Nadel setzt. Wir schicken dich in solchen Fällen weg, und das ist so gemeint.</p>
<p>Zur Abgrenzung: Wenn dein Kopfschmerz eher drückend, beidseitig und ohne Übelkeit auftritt, geht es vermutlich nicht um Migräne. Dazu haben wir eine eigene Seite zu <a href="/wissen/akupunktur-bei-kopfschmerzen/">Akupunktur bei Spannungskopfschmerzen</a>.</p>
<h2>Kosten und Krankenkasse</h2>
<p>Bei EMR- und ASCA-anerkannten Therapeut:innen beteiligt sich die Zusatzversicherung in der Regel mit 70 bis 90 Prozent pro Sitzung, ohne ärztliche Verordnung. Bei einer Serie von zehn Behandlungen lohnt sich vorher ein Blick auf das Jahresmaximum deiner Police. Details unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Wie gut hilft Akupunktur bei Migräne?', a: 'Im Cochrane-Review von 2016 halbierte sich die Zahl der Kopfschmerztage bei etwa der Hälfte der Behandelten, unter Schein-Akupunktur bei gut einem Drittel. Gegenüber medikamentöser Prophylaxe schnitt Akupunktur mindestens gleichwertig ab, bei weniger Nebenwirkungen.' },
      { q: 'Hilft Akupunktur während einer Attacke?', a: 'Akupunktur ist eine Prophylaxe, kein Akutmittel. Sie soll die Attacken seltener machen. Deine Akutmedikation ersetzt sie nicht.' },
      { q: 'Wie viele Sitzungen brauche ich?', a: 'Üblich sind acht bis zwölf Sitzungen über sechs bis acht Wochen, zu Beginn zweimal wöchentlich. Die Studien messen den Effekt typischerweise nach acht Wochen, vorher lässt sich wenig sagen.' },
      { q: 'Kann ich Akupunktur in der Schwangerschaft machen?', a: 'Ja, und gerade dann ist sie oft eine der wenigen verbleibenden Optionen, weil viele Prophylaktika wegfallen. Bestimmte Punkte werden dabei ausgelassen, sag uns die Schwangerschaft deshalb vor der ersten Sitzung.' },
      { q: 'Wann muss ich zuerst zum Arzt?', a: 'Bei neu aufgetretenem Kopfschmerz ab etwa 50, bei Fieber oder Nackensteife, bei plötzlichem Vernichtungskopfschmerz, nach einem Sturz, bei neurologischen Ausfällen oder wenn sich dein gewohntes Muster deutlich ändert. Das gehört abgeklärt, bevor behandelt wird.' },
    ],
    related: [
      { href: '/beschwerden/migraene/', label: 'Migräne', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-kopfschmerzen/', label: 'Spannungskopfschmerzen', cat: 'Artikel' },
      { href: '/krankenkassen/akupunktur/', label: 'Kosten & Krankenkasse', cat: 'Kosten' },
    ],
  },

  // ────────────────────────────────────────────────────────── KOPFSCHMERZEN
  {
    slug: 'akupunktur-bei-kopfschmerzen',
    title: 'Akupunktur bei Spannungskopfschmerzen: Was hilft',
    metaDesc: 'Akupunktur bei Spannungskopfschmerzen: Was der Cochrane-Review zeigt, wie sich der Kopfschmerz von Migräne unterscheidet und warum der Nacken oft der eigentliche Ort ist.',
    region: 'Schweizweit',
    excerpt: 'Spannungskopfschmerz ist der häufigste Kopfschmerz überhaupt — und einer, bei dem Akupunktur in den Studien gut abschneidet.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Spannungskopfschmerzen',
    lead: 'Der drückende, beidseitige Kopfschmerz ohne Übelkeit ist der häufigste überhaupt, und einer der wenigen, bei denen Akupunktur in einer grossen Übersichtsarbeit klar abschneidet. Hier steht, was gemessen wurde, warum wir dabei fast immer auch am Nacken arbeiten und wann Schmerzmittel selbst zum Problem werden.',
    readingTime: '8 Min.',
    ctaTitle: 'Kopfschmerzen abklären lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN,
    bodyHtml: `<p>Spannungskopfschmerz fühlt sich an wie ein zu enges Band um den Kopf. Beidseitig, drückend statt pulsierend, ohne Übelkeit, und meist so, dass man damit weiterarbeiten kann — nur eben schlechter. Genau deshalb wird er lange ausgehalten und selten behandelt.</p>
<h2>Erst die Abgrenzung</h2>
<p>Der Unterschied zur Migräne ist praktisch relevant, weil beide unterschiedlich behandelt werden. Migräne ist typischerweise einseitig, pulsierend, oft mit Übelkeit und Licht- oder Lärmempfindlichkeit, und sie zwingt zum Hinlegen. Spannungskopfschmerz ist beidseitig, drückend, ohne Übelkeit. Wenn dein Kopfschmerz eher der ersten Beschreibung entspricht, findest du das Passende unter <a href="/wissen/akupunktur-bei-migraene/">Akupunktur bei Migräne</a>.</p>
<h2>Was die Studien zeigen</h2>
<p>Der Cochrane-Review zur Prophylaxe des Spannungskopfschmerzes (<a href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007587.pub2/information" target="_blank" rel="noopener">Linde et al., 2016</a>) wertete zwölf Studien mit rund 2.350 Teilnehmenden aus.</p>
<p>Das Ergebnis fällt hier sogar etwas deutlicher aus als bei der Migräne: Rund die Hälfte der mit Akupunktur Behandelten hatte ihre Kopfschmerztage mindestens halbiert, gegenüber etwa 40 Prozent unter Schein-Akupunktur und deutlich weniger ohne Behandlung. Der Effekt hielt in den Nachbeobachtungen über mehrere Monate an.</p>
<div class="wa-callout"><div class="wa-callout-label">Einordnung</div><p>Auch hier gilt: Ein erheblicher Teil des Effekts tritt unabhängig von der genauen Punktwahl auf. Der Nutzen gegenüber gar keiner Behandlung ist trotzdem gut belegt, und die Nebenwirkungen sind gering.</p></div>
<h2>Warum wir fast immer am Nacken arbeiten</h2>
<p>Bei einem Grossteil der Patient:innen mit Spannungskopfschmerz findet sich eine deutlich verhärtete Nacken- und Schultermuskulatur, oft mit Triggerpunkten, die bei Druck genau den bekannten Kopfschmerz auslösen. Das ist kein Zufallsbefund, sondern häufig der eigentliche Ort des Geschehens.</p>
<p>Deshalb kombinieren wir Akupunktur regelmässig mit <a href="/therapien/tuina/">Tuina</a> oder einer <a href="/therapien/massage/triggerpunktmassage/">Triggerpunktmassage</a>. Wer acht Stunden am Bildschirm sitzt, bekommt zusätzlich zwei bis drei Übungen mit, weil die Nadel gegen die Sitzhaltung auf Dauer verliert.</p>
<h2>Das Thema Schmerzmittel</h2>
<p>Wer an mehr als zehn bis fünfzehn Tagen im Monat Schmerzmittel gegen Kopfschmerz nimmt, riskiert einen Medikamentenübergebrauch-Kopfschmerz: Das Mittel verursacht dann selbst, wogegen es genommen wird. Das ist häufiger, als die meisten denken, und der Ausweg führt über einen ärztlich begleiteten Entzug, nicht über Akupunktur allein.</p>
<p>Wenn du in dieser Grössenordnung liegst, sprich es beim ersten Termin an. Wir arbeiten dann parallel zur ärztlichen Behandlung, nicht statt ihr.</p>
<h2>Ablauf und Kosten</h2>
<p>Üblich sind acht bis zwölf Sitzungen über sechs bis acht Wochen. Eine Behandlung dauert mit Gespräch 45 bis 60 Minuten, die Nadeln bleiben 20 bis 30 Minuten. Bei EMR- und ASCA-anerkannten Therapeut:innen beteiligt sich die Zusatzversicherung in der Regel mit 70 bis 90 Prozent, ohne ärztliche Verordnung — Details unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Spannungskopfschmerzen?', a: 'Im Cochrane-Review von 2016 halbierte rund die Hälfte der mit Akupunktur Behandelten ihre Kopfschmerztage, gegenüber etwa 40 Prozent unter Schein-Akupunktur und deutlich weniger ohne Behandlung. Der Effekt hielt über mehrere Monate an.' },
      { q: 'Was ist der Unterschied zwischen Spannungskopfschmerz und Migräne?', a: 'Spannungskopfschmerz ist beidseitig und drückend, ohne Übelkeit, und man kann meist weiterarbeiten. Migräne ist typischerweise einseitig, pulsierend, oft mit Übelkeit und Licht- oder Lärmempfindlichkeit, und zwingt zum Hinlegen.' },
      { q: 'Warum wird bei Kopfschmerzen am Nacken behandelt?', a: 'Bei vielen Betroffenen ist die Nacken- und Schultermuskulatur deutlich verhärtet, oft mit Triggerpunkten, die den bekannten Kopfschmerz bei Druck auslösen. Der Nacken ist dann häufig der eigentliche Ort des Problems.' },
      { q: 'Wie viele Sitzungen brauche ich?', a: 'Üblich sind acht bis zwölf Sitzungen über sechs bis acht Wochen. Zeigt sich nach der Hälfte gar keine Veränderung, besprechen wir Alternativen.' },
      { q: 'Ich nehme oft Schmerzmittel. Ist das ein Problem?', a: 'Ab etwa zehn bis fünfzehn Einnahmetagen im Monat kann ein Medikamentenübergebrauch-Kopfschmerz entstehen, bei dem das Mittel selbst den Kopfschmerz unterhält. Sprich das beim ersten Termin an, das gehört ärztlich begleitet.' },
    ],
    related: [
      { href: '/beschwerden/spannungskopfschmerzen/', label: 'Spannungskopfschmerzen', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-migraene/', label: 'Akupunktur bei Migräne', cat: 'Artikel' },
      { href: '/therapien/massage/triggerpunktmassage/', label: 'Triggerpunktmassage', cat: 'Therapie' },
    ],
  },

  // ──────────────────────────────────────────────────────────── KINDERWUNSCH
  {
    slug: 'akupunktur-bei-kinderwunsch',
    title: 'Akupunktur bei Kinderwunsch: Was die Studien hergeben',
    metaDesc: 'Akupunktur bei Kinderwunsch und IVF: Was die grösste Studie zu Lebendgeburten ergeben hat, was Akupunktur trotzdem leisten kann und wie wir ehrlich damit umgehen.',
    region: 'Schweizweit',
    excerpt: 'Bei Kinderwunsch ist die Studienlage zur Akupunktur ernüchternder, als viele Praxen zugeben. Was wir stattdessen sagen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Kinderwunsch: die ehrliche Antwort',
    lead: 'Kaum ein Thema wird in der Komplementärmedizin so überverkauft wie Kinderwunsch. Wir machen das nicht mit. Hier steht, was die grösste Studie zu Akupunktur bei künstlicher Befruchtung ergeben hat, warum wir trotzdem behandeln und woran du eine unseriöse Praxis erkennst.',
    readingTime: '8 Min.',
    ctaTitle: 'Kinderwunsch begleiten lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN,
    bodyHtml: `<p>Wer sich seit Monaten oder Jahren ein Kind wünscht, ist in einer verletzlichen Lage. Genau deshalb finden sich zu diesem Thema besonders viele grosse Versprechen. Wir fangen deshalb mit dem an, was am wenigsten Spass macht: den Zahlen.</p>
<h2>Was die grösste Studie ergab</h2>
<p>2018 erschien im <em>JAMA</em> eine randomisierte Studie mit 848 Frauen, die eine künstliche Befruchtung durchliefen (<a href="https://pubmed.ncbi.nlm.nih.gov/29800212/" target="_blank" rel="noopener">Smith et al., 2018</a>). Verglichen wurde echte Akupunktur mit einer Scheinbehandlung, jeweils begleitend zur IVF.</p>
<p>Das Ergebnis: kein statistisch bedeutsamer Unterschied bei den Lebendgeburten. 18,3 Prozent in der Akupunkturgruppe gegenüber 17,8 Prozent in der Kontrollgruppe.</p>
<div class="wa-pullquote">Akupunktur erhöht die Wahrscheinlichkeit einer Lebendgeburt bei künstlicher Befruchtung nach heutiger Datenlage nicht. Wer etwas anderes behauptet, kennt die Studie nicht oder verschweigt sie.</div>
<h2>Warum wir trotzdem behandeln</h2>
<p>Weil eine Kinderwunschbehandlung mehr ist als eine Erfolgsquote. Was Patientinnen bei uns tatsächlich beschreiben, ist Entlastung: besserer Schlaf in einer Phase, in der kaum jemand gut schläft, weniger körperliche Anspannung, ein Termin in der Woche, an dem sich jemand um sie kümmert statt um ihre Werte.</p>
<p>Das ist kein Etikettenschwindel, sondern eine andere Zielsetzung. Wir behandeln Beschwerden, die im Prozess entstehen: Erschöpfung, Schlafprobleme, Nebenwirkungen der Hormonstimulation, den Dauerstress zwischen zwei Zyklen. Für Schlafprobleme und Stress ist die Datenlage zur Akupunktur besser als für Fertilität.</p>
<h2>Wo Akupunktur mehr kann</h2>
<p>Ausserhalb der IVF gibt es Konstellationen, in denen der Nutzen plausibler ist. Bei unregelmässigen Zyklen und bei stressbedingten Zyklusstörungen berichten Patientinnen häufiger von Veränderungen, und für einzelne Fragestellungen rund um <a href="/beschwerden/pcos/">PCOS</a> gibt es Untersuchungen mit positiven, wenn auch uneinheitlichen Ergebnissen.</p>
<p>Was wir daraus machen: Wir sagen dir bei der ersten Sitzung, in welche Kategorie dein Anliegen fällt, und was du realistisch erwarten kannst. Manchmal ist das wenig.</p>
<h2>Woran du eine unseriöse Praxis erkennst</h2>
<p>An Erfolgsquoten auf der Website. An Paketen, die im Voraus zu kaufen sind. An der Empfehlung, die reproduktionsmedizinische Behandlung zu verschieben oder abzubrechen. Und an jeder Formulierung, die suggeriert, dass es an deiner Einstellung liegt, wenn es nicht klappt.</p>
<p>Wir arbeiten begleitend zur Kinderwunschklinik, nicht gegen sie. Wenn deine Ärztin einen Zeitplan hat, richten wir uns danach.</p>
<h2>Ablauf und Kosten</h2>
<p>Üblich ist eine Behandlung pro Woche über zwei bis drei Zyklen, angepasst an deinen Behandlungsplan. Bei EMR- und ASCA-anerkannten Therapeut:innen beteiligt sich die Zusatzversicherung in der Regel mit 70 bis 90 Prozent pro Sitzung — Details unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Erhöht Akupunktur die Chance auf eine Schwangerschaft bei IVF?', a: 'Nach der derzeit grössten randomisierten Studie mit 848 Frauen (JAMA 2018) nicht: Die Lebendgeburtenrate lag bei 18,3 Prozent mit Akupunktur gegenüber 17,8 Prozent mit Scheinbehandlung, ein statistisch nicht bedeutsamer Unterschied.' },
      { q: 'Warum bietet ihr die Behandlung dann an?', a: 'Weil wir Beschwerden behandeln, die im Prozess entstehen: Schlafprobleme, Erschöpfung, Anspannung, Nebenwirkungen der Hormonstimulation. Dafür ist die Datenlage besser als für die Fertilität selbst. Wir versprechen keine höhere Erfolgsquote.' },
      { q: 'Wann sollte ich mit der Behandlung beginnen?', a: 'Meist zwei bis drei Zyklen vor oder begleitend zur reproduktionsmedizinischen Behandlung, eine Sitzung pro Woche. Den Rhythmus richten wir nach dem Plan deiner Kinderwunschklinik.' },
      { q: 'Kann Akupunktur meinen Zyklus regulieren?', a: 'Bei unregelmässigen und stressbedingten Zyklusstörungen berichten Patientinnen häufiger von Veränderungen. Belastbar belegt ist das nicht, plausibler als bei der IVF-Erfolgsquote aber schon.' },
      { q: 'Soll ich die Kinderwunschbehandlung pausieren?', a: 'Nein. Wir arbeiten begleitend zur Kinderwunschklinik. Jede Praxis, die dir rät, eine reproduktionsmedizinische Behandlung zu verschieben oder abzubrechen, solltest du verlassen.' },
    ],
    related: [
      { href: '/beschwerden/kinderwunsch/', label: 'Kinderwunsch', cat: 'Beschwerde' },
      { href: '/beschwerden/pcos/', label: 'PCOS', cat: 'Beschwerde' },
      { href: '/krankenkassen/akupunktur/', label: 'Kosten & Krankenkasse', cat: 'Kosten' },
    ],
  },

  // ──────────────────────────────────────────────────────────────── ABNEHMEN
  {
    slug: 'akupunktur-zum-abnehmen',
    title: 'Akupunktur zum Abnehmen: Was dran ist',
    metaDesc: 'Hilft Akupunktur beim Abnehmen? Die ehrliche Einordnung der Studienlage, warum wir keine Abnehmprogramme anbieten und was wir stattdessen sinnvoll behandeln können.',
    region: 'Schweizweit',
    excerpt: 'Akupunktur wird häufig als Abnehmhilfe beworben. Die Studienlage trägt das nicht. Was wir stattdessen sagen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur zum Abnehmen: die unbequeme Antwort',
    lead: 'Akupunktur wird oft als sanfte Abnehmhilfe beworben, mit Ohrnadeln gegen den Appetit und Programmen über zehn Sitzungen. Wir bieten das nicht an, und dieser Artikel erklärt warum. Er sagt auch, was wir stattdessen sinnvoll behandeln können.',
    readingTime: '6 Min.',
    ctaTitle: 'Lieber konkret besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN,
    bodyHtml: `<p>Die Anfrage kommt regelmässig, meist im Januar. Ob wir Akupunktur zum Abnehmen machen, gerne mit Ohrnadeln, gerne als Paket. Die kurze Antwort ist nein, und die längere ist interessanter.</p>
<h2>Was die Studienlage hergibt</h2>
<p>Es gibt eine Reihe von Studien zu Akupunktur und Körpergewicht, überwiegend klein, methodisch schwach und mit kurzer Beobachtungsdauer. Wo Effekte gefunden wurden, waren sie gering und liessen sich in besser kontrollierten Untersuchungen meist nicht bestätigen. Eine belastbare Grundlage dafür, Akupunktur als Abnehmmethode anzubieten, existiert nicht.</p>
<p>Das ist keine besonders strenge Auslegung. Es ist der Unterschied zwischen "es gibt Studien" und "die Studien zeigen etwas".</p>
<div class="wa-callout"><div class="wa-callout-label">Unsere Haltung</div><p>Wir verkaufen keine Behandlung, deren Wirkung wir nicht belegen können — auch dann nicht, wenn sie nachgefragt wird und sich gut verkaufen liesse.</p></div>
<h2>Warum die Ohrnadel-Programme trotzdem funktionieren</h2>
<p>Wer zehn Wochen lang wöchentlich in eine Praxis geht, über Essen spricht, gewogen wird und sich beobachtet fühlt, ändert sein Verhalten. Das ist ein realer Effekt, nur hat er wenig mit der Nadel zu tun. Denselben Effekt bekommst du in einer Ernährungsberatung, dort aber mit fachlicher Grundlage und ohne den Umweg.</p>
<p>Wenn dir also jemand ein Abnehmprogramm mit Akupunktur verkauft: Was du bezahlst, ist im Wesentlichen Begleitung. Das darf man wollen. Man sollte nur wissen, wofür man zahlt.</p>
<h2>Was wir stattdessen behandeln</h2>
<p>Es gibt Beschwerden im Umfeld, bei denen wir sinnvoll etwas beitragen können, und die den Alltag oft mehr belasten als die Zahl auf der Waage:</p>
<p>Schlafprobleme, die den Tagesrhythmus durcheinanderbringen. Stressbedingte Erschöpfung. Verdauungsbeschwerden wie Blähungen, Völlegefühl oder <a href="/beschwerden/reizdarm/">Reizdarm</a>. Schmerzen im Bewegungsapparat, die Bewegung schwer machen — bei <a href="/beschwerden/knieschmerzen/">Knieschmerzen</a> etwa ist das oft der eigentliche Engpass.</p>
<p>Wenn du deswegen kommst, behandeln wir das. Und wenn Gewicht für dich ein Thema ist, sagen wir dir ehrlich, dass eine Ernährungsberatung oder eine ärztliche Abklärung der bessere Ort dafür ist. Bei anerkannten Fachpersonen beteiligt sich die Zusatzversicherung daran häufig ebenfalls.</p>
<h2>Was wir nicht tun</h2>
<p>Wir stellen keine Ernährungspläne auf, geben keine Kalorienvorgaben und verkaufen keine Pakete im Voraus. Wenn dir das jemand als TCM-Leistung anbietet, frag nach der Qualifikation dafür.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur beim Abnehmen?', a: 'Die Studienlage gibt das nicht her. Die vorhandenen Untersuchungen sind überwiegend klein und methodisch schwach, gefundene Effekte waren gering und liessen sich in besser kontrollierten Studien meist nicht bestätigen.' },
      { q: 'Was ist mit Ohrakupunktur gegen Appetit?', a: 'Für diese Anwendung gilt dasselbe. Was in solchen Programmen wirkt, ist überwiegend die wöchentliche Begleitung und Selbstbeobachtung, nicht die Nadel.' },
      { q: 'Bietet ihr Abnehmprogramme an?', a: 'Nein. Wir verkaufen keine Behandlung, deren Wirkung wir nicht belegen können.' },
      { q: 'Was könnt ihr denn behandeln?', a: 'Schlafprobleme, stressbedingte Erschöpfung, Verdauungsbeschwerden und Schmerzen im Bewegungsapparat. Das sind Beschwerden, bei denen wir etwas beitragen können und die den Alltag oft stärker belasten.' },
      { q: 'Wohin soll ich mich stattdessen wenden?', a: 'An eine Ernährungsberatung oder deine Ärztin. Bei anerkannten Fachpersonen beteiligt sich die Zusatzversicherung daran häufig ebenfalls.' },
    ],
    related: [
      { href: '/beschwerden/reizdarm/', label: 'Reizdarm', cat: 'Beschwerde' },
      { href: '/beschwerden/schlafprobleme/', label: 'Schlafprobleme', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
];
