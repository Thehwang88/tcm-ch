// Artikelpaket 24.10.2026: sieben Akupunktur-bei-Entscheidungen und zwei Methodenvergleiche.
// Gleiches Modell wie wissen-entscheidungen.ts (Wissen-Interface, FAQ und Quellen sichtbar im
// bodyHtml, faqs: [] => kein FAQPage-Schema). Die sieben akupunktur-bei-* Artikel gehören zur
// Akupunktur-bei-Serie (akupunkturSerieSlugs in wissen-akupunktur-bei.ts), die beiden Vergleiche nicht.
// Datum bis Release ungesetzt (PUBLISHED_ARTIKEL_2026_10_24 in befunde-werte.ts).
// Ownership: Erkrankung, Symptome und Abklärung bleiben bei /beschwerden/*; hier nur die
// Behandlungsentscheidung. Eigene Datei, damit wissen-akupunktur-bei.ts (offener PR #89) nicht
// zusätzlich wächst. Quellenebene je Quelle in der Quellenliste; Bericht: seo/artikel-2026-10-24.md.
import type { Wissen } from './wissen';
import { PUBLISHED_ARTIKEL_2026_10_24 } from './befunde-werte';

const REDAKTION = {
  name: 'Redaktion TCM.ch',
  role: 'Redaktionelle Einordnung',
  bio: 'Redaktionelle Einordnung auf Basis der im Artikel verlinkten Quellen. Keine ärztliche Diagnose und keine individuelle Therapieempfehlung.',
};
const DATEN_P = { datePublished: PUBLISHED_ARTIKEL_2026_10_24 ?? '', dateModified: PUBLISHED_ARTIKEL_2026_10_24 ?? '' };

export const wissenArtikel24: Wissen[] = [
  {
    slug: 'akupunktur-bei-belastungsinkontinenz',
    title: 'Akupunktur bei Belastungsinkontinenz: Studienlage und Grenzen',
    metaDesc: 'Urinverlust beim Husten, Niesen oder Heben: Was eine grosse Studie zur Elektroakupunktur bei Frauen zeigte und warum Beckenbodentraining die Grundlage bleibt.',
    region: 'Schweizweit',
    excerpt: 'Eine grosse Studie fand bei Frauen mit Belastungsinkontinenz nach sechs Wochen Elektroakupunktur weniger Urinverlust als nach einer Scheinbehandlung. Was das für deine Entscheidung bedeutet und was es nicht bedeutet.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Belastungsinkontinenz: Was zeigen die Studien?',
    lead: 'Du verlierst Urin, wenn du hustest, niest oder etwas hebst, und fragst dich, ob Akupunktur zusätzlich helfen kann. Für eine bestimmte Form der Elektroakupunktur gibt es eine grosse kontrollierte Studie bei Frauen. Sie ersetzt aber weder die Abklärung noch das Beckenbodentraining.',
    readingTime: '5 Min.',
    ctaTitle: 'Ergänzende Möglichkeiten nach der Einordnung besprechen',
    ctaText: 'Nenne die Form deiner Inkontinenz, bisherige Abklärungen und was du bereits machst, etwa Beckenbodentraining. Wir klären, ob eine ergänzende Behandlung für dich infrage kommt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Bei Frauen mit Belastungsinkontinenz hat eine grosse randomisierte Studie Elektroakupunktur in der Kreuzbeinregion mit einer Scheinbehandlung verglichen. Nach sechs Wochen ging der Urinverlust in der Elektroakupunktur-Gruppe stärker zurück. Das Ergebnis gilt für diese Form der Behandlung und für Frauen. Es lässt sich nicht ohne Weiteres auf Männer, auf jede Inkontinenzform oder auf jede Nadeltechnik übertragen.</p>
<p>Die Grundlage bleibt das Beckenbodentraining, das bei Belastungsinkontinenz gut untersucht ist. Die Einordnung der Erkrankung, die Formen und die Abklärung findest du auf der Seite <a href="/beschwerden/inkontinenz/">Inkontinenz</a>. Hier geht es nur um die Frage, ob eine ergänzende Akupunktur sinnvoll sein kann.</p>
<h2>Welche Inkontinenz hast du?</h2>
<p>Bei der Belastungsinkontinenz geht Urin verloren, wenn der Druck im Bauchraum steigt: beim Husten, Niesen, Lachen, Springen oder Heben. Bei der Dranginkontinenz kommt dagegen ein plötzlicher, kaum aufschiebbarer Harndrang. Diese Form gehört zur überaktiven Blase; die Studienlage dazu steht unter <a href="/wissen/akupunktur-bei-reizblase/">Akupunktur bei Reizblase</a>. Viele Menschen haben eine Mischform. Eine Studie zu reiner Belastungsinkontinenz beantwortet die Frage für die Mischform nicht.</p>
<p>Welche Form vorliegt, klärt eine gynäkologische oder urologische Untersuchung. Ein Blasentagebuch über einige Tage hilft dabei und zeigt später auch, ob sich etwas verändert.</p>
<h2>Was die grosse Studie zeigte</h2>
<p>Die Studie wurde 2017 in der Fachzeitschrift JAMA veröffentlicht. An zwölf Spitälern in China nahmen 504 Frauen mit Belastungsinkontinenz teil, im Durchschnitt 55 Jahre alt. Die Hälfte erhielt 18 Sitzungen Elektroakupunktur in der Lenden- und Kreuzbeinregion über sechs Wochen. Die andere Hälfte erhielt eine Schein-Elektroakupunktur an Scheinpunkten, bei der die Nadeln die Haut nicht durchdrangen.</p>
<p>Gemessen wurde vor allem der Urinverlust in einem einstündigen Vorlagentest. Zu Beginn lag er im Mittel bei 18 bis 19 Gramm. Nach sechs Wochen sank er in der Elektroakupunktur-Gruppe um 9,9 Gramm, in der Scheingruppe um 2,6 Gramm. Der Unterschied betrug 7,4 Gramm, mit einem 95-%-Konfidenzintervall von 4,8 bis 10,0 Gramm.</p>
<p>Auch die Zahl der Inkontinenz-Episoden in einem 72-Stunden-Blasentagebuch ging in einzelnen Zeiträumen stärker zurück. Der Unterschied lag bei rund einer Episode in den Wochen 1 bis 6 und bei rund zwei Episoden in den Wochen 15 bis 18 sowie 27 bis 30. Behandlungsbedingte Nebenwirkungen waren in beiden Gruppen selten und mild: 1,6 % gegenüber 2,0 %. Die Autorinnen und Autoren halten fest, dass die langfristige Wirksamkeit weiter untersucht werden muss.</p>
<h2>Was sich daraus nicht ableiten lässt</h2>
<p>Die Studie untersuchte Elektroakupunktur nach einem festen Schema. Ein Ergebnis für dieses Vorgehen ist kein Beleg für jede manuelle Akupunktur. Es ist auch kein Beleg für Männer, etwa nach einer Prostataoperation, und keiner für Inkontinenz nach Geburt, Operation oder bei neurologischen Erkrankungen.</p>
<p>Ein 2025 veröffentlichter Plan für eine weitere, kleinere Studie mit 64 Frauen ist ein Studienprotokoll. Er beschreibt, was gemessen werden soll, liefert aber noch keine Ergebnisse und ist kein zusätzlicher Wirksamkeitsnachweis.</p>
<h2>Beckenbodentraining bleibt die Grundlage</h2>
<p>Eine Cochrane-Übersicht von 2018 fand für Frauen mit Belastungsinkontinenz hochwertige Hinweise auf den Nutzen von Beckenbodentraining. In der Trainingsgruppe berichteten 56 % eine Heilung, in den Vergleichsgruppen ohne aktive Behandlung 6 %. Nach britischer Patienteninformation soll ein Trainingsprogramm mindestens drei Monate dauern; bei Bedarf folgen weitere Schritte wie Medikamente oder eine Operation.</p>
<p>Akupunktur kommt deshalb höchstens zusätzlich infrage, nicht anstelle des Trainings. Gezieltes Beckenbodentraining leiten Physiotherapeutinnen und Physiotherapeuten an.</p>
<h2>Einen Behandlungsversuch sinnvoll bewerten</h2>
<p>Halte vor Beginn fest, wie oft und in welchen Situationen du Urin verlierst und wie viele Einlagen du brauchst. Vereinbare einen Zeitpunkt, an dem ihr gemeinsam prüft, ob sich etwas Messbares verändert hat. Die sechs Wochen mit 18 Sitzungen aus der Studie sind ein Studienschema, kein Behandlungspaket, das für dich automatisch passt.</p>
<p>Zu Kosten und Zusatzversicherung gibt es eine eigene Übersicht: <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h2>Wann zuerst ärztlich abklären</h2>
<p>Wenn die Inkontinenz plötzlich auftritt, wenn Schmerzen oder Blut im Urin dazukommen oder nach Operationen gehört die ärztliche Abklärung an den Anfang. Eine ergänzende Behandlung wartet in diesen Fällen.</p>
<h2>Häufige Fragen</h2>
<h3>Was ist der Unterschied zur Reizblase?</h3>
<p>Bei der Belastungsinkontinenz verlierst du Urin unter Druck, etwa beim Husten. Bei der Reizblase steht der plötzliche Harndrang im Vordergrund. Für beide Formen gibt es eigene Studien, die sich nicht gegenseitig ersetzen.</p>
<h3>Ersetzt Akupunktur das Beckenbodentraining?</h3>
<p>Nein. Beckenbodentraining ist bei Belastungsinkontinenz die gut belegte erste Massnahme. Die Studie zur Elektroakupunktur verglich mit einer Scheinbehandlung, nicht mit Training.</p>
<h3>Woran erkenne ich, ob ein Behandlungsversuch etwas bringt?</h3>
<p>An messbaren Veränderungen gegenüber deinem Ausgangswert: weniger Episoden, weniger Einlagen, weniger Urinverlust in den Situationen, die dich stören. Bleibt das zum vereinbarten Prüfzeitpunkt aus, ist eine Fortsetzung nach demselben Schema keine sinnvolle Antwort.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://jamanetwork.com/journals/jama/fullarticle/2633916" target="_blank" rel="noopener">Liu Z et al. Effect of Electroacupuncture on Urinary Leakage Among Women With Stress Urinary Incontinence: A Randomized Clinical Trial. JAMA, 2017. PMID 28655016. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/41696148/" target="_blank" rel="noopener">Ming S et al. Clinical efficacy of electroacupuncture on pelvic floor function in women with stress urinary incontinence: a randomized sham-controlled trial protocol. Frontiers in Global Women’s Health, 2025. PMID 41696148. (Studienprotokoll, PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/30288727/" target="_blank" rel="noopener">Dumoulin C et al. Pelvic floor muscle training versus no treatment, or inactive control treatments, for urinary incontinence in women. Cochrane Database of Systematic Reviews, 2018. PMID 30288727. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/urinary-incontinence/treatment/" target="_blank" rel="noopener">NHS. Urinary incontinence: Non-surgical treatment. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/inkontinenz/', label: 'Inkontinenz', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-reizblase/', label: 'Akupunktur bei Reizblase', cat: 'Wissen' },
      { href: '/therapien/elektroakupunktur/', label: 'Elektroakupunktur', cat: 'Therapie' },
      { href: '/therapien/physiotherapie/', label: 'Physiotherapie', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-rhizarthrose',
    title: 'Akupunktur bei Rhizarthrose: Studienlage und Grenzen',
    metaDesc: 'Rhizarthrose: Eine kontrollierte Studie fand keinen Unterschied zwischen echter und Scheinakupunktur. Was das für Schmerzziele, Schiene und Handtherapie heisst.',
    region: 'Schweizweit',
    excerpt: 'In der einzigen hier ausgewerteten spezifischen Studie zur Rhizarthrose wurden beide Gruppen besser, echte Akupunktur aber nicht mehr als die Scheinbehandlung. Eine realistische Einordnung für deine Entscheidung.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Rhizarthrose: Hilfe gegen Daumenschmerzen?',
    lead: 'Deine Rhizarthrose ist diagnostiziert, der Daumen schmerzt beim Greifen, und du überlegst, ob Akupunktur eine Ergänzung sein kann. Die spezifische Studienlage ist dünn und spricht nicht für eine besondere Wirkung der Nadeln. Was du trotzdem wissen solltest.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzende Schmerzbehandlung realistisch besprechen',
    ctaText: 'Nenne deine Diagnose, die laufende Behandlung und welche Griffe im Alltag am meisten schmerzen. Wir besprechen offen, was eine ergänzende Behandlung leisten kann und was nicht.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Eine randomisierte Studie mit 70 Menschen verglich echte Akupunktur mit einer Scheinbehandlung, bei der die Nadeln die Haut nicht durchdrangen. Beide Gruppen hatten danach deutlich weniger Schmerzen. Echte Akupunktur schnitt aber nicht besser ab als die Scheinbehandlung. Ein spezifischer Nutzen der Nadeln bei Rhizarthrose ist damit nicht belegt.</p>
<p>Der Knorpel im Daumensattelgelenk wächst durch keine dieser Behandlungen nach. Diagnose, Stadium und die Entscheidung über Schiene, Handtherapie, Infiltration oder Operation gehören zur ärztlichen Behandlung; die Grundlagen dazu stehen auf der Seite <a href="/beschwerden/rhizarthrose/">Rhizarthrose</a>.</p>
<h2>Was die spezifische Studie zeigte</h2>
<p>Die Studie stammt aus einem britischen Handzentrum und wurde 2020 veröffentlicht. 70 Menschen mit Arthrose des Daumensattelgelenks, die zuvor nie Akupunktur erhalten hatten, wurden zufällig zwei Gruppen zu je 35 Personen zugeteilt. Die eine Gruppe erhielt echte Akupunktur, die andere eine nicht eindringende Scheinnadelung. Die Studie war einfach verblindet, und die Messungen wurden verblindet erhoben.</p>
<p>Gemessen wurden Schmerzen bei verschiedenen Griffen und Bewegungen sowie die Handfunktion mit einem Fragebogen. Eine Woche nach der Behandlung hatten beide Gruppen statistisch und klinisch deutlich weniger Schmerzen als zu Beginn. Zwischen den Gruppen gab es keinen Unterschied. Die Autorinnen und Autoren folgern, dass die Schmerzlinderung wohl über unspezifische Mechanismen zustande kam.</p>
<h2>Wie du das Ergebnis lesen kannst</h2>
<p>Dass es dir nach Behandlungen besser geht, kann echt sein. Die Studie spricht nur dagegen, diese Besserung den Nadeln an sich zuzuschreiben. Zuwendung, Erwartung, Ruhephasen für die Hand und der natürliche Verlauf können ebenfalls eine Rolle spielen. Über längere Zeiträume als die ausgewertete Woche nach der Behandlung macht die Zusammenfassung keine Aussage.</p>
<p>Dass Arthroseschmerzen an anderen Gelenken häufiger untersucht wurden, ändert an diesem spezifischen Ergebnis nichts. Ein Befund am Knie lässt sich nicht einfach auf den Daumen übertragen.</p>
<h2>Was im Behandlungsplan zuerst kommt</h2>
<p>Nach britischer Patienteninformation können bei Arthrose der Hand schmerzlindernde Gels, eine Schiene zur Entlastung und die Beratung durch Ergotherapie mit Hilfsmitteln für den Alltag helfen. Diese Schritte bespricht deine Ärztin oder die Handtherapie mit dir. Eine ergänzende Behandlung soll diesen Plan nicht ersetzen.</p>
<h2>Welche Ziele du im Alltag beobachten kannst</h2>
<p>Wenn du eine ergänzende Behandlung versuchen möchtest, halte vorher konkrete Alltagsziele fest: einen Schlüssel drehen, ein Glas öffnen, eine Tasche tragen, schreiben. Vereinbare einen Zeitpunkt, an dem ihr prüft, ob sich bei diesen Griffen etwas verändert hat. Bleibt eine Veränderung aus, ist mehr vom Gleichen keine sinnvolle Antwort.</p>
<p>Zu Kosten und Zusatzversicherung: <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h2>Wann zuerst ärztlich abklären</h2>
<p>Eine starke Schwellung mit Rötung und Überwärmung, Schmerzen nach einem Sturz oder Taubheit und Kribbeln in den Fingern gehören zuerst ärztlich angeschaut. Kribbeln in Daumen, Zeige- und Mittelfinger kann auch auf ein <a href="/beschwerden/karpaltunnelsyndrom/">Karpaltunnelsyndrom</a> hinweisen.</p>
<h2>Häufige Fragen</h2>
<h3>Behebt Akupunktur den Verschleiss?</h3>
<p>Nein. Keine der hier genannten Behandlungen baut Knorpel wieder auf. Ziel einer ergänzenden Behandlung kann höchstens sein, Schmerzen im Alltag zu lindern.</p>
<h3>Was sagt die spezifische Studie genau?</h3>
<p>Beide Gruppen hatten nach der Behandlung weniger Schmerzen, echte Akupunktur aber nicht mehr als die Scheinbehandlung. Die Studie war mit 70 Teilnehmenden klein und mass kurz nach der Behandlung.</p>
<h3>Welche Ziele lassen sich realistisch beobachten?</h3>
<p>Konkrete Griffe und Tätigkeiten, die dir heute schwerfallen. Schreibe sie vor Beginn auf und vergleiche zum vereinbarten Zeitpunkt.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/32212888/" target="_blank" rel="noopener">Barnard A et al. A randomized controlled trial of real versus sham acupuncture for basal thumb joint arthritis. Journal of Hand Surgery (European Volume), 2020. PMID 32212888. DOI 10.1177/1753193420911326. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/osteoarthritis/treatment/" target="_blank" rel="noopener">NHS. Osteoarthritis: Treatment. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/rhizarthrose/', label: 'Rhizarthrose', cat: 'Beschwerde' },
      { href: '/beschwerden/arthrose/', label: 'Arthrose', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Akupunktur: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'akupunktur-bei-vulvodynie',
    title: 'Akupunktur bei Vulvodynie: Ergänzung mit klaren Grenzen',
    metaDesc: 'Vulvodynie: Eine doppelblinde Studie fand nach der Behandlung keinen Unterschied zwischen Akupunktur und Placebo. Was die Nachbeobachtung zeigt und was sie nicht beweist.',
    region: 'Schweizweit',
    excerpt: 'Akupunktur wurde bei Vulvodynie in einer doppelblinden Studie geprüft. Direkt nach der Behandlung half sie nicht mehr als Placebo-Nadeln. Was das für eine mögliche Ergänzung im Behandlungsplan heisst.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Vulvodynie: Ergänzung mit welchen Grenzen?',
    lead: 'Vulvodynie ist belastend, und oft braucht es mehrere Anläufe, bis eine Behandlung hilft. Wenn du überlegst, ob Akupunktur dazugehören kann, lohnt sich ein genauer Blick auf die Studienlage. Sie ist ehrlicher, als es viele Versprechen sind.',
    readingTime: '5 Min.',
    ctaTitle: 'Ergänzende Unterstützung im Behandlungsplan besprechen',
    ctaText: 'Nenne deine Diagnose und wer dich bereits behandelt. Wir besprechen offen, ob eine ergänzende Behandlung in deinen Plan passt, und welche Bereiche du ausschliessen möchtest.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>In einer doppelblinden Studie mit 89 Frauen gab es direkt nach zehn Behandlungen keinen gesicherten Unterschied zwischen echter Akupunktur und Placebo-Nadeln. Das galt für den Vulvaschmerz und für Schmerzen beim Geschlechtsverkehr. In beiden Gruppen besserten sich die Beschwerden bei mehr als der Hälfte der Teilnehmerinnen.</p>
<p>Ein Ergebnis aus der Nachbeobachtung deutet darauf hin, dass die Besserung nach echter Akupunktur bei einem Teil der Frauen länger anhielt. Das ist ein Hinweis aus einer Teilgruppe, kein Erfolgsversprechen. Akupunktur kommt deshalb höchstens ergänzend in einem abgestimmten Behandlungsplan infrage. Diagnose und Grundlagen stehen auf der Seite <a href="/beschwerden/vulvodynie/">Vulvodynie</a>.</p>
<h2>Zuerst die gynäkologische Diagnose</h2>
<p>Vulvodynie bedeutet Schmerzen an der Vulva, die mindestens drei Monate anhalten, ohne dass sich eine bestimmte Ursache findet. Bevor diese Diagnose steht, werden andere Ursachen ausgeschlossen: Infektionen, Hauterkrankungen wie <a href="/beschwerden/lichen-sclerosus/">Lichen sclerosus</a>, ein <a href="/beschwerden/vaginismus/">Vaginismus</a> oder eine <a href="/beschwerden/pudendusneuralgie/">Pudendusneuralgie</a>. Diese Bilder klingen ähnlich, werden aber unterschiedlich behandelt.</p>
<h2>Was zur üblichen Behandlung gehört</h2>
<p>Nach britischer Patienteninformation wird Vulvodynie oft von mehreren Fachpersonen gemeinsam behandelt. Infrage kommen Medikamente, etwa betäubende Cremes oder Tabletten gegen Nervenschmerzen, Beckenbodentherapie, vaginale Trainer, psychologische Unterstützung wie kognitive Verhaltenstherapie oder Sexualtherapie und selten eine Operation. Keine einzelne Behandlung hilft allen. Psychologische Unterstützung ist dabei ein Baustein der Schmerzbehandlung und keine Aussage darüber, dass die Schmerzen eingebildet wären.</p>
<h2>Was die doppelblinde Studie zeigte</h2>
<p>Die Studie wurde 2026 im Journal of Pain veröffentlicht. 89 Frauen zwischen 19 und 62 Jahren erhielten zehn Sitzungen nach einem standardisierten Schema mit 13 Nadeln. Die Hälfte erhielt echte Akupunktur, die andere Hälfte Placebo-Nadeln, die die Haut nur berührten. Die Studie war doppelblind angelegt und verwendete dafür spezielle Nadelsysteme. 91 % schlossen die Behandlung ab.</p>
<p>Nach der zehnten Sitzung lag der Anteil der Frauen mit einer klinisch bedeutsamen Besserung bei 58 % mit Akupunktur und bei 57 % mit Placebo. Beim Vulvaschmerz und bei Schmerzen beim Geschlechtsverkehr fand sich kein signifikanter Unterschied zwischen den Gruppen.</p>
<p>Die Frauen mit Besserung wurden zwölf Wochen weiter beobachtet. In der Placebogruppe kehrten die Schmerzen häufiger auf den Ausgangswert zurück als in der Akupunkturgruppe. Die Autorinnen und Autoren halten grössere Studien für nötig und vermuten, dass der starke Placeboeffekt der hautberührenden Nadeln die Wirkung unterschätzt haben könnte. Das bleibt eine Vermutung.</p>
<h2>Was der Vergleich mit Placebo bedeutet</h2>
<p>Eine Besserung um mehr als die Hälfte in beiden Gruppen zeigt, wie stark Zuwendung, Erwartung und Behandlungsrahmen bei Schmerzen wirken. Für die Frage, ob die Nadeln selbst etwas beitragen, zählt der Unterschied zwischen den Gruppen. Der war direkt nach der Behandlung nicht nachweisbar. Die längere Wirkung bei einem Teil der Frauen ist ein Befund aus einer kleineren Teilgruppe und muss bestätigt werden.</p>
<h2>Was vor einer ergänzenden Behandlung zu klären ist</h2>
<p>Sprich mit deiner Gynäkologin oder deinem Behandlungsteam, bevor du etwas ergänzt, und nenne in der Anfrage, welche Behandlung läuft. Vereinbare ein konkretes Ziel und einen Prüfzeitpunkt. Zu Kosten und Zusatzversicherung: <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Ersetzt Akupunktur die gynäkologische Behandlung?</h3>
<p>Nein. Die Studie zeigte keinen gesicherten Vorteil gegenüber Placebo direkt nach der Behandlung. Akupunktur kann höchstens zusätzlich und abgestimmt erwogen werden.</p>
<h3>Was bedeutet der Vergleich mit Placebo-Nadeln für mich?</h3>
<p>Dass sich viele Frauen in beiden Gruppen besser fühlten, ist real. Es lässt sich aber nicht allein den Nadeln zuschreiben. Eine Erwartung, die über das Studienergebnis hinausgeht, solltest du nicht haben.</p>
<h3>Muss die Behandlung im schmerzhaften Bereich erfolgen?</h3>
<p>Diese Seite beschreibt bewusst keine Punkte oder Techniken. Wo behandelt wird, besprichst du vorher mit der Fachperson. Du entscheidest mit und kannst jeden Körperbereich ablehnen.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/41429681/" target="_blank" rel="noopener">Schlaeger JM et al. Long-lasting effect of penetrating acupuncture among responders: Double-blind RCT of acupuncture for vulvodynia. The Journal of Pain, 2026. PMID 41429681. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/vulvodynia/" target="_blank" rel="noopener">NHS. Vulvodynia. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/vulvodynie/', label: 'Vulvodynie', cat: 'Beschwerde' },
      { href: '/beschwerden/dyspareunie/', label: 'Dyspareunie', cat: 'Beschwerde' },
      { href: '/beschwerden/beckenbodenverspannung/', label: 'Beckenbodenverspannung', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-gastroparese',
    title: 'Akupunktur bei Gastroparese: Was ist belegt?',
    metaDesc: 'Diagnostizierte Gastroparese: Was Cochrane und Leitlinien zur Akupunktur sagen, warum die Evidenz schwach ist und weshalb sie fast nur diabetische Formen betrifft.',
    region: 'Schweizweit',
    excerpt: 'Die Studien zur Akupunktur bei Gastroparese stammen fast ausschliesslich aus der diabetischen Form und haben eine sehr niedrige Vertrauenswürdigkeit. Was das für eine Ergänzung nach gastroenterologischer Abklärung bedeutet.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Gastroparese: Was ist belegt?',
    lead: 'Bei einer Gastroparese entleert sich der Magen verzögert, ohne dass etwas den Ausgang versperrt. Wenn die Diagnose steht und die Beschwerden bleiben, liegt die Frage nach Ergänzungen nahe. Für Akupunktur ist die Antwort zurückhaltend.',
    readingTime: '5 Min.',
    ctaTitle: 'Ergänzung nach gastroenterologischer Abklärung besprechen',
    ctaText: 'Nenne die Diagnose, die Ursache der Gastroparese, laufende Medikamente und dein wichtigstes Beschwerdeziel. Wir klären, ob eine ergänzende Behandlung sinnvoll sein kann.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Die Studien zu Akupunktur bei Gastroparese stammen fast alle aus der diabetischen Form. Eine Cochrane-Übersicht von 2018 fand nur sehr niedrige Vertrauenswürdigkeit für einen kurzfristigen Nutzen und Hinweise auf Publikationsverzerrung. Im Vergleich mit Scheinakupunktur zeigte sich kein Unterschied. Die amerikanische Fachgesellschaft ACG hält Akupunktur bei diabetischer Gastroparese für möglicherweise hilfreich, bei schwacher Empfehlung und sehr niedriger Evidenz, für andere Ursachen nicht.</p>
<p>Diagnose, Ernährung und Medikamente gehören zur gastroenterologischen Betreuung. Die Grundlagen zum Krankheitsbild stehen auf der Seite <a href="/beschwerden/gastroparese/">Gastroparese</a>.</p>
<h2>Gastroparese ist eine gesicherte Diagnose</h2>
<p>Ähnliche Beschwerden wie Völlegefühl, Übelkeit oder frühe Sättigung haben viele Ursachen. Vor der Diagnose Gastroparese werden andere Erkrankungen ausgeschlossen, etwa mit einer <a href="/gesundheitsbibliothek/untersuchungen/gastroskopie/">Magenspiegelung</a>, und die Magenentleerung wird gemessen. Die Leitlinie der amerikanischen Fachgesellschaft AGA von 2025 empfiehlt dafür einen vierstündigen Test. Ohne verzögerte Entleerung kommt eher eine <a href="/beschwerden/funktionelle-dyspepsie/">funktionelle Dyspepsie</a> infrage, für die andere Überlegungen gelten.</p>
<h2>Was die Cochrane-Übersicht fand</h2>
<p>Die Übersicht umfasste 32 Studien mit 2601 Teilnehmenden, Suchstand März 2018. In 31 Studien war die Ursache Diabetes, in einer eine Operation. Die meisten Studien massen nur kurzfristig, und fast alle hatten unklare oder hohe Verzerrungsrisiken.</p>
<ul>
<li>Gegenüber Scheinakupunktur: Bei den Beschwerden nach drei Monaten fand sich mit einem validierten Fragebogen kein Unterschied. Die Vertrauenswürdigkeit dieses Ergebnisses ist niedrig.</li>
<li>Gegenüber magenanregenden Medikamenten: In zwölf Studien mit 963 Teilnehmenden berichteten nach vier bis zwölf Wochen mehr Menschen mit Akupunktur eine Besserung. Die Vertrauenswürdigkeit ist sehr niedrig.</li>
<li>Zusätzlich zur Standardbehandlung: ebenfalls mehr berichtete Besserungen, ebenfalls mit sehr niedriger Vertrauenswürdigkeit.</li>
</ul>
<p>Die Autorinnen und Autoren fanden Hinweise darauf, dass kleine Studien mit positiven Ergebnissen eher veröffentlicht wurden. Sie schreiben, die berichteten Effekte könnten deutlich vom wahren Effekt abweichen. Für andere Ursachen als Diabetes lässt sich mangels Daten keine Aussage machen. Nebenwirkungen wurden unvollständig berichtet.</p>
<h2>Was die Leitlinien sagen</h2>
<p>Die Leitlinie des American College of Gastroenterology (ACG) von 2022 gibt eine bedingte Empfehlung bei sehr niedriger Evidenzqualität: Akupunktur allein oder zusammen mit magenanregenden Medikamenten kann bei diabetischer Gastroparese die Beschwerden lindern. Für andere Ursachen kann sie nicht empfohlen werden. Die Zusammenfassung der AGA-Leitlinie von 2025 nennt Empfehlungen zu Diagnostik und Medikamenten; zur Akupunktur äussert sie sich dort nicht.</p>
<p>Gastroparese nach einer Operation wurde in der Cochrane-Übersicht nur in einer einzigen Studie untersucht. Die Ergebnisse der diabetischen Form lassen sich darauf nicht übertragen.</p>
<h2>Was im Behandlungsplan zuerst kommt</h2>
<p>Nach britischer Patienteninformation gehören kleinere, häufigere Mahlzeiten, weniger unlösliche Nahrungsfasern und bei Bedarf flüssigere Kost zu den ersten Schritten. Bei Diabetes ist die Einstellung des Blutzuckers wichtig. Medikamente und weitere Verfahren entscheidet die Gastroenterologie. Eine ergänzende Behandlung soll diesen Plan nicht ersetzen und keine Medikamentenänderung auslösen.</p>
<h2>Wann eine ergänzende Behandlung nicht reicht</h2>
<p>Wiederholtes Erbrechen, ungewollter Gewichtsverlust, Zeichen von Flüssigkeitsmangel oder entgleiste Blutzuckerwerte brauchen ärztliche Betreuung. Erbrochenes, das wie Kaffeesatz aussieht, ist ein Notfall: 144 wählen.</p>
<h2>Häufige Fragen</h2>
<h3>Gilt die Studienlage für jede Ursache?</h3>
<p>Nein. Fast alle Studien betrafen die diabetische Gastroparese. Für andere Ursachen fehlen Daten, und die Leitlinie der ACG empfiehlt Akupunktur dort nicht.</p>
<h3>Beschleunigt Akupunktur nachweislich die Magenentleerung?</h3>
<p>Das ist nicht belegt. Die Übersicht wertete vor allem berichtete Besserungen aus, mit sehr niedriger Vertrauenswürdigkeit. Gegenüber Scheinakupunktur fand sich bei den Beschwerden kein Unterschied.</p>
<h3>Wann reicht eine ergänzende Behandlung nicht?</h3>
<p>Bei anhaltendem Erbrechen, Gewichtsverlust, Flüssigkeitsmangel oder schwankendem Blutzucker. Dann steht die ärztliche Behandlung im Vordergrund.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/30560568/" target="_blank" rel="noopener">Kim KH et al. Acupuncture for symptomatic gastroparesis. Cochrane Database of Systematic Reviews, 2018. PMID 30560568. (PubMed-Abstract)</a></li>
<li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9373497/" target="_blank" rel="noopener">Camilleri M et al. ACG Clinical Guideline: Gastroparesis. American Journal of Gastroenterology, 2022. PMID 35926490. (Volltext, Empfehlung 16 geprüft)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/40976635/" target="_blank" rel="noopener">Staller K et al. AGA Clinical Practice Guideline on Management of Gastroparesis. Gastroenterology, 2025. PMID 40976635. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/gastroparesis/" target="_blank" rel="noopener">NHS. Gastroparesis. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/gastroparese/', label: 'Gastroparese', cat: 'Beschwerde' },
      { href: '/beschwerden/funktionelle-dyspepsie/', label: 'Funktionelle Dyspepsie', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/untersuchungen/gastroskopie/', label: 'Magenspiegelung', cat: 'Untersuchung' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-crps',
    title: 'Akupunktur bei CRPS: Einordnung im Schmerztherapieplan',
    metaDesc: 'CRPS (Morbus Sudeck): Was die wenigen Studien zur Akupunktur zeigen, warum sie keine Heilung versprechen und was bei Berührungsempfindlichkeit zu beachten ist.',
    region: 'Schweizweit',
    excerpt: 'Zu Akupunktur bei CRPS gibt es nur wenige kleine Studien mit gemischten Ergebnissen. Eine Einordnung für Menschen, die eine Ergänzung im interdisziplinären Behandlungsplan erwägen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei CRPS: Einordnung im Schmerztherapieplan',
    lead: 'Beim komplexen regionalen Schmerzsyndrom ist die Behandlung oft langwierig, und viele Betroffene suchen nach Ergänzungen. Die Studienlage zur Akupunktur ist dünn. Was sich ehrlich sagen lässt und worauf du achten solltest.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzung mit deinem Schmerzteam abstimmen',
    ctaText: 'Nenne die Diagnose, dein behandelndes Team und wie empfindlich der betroffene Bereich auf Berührung reagiert. Wir besprechen, ob und wie eine schonende Ergänzung überhaupt sinnvoll ist.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Für Akupunktur bei CRPS gibt es nur sehr wenige kontrollierte Studien. Eine kleine Studie mit 14 Betroffenen fand keinen Unterschied zwischen echter Akupunktur und Scheinakupunktur. Eine grössere Studie betraf eine besondere Gruppe, nämlich CRPS nach einem Schlaganfall. Eine Heilung oder eine Reparatur von Nerven ist nicht belegt.</p>
<p>Akupunktur kommt höchstens als vorsichtige Ergänzung in einem interdisziplinären Behandlungsplan infrage. Diagnose, Symptome und Verlauf stehen auf der Seite <a href="/beschwerden/crps/">CRPS</a>.</p>
<h2>Wie CRPS heute behandelt wird</h2>
<p>CRPS verursacht anhaltende, starke Schmerzen, meist an einem Arm oder Bein, oft nach einer Verletzung. Die Haut kann so empfindlich werden, dass schon leichte Berührung oder Temperaturwechsel starke Schmerzen auslösen. Nach britischer Patienteninformation gibt es keine Heilung, aber Behandlungen, die helfen können: Aufklärung und Selbstmanagement, aktive Rehabilitation wie Physiotherapie, Schmerzmedikamente und psychologische Unterstützung. Meist sind mehrere Fachpersonen beteiligt.</p>
<p>Eine Cochrane-Übersicht von 2023 fand für keine einzige CRPS-Behandlung Evidenz hoher Vertrauenswürdigkeit. Für viele gebräuchliche Verfahren ist die Studienlage zu schwach, um sie zu stützen oder zu widerlegen.</p>
<h2>Was die Studien zur Akupunktur zeigen</h2>
<p>Eine Studie von 1999 untersuchte 14 Menschen mit akutem CRPS an Arm oder Hand. Alle erhielten die gleiche Standardbehandlung, dazu entweder klassische Akupunktur oder Scheinakupunktur, fünfmal pro Woche über drei Wochen. Beide Gruppen besserten sich deutlich. Einen Unterschied zwischen den Gruppen fanden die Forschenden bei dieser kleinen Zahl nicht.</p>
<p>Die Praxisleitlinie zu CRPS in fünfter Auflage (Pain Medicine, 2022) nennt zwei randomisierte Studien. Neben der kleinen Studie ohne Unterschied berichtete eine Studie mit 96 Menschen mit CRPS Typ I nach einem Schlaganfall über weniger Schmerzen und bessere Beweglichkeit 40 Tage nach der Behandlung. Die Leitlinie hält fest, dass deutlich mehr Forschung nötig ist.</p>
<p>CRPS nach einem Schlaganfall unterscheidet sich von CRPS nach einem Bruch oder einer Operation. Das Ergebnis lässt sich deshalb nicht auf alle Formen übertragen.</p>
<h2>Was bei Berührungs&shy;empfindlichkeit wichtig ist</h2>
<p>Wenn schon leichte Berührung schmerzt, muss vor jeder Nadel- oder Druckbehandlung geklärt werden, ob und wo Berührung zumutbar ist. Eine Behandlung soll keine Schmerzen provozieren. Kräftige Techniken wie starkes Schröpfen oder intensiver Druck am betroffenen Arm oder Bein passen dazu nicht. Du kannst jede Region und jede Technik ablehnen.</p>
<h2>Abstimmung mit dem behandelnden Team</h2>
<p>Sprich eine Ergänzung mit deinem Schmerzteam oder deiner Physiotherapie ab. Aktive Übungen und Medikamente laufen weiter. Halte ein konkretes Ziel fest und einen Zeitpunkt, an dem ihr prüft, ob die Ergänzung etwas beiträgt. Zu Kosten und Zusatzversicherung: <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Ersetzt Akupunktur die Schmerztherapie?</h3>
<p>Nein. Die wenigen Studien rechtfertigen keinen Ersatz für Rehabilitation, Medikamente oder psychologische Unterstützung.</p>
<h3>Welche Behandlung vertrage ich bei Berührungs&shy;empfindlichkeit?</h3>
<p>Das lässt sich nur individuell klären. Eine Behandlung darf die Schmerzen nicht verstärken. Sanfte Vorgehensweisen und Bereiche ausserhalb der betroffenen Region werden vorher besprochen, und du entscheidest mit.</p>
<h3>Gibt es belastbare Studien zu CRPS?</h3>
<p>Nicht für Akupunktur. Die vorhandenen Studien sind klein oder betreffen eine besondere Gruppe. Auch für viele andere CRPS-Behandlungen fehlen hochwertige Studien.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9186375/" target="_blank" rel="noopener">Harden RN et al. Complex Regional Pain Syndrome: Practical Diagnostic and Treatment Guidelines, 5th Edition. Pain Medicine, 2022. PMID 35687369. (Volltext, Abschnitt Akupunktur geprüft)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/37306570/" target="_blank" rel="noopener">Ferraro MC et al. Interventions for treating pain and disability in adults with complex regional pain syndrome: an overview of systematic reviews. Cochrane Database of Systematic Reviews, 2023. PMID 37306570. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/10427802/" target="_blank" rel="noopener">Korpan MI et al. Acupuncture in the treatment of posttraumatic pain syndrome. Acta Orthopaedica Belgica, 1999. PMID 10427802. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/complex-regional-pain-syndrome/" target="_blank" rel="noopener">NHS. Complex regional pain syndrome. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/crps/', label: 'CRPS', cat: 'Beschwerde' },
      { href: '/beschwerden/nervenschmerzen/', label: 'Nervenschmerzen', cat: 'Beschwerde' },
      { href: '/therapien/physiotherapie/', label: 'Physiotherapie', cat: 'Therapie' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-erektiler-dysfunktion',
    title: 'Akupunktur bei Erektionsstörungen: Nutzen und Grenzen',
    metaDesc: 'Erektile Dysfunktion: Was eine Übersicht zur Akupunktur zeigt, warum die Daten vor allem psychogene Formen betreffen und weshalb zuerst die ärztliche Abklärung kommt.',
    region: 'Schweizweit',
    excerpt: 'Studien zur Akupunktur bei Erektionsstörungen sind meist klein, oft verzerrt und betreffen vor allem psychogene Formen. Eine nüchterne Einordnung, bevor du eine Ergänzung erwägst.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Erektionsstörungen: Nutzen und Grenzen',
    lead: 'Erektionsprobleme sind häufig und haben viele mögliche Ursachen. Wenn du überlegst, ob Akupunktur ergänzend helfen kann, lohnt sich zuerst ein Blick darauf, was die Studien tatsächlich untersucht haben.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzende Optionen nach der ärztlichen Einordnung besprechen',
    ctaText: 'Nenne, was ärztlich bereits abgeklärt ist und welche Behandlung läuft. Wir besprechen offen, ob eine ergänzende Behandlung zu deiner Situation passt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Eine systematische Übersicht von 2019 fand 22 randomisierte Studien, davon 14 zu psychogenen Erektionsstörungen. Die meisten hatten ein hohes oder unklares Verzerrungsrisiko. Die Autorinnen und Autoren sehen Hinweise niedriger Qualität auf einen Nutzen von Akupunktur als Ergänzung, vor allem bei psychogenen Formen. Die einzige Studie gegen eine Scheinbehandlung fand keinen Unterschied.</p>
<p>Erektionsstörungen können ein Hinweis auf andere Erkrankungen sein. Die ärztliche Abklärung kommt deshalb zuerst. Die Grundlagen stehen auf der Seite <a href="/beschwerden/erektile-dysfunktion/">Erektile Dysfunktion</a>.</p>
<h2>Warum die Abklärung zuerst kommt</h2>
<p>Nach britischer Patienteninformation können häufige Erektionsstörungen mit Erkrankungen wie hohem Blutdruck oder erhöhtem Cholesterin zusammenhängen. Sie können auch eine Nebenwirkung von Medikamenten sein. Bei der Abklärung wird unter anderem der Blutdruck gemessen. Die Leitlinie der Europäischen Gesellschaft für Urologie beschreibt eine schrittweise Diagnostik und rät, alle Behandlungsmöglichkeiten gemeinsam zu besprechen.</p>
<p>Eine verminderte Lust ist etwas anderes als eine Erektionsstörung, und ein niedriger <a href="/gesundheitsbibliothek/befunde-werte/testosteron-wert/">Testosteronwert</a> ist eine eigene Frage. Beides lässt sich nicht gleichsetzen.</p>
<h2>Was zur üblichen Behandlung gehört</h2>
<p>Die wichtigsten Medikamente sind sogenannte PDE-5-Hemmer, die die Durchblutung des Penis fördern. Dazu kommen Vakuumpumpen, die Behandlung von Ursachen und Änderungen im Lebensstil. Kaufe solche Medikamente nicht ungeprüft im Internet; viele Websites verkaufen Fälschungen.</p>
<h2>Was die Übersicht genau zeigte</h2>
<ul>
<li>Elektroakupunktur gegen eine Scheinbehandlung mit elektrischer Stimulation: kein Unterschied bei Zufriedenheit und Selbsteinschätzung. Grundlage war eine einzige Studie.</li>
<li>Akupunktur zusätzlich zu Tadalafil: in zwei Studien bessere Werte als das Medikament allein.</li>
<li>Akupunktur zusätzlich zu Kräutern: in sieben Studien bessere Werte als Kräuter allein.</li>
</ul>
<p>Die Vergleiche mit Kombinationen sagen wenig darüber, was die Nadeln selbst beitragen, weil eine Scheinbehandlung fehlte. Nebenwirkungen wurden unzureichend berichtet. Die Autorinnen und Autoren fordern grosse, sorgfältig geplante Studien. Ergebnisse aus Teilgruppen lassen sich nicht auf jede Ursache übertragen.</p>
<h2>Wann eine Ergänzung überhaupt infrage kommt</h2>
<p>Am ehesten, wenn die ärztliche Abklärung abgeschlossen ist und Stress, Anspannung oder Leistungsdruck eine erkennbare Rolle spielen. Eine Ergänzung ersetzt keine verordneten Medikamente und keine Behandlung einer Grunderkrankung. Zu Kosten und Zusatzversicherung: <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Hilft Akupunktur bei jeder Ursache?</h3>
<p>Das ist nicht belegt. Die Studien betrafen vor allem psychogene Erektionsstörungen. Bei Ursachen wie Gefässerkrankungen oder Medikamentennebenwirkungen stützen sie keine Aussage.</p>
<h3>Ersetzt Akupunktur verordnete Medikamente?</h3>
<p>Nein. Ändere verordnete Medikamente nur nach Rücksprache mit deiner Ärztin oder deinem Arzt.</p>
<h3>Was sollte vor einem Termin geklärt sein?</h3>
<p>Eine ärztliche Untersuchung mit Blutdruckmessung und, je nach Befund, weiteren Abklärungen, eine Liste deiner Medikamente und die Frage, ob eine körperliche Ursache vorliegt.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/30929323/" target="_blank" rel="noopener">Lai BY et al. Acupuncture for Treatment of Erectile Dysfunction: A Systematic Review and Meta-Analysis. World Journal of Men’s Health, 2019. PMID 30929323. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/34183196/" target="_blank" rel="noopener">Salonia A et al. European Association of Urology Guidelines on Sexual and Reproductive Health, 2021 Update: Male Sexual Dysfunction. European Urology, 2021. PMID 34183196. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/erection-problems-erectile-dysfunction/" target="_blank" rel="noopener">NHS. Erectile dysfunction (impotence). (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/erektile-dysfunktion/', label: 'Erektile Dysfunktion', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/befunde-werte/testosteron-wert/', label: 'Testosteron-Wert', cat: 'Befund' },
      { href: '/beschwerden/stress-burnout/', label: 'Stress & Burnout', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-bettnaessen',
    title: 'Akupunktur bei Bettnässen: Was Eltern wissen sollten',
    metaDesc: 'Bettnässen bei Kindern: Was Studien zu Akupunktur, Laser und Akupressur zeigen, warum die Evidenz schwach ist und was zuerst kommt.',
    region: 'Schweizweit',
    excerpt: 'Die Studien zu Akupunktur bei Bettnässen sind meist klein und methodisch schwach. Eine Einordnung für Eltern, die nach der kinderärztlichen Abklärung über Ergänzungen nachdenken.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Bettnässen: Was Eltern wissen sollten',
    lead: 'Bettnässen ist häufig, belastet Kinder und Eltern und ist niemandes Schuld. Wenn du dich fragst, ob Akupunktur helfen kann, findest du hier, was die Studien zeigen und was zuerst kommt.',
    readingTime: '5 Min.',
    ctaTitle: 'Eignung fachlich klären',
    ctaText: 'Nenne das Alter deines Kindes, was kinderärztlich abgeklärt wurde und was ihr bereits versucht habt. Wir sagen offen, ob eine Beratung sinnvoll ist, und auch, wenn nicht.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Zu Akupunktur und verwandten Verfahren bei Bettnässen gibt es viele Studien, die meisten sind aber klein und methodisch schwach. Eine Cochrane-Übersicht mit Suchstand Juni 2010 fand nur schwache Hinweise aus einzelnen kleinen Studien. Eine spätere Übersicht mit Suchstand Juni 2014 hält einen Nutzen für möglich, warnt aber, dass er wegen der geringen Studienqualität überschätzt sein könnte.</p>
<p>Besser untersucht sind der Bettnässen-Alarm und Medikamente, die die nächtliche Urinmenge senken. Die kinderärztliche Abklärung kommt zuerst. Die Grundlagen stehen auf der Seite <a href="/beschwerden/bettnaessen/">Bettnässen</a>.</p>
<h2>Zuerst kinderärztlich abklären</h2>
<p>Viele Kinder unter fünf Jahren nässen nachts ein, und die meisten werden mit der Zeit trocken. Wenn Massnahmen zu Hause nicht helfen, ist die Kinderärztin oder der Kinderarzt die erste Anlaufstelle. Bettnässen kann auch mit Erkrankungen wie Diabetes oder Verstopfung zusammenhängen.</p>
<p>Zuerst ärztlich anschauen lassen solltest du es, wenn dein Kind nach mehr als sechs Monaten trockener Nächte wieder einnässt, wenn es tagsüber einnässt, Schmerzen oder Brennen beim Wasserlösen hat, auffällig viel trinkt oder ausgeprägt verstopft ist. Einnässen am Tag ist eine eigene Frage und nicht einfach dasselbe wie Bettnässen in der Nacht.</p>
<h2>Keine Schuld, keine Strafe</h2>
<p>Dein Kind macht das nicht absichtlich. Strafen helfen nicht und können das Einnässen verstärken. Nach britischer Patienteninformation helfen genug Trinken am Tag, regelmässige Toilettengänge, auch direkt vor dem Schlafen, Belohnungen für vereinbarte Schritte und ein einfacher Weg zur Toilette in der Nacht.</p>
<h2>Was gut untersucht ist</h2>
<p>Eine Cochrane-Übersicht von 2020 mit 74 Studien und 5983 Kindern fand, dass ein Bettnässen-Alarm die Zahl nasser Nächte senken und mehr Kindern zu vollständig trockenen Nächten verhelfen kann, bei niedriger Vertrauenswürdigkeit der Daten. Zusätzlich können Ärztinnen und Ärzte ein Medikament verordnen, das die nächtliche Urinmenge senkt.</p>
<h2>Was die Studien zu Akupunktur zeigen</h2>
<p>Die Cochrane-Übersicht zu ergänzenden Verfahren umfasste 24 Studien mit 2334 Kindern. Die Qualität war schlecht: Mehrere Studien waren nicht echt zufällig verteilt, und viele hatten keine Nachbeobachtung. Hinweise für Akupunktur stammten jeweils aus einzelnen kleinen Studien.</p>
<p>Die spätere Übersicht von 2015 umfasste 21 Studien mit 1590 Teilnehmenden. Sie fasste sehr unterschiedliche Verfahren zusammen: Nadelakupunktur, Moxibustion, Akupressur, Ohrpunkte, Elektroakupunktur und Laserakupunktur. Verglichen wurde mit Placebo oder mit Medikamenten, darunter auch chinesische Fertigarzneien. Unerwünschte Wirkungen wurden nicht dokumentiert.</p>
<h2>Laser, Nadeln und Akupressur sind nicht dasselbe</h2>
<p>Laserakupunktur arbeitet ohne Nadeln mit Licht, Akupressur mit Druck. Einige Studien prüften Laserakupunktur gegen eine Lichtquelle ohne Laser. Ein Ergebnis zur Laserbehandlung ist kein Beleg für Nadeln und umgekehrt. Wenn dir eine Methode angeboten wird, frag, welche Studien sich genau auf diese Methode beziehen.</p>
<h2>Was vor einer Behandlung wichtig ist</h2>
<p>Dein Kind muss einverstanden sein, und die Behandlung soll keine zusätzliche Belastung werden. Nadeln machen manchen Kindern Angst; zur Kinderakupunktur allgemein siehe <a href="/akupunktur-kinder/">Akupunktur für Kinder</a>. Eine Ergänzung ersetzt weder Alarm noch verordnete Medikamente. Zu Kosten und Zusatzversicherung: <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Ersetzt Akupunktur die Alarmtherapie?</h3>
<p>Nein. Der Alarm ist besser untersucht. Akupunktur kommt höchstens ergänzend und nach kinderärztlicher Abklärung infrage.</p>
<h3>Sind Laser- und Nadelstudien vergleichbar?</h3>
<p>Nein. Es sind verschiedene Verfahren. Ergebnisse zur einen Methode lassen sich nicht auf die andere übertragen.</p>
<h3>Wann zuerst zur Kinderärztin?</h3>
<p>Immer vor einer Ergänzung, und sofort bei Einnässen nach längerer trockener Phase, bei Einnässen am Tag, Schmerzen beim Wasserlösen, starkem Durst oder Verstopfung.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.cochrane.org/evidence/CD005230_complementary-and-miscellaneous-interventions-nocturnal-enuresis-children" target="_blank" rel="noopener">Huang T et al. Complementary and miscellaneous interventions for nocturnal enuresis in children. Cochrane Database of Systematic Reviews, CD005230. Suchstand Juni 2010. (Cochrane-Zusammenfassung)</a></li>
<li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4488007/" target="_blank" rel="noopener">Lv ZT et al. Efficacy of Acupuncture in Children with Nocturnal Enuresis: A Systematic Review and Meta-Analysis of Randomized Controlled Trials. Evidence-Based Complementary and Alternative Medicine, 2015. PMID 26167190. Suchstand Juni 2014. (Volltext)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/32364251/" target="_blank" rel="noopener">Caldwell PHY et al. Alarm interventions for nocturnal enuresis in children. Cochrane Database of Systematic Reviews, 2020. PMID 32364251. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/bedwetting/" target="_blank" rel="noopener">NHS. Bedwetting. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/bettnaessen/', label: 'Bettnässen', cat: 'Beschwerde' },
      { href: '/akupunktur-kinder/', label: 'Akupunktur für Kinder', cat: 'Therapie' },
      { href: '/therapien/akupressur/', label: 'Akupressur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/', label: 'Angst vor Nadeln', cat: 'Frage' },
    ],
  },
  {
    slug: 'schroepfen-oder-massage',
    title: 'Schröpfen oder Massage: Unterschiede für deine Entscheidung',
    metaDesc: 'Schröpfen oder Massage bei Verspannungen: Unterschiede bei Reiz, Hautspuren, Risiken und Studienlage. Sachliche Entscheidungshilfe ohne Methodenrangliste.',
    region: 'Schweizweit',
    excerpt: 'Unterdruck oder manuelle Griffe: Wie sich Schröpfen und Massage bei bereits eingeordneten Muskelbeschwerden unterscheiden und welche Fragen die Wahl entscheiden.',
    category: 'Therapien verstehen',
    h1: 'Schröpfen oder Massage: Unterschiede für deine Entscheidung',
    lead: 'Deine Verspannung ist eingeordnet, und du überlegst, ob Schröpfen oder eine Massage besser zu dir passt. Eine Rangliste gibt die Studienlage nicht her. Die Unterschiede liegen im Reiz, in den Spuren auf der Haut und in den Situationen, in denen Vorsicht nötig ist.',
    readingTime: '4 Min.',
    ctaTitle: 'Passende Option nach dem Gespräch wählen',
    ctaText: 'Beschreibe deine Beschwerden, Medikamente und Hauterkrankungen. Wir schlagen dir vor, was zu dir passt, ohne dich auf eine Methode festzulegen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Schröpfen arbeitet mit Unterdruck in Gläsern, Massage mit den Händen. Beide werden bei Verspannungen im Rücken, Nacken und an den Schultern eingesetzt. Für beide ist die Studienlage begrenzt, und keine Methode ist allgemein überlegen. Die Wahl hängt davon ab, welchen Reiz du angenehm findest, ob Spuren auf der Haut stören und ob etwas gegen eine der Methoden spricht.</p>
<p>Was die Verfahren im Einzelnen sind, erklären die Seiten <a href="/therapien/schroepfen/">Schröpfen</a> und <a href="/therapien/massage/">Massage</a>. Hier geht es nur um die Wahl zwischen beiden.</p>
<h2>Die Unterschiede im Überblick</h2>
<div class="table-wrap"><table>
<thead><tr><th></th><th>Schröpfen</th><th>Massage</th></tr></thead>
<tbody>
<tr><td>Reiz</td><td>Unterdruck zieht Haut und Gewebe in das Glas; stehend oder gleitend</td><td>Manuelle Griffe wie Kneten, Streichen und Drücken</td></tr>
<tr><td>Gefühl</td><td>Flächiges Ziehen, je nach Unterdruck kräftig</td><td>Druck und Bewegung, je nach Technik sanft bis kräftig</td></tr>
<tr><td>Spuren auf der Haut</td><td>Runde Verfärbungen, oft mehrere Tage sichtbar</td><td>Meist keine oder nur kurze Rötung</td></tr>
<tr><td>Risiken</td><td>Verfärbungen, selten Narben, Verbrennungen oder Infektionen; Vorsicht bei Blutverdünnern, Gerinnungsstörungen und Hauterkrankungen im Behandlungsgebiet</td><td>Geringes Risiko; selten schwere Folgen, vor allem bei sehr kräftigen Techniken oder erhöhtem Verletzungsrisiko, etwa im höheren Alter</td></tr>
<tr><td>Studienlage</td><td>Meist geringe Qualität; möglicher Nutzen bei Schmerzen, nicht stark belegt</td><td>Bei Rückenschmerzen schwache Hinweise, bei Nacken- und Schulterschmerzen oft nur kurz anhaltend</td></tr>
</tbody></table></div>
<h2>Was die Studienlage hergibt</h2>
<p>Nach dem US-Gesundheitsinstitut NCCIH ist die Forschung zum Schröpfen überwiegend von geringer Qualität. Schröpfen kann Schmerzen möglicherweise lindern, die Belege dafür sind aber nicht stark. Zur Massage fanden mehrere Auswertungen bei Kreuzschmerzen nur schwache Hinweise; bei Nacken- und Schulterschmerzen kann sie helfen, der Nutzen hält aber teils nur kurz an. Direkte Vergleiche beider Methoden, die eine Rangliste erlauben würden, liegen dieser Seite nicht vor.</p>
<h2>Risiken und Spuren</h2>
<p>Schröpfen kann bleibende Verfärbungen, Narben, Verbrennungen und Infektionen verursachen und Ekzeme oder Schuppenflechte verschlechtern. Selten wurden schwere Nebenwirkungen beschrieben. Die typischen runden Spuren erklärt der Artikel <a href="/wissen/schroepfen-wirkung-flecken/">Schröpfen: Wirkung und Flecken</a>. Wenn du Blutverdünner nimmst oder eine Gerinnungsstörung hast, gehört das in die Anfrage; was bei TCM-Behandlungen unter Blutverdünnern gilt, steht unter <a href="/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/">Akupunktur mit Blutverdünnern</a>. Setze Medikamente nie für eine Behandlung ab.</p>
<h2>Schröpfmassage liegt dazwischen</h2>
<p>Bei der Schröpfmassage werden die Gläser über eingeölte Haut bewegt. Sie verbindet den Unterdruck mit einer flächigen Bewegung und hinterlässt eher streifige Rötungen als runde Flecken. Sie ist eine Form des Schröpfens, kein Ersatzwort für jede Massage. Mehr dazu unter <a href="/wissen/schroepfmassage/">Schröpfmassage</a>.</p>
<h2>So kannst du wählen</h2>
<ul>
<li>Stören dich sichtbare Spuren, etwa vor einem Anlass oder im Sommer, passt eher eine Massage.</li>
<li>Magst du kräftigen Zug mehr als Druck, kann Schröpfen angenehmer sein.</li>
<li>Bei Blutverdünnern, Gerinnungsstörungen oder Hautproblemen im Behandlungsgebiet ist zuerst zu klären, ob Schröpfen überhaupt infrage kommt.</li>
<li>Bist du unsicher, ist eine Besprechung sinnvoller als eine Wahl nach Intensität.</li>
</ul>
<p>Zu Kosten und Zusatzversicherung: <a href="/krankenkassen/akupunktur/">Krankenkasse und TCM</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Ist Schröpfmassage dasselbe wie Massage?</h3>
<p>Nein. Sie ist eine Form des Schröpfens mit bewegten Gläsern. Mit einer klassischen oder medizinischen Massage hat sie die Fläche gemeinsam, nicht die Technik.</p>
<h3>Hilft eine stärkere Behandlung mehr?</h3>
<p>Das ist nicht belegt. Mehr Unterdruck oder mehr Druck bedeutet mehr Reiz, aber nicht automatisch mehr Nutzen. Sag während der Behandlung, wenn etwas zu stark ist.</p>
<h3>Wann sollte ich beides zuerst abklären lassen?</h3>
<p>Bei Schmerzen nach einem Unfall, bei ausstrahlenden Schmerzen mit Taubheit oder Schwäche, bei Fieber oder bei Beschwerden, die neu und unklar sind. Dann geht die ärztliche Abklärung vor.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.nccih.nih.gov/health/cupping" target="_blank" rel="noopener">NCCIH. Cupping. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nccih.nih.gov/health/massage-therapy-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Massage Therapy: What You Need To Know. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/therapien/schroepfen/', label: 'Schröpfen', cat: 'Therapie' },
      { href: '/therapien/massage/', label: 'Massage', cat: 'Therapie' },
      { href: '/wissen/schroepfmassage/', label: 'Schröpfmassage', cat: 'Wissen' },
      { href: '/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/', label: 'Schröpfen: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'akupunktur-oder-stosswellentherapie-tennisellenbogen',
    title: 'Akupunktur oder Stosswellentherapie beim Tennisellenbogen?',
    metaDesc: 'Tennisellenbogen: Was ein kleiner direkter Vergleich von Akupunktur und Stosswellentherapie zeigt und was die Grundlage der Behandlung bleibt.',
    region: 'Schweizweit',
    excerpt: 'Ein direkter Vergleich mit 34 Personen fand keinen Unterschied zwischen Akupunktur und Stosswellentherapie. Warum das keine Gleichwertigkeit belegt und was für deine Entscheidung zählt.',
    category: 'Therapien verstehen',
    h1: 'Akupunktur oder Stosswellentherapie beim Tennisellenbogen?',
    lead: 'Dein Tennisellenbogen ist diagnostiziert, die Schmerzen halten an, und dir werden Akupunktur oder Stosswellentherapie genannt. Für keine der beiden Methoden ist ein klarer Vorsprung belegt. Die Grundlage bleiben Belastungssteuerung und Übungen.',
    readingTime: '4 Min.',
    ctaTitle: 'Geeigneten ergänzenden Ansatz besprechen',
    ctaText: 'Nenne deine Diagnose, wie lange die Beschwerden bestehen und was du bereits machst. Wir besprechen offen, ob Akupunktur als Ergänzung zu deinen Übungen passt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Ein direkter Vergleich mit 34 Personen fand keinen Unterschied zwischen Akupunktur und Stosswellentherapie. Die Studie war sehr klein und beobachtete nur zwei Wochen nach der Behandlung. Kein Unterschied bedeutet hier nicht, dass beide gleich gut wirken. Die Stosswellentherapie beim Tennisarm bewertet der unabhängige deutsche IGeL-Monitor als «unklar».</p>
<p>Die Grundlage bei einem Tennisellenbogen bleiben angepasste Belastung und aktive Übungen. Das Beschwerdebild erklärt die Seite <a href="/beschwerden/tennisarm/">Tennisarm und Golferarm</a>, die Studienlage zur Akupunktur ordnet der Artikel <a href="/wissen/akupunktur-bei-tennisarm/">Akupunktur bei Tennisarm</a> ein. Stosswellentherapie gehört nicht zu den Verfahren bei TCM.ch.</p>
<h2>Was zuerst kommt</h2>
<p>Ein Tennisellenbogen bessert sich oft mit Schonung über einige Wochen, kann aber auch länger als ein Jahr dauern. Nach britischer Patienteninformation helfen zuerst das Vermeiden belastender Tätigkeiten, Kühlen oder Wärme, Schmerzmittel als Gel und einfache Übungen. Physiotherapie mit Dehn- und Kräftigungsübungen kommt infrage, wenn die Beschwerden nach sechs Wochen nicht besser sind. Beide hier besprochenen Verfahren kommen höchstens ergänzend dazu.</p>
<h2>Was der direkte Vergleich zeigte</h2>
<p>Die Studie aus Hongkong wurde 2017 veröffentlicht. 17 Personen erhielten drei Wochen lang einmal pro Woche Stosswellentherapie, 17 andere drei Wochen lang zweimal pro Woche Akupunktur. Gemessen wurden Schmerz, Griffkraft und Alltagsfunktion vor der Behandlung, danach und zwei Wochen später.</p>
<p>Zu keinem Zeitpunkt unterschieden sich die Gruppen signifikant. In beiden Gruppen gingen die Schmerzen gegenüber dem Beginn zurück. Bei Griffkraft und Funktion zeigte sich in keiner Gruppe eine signifikante Veränderung. Mit dem Ende der Behandlung besserten sich die Schmerzen in beiden Gruppen nicht weiter. Ob die Zuteilung zufällig erfolgte, geht aus der Zusammenfassung nicht hervor.</p>
<h2>Warum «kein Unterschied» nicht «gleich gut» heisst</h2>
<p>Mit 17 Personen pro Gruppe kann eine Studie auch echte Unterschiede leicht übersehen. Ausserdem fehlte eine Gruppe ohne aktive Behandlung oder mit Scheinbehandlung. Ob eine der beiden Methoden mehr leistet als der natürliche Verlauf und die Zuwendung, beantwortet dieser Vergleich nicht.</p>
<h2>Wie die Stosswellentherapie eingeordnet wird</h2>
<p>Der IGeL-Monitor stützt seine Bewertung vor allem auf eine Übersichtsarbeit mit 13 Studien und 1071 Patientinnen und Patienten. Er fand keine eindeutigen Hinweise auf einen Nutzen und keine auf einen Schaden. Eine britische Leitlinie rät nach seiner Darstellung deutlich von der Stosswellentherapie ab, eine japanische gibt keine eindeutige Empfehlung. Je nach Energie kann die Behandlung schmerzhaft sein. Diese Bewertung stammt aus Deutschland; Abläufe und Kosten in der Schweiz können anders sein.</p>
<h2>Was die Wahl entscheidet</h2>
<ul>
<li>Machst du deine Übungen und hast du die Belastung angepasst? Ohne das bringt keine Ergänzung viel.</li>
<li>Wie stark stören dich Schmerzen während einer Behandlung? Stosswellentherapie kann je nach Dosis schmerzhaft sein; Akupunktur wird meist als kurzer Stich oder Ziehen beschrieben.</li>
<li>Welche Erwartung hast du? Für keine der beiden Methoden ist ein dauerhafter Vorsprung belegt.</li>
</ul>
<p>Zu Kosten und Zusatzversicherung bei Akupunktur: <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Was zeigt der direkte Vergleich?</h3>
<p>Keinen Unterschied zwischen beiden Gruppen bei Schmerz, Griffkraft und Funktion. Die Studie war aber zu klein und zu kurz, um eine Gleichwertigkeit zu belegen.</p>
<h3>Ersetzt eine der beiden Methoden die Übungen?</h3>
<p>Nein. Angepasste Belastung und aktive Übungen bleiben die Grundlage. Beide Verfahren kommen höchstens zusätzlich infrage.</p>
<h3>Gelten die Ergebnisse auch für andere Sehnen?</h3>
<p>Nein. Die Ergebnisse betreffen den Tennisellenbogen. Für Kalkschulter oder Fersensporn gelten eigene Studien und Bewertungen.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/29264270/" target="_blank" rel="noopener">Wong CW et al. Comparison of treatment effects on lateral epicondylitis between acupuncture and extracorporeal shockwave therapy. Asia-Pacific Journal of Sports Medicine, Arthroscopy, Rehabilitation and Technology, 2017. PMID 29264270. (PubMed-Abstract)</a></li>
<li><a href="https://igel-monitor.de/igel-a-z/igel/show/stosswellentherapie-beim-tennisarm.html" target="_blank" rel="noopener">IGeL-Monitor. Stosswellentherapie beim Tennisarm. Bewertung «unklar». (Volltext, abgerufen 24. Oktober 2026)</a></li>
<li><a href="https://www.nhs.uk/conditions/tennis-elbow/" target="_blank" rel="noopener">NHS. Tennis elbow. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/tennisarm/', label: 'Tennisarm und Golferarm', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-tennisarm/', label: 'Akupunktur bei Tennisarm', cat: 'Wissen' },
      { href: '/wissen/dry-needling-vs-akupunktur/', label: 'Dry Needling oder Akupunktur', cat: 'Wissen' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
];

/** Slugs dieses Pakets, die zur Akupunktur-bei-Serie gehören (TerminForm, Serien-Gate). */
export const artikel24SerieSlugs: string[] = wissenArtikel24.filter((w) => w.slug.startsWith('akupunktur-bei-')).map((w) => w.slug);
