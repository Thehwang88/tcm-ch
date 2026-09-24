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
        a: '<p>Rechne mit 60 bis 75 Minuten. Der erste Termin ist länger als die Folgetermine, weil ein ausführliches Gespräch dazugehört: deine Beschwerden, deine Krankengeschichte, Medikamente, Schlaf, Verdauung. Danach folgen die Untersuchung mit Puls- und Zungendiagnostik und meist bereits eine erste Behandlung. Folgetermine dauern in der Regel 45 bis 60 Minuten. Was genau passiert, liest du unter <a href="/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/">Was passiert beim ersten Termin?</a> Mehr zur Termindauer generell: <a href="/gesundheitsbibliothek/fragen/wie-lange-dauert-akupunktur/">Wie lange dauert Akupunktur?</a></p>',
      },
      {
        id: 'mitbringen',
        q: 'Was soll ich mitbringen?',
        a: '<p>Deine Versichertenkarte und, falls vorhanden, relevante medizinische Unterlagen: aktuelle Befunde, Röntgen- oder MRT-Berichte, eine Medikamentenliste. Nichts davon ist Pflicht, aber je vollständiger das Bild, desto gezielter die Behandlung. Wenn du Blutverdünner oder andere dauerhafte Medikamente nimmst, sag das unbedingt im Erstgespräch, am einfachsten mit der Liste. Eine ärztliche Überweisung brauchst du nicht.</p>',
      },
      {
        id: 'kleidung',
        q: 'Was soll ich anziehen?',
        a: '<p>Bequeme Kleidung, die sich leicht hochschieben lässt: Viele Akupunkturpunkte liegen an Unterarmen, Unterschenkeln, Rücken und Bauch. Du musst dich nicht komplett ausziehen; für die meisten Behandlungen reicht es, einzelne Körperstellen freizulegen. Für Rückenbehandlungen wie Schröpfen oder Tuina wird der Oberkörper teilweise frei gemacht, du wirst dabei zugedeckt, wo gerade nicht behandelt wird. Ausführlicher: <a href="/gesundheitsbibliothek/fragen/kleidung-akupunktur/">Was soll ich zur Akupunktur anziehen?</a></p>',
      },
      {
        id: 'essen',
        q: 'Muss ich nüchtern kommen? Darf ich vorher essen?',
        a: '<p>Du sollst nicht nüchtern kommen. Ideal ist eine leichte Mahlzeit ein bis zwei Stunden vor dem Termin. Mit ganz leerem Magen steigt das Risiko für Kreislaufreaktionen während der Behandlung, mit sehr vollem Magen liegt es sich unbequem. Auch genug trinken hilft. Alkohol vor der Behandlung ist keine gute Idee. Ausführlicher: <a href="/gesundheitsbibliothek/fragen/essen-vor-akupunktur/">Essen vor Akupunktur</a>.</p>',
      },
      {
        id: 'ueberweisung',
        q: 'Brauche ich eine Überweisung vom Arzt?',
        a: '<p>Nein. Für TCM-Behandlungen über die Zusatzversicherung brauchst du keine ärztliche Überweisung, du kannst direkt einen Termin vereinbaren. Die Ausnahme ist Physiotherapie: Sie läuft über die Grundversicherung und braucht eine ärztliche Verordnung. Wichtig ist nur, dass deine Therapeutin oder dein Therapeut EMR- oder ASCA-anerkannt ist, sonst zahlt die Zusatzversicherung nicht. Bei TCM.ch ist das an allen Standorten der Fall. Ausführlicher inklusive Kassenfrage: <a href="/gesundheitsbibliothek/fragen/ueberweisung-akupunktur/">Brauche ich eine Überweisung?</a></p>',
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
        a: '<p>Leichte Bewegung wie Spazieren ist jederzeit gut. Intensives Training verschiebst du besser auf den nächsten Tag: Der Körper reagiert auf die Behandlung, viele fühlen sich danach entspannt bis müde, und ein hartes Training arbeitet dagegen. Nach Schröpfen oder Gua Sha ist die behandelte Muskulatur zudem stärker durchblutet und kann empfindlich sein. Faustregel: Am Behandlungstag runterfahren, ab dem Folgetag wie gewohnt. Ausführlicher mit allen Abwägungen: <a href="/gesundheitsbibliothek/fragen/sport-nach-akupunktur/">Sport nach Akupunktur</a>.</p>',
      },
      {
        id: 'sauna',
        q: 'Sind Sauna, Schwimmbad oder heisses Bad erlaubt?',
        a: '<p>Am Behandlungstag besser nicht. Nach Akupunktur sind die Einstichstellen winzige Wunden, die ein paar Stunden Ruhe verdienen; Schwimmbadwasser und starkes Schwitzen sind da unnötige Reize. Nach Schröpfen gilt das noch mehr, weil die Haut stärker beansprucht ist. Duschen ist kein Problem. Mit Dauernadeln im Ohr solltest du Schwimmbad und Sauna ganz meiden, bis sie entfernt sind. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/schwimmen-nach-akupunktur/">Schwimmen nach Akupunktur</a>.</p>',
      },
      {
        id: 'alkohol',
        q: 'Darf ich nach der Behandlung Alkohol trinken?',
        a: '<p>Verzichte am Behandlungstag besser darauf. Alkohol belastet den Kreislauf, und der ist nach einer Behandlung bei manchen ohnehin etwas gedämpft. Dasselbe gilt für sehr viel Kaffee direkt danach. Viel Wasser oder Tee trinken ist dagegen sinnvoll, die meisten empfinden das nach der Behandlung als angenehm. Ausführlicher: <a href="/gesundheitsbibliothek/fragen/alkohol-nach-akupunktur/">Alkohol nach Akupunktur</a>.</p>',
      },
      {
        id: 'autofahren',
        q: 'Kann ich nach der Behandlung Auto fahren?',
        a: '<p>In der Regel ja. Die meisten fühlen sich nach der Behandlung klar und fahrtüchtig. Bist du nach der ersten Sitzung unsicher, wie dein Körper reagiert, plane den Heimweg ohne Auto oder mit etwas Puffer: Selten kommt es direkt nach der Behandlung zu kurzem Schwindel oder ausgeprägter Müdigkeit. Sag deiner Therapeutin, wenn dir nach dem Aufstehen flau ist; ein paar Minuten Sitzen lösen das meist.</p>',
      },
      {
        id: 'erstverschlimmerung',
        q: 'Meine Beschwerden sind nach der Behandlung kurz stärker. Ist das normal?',
        a: '<p>Mit „Erstverschlimmerung“ beschreiben manche Patient:innen eine vorübergehende Veränderung ihrer Beschwerden nach einer Behandlung. Leichte Müdigkeit, lokale Empfindlichkeit oder ein kurzfristiges Schwanken bereits bestehender Beschwerden können vorkommen. Eine deutliche, anhaltende oder neue Verschlechterung sollte jedoch nicht pauschal als normale Erstreaktion eingeordnet werden. Wenn Beschwerden ungewöhnlich stark sind, länger anhalten oder neue Symptome auftreten, melde dich bei der behandelnden Praxis oder lass sie medizinisch abklären. Speziell zu stärkeren Schmerzen: <a href="/gesundheitsbibliothek/fragen/schmerzen-nach-akupunktur-schlimmer/">Nach Akupunktur mehr Schmerzen?</a></p>',
      },
      {
        id: 'abstaende',
        q: 'Wie viel Abstand liegt zwischen den Sitzungen?',
        a: '<p>Üblich ist zu Beginn eine Sitzung pro Woche, bei akuten Beschwerden manchmal zwei. Wird es besser, werden die Abstände grösser: alle zwei Wochen, dann nach Bedarf. Wie viele Sitzungen insgesamt realistisch sind, hängt von der Beschwerde ab und wird im Erstgespräch besprochen; eine ehrliche Einordnung dazu findest du auf der Seite <a href="/therapien/akupunktur/">Akupunktur</a> und unter <a href="/gesundheitsbibliothek/fragen/wie-oft-akupunktur/">Wie oft braucht man Akupunktur?</a></p>',
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
        a: '<p>Akupunktur durch ausgebildete Fachpersonen ist sehr sicher. Zwei grosse britische Untersuchungen mit zusammen über 66&#8217;000 Behandlungen fanden keine schwerwiegenden Zwischenfälle. Häufige, harmlose Reaktionen sind: kleine Blutergüsse an Einstichstellen, ein kurzer Schwindel beim Aufstehen, Müdigkeit nach der Sitzung und selten eine vorübergehende Verstärkung der Beschwerden. Mehr zu den zwei häufigsten Reaktionen: <a href="/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/">blaue Flecken</a> und <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">Müdigkeit</a>. Die vollständige Übersicht findest du unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Akupunktur: Nebenwirkungen</a>.</p>',
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
        a: '<p>Als grobe Orientierung: Bei akuten Beschwerden zeigen sich meist nach 4 bis 6 Sitzungen deutliche Verbesserungen; chronische Beschwerden brauchen in der Regel eine Serie von 8 bis 12 Sitzungen. Seriös lässt sich das erst nach dem Erstgespräch einschätzen, und eine gute Praxis überprüft nach den ersten Sitzungen ehrlich, ob es Fortschritte gibt. Mehr zum Behandlungsablauf steht auf der Seite <a href="/therapien/akupunktur/">Akupunktur</a>. Zur sinnvollen Frequenz: <a href="/gesundheitsbibliothek/fragen/wie-oft-akupunktur/">Wie oft Akupunktur?</a>, zur Verlaufsbeurteilung: <a href="/gesundheitsbibliothek/fragen/wann-wirkt-akupunktur/">Wann merkt man eine Wirkung?</a></p>',
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
    title: 'Schröpfen-Methoden & weitere Anwendungen: häufige Fragen',
    metaDesc: 'Wie lange bleiben Schröpfmale sichtbar, tut Schröpfen weh, was unterscheidet Tuina von Massage und was ist bei Kräutertherapie zu beachten?',
    h1: 'Schröpfen-Methoden & weitere Anwendungen',
    lead: 'Fragen zu Schröpfen, Gua Sha, Tuina, Moxibustion und Kräutertherapie, kurz beantwortet und mit den ausführlichen Therapieseiten verlinkt.',
    answers: [
      {
        id: 'schroepfmale',
        q: 'Wie lange bleiben Schröpfmale sichtbar?',
        a: '<p>Die runden Abdrücke verblassen in der Regel innert 3 bis 10 Tagen, je nach Hauttyp und Intensität der Behandlung. Sie sind keine klassischen Blutergüsse einer Verletzung und tun normalerweise nicht weh. Plane bei sichtbaren Stellen (Schultern, Nacken) allenfalls um Anlässe herum. Was die Färbung bedeutet und wann du eine Stelle anschauen lassen solltest, erklärt der Artikel <a href="/wissen/schroepfen-wirkung-flecken/">Schröpfen: Wirkung und Flecken</a>, weitere mögliche Reaktionen die Übersicht <a href="/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/">Schröpfen: Nebenwirkungen</a>.</p>',
      },
      {
        id: 'schroepfen-schmerz',
        q: 'Tut Schröpfen weh?',
        a: '<p>Schröpfen zieht spürbar an der Haut, die meisten beschreiben es als intensiven, aber gut aushaltbaren Druck, ähnlich einer kräftigen Massage. Beim Gleitschröpfen über eingeölte Haut ist das Gefühl flächiger. Schmerzhaft sollte es nicht sein: Der Unterdruck lässt sich jederzeit anpassen, sag also, wenn es zu stark zieht. Nach der Behandlung kann sich die Stelle für ein bis zwei Tage empfindlich anfühlen wie nach Muskelkater. Ausführlicher: <a href="/gesundheitsbibliothek/fragen/tut-schroepfen-weh/">Tut Schröpfen weh?</a></p>',
      },
      {
        id: 'gua-sha',
        q: 'Was ist der Unterschied zwischen Gua Sha und Schröpfen?',
        a: '<p>Beide arbeiten an der Durchblutung von Haut und Muskulatur, aber mit anderer Technik: Beim Schröpfen zieht ein Unterdruck im Glas das Gewebe nach oben, bei <a href="/therapien/gua-sha/">Gua Sha</a> wird die eingeölte Haut mit einem abgerundeten Schaber bearbeitet. Beide können vorübergehende Hautrötungen oder Punkteinblutungen hinterlassen, die nach einigen Tagen verblassen. Welche Technik passt, entscheidet sich nach Beschwerde und Vorliebe, oft im selben Termin kombiniert.</p>',
      },
      {
        id: 'tuina',
        q: 'Was unterscheidet Tuina von einer klassischen Massage?',
        a: '<p><a href="/therapien/tuina/">Tuina</a> ist die manuelle Therapie der chinesischen Medizin: Sie kombiniert kräftige Massagegriffe mit Mobilisation von Gelenken und gezielter Arbeit an Druckpunkten und folgt einer eigenen Befunderhebung. Eine klassische Massage arbeitet primär entspannend an der Muskulatur. In der Praxis überschneiden sich die Techniken; welche Form die Zusatzversicherung übernimmt, hängt von der Anerkennung der Fachperson ab, siehe <a href="/krankenkassen/massage/">Massage &amp; Krankenkasse</a>. Zu möglichen Reaktionen: <a href="/gesundheitsbibliothek/fragen/tuina-nebenwirkungen/">Tuina: Nebenwirkungen</a>.</p>',
      },
      {
        id: 'moxibustion',
        q: 'Was ist Moxibustion und riecht das nicht stark?',
        a: '<p><a href="/therapien/moxibustion/">Moxibustion</a> ist eine Wärmebehandlung: Über Akupunkturpunkten wird getrockneter Beifuss abgebrannt, ohne die Haut zu berühren, meist als Moxa-Zigarre oder auf der Nadel. Die Wärme dringt spürbar in die Tiefe. Ja, es entsteht ein charakteristischer, rauchiger Geruch; die Praxen lüften entsprechend, und es gibt raucharme Varianten. Bei Brandempfindlichkeit oder Atemwegserkrankungen wird die Technik angepasst oder ersetzt.</p>',
      },
      {
        id: 'kraeuter-medikamente',
        q: 'Darf ich chinesische Kräuter neben meinen Medikamenten nehmen?',
        a: '<p>Nicht ohne Rücksprache. Kräuterrezepturen können mit Medikamenten wechselwirken, besonders relevant bei Blutverdünnern, Immunsuppressiva und in der Schwangerschaft. Deshalb gehört zur seriösen <a href="/therapien/kraeutertherapie/">Kräutertherapie</a> immer die vollständige Medikamentenliste ins Erstgespräch, und im Zweifel die Absprache mit der behandelnden Ärztin. Bei TCM.ch werden ausschliesslich geprüfte Rezepturen aus Schweizer Apotheken verwendet. Ausführlich: <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">TCM-Kräuter: Nebenwirkungen</a>.</p>',
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
    bodyHtml: '<h2>Was du normalerweise spürst</h2>\n<p>Akupunkturnadeln sind mit 0,2 bis 0,3 Millimetern Durchmesser um ein Mehrfaches dünner als Injektionsnadeln und massiv statt hohl. Der Einstich durch die Haut ist deshalb meist ein kurzer, feiner Reiz, den viele gar nicht wahrnehmen. Interessanter ist, was danach kommt: An gut getroffenen Punkten entsteht oft ein dumpfes Ziehen, ein Druck-, Wärme- oder Schweregefühl, das nach wenigen Sekunden nachlässt oder in ein neutrales Gefühl übergeht. Während der 20 bis 30 Minuten Liegezeit spüren die meisten die Nadeln kaum noch, viele entspannen dabei stark oder schlafen ein.</p>\n<h2>Wovon es abhängt</h2>\n<p>Manche Körperstellen sind empfindlicher als andere: Hände, Füsse und Ohren spürst du mehr als Rücken oder Beine. Auch Tagesform, Anspannung und die individuelle Schmerzempfindlichkeit spielen mit; wer angespannt auf den Einstich wartet, spürt mehr. Bei der ersten Behandlung wird deshalb bewusst vorsichtig dosiert: weniger Nadeln, sanftere Stimulation. Sag deiner Therapeutin, wenn du nadelempfindlich bist; es gibt für fast jede Situation eine angepasste Technik, bei Bedarf auch nadelfreie Alternativen wie <a href="/therapien/akupressur/">Akupressur</a>. Wenn dich vor allem die Angst vor Nadeln beschäftigt: <a href="/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/">Angst vor Akupunkturnadeln</a>.</p>\n<h2>Was du selbst tun kannst</h2>\n<p>Komm nicht nüchtern, atme beim Setzen der Nadeln ruhig weiter und melde dich sofort, wenn ein Punkt unangenehm bleibt statt nachzulassen. Eine liegende Nadel, die drückt oder brennt, wird einfach minimal korrigiert oder entfernt; das ist Routine und kein Grund, die Zähne zusammenzubeissen.</p>\n<h2>Wann du es ansprechen solltest</h2>\n<p>Scharfer, elektrisierender oder ausstrahlender Schmerz beim Einstich ist nicht normal; sag es sofort, die Nadel wird umplatziert. Schmerzt eine Einstichstelle nach der Behandlung länger, schwillt an oder entzündet sich, lass es in der Praxis oder ärztlich anschauen. Das ist selten, gehört aber angeschaut.</p>',
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
    kurz: '<p>Der erste Termin dauert 60 bis 75 Minuten und besteht aus drei Teilen: einem ausführlichen Gespräch über deine Beschwerden und Krankengeschichte, der Untersuchung mit <a href="/gesundheitsbibliothek/tcm-verstehen/diagnostik/pulsdiagnostik/">Puls-</a> und <a href="/gesundheitsbibliothek/tcm-verstehen/diagnostik/zungendiagnostik/">Zungendiagnostik</a> und meist bereits einer ersten, bewusst zurückhaltend dosierten Behandlung. Am Ende weisst du, ob und wie eine Behandlung bei dir sinnvoll ist und mit wie vielen Sitzungen du rechnen kannst.</p>',
    bodyHtml: '<h2>Teil 1: das Gespräch</h2>\n<p>Den grössten Teil des ersten Termins macht die Anamnese aus. Deine Therapeutin fragt nach deinen aktuellen Beschwerden, aber auch nach Dingen, die auf den ersten Blick nichts damit zu tun haben: Schlaf, Verdauung, Energie im Tagesverlauf, Kälte- oder Wärmeempfinden, bei Frauen der Zyklus. Diese Muster gehören zur TCM-Befunderhebung. Dazu kommen Krankengeschichte, bisherige Abklärungen und deine vollständige Medikamentenliste. Mitgebrachte Befunde und Berichte sind willkommen.</p>\n<h2>Teil 2: die Untersuchung</h2>\n<p>Typisch für die TCM sind zwei kurze, völlig schmerzfreie Untersuchungen: das Tasten des Pulses an beiden Handgelenken und ein Blick auf die Zunge. Beides liefert der Therapeutin Hinweise für die Wahl der Behandlungspunkte und -methoden. Je nach Beschwerde kommen einfache körperliche Untersuchungen dazu, etwa das Abtasten verspannter Muskulatur.</p>\n<h2>Teil 3: die erste Behandlung</h2>\n<p>In den meisten Fällen wird beim ersten Termin bereits behandelt, bewusst vorsichtig: weniger Nadeln, kürzere Liegezeit, sanfte Dosierung. So zeigt sich, wie dein Körper reagiert, bevor bei den Folgeterminen gesteigert wird. Ob Akupunktur, Schröpfen, Tuina oder eine Kombination zum Einsatz kommt, besprecht ihr vorher; nichts passiert unangekündigt. Ob die Nadeln wehtun, beantworten wir <a href="/gesundheitsbibliothek/fragen/tut-akupunktur-weh/">hier ehrlich</a>.</p>\n<h2>Und danach?</h2>\n<p>Zum Abschluss bekommst du eine ehrliche Einschätzung: ob eine Behandlung bei deiner Beschwerde sinnvoll ist, mit wie vielen Sitzungen du rechnen kannst und ob zuerst eine ärztliche Abklärung gehört. Plane für den Rest des Tages nichts Anstrengendes ein, manche sind nach der ersten Behandlung <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">müde</a>. Was du vorher zu Kleidung, Essen und Unterlagen wissen musst, steht unter <a href="/gesundheitsbibliothek/fragen/erster-termin/">Erster Termin &amp; Vorbereitung</a>, im Detail unter <a href="/gesundheitsbibliothek/fragen/essen-vor-akupunktur/">Essen vor Akupunktur</a>, <a href="/gesundheitsbibliothek/fragen/kleidung-akupunktur/">Was anziehen?</a> und <a href="/gesundheitsbibliothek/fragen/wie-lange-dauert-akupunktur/">Wie lange dauert Akupunktur?</a> Bei Nadelangst hilft <a href="/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/">dieser Artikel</a>, zur Terminvereinbarung ohne Arztbesuch <a href="/gesundheitsbibliothek/fragen/ueberweisung-akupunktur/">Brauche ich eine Überweisung?</a></p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung: alle Fragen' },
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
      { href: '/gesundheitsbibliothek/fragen/kosten-versicherung/', label: 'Kosten & Versicherung: alle Fragen' },
      { href: '/gesundheitsbibliothek/fragen/wie-oft-akupunktur/', label: 'Wie oft braucht man Akupunktur?' },
      { href: '/gesundheitsbibliothek/fragen/wann-wirkt-akupunktur/', label: 'Wann merkt man, ob Akupunktur wirkt?' },
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
  {
    slug: 'starke-reaktion-nach-akupunktur',
    question: 'Ist eine starke Reaktion nach Akupunktur normal?',
    title: 'Starke Reaktion nach Akupunktur: Was ist noch normal?',
    metaDesc: 'Müdigkeit, Kreislauf, kurz stärkere Beschwerden: Welche Reaktionen nach Akupunktur vorkommen, was nicht als normale Reaktion gilt und wann du dich melden solltest.',
    kurz: '<p>Leichte Reaktionen nach einer Akupunktursitzung kommen vor: Müdigkeit, ein Gefühl von Schwere, lokale Empfindlichkeit an Einstichstellen oder ein kurzes Schwanken der bestehenden Beschwerden. Sie klingen in der Regel innert ein bis zwei Tagen ab. Eine deutliche, anhaltende oder ganz neue Verschlechterung ist dagegen keine normale Behandlungsreaktion: Melde dich in dem Fall bei deiner Praxis oder lass die Beschwerden medizinisch einordnen.</p>',
    bodyHtml: '<h2>Welche Reaktionen häufig und vorübergehend sind</h2>\n<p>Der Körper reagiert auf die Behandlung, und das darf spürbar sein. Am häufigsten sind <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">Müdigkeit am Behandlungstag</a>, ein dumpfes Druck- oder Muskelkatergefühl an behandelten Stellen, <a href="/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/">kleine Blutergüsse</a> und kurzer Schwindel beim Aufstehen von der Liege. Auch ein vorübergehendes Schwanken der bestehenden Beschwerden wird beschrieben, meist für einen bis zwei Tage. All das braucht normalerweise keine Behandlung, nur Ruhe und Flüssigkeit.</p>\n<h2>Was keine normale Reaktion ist</h2>\n<p>Der Begriff Erstverschlimmerung wird manchmal so verwendet, als wäre jede Verschlechterung ein gutes Zeichen. So ist es nicht, und eine Heilkrise ist kein belegtes medizinisches Konzept. Nicht als normale Reaktion gelten: starke oder zunehmende Schmerzen, eine deutliche Verschlechterung über mehr als zwei Tage, Fieber, eine heisse, geschwollene oder nässende Einstichstelle, anhaltende Taubheit oder Kribbeln, Atemnot oder neue Symptome, die vor der Behandlung nicht da waren.</p>\n<h2>Wann du dich bei der Praxis melden solltest</h2>\n<p>Im Zweifel immer. Deine Therapeutin will wissen, wie dein Körper reagiert hat, auch weil sich die Behandlung anpassen lässt: weniger Nadeln, kürzere Liegezeit, sanftere Stimulation. Melde dich besonders dann, wenn eine Reaktion dich beunruhigt, länger als zwei Tage anhält oder nach jeder Sitzung stärker ausfällt.</p>\n<h2>Wann eine ärztliche Beurteilung dazugehört</h2>\n<p>Rasch medizinisch abklären lassen solltest du Atemnot oder Brustschmerzen nach einer Behandlung am Brustkorb, zunehmende starke Schmerzen, Zeichen einer Infektion (Fieber, heisse geschwollene Stelle), anhaltende neurologische Symptome wie Taubheit oder Schwäche sowie alles, was sich rasch verschlechtert. Bei akuter Atemnot oder Bewusstseinsstörung gilt in der Schweiz: Notruf 144. Mehr zu einzelnen Nervensymptomen unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/">Nerv getroffen?</a></p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Welche Nebenwirkungen hat Akupunktur?' },
      { href: '/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/', label: 'Ist Müdigkeit nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Alle Fragen zu: Nach der Behandlung' },
      { href: '/gesundheitsbibliothek/fragen/schmerzen-nach-akupunktur-schlimmer/', label: 'Nach Akupunktur mehr Schmerzen: Ist das normal?' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann zuerst zum Arzt?', cat: 'Frage' },
    ],
  },
  {
    slug: 'akupunktur-nerv-getroffen',
    question: 'Kann bei der Akupunktur ein Nerv getroffen werden?',
    title: 'Akupunktur: Nerv getroffen? Elektrisierendes Gefühl einordnen',
    metaDesc: 'Ein kurzes elektrisierendes Gefühl beim Nadeln kommt vor. Wann es harmlos ist, wann anhaltende Taubheit oder Schwäche abgeklärt gehören und was sofort zu tun ist.',
    kurz: '<p>Ein kurzes elektrisierendes oder ausstrahlendes Gefühl beim Setzen einer Nadel kommt vor: Die Nadel hat einen Nerv gereizt. Sag es sofort, dann wird die Nadel umplatziert; in den allermeisten Fällen verschwindet das Gefühl danach vollständig. Anhaltende Taubheit, Kribbeln, Schwäche oder einschiessende Schmerzen nach der Behandlung sind dagegen nicht normal und gehören medizinisch beurteilt.</p>',
    bodyHtml: '<h2>Was beim Nadeln normal sein kann</h2>\n<p>Akupunktur arbeitet bewusst in der Nähe von Nervenstrukturen. Ein dumpfes, ziehendes oder kurz ausstrahlendes Gefühl (in der TCM als De-Qi beschrieben) gehört für viele zur Behandlung. Auch ein einzelner kurzer elektrisierender Impuls beim Einstich bedeutet meist nur, dass die Nadel einen Hautnerv gestreift hat. Entscheidend ist der Verlauf: Klingt das Gefühl nach dem Umsetzen der Nadel ab, ist in der Regel nichts passiert.</p>\n<h2>Was du während der Behandlung tun solltest</h2>\n<p>Melde ein elektrisierendes, brennendes oder stark ausstrahlendes Gefühl sofort, auch während der Ruhezeit. Die Fachperson platziert die Nadel dann um oder entfernt sie. Aushalten ist hier falsch: Eine korrekt sitzende Nadel darf spürbar sein, aber nicht elektrisch schmerzen.</p>\n<h2>Wann Symptome abgeklärt gehören</h2>\n<p>Nicht normal ist, wenn nach der Behandlung Taubheit, Kribbeln, ein pelziges Gefühl, Muskelschwäche oder einschiessende Schmerzen bestehen bleiben, über Stunden anhalten oder zunehmen. Solche Symptome können auf eine relevante Nervenreizung hinweisen und gehören zeitnah medizinisch beurteilt, auch damit andere Ursachen nicht übersehen werden. Wir spielen das nicht herunter: Bleibende Nervenschäden durch Akupunktur sind selten, aber anhaltende neurologische Symptome sind nie einfach abzuwarten.</p>\n<h2>Sofort reagieren</h2>\n<p>Bei plötzlicher Schwäche oder Lähmung, Gefühlsverlust einer ganzen Region, starken einschiessenden Schmerzen oder Atemnot nach einer Behandlung am Brustkorb: rasche medizinische Beurteilung, im Notfall Telefon 144. Informiere zusätzlich deine Praxis, damit der Vorfall dokumentiert und die Behandlung angepasst wird.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Welche Nebenwirkungen hat Akupunktur?' },
      { href: '/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/', label: 'Ist eine starke Reaktion nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Alle Fragen zu Sicherheit & Nebenwirkungen' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?', cat: 'Frage' },
    ],
  },
  {
    slug: 'akupunktur-nebenwirkungen',
    question: 'Welche Nebenwirkungen hat Akupunktur?',
    title: 'Akupunktur Nebenwirkungen: von harmlos bis selten',
    metaDesc: 'Müdigkeit, blaue Flecken, Kreislauf: die häufigen Reaktionen auf Akupunktur, die seltenen ernsten Komplikationen und wann ärztliche Hilfe angezeigt ist.',
    kurz: '<p>Akupunktur durch ausgebildete, anerkannte Fachpersonen gilt als sehr sichere Behandlung. Die häufigen Nebenwirkungen sind mild und vorübergehend: Müdigkeit, kleine Blutergüsse, kurzes Schwindelgefühl, lokale Empfindlichkeit. Ernste Komplikationen wie Infektionen oder Verletzungen innerer Organe sind bei korrekter Technik sehr selten, aber nicht unmöglich; deshalb gehört die Behandlung in geschulte Hände, und anhaltende oder starke Symptome gehören abgeklärt.</p>',
    bodyHtml: '<h2>Häufig und harmlos</h2>\n<p>Am häufigsten sind <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">Müdigkeit nach der Sitzung</a>, <a href="/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/">kleine blaue Flecken</a> an Einstichstellen, ein dumpfes Druckgefühl oder leichter Muskelkater an behandelten Punkten und kurzer Schwindel beim Aufstehen. Auch ein kurzes Schwanken der bestehenden Beschwerden kommt vor; mehr dazu unter <a href="/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/">Starke Reaktion nach Akupunktur</a>. Diese Reaktionen klingen von selbst ab.</p>\n<h2>Kreislauf</h2>\n<p>Selten reagiert der Kreislauf während der Behandlung: Schwitzen, Flauheit, im Extremfall eine kurze Ohnmacht (vasovagale Reaktion). Das Risiko sinkt, wenn du nicht nüchtern kommst und liegend behandelt wirst. Sag sofort Bescheid, wenn dir flau wird.</p>\n<h2>Nerven</h2>\n<p>Ein kurzes elektrisierendes Gefühl beim Nadeln ist meist harmlos und verschwindet nach dem Umsetzen der Nadel. Anhaltende Taubheit, Kribbeln oder Schwäche sind dagegen nicht normal; wie du das einordnest, steht unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/">Nerv getroffen?</a></p>\n<h2>Infektionen</h2>\n<p>Mit sterilen Einwegnadeln, wie sie in der Schweiz bei EMR-/ASCA-anerkannten Fachpersonen Standard sind, sind Infektionen an Einstichstellen sehr selten. Eine Stelle, die heiss wird, anschwillt, zunehmend schmerzt oder nässt, gehört trotzdem ärztlich angeschaut.</p>\n<h2>Seltene, aber ernste Komplikationen</h2>\n<p>Sehr selten, aber wichtig zu kennen: Bei unsachgemäss tiefer Nadelung am Brustkorb kann die Lunge verletzt werden (Pneumothorax), auch Verletzungen anderer Organe oder grösserer Gefässe sind beschrieben. Grosse Untersuchungen mit zehntausenden Behandlungen durch geschulte Fachpersonen fanden solche Ereignisse nicht oder extrem selten; sie sind vor allem ein Argument für qualifizierte Behandlung, nicht gegen Akupunktur. Atemnot, stechende Brustschmerzen oder starker Husten nach einer Behandlung am Oberkörper sind ein Notfallzeichen: Telefon 144.</p>\n<h2>Wann ärztliche Hilfe angezeigt ist</h2>\n<p>Bei allem, was stark ist, zunimmt oder anhält: Infektionszeichen, anhaltende neurologische Symptome, Atemnot, Brustschmerz, eine deutliche Verschlechterung über mehr als zwei Tage. Für die Einordnung im Alltag gilt: Deine Praxis will von jeder ungewöhnlichen Reaktion wissen.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/', label: 'Sind blaue Flecken nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/', label: 'Ist Müdigkeit nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/schmerzen-nach-akupunktur-schlimmer/', label: 'Nach Akupunktur mehr Schmerzen: Ist das normal?' },
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Alle Fragen zu Sicherheit & Nebenwirkungen' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?', cat: 'Frage' },
    ],
  },
  {
    slug: 'sport-nach-akupunktur',
    question: 'Darf man nach Akupunktur Sport machen?',
    title: 'Sport nach Akupunktur: Darf ich danach trainieren?',
    metaDesc: 'Trainieren nach einer Akupunkturbehandlung: was direkt danach sinnvoll ist, wann du intensives Training verschiebst und wann eine Pause die bessere Wahl ist.',
    kurz: '<p>In den meisten Fällen musst du nach einer Akupunkturbehandlung nicht grundsätzlich auf Bewegung verzichten. Ob intensives Training direkt danach sinnvoll ist, hängt aber davon ab, wie du dich fühlst und weshalb du behandelt wurdest.</p><p>Wenn du dich nach der Behandlung ruhig, etwas müde oder leicht benommen fühlst, ist es meist sinnvoller, den Körper zunächst zur Ruhe kommen zu lassen. Ein Spaziergang oder leichte Bewegung ist etwas anderes als ein intensives Krafttraining, Intervalltraining oder ein langer Lauf.</p>',
    bodyHtml: '<h2>Was ist direkt nach der Akupunktur sinnvoll?</h2>\n<p>Nach der Behandlung kannst du zunächst ein paar Minuten beobachten, wie du dich fühlst. Manche Menschen merken kaum einen Unterschied, andere fühlen sich vorübergehend entspannt, <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">müde</a> oder etwas leichter im Kopf.</p>\n<p>Leichte Alltagsbewegung ist normalerweise kein Problem. Bei intensiver Belastung solltest du dich dagegen nicht dazu zwingen, wenn sich dein Körper gerade erschöpft oder ungewöhnlich anfühlt.</p>\n<h2>Muss ich einen ganzen Tag mit Sport warten?</h2>\n<p>Eine pauschale Wartezeit gibt es nicht. Entscheidend sind dein Zustand, die Intensität des Trainings und der Grund der Behandlung.</p>\n<p>Wenn du dich normal fühlst und keine besonderen Beschwerden hast, spricht häufig nichts gegen moderate Bewegung. Bei Kreislaufproblemen, stärkeren Schmerzen, ungewöhnlicher Müdigkeit oder einer <a href="/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/">deutlichen Reaktion auf die Behandlung</a> solltest du Training verschieben.</p>\n<h2>Was ist mit Krafttraining oder intensivem Ausdauertraining?</h2>\n<p>Je intensiver das Training, desto sinnvoller ist es, auf dein aktuelles Körpergefühl zu achten. Eine Akupunkturbehandlung sollte kein Anlass sein, Warnsignale zu übergehen.</p>\n<p>Besonders wenn wegen akuter Schmerzen, Schwindel, Erschöpfung oder einer Verletzung behandelt wurde, kann die zugrunde liegende Beschwerde selbst wichtiger für die Trainingsentscheidung sein als die Akupunktur.</p>\n<h2>Wann sollte ich lieber pausieren?</h2>\n<p>Pausiere und kläre die Situation ab, wenn nach der Behandlung zum Beispiel deutlicher Schwindel, ungewöhnliche Schwäche, starke Schmerzen oder andere neue Beschwerden auftreten.</p>\n<p>Akupunktur ist kein Grund, sportliche Belastung trotz solcher Symptome fortzusetzen.</p>\n<h2>Kurz gesagt</h2>\n<p>Leichte Bewegung nach Akupunktur ist für viele Menschen gut möglich. Intensives Training musst du nicht grundsätzlich vermeiden, solltest es aber davon abhängig machen, wie du dich nach der Behandlung fühlst. Was sonst am Behandlungstag gilt, steht unter <a href="/gesundheitsbibliothek/fragen/nach-der-behandlung/">Nach der Behandlung</a>.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/', label: 'Ist Müdigkeit nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/', label: 'Ist eine starke Reaktion nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Alle Fragen zu: Nach der Behandlung' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/schwimmen-nach-akupunktur/', label: 'Darf man nach Akupunktur schwimmen?', cat: 'Frage' },
    ],
  },
  {
    slug: 'schwimmen-nach-akupunktur',
    question: 'Darf man nach Akupunktur schwimmen?',
    title: 'Schwimmen nach Akupunktur: Ist das erlaubt?',
    metaDesc: 'Schwimmen oder Baden nach Akupunktur: warum kurz warten sinnvoll sein kann und was bei Sauna, Dauernadeln und gereizten Einstichstellen gilt.',
    kurz: '<p>Nach einer normalen Akupunkturbehandlung sind die Einstichstellen sehr klein. Trotzdem ist es sinnvoll, unmittelbar danach nicht unnötig an ihnen zu reiben oder sie zu reizen.</p><p>Wenn die Haut unauffällig ist und du dich gut fühlst, ist Schwimmen später normalerweise kein grundsätzliches Problem. Direkt nach der Behandlung kann es jedoch sinnvoll sein, etwas Zeit verstreichen zu lassen.</p>',
    bodyHtml: '<h2>Warum überhaupt warten?</h2>\n<p>Die Haut wurde an mehreren Stellen mit sehr feinen Nadeln durchstochen. Die Einstiche schliessen sich normalerweise schnell, aber direkt nach der Behandlung können einzelne Punkte noch etwas empfindlich sein.</p>\n<p>Auch Kreislauf und Allgemeinbefinden spielen eine Rolle. Wer sich nach der Behandlung <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">müde</a> oder leicht schwindelig fühlt, sollte nicht direkt ins Wasser gehen.</p>\n<h2>Schwimmbad, See oder Sauna?</h2>\n<p>Bei offenen, blutenden oder deutlich gereizten Einstichstellen solltest du mit Schwimmen warten.</p>\n<p>Auch sehr heisse Bäder oder Sauna können unmittelbar nach einer Behandlung belastender sein, wenn dein Kreislauf empfindlich reagiert.</p>\n<h2>Was ist bei Dauernadeln oder Ohrpflastern?</h2>\n<p>Hier gelten andere Überlegungen als nach einer normalen Sitzung. Wenn <a href="/therapien/dauernadeln/">Dauernadeln</a> oder <a href="/therapien/ear-seeds/">Ohrpflaster</a> weiter getragen werden, solltest du die konkreten Pflegehinweise deiner Therapeutin oder deines Therapeuten beachten.</p>\n<h2>Wann solltest du nachfragen?</h2>\n<p>Wenn eine Einstichstelle stärker gerötet, geschwollen, schmerzhaft oder ungewöhnlich verändert ist, solltest du nicht einfach weiterbaden oder schwimmen, sondern die Stelle beobachten und bei Bedarf medizinisch abklären lassen.</p>\n<h2>Kurz gesagt</h2>\n<p>Nach einer unkomplizierten Akupunkturbehandlung musst du Schwimmen nicht dauerhaft vermeiden. Direkt danach ist etwas Zurückhaltung sinnvoll, besonders wenn Einstichstellen noch gereizt sind oder du dich nicht ganz fit fühlst. Weitere Alltagsfragen beantwortet die Übersicht <a href="/gesundheitsbibliothek/fragen/nach-der-behandlung/">Nach der Behandlung</a>.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Alle Fragen zu: Nach der Behandlung' },
      { href: '/gesundheitsbibliothek/fragen/sport-nach-akupunktur/', label: 'Darf man nach Akupunktur Sport machen?' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Welche Nebenwirkungen hat Akupunktur?' },
    ],
    mehr: [
      { href: '/therapien/dauernadeln/', label: 'Dauernadeln', cat: 'Therapie' },
      { href: '/therapien/ear-seeds/', label: 'Ear Seeds', cat: 'Therapie' },
    ],
  },
  {
    slug: 'alkohol-nach-akupunktur',
    question: 'Darf man nach Akupunktur Alkohol trinken?',
    title: 'Alkohol nach Akupunktur: Muss ich darauf verzichten?',
    metaDesc: 'Alkohol nach einer Akupunkturbehandlung: keine generelle Verbotsregel, aber gute Gründe für Zurückhaltung direkt danach. Was bei Kräutern und Medikamenten gilt.',
    kurz: '<p>Es gibt keine allgemeine Regel, nach der Alkohol nach jeder Akupunkturbehandlung grundsätzlich verboten wäre. Direkt nach einer Behandlung ist Zurückhaltung trotzdem sinnvoll.</p><p>Alkohol kann Kreislauf, Reaktionsfähigkeit und Körperwahrnehmung beeinflussen. Wenn du nach der Akupunktur ohnehin müde, schwindelig oder ungewöhnlich entspannt bist, kann Alkohol diese Effekte verstärken.</p>',
    bodyHtml: '<h2>Warum empfehlen viele Therapeuten Zurückhaltung?</h2>\n<p>Der praktische Grund ist weniger eine besondere Wechselwirkung mit der Akupunkturnadel als dein Allgemeinzustand.</p>\n<p>Nach einer Behandlung möchtest du unterscheiden können, ob Beschwerden wie Schwindel, <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">Müdigkeit</a> oder Unwohlsein von der Behandlung, deiner ursprünglichen Erkrankung oder etwas anderem kommen. Alkohol kann diese Einschätzung erschweren.</p>\n<h2>Ist ein Glas Wein gefährlich?</h2>\n<p>Eine pauschale Aussage lässt sich nicht für jeden Menschen treffen. Entscheidend sind unter anderem dein Gesundheitszustand, Medikamente, Begleiterkrankungen und wie du dich nach der Behandlung fühlst.</p>\n<p>Wenn medizinische Gründe gegen Alkohol sprechen, ändert eine Akupunkturbehandlung daran selbstverständlich nichts.</p>\n<h2>Was gilt bei Kräutertherapie oder Medikamenten?</h2>\n<p>Wenn du zusätzlich chinesische Arzneimittel, Medikamente oder andere Präparate einnimmst, können andere Regeln gelten.</p>\n<p>Alkohol kann mit verschiedenen Arzneimitteln wechselwirken. Frage bei Unsicherheit deine behandelnde Fachperson oder Apotheke. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">TCM-Kräuter: Nebenwirkungen</a>.</p>\n<h2>Kurz gesagt</h2>\n<p>Du musst Alkohol nicht deshalb grundsätzlich meiden, weil du Akupunktur hattest. Direkt danach ist es jedoch vernünftig, zurückhaltend zu sein und zunächst zu beobachten, wie du dich fühlst. Was sonst am Behandlungstag gilt, steht unter <a href="/gesundheitsbibliothek/fragen/nach-der-behandlung/">Nach der Behandlung</a>.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Alle Fragen zu: Nach der Behandlung' },
      { href: '/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/', label: 'Ist Müdigkeit nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'Können TCM-Kräuter Nebenwirkungen haben?' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Welche Nebenwirkungen hat Akupunktur?', cat: 'Frage' },
    ],
  },
  {
    slug: 'schmerzen-nach-akupunktur-schlimmer',
    question: 'Warum sind die Schmerzen nach Akupunktur stärker?',
    title: 'Nach Akupunktur mehr Schmerzen: Ist das normal?',
    metaDesc: 'Stärkere Schmerzen nach Akupunktur: was vorübergehend vorkommen kann, warum eine deutliche Verschlechterung keine normale Heilreaktion ist und wann du dich meldest.',
    kurz: '<p>Leichte Empfindlichkeit an einer behandelten Stelle kann nach Akupunktur vorkommen. Wenn die eigentlichen Schmerzen nach der Behandlung deutlich stärker werden, solltest du das aber nicht automatisch als normale oder gewünschte Reaktion einordnen.</p><p>Entscheidend ist, wie stark die Verschlechterung ist, wie lange sie anhält und ob neue Symptome hinzukommen.</p>',
    bodyHtml: '<h2>Was kann vorübergehend vorkommen?</h2>\n<p>Einzelne Einstichstellen können empfindlich sein. Auch Muskeln können sich kurzfristig anders oder etwas wund anfühlen.</p>\n<p>Eine leichte, vorübergehende Veränderung ist etwas anderes als eine deutliche Verschlechterung deiner ursprünglichen Schmerzen.</p>\n<h2>Ist eine sogenannte Erstverschlimmerung normal?</h2>\n<p>Der Begriff wird in der Komplementärmedizin häufig verwendet, sollte aber nicht dazu führen, neue oder deutlich stärkere Beschwerden pauschal als Zeichen einer erfolgreichen Behandlung zu betrachten.</p>\n<p>Eine Verschlechterung hat verschiedene mögliche Ursachen und sollte im klinischen Kontext beurteilt werden. Wie du die Bandbreite an Reaktionen einordnest, steht unter <a href="/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/">Starke Reaktion nach Akupunktur</a>.</p>\n<h2>Wann solltest du den Therapeuten kontaktieren?</h2>\n<p>Melde dich, wenn die Schmerzen:</p>\n<ul><li>deutlich stärker als vorher sind</li><li>ungewöhnlich lange anhalten</li><li>eine neue Qualität haben</li><li>mit Taubheit, Schwäche oder anderen neurologischen Symptomen einhergehen (mehr dazu unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/">Nerv getroffen?</a>)</li><li>dich im Alltag deutlich einschränken</li></ul>\n<h2>Wann braucht es medizinische Abklärung?</h2>\n<p>Starke oder zunehmende Schmerzen, Atemnot, ausgeprägte neurologische Veränderungen, Fieber oder andere ernsthafte neue Symptome gehören medizinisch abgeklärt. Bei akuter Atemnot oder rasch zunehmenden Symptomen gilt in der Schweiz der Notruf 144. Eine Orientierung, wann die ärztliche Abklärung zuerst kommt, gibt <a href="/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/">Wann zuerst zum Arzt?</a></p>\n<h2>Kurz gesagt</h2>\n<p>Etwas lokale Empfindlichkeit kann vorkommen. Eine deutliche Schmerzverschlechterung solltest du aber nicht einfach als normale Heilreaktion abhaken.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/', label: 'Ist eine starke Reaktion nach Akupunktur normal?' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Welche Nebenwirkungen hat Akupunktur?' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/', label: 'Kann bei der Akupunktur ein Nerv getroffen werden?' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/', label: 'Ist Müdigkeit nach Akupunktur normal?', cat: 'Frage' },
    ],
  },
  {
    slug: 'schroepfen-nebenwirkungen',
    question: 'Welche Nebenwirkungen kann Schröpfen haben?',
    title: 'Schröpfen: Welche Nebenwirkungen können auftreten?',
    metaDesc: 'Schröpfmale, Druckempfindlichkeit, blutiges Schröpfen: welche Reaktionen nach Schröpfen häufig sind, welche nicht normal sind und wann Vorsicht wichtig ist.',
    kurz: '<p>Nach Schröpfen sind sichtbare Hautverfärbungen, Druckempfindlichkeit oder ein vorübergehendes Spannungsgefühl relativ typische Reaktionen. Je nach Methode und Intensität können die Spuren mehrere Tage sichtbar bleiben.</p><p>Neben diesen erwartbaren Hautreaktionen gibt es aber auch Situationen, in denen Schröpfen nicht oder nur mit besonderer Vorsicht durchgeführt werden sollte.</p>',
    bodyHtml: '<h2>Welche Reaktionen kommen häufig vor?</h2>\n<p>Nach trockenem Schröpfen können kreisrunde rote, violette oder dunklere Stellen entstehen. Sie entsprechen nicht automatisch einem Giftstoff oder einer bestimmten Diagnose; was die Färbung bedeutet, erklärt der Artikel <a href="/wissen/schroepfen-wirkung-flecken/">Schröpfen: Wirkung und Flecken</a>.</p>\n<p>Möglich sind ausserdem:</p>\n<ul><li>Druckempfindlichkeit</li><li>leichte lokale Schmerzen</li><li>vorübergehende Hautreizung</li><li>kleine Blutergüsse</li></ul>\n<h2>Wann sind Flecken nicht mehr nur eine normale Reaktion?</h2>\n<p>Starke Schmerzen, Blasenbildung, ausgeprägte Hautverletzungen oder Zeichen einer Infektion gehören nicht zu dem, was einfach ignoriert werden sollte.</p>\n<h2>Gibt es Risiken bei blutigem Schröpfen?</h2>\n<p><a href="/therapien/schroepfen/blutiges-schroepfen/">Blutiges Schröpfen</a> verletzt die Haut gezielt und hat deshalb zusätzliche Anforderungen an Hygiene, Infektionsschutz und fachgerechte Durchführung.</p>\n<p>Es ist nicht mit trockenem Schröpfen gleichzusetzen.</p>\n<h2>Wann ist besondere Vorsicht wichtig?</h2>\n<p>Zum Beispiel bei:</p>\n<ul><li>Blutgerinnungsstörungen</li><li>bestimmten blutverdünnenden Medikamenten</li><li>verletzter oder infizierter Haut</li><li>ausgeprägten Hauterkrankungen im Behandlungsgebiet</li><li>bestimmten akuten Erkrankungen</li></ul>\n<p>Die individuelle Situation entscheidet; solche Punkte gehören ins Erstgespräch.</p>\n<h2>Kurz gesagt</h2>\n<p>Schröpfmale und leichte lokale Empfindlichkeit können vorkommen. Starke Schmerzen, Hautverletzungen oder Infektionszeichen sind dagegen kein normaler Behandlungserfolg und sollten beurteilt werden.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/tut-schroepfen-weh/', label: 'Tut Schröpfen weh?' },
      { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/', label: 'Alle Fragen zu Schröpfen & Methoden' },
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Alle Fragen zu Sicherheit & Nebenwirkungen' },
    ],
    mehr: [
      { href: '/therapien/schroepfen/', label: 'Schröpfen', cat: 'Therapie' },
      { href: '/wissen/schroepfen-wirkung-flecken/', label: 'Schröpfen: Wirkung und Flecken', cat: 'Wissen' },
      { href: '/wissen/schroepfmassage/', label: 'Schröpfmassage', cat: 'Wissen' },
    ],
  },
  {
    slug: 'tut-schroepfen-weh',
    question: 'Tut Schröpfen weh?',
    title: 'Tut Schröpfen weh? So fühlt es sich normalerweise an',
    metaDesc: 'Wie sich Schröpfen anfühlt: deutlicher Zug und Druck statt Schmerz. Was bei der Schröpfmassage anders ist und warum du Schmerzen nicht aushalten musst.',
    kurz: '<p>Schröpfen sollte nicht einfach nur weh tun müssen. Durch den Unterdruck entsteht ein deutliches Ziehen und Spannungsgefühl an der Haut. Wie intensiv das empfunden wird, hängt von der Methode, der Stärke des Unterdrucks, der Körperregion und deiner individuellen Empfindlichkeit ab.</p>',
    bodyHtml: '<h2>Wie fühlt sich trockenes Schröpfen an?</h2>\n<p>Viele beschreiben:</p>\n<ul><li>starkes Saugen</li><li>Zug an Haut und Gewebe</li><li>Wärme</li><li>Druck</li><li>ein gespanntes Gefühl</li></ul>\n<p>Intensiv bedeutet nicht automatisch schmerzhaft.</p>\n<h2>Was ist bei der Schröpfmassage anders?</h2>\n<p>Bei der <a href="/wissen/schroepfmassage/">Schröpfmassage</a> wird ein Schröpfglas über eingeölte Haut bewegt. Dadurch verändert sich der Reiz ständig und kann an empfindlichen oder verspannten Stellen intensiver wahrgenommen werden.</p>\n<h2>Sollte man Schmerzen aushalten?</h2>\n<p>Nein. Eine Behandlung muss nicht besonders schmerzhaft sein, um wirksam zu sein.</p>\n<p>Wenn der Unterdruck unangenehm oder schmerzhaft ist, solltest du das unmittelbar sagen. Die Intensität kann angepasst oder das Glas entfernt werden.</p>\n<h2>Was ist nach der Behandlung normal?</h2>\n<p>Die Haut kann empfindlich sein und sichtbare Schröpfmale zeigen. Starke Schmerzen, Blasen oder ausgeprägte Hautschäden sollten dagegen nicht als normal betrachtet werden. Eine Übersicht möglicher Reaktionen gibt <a href="/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/">Schröpfen: Nebenwirkungen</a>.</p>\n<h2>Kurz gesagt</h2>\n<p>Schröpfen erzeugt einen deutlichen Zug und Druck. Es darf intensiv sein, sollte aber nicht unnötig schmerzhaft durchgeführt werden.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/', label: 'Welche Nebenwirkungen kann Schröpfen haben?' },
      { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/', label: 'Alle Fragen zu Schröpfen & Methoden' },
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
    ],
    mehr: [
      { href: '/therapien/schroepfen/', label: 'Schröpfen', cat: 'Therapie' },
      { href: '/wissen/schroepfen-wirkung-flecken/', label: 'Schröpfen: Wirkung und Flecken', cat: 'Wissen' },
    ],
  },
  {
    slug: 'tuina-nebenwirkungen',
    question: 'Welche Nebenwirkungen kann Tuina haben?',
    title: 'Tuina: Welche Nebenwirkungen können auftreten?',
    metaDesc: 'Nebenwirkungen von Tuina: was nach der manuellen TCM-Behandlung vorkommen kann, wann Vorsicht gilt und welche Beschwerden abgeklärt gehören.',
    kurz: '<p>Tuina ist eine manuelle Behandlung. Je nach Technik kann sie sehr sanft oder deutlich kräftiger sein. Danach können sich behandelte Muskeln vorübergehend empfindlich oder ähnlich wie nach einer intensiven Massage anfühlen.</p><p>Deutliche Verschlechterungen oder neue Beschwerden sollten aber nicht automatisch als normal betrachtet werden.</p>',
    bodyHtml: '<h2>Was kann nach Tuina vorkommen?</h2>\n<p>Möglich sind:</p>\n<ul><li>vorübergehende Druckempfindlichkeit</li><li>ein Muskelkater-ähnliches Gefühl</li><li>Müdigkeit</li><li>eine kurzfristige Veränderung des Spannungsgefühls</li></ul>\n<p>Wie stark jemand reagiert, hängt unter anderem von der Technik und der behandelten Region ab. Was am Behandlungstag generell gilt, steht unter <a href="/gesundheitsbibliothek/fragen/nach-der-behandlung/">Nach der Behandlung</a>.</p>\n<h2>Muss Tuina weh tun?</h2>\n<p>Nein. Manche Techniken sind kräftig, aber Schmerz ist kein notwendiges Qualitätsmerkmal.</p>\n<p>Wenn eine Technik unangenehm oder zu intensiv ist, solltest du das während der Behandlung sagen.</p>\n<h2>Wann sollte man vorsichtiger sein?</h2>\n<p>Bei akuten Verletzungen, Knochenbrüchen, starken Entzündungen, bestimmten Gefässproblemen oder anderen Erkrankungen können bestimmte manuelle Techniken ungeeignet sein.</p>\n<p>Die Behandlung muss an die individuelle Situation angepasst werden; solche Punkte gehören ins Erstgespräch.</p>\n<h2>Wann sollte man Beschwerden abklären?</h2>\n<p>Neue neurologische Symptome, starke anhaltende Schmerzen, deutliche Schwellungen oder andere ungewöhnliche Reaktionen sollten beurteilt werden. Eine Orientierung gibt <a href="/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/">Wann zuerst zum Arzt?</a></p>\n<h2>Kurz gesagt</h2>\n<p>Leichte Muskel- oder Druckempfindlichkeit kann nach Tuina vorkommen. Starke oder anhaltende Beschwerden sollten nicht einfach als normale Reaktion betrachtet werden.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Alle Fragen zu: Nach der Behandlung' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann sollte ich zuerst zum Arzt?' },
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Alle Fragen zu Sicherheit & Nebenwirkungen' },
    ],
    mehr: [
      { href: '/therapien/tuina/', label: 'Tuina', cat: 'Therapie' },
      { href: '/therapien/massage/', label: 'Massage', cat: 'Therapie' },
    ],
  },
  {
    slug: 'tcm-kraeuter-nebenwirkungen',
    question: 'Können TCM-Kräuter Nebenwirkungen haben?',
    title: 'TCM-Kräuter: Welche Nebenwirkungen und Wechselwirkungen sind möglich?',
    metaDesc: 'Chinesische Arzneimittel können Nebenwirkungen und Wechselwirkungen haben. Was bei Medikamenten, Schwangerschaft, Leber und Niere zu beachten ist.',
    kurz: '<p>Ja. Chinesische Arzneimittel können Wirkungen, Nebenwirkungen und Wechselwirkungen haben. Natürlich bedeutet nicht automatisch risikofrei.</p><p>Entscheidend sind die verwendeten Substanzen, Dosierung, Qualität, Einnahmedauer, Begleiterkrankungen und gleichzeitig eingenommene Medikamente.</p>',
    bodyHtml: '<h2>Welche Nebenwirkungen können auftreten?</h2>\n<p>Je nach Rezeptur können zum Beispiel Verdauungsbeschwerden, Übelkeit, Kopfschmerzen, Hautreaktionen oder andere unerwünschte Effekte auftreten.</p>\n<p>Eine einzelne Liste kann jedoch nicht alle möglichen Reaktionen abbilden, weil chinesische Rezepturen aus sehr unterschiedlichen Arzneimitteln bestehen können.</p>\n<h2>Können TCM-Kräuter mit Medikamenten wechselwirken?</h2>\n<p>Ja, Wechselwirkungen sind möglich.</p>\n<p>Wenn du regelmässig Medikamente einnimmst, solltest du das der behandelnden Fachperson vollständig mitteilen. Das gilt besonders bei Medikamenten mit engem therapeutischem Bereich, Blutgerinnungsmedikamenten und bei komplexen Erkrankungen. Zur Situation mit Blutverdünnern gibt es eine eigene Antwort: <a href="/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/">Blutverdünner und TCM-Behandlung</a>.</p>\n<h2>Was gilt bei Schwangerschaft und Stillzeit?</h2>\n<p>Hier ist besondere Vorsicht notwendig. Nicht jede chinesische Arznei ist in Schwangerschaft oder Stillzeit geeignet. Kläre die Einnahme in dieser Situation immer mit der verschreibenden Fachperson.</p>\n<h2>Was ist mit Leber und Niere?</h2>\n<p>Bestimmte Arzneimittel oder Verunreinigungen können Organe belasten. Qualität, korrekte Identifikation und fachgerechte Anwendung sind deshalb wichtig; seriöse Anbieter arbeiten mit geprüften Rezepturen aus kontrollierten Quellen.</p>\n<h2>Kurz gesagt</h2>\n<p>TCM-Kräuter sind pharmakologisch aktive Arzneimittel. Sie können sinnvoll eingesetzt werden, haben aber ebenso Nebenwirkungs- und Interaktionspotenzial. Wie eine seriöse <a href="/therapien/kraeutertherapie/">Kräutertherapie</a> mit Qualität und Wechselwirkungen umgeht, steht auf der Therapieseite.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-erstverschlimmerung/', label: 'Sind stärkere Beschwerden nach TCM-Kräutern eine Erstverschlimmerung?' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/', label: 'Kann ich mit Blutverdünnern zur Akupunktur?' },
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Alle Fragen zu Sicherheit & Nebenwirkungen' },
    ],
    mehr: [
      { href: '/therapien/kraeutertherapie/', label: 'Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann zuerst zum Arzt?', cat: 'Frage' },
    ],
  },
  {
    slug: 'tcm-kraeuter-erstverschlimmerung',
    question: 'Sind stärkere Beschwerden nach TCM-Kräutern eine Erstverschlimmerung?',
    title: 'Erstverschlimmerung durch TCM-Kräuter: Was bedeutet das?',
    metaDesc: 'Stärkere Beschwerden nach TCM-Kräutern sind nicht automatisch eine Erstverschlimmerung. Wann du die verschreibende Fachperson kontaktieren solltest.',
    kurz: '<p>Wenn Beschwerden nach Beginn einer Kräuterrezeptur stärker werden, sollte das nicht automatisch als Erstverschlimmerung oder notwendiger Teil der Wirkung interpretiert werden.</p><p>Neue oder stärkere Symptome können verschiedene Ursachen haben, darunter auch eine unerwünschte Wirkung, eine Wechselwirkung oder eine Veränderung der zugrunde liegenden Erkrankung.</p>',
    bodyHtml: '<h2>Was bedeutet der Begriff Erstverschlimmerung?</h2>\n<p>Der Begriff wird in verschiedenen Bereichen der Komplementärmedizin verwendet, ist aber keine Erklärung, mit der jede Verschlechterung automatisch als positiv bewertet werden sollte.</p>\n<p>Entscheidend ist, was konkret passiert ist. Für die Akupunktur gilt dieselbe Logik, siehe <a href="/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/">Starke Reaktion nach Akupunktur</a>; die Behandlungen sind aber nicht dasselbe.</p>\n<h2>Wann sollte ich die behandelnde Person kontaktieren?</h2>\n<p>Bei deutlich zunehmenden Beschwerden, neuen Symptomen oder Unsicherheit solltest du die verschreibende Fachperson kontaktieren.</p>\n<p>Besonders wichtig ist das bei:</p>\n<ul><li>Hautreaktionen</li><li>starkem Durchfall oder Erbrechen</li><li>Kreislaufproblemen</li><li>ausgeprägter Schwäche</li><li>ungewöhnlichen Schmerzen</li><li>anderen deutlichen Veränderungen</li></ul>\n<h2>Sollte ich die Kräuter einfach weiternehmen?</h2>\n<p>Eine pauschale Empfehlung ist nicht sinnvoll.</p>\n<p>Ob eine Rezeptur weitergenommen, angepasst oder pausiert werden sollte, hängt von der konkreten Situation ab und sollte mit der zuständigen Fachperson geklärt werden.</p>\n<h2>Kurz gesagt</h2>\n<p>Eine Verschlechterung nach TCM-Kräutern ist nicht automatisch ein gutes Zeichen. Neue oder deutlich stärkere Beschwerden sollten ernst genommen und fachlich eingeordnet werden. Welche Nebenwirkungen und Wechselwirkungen grundsätzlich möglich sind, steht unter <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">TCM-Kräuter: Nebenwirkungen</a>.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'Können TCM-Kräuter Nebenwirkungen haben?' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann sollte ich zuerst zum Arzt?' },
      { href: '/gesundheitsbibliothek/fragen/starke-reaktion-nach-akupunktur/', label: 'Ist eine starke Reaktion nach Akupunktur normal?' },
    ],
    mehr: [
      { href: '/therapien/kraeutertherapie/', label: 'Kräutertherapie', cat: 'Therapie' },
    ],
  },
  {
    slug: 'essen-vor-akupunktur',
    question: 'Sollte man vor Akupunktur essen?',
    title: 'Essen vor Akupunktur: Muss ich nüchtern kommen?',
    metaDesc: 'Vor Akupunktur musst du normalerweise nicht nüchtern sein. Was eine leichte Mahlzeit bringt, was bei empfindlichem Kreislauf gilt und wie das mit Kaffee ist.',
    kurz: '<p>Für eine normale Akupunkturbehandlung musst du in der Regel nicht nüchtern erscheinen. Im Gegenteil: Mit völlig leerem Magen zur Behandlung zu kommen, ist für manche Menschen unangenehm, besonders wenn sie zu Kreislaufproblemen oder Schwindel neigen.</p><p>Eine normale, leichte Mahlzeit vor dem Termin ist für viele Menschen sinnvoller als extremes Fasten oder ein sehr schweres Essen unmittelbar vorher.</p>',
    bodyHtml: '<h2>Muss ich nüchtern sein?</h2>\n<p>Akupunktur ist normalerweise keine Untersuchung oder Operation, für die routinemässig Nüchternheit erforderlich ist.</p>\n<p>Falls für deine konkrete medizinische Situation etwas anderes gilt, sollte dir das vorab mitgeteilt werden.</p>\n<h2>Wie viel sollte ich vorher essen?</h2>\n<p>Du brauchst keine besondere Akupunktur-Mahlzeit.</p>\n<p>Iss so, wie es für dich normalerweise angenehm ist. Direkt vor dem Termin kann eine sehr grosse oder schwere Mahlzeit unangenehm sein, besonders wenn du während der Behandlung liegen möchtest.</p>\n<h2>Was, wenn ich morgens keinen Hunger habe?</h2>\n<p>Du musst dich nicht zu einer grossen Mahlzeit zwingen.</p>\n<p>Wenn du allerdings weisst, dass dein Kreislauf auf leeren Magen empfindlich reagiert, kann eine kleine Mahlzeit oder ein Snack vorher sinnvoll sein.</p>\n<h2>Darf ich Kaffee trinken?</h2>\n<p>Es gibt keine allgemeine Regel, die Kaffee vor jeder Akupunkturbehandlung verbietet.</p>\n<p>Wenn du sehr empfindlich auf Koffein reagierst, Herzklopfen bekommst oder ohnehin nervös vor dem Termin bist, kann weniger Koffein für dein persönliches Wohlbefinden angenehmer sein.</p>\n<h2>Kurz gesagt</h2>\n<p>Für Akupunktur musst du normalerweise nicht nüchtern sein. Komm möglichst in einem normalen körperlichen Zustand, weder ausgehungert noch direkt nach einer sehr schweren Mahlzeit. Wie der ganze erste Termin abläuft, steht unter <a href="/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/">Was passiert beim ersten Termin?</a></p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
      { href: '/gesundheitsbibliothek/fragen/kleidung-akupunktur/', label: 'Welche Kleidung ist für Akupunktur praktisch?' },
      { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung: alle Fragen' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Was gilt nach der Behandlung?', cat: 'Frage' },
    ],
  },
  {
    slug: 'kleidung-akupunktur',
    question: 'Welche Kleidung ist für Akupunktur praktisch?',
    title: 'Was soll ich zur Akupunktur anziehen?',
    metaDesc: 'Kleidung für den Akupunkturtermin: bequem und an Armen und Beinen leicht hochzuschieben. Ob du dich ausziehen musst und was direkt aus dem Büro gilt.',
    kurz: '<p>Für einen Akupunkturtermin brauchst du keine spezielle Kleidung. Am praktischsten sind bequeme Sachen, die sich an Armen und Beinen leicht hochschieben lassen.</p><p>Welche Körperbereiche zugänglich sein müssen, hängt davon ab, weshalb du behandelt wirst und welche Punkte verwendet werden.</p>',
    bodyHtml: '<h2>Welche Kleidung ist am einfachsten?</h2>\n<p>Praktisch sind zum Beispiel:</p>\n<ul><li>eine lockere Hose</li><li>ein T-Shirt oder Oberteil mit gut zugänglichen Armen</li><li>Kleidung, die nicht sehr eng sitzt</li></ul>\n<p>Sehr enge Jeans, komplizierte Kleidung oder viele Schichten können den Zugang zu bestimmten Bereichen erschweren.</p>\n<h2>Muss ich mich ausziehen?</h2>\n<p>Nicht grundsätzlich.</p>\n<p>Viele Akupunkturpunkte liegen an Armen, Händen, Unterschenkeln und Füssen.</p>\n<p>Bei Beschwerden an Rücken, Hüfte, Bauch, Schulter oder anderen Regionen kann es notwendig sein, Kleidung teilweise abzulegen oder zu verschieben.</p>\n<p>Dabei sollte die Privatsphäre gewahrt bleiben und nur der Bereich freigelegt werden, der tatsächlich benötigt wird.</p>\n<h2>Kann ich direkt aus dem Büro kommen?</h2>\n<p>Ja.</p>\n<p>Wenn deine Kleidung unpraktisch für die Behandlung ist, lässt sich meist eine einfache Lösung finden. Du musst deinen ganzen Tagesablauf nicht nach dem Termin ausrichten.</p>\n<h2>Was ist mit Schmuck?</h2>\n<p>Schmuck muss nicht pauschal abgelegt werden. Wenn er den zu behandelnden Bereich verdeckt oder stört, kann es sinnvoll sein, einzelne Stücke abzunehmen.</p>\n<h2>Kurz gesagt</h2>\n<p>Komm bequem. Kleidung, die Arme und Beine gut zugänglich macht, ist ideal. Welche Bereiche tatsächlich benötigt werden, entscheidet sich nach deinem Anliegen. Was sonst zum ersten Termin gehört, steht unter <a href="/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/">Was passiert beim ersten Termin?</a></p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
      { href: '/gesundheitsbibliothek/fragen/essen-vor-akupunktur/', label: 'Sollte man vor Akupunktur essen?' },
      { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung: alle Fragen' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'wie-lange-dauert-akupunktur',
    question: 'Wie lange dauert eine Akupunkturbehandlung?',
    title: 'Wie lange dauert Akupunktur? Termin, Gespräch und Liegezeit',
    metaDesc: 'Wie lange ein Akupunkturtermin dauert: warum der erste Termin länger ist, was Folgetermine brauchen und warum die Nadel-Liegezeit nur ein Teil davon ist.',
    kurz: '<p>Wie lange ein Akupunkturtermin dauert, hängt davon ab, ob es dein erster Termin oder eine Folgebehandlung ist und wie umfangreich Gespräch und Behandlung sind.</p><p>Der eigentliche Zeitraum, in dem Nadeln liegen bleiben, ist nur ein Teil des gesamten Termins.</p>',
    bodyHtml: '<h2>Warum dauert der erste Termin oft länger?</h2>\n<p>Beim ersten Termin muss zunächst geklärt werden:</p>\n<ul><li>weshalb du kommst</li><li>wie lange Beschwerden bestehen</li><li>welche Diagnosen oder Untersuchungen vorhanden sind</li><li>welche Medikamente du einnimmst</li><li>welche Behandlung sinnvoll sein könnte</li></ul>\n<p>Danach folgt die eigentliche Behandlung. Den ganzen Ablauf beschreibt <a href="/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/">Was passiert beim ersten Termin?</a></p>\n<h2>Wie lange bleiben die Nadeln liegen?</h2>\n<p>Das ist eine separate Frage. Die Liegedauer hängt von Behandlung, Methode und Situation ab; ausführlich beantwortet sie der Artikel <a href="/wissen/wie-lange-bleiben-akupunkturnadeln-drin/">Wie lange bleiben Akupunkturnadeln drin?</a></p>\n<h2>Sind Folgetermine kürzer?</h2>\n<p>Häufig ist weniger Anamnese notwendig, weil dein Fall bereits bekannt ist.</p>\n<p>Trotzdem sollte genügend Zeit bleiben, um Veränderungen seit dem letzten Termin zu besprechen und die Behandlung anzupassen.</p>\n<h2>Muss ich danach noch Zeit einplanen?</h2>\n<p>Viele Patientinnen und Patienten gehen danach normal ihrem Alltag nach.</p>\n<p>Wenn du weisst, dass du nach Akupunktur <a href="/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/">müde</a> oder sehr entspannt reagierst, kann ein etwas ruhigerer Anschluss angenehmer sein.</p>\n<h2>Kurz gesagt</h2>\n<p>Der Termin umfasst mehr als die reine Nadel-Liegezeit. Beim ersten Termin solltest du zusätzlich Zeit für Gespräch und Einordnung einplanen.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
      { href: '/gesundheitsbibliothek/fragen/wie-oft-akupunktur/', label: 'Wie oft braucht man Akupunktur?' },
      { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung: alle Fragen' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/wissen/wie-lange-bleiben-akupunkturnadeln-drin/', label: 'Wie lange bleiben die Nadeln drin?', cat: 'Artikel' },
    ],
  },
  {
    slug: 'wie-viele-akupunkturnadeln',
    question: 'Wie viele Akupunkturnadeln braucht eine Behandlung?',
    title: 'Wie viele Nadeln werden bei Akupunktur verwendet?',
    metaDesc: 'Es gibt keine Standardzahl an Akupunkturnadeln. Warum die Anzahl variiert, was bei der ersten Behandlung gilt und warum mehr nicht automatisch besser ist.',
    kurz: '<p>Es gibt keine feste Anzahl von Nadeln, die bei jeder Akupunkturbehandlung verwendet werden muss.</p><p>Je nach Behandlungsansatz, Beschwerden, ausgewählten Punkten und Therapeut können wenige oder mehrere Nadeln eingesetzt werden. Mehr Nadeln bedeuten nicht automatisch eine bessere Behandlung.</p>',
    bodyHtml: '<h2>Warum ist die Anzahl unterschiedlich?</h2>\n<p>Akupunktur wird individuell geplant. Eine Therapeutin oder ein Therapeut kann zum Beispiel:</p>\n<ul><li>lokale Punkte verwenden</li><li>entfernte Punkte an Armen oder Beinen wählen</li><li>verschiedene Körperregionen kombinieren</li><li>bewusst mit einer kleinen Punktzahl arbeiten</li></ul>\n<p>Die Anzahl allein sagt wenig über die Qualität der Behandlung aus.</p>\n<h2>Werden bei der ersten Behandlung weniger Nadeln verwendet?</h2>\n<p>Das kann vorkommen, besonders wenn jemand noch nie Akupunktur hatte oder sehr empfindlich beziehungsweise nervös ist.</p>\n<p>Es gibt aber keine allgemeine Regel.</p>\n<h2>Was, wenn ich Angst vor vielen Nadeln habe?</h2>\n<p>Sag es vor Beginn.</p>\n<p>Du kannst jederzeit fragen, wie die Behandlung geplant ist. Eine gute Behandlung sollte nicht davon abhängen, dass du Angst oder starke Anspannung einfach aushältst. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/">Angst vor Akupunkturnadeln</a>.</p>\n<h2>Kann ich sagen, dass ich weniger Nadeln möchte?</h2>\n<p>Du kannst Bedenken jederzeit ansprechen.</p>\n<p>Die Therapeutin oder der Therapeut kann erklären, welche Punkte geplant sind und welche Anpassungen möglich sind.</p>\n<h2>Kurz gesagt</h2>\n<p>Es gibt keine ideale Standardzahl. Die Anzahl der Nadeln wird an Behandlung und Patient angepasst. Mehr ist nicht automatisch besser. Wie sich das Nadeln anfühlt, beschreibt <a href="/gesundheitsbibliothek/fragen/tut-akupunktur-weh/">Tut Akupunktur weh?</a></p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/', label: 'Was, wenn ich Angst vor Akupunkturnadeln habe?' },
      { href: '/gesundheitsbibliothek/fragen/wie-tief-akupunkturnadeln/', label: 'Wie tief gehen Akupunkturnadeln in die Haut?' },
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
    ],
  },
  {
    slug: 'wie-tief-akupunkturnadeln',
    question: 'Wie tief gehen Akupunkturnadeln in die Haut?',
    title: 'Wie tief werden Akupunkturnadeln gesetzt?',
    metaDesc: 'Akupunkturnadeln werden je nach Punkt, Körperregion und Anatomie unterschiedlich tief gesetzt. Warum tiefer nicht stärker bedeutet und was bei Nerven gilt.',
    kurz: '<p>Akupunkturnadeln werden nicht überall gleich tief gesetzt. Die Tiefe hängt vom gewählten Punkt, der Körperregion, der Anatomie und der Behandlungstechnik ab.</p><p>An manchen Stellen wird nur oberflächlich genadelt, an anderen können Nadeln tiefer eingebracht werden.</p>',
    bodyHtml: '<h2>Warum ist die Tiefe unterschiedlich?</h2>\n<p>Unter der Haut liegen je nach Körperregion unterschiedliche Strukturen.</p>\n<p>Ein Punkt am Gesicht wird deshalb nicht auf dieselbe Weise behandelt wie ein Punkt an einem kräftigen Muskelbereich. Die Anatomie bestimmt wesentlich mit, welche Tiefe sicher und angemessen ist.</p>\n<h2>Bedeutet tiefer auch stärker?</h2>\n<p>Nein. Eine tiefere Nadelung ist nicht automatisch wirksamer.</p>\n<p>Behandlungstechnik und Punktwahl sind wichtiger als eine möglichst grosse Tiefe.</p>\n<h2>Kann eine Nadel einen Nerv treffen?</h2>\n<p>Bestimmte Punkte liegen in der Nähe anatomischer Strukturen, weshalb anatomische Kenntnisse wichtig sind.</p>\n<p>Ein kurzes elektrisierendes Gefühl kann auftreten. Anhaltende Taubheit, Schwäche oder starke ausstrahlende Schmerzen sollten dagegen nicht einfach ignoriert werden; wie du das einordnest, steht unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/">Nerv getroffen?</a></p>\n<h2>Muss ich Angst haben, dass die Nadeln sehr tief gehen?</h2>\n<p>Wenn dir die Vorstellung Sorgen macht, sprich das vor der Behandlung an.</p>\n<p>Akupunkturnadeln sind sehr fein und die Technik wird an Region und Patient angepasst. Wie sich das anfühlt, beschreibt <a href="/gesundheitsbibliothek/fragen/tut-akupunktur-weh/">Tut Akupunktur weh?</a></p>\n<h2>Kurz gesagt</h2>\n<p>Es gibt keine Standardtiefe für Akupunktur. Sie richtet sich nach Punkt, Anatomie und Behandlungstechnik.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nerv-getroffen/', label: 'Kann bei der Akupunktur ein Nerv getroffen werden?' },
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
      { href: '/gesundheitsbibliothek/fragen/wie-viele-akupunkturnadeln/', label: 'Wie viele Akupunkturnadeln braucht eine Behandlung?' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'angst-vor-akupunktur-nadeln',
    question: 'Was, wenn ich Angst vor Akupunkturnadeln habe?',
    title: 'Angst vor Nadeln: Kann ich trotzdem Akupunktur machen?',
    metaDesc: 'Nadelangst schliesst Akupunktur nicht automatisch aus. Wie ein vorsichtiger Einstieg aussehen kann, dass du jederzeit stoppen darfst und welche nadelfreien Alternativen es gibt.',
    kurz: '<p>Angst vor Nadeln ist kein ungewöhnlicher Grund, bei Akupunktur unsicher zu sein.</p><p>Du musst diese Angst nicht verstecken. Sag bereits vor der Behandlung, dass Nadeln für dich schwierig sind. Dann kann die Behandlung ruhiger geplant und erklärt werden.</p>',
    bodyHtml: '<h2>Sind Akupunkturnadeln wie Spritzennadeln?</h2>\n<p>Nein. Akupunkturnadeln sind sehr fein und unterscheiden sich von den Hohlnadeln, die zum Beispiel für Blutentnahmen oder Injektionen verwendet werden; wie sich der Einstich anfühlt, beschreibt <a href="/gesundheitsbibliothek/fragen/tut-akupunktur-weh/">Tut Akupunktur weh?</a></p>\n<p>Trotzdem kann auch eine sehr feine Nadel bei ausgeprägter Nadelangst emotional schwierig sein.</p>\n<h2>Kann man mit wenigen Nadeln beginnen?</h2>\n<p>Je nach Behandlung kann ein vorsichtiger Einstieg möglich sein.</p>\n<p>Du kannst darum bitten, dass der Ablauf zuerst erklärt wird und nicht sofort viele Nadeln gesetzt werden. Warum die Anzahl ohnehin individuell ist, erklärt <a href="/gesundheitsbibliothek/fragen/wie-viele-akupunkturnadeln/">Wie viele Nadeln braucht eine Behandlung?</a></p>\n<h2>Kann ich jederzeit stoppen?</h2>\n<p>Ja. Wenn du dich unwohl fühlst, kannst du jederzeit sagen, dass eine Pause notwendig ist oder du die Behandlung beenden möchtest.</p>\n<h2>Gibt es Akupunktur ohne Nadeln?</h2>\n<p>Es gibt Methoden, die Punkte ohne klassische Nadeln stimulieren, zum Beispiel <a href="/therapien/akupressur/">Akupressur</a> mit Fingerdruck oder <a href="/therapien/akupunktur/laserakupunktur/">Laserakupunktur</a>.</p>\n<p>Diese Methoden sind nicht automatisch gleichwertig oder für jede Situation austauschbar, können aber eine Alternative sein.</p>\n<h2>Was, wenn mir bei Nadeln schwindelig wird?</h2>\n<p>Sag das unbedingt vorher.</p>\n<p>Die Behandlung kann im Liegen erfolgen und die Therapeutin oder der Therapeut kann besonders auf deine Reaktion achten.</p>\n<h2>Kurz gesagt</h2>\n<p>Nadelangst bedeutet nicht automatisch, dass Akupunktur ausgeschlossen ist. Sprich offen darüber. Der Ablauf kann häufig so gestaltet werden, dass du dich sicherer fühlst.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
      { href: '/gesundheitsbibliothek/fragen/wie-viele-akupunkturnadeln/', label: 'Wie viele Akupunkturnadeln braucht eine Behandlung?' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
    ],
    mehr: [
      { href: '/therapien/akupressur/', label: 'Akupressur (ohne Nadeln)', cat: 'Therapie' },
      { href: '/therapien/akupunktur/laserakupunktur/', label: 'Laserakupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'ueberweisung-akupunktur',
    question: 'Braucht man für Akupunktur eine Überweisung?',
    title: 'Brauche ich für Akupunktur eine ärztliche Überweisung?',
    metaDesc: 'Für die Terminvereinbarung in einer TCM-Praxis brauchst du meist keine ärztliche Überweisung. Was für die Krankenkasse gilt und wann zuerst der Arzt drankommt.',
    kurz: '<p>Für einen privaten Termin bei einer TCM- oder Akupunkturpraxis brauchst du in vielen Fällen keine ärztliche Überweisung, um überhaupt einen Termin zu vereinbaren.</p><p>Ob und unter welchen Voraussetzungen deine Krankenversicherung einen Teil der Kosten übernimmt, ist jedoch eine separate Frage.</p>',
    bodyHtml: '<h2>Kann ich direkt einen Termin buchen?</h2>\n<p>Bei einer selbstständig arbeitenden TCM-Praxis kannst du normalerweise direkt Kontakt aufnehmen und einen Termin vereinbaren.</p>\n<p>Du musst nicht zuerst wissen, welche Akupunkturpunkte oder Behandlungsmethode du brauchst; das klärt sich <a href="/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/">beim ersten Termin</a>.</p>\n<h2>Was ist mit der Krankenkasse?</h2>\n<p>Die Kostenübernahme hängt in der Schweiz unter anderem von deinem Versicherungsmodell, einer vorhandenen Zusatzversicherung und der Anerkennung der behandelnden Person ab.</p>\n<p>Die Regeln unterscheiden sich zwischen Versicherern und Produkten. Was die Zusatzversicherung typischerweise übernimmt und worauf du achten solltest, steht ausführlich unter <a href="/krankenkassen/akupunktur/">Akupunktur &amp; Krankenkasse</a>.</p>\n<h2>Sollte ich trotzdem vorher zum Arzt?</h2>\n<p>Bei neuen, ungeklärten, starken oder potenziell ernsthaften Beschwerden kann eine medizinische Abklärung wichtig sein.</p>\n<p>Akupunktur sollte keine notwendige Diagnostik verzögern. Eine Orientierung gibt <a href="/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/">Wann zuerst zum Arzt?</a></p>\n<h2>Kann ich ärztliche Befunde mitbringen?</h2>\n<p>Ja. Vorhandene Arztberichte, Bildgebung, Laborwerte oder Medikamentenlisten können hilfreich sein, besonders bei komplexeren Beschwerden.</p>\n<h2>Kurz gesagt</h2>\n<p>Für die Terminvereinbarung brauchst du häufig keine ärztliche Überweisung. Ob deine Versicherung Kosten übernimmt, solltest du separat anhand deiner Police und der Anerkennung des Therapeuten prüfen.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/kosten-versicherung/', label: 'Kosten & Versicherung: alle Fragen' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann sollte ich zuerst zum Arzt?' },
    ],
    mehr: [
      { href: '/krankenkassen/akupunktur/', label: 'Akupunktur & Krankenkasse', cat: 'Krankenkasse' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'wie-oft-akupunktur',
    question: 'Wie oft braucht man Akupunktur?',
    title: 'Wie oft sollte man Akupunktur machen?',
    metaDesc: 'Es gibt keinen allgemein richtigen Rhythmus für Akupunktur. Wovon die Frequenz abhängt, wann Abstände grösser werden und was gilt, wenn sich nichts verändert.',
    kurz: '<p>Es gibt keinen allgemein richtigen Rhythmus für Akupunktur.</p><p>Wie häufig Termine sinnvoll sind, hängt unter anderem davon ab, ob Beschwerden akut oder länger bestehend sind, wie stark sie ausgeprägt sind und wie du auf die bisherigen Behandlungen reagierst.</p>',
    bodyHtml: '<h2>Wird am Anfang häufiger behandelt?</h2>\n<p>Bei manchen Beschwerden können zu Beginn kürzere Abstände gewählt werden. In anderen Situationen reicht ein grösserer Abstand.</p>\n<p>Eine starre Regel wie zweimal pro Woche für jeden Patienten wäre nicht sinnvoll. Wie viele Sitzungen insgesamt realistisch sind, ist eine eigene Frage; eine grobe Orientierung gibt die Kurzantwort <a href="/gesundheitsbibliothek/fragen/akupunktur/#sitzungen">Wie viele Sitzungen brauche ich?</a></p>\n<h2>Was passiert, wenn es besser wird?</h2>\n<p>Wenn sich Beschwerden stabil verbessern, kann der Abstand zwischen Terminen angepasst werden.</p>\n<p>Ziel sollte nicht sein, möglichst viele Behandlungen zu absolvieren, sondern regelmässig zu prüfen, ob die Behandlung einen sinnvollen Beitrag leistet.</p>\n<h2>Was, wenn sich nichts verändert?</h2>\n<p>Wenn nach einer angemessenen Behandlungsphase keine erkennbare Veränderung eintritt, sollte nicht einfach unbegrenzt nach demselben Schema weiterbehandelt werden.</p>\n<p>Dann ist sinnvoll zu besprechen:</p>\n<ul><li>Ist die ursprüngliche Einschätzung noch plausibel?</li><li>Muss die Behandlung angepasst werden?</li><li>Ist weitere medizinische Abklärung sinnvoll?</li><li>Ist eine andere Therapie geeigneter?</li></ul>\n<p>Woran du eine relevante Veränderung erkennst, beschreibt <a href="/gesundheitsbibliothek/fragen/wann-wirkt-akupunktur/">Wann merkt man, ob Akupunktur wirkt?</a></p>\n<h2>Brauche ich einen festen Behandlungsplan?</h2>\n<p>Ein grober Plan kann hilfreich sein, sollte aber anhand des Verlaufs angepasst werden.</p>\n<h2>Kurz gesagt</h2>\n<p>Wie oft Akupunktur sinnvoll ist, lässt sich nicht pauschal festlegen. Der Abstand sollte zu deinem Problem und zum tatsächlichen Verlauf passen.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/wann-wirkt-akupunktur/', label: 'Wie schnell kann man eine Wirkung der Akupunktur merken?' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur/', label: 'Alle Fragen zur Akupunktur' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'wann-wirkt-akupunktur',
    question: 'Wie schnell kann man eine Wirkung der Akupunktur merken?',
    title: 'Wann merkt man, ob Akupunktur wirkt?',
    metaDesc: 'Manche merken früh eine Veränderung, bei anderen braucht es mehrere Termine, und manchmal hilft Akupunktur nicht ausreichend. Woran du einen echten Verlauf erkennst.',
    kurz: '<p>Wie schnell sich nach Akupunktur etwas verändert, ist von Person zu Person und je nach Beschwerde sehr unterschiedlich.</p><p>Manche Menschen bemerken bereits früh eine Veränderung. Bei anderen entwickelt sich ein Effekt erst über mehrere Termine. Und bei manchen bringt Akupunktur für das jeweilige Problem keine ausreichende Verbesserung.</p>',
    bodyHtml: '<h2>Muss ich nach der ersten Sitzung etwas merken?</h2>\n<p>Nein. Eine einzelne Sitzung ist nicht automatisch ein zuverlässiger Test dafür, ob Akupunktur für dein Problem hilfreich sein wird.</p>\n<p>Gleichzeitig sollte auch nicht jede ausbleibende Veränderung unbegrenzt damit erklärt werden, dass es einfach mehr Zeit braucht.</p>\n<h2>Was kann eine erste Veränderung sein?</h2>\n<p>Je nach Behandlungsziel kann eine Veränderung zum Beispiel bedeuten:</p>\n<ul><li>geringere Schmerzintensität</li><li>längere schmerzfreie Phasen</li><li>bessere Beweglichkeit</li><li>weniger häufige Beschwerden</li><li>besserer Schlaf</li><li>die Veränderung eines konkreten Symptoms</li></ul>\n<h2>Wie viele Sitzungen sollte ich ausprobieren?</h2>\n<p>Es gibt keine universelle Zahl.</p>\n<p>Wichtiger ist eine vorher vereinbarte Phase, nach der gemeinsam beurteilt wird, ob sich etwas Relevantes verändert hat. Wie sich die Frequenz sinnvoll gestaltet, steht unter <a href="/gesundheitsbibliothek/fragen/wie-oft-akupunktur/">Wie oft braucht man Akupunktur?</a></p>\n<h2>Was, wenn nichts passiert?</h2>\n<p>Wenn sich trotz Behandlung nichts verändert, sollte die Situation neu bewertet werden.</p>\n<p>Mehr Termine sind nicht automatisch die richtige Antwort; manchmal gehört auch eine weitere <a href="/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/">medizinische Abklärung</a> dazu.</p>\n<h2>Kann Akupunktur auch nicht helfen?</h2>\n<p>Ja. Keine Behandlung wirkt bei jedem Menschen und jeder Beschwerde gleich.</p>\n<p>Eine seriöse Beratung sollte deshalb nicht garantieren, dass Akupunktur dein Problem lösen wird.</p>\n<h2>Kurz gesagt</h2>\n<p>Manche Veränderungen können früh auftreten, andere brauchen Zeit. Entscheidend ist nicht ein festes Versprechen, sondern ob sich im Verlauf eine für dich relevante Verbesserung zeigt.</p>',
    verwandt: [
      { href: '/gesundheitsbibliothek/fragen/wie-oft-akupunktur/', label: 'Wie oft braucht man Akupunktur?' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann sollte ich zuerst zum Arzt?' },
    ],
    mehr: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
];

export const fragenHubBySlug = (slug: string) => fragenHubs.find((h) => h.slug === slug);
export const frageBySlug = (slug: string) => fragen.find((f) => f.slug === slug);

// Rückverlinkung Therapie-Seite -> passende Patientenfragen (kuratiert, kein Stuffing).
const FRAGEN_FOR_THERAPIE: Record<string, { href: string; label: string }[]> = {
  akupunktur: [
    { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?' },
    { href: '/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/', label: 'Was bei Angst vor Nadeln?' },
    { href: '/gesundheitsbibliothek/fragen/wie-oft-akupunktur/', label: 'Wie oft braucht man Akupunktur?' },
    { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?' },
    { href: '/gesundheitsbibliothek/fragen/muedigkeit-nach-akupunktur/', label: 'Ist Müdigkeit danach normal?' },
    { href: '/gesundheitsbibliothek/fragen/blaue-flecken-nach-akupunktur/', label: 'Sind blaue Flecken normal?' },
    { href: '/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/', label: 'Geht das mit Blutverdünnern?' },
  ],
  schroepfen: [
    { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/', label: 'Fragen zu Schröpfen & Methoden' },
    { href: '/gesundheitsbibliothek/fragen/tut-schroepfen-weh/', label: 'Tut Schröpfen weh?' },
    { href: '/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/', label: 'Welche Nebenwirkungen hat Schröpfen?' },
    { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Was gilt nach der Behandlung?' },
    { href: '/gesundheitsbibliothek/fragen/kosten-versicherung/', label: 'Kosten & Versicherung' },
  ],
  tuina: [
    { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/#tuina', label: 'Tuina oder klassische Massage?' },
    { href: '/gesundheitsbibliothek/fragen/tuina-nebenwirkungen/', label: 'Welche Nebenwirkungen kann Tuina haben?' },
    { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung' },
    { href: '/gesundheitsbibliothek/fragen/nach-der-behandlung/', label: 'Was gilt nach der Behandlung?' },
  ],
  kraeutertherapie: [
    { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/#kraeuter-medikamente', label: 'Kräuter neben Medikamenten?' },
    { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'Welche Nebenwirkungen haben TCM-Kräuter?' },
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
