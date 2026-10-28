// Trauma-Cluster 27.10.2026 (Draft): sechs Wissen-Artikel. Gleiches Modell wie wissen-artikel-2026-10-25.ts
// (FAQ und Quellen im bodyHtml, faqs: [] => kein FAQPage-Schema). Alle Seiten mit sensibel-Option: neutraler
// WhatsApp-Text, kein Themenpfad im CTA-Tracking, keine Referrer-Weitergabe; 'orientierung' ohne Kontaktkarte.
// akupunktur-bei-ptbs gehört zur Akupunktur-bei-Serie (Beschwerde-Owner /beschwerden/posttraumatische-belastungsstoerung/),
// aber ohne Serien-Formular. Datum bis Release ungesetzt (PUBLISHED_TRAUMA_2026_10_27). Bericht: seo/trauma-2026-10-27.md.
import type { Wissen } from './wissen';
import { PUBLISHED_TRAUMA_2026_10_27 } from './befunde-werte';

const REDAKTION = {
  name: 'Redaktion TCM.ch',
  role: 'Redaktionelle Einordnung',
  bio: 'Redaktionelle Einordnung auf Basis der im Artikel verlinkten Quellen. Keine ärztliche Diagnose und keine individuelle Therapieempfehlung.',
};
const DATEN_T = { datePublished: PUBLISHED_TRAUMA_2026_10_27 ?? '', dateModified: PUBLISHED_TRAUMA_2026_10_27 ?? '' };

export const wissenTrauma: Wissen[] = [
  {
    slug: 'psychisches-trauma-behandlung',
    title: "Psychisches Trauma behandeln: Therapie und Hilfe",
    metaDesc: "Welche Behandlung hilft nach einem psychischen Trauma? Erfahre, wie Abklärung, Psychotherapie und ergänzende Angebote voneinander abzugrenzen sind.",
    region: 'Schweizweit',
    excerpt: "Wie Abklärung, traumafokussierte Psychotherapie und ergänzende Angebote zusammenhängen, und warum ein Akupunkturangebot keine Traumatherapie ist.",
    category: "Beschwerden verstehen",
    h1: "Psychisches Trauma: verstehen, Hilfe finden, Behandlung wählen",
    lead: "Du musst nicht erst eine genaue Bezeichnung für das Erlebte finden, um Unterstützung zu suchen. Wenn Erinnerungen, Anspannung oder Schlafprobleme deinen Alltag belasten, ist das ein ausreichender Anlass für ein Gespräch.",
    readingTime: "4 Min.",
    author: REDAKTION,
    ...DATEN_T,
    sensibel: 'orientierung',
    bodyHtml: `<p>Welche Hilfe passt, hängt von deinen Beschwerden, deiner aktuellen Sicherheit und der fachlichen Abklärung ab.</p>
<h2>Trauma ist nicht automatisch PTBS</h2>
<p>Mit einem psychischen Trauma ist hier eine seelisch erschütternde Erfahrung gemeint, etwa durch schwere Gewalt, sexualisierte Übergriffe oder eine lebensbedrohliche Situation. Nicht jeder Mensch entwickelt danach eine psychische Erkrankung. Ob eine <a href="/beschwerden/posttraumatische-belastungsstoerung/">posttraumatische Belastungsstörung</a> vorliegt, lässt sich nicht aus dem Ereignis allein ableiten.</p>
<p>Auch andere belastende Erfahrungen verdienen Aufmerksamkeit. Du musst sie weder als Trauma bezeichnen noch mit den Erlebnissen anderer vergleichen. Wichtig ist, welche Unterstützung du heute brauchst.</p>
<h2>Wie beginnt eine Behandlung?</h2>
<p>Ein erster Schritt kann die Hausarztpraxis oder eine psychotherapeutische beziehungsweise psychiatrische Fachperson sein. Bei der Abklärung geht es um Beschwerden, Alltag und passende Hilfe. Du kannst ansprechen, wenn dir eine Frage zu viel wird, und nach dem Zweck einer Untersuchung fragen.</p>
<p>Bei diagnostizierter PTBS empfiehlt die deutschsprachige S3-Leitlinie von 2026 eine traumafokussierte Psychotherapie, zum Beispiel EMDR oder bestimmte Formen der kognitiven Therapie und der Expositionstherapie. Medikamente gelten dort als zweite Wahl. Welche Methode eingesetzt wird, entscheidet die Fachperson gemeinsam mit dir. Spezialisierte Angebote gibt es unter anderem an psychiatrischen Kliniken; die <a href="https://www.pukzh.ch/unsere-angebote/erwachsenenpsychiatrie/behandlungsschwerpunkte/trauma/" target="_blank" rel="noopener">Psychiatrische Universitätsklinik Zürich</a> führt zum Beispiel einen eigenen Behandlungsschwerpunkt Trauma.</p>
<h2>Wo steht ergänzende Akupunktur?</h2>
<p>Eine Einordnung der Studien findest du unter <a href="/wissen/akupunktur-bei-ptbs/">Akupunktur bei PTBS</a>. Ein Angebot für Akupunktur ist nicht automatisch ein Angebot für Traumapsychotherapie. Frage ausdrücklich nach Qualifikation, Ziel und Grenzen. Eine ergänzende Behandlung sollte den Zugang zur passenden Fachbehandlung nicht verzögern.</p>
<h2>Wenn Gewalt noch andauert</h2>
<p>Dann ist der Schutz vor weiterer Gewalt wichtiger als die Suche nach einer Entspannungsmethode. Eine <a href="https://www.opferhilfe-schweiz.ch/de/" target="_blank" rel="noopener">Beratungsstelle der Opferhilfe</a> kann bei der Orientierung helfen. Nach einem kürzlich erlebten sexuellen Übergriff ist auch eine zeitnahe medizinische Untersuchung wichtig. Mehr zum Hilfeweg steht unter <a href="/wissen/hilfe-nach-gewalt-sexuellem-missbrauch/">Hilfe nach Gewalt und sexuellem Missbrauch</a>.</p>
<div class="wa-callout"><div class="wa-callout-label">Im Notfall</div><p>Bei unmittelbarer Gefahr: Polizei 117, Sanität 144. Gesprächsangebot rund um die Uhr: Die Dargebotene Hand, Telefon 143. Beratung nach Gewalt: Opferhilfe, Telefon 142 (keine Notrufnummer).</p>
</div><h2>Häufige Fragen</h2>
<h3>Muss ich das Erlebte sofort vollständig erzählen?</h3>
<p>Du kannst beim ersten Kontakt zunächst sagen, welche Beschwerden du hast und welche Unterstützung du suchst. Wie eine ausführlichere Abklärung abläuft, solltest du mit der Fachperson besprechen.</p>
<h3>Ist EMDR dasselbe wie Akupunktur?</h3>
<p>Nein. Es sind unterschiedliche Verfahren. Eine Praxis mit Akupunkturangebot bietet damit nicht automatisch EMDR an.</p>
<h3>Ist es nach vielen Jahren zu spät für Hilfe?</h3>
<p>Nein. Auch länger zurückliegende Erlebnisse können Anlass sein, heute Unterstützung zu suchen.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.awmf.org/aktuelles/awmf-aktuell/posttraumatische-belastungsstoerung-adapt-1" target="_blank" rel="noopener">AWMF. S3-Leitlinie Posttraumatische Belastungsstörung, Registernummer 155-001, Version 7.0, 2026. (Langfassung gelesen, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.nice.org.uk/guidance/ng116/chapter/recommendations" target="_blank" rel="noopener">NICE. Post-traumatic stress disorder (NG116): Recommendations. 2018. (Empfehlungstext, britische Versorgung, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.pukzh.ch/unsere-angebote/erwachsenenpsychiatrie/behandlungsschwerpunkte/trauma/" target="_blank" rel="noopener">Psychiatrische Universitätsklinik Zürich: Behandlungsschwerpunkt Trauma. (Webseite; am 27. Oktober 2026 nur als Suchauszug lesbar; keine Zusammenarbeit mit TCM.ch)</a></li><li><a href="https://www.nhsinform.scot/illnesses-and-conditions/mental-health/post-traumatic-stress-disorder-ptsd" target="_blank" rel="noopener">NHS inform: Post-traumatic stress disorder (PTSD). (Webseite, britische Versorgung, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.opferhilfe-schweiz.ch/de/" target="_blank" rel="noopener">Opferhilfe Schweiz: Informationen und Beratungsstellen der Kantone. (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.bakom.admin.ch/de/weitere-nummern-kostenpflichtig-oder-gratis" target="_blank" rel="noopener">BAKOM: Weitere Nummern, kostenpflichtig oder gratis (117, 144, 143). (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.143.ch/" target="_blank" rel="noopener">Die Dargebotene Hand, Telefon 143. (Webseite, abgerufen 27. Oktober 2026)</a></li></ul>`,
    faqs: [],
    related: [
      { href: "/beschwerden/posttraumatische-belastungsstoerung/", label: "Posttraumatische Belastungsstörung", cat: "Beschwerde" },
      { href: "/wissen/hilfe-nach-gewalt-sexuellem-missbrauch/", label: "Hilfe nach Gewalt und sexuellem Missbrauch", cat: "Wissen" },
      { href: "/wissen/akupunktur-bei-ptbs/", label: "Akupunktur bei PTBS", cat: "Wissen" },
    ],
  },
  {
    slug: 'trauma-kindheit-erwachsene',
    title: "Belastende Kindheit: Hilfe nach Gewalt und Missbrauch",
    metaDesc: "Gewalt, Missbrauch oder Vernachlässigung in der Kindheit können später belasten. Wie du als erwachsene Person passende Unterstützung finden kannst.",
    region: 'Schweizweit',
    excerpt: "Wie du als erwachsene Person Unterstützung findest, ohne Diagnose, ohne Selbsttest und ohne die Suche nach verborgenen Erinnerungen.",
    category: "Beschwerden verstehen",
    h1: "Belastende Kindheitserfahrungen: Unterstützung im Erwachsenenalter",
    lead: "Vielleicht suchst du nicht nach einer Diagnose, sondern nach einem Weg, mit etwas umzugehen, das lange zurückliegt. Gewalt, sexueller Missbrauch und Vernachlässigung in der Kindheit können Anlass sein, als erwachsene Person Unterstützung zu suchen.",
    readingTime: "4 Min.",
    author: REDAKTION,
    ...DATEN_T,
    sensibel: 'orientierung',
    bodyHtml: `<p>Du musst das Erlebte nicht herunterspielen, weil andere Familien nach aussen ähnlich wirkten.</p>
<h2>Eltern, Familie und heutige Beschwerden</h2>
<p>Familiengeschichten sind unterschiedlich. Wiederholte Übergriffe sind etwas anderes als einzelne Konflikte. Gleichzeitig lässt sich aus heutigen Schlafproblemen, Unsicherheit oder Beziehungsproblemen nicht rückwärts beweisen, was früher passiert ist.</p>
<p>Ein hilfreiches Gespräch lässt Raum für das, was du weisst, und für das, was unklar bleibt. Es verlangt weder erfundene Sicherheit noch die Suche nach verborgenen Erinnerungen. Eine körperliche Reaktion bei einer Behandlung beweist kein verdrängtes Trauma.</p>
<h2>Welche Unterstützung passt?</h2>
<p>Bei deutlicher seelischer Belastung ist eine psychotherapeutische oder psychiatrische Abklärung sinnvoll. Es geht um die gegenwärtigen Beschwerden und darum, einen tragfähigen Weg zu finden. Die Diagnose <a href="/beschwerden/komplexe-ptbs/">komplexe PTBS</a> kommt nicht automatisch infrage, nur weil Erlebnisse wiederholt oder früh aufgetreten sind.</p>
<p>Wenn du als Kind von einer Straftat betroffen warst, kann auch eine <a href="https://www.opferhilfe-schweiz.ch/de/" target="_blank" rel="noopener">Opferberatungsstelle</a> klären, welche Unterstützung heute möglich ist. Frage die Stelle nach den Voraussetzungen und möglichen Fristen für deinen Fall. Nicht jeder belastende Familienkonflikt fällt unter die Opferhilfe.</p>
<h2>Körperliche Behandlung und persönliche Grenzen</h2>
<p>Wenn du zusätzlich Akupunktur erwägst, kannst du vorab erklären, welche Situationen unangenehm sind, ohne eine detaillierte Missbrauchsgeschichte mitzuschicken. Unter <a href="/wissen/akupunktur-nach-trauma/">Akupunktur nach Trauma</a> findest du Fragen, die du einer Praxis stellen kannst.</p>
<p>Mehr Vertrauen, besserer Schlaf oder weniger Anspannung können persönliche Ziele sein. Daraus folgt kein Versprechen, dass eine bestimmte Methode deine Vergangenheit verarbeitet oder diese Ziele erreicht.</p>
<h2>Häufige Fragen</h2>
<h3>Muss ich Kontakt zu meiner Familie abbrechen?</h3>
<p>Dieser Artikel empfiehlt weder Kontaktabbruch noch Versöhnung. Solche Entscheidungen hängen von deiner Situation und insbesondere deiner Sicherheit ab.</p>
<h3>Muss ich Einzelheiten in ein Kontaktformular schreiben?</h3>
<p>Nein. Für eine erste Anfrage reicht es, nach einem Gespräch oder dem passenden Angebot zu fragen.</p>
<h3>Kann ich Hilfe suchen, obwohl ich keine Diagnose habe?</h3>
<p>Ja. Eine Diagnose muss nicht vor dem ersten Beratungsgespräch feststehen.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.nhsinform.scot/illnesses-and-conditions/mental-health/complex-post-traumatic-stress-disorder-cptsd/" target="_blank" rel="noopener">NHS inform: Complex post-traumatic stress disorder (CPTSD). (Webseite, britische Versorgung, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.opferhilfe-schweiz.ch/de/" target="_blank" rel="noopener">Opferhilfe Schweiz: Informationen und Beratungsstellen der Kantone. (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.gov.uk/government/publications/working-definition-of-trauma-informed-practice/working-definition-of-trauma-informed-practice" target="_blank" rel="noopener">GOV.UK, Office for Health Improvement and Disparities: Working definition of trauma-informed practice. 2022. (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.samhsa.gov/mental-health/trauma-violence/trauma-informed-approaches-programs" target="_blank" rel="noopener">SAMHSA: Trauma-Informed Approaches and Programs. (Webseite, abgerufen 27. Oktober 2026)</a></li></ul>`,
    faqs: [],
    related: [
      { href: "/beschwerden/komplexe-ptbs/", label: "Komplexe PTBS", cat: "Beschwerde" },
      { href: "/wissen/hilfe-nach-gewalt-sexuellem-missbrauch/", label: "Hilfe nach Gewalt und sexuellem Missbrauch", cat: "Wissen" },
      { href: "/wissen/akupunktur-nach-trauma/", label: "Akupunktur nach Trauma", cat: "Wissen" },
    ],
  },
  {
    slug: 'hilfe-nach-gewalt-sexuellem-missbrauch',
    title: "Hilfe nach Gewalt und sexuellem Missbrauch in der Schweiz",
    metaDesc: "Nach körperlicher oder sexualisierter Gewalt: medizinische Hilfe, Opferberatung und Unterstützung bei anhaltender Belastung verständlich eingeordnet.",
    region: 'Schweizweit',
    excerpt: "Anlaufstellen nach körperlicher, häuslicher und sexualisierter Gewalt: Notfall, medizinische Untersuchung, Opferberatung und Unterstützung bei anhaltender Belastung.",
    category: "Beschwerden verstehen",
    h1: "Hilfe nach Gewalt und sexuellem Missbrauch",
    lead: "Wenn dir Gewalt angetan wurde, musst du den nächsten Schritt nicht allein herausfinden. Das gilt auch, wenn die gewaltausübende Person aus der Familie, Partnerschaft oder dem Bekanntenkreis kommt.",
    readingTime: "4 Min.",
    author: REDAKTION,
    ...DATEN_T,
    sensibel: 'orientierung',
    bodyHtml: `<p>Diese Seite erklärt Anlaufstellen. Sie verlangt keine Schilderung des Erlebten.</p>
<div class="wa-callout"><div class="wa-callout-label">Im Notfall</div><p>Bei unmittelbarer Gefahr: Polizei 117, Sanität 144. Gesprächsangebot rund um die Uhr: Die Dargebotene Hand, Telefon 143. Beratung nach Gewalt: Opferhilfe, Telefon 142 (keine Notrufnummer).</p>
</div><h2>Wenn der Übergriff gerade passiert ist</h2>
<p>Bei unmittelbarer Gefahr steht der Schutz vor weiterer Gewalt an erster Stelle. Wende dich an die Polizei beziehungsweise bei einer medizinischen Notlage an die Notfallversorgung. Eine TCM-Anfrage ist dafür nicht der richtige Weg.</p>
<p>Nach einem kürzlich erlebten sexuellen Übergriff ist eine rasche medizinische Untersuchung wichtig, auch wenn keine Verletzung sichtbar ist. Dabei können Verletzungen und weitere medizinische Bedürfnisse beurteilt werden. Je nach Ort ist auch eine Spurensicherung ohne sofortige Strafanzeige möglich. Frage die zuständige Klinik nach ihrem Vorgehen. Auch wenn bereits Zeit vergangen ist, darfst du dich dort melden.</p>
<h2>Beratung ohne bereits entschiedene Anzeige</h2>
<p>Die <a href="https://www.opferhilfe-schweiz.ch/de/" target="_blank" rel="noopener">Opferhilfe Schweiz</a> informiert über Beratungsstellen. Eine Strafanzeige ist keine Voraussetzung, um sich beraten zu lassen. Die Beratung ist kostenlos und vertraulich und schweizweit auch unter der Nummer 142 erreichbar, rund um die Uhr; das ist keine Notrufnummer. Sie richtet sich an Menschen, die in der Schweiz durch eine Straftat beeinträchtigt wurden. Die Beratung kann helfen, medizinische, psychologische und rechtliche Fragen zu sortieren. Welche weiteren Leistungen möglich sind, klärt die Stelle anhand deiner Situation.</p>
<h2>Wenn die Belastung anhält</h2>
<p>Gewalterfahrungen können Anlass für psychotherapeutische Unterstützung sein. Nicht jede betroffene Person entwickelt dieselben Beschwerden oder eine PTBS. Wenn Erinnerungen, Angst oder Schlafprobleme deinen Alltag beeinträchtigen, kann eine fachliche Abklärung helfen. Der Artikel <a href="/beschwerden/posttraumatische-belastungsstoerung/">Posttraumatische Belastungsstörung</a> erklärt mögliche Beschwerden; <a href="/wissen/psychisches-trauma-behandlung/">Psychisches Trauma behandeln</a> beschreibt die Behandlungswege.</p>
<h2>Was ergänzende Angebote nicht übernehmen</h2>
<p>Akupunktur ersetzt weder die medizinische Versorgung nach einem Übergriff noch Schutz vor Gewalt oder eine notwendige Psychotherapie. Du solltest für eine ergänzende Anfrage keine sexuellen oder anderen Gewaltdetails per WhatsApp schicken müssen. Es reicht, nach Rahmenbedingungen und einem vertraulichen Gespräch zu fragen.</p>
<h2>Häufige Fragen</h2>
<h3>Kann ich Beratung suchen, wenn ich keine Anzeige will?</h3>
<p>Ja. Opferberatung ist nicht an eine Strafanzeige gebunden.</p>
<h3>Gibt es Hilfe auch bei Gewalt in einer Partnerschaft?</h3>
<p>Ja. Häusliche und sexualisierte Gewalt gehören zu den Anliegen der Opferhilfe.</p>
<h3>Soll ich zuerst einen TCM-Termin buchen?</h3>
<p>Nein. Bei einem frischen Übergriff, Verletzungen oder bestehender Gefahr haben medizinische Versorgung und Schutz Vorrang.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.sexuelle-gesundheit.ch/im-notfall/sexueller-uebergriff" target="_blank" rel="noopener">Sexuelle Gesundheit Schweiz: Sexueller Übergriff. (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.opferhilfe-schweiz.ch/de/" target="_blank" rel="noopener">Opferhilfe Schweiz: Informationen und Beratungsstellen der Kantone. (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.police.be.ch/de/start/themen/vergehen---verbrechen/gewalt/sexuelle-gewalt.html" target="_blank" rel="noopener">Kantonspolizei Bern: Sexuelle Gewalt. (Webseite, Vorgehen kantonal unterschiedlich, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.bakom.admin.ch/de/weitere-nummern-kostenpflichtig-oder-gratis" target="_blank" rel="noopener">BAKOM: Weitere Nummern, kostenpflichtig oder gratis (117, 144, 143). (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.143.ch/" target="_blank" rel="noopener">Die Dargebotene Hand, Telefon 143. (Webseite, abgerufen 27. Oktober 2026)</a></li></ul>`,
    faqs: [],
    related: [
      { href: "/wissen/psychisches-trauma-behandlung/", label: "Psychisches Trauma behandeln", cat: "Wissen" },
      { href: "/beschwerden/posttraumatische-belastungsstoerung/", label: "Posttraumatische Belastungsstörung", cat: "Beschwerde" },
      { href: "/wissen/trauma-kindheit-erwachsene/", label: "Belastende Kindheitserfahrungen", cat: "Wissen" },
    ],
  },
  {
    slug: 'schlafprobleme-nach-trauma',
    title: "Schlafprobleme nach Trauma: Albträume und Unruhe einordnen",
    metaDesc: "Nach belastenden Erlebnissen schlecht schlafen: warum eine gezielte Abklärung wichtig ist und welche Rolle Schlaftherapie und ergänzende Angebote haben.",
    region: 'Schweizweit',
    excerpt: "Schlechter Schlaf und Albträume nach belastenden Erlebnissen: warum eine gezielte Abklärung wichtig ist und was Schlaftherapie und ergänzende Angebote leisten.",
    category: "Beschwerden verstehen",
    h1: "Warum schlafe ich nach einem Trauma so schlecht?",
    lead: "Nach einem belastenden Erlebnis kann die Nacht besonders schwierig werden. Vielleicht fällt das Einschlafen schwer, du wachst häufig auf oder vermeidest das Bett aus Angst vor Albträumen.",
    readingTime: "4 Min.",
    author: REDAKTION,
    ...DATEN_T,
    sensibel: 'orientierung',
    bodyHtml: `<p>Solche Beschwerden verdienen Aufmerksamkeit. Sie sind weder ein Beweis für PTBS noch ein Zeichen mangelnder Willenskraft.</p>
<h2>Schlaf als eigenes Behandlungsziel</h2>
<p>Schlafprobleme können im Rahmen einer PTBS auftreten und sich zu einem eigenständigen Problem entwickeln. Deshalb sollte die Fachperson nicht nur nach dem Ereignis fragen, sondern auch nach Schlafrhythmus, Albträumen, Medikamenten und weiteren möglichen Ursachen. Allgemeine <a href="/beschwerden/schlafprobleme/">Schlafprobleme</a> werden auf unserer bestehenden Übersichtsseite erklärt.</p>
<h2>Welche Behandlung kommt infrage?</h2>
<p>Bei anhaltender Insomnie gehört die kognitive Verhaltenstherapie für Insomnie, CBT-I, zu den etablierten Behandlungen. Bei gleichzeitig bestehenden Traumafolgen wird die Planung mit der übrigen Behandlung abgestimmt. Albträume können zusätzliche therapeutische Aufmerksamkeit brauchen. Es gibt dafür unterschiedliche Verfahren; ihre Eignung sollte individuell geklärt werden.</p>
<p>Das bedeutet nicht, dass du belastende Szenen selbst wiederholt durchgehen sollst. Dieser Artikel enthält bewusst kein Programm zur eigenständigen Traumakonfrontation oder Schlafrestriktion. Frage die behandelnde Fachperson, welche Schritte für dich passen.</p>
<h2>Kann Akupunktur den Schlaf verbessern?</h2>
<p>Forschung zu allgemeinen Schlafstörungen ist nicht automatisch ein Wirknachweis für traumabezogene Albträume. Ebenso belegt ein besserer PTBS-Gesamtwert in einer Studie nicht für sich allein eine gezielte Wirkung auf den Schlaf. In einer Folgeauswertung der grössten scheinkontrollierten Studie zu Akupunktur bei PTBS verbesserte sich der Schlaf unter echter und unter Scheinakupunktur; einen Unterschied zwischen beiden fand sie nicht. Die Seite <a href="/wissen/akupunktur-bei-ptbs/">Akupunktur bei PTBS</a> erklärt diese Grenzen.</p>
<p>Wenn du ein ergänzendes Angebot besprichst, formuliere ein konkretes Ziel: zum Beispiel weniger nächtliche Unterbrechungen oder ein besseres Zurechtkommen am Tag. Frage, wann gemeinsam überprüft wird, ob dir die Behandlung hilft. Eine Verbesserung lässt sich vorab nicht versprechen.</p>
<h2>Häufige Fragen</h2>
<h3>Beweisen Albträume, dass ich ein verdrängtes Trauma habe?</h3>
<p>Nein. Aus Albträumen allein lässt sich weder eine Diagnose noch ein bestimmtes vergangenes Ereignis ableiten.</p>
<h3>Reichen Schlafhygiene-Tipps?</h3>
<p>Bei anhaltenden Beschwerden ist eine gezielte Abklärung sinnvoll. Allgemeine Tipps ersetzen keine individuell geplante Behandlung.</p>
<h3>Kann ich Schlafmittel wegen Akupunktur absetzen?</h3>
<p>Änderungen einer verordneten Medikation gehören in die ärztliche Betreuung.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.nhs.uk/mental-health/conditions/ptsd-post-traumatic-stress-disorder/" target="_blank" rel="noopener">NHS: Post-traumatic stress disorder (PTSD). (Webseite, britische Versorgung, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.ptsd.va.gov/apps/decisionaid/understanding-ptsd/" target="_blank" rel="noopener">US Department of Veterans Affairs, National Center for PTSD: Understanding PTSD. (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.ptsd.va.gov/publications/rq_docs/V37N2.pdf" target="_blank" rel="noopener">National Center for PTSD: PTSD Research Quarterly, Vol. 37, No. 2: PTSD and Sleep. 2026. (Volltext PDF, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.awmf.org/aktuelles/awmf-aktuell/posttraumatische-belastungsstoerung-adapt-1" target="_blank" rel="noopener">AWMF. S3-Leitlinie Posttraumatische Belastungsstörung, Registernummer 155-001, Version 7.0, 2026. (Langfassung gelesen, abgerufen 27. Oktober 2026)</a></li><li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10882512/" target="_blank" rel="noopener">Hollifield M et al. Acupuncture for Combat-Related Posttraumatic Stress Disorder: A Randomized Clinical Trial. JAMA Psychiatry 2024;81(6):545–554. PMID 38381417. (Volltext PMC)</a></li><li><a href="https://pubmed.ncbi.nlm.nih.gov/40429438/" target="_blank" rel="noopener">Sekundäranalyse der Studie von Hollifield et al. zu Angst, Depression und Schlaf. Journal of Clinical Medicine 2025. PMID 40429438. (PubMed-Abstract)</a></li></ul>`,
    faqs: [],
    related: [
      { href: "/beschwerden/posttraumatische-belastungsstoerung/", label: "Posttraumatische Belastungsstörung", cat: "Beschwerde" },
      { href: "/beschwerden/schlafprobleme/", label: "Schlafprobleme", cat: "Beschwerde" },
      { href: "/wissen/akupunktur-bei-ptbs/", label: "Akupunktur bei PTBS", cat: "Wissen" },
    ],
  },
  {
    slug: 'akupunktur-bei-ptbs',
    title: "Akupunktur bei PTBS: Studien, mögliche Rolle und Grenzen",
    metaDesc: "Was zeigen Studien zu Akupunktur bei PTBS? Eine scheinkontrollierte Untersuchung, ihre Grenzen, der Stand der Leitlinien und die Einordnung neben Traumatherapie.",
    region: 'Schweizweit',
    excerpt: "Was eine scheinkontrollierte Studie zu Akupunktur bei PTBS zeigt, was daraus nicht folgt und wie sich Akupunktur neben fachlicher Traumabehandlung einordnen lässt.",
    category: "Therapien verstehen",
    h1: "Akupunktur bei PTBS: Was ist belegt?",
    lead: "Es gibt klinische Forschung zu Akupunktur bei posttraumatischer Belastungsstörung. Ein positiver Studienbefund ist jedoch kein Versprechen für die einzelne Person.",
    readingTime: "4 Min.",
    ctaTitle: "Frage zur ergänzenden Akupunktur",
    ctaText: "Du kannst uns allgemein zu Ablauf, Rahmen und Grenzen einer ergänzenden Akupunktur fragen. Schreib dafür keine Einzelheiten zu belastenden Erlebnissen; was medizinisch nötig ist, klärt ein persönliches Gespräch.",
    ctaLabel: "Frage zur ergänzenden Akupunktur stellen",
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_T,
    sensibel: 'kontakt',
    bodyHtml: `<p>Für die Entscheidung sind die untersuchte Patientengruppe, der Vergleich und die Grenzen der Daten wichtig.</p>
<h2>Eine scheinkontrollierte Studie von 2024</h2>
<p>Hollifield und Kolleg:innen untersuchten 93 US-Kriegsveteran:innen mit PTBS. 85 waren Männer, acht Frauen. Die Teilnehmenden wurden echter oder Scheinakupunktur zugeteilt. Innerhalb von 15 Wochen waren bis zu 24 Sitzungen vorgesehen; 71 Personen beendeten die Intervention. Die Studie lief an einem einzigen Zentrum mit Kampfveteran:innen zwischen 18 und 55 Jahren.</p>
<p>Die PTBS-Beschwerden wurden mit der klinischen Skala CAPS-5 beurteilt. In der Intention-to-treat-Auswertung mit 92 Personen war die Verbesserung unter echter Akupunktur gegenüber Scheinakupunktur um durchschnittlich 7,1 Punkte grösser; der Unterschied war statistisch signifikant. Das spricht in dieser Studie für einen Zusatznutzen gegenüber dem gewählten Scheinverfahren. Allerdings verbesserte sich auch die Gruppe mit Scheinakupunktur deutlich, die Akupunkteur:innen wussten, welche Behandlung sie gaben, und wie lange die Wirkung anhält, wurde nicht nachverfolgt.</p>
<h2>Was weitere Auswertungen zeigen</h2>
<p>Eine spätere Auswertung derselben Studie fand bei Schlaf, Angst und Depression keinen Unterschied zwischen echter und Scheinakupunktur; beide Gruppen verbesserten sich. Eine randomisierte Studie aus Hongkong mit 110 Frauen, die nach häuslicher Gewalt an einer Depression litten, verglich Elektroakupunktur zusätzlich zur üblichen Versorgung mit der üblichen Versorgung allein. Untersucht wurde vor allem die Depression, PTBS-Werte waren ein Nebenziel, und eine Scheinbehandlung gab es nicht. Beide Ergebnisse stammen aus den Zusammenfassungen der Publikationen.</p>
<h2>Was Leitlinien sagen</h2>
<p>Die deutschsprachige S3-Leitlinie von 2026 spricht für Akupunktur bei PTBS keine Empfehlung aus; dafür bestehe noch kein hinreichender Konsens. Das US-amerikanische National Center for PTSD führt Akupunktur unter den Verfahren, für die es noch nicht genug Evidenz gibt. Empfohlen wird in beiden Fällen in erster Linie eine traumafokussierte Psychotherapie.</p>
<h2>Was daraus nicht folgt</h2>
<p>Die Studie verglich Akupunktur nicht direkt mit EMDR oder traumafokussierter Psychotherapie. Sie beweist daher weder Gleichwertigkeit noch Überlegenheit gegenüber diesen Verfahren. Die Ergebnisse einer überwiegend männlichen Veteranengruppe lassen sich zudem nicht ohne Weiteres auf alle Menschen nach sexuellem Missbrauch, familiärer Gewalt oder auf komplexe PTBS übertragen.</p>
<p>Ein besserer Gesamtwert ist auch kein gesonderter Nachweis, dass Akupunktur bestimmte Albträume beseitigt oder «im Körper gespeicherte Traumata löst». Solche Aussagen gehen über den untersuchten Befund hinaus.</p>
<h2>Wie lässt sich das praktisch einordnen?</h2>
<p>Für PTBS bestehen etablierte fachliche Behandlungswege. Die Übersicht <a href="/wissen/psychisches-trauma-behandlung/">Psychisches Trauma behandeln</a> erläutert sie; was zur Abklärung einer <a href="/beschwerden/posttraumatische-belastungsstoerung/">posttraumatischen Belastungsstörung</a> gehört, steht auf der eigenen Seite. Wenn du ergänzend Akupunktur erwägst, besprich die Idee möglichst mit deiner behandelnden Fachperson. Kläre, welches konkrete Anliegen im Mittelpunkt steht und wie Veränderungen überprüft werden.</p>
<p>Frage die Akupunkturpraxis auch nach Erfahrung, Grenzen und dem Ablauf bei Unwohlsein. Eine vorhandene Akupunkturausbildung belegt nicht automatisch eine Qualifikation für Traumapsychotherapie. Hinweise zur Vorbereitung findest du unter <a href="/wissen/akupunktur-nach-trauma/">Akupunktur nach Trauma</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Gibt es einen wissenschaftlichen Hinweis auf Nutzen?</h3>
<p>Es gibt Hinweise, unter anderem den beschriebenen Vergleich mit Scheinakupunktur. Für eine Empfehlung reicht die Studienlage laut der deutschsprachigen Leitlinie bisher nicht; die begrenzte Übertragbarkeit gehört zur Aussage dazu.</p>
<h3>Kann ich damit meine Psychotherapie ersetzen?</h3>
<p>Die zitierte Studie belegt keinen solchen Ersatz. Besprich deine Behandlungsplanung mit der zuständigen Fachperson.</p>
<h3>Wie viele Sitzungen brauche ich?</h3>
<p>Die Sitzungszahl einer Studie ist keine individuelle Empfehlung. Eine feste Zahl oder Erfolgsgarantie lässt sich daraus nicht ableiten.</p>
<h2>Quellen</h2>
<ul><li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10882512/" target="_blank" rel="noopener">Hollifield M et al. Acupuncture for Combat-Related Posttraumatic Stress Disorder: A Randomized Clinical Trial. JAMA Psychiatry 2024;81(6):545–554. PMID 38381417. (Volltext PMC)</a></li><li><a href="https://pubmed.ncbi.nlm.nih.gov/40429438/" target="_blank" rel="noopener">Sekundäranalyse der Studie von Hollifield et al. zu Angst, Depression und Schlaf. Journal of Clinical Medicine 2025. PMID 40429438. (PubMed-Abstract)</a></li><li><a href="https://pubmed.ncbi.nlm.nih.gov/42415722/" target="_blank" rel="noopener">Randomisierte Studie zu Elektroakupunktur bei Frauen mit Depression nach häuslicher Gewalt, Hongkong. General Psychiatry 2026. PMID 42415722. (PubMed-Abstract)</a></li><li><a href="https://www.awmf.org/aktuelles/awmf-aktuell/posttraumatische-belastungsstoerung-adapt-1" target="_blank" rel="noopener">AWMF. S3-Leitlinie Posttraumatische Belastungsstörung, Registernummer 155-001, Version 7.0, 2026. (Langfassung gelesen, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.ptsd.va.gov/apps/decisionaid/alternative-treatments/" target="_blank" rel="noopener">US Department of Veterans Affairs, National Center for PTSD: PTSD Treatment Decision Aid, Alternative treatments. (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.ptsd.va.gov/professional/treat/txessentials/overview_therapy.asp" target="_blank" rel="noopener">US Department of Veterans Affairs, National Center for PTSD: Overview of Psychotherapy for PTSD. (Webseite für Fachpersonen, abgerufen 27. Oktober 2026)</a></li></ul>`,
    faqs: [],
    related: [
      { href: "/beschwerden/posttraumatische-belastungsstoerung/", label: "Posttraumatische Belastungsstörung", cat: "Beschwerde" },
      { href: "/wissen/psychisches-trauma-behandlung/", label: "Psychisches Trauma behandeln", cat: "Wissen" },
      { href: "/wissen/akupunktur-nach-trauma/", label: "Akupunktur nach Trauma", cat: "Wissen" },
    ],
  },
  {
    slug: 'akupunktur-nach-trauma',
    title: "Akupunktur nach Trauma: Zustimmung, Grenzen und Fragen",
    metaDesc: "Was solltest du vor einer Akupunktursitzung nach belastenden Erfahrungen klären? Fragen zu Berührung, Einwilligung, Pausen und einem passenden Rahmen.",
    region: 'Schweizweit',
    excerpt: "Fragen zu Berührung, Zustimmung, Pausen und Grenzen, die du vor einer Akupunktursitzung nach belastenden Erfahrungen klären kannst.",
    category: "Therapien verstehen",
    h1: "Akupunktur nach Trauma: Was kann ich vor einer Sitzung klären?",
    lead: "Eine körpernahe Behandlung kann Fragen auslösen: Muss ich mich ausziehen? Darf ich eine Berührung ablehnen? Was passiert, wenn ich mich unwohl fühle? Du darfst diese Fragen vor einer Buchung stellen.",
    readingTime: "4 Min.",
    ctaTitle: "Frage zur ergänzenden Akupunktur",
    ctaText: "Du kannst uns allgemein zu Ablauf, Rahmen und Grenzen einer Akupunktursitzung fragen. Schreib dafür keine Einzelheiten zu belastenden Erlebnissen; was medizinisch nötig ist, klärt ein persönliches Gespräch.",
    ctaLabel: "Frage zur ergänzenden Akupunktur stellen",
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_T,
    sensibel: 'kontakt',
    bodyHtml: `<p>Du musst dafür keine persönliche Gewalterfahrung in einem Kontaktformular beschreiben.</p>
<h2>Traumasensibel bedeutet nicht Traumatherapie</h2>
<p>Ein traumasensibler Umgang nimmt Sicherheit, Transparenz, Mitentscheidung und persönliche Grenzen ernst. Das beschreibt den Rahmen einer Versorgung. Es ist kein Nachweis, dass eine Methode eine Traumafolgestörung behandelt oder die behandelnde Person psychotherapeutisch qualifiziert ist.</p>
<p>Die folgenden Punkte sind eine Gesprächshilfe. Sie beschreiben keine bereits bestätigte Ausstattung oder Dienstleistung eines bestimmten TCM.ch-Standorts.</p>
<h2>Fragen für den ersten Kontakt</h2>
<ul><li>Wird vorab erklärt, was während der Sitzung gemacht wird?</li><li>Welche Körperbereiche müssten zugänglich sein, und welche Alternativen gibt es?</li><li>Kann ich einzelne Schritte ablehnen und meine Zustimmung später zurücknehmen?</li><li>Wie vereinbaren wir ein klares Stoppsignal?</li><li>Wie läuft eine Pause oder das Beenden der Sitzung sicher ab, wenn Nadeln gesetzt sind?</li><li>Kann ich Wünsche zu Position, Begleitperson oder behandelnder Person vorher besprechen?</li></ul>
<p>Eine Praxis sollte klar sagen können, was sie ermöglichen kann und was nicht. Eine ehrliche Grenze ist hilfreicher als ein allgemeines Versprechen, jede Traumafolge behandeln zu können.</p>
<h2>Wenn während der Sitzung etwas schwierig wird</h2>
<p>Sprich Unwohlsein an, wenn das möglich ist. Eine starke emotionale Reaktion ist nicht automatisch ein Zeichen, dass ein Trauma «gelöst» wird. Sie sollte nicht als notwendiger Behandlungserfolg umgedeutet werden. Vereinbare vor Beginn, wie die behandelnde Person reagieren soll und wann fachliche Unterstützung nötig wäre.</p>
<p>Wenn dein eigentliches Anliegen die Verarbeitung von Gewalt oder Missbrauch ist, hilft die Übersicht <a href="/wissen/psychisches-trauma-behandlung/">Psychisches Trauma behandeln</a> bei der Einordnung. Für Studienfragen lies <a href="/wissen/akupunktur-bei-ptbs/">Akupunktur bei PTBS</a>. Was bei grosser Angst vor Nadeln möglich ist, erklärt <a href="/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/">Angst vor Akupunkturnadeln</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Muss ich die ganze Geschichte erzählen?</h3>
<p>Für eine Anfrage kannst du dich auf deine Wünsche zum Umgang und Ablauf beschränken. Medizinisch notwendige Angaben werden im geeigneten Gespräch geklärt.</p>
<h3>Muss ich mich auf Nadeln einlassen?</h3>
<p>Du darfst eine Behandlung ablehnen. Frage nach, bevor du einer Massnahme zustimmst.</p>
<h3>Woran erkenne ich ein unpassendes Versprechen?</h3>
<p>Garantierte Traumaauflösung, Druck zur Offenlegung oder die Behauptung, Psychotherapie werde überflüssig, sind keine tragfähige Grundlage für eine Entscheidung.</p>
<h2>Quellen</h2>
<ul><li><a href="https://www.gov.uk/government/publications/working-definition-of-trauma-informed-practice/working-definition-of-trauma-informed-practice" target="_blank" rel="noopener">GOV.UK, Office for Health Improvement and Disparities: Working definition of trauma-informed practice. 2022. (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.samhsa.gov/mental-health/trauma-violence/trauma-informed-approaches-programs" target="_blank" rel="noopener">SAMHSA: Trauma-Informed Approaches and Programs. (Webseite, abgerufen 27. Oktober 2026)</a></li><li><a href="https://www.ptsd.va.gov/professional/treat/txessentials/overview_therapy.asp" target="_blank" rel="noopener">US Department of Veterans Affairs, National Center for PTSD: Overview of Psychotherapy for PTSD. (Webseite für Fachpersonen, abgerufen 27. Oktober 2026)</a></li></ul>`,
    faqs: [],
    related: [
      { href: "/wissen/akupunktur-bei-ptbs/", label: "Akupunktur bei PTBS", cat: "Wissen" },
      { href: "/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/", label: "Angst vor Akupunkturnadeln", cat: "Frage" },
      { href: "/wissen/psychisches-trauma-behandlung/", label: "Psychisches Trauma behandeln", cat: "Wissen" },
    ],
  },
];

// Akupunktur-bei-Serie (startsWith-Filter wie artikel24SerieSlugs; vom Serien-Gate in health-audit ausgewertet).
export const traumaSerieSlugs: string[] = wissenTrauma.filter((w) => w.slug.startsWith('akupunktur-bei-')).map((w) => w.slug);
