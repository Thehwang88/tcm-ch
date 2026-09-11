// Patientenfragen-Layer der Gesundheitsbibliothek (/gesundheitsbibliothek/fragen/).
//
// Modell (bewusst konservativ, kein FAQ-Farming):
// - 6 Kategorie-Hubs mit je 5-7 kompakten Antworten (Antwort zuerst, 80-200 Wörter)
// - 6 Standalone-Seiten nur für Fragen mit eigenem, substanziellem Intent
// - Bereits stark abgedeckte Intents (Sitzungsanzahl, Schröpfmale, Dry Needling,
//   Versicherung im Detail, Migräne/Nacken-Wirkung) bleiben Hub-Antworten mit Link
//   auf die bestehende Seite statt neuer URLs.
// Autorin: neutrale Fachredaktion, kein reviewedBy (nur echte Reviews anzeigen).

export interface FrageLink { href: string; label: string; cat: string }
export interface HubAnswer { id: string; q: string; a: string }
export interface FragenHub {
  slug: string; nav: string; title: string; metaDesc: string; h1: string; lead: string;
  answers: HubAnswer[];
}
export interface Frage {
  slug: string; question: string; title: string; metaDesc: string;
  kurz: string; bodyHtml: string;
  verwandt: { href: string; label: string }[];
  mehr: FrageLink[];
}

export const FRAGEN_DATEN = { datePublished: '2026-09-11', dateModified: '2026-09-11' };

export const fragenHubs: FragenHub[] = [
  {
    slug: 'erster-termin',
    nav: 'Erster Termin & Vorbereitung',
    title: 'Erster Termin & Vorbereitung: häufige Fragen',
    metaDesc: 'Was du zum ersten TCM-Termin mitbringen sollst, wie lange er dauert, ob du nüchtern kommen musst und ob du eine Überweisung brauchst. Kurz beantwortet.',
    h1: 'Erster Termin & Vorbereitung',
    lead: 'Alles, was du vor deinem ersten Termin wissen willst: Dauer, Kleidung, Essen, Unterlagen und Organisation. Kurz und direkt beantwortet.',
    answers: [
      {
        id: 'dauer',
        q: 'Wie lange dauert der erste Termin?',
        a: '<p>Rechne mit 60 bis 75 Minuten. Der erste Termin ist länger als die Folgetermine, weil ein ausführliches Gespräch dazugehört: deine Beschwerden, deine Krankengeschichte, Medikamente, Schlaf, Verdauung. Danach folgen die Untersuchung mit Puls- und Zungendiagnostik und meist bereits eine erste Behandlung. Folgetermine dauern in der Regel 45 bis 60 Minuten. Was genau passiert, liest du unter <a href="/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/">Was passiert beim ersten Termin?</a></p>',
      },
      {
        id: 'mitbringen',
        q: 'Was soll ich mitbringen?',
        a: '<p>Deine Versichertenkarte und, falls vorhanden, relevante medizinische Unterlagen: aktuelle Befunde, Röntgen- oder MRT-Berichte, eine Medikamentenliste. Nichts davon ist Pflicht, aber je vollständiger das Bild, desto gezielter die Behandlung. Wenn du Blutverdünner oder andere dauerhafte Medikamente nimmst, sag das unbedingt im Erstgespräch, am einfachsten mit der Liste. Eine ärztliche Überweisung brauchst du nicht.</p>',
      },
      {
        id: 'kleidung',
        q: 'Was soll ich anziehen?',
        a: '<p>Bequeme Kleidung, die sich leicht hochschieben lässt: Viele Akupunkturpunkte liegen an Unterarmen, Unterschenkeln, Rücken und Bauch. Du musst dich nicht komplett ausziehen; für die meisten Behandlungen reicht es, einzelne Körperstellen freizulegen. Für Rückenbehandlungen wie Schröpfen oder Tuina wird der Oberkörper teilweise frei gemacht, du wirst dabei zugedeckt, wo gerade nicht behandelt wird.</p>',
      },
      {
        id: 'essen',
        q: 'Muss ich nüchtern kommen? Darf ich vorher essen?',
        a: '<p>Du sollst nicht nüchtern kommen. Ideal ist eine leichte Mahlzeit ein bis zwei Stunden vor dem Termin. Mit ganz leerem Magen steigt das Risiko für Kreislaufreaktionen während der Behandlung, mit sehr vollem Magen liegt es sich unbequem. Auch genug trinken hilft. Alkohol vor der Behandlung ist keine gute Idee.</p>',
      },
      {
        id: 'ueberweisung',
        q: 'Brauche ich eine Überweisung vom Arzt?',
        a: '<p>Nein. Für TCM-Behandlungen über die Zusatzversicherung brauchst du keine ärztliche Überweisung, du kannst direkt einen Termin vereinbaren. Die Ausnahme ist Physiotherapie: Sie läuft über die Grundversicherung und braucht eine ärztliche Verordnung. Wichtig ist nur, dass deine Therapeutin oder dein Therapeut EMR- oder ASCA-anerkannt ist, sonst zahlt die Zusatzversicherung nicht. Bei TCM.ch ist das an allen Standorten der Fall.</p>',
      },
      {
        id: 'vorbereitung',
        q: 'Muss ich mich sonst irgendwie vorbereiten?',
        a: '<p>Nein, eine spezielle Vorbereitung braucht es nicht. Hilfreich ist, wenn du dir vorher kurz überlegst: Seit wann bestehen die Beschwerden? Was verschlimmert oder lindert sie? Was wurde schon abgeklärt oder behandelt? Diese Angaben machen das Erstgespräch effizienter. Plane nach dem Termin keine Höchstleistung ein; manche fühlen sich nach der ersten Behandlung angenehm müde. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">Ist Müdigkeit nach Akupunktur normal?</a></p>',
      },
    ],
  },
  {
    slug: 'nach-der-behandlung',
    nav: 'Nach der Behandlung',
    title: 'Nach der Behandlung: häufige Fragen',
    metaDesc: 'Sport, Sauna, Alkohol oder Autofahren nach Akupunktur? Was nach einer TCM-Behandlung normal ist und worauf du am Behandlungstag achten solltest.',
    h1: 'Nach der Behandlung',
    lead: 'Was am Behandlungstag normal ist, was du dir gönnen solltest und was du besser auf morgen verschiebst.',
    answers: [
      {
        id: 'sport',
        q: 'Darf ich nach der Behandlung Sport machen?',
        a: '<p>Leichte Bewegung wie Spazieren ist jederzeit gut. Intensives Training verschiebst du besser auf den nächsten Tag: Der Körper reagiert auf die Behandlung, viele fühlen sich danach entspannt bis müde, und ein hartes Training arbeitet dagegen. Nach Schröpfen oder Gua Sha ist die behandelte Muskulatur zudem stärker durchblutet und kann empfindlich sein. Faustregel: Am Behandlungstag runterfahren, ab dem Folgetag wie gewohnt.</p>',
      },
      {
        id: 'sauna',
        q: 'Sind Sauna, Schwimmbad oder heisses Bad erlaubt?',
        a: '<p>Am Behandlungstag besser nicht. Nach Akupunktur sind die Einstichstellen winzige Wunden, die ein paar Stunden Ruhe verdienen; Schwimmbadwasser und starkes Schwitzen sind da unnötige Reize. Nach Schröpfen gilt das noch mehr, weil die Haut stärker beansprucht ist. Duschen ist kein Problem. Mit Dauernadeln im Ohr solltest du Schwimmbad und Sauna ganz meiden, bis sie entfernt sind.</p>',
      },
      {
        id: 'alkohol',
        q: 'Darf ich nach der Behandlung Alkohol trinken?',
        a: '<p>Verzichte am Behandlungstag besser darauf. Alkohol belastet den Kreislauf, und der ist nach einer Behandlung bei manchen ohnehin etwas gedämpft. Dasselbe gilt für sehr viel Kaffee direkt danach. Viel Wasser oder Tee trinken ist dagegen sinnvoll, die meisten empfinden das nach der Behandlung als angenehm.</p>',
      },
      {
        id: 'autofahren',
        q: 'Kann ich nach der Behandlung Auto fahren?',
        a: '<p>In der Regel ja. Die meisten fühlen sich nach der Behandlung klar und fahrtüchtig. Bist du nach der ersten Sitzung unsicher, wie dein Körper reagiert, plane den Heimweg ohne Auto oder mit etwas Puffer: Selten kommt es direkt nach der Behandlung zu kurzem Schwindel oder ausgeprägter Müdigkeit. Sag deiner Therapeutin, wenn dir nach dem Aufstehen flau ist; ein paar Minuten Sitzen lösen das meist.</p>',
      },
      {
        id: 'erstverschlimmerung',
        q: 'Meine Beschwerden sind nach der Behandlung kurz stärker. Ist das normal?',
        a: '<p>Das kommt vor und ist meist harmlos: Eine vorübergehende Verstärkung der Beschwerden für einen bis zwei Tage nach der Behandlung ist bekannt, besonders zu Beginn einer Behandlungsserie. Sie sollte von selbst abklingen. Wichtig zur Einordnung: Hält die Verschlechterung länger an, wird sie stark oder kommen neue Symptome wie Fieber, Taubheit oder Lähmungserscheinungen dazu, ist das kein Behandlungseffekt mehr, sondern ein Fall für die ärztliche Abklärung. Melde dich in dem Fall auch bei deiner Praxis.</p>',
      },
      {
        id: 'abstaende',
        q: 'Wie viel Abstand liegt zwischen den Sitzungen?',
        a: '<p>Üblich ist zu Beginn eine Sitzung pro Woche, bei akuten Beschwerden manchmal zwei. Wird es besser, werden die Abstände grösser: alle zwei Wochen, dann nach Bedarf. Wie viele Sitzungen insgesamt realistisch sind, hängt von der Beschwerde ab und wird im Erstgespräch besprochen; eine ehrliche Einordnung dazu findest du auf der Seite <a href="/therapien/akupunktur/">Akupunktur</a>.</p>',
      },
    ],
  },
  {
    slug: 'sicherheit-nebenwirkungen',
    nav: 'Sicherheit & Nebenwirkungen',
    title: 'Sicherheit & Nebenwirkungen: häufige Fragen',
    metaDesc: 'Wie sicher ist Akupunktur? Häufige und seltene Nebenwirkungen, Hygiene, Schwangerschaft, Blutverdünner und wann du zuerst ärztlich abklären solltest.',
    h1: 'Sicherheit & Nebenwirkungen',
    lead: 'Was an Reaktionen normal ist, was selten vorkommt und in welchen Situationen zuerst die Ärztin drankommt. Ehrlich beantwortet.',
    answers: [
      {
        id: 'nebenwirkungen',
        q: 'Welche Nebenwirkungen hat Akupunktur?',
        a: '<p>Akupunktur durch ausgebildete Fachpersonen ist sehr sicher. Zwei grosse britische Untersuchungen mit zusammen über 66&#8217;000 Behandlungen fanden keine schwerwiegenden Zwischenfälle. Häufige, harmlose Reaktionen sind: kleine Blutergüsse an Einstichstellen, ein kurzer Schwindel beim Aufstehen, Müdigkeit nach der Sitzung und selten eine vorübergehende Verstärkung der Beschwerden. Mehr zu den zwei häufigsten Reaktionen: <a href="/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/">blaue Flecken</a> und <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">Müdigkeit</a>.</p>',
      },
      {
        id: 'hygiene',
        q: 'Werden die Nadeln mehrfach verwendet? Wie steht es um Hygiene?',
        a: '<p>Nein. Bei TCM.ch werden ausschliesslich sterile Einwegnadeln verwendet, die nach der Behandlung fachgerecht entsorgt werden. Das ist in der Schweiz Standard bei EMR- und ASCA-anerkannten Fachpersonen. Die Haut wird vor dem Nadeln nicht routinemässig desinfiziert wie vor einer Blutentnahme; bei intakter Haut ist das nach heutigem Kenntnisstand nicht nötig. Infektionen an Einstichstellen sind entsprechend sehr selten. Schwillt eine Stelle nach der Behandlung an, pocht oder entzündet sich, lass das ärztlich anschauen.</p>',
      },
      {
        id: 'schwangerschaft',
        q: 'Ist Akupunktur in der Schwangerschaft erlaubt?',
        a: '<p>Grundsätzlich ja, mit Anpassungen: Bestimmte Punkte werden in der Schwangerschaft gemieden, und die Behandlung wird zurückhaltender dosiert. Wichtig ist, dass du die Schwangerschaft von Anfang an erwähnst, auch eine mögliche. Akupunktur wird in der Schwangerschaft unter anderem bei Übelkeit, Rückenschmerzen und zur <a href="/wissen/akupunktur-geburtsvorbereitung-beckenendlage/">Geburtsvorbereitung</a> eingesetzt. Sie ersetzt keine gynäkologische Betreuung; bei Komplikationen in der Schwangerschaft gehört die Ärztin an erste Stelle.</p>',
      },
      {
        id: 'blutverduenner',
        q: 'Geht Akupunktur mit Blutverdünnern?',
        a: '<p>Meist ja, mit Anpassungen; entscheidend ist, dass deine Therapeutin davon weiss. Die ausführliche Antwort mit dem, was konkret angepasst wird, findest du unter <a href="/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/">Kann ich mit Blutverdünnern zur Akupunktur?</a></p>',
      },
      {
        id: 'kinder',
        q: 'Ist Akupunktur für Kinder geeignet?',
        a: '<p>Ja, in angepasster Form. Kinder werden kürzer und mit weniger Nadeln behandelt, oft kommen nadelfreie Techniken zum Einsatz: Akupressur, Laserakupunktur oder sanfte Tuina-Griffe. Ob eine Behandlung beim konkreten Anliegen sinnvoll ist, klärt das Erstgespräch, zu dem bei Kindern immer ein Elternteil dabei ist. Fieberhafte Infekte, unklare starke Schmerzen und andere akute Erkrankungen gehören zuerst in kinderärztliche Abklärung.</p>',
      },
      {
        id: 'wann-arzt',
        q: 'Wann sollte ich lieber zuerst zum Arzt?',
        a: '<p>Bei Warnzeichen wie plötzlichen starken Schmerzen, Lähmungen, Taubheit, Fieber mit unklarer Ursache, Brustschmerzen, Atemnot oder ungewolltem Gewichtsverlust: immer zuerst ärztlich abklären. TCM ersetzt in diesen Situationen keine Diagnostik. Die ausführliche Einordnung mit den wichtigsten Warnzeichen findest du unter <a href="/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/">Wann sollte ich zuerst zum Arzt?</a> Und ehrlich: Wenn wir im Erstgespräch den Eindruck haben, dass zuerst eine Abklärung nötig ist, sagen wir dir das.</p>',
      },
    ],
  },
  {
    slug: 'kosten-versicherung',
    nav: 'Kosten & Versicherung',
    title: 'Kosten & Versicherung: häufige Fragen',
    metaDesc: 'Übernimmt die Zusatzversicherung Akupunktur und TCM? Wie du das vorab prüfst, was eine Sitzung kostet und wie die Abrechnung in der Schweiz läuft.',
    h1: 'Kosten & Versicherung',
    lead: 'Was die Zusatzversicherung übernimmt, wie du das vor dem ersten Termin prüfst und wie die Abrechnung läuft.',
    answers: [
      {
        id: 'zusatzversicherung',
        q: 'Übernimmt die Zusatzversicherung die Kosten?',
        a: '<p>In den meisten Fällen ja: Mit einer Zusatzversicherung für Komplementärmedizin werden üblicherweise 80 bis 100 Prozent der Kosten übernommen, oft mit einem jährlichen Maximalbetrag. Voraussetzung ist, dass die behandelnde Fachperson EMR- oder ASCA-anerkannt ist; das ist bei TCM.ch an allen Standorten der Fall. Die Grundversicherung übernimmt TCM beim Therapeuten nicht. Details nach Kasse und Methode findest du unter <a href="/krankenkassen/">Krankenkassen &amp; TCM</a>.</p>',
      },
      {
        id: 'pruefen',
        q: 'Wie finde ich heraus, ob meine Versicherung zahlt?',
        a: '<p>Ein kurzer Anruf bei deiner Krankenkasse klärt es verbindlich. Stell drei Fragen: Habe ich eine Zusatzversicherung für Komplementärmedizin? Werden Behandlungen bei EMR- oder ASCA-anerkannten TCM-Therapeuten übernommen? Wie hoch sind Kostenanteil und Jahreslimite? Nenne dabei die Methode (z.&#8201;B. Akupunktur) und auf Nachfrage die EMR/ASCA-Nummer der Fachperson, die du von uns bekommst. So gibt es nach der Behandlung keine Überraschungen. Eine Übersicht nach Kassen findest du unter <a href="/krankenkassen/akupunktur/">Akupunktur &amp; Krankenkasse</a>.</p>',
      },
      {
        id: 'kosten',
        q: 'Was kostet eine Sitzung ohne Versicherung?',
        a: '<p>Die Kosten hängen von Methode und Dauer ab und werden pro Zeiteinheit abgerechnet; massgebend ist der Tarif der jeweiligen Praxis, den du vor der ersten Behandlung transparent erfährst. Als Orientierung: Eine Akupunktursitzung dauert 45 bis 60 Minuten, der erste Termin mit Erstgespräch etwas länger. Frag beim Vereinbaren des Termins nach dem konkreten Ansatz deines Standorts, dann kannst du die Kosten pro Sitzung und für eine realistische Behandlungsserie einschätzen.</p>',
      },
      {
        id: 'abrechnung',
        q: 'Wie läuft die Abrechnung ab?',
        a: '<p>Du erhältst nach der Behandlung eine Rechnung mit den nötigen Angaben für die Rückerstattung (Methode, Dauer, EMR/ASCA-Anerkennung). Diese reichst du bei deiner Krankenkasse ein, meist direkt in der App, und bekommst den versicherten Anteil zurückerstattet. Du bezahlst die Rechnung also zunächst selbst; eine direkte Abrechnung zwischen Praxis und Kasse gibt es bei Zusatzversicherungsleistungen in der Regel nicht.</p>',
      },
      {
        id: 'verordnung',
        q: 'Brauche ich für die Kostenübernahme eine ärztliche Verordnung?',
        a: '<p>Für TCM über die Zusatzversicherung: nein, in der Regel nicht. Einzelne Versicherer verlangen für bestimmte Leistungen eine Empfehlung, das erfährst du beim Anruf bei deiner Kasse. Anders bei der Physiotherapie: Sie läuft über die Grundversicherung und braucht immer eine ärztliche Verordnung. Was die Kassen im Detail übernehmen, hat unser Artikel <a href="/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026/">Krankenkasse und TCM: was wirklich übernommen wird</a> zusammengefasst.</p>',
      },
    ],
  },
  {
    slug: 'akupunktur',
    nav: 'Akupunktur',
    title: 'Akupunktur: häufige Fragen',
    metaDesc: 'Tut Akupunktur weh, wie viele Sitzungen braucht es, wie lange bleiben die Nadeln drin und was unterscheidet sie von Dry Needling? Kurz beantwortet.',
    h1: 'Fragen zur Akupunktur',
    lead: 'Die häufigsten Fragen zur meistgenutzten TCM-Methode, mit Links zu den ausführlichen Artikeln, wo es mehr zu sagen gibt.',
    answers: [
      {
        id: 'schmerzen',
        q: 'Tut Akupunktur weh?',
        a: '<p>Der Einstich ist meist kaum spürbar, danach kommt oft ein dumpfes Ziehen oder Wärmegefühl, das kein Schmerz ist. Die ausführliche Antwort mit dem, was du bei empfindlichen Punkten erwarten kannst, findest du unter <a href="/gesundheitsbibliothek/fragen/tut-akupunktur-weh/">Tut Akupunktur weh?</a></p>',
      },
      {
        id: 'sitzungen',
        q: 'Wie viele Sitzungen brauche ich?',
        a: '<p>Als grobe Orientierung: Bei akuten Beschwerden zeigen sich meist nach 4 bis 6 Sitzungen deutliche Verbesserungen; chronische Beschwerden brauchen in der Regel eine Serie von 8 bis 12 Sitzungen. Seriös lässt sich das erst nach dem Erstgespräch einschätzen, und eine gute Praxis überprüft nach den ersten Sitzungen ehrlich, ob es Fortschritte gibt. Mehr zum Behandlungsablauf steht auf der Seite <a href="/therapien/akupunktur/">Akupunktur</a>.</p>',
      },
      {
        id: 'nadeldauer',
        q: 'Wie lange bleiben die Nadeln drin?',
        a: '<p>In einer normalen Sitzung 20 bis 30 Minuten, bei der ersten Behandlung, bei Kindern oder empfindlichen Personen kürzer. Länger liegen lassen heisst nicht besser wirken. Warum das so ist und was Dauernadeln davon unterscheidet, erklärt der Artikel <a href="/wissen/wie-lange-bleiben-akupunkturnadeln-drin/">Wie lange bleiben Akupunkturnadeln drin?</a></p>',
      },
      {
        id: 'dry-needling',
        q: 'Was ist der Unterschied zwischen Akupunktur und Dry Needling?',
        a: '<p>Beide arbeiten mit denselben Nadeln, aber anders: Dry Needling zielt gezielt auf muskuläre Triggerpunkte und ist eine westliche Technik, Akupunktur arbeitet mit einem breiteren Punktesystem und einer eigenen Diagnostik. Für wen sich was eignet, vergleicht der Artikel <a href="/wissen/dry-needling-vs-akupunktur/">Dry Needling vs. Akupunktur</a>.</p>',
      },
      {
        id: 'wirkung-migraene',
        q: 'Hilft Akupunktur bei Migräne oder Spannungskopfschmerzen?',
        a: '<p>Akupunktur ist zur Vorbeugung von Migräne und Spannungskopfschmerzen vergleichsweise gut untersucht und wird in Leitlinien als mögliche ergänzende Option genannt; sie wirkt aber nicht bei allen. Eine ehrliche Einordnung, für wen sich ein Versuch lohnt, geben die Artikel <a href="/wissen/akupunktur-bei-kopfschmerzen/">Akupunktur bei Kopfschmerzen</a> und <a href="/wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/">Warum Akupunktur nicht für jeden mit Migräne ist</a>.</p>',
      },
      {
        id: 'elektro-dauernadeln',
        q: 'Was sind Elektroakupunktur und Dauernadeln?',
        a: '<p>Elektroakupunktur ergänzt die liegenden Nadeln mit einem schwachen Reizstrom, vor allem bei Schmerzbehandlungen. Dauernadeln sind winzige Nadeln, die mehrere Tage im Ohr bleiben und einen Dauerreiz geben, etwa bei Raucherentwöhnung. Beide sind in eigenen Artikeln erklärt: <a href="/wissen/elektroakupunktur-wirkung/">Elektroakupunktur</a> und <a href="/wissen/dauernadeln-akupunktur/">Dauernadeln</a>.</p>',
      },
    ],
  },
  {
    slug: 'schroepfen-methoden',
    nav: 'Schröpfen & weitere Methoden',
    title: 'Schröpfen & weitere Methoden: häufige Fragen',
    metaDesc: 'Wie lange bleiben Schröpfmale sichtbar, tut Schröpfen weh, was unterscheidet Tuina von Massage und was ist bei Kräutertherapie zu beachten?',
    h1: 'Schröpfen & weitere Methoden',
    lead: 'Fragen zu Schröpfen, Gua Sha, Tuina, Moxibustion und Kräutertherapie, kurz beantwortet und mit den ausführlichen Seiten verlinkt.',
    answers: [
      {
        id: 'schroepfmale',
        q: 'Wie lange bleiben Schröpfmale sichtbar?',
        a: '<p>Die runden Abdrücke verblassen in der Regel innert 3 bis 10 Tagen, je nach Hauttyp und Intensität der Behandlung. Sie sind keine klassischen Blutergüsse einer Verletzung und tun normalerweise nicht weh. Plane bei sichtbaren Stellen (Schultern, Nacken) allenfalls um Anlässe herum. Was die Färbung bedeutet und wann du eine Stelle anschauen lassen solltest, erklärt der Artikel <a href="/wissen/schroepfen-wirkung-flecken/">Schröpfen: Wirkung und Flecken</a>.</p>',
      },
      {
        id: 'schroepfen-schmerz',
        q: 'Tut Schröpfen weh?',
        a: '<p>Schröpfen zieht spürbar an der Haut, die meisten beschreiben es als intensiven, aber gut aushaltbaren Druck, ähnlich einer kräftigen Massage. Beim Gleitschröpfen über eingeölte Haut ist das Gefühl flächiger. Schmerzhaft sollte es nicht sein: Der Unterdruck lässt sich jederzeit anpassen, sag also, wenn es zu stark zieht. Nach der Behandlung kann sich die Stelle für ein bis zwei Tage empfindlich anfühlen wie nach Muskelkater.</p>',
      },
      {
        id: 'gua-sha',
        q: 'Was ist der Unterschied zwischen Gua Sha und Schröpfen?',
        a: '<p>Beide arbeiten an der Durchblutung von Haut und Muskulatur, aber mit anderer Technik: Beim Schröpfen zieht ein Unterdruck im Glas das Gewebe nach oben, bei <a href="/therapien/gua-sha/">Gua Sha</a> wird die eingeölte Haut mit einem abgerundeten Schaber bearbeitet. Beide können vorübergehende Hautrötungen oder Punkteinblutungen hinterlassen, die nach einigen Tagen verblassen. Welche Technik passt, entscheidet sich nach Beschwerde und Vorliebe, oft im selben Termin kombiniert.</p>',
      },
      {
        id: 'tuina',
        q: 'Was unterscheidet Tuina von einer klassischen Massage?',
        a: '<p><a href="/therapien/tuina/">Tuina</a> ist die manuelle Therapie der chinesischen Medizin: Sie kombiniert kräftige Massagegriffe mit Mobilisation von Gelenken und gezielter Arbeit an Druckpunkten und folgt einer eigenen Befunderhebung. Eine klassische Massage arbeitet primär entspannend an der Muskulatur. In der Praxis überschneiden sich die Techniken; welche Form die Zusatzversicherung übernimmt, hängt von der Anerkennung der Fachperson ab, siehe <a href="/krankenkassen/massage/">Massage &amp; Krankenkasse</a>.</p>',
      },
      {
        id: 'moxibustion',
        q: 'Was ist Moxibustion und riecht das nicht stark?',
        a: '<p><a href="/therapien/moxibustion/">Moxibustion</a> ist eine Wärmebehandlung: Über Akupunkturpunkten wird getrockneter Beifuss abgebrannt, ohne die Haut zu berühren, meist als Moxa-Zigarre oder auf der Nadel. Die Wärme dringt spürbar in die Tiefe. Ja, es entsteht ein charakteristischer, rauchiger Geruch; die Praxen lüften entsprechend, und es gibt raucharme Varianten. Bei Brandempfindlichkeit oder Atemwegserkrankungen wird die Technik angepasst oder ersetzt.</p>',
      },
      {
        id: 'kraeuter-medikamente',
        q: 'Darf ich chinesische Kräuter neben meinen Medikamenten nehmen?',
        a: '<p>Nicht ohne Rücksprache. Kräuterrezepturen können mit Medikamenten wechselwirken, besonders relevant bei Blutverdünnern, Immunsuppressiva und in der Schwangerschaft. Deshalb gehört zur seriösen <a href="/therapien/kraeutertherapie/">Kräutertherapie</a> immer die vollständige Medikamentenliste ins Erstgespräch, und im Zweifel die Absprache mit der behandelnden Ärztin. Bei TCM.ch werden ausschliesslich geprüfte Rezepturen aus Schweizer Apotheken verwendet.</p>',
      },
    ],
  },
];

export const fragen: Frage[] = [
  {
    slug: 'tut-akupunktur-weh',
    question: 'Tut Akupunktur weh?',
    title: 'Tut Akupunktur weh? Was du wirklich spürst',
    metaDesc: 'Der Einstich ist meist kaum spürbar, danach folgt oft ein dumpfes Ziehen oder Wärmegefühl. Was bei Akupunktur normal ist und was du sagen solltest.',
    kurz: '<p>Meist nicht. Der Einstich selbst ist mit den haarfeinen Nadeln kaum spürbar, deutlich weniger als eine Blutentnahme oder Impfung. Danach entsteht an manchen Punkten ein dumpfes Ziehen, Wärme- oder Schweregefühl. Das ist kein Schmerz, sondern eine erwartete Empfindung. Richtig weh tun sollte Akupunktur nicht; wenn ein Punkt schmerzt, sag es, die Nadel wird korrigiert.</p>',
    bodyHtml: '<h2>Was du normalerweise spürst</h2>\n<p>Akupunkturnadeln sind mit 0,2 bis 0,3 Millimetern Durchmesser um ein Mehrfaches dünner als Injektionsnadeln und massiv statt hohl. Der Einstich durch die Haut ist deshalb meist ein kurzer, feiner Reiz, den viele gar nicht wahrnehmen. Interessanter ist, was danach kommt: An gut getroffenen Punkten entsteht oft ein dumpfes Ziehen, ein Druck-, Wärme- oder Schweregefühl, das nach wenigen Sekunden nachlässt oder in ein neutrales Gefühl übergeht. Während der 20 bis 30 Minuten Liegezeit spüren die meisten die Nadeln kaum noch, viele entspannen dabei stark oder schlafen ein.</p>\n<h2>Wovon es abhängt</h2>\n<p>Manche Körperstellen sind empfindlicher als andere: Hände, Füsse und Ohren spürst du mehr als Rücken oder Beine. Auch Tagesform, Anspannung und die individuelle Schmerzempfindlichkeit spielen mit; wer angespannt auf den Einstich wartet, spürt mehr. Bei der ersten Behandlung wird deshalb bewusst vorsichtig dosiert: weniger Nadeln, sanftere Stimulation. Sag deiner Therapeutin, wenn du nadelempfindlich bist; es gibt für fast jede Situation eine angepasste Technik, bei Bedarf auch nadelfreie Alternativen wie <a href="/therapien/akupressur/">Akupressur</a>.</p>\n<h2>Was du selbst tun kannst</h2>\n<p>Komm nicht nüchtern, atme beim Setzen der Nadeln ruhig weiter und melde dich sofort, wenn ein Punkt unangenehm bleibt statt nachzulassen. Eine liegende Nadel, die drückt oder brennt, wird einfach minimal korrigiert oder entfernt; das ist Routine und kein Grund, die Zähne zusammenzubeissen.</p>\n<h2>Wann du es ansprechen solltest</h2>\n<p>Scharfer, elektrisierender oder ausstrahlender Schmerz beim Einstich ist nicht normal; sag es sofort, die Nadel wird umplatziert. Schmerzt eine Einstichstelle nach der Behandlung länger, schwillt an oder entzündet sich, lass es in der Praxis oder ärztlich anschauen. Das ist selten, gehört aber angeschaut.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/', label: 'Sind blaue Flecken nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/', label: 'Ist Müdigkeit nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur/', label: 'Alle Fragen zur Akupunktur' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/wissen/wie-lange-bleiben-akupunkturnadeln-drin/', label: 'Wie lange bleiben die Nadeln drin?', cat: 'Artikel' },
      { href: '/therapien/akupressur/', label: 'Akupressur (ohne Nadeln)', cat: 'Therapie' },
    ],
  },
  {
    slug: 'muedigkeit-nach-akupunktur',
    question: 'Ist Müdigkeit nach Akupunktur normal?',
    title: 'Müdigkeit nach Akupunktur: normal oder nicht?',
    metaDesc: 'Müdigkeit nach einer Akupunktursitzung ist eine häufige, harmlose Reaktion und klingt meist bis am nächsten Tag ab. Was dahintersteckt und wann nicht.',
    kurz: '<p>Ja, Müdigkeit nach einer Akupunktursitzung ist eine der häufigsten Reaktionen und in aller Regel harmlos. Sie tritt oft direkt nach der Behandlung auf, kann einige Stunden anhalten und ist spätestens am nächsten Tag vorbei. Viele empfinden sie als angenehme, tiefe Entspanntheit. Plane nach der Sitzung darum keine Höchstleistungen ein.</p>',
    bodyHtml: '<h2>Was normalerweise zu erwarten ist</h2>\n<p>Nach der Behandlung fühlen sich viele Menschen entspannt bis deutlich müde, manche beschreiben es als wohlige Schwere. Das passt zu dem, was während der Sitzung passiert: Du liegst 20 bis 30 Minuten ruhig, der Körper schaltet in den Erholungsmodus, und die Nadelreize beschäftigen das Nervensystem. Die Müdigkeit ist bei den ersten Sitzungen oft am stärksten und wird im Verlauf einer Behandlungsserie meist schwächer.</p>\n<h2>Wovon es abhängt</h2>\n<p>Stärker müde werden erfahrungsgemäss Menschen, die erschöpft oder gestresst in die Behandlung kommen, nüchtern waren oder intensiv behandelt wurden (viele Nadeln, starke Stimulation, Elektroakupunktur). Auch nach Schröpfen oder Tuina ist Müdigkeit verbreitet. Deine Therapeutin passt die Dosierung an, wenn dich die Reaktion stört; das ist einer der Gründe, warum die erste Sitzung bewusst zurückhaltend ist.</p>\n<h2>Was du selbst tun kannst</h2>\n<p>Gib der Müdigkeit nach: Plane nach dem Termin nichts Anstrengendes, verschiebe hartes Training auf den Folgetag, trink genug und iss vor der Behandlung eine leichte Mahlzeit. Wenn du unsicher bist, wie dein Körper auf die erste Sitzung reagiert, organisiere den Heimweg ohne eigenes Auto.</p>\n<h2>Wann du ärztlichen Rat suchen solltest</h2>\n<p>Müdigkeit, die länger als ein bis zwei Tage anhält, sich über die Sitzungen verstärkt oder von Symptomen wie Fieber, Atemnot, starkem Schwindel oder Herzrasen begleitet wird, ist kein normaler Behandlungseffekt. Sprich das in der Praxis an und lass es bei Bedarf ärztlich abklären. Anhaltende Erschöpfung unabhängig von der Behandlung hat eigene Ursachen, siehe <a href="/beschwerden/erschoepfung/">Erschöpfung</a>.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
      { href: '/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/', label: 'Sind blaue Flecken nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Alle Fragen zu «Nach der Behandlung»' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/beschwerden/erschoepfung/', label: 'Erschöpfung', cat: 'Beschwerde' },
      { href: '/wissen/muedigkeit-im-herbst/', label: 'Müdigkeit im Herbst', cat: 'Artikel' },
    ],
  },
  {
    slug: 'blaue-flecken-nach-akupunktur',
    question: 'Sind blaue Flecken nach Akupunktur normal?',
    title: 'Blaue Flecken nach Akupunktur: harmlos oder nicht?',
    metaDesc: 'Kleine Blutergüsse an Einstichstellen gehören zu den häufigsten Reaktionen auf Akupunktur und verschwinden von selbst. Wann du genauer hinschauen solltest.',
    kurz: '<p>Ja. Kleine blaue Flecken an einzelnen Einstichstellen gehören zu den häufigsten Begleiterscheinungen der Akupunktur und sind harmlos: Die Nadel hat ein winziges Hautgefäss gestreift. Sie verschwinden wie jeder kleine Bluterguss von selbst innert einigen Tagen bis zwei Wochen und brauchen keine Behandlung.</p>',
    bodyHtml: '<h2>Warum blaue Flecken entstehen</h2>\n<p>Unter der Haut verläuft ein dichtes Netz feinster Blutgefässe, das auch die erfahrenste Fachperson nicht sehen kann. Trifft die Nadel eines davon, tritt etwas Blut ins Gewebe aus: Es entsteht ein kleiner, meist münzgrosser oder kleinerer Fleck, manchmal mit einer leichten Schwellung direkt nach dem Entfernen der Nadel. Das sagt nichts über die Qualität der Behandlung aus und ist kein Grund zur Sorge.</p>\n<h2>Wovon es abhängt</h2>\n<p>Häufiger blaue Flecken bekommen Menschen mit empfindlichem Bindegewebe, dünner Haut (etwa im Alter) und alle, die blutverdünnende Medikamente nehmen, auch niedrig dosiertes Aspirin. An gut durchbluteten Stellen wie Händen, Gesicht und Ohren passiert es eher als am Rücken. Wenn du <a href="/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/">Blutverdünner</a> nimmst, sag es vor der Behandlung; die Technik wird dann angepasst.</p>\n<h2>Was du selbst tun kannst</h2>\n<p>Nichts Besonderes nötig. Direkt nach der Behandlung hilft kurzes Drücken auf eine nachblutende Stelle, das macht die Therapeutin bereits. Ein frischer Fleck lässt sich kurz kühlen. Danach heisst es abwarten: Der Fleck wechselt wie jeder Bluterguss über Tage die Farbe von blau-violett zu grünlich-gelb und verschwindet.</p>\n<h2>Wann du ärztlichen Rat suchen solltest</h2>\n<p>Genauer hinschauen solltest du, wenn eine Stelle stark anschwillt, zunehmend schmerzt, heiss wird oder sich entzündet, wenn ein Bluterguss ungewöhnlich gross wird oder wenn du nach jeder Behandlung auffallend viele und grosse Flecken bekommst, ohne Blutverdünner zu nehmen. Letzteres kann auf eine erhöhte Blutungsneigung hinweisen und gehört einmal ärztlich abgeklärt.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/', label: 'Kann ich mit Blutverdünnern zur Akupunktur?' },
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Alle Fragen zu Sicherheit & Nebenwirkungen' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/wissen/schroepfen-wirkung-flecken/', label: 'Schröpfmale: was die Flecken bedeuten', cat: 'Artikel' },
    ],
  },
  {
    slug: 'akupunktur-blutverduenner',
    question: 'Kann ich mit Blutverdünnern zur Akupunktur?',
    title: 'Akupunktur mit Blutverdünnern: geht das?',
    metaDesc: 'Akupunktur ist auch mit Blutverdünnern meist möglich, wenn die Therapeutin es weiss und die Technik anpasst. Was angepasst wird und wo Grenzen liegen.',
    kurz: '<p>Meistens ja. Akupunktur gilt auch unter blutverdünnenden Medikamenten als durchführbar, weil die Nadeln haarfein sind und kaum Blutungen verursachen. Entscheidend ist, dass deine Therapeutin von den Medikamenten weiss: Sie passt dann Technik und Punktwahl an. Blutige Verfahren wie Blutschröpfen sind unter Blutverdünnern dagegen tabu. Setze Medikamente niemals für eine Behandlung ab.</p>',
    bodyHtml: '<h2>Was normalerweise zu erwarten ist</h2>\n<p>Mit Blutverdünnern, ob Aspirin cardio, Marcoumar oder moderne Gerinnungshemmer wie Eliquis oder Xarelto, ist das Hauptthema nicht die Sicherheit der Akupunktur an sich, sondern eine erhöhte Neigung zu <a href="/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/">blauen Flecken</a> an den Einstichstellen. Ernsthafte Blutungen durch Akupunkturnadeln sind bei fachgerechter Behandlung sehr selten. Die Therapeutin arbeitet unter Blutverdünnern zurückhaltender: weniger Nadeln, oberflächlichere Stichtiefe, Verzicht auf stark durchblutete oder schwer komprimierbare Stellen, längeres Abdrücken nach dem Entfernen der Nadeln.</p>\n<h2>Was nicht geht</h2>\n<p>Blutschröpfen (Hijama) und andere Techniken, bei denen die Haut gezielt verletzt wird, kommen unter Blutverdünnern nicht infrage. Auch intensives Schröpfen und Gua Sha werden zurückhaltender dosiert oder ersetzt, weil sie stärkere Einblutungen hinterlassen können. Bei chinesischer Kräutertherapie ist zusätzlich Vorsicht geboten: Einzelne Kräuter können die Wirkung von Gerinnungshemmern verändern, deshalb gehört die vollständige Medikamentenliste ins Erstgespräch und im Zweifel die Rücksprache mit der verordnenden Ärztin.</p>\n<h2>Was du selbst tun kannst</h2>\n<p>Nenne im Erstgespräch alle Medikamente mit Dosierung, auch rezeptfreies Aspirin. Ändere die Einnahme niemals selbstständig wegen einer TCM-Behandlung; das Blutungs- und Thromboserisiko einer Medikamentenpause ist um ein Vielfaches relevanter als ein blauer Fleck. Beobachte nach den ersten Behandlungen, wie deine Haut reagiert, und melde auffällige Blutergüsse in der Praxis.</p>\n<h2>Wann du ärztlichen Rat suchen solltest</h2>\n<p>Bei ungewöhnlich grossen oder schmerzhaften Blutergüssen nach einer Behandlung, bei Nachbluten, das sich nicht durch kurzes Drücken stoppen lässt, oder wenn sich eine Einstichstelle entzündet. Und grundsätzlich: Wenn deine Gerinnungswerte instabil eingestellt sind, kläre mit deiner Ärztin, ob der Zeitpunkt für eine Behandlungsserie passt.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/', label: 'Sind blaue Flecken nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann sollte ich zuerst zum Arzt?' },
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Alle Fragen zu Sicherheit & Nebenwirkungen' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/kraeutertherapie/', label: 'Kräutertherapie', cat: 'Therapie' },
      { href: '/beschwerden/durchblutungsstoerungen/', label: 'Durchblutungsstörungen', cat: 'Beschwerde' },
    ],
  },
  {
    slug: 'was-passiert-beim-ersten-termin',
    question: 'Was passiert beim ersten Termin?',
    title: 'Erster TCM-Termin: So läuft er ab',
    metaDesc: 'Erstgespräch, Puls- und Zungendiagnostik, erste Behandlung: was in den 60 bis 75 Minuten deines ersten TCM-Termins passiert, Schritt für Schritt.',
    kurz: '<p>Der erste Termin dauert 60 bis 75 Minuten und besteht aus drei Teilen: einem ausführlichen Gespräch über deine Beschwerden und Krankengeschichte, der Untersuchung mit Puls- und Zungendiagnostik und meist bereits einer ersten, bewusst zurückhaltend dosierten Behandlung. Am Ende weisst du, ob und wie eine Behandlung bei dir sinnvoll ist und mit wie vielen Sitzungen du rechnen kannst.</p>',
    bodyHtml: '<h2>Teil 1: das Gespräch</h2>\n<p>Den grössten Teil des ersten Termins macht die Anamnese aus. Deine Therapeutin fragt nach deinen aktuellen Beschwerden, aber auch nach Dingen, die auf den ersten Blick nichts damit zu tun haben: Schlaf, Verdauung, Energie im Tagesverlauf, Kälte- oder Wärmeempfinden, bei Frauen der Zyklus. Diese Muster gehören zur TCM-Befunderhebung. Dazu kommen Krankengeschichte, bisherige Abklärungen und deine vollständige Medikamentenliste. Mitgebrachte Befunde und Berichte sind willkommen.</p>\n<h2>Teil 2: die Untersuchung</h2>\n<p>Typisch für die TCM sind zwei kurze, völlig schmerzfreie Untersuchungen: das Tasten des Pulses an beiden Handgelenken und ein Blick auf die Zunge. Beides liefert der Therapeutin Hinweise für die Wahl der Behandlungspunkte und -methoden. Je nach Beschwerde kommen einfache körperliche Untersuchungen dazu, etwa das Abtasten verspannter Muskulatur.</p>\n<h2>Teil 3: die erste Behandlung</h2>\n<p>In den meisten Fällen wird beim ersten Termin bereits behandelt, bewusst vorsichtig: weniger Nadeln, kürzere Liegezeit, sanfte Dosierung. So zeigt sich, wie dein Körper reagiert, bevor bei den Folgeterminen gesteigert wird. Ob Akupunktur, Schröpfen, Tuina oder eine Kombination zum Einsatz kommt, besprecht ihr vorher; nichts passiert unangekündigt. Ob die Nadeln wehtun, beantworten wir <a href="/gesundheitsbibliothek/fragen/tut-akupunktur-weh/">hier ehrlich</a>.</p>\n<h2>Und danach?</h2>\n<p>Zum Abschluss bekommst du eine ehrliche Einschätzung: ob eine Behandlung bei deiner Beschwerde sinnvoll ist, mit wie vielen Sitzungen du rechnen kannst und ob zuerst eine ärztliche Abklärung gehört. Plane für den Rest des Tages nichts Anstrengendes ein, manche sind nach der ersten Behandlung <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">müde</a>. Was du vorher zu Kleidung, Essen und Unterlagen wissen musst, steht unter <a href="/gesundheitsbibliothek/fragen/erster-termin/">Erster Termin &amp; Vorbereitung</a>.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung: alle Fragen' },
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
      { href: '/gesundheitsbibliothek/fragen/kosten-versicherung/', label: 'Kosten & Versicherung: alle Fragen' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/standorte/', label: 'Praxis in deiner Nähe', cat: 'Standorte' },
      { href: '/krankenkassen/', label: 'Krankenkassen & TCM', cat: 'Krankenkasse' },
    ],
  },
  {
    slug: 'wann-zuerst-zum-arzt',
    question: 'Wann sollte ich zuerst zum Arzt?',
    title: 'TCM oder zuerst zum Arzt? Die ehrliche Antwort',
    metaDesc: 'Bei bestimmten Warnzeichen gehört die ärztliche Abklärung vor jede TCM-Behandlung. Die wichtigsten Red Flags und wie seriöse Praxen damit umgehen.',
    kurz: '<p>Immer dann, wenn Warnzeichen im Spiel sind: plötzliche starke Schmerzen, Lähmungen oder Taubheit, unklares Fieber, Brustschmerzen, Atemnot, ungewollter Gewichtsverlust, Blut im Stuhl oder Urin, neu aufgetretene starke Kopfschmerzen. TCM ist eine Ergänzung zur Medizin, kein Ersatz für Diagnostik. Eine seriöse Praxis erkennt solche Situationen im Erstgespräch und schickt dich zuerst zur Abklärung.</p>',
    bodyHtml: '<h2>Warum die Reihenfolge wichtig ist</h2>\n<p>Eine TCM-Behandlung setzt voraus, dass klar ist, was behandelt wird und dass nichts Gefährliches dahintersteckt. Bei muskulären Verspannungen, funktionellen Verdauungsbeschwerden oder Stressfolgen ist der direkte Weg in die TCM-Praxis unproblematisch. Bei Beschwerden, die auch Zeichen einer ernsthaften Erkrankung sein können, muss die ärztliche Diagnostik zuerst kommen; danach kann TCM oft sinnvoll begleiten.</p>\n<h2>Die wichtigsten Warnzeichen</h2>\n<div class="wa-callout"><div class="wa-callout-label">Zuerst ärztlich abklären</div><p>Plötzliche, sehr starke Schmerzen (Kopf, Brust, Bauch). Lähmungen, Taubheitsgefühle, Seh- oder Sprachstörungen. Brustschmerzen oder Atemnot. Fieber ohne klare Ursache oder mit Nackensteifigkeit. Ungewollter Gewichtsverlust oder Nachtschweiss über Wochen. Blut im Stuhl, Urin oder Auswurf. Beschwerden nach einem Unfall. Neu aufgetretene starke Kopfschmerzen ab etwa 50 Jahren. Knoten oder Schwellungen, die wachsen.</p></div>\n<p>Diese Liste ersetzt keine Triage; im Zweifel gilt: lieber einmal zu viel abklären. Bei akuten Notfällen wie Brustschmerz mit Atemnot oder Lähmungserscheinungen zählt der Notruf 144, nicht der Praxistermin.</p>\n<h2>Wie seriöse TCM-Praxen damit umgehen</h2>\n<p>Zum Erstgespräch gehört genau diese Einordnung: Deine Therapeutin fragt Warnzeichen aktiv ab und sagt dir ehrlich, wenn zuerst eine ärztliche Abklärung nötig ist oder eine Behandlung bei dir wenig Aussicht hat. Viele unserer Patientinnen und Patienten kommen umgekehrt mit einer bestehenden Diagnose und nutzen TCM ergänzend zur schulmedizinischen Behandlung; das ist der Normalfall, nicht die Ausnahme.</p>\n<h2>Unsicher, wo du stehst?</h2>\n<p>Wenn du ein Symptom noch nicht einordnen kannst, helfen die <a href="/koerpersignale/">Körpersignale</a>-Seiten: Sie erklären häufige Beschwerdemuster und nennen bei jedem die Zeichen, die abgeklärt gehören. Bei bekannter Diagnose findest du auf den <a href="/beschwerden/">Beschwerden-Seiten</a>, was TCM ergänzend leisten kann.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Sicherheit & Nebenwirkungen: alle Fragen' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/', label: 'Kann ich mit Blutverdünnern zur Akupunktur?' },
    ],
    mehr: [
      { href: '/koerpersignale/', label: 'Körpersignale einordnen', cat: 'Körpersignale' },
      { href: '/beschwerden/', label: 'Beschwerden A–Z', cat: 'Beschwerden' },
      { href: '/gesundheitsbibliothek/', label: 'Gesundheitsbibliothek', cat: 'Bibliothek' },
    ],
  },
];

export const fragenHubBySlug = (slug: string) => fragenHubs.find((h) => h.slug === slug);
export const frageBySlug = (slug: string) => fragen.find((f) => f.slug === slug);

// Rückverlinkung Therapie-Seite -> passende Patientenfragen (kuratiert, kein Stuffing).
const FRAGEN_FOR_THERAPIE: Record<string, { href: string; label: string }[]> = {
  akupunktur: [
    { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
    { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
    { href: '/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/', label: 'Ist Müdigkeit danach normal?' },
    { href: '/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/', label: 'Sind blaue Flecken normal?' },
    { href: '/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/', label: 'Geht das mit Blutverdünnern?' },
  ],
  schroepfen: [
    { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/', label: 'Fragen zu Schröpfen & Methoden' },
    { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Was gilt nach der Behandlung?' },
    { href: '/gesundheitsbibliothek/fragen/kosten-versicherung/', label: 'Kosten & Versicherung' },
  ],
  tuina: [
    { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/#tuina', label: 'Tuina oder klassische Massage?' },
    { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung' },
    { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Was gilt nach der Behandlung?' },
  ],
  kraeutertherapie: [
    { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/#kraeuter-medikamente', label: 'Kräuter neben Medikamenten?' },
    { href: '/gesundheitsbibliothek/fragen/kosten-versicherung/', label: 'Kosten & Versicherung' },
    { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann zuerst zum Arzt?' },
  ],
  moxibustion: [
    { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/#moxibustion', label: 'Was ist Moxibustion genau?' },
    { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung' },
    { href: '/gesundheitsbibliothek/fragen/kosten-versicherung/', label: 'Kosten & Versicherung' },
  ],
};

// Beschwerde-Seite -> Patientenfragen, nur wo die Beziehung stark ist (Akupunktur-geführte
// Beschwerdebilder mit hoher Termin-Friktion). Bewusst NICHT auf jeder Beschwerde.
const FRAGEN_FOR_BESCHWERDE: Record<string, { href: string; label: string }[]> = {
  migraene: [
    { href: '/gesundheitsbibliothek/fragen/akupunktur/#sitzungen', label: 'Wie viele Behandlungen braucht man?' },
    { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
    { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
  ],
  kopfschmerzen: [
    { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
    { href: '/gesundheitsbibliothek/fragen/akupunktur/#sitzungen', label: 'Wie viele Behandlungen braucht man?' },
  ],
  spannungskopfschmerzen: [
    { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
    { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
  ],
  nackenschmerzen: [
    { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
    { href: '/gesundheitsbibliothek/fragen/akupunktur/#sitzungen', label: 'Wie viele Behandlungen braucht man?' },
    { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
  ],
  rueckenschmerzen: [
    { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
    { href: '/gesundheitsbibliothek/fragen/akupunktur/#sitzungen', label: 'Wie viele Behandlungen braucht man?' },
    { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
  ],
  schlafprobleme: [
    { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
    { href: '/gesundheitsbibliothek/fragen/kosten-versicherung/', label: 'Übernimmt die Zusatzversicherung die Kosten?' },
  ],
};

const escFr = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function fragenChipsHtml(links: { href: string; label: string }[]): string {
  if (!links.length) return '';
  const chips = links.map((l) => `<a href="${l.href}" class="cl-chip">${escFr(l.label)}</a>`).join('');
  return (
    `<section class="section cl-related" style="background:#fff;padding:32px 0">` +
    `<div class="wrap reveal">` +
    `<div class="section-label">Patientenfragen</div>` +
    `<h2 class="section-title">Häufige Fragen vor der Behandlung</h2>` +
    `<div class="cl-links">${chips}<a href="/gesundheitsbibliothek/fragen/" class="cl-chip">Alle Fragen →</a></div>` +
    `</div></section>`
  );
}

/** Dezenter Link-Block "Häufige Patientenfragen" für Therapie-Seiten (bestehende .cl-*-Klassen). */
export function fragenLinksHtml(therapieSlug: string): string {
  return fragenChipsHtml(FRAGEN_FOR_THERAPIE[therapieSlug] ?? []);
}

/** Gleicher Block für Beschwerde-Seiten; leer, wenn nichts kuratiert ist. */
export function fragenLinksForBeschwerdeHtml(beschwerdeSlug: string): string {
  return fragenChipsHtml(FRAGEN_FOR_BESCHWERDE[beschwerdeSlug] ?? []);
}
