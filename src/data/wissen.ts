// Single source of truth for migrated Wissen articles (Astro static pages).
// Phase 4: 3 genuine standalone articles. 34 city-variant doorway articles are 410'd
// (functions/wissen/[[path]].js + public/wissen-kill.js), NOT migrated.
// Schema: MedicalWebPage + Person(author) + FAQPage + BreadcrumbList + reviewedBy + lastReviewed.
export interface WissenFaq { q: string; a: string }
export interface WissenRelated { href: string; label: string; cat: string }
export interface WissenAuthor { name: string; role: string; bio: string }
export interface Wissen { slug: string; title: string; metaDesc: string; region?: string; excerpt?: string; category: string; h1: string; lead: string; readingTime: string; ctaTitle?: string; author: WissenAuthor; reviewerName: string; datePublished: string; dateModified: string; lastReviewed: string; bodyHtml: string; faqs: WissenFaq[]; related: WissenRelated[]; }
export const wissen: Wissen[] = [
  {
    "slug": "wie-lange-bleiben-akupunkturnadeln-drin",
    "title": "Wie lange bleiben Akupunkturnadeln drin?",
    "metaDesc": "Akupunkturnadeln bleiben meist 20 bis 30 Minuten in der Haut. Was die Dauer beeinflusst, wann kürzer besser ist und was Dauernadeln unterscheidet.",
    "region": "Schweizweit",
    "excerpt": "Wie lange Akupunkturnadeln liegen bleiben, wovon die Dauer abhängt und was Dauernadeln davon unterscheidet.",
    "category": "Akupunktur",
    "h1": "Wie lange bleiben Akupunkturnadeln drin?",
    "lead": "Die kurze Antwort: In einer normalen Sitzung bleiben die Nadeln 20 bis 30 Minuten liegen. Warum genau diese Zeitspanne, wovon sie abhängt und was es mit Dauernadeln auf sich hat, liest du hier.",
    "readingTime": "8 Min.",
    "ctaTitle": "Fragen zur Akupunktur? Wir beraten dich ehrlich.",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-08-12",
    "dateModified": "2026-08-12",
    "lastReviewed": "2026-08-12",
    "bodyHtml": "<p>Akupunkturnadeln bleiben in der Regel 20 bis 30 Minuten in der Haut. Bei der ersten Behandlung, bei Kindern oder bei sehr empfindlichen Menschen oft kürzer, etwa 10 bis 15 Minuten. Dauernadeln sind ein Sonderfall: Diese winzigen Nadeln bleiben mehrere Tage im Ohr und werden dafür speziell fixiert.</p>\n<h2>Warum gerade 20 bis 30 Minuten?</h2>\n<p>Diese Zeitspanne hat sich in der Praxis über Jahrzehnte etabliert und wird auch in den meisten klinischen Studien so verwendet. In der grossen Auswertung von Einzeldaten von Vickers und Kollegen (<a href=\"https://pubmed.ncbi.nlm.nih.gov/29198932/\" target=\"_blank\" rel=\"noopener\">Vickers et al., 2018</a>), die Daten von über 20'000 Patientinnen und Patienten mit chronischen Schmerzen auswertete, lag die Liegedauer in den untersuchten Studien typischerweise in diesem Bereich.</p>\n<p>Ehrlich gesagt: Eine exakte optimale Minutenzahl ist wissenschaftlich nicht belegt. Es gibt keine hochwertige Studie, die zeigt, dass 25 Minuten besser wirken als 20 oder 30. Was sich aber zeigt: Sehr kurze Liegezeiten unter 10 Minuten werden in der Praxis selten eingesetzt, und Liegezeiten über 40 Minuten bringen nach klinischer Erfahrung keinen Zusatznutzen, erhöhen aber das Risiko für Kreislaufreaktionen, wenn du lange still liegst. Die 20 bis 30 Minuten sind also ein Erfahrungswert mit breiter Studienbasis, kein Naturgesetz. Deine Therapeutin passt die Dauer an dich an.</p>\n<div class=\"wa-callout\"><div class=\"wa-callout-label\">Gut zu wissen</div><p>Bei uns dauert eine Sitzung insgesamt 45 bis 60 Minuten. Darin enthalten: Gespräch, Puls- und Zungendiagnostik, das Setzen der Nadeln, die Ruhephase mit liegenden Nadeln und das Entfernen.</p></div>\n<h2>Was während der Liegezeit passiert</h2>\n<p>Nach dem Einstich entsteht an der Einstichstelle oft ein dumpfes Ziehen, ein Wärmegefühl oder ein leichtes Schweregefühl. Das ist kein Schmerz, sondern für viele ein Zeichen, dass der Punkt gut getroffen ist.</p>\n<p>Danach liegst du ruhig, meist bei gedimmtem Licht auf einer warmen Liege. Viele Menschen entspannen in dieser Phase stark, manche schlafen ein. Das ist völlig in Ordnung und sogar erwünscht. Die Nadeln arbeiten nicht mehr, wenn du wach bleibst.</p>\n<p>Je nach Behandlung stimuliert die Therapeutin die Nadeln zwischendurch manuell nach, dreht sie leicht oder hebt und senkt sie minimal. Bei der <a href=\"/wissen/elektroakupunktur-wirkung/\">Elektroakupunktur</a> übernimmt ein schwacher Reizstrom diese Stimulation über die gesamte Liegezeit.</p>\n<h2>Diese Faktoren beeinflussen die Dauer</h2>\n<p><strong>Deine Konstitution.</strong> Bist du eher erschöpft, geschwächt oder kreislauflabil, wählt die Therapeutin kürzere Liegezeiten und weniger Nadeln. Ein robuster Körper verträgt eine längere und intensivere Stimulation.</p>\n<p><strong>Die Beschwerde.</strong> Akute Beschwerden werden oft kürzer und häufiger behandelt, chronische Beschwerden eher mit voller Liegezeit. Bei Schmerzpatienten sind 25 bis 30 Minuten üblich, bei rein entspannenden Behandlungen reicht manchmal weniger.</p>\n<p><strong>Erstbehandlung.</strong> Beim ersten Termin weiss niemand, wie dein Körper reagiert. Deshalb starten seriöse Praxen bewusst vorsichtig: weniger Nadeln, 10 bis 20 Minuten Liegezeit. Reagierst du gut, wird bei den Folgeterminen gesteigert.</p>\n<p><strong>Alter.</strong> Kinder und ältere Menschen werden kürzer behandelt. Bei Kindern reichen oft wenige Minuten, oder es kommen ganz andere Techniken zum Einsatz, etwa Laserakupunktur ohne Nadeln.</p>\n<p><strong>Die Technik.</strong> Körperakupunktur, Ohrakupunktur, Schädelakupunktur und Elektroakupunktur haben unterschiedliche übliche Liegezeiten. Bei der Ohrakupunktur mit Dauernadeln verlässt du die Praxis sogar mit liegenden Nadeln, dazu gleich mehr.</p>\n<div class=\"wa-pullquote\">Länger liegen lassen heisst nicht besser wirken. Die Dosis macht die Behandlung, nicht die Stoppuhr.</div>\n<h2>Ist länger besser? Nein.</h2>\n<p>Ein verbreiteter Irrtum: Wer die Nadeln länger drin lässt, bekommt mehr Wirkung. Dafür gibt es keine Belege. Die Behandlungsintensität ergibt sich aus Punktauswahl, Nadelanzahl, Stichtiefe, Stimulation und Frequenz der Sitzungen, nicht primär aus der Liegezeit.</p>\n<p>Im Gegenteil kann zu viel Stimulation unangenehm werden. Typische Zeichen einer Überstimulation sind Schwindel, Müdigkeit über Stunden oder eine vorübergehende Verstärkung der Beschwerden. Alles harmlos, aber vermeidbar. Deshalb gilt: lieber sauber dosiert als heldenhaft lang.</p>\n<p>Zur Sicherheit generell: <a href=\"/therapien/akupunktur/\">Akupunktur bei TCM.ch</a> durch ausgebildete Fachpersonen ist sehr sicher. Zwei grosse prospektive Untersuchungen im British Medical Journal (MacPherson et al. 2001 mit über 34'000 Behandlungen, White et al. 2001 mit über 32'000 Konsultationen) fanden keine schwerwiegenden Zwischenfälle. Häufigste Nebenwirkungen: kleine Blutergüsse, kurzer Schwindel, leichte Müdigkeit nach der Sitzung.</p>\n<h2>Sonderfall Dauernadeln: Tage statt Minuten</h2>\n<p>Dauernadeln sind winzige, sterile Nadeln von ein bis zwei Millimetern Länge, die mit einem hautfarbenen Pflaster fixiert werden, fast immer im Ohr. Sie bleiben drei bis sieben Tage in der Haut und geben über diese Zeit einen kontinuierlichen leichten Reiz ab.</p>\n<p>Eingesetzt werden sie vor allem, wenn ein Dauerreiz sinnvoll ist: bei Raucherentwöhnung, zur Unterstützung beim Abnehmen, bei Stress und innerer Unruhe oder ergänzend zur Schmerzbehandlung zwischen den Sitzungen.</p>\n<p>Wichtig zur Abgrenzung: Dauernadeln ersetzen keine normale Akupunktursitzung. Sie verlängern deren Reiz in den Alltag hinein. Duschen ist mit Dauernadeln möglich, Schwimmbad und Sauna solltest du meiden. Spätestens nach sieben Tagen müssen sie raus, sonst steigt das Infektionsrisiko. Alles Weitere, inklusive der Frage, ob du sie selber entfernen darfst, findest du im ausführlichen Artikel zu <a href=\"/wissen/dauernadeln-akupunktur/\">Dauernadeln</a>.</p>\n<h2>Wann du dich melden solltest</h2>\n<p>Akupunktur ist sicher, aber nicht jede Situation gehört in die TCM-Praxis. Geh zur Ärztin oder in den Notfall bei plötzlichen starken Schmerzen, Lähmungserscheinungen, Taubheitsgefühlen, Fieber mit unklarer Ursache, Brustschmerzen oder Atemnot. Und falls eine Einstichstelle nach der Behandlung stark anschwillt, pocht oder sich entzündet, lass das ärztlich anschauen. Das ist selten, gehört aber abgeklärt.</p>\n<h2>Das erwartet dich bei uns</h2>\n<p>Bei TCM.ch besprechen wir vor jeder Behandlung, was wir machen und warum. Du erfährst, wie viele Nadeln gesetzt werden, wie lange sie liegen bleiben und was du danach beachten solltest. Wenn Akupunktur für deine Beschwerde nicht das richtige Mittel ist, sagen wir dir das auch.</p>",
    "faqs": [
      {
        "q": "Wie lange bleiben Akupunkturnadeln normalerweise drin?",
        "a": "In einer üblichen Sitzung bleiben die Nadeln 20 bis 30 Minuten liegen. Bei der ersten Behandlung, bei Kindern oder empfindlichen Personen oft nur 10 bis 15 Minuten. Die Therapeutin passt die Dauer an deine Konstitution und deine Beschwerde an."
      },
      {
        "q": "Wirkt Akupunktur besser, wenn die Nadeln länger drin bleiben?",
        "a": "Nein. Es gibt keine Belege, dass längere Liegezeiten mehr bringen. Entscheidend sind Punktauswahl, Nadelanzahl, Stimulation und die Zahl der Sitzungen. Zu lange oder zu intensive Behandlungen können sogar zu Schwindel oder Müdigkeit führen."
      },
      {
        "q": "Was passiert, wenn Nadeln zu lange drin bleiben?",
        "a": "Bei normalen Akupunkturnadeln passiert in der Praxis nichts, da die Therapeutin sie entfernt. Dauernadeln im Ohr sollten spätestens nach sieben Tagen raus, sonst steigt das Risiko für Hautreizungen und Infektionen an der Einstichstelle."
      },
      {
        "q": "Darf ich mich mit den Nadeln bewegen?",
        "a": "Du solltest während der Liegezeit ruhig liegen bleiben. Kleine Bewegungen sind kein Problem, starke Bewegungen können unangenehm ziehen oder eine Nadel verschieben. Wenn etwas drückt oder schmerzt, melde dich sofort, die Therapeutin korrigiert die Nadel."
      },
      {
        "q": "Wie lange dauert eine ganze Akupunktursitzung?",
        "a": "Rechne mit 45 bis 60 Minuten. Darin enthalten sind das Gespräch, die Diagnostik über Puls und Zunge, das Setzen der Nadeln, die Ruhephase von 20 bis 30 Minuten und das Entfernen der Nadeln am Schluss."
      }
    ],
    "related": [
      {
        "href": "/therapien/akupunktur/",
        "label": "Akupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/wissen/dauernadeln-akupunktur/",
        "label": "Akupunktur mit Dauernadeln",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/elektroakupunktur-wirkung/",
        "label": "Elektroakupunktur: Wirkung",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "akupunktur-schlafprobleme",
    "title": "Akupunktur bei Schlafproblemen: Studien & Ablauf",
    "metaDesc": "Was Akupunktur bei Ein- und Durchschlafproblemen realistisch leisten kann, was die Studien sagen und wo die Grenzen liegen. Ehrlich erklärt, in Du-Form.",
    "region": "Schweizweit",
    "excerpt": "Was Akupunktur bei Schlafproblemen realistisch bringt, was die Studien sagen und wo die Grenzen liegen.",
    "category": "Beschwerden verstehen",
    "h1": "Akupunktur bei Schlafproblemen: Was realistisch ist",
    "lead": "Du liegst wach und fragst dich, ob Akupunktur hilft. Hier steht ehrlich, was sie kann, was sie nicht kann und wann du zuerst ärztlich abklären solltest.",
    "readingTime": "9 Min.",
    "ctaTitle": "Termin bei Schlafproblemen anfragen",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-08-12",
    "dateModified": "2026-08-12",
    "lastReviewed": "2026-08-12",
    "bodyHtml": "<h2>Einschlafen, Durchschlafen, Frueherwachen: die drei Muster unterscheiden</h2>\n<p>Wenn du schlecht schlaefst, ist die erste wichtige Frage nicht, ob Akupunktur hilft, sondern welches Muster du ueberhaupt hast. Denn \"schlecht schlafen\" meint drei sehr unterschiedliche Dinge, und die Behandlung setzt bei jedem anders an.</p>\n<p>Das <strong>Einschlafproblem</strong> ist der Klassiker: Du liegst wach, der Kopf laeuft, die Gedanken drehen sich um den naechsten Tag oder um das, was heute nicht rund lief. Der Koerper kommt nicht runter. Hier steckt sehr oft eine erhoehte Anspannung oder Uebererregung dahinter, ein Nervensystem, das abends nicht in den Ruhemodus schaltet. Das ist genau die Baustelle, an der eine Behandlung ansetzen kann, die auf das Senken von Anspannung zielt.</p>\n<p>Das <strong>Durchschlafproblem</strong> sieht anders aus: Du schlaefst schnell ein, wachst aber mitten in der Nacht auf, oft mehrfach, und findest schwer zurueck. Manchmal steckt Stress dahinter, manchmal aber auch etwas Koerperliches: Schmerzen, die dich wecken, Hitzewallungen in den Wechseljahren, ein voller Blasendruck, naechtliches Zaehneknirschen. Bevor man hier am Schlaf selbst arbeitet, lohnt sich der Blick auf den konkreten Weckreiz.</p>\n<p>Das <strong>Frueherwachen</strong> ist das dritte Muster: Du wachst um vier oder fuenf Uhr auf, viel zu frueh, und schlaefst nicht mehr ein. Das ist das Muster, bei dem man besonders aufmerksam sein sollte, denn regelmaessiges Frueherwachen mit Gruebeln ist auch ein moeglicher Hinweis auf eine depressive Verstimmung. Dazu weiter unten mehr.</p>\n<p>Warum ist diese Unterscheidung fuer die Behandlung wichtig? Weil sie bestimmt, wo man ueberhaupt hinschaut. Ein Einschlafproblem aus Anspannung behandelt man anders als ein Durchschlafproblem, das an naechtlichen Schmerzen haengt. Wer nur \"Akupunktur gegen Schlafstoerung\" bucht, ohne dieses Muster zu klaeren, verschenkt den halben Nutzen.</p>\n<p>Oft ist es auch keine reine Sache. Viele Menschen haben eine Mischung: Sie brauchen abends lange, um einzuschlafen, und wachen dann zusaetzlich in der Nacht auf. Auch das ist eine wichtige Information, weil es zeigt, wie durchgehend die Anspannung ist. Genauso hilfreich ist die Frage, seit wann das Problem besteht. Ein Schlafthema, das erst seit ein paar Wochen nach einem konkreten Ausloeser da ist, wird anders eingeschaetzt als eines, das dich seit Jahren begleitet. In einem serioesen Erstgespraech geht es deshalb zuerst darum, dein Muster genau zu verstehen. Bring ruhig ein paar Notizen mit, wann du wach wirst und wie du dich morgens fuehlst, das hilft mehr als jede pauschale Beschreibung. Mehr Hintergrund findest du auf unserer Seite zu <a href=\"/beschwerden/schlafprobleme/\">Schlafproblemen</a>.</p>\n\n<h2>Was Akupunktur bei Schlafproblemen leisten kann, und was nicht</h2>\n<p>Sei hier ehrlich mit dir: <a href=\"/therapien/akupunktur/\">Akupunktur</a> ist kein Schalter, den man umlegt und dann schlaeft man. Wer dir das verspricht, uebertreibt. Was Akupunktur realistisch tun kann, ist etwas Bescheideneres, aber durchaus Nuetzliches: Sie kann helfen, die koerperliche Anspannung und die Uebererregung des Nervensystems zu senken. Viele Menschen berichten, dass sie waehrend und nach den Sitzungen ruhiger werden, leichter abschalten und weniger aufgekratzt ins Bett gehen. Genau dieses Herunterfahren ist bei einem Grossteil der Einschlafprobleme der entscheidende Punkt.</p>\n<p>Was Akupunktur nicht leisten kann: Sie behebt keine Ursache, die woanders liegt. Und genau hier wird es wichtig. Schlaf haengt sehr oft an etwas anderem. An Dauerstress im Job oder in der Beziehung. An chronischen Schmerzen, die nachts staerker spuerbar werden. An hormonellen Schwankungen im Zyklus oder in den Wechseljahren. An zu viel Koffein, zu viel Bildschirm, zu wenig Struktur im Tag. Wenn einer dieser Faktoren der eigentliche Motor deiner Schlaflosigkeit ist, dann behandelt man vernuenftigerweise zuerst diesen Motor, nicht den Schlaf isoliert.</p>\n<p>Das heisst konkret: Ein guter Therapeut fragt dich nicht nur nach dem Schlaf, sondern nach dem ganzen Umfeld. Wenn dein Schlafproblem an starken Regelschmerzen haengt, arbeitet man am Schmerz. Wenn es an einer belastenden Lebensphase haengt, ist die realistische Erwartung, dass Akupunktur die Anspannung daempft, waehrend sich an der Lebenssituation selbst nur du und dein Umfeld etwas aendern koennt. Akupunktur ist in diesem Bild ein moeglicher Baustein, der dir hilft, wieder in einen ruhigeren Zustand zu kommen, kein Ersatz fuer die Loesung der Grundursache.</p>\n<p>Ein realistischer Massstab ist deshalb nicht die perfekte Nacht, sondern die Richtung. Schlaefst du im Schnitt etwas schneller ein? Sind die Naechte insgesamt ruhiger, auch wenn nicht jede perfekt ist? Fuehlst du dich tagsueber weniger getrieben? Das sind die Zeichen, an denen sich ablesen laesst, ob die Behandlung fuer dich etwas bringt. Wer dagegen erwartet, ab der ersten Sitzung durchzuschlafen, wird fast zwangslaeufig enttaeuscht, und das nicht, weil nichts passiert, sondern weil die Erwartung falsch gesetzt war.</p>\n\n<h2>Die Studienlage, ehrlich eingeordnet</h2>\n<p>Was sagt die Forschung? Kurz gefasst: Die Evidenz ist gemischt, und niemand sollte dir hier mehr versprechen, als die Studien hergeben.</p>\n<p>Eine systematische Uebersichtsarbeit von 2009 kam zum vorsichtig positiven Schluss, dass Akupunktur bei Schlaflosigkeit wirksam sein duerfte. Der wichtige Zusatz dabei: Die methodische Qualitaet der ausgewerteten Studien war nur maessig, was die Aussagekraft begrenzt (Cao et al., <a href=\"https://pubmed.ncbi.nlm.nih.gov/19922248/\" target=\"_blank\" rel=\"noopener\">PMID 19922248</a>).</p>\n<p>Eine Cochrane-Uebersicht von 2012, also eine der methodisch strengsten Formen der Auswertung, kam zu einem noch zurueckhaltenderen Ergebnis: Die vorhandene Evidenz reicht wegen schwacher Studienqualitaet nicht aus, um Akupunktur bei Schlaflosigkeit klar zu empfehlen oder klar abzulehnen (Cheuk et al., <a href=\"https://pubmed.ncbi.nlm.nih.gov/22972087/\" target=\"_blank\" rel=\"noopener\">PMID 22972087</a>).</p>\n<p>Was folgt daraus? Die ehrliche Zusammenfassung ist: gemischte Evidenz. Es gibt Hinweise, dass Akupunktur bei Schlafproblemen etwas bewirken kann, aber die Studienlage ist nicht stark genug, um sie als gesicherte Standardbehandlung zu bezeichnen. Realistisch ist Akupunktur damit ein <strong>moeglicher Baustein</strong>, den man ausprobieren kann, besonders wenn Anspannung eine Rolle spielt oder wenn du Schlafmittel meiden moechtest. Sie ist aber kein Wundermittel, und ein serioeser Anbieter wird dir das auch so sagen.</p>\n\n<h2>Ablauf und wie viele Sitzungen realistisch sind</h2>\n<p>Am Anfang steht ein ausfuehrliches Erstgespraech mit Anamnese. Dabei geht es um dein Schlafmuster, um deinen Tagesablauf, um Stress, Schmerzen, Medikamente und um alles, was den Schlaf beeinflussen koennte. Erst danach entsteht ein Behandlungsplan, der zu deiner Situation passt, und nicht ein Schema, das jeder bekommt.</p>\n<p>Die Behandlung laeuft dann meist <strong>woechentlich ueber etwa 6 bis 10 Sitzungen</strong>. Das ist kein Zufallswert, sondern die Groessenordnung, in der sich bei Schlafthemen typischerweise beurteilen laesst, ob etwas passiert. Erste Veraenderungen zeigen sich bei vielen Menschen nach etwa <strong>3 bis 4 Terminen</strong>: Das Einschlafen faellt leichter, die Naechte werden ruhiger, oder du wachst morgens etwas erholter auf. Das sind oft kleine Schritte, keine ueber Nacht eintretende Wende.</p>\n<p>Und hier ein Punkt, auf den du bestehen solltest: Wenn sich nach vier Sitzungen ueberhaupt nichts bewegt, dann sollte dir das auch ehrlich gesagt werden. Dann bringt es wenig, einfach immer weiter Termine zu buchen. Ein guter Therapeut spricht das offen an, prueft, ob das Muster oder die Ursache neu eingeschaetzt werden muss, oder raet dir gegebenenfalls zu einem anderen Weg. Dauerbehandlung ohne Wirkung ist kein Behandlungsplan, sondern eine Kostenfalle.</p>\n\n<h2>Kombination mit chinesischer Kraeutertherapie</h2>\n<p>Bei manchen Menschen wird Akupunktur mit <a href=\"/therapien/kraeutertherapie/\">chinesischer Kraeutertherapie</a> kombiniert. Der Gedanke dahinter ist, ueber den Tag hinweg auf die Anspannung einzuwirken, nicht nur waehrend der Sitzung. Wichtig ist dabei zweierlei: Eine solche Kombination wird individuell zusammengestellt, es gibt kein Standardrezept fuer \"besseren Schlaf\". Und sie muss auf deine bestehenden Medikamente abgestimmt sein, denn pflanzliche Praeparate koennen mit Arzneimitteln wechselwirken. Wenn du regelmaessig Medikamente nimmst, gehoert das offen auf den Tisch, bevor irgendetwas verordnet wird. Die Kraeutertherapie ist eine Option, kein Muss, und ob sie in deinem Fall sinnvoll ist, klaert sich im Gespraech.</p>\n\n<h2>Schlafhygiene als Basis, ohne die weniger geht</h2>\n<p>Es gibt keinen bequemen Weg um diesen Punkt herum: Ohne solide Grundlagen bringt jede Behandlung weniger. Schlafhygiene klingt langweilig, ist aber das Fundament, auf dem alles andere aufbaut. Wenn dieses Fundament fehlt, arbeitet die Akupunktur gegen einen Gegenwind, den du selbst erzeugst.</p>\n<p>Die wirksamsten Basics sind unspektakulaer:</p>\n<ul>\n<li><strong>Feste Aufstehzeit</strong>, jeden Tag, auch am Wochenende. Das stabilisiert deinen Rhythmus staerker als eine feste Zubettgehzeit.</li>\n<li><strong>Bildschirm und Koffein am Abend reduzieren.</strong> Koffein wirkt viele Stunden nach, und helles Bildschirmlicht am spaeten Abend haelt den Kopf wach.</li>\n<li><strong>Das Bett nur zum Schlafen</strong> nutzen, nicht zum Arbeiten, Scrollen oder Fernsehen. So lernt dein Koerper, das Bett wieder mit Schlaf zu verknuepfen statt mit Wachsein.</li>\n</ul>\n<p>Diese Punkte sind kein Ersatz fuer eine Behandlung, aber ihre Voraussetzung. Wer sie ignoriert und stattdessen nur auf die Nadel setzt, macht es sich und der Behandlung unnoetig schwer. Am meisten bringt es, wenn du zwei oder drei dieser Punkte konsequent umsetzt, statt alle halbherzig. Die feste Aufstehzeit ist dabei fast immer der beste erste Schritt, weil sie deinen Rhythmus stabilisiert und die uebrigen Gewohnheiten leichter nachziehen laesst.</p>\n\n<div class=\"wa-callout\"><div class=\"wa-callout-label\">Bitte aerztlich abklaeren</div><p>Zwei Dinge gehoeren zuerst zum Arzt und nicht auf die Akupunkturliege. Erstens der Verdacht auf eine Schlafapnoe: lautes Schnarchen, beobachtete Atemaussetzer in der Nacht und starke Tagesmuedigkeit, obwohl du eigentlich \"genug\" geschlafen hast. Zweitens Hinweise auf eine Depression: anhaltend gedrueckte Stimmung, Antriebslosigkeit und Frueherwachen mit Gruebeln. Beides sind ernstzunehmende medizinische Themen, die eine aerztliche Abklaerung brauchen. Akupunktur kann bestenfalls begleiten, aber sie ersetzt in diesen Faellen keine Diagnose und keine notwendige Behandlung.</p></div>\n\n<h2>Kosten und Krankenkasse</h2>\n<p>Akupunktur bei einem anerkannten Therapeuten laeuft in der Schweiz ueber die <strong>Zusatzversicherung</strong> fuer Komplementaermedizin, nicht ueber die Grundversicherung. Bei EMR- oder ASCA-anerkannten Therapeuten uebernehmen die meisten Zusatzversicherungen einen grossen Teil der Kosten, je nach Modell in der Regel etwa <strong>80 bis 100 Prozent</strong>. Wie hoch deine Deckung konkret ist, haengt von deiner Police ab. Damit du keine boese Ueberraschung erlebst, pruefen wir deine Deckung vorab kostenlos, bevor die erste Sitzung stattfindet.</p>",
    "faqs": [
      {
        "q": "Hilft Akupunktur wirklich beim Schlafen?",
        "a": "Die Studienlage ist gemischt. Einzelne Übersichtsarbeiten sehen Verbesserungen der Schlafqualität, eine Cochrane-Übersicht von 2012 kam aber zum Schluss, dass die Evidenz für ein klares Urteil nicht ausreicht. Realistisch ist Akupunktur ein möglicher Baustein neben der Schlafhygiene, kein garantierter Schalter."
      },
      {
        "q": "Wie viele Sitzungen brauche ich?",
        "a": "Meist behandeln wir wöchentlich über sechs bis zehn Sitzungen. Erste Veränderungen zeigen sich oft nach drei bis vier Terminen, etwa leichteres Einschlafen oder ruhigere Nächte. Passiert nach vier Sitzungen gar nichts, sagen wir dir ehrlich, dass es bei dir wahrscheinlich wenig bringt."
      },
      {
        "q": "Kann ich Schlafmittel gleichzeitig nehmen?",
        "a": "Ja. Akupunktur ersetzt deine Medikation nicht und du sollst nichts eigenmächtig absetzen. Das Ziel ist eher, dass du mit der Zeit weniger brauchst. Änderungen an Schlafmitteln besprichst du immer mit der Ärztin oder dem Arzt, die sie verordnet haben."
      },
      {
        "q": "Was bringt Akupunktur ohne Schlafhygiene?",
        "a": "Deutlich weniger. Feste Aufstehzeit, Bildschirm und Koffein am Abend reduzieren, das Bett nur zum Schlafen nutzen: Diese Grundlagen bleiben die Basis, mit oder ohne Nadeln. Wir schauen sie im Erstgespräch gemeinsam an, bevor wir behandeln."
      },
      {
        "q": "Übernimmt die Krankenkasse das?",
        "a": "Akupunktur läuft über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Bei EMR- oder ASCA-anerkannten Therapeut:innen beteiligen sich die meisten Kassen mit 80 bis 100 Prozent. Deine Deckung prüfen wir kostenlos vor dem ersten Termin."
      }
    ],
    "related": [
      {
        "href": "/beschwerden/schlafprobleme/",
        "label": "Schlafprobleme",
        "cat": "Beschwerde"
      },
      {
        "href": "/therapien/akupunktur/",
        "label": "Akupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/therapien/kraeutertherapie/",
        "label": "Chinesische Kräutertherapie",
        "cat": "Therapie"
      },
      {
        "href": "/wissen/tcm-stress-burnout/",
        "label": "TCM bei Stress und Burnout",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "tcm-stress-burnout",
    "title": "TCM bei Stress & Burnout: Was Akupunktur bringt",
    "metaDesc": "Wo TCM bei Stress, Erschöpfung und Burnout ansetzt, was Akupunktur und Tuina beitragen, was die Studien sagen und wann professionelle Hilfe nötig ist.",
    "region": "Schweizweit",
    "excerpt": "Wo TCM bei Stress, Erschöpfung und Burnout ansetzt, und wo klar die Grenzen liegen.",
    "category": "Beschwerden verstehen",
    "h1": "Stress, Erschöpfung, Burnout: Wo TCM ansetzt",
    "lead": "Stress, Erschöpfung und Burnout sind nicht dasselbe. Hier steht, wo TCM ehrlich etwas beitragen kann, und wo du professionelle Hilfe brauchst.",
    "readingTime": "9 Min.",
    "ctaTitle": "Termin bei Stress und Erschöpfung anfragen",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-08-12",
    "dateModified": "2026-08-12",
    "lastReviewed": "2026-08-12",
    "bodyHtml": "<h2>Stress, Erschoepfung, Burnout: Wo liegt der Unterschied?</h2>\n<p>Die drei Begriffe werden im Alltag oft durcheinandergeworfen, aber sie meinen nicht dasselbe. Wer genau hinschaut, merkt schnell: Es geht um verschiedene Stufen und darum, wie ernst die Lage jeweils ist.</p>\n<p><strong>Stress</strong> ist zunaechst eine normale koerperliche Reaktion. Dein Koerper schaltet in einen Alarmmodus, das Herz schlaegt schneller, die Muskeln spannen sich an, du bist wacher und leistungsfaehiger. Kurzfristig ist das nuetzlich, etwa vor einer Pruefung oder einem wichtigen Termin. Problematisch wird es, wenn dieser Zustand nicht mehr abklingt und ueber Wochen oder Monate anhaelt. Dann bleibt die Anspannung, der Schlaf leidet, und der Koerper kommt nicht mehr zur Ruhe.</p>\n<p><strong>Erschoepfung</strong> ist die Folge, wenn diese Anspannung zu lange dauert. Du fuehlst dich muede, obwohl du geschlafen hast. Die Konzentration laesst nach, du bist gereizter, und selbst Dinge, die dir sonst leichtfallen, kosten Kraft. Erschoepfung ist ein Signal, dass die Reserven aufgebraucht sind und du eine echte Pause brauchst, nicht nur einen freien Abend.</p>\n<p><strong>Burnout</strong> ist noch einmal eine andere Kategorie. Das ist ein ernstes Erschoepfungssyndrom, das sich ueber lange Zeit aufbaut und den ganzen Menschen betrifft: tiefe koerperliche und emotionale Erschoepfung, das Gefuehl innerer Leere, oft auch ein Rueckzug von der Arbeit und von Menschen. Burnout ist keine Kleinigkeit, die man mit ein paar Massagen wegbekommt.</p>\n<p>Warum diese Abgrenzung so wichtig ist: Die Grenzen sind fliessend, und viele merken selbst nicht, wann aus normalem Stress eine ernste Erschoepfung geworden ist. Ein paar Anhaltspunkte helfen bei der Einordnung. Wenn du dich nach einem freien Wochenende wieder erholt fuehlst, bist du wahrscheinlich im Bereich von Stress und beginnender Erschoepfung. Wenn selbst ein laengerer Urlaub kaum noch etwas bringt, du morgens schon erschoepft aufwachst und die Freude an Dingen verloren geht, die dir frueher wichtig waren, dann ist das ein deutliches Warnsignal, das ueber gewoehnlichen Stress hinausgeht.</p>\n<p>Das ist der wichtigste Punkt dieses Artikels, und er steht bewusst am Anfang: <strong>Burnout gehoert aerztlich und psychotherapeutisch begleitet.</strong> Wenn du merkst, dass du dich seit Wochen ausgebrannt, leer und antriebslos fuehlst, ist der erste Schritt ein Termin bei deiner Hausaerztin oder einer psychotherapeutischen Fachperson. TCM kann in so einer Situation eine <strong>Ergaenzung</strong> sein, aber niemals ein <strong>Ersatz</strong> fuer eine medizinische und psychologische Behandlung. Wir sind hier ehrlich: Wer dir bei einem Burnout allein mit Akupunktur eine Loesung verspricht, sagt dir nicht die Wahrheit.</p>\n\n<h2>Was Akupunktur und Tuina beitragen koennen</h2>\n<p>Innerhalb dieses klaren Rahmens gibt es Bereiche, in denen eine begleitende TCM-Behandlung sinnvoll sein kann. Es geht dabei nicht um die Ursachen deines Stresses, die liegen meist in Arbeit, Beziehungen oder Lebensumstaenden. Es geht um die koerperlichen Begleiterscheinungen und um die Frage, ob du wieder besser abschalten und schlafen kannst.</p>\n<p><a href=\"/therapien/akupunktur/\">Akupunktur</a> setzt an der koerperlichen Anspannung an. Viele Menschen, die unter Dauerstress stehen, beschreiben nach den Sitzungen ein ruhigeres Gefuehl und finden abends leichter in den Schlaf. Das ist keine dramatische Verwandlung, aber fuer jemanden, der seit Monaten schlecht schlaeft, kann schon ein etwas ruhigerer Schlaf einen spuerbaren Unterschied machen. Auch typische koerperliche Stress-Symptome wie Spannungskopfschmerzen oder ein Druckgefuehl im Brustkorb koennen sich mildern.</p>\n<p><a href=\"/therapien/tuina/\">Tuina-Massage</a> ist die manuelle Seite der TCM und arbeitet kraeftiger als eine klassische Wellness-Massage. Wenn Stress sich bei dir vor allem in <strong>Nacken- und Schulterverspannungen</strong> festsetzt, ist Tuina oft die direktere Antwort. Die Verspannungen werden gezielt geloest, und das koerperliche Loslassen hilft vielen Menschen auch dabei, mental etwas herunterzukommen. Nacken und Schultern sind bei chronischem Stress fast immer beteiligt, weil der Koerper die Anspannung genau dort haelt.</p>\n<p>Haeufig werden beide Ansaetze kombiniert: Akupunktur fuer die allgemeine Anspannung und den Schlaf, Tuina fuer die konkreten Verspannungen. Mehr zum Zusammenspiel und zu den Beschwerdebildern findest du auf unserer Seite zu <a href=\"/beschwerden/stress-burnout/\">Stress und Burnout</a>.</p>\n<p>Ein Punkt ist uns wichtig, damit keine falschen Erwartungen entstehen: Eine Behandlung nimmt dir nicht den Termindruck, die schwierige Chefin oder die schlaflose Nacht mit einem kranken Kind ab. Was sie kann, ist deinem Koerper zwischendurch eine echte Pause verschaffen und die koerperliche Anspannung so weit senken, dass du nicht dauerhaft im Alarmmodus stehst. Fuer viele Menschen ist genau das der Unterschied, ob sie eine belastende Phase halbwegs stabil durchstehen oder ob sie irgendwann selbst umkippen.</p>\n\n<h2>Was sagt die Studienlage?</h2>\n<p>Ehrlichkeit heisst auch, die Forschung nicht schoenzureden. Fuer stressbezogene psychische Beschwerden ist die Evidenz begrenzt, aber sie ist nicht null. Zwei serioese Arbeiten geben ein realistisches Bild.</p>\n<p>Fuer Angststoerungen fand eine Meta-Analyse von 2021 einen moderaten Effekt von Akupunktur gegenueber Kontrollgruppen (Yang et al., <a href=\"https://pubmed.ncbi.nlm.nih.gov/33516258/\" target=\"_blank\" rel=\"noopener\">PMID 33516258</a>), bei allerdings begrenzter Studienqualitaet und ueberwiegend chinesischen Studien. Das heisst: Es gibt ein Signal in die richtige Richtung, aber man muss vorsichtig bleiben, weil die Studien methodisch nicht ueberzeugend genug sind, um daraus ein Heilversprechen abzuleiten.</p>\n<p>Fuer Depression kam ein Cochrane-Review 2018 zu niedriger Evidenzqualitaet: Akupunktur koennte die Schwere gegenueber keiner Behandlung maessig senken, gegenueber einer Scheinbehandlung ist der Effekt klein (Smith et al., <a href=\"https://pubmed.ncbi.nlm.nih.gov/29502347/\" target=\"_blank\" rel=\"noopener\">PMID 29502347</a>). Der Unterschied zwischen echter und Scheinbehandlung ist also gering, was zeigt, dass ein Teil der Wirkung nicht spezifisch auf die Nadeln zurueckgeht.</p>\n<p>Das ehrliche Fazit: Es gibt begrenzte, aber vorhandene Evidenz fuer eine begleitende Wirkung auf Anspannung und Stimmung. Das ist genau der Rahmen, in dem TCM sinnvoll ist, als Begleitung. Es ist <strong>kein Ersatz fuer Psychotherapie oder aerztliche Behandlung</strong>, und niemand sollte auf dieser Basis eine notwendige medizinische Behandlung aufschieben.</p>\n\n<h2>Wie laeuft eine Behandlung ab?</h2>\n<p>Am Anfang steht ein ausfuehrliches Erstgespraech. Wir schauen uns an, wie sich der Stress bei dir aeussert, wie du schlaefst, wo koerperliche Beschwerden sitzen und was im Alltag gerade auf dir lastet. Genauso wichtig ist die Frage, ob bereits eine aerztliche oder psychotherapeutische Behandlung laeuft oder ob sie noetig waere. Wenn ja, arbeiten wir begleitend und drehen niemand aus dieser Betreuung heraus.</p>\n<p>Danach folgen die eigentlichen Sitzungen, meist einmal pro Woche. Eine Behandlung dauert in der Regel etwas ueber eine halbe Stunde bis knapp eine Stunde. Sinnvoll ist eine Serie ueber mehrere Wochen, weil sich Effekte auf Schlaf und Anspannung nicht in einer einzigen Sitzung einstellen, sondern sich langsam aufbauen. Je nachdem, was im Vordergrund steht, kombinieren wir Akupunktur und Tuina oder setzen den Schwerpunkt auf eine der beiden Methoden.</p>\n<p>Waehrend der Serie schauen wir gemeinsam, was sich veraendert. Es hilft, wenn du zwischen den Terminen grob im Kopf behaeltst, wie du schlaefst und wo die Anspannung sitzt, denn diese Rueckmeldung ist fuer die Behandlung wertvoller als jede Vermutung. Falls sich in deinem Alltag etwas zuspitzt oder eine aerztliche Behandlung dazukommt, passen wir das Vorgehen entsprechend an. Die Behandlung ist kein starres Programm, sondern richtet sich danach, was bei dir tatsaechlich ankommt.</p>\n\n<h2>Welche Erwartungen sind realistisch?</h2>\n<p>Hier ist Ehrlichkeit besonders wichtig, weil im Stress-Bereich viel versprochen wird. Was viele Menschen berichten: Schon nach den ersten Sitzungen fuehlen sie sich waehrend und nach der Behandlung ruhiger, und der Schlaf wird in den ersten Naechten etwas besser. Das ist ein realer, aber zunaechst kurzfristiger Effekt.</p>\n<p>Nachhaltige Veraenderung braucht mehr. Wenn die eigentliche Ursache, also die Dauerbelastung, unveraendert weiterlaeuft, kann keine Behandlung der Welt das auf Dauer ausgleichen. Der ruhigere Schlaf und die geloesten Verspannungen koennen dir aber den Kopf frei genug machen, um an den Ursachen zu arbeiten: an Grenzen, an Pausen, an der Frage, was sich in deinem Alltag aendern muss.</p>\n<p>Unser Vorschlag ist deshalb eine ehrliche Zwischenbilanz nach <strong>drei bis vier Terminen</strong>. Wenn du bis dahin keine Veraenderung bei Schlaf, Anspannung oder Verspannungen bemerkst, sagen wir dir das offen und raten dann eher von einer Fortsetzung ab, als dir eine lange Serie zu verkaufen. TCM ist nicht fuer jeden das Richtige, und das gehoert dazugesagt.</p>\n<p>Genauso ehrlich gehoert dazu: Wenn sich waehrend der Behandlung zeigt, dass hinter der Erschoepfung mehr steckt als eine anstrengende Phase, sprechen wir das an und empfehlen dir, aerztliche oder psychotherapeutische Hilfe dazuzuholen. Das ist kein Rueckzug von unserer Seite, sondern der verantwortungsvolle Umgang mit einem ernsten Thema. Deine Gesundheit steht ueber der Frage, ob du bei uns weiter Termine buchst.</p>\n\n<div class=\"wa-callout\"><div class=\"wa-callout-label\">Wichtig</div><p>Bei Anzeichen einer Depression, also anhaltender Niedergeschlagenheit, Antriebslosigkeit und Hoffnungslosigkeit, und besonders bei Suizidgedanken brauchst du professionelle Hilfe, und zwar sofort. Wende dich an eine aerztliche oder psychotherapeutische Fachperson. Die Dargebotene Hand ist rund um die Uhr kostenlos und anonym unter Tel. <strong>143</strong> erreichbar. In einem akuten Notfall waehle den Notruf <strong>144</strong>. TCM ist in dieser Situation nicht der richtige erste Schritt, und niemand sollte damit warten, bis eine Behandlungsserie zu Ende ist. Hol dir die Hilfe, die du jetzt brauchst.</p></div>\n\n<h2>Kosten und Krankenkasse</h2>\n<p>Akupunktur und Tuina werden in der Schweiz ueber die <strong>Zusatzversicherung</strong> abgerechnet, nicht ueber die Grundversicherung. Voraussetzung ist in der Regel, dass die behandelnde Person eine EMR- oder ASCA-Anerkennung hat, was bei uns der Fall ist. Je nach Zusatzversicherung werden meist <strong>80 bis 100 Prozent</strong> der Kosten uebernommen, oft bis zu einem jaehrlichen Maximalbetrag.</p>\n<p>Weil die Bedingungen von Versicherung zu Versicherung unterschiedlich sind, klaeren wir deine Deckung gerne vorab kostenlos ab, damit du keine boese Ueberraschung auf der Rechnung hast. Konkret heisst das: Du sagst uns deine Zusatzversicherung, wir sagen dir, ob und in welcher Hoehe deine Sitzungen gedeckt sind, bevor der erste Termin stattfindet. Wenn du in der Region wohnst, findest du die Details zu <a href=\"/akupunktur-tcm-st-gallen/\">Akupunktur und TCM in St. Gallen</a> auf der entsprechenden Standortseite. So weisst du vor dem ersten Termin, woran du bist, und kannst in Ruhe entscheiden, ob dieser Weg fuer dich gerade der richtige ist.</p>",
    "faqs": [
      {
        "q": "Kann Akupunktur Stress abbauen?",
        "a": "Für Angstsymptome zeigt eine Meta-Analyse von 2021 einen moderaten Effekt gegenüber Kontrollgruppen, bei allerdings begrenzter Studienqualität. Für Stress im Alltag heisst das: Akupunktur kann die Anspannung senken und den Schlaf verbessern, sie ersetzt aber keine Veränderung an den Ursachen."
      },
      {
        "q": "Ist Burnout mit TCM behandelbar?",
        "a": "Burnout gehört ärztlich und psychotherapeutisch begleitet, das ist die Basis. TCM kann diese Behandlung ergänzen, etwa bei Erschöpfung, Schlaf und innerer Unruhe. Als alleinige Therapie eines Burnouts ist sie nicht geeignet, und so verkaufen wir sie auch nicht."
      },
      {
        "q": "Was bringt Tuina bei Stress?",
        "a": "Tuina ist eine kräftige manuelle Behandlung, die verspannte Nacken- und Schulterpartien löst, wie sie bei Dauerstress typisch sind. Viele empfinden sie als direkt entlastend. Wir kombinieren sie oft mit Akupunktur in derselben Sitzung, je nachdem, was dein Körper braucht."
      },
      {
        "q": "Wie schnell merke ich etwas?",
        "a": "Viele fühlen sich nach den ersten Sitzungen ruhiger oder schlafen besser. Nachhaltige Veränderungen brauchen aber Zeit und meist eine Serie über mehrere Wochen. Wir beurteilen nach drei bis vier Terminen ehrlich, ob es in die richtige Richtung geht."
      },
      {
        "q": "Übernimmt die Krankenkasse das?",
        "a": "Akupunktur läuft über die Zusatzversicherung für Komplementärmedizin, nicht über die Grundversicherung. Bei EMR- oder ASCA-anerkannten Therapeut:innen beteiligen sich die meisten Kassen mit 80 bis 100 Prozent. Wir prüfen deine Deckung kostenlos vor dem ersten Termin."
      }
    ],
    "related": [
      {
        "href": "/beschwerden/stress-burnout/",
        "label": "Stress und Burnout",
        "cat": "Beschwerde"
      },
      {
        "href": "/therapien/akupunktur/",
        "label": "Akupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/therapien/tuina/",
        "label": "Tuina-Massage",
        "cat": "Therapie"
      },
      {
        "href": "/wissen/akupunktur-schlafprobleme/",
        "label": "Akupunktur bei Schlafproblemen",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "elektroakupunktur-wirkung",
    "title": "Elektroakupunktur: Wirkung, Ablauf und für wen sie geeignet ist",
    "metaDesc": "Wie Elektroakupunktur wirkt, wie sie sich anfühlt und wer sie besser meiden sollte, etwa mit Herzschrittmacher. Ehrlich und verständlich erklärt.",
    "region": "Schweizweit",
    "excerpt": "Wie Elektroakupunktur funktioniert, wie sie sich anfühlt und wer sie besser meiden sollte. Der Überblick.",
    "category": "TCM in der Schweiz",
    "h1": "Elektroakupunktur: Wirkung, Ablauf und für wen sie geeignet ist",
    "lead": "Wie Elektroakupunktur funktioniert, wie sie sich anfühlt und wer sie besser meiden sollte. Der Überblick.",
    "readingTime": "5 Min.",
    "ctaTitle": "Elektroakupunktur in der Praxis besprechen?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-06-18",
    "dateModified": "2026-07-06",
    "lastReviewed": "2026-06-18",
    "bodyHtml": "<h2>Was ist Elektroakupunktur?</h2><p>Bei der Elektroakupunktur werden gesetzte Akupunkturnadeln über ein Gerät mit schwachen elektrischen Impulsen verbunden. Statt den Reiz von Hand zu setzen und die Nadel gelegentlich zu bewegen, übernimmt das Gerät eine gleichmässige Stimulation über die ganze Sitzung. Die Stromstärke ist gering und wird langsam so eingestellt, dass sie für dich angenehm bleibt. Die Methode wird auch elektrische Stimulationsakupunktur genannt und ist eine Variante der klassischen Akupunktur. Wie wir das in der Praxis anwenden, liest du auf unserer Seite zur <a href=\"/therapien/elektroakupunktur/\">Elektroakupunktur</a>.</p><h2>Wie der Strom wirkt</h2><p>Die feinen Impulse reizen den gesetzten Punkt kontinuierlich und gleichmässig. Dadurch ist der Reiz stärker und konstanter als bei der rein manuellen Akupunktur, ohne dass die Therapeutin die Nadel ständig von Hand bewegen muss. Genutzt wird das vor allem bei chronischen oder hartnäckigen Beschwerden, bei denen eine intensivere Reizung sinnvoll erscheint. Der Strom fliesst zwischen zwei Nadeln, die zu einem Punktepaar verbunden sind. Wie der Körper darauf reagiert, ist individuell.</p><h2>Frequenzen und Einstellungen</h2><p>An dem Gerät lassen sich Frequenz und Stärke einstellen. Niedrige Frequenzen erzeugen ein langsameres Pochen, höhere ein feineres Kribbeln. Die Therapeutin wählt die Einstellung passend zu deiner Beschwerde und deinem Empfinden und regelt die Stärke langsam hoch. Es geht nicht darum, möglichst viel Strom zu spüren, sondern um einen gleichmässigen, angenehmen Reiz. Wird das Kribbeln unangenehm, wird die Stärke reduziert.</p><h2>Wie sich Elektroakupunktur anfühlt</h2><p>Spürbar ist meist ein leichtes Kribbeln, Pochen oder Vibrieren an der Nadel. Die Intensität wird langsam hochgeregelt und soll angenehm bleiben. Schmerzen sind kein Ziel, sondern ein Zeichen, die Stärke zu reduzieren. Viele Menschen empfinden die gleichmässige Stimulation als entspannend und liegen während der Sitzung ruhig. Wenn dir etwas unangenehm ist, sag Bescheid, dann passen wir die Einstellung an. Nach der Sitzung fühlen sich manche gelöster, andere merken erst über mehrere Termine einen Unterschied.</p><h2>Unterschied zur klassischen Akupunktur</h2><p>Die klassische <a href=\"/therapien/akupunktur/\">Akupunktur</a> setzt den Reiz von Hand, die Elektroakupunktur über ein Gerät und konstant über die ganze Sitzung. Der Ablauf ist ansonsten ähnlich: Zuerst werden die Nadeln gesetzt, danach werden einige davon mit dem Gerät verbunden. Welche Variante passt, hängt von Beschwerde, Verlauf und deiner Vorliebe ab. Beide Wege werden von einer ausgebildeten Fachperson durchgeführt und lassen sich innerhalb einer Behandlung kombinieren.</p><h2>Für welche Beschwerden sie eingesetzt wird</h2><p>Elektroakupunktur wird vor allem bei Schmerz- und Verspannungsbeschwerden genutzt, zum Beispiel bei chronischen Rücken- und Nackenschmerzen, bei Kopfschmerzen oder bei muskulären Verspannungen. Sie ist eine Variante der Akupunktur und wird individuell in ein Behandlungskonzept eingebettet, nicht isoliert angewendet. Mehr zu Beschwerden im Rücken liest du bei <a href=\"/beschwerden/rueckenschmerzen/\">Rückenschmerzen</a>, mehr zu Kopfschmerz und Migräne bei <a href=\"/beschwerden/migraene/\">Migräne</a>.</p><h2>Elektroakupunktur bei chronischen Schmerzen</h2><p>Bei lang bestehenden Beschwerden reicht ein kurzer Reiz manchmal nicht aus. Die gleichmässige elektrische Stimulation soll den Punkt über die ganze Sitzung ansprechen, weshalb sie gerade bei chronischen Schmerz- und Verspannungsthemen eingesetzt wird. Das ist kein Garant für Besserung, aber ein möglicher Baustein in einem breiteren Plan aus Bewegung, Alltag und weiteren Methoden. Was in deinem Fall passt, klären wir im Gespräch und passen es im Verlauf an.</p><h2>Woher die Elektroakupunktur kommt</h2><p>Die Idee, Akupunkturnadeln mit schwachem Strom zu verbinden, entstand, um den Reiz gleichmässiger und ohne ständiges Bewegen der Nadel zu halten. Technisch ähnelt das Prinzip einem kleinen Reizstromgerät, wie es auch in anderen Bereichen zur Anwendung kommt. Heute ist die Elektroakupunktur eine verbreitete Variante der Akupunktur, die in vielen Praxen ergänzend eingesetzt wird. Entscheidend ist nicht die Technik an sich, sondern eine sorgfältige Anwendung durch eine ausgebildete Fachperson.</p><h2>Elektroakupunktur bei Muskelverspannungen</h2><p>Bei hartnäckigen Verspannungen, etwa im Schulter- und Nackenbereich, wird die gleichmässige Stimulation genutzt, um die Muskulatur über die Sitzung anzusprechen. Kombiniert mit lösenden Handgriffen kann das den Behandlungsreiz vertiefen. Ein Erfolg ist damit nicht garantiert, aber es ist ein sinnvoller Baustein, wenn eine einzelne manuelle Behandlung nicht ausreicht. Mehr zu Verspannungen im Nacken liest du bei <a href=\"/beschwerden/nackenschmerzen/\">Nackenschmerzen</a>.</p><h2>Vorbereitung auf die Sitzung</h2><p>Eine besondere Vorbereitung braucht es nicht. Komm in bequemer Kleidung, die den zu behandelnden Bereich zugänglich macht, und iss vorher etwas, damit dir während der Sitzung nicht flau wird. Sag uns vorab, wenn du einen Herzschrittmacher, ein Implantat oder eine Herzerkrankung hast oder schwanger bist, damit wir sicher planen. Wenn du unsicher bist, klären wir alle Fragen in Ruhe vor dem ersten Termin.</p><h2>Was viele überrascht</h2><p>Viele erwarten einen starken Stromschlag und sind erstaunt, wie mild sich die Stimulation anfühlt. Der Strom ist so gering, dass er nur ein feines Kribbeln erzeugt. Auch die Sorge, dass Elektroakupunktur schmerzhaft sei, bestätigt sich in der Regel nicht. Wichtig ist der Austausch während der Sitzung, damit die Stärke jederzeit an dein Empfinden angepasst werden kann.</p><h2>Was die Studienlage zeigt</h2><p>Elektroakupunktur ist eine Form der Akupunktur, deshalb ordnet sich ihre Bewertung in die Forschung zur Akupunktur ein. Eine grosse Auswertung von Einzeldaten aus randomisierten Studien zeigte, dass Akupunktur bei chronischen Schmerzen wirksamer war als keine Behandlung und als eine Scheinbehandlung; der Unterschied zur Scheinakupunktur fiel eher klein aus (<a href=\"https://pubmed.ncbi.nlm.nih.gov/29198932/\" target=\"_blank\" rel=\"noopener\">Vickers et al., 2018</a>). Für die Migräneprophylaxe fand eine Cochrane-Übersicht, dass Akupunktur die Anfallshäufigkeit senken kann und mindestens so gut abschneidet wie eine medikamentöse Vorbeugung (<a href=\"https://pubmed.ncbi.nlm.nih.gov/27351677/\" target=\"_blank\" rel=\"noopener\">Linde et al., Cochrane 2016</a>). Für chronische, unspezifische Rückenschmerzen fand eine Cochrane-Übersicht kurzfristig einen kleinen Effekt auf Schmerz und Funktion, bei begrenzter Sicherheit der Evidenz (<a href=\"https://pubmed.ncbi.nlm.nih.gov/33306198/\" target=\"_blank\" rel=\"noopener\">Mu et al., Cochrane 2020</a>). Studien speziell zur elektrischen Stimulation sind weniger zahlreich und uneinheitlich. Kurz gesagt: Akupunktur kann bei bestimmten Beschwerden unterstützen, ein Heilversprechen lässt sich daraus nicht ableiten.</p><h2>Ablauf einer Sitzung</h2><p>Zuerst besprechen wir dein Anliegen und setzen die Nadeln wie bei einer normalen Akupunktur. Danach werden einige Nadeln über dünne Kabel mit dem Gerät verbunden. Die Stärke wird langsam hochgeregelt, bis du ein leichtes, angenehmes Kribbeln spürst. Du liegst dann rund 20 bis 30 Minuten ruhig, während das Gerät gleichmässig stimuliert. Am Ende werden Kabel und Nadeln entfernt. In dieser Zeit bist du nicht allein gelassen, du kannst dich jederzeit melden, wenn etwas nicht passt.</p><h2>Für wen Elektroakupunktur nicht geeignet ist</h2><p>Nicht angewendet wird Elektroakupunktur bei Trägerinnen und Trägern eines Herzschrittmachers oder anderer elektronischer Implantate, in der Schwangerschaft und bei bestimmten Herzerkrankungen. Auch über verletzter oder entzündeter Haut und in der Nähe des Halses bei empfindlichen Personen wird sie zurückhaltend eingesetzt. Kläre solche Punkte vor der Behandlung offen mit deiner Therapeutin ab, damit die Anwendung sicher bleibt. Im Zweifel wird auf die klassische Akupunktur ausgewichen.</p><h2>Mögliche Nebenwirkungen</h2><p>Bei fachgerechter Anwendung gilt Elektroakupunktur als gut verträglich. Möglich sind eine leichte Reizung, ein Ziehen oder ein kleiner blauer Fleck an der Einstichstelle. Wenn das Kribbeln unangenehm wird, wird die Stärke reduziert. Nach der Behandlung fühlen sich manche kurz müde. Melde dich bei anhaltenden oder ungewöhnlichen Beschwerden nach der Sitzung bei deiner Therapeutin.</p><h2>Was Elektroakupunktur nicht leisten kann</h2><p>Elektroakupunktur ist ein begleitendes Verfahren, kein Ersatz für eine ärztliche Diagnose oder eine notwendige medizinische Behandlung. Bei starken, neuen oder sich verschlechternden Beschwerden gehört immer zuerst eine ärztliche Abklärung. Sie heilt nichts auf Knopfdruck und wirkt nicht bei jedem gleich. Wir behandeln nur, wenn wir den Eindruck haben, dass es dir etwas bringt, und sagen es ehrlich, wenn ein anderer Weg besser passt.</p><h2>Wie viele Sitzungen sinnvoll sind</h2><p>Das hängt davon ab, ob deine Beschwerden akut oder chronisch sind, und wird individuell festgelegt. Bei akuten Themen sind oft einige Sitzungen in kurzem Abstand sinnvoll, bei chronischen Beschwerden eine Begleitung über einen längeren Zeitraum. Nach den ersten Terminen besprechen wir ehrlich, ob die Behandlung etwas bringt und wie es weitergeht.</p><h2>Kombination mit anderen Behandlungen</h2><p>Elektroakupunktur steht selten allein. Häufig ist sie Teil eines Plans aus klassischer Akupunktur und, wenn passend, weiteren Methoden wie <a href=\"/therapien/tuina/\">Tuina</a> oder <a href=\"/therapien/schroepfen/\">Schröpfen</a>. So lässt sich eine intensivere Reizung mit lösenden, manuellen Techniken verbinden. Welche Kombination sinnvoll ist, entscheidet die Therapeutin gemeinsam mit dir.</p><h2>Kosten und Krankenkasse</h2><p>Elektroakupunktur wird im Rahmen einer Akupunkturbehandlung abgerechnet. Bei EMR- oder ASCA-anerkannten Therapeutinnen beteiligen sich viele Zusatzversicherungen mit 80 bis 100 Prozent, die Grundversicherung deckt es nicht. Wie die Abrechnung läuft und worauf du bei deiner Police achten solltest, liest du auf unserer Seite zur <a href=\"/krankenkassen/\">Krankenkasse</a>.</p><p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung.</em></p>",
    "faqs": [
      {
        "q": "Wie wirkt Elektroakupunktur?",
        "a": "Über schwache elektrische Impulse, die den Akupunkturpunkt gleichmässig und stärker reizen als die Handstimulation."
      },
      {
        "q": "Hat Elektroakupunktur Nebenwirkungen?",
        "a": "Selten leichte Reizung an der Einstichstelle. Bei korrekter Einstellung ist sie gut verträglich."
      },
      {
        "q": "Ist Elektroakupunktur mit Herzschrittmacher möglich?",
        "a": "Nein. Bei Herzschrittmacher oder elektronischen Implantaten wird sie nicht angewendet."
      },
      {
        "q": "Wie oft sollte man Elektroakupunktur machen?",
        "a": "Das hängt von der Beschwerde ab und wird individuell festgelegt."
      },
      {
        "q": "Was kostet Elektroakupunktur?",
        "a": "Sie wird im Rahmen einer Akupunkturbehandlung abgerechnet. Bei EMR-/ASCA-Therapeuten beteiligen sich viele Zusatzversicherungen."
      }
    ],
    "related": [
      {
        "href": "/therapien/elektroakupunktur/",
        "label": "Elektroakupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/therapien/akupunktur/",
        "label": "Akupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/krankenkassen/",
        "label": "Krankenkasse und TCM",
        "cat": "Info"
      }
    ]
  },
  {
    "slug": "dauernadeln-akupunktur",
    
    "title": "Dauernadeln: Wirkung, Ablauf & Dauer",
    "metaDesc": "Dauernadeln bleiben mehrere Tage im Ohr und wirken zwischen den Sitzungen weiter. Wie die Permanentnadeln funktionieren und worauf du achten musst.",
    "region": "Schweizweit",
    "excerpt": "Permanentnadeln bleiben mehrere Tage im Ohr und wirken zwischen den Sitzungen weiter. Ablauf, Tragedauer, Sicherheit und Kosten im Überblick.",
    "category": "TCM in der Schweiz",
    "h1": "Dauernadeln: Die Akupunktur, die bleibt",
    "lead": "Normale Akupunkturnadeln wirken 30 Minuten, Dauernadeln mehrere Tage. Was hinter den winzigen Permanentnadeln steckt, für wen sie sich eignen und worauf es bei Sicherheit und Pflege ankommt.",
    "readingTime": "9 Min.",
    "ctaTitle": "Dauernadeln in der Praxis besprechen?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-06-18",
    "dateModified": "2026-08-19",
    "lastReviewed": "2026-08-19",
    "bodyHtml": "<h2>Was Dauernadeln sind</h2>\n<p>Dauernadeln, auch Dauerakupunkturnadeln genannt, sind sterile Einwegnadeln von etwa einem bis zwei Millimetern Länge. Sie werden mit einem kleinen hautfarbenen Pflaster auf der Haut fixiert und bleiben dort mehrere Tage. Fast immer sitzen sie im Ohr, weil die Ohrmuschel gut zugänglich ist, wenig stört und in der Ohrakupunktur eine eigene Punktesystematik hat. Wie wir sie in der Praxis einsetzen, liest du auf unserer Seite zu <a href=\"/therapien/dauernadeln/\">Akupunktur mit Dauernadeln</a>.</p>\n<p>Der Unterschied zur normalen <a href=\"/therapien/akupunktur/\">Akupunktur</a>: Statt eines starken Reizes über 20 bis 30 Minuten in der Praxis geben Dauernadeln einen schwachen, aber kontinuierlichen Reiz über Tage ab. Jedes Mal, wenn du das Pflaster berührst oder leicht darauf drückst, verstärkst du den Reiz kurz. Genau das wird therapeutisch genutzt, etwa bei Rauchverlangen oder Heisshunger: Impuls spüren, kurz auf die Nadel drücken, Impuls abklingen lassen.</p>\n<p>Der Gedanke dahinter: Die Behandlung endet nicht an der Praxistür. Zwischen den Sitzungen, wenn das Verlangen nach der Zigarette kommt, der Heisshunger, die Anspannung oder der Schmerz, ist der Punkt bereits gesetzt, und ein kurzer Fingerdruck aktiviert ihn. Dauernadeln sind damit weniger eine eigene Therapieform als ein Verlängerungswerkzeug der Ohrakupunktur, eingesetzt dort, wo eine kontinuierliche Stimulation gewünscht ist.</p>\n<h2>Wie lange dürfen Dauernadeln drin bleiben?</h2>\n<p>Drei bis sieben Tage, je nach Absprache mit deiner Therapeutin. Spätestens nach sieben Tagen müssen sie raus. Die Haut am Ohr ist dünn und gut durchblutet, und je länger ein Fremdkörper in der Haut sitzt, desto höher das Risiko für Reizungen und Infektionen.</p>\n<p>Ein paar Alltagsregeln für die Tragezeit: Duschen und Haare waschen sind kein Problem, danach die Stelle vorsichtig trocken tupfen. Schwimmbad, Sauna und Dampfbad solltest du meiden, feuchtwarmes Klima und Chlorwasser reizen die Einstichstelle. Nicht an der Nadel kratzen oder herumdrehen. Wenn sich ein Pflaster von selbst löst und die Nadel herausfällt, ist das harmlos: Nadel nicht wieder einsetzen, Stelle kurz desinfizieren, fertig.</p>\n<div class=\"wa-callout\"><div class=\"wa-callout-label\">Faustregel</div><p>Dauernadeln sind ein Wochenformat, kein Dauerzustand. Rein in der Praxis, raus nach spätestens sieben Tagen, Pause für die Haut, bei Bedarf neue Nadeln beim nächsten Termin.</p></div>\n<h2>Ohr-Dauernadeln: die häufigste Form</h2>\n<p>Die Ohrakupunktur behandelt über Punkte an der Ohrmuschel. Für Dauernadeln ist das Ohr ideal: Die Punkte sind klein und präzise, die Nadeln stören weder beim Schlafen noch bei der Arbeit, und du erreichst sie jederzeit selbst mit dem Finger. Die Ohrmuschel funktioniert dabei wie eine Landkarte: Auf kleinstem Raum liegen Punkte, die verschiedenen Körperregionen und Funktionen zugeordnet werden. In ihrer heutigen Form geht diese Aurikulotherapie massgeblich auf den französischen Arzt Paul Nogier zurück und wurde später mit der chinesischen Tradition verbunden.</p>\n<p><strong>So läuft das Setzen ab.</strong> Nach dem Befund wählt die Therapeutin zwei bis fünf Punkte pro Ohr, desinfiziert die Haut und setzt die Nadeln mit einem Applikator. Der Einstich ist ein kurzer Pikser, danach spüren die meisten nur noch ein leichtes Druckgefühl oder gar nichts. Mit Punktauswahl dauert das kaum 15 Minuten, und häufig wird es mit einer regulären Körperakupunktur kombiniert: Die Sitzung behandelt das Grundmuster, die Dauernadeln halten die Stimulation bis zum nächsten Termin. Nach drei bis sieben Tagen kommen sie raus, die Haut bekommt ein paar Tage Pause, dann kann neu gesetzt werden.</p>\n<p>Typische Einsatzgebiete, bei denen ein Dauerreiz sinnvoll ist:</p>\n<ul>\n<li><strong>Raucherentwöhnung:</strong> Der bekannteste Einsatz. Die Studienlage ist hier durchzogen, ein Cochrane-Review zu Akupunktur und verwandten Verfahren bei der Raucherentwöhnung fand keine verlässlichen Belege für eine Langzeitwirkung (<a href=\"https://pubmed.ncbi.nlm.nih.gov/24459016/\" target=\"_blank\" rel=\"noopener\">White et al., Cochrane 2014</a>). Viele Patientinnen und Patienten berichten trotzdem, dass das Drücken auf die Nadel akutes Rauchverlangen abfedert. Wir sagen dir das ehrlich: Die Nadel ersetzt deine Entscheidung nicht, sie kann sie unterstützen.</li>\n<li><strong>Gewichtsmanagement:</strong> Ähnliches Prinzip bei Heisshunger, ergänzend zu Ernährung und Bewegung, nicht als Ersatz.</li>\n<li><strong>Stress und innere Unruhe:</strong> Beruhigende Ohrpunkte, die du in angespannten Momenten selbst aktivieren kannst.</li>\n<li><strong>Schmerzbehandlung:</strong> Als Verlängerung zwischen zwei Akupunktursitzungen, damit der Reiz nicht nach der Praxis endet, etwa bei <a href=\"/beschwerden/rueckenschmerzen/\">Rückenschmerzen</a> oder <a href=\"/beschwerden/kopfschmerzen/\">Kopfschmerzen</a>.</li>\n</ul>\n<p>Ein Begriff, der in diesem Zusammenhang oft fällt, ist das NADA-Protokoll: eine standardisierte Kombination von fünf Ohrpunkten, die aus der Suchtbehandlung stammt und international auch bei Unruhe- und Belastungszuständen eingesetzt wird. Wir nennen sie hier, weil danach häufig gefragt wird, nicht als Wirksamkeitsversprechen.</p>\n<h2>Wo Dauernadeln am Körper gesetzt werden</h2>\n<p>Neben dem Ohr werden Dauernadeln an Körperpunkten gesetzt, zum Beispiel am Rücken bei wiederkehrenden Verspannungen, an den Schultern oder in der Nähe eines schmerzenden Gelenks. Welche Punkte sinnvoll sind, hängt von deiner Beschwerde ab und wird individuell festgelegt. An Stellen, die im Alltag stark bewegt werden, halten die Nadeln kürzer. Wer keine Nadeln möchte, findet mit <a href=\"/therapien/ear-seeds/\">Ear Seeds</a> eine nadelfreie Alternative, die über Druck statt über eine Nadel wirkt.</p>\n<h2>Darf ich Dauernadeln selber entfernen?</h2>\n<p>Ja, das ist ausdrücklich erlaubt und einfach. So gehst du vor: Hände gründlich waschen. Pflaster mitsamt Nadel langsam abziehen, die winzige Nadel bleibt am Pflaster kleben und kommt automatisch mit. Kurz kontrollieren, dass die Nadel wirklich am Pflaster hängt. Einstichstelle mit einem Desinfektionsmittel abtupfen. Pflaster mit Nadel im Hausmüll entsorgen, am besten in ein Stück Papier gewickelt.</p>\n<p>Sofort entfernen solltest du sie, ohne auf den Termin zu warten, wenn die Stelle zunehmend schmerzt, stark juckt, anschwillt, nässt oder gerötet ist. Dann raus mit der Nadel, desinfizieren, und wenn die Reizung nicht innert ein bis zwei Tagen abklingt, ärztlich anschauen lassen. Was du nicht tun solltest: eine herausgefallene oder entfernte Nadel wieder einsetzen. Einwegmaterial bleibt Einwegmaterial.</p>\n<h2>Risiken und Nebenwirkungen</h2>\n<p>Dauernadeln sind bei sauberer Anwendung sicher. Akupunktur durch ausgebildete Fachpersonen zeigt in grossen prospektiven Untersuchungen (MacPherson et al. 2001, White et al. 2001, je über 30'000 Behandlungen) keine schwerwiegenden Zwischenfälle. Weil Dauernadeln aber tagelang in der Haut bleiben, gelten ein paar Besonderheiten:</p>\n<ul>\n<li><strong>Lokale Hautreizung:</strong> Die häufigste Nebenwirkung. Leichte Rötung oder Druckempfindlichkeit am ersten Tag ist normal und verschwindet von selbst.</li>\n<li><strong>Infektion der Einstichstelle:</strong> Selten, aber der Hauptgrund für die Sieben-Tage-Grenze und die Hygieneregeln. Zeichen: zunehmender Schmerz, Schwellung, Überwärmung, Eiter. In dem Fall Nadel raus und ärztlich abklären.</li>\n<li><strong>Pflasterallergie:</strong> Manche Menschen reagieren auf den Kleber. Juckt es grossflächig unter dem Pflaster, entfernen und beim nächsten Termin ein anderes Fixiermaterial besprechen.</li>\n</ul>\n<p>Nicht geeignet sind Dauernadeln bei geschwächtem Immunsystem, bei Neigung zu Wundheilungsstörungen, bei Hauterkrankungen am Ohr und in der Regel während einer Chemotherapie. Bei Blutverdünnern und in der Schwangerschaft entscheidet die Therapeutin im Einzelfall. Sag uns deshalb immer, welche Medikamente du nimmst und ob du schwanger bist. Ein praktischer Hinweis noch: Vor einem MRI müssen Dauernadeln raus, sie bestehen aus Metall. Melde geplante Untersuchungen einfach vorher.</p>\n<h2>Was die Studienlage zeigt</h2>\n<p>Dauernadeln sind eine Form der Akupunktur, deshalb lohnt ein Blick auf die Forschung zur Akupunktur allgemein. In einer grossen Auswertung von Einzeldaten aus randomisierten Studien schnitt Akupunktur bei chronischen Schmerzen besser ab als keine Behandlung und besser als eine Scheinbehandlung; der Unterschied zur Scheinakupunktur war allerdings eher klein (<a href=\"https://pubmed.ncbi.nlm.nih.gov/29198932/\" target=\"_blank\" rel=\"noopener\">Vickers et al., 2018</a>). Für chronische, unspezifische Rückenschmerzen fand eine Cochrane-Übersicht kurzfristig einen kleinen Effekt auf Schmerz und Beweglichkeit gegenüber keiner Behandlung, bei allerdings begrenzter Sicherheit der Evidenz (<a href=\"https://pubmed.ncbi.nlm.nih.gov/33306198/\" target=\"_blank\" rel=\"noopener\">Mu et al., Cochrane 2020</a>). Für die Vorbeugung von Migräne fand eine Cochrane-Übersicht, dass Akupunktur die Anfallshäufigkeit senken kann (<a href=\"https://pubmed.ncbi.nlm.nih.gov/27351677/\" target=\"_blank\" rel=\"noopener\">Linde et al., Cochrane 2016</a>). Speziell zu Dauernadeln ist die Studienlage dünn, die meisten Studien untersuchen die klassische Akupunktur. Ehrlich gesagt: Akupunktur kann bei manchen Beschwerden unterstützen, ein sicheres Ergebnis oder gar eine Heilung lässt sich daraus nicht ableiten.</p>\n<h2>Dauernadeln oder normale Sitzung?</h2>\n<p>Beides sind keine Alternativen, sondern Ergänzungen. Die Basis bleibt die reguläre Akupunktursitzung mit Diagnostik, Punktauswahl und 20 bis 30 Minuten Liegezeit. Wie lange Nadeln in einer normalen Sitzung liegen bleiben und wovon das abhängt, liest du im Artikel <a href=\"/wissen/wie-lange-bleiben-akupunkturnadeln-drin/\">Wie lange bleiben Akupunkturnadeln drin?</a> Dauernadeln hängen wir dort an, wo ein Reiz über die Woche hinweg Sinn ergibt.</p>\n<h2>Dauernadeln bei TCM.ch</h2>\n<p>Unsere Therapeutinnen und Therapeuten setzen Dauernadeln dort ein, wo eine kontinuierliche Stimulation den Unterschied macht, eingebettet in einen Behandlungsplan, der auch erklärt, was die Nadeln nicht leisten. Im Erstgespräch klären wir Einsatz, Tragedauer und Pflege, und du bekommst die Regeln schriftlich mit. Termine an 14 Standorten in der Deutschschweiz, in der Regel innert 24 bis 48 Stunden.</p>\n<h2>Kosten und Krankenkasse</h2>\n<p>Dauernadeln werden im Rahmen einer Akupunkturbehandlung gesetzt. Bei EMR- oder ASCA-anerkannten Therapeutinnen beteiligen sich viele Zusatzversicherungen mit 80 bis 100 Prozent, die Grundversicherung deckt es nicht. Prüfe am besten vorab deine Police oder frag uns, wir sagen dir, worauf du achten solltest. Wie die Abrechnung über die Zusatzversicherung läuft, liest du auf unserer Seite zur <a href=\"/krankenkassen/\">Krankenkasse</a>.</p>\n<p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung.</em></p>",
    "faqs": [
      {
        "q": "Wie lange darf man Dauernadeln drin lassen?",
        "a": "Drei bis sieben Tage, spätestens nach einer Woche müssen sie raus. Je länger eine Nadel in der Haut bleibt, desto höher das Risiko für Reizungen und Infektionen an der Einstichstelle. Die genaue Tragedauer besprichst du mit deiner Therapeutin."
      },
      {
        "q": "Kann ich Dauernadeln selber entfernen?",
        "a": "Ja. Hände waschen, Pflaster samt Nadel langsam abziehen, die Nadel bleibt am Pflaster kleben. Danach die Stelle desinfizieren und das Pflaster im Hausmüll entsorgen. Entferne die Nadeln sofort, wenn die Stelle schmerzt, anschwillt oder nässt."
      },
      {
        "q": "Darf ich mit Dauernadeln duschen?",
        "a": "Ja, Duschen und Haarewaschen sind erlaubt. Tupfe die Stelle danach vorsichtig trocken. Schwimmbad, Sauna und Dampfbad solltest du während der Tragezeit meiden, weil feuchtwarmes Klima und Chlorwasser die Einstichstelle reizen können."
      },
      {
        "q": "Tun Dauernadeln weh?",
        "a": "Das Setzen spürst du als kurzen Piks, danach sind die Nadeln im Alltag kaum wahrnehmbar. Ein leichtes Druckgefühl am ersten Tag ist normal. Schmerzt eine Stelle zunehmend oder pocht sie, entferne die Nadel und melde dich bei uns."
      },
      {
        "q": "Helfen Dauernadeln beim Rauchstopp?",
        "a": "Die Studienlage ist durchzogen, ein Cochrane-Review fand keine verlässlichen Belege für eine Langzeitwirkung. Viele berichten aber, dass Drücken auf die Ohrnadel akutes Rauchverlangen abfedert. Dauernadeln können deinen Rauchstopp unterstützen, ersetzen ihn aber nicht."
      },
      {
        "q": "Was passiert, wenn eine Dauernadel herausfällt?",
        "a": "Nichts Schlimmes. Kontrolliere, dass die Nadel am Pflaster hängt, desinfiziere die Stelle und entsorge das Pflaster. Setze die Nadel nicht wieder ein. Beim nächsten Termin kann die Therapeutin bei Bedarf eine neue Nadel setzen."
      }
    ],
    "related": [
      {
        "href": "/wissen/wie-lange-bleiben-akupunkturnadeln-drin/",
        "label": "Wie lange bleiben Akupunkturnadeln drin?",
        "cat": "Artikel"
      },
      {
        "href": "/therapien/dauernadeln/",
        "label": "Akupunktur mit Dauernadeln",
        "cat": "Therapie"
      },
      {
        "href": "/therapien/akupunktur/",
        "label": "Akupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/krankenkassen/",
        "label": "Krankenkasse und TCM",
        "cat": "Info"
      }
    ]
  },
  {
    "slug": "akupunktur-bei-rueckenschmerzen",
    "title": "Akupunktur bei Rückenschmerzen: Wirkung & Ablauf",
    "metaDesc": "Hilft Akupunktur bei Rückenschmerzen? Wirkung, Ablauf einer TCM-Behandlung, die Studienlage und wann du ärztlich abklären solltest. EMR und ASCA anerkannt.",
    "region": "Schweizweit",
    "excerpt": "Akupunktur kann chronische Rückenschmerzen lindern, ist aber kein Ersatz für Bewegung. Was die Forschung zeigt, wie die Behandlung abläuft und wann du ärztlich abklären solltest.",
    "category": "Beschwerden verstehen",
    "h1": "Akupunktur bei Rückenschmerzen: Wirkung, Ablauf und was die Forschung zeigt",
    "lead": "Rückenschmerzen gehören zu den häufigsten Gründen, warum Menschen eine TCM-Praxis aufsuchen. Viele kommen, nachdem Schmerzmittel, Physiotherapie oder Ruhe nicht den erhofften Effekt gebracht haben, und fragen sich, ob Akupunktur eine echte Option ist oder nur ein teurer Versuch.",
    "readingTime": "9 Min.",
    "ctaTitle": "Termin anfragen",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-06-17",
    "dateModified": "2026-06-17",
    "lastReviewed": "2026-06-17",
    "bodyHtml": "<p>Die ehrliche Kurzfassung: Bei chronischen, unspezifischen Rückenschmerzen gibt es belastbare Hinweise, dass Akupunktur Beschwerden lindern und die Beweglichkeit verbessern kann. Sie ersetzt keine notwendige ärztliche Abklärung, kann aber eine sinnvolle Ergänzung sein. Was das konkret bedeutet, wie eine Behandlung abläuft und worauf du achten solltest, liest du hier.</p><h2>Hilft Akupunktur bei Rückenschmerzen?</h2><p>Diese Frage lässt sich nicht mit einem pauschalen Ja beantworten, denn Rückenschmerzen sind nicht gleich Rückenschmerzen. Entscheidend ist die Art:</p><p>Bei <strong>chronischen, unspezifischen Rückenschmerzen</strong>, also Beschwerden ohne klare strukturelle Ursache, die länger als zwölf Wochen bestehen, sieht die Studienlage am günstigsten aus. Hier berichten viele Betroffene über weniger Schmerz und mehr Bewegungsfreiheit nach mehreren Sitzungen.</p><p>Bei <strong>akuten Rückenschmerzen</strong> kann Akupunktur die Phase begleiten, die meisten akuten Episoden bessern sich aber auch von selbst.</p><p>Bei <strong>spezifischen Ursachen</strong> wie einem Bandscheibenvorfall mit Nervenbeteiligung steht die ärztliche Abklärung an erster Stelle. Akupunktur kann dann höchstens begleitend sinnvoll sein, nie als Ersatz.</p><p>Wir sagen dir nach der Untersuchung offen, in welche Kategorie deine Beschwerden fallen und ob TCM für dich überhaupt der richtige Weg ist.</p><h2>Warum Rückenschmerzen entstehen</h2><p>Aus schulmedizinischer Sicht steckt hinter chronischen Rückenschmerzen selten eine einzelne kaputte Struktur. Häufiger ist es ein Zusammenspiel aus muskulärer Verspannung, Bewegungsmangel, einseitiger Belastung, Stress und einem überempfindlich gewordenen Schmerzsystem.</p><p>In der TCM betrachten wir den Rücken nicht isoliert. Wir schauen uns an, wie Schlaf, Verdauung, Stresslevel und Belastung im Alltag zusammenhängen, weil all das den Spannungszustand der Muskulatur und die Schmerzwahrnehmung beeinflusst. Daraus ergibt sich ein Bild, das erklärt, warum die Beschwerden bestehen bleiben, statt abzuklingen.</p><h2>Wie eine TCM-Behandlung bei Rückenschmerzen abläuft</h2><p>Der erste Termin folgt einem klaren Ablauf. Mitbringen musst du nichts ausser, falls vorhanden, bisherige Befunde wie Röntgen- oder MRT-Berichte.</p><h3>Anamnese</h3><p>Wir nehmen uns Zeit für deine Geschichte. Seit wann bestehen die Schmerzen, wo genau sitzen sie, was verschlimmert oder lindert sie, wie sieht dein Arbeitsalltag aus. Dieses Gespräch ist die Grundlage für alles Weitere.</p><h3>Untersuchung und Diagnose</h3><p>Es folgt die körperliche Untersuchung und die TCM-Diagnose, zu der unter anderem Zungen- und Pulsbetrachtung gehören. So entsteht ein Bild, das deine Schilderungen mit den Befunden zusammenführt.</p><h3>Behandlung</h3><p>Bei Rückenschmerzen kombinieren wir je nach Befund mehrere Methoden. Akupunktur setzt feine Nadeln an gezielten Punkten, oft entlang der verspannten Muskulatur und an entfernteren Punkten. Schröpfen löst Spannung im Gewebe. Tuina ist eine manuelle Therapie, die gezielt an Muskulatur und Faszien arbeitet. Welche Kombination für dich passt, besprechen wir vorab.</p><h3>Plan</h3><p>Am Ende bekommst du eine Einschätzung, wie viele Termine sinnvoll sind und in welchem Abstand. Chronische Beschwerden brauchen meist mehrere Sitzungen, bis sich etwas Stabiles verändert. Du entscheidest in Ruhe, ob du weitermachst.</p><h2>Was die Forschung zeigt</h2><p>Die Studienlage zur Akupunktur bei Rückenschmerzen ist umfangreich, aber nicht einheitlich. Einige belastbare Punkte:</p><p>Die deutschen GERAC-Studien, eine der grössten Untersuchungen zum Thema, zeigten, dass Akupunktur bei chronischen Rückenschmerzen wirksamer war als die konventionelle Standardtherapie. In der Folge übernehmen die gesetzlichen Krankenkassen in Deutschland Akupunktur bei chronischen Rückenschmerzen.</p><p>Übersichtsarbeiten der Cochrane Library deuten darauf hin, dass Akupunktur chronische Kreuzschmerzen kurzfristig lindern und die Funktion verbessern kann, verglichen mit keiner Behandlung. Die Aussagekraft der Studien wird dabei unterschiedlich bewertet.</p><p>Wichtig bleibt die ehrliche Einordnung: Forschungsergebnisse sind Durchschnittswerte, kein Versprechen für den Einzelfall. Akupunktur wirkt nicht bei jedem gleich, und sie ist kein Ersatz für Bewegung, die bei Rückenschmerzen zentral bleibt. Wir ordnen die Evidenz für deine Situation ein, statt pauschale Versprechen zu machen.</p><h2>Wann du zuerst ärztlich abklären solltest</h2><p>Manche Anzeichen gehören zwingend ärztlich untersucht, bevor eine TCM-Behandlung infrage kommt. Geh ärztlich abklären, wenn zusätzlich zu den Rückenschmerzen eines davon auftritt:</p><ul><li>Taubheit oder Lähmung in Beinen, Füssen oder im Genitalbereich</li><li>Verlust der Kontrolle über Blase oder Darm</li><li>starke Schmerzen nach einem Sturz oder Unfall</li><li>Fieber zusammen mit den Rückenschmerzen</li><li>ungewollter Gewichtsverlust oder nächtliche Schmerzen ohne erkennbaren Grund</li></ul><p>Das sind mögliche Warnzeichen für ernste Ursachen. In solchen Fällen verweisen wir dich konsequent an die ärztliche Versorgung, statt zu behandeln.</p><h2>Krankenkasse und Kosten</h2><p>Unsere Behandlungen sind EMR- und ASCA-anerkannt. Das ist die Voraussetzung dafür, dass viele Zusatzversicherungen die Kosten anteilig übernehmen. Wie viel genau übernommen wird, hängt von deinem Zusatz-Modell ab. Frag am besten vorab bei deiner Krankenkasse nach. Mehr dazu steht auf unserer Seite zur <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/\">Krankenkasse und TCM</a>.</p><p>Wenn du wissen möchtest, wie wir Rückenschmerzen konkret behandeln, findest du die Details auf unserer <a href=\"/beschwerden/rueckenschmerzen/\">Beschwerden-Seite zu Rückenschmerzen</a>. Eine Praxis in deiner Nähe findest du über unsere <a href=\"/standorte/\">Standorte</a>.</p><p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung. Quellen: German Acupuncture Trials (GERAC), Studien zu Akupunktur bei chronischen Rückenschmerzen. Cochrane Library, Übersichtsarbeiten zu Akupunktur bei Kreuzschmerzen. National Institute for Health and Care Excellence (NICE), Leitlinien zu Rückenschmerzen und chronischen Schmerzen.</em></p>",
    "faqs": [
      {
        "q": "Wie viele Sitzungen brauche ich bei Rückenschmerzen?",
        "a": "Das hängt davon ab, wie lange die Beschwerden schon bestehen. Akute Themen sprechen oft schneller an, chronische Schmerzen brauchen meist mehrere Sitzungen über einige Wochen. Nach dem ersten Termin geben wir dir eine ehrliche Einschätzung, statt lange Pakete vorab zu verkaufen."
      },
      {
        "q": "Tut die Akupunktur am Rücken weh?",
        "a": "Die Nadeln sind sehr fein. Die meisten Menschen spüren ein kurzes Ziehen oder leichten Druck, danach liegen die Nadeln ruhig. Starke Schmerzen gehören nicht dazu. Sag jederzeit Bescheid, wenn etwas unangenehm ist."
      },
      {
        "q": "Hilft Akupunktur auch bei einem Bandscheibenvorfall?",
        "a": "Bei einem Bandscheibenvorfall mit Nervenbeteiligung steht die ärztliche Abklärung an erster Stelle. Akupunktur kann begleitend zur Linderung beitragen, ersetzt aber keine medizinische Behandlung. Wir klären das im Erstgespräch."
      },
      {
        "q": "Soll ich mich bei Rückenschmerzen schonen oder bewegen?",
        "a": "Bei den meisten unspezifischen Rückenschmerzen ist sanfte Bewegung besser als strikte Schonung. Akupunktur kann die Phase begleiten, ersetzt die Bewegung aber nicht. Wir besprechen, was in deinem Fall sinnvoll ist."
      },
      {
        "q": "Übernimmt die Krankenkasse die Behandlung?",
        "a": "Unsere Behandlungen sind EMR- und ASCA-anerkannt, deshalb übernehmen viele Zusatzversicherungen einen Teil der Kosten. Die genaue Höhe hängt von deinem Modell ab. Kläre die Deckung am besten vorab direkt mit deiner Versicherung."
      }
    ],
    "related": [
      {
        "href": "/beschwerden/rueckenschmerzen/",
        "label": "Rückenschmerzen",
        "cat": "Beschwerde"
      },
      {
        "href": "/wissen/akupunktur-bei-nackenschmerzen/",
        "label": "Akupunktur bei Nackenschmerzen",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/",
        "label": "Migräne und TCM",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "tcm-st-gallen-erfahrungen-ablauf",
    "title": "TCM in St. Gallen: Ablauf, Erfahrungen und was dich erwartet",
    "metaDesc": "Wie läuft eine TCM-Behandlung in St. Gallen ab? Anamnese, Diagnose, erste Behandlung und ehrliche Erfahrungen. Krankenkassenanerkannt, EMR und ASCA.", "region": "St. Gallen", "excerpt": "Wie läuft eine TCM-Behandlung in St. Gallen ab? Anamnese, Diagnose, erste Behandlung und ehrliche Erfahrungen. Krankenkassenanerkannt, EMR und ASCA.",
    "category": "Standort & Erfahrungen",
    "h1": "TCM in St. Gallen: Ablauf, Erfahrungen und was dich erwartet",
    "lead": "Du überlegst, eine TCM-Praxis in St. Gallen zu besuchen, weisst aber nicht so recht, was dich dort erwartet. Diese Unsicherheit ist der häufigste Grund, warum Menschen den Schritt aufschieben. Darum erklären wir hier konkret, wie eine Behandlung bei uns abläuft, was du mitbringen solltest und was Patientinnen und Patienten nach den ersten Terminen berichten.",
    "readingTime": "8 Min.",
    "ctaTitle": "Termin in St. Gallen anfragen",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-06-16",
    "dateModified": "2026-06-16",
    "lastReviewed": "2026-06-16",
    "bodyHtml": "<p>Kurz gesagt: Du startest mit einem ausführlichen Gespräch, bekommst eine TCM-Diagnose, und auf dieser Basis stellen wir deinen Behandlungsplan zusammen. Kein Termindruck, keine Vorkenntnisse nötig.</p><h2>Was medizinische TCM in St. Gallen bedeutet</h2><p>Traditionelle Chinesische Medizin umfasst mehrere Methoden, die wir je nach Beschwerde kombinieren. Dazu gehören Akupunktur, chinesische Kräutertherapie, Tuina (eine manuelle Therapieform) und Schröpfen. Bei uns arbeiten geprüfte Therapeutinnen und Therapeuten, die Befunde sauber dokumentieren und dort an Grenzen verweisen, wo schulmedizinische Abklärung sinnvoller ist. Einen Überblick zu <a href=\"/akupunktur-tcm-st-gallen/\">Akupunktur in St. Gallen</a>, Kosten und Krankenkasse findest du auf unserer Standort-Seite.</p><p>Wir behandeln an der Ursache, nicht nur am Symptom. Das heisst: Wir schauen uns dein gesamtes Beschwerdebild an, statt eine einzelne Stelle isoliert zu betrachten. Was das in der Praxis bedeutet, siehst du im nächsten Abschnitt.</p><h2>So läuft deine erste Behandlung ab</h2><p>Der erste Termin folgt einem klaren Ablauf. Du musst nichts vorbereiten ausser, falls vorhanden, deinen bisherigen Befunden oder einer Liste deiner Medikamente.</p><h3>1. Anamnese und Gespräch</h3><p>Wir nehmen uns Zeit für deine Geschichte. Seit wann bestehen die Beschwerden, was verschlimmert oder lindert sie, wie sieht dein Alltag aus, dein Schlaf, deine Verdauung, dein Stresslevel. Dieses Gespräch ist die Grundlage für alles Weitere und dauert beim ersten Termin deutlich länger als bei Folgeterminen.</p><h3>2. TCM-Diagnose</h3><p>Anschliessend folgt die Untersuchung. In der TCM gehören dazu unter anderem die Betrachtung der Zunge und das Tasten des Pulses. Diese Methoden liefern uns Hinweise auf Muster, die wir mit deinen Schilderungen abgleichen. Daraus entsteht ein Bild, das erklärt, warum deine Beschwerden bestehen.</p><h3>3. Behandlung</h3><p>Beim Erstgespräch besprechen wir, welche Methoden für dich passen. Häufig folgt direkt eine erste Behandlung, zum Beispiel mit Akupunktur. Die Nadeln sind sehr fein. Die meisten Menschen empfinden das Setzen als kurzes Ziehen oder Druck, danach verbleiben die Nadeln einige Minuten ruhend.</p><h3>4. Plan für die nächsten Schritte</h3><p>Zum Schluss bekommst du eine Einschätzung und einen Vorschlag, wie viele Termine sinnvoll sind und in welchem Abstand. Du entscheidest in Ruhe, ob und wie du weitermachst. Nichts läuft automatisch weiter.</p><h2>Womit Menschen zu uns nach St. Gallen kommen</h2><p>Die Gründe sind unterschiedlich, einige tauchen aber immer wieder auf. Dazu zählen Rückenschmerzen und Nackenschmerzen, Migräne und Kopfschmerzen, Schlafstörungen, Stress und Erschöpfung, Verdauungsbeschwerden sowie ein unerfüllter Kinderwunsch.</p><p>Viele kommen erst, nachdem sie schulmedizinisch abgeklärt wurden und nach einer ergänzenden Behandlung suchen. Genau dort setzt TCM oft an: als begleitende Methode, nicht als Ersatz für notwendige ärztliche Versorgung. Eine Übersicht der Beschwerden, die wir behandeln, findest du auf unserer <a href=\"/beschwerden/\">Beschwerden-Seite</a>.</p><h2>Erfahrungen: was du realistisch erwarten kannst</h2><p>Erfahrungen sind individuell, und seriöse Aussagen brauchen Ehrlichkeit statt Versprechen. Was wir aus dem Praxisalltag in St. Gallen beobachten:</p><p>Viele Patientinnen und Patienten berichten, dass sie sich nach dem ausführlichen Erstgespräch zum ersten Mal richtig gehört fühlen. Das liegt am Zeitrahmen, der bewusst grosszügiger ist als in vielen anderen Settings.</p><p>Wie schnell sich etwas verändert, hängt stark von der Beschwerde ab. Bei akuten Themen kann eine Wirkung früher spürbar sein, chronische Muster brauchen meist mehrere Sitzungen. Wir sagen offen, wenn TCM für dein Anliegen wenig beizutragen hat oder eine andere Abklärung sinnvoller ist.</p><p>Wer das erste Mal Akupunktur ausprobiert, hat oft Respekt vor den Nadeln. In der Rückmeldung ist das fast immer der Punkt, der sich als harmloser herausstellt als befürchtet.</p><h2>Krankenkasse und Kosten in St. Gallen</h2><p>Unsere Behandlungen sind EMR- und ASCA-anerkannt. Das ist die Voraussetzung dafür, dass viele Zusatzversicherungen die Kosten anteilig übernehmen. Ob und wie viel deine Versicherung zahlt, hängt von deinem konkreten Zusatz-Modell ab.</p><p>Praktischer Tipp: Frag bei deiner Krankenkasse nach, ob sie an EMR oder ASCA angeschlossene Therapien aus der Zusatzversicherung vergütet, und in welcher Höhe pro Jahr. Mehr dazu steht auf unserer Seite zur <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/\">Krankenkasse und Akupunktur</a>.</p><h2>Anfahrt zur Praxis in St. Gallen</h2><p>Unsere Praxis liegt zentral am Oberen Graben 22, mitten in der Altstadt nahe Stiftsbezirk und Marktplatz. Vom Bahnhof St. Gallen sind es rund fünf Minuten zu Fuss. Bus und Trolleybus halten direkt beim Bahnhof, und das Parkhaus Oberer Graben befindet sich gleich nebenan. Details zur Anfahrt findest du auf unserer <a href=\"/standorte/st-gallen/\">Standort-Seite St. Gallen</a>.</p><h2>Was die Forschung zur Akupunktur sagt</h2><p>Die Studienlage ist je nach Beschwerde unterschiedlich gut. Für einige Anwendungsbereiche gibt es solide Hinweise. Fachgesellschaften wie das britische NICE empfehlen Akupunktur etwa bei chronischen Schmerzen und zur Vorbeugung von Migräne. Übersichtsarbeiten der Cochrane Library deuten darauf hin, dass Akupunktur die Häufigkeit von Migräneattacken bei manchen Betroffenen verringern kann.</p><p>Wichtig bleibt: Forschungsergebnisse sind Durchschnittswerte, kein Versprechen für den Einzelfall. Wir ordnen die Evidenz für dein Anliegen ein, statt pauschale Aussagen zu machen.</p><p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung, TCM.ch Kliniken St. Gallen. Quellen: National Institute for Health and Care Excellence (NICE), Leitlinien zu chronischen Schmerzen und Migräne. Cochrane Library, Übersichtsarbeiten zu Akupunktur. World Health Organization (WHO), Berichte zur traditionellen Medizin.</em></p>",
    "faqs": [
      {
        "q": "Wie läuft der erste Termin ab?",
        "a": "Du startest mit einem ausführlichen Gespräch zu deinen Beschwerden und deinem Alltag. Danach folgt die TCM-Diagnose mit Zungen- und Pulsbetrachtung, oft eine erste Behandlung und ein Vorschlag für die nächsten Schritte. Der Ersttermin dauert länger als Folgetermine."
      },
      {
        "q": "Tut Akupunktur weh?",
        "a": "Die Nadeln sind sehr fein. Die meisten Menschen spüren beim Setzen ein kurzes Ziehen oder leichten Druck, danach liegen die Nadeln ruhig. Starke Schmerzen gehören nicht dazu. Sag deiner Therapeutin jederzeit Bescheid, wenn etwas unangenehm ist."
      },
      {
        "q": "Übernimmt die Krankenkasse die Behandlung?",
        "a": "Unsere Behandlungen sind EMR- und ASCA-anerkannt, deshalb übernehmen viele Zusatzversicherungen einen Teil der Kosten. Wie viel genau, hängt von deinem Modell ab. Kläre die Deckung am besten vorab direkt mit deiner Versicherung."
      },
      {
        "q": "Brauche ich eine Überweisung?",
        "a": "Nein. Für die Zusatzversicherung ist in der Regel keine ärztliche Überweisung nötig. Bei ernsten oder unklaren Beschwerden empfehlen wir trotzdem eine ärztliche Abklärung, und wir verweisen dich darauf, wenn das sinnvoll ist."
      },
      {
        "q": "Wie viele Termine brauche ich?",
        "a": "Das hängt von der Beschwerde ab. Akute Themen sprechen oft schneller an, chronische Muster brauchen meist mehrere Sitzungen. Wir geben dir nach dem ersten Termin eine ehrliche Einschätzung, statt lange Pakete vorab zu verkaufen."
      }
    ],
    "related": [
      {
        "href": "/wissen/akupunktur-bei-nackenschmerzen/",
        "label": "Akupunktur bei Nackenschmerzen",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/",
        "label": "Migräne und Akupunktur",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "tcm-winterthur-erfahrungen-ablauf",
    "title": "Akupunktur in Winterthur: Ablauf, Erfahrungen und was dich erwartet",
    "metaDesc": "Wie eine TCM-Behandlung in Winterthur abläuft: Anamnese, Diagnose, erste Akupunktur und ehrliche Erfahrungen. Krankenkassenanerkannt, EMR und ASCA.",
    "region": "Winterthur",
    "excerpt": "Wie eine TCM-Behandlung in Winterthur abläuft: Anamnese, Diagnose, erste Akupunktur und ehrliche Erfahrungen. Krankenkassenanerkannt, EMR und ASCA.",
    "category": "Standort & Erfahrungen",
    "h1": "Akupunktur in Winterthur: Ablauf, Erfahrungen und was dich erwartet",
    "lead": "In Winterthur behandeln wir an der Marktgasse mit Akupunktur und klassischer TCM, EMR- und ASCA-anerkannt. Der erste Termin dauert etwa 60 bis 75 Minuten und beginnt mit einer ausführlichen Anamnese, nicht mit der Nadel. Wobei Akupunktur nachweislich helfen kann, wobei sie es nicht kann, und wann du zuerst zum Arzt gehst, liest du hier ehrlich zusammengefasst.",
    "readingTime": "7 Min.",
    "ctaTitle": "Termin in Winterthur vereinbaren?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-07-17",
    "dateModified": "2026-07-17",
    "lastReviewed": "2026-07-17",
    "bodyHtml": "<h2>Was TCM in Winterthur bei uns konkret heisst</h2><p>Traditionelle Chinesische Medizin ist mehr als Nadeln. Bei uns umfasst sie Akupunktur, bei Bedarf Schröpfen, Moxibustion und chinesische Kräuter, immer aufbauend auf einer individuellen Diagnose. In Winterthur arbeiten wir an der Marktgasse, mitten in der Altstadt und fussläufig vom Hauptbahnhof. Alle Therapeutinnen und Therapeuten sind EMR- und ASCA-registriert, das ist die Voraussetzung, damit deine Zusatzversicherung mitzahlt.</p><p>Wichtig vorweg: Wir machen keine Heilversprechen. Akupunktur ist bei einigen Beschwerden gut untersucht und wirksam, bei anderen ist die Datenlage dünn. Wir sagen dir vor der ersten Behandlung ehrlich, in welche Kategorie dein Anliegen fällt.</p><h2>Der erste Termin: Anamnese vor Nadel</h2><p>Der Ersttermin dauert bei uns 60 bis 75 Minuten. Die meiste Zeit davon reden wir. Wir fragen nach deinen Beschwerden, deinem Schlaf, deiner Verdauung, deinem Stresslevel und deinem Zyklus. Dazu kommen zwei Diagnosewerkzeuge, die dir aus der Schulmedizin vielleicht fremd sind: die Zungendiagnose und die Pulsdiagnose. Beide geben uns Hinweise auf Muster, nach denen wir die Behandlung ausrichten.</p><p>Danach folgt oft schon die erste Akupunktur. Du liegst dabei entspannt, meist 20 bis 25 Minuten mit gesetzten Nadeln. Viele nicken dabei weg, und das ist völlig in Ordnung.</p><h2>Wie sich Akupunktur anfühlt</h2><p>Die Nadeln sind haarfein, dünner als eine Injektionsnadel. Beim Setzen spürst du an manchen Punkten fast nichts, an anderen ein kurzes Ziehen oder ein dumpfes Schweregefühl. In der TCM gilt dieses Schweregefühl als erwünschtes Zeichen, dass der Punkt anspricht. Scharfer oder anhaltender Schmerz gehört nicht dazu. Wenn eine Nadel unangenehm bleibt, sag es, wir korrigieren sie sofort.</p><h2>Wobei Menschen in Winterthur zu uns kommen</h2><p>Die häufigsten Anliegen an der Marktgasse sind Rücken- und Nackenschmerzen, Kopfschmerzen, Schlafprobleme, Stress und Erschöpfung sowie Themen rund um Zyklus und Kinderwunsch.</p><p>Für chronische Schmerzen ist die Studienlage am besten. Eine grosse Analyse individueller Patientendaten von Vickers und Kollegen (2018) mit fast 21'000 Patientinnen und Patienten fand für chronische Rücken-, Nacken- und Kopfschmerzen sowie Kniearthrose einen messbaren Nutzen der Akupunktur gegenüber Scheinbehandlung und Standardversorgung. Der Effekt ist real, aber moderat, nicht magisch. Für Spannungskopfschmerz und Migräneprophylaxe stützen Cochrane-Übersichten den Einsatz ebenfalls, mit Wirkstärken vergleichbar mancher medikamentöser Prophylaxe.</p><p>Bei anderen Beschwerden ist die Evidenz schwächer, und dann sagen wir das. Mehr dazu, warum Akupunktur bei <a href=\"/wissen/akupunktur-bei-rueckenschmerzen/\">Rückenschmerzen</a> und <a href=\"/wissen/akupunktur-bei-nackenschmerzen/\">Nackenschmerzen</a> sinnvoll sein kann, findest du in den verlinkten Artikeln.</p><h2>Wie viele Sitzungen brauchst du?</h2><p>Für akute Beschwerden reichen oft wenige Behandlungen. Bei chronischen Themen planen wir in der Regel eine erste Serie von sechs bis zehn Sitzungen, meist ein- bis zweimal pro Woche zu Beginn. Nach etwa vier bis sechs Terminen sollte sich abzeichnen, ob Akupunktur bei dir anschlägt. Tut sie es nicht, hat es keinen Sinn, blind weiterzumachen, und wir sprechen offen über Alternativen.</p><h2>Kosten und Krankenkasse</h2><p>Eine Behandlung kostet bei uns nach dem anerkannten Tarif 590. Über die Zusatzversicherung übernehmen viele Kassen einen grossen Teil, oft 70 bis 90 Prozent bis zu einem Jahreslimit. Aus der Grundversicherung wird ambulante Akupunktur durch Naturheilpraktiker in der Regel nicht bezahlt. Was deine Kasse konkret übernimmt und welche Fehler dabei am häufigsten passieren, haben wir hier zusammengefasst: <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/\">Krankenkasse und TCM</a>.</p><h2>Wann du zuerst ärztlich abklären solltest</h2><p>Akupunktur ergänzt die Schulmedizin, sie ersetzt sie nicht. Geh bitte zuerst zum Arzt oder in die Notaufnahme, wenn folgende Warnzeichen auftreten:</p><ul><li>Plötzliche, sehr starke Schmerzen ohne erkennbaren Auslöser</li><li>Rückenschmerzen mit Taubheit im Genital- oder Analbereich, Blasen- oder Darmschwäche</li><li>Neu aufgetretene Lähmungen, Sprach- oder Sehstörungen</li><li>Fieber, ungewollter Gewichtsverlust oder Nachtschweiss zusammen mit den Schmerzen</li><li>Der schlimmste Kopfschmerz deines Lebens, schlagartig einsetzend</li></ul><p>Diese Zeichen können auf ernsthafte Ursachen hinweisen, die rasch abgeklärt gehören. In solchen Fällen behandeln wir nicht, sondern schicken dich weiter.</p><h2>Unsere Praxis in Winterthur</h2><p>Du findest uns an der Marktgasse in der Winterthurer Altstadt, nur wenige Gehminuten vom Hauptbahnhof. Die Anreise mit dem ÖV ist unkompliziert, Parkhäuser gibt es in der Nähe. Termine kannst du online oder telefonisch vereinbaren. Alle Details zum Standort und zum Team findest du auf der <a href=\"/standorte/winterthur-marktgasse/\">Standortseite Winterthur</a>. Eine Übersicht aller elf Praxen von Zürich bis St. Gallen gibt es unter <a href=\"/wissen/akupunktur-in-meiner-naehe-schweiz/\">Akupunktur in meiner Nähe</a>.</p>",
    "faqs": [
      {
        "q": "Muss ich für den ersten Termin etwas vorbereiten?",
        "a": "Nein, viel braucht es nicht. Iss vorher etwas Leichtes, komm nicht nüchtern und trag bequeme Kleidung. Bring eine Liste deiner Medikamente mit und, falls vorhanden, relevante Arztberichte. Plane für den Ersttermin rund 75 Minuten ein."
      },
      {
        "q": "Tut Akupunktur weh?",
        "a": "In der Regel nicht. Die Nadeln sind haarfein, an vielen Punkten spürst du sie kaum. Manchmal entsteht ein kurzes Ziehen oder ein dumpfes Schweregefühl, das in der TCM erwünscht ist. Scharfer Schmerz gehört nicht dazu, und wir korrigieren jede unangenehme Nadel sofort."
      },
      {
        "q": "Wie schnell wirkt Akupunktur?",
        "a": "Das ist individuell. Manche spüren nach der ersten Sitzung eine Erleichterung, bei chronischen Beschwerden zeigt sich der Trend meist nach vier bis sechs Terminen. Bleibt bis dahin jede Wirkung aus, macht Weitermachen wenig Sinn, und wir besprechen offen Alternativen."
      },
      {
        "q": "Zahlt meine Krankenkasse die Behandlung in Winterthur?",
        "a": "Über die Zusatzversicherung übernehmen viele Kassen einen grossen Teil, weil wir EMR- und ASCA-anerkannt sind. Die genaue Höhe hängt von deinem Vertrag und deinem Jahreslimit ab. Prüfe deine Zusatzversicherung vor dem Termin, wir helfen dir dabei gern weiter."
      },
      {
        "q": "Kann ich mit einer akuten Verletzung kommen?",
        "a": "Bei frischen Verletzungen, starkem Fieber oder plötzlichen neurologischen Ausfällen gehörst du zuerst zum Arzt. Akupunktur ist eine Ergänzung, kein Ersatz für die Notfallversorgung. Bei unklaren oder alarmierenden Beschwerden klären wir das mit dir und verweisen dich weiter."
      }
    ],
    "related": [
      {
        "href": "/wissen/akupunktur-winterthur-kosten/",
        "label": "Akupunktur Winterthur: Kosten",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/akupunktur-in-meiner-naehe-schweiz/",
        "label": "Akupunktur in meiner Nähe",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/akupunktur-bei-rueckenschmerzen/",
        "label": "Akupunktur bei Rückenschmerzen",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "haeufige-infekte-immunsystem",
    "title": "Häufige Infekte und Immunsystem: Was TCM leisten kann",
    "metaDesc": "Häufige Erkältungen und Infektanfälligkeit: Was Akupunktur und chinesische Kräuter ehrlich leisten, welche Hebel wirklich wirken und wann du ärztlich abklärst.",
    "region": "Schweizweit",
    "excerpt": "Häufige Erkältungen und Infektanfälligkeit: Was Akupunktur und chinesische Kräuter ehrlich leisten, welche Hebel wirklich wirken und wann du ärztlich abklärst.",
    "category": "Beschwerden verstehen",
    "h1": "Häufige Infekte und Immunsystem: Was TCM leisten kann",
    "lead": "Wer mehrmals pro Jahr eine Erkältung nach der anderen hat, sucht oft nach einem Weg, das Immunsystem zu stärken. Die TCM sieht dahinter eine geschwächte äussere Abwehr. Was Akupunktur und chinesische Kräuter hier ehrlich leisten können, ist begrenzt. Die grössten Hebel sind Schlaf, Ernährung, Bewegung und Stress. Wann häufige Infekte ärztlich abgeklärt gehören, liest du weiter unten.",
    "readingTime": "6 Min.",
    "ctaTitle": "Infektanfälligkeit abklären lassen?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-08-12",
    "dateModified": "2026-08-12",
    "lastReviewed": "2026-08-12",
    "bodyHtml": "<h2>Was «häufige Infekte» eigentlich heisst</h2><p>Erwachsene haben im Schnitt zwei bis vier Erkältungen pro Jahr, Kinder deutlich mehr. Das ist normal und kein Zeichen einer Schwäche. Wer allerdings in kurzer Zeit einen Infekt nach dem anderen durchmacht, sich zwischen den Erkältungen nie ganz erholt oder auffällig lange braucht, um wieder fit zu werden, spürt zu Recht, dass etwas aus dem Gleichgewicht ist.</p><p>Bevor du nach Nadeln oder Kräutern greifst, lohnt der ehrliche Blick auf die Ursachen. Sehr oft stecken dahinter nicht das Immunsystem selbst, sondern chronischer Schlafmangel, dauerhafter Stress, einseitige Ernährung oder ein Nährstoffmangel. Genau dort liegen auch die wirksamsten Ansätze.</p><h2>Wie die TCM häufige Infekte betrachtet</h2><p>Die Traditionelle Chinesische Medizin beschreibt eine äussere Abwehrschicht des Körpers. Ist sie geschwächt, dringen nach diesem Modell äussere Einflüsse wie Wind und Kälte leichter ein, und man wird anfälliger für Erkältungen. Wichtig: Das ist ein Erklärungsmodell der TCM, kein wissenschaftlich belegter Mechanismus. Wir nennen es so, weil es die Behandlungslogik der TCM verständlich macht, nicht weil es die Biologie deines Immunsystems beschreibt.</p><p>In der Praxis leiten wir daraus ab, worauf wir achten: stabiler Schlaf, warme statt kalter Nahrung in der kühlen Jahreszeit, ausreichend Erholung. Vieles davon deckt sich mit dem, was auch die Schulmedizin empfiehlt.</p><h2>Was Akupunktur und Kräuter hier ehrlich leisten</h2><p>Hier müssen wir klar sein: Für die Vorbeugung von Erkältungen durch Akupunktur oder chinesische Kräuter ist die Studienlage dünn. Eine Cochrane-Übersicht zu chinesischen Kräutern bei der gewöhnlichen Erkältung kam zum Schluss, dass die vorhandenen Studien für eine klare Empfehlung nicht ausreichen, weil die Qualität zu niedrig ist. Auch für Akupunktur gibt es keinen überzeugenden Nachweis, dass sie Erkältungen verhindert.</p><p>Für einzelne Kräuter wie Astragalus gibt es Hinweise auf immunmodulierende Effekte aus kleineren Studien, aber keine belastbaren grossen Belege beim Menschen. Wir setzen solche Kräuter deshalb unterstützend und individuell ein, nicht als Versprechen. Wenn dein Ziel ist, im Herbst weniger krank zu werden, ist die ehrliche Antwort: TCM kann begleitend sinnvoll sein, die verlässlicheren Effekte kommen aber aus deinem Alltag.</p><h2>Die eigentlichen Hebel: Schlaf, Ernährung, Bewegung, Stress</h2><p><strong>Schlaf.</strong> Schlafmangel erhöht nachweislich die Infektanfälligkeit. In einer bekannten Studie von Prather und Kollegen (2015) erkrankten Personen, die weniger als sechs Stunden schliefen, deutlich häufiger nach Kontakt mit einem Erkältungsvirus als jene mit sieben Stunden oder mehr. Regelmässiger, ausreichender Schlaf ist der wirksamste Einzelhebel, den du selbst in der Hand hast.</p><p><strong>Ernährung.</strong> Eine abwechslungsreiche Kost mit genügend Gemüse, Protein und wenig stark verarbeiteten Produkten unterstützt die normale Immunfunktion. Achte in der dunklen Jahreszeit auf deinen Vitamin-D-Status, ein Mangel ist in der Schweiz im Winter verbreitet und lässt sich einfach über das Blut abklären.</p><p><strong>Bewegung.</strong> Moderate, regelmässige Bewegung wirkt sich günstig auf die Abwehr aus. Übertreibe es nicht, denn sehr intensive Belastung ohne Erholung kann kurzfristig sogar das Gegenteil bewirken.</p><p><strong>Stress.</strong> Chronischer Stress schwächt die Immunantwort. Hier setzt auch die TCM an, weil Entspannung und ein ruhigerer Nervenzustand die Regeneration fördern. Ob über Akupunktur, Atemübungen oder schlicht mehr Pausen, ist zweitrangig, Hauptsache es passt in deinen Alltag.</p><h2>Wann du ärztlich abklären solltest</h2><p>Häufige Infekte sind meistens harmlos. Es gibt aber Warnzeichen, bei denen eine ärztliche Abklärung gehört, weil eine ernsthafte Ursache dahinterstecken kann:</p><ul><li>Mehr als vier bis sechs schwere Infekte pro Jahr beim Erwachsenen, die dich richtig aus der Bahn werfen</li><li>Infekte, die immer wieder an derselben Stelle auftreten, etwa wiederkehrende Lungenentzündungen oder Nebenhöhlenentzündungen</li><li>Infekte, die trotz Behandlung nicht abheilen oder mit ungewöhnlichen Erregern einhergehen</li><li>Begleitend ungewollter Gewichtsverlust, anhaltendes Fieber, Nachtschweiss oder auffällige Müdigkeit</li><li>Bekannte Grunderkrankung, Immunsuppression oder Chemotherapie</li></ul><p>Solche Muster können auf einen Immundefekt oder eine andere Erkrankung hinweisen und gehören in ärztliche Hände. TCM ersetzt diese Abklärung nicht, sie kann sie höchstens begleiten.</p><h2>So gehen wir vor</h2><p>In der Anamnese schauen wir zuerst auf deinen Alltag: Schlaf, Ernährung, Stress, Bewegung. Wenn wir vermeidbare Ursachen finden, sprechen wir sie an, bevor wir behandeln. Zeigen sich Warnzeichen, verweisen wir dich zur Abklärung. Passt der Rahmen, kann eine begleitende TCM-Behandlung mit Akupunktur und individuell abgestimmten Kräutern sinnvoll sein, ohne überzogene Versprechen. Eine Übersicht unserer Standorte findest du unter <a href=\"/wissen/akupunktur-in-meiner-naehe-schweiz/\">Akupunktur in meiner Nähe</a>. Was die Krankenkasse übernimmt, steht unter <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/\">Krankenkasse und TCM</a>.</p>",
    "faqs": [
      {
        "q": "Wie viele Erkältungen pro Jahr sind normal?",
        "a": "Bei Erwachsenen gelten zwei bis vier Erkältungen pro Jahr als normal, bei kleinen Kindern deutlich mehr. Erst wenn Infekte auffällig häufig, schwer oder langwierig sind und du dich nie richtig erholst, lohnt ein genauerer Blick auf Ursachen und gegebenenfalls eine ärztliche Abklärung."
      },
      {
        "q": "Kann TCM mein Immunsystem stärken?",
        "a": "TCM kann begleitend unterstützen, vor allem indem sie Schlaf, Stress und Erholung in den Fokus rückt. Ein wissenschaftlich belegter Schutz vor Erkältungen durch Akupunktur oder Kräuter besteht aber nicht. Die verlässlichsten Effekte kommen aus deinem Alltag, nicht aus einer einzelnen Behandlung."
      },
      {
        "q": "Welche Kräuter werden bei Infektanfälligkeit eingesetzt?",
        "a": "In der TCM wird häufig Astragalus verwendet, meist in individuellen Rezepturen. Für einzelne Effekte gibt es Hinweise aus kleineren Studien, aber keine grossen belastbaren Belege. Kräuter setzen wir unterstützend und individuell ein, nie als Ersatz für eine ärztliche Abklärung."
      },
      {
        "q": "Was hilft wirklich gegen häufige Erkältungen?",
        "a": "Am meisten bringt ausreichend Schlaf, eine abwechslungsreiche Ernährung, moderate Bewegung und weniger Dauerstress. Ein Vitamin-D-Mangel sollte im Winter abgeklärt werden. Diese Grundlagen wirken stärker als jede einzelne Behandlung, und die TCM kann sie sinnvoll ergänzen."
      },
      {
        "q": "Wann sollte ich zum Arzt statt zur TCM?",
        "a": "Bei sehr häufigen oder schweren Infekten, wiederkehrenden Lungen- oder Nebenhöhlenentzündungen, Infekten die nicht abheilen, oder Begleitzeichen wie Gewichtsverlust, Fieber und Nachtschweiss gehörst du zuerst zum Arzt. Solche Muster können auf eine ernsthafte Ursache hinweisen, die abgeklärt werden muss."
      }
    ],
    "related": [
      {
        "href": "/wissen/akupunktur-in-meiner-naehe-schweiz/",
        "label": "Akupunktur in meiner Nähe",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "akupunktur-winterthur-kosten",
    "title": "Akupunktur Winterthur: Kosten, Tarif 590 und Krankenkasse",
    "metaDesc": "Was Akupunktur in Winterthur kostet: Tarif 590, Erstkonsultation und Folgebehandlung, was die Zusatzversicherung übernimmt und wie du die Rechnung einreichst.",
    "region": "Winterthur",
    "excerpt": "Was Akupunktur in Winterthur kostet: Tarif 590, Erstkonsultation und Folgebehandlung, was die Zusatzversicherung übernimmt und wie du die Rechnung einreichst.",
    "category": "TCM in der Schweiz",
    "h1": "Akupunktur Winterthur: Kosten, Tarif 590 und Krankenkasse",
    "lead": "Akupunktur in Winterthur rechnen wir nach dem anerkannten Tarif 590 ab, abgerechnet wird pro Fünf-Minuten-Einheit. Eine Erstkonsultation dauert 60 bis 75 Minuten, eine Folgebehandlung 30 bis 60 Minuten. Über die Zusatzversicherung übernehmen viele Kassen einen grossen Teil, weil wir EMR- und ASCA-anerkannt sind. Aus der Grundversicherung wird Akupunktur durch Naturheilpraktiker in der Regel nicht bezahlt. Was du konkret zahlst und wie du das vor dem Termin prüfst, steht hier.",
    "readingTime": "7 Min.",
    "ctaTitle": "Kosten vorab klären?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-07-18",
    "dateModified": "2026-07-18",
    "lastReviewed": "2026-07-18",
    "bodyHtml": "<h2>Wie sich der Preis in Winterthur zusammensetzt</h2><p>Wir rechnen nach Tarif 590 ab, dem anerkannten Tarif für Komplementärmedizin in der Schweiz. Abgerechnet wird nicht pauschal pro Sitzung, sondern in Zeiteinheiten von fünf Minuten. Das klingt bürokratisch, ist für dich aber transparent: Du zahlst die Zeit, die tatsächlich für dich aufgewendet wird, und nicht mehr.</p><p>Was den Preis bestimmt, ist also vor allem die Dauer. Ein Ersttermin ist teurer als eine Folgebehandlung, weil die Anamnese Zeit braucht. Kommen chinesische Kräuter dazu, werden diese separat verrechnet, ebenso wie die Rezeptur selbst. Wir sagen dir vor der Behandlung, womit du rechnen musst. Überraschungen auf der Rechnung gehören nicht zu unserem Verständnis von Praxis.</p><h2>Erstkonsultation und Folgebehandlung</h2><p><strong>Erstkonsultation:</strong> 60 bis 75 Minuten. Enthalten sind die ausführliche Anamnese, Zungen- und Pulsdiagnose, das Behandlungskonzept und in der Regel die erste Akupunktur.</p><p><strong>Folgebehandlung:</strong> meist 30 bis 60 Minuten, je nach Beschwerdebild. Kurze Rücksprache, dann Behandlung.</p><p><strong>Kräutertherapie:</strong> Die Beratung läuft über den Zeittarif, die Rezeptur und die Kräuter kommen als Materialkosten dazu. Was das monatlich bedeutet, besprechen wir offen, bevor du dich entscheidest.</p><p>Den genauen Frankenbetrag für deine geplante Behandlungsdauer nennen wir dir gern telefonisch oder beim Ersttermin, bevor behandelt wird.</p><h2>Was die Krankenkasse übernimmt</h2><p>Der entscheidende Punkt: Akupunktur durch Naturheilpraktikerinnen und Naturheilpraktiker läuft in der Schweiz über die <strong>Zusatzversicherung</strong>, nicht über die Grundversicherung. Aus der Grundversicherung wird Akupunktur nur bezahlt, wenn sie von einer Ärztin oder einem Arzt mit entsprechender Weiterbildung durchgeführt wird.</p><p>Weil wir EMR- und ASCA-registriert sind, erfüllen wir die Voraussetzung, die praktisch alle Zusatzversicherungen verlangen. Viele Kassen übernehmen dann einen grossen Teil der Kosten, häufig 70 bis 90 Prozent, begrenzt durch ein Jahreslimit. Wie hoch dieses Limit ist, hängt komplett von deinem Vertrag ab und reicht je nach Modell von wenigen hundert bis zu mehreren tausend Franken pro Jahr.</p><p>Was dabei am häufigsten schiefgeht und worauf du bei deiner Police achten solltest, haben wir national zusammengefasst: <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/\">Krankenkasse und TCM, Stand 2026</a>.</p><h2>In drei Schritten vorab klären</h2><ol><li><strong>Police prüfen.</strong> Schau nach, ob du eine Zusatzversicherung für Komplementär- oder Alternativmedizin hast. Steht dort nichts, zahlt die Kasse nichts.</li><li><strong>Bei der Kasse anrufen.</strong> Frag konkret nach: Prozentsatz der Übernahme, Jahreslimit, und ob EMR oder ASCA verlangt wird. Notier dir Datum und Name der Auskunft.</li><li><strong>Uns Bescheid geben.</strong> Nenn uns beim Termin deine Kasse. Wir stellen die Rechnung so aus, dass du sie direkt einreichen kannst.</li></ol><p>Wichtig: Verbindliche Auskunft gibt nur deine Krankenkasse. Wir kennen die üblichen Muster, aber nicht deinen Vertrag.</p><h2>Rechnung, Einreichen und Rückerstattung</h2><p>Du bekommst die Rechnung von uns und bezahlst sie zunächst selbst. Danach reichst du sie bei deiner Zusatzversicherung ein, die den vertraglich vereinbarten Anteil zurückerstattet. Unsere Rechnungen enthalten alle Angaben, die die Kassen verlangen, inklusive EMR- beziehungsweise ASCA-Nummer und Tarifpositionen. Ein Arztzeugnis oder eine Überweisung brauchst du bei uns nicht.</p><p>Wie lange die Rückerstattung dauert, ist von Kasse zu Kasse verschieden, meist einige Wochen.</p><h2>Wie viele Sitzungen musst du einplanen?</h2><p>Für die Budgetfrage ist die Anzahl entscheidender als der Einzelpreis. Bei akuten Beschwerden reichen oft wenige Termine. Bei chronischen Themen planen wir in der Regel eine erste Serie von sechs bis zehn Sitzungen. Nach vier bis sechs Behandlungen sollte sich zeigen, ob Akupunktur bei dir anschlägt. Tut sie es nicht, sagen wir das und behandeln nicht einfach weiter. Das ist auch für dein Budget die ehrlichere Variante.</p><p>Rechne für deine Planung also nicht mit einer Sitzung, sondern mit einer Serie, und leg dir dein Jahreslimit daneben.</p><h2>Kosten sind kein Grund, gar nicht anzufangen</h2><p>Wenn du unsicher bist, ob sich der Aufwand lohnt, ruf uns an. Wir sagen dir vorab ehrlich, ob dein Anliegen zu den Bereichen gehört, in denen Akupunktur gut untersucht ist, oder ob die Datenlage dünn ist. Wie eine Behandlung bei uns abläuft, liest du unter <a href=\"/wissen/tcm-winterthur-erfahrungen-ablauf/\">Akupunktur in Winterthur: Ablauf und Erfahrungen</a>. Unsere Praxis findest du an der Marktgasse in der Altstadt, wenige Gehminuten vom Hauptbahnhof: <a href=\"/standorte/winterthur-marktgasse/\">Standort Winterthur</a>.</p>",
    "faqs": [
      {
        "q": "Was kostet eine Akupunktur-Sitzung in Winterthur?",
        "a": "Wir rechnen nach Tarif 590 in Zeiteinheiten von fünf Minuten ab, der Preis richtet sich also nach der Dauer. Eine Erstkonsultation dauert 60 bis 75 Minuten, eine Folgebehandlung meist 30 bis 60 Minuten. Den konkreten Betrag für deine geplante Behandlung nennen wir dir vorab."
      },
      {
        "q": "Zahlt die Grundversicherung Akupunktur?",
        "a": "In der Regel nicht. Aus der Grundversicherung wird Akupunktur nur übernommen, wenn sie ärztlich mit entsprechender Weiterbildung durchgeführt wird. Bei Naturheilpraktikerinnen und Naturheilpraktikern läuft die Vergütung über die Zusatzversicherung für Komplementärmedizin."
      },
      {
        "q": "Wie viel übernimmt die Zusatzversicherung?",
        "a": "Das hängt von deinem Vertrag ab. Häufig sind 70 bis 90 Prozent bis zu einem jährlichen Limit, das je nach Modell stark variiert. Ruf vor dem Termin bei deiner Kasse an und frag nach Prozentsatz, Jahreslimit und ob EMR oder ASCA verlangt wird."
      },
      {
        "q": "Brauche ich eine ärztliche Überweisung?",
        "a": "Nein. Für eine Behandlung bei uns brauchst du weder Überweisung noch Arztzeugnis. Du kannst direkt einen Termin vereinbaren. Prüfe nur vorher, ob deine Zusatzversicherung eigene Bedingungen stellt, das ist von Kasse zu Kasse unterschiedlich."
      },
      {
        "q": "Wie reiche ich die Rechnung ein?",
        "a": "Du bezahlst die Rechnung zuerst selbst und reichst sie danach bei deiner Zusatzversicherung ein. Unsere Rechnungen enthalten alle nötigen Angaben inklusive EMR- oder ASCA-Nummer und Tarifpositionen. Die Rückerstattung dauert je nach Kasse meist einige Wochen."
      }
    ],
    "related": [
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/tcm-winterthur-erfahrungen-ablauf/",
        "label": "Akupunktur in Winterthur: Ablauf",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/akupunktur-in-meiner-naehe-schweiz/",
        "label": "Akupunktur in meiner Nähe",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/chinesische-kraeutertherapie-winterthur/",
        "label": "Chinesische Kräutertherapie in Winterthur",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "chinesische-kraeutertherapie-winterthur",
    "title": "Chinesische Kräutertherapie in Winterthur: Ablauf, Kosten und Sicherheit",
    "metaDesc": "Chinesische Kräuter in Winterthur: wie eine Rezeptur entsteht, wie die Einnahme abläuft, was sie kostet, was die Kasse übernimmt und worauf du bei Wechselwirkungen achten musst.",
    "region": "Winterthur",
    "excerpt": "Chinesische Kräuter in Winterthur: wie eine Rezeptur entsteht, wie die Einnahme abläuft, was sie kostet, was die Kasse übernimmt und worauf du bei Wechselwirkungen achten musst.",
    "category": "TCM in der Schweiz",
    "h1": "Chinesische Kräutertherapie in Winterthur: Ablauf, Kosten und Sicherheit",
    "lead": "Chinesische Kräutertherapie ist neben der Akupunktur die zweite Säule der TCM und arbeitet mit individuell zusammengestellten Rezepturen statt mit Nadeln. In Winterthur beraten wir dazu an der Marktgasse. Eine Rezeptur wird nach Anamnese, Zungen- und Pulsdiagnose erstellt und im Verlauf angepasst. Was die Kräuter leisten können, wo die Evidenz dünn ist, was sie kosten und wann du die Finger davon lassen solltest, steht hier.",
    "readingTime": "8 Min.",
    "ctaTitle": "Kräuterberatung in Winterthur?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-07-18",
    "dateModified": "2026-07-18",
    "lastReviewed": "2026-07-18",
    "bodyHtml": "<h2>Was chinesische Kräutertherapie ist</h2><p>In der Traditionellen Chinesischen Medizin steht die <a href=\"/therapien/kraeutertherapie/\">Kräutertherapie</a> gleichberechtigt neben der Akupunktur. In China gilt sie sogar als die wichtigere der beiden. Gearbeitet wird nicht mit einem einzelnen Mittel, sondern mit einer Rezeptur aus meist acht bis fünfzehn Einzelkräutern, die aufeinander abgestimmt sind. Ein Teil der Rezeptur zielt auf dein Hauptthema, andere Bestandteile stützen die Verträglichkeit oder gleichen Wirkungen aus.</p><p>Entscheidend ist: Es gibt kein Standardmittel gegen Schlafprobleme oder Verdauungsbeschwerden. Zwei Personen mit derselben Diagnose bekommen bei uns unterschiedliche Rezepturen, weil die TCM nicht das Symptom behandelt, sondern das Muster dahinter.</p><h2>Wie eine Beratung in Winterthur abläuft</h2><p>Der Ablauf ähnelt dem Ersttermin für Akupunktur. Wir nehmen uns 60 bis 75 Minuten, fragen ausführlich nach Beschwerden, Schlaf, Verdauung, Energie, Stress und Zyklus, und ergänzen das mit Zungen- und Pulsdiagnose. Erst danach stellen wir eine Rezeptur zusammen.</p><p>Du bekommst die Kräuter in der Regel als Granulat, das du in heissem Wasser auflöst und trinkst. Das ist unkomplizierter als der klassische Dekokt, bei dem Rohkräuter gekocht werden. Dekokte sind möglich, wenn du es traditionell willst, brauchen aber täglich Zeit.</p><p>Nach zwei bis vier Wochen sehen wir uns wieder und passen die Rezeptur an. Diese Anpassung ist kein Zeichen, dass etwas schiefgelaufen ist, sondern Teil der Methode.</p><h2>Wie es schmeckt, ehrlich gesagt</h2><p>Bitter, erdig, ungewohnt. Die meisten finden den Geschmack anfangs unangenehm und gewöhnen sich innerhalb einer Woche daran. Wer partout nicht mag, kann auf Kapseln oder Tabletten ausweichen, allerdings sind diese weniger flexibel anpassbar. Wir sagen dir das vorher, damit du dich nicht durch etwas quälst, das auch anders geht.</p><h2>Wobei Kräuter in unserer Praxis eingesetzt werden</h2><p>Am häufigsten kommen Menschen mit Verdauungsbeschwerden, Schlafproblemen, Erschöpfung, Hautthemen sowie Zyklus- und Wechseljahrbeschwerden zu uns. Bei Kinderwunsch begleiten wir häufig mit Kräutern zusätzlich zur Akupunktur.</p><p>Zur Evidenz müssen wir ehrlich sein. Für einzelne Anwendungsgebiete gibt es Hinweise aus klinischen Studien, etwa für bestimmte Rezepturen beim Reizdarmsyndrom. Insgesamt ist die Studienlage zur chinesischen Kräutertherapie aber uneinheitlich, viele Untersuchungen sind klein oder methodisch schwach, und Cochrane-Übersichten kommen für die meisten Indikationen zum Schluss, dass die Datenlage für klare Empfehlungen nicht ausreicht. Wir arbeiten mit Kräutern, weil wir in der Praxis regelmässig gute Verläufe sehen, nicht weil die Studienlage eindeutig wäre. Wer dir etwas anderes erzählt, verkauft dir etwas.</p><h2>Sicherheit, Qualität und Wechselwirkungen</h2><p>Der Punkt, an dem wir am wenigsten Kompromisse machen. Wir beziehen ausschliesslich von Schweizer Lieferanten, die ihre Chargen auf Schwermetalle, Pestizide und Verfälschungen prüfen lassen. Chinesische Kräuter aus unklarer Quelle, aus dem Internet oder aus dem Ferienkoffer solltest du nicht einnehmen. Verunreinigungen und falsch deklarierte Pflanzen sind ein reales Problem.</p><p>Kräuter sind wirksam, und damit können sie auch mit Medikamenten interagieren. Sag uns immer, was du sonst einnimmst, insbesondere bei Blutverdünnern, Immunsuppressiva, Schilddrüsen- oder Krebsmedikamenten. In Schwangerschaft und Stillzeit gilt besondere Vorsicht, hier verschreiben wir nur sehr zurückhaltend und nach klarer Abwägung. Bei bestehender Leber- oder Nierenerkrankung sprechen wir vorher mit dir über die Risiken.</p><p>Wenn dir während der Einnahme übel wird, du Hautreaktionen bekommst oder dich schlechter fühlst, setz ab und melde dich. Das ist selten, aber es kommt vor.</p><h2>Kosten und Krankenkasse</h2><p>Zwei Posten: die Beratung und die Kräuter selbst. Die Beratung rechnen wir nach Tarif 590 nach Behandlungsdauer ab, wie bei der Akupunktur auch. Die Kräuter kommen als Materialkosten dazu und laufen über die Rezeptur.</p><p>Bei der Zusatzversicherung ist wichtig zu wissen: Viele Kassen übernehmen die Konsultation, aber nicht oder nur teilweise die Kräuter selbst. Das überrascht Patientinnen und Patienten regelmässig. Frag deine Kasse vor dem Start konkret nach beiden Posten. Details zur Kostenlogik in Winterthur findest du unter <a href=\"/wissen/akupunktur-winterthur-kosten/\">Akupunktur Winterthur: Kosten und Krankenkasse</a>, die nationalen Regeln stehen unter <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/\">Krankenkasse und TCM</a>.</p><h2>Wann du zuerst ärztlich abklären solltest</h2><p>Kräutertherapie ist eine Ergänzung, kein Ersatz für Diagnostik. Geh zuerst zum Arzt bei ungewolltem Gewichtsverlust, Blut im Stuhl oder Urin, anhaltendem Fieber, neu aufgetretenen starken Schmerzen oder wenn sich bestehende Beschwerden deutlich verschlechtern. Setz laufende Medikamente nie eigenmächtig ab, um Platz für Kräuter zu machen. Wenn wir bei dir Warnzeichen sehen, behandeln wir nicht, sondern verweisen weiter.</p><h2>Praxis Winterthur</h2><p>Du findest uns an der Marktgasse in der Winterthurer Altstadt, wenige Gehminuten vom Hauptbahnhof. Wie ein Ersttermin bei uns abläuft, liest du unter <a href=\"/wissen/tcm-winterthur-erfahrungen-ablauf/\">Akupunktur in Winterthur: Ablauf und Erfahrungen</a>. Alle Angaben zum Standort und zum Team stehen auf der <a href=\"/standorte/winterthur-marktgasse/\">Standortseite Winterthur</a>.</p>",
    "faqs": [
      {
        "q": "Wie lange muss ich chinesische Kräuter nehmen?",
        "a": "Das hängt vom Anliegen ab. Bei akuten Themen sind es oft zwei bis vier Wochen, bei chronischen Beschwerden planen wir eher zwei bis drei Monate mit regelmässiger Anpassung der Rezeptur. Nach etwa vier Wochen sollte sich abzeichnen, ob die Richtung stimmt."
      },
      {
        "q": "Kann ich Kräuter zusammen mit meinen Medikamenten einnehmen?",
        "a": "Nicht ohne Rücksprache. Chinesische Kräuter sind wirksam und können mit Medikamenten interagieren, besonders mit Blutverdünnern, Immunsuppressiva sowie Schilddrüsen- und Krebsmedikamenten. Bring eine vollständige Liste deiner Medikamente mit, wir klären das vor der ersten Rezeptur."
      },
      {
        "q": "Schmecken chinesische Kräuter wirklich so schlecht?",
        "a": "Sie schmecken bitter und erdig, das lässt sich nicht schönreden. Die meisten gewöhnen sich innerhalb einer Woche daran. Wenn es gar nicht geht, gibt es Kapseln oder Tabletten als Alternative, die allerdings weniger flexibel an deinen Verlauf angepasst werden können."
      },
      {
        "q": "Zahlt die Krankenkasse die Kräuter?",
        "a": "Häufig übernimmt die Zusatzversicherung die Konsultation, aber die Kräuter selbst nur teilweise oder gar nicht. Das ist von Vertrag zu Vertrag verschieden. Frag deine Kasse vor dem Start konkret nach beiden Posten, Beratung und Material, damit du nicht überrascht wirst."
      },
      {
        "q": "Sind chinesische Kräuter sicher?",
        "a": "Bei geprüfter Qualität und fachlicher Verschreibung sind sie in der Regel gut verträglich. Wir beziehen ausschliesslich von Schweizer Lieferanten mit Chargenprüfung. Finger weg von Kräutern aus unklarer Quelle oder aus dem Internet, dort sind Verunreinigungen und falsche Deklarationen ein reales Problem."
      }
    ],
    "related": [
      {
        "href": "/wissen/tcm-winterthur-erfahrungen-ablauf/",
        "label": "Akupunktur in Winterthur: Ablauf",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/akupunktur-winterthur-kosten/",
        "label": "Akupunktur Winterthur: Kosten",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "akupunktur-bei-heuschnupfen",
    "title": "Akupunktur bei Heuschnupfen: Studienlage & Nutzen",
    "metaDesc": "Hilft Akupunktur bei Heuschnupfen? Was die Studienlage zeigt, wann du mit einer Behandlung beginnen solltest und wann du besser zum Arzt gehst.", "region": "Schweizweit", "excerpt": "Was die ACUSAR-Studie zur Akupunktur bei Heuschnupfen zeigt, wann du mit der Behandlung beginnen solltest und wann du besser zum Arzt gehst.",
    "category": "Beschwerden verstehen",
    "h1": "Akupunktur bei Heuschnupfen: Was die Studienlage zeigt und für wen es sinnvoll ist",
    "lead": "Die ehrliche Antwort: Es gibt für Heuschnupfen tatsächlich gute Studien zur Akupunktur, besser als bei vielen anderen Beschwerden. Sie zeigen einen messbaren, aber moderaten Effekt. Akupunktur ersetzt deine Notfallmedikation nicht, sie kann den Bedarf danach aber senken. Dieser Artikel erklärt dir, was die Forschung wirklich belegt, wann eine Behandlung Sinn ergibt und wann du besser zum Arzt gehst.",
    "readingTime": "9 Min.",
    "ctaTitle": "Heuschnupfen abklären lassen?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-06-13",
    "dateModified": "2026-06-13",
    "lastReviewed": "2026-06-13",
    "bodyHtml": "<p>Wenn im Frühling die Birken blühen oder im Sommer die Gräser, beginnt für viele dieselbe Routine: laufende Nase, juckende Augen, Niesattacken, ein dumpfer Kopf. Antihistaminika helfen, machen aber manche müde, und nicht jeder will sie über Wochen schlucken. Genau dann taucht oft die Frage auf, ob Akupunktur eine Alternative ist.</p><h2>Was bei Heuschnupfen im Körper passiert</h2><p><a href=\"/beschwerden/heuschnupfen/\">Heuschnupfen</a>, medizinisch saisonale allergische Rhinitis, ist eine Überreaktion deines Immunsystems auf eigentlich harmlose Pollen. Dein Körper stuft Birken-, Gräser- oder Beifusspollen fälschlich als Bedrohung ein und schüttet Histamin aus. Die Folge kennst du: Die Schleimhäute in Nase und Augen schwellen an, jucken und sondern Sekret ab.</p><p>In der Schweiz ist etwa jede fünfte Person betroffen, und die Zahl steigt. Mit den wärmeren Jahren verlängert sich die Pollensaison, manche reagieren heute über Monate statt Wochen. Unbehandelt kann sich aus einem Heuschnupfen mit der Zeit ein allergisches Asthma entwickeln, der sogenannte Etagenwechsel. Das ist einer der Gründe, warum man die Beschwerden ernst nehmen und nicht nur wegdrücken sollte.</p><h2>Was die Forschung zeigt</h2><p>Die wichtigste Untersuchung ist die ACUSAR-Studie, geleitet von Benno Brinkhaus an der Charité Berlin und 2013 in den Annals of Internal Medicine veröffentlicht (Brinkhaus B et al., Ann Intern Med 2013;158:225-234). Es ist eine grosse, sauber gebaute Arbeit: 422 Patientinnen und Patienten mit nachgewiesener Pollenallergie wurden in drei Gruppen aufgeteilt. Eine erhielt echte Akupunktur plus Notfallmedikament bei Bedarf, eine eine Scheinakupunktur plus Medikament, die dritte nur das Medikament.</p><p>Das Ergebnis: Die echte Akupunktur-Gruppe berichtete über deutlich weniger Beschwerden und brauchte weniger Antihistaminika als beide Vergleichsgruppen. Eine spätere Auswertung bestätigte den geringeren Medikamentenbedarf (Adam D et al., Acupunct Med 2018). Bemerkenswert war auch, dass ein Teil des Effekts noch Monate nach der letzten Behandlung anhielt.</p><p>Wichtig ist die Einordnung, und hier bleibe ich ehrlich: Der Studienleiter selbst stufte die klinische Bedeutung als zurückhaltend ein, weil die Unterschiede zwischen den Gruppen zwar statistisch klar, in der Grösse aber moderat waren. Akupunktur macht aus einem starken Heuschnupfen also keinen verschwundenen, aber sie kann ihn spürbar erträglicher machen und den Griff zur Tablette reduzieren. Für jemanden, der Antihistaminika schlecht verträgt oder reduzieren möchte, ist das ein realer Gewinn. Wer eine Garantie auf Beschwerdefreiheit erwartet, wird enttäuscht.</p><h2>Der richtige Zeitpunkt entscheidet mit</h2><p>Ein Punkt, der in der Praxis oft den Unterschied macht: Wann du anfängst. Akupunktur bei Heuschnupfen wirkt am besten, wenn du nicht erst startest, wenn die Nase schon seit zwei Wochen läuft. Sinnvoll ist, einige Wochen vor deinem typischen Saisonbeginn zu beginnen, also bei einer Birkenpollen-Allergie etwa im Spätwinter, bei Gräsern im Frühling.</p><p>Über die Saison hinweg planen wir meist eine Serie von rund zehn bis zwölf Behandlungen, ähnlich wie es die ACUSAR-Studie aufgebaut hat. Eine einzelne Sitzung mitten im stärksten Pollenflug bringt erfahrungsgemäss wenig. Wenn du dich also für diesen Weg interessierst, lohnt sich die Planung im Voraus mehr als der spontane Versuch im Akutfall.</p><h2>Wann Akupunktur nicht reicht</h2><p>Akupunktur behandelt die Symptome und die Reaktionsbereitschaft, sie heilt die Allergie nicht. Bei diesen Situationen gehörst du ärztlich abgeklärt, nicht zuerst <a href=\"/standorte\">zu uns</a>:</p><ul><li>Atemnot, Engegefühl in der Brust oder pfeifendes Atmen. Das kann auf allergisches Asthma hinweisen und gehört rasch abgeklärt.</li><li>starke, plötzliche Schwellung von Lippen, Zunge oder Gesicht. Bei Verdacht auf eine schwere allergische Reaktion sofort den Notfall rufen.</li><li>Fieber, eitriges Nasensekret oder anhaltende einseitige Beschwerden. Das spricht eher für eine Nebenhöhlenentzündung als für Heuschnupfen.</li><li>Beschwerden, die das ganze Jahr bestehen. Dann steckt vielleicht keine reine Pollenallergie dahinter, sondern Hausstaubmilben, Schimmel oder anderes, was zuerst diagnostisch geklärt werden sollte.</li></ul><p>Und noch etwas Wichtiges: Wenn du an eine spezifische Immuntherapie denkst, also die Desensibilisierung beim Allergologen, ist das die einzige Behandlung, die ursächlich an der Allergie ansetzt. Akupunktur ist kein Ersatz dafür. Sie kann eine sinnvolle Ergänzung sein, gerade in der Symptomkontrolle, aber die Entscheidung über eine Immuntherapie triffst du mit deiner Ärztin.</p><h2>Kosten und Krankenkasse</h2><p>Akupunktur bei einer EMR- oder ASCA-anerkannten Therapeutin wird von den meisten Schweizer Zusatzversicherungen ganz oder teilweise rückerstattet. Wie viel pro Sitzung übernommen wird, hängt von deiner Police ab. Da bei Heuschnupfen eine ganze Serie über die Saison anfällt, lohnt sich der Blick auf deinen Jahresbeitrag besonders. Die Details, welche Versicherungen wie viel zahlen, findest du in unserem Artikel zu <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026\">Krankenkasse und TCM</a>. Kläre deinen Anteil am besten vor dem Start der Serie direkt mit deiner Versicherung.</p><p><em>Dieser Artikel ersetzt keine ärztliche Diagnose. Bei Atemnot, starker Schwellung oder Verdacht auf eine schwere allergische Reaktion wende dich sofort an den Notfall.</em></p><p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung. Quellen: Brinkhaus B et al., Acupuncture in patients with seasonal allergic rhinitis: a randomized trial, Annals of Internal Medicine 2013;158:225-234 (ACUSAR). Adam D et al., Impact of acupuncture on antihistamine use, Acupuncture in Medicine 2018.</em></p>",
    "faqs": [
      {
        "q": "Wann sollte ich mit der Akupunktur beginnen?",
        "a": "Idealerweise einige Wochen vor deinem üblichen Saisonstart, also bei Birkenpollen im Spätwinter, bei Gräsern im Frühling. Der vorbeugende Aufbau wirkt besser als der Start mitten im stärksten Pollenflug. Sprich deinen Saisonbeginn beim ersten Termin an, dann planen wir die Serie passend."
      },
      {
        "q": "Wie viele Sitzungen brauche ich bei Heuschnupfen?",
        "a": "Üblich ist eine Serie von rund zehn bis zwölf Behandlungen über die Saison verteilt, oft ein bis zwei pro Woche zu Beginn. Dieser Rahmen orientiert sich an der Studienlage. Den genauen Verlauf legen wir nach dem ersten Termin gemeinsam fest und passen ihn an, wie du reagierst."
      },
      {
        "q": "Kann ich meine Antihistaminika weiter nehmen?",
        "a": "Ja. Akupunktur ersetzt deine Medikation nicht, sondern ergänzt sie. In Studien sank der Bedarf an Antihistaminika unter Akupunktur, viele kamen mit weniger aus. Setze deine Medikamente aber nicht eigenmächtig ab, sondern reduziere sie nur in Absprache mit deiner Ärztin oder deinem Arzt."
      },
      {
        "q": "Ist Akupunktur ein Ersatz für eine Desensibilisierung?",
        "a": "Nein. Die spezifische Immuntherapie beim Allergologen ist die einzige Behandlung, die ursächlich an der Allergie ansetzt. Akupunktur wirkt auf die Symptome und kann ergänzend entlasten, ersetzt die Immuntherapie aber nicht. Die Entscheidung darüber triffst du mit deiner Ärztin."
      },
      {
        "q": "Übernimmt die Krankenkasse die Behandlung?",
        "a": "Bei einer EMR- oder ASCA-anerkannten Therapeutin erstatten die meisten Zusatzversicherungen Akupunktur ganz oder teilweise. Die Höhe hängt von deiner Police ab. Aus der Grundversicherung wird sie in diesem Rahmen nicht gedeckt. Da bei Heuschnupfen eine ganze Serie anfällt, kläre deinen Anteil vor dem Start mit deiner Versicherung."
      }
    ],
    "related": [
      {
        "href": "/beschwerden/heuschnupfen/",
        "label": "Heuschnupfen",
        "cat": "Beschwerde"
      },
      {
        "href": "/therapien/akupunktur",
        "label": "Akupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/wissen/akupunktur-bei-nackenschmerzen",
        "label": "Akupunktur bei Nackenschmerzen",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/haeufige-infekte-immunsystem/",
        "label": "Häufige Infekte und Immunsystem",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "tcm-naturheilpraktiker-schweiz",
    "title": "TCM-Heilpraktiker oder Naturheilpraktiker?",
    "metaDesc": "TCM-Heilpraktiker oder Naturheilpraktiker? Was die Begriffe in der Schweiz bedeuten und woran du eine seriöse, kassenanerkannte TCM-Praxis erkennst.", "region": "Schweizweit", "excerpt": "Heilpraktiker, Naturheilpraktiker, TCM-Therapeutin? Was die Begriffe in der Schweiz bedeuten und woran du eine seriöse, kassenanerkannte Praxis erkennst.",
    "category": "TCM in der Schweiz",
    "h1": "TCM-Heilpraktiker oder Naturheilpraktiker? Was die Begriffe in der Schweiz wirklich bedeuten",
    "lead": "Viele tippen bei Google „TCM Heilpraktiker“ oder „Heilpraktiker Akupunktur“ ein, wenn sie eine Behandlung suchen. Verständlich, der Begriff ist geläufig. Nur stimmt er für die Schweiz nicht ganz. Wer hier nach der falschen Bezeichnung sucht, landet schnell bei verwirrenden oder unseriösen Angeboten. Dieser Artikel räumt mit der Begriffsverwirrung auf, erklärt, welche Qualifikation in der Schweiz wirklich zählt, und zeigt dir, woran du eine seriöse TCM-Praxis erkennst.",
    "readingTime": "9 Min.",
    "ctaTitle": "Passende Praxis finden?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-06-13",
    "dateModified": "2026-06-13",
    "lastReviewed": "2026-06-13",
    "bodyHtml": "<h2>„Heilpraktiker“ gibt es in der Schweiz so nicht</h2><p>Der Beruf „Heilpraktiker“ ist eine deutsche Sache. In Deutschland ist das eine eigene, staatlich geregelte Berufsbezeichnung mit eigener Prüfung beim Gesundheitsamt. In der Schweiz existiert dieser Titel in dieser Form nicht. Wer dir hierzulande als „Heilpraktiker“ begegnet, verwendet entweder einen aus Deutschland übernommenen Begriff oder eine unpräzise Eigenbezeichnung.</p><p>Das ist keine Wortklauberei. Es ist der erste Filter für Qualität. Denn in der Schweiz gibt es eine klar geregelte, geschützte Qualifikation für genau diese Arbeit, und die heisst anders.</p><h2>Die echte Schweizer Qualifikation: Naturheilpraktiker:in mit eidg. Diplom</h2><p>Seit 2015 gibt es in der Schweiz den eidgenössisch geschützten Titel „Naturheilpraktiker:in mit eidg. Diplom“. Man erreicht ihn über eine Höhere Fachprüfung, die von der OdA AM getragen wird, der Organisation der Arbeitswelt Alternativmedizin. Das Diplom stellt der Bund aus. Geschützt heisst: Den Titel darf nur tragen, wer die Prüfung bestanden hat.</p><p>Dieser Beruf gliedert sich in vier Fachrichtungen: Ayurveda-Medizin, Homöopathie, Traditionelle Chinesische Medizin und Traditionelle Europäische Naturheilkunde. Für dich relevant ist die Fachrichtung TCM. Eine Naturheilpraktikerin mit eidg. Diplom in TCM hat eine mehrjährige Ausbildung durchlaufen, die nicht nur Akupunktur und chinesische Arzneitherapie umfasst, sondern auch westliche Medizingrundlagen. Genau das ist entscheidend: Sie soll erkennen, wann eine Beschwerde in ärztliche Hände gehört und nicht in die Akupunkturpraxis.</p><p>Rund 2'500 Naturheilpraktikerinnen und Naturheilpraktiker arbeiten heute in der Schweiz, verteilt über alle Kantone. Der Beruf ist also etabliert, nicht exotisch.</p><p>Ein Hinweis zur Einordnung: Es gibt daneben noch das „Zertifikat OdA AM“, eine niedrigere Stufe, mit der man in manchen Kantonen befristet arbeiten darf. Und es gibt die „Komplementärtherapeut:innen mit eidg. Diplom“, ein eigener Titel über die OdA KT, der andere Methoden abdeckt. Für die klassische TCM-Behandlung ist der eidg. Diplom-Abschluss in der Fachrichtung TCM der aussagekräftigste Nachweis.</p><h2>EMR und ASCA: warum diese Kürzel über deine Rechnung entscheiden</h2><p>Für dich als Patient ist neben der Ausbildung ein zweiter Punkt praktisch wichtiger als jeder Titel: die Registrierung bei einer Qualitätsstelle. Die bekanntesten sind EMR und ASCA, daneben gibt es APTN und SPAK.</p><p>Diese Stellen prüfen Ausbildung, Berufserfahrung und Qualitätsstandards einer Therapeutin und führen sie in einem Register. Die Schweizer Krankenkassen stützen sich für die Rückerstattung aus der Zusatzversicherung auf genau diese Register. Anders gesagt: Wenn deine Therapeutin nicht bei EMR oder ASCA registriert ist, zahlt deine Zusatzversicherung deine Akupunktur in aller Regel nicht zurück, egal wie gut die Behandlung ist.</p><p>Das macht EMR/ASCA zum wohl wichtigsten praktischen Kriterium bei der Praxissuche. Es verbindet Qualitätsnachweis und Kassenfähigkeit in einem. Ob eine Praxis registriert ist, kannst du direkt auf den Websites von EMR und ASCA nachschlagen.</p><p>Wichtig zur Klarheit: Es geht hier immer um die Zusatzversicherung, nicht um die obligatorische Grundversicherung. Akupunktur durch eine nicht-ärztliche Therapeutin wird über die Zusatzversicherung gedeckt. Die Details dazu findest du in unserem Artikel zu <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026\">Krankenkasse und TCM</a>.</p><h2>Woran du eine seriöse TCM-Praxis erkennst</h2><p>Du musst keine Expertin für das Schweizer Bildungssystem sein, um Spreu von Weizen zu trennen. Diese Punkte reichen als Check:</p><ul><li><strong>EMR- oder ASCA-Registrierung vorhanden.</strong> Verbindet Qualität und Kassenfähigkeit. Steht meist auf der Website, sonst nachfragen oder im Register prüfen.</li><li><strong>Eidg. Diplom oder gleichwertige Anerkennung in TCM.</strong> Bei im Ausland ausgebildeten Therapeuten gibt es ein Gleichwertigkeitsverfahren über das Schweizerische Rote Kreuz. Eine seriöse Praxis nennt ihre Qualifikation offen.</li><li><strong>Eine medizinische Ersteinschätzung gehört dazu.</strong> Wer dich beim ersten Termin gründlich befragt und dich bei Warnzeichen zur Ärztin schickt, arbeitet richtig. Wer alles mit Nadeln lösen will, eher nicht.</li><li><strong>Keine Heilversprechen.</strong> Seriöse TCM verspricht keine Heilung von Krebs, keine Wunder, kein Ersatz für nötige schulmedizinische Behandlung. Solche Versprechen sind das deutlichste Warnsignal.</li><li><strong>Transparente Kosten.</strong> Preis pro Sitzung und Hinweis auf die Kassenabrechnung sollten klar kommuniziert sein, nicht erst auf Nachfrage hervorkommen.</li></ul><p>Stutzig werden solltest du bei vagen Selbstbezeichnungen ohne nachprüfbare Qualifikation, bei Druck zu langen Vorauszahlungspaketen und bei jeder Form von Heilversprechen. Eine gute Praxis hat es nicht nötig, dir etwas zu versprechen, das sie nicht halten kann.</p><h2>Wie es bei TCM.ch geregelt ist</h2><p>Bei TCM.ch arbeiten ausschliesslich qualifizierte, EMR- oder ASCA-anerkannte Therapeutinnen und Therapeuten. Das heisst für dich zweierlei: Die Behandlung erfüllt die Schweizer Qualitätsstandards, und deine Zusatzversicherung erstattet sie im Rahmen deiner Police. Welche Standorte in deiner Nähe liegen, findest du auf unserer <a href=\"/standorte\">Standortübersicht</a>. Wenn du unsicher bist, ob deine Versicherung deckt, klären wir das gern vorab mit dir.</p><p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung. Quellen: OdA AM (Organisation der Arbeitswelt Alternativmedizin), Berufsbild Naturheilpraktiker:in mit eidg. Diplom. EMR und ASCA, Registrierungsstellen für Komplementärmedizin und Tarif 590.</em></p>",
    "faqs": [
      {
        "q": "Gibt es in der Schweiz überhaupt „Heilpraktiker“?",
        "a": "Der Titel „Heilpraktiker“ stammt aus Deutschland und existiert in der Schweiz so nicht. Die geschützte Schweizer Qualifikation heisst „Naturheilpraktiker:in mit eidg. Diplom“ und umfasst vier Fachrichtungen, darunter TCM. Wenn du eine TCM-Behandlung suchst, ist das der relevante Abschluss, nicht der deutsche Begriff."
      },
      {
        "q": "Worauf muss ich bei der Praxissuche am meisten achten?",
        "a": "Auf die EMR- oder ASCA-Registrierung. Sie verbindet zwei Dinge: einen geprüften Qualitätsnachweis und die Voraussetzung, dass deine Zusatzversicherung die Behandlung zurückerstattet. Ist die Praxis nicht registriert, zahlt die Kasse in der Regel nicht. Den Status kannst du in den Registern von EMR und ASCA selbst nachschlagen."
      },
      {
        "q": "Was bedeutet EMR und ASCA genau?",
        "a": "Das sind unabhängige Schweizer Qualitätsstellen, die Ausbildung und Standards von Therapeutinnen prüfen und sie registrieren. Die Krankenkassen stützen sich auf diese Register, um zu entscheiden, welche Behandlungen sie aus der Zusatzversicherung rückerstatten. EMR und ASCA sind damit der Schlüssel zur Kassenfähigkeit."
      },
      {
        "q": "Darf jede Naturheilpraktikerin Akupunktur anbieten?",
        "a": "Massgeblich ist die Fachrichtung. Akupunktur gehört zur Fachrichtung TCM. Je nach Kanton gelten zudem unterschiedliche Bewilligungs- oder Meldepflichten für die Berufsausübung. Eine seriöse Praxis weist ihre TCM-Qualifikation und ihre kantonale Berechtigung transparent aus, frag im Zweifel einfach nach."
      },
      {
        "q": "Zahlt die Grundversicherung eine TCM-Behandlung?",
        "a": "Akupunktur durch eine nicht-ärztliche Therapeutin läuft über die Zusatzversicherung, nicht über die obligatorische Grundversicherung. Voraussetzung ist meist die EMR- oder ASCA-Anerkennung der Therapeutin. Wie viel deine konkrete Police übernimmt, hängt vom Versicherer ab und solltest du vor der ersten Behandlung klären."
      }
    ],
    "related": [
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/akupunktur-bei-nackenschmerzen",
        "label": "Akupunktur bei Nackenschmerzen",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/akupunktur-bei-heuschnupfen",
        "label": "Akupunktur bei Heuschnupfen",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "akupunktur-bei-nackenschmerzen",
    "title": "Akupunktur bei Nackenschmerzen: Studienlage",
    "metaDesc": "Hilft Akupunktur bei Nackenschmerzen? Was die Studienlage wirklich zeigt, wie eine Behandlung abläuft und wann du zuerst ärztlich abklären solltest.", "region": "Schweizweit", "excerpt": "Akupunktur kann bei Nackenschmerzen helfen, ist aber kein Wundermittel. Was die Forschung zeigt und wann du zuerst ärztlich abklären solltest.",
    "category": "Beschwerden verstehen",
    "h1": "Akupunktur bei Nackenschmerzen: Was die Studienlage wirklich zeigt",
    "lead": "Die ehrliche Antwort vorweg: Akupunktur kann bei Nackenschmerzen helfen, aber sie ist kein Wundermittel und sie passt nicht zu jeder Ursache. Dieser Artikel zeigt dir, was die Forschung tatsächlich belegt, wann eine Behandlung sinnvoll ist und wann du besser zuerst zum Arzt gehst.",
    "readingTime": "9 Min.",
    "ctaTitle": "Nackenschmerzen abklären lassen?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-06-13",
    "dateModified": "2026-06-13",
    "lastReviewed": "2026-06-13",
    "bodyHtml": "<p>Fast jeder kennt das: Du wachst auf, drehst den Kopf zur Seite und es zieht. Oder du sitzt einen langen Tag am Bildschirm, und am Abend fühlt sich der Nacken an wie ein angezogener Schraubstock. <a href=\"/beschwerden/nackenschmerzen/\">Nackenschmerzen</a> gehören zu den drei häufigsten Beschwerden des Bewegungsapparats. Viele kommen damit <a href=\"/standorte\">zu uns</a>, nachdem Schmerzmittel und Wärme nur kurz geholfen haben.</p>\n  <h2>Warum der Nacken so oft schmerzt</h2>\n  <p>Der Nacken trägt im Schnitt einen rund fünf Kilo schweren Kopf und hält ihn den ganzen Tag in Position. Sobald die Haltung kippt, etwa beim Blick aufs Handy oder bei stundenlanger Schreibtischarbeit, arbeiten die Muskeln gegen ein Ungleichgewicht. Das geht eine Weile gut. Irgendwann verspannt die Muskulatur, die Durchblutung sinkt und es entstehen Schmerzpunkte, die in Schulter, Hinterkopf oder Arm ausstrahlen können.</p>\n  <p>Die meisten Nackenschmerzen sind sogenannt unspezifisch. Das heisst, es steckt keine ernste Erkrankung dahinter, sondern eine Mischung aus Fehlhaltung, Stress, Bewegungsmangel und manchmal einem schlechten Kissen. Genau bei dieser Gruppe wird Akupunktur interessant, denn hier geht es nicht um eine Operation oder eine Notfallsituation, sondern um die Frage: Wie bringe ich die verspannte Muskulatur und das überreizte Nervensystem wieder ins Lot?</p>\n  <p>Es gibt aber auch Nackenschmerzen mit klarer Ursache. Ein Bandscheibenvorfall an der Halswirbelsäule, arthrotische Veränderungen, ein Schleudertrauma nach einem Unfall. Diese Fälle behandeln wir nie isoliert, sondern immer in Abstimmung mit der behandelnden Ärztin oder dem Arzt.</p>\n  <h2>Was die Forschung zeigt</h2>\n  <p>Die wichtigste Quelle ist ein systematischer Cochrane-Review von Trinh und Kolleginnen aus dem Jahr 2016. Das Team hat 27 Studien mit insgesamt rund 5'462 Teilnehmenden ausgewertet (Trinh K et al., Cochrane Database Syst Rev 2016; CD004870). Das Ergebnis ist differenziert: Menschen mit chronischen Nackenschmerzen, die echte Akupunktur erhielten, berichteten unmittelbar nach der Behandlung und kurzfristig über bessere Schmerzlinderung als Personen, die eine Scheinbehandlung bekamen oder auf einer Warteliste standen.</p>\n  <p>Wichtig ist das Wort kurzfristig. Die Studienlage belegt vor allem einen Effekt über Tage bis Wochen, nicht zwingend über Monate. Und die Autoren stufen die Qualität der Studien als niedrig bis moderat ein. Viele Untersuchungen waren klein, einige methodisch nicht sauber genug. Das relativiert die Begeisterung, mit der Akupunktur manchmal beworben wird.</p>\n  <p>Eine neuere Meta-Analyse von 2024, die 18 randomisierte Studien zusammenfasste, fand bei chronischen Nackenschmerzen sogar anhaltende Effekte nach drei und sechs Monaten, allerdings vor allem dann, wenn Akupunktur ergänzend zu anderen Massnahmen eingesetzt wurde, nicht als alleinige Therapie (PMC11416387). Interessant ist ein Detail aus dieser Auswertung: Im direkten Vergleich mit Scheinakupunktur war der reine Schmerzunterschied klein, die Funktion im Alltag besserte sich jedoch messbar. Das deckt sich mit dem, was wir in der Praxis sehen. Oft geht es weniger um die letzte Schmerzstufe auf einer Skala als darum, dass der Kopf sich wieder frei drehen lässt und der Schlaf besser wird.</p>\n  <p>Zusammengefasst: Es gibt belastbare Hinweise, dass Akupunktur bei chronischen, unspezifischen Nackenschmerzen kurzfristig Schmerz und Beweglichkeit verbessert. Sie ersetzt aber keine aktive Bewegung und keine ärztliche Abklärung bei ernsten Ursachen.</p>\n  <h2>Wie eine Behandlung bei uns abläuft</h2>\n  <p>Beim ersten Termin nehmen wir uns Zeit für die Vorgeschichte. Seit wann besteht der Schmerz, wo genau sitzt er, strahlt er aus, gibt es Begleitsymptome wie Schwindel, Kribbeln in den Armen oder Kopfschmerzen. Diese Fragen sind kein Ritual, sie entscheiden darüber, ob Akupunktur überhaupt der richtige Weg ist oder ob wir dich zuerst zur ärztlichen Abklärung schicken.</p>\n  <p>Danach setzen wir feine Nadeln, meist im Bereich der verspannten Nacken- und Schultermuskulatur, manchmal auch an Punkten an Händen oder Unterschenkeln. Die Nadeln bleiben rund zwanzig bis dreissig Minuten liegen. Die meisten spüren ein leichtes Ziehen oder ein dumpfes Schweregefühl an der Einstichstelle, was normal ist. Schmerzhaft im eigentlichen Sinn ist es selten.</p>\n  <p>Eine einzelne Sitzung bringt manchmal schon Erleichterung, verlässlicher wird es über eine Serie von etwa sechs bis acht Behandlungen. Wenn sich nach vier bis fünf Terminen gar nichts bewegt, ist das für uns ein klares Signal: Dann passt die Methode in deinem Fall nicht, und wir besprechen ehrlich, was stattdessen sinnvoll wäre. Therapie endlos weiterführen, ohne dass etwas passiert, halten wir für falsch.</p>\n  <h2>Wann Akupunktur nicht die richtige Wahl ist</h2>\n  <p>Es gibt Warnzeichen, bei denen du nicht zu uns, sondern zuerst zur Ärztin oder in den Notfall gehörst. Geh bitte ärztlich abklären, wenn der Nackenschmerz mit einem dieser Symptome auftritt:</p>\n  <ul><li>Taubheit, Kraftverlust oder anhaltendes Kribbeln in Armen oder Händen</li><li>starke Kopfschmerzen mit Nackensteifigkeit und Fieber</li><li>Schmerz nach einem Unfall, Sturz oder Schleudertrauma</li><li>Schwindel, Sehstörungen oder Sprachprobleme</li><li>nächtlicher Ruheschmerz, ungewollter Gewichtsverlust oder Fieber ohne erkennbaren Grund</li></ul>\n  <p>Diese Zeichen können auf eine Nervenwurzel-Reizung, eine Entzündung oder seltener auf etwas Ernsteres hinweisen. Akupunktur würde hier wertvolle Zeit kosten. Auch bei einer akuten Infektion, einer Blutgerinnungsstörung oder unter blutverdünnenden Medikamenten klären wir vorab ab, ob und wie wir behandeln.</p>\n  <p>Und noch etwas Ehrliches: Wenn deine Nackenschmerzen vor allem von acht Stunden täglich am gleichen Bildschirm kommen, wird auch die beste Akupunktur das Grundproblem nicht lösen. Sie verschafft Luft, aber die dauerhafte Besserung kommt aus der Kombination mit Bewegung, einer besseren Arbeitsplatzhaltung und gelegentlich aus weniger Stress. Wir sagen das lieber offen, als dir eine Behandlungsserie zu verkaufen, die das Falsche adressiert.</p>\n  <h2>Kosten und Krankenkasse</h2>\n  <p>Akupunktur bei einer von EMR oder ASCA anerkannten Therapeutin wird von den meisten Schweizer Zusatzversicherungen ganz oder teilweise rückerstattet. Wie viel pro Sitzung übernommen wird, hängt von deiner konkreten Police ab. Die Details, inklusive welche Versicherungen wie viel zahlen, findest du in unserem Artikel zu <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026\">Krankenkasse und TCM</a>. Vor der ersten Behandlung lohnt sich ein kurzer Anruf bei deiner Versicherung, damit du Klarheit über deinen Anteil hast.</p>\n  <p><em>Dieser Artikel ersetzt keine ärztliche Diagnose. Bei den oben genannten Warnzeichen wende dich bitte zuerst an deine Ärztin oder den Notfall.</em></p>\n  <p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung. Quellen: Trinh K et al., Acupuncture for neck disorders, Cochrane Database of Systematic Reviews 2016, CD004870. Systematic Review zu anhaltenden Effekten der Akupunktur bei chronischen Nackenschmerzen, 2024 (PMC11416387).</em></p>",
    "faqs": [
      {
        "q": "Wie schnell wirkt Akupunktur bei Nackenschmerzen?",
        "a": "Manche spüren bereits nach der ersten Sitzung, dass sich der Nacken lockerer anfühlt. Verlässlicher zeigt sich der Effekt nach drei bis vier Behandlungen. Bleibt nach vier bis fünf Terminen jede Besserung aus, ist Akupunktur in deinem Fall vermutlich nicht das richtige Mittel, und wir besprechen Alternativen."
      },
      {
        "q": "Tut Akupunktur am Nacken weh?",
        "a": "In der Regel nicht. Die Nadeln sind sehr fein. Beim Einstich spürst du oft nur einen kurzen Piks, danach ein leichtes Ziehen oder ein dumpfes Schweregefühl. Dieses Gefühl ist normal und gehört zur Wirkung dazu. Starke Schmerzen während der Behandlung sind nicht zu erwarten."
      },
      {
        "q": "Wie viele Sitzungen brauche ich?",
        "a": "Bei chronischen Nackenschmerzen planen wir meist eine Serie von sechs bis acht Behandlungen, oft ein bis zwei pro Woche. Akute Beschwerden brauchen häufig weniger. Den genauen Verlauf legen wir nach der ersten Sitzung gemeinsam fest und passen ihn an, wie dein Körper reagiert."
      },
      {
        "q": "Kann ich Akupunktur mit Physiotherapie kombinieren?",
        "a": "Ja, und oft ist genau das sinnvoll. Die Forschung deutet darauf hin, dass Akupunktur als Ergänzung zu aktiver Bewegung bessere und länger anhaltende Ergebnisse bringt als allein. Akupunktur lockert und lindert, Bewegung stabilisiert. Sprich die Kombination mit deiner Therapeutin ab."
      },
      {
        "q": "Übernimmt die Krankenkasse die Behandlung?",
        "a": "Bei einer EMR- oder ASCA-anerkannten Therapeutin erstatten die meisten Zusatzversicherungen Akupunktur ganz oder teilweise. Die Höhe hängt von deiner Police ab. Aus der obligatorischen Grundversicherung wird Akupunktur in diesem Rahmen nicht gedeckt. Kläre deinen Anteil am besten vor dem ersten Termin direkt mit deiner Versicherung."
      }
    ],
    "related": [
      {
        "href": "/beschwerden/nackenschmerzen/",
        "label": "Nackenschmerzen",
        "cat": "Beschwerde"
      },
      {
        "href": "/therapien/akupunktur",
        "label": "Akupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/wissen/akupunktur-bei-heuschnupfen",
        "label": "Akupunktur bei Heuschnupfen",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "migraene-tcm-warum-akupunktur-nicht-fuer-jeden",
    "title": "Migräne und TCM: Warum Akupunktur nicht für jeden funktioniert",
    "metaDesc": "Ein ehrlicher Bericht aus drei Jahren Migräne-Behandlung in unseren TCM-Kliniken: bei wem Akupunktur hilft, bei wem nicht – und was die Studienlage dazu sagt.", "region": "Schweizweit", "excerpt": "Ein ehrlicher Bericht aus drei Jahren Migräne-Behandlungen, und was wir Patientinnen heute anders sagen als früher.",
    "category": "Beschwerden verstehen",
    "h1": "Migräne und TCM: Warum Akupunktur nicht für jeden funktioniert.",
    "lead": "Ein ehrlicher Bericht aus drei Jahren Migräne-Behandlungen in unseren TCM-Kliniken. Bei wem es funktioniert. Bei wem nicht. Und was wir Patientinnen heute anders sagen als früher.",
    "readingTime": "11 Min.",
    "ctaTitle": "Migräne abklären lassen?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-05-26",
    "dateModified": "2026-05-26",
    "lastReviewed": "2026-05-26",
    "bodyHtml": "<h2>Was dieser Artikel ehrlich macht.</h2>\r\n  <p>Wenn du <a href=\"/beschwerden/migraene/\">Migräne</a> hast, hast du wahrscheinlich schon vieles probiert. Triptane. Magnesium. Schlaftracker. Vielleicht Botox. Und jetzt überlegst du, ob Akupunktur hilft. Das ist eine berechtigte Frage, und eine, die wir in unseren Praxen jede Woche hören.</p>\r\n  <p>Wir behandeln seit drei Jahren regelmässig Migräne-Patientinnen. In dieser Zeit haben wir gelernt: bei manchen Menschen reduziert sich die Attacken-Frequenz dramatisch. Bei anderen passiert ehrlich gesagt fast nichts. Das hat Gründe, und wir schreiben sie in diesem Artikel auf.</p>\r\n  <p>Wenn du nach 11 Minuten weisst, ob ein Termin bei uns für dich Sinn macht, hat der Artikel seinen Zweck erfüllt.</p>\r\n\r\n  <div class=\"wa-callout\">\r\n    <div class=\"wa-callout-label\">In Kürze</div>\r\n    <p>Akupunktur funktioniert bei episodischer Migräne mit klaren Triggern oft sehr gut, 8 bis 12 Sitzungen reduzieren die Attacken-Frequenz bei vielen messbar. Bei chronischer Migräne (15+ Tagen pro Monat) sind die Ergebnisse durchwachsen. Bei Aura-Migräne hilft TCM begleitend, ersetzt aber keine neurologische Abklärung. Sitzung CHF 130–160, EMR/ASCA-anerkannt.</p>\r\n  </div>\r\n\r\n  <h2>Warum die Studienlage uns nicht reicht.</h2>\r\n  <p>Es gibt Cochrane-Reviews, die Akupunktur bei Migräne empfehlen. Wir kennen sie. Aber wir behandeln keine Studien, wir behandeln Menschen. Und was wir in unseren Praxen sehen, ist nuancierter als jede Meta-Analyse.</p>\r\n  <p>Was wir tatsächlich sehen: ein klares Muster, wer profitiert und wer nicht. Darüber schreiben wir hier, basierend auf rund 90 Migräne-Patientinnen, die wir über mehrere Behandlungszyklen begleitet haben.</p>\r\n\r\n  <h2>Bei wem Akupunktur in unserer Praxis konstant funktioniert.</h2>\r\n\r\n  <h3>1. Episodische Migräne, 4–10 Tage pro Monat</h3>\r\n  <p>Das ist die Gruppe mit den klarsten Erfolgen. Patientinnen, die zwischen den Attacken normal funktionieren, deren Auslöser bekannt sind (Stress, Schlafmangel, Zyklus), und die nicht täglich Schmerzmittel brauchen. Hier sehen wir nach 8 bis 12 Sitzungen oft eine Halbierung der Attacken-Frequenz. Bei einigen mehr.</p>\r\n\r\n  <h3>2. Menstruelle Migräne</h3>\r\n  <p>Wenn die Attacken klar an den Zyklus gekoppelt sind, ist Akupunktur eine unserer stärksten Karten. Wir arbeiten meist zyklusbegleitend über drei Monate. Viele Patientinnen kommen danach für Erhaltungssitzungen alle 4 bis 6 Wochen und bleiben stabil.</p>\r\n\r\n  <h3>3. Migräne mit muskulärer Komponente</h3>\r\n  <p>Patientinnen, bei denen die Attacken aus dem Nacken-Schulter-Bereich starten. Verspannungen, schlechte Bildschirm-Haltung, klassisch bei HSG-Studierenden und Bürojobs. Hier kombinieren wir Akupunktur mit Tuina und sehen oft schnelle Effekte, manchmal schon nach 3 bis 4 Sitzungen.</p>\r\n\r\n  <h3>4. Patientinnen, die mit Triptanen reduzieren wollen</h3>\r\n  <p>Wenn jemand 10+ Triptane pro Monat braucht, droht ein Übergebrauch-Kopfschmerz. Wir begleiten dann den Reduktionsprozess. Wichtig: das machen wir nie allein, sondern in Absprache mit dem Neurologen oder der Hausärztin.</p>\r\n\r\n  <div class=\"wa-pullquote\">\"Akupunktur ist bei episodischer Migräne mit klaren Triggern eine sehr gute Option. Bei chronischer Migräne mit 20 Schmerztagen im Monat sind wir ehrlich: wir helfen oft, aber wir lösen das Problem selten allein.\"</div>\r\n\r\n  <h2>Bei wem Akupunktur in unserer Praxis oft nicht reicht.</h2>\r\n  <p>Das schreiben wir bewusst auf. Wenn du in einer dieser Gruppen bist, lohnt sich ein offenes Gespräch mit uns, und vielleicht parallel mit deiner Neurologin.</p>\r\n  <ul>\r\n    <li><strong>Chronische Migräne (15+ Kopfschmerztage pro Monat über 3 Monate)</strong>, wir sehen Linderung, aber selten eine echte Umkehr. Hier braucht es meist ein Multimodal-Konzept: Neurologie, eventuell CGRP-Antikörper, Schlafmedizin, dazu TCM als Ergänzung.</li>\r\n    <li><strong>Migräne mit Aura ohne neurologische Abklärung</strong>, wir behandeln nicht, bevor das geklärt ist. Aura kann harmlos sein. Manchmal nicht. Bitte zum Neurologen zuerst.</li>\r\n    <li><strong>Schmerzmittel-Übergebrauchs-Kopfschmerz</strong>, solange täglich Schmerzmittel laufen, ist eine echte Verbesserung mit Akupunktur unrealistisch. Wir behandeln dann erst nach oder während der Pause, abgestimmt mit dem Arzt.</li>\r\n    <li><strong>Migräne als Symptom anderer Erkrankungen</strong>, Schilddrüse, Bluthochdruck, depressive Episoden, Schlafapnoe. Wenn das nicht angegangen wird, sind unsere Behandlungen Symptom-Kosmetik.</li>\r\n    <li><strong>Sekundäre Kopfschmerzen</strong>, nach Trauma, mit Sehstörungen, mit neurologischen Ausfällen. Das ist nicht TCM-Terrain. Das ist Notfall- oder Neurologie-Terrain.</li>\r\n  </ul>\r\n\r\n  <h2>Was wir Patientinnen heute anders sagen als vor drei Jahren.</h2>\r\n  <p>Vor drei Jahren haben wir „kommen Sie zu zehn Sitzungen, dann schauen wir\" gesagt. Heute sagen wir das anders.</p>\r\n  <p>Heute sagen wir: <strong>nach vier Sitzungen sehen wir, ob du zu der Gruppe gehörst, bei der es funktioniert.</strong> Wenn du dann gar keine Veränderung spürst, weniger Attacken, kürzere Attacken, weniger Triptan-Bedarf, irgendetwas, dann hören wir auf. Du sparst Geld, wir sparen dir falsche Hoffnung.</p>\r\n  <p>Und wir sagen offener: bei chronischer Migräne sind wir Ergänzung, nicht Lösung. Wer mit der Erwartung kommt, dass Akupunktur 25 Schmerztage im Monat in 5 verwandelt, wird enttäuscht. Wer mit der Erwartung kommt, dass wir die Tage besser machen und parallel mit der Neurologie an der Frequenz arbeiten, den können wir gut begleiten.</p>\r\n\r\n  <h2>Wie ein Behandlungszyklus konkret aussieht.</h2>\r\n  <ul>\r\n    <li><strong>Sitzung 1 (60 Min)</strong>, ausführliche Anamnese, Trigger-Analyse, Schmerztagebuch wenn vorhanden, erste Behandlung. Wir besprechen, was wir realistisch erwarten.</li>\r\n    <li><strong>Sitzungen 2–4 (45 Min, wöchentlich)</strong>, Aufbauphase. Hier sehen wir, ob dein System auf Akupunktur reagiert.</li>\r\n    <li><strong>Zwischenbilanz nach Sitzung 4</strong>, ehrliches Gespräch. Reduktion sichtbar? Weitermachen. Keine Veränderung? Wir sagen es.</li>\r\n    <li><strong>Sitzungen 5–10 (alle 1–2 Wochen)</strong>, Stabilisierungsphase. Hier kommen die meisten Effekte.</li>\r\n    <li><strong>Erhaltung</strong>, danach reichen meist Sitzungen alle 4 bis 6 Wochen.</li>\r\n  </ul>\r\n  <p>Mehr zur Methode selbst auf unserer Seite zu <a href=\"/therapien/akupunktur\">Akupunktur</a>. Wenn deine Migräne mit Nacken-Themen zusammenhängt, ergänzen wir oft mit <a href=\"/beschwerden/rueckenschmerzen/\">Rücken- und Nackenbehandlung</a>.</p>\r\n\r\n  <h2>Was es kostet, und was die Kasse zahlt.</h2>\r\n  <p>Erstanamnese 60 Minuten: CHF 160. Folgesitzungen 45 Minuten: CHF 130. Ein typischer Migräne-Zyklus kostet brutto zwischen CHF 1'200 und CHF 1'600 über 8 bis 12 Sitzungen.</p>\r\n  <p>Wir sind <strong>EMR- und ASCA-anerkannt</strong>. Mit Zusatzversicherung für Komplementärmedizin zahlst du netto meist nur 10 bis 25 Prozent selbst. Details welche Kasse was übernimmt auf der <a href=\"/wissen\">Krankenkassen-Seite</a>.</p>\r\n  <p>Die Grundversicherung zahlt Akupunktur bei Migräne nicht. Auch wenn manche Hausärzte das anders darstellen.</p>\r\n\r\n  <h2>Wenn du jetzt überlegst, einen Termin zu machen.</h2>\r\n  <p>Schreib uns kurz, wie deine Migräne aussieht: wie viele Tage im Monat, mit oder ohne Aura, welche Medikamente, wie lange schon. Wir sagen dir dann offen, ob ein Termin bei uns Sinn macht, oder ob wir dich zuerst zu jemand anderem schicken würden.</p>\r\n  <p>Wir antworten meist innerhalb einer Stunde während der Öffnungszeiten. Termine in St. Gallen, Frauenfeld, Zürich und unseren anderen <a href=\"/wissen\">Standorten</a> meist innerhalb von 7 bis 10 Tagen.</p>\r\n</div>",
    "faqs": [
      {
        "q": "Wie viele Sitzungen brauche ich, bis ich etwas spüre?+",
        "a": "Bei den meisten Patientinnen sehen wir nach 3 bis 4 Sitzungen erste Veränderungen, entweder kürzere Attacken, weniger intensiv, oder seltener. Wenn nach 4 Sitzungen gar nichts passiert, sagen wir dir ehrlich, dass es bei dir wahrscheinlich nicht funktioniert."
      },
      {
        "q": "Kann ich Akupunktur und Triptane parallel nutzen?+",
        "a": "Ja. Akupunktur ersetzt deine Akutmedikation nicht, sie soll dafür sorgen, dass du weniger davon brauchst. Wenn du täglich Triptane nimmst, sprechen wir vorher mit deiner Neurologin, weil dann ein Übergebrauchs-Kopfschmerz im Raum steht."
      },
      {
        "q": "Hilft Akupunktur bei einer akuten Migräne-Attacke?+",
        "a": "Manchmal, aber nicht zuverlässig. Akupunktur ist primär präventiv. In der Attacke selbst sind die meisten Patientinnen zu lichtempfindlich, um eine Sitzung durchzustehen. Wir behandeln meist zwischen den Attacken."
      },
      {
        "q": "Was ist mit Migräne in der Schwangerschaft?+",
        "a": "Hier ist Akupunktur eine der wenigen sicheren Optionen, weil viele Migräne-Medikamente in der Schwangerschaft nicht erlaubt sind. Wir behandeln das regelmässig, vermeiden bestimmte Punkte und stimmen mit deiner Gynäkologin ab."
      },
      {
        "q": "Brauche ich vorher eine neurologische Abklärung?+",
        "a": "Bei erstmaligen oder neu auftretenden Kopfschmerzen: ja. Bei langjähriger, klar diagnostizierter Migräne: nicht zwingend. Bei Migräne mit Aura ohne vorherige Abklärung verlangen wir das. Wir wollen sicher sein, dass wir nichts übersehen."
      }
    ],
    "related": [
      {
        "href": "/wissen/akupunktur-bei-nackenschmerzen",
        "label": "Akupunktur bei Nackenschmerzen",
        "cat": "Artikel"
      },
      {
        "href": "/beschwerden/migraene/",
        "label": "Migräne",
        "cat": "Beschwerde"
      },
      {
        "href": "/beschwerden/kopfschmerzen/",
        "label": "Kopfschmerzen",
        "cat": "Beschwerde"
      },
      {
        "href": "/therapien/akupunktur",
        "label": "Akupunktur",
        "cat": "Therapie"
      }
    ]
  },
  {
    "slug": "akupunktur-in-meiner-naehe-schweiz",
    "title": "Akupunktur in meiner Nähe: Alle Standorte in der Deutschschweiz",
    "metaDesc": "TCM-Praxen von Zürich bis St. Gallen: welche Praxis zu welcher Beschwerde passt, was es kostet und wie schnell du einen Termin in deiner Nähe bekommst.", "region": "Deutschschweiz", "excerpt": "Elf TCM-Praxen von Zürich bis St. Gallen. Wo wir behandeln, wer dort arbeitet, und wie du den nächsten Termin findest.",
    "category": "TCM in der Schweiz",
    "h1": "Akupunktur in meiner Nähe: Alle Standorte in der Deutschschweiz.",
    "lead": "Elf TCM-Praxen von Zürich bis St. Gallen. Wo wir behandeln, wer dort arbeitet, und wie du in unter einer Minute den nächsten Termin in deiner Nähe findest.",
    "readingTime": "8 Min.",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Mitgründerin TCM.ch",
      "bio": "Corinna ist Mitgründerin von TCM.ch und hat die meisten Standorte mit aufgebaut. Sie behandelt seit über zehn Jahren in der Deutschschweiz mit Schwerpunkten in Frauengesundheit, Kinderwunsch und chronischen Schmerzen. Ausbildung in der Schweiz, klinische Vertiefung in Hangzhou und Peking."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-05-27",
    "dateModified": "2026-05-27",
    "lastReviewed": "2026-05-27",
    "bodyHtml": "<h2>„Akupunktur in meiner Nähe\", die häufigste Frage.</h2>\r\n  <p>Die häufigste Frage, die wir per WhatsApp bekommen: „Habt ihr eine Praxis bei mir in der Nähe?\" Hier ist die ehrliche Übersicht. Wir behandeln an elf Standorten in der Deutschschweiz. Wenn du in einer dieser Städte oder im Umkreis von etwa 20 Kilometern wohnst, gibt es eine Praxis, die für dich gut erreichbar ist.</p>\r\n\r\n  <div class=\"wa-callout\">\r\n    <div class=\"wa-callout-label\">In Kürze</div>\r\n    <p>Elf TCM.ch-Standorte: Zürich, Winterthur, Baden, Aarau, Luzern, Zug, St. Gallen, Frauenfeld, Kreuzlingen, Schaffhausen, Chur. Alle Therapeutinnen EMR/ASCA-zertifiziert. Sitzung CHF 130–160. Krankenkasse zahlt mit Zusatzversicherung meist 75–90%. Termin meist in 24–48 Stunden über WhatsApp.</p>\r\n  </div>\r\n\r\n  <h2>Standorte nach Region.</h2>\r\n\r\n  <h3>Region Zürich</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/zuerich-city\"><strong>Zürich</strong></a>, Stadt Zürich, alle Spezialgebiete, Mo–Sa, Abendtermine</li>\r\n    <li><a href=\"/standorte/winterthur-muenzgasse\"><strong>Winterthur</strong></a>, Westen Zürichs, Schwerpunkt Bürobeschwerden & Kinderwunsch</li>\r\n    <li><strong>Baden</strong>, Aargau, gut erreichbar aus Limmattal und Brugg</li>\r\n  </ul>\r\n\r\n  <h3>Zentralschweiz</h3>\r\n  <ul>\r\n    <li><strong>Luzern</strong>, Stadt Luzern, alle Bereiche, Abendtermine</li>\r\n    <li><strong>Zug</strong>, speziell für Berufstätige aus Banking, Crypto und Pharma</li>\r\n  </ul>\r\n\r\n  <h3>Aargau / Mittelland</h3>\r\n  <ul>\r\n    <li><strong>Aarau</strong>, Kanton Aargau, Schwerpunkt Schmerz und Stressmedizin</li>\r\n  </ul>\r\n\r\n  <h3>Ostschweiz</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/st-gallen\"><strong>St. Gallen</strong></a>, Stadt St. Gallen, breites Spektrum, HSG-Patientinnen</li>\r\n    <li><a href=\"/standorte/frauenfeld\"><strong>Frauenfeld</strong></a>, unsere Hauptpraxis, alle Bereiche, längste Öffnungszeiten</li>\r\n    <li><a href=\"/standorte/kreuzlingen\"><strong>Kreuzlingen</strong></a>, Bodensee, Schwerpunkt Frauengesundheit & Kinderwunsch</li>\r\n    <li><strong>Schaffhausen</strong>, Region Schaffhausen, gut erreichbar aus dem Klettgau</li>\r\n  </ul>\r\n\r\n  <h3>Graubünden</h3>\r\n  <ul>\r\n    <li><strong>Chur</strong>, Kanton Graubünden, einzige TCM-Praxis im Bündner Rheintal</li>\r\n  </ul>\r\n\r\n  <div class=\"wa-pullquote\">\"Wir sind bewusst nicht überall, sondern dort, wo wir Therapeutinnen mit echter Erfahrung haben. Eine Praxis ohne gute Therapeutin ist nur eine Adresse, kein Standort.\"</div>\r\n\r\n  <h2>Wie du den richtigen Standort findest.</h2>\r\n  <p>Drei einfache Regeln:</p>\r\n  <ul>\r\n    <li><strong>Wähle den Standort mit der kürzesten Strecke</strong>, nicht den prominentesten. Akupunktur funktioniert nur, wenn du regelmässig kommst. 30 Minuten Anfahrt mehr pro Sitzung bedeuten oft, dass nach drei Wochen Schluss ist.</li>\r\n    <li><strong>Wenn deine Beschwerde spezifisch ist, wähle nach Spezialgebiet.</strong> <a href=\"/beschwerden/kinderwunsch/\">Kinderwunsch</a> in Kreuzlingen, Migräne in St. Gallen, Stress in Zug oder Zürich, das macht einen Unterschied.</li>\r\n    <li><strong>Bei Unsicherheit: WhatsApp.</strong> Wir empfehlen ehrlich den passenden Standort, auch wenn das manchmal nicht der nächste ist.</li>\r\n  </ul>\r\n\r\n  <h2>Was an allen Standorten gleich ist.</h2>\r\n  <ul>\r\n    <li>Alle Therapeutinnen sind EMR- und ASCA-zertifiziert</li>\r\n    <li>Gleiche Preise: CHF 160 Erstanamnese (60 Min), CHF 130 Folgesitzung (45 Min)</li>\r\n    <li>Krankenkassen-Abrechnung über alle gängigen Zusatzversicherungen (Helsana, Swica, CSS, Sanitas, Concordia und andere)</li>\r\n    <li>Termine in der Regel 24–48 Stunden über WhatsApp</li>\r\n    <li>Akut-Slots täglich für Patientinnen mit Schmerzen, Migräne, Schlafstörungen</li>\r\n    <li>Ehrliche Zwischenbilanz nach 4 Sitzungen, wenn es nicht wirkt, sagen wir das</li>\r\n  </ul>\r\n\r\n  <h2>Standorte, an denen wir bewusst nicht sind, und warum.</h2>\r\n  <p>Wir haben uns lange überlegt, ob wir in Basel, Bern, Genf oder ins Tessin gehen. Bisher: nein. Der Grund ist einfach: wir hatten dort keine Therapeutin, die unserem Qualitätsanspruch genügt und die wir persönlich kennen. Lieber elf gute Standorte als zwanzig durchschnittliche.</p>\r\n  <p>Wenn du in Basel oder Bern wohnst und nach guter TCM suchst: ehrlicher Rat, frag bei der EMR-Therapeutendatenbank nach lokalen Empfehlungen. Wir können dort nicht für die Qualität bürgen.</p>\r\n\r\n  <h2>Was du bei der ersten Anfrage angeben solltest.</h2>\r\n  <ul>\r\n    <li>Deine Hauptbeschwerde (was bringt dich zu uns)</li>\r\n    <li>Wie lange das schon geht</li>\r\n    <li>Wo du wohnst (PLZ reicht)</li>\r\n    <li>Drei Tageszeiten, die für Termine passen würden</li>\r\n    <li>Falls relevant: bisherige Diagnosen oder Therapien</li>\r\n  </ul>\r\n  <p>Mit diesen Infos können wir dir innert ein bis zwei Stunden den passenden Standort, die passende Therapeutin und konkrete Slots vorschlagen.</p>\r\n\r\n  <p>Mehr zu unserer Methode auf der <a href=\"/therapien/akupunktur\">Akupunktur-Seite</a>. Wenn du nach Beschwerdebild suchst, hilft die <a href=\"/wissen\">Beschwerden-Übersicht</a>.</p>\r\n</div>",
    "faqs": [
      {
        "q": "Habt ihr eine Praxis in meiner Stadt?+",
        "a": "Wir sind in elf Städten der Deutschschweiz: Zürich, Winterthur, Baden, Aarau, Luzern, Zug, St. Gallen, Frauenfeld, Kreuzlingen, Schaffhausen, Chur. Wenn du im Umkreis von 20 km wohnst, gibt es eine Praxis, die gut erreichbar ist."
      },
      {
        "q": "Habt ihr auch Praxen in Basel, Bern oder im Tessin?+",
        "a": "Nein. Wir sind bewusst nicht überall. Wir gehen nur dorthin, wo wir Therapeutinnen mit echter Erfahrung haben. Für Basel/Bern empfehlen wir die EMR-Therapeutendatenbank."
      },
      {
        "q": "Welche Krankenkassen-Zusatzversicherungen zahlen?+",
        "a": "Alle gängigen Komplementärmedizin-Zusatzversicherungen, Helsana, Swica, CSS, Sanitas, Concordia und andere. Meist 75–90% Rückerstattung bei unseren EMR/ASCA-zertifizierten Therapeutinnen."
      },
      {
        "q": "Wie wähle ich den richtigen Standort?+",
        "a": "Drei Regeln: kürzeste Strecke gewinnt, bei spezifischer Beschwerde nach Spezialgebiet wählen, bei Unsicherheit über WhatsApp fragen. Wir empfehlen ehrlich."
      },
      {
        "q": "Sind alle Praxen gleich gut?+",
        "a": "Im Grundniveau ja, alle Therapeutinnen sind EMR/ASCA-zertifiziert, alle nutzen das gleiche Behandlungsprotokoll. Spezialisierungen unterscheiden sich. Frag uns bei spezifischen Beschwerden gezielt."
      }
    ],
    "related": [
      {
        "href": "/standorte",
        "label": "Alle Standorte",
        "cat": "TCM.ch"
      },
      {
        "href": "/standorte/zuerich-oerlikon",
        "label": "Zürich Oerlikon",
        "cat": "Standort"
      },
      {
        "href": "/therapien/akupunktur",
        "label": "Akupunktur",
        "cat": "Therapie"
      }
    ]
  },
  {
    "slug": "krankenkasse-tcm-was-wirklich-uebernommen-wird-2026",
    "title": "Krankenkasse und TCM: Was wirklich übernommen wird (Stand 2026)",
    "metaDesc": "Welche Schweizer Zusatzversicherungen TCM und Akupunktur übernehmen – mit konkreten Prozentsätzen, Jahreslimiten und Praxisbeispielen (Stand 2026).", "region": "Schweizweit", "excerpt": "Welche Zusatzversicherungen zahlen. Wie viel pro Sitzung. Was unsere Patientinnen am häufigsten falsch verstehen.",
    "category": "TCM in der Schweiz",
    "h1": "Krankenkasse und TCM: Was wirklich übernommen wird (Stand 2026).",
    "lead": "Welche Zusatzversicherungen zahlen. Wie viel pro Sitzung. Was unsere Patientinnen am häufigsten falsch verstehen. Ein klarer Überblick, ohne Marketing-Sprech, mit echten Zahlen aus dem Praxisalltag.",
    "readingTime": "10 Min.",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zehn Jahren Patientinnen und Patienten mit Akupunktur, Tuina und chinesischer Kräutertherapie. Sie kennt die Abrechnungssysteme aller grossen Schweizer Zusatzversicherungen aus dem Praxisalltag und ist bei TCM.ch für die Schulung neuer Therapeutinnen im Bereich EMR-Compliance verantwortlich."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-05-27",
    "dateModified": "2026-05-27",
    "lastReviewed": "2026-05-27",
    "bodyHtml": "<h2>Was du als Erstes wissen musst.</h2>\r\n  <p>Wir hören diesen Satz jede Woche mehrmals: „Ich dachte, das zahlt meine Krankenkasse.\" Manchmal stimmt das. Manchmal nicht. Und der Unterschied liegt fast immer in einem einzigen Wort: <strong>Zusatzversicherung</strong>.</p>\r\n  <p>Die Schweizer Grundversicherung (KVG) zahlt Akupunktur und andere TCM-Methoden nicht, ausser sie wird von einem schulmedizinisch tätigen Arzt mit FMH-Titel durchgeführt. Das betrifft uns in der Praxis kaum. Was wir behandeln, läuft über die Zusatzversicherung (VVG).</p>\r\n  <p>Die gute Nachricht: rund 70 Prozent unserer Patientinnen haben eine solche Zusatzversicherung, oft ohne es zu wissen. Die schlechte: die Bedingungen sind unübersichtlich, und jede Kasse macht es ein bisschen anders.</p>\r\n\r\n  <div class=\"wa-callout\">\r\n    <div class=\"wa-callout-label\">In Kürze</div>\r\n    <p>TCM wird in der Schweiz fast ausschliesslich über Zusatzversicherungen für Komplementärmedizin abgerechnet. Typisch sind 75 bis 90 Prozent Rückerstattung pro Sitzung, mit einem Jahresmaximum zwischen CHF 1'000 und CHF 5'000 je nach Modell. Voraussetzung: EMR- oder ASCA-Anerkennung der Praxis. Wir sind beides. Grundversicherung zahlt nicht.</p>\r\n  </div>\r\n\r\n  <h2>Was die Grundversicherung wirklich zahlt, und was nicht.</h2>\r\n  <p>Kurzfassung: bei uns in der Regel nichts. Die KVG-Grundversicherung übernimmt Akupunktur nur, wenn:</p>\r\n  <ul>\r\n    <li>sie von einem Arzt mit eidg. Diplom durchgeführt wird</li>\r\n    <li>dieser Arzt einen Fähigkeitsausweis Akupunktur-TCM (ASA) hat</li>\r\n    <li>und es eine medizinische Indikation gibt</li>\r\n  </ul>\r\n  <p>Das trifft in der Schweiz auf eine kleine Gruppe von Ärzten zu. Unsere Therapeutinnen sind keine Ärzte mit FMH-Titel, sondern eidgenössisch diplomierte Naturheilpraktikerinnen mit Fachrichtung TCM. Das ist eine völlig andere Berufskategorie, fachlich oft mit deutlich mehr TCM-Stunden, aber abrechnungstechnisch nicht über Grundversicherung.</p>\r\n\r\n  <h2>Was deine Zusatzversicherung wahrscheinlich zahlt.</h2>\r\n  <p>Hier wird es relevant. Die meisten grossen Schweizer Krankenkassen bieten Zusatzversicherungen für Komplementärmedizin an. Die Konditionen variieren, aber das Grundmuster sieht so aus:</p>\r\n\r\n  <h3>Concordia (Natura, Diversa)</h3>\r\n  <p>Übernimmt 75 Prozent der Kosten pro Sitzung, bis CHF 3'000 pro Jahr je nach Modell. Voraussetzung: EMR- oder ASCA-Anerkennung der Therapeutin. Wir sind in beiden Registern eingetragen.</p>\r\n\r\n  <h3>Helsana (Completa, Sana)</h3>\r\n  <p>Übernimmt 75 Prozent, bis CHF 3'000 jährlich bei Completa, weniger bei Sana. Akzeptiert EMR. Eine der unkompliziertesten Kassen in der Abrechnung.</p>\r\n\r\n  <h3>Swica (Optima, Completa Praeventa)</h3>\r\n  <p>Bei Optima 90 Prozent, bis CHF 2'000 jährlich. Bei Completa Praeventa höhere Limiten. Verlangt EMR-Anerkennung.</p>\r\n\r\n  <h3>Sanitas (Classic, Jump, Vital Privat)</h3>\r\n  <p>Je nach Modell 75 bis 90 Prozent, mit Jahreslimiten zwischen CHF 1'000 und CHF 5'000. EMR und ASCA werden akzeptiert.</p>\r\n\r\n  <h3>CSS (myFlex, Alternativ, Premium)</h3>\r\n  <p>Beim Modell Alternativ üblicherweise 90 Prozent, hohe Jahreslimiten. Bei myFlex modular gestaltbar, also abhängig davon, was du gewählt hast.</p>\r\n\r\n  <h3>Visana, KPT, Sympany, Atupri, ÖKK</h3>\r\n  <p>Alle bieten Komplementärmedizin-Zusätze. Konditionen ähnlich wie oben, meist zwischen 70 und 90 Prozent Rückerstattung. Wir empfehlen: <a href=\"/wissen\">unsere Krankenkassen-Übersicht</a> oder direkt bei deiner Kasse anrufen.</p>\r\n\r\n  <div class=\"wa-pullquote\">\"Der häufigste Fehler ist nicht, dass Patientinnen keine Zusatzversicherung haben. Sondern dass sie eine haben, und sie nicht nutzen, weil sie denken, TCM sei nicht abgedeckt.\"</div>\r\n\r\n  <h2>EMR und ASCA, was diese Zeichen bedeuten.</h2>\r\n  <p>Wenn du auf der Webseite einer TCM-Praxis „EMR\" oder „ASCA\" liest, sind das die zwei wichtigsten Qualitätssiegel der Schweizer Komplementärmedizin. Sie bedeuten:</p>\r\n  <ul>\r\n    <li><strong>EMR (Erfahrungsmedizinisches Register)</strong>, strenge Kriterien für Ausbildung, Praxis, Hygiene, Weiterbildung. Wird von praktisch allen Schweizer Zusatzversicherungen akzeptiert.</li>\r\n    <li><strong>ASCA (Schweizerische Stiftung für Komplementärmedizin)</strong>, vergleichbar in den Anforderungen, leicht andere Schwerpunkte. Ebenfalls breit akzeptiert.</li>\r\n  </ul>\r\n  <p>Ohne mindestens eines dieser Siegel zahlt deine Zusatzversicherung in der Regel nicht. Wenn dir eine Praxis sagt „das ist nicht so wichtig\", ist das ein Warnsignal. Es ist sehr wichtig.</p>\r\n  <p>Wir bei TCM.ch sind bei beiden Registern aktiv, bei jeder Therapeutin in jeder Praxis. Das ist nicht selbstverständlich, sondern erfordert kontinuierliche Weiterbildung und Audits.</p>\r\n\r\n  <h2>Konkrete Beispielrechnung aus unserer Praxis.</h2>\r\n  <p>Ein typischer Behandlungszyklus für <a href=\"/beschwerden/rueckenschmerzen/\">chronische Rückenschmerzen</a>, 10 Sitzungen bei uns in St. Gallen:</p>\r\n  <ul>\r\n    <li>Erstanamnese 60 Min: <strong>CHF 160</strong></li>\r\n    <li>9 Folgesitzungen à 45 Min: <strong>9 × CHF 130 = CHF 1'170</strong></li>\r\n    <li>Total brutto: <strong>CHF 1'330</strong></li>\r\n  </ul>\r\n  <p>Mit Helsana Completa (75 Prozent Rückerstattung): du zahlst netto <strong>CHF 333</strong>, die Kasse erstattet CHF 997.</p>\r\n  <p>Mit Swica Optima (90 Prozent): du zahlst netto <strong>CHF 133</strong>, die Kasse erstattet CHF 1'197.</p>\r\n  <p>Ohne Zusatzversicherung: du zahlst die vollen CHF 1'330 selbst.</p>\r\n  <p>Wichtig: das ist eine Modellrechnung. Selbstbehalt und Franchise greifen bei Zusatzversicherungen meist nicht, aber Jahreslimiten schon. Wer im selben Jahr bereits Physiotherapie und Homöopathie über Komplementärmedizin abgerechnet hat, kann ans Limit kommen.</p>\r\n\r\n  <h2>Wie die Abrechnung bei uns konkret abläuft.</h2>\r\n  <p>Wir machen das so unkompliziert wie möglich:</p>\r\n  <ul>\r\n    <li><strong>Du bezahlst nach jeder Sitzung</strong>, bei uns per TWINT, Karte oder Rechnung.</li>\r\n    <li><strong>Du bekommst eine Quittung mit Tarmed-konformer Aufstellung</strong> inklusive EMR-/ASCA-Nummer, Therapie-Code, ZSR-Nummer.</li>\r\n    <li><strong>Du reichst die Quittung bei deiner Kasse ein</strong>, meist online über die App oder das Kundenportal.</li>\r\n    <li><strong>Die Kasse erstattet dir direkt zurück</strong>, typisch innerhalb von 2 bis 4 Wochen.</li>\r\n  </ul>\r\n  <p>Wir machen keine direkte Verrechnung mit der Kasse, weil das im VVG-Bereich selten möglich und für dich oft sogar nachteilig ist. Du behältst die Kontrolle.</p>\r\n\r\n  <h2>Die fünf häufigsten Missverständnisse, die wir hören.</h2>\r\n\r\n  <h3>1. „Mein Hausarzt hat gesagt, das wird übernommen.\"</h3>\r\n  <p>Manchmal. Aber bitte nie ungeprüft. Ruf vor der ersten Sitzung kurz bei deiner Kasse an oder schau in deine Police. „Komplementärmedizin\" muss explizit drinstehen.</p>\r\n\r\n  <h3>2. „Akupunktur ist doch jetzt offiziell anerkannt.\"</h3>\r\n  <p>Ja und nein. Ärztliche Akupunktur ist seit 2017 in der Grundversicherung, aber nur, wenn ein Arzt mit FMH-Titel und Fähigkeitsausweis sie durchführt. Das betrifft etwa zwei Prozent der Akupunktur-Behandlungen in der Schweiz. Die anderen 98 Prozent laufen weiter über Zusatz.</p>\r\n\r\n  <h3>3. „Ich habe doch eine Zusatzversicherung.\"</h3>\r\n  <p>Nicht jede Zusatzversicherung deckt Komplementärmedizin. Spital-Zusätze (allgemein/halbprivat/privat) decken in der Regel keine ambulante Akupunktur. Du brauchst spezifisch eine Komplementärmedizin- oder Alternativmedizin-Zusatzversicherung.</p>\r\n\r\n  <h3>4. „Die Sitzungen sind teuer.\"</h3>\r\n  <p>Mit Zusatzversicherung zahlst du oft weniger Selbstbehalt für eine Akupunktursitzung als für einen Restaurantbesuch. Ohne, ja, dann ist es ein bewusster Entscheid. Wir sagen das vorher, nie nachher.</p>\r\n\r\n  <h3>5. „Ich wechsle einfach kurz die Zusatzversicherung.\"</h3>\r\n  <p>Ein Wechsel der Zusatzversicherung ist schwieriger als der Grundversicherungswechsel. Mit Gesundheitsfragen, möglichen Vorbehalten, Wartefristen. Wer mit 45 erstmals eine Komplementärmedizin-Zusatzversicherung abschliessen will, bekommt sie nicht immer. Falls du eine hast und sie nutzt, sehr gut. Falls du keine hast, die Entscheidung sollte aus einer Gesamtperspektive heraus getroffen werden, nicht wegen einer Akupunktur-Serie.</p>\r\n\r\n  <h2>Wann sich TCM auch ohne Zusatzversicherung lohnt.</h2>\r\n  <p>Wir sehen regelmässig Patientinnen, die selbst zahlen. Meist in einer dieser Situationen:</p>\r\n  <ul>\r\n    <li>Akuter Behandlungsbedarf, der nicht warten kann, z. B. starke Zyklusschmerzen vor einer wichtigen Lebensphase</li>\r\n    <li>Schmerzmittel-Reduktion bei chronischen Beschwerden, wo CHF 1'500 für 10 Sitzungen langfristig billiger sind als jahrelange Pharmakologie</li>\r\n    <li>Kinderwunsch-Begleitung, wo eine IVF-Runde CHF 8'000 kostet und ein paralleler Akupunktur-Zyklus für CHF 1'200 die Erfolgsquote messbar verbessern kann</li>\r\n  </ul>\r\n  <p>Wir helfen dir, ehrlich einzuschätzen, ob sich der Selbstzahler-Weg lohnt, oder ob du erst einen anderen Weg gehen solltest.</p>\r\n\r\n  <h2>Wenn du jetzt einen Termin willst.</h2>\r\n  <p>Schreib uns vorher, welche Kasse und welches Modell du hast. Wir sagen dir, ob es wahrscheinlich übernommen wird. Wir kennen die häufigsten Konstellationen auswendig und sparen dir den Anruf bei der Kasse, wenn die Antwort klar ist.</p>\r\n  <p>Termine in <a href=\"/wissen\">allen unseren Standorten</a> meist innerhalb von 7 bis 10 Tagen. Bei Fragen zur Abrechnung selbst hilft auch unsere <a href=\"/wissen\">Krankenkassen-Übersicht</a> auf der Webseite.</p>\r\n</div>",
    "faqs": [
      {
        "q": "Übernimmt die Grundversicherung Akupunktur bei euch?+",
        "a": "Nein. Die Grundversicherung übernimmt Akupunktur nur, wenn ein Arzt mit FMH-Titel und ASA-Fähigkeitsausweis sie durchführt. Unsere Therapeutinnen sind eidgenössisch diplomierte Naturheilpraktikerinnen, eine andere Berufskategorie. Abrechnung läuft über Zusatzversicherung."
      },
      {
        "q": "Wie finde ich heraus, ob meine Zusatzversicherung TCM deckt?+",
        "a": "Suche in deiner Police nach den Begriffen \"Komplementärmedizin\" oder \"Alternativmedizin\". Wenn sie auftauchen und EMR oder ASCA erwähnt sind, wird unsere Behandlung höchstwahrscheinlich übernommen. Im Zweifel: kurz anrufen oder uns die Police schicken."
      },
      {
        "q": "Brauche ich eine ärztliche Verordnung?+",
        "a": "Bei den meisten Zusatzversicherungen nein. Einige verlangen sie ab einer bestimmten Anzahl Sitzungen pro Jahr. Wir sagen dir vorher, wenn das in deinem Fall relevant ist."
      },
      {
        "q": "Was, wenn meine Kasse die Erstattung verweigert?+",
        "a": "Das passiert sehr selten, wenn vorher geklärt wurde. Falls doch: meist liegt es an einer fehlenden Information auf der Quittung. Wir stellen eine korrigierte Version aus. Bei echten Streitfällen unterstützen wir mit Belegen, ist aber in den letzten Jahren bei uns nicht vorgekommen."
      },
      {
        "q": "Lohnt sich eine neue Zusatzversicherung wegen TCM?+",
        "a": "Selten allein deswegen. Zusatzversicherungen für Komplementärmedizin kosten je nach Alter CHF 30 bis 80 pro Monat. Wenn du ohnehin regelmässig komplementärmedizinische Leistungen nutzt, rechnet es sich oft. Für eine einmalige Akupunktur-Serie meist nicht."
      }
    ],
    "related": [
      {
        "href": "/wissen/akupunktur-bei-nackenschmerzen",
        "label": "Akupunktur bei Nackenschmerzen",
        "cat": "Artikel"
      },
      {
        "href": "/krankenkassen",
        "label": "Krankenkasse & TCM",
        "cat": "Übersicht"
      },
      {
        "href": "/standorte",
        "label": "Alle Standorte",
        "cat": "TCM.ch"
      },
      {
        "href": "/therapien/akupunktur",
        "label": "Akupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/wissen/tcm-naturheilpraktiker-schweiz",
        "label": "TCM-Heilpraktiker oder Naturheilpraktiker?",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "pcos-akupunktur-tcm",
    "title": "PCOS und TCM: Akupunktur, Zyklus und Kinderwunsch",
    "metaDesc": "Akupunktur und TCM bei PCOS: was Erfahrungen zeigen, wie sich der Zyklus regulieren lässt, PCOS und Kinderwunsch, und TCM ohne Pille. Ehrlich erklärt.",
    "region": "Schweizweit",
    "excerpt": "Was Akupunktur und TCM bei PCOS leisten können, wie sich der Zyklus begleiten lässt und was das für den Kinderwunsch bedeutet. Der Überblick.",
    "category": "Beschwerden verstehen",
    "h1": "PCOS und TCM: Akupunktur, Zyklus und Kinderwunsch",
    "lead": "PCOS ist die häufigste hormonelle Störung bei Frauen im gebärfähigen Alter. Was Akupunktur und TCM dabei realistisch leisten können, wo die Grenzen liegen und warum die Schulmedizin an den Anfang gehört, liest du hier ohne Schönfärberei.",
    "readingTime": "8 Min.",
    "ctaTitle": "PCOS mit TCM begleiten?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-07-03",
    "dateModified": "2026-08-12",
    "lastReviewed": "2026-08-12",
    "bodyHtml": "<h2>Was PCOS ist</h2>\n<p>Das polyzystische Ovarialsyndrom betrifft schätzungsweise 8 bis 13 Prozent aller Frauen im gebärfähigen Alter. Typische Zeichen: seltene oder ausbleibende Eisprünge mit unregelmässigem Zyklus, erhöhte männliche Hormone (sichtbar etwa als verstärkte Körperbehaarung, Akne oder Haarausfall) und im Ultraschall viele kleine Follikel an den Eierstöcken. Für die Diagnose müssen zwei dieser drei Kriterien erfüllt sein, andere Ursachen ausgeschlossen.</p>\n<p>Was viele nicht wissen: PCOS ist häufig auch ein Stoffwechselthema. Ein grosser Teil der Betroffenen hat eine Insulinresistenz, unabhängig vom Gewicht. Das erklärt, warum Ernährung und Bewegung bei PCOS keine Nebensache sind, sondern zu den wirksamsten Hebeln überhaupt gehören.</p>\n<div class=\"wa-callout\"><div class=\"wa-callout-label\">Bitte ärztlich abklären</div><p>Die Diagnose PCOS gehört in die gynäkologische Praxis: Hormonstatus, Ultraschall, Ausschluss anderer Ursachen wie Schilddrüsenstörungen. Erst mit gesicherter Diagnose ergibt eine begleitende TCM-Behandlung Sinn.</p></div>\n<h2>Was die Schulmedizin macht</h2>\n<p>Je nach Ziel unterscheidet sich die Behandlung. Steht kein Kinderwunsch an, wird der Zyklus oft hormonell reguliert und die Stoffwechsellage angegangen, bei Insulinresistenz teils mit Metformin. Bei Kinderwunsch sind Medikamente zur Auslösung des Eisprungs, Letrozol oder Clomifen, die Standardtherapie mit guter Studienlage. Dazu kommt in jedem Fall die Basis: Gewichtsmanagement, Bewegung, Ernährung. Schon 5 bis 10 Prozent Gewichtsreduktion können bei übergewichtigen Betroffenen den Eisprung zurückbringen.</p>\n<p>Das vorweg, weil es die Messlatte ist: Jede ergänzende Methode, auch Akupunktur, muss sich daran messen lassen und ersetzt diese Basis nicht.</p>\n<h2>Was Akupunktur bei PCOS realistisch kann und was nicht</h2>\n<p>Hier sind wir bewusst nüchtern, denn zu PCOS gibt es eine der besten Einzelstudien der ganzen Akupunkturforschung, und ihr Ergebnis ist unbequem.</p>\n<p>Die grosse randomisierte PCOSAct-Studie (<a href=\"https://pubmed.ncbi.nlm.nih.gov/28655015/\" target=\"_blank\" rel=\"noopener\">Wu et al., JAMA 2017</a>) mit rund 1000 Frauen mit PCOS und Kinderwunsch verglich Akupunktur, Clomifen, beides kombiniert und eine Kontrolle. Ergebnis: Clomifen erhöhte die Lebendgeburtenrate deutlich, Akupunktur nicht. Wer dir Akupunktur als Fruchtbarkeitsbooster bei PCOS verkauft, ignoriert diese Studie.</p>\n<p>Was kleinere Studien und Übersichtsarbeiten andeuten: Elektroakupunktur könnte die Häufigkeit von Eisprüngen erhöhen und Hinweise auf günstige Effekte bei Insulinresistenz und erhöhten männlichen Hormonen liefern. Die Qualität dieser Belege ist allerdings begrenzt, ein <a href=\"https://pubmed.ncbi.nlm.nih.gov/41147529/\" target=\"_blank\" rel=\"noopener\">Cochrane-Review</a> kam zum Schluss, dass die Evidenz für Akupunktur bei PCOS insgesamt unzureichend ist.</p>\n<p>Wofür sich <a href=\"/therapien/akupunktur/\">Akupunktur</a> in der Begleitung bewährt, unabhängig von der PCOS-Spezifik: Stressreduktion, besserer Schlaf, Linderung von Zyklusbeschwerden und Unterleibsverspannungen, Unterstützung beim Dranbleiben an Lebensstiländerungen. Das klingt unspektakulär, ist im Alltag mit PCOS aber genau das, woran viele scheitern.</p>\n<div class=\"wa-pullquote\">Akupunktur macht bei PCOS keinen Eisprung auf Bestellung. Sie kann den Rahmen verbessern, in dem dein Körper und deine Therapie arbeiten.</div>\n<h2>Wie eine TCM-Begleitung bei uns aussieht</h2>\n<p>Wir starten mit einer ausführlichen Anamnese: Zyklusverlauf, Beschwerden, bisherige Befunde und Therapien, Schlaf, Stress, Ernährung. Puls- und Zungendiagnostik ergänzen das Bild. Daraus entsteht ein Behandlungsplan, typischerweise mit wöchentlicher Akupunktur über zwei bis drei Zyklen, bei Bedarf kombiniert mit einer individuell zusammengestellten Kräuterrezeptur und konkreten Ernährungsempfehlungen, die zur Insulinresistenz-Thematik passen.</p>\n<p>Wichtig: Wir arbeiten neben deiner Gynäkologin, nicht gegen sie. Läuft eine Letrozol- oder Clomifen-Therapie oder eine Kinderwunschbehandlung, stimmen wir die Begleitung darauf ab. Und nach zwei bis drei Zyklen ziehen wir ehrlich Bilanz: Bringt es dir spürbar etwas? Wenn nicht, sagen wir dir das. Ein häufiger Grund für den Weg in die Praxis ist der unerfüllte <a href=\"/beschwerden/kinderwunsch/\">Kinderwunsch</a>; wie die TCM dabei begleitet, liest du im Artikel <a href=\"/wissen/kinderwunsch-akupunktur-tcm/\">Akupunktur und TCM bei Kinderwunsch</a>.</p>\n<h2>Krankenkasse</h2>\n<p>Die Behandlung läuft über die Zusatzversicherung Komplementärmedizin, die meisten Kassen übernehmen 70 bis 90 Prozent bei EMR- oder ASCA-registrierten Therapeutinnen. Alle unsere Therapeutinnen und Therapeuten sind registriert. Wir prüfen deine Deckung kostenlos, bevor Kosten entstehen. Wie die Abrechnung genau läuft, liest du auf unserer Seite zur <a href=\"/krankenkassen/\">Krankenkasse</a> und im Detail im Beitrag <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/\">Krankenkasse und TCM</a>.</p>\n<h2>Wann du ärztlich abklären solltest</h2>\n<p>Zur Gynäkologin gehören: ausbleibende Perioden über drei Monate ohne bekannte Ursache, sehr starke oder sehr schmerzhafte Blutungen, rasche Zunahme von Körperbehaarung oder Haarausfall, unerfüllter Kinderwunsch nach zwölf Monaten (ab 35 nach sechs Monaten). PCOS erhöht langfristig das Risiko für Typ-2-Diabetes und Herz-Kreislauf-Erkrankungen, regelmässige Kontrollen gehören deshalb dazu, unabhängig von jeder TCM-Behandlung.</p>\n<p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung.</em></p>",
    "faqs": [
      {
        "q": "Kann Akupunktur PCOS heilen?",
        "a": "Nein. PCOS ist nicht heilbar, aber gut behandelbar. Akupunktur kann Beschwerden wie Stress, Schlafprobleme und Zyklusschmerzen lindern und eine schulmedizinische Therapie begleiten. Die Basis bleiben gynäkologische Behandlung, Ernährung und Bewegung."
      },
      {
        "q": "Hilft Akupunktur beim Eisprung mit PCOS?",
        "a": "Die grosse PCOSAct-Studie (JAMA 2017) zeigte keine Verbesserung der Lebendgeburtenrate durch Akupunktur, Clomifen wirkte deutlich besser. Kleinere Studien deuten auf häufigere Eisprünge unter Elektroakupunktur hin, die Beleglage ist aber schwach. Wir sagen dir das ehrlich vor Behandlungsbeginn."
      },
      {
        "q": "Was bringt TCM bei PCOS konkret?",
        "a": "Bewährt hat sich die Begleitung bei Stress, Schlaf, Zyklusbeschwerden und beim Umsetzen von Lebensstiländerungen. Dazu kommen individuelle Ernährungsempfehlungen, die zur häufigen Insulinresistenz bei PCOS passen, und bei Bedarf eine Kräuterrezeptur."
      },
      {
        "q": "Übernimmt die Krankenkasse Akupunktur bei PCOS?",
        "a": "Über die Zusatzversicherung Komplementärmedizin meist ja, typisch 70 bis 90 Prozent bei EMR- oder ASCA-registrierten Therapeutinnen. Die Grundversicherung zahlt nur ärztliche Akupunktur. Wir prüfen deine Deckung kostenlos vor der ersten Behandlung."
      },
      {
        "q": "Wie lange dauert eine TCM-Begleitung bei PCOS?",
        "a": "Üblich sind wöchentliche Sitzungen über zwei bis drei Zyklen, danach ziehen wir gemeinsam Bilanz. Spürst du keinen Nutzen, brechen wir ab statt endlos weiterzubehandeln. PCOS ist ein Langzeitthema, die Akupunktur-Begleitung muss es nicht sein."
      }
    ],
    "related": [
      {
        "href": "/beschwerden/kinderwunsch/",
        "label": "Kinderwunsch & TCM",
        "cat": "Beschwerde"
      },
      {
        "href": "/wissen/kinderwunsch-akupunktur-tcm/",
        "label": "Akupunktur bei Kinderwunsch",
        "cat": "Artikel"
      },
      {
        "href": "/therapien/akupunktur/",
        "label": "Akupunktur",
        "cat": "Therapie"
      },
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "kinderwunsch-akupunktur-tcm",
    "title": "Kinderwunsch und TCM: Akupunktur, Zyklus und IVF-Begleitung",
    "metaDesc": "Akupunktur und TCM bei Kinderwunsch: Erfahrungen, Akupunktur vor dem Embryotransfer, Zyklus begleiten und wie oft sinnvoll. Ehrlich und nüchtern erklärt.",
    "region": "Schweizweit",
    "excerpt": "Was Akupunktur und TCM bei Kinderwunsch leisten können, wie die Begleitung zu IVF und ICSI aussieht und wie oft eine Behandlung sinnvoll ist. Der Überblick.",
    "category": "Beschwerden verstehen",
    "h1": "Kinderwunsch und TCM: Akupunktur, Zyklus und IVF-Begleitung",
    "lead": "Ein unerfüllter Kinderwunsch zehrt an den Nerven. Was Akupunktur und TCM realistisch beitragen können, wie die Begleitung rund um IVF und ICSI aussieht und wie oft eine Behandlung sinnvoll ist.",
    "readingTime": "6 Min.",
    "ctaTitle": "Kinderwunsch mit TCM begleiten?",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-07-03",
    "dateModified": "2026-07-03",
    "lastReviewed": "2026-07-03",
    "bodyHtml": "<h2>Kinderwunsch und TCM: der Überblick</h2><p>Ein unerfüllter Kinderwunsch belastet, und oft gibt es keine einzelne Ursache. Die TCM begleitet den Körper über mehrere Zyklen und setzt bei Zyklus, Eisprung, Durchblutung und Stress an. Was in der Praxis dazugehört, liest du auf unserer Seite zu <a href=\"/beschwerden/kinderwunsch/\">Kinderwunsch und TCM</a>.</p><h2>Akupunktur bei Kinderwunsch: Erfahrungen und Studienlage</h2><p>Viele Frauen berichten, dass sie sich unter regelmässiger <a href=\"/therapien/akupunktur/\">Akupunktur</a> ruhiger fühlen und ihr Zyklus regelmässiger wird. Die Studien dazu sind uneinheitlich und oft klein. Akupunktur kann begleiten und den Stress senken, ein Erfolg lässt sich daraus nicht ableiten und nicht versprechen.</p><h2>Akupunktur vor dem Embryotransfer</h2><p>Rund um den Embryotransfer wird Akupunktur häufig eingesetzt, auch um die Anspannung an diesem Tag zu senken. Ob sie die Erfolgsquote verbessert, ist wissenschaftlich nicht eindeutig geklärt. Sinnvoll ist sie als ergänzende Begleitung, abgestimmt mit deinem Kinderwunschzentrum, nicht als Ersatz für die medizinische Behandlung.</p><h2>Den Zyklus mit TCM begleiten</h2><p>Die TCM schaut auf den ganzen Rhythmus aus Schlaf, Verdauung, Stress und Bewegung. Behandelt wird mit Akupunktur und, wenn passend, mit individuell zusammengestellten chinesischen Kräutern. Ziel ist, einen unregelmässigen Zyklus über die Zeit zu stabilisieren. Steht PCOS im Hintergrund, findest du mehr auf unserer Seite zu <a href=\"/beschwerden/pcos/\">PCOS</a>.</p><h2>Wie oft Akupunktur bei Kinderwunsch?</h2><p>Üblich ist eine Begleitung über mehrere Zyklen, oft etwa einmal pro Woche, in IVF- oder ICSI-Phasen gezielt um die wichtigen Termine. Den genauen Rhythmus legt ihr gemeinsam fest, je nach Situation und Plan.</p><h2>Kosten und Krankenkasse</h2><p>Die Behandlung läuft über die Zusatzversicherung. Bei EMR-/ASCA-anerkannten Therapeutinnen beteiligen sich viele Kassen mit 80 bis 100 Prozent, die Grundversicherung nicht. Details findest du auf unserer Seite zur <a href=\"/krankenkassen/\">Krankenkasse</a>.</p><p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung.</em></p>",
    "faqs": [
      {
        "q": "Wie sind die Erfahrungen mit Akupunktur bei Kinderwunsch?",
        "a": "Viele empfinden die Behandlung als entlastend und den Zyklus als regelmässiger. Belege stammen aus kleinen Studien, ein Erfolg lässt sich nicht versprechen."
      },
      {
        "q": "Ist Akupunktur vor dem Embryotransfer sinnvoll?",
        "a": "Sie wird häufig ergänzend eingesetzt, auch zur Entspannung. Ein sicherer Effekt auf die Erfolgsquote ist nicht belegt. Das Timing stimmst du mit dem Kinderwunschzentrum ab."
      },
      {
        "q": "Wie oft Akupunktur bei Kinderwunsch?",
        "a": "Oft etwa einmal pro Woche über mehrere Zyklen, individuell angepasst und in IVF-Phasen um die wichtigen Termine getaktet."
      },
      {
        "q": "Kann TCM den Zyklus bei Kinderwunsch verbessern?",
        "a": "Die TCM kann einen unregelmässigen Zyklus über mehrere Zyklen begleiten und stabilisieren helfen. Wie stark, ist individuell."
      },
      {
        "q": "Zahlt die Krankenkasse?",
        "a": "Bei EMR-/ASCA-Therapeutinnen beteiligen sich viele Zusatzversicherungen. Die Grundversicherung deckt es nicht."
      }
    ],
    "related": [
      {
        "href": "/beschwerden/kinderwunsch/",
        "label": "Kinderwunsch mit TCM begleiten",
        "cat": "Beschwerde"
      },
      {
        "href": "/beschwerden/pcos/",
        "label": "PCOS & TCM",
        "cat": "Beschwerde"
      },
      {
        "href": "/krankenkassen/",
        "label": "Krankenkasse und TCM",
        "cat": "Info"
      }
    ]
  },
  {
    "slug": "was-bringt-shiatsu-wirkung-ablauf-kosten",
    "title": "Was bringt Shiatsu? Wirkung, Ablauf und Kosten ehrlich erklärt",
    "metaDesc": "Was Shiatsu realistisch kann: Wirkung auf Anspannung und Schlaf, Ablauf einer Sitzung, Studienlage ehrlich eingeordnet und was die Krankenkasse übernimmt.",
    "region": "Schweizweit",
    "excerpt": "Was die japanische Druckpunkt-Methode realistisch kann, wie eine Sitzung abläuft und was die Krankenkasse übernimmt.",
    "category": "TCM in der Schweiz",
    "h1": "Was bringt Shiatsu? Wirkung, Ablauf und Kosten ehrlich erklärt",
    "lead": "Shiatsu gehört zu den beliebtesten Entspannungsbehandlungen der Schweiz, gleichzeitig ist die Studienlage dünn. Was die japanische Druckpunkt-Methode realistisch kann, wie eine Sitzung abläuft und was die Krankenkasse übernimmt.",
    "readingTime": "9 Min.",
    "ctaTitle": "Shiatsu ausprobieren? Wir beraten dich ehrlich.",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-08-13",
    "dateModified": "2026-08-13",
    "lastReviewed": "2026-08-13",
    "bodyHtml": "<p>Shiatsu wirkt in erster Linie regulierend: Es senkt Anspannung, verbessert bei vielen den Schlaf und löst Verspannungen. Als Heilbehandlung für Krankheiten ist es wissenschaftlich nicht belegt. Wer Entspannung, Stressabbau und Körperwahrnehmung sucht, ist richtig. Wer eine Diagnose behandeln will, braucht zuerst die Schulmedizin.</p>\n<p>Genau diese Einordnung fehlt in vielen Texten über Shiatsu. Deshalb hier der ehrliche Überblick: Woher die Methode kommt, was in einer Sitzung passiert, was die Forschung tatsächlich hergibt und wann sich ein Termin lohnt.</p>\n<h2>Woher Shiatsu kommt</h2>\n<p>Shiatsu heisst wörtlich Fingerdruck. Die Methode entstand im Japan des frühen 20. Jahrhunderts aus der traditionellen Anma-Massage. Tokujiro Namikoshi systematisierte sie ab den 1920er-Jahren zu einer eigenständigen Behandlungsform, sein Schüler Shizuto Masunaga entwickelte sie später zum meridianorientierten Zen-Shiatsu weiter, das heute in Europa am weitesten verbreitet ist.</p>\n<p>Die Wurzeln teilt Shiatsu mit der chinesischen Medizin: Gearbeitet wird entlang derselben Leitbahnen-Landkarte wie bei <a href=\"/therapien/tuina/\">Tuina</a> und <a href=\"/therapien/akupunktur/\">Akupunktur</a>, nur mit anderem Werkzeug. Statt Nadeln oder kräftigen Massagegriffen setzt Shiatsu auf grossflächigen, gehaltenen Druck mit Daumen, Handflächen und teils Knien oder Ellbogen. In Europa verbreitete sich die Methode ab den 1970er-Jahren. In der Schweiz ist Shiatsu als Methode der KomplementärTherapie mit eigenem Berufsbild anerkannt, inklusive geregelter Ausbildung und Branchenzertifikat.</p>\n<p>Für dich heisst das: Shiatsu ist hierzulande kein Wellness-Zusatz, sondern ein geregelter Beruf. Therapeutinnen mit Branchenzertifikat OdA KT oder eidgenössischem Diplom in KomplementärTherapie haben eine mehrjährige Ausbildung mit supervidierter Praxis hinter sich. Diese Registrierung ist auch die Grundlage dafür, dass sich Zusatzversicherungen an den Kosten beteiligen.</p>\n<h2>Wie eine Behandlung abläuft</h2>\n<p>Du bleibst während der ganzen Behandlung bekleidet und liegst auf einer Matte am Boden oder auf einer Liege. Eine Sitzung dauert 50 bis 60 Minuten. Nach einem kurzen Gespräch zu Beschwerden und Tagesform arbeitet die Therapeutin mit rhythmischem Druck von Daumen und Handflächen, dazu kommen sanfte Dehnungen und Rotationen der Gelenke. Öl wird keines verwendet.</p>\n<p>Der Druck ist tief, aber langsam. Viele beschreiben es als gehaltenes Gefühl statt als Kneten wie bei einer Massage. Es entsteht kein Schmerz, einzelne Punkte können aber druckempfindlich sein, das meldest du einfach zurück. Danach bleibst du ein paar Minuten liegen. Dass du am Abend müde oder durstig bist, ist normal und kein Grund zur Sorge.</p>\n<div class=\"wa-callout\"><div class=\"wa-callout-label\">Gut zu wissen</div><p>Trag bequeme, dehnbare Kleidung, etwa Trainerhose und T-Shirt mit langen Ärmeln. Du musst dich nicht ausziehen, und es gibt keine Nadeln.</p></div>\n<p>Eine einzelne Sitzung reicht, um die Methode kennenzulernen. Willst du an einem Thema arbeiten, etwa Schlaf oder anhaltende Anspannung, planen wir meist vier bis sechs Sitzungen im Wochen- oder Zweiwochenrhythmus und ziehen dann ehrlich Bilanz: Spürst du einen Unterschied, machen weitere Termine Sinn. Spürst du keinen, beenden wir die Serie und schlagen dir etwas anderes vor, statt endlos weiterzubehandeln.</p>\n<h2>Was die Forschung sagt</h2>\n<p>Die Studienlage zu Shiatsu ist begrenzt, und das sagen wir offen. Ein systematischer Review von Robinson und Kollegen (<a href=\"https://pubmed.ncbi.nlm.nih.gov/21982157/\" target=\"_blank\" rel=\"noopener\">Robinson et al., BMC Complementary and Alternative Medicine 2011</a>) fand nur wenige belastbare Studien zu Shiatsu und konnte keine gesicherten Wirkaussagen ableiten. Konkret: Von 80 eingeschlossenen Studien untersuchten gerade einmal 9 Shiatsu selbst, darunter eine einzige randomisierte kontrollierte Studie. Das heisst nicht, dass Shiatsu nichts bewirkt, sondern dass gute Studien fehlen.</p>\n<p>Interessantes Detail aus demselben Review: Für die verwandte, punktuell arbeitende Akupressur war die Studienlage deutlich besser, mit brauchbarer Evidenz bei Schmerzen, etwa Menstruations- und Rückenschmerzen, bei postoperativer Übelkeit und für besseren Schlaf bei älteren Menschen. Die Druckpunkt-Logik selbst ist also nicht aus der Luft gegriffen, für Shiatsu als Gesamtmethode steht der Nachweis aber aus.</p>\n<p>Interessant ist eine grosse europäische Beobachtungsstudie mit über 600 Behandelten in drei Ländern (<a href=\"https://pubmed.ncbi.nlm.nih.gov/18990043/\" target=\"_blank\" rel=\"noopener\">Long, Journal of Alternative and Complementary Medicine 2008</a>): Die Teilnehmenden berichteten über sechs Monate hinweg von Verbesserungen bei Anspannung, Schlaf und Wohlbefinden, und die Behandlung erwies sich als gut verträglich. Als Beobachtungsstudie ohne Kontrollgruppe beweist das keine spezifische Wirkung, es spricht aber für hohe Zufriedenheit und Sicherheit.</p>\n<p>Ein paar Zahlen daraus, weil sie das Bild gut zeichnen: 948 Klientinnen und Klienten von 85 Praktizierenden in Österreich, Spanien und Grossbritannien starteten, 633 lieferten vollständige Daten über sechs Monate. Die deutlichsten Verbesserungen zeigten sich bei Anspannung und Stress sowie bei Beschwerden von Muskeln und Gelenken, mit mittleren Effektstärken. Unerwünschte Wirkungen meldeten 9 von 633 Personen, also unter anderthalb Prozent, durchwegs harmlose, und niemand brach die Behandlung deswegen ab. Das deckt sich mit dem klinischen Eindruck: Shiatsu gehört zu den verträglichsten Methoden überhaupt.</p>\n<div class=\"wa-pullquote\">Shiatsu ist sicher und wird als sehr angenehm erlebt. Spezifische Heilwirkungen sind nicht nachgewiesen, und genau so setzen wir es ein: als regulierende Begleitung, nicht als Therapieersatz.</div>\n<p>Wer dir Shiatsu als Heilmittel gegen Krankheiten verkauft, übertreibt. Seriös eingesetzt ist es eine Methode zur Regulation: weniger Anspannung, besserer Schlaf, mehr Körperwahrnehmung.</p>\n<h2>Wofür sich Shiatsu im Alltag bewährt</h2>\n<p>In der Praxis bewährt sich Shiatsu vor allem bei Stress und Erschöpfung, Schlafproblemen, Verspannungen in Nacken, Schultern und Rücken, zyklusbedingten Beschwerden und als Begleitung in belastenden Lebensphasen, auch neben laufenden schulmedizinischen Behandlungen. Viele Patientinnen und Patienten berichten von tiefer Entspannung während der Sitzung und einem ruhigeren Grundton in den Tagen danach.</p>\n<p>Typische Situationen aus unserer Praxis: die Projektleiterin, die seit Monaten nicht mehr durchschläft und abends nicht abschalten kann. Der Pflegefachmann im Schichtdienst, dessen Nacken nie ganz locker wird. Die Frau in den Wechseljahren, die neben der ärztlichen Begleitung etwas für ihr Körpergefühl tun will. In solchen Konstellationen ist Shiatsu eine sinnvolle, risikoarme Option, gerade weil es laufende medizinische Behandlungen nicht stört.</p>\n<p>Je konkreter und akuter eine körperliche Beschwerde ist, desto eher gehören ärztliche Abklärung und gezieltere Methoden an den Anfang: Physiotherapie, medizinische Massage, Tuina oder Akupunktur. Shiatsu ersetzt keine Diagnose und keine Therapie, es ergänzt sie.</p>\n<h2>Shiatsu, Tuina, Massage oder Akupunktur?</h2>\n<p><strong>Shiatsu</strong> passt, wenn dein Ziel Entspannung und Regulation ist: Stress, Schlaf, allgemeine Anspannung. Es arbeitet ruhig, am bekleideten Körper, am gesamten Spannungsniveau.</p>\n<p><strong><a href=\"/therapien/tuina/\">Tuina</a></strong> und <strong><a href=\"/therapien/massage/\">medizinische Massage</a></strong> arbeiten kräftiger und gezielter an muskulären Problemzonen. Bei einer akuten Nackenverspannung oder einem verhärteten Rücken sind sie meist die direktere Wahl.</p>\n<p><strong><a href=\"/therapien/akupunktur/\">Akupunktur</a></strong> ist die punktuelle, beschwerdebezogene Behandlung: Sie wird gezielt bei definierten Beschwerden wie Schmerzen, Migräne oder Schlafstörungen eingesetzt und hat für einzelne Indikationen die deutlich bessere Studienlage.</p>\n<p>Noch eine Verwandte: die <a href=\"/therapien/akupressur/\">Akupressur</a>. Auch sie arbeitet mit Druck statt Nadeln, bleibt aber punktuell und beschwerdebezogen, während Shiatsu den ganzen Körper in einer durchgehenden Sequenz behandelt.</p>\n<p>Kombinationen sind möglich und oft sinnvoll, etwa Akupunktur für die Beschwerde und Shiatsu für das Spannungsniveau dahinter. Wir beraten dich ehrlich, welche Methode zu deinem Anliegen passt, auch wenn es eine andere ist als die angefragte.</p>\n<h2>Für wen Shiatsu nicht oder nur angepasst geeignet ist</h2>\n<p>Nicht behandelt wird bei akuten Verletzungen, frischen Operationen, fieberhaften Infekten und Thrombose-Verdacht. Bei starker Osteoporose wird der Druck deutlich reduziert oder auf eine andere Methode ausgewichen. In der Schwangerschaft ist Shiatsu möglich, aber angepasst, sag es vor der Behandlung. Auch bei Krebserkrankungen ist Shiatsu als begleitende Entspannung grundsätzlich möglich, aber nur in Absprache mit dem Behandlungsteam und mit deutlich angepasstem Druck. Und bei unklaren oder neuen Beschwerden gilt: zuerst ärztlich abklären. Shiatsu diagnostiziert nichts.</p>\n<h2>Woran du seriöses Shiatsu erkennst</h2>\n<p>Eine seriöse Therapeutin fragt zuerst nach deiner Gesundheit, deinen Vorerkrankungen und deinen Medikamenten, bevor sie behandelt. Sie verspricht keine Heilung von Krankheiten, sondern spricht von Begleitung und Regulation. Sie ist registriert, nennt die Kosten transparent, und sie rät dir zur ärztlichen Abklärung, wenn deine Beschwerden neu, unklar oder stark sind. Und sie passt sich an: Wenn dir der Druck zu kräftig ist oder eine Position unangenehm, sagst du es, und es wird geändert. Alles andere wäre ein Grund, die Praxis zu wechseln.</p>\n<h2>Kosten und Krankenkasse</h2>\n<p>Shiatsu wird über die Zusatzversicherung für Komplementärmedizin bzw. KomplementärTherapie abgerechnet, sofern die Therapeutin entsprechend registriert ist (EMR, ASCA bzw. Branchenzertifikat OdA KT). Die meisten Kassen übernehmen dann 70 bis 90 Prozent, die Grundversicherung zahlt nicht. Wichtig: Nicht jede Zusatzversicherung deckt jede Methode gleich, und einzelne Kassen führen eigene Therapeutenlisten. Genau deshalb lohnt sich der Deckungs-Check vor dem ersten Termin und nicht erst bei der Rückerstattung. Wir prüfen deine Deckung kostenlos, bevor Kosten entstehen. Wie die Abrechnung im Detail funktioniert, liest du im Beitrag <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/\">Krankenkasse und TCM</a>.</p>\n<p>Alles zu Terminen, Standorten und Ablauf bei uns findest du auf der <a href=\"/therapien/shiatsu/\">Shiatsu-Behandlungsseite</a>.</p>\n<p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung. Quellen: Robinson N, Lorenc A, Liao X. The evidence for Shiatsu: a systematic review of Shiatsu and acupressure. BMC Complementary and Alternative Medicine, 2011. Long AF. The effectiveness of shiatsu: findings from a cross-European, prospective observational study. Journal of Alternative and Complementary Medicine, 2008.</em></p>",
    "faqs": [
      {
        "q": "Ist die Wirkung von Shiatsu wissenschaftlich belegt?",
        "a": "Nur begrenzt. Ein systematischer Review von 2011 fand zu wenige hochwertige Studien für gesicherte Aussagen. Eine grosse Beobachtungsstudie zeigte anhaltend berichtete Verbesserungen bei Anspannung und Schlaf. Shiatsu gilt als sicher und entspannend, nachgewiesene Heilwirkungen gibt es nicht."
      },
      {
        "q": "Wie oft sollte man Shiatsu machen?",
        "a": "Für Entspannung reicht vielen eine Sitzung alle zwei bis vier Wochen. Bei Stressphasen oder Schlafproblemen starten wir oft mit wöchentlichen Terminen über vier bis sechs Wochen und ziehen dann Bilanz, ob es dir spürbar etwas bringt."
      },
      {
        "q": "Wie fühlt man sich nach Shiatsu?",
        "a": "Die meisten fühlen sich angenehm schwer, ruhig und müde, manche am Folgetag besonders wach. Leichter Muskelkater-artiger Nachhall ist möglich und harmlos. Trink nach der Behandlung genug und plane keinen intensiven Sport direkt danach."
      },
      {
        "q": "Was ist der Unterschied zwischen Shiatsu und Massage?",
        "a": "Klassische Massage bearbeitet Muskeln und Gewebe direkt, meist mit Öl auf der Haut. Shiatsu arbeitet am bekleideten Körper mit ruhigem Druck entlang der Meridiane und wirkt eher auf das gesamte Spannungsniveau als auf einzelne Muskeln."
      },
      {
        "q": "Kann Shiatsu Nebenwirkungen haben?",
        "a": "Ernsthafte Nebenwirkungen sind bei fachgerechter Behandlung sehr selten. Möglich sind Müdigkeit, vorübergehendes Aufleben von Beschwerden oder Druckempfindlichkeit. Bei akuten Verletzungen, Thrombose-Verdacht oder Fieber wird nicht behandelt. Sag deiner Therapeutin, was medizinisch bei dir läuft."
      }
    ],
    "related": [
      {
        "href": "/therapien/shiatsu/",
        "label": "Shiatsu Behandlung",
        "cat": "Therapie"
      },
      {
        "href": "/therapien/tuina/",
        "label": "Tuina Massage",
        "cat": "Therapie"
      },
      {
        "href": "/therapien/akupunktur/",
        "label": "Akupunktur",
        "cat": "Therapie"
      }
    ]
  },
  {
    "slug": "tcm-luzern-erfahrungen-ablauf",
    "title": "TCM in Luzern: Ablauf, Kosten & was dich erwartet",
    "metaDesc": "Wie eine TCM-Behandlung in Luzern abläuft: Anamnese, Puls- und Zungenbefund, Kosten nach Tarif 590 und was die Studien zu Akupunktur wirklich zeigen.",
    "region": "Luzern",
    "excerpt": "Ablauf einer TCM-Erstbehandlung, ehrliche Studienlage, Kosten nach Tarif 590 und wie es mit TCM in Luzern weitergeht.",
    "category": "Standorte",
    "h1": "TCM in Luzern: Wie eine Behandlung abläuft und was sie kostet",
    "lead": "Du überlegst, in Luzern eine TCM-Praxis aufzusuchen, und willst vorher wissen, worauf du dich einlässt. Hier steht der Ablauf Schritt für Schritt, was die Studien belegen und was nicht, was eine Sitzung kostet und wie viel deine Zusatzversicherung davon übernimmt.",
    "readingTime": "9 Min.",
    "ctaTitle": "Warteliste Luzern: als Erste:r einen Termin sichern",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-08-17",
    "dateModified": "2026-08-17",
    "lastReviewed": "2026-08-17",
    "bodyHtml": "<div class=\"wa-callout\"><div class=\"wa-callout-label\">Das Wichtigste in Kürze</div><p>Eine TCM-Erstbehandlung dauert rund 60 Minuten: ausführliche Anamnese, Puls- und Zungenbefund, danach meist schon die erste Nadelung. Eine Sitzung kostet in der Region Luzern 130 bis 160 Franken nach Tarif 590, die Erstkonsultation liegt wegen der längeren Dauer darüber. Ist die behandelnde Person EMR- und ASCA-registriert, übernehmen die meisten Zusatzversicherungen 80 bis 100 Prozent. Am besten belegt ist Akupunktur bei chronischen Schmerzen und zur Migräneprophylaxe; bei vielen anderen Anwendungen ist die Datenlage dünn.</p></div><p>Wer in Luzern nach TCM sucht, steht meist vor derselben Frage: Was passiert da eigentlich, und lohnt sich das für mein Problem? Dieser Artikel beantwortet das der Reihe nach, mit konkreten Zahlen statt Andeutungen. Eines vorweg in eigener Sache: Unsere eigene Praxis in Luzern eröffnet erst 2027. Der Ablauf, die Kosten und die Studienlage, die hier beschrieben werden, gelten trotzdem für jede seriöse Praxis in der Stadt.</p><h2>Wie eine TCM-Erstbehandlung abläuft</h2><p>Der erste Termin ist kein Schnelldurchlauf. Rechne mit 60 Minuten, und ein guter Teil davon ist Gespräch.</p><h3>1. Anamnese, rund 60 Minuten für den ganzen Termin</h3><p>Am Anfang steht die Frage, seit wann die Beschwerden bestehen, was sie verschlimmert und was sie lindert. Danach geht es weiter, als du es aus einer normalen Sprechstunde kennst: Schlaf, Verdauung, Appetit, Menstruation, Stresslevel, Kälte- oder Wärmeempfinden, frühere Erkrankungen, aktuelle Medikamente. Das wirkt beim ersten Mal ausufernd, hat aber einen praktischen Grund. Zwei Menschen mit Rückenschmerzen bekommen in der TCM nicht automatisch dieselbe Behandlung, und die Unterscheidung ergibt sich aus genau diesen Nebeninformationen.</p><p>Bring mit, was du hast: Arztberichte, MRT-Befunde, Laborwerte, eine Liste deiner Medikamente. Das spart Zeit und verhindert, dass zwei Behandlungen nebeneinander herlaufen, ohne voneinander zu wissen.</p><h3>2. Puls- und Zungenbefund</h3><p>Diese beiden Untersuchungen gehören zu jeder TCM-Anamnese und werden oft mystifiziert. Nüchtern betrachtet sind sie das, was sie sind: eine standardisierte Befunderhebung aus einer jahrhundertealten Diagnosetradition. Beim Puls wird an beiden Handgelenken an je drei Stellen getastet und auf Qualitäten wie Tiefe, Kraft, Rhythmus und Spannung geachtet. Bei der Zunge geht es um Farbe, Form, Feuchtigkeit und Belag.</p><p>Ehrlich eingeordnet: Diese Befunde sind nicht mit einer bildgebenden Untersuchung vergleichbar, und ihre Zuverlässigkeit zwischen verschiedenen Behandelnden ist in Studien mässig. Sie ersetzen keine schulmedizinische Diagnostik und sollen es auch nicht. Was sie leisten, ist eine Einordnung innerhalb des TCM-Systems, aus der sich die Punktauswahl ableitet. Eine Praxis, die dir aus dem Zungenbefund eine Organerkrankung diagnostiziert, überschreitet ihre Kompetenz. Geh dort nicht hin.</p><h3>3. Behandlungsplan</h3><p>Nach der Untersuchung solltest du eine konkrete Ansage bekommen: welche Methode, wie viele Sitzungen, in welchem Abstand, und was das insgesamt kostet. Bei uns gehört dazu auch der umgekehrte Fall. Wenn <a href=\"/therapien/akupunktur/\">Akupunktur</a> für dein Anliegen wenig beizutragen hat, sagen wir das beim ersten Termin und nicht nach der achten Sitzung.</p><p>Meist folgt direkt eine erste Behandlung. Die Nadeln sind deutlich feiner als eine Injektionsnadel. Beim Setzen spüren die meisten ein kurzes Ziehen oder einen dumpfen Druck, danach liegst du 20 bis 30 Minuten ruhig.</p><h3>4. Folgetermine</h3><p>Folgetermine dauern 45 bis 60 Minuten und liegen zu Beginn meist eine Woche auseinander. Nach vier bis sechs Sitzungen ist der Punkt, an dem sich beurteilen lässt, ob etwas passiert. Passiert nichts, ist das ein Grund aufzuhören, kein Grund für ein grösseres Paket.</p><div class=\"wa-pullquote\">Nach vier bis sechs Sitzungen weisst du, ob es wirkt. Wer dir vorher ein Zehnerabo verkauft, verkauft dir Planungssicherheit, die er nicht hat.</div><h2>Was Akupunktur realistisch kann</h2><p>Die Studienlage ist besser als viele Skeptiker glauben und schwächer als viele Praxen behaupten. Sie unterscheidet sich stark je nach Beschwerde.</p><h3>Chronische Schmerzen: gut belegt</h3><p>Die belastbarste Arbeit dazu ist die Metaanalyse individueller Patientendaten von <a href=\"https://pubmed.ncbi.nlm.nih.gov/29198932/\" target=\"_blank\" rel=\"noopener\">Vickers und Kollegen (2018, Journal of Pain)</a>. Sie wertete Rohdaten von 20'827 Patientinnen und Patienten aus 39 randomisierten Studien aus. Ergebnis: Akupunktur schnitt bei chronischen Muskel-Skelett-Schmerzen, Arthrose, chronischem Kopfschmerz und Schulterschmerz besser ab als Scheinakupunktur und deutlich besser als keine Akupunktur. Der Effekt hielt an, ein Jahr später war er nur etwa 15 Prozent kleiner.</p><p>Das ist auch für <a href=\"/beschwerden/rueckenschmerzen/\">chronische Rückenschmerzen</a> die relevante Evidenz, weil unspezifische Muskel-Skelett-Schmerzen den grössten Anteil der ausgewerteten Daten ausmachen.</p><h3>Migräneprophylaxe: gut belegt</h3><p>Der <a href=\"https://pubmed.ncbi.nlm.nih.gov/27351677/\" target=\"_blank\" rel=\"noopener\">Cochrane-Review von Linde et al. (2016)</a> fasst 22 Studien mit 4985 Teilnehmenden zusammen. Verglichen mit keiner vorbeugenden Behandlung halbierte sich die Kopfschmerzhäufigkeit bei 41 Prozent der Akupunkturgruppe gegenüber 17 Prozent der Kontrollgruppe. Gegenüber Scheinakupunktur war der Vorsprung kleiner, aber statistisch bedeutsam: 50 gegenüber 41 Prozent. Die Evidenzqualität stufen die Autoren als moderat ein. Wie wir bei Migräne konkret vorgehen, steht auf unserer Seite zu <a href=\"/beschwerden/migraene/\">Migräne</a>.</p><h3>Spannungskopfschmerz: belegt, mit Einschränkung</h3><p>Ein zweiter <a href=\"https://pubmed.ncbi.nlm.nih.gov/27092807/\" target=\"_blank\" rel=\"noopener\">Cochrane-Review derselben Gruppe (2016)</a> untersuchte 12 Studien mit 2349 Teilnehmenden. Gegenüber der Routineversorgung halbierte sich die Kopfschmerzhäufigkeit bei 48 gegenüber 19 Prozent. Die Einschränkung steht im selben Review: In vier Studien, die Akupunktur direkt mit Physiotherapie, Massage oder Bewegungstherapie verglichen, war kein Vorteil für die Akupunktur nachweisbar.</p><h3>Wo die Evidenz dünn ist</h3><p>Der Unterschied zwischen echter und Scheinakupunktur ist in fast allen guten Studien klein. Das heisst: Ein erheblicher Teil der Wirkung kommt nicht aus der exakten Nadelposition, sondern aus dem Setting, der Zuwendung und der Erwartung. Das macht die Wirkung nicht wertlos, sie ist bei den Patientinnen ja messbar angekommen. Aber es entwertet jede Praxis, die Punktgenauigkeit zum Alleinstellungsmerkmal erklärt.</p><p>Für viele weitere Anwendungen ist die Datenlage schwach oder widersprüchlich: Verdauungsbeschwerden, Allergien, Erschöpfungszustände, Tinnitus. Es gibt Hinweise und viele Praxisberichte, aber keine Evidenz auf dem Niveau der Schmerzstudien. Und Langzeitdaten über zwölf Monate hinaus fehlen fast überall. Wer dir bei diesen Themen Sicherheit verspricht, hat die Studien nicht gelesen.</p><h2>Rote Flaggen: wann zuerst zur Ärztin</h2><p>TCM ist eine ergänzende Methode. Es gibt Symptome, bei denen die erste Adresse eine ärztliche Abklärung ist, nicht eine TCM-Praxis. Melde dich hausärztlich oder im Notfall, wenn eines davon zutrifft:</p><ul>\n<li><strong>Ungewollter Gewichtsverlust</strong> ohne Erklärung, besonders zusammen mit Nachtschweiss oder Fieber.</li>\n<li><strong>Neurologische Ausfälle</strong>: Taubheit, Kraftverlust in Arm oder Bein, Sprach- oder Sehstörungen, plötzliche Gangunsicherheit.</li>\n<li><strong>Störungen von Blase oder Darm</strong> zusammen mit Rückenschmerzen oder einem Taubheitsgefühl im Reithosenbereich. Das ist ein Notfall.</li>\n<li><strong>Plötzliche, sehr starke Schmerzen</strong>, die anders sind als alles bisher, oder Rückenschmerzen nach einem Sturz.</li>\n<li><strong>Brustschmerz, Atemnot, einseitige Beinschwellung.</strong></li>\n<li><strong>Anhaltendes Fieber</strong> ohne klare Ursache, Kopfschmerz mit Nackensteifigkeit.</li>\n<li><strong>Schmerzen bei bekannter Krebserkrankung</strong> oder unter Immunsuppression.</li>\n</ul><p>Eine gute Praxis fragt diese Punkte in der Anamnese aktiv ab und schickt dich weiter, wenn etwas auffällt. Das ist kein Zeichen von Unfähigkeit, sondern das Gegenteil.</p><h2>Kosten in Luzern</h2><p>Abgerechnet wird nach <strong>Tarif 590</strong>, dem anerkannten Tarif für Komplementärtherapien, nach Behandlungsdauer. In der Region Luzern liegt eine Folgesitzung damit bei <strong>130 bis 160 Franken</strong>. Die Erstkonsultation dauert länger und liegt entsprechend darüber, meist zwischen 170 und 210 Franken.</p><p>Bezahlt wird das über die <strong>Zusatzversicherung für Komplementärmedizin</strong>, nicht über die Grundversicherung. Diese Unterscheidung ist der häufigste Irrtum. Voraussetzung ist, dass die behandelnde Person in den Registern <strong>EMR</strong> oder <strong>ASCA</strong> eingetragen ist. Ist sie das, beteiligen sich die meisten Zusatzversicherungen mit <strong>80 bis 100 Prozent</strong> pro Sitzung, begrenzt durch eine Jahreslimite, die je nach Modell zwischen 500 und 3000 Franken liegt.</p><p>Zwei Dinge klärst du vor dem ersten Termin, dann gibt es keine Überraschung: Ist die Person registriert, und was deckt dein Modell konkret? Bei uns übernehmen wir den Deckungscheck kostenlos, du schickst uns Kasse und Modell und bekommst die Zahl vorher. Die Grundlagen dazu stehen auf unserer Seite zur <a href=\"/krankenkassen/\">Krankenkasse</a>, die konkreten Beträge unter <a href=\"/standorte/luzern/kosten/\">Kosten und Krankenkasse in Luzern</a>.</p><h2>Die Situation in Luzern heute</h2><p>Luzern ist mit TCM nicht unversorgt. In der Stadt und in den Agglomerationsgemeinden gibt es mehrere Einzelpraxen und Therapeut:innen in Gemeinschaftspraxen, viele davon EMR-anerkannt und fachlich solide. Wer heute eine Behandlung sucht, findet eine.</p><p>Was in Luzern bisher fehlt, ist ein grösserer Standort mit mehreren Behandelnden. Das merkt man vor allem an zwei Stellen: bei den Wartezeiten auf einen Ersttermin und dann, wenn dein Anliegen einen Spezialschwerpunkt braucht, etwa Kinderwunsch oder komplexe Schmerzbilder. In einer Einzelpraxis gibt es niemanden, mit dem sich ein schwieriger Fall besprechen lässt, und keinen Ersatz bei Ferien oder Krankheit.</p><p>Genau diese Lücke schliessen wir. <a href=\"/standorte/luzern/\">TCM Luzern</a> eröffnet <strong>2027</strong> zentral in der Stadt, mit dem Bahnhof in Gehdistanz und guter Busanbindung nach Kriens, Emmen und Horw. Die Adresse steht fest, sobald der Mietvertrag unterschrieben ist.</p><p>Bis dahin gibt es zwei sinnvolle Wege. Erstens: Trag dich auf die Warteliste ein, dann bekommst du den Eröffnungstermin vor allen anderen und kannst dir vorab einen Platz sichern. Zweitens, wenn du nicht warten willst: Zürich ist ab Luzern mit dem Zug in etwa 45 Minuten erreichbar, und dort behandeln wir bereits. Wer regelmässig Termine braucht, fährt damit oft besser als mit langem Warten vor Ort. Was dich an unserem künftigen Standort erwartet und wie <a href=\"/standorte/luzern/\">Akupunktur in Luzern</a> bei uns ablaufen wird, steht auf der Standortseite.</p><h2>Worauf du bei der Praxiswahl achten solltest</h2><p>Unabhängig davon, für wen du dich entscheidest, gibt es ein paar Punkte, die eine seriöse Praxis erfüllt:</p><ul>\n<li><strong>EMR- oder ASCA-Registrierung</strong>, öffentlich nachprüfbar. Ohne die zahlt keine Zusatzversicherung.</li>\n<li><strong>Ein Erstgespräch, das mindestens 45 bis 60 Minuten dauert.</strong> Wer nach 15 Minuten zur Nadel greift, kann keine Anamnese gemacht haben.</li>\n<li><strong>Eine klare Aussage nach vier bis sechs Sitzungen</strong>, ob die Behandlung anschlägt, statt einer offenen Verlängerung.</li>\n<li><strong>Bereitschaft, dich weiterzuschicken.</strong> Eine Praxis, die für alles zuständig ist, ist für nichts zuständig.</li>\n<li><strong>Keine Versprechen.</strong> Wer Heilung zusagt oder dir empfiehlt, verschriebene Medikamente abzusetzen, ist ein Risiko und keine Hilfe.</li>\n</ul><p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung, TCM.ch. Quellen: Vickers AJ et al., Acupuncture for Chronic Pain: Update of an Individual Patient Data Meta-Analysis, Journal of Pain 2018 (PMID 29198932). Linde K et al., Acupuncture for the prevention of episodic migraine, Cochrane Database of Systematic Reviews 2016, CD001218 (PMID 27351677). Linde K et al., Acupuncture for the prevention of tension-type headache, Cochrane Database of Systematic Reviews 2016, CD007587 (PMID 27092807). Tarifangaben nach Tarif 590 für Komplementärtherapien.</em></p>",
    "faqs": [
      {
        "q": "Was kostet eine TCM-Behandlung in Luzern?",
        "a": "Eine Folgesitzung liegt bei 130 bis 160 Franken, abgerechnet nach Tarif 590 nach Behandlungsdauer. Die Erstkonsultation dauert länger und kostet entsprechend mehr, meist 170 bis 210 Franken. Lass dir die Zahlen vor dem ersten Termin nennen, seriöse Praxen sagen sie dir ohne Nachfrage."
      },
      {
        "q": "Zahlt die Krankenkasse Akupunktur in Luzern?",
        "a": "Über die Zusatzversicherung für Komplementärmedizin ja, über die Grundversicherung nein. Voraussetzung ist eine EMR- oder ASCA-Registrierung der behandelnden Person. Die meisten Zusatzversicherungen übernehmen dann 80 bis 100 Prozent pro Sitzung, begrenzt durch eine Jahreslimite von je nach Modell 500 bis 3000 Franken. Verbindlich ist immer deine Police, deshalb lohnt sich ein Deckungscheck vorab."
      },
      {
        "q": "Wie viele Sitzungen brauche ich?",
        "a": "Nach vier bis sechs Sitzungen lässt sich beurteilen, ob die Behandlung anschlägt. Akute Beschwerden sprechen oft schneller an, chronische Muster brauchen länger. Wenn sich nach sechs Terminen nichts bewegt, ist das ein Grund aufzuhören und nicht ein Grund für ein grösseres Paket."
      },
      {
        "q": "Tut Akupunktur weh?",
        "a": "Die Nadeln sind viel feiner als eine Injektionsnadel. Beim Setzen spüren die meisten ein kurzes Ziehen oder einen dumpfen Druck, danach liegen die Nadeln 20 bis 30 Minuten ruhig. Starke Schmerzen gehören nicht dazu. Sag jederzeit Bescheid, wenn etwas unangenehm ist."
      },
      {
        "q": "Wann eröffnet TCM.ch in Luzern?",
        "a": "2027. Ein genaues Datum steht noch nicht fest, weil die Räume gerade gesucht werden. Wer auf der Warteliste steht, erfährt den Termin zuerst und kann sich vor der offiziellen Freigabe einen Platz sichern. Bis dahin behandeln wir dich an einem bestehenden Standort, Zürich ist ab Luzern in rund 45 Minuten erreichbar."
      }
    ],
    "related": [
      {
        "href": "/standorte/luzern/",
        "label": "Standort Luzern",
        "cat": "Standort"
      },
      {
        "href": "/wissen/akupunktur-bei-rueckenschmerzen/",
        "label": "Akupunktur bei Rückenschmerzen",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      }
    ]
  },
  {
    "slug": "tcm-basel-erfahrungen-ablauf",
    "title": "TCM in Basel: Ablauf, Kosten & was dich erwartet",
    "metaDesc": "Wie eine TCM-Behandlung abläuft: Anamnese, Puls- und Zungenbefund, Kosten nach Tarif 590 und was die Studien zu Akupunktur wirklich zeigen. Ehrlich erklärt.",
    "region": "Basel",
    "excerpt": "Ablauf einer TCM-Erstbehandlung, ehrliche Studienlage, Kosten nach Tarif 590 und wie es mit TCM in der Region Basel weitergeht.",
    "category": "Standorte",
    "h1": "TCM in Basel: Wie eine Behandlung abläuft und was sie kostet",
    "lead": "Du überlegst, eine TCM-Praxis aufzusuchen, und willst vorher wissen, worauf du dich einlässt. Hier steht der Ablauf Schritt für Schritt, was die Studien belegen und was nicht, was eine Sitzung kostet und wie viel deine Zusatzversicherung davon übernimmt.",
    "readingTime": "9 Min.",
    "ctaTitle": "Warteliste Basel: als Erste:r einen Termin sichern",
    "author": {
      "name": "Corinna Reinhart",
      "role": "TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen",
      "bio": "Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen."
    },
    "reviewerName": "Corinna Reinhart",
    "datePublished": "2026-08-17",
    "dateModified": "2026-08-17",
    "lastReviewed": "2026-08-17",
    "bodyHtml": "<div class=\"wa-callout\"><div class=\"wa-callout-label\">Das Wichtigste in Kürze</div><p>Eine TCM-Erstbehandlung dauert rund 60 Minuten: ausführliche Anamnese, Puls- und Zungenbefund, danach meist schon die erste Nadelung. Eine Sitzung kostet in der Region 130 bis 160 Franken nach Tarif 590, die Erstkonsultation liegt wegen der längeren Dauer darüber. Ist die behandelnde Person EMR- und ASCA-registriert, übernehmen die meisten Zusatzversicherungen 80 bis 100 Prozent. Am besten belegt ist Akupunktur bei chronischen Schmerzen und zur Migräneprophylaxe; bei vielen anderen Anwendungen ist die Datenlage dünn.</p></div><p>Wer eine TCM-Behandlung erwägt, will meist dasselbe wissen: Was passiert beim ersten Termin, was ist belegt, und was kostet das Ganze? Dieser Artikel beantwortet das der Reihe nach, mit Zahlen statt Andeutungen. In eigener Sache vorweg: Unsere Praxis in der Stadt eröffnet erst 2028. Ablauf, Kosten und Studienlage gelten trotzdem für jede seriöse Praxis in der Region.</p><h2>So läuft die Erstbehandlung ab</h2><p>Der erste Termin ist kein Schnelldurchlauf. Rechne mit 60 Minuten, und ein guter Teil davon ist Gespräch.</p><h3>Die Anamnese nimmt den grössten Teil der Stunde ein</h3><p>Am Anfang steht die Frage, seit wann die Beschwerden bestehen, was sie verschlimmert und was sie lindert. Danach geht es weiter, als du es aus einer normalen Sprechstunde kennst: Schlaf, Verdauung, Appetit, Menstruation, Stresslevel, Kälte- oder Wärmeempfinden, frühere Erkrankungen, aktuelle Medikamente. Das wirkt beim ersten Mal ausufernd, hat aber einen praktischen Grund. Zwei Menschen mit demselben Rückenschmerz bekommen in der TCM nicht automatisch dieselbe Behandlung, und die Unterscheidung ergibt sich aus genau diesen Nebeninformationen.</p><p>Bring mit, was du hast: Arztberichte, MRT-Befunde, Laborwerte, eine Liste deiner Medikamente. Das spart Zeit und verhindert, dass zwei Behandlungen nebeneinander herlaufen, ohne voneinander zu wissen.</p><h3>Puls- und Zungenbefund, nüchtern betrachtet</h3><p>Diese beiden Untersuchungen gehören zu jeder TCM-Anamnese und werden oft mystifiziert. Sachlich sind sie das, was sie sind: eine standardisierte Befunderhebung aus einer jahrhundertealten Diagnosetradition. Beim Puls wird an beiden Handgelenken an je drei Stellen getastet und auf Qualitäten wie Tiefe, Kraft, Rhythmus und Spannung geachtet. Bei der Zunge geht es um Farbe, Form, Feuchtigkeit und Belag.</p><p>Ehrlich eingeordnet: Diese Befunde sind nicht mit einer bildgebenden Untersuchung vergleichbar, und ihre Übereinstimmung zwischen verschiedenen Behandelnden ist in Studien mässig. Sie ersetzen keine schulmedizinische Diagnostik und sollen es auch nicht. Was sie leisten, ist eine Einordnung innerhalb des TCM-Systems, aus der sich die Punktauswahl ableitet. Eine Praxis, die dir aus dem Zungenbefund eine Organerkrankung diagnostiziert, überschreitet ihre Kompetenz. Geh dort nicht hin.</p><h3>Behandlungsplan und Folgetermine</h3><p>Nach der Untersuchung solltest du eine konkrete Ansage bekommen: welche Methode, wie viele Sitzungen, in welchem Abstand, und was das insgesamt kostet. Dazu gehört auch der umgekehrte Fall. Wenn <a href=\"/therapien/akupunktur/\">Akupunktur</a> für dein Anliegen wenig beizutragen hat, sollte das beim ersten Termin gesagt werden und nicht nach der achten Sitzung.</p><p>Meist folgt direkt eine erste Behandlung. Die Nadeln sind deutlich feiner als eine Injektionsnadel. Beim Setzen spüren die meisten ein kurzes Ziehen oder einen dumpfen Druck, danach liegst du 20 bis 30 Minuten ruhig. Folgetermine dauern 45 bis 60 Minuten und liegen zu Beginn meist eine Woche auseinander.</p><div class=\"wa-pullquote\">Nach vier bis sechs Sitzungen weisst du, ob es wirkt. Wer dir vorher ein Zehnerabo verkauft, verkauft dir Planungssicherheit, die er nicht hat.</div><h2>Was die Studienlage sagt</h2><p>Die Evidenz ist besser als viele Skeptiker glauben und schwächer als viele Praxen behaupten. Sie unterscheidet sich stark je nach Beschwerde.</p><h3>Chronische Schmerzen: gut belegt</h3><p>Die belastbarste Arbeit dazu ist die Metaanalyse individueller Patientendaten von <a href=\"https://pubmed.ncbi.nlm.nih.gov/29198932/\" target=\"_blank\" rel=\"noopener\">Vickers und Kollegen (2018, Journal of Pain)</a>. Sie wertete Rohdaten von 20'827 Patientinnen und Patienten aus 39 randomisierten Studien aus. Ergebnis: Akupunktur schnitt bei chronischen Muskel-Skelett-Schmerzen, Arthrose, chronischem Kopfschmerz und Schulterschmerz besser ab als Scheinakupunktur und deutlich besser als keine Akupunktur. Der Effekt hielt an, ein Jahr später war er nur etwa 15 Prozent kleiner.</p><p>Das ist auch für <a href=\"/beschwerden/rueckenschmerzen/\">chronische Rückenschmerzen</a> die relevante Evidenz, weil unspezifische Muskel-Skelett-Schmerzen den grössten Anteil der ausgewerteten Daten ausmachen.</p><h3>Migräneprophylaxe: gut belegt</h3><p>Der <a href=\"https://pubmed.ncbi.nlm.nih.gov/27351677/\" target=\"_blank\" rel=\"noopener\">Cochrane-Review von Linde et al. (2016)</a> fasst 22 Studien mit 4985 Teilnehmenden zusammen. Verglichen mit keiner vorbeugenden Behandlung halbierte sich die Kopfschmerzhäufigkeit bei 41 Prozent der Akupunkturgruppe gegenüber 17 Prozent der Kontrollgruppe. Gegenüber Scheinakupunktur war der Vorsprung kleiner, aber statistisch bedeutsam: 50 gegenüber 41 Prozent. Die Evidenzqualität stufen die Autoren als moderat ein. Wie wir dabei vorgehen, steht auf unserer Seite zu <a href=\"/beschwerden/migraene/\">Migräne</a>.</p><h3>Spannungskopfschmerz: belegt, mit einer Einschränkung</h3><p>Ein zweiter <a href=\"https://pubmed.ncbi.nlm.nih.gov/27092807/\" target=\"_blank\" rel=\"noopener\">Cochrane-Review derselben Gruppe (2016)</a> untersuchte 12 Studien mit 2349 Teilnehmenden. Gegenüber der Routineversorgung halbierte sich die Kopfschmerzhäufigkeit bei 48 gegenüber 19 Prozent. Die Einschränkung steht im selben Review: In vier Studien, die Akupunktur direkt mit Physiotherapie, Massage oder Bewegungstherapie verglichen, war kein Vorteil für die Akupunktur nachweisbar.</p><h3>Wo die Evidenz dünn ist</h3><p>Der Unterschied zwischen echter und Scheinakupunktur ist in fast allen guten Studien klein. Das heisst: Ein erheblicher Teil der Wirkung kommt nicht aus der exakten Nadelposition, sondern aus dem Setting, der Zuwendung und der Erwartung. Das macht die Wirkung nicht wertlos, sie ist bei den Patientinnen ja messbar angekommen. Aber es entwertet jede Praxis, die Punktgenauigkeit zum Alleinstellungsmerkmal erklärt.</p><p>Für viele weitere Anwendungen ist die Datenlage schwach oder widersprüchlich: Verdauungsbeschwerden, Allergien, Erschöpfungszustände, Tinnitus. Es gibt Hinweise und viele Praxisberichte, aber keine Evidenz auf dem Niveau der Schmerzstudien. Und Langzeitdaten über zwölf Monate hinaus fehlen fast überall. Wer dir bei diesen Themen Sicherheit verspricht, hat die Studien nicht gelesen.</p><h2>Wann du zuerst ärztlich abklären solltest</h2><p>TCM ist eine ergänzende Methode. Es gibt Symptome, bei denen die erste Adresse eine ärztliche Abklärung ist, nicht eine TCM-Praxis. Melde dich hausärztlich oder im Notfall, wenn eines davon zutrifft:</p><ul>\n<li><strong>Ungewollter Gewichtsverlust</strong> ohne Erklärung, besonders zusammen mit Nachtschweiss oder Fieber.</li>\n<li><strong>Neurologische Ausfälle</strong>: Taubheit, Kraftverlust in Arm oder Bein, Sprach- oder Sehstörungen, plötzliche Gangunsicherheit.</li>\n<li><strong>Störungen von Blase oder Darm</strong> zusammen mit Rückenschmerzen oder einem Taubheitsgefühl im Reithosenbereich. Das ist ein Notfall.</li>\n<li><strong>Plötzliche, sehr starke Schmerzen</strong>, die anders sind als alles bisher, oder Rückenschmerzen nach einem Sturz.</li>\n<li><strong>Brustschmerz, Atemnot, einseitige Beinschwellung.</strong></li>\n<li><strong>Anhaltendes Fieber</strong> ohne klare Ursache, Kopfschmerz mit Nackensteifigkeit.</li>\n<li><strong>Schmerzen bei bekannter Krebserkrankung</strong> oder unter Immunsuppression.</li>\n</ul><p>Eine gute Praxis fragt diese Punkte in der Anamnese aktiv ab und schickt dich weiter, wenn etwas auffällt. Das ist kein Zeichen von Unfähigkeit, sondern das Gegenteil.</p><h2>Was eine Sitzung kostet</h2><p>Abgerechnet wird nach <strong>Tarif 590</strong>, dem anerkannten Tarif für Komplementärtherapien, nach Behandlungsdauer. Eine Folgesitzung liegt damit bei <strong>130 bis 160 Franken</strong>. Die Erstkonsultation dauert länger und liegt entsprechend darüber, meist zwischen 170 und 210 Franken.</p><p>Bezahlt wird das über die <strong>Zusatzversicherung für Komplementärmedizin</strong>, nicht über die Grundversicherung. Diese Unterscheidung ist der häufigste Irrtum. Voraussetzung ist, dass die behandelnde Person in den Registern <strong>EMR</strong> oder <strong>ASCA</strong> eingetragen ist. Ist sie das, beteiligen sich die meisten Zusatzversicherungen mit <strong>80 bis 100 Prozent</strong> pro Sitzung, begrenzt durch eine Jahreslimite, die je nach Modell zwischen 500 und 3000 Franken liegt.</p><p>Zwei Dinge klärst du vor dem ersten Termin, dann gibt es keine Überraschung: Ist die Person registriert, und was deckt dein Modell konkret? Bei uns ist der Deckungscheck kostenlos, du schickst uns Kasse und Modell und bekommst die Zahl vorher. Die Grundlagen dazu stehen auf unserer Seite zur <a href=\"/krankenkassen/\">Krankenkasse</a>.</p><h2>Die Versorgungslage in der Region</h2><p>Die Stadt ist mit TCM nicht unversorgt. In Grossbasel, Kleinbasel und den Agglomerationsgemeinden gibt es mehrere Einzelpraxen und Therapeut:innen in Gemeinschaftspraxen, viele davon EMR-anerkannt und fachlich solide. Wer heute eine Behandlung sucht, findet eine.</p><p>Was bisher fehlt, ist ein grösserer Standort mit mehreren Behandelnden. Das merkt man vor allem an zwei Stellen: bei den Wartezeiten auf einen Ersttermin und dann, wenn dein Anliegen einen Spezialschwerpunkt braucht, etwa Kinderwunsch oder komplexe Schmerzbilder. In einer Einzelpraxis gibt es niemanden, mit dem sich ein schwieriger Fall besprechen lässt, und keinen Ersatz bei Ferien oder Krankheit.</p><p>Genau diese Lücke schliessen wir. <a href=\"/standorte/basel/\">TCM Basel</a> eröffnet <strong>2028</strong> zentral in der Stadt, mit dem Bahnhof SBB in Gehdistanz und guter Tramanbindung ins Gundeli, nach Kleinbasel und nach Riehen. Die Adresse steht fest, sobald der Mietvertrag unterschrieben ist.</p><p>Bis dahin gibt es zwei sinnvolle Wege. Erstens: Trag dich auf die Warteliste ein, dann bekommst du den Eröffnungstermin vor allen anderen und kannst dir vorab einen Platz sichern. Zweitens, wenn du nicht warten willst: Zürich ist ab Basel SBB mit dem Zug in rund 55 Minuten erreichbar, und dort behandeln wir bereits. Wer regelmässig Termine braucht, fährt damit oft besser als mit langem Warten vor Ort. Was am künftigen Standort entsteht, siehst du auf der Seite zu <a href=\"/standorte/basel/\">Akupunktur in Basel</a>.</p><h2>Woran du eine seriöse Praxis erkennst</h2><p>Unabhängig davon, für wen du dich entscheidest, gibt es ein paar Punkte, die eine seriöse Praxis erfüllt:</p><ul>\n<li><strong>EMR- oder ASCA-Registrierung</strong>, öffentlich nachprüfbar. Ohne die zahlt keine Zusatzversicherung.</li>\n<li><strong>Ein Erstgespräch, das mindestens 45 bis 60 Minuten dauert.</strong> Wer nach 15 Minuten zur Nadel greift, kann keine Anamnese gemacht haben.</li>\n<li><strong>Eine klare Aussage nach vier bis sechs Sitzungen</strong>, ob die Behandlung anschlägt, statt einer offenen Verlängerung.</li>\n<li><strong>Bereitschaft, dich weiterzuschicken.</strong> Eine Praxis, die für alles zuständig ist, ist für nichts zuständig.</li>\n<li><strong>Keine Versprechen.</strong> Wer Heilung zusagt oder dir empfiehlt, verschriebene Medikamente abzusetzen, ist ein Risiko und keine Hilfe.</li>\n</ul><p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung, TCM.ch. Quellen: Vickers AJ et al., Acupuncture for Chronic Pain: Update of an Individual Patient Data Meta-Analysis, Journal of Pain 2018 (PMID 29198932). Linde K et al., Acupuncture for the prevention of episodic migraine, Cochrane Database of Systematic Reviews 2016, CD001218 (PMID 27351677). Linde K et al., Acupuncture for the prevention of tension-type headache, Cochrane Database of Systematic Reviews 2016, CD007587 (PMID 27092807). Tarifangaben nach Tarif 590 für Komplementärtherapien.</em></p>",
    "faqs": [
      {
        "q": "Wie viele Sitzungen braucht es?",
        "a": "Nach vier bis sechs Sitzungen lässt sich beurteilen, ob die Behandlung anschlägt. Akute Beschwerden sprechen oft schneller an, chronische Muster brauchen länger. Bewegt sich nach sechs Terminen nichts, ist das ein Grund aufzuhören und nicht ein Grund für ein grösseres Paket."
      },
      {
        "q": "Tut Akupunktur weh?",
        "a": "Die Nadeln sind viel feiner als eine Injektionsnadel. Beim Setzen spüren die meisten ein kurzes Ziehen oder einen dumpfen Druck, danach liegen die Nadeln 20 bis 30 Minuten ruhig. Starke Schmerzen gehören nicht dazu. Sag jederzeit Bescheid, wenn etwas unangenehm ist."
      },
      {
        "q": "Was ist der Unterschied zwischen TCM und Schulmedizin?",
        "a": "Die Schulmedizin sucht eine Ursache und behandelt sie gezielt, gestützt auf Labor und Bildgebung. Die TCM ordnet Beschwerden in ein eigenes Diagnosesystem ein und arbeitet mit Nadeln, Kräutern und manuellen Techniken. Sie ersetzt keine ärztliche Abklärung, sondern ergänzt sie."
      },
      {
        "q": "Kann ich TCM mit einer laufenden ärztlichen Behandlung kombinieren?",
        "a": "In der Regel ja, und oft ist genau das der sinnvolle Weg. Wichtig ist, dass beide Seiten voneinander wissen. Bring Befunde und deine Medikamentenliste mit. Setze nie eigenmächtig ein verschriebenes Medikament ab, und misstraue jeder Praxis, die dir das nahelegt."
      },
      {
        "q": "Was zahle ich als Grenzgänger:in?",
        "a": "Entscheidend ist deine Versicherung, nicht dein Wohnort. Wer in der Schweiz grundversichert ist, kann eine Zusatzversicherung für Komplementärmedizin abschliessen und darüber abrechnen. Bist du in Deutschland oder Frankreich versichert, zahlst du selbst und reichst die Rechnung dort ein; ob etwas zurückkommt, hängt vom Tarif ab."
      }
    ],
    "related": [
      {
        "href": "/standorte/basel/",
        "label": "Standort Basel",
        "cat": "Standort"
      },
      {
        "href": "/wissen/akupunktur-bei-rueckenschmerzen/",
        "label": "Akupunktur bei Rückenschmerzen",
        "cat": "Artikel"
      },
      {
        "href": "/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/",
        "label": "Krankenkasse und TCM",
        "cat": "Artikel"
      }
    ]
  }
];
export const wissenBySlug = (slug: string): Wissen | undefined => wissen.find((w) => w.slug === slug);
