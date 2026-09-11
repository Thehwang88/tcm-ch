// Saisonale Ratgeber-Artikel (Herbstwelle, 09/2026). Evergreen-Slugs, keine Jahreszahlen.
//
// Eigene Datei nach dem Muster von wissen-akupunktur-bei.ts, damit wissen.ts nicht weiter wächst.
// Autorin ist die neutrale Fachredaktion (kein reviewerName, kein lastReviewed): es wird nur
// echte Review-Information angezeigt, keine erfundene.
import type { Wissen, WissenAuthor } from './wissen';

const AUTOR: WissenAuthor = {
  name: 'TCM.ch Fachredaktion',
  role: 'Team aus EMR- und ASCA-anerkannten TCM-Therapeut:innen',
  bio: 'Die Inhalte dieser Rubrik entstehen in der Fachredaktion von TCM.ch auf Basis der Erfahrung aus unseren Praxen. Sie ordnen Gesundheitsfragen allgemein ein, ersetzen keine ärztliche Diagnose und nennen bewusst, wann eine medizinische Abklärung wichtig ist.',
};

export const wissenHerbst: Wissen[] = [
  {
    slug: 'erkaeltung-im-anflug',
    title: 'Erkältung im Anflug: Was in den ersten 24 Stunden hilft',
    metaDesc: 'Halskratzen, Frösteln, Müdigkeit: Was in den ersten 24 Stunden einer Erkältung wirklich hilft, was nichts bringt und wann du zur Ärztin solltest.',
    region: 'Schweizweit',
    excerpt: 'Was in den ersten 24 Stunden einer beginnenden Erkältung wirklich hilft und was du dir sparen kannst.',
    category: 'Beschwerden verstehen',
    h1: 'Erkältung im Anflug: Was in den ersten 24 Stunden hilft',
    lead: 'Es kratzt im Hals, du fröstelst und bist müder als sonst. Ganz verhindern lässt sich eine Erkältung in diesem Stadium meist nicht. Was du in den ersten 24 Stunden aber tun kannst, damit dein Körper gute Bedingungen hat, liest du hier.',
    readingTime: '6 Min.',
    ctaTitle: 'Oft erkältet? Wir schauen genauer hin.',
    author: AUTOR,
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    bodyHtml: '<p>Eine ehrliche Antwort vorweg: Ein sicheres Mittel, das eine beginnende Erkältung stoppt, gibt es nicht. Erkältungen werden von Viren ausgelöst, meist Rhinoviren, und wenn die ersten Symptome da sind, läuft die Infektion bereits. Was du in den ersten 24 Stunden beeinflussen kannst, ist, wie gut dein Körper mit der Infektion umgehen kann.</p>\n<h2>Die typischen ersten Zeichen</h2>\n<p>Die meisten Erkältungen beginnen mit einem Kratzen oder Brennen im Hals, oft zusammen mit Frösteln, leichtem Kopfdruck und auffälliger Müdigkeit. Die Nase folgt meist am zweiten Tag. Dass der Hals zuerst reagiert, liegt daran, dass die Viren häufig über die Schleimhäute im Rachen eindringen.</p>\n<h2>Was jetzt wirklich hilft</h2>\n<p><strong>Runterschalten.</strong> Der wichtigste Punkt und der am häufigsten ignorierte. Wer mit beginnender Erkältung noch ein intensives Training oder einen 12-Stunden-Tag durchzieht, verlängert erfahrungsgemäss den Verlauf. Sport pausieren, früh ins Bett, Termine reduzieren, wo es geht.</p>\n<p><strong>Schlaf.</strong> Schlafmangel schwächt die Immunantwort messbar. Die eine Nacht mit neun oder zehn Stunden Schlaf ist die beste Investition, die du jetzt machen kannst.</p>\n<p><strong>Trinken.</strong> Warme Getränke wie Tee oder Bouillon befeuchten die gereizten Schleimhäute und werden von den meisten als wohltuend empfunden. Auf den Verlauf der Infektion hat die Trinkmenge keinen belegten Einfluss, auf dein Befinden schon.</p>\n<p><strong>Gurgeln und Nasenspülung.</strong> Gurgeln mit Salzwasser lindert das Kratzen im Hals, eine Nasenspülung mit Salzlösung kann die Schleimhäute entlasten. Beides ist günstig, nebenwirkungsarm und einen Versuch wert.</p>\n<p><strong>Wärme.</strong> Frösteln ist ein Zeichen, dass dein Körper Wärme braucht. Warm anziehen, warme Füsse, allenfalls ein warmes Bad, sofern du dich kreislaufmässig stabil fühlst.</p>\n<h2>Was du dir sparen kannst</h2>\n<p><strong>Vitamin C in hohen Dosen.</strong> Für die Allgemeinbevölkerung zeigen die Daten: Wer erst bei Symptombeginn hochdosiert Vitamin C nimmt, verkürzt die Erkältung nicht relevant. Ausgewogen essen reicht.</p>\n<p><strong>Antibiotika.</strong> Wirken gegen Bakterien, nicht gegen Erkältungsviren. Sie sind bei einer normalen Erkältung nutzlos und gehören nur bei ärztlich festgestellten bakteriellen Komplikationen zum Einsatz.</p>\n<p><strong>Schwitzkuren und Härtetests.</strong> Die Idee, die Erkältung herauszuschwitzen oder mit Sport zu vertreiben, ist nicht belegt und kann den Kreislauf unnötig belasten.</p>\n<div class="wa-callout"><div class="wa-callout-label">Wann ärztlich abklären</div><p>Geh zur Ärztin oder zum Arzt bei Fieber über 39 Grad, Atemnot, Brustschmerzen, starken Halsschmerzen mit Schluckbeschwerden, Symptomen, die nach zehn Tagen nicht besser werden oder sich nach anfänglicher Besserung wieder verschlechtern. Das gilt besonders für Schwangere, ältere Menschen und Personen mit chronischen Erkrankungen.</p></div>\n<h2>Erkältung oder doch etwas anderes?</h2>\n<p>Beginnt es schlagartig mit hohem Fieber und starken Gliederschmerzen, spricht das eher für eine Grippe. Niesattacken mit juckenden Augen, aber ohne Krankheitsgefühl, passen eher zu einer Allergie. Die Unterschiede haben wir im Artikel <a href="/wissen/erkaeltung-grippe-allergie/">Erkältung, Grippe oder Allergie?</a> im Detail aufgeschlüsselt.</p>\n<h2>Wenn dich jede Erkältung erwischt</h2>\n<p>Drei bis vier Erkältungen pro Jahr sind bei Erwachsenen normal, bei Kindern deutlich mehr. Wirst du deutlich häufiger krank oder ziehen sich Infekte über Wochen, lohnt sich ein genauerer Blick: zuerst ärztlich, um Ursachen wie Eisenmangel oder chronische Entzündungen auszuschliessen. Ergänzend arbeiten wir in der TCM-Praxis bei wiederkehrenden Infekten mit <a href="/therapien/akupunktur/">Akupunktur</a> und <a href="/therapien/kraeutertherapie/">Kräutertherapie</a>, mit dem Ziel, die Belastung durch Infekte zu reduzieren. Was dabei realistisch ist, liest du unter <a href="/wissen/haeufige-infekte-immunsystem/">Häufige Infekte und Immunsystem</a>.</p>',
    faqs: [
      {
        q: 'Kann man eine Erkältung in den ersten 24 Stunden noch stoppen?',
        a: 'Meist nicht. Wenn die ersten Symptome da sind, läuft die Virusinfektion bereits. Beeinflussen kannst du, wie gut dein Körper damit umgeht: Ruhe, viel Schlaf, Wärme und das Weglassen von Sport und Stress schaffen dafür die besten Bedingungen.',
      },
      {
        q: 'Hilft Vitamin C bei einer beginnenden Erkältung?',
        a: 'Hochdosiertes Vitamin C erst ab Symptombeginn verkürzt eine Erkältung nach aktueller Datenlage nicht relevant. Eine ausgewogene Ernährung deckt den Bedarf. Wichtiger sind Schlaf, Ruhe und ausreichend Flüssigkeit.',
      },
      {
        q: 'Wann sollte ich mit einer Erkältung zur Ärztin?',
        a: 'Bei Fieber über 39 Grad, Atemnot, Brustschmerzen, starken Schluckbeschwerden, Symptomen über zehn Tage oder einer Verschlechterung nach anfänglicher Besserung. Schwangere, ältere Menschen und chronisch Kranke sollten früher abklären lassen.',
      },
    ],
    related: [
      { href: '/wissen/erkaeltung-grippe-allergie/', label: 'Erkältung, Grippe oder Allergie?', cat: 'Artikel' },
      { href: '/wissen/haeufige-infekte-immunsystem/', label: 'Häufige Infekte und Immunsystem', cat: 'Artikel' },
      { href: '/beschwerden/immunschwaeche/', label: 'Immunschwäche', cat: 'Beschwerde' },
      { href: '/koerpersignale/trockener-husten/', label: 'Trockener Husten', cat: 'Körpersignal' },
    ],
  },
  {
    slug: 'erkaeltung-grippe-allergie',
    title: 'Erkältung, Grippe oder Allergie? So unterscheidest du sie',
    metaDesc: 'Laufende Nase im Herbst: Erkältung, Grippe oder Allergie? Die wichtigsten Unterschiede bei Beginn, Fieber, Dauer und Begleitsymptomen, klar erklärt.',
    region: 'Schweizweit',
    excerpt: 'Woran du erkennst, ob hinter Schnupfen und Müdigkeit eine Erkältung, eine Grippe oder eine Allergie steckt.',
    category: 'Beschwerden verstehen',
    h1: 'Erkältung, Grippe oder Allergie? So unterscheidest du sie',
    lead: 'Die Nase läuft, du bist müde, der Hals kratzt. Im Herbst kommen dafür drei Auslöser infrage, die unterschiedlich behandelt werden. Hier sind die Unterschiede, an denen du dich orientieren kannst.',
    readingTime: '7 Min.',
    ctaTitle: 'Unklare Dauerbeschwerden? Wir ordnen ein.',
    author: AUTOR,
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    bodyHtml: '<p>Erkältung, Grippe und Allergie können sich auf den ersten Blick ähneln: verstopfte oder laufende Nase, Müdigkeit, Kratzen im Hals. Für die Selbsteinschätzung helfen vier Fragen: Wie schnell hat es angefangen? Hast du Fieber? Juckt etwas? Und wie lange geht es schon?</p>\n<h2>Wie schnell hat es angefangen?</h2>\n<p>Eine <strong>Erkältung</strong> entwickelt sich über ein bis zwei Tage: erst Halskratzen, dann Schnupfen, dann eventuell Husten. Eine <strong>Grippe</strong> (Influenza) beginnt typischerweise schlagartig, oft innert Stunden, mit hohem Fieber, starken Glieder- und Kopfschmerzen und ausgeprägtem Krankheitsgefühl. Eine <strong>Allergie</strong> beginnt oft situationsabhängig: Die Symptome tauchen in bestimmten Umgebungen auf, etwa morgens im Bett, beim Staubsaugen oder in feuchten Kellerräumen, und lassen in anderer Umgebung nach.</p>\n<h2>Fieber und Krankheitsgefühl</h2>\n<p>Eine Allergie macht kein Fieber. Eine Erkältung macht selten mehr als leicht erhöhte Temperatur. Hohes Fieber ab etwa 39 Grad mit Schüttelfrost und dem Gefühl, wirklich krank zu sein, spricht für eine Grippe oder eine andere Infektion, die ärztlich gehört.</p>\n<h2>Juckreiz und Niesattacken</h2>\n<p>Juckende Augen, juckender Gaumen und Niesattacken in Serie sind das Markenzeichen der Allergie. Das Nasensekret bleibt dabei meist klar und wässrig. Bei einer Erkältung wird das Sekret im Verlauf oft dickflüssiger, und statt Juckreiz stehen Halsschmerzen und ein dumpfer Kopf im Vordergrund.</p>\n<h2>Allergie im Herbst? Ja, das gibt es</h2>\n<p>Viele denken bei Allergie nur an Pollen im Frühling. Im Herbst sind aber zwei andere Auslöser besonders aktiv: <strong>Hausstaubmilben</strong>, weil mit Heizbeginn die Belastung in Innenräumen steigt, und <strong>Schimmelpilzsporen</strong>, die in der feuchten Jahreszeit draussen wie drinnen zunehmen. Wer jeden Herbst wochenlang eine laufende oder verstopfte Nase ohne Krankheitsgefühl hat, sollte an diese Auslöser denken. Mehr dazu auf unserer Seite zu <a href="/beschwerden/allergien-heuschnupfen/">Allergien und Heuschnupfen</a>.</p>\n<h2>Die Dauer als Hinweis</h2>\n<p>Eine Erkältung ist nach sieben bis zehn Tagen weitgehend durch. Eine Grippe dauert mit Erholungsphase oft ein bis zwei Wochen. Eine Allergie hält so lange an, wie der Auslöser da ist, also unter Umständen den ganzen Herbst und Winter. Dauerschnupfen über Wochen ist praktisch nie eine Erkältung.</p>\n<div class="wa-callout"><div class="wa-callout-label">Wann ärztlich abklären</div><p>Bei hohem Fieber, Atemnot, Brustschmerzen, starken Ohren- oder Gesichtsschmerzen, Symptomen über zehn Tage ohne Besserung oder wenn ein grippaler Infekt nach Besserung erneut mit Fieber zurückkommt. Für Schwangere, kleine Kinder, ältere und chronisch kranke Menschen gilt eine tiefere Schwelle.</p></div>\n<h2>Warum die Unterscheidung wichtig ist</h2>\n<p>Weil die Konsequenzen verschieden sind. Eine Erkältung braucht vor allem Ruhe und Zeit, was in den ersten Tagen hilft, liest du unter <a href="/wissen/erkaeltung-im-anflug/">Erkältung im Anflug</a>. Eine Grippe gehört bei Risikogruppen und schweren Verläufen in ärztliche Behandlung. Eine Allergie lässt sich testen und gezielt behandeln, von der Sanierung des Schlafzimmers bis zu Medikamenten oder einer Desensibilisierung. Auch eine dauerhaft verstopfte Nase ohne Infekt hat eigene Ursachen, die wir im Körpersignal <a href="/koerpersignale/verstopfte-nase-ohne-erkaeltung/">Verstopfte Nase ohne Erkältung</a> einordnen.</p>\n<p>In der TCM-Praxis begleiten wir vor allem zwei Gruppen: Menschen mit allergischem Schnupfen, bei denen wir mit <a href="/therapien/akupunktur/">Akupunktur</a> ergänzend zur schulmedizinischen Behandlung arbeiten, und Menschen mit wiederkehrenden Infekten. Was die Studienlage zur Akupunktur bei Heuschnupfen sagt, haben wir unter <a href="/wissen/akupunktur-bei-heuschnupfen/">Akupunktur bei Heuschnupfen</a> zusammengefasst.</p>',
    faqs: [
      {
        q: 'Wie erkenne ich den Unterschied zwischen Erkältung und Grippe?',
        a: 'Vor allem am Beginn und am Fieber: Eine Erkältung entwickelt sich über ein bis zwei Tage mit Halskratzen und Schnupfen, meist ohne hohes Fieber. Eine Grippe beginnt schlagartig mit Fieber ab etwa 39 Grad, starken Gliederschmerzen und ausgeprägtem Krankheitsgefühl.',
      },
      {
        q: 'Kann eine Allergie auch im Herbst auftreten?',
        a: 'Ja. Im Herbst sind vor allem Hausstaubmilben und Schimmelpilzsporen aktiv. Typisch sind Niesattacken, juckende Augen und klares Nasensekret ohne Fieber und ohne echtes Krankheitsgefühl, oft über Wochen und besonders morgens oder in Innenräumen.',
      },
      {
        q: 'Was bedeutet Schnupfen, der wochenlang anhält?',
        a: 'Eine Erkältung ist nach sieben bis zehn Tagen weitgehend vorbei. Dauerschnupfen über Wochen spricht eher für eine Allergie, eine chronische Nasennebenhöhlenentzündung oder eine gereizte Nasenschleimhaut und sollte abgeklärt werden.',
      },
    ],
    related: [
      { href: '/beschwerden/allergien-heuschnupfen/', label: 'Allergien & Heuschnupfen', cat: 'Beschwerde' },
      { href: '/beschwerden/sinusitis/', label: 'Sinusitis', cat: 'Beschwerde' },
      { href: '/wissen/erkaeltung-im-anflug/', label: 'Erkältung im Anflug', cat: 'Artikel' },
      { href: '/koerpersignale/verstopfte-nase-ohne-erkaeltung/', label: 'Verstopfte Nase ohne Erkältung', cat: 'Körpersignal' },
    ],
  },
  {
    slug: 'kopfschmerzen-wetterumschwung',
    title: 'Kopfschmerzen bei Wetterumschwung: Was dahintersteckt',
    metaDesc: 'Kopfschmerzen bei Wetterwechsel und Föhn: was die Forschung zur Wetterfühligkeit sagt, was du selbst tun kannst und wann Kopfschmerzen abgeklärt gehören.',
    region: 'Schweizweit',
    excerpt: 'Warum manche Menschen bei Wetterwechsel Kopfschmerzen bekommen, was belegt ist und was hilft.',
    category: 'Beschwerden verstehen',
    h1: 'Kopfschmerzen bei Wetterumschwung: Was dahintersteckt',
    lead: 'Föhnlage, Kaltfront, Druckabfall: Viele Menschen spüren das Wetter im Kopf. Was davon belegt ist, was du selbst beeinflussen kannst und wann Kopfschmerzen ärztlich gehören.',
    readingTime: '7 Min.',
    ctaTitle: 'Wiederkehrende Kopfschmerzen? Wir schauen hin.',
    author: AUTOR,
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    bodyHtml: '<p>Zuerst die ehrliche Einordnung: Die Forschung zu Wetter und Kopfschmerzen ist uneinheitlich. Einzelne Studien finden Zusammenhänge zwischen Luftdruckänderungen, Temperaturstürzen oder Föhnlagen und Kopfschmerz- oder Migräneattacken, andere finden keine. Sicher ist: Viele Betroffene nehmen Wetterwechsel als Auslöser wahr, und dieses Erleben ist ernst zu nehmen, auch wenn der Mechanismus nicht abschliessend geklärt ist.</p>\n<h2>Trigger, nicht Ursache</h2>\n<p>Wichtig ist die Unterscheidung zwischen Ursache und Auslöser. Das Wetter verursacht keine Kopfschmerzerkrankung. Wer aber ohnehin zu <a href="/beschwerden/migraene/">Migräne</a> oder <a href="/beschwerden/spannungskopfschmerzen/">Spannungskopfschmerzen</a> neigt, hat ein Nervensystem, das auf Veränderungen empfindlicher reagiert, auf Schlafmangel, auf ausgelassene Mahlzeiten, auf Stress und eben möglicherweise auch auf rasche Wetterwechsel. Der Wetterumschwung ist dann ein Tropfen mehr in ein schon gut gefülltes Fass.</p>\n<h2>Warum gerade der Herbst?</h2>\n<p>Im Herbst häufen sich rasche Wechsel: Kaltfronten, Föhnlagen, grosse Temperaturunterschiede zwischen Tag und Nacht. Dazu kommen indirekte Faktoren, die oft übersehen werden: Man trinkt weniger als im Sommer, verbringt mehr Zeit vor Bildschirmen in geheizten Räumen, und mit den kürzeren Tagen verschiebt sich bei vielen der Schlafrhythmus. Jeder dieser Punkte ist für sich ein bekannter Kopfschmerz-Auslöser.</p>\n<h2>Was du selbst tun kannst</h2>\n<p><strong>Führe ein Kopfschmerztagebuch.</strong> Zwei bis vier Wochen lang notieren: wann Schmerzen auftreten, Wetter, Schlaf, Trinkmenge, Stress, bei Frauen der Zyklus. Oft zeigt sich, dass nicht das Wetter allein triggert, sondern die Kombination. Das Tagebuch ist auch für eine ärztliche Abklärung die wertvollste Grundlage.</p>\n<p><strong>Halte die beeinflussbaren Faktoren stabil.</strong> Regelmässig trinken, regelmässig essen, konstante Schlafenszeiten, Pausen bei Bildschirmarbeit, Bewegung an der frischen Luft. Das Wetter kannst du nicht ändern, das Fass darunter schon.</p>\n<p><strong>Nimm Nackenverspannungen ernst.</strong> Kälte und angespannte Schultern gehen oft zusammen, und ein verspannter Nacken kann Kopfschmerzen unterhalten. Was gegen die verschiedenen Kopfschmerzformen hilft, haben wir unter <a href="/wissen/was-hilft-gegen-kopfschmerzen/">Was hilft gegen Kopfschmerzen</a> zusammengefasst.</p>\n<div class="wa-callout"><div class="wa-callout-label">Wann Kopfschmerzen ärztlich gehören</div><p>Sofort abklären lassen: schlagartig einsetzender Vernichtungskopfschmerz, Kopfschmerzen mit Lähmungen, Seh- oder Sprachstörungen, mit Fieber und Nackensteifigkeit oder nach einem Sturz auf den Kopf. Ebenfalls abklären: erstmals auftretende starke Kopfschmerzen ab etwa 50 Jahren und Kopfschmerzen, die häufiger oder stärker werden.</p></div>\n<h2>Was die TCM-Praxis beitragen kann</h2>\n<p>Bei wiederkehrenden Kopfschmerzen und Migräne ist <a href="/therapien/akupunktur/">Akupunktur</a> eine der besser untersuchten komplementären Methoden; sie wird in Leitlinien als mögliche ergänzende Option zur Vorbeugung genannt. Sie ersetzt weder die ärztliche Diagnose noch eine notwendige medikamentöse Therapie, und sie wirkt nicht bei allen gleich. Eine ehrliche Einordnung, für wen sich ein Versuch lohnt, findest du unter <a href="/wissen/akupunktur-bei-kopfschmerzen/">Akupunktur bei Kopfschmerzen</a>.</p>',
    faqs: [
      {
        q: 'Können Wetterwechsel wirklich Kopfschmerzen auslösen?',
        a: 'Die Studienlage ist uneinheitlich: Manche Untersuchungen finden Zusammenhänge mit Luftdruck- und Temperaturwechseln, andere nicht. Klar ist, dass viele Betroffene Wetterwechsel als Auslöser erleben, meist als ein Faktor unter mehreren wie Schlafmangel, Stress oder zu wenig Flüssigkeit.',
      },
      {
        q: 'Was hilft gegen wetterbedingte Kopfschmerzen?',
        a: 'Die beeinflussbaren Faktoren stabil halten: regelmässig trinken und essen, konstante Schlafzeiten, Bildschirmpausen, Bewegung im Freien. Ein Kopfschmerztagebuch über einige Wochen zeigt, welche Kombination bei dir triggert, und ist die beste Grundlage für die Abklärung.',
      },
      {
        q: 'Wann sollte ich mit Kopfschmerzen zum Arzt?',
        a: 'Sofort bei schlagartigem Vernichtungskopfschmerz, neurologischen Ausfällen wie Seh- oder Sprachstörungen, Fieber mit Nackensteifigkeit oder nach einem Sturz. Ausserdem bei erstmals starken Kopfschmerzen ab etwa 50 und wenn Attacken häufiger oder stärker werden.',
      },
    ],
    related: [
      { href: '/beschwerden/kopfschmerzen/', label: 'Kopfschmerzen', cat: 'Beschwerde' },
      { href: '/beschwerden/migraene/', label: 'Migräne', cat: 'Beschwerde' },
      { href: '/beschwerden/spannungskopfschmerzen/', label: 'Spannungskopfschmerzen', cat: 'Beschwerde' },
      { href: '/wissen/was-hilft-gegen-kopfschmerzen/', label: 'Was hilft gegen Kopfschmerzen', cat: 'Artikel' },
    ],
  },
  {
    slug: 'muedigkeit-im-herbst',
    title: 'Müdigkeit im Herbst: Zeitumstellung, Licht und was hilft',
    metaDesc: 'Ständig müde im Herbst? Was weniger Tageslicht und die Zeitumstellung mit deinem Körper machen, was gegen das Tief hilft und wann Müdigkeit abgeklärt gehört.',
    region: 'Schweizweit',
    excerpt: 'Warum dich der Herbst müde macht, was Licht und Zeitumstellung damit zu tun haben und was wirklich hilft.',
    category: 'Beschwerden verstehen',
    h1: 'Müdigkeit im Herbst: Zeitumstellung, Licht und was hilft',
    lead: 'Kaum werden die Tage kürzer, fällt das Aufstehen schwerer und das Energielevel sinkt. Das hat nachvollziehbare Gründe und lässt sich beeinflussen. Wo die Grenze zum behandlungsbedürftigen Stimmungstief liegt, liest du hier ebenfalls.',
    readingTime: '8 Min.',
    ctaTitle: 'Anhaltend erschöpft? Wir nehmen es ernst.',
    author: AUTOR,
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    bodyHtml: '<p>Herbstmüdigkeit ist keine Einbildung. Dein Schlaf-Wach-Rhythmus wird massgeblich über Licht gesteuert: Helles Tageslicht am Morgen unterdrückt das Schlafhormon Melatonin und stellt die innere Uhr. Im Herbst fehlt genau dieses Signal. Du stehst im Dunkeln auf, sitzt tagsüber in Innenräumen und bekommst oft nur einen Bruchteil der Lichtmenge eines Sommertages ab. Die Folge: Der Körper bleibt länger im Nachtmodus, und viele fühlen sich tagsüber gedämpft.</p>\n<h2>Die Zeitumstellung als zusätzlicher Knick</h2>\n<p>Ende Oktober wird die Uhr eine Stunde zurückgestellt. Das klingt nach geschenktem Schlaf, verschiebt aber den Rhythmus: Die innere Uhr braucht typischerweise einige Tage bis etwa eine Woche, um sich anzupassen. In dieser Zeit sind Müdigkeit am frühen Abend, frühes Erwachen und Konzentrationsdellen normal. Du kannst die Umstellung abfedern, indem du deine Schlafens- und Essenszeiten in den Tagen davor schrittweise um 15 bis 20 Minuten verschiebst und dich am Morgen nach der Umstellung möglichst schnell hellem Licht aussetzt.</p>\n<h2>Was gegen das Herbsttief hilft</h2>\n<p><strong>Licht am Morgen.</strong> Der wirksamste Hebel. Geh in der ersten Tageshälfte nach draussen, auch bei bedecktem Himmel: Draussen ist es um ein Vielfaches heller als in jedem Büro. Schon 20 bis 30 Minuten machen einen Unterschied für die innere Uhr.</p>\n<p><strong>Bewegung im Freien.</strong> Kombiniert gleich zwei Faktoren: Licht und körperliche Aktivierung. Ein Mittagsspaziergang schlägt das Nickerchen, wenn es um Wachheit am Nachmittag geht.</p>\n<p><strong>Konstante Schlafzeiten.</strong> Wer am Wochenende stundenlang ausschläft, verschiebt die innere Uhr zusätzlich. Besser: konstante Aufstehzeit, und die Müdigkeit am Abend ernst nehmen, statt sie mit Bildschirmzeit zu übergehen. Bei anhaltenden Ein- und Durchschlafproblemen findest du mehr auf unserer Seite zu <a href="/beschwerden/schlafprobleme/">Schlafproblemen</a>.</p>\n<p><strong>Realistische Erwartungen.</strong> Etwas weniger Antrieb im November ist keine Störung, sondern eine normale Reaktion auf die Jahreszeit. Der Körper darf im Winterhalbjahr etwas ruhiger laufen.</p>\n<h2>Herbstmüdigkeit oder Winterdepression?</h2>\n<p>Wichtig ist die Abgrenzung: Müdigkeit und etwas gedämpfte Stimmung sind das eine. Eine saisonale Depression ist etwas anderes. Warnzeichen sind eine über Wochen anhaltende Niedergeschlagenheit, Verlust von Interesse und Freude an Dingen, die dir sonst wichtig sind, sozialer Rückzug, deutlich verändertes Ess- und Schlafverhalten oder Hoffnungslosigkeit. Das ist keine Frage von Disziplin und wächst sich oft nicht von allein aus. Sprich in diesem Fall mit deiner Hausärztin oder deinem Hausarzt oder wende dich an eine psychotherapeutische Fachperson. Saisonale Depressionen sind gut behandelbar, unter anderem mit Lichttherapie, Psychotherapie und, wo nötig, Medikamenten.</p>\n<div class="wa-callout"><div class="wa-callout-label">Müdigkeit, die abgeklärt gehört</div><p>Lass anhaltende Erschöpfung ärztlich abklären, wenn sie sich durch Schlaf nicht bessert, länger als einige Wochen anhält oder von Symptomen wie Gewichtsverlust, Nachtschweiss, Atemnot oder starkem Durst begleitet wird. Dahinter können unter anderem Eisenmangel, Schilddrüsenprobleme oder Schlafstörungen wie Schlafapnoe stecken.</p></div>\n<h2>Was die TCM-Praxis beitragen kann</h2>\n<p>Bei Erschöpfungszuständen ohne behandlungsbedürftige Grunderkrankung arbeiten wir mit <a href="/therapien/akupunktur/">Akupunktur</a>, <a href="/therapien/tuina/">Tuina</a> und einer genauen Anamnese von Schlaf, Stress und Alltag. Das ersetzt weder die ärztliche Abklärung noch die Behandlung einer Depression, kann aber ein Baustein sein, um Schlaf und Anspannung zu verbessern. Was Akupunktur bei Schlafproblemen realistisch leisten kann, liest du unter <a href="/wissen/akupunktur-schlafprobleme/">Akupunktur bei Schlafproblemen</a>.</p>',
    faqs: [
      {
        q: 'Warum bin ich im Herbst so müde?',
        a: 'Vor allem wegen des fehlenden Tageslichts: Helles Morgenlicht stellt die innere Uhr und unterdrückt das Schlafhormon Melatonin. Im Herbst fehlt dieses Signal, der Körper bleibt länger im Nachtmodus. Die Zeitumstellung Ende Oktober verschiebt den Rhythmus zusätzlich für einige Tage.',
      },
      {
        q: 'Was hilft am besten gegen Herbstmüdigkeit?',
        a: 'Tageslicht am Morgen, idealerweise 20 bis 30 Minuten draussen, dazu Bewegung im Freien und konstante Schlaf- und Aufstehzeiten. Vor der Zeitumstellung hilft es, Schlafenszeiten in kleinen Schritten anzupassen.',
      },
      {
        q: 'Woran erkenne ich eine Winterdepression?',
        a: 'An über Wochen anhaltender Niedergeschlagenheit, Interessen- und Freudverlust, sozialem Rückzug, stark verändertem Schlaf- und Essverhalten oder Hoffnungslosigkeit. Das ist mehr als Herbstmüdigkeit und gehört in ärztliche oder psychotherapeutische Behandlung, sie ist gut behandelbar.',
      },
    ],
    related: [
      { href: '/beschwerden/erschoepfung/', label: 'Erschöpfung', cat: 'Beschwerde' },
      { href: '/beschwerden/schlafprobleme/', label: 'Schlafprobleme', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-schlafprobleme/', label: 'Akupunktur bei Schlafproblemen', cat: 'Artikel' },
      { href: '/wissen/burnout-symptome-erkennen/', label: 'Burnout-Symptome erkennen', cat: 'Artikel' },
    ],
  },
  {
    slug: 'heizungsluft-trockene-schleimhaeute',
    title: 'Heizungsluft: Was gegen trockene Schleimhäute hilft',
    metaDesc: 'Trockene Nase, kratzender Hals, spröde Lippen: warum Heizungsluft die Schleimhäute austrocknet, was wirklich hilft und welche Beschwerden abgeklärt gehören.',
    region: 'Schweizweit',
    excerpt: 'Warum Heizungsluft Nase, Hals, Augen und Haut austrocknet und welche Massnahmen wirklich helfen.',
    category: 'Beschwerden verstehen',
    h1: 'Heizungsluft: Was gegen trockene Schleimhäute hilft',
    lead: 'Mit dem Heizbeginn melden sich jedes Jahr dieselben Beschwerden: trockene Nase, Kratzen im Hals, brennende Augen, spröde Lippen. Warum das passiert und was dagegen hilft, ohne dass du zehn Produkte kaufen musst.',
    readingTime: '7 Min.',
    ctaTitle: 'Hartnäckige Beschwerden? Wir schauen genauer hin.',
    author: AUTOR,
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    bodyHtml: '<p>Kalte Aussenluft enthält wenig Feuchtigkeit. Wird sie in der Wohnung aufgeheizt, sinkt die relative Luftfeuchtigkeit oft auf 20 bis 30 Prozent, deutlich unter die empfohlenen 40 bis 60 Prozent. Deine Schleimhäute geben dann laufend Feuchtigkeit an die Raumluft ab. Das betrifft Nase, Rachen, Augen und auch die Haut, und es erklärt, warum dieselben Beschwerden jedes Jahr pünktlich zum Heizbeginn auftauchen.</p>\n<h2>Warum trockene Schleimhäute mehr sind als ein Komfortproblem</h2>\n<p>Die Schleimhaut in Nase und Rachen ist eine Schutzschicht: Ein feuchter Schleimfilm fängt Viren und Staub ab und transportiert sie ab. Trocknet er aus, funktioniert diese Reinigung schlechter, die Schleimhaut wird anfälliger für Reizungen und Infekte. Das ständige Kratzen im Hals am Morgen und der trockene Reizhusten in geheizten Räumen sind typische Folgen. Mehr zum trockenen Husten und seinen Ursachen findest du im Körpersignal <a href="/koerpersignale/trockener-husten/">Trockener Husten</a>.</p>\n<h2>Die wirksamsten Massnahmen</h2>\n<p><strong>Luftfeuchtigkeit messen, dann handeln.</strong> Ein Hygrometer kostet wenig und zeigt, ob dein Schlafzimmer wirklich zu trocken ist. Liegt die Feuchtigkeit unter 40 Prozent, helfen Wäsche in der Wohnung trocknen, Wasserschalen auf dem Heizkörper oder ein Luftbefeuchter, den du regelmässig reinigst, sonst wird er zur Keimschleuder.</p>\n<p><strong>Stosslüften statt Kippfenster.</strong> Mehrmals täglich einige Minuten quer lüften tauscht die Luft aus, ohne die Wände auszukühlen.</p>\n<p><strong>Etwas kühler schlafen.</strong> Je wärmer der Raum, desto trockener die relative Luft. 17 bis 19 Grad im Schlafzimmer entlasten die Schleimhäute spürbar.</p>\n<p><strong>Nase direkt pflegen.</strong> Salzwasser-Nasenspray oder Nasenspülungen befeuchten, eine Nasensalbe schützt die Schleimhaut über Nacht. Wichtig: Abschwellende Nasensprays sind dafür das falsche Mittel. Sie trocknen zusätzlich aus und führen bei Daueranwendung über mehr als etwa eine Woche in einen Gewöhnungseffekt, bei dem die Nase ohne Spray gar nicht mehr aufgeht. Wenn deine Nase dauerhaft zu ist, ohne dass du erkältet bist, findest du die möglichen Ursachen im Körpersignal <a href="/koerpersignale/verstopfte-nase-ohne-erkaeltung/">Verstopfte Nase ohne Erkältung</a>.</p>\n<p><strong>Trinken, Lippen und Haut.</strong> Regelmässig trinken hält die Schleimproduktion in Gang. Spröde Lippen brauchen einen fettenden Pflegestift, trockene Haut rückfettende Pflege und kürzere, nicht zu heisse Duschen. Bei Hautthemen von Juckreiz bis Ekzem findest du mehr in unserem Bereich <a href="/haut/">Haut</a>.</p>\n<h2>Wenn nachts der Mund austrocknet</h2>\n<p>Wachst du regelmässig mit klebrig-trockenem Mund auf, ist oft Mundatmung im Spiel, begünstigt durch die verstopfte oder trockene Nase. Warum das ein eigenes Thema ist und wann mehr dahintersteckt, liest du im Körpersignal <a href="/koerpersignale/trockener-mund-nachts/">Trockener Mund nachts</a>.</p>\n<div class="wa-callout"><div class="wa-callout-label">Wann ärztlich abklären</div><p>Abklären lassen solltest du: häufiges Nasenbluten, Heiserkeit, die länger als drei Wochen anhält, anhaltende Mund- und Augentrockenheit gleichzeitig (kann auf eine Erkrankung der Speichel- und Tränendrüsen hinweisen), sowie Husten, der länger als acht Wochen besteht. Auch wenn Beschwerden trotz guter Raumluft bestehen bleiben, lohnt sich der Blick auf andere Ursachen wie Medikamente oder eine Allergie.</p></div>\n<h2>Was die TCM-Praxis beitragen kann</h2>\n<p>Raumklima und Pflege sind hier die wichtigsten Hebel, das sagen wir ehrlich. In der Praxis sehen wir Betroffene vor allem dann, wenn hinter den Beschwerden mehr steckt: eine chronisch gereizte Nase, wiederkehrende <a href="/beschwerden/sinusitis/">Nasennebenhöhlenentzündungen</a> oder häufige Infekte. Dann klären wir zuerst, ob eine ärztliche Abklärung fehlt, und arbeiten ergänzend mit <a href="/therapien/akupunktur/">Akupunktur</a> und <a href="/therapien/kraeutertherapie/">Kräutertherapie</a>.</p>',
    faqs: [
      {
        q: 'Welche Luftfeuchtigkeit ist im Winter ideal?',
        a: 'Empfohlen sind 40 bis 60 Prozent relative Luftfeuchtigkeit. In geheizten Räumen sinkt sie oft auf 20 bis 30 Prozent. Ein Hygrometer zeigt den Wert; Wäsche trocknen, Wasserschalen oder ein regelmässig gereinigter Luftbefeuchter helfen, ihn anzuheben.',
      },
      {
        q: 'Helfen Nasensprays gegen eine trockene Nase?',
        a: 'Salzwasser-Sprays und Nasenspülungen ja, sie befeuchten die Schleimhaut, eine Nasensalbe schützt zusätzlich über Nacht. Abschwellende Nasensprays dagegen trocknen aus und machen bei Anwendung über mehr als etwa eine Woche abhängig von ihrem Effekt.',
      },
      {
        q: 'Wann sind trockene Schleimhäute ein Fall für die Ärztin?',
        a: 'Bei häufigem Nasenbluten, Heiserkeit über drei Wochen, Husten über acht Wochen oder wenn Mund und Augen gleichzeitig dauerhaft trocken sind. Bleiben Beschwerden trotz guter Raumluft bestehen, sollten andere Ursachen wie Medikamente oder Allergien geprüft werden.',
      },
    ],
    related: [
      { href: '/koerpersignale/trockener-husten/', label: 'Trockener Husten', cat: 'Körpersignal' },
      { href: '/koerpersignale/verstopfte-nase-ohne-erkaeltung/', label: 'Verstopfte Nase ohne Erkältung', cat: 'Körpersignal' },
      { href: '/koerpersignale/trockener-mund-nachts/', label: 'Trockener Mund nachts', cat: 'Körpersignal' },
      { href: '/beschwerden/sinusitis/', label: 'Sinusitis', cat: 'Beschwerde' },
    ],
  },
];
