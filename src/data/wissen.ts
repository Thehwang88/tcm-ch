// Single source of truth for migrated Wissen articles (Astro static pages).
// Phase 4: 3 genuine standalone articles. 34 city-variant doorway articles are 410'd
// (functions/wissen/[[path]].js + public/wissen-kill.js), NOT migrated.
// Schema: MedicalWebPage + Person(author) + FAQPage + BreadcrumbList + reviewedBy + lastReviewed.
export interface WissenFaq { q: string; a: string }
export interface WissenRelated { href: string; label: string; cat: string }
export interface WissenAuthor { name: string; role: string; bio: string }
export interface Wissen { slug: string; title: string; metaDesc: string; category: string; h1: string; lead: string; readingTime: string; ctaTitle?: string; author: WissenAuthor; reviewerName: string; datePublished: string; dateModified: string; lastReviewed: string; bodyHtml: string; faqs: WissenFaq[]; related: WissenRelated[]; }
export const wissen: Wissen[] = [
  {
    "slug": "akupunktur-bei-heuschnupfen",
    "title": "Akupunktur bei Heuschnupfen: Was die Studienlage zeigt und für wen es sinnvoll ist",
    "metaDesc": "Hilft Akupunktur bei Heuschnupfen? Was die Studienlage zeigt, wann du mit einer Behandlung beginnen solltest und wann du besser zum Arzt gehst.",
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
    "bodyHtml": "<p>Wenn im Frühling die Birken blühen oder im Sommer die Gräser, beginnt für viele dieselbe Routine: laufende Nase, juckende Augen, Niesattacken, ein dumpfer Kopf. Antihistaminika helfen, machen aber manche müde, und nicht jeder will sie über Wochen schlucken. Genau dann taucht oft die Frage auf, ob Akupunktur eine Alternative ist.</p><h2>Was bei Heuschnupfen im Körper passiert</h2><p>Heuschnupfen, medizinisch saisonale allergische Rhinitis, ist eine Überreaktion deines Immunsystems auf eigentlich harmlose Pollen. Dein Körper stuft Birken-, Gräser- oder Beifusspollen fälschlich als Bedrohung ein und schüttet Histamin aus. Die Folge kennst du: Die Schleimhäute in Nase und Augen schwellen an, jucken und sondern Sekret ab.</p><p>In der Schweiz ist etwa jede fünfte Person betroffen, und die Zahl steigt. Mit den wärmeren Jahren verlängert sich die Pollensaison, manche reagieren heute über Monate statt Wochen. Unbehandelt kann sich aus einem Heuschnupfen mit der Zeit ein allergisches Asthma entwickeln, der sogenannte Etagenwechsel. Das ist einer der Gründe, warum man die Beschwerden ernst nehmen und nicht nur wegdrücken sollte.</p><h2>Was die Forschung zeigt</h2><p>Die wichtigste Untersuchung ist die ACUSAR-Studie, geleitet von Benno Brinkhaus an der Charité Berlin und 2013 in den Annals of Internal Medicine veröffentlicht (Brinkhaus B et al., Ann Intern Med 2013;158:225-234). Es ist eine grosse, sauber gebaute Arbeit: 422 Patientinnen und Patienten mit nachgewiesener Pollenallergie wurden in drei Gruppen aufgeteilt. Eine erhielt echte Akupunktur plus Notfallmedikament bei Bedarf, eine eine Scheinakupunktur plus Medikament, die dritte nur das Medikament.</p><p>Das Ergebnis: Die echte Akupunktur-Gruppe berichtete über deutlich weniger Beschwerden und brauchte weniger Antihistaminika als beide Vergleichsgruppen. Eine spätere Auswertung bestätigte den geringeren Medikamentenbedarf (Adam D et al., Acupunct Med 2018). Bemerkenswert war auch, dass ein Teil des Effekts noch Monate nach der letzten Behandlung anhielt.</p><p>Wichtig ist die Einordnung, und hier bleibe ich ehrlich: Der Studienleiter selbst stufte die klinische Bedeutung als zurückhaltend ein, weil die Unterschiede zwischen den Gruppen zwar statistisch klar, in der Grösse aber moderat waren. Akupunktur macht aus einem starken Heuschnupfen also keinen verschwundenen, aber sie kann ihn spürbar erträglicher machen und den Griff zur Tablette reduzieren. Für jemanden, der Antihistaminika schlecht verträgt oder reduzieren möchte, ist das ein realer Gewinn. Wer eine Garantie auf Beschwerdefreiheit erwartet, wird enttäuscht.</p><h2>Der richtige Zeitpunkt entscheidet mit</h2><p>Ein Punkt, der in der Praxis oft den Unterschied macht: Wann du anfängst. Akupunktur bei Heuschnupfen wirkt am besten, wenn du nicht erst startest, wenn die Nase schon seit zwei Wochen läuft. Sinnvoll ist, einige Wochen vor deinem typischen Saisonbeginn zu beginnen, also bei einer Birkenpollen-Allergie etwa im Spätwinter, bei Gräsern im Frühling.</p><p>Über die Saison hinweg planen wir meist eine Serie von rund zehn bis zwölf Behandlungen, ähnlich wie es die ACUSAR-Studie aufgebaut hat. Eine einzelne Sitzung mitten im stärksten Pollenflug bringt erfahrungsgemäss wenig. Wenn du dich also für diesen Weg interessierst, lohnt sich die Planung im Voraus mehr als der spontane Versuch im Akutfall.</p><h2>Wann Akupunktur nicht reicht</h2><p>Akupunktur behandelt die Symptome und die Reaktionsbereitschaft, sie heilt die Allergie nicht. Bei diesen Situationen gehörst du ärztlich abgeklärt, nicht zuerst <a href=\"/standorte\">zu uns</a>:</p><ul><li>Atemnot, Engegefühl in der Brust oder pfeifendes Atmen. Das kann auf allergisches Asthma hinweisen und gehört rasch abgeklärt.</li><li>starke, plötzliche Schwellung von Lippen, Zunge oder Gesicht. Bei Verdacht auf eine schwere allergische Reaktion sofort den Notfall rufen.</li><li>Fieber, eitriges Nasensekret oder anhaltende einseitige Beschwerden. Das spricht eher für eine Nebenhöhlenentzündung als für Heuschnupfen.</li><li>Beschwerden, die das ganze Jahr bestehen. Dann steckt vielleicht keine reine Pollenallergie dahinter, sondern Hausstaubmilben, Schimmel oder anderes, was zuerst diagnostisch geklärt werden sollte.</li></ul><p>Und noch etwas Wichtiges: Wenn du an eine spezifische Immuntherapie denkst, also die Desensibilisierung beim Allergologen, ist das die einzige Behandlung, die ursächlich an der Allergie ansetzt. Akupunktur ist kein Ersatz dafür. Sie kann eine sinnvolle Ergänzung sein, gerade in der Symptomkontrolle, aber die Entscheidung über eine Immuntherapie triffst du mit deiner Ärztin.</p><h2>Kosten und Krankenkasse</h2><p>Akupunktur bei einer EMR- oder ASCA-anerkannten Therapeutin wird von den meisten Schweizer Zusatzversicherungen ganz oder teilweise rückerstattet. Wie viel pro Sitzung übernommen wird, hängt von deiner Police ab. Da bei Heuschnupfen eine ganze Serie über die Saison anfällt, lohnt sich der Blick auf deinen Jahresbeitrag besonders. Die Details, welche Versicherungen wie viel zahlen, findest du in unserem Artikel zu <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026\">Krankenkasse und TCM</a>. Kläre deinen Anteil am besten vor dem Start der Serie direkt mit deiner Versicherung.</p><p><em>Dieser Artikel ersetzt keine ärztliche Diagnose. Bei Atemnot, starker Schwellung oder Verdacht auf eine schwere allergische Reaktion wende dich sofort an den Notfall.</em></p><p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung. Quellen: Brinkhaus B et al., Acupuncture in patients with seasonal allergic rhinitis: a randomized trial, Annals of Internal Medicine 2013;158:225-234 (ACUSAR). Adam D et al., Impact of acupuncture on antihistamine use, Acupuncture in Medicine 2018.</em></p>",
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
        "href": "/beschwerden/heuschnupfen",
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
      }
    ]
  },
  {
    "slug": "tcm-naturheilpraktiker-schweiz",
    "title": "TCM-Heilpraktiker oder Naturheilpraktiker? Was die Begriffe in der Schweiz wirklich bedeuten",
    "metaDesc": "TCM-Heilpraktiker oder Naturheilpraktiker? Was die Begriffe in der Schweiz bedeuten und woran du eine seriöse, kassenanerkannte TCM-Praxis erkennst.",
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
    "title": "Akupunktur bei Nackenschmerzen: Was die Studienlage wirklich zeigt",
    "metaDesc": "Hilft Akupunktur bei Nackenschmerzen? Was die Studienlage wirklich zeigt, wie eine Behandlung abläuft und wann du zuerst ärztlich abklären solltest.",
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
    "bodyHtml": "<p>Fast jeder kennt das: Du wachst auf, drehst den Kopf zur Seite und es zieht. Oder du sitzt einen langen Tag am Bildschirm, und am Abend fühlt sich der Nacken an wie ein angezogener Schraubstock. Nackenschmerzen gehören zu den drei häufigsten Beschwerden des Bewegungsapparats. Viele kommen damit <a href=\"/standorte\">zu uns</a>, nachdem Schmerzmittel und Wärme nur kurz geholfen haben.</p>\n  <h2>Warum der Nacken so oft schmerzt</h2>\n  <p>Der Nacken trägt im Schnitt einen rund fünf Kilo schweren Kopf und hält ihn den ganzen Tag in Position. Sobald die Haltung kippt, etwa beim Blick aufs Handy oder bei stundenlanger Schreibtischarbeit, arbeiten die Muskeln gegen ein Ungleichgewicht. Das geht eine Weile gut. Irgendwann verspannt die Muskulatur, die Durchblutung sinkt und es entstehen Schmerzpunkte, die in Schulter, Hinterkopf oder Arm ausstrahlen können.</p>\n  <p>Die meisten Nackenschmerzen sind sogenannt unspezifisch. Das heisst, es steckt keine ernste Erkrankung dahinter, sondern eine Mischung aus Fehlhaltung, Stress, Bewegungsmangel und manchmal einem schlechten Kissen. Genau bei dieser Gruppe wird Akupunktur interessant, denn hier geht es nicht um eine Operation oder eine Notfallsituation, sondern um die Frage: Wie bringe ich die verspannte Muskulatur und das überreizte Nervensystem wieder ins Lot?</p>\n  <p>Es gibt aber auch Nackenschmerzen mit klarer Ursache. Ein Bandscheibenvorfall an der Halswirbelsäule, arthrotische Veränderungen, ein Schleudertrauma nach einem Unfall. Diese Fälle behandeln wir nie isoliert, sondern immer in Abstimmung mit der behandelnden Ärztin oder dem Arzt.</p>\n  <h2>Was die Forschung zeigt</h2>\n  <p>Die wichtigste Quelle ist ein systematischer Cochrane-Review von Trinh und Kolleginnen aus dem Jahr 2016. Das Team hat 27 Studien mit insgesamt rund 5'462 Teilnehmenden ausgewertet (Trinh K et al., Cochrane Database Syst Rev 2016; CD004870). Das Ergebnis ist differenziert: Menschen mit chronischen Nackenschmerzen, die echte Akupunktur erhielten, berichteten unmittelbar nach der Behandlung und kurzfristig über bessere Schmerzlinderung als Personen, die eine Scheinbehandlung bekamen oder auf einer Warteliste standen.</p>\n  <p>Wichtig ist das Wort kurzfristig. Die Studienlage belegt vor allem einen Effekt über Tage bis Wochen, nicht zwingend über Monate. Und die Autoren stufen die Qualität der Studien als niedrig bis moderat ein. Viele Untersuchungen waren klein, einige methodisch nicht sauber genug. Das relativiert die Begeisterung, mit der Akupunktur manchmal beworben wird.</p>\n  <p>Eine neuere Meta-Analyse von 2024, die 18 randomisierte Studien zusammenfasste, fand bei chronischen Nackenschmerzen sogar anhaltende Effekte nach drei und sechs Monaten, allerdings vor allem dann, wenn Akupunktur ergänzend zu anderen Massnahmen eingesetzt wurde, nicht als alleinige Therapie (PMC11416387). Interessant ist ein Detail aus dieser Auswertung: Im direkten Vergleich mit Scheinakupunktur war der reine Schmerzunterschied klein, die Funktion im Alltag besserte sich jedoch messbar. Das deckt sich mit dem, was wir in der Praxis sehen. Oft geht es weniger um die letzte Schmerzstufe auf einer Skala als darum, dass der Kopf sich wieder frei drehen lässt und der Schlaf besser wird.</p>\n  <p>Zusammengefasst: Es gibt belastbare Hinweise, dass Akupunktur bei chronischen, unspezifischen Nackenschmerzen kurzfristig Schmerz und Beweglichkeit verbessert. Sie ersetzt aber keine aktive Bewegung und keine ärztliche Abklärung bei ernsten Ursachen.</p>\n  <h2>Wie eine Behandlung bei uns abläuft</h2>\n  <p>Beim ersten Termin nehmen wir uns Zeit für die Vorgeschichte. Seit wann besteht der Schmerz, wo genau sitzt er, strahlt er aus, gibt es Begleitsymptome wie Schwindel, Kribbeln in den Armen oder Kopfschmerzen. Diese Fragen sind kein Ritual, sie entscheiden darüber, ob Akupunktur überhaupt der richtige Weg ist oder ob wir dich zuerst zur ärztlichen Abklärung schicken.</p>\n  <p>Danach setzen wir feine Nadeln, meist im Bereich der verspannten Nacken- und Schultermuskulatur, manchmal auch an Punkten an Händen oder Unterschenkeln. Die Nadeln bleiben rund zwanzig bis dreissig Minuten liegen. Die meisten spüren ein leichtes Ziehen oder ein dumpfes Schweregefühl an der Einstichstelle, was normal ist. Schmerzhaft im eigentlichen Sinn ist es selten.</p>\n  <p>Eine einzelne Sitzung bringt manchmal schon Erleichterung, verlässlicher wird es über eine Serie von etwa sechs bis acht Behandlungen. Wenn sich nach vier bis fünf Terminen gar nichts bewegt, ist das für uns ein klares Signal: Dann passt die Methode in deinem Fall nicht, und wir besprechen ehrlich, was stattdessen sinnvoll wäre. Therapie endlos weiterführen, ohne dass etwas passiert, halten wir für falsch.</p>\n  <h2>Wann Akupunktur nicht die richtige Wahl ist</h2>\n  <p>Es gibt Warnzeichen, bei denen du nicht zu uns, sondern zuerst zur Ärztin oder in den Notfall gehörst. Geh bitte ärztlich abklären, wenn der Nackenschmerz mit einem dieser Symptome auftritt:</p>\n  <ul><li>Taubheit, Kraftverlust oder anhaltendes Kribbeln in Armen oder Händen</li><li>starke Kopfschmerzen mit Nackensteifigkeit und Fieber</li><li>Schmerz nach einem Unfall, Sturz oder Schleudertrauma</li><li>Schwindel, Sehstörungen oder Sprachprobleme</li><li>nächtlicher Ruheschmerz, ungewollter Gewichtsverlust oder Fieber ohne erkennbaren Grund</li></ul>\n  <p>Diese Zeichen können auf eine Nervenwurzel-Reizung, eine Entzündung oder seltener auf etwas Ernsteres hinweisen. Akupunktur würde hier wertvolle Zeit kosten. Auch bei einer akuten Infektion, einer Blutgerinnungsstörung oder unter blutverdünnenden Medikamenten klären wir vorab ab, ob und wie wir behandeln.</p>\n  <p>Und noch etwas Ehrliches: Wenn deine Nackenschmerzen vor allem von acht Stunden täglich am gleichen Bildschirm kommen, wird auch die beste Akupunktur das Grundproblem nicht lösen. Sie verschafft Luft, aber die dauerhafte Besserung kommt aus der Kombination mit Bewegung, einer besseren Arbeitsplatzhaltung und gelegentlich aus weniger Stress. Wir sagen das lieber offen, als dir eine Behandlungsserie zu verkaufen, die das Falsche adressiert.</p>\n  <h2>Kosten und Krankenkasse</h2>\n  <p>Akupunktur bei einer von EMR oder ASCA anerkannten Therapeutin wird von den meisten Schweizer Zusatzversicherungen ganz oder teilweise rückerstattet. Wie viel pro Sitzung übernommen wird, hängt von deiner konkreten Police ab. Die Details, inklusive welche Versicherungen wie viel zahlen, findest du in unserem Artikel zu <a href=\"/wissen/krankenkasse-tcm-was-wirklich-uebernommen-wird-2026\">Krankenkasse und TCM</a>. Vor der ersten Behandlung lohnt sich ein kurzer Anruf bei deiner Versicherung, damit du Klarheit über deinen Anteil hast.</p>\n  <p><em>Dieser Artikel ersetzt keine ärztliche Diagnose. Bei den oben genannten Warnzeichen wende dich bitte zuerst an deine Ärztin oder den Notfall.</em></p>\n  <p><em>Verfasst von Corinna Reinhart, dipl. TCM-Therapeutin mit EMR- und ASCA-Anerkennung. Quellen: Trinh K et al., Acupuncture for neck disorders, Cochrane Database of Systematic Reviews 2016, CD004870. Systematic Review zu anhaltenden Effekten der Akupunktur bei chronischen Nackenschmerzen, 2024 (PMC11416387).</em></p>",
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
        "href": "/beschwerden/nackenschmerzen",
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
    "metaDesc": "Ein ehrlicher Bericht aus drei Jahren Migräne-Behandlung in unseren TCM-Kliniken: bei wem Akupunktur hilft, bei wem nicht – und was die Studienlage dazu sagt.",
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
    "bodyHtml": "<h2>Was dieser Artikel ehrlich macht.</h2>\r\n  <p>Wenn du Migräne hast, hast du wahrscheinlich schon vieles probiert. Triptane. Magnesium. Schlaftracker. Vielleicht Botox. Und jetzt überlegst du, ob Akupunktur hilft. Das ist eine berechtigte Frage, und eine, die wir in unseren Praxen jede Woche hören.</p>\r\n  <p>Wir behandeln seit drei Jahren regelmässig Migräne-Patientinnen. In dieser Zeit haben wir gelernt: bei manchen Menschen reduziert sich die Attacken-Frequenz dramatisch. Bei anderen passiert ehrlich gesagt fast nichts. Das hat Gründe, und wir schreiben sie in diesem Artikel auf.</p>\r\n  <p>Wenn du nach 11 Minuten weisst, ob ein Termin bei uns für dich Sinn macht, hat der Artikel seinen Zweck erfüllt.</p>\r\n\r\n  <div class=\"wa-callout\">\r\n    <div class=\"wa-callout-label\">In Kürze</div>\r\n    <p>Akupunktur funktioniert bei episodischer Migräne mit klaren Triggern oft sehr gut, 8 bis 12 Sitzungen reduzieren die Attacken-Frequenz bei vielen messbar. Bei chronischer Migräne (15+ Tagen pro Monat) sind die Ergebnisse durchwachsen. Bei Aura-Migräne hilft TCM begleitend, ersetzt aber keine neurologische Abklärung. Sitzung CHF 130–160, EMR/ASCA-anerkannt.</p>\r\n  </div>\r\n\r\n  <h2>Warum die Studienlage uns nicht reicht.</h2>\r\n  <p>Es gibt Cochrane-Reviews, die Akupunktur bei Migräne empfehlen. Wir kennen sie. Aber wir behandeln keine Studien, wir behandeln Menschen. Und was wir in unseren Praxen sehen, ist nuancierter als jede Meta-Analyse.</p>\r\n  <p>Was wir tatsächlich sehen: ein klares Muster, wer profitiert und wer nicht. Darüber schreiben wir hier, basierend auf rund 90 Migräne-Patientinnen, die wir über mehrere Behandlungszyklen begleitet haben.</p>\r\n\r\n  <h2>Bei wem Akupunktur in unserer Praxis konstant funktioniert.</h2>\r\n\r\n  <h3>1. Episodische Migräne, 4–10 Tage pro Monat</h3>\r\n  <p>Das ist die Gruppe mit den klarsten Erfolgen. Patientinnen, die zwischen den Attacken normal funktionieren, deren Auslöser bekannt sind (Stress, Schlafmangel, Zyklus), und die nicht täglich Schmerzmittel brauchen. Hier sehen wir nach 8 bis 12 Sitzungen oft eine Halbierung der Attacken-Frequenz. Bei einigen mehr.</p>\r\n\r\n  <h3>2. Menstruelle Migräne</h3>\r\n  <p>Wenn die Attacken klar an den Zyklus gekoppelt sind, ist Akupunktur eine unserer stärksten Karten. Wir arbeiten meist zyklusbegleitend über drei Monate. Viele Patientinnen kommen danach für Erhaltungssitzungen alle 4 bis 6 Wochen und bleiben stabil.</p>\r\n\r\n  <h3>3. Migräne mit muskulärer Komponente</h3>\r\n  <p>Patientinnen, bei denen die Attacken aus dem Nacken-Schulter-Bereich starten. Verspannungen, schlechte Bildschirm-Haltung, klassisch bei HSG-Studierenden und Bürojobs. Hier kombinieren wir Akupunktur mit Tuina und sehen oft schnelle Effekte, manchmal schon nach 3 bis 4 Sitzungen.</p>\r\n\r\n  <h3>4. Patientinnen, die mit Triptanen reduzieren wollen</h3>\r\n  <p>Wenn jemand 10+ Triptane pro Monat braucht, droht ein Übergebrauch-Kopfschmerz. Wir begleiten dann den Reduktionsprozess. Wichtig: das machen wir nie allein, sondern in Absprache mit dem Neurologen oder der Hausärztin.</p>\r\n\r\n  <div class=\"wa-pullquote\">\"Akupunktur ist bei episodischer Migräne mit klaren Triggern eine sehr gute Option. Bei chronischer Migräne mit 20 Schmerztagen im Monat sind wir ehrlich: wir helfen oft, aber wir lösen das Problem selten allein.\"</div>\r\n\r\n  <h2>Bei wem Akupunktur in unserer Praxis oft nicht reicht.</h2>\r\n  <p>Das schreiben wir bewusst auf. Wenn du in einer dieser Gruppen bist, lohnt sich ein offenes Gespräch mit uns, und vielleicht parallel mit deiner Neurologin.</p>\r\n  <ul>\r\n    <li><strong>Chronische Migräne (15+ Kopfschmerztage pro Monat über 3 Monate)</strong>, wir sehen Linderung, aber selten eine echte Umkehr. Hier braucht es meist ein Multimodal-Konzept: Neurologie, eventuell CGRP-Antikörper, Schlafmedizin, dazu TCM als Ergänzung.</li>\r\n    <li><strong>Migräne mit Aura ohne neurologische Abklärung</strong>, wir behandeln nicht, bevor das geklärt ist. Aura kann harmlos sein. Manchmal nicht. Bitte zum Neurologen zuerst.</li>\r\n    <li><strong>Schmerzmittel-Übergebrauchs-Kopfschmerz</strong>, solange täglich Schmerzmittel laufen, ist eine echte Verbesserung mit Akupunktur unrealistisch. Wir behandeln dann erst nach oder während der Pause, abgestimmt mit dem Arzt.</li>\r\n    <li><strong>Migräne als Symptom anderer Erkrankungen</strong>, Schilddrüse, Bluthochdruck, depressive Episoden, Schlafapnoe. Wenn das nicht angegangen wird, sind unsere Behandlungen Symptom-Kosmetik.</li>\r\n    <li><strong>Sekundäre Kopfschmerzen</strong>, nach Trauma, mit Sehstörungen, mit neurologischen Ausfällen. Das ist nicht TCM-Terrain. Das ist Notfall- oder Neurologie-Terrain.</li>\r\n  </ul>\r\n\r\n  <h2>Was wir Patientinnen heute anders sagen als vor drei Jahren.</h2>\r\n  <p>Vor drei Jahren haben wir „kommen Sie zu zehn Sitzungen, dann schauen wir\" gesagt. Heute sagen wir das anders.</p>\r\n  <p>Heute sagen wir: <strong>nach vier Sitzungen sehen wir, ob du zu der Gruppe gehörst, bei der es funktioniert.</strong> Wenn du dann gar keine Veränderung spürst, weniger Attacken, kürzere Attacken, weniger Triptan-Bedarf, irgendetwas, dann hören wir auf. Du sparst Geld, wir sparen dir falsche Hoffnung.</p>\r\n  <p>Und wir sagen offener: bei chronischer Migräne sind wir Ergänzung, nicht Lösung. Wer mit der Erwartung kommt, dass Akupunktur 25 Schmerztage im Monat in 5 verwandelt, wird enttäuscht. Wer mit der Erwartung kommt, dass wir die Tage besser machen und parallel mit der Neurologie an der Frequenz arbeiten, den können wir gut begleiten.</p>\r\n\r\n  <h2>Wie ein Behandlungszyklus konkret aussieht.</h2>\r\n  <ul>\r\n    <li><strong>Sitzung 1 (60 Min)</strong>, ausführliche Anamnese, Trigger-Analyse, Schmerztagebuch wenn vorhanden, erste Behandlung. Wir besprechen, was wir realistisch erwarten.</li>\r\n    <li><strong>Sitzungen 2–4 (45 Min, wöchentlich)</strong>, Aufbauphase. Hier sehen wir, ob dein System auf Akupunktur reagiert.</li>\r\n    <li><strong>Zwischenbilanz nach Sitzung 4</strong>, ehrliches Gespräch. Reduktion sichtbar? Weitermachen. Keine Veränderung? Wir sagen es.</li>\r\n    <li><strong>Sitzungen 5–10 (alle 1–2 Wochen)</strong>, Stabilisierungsphase. Hier kommen die meisten Effekte.</li>\r\n    <li><strong>Erhaltung</strong>, danach reichen meist Sitzungen alle 4 bis 6 Wochen.</li>\r\n  </ul>\r\n  <p>Mehr zur Methode selbst auf unserer Seite zu <a href=\"/therapien/akupunktur\">Akupunktur</a>. Wenn deine Migräne mit Nacken-Themen zusammenhängt, ergänzen wir oft mit <a href=\"/beschwerden/rueckenschmerzen\">Rücken- und Nackenbehandlung</a>.</p>\r\n\r\n  <h2>Was es kostet, und was die Kasse zahlt.</h2>\r\n  <p>Erstanamnese 60 Minuten: CHF 160. Folgesitzungen 45 Minuten: CHF 130. Ein typischer Migräne-Zyklus kostet brutto zwischen CHF 1'200 und CHF 1'600 über 8 bis 12 Sitzungen.</p>\r\n  <p>Wir sind <strong>EMR- und ASCA-anerkannt</strong>. Mit Zusatzversicherung für Komplementärmedizin zahlst du netto meist nur 10 bis 25 Prozent selbst. Details welche Kasse was übernimmt auf der <a href=\"/wissen\">Krankenkassen-Seite</a>.</p>\r\n  <p>Die Grundversicherung zahlt Akupunktur bei Migräne nicht. Auch wenn manche Hausärzte das anders darstellen.</p>\r\n\r\n  <h2>Wenn du jetzt überlegst, einen Termin zu machen.</h2>\r\n  <p>Schreib uns kurz, wie deine Migräne aussieht: wie viele Tage im Monat, mit oder ohne Aura, welche Medikamente, wie lange schon. Wir sagen dir dann offen, ob ein Termin bei uns Sinn macht, oder ob wir dich zuerst zu jemand anderem schicken würden.</p>\r\n  <p>Wir antworten meist innerhalb einer Stunde während der Öffnungszeiten. Termine in St. Gallen, Frauenfeld, Zürich und unseren anderen <a href=\"/wissen\">Standorten</a> meist innerhalb von 7 bis 10 Tagen.</p>\r\n</div>",
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
        "href": "/beschwerden/migraene",
        "label": "Migräne",
        "cat": "Beschwerde"
      },
      {
        "href": "/beschwerden/kopfschmerzen",
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
    "slug": "krankenkasse-tcm-was-wirklich-uebernommen-wird-2026",
    "title": "Krankenkasse und TCM: Was wirklich übernommen wird (Stand 2026)",
    "metaDesc": "Welche Schweizer Zusatzversicherungen TCM und Akupunktur übernehmen – mit konkreten Prozentsätzen, Jahreslimiten und Praxisbeispielen (Stand 2026).",
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
    "bodyHtml": "<h2>Was du als Erstes wissen musst.</h2>\r\n  <p>Wir hören diesen Satz jede Woche mehrmals: „Ich dachte, das zahlt meine Krankenkasse.\" Manchmal stimmt das. Manchmal nicht. Und der Unterschied liegt fast immer in einem einzigen Wort: <strong>Zusatzversicherung</strong>.</p>\r\n  <p>Die Schweizer Grundversicherung (KVG) zahlt Akupunktur und andere TCM-Methoden nicht, ausser sie wird von einem schulmedizinisch tätigen Arzt mit FMH-Titel durchgeführt. Das betrifft uns in der Praxis kaum. Was wir behandeln, läuft über die Zusatzversicherung (VVG).</p>\r\n  <p>Die gute Nachricht: rund 70 Prozent unserer Patientinnen haben eine solche Zusatzversicherung, oft ohne es zu wissen. Die schlechte: die Bedingungen sind unübersichtlich, und jede Kasse macht es ein bisschen anders.</p>\r\n\r\n  <div class=\"wa-callout\">\r\n    <div class=\"wa-callout-label\">In Kürze</div>\r\n    <p>TCM wird in der Schweiz fast ausschliesslich über Zusatzversicherungen für Komplementärmedizin abgerechnet. Typisch sind 75 bis 90 Prozent Rückerstattung pro Sitzung, mit einem Jahresmaximum zwischen CHF 1'000 und CHF 5'000 je nach Modell. Voraussetzung: EMR- oder ASCA-Anerkennung der Praxis. Wir sind beides. Grundversicherung zahlt nicht.</p>\r\n  </div>\r\n\r\n  <h2>Was die Grundversicherung wirklich zahlt, und was nicht.</h2>\r\n  <p>Kurzfassung: bei uns in der Regel nichts. Die KVG-Grundversicherung übernimmt Akupunktur nur, wenn:</p>\r\n  <ul>\r\n    <li>sie von einem Arzt mit eidg. Diplom durchgeführt wird</li>\r\n    <li>dieser Arzt einen Fähigkeitsausweis Akupunktur-TCM (ASA) hat</li>\r\n    <li>und es eine medizinische Indikation gibt</li>\r\n  </ul>\r\n  <p>Das trifft in der Schweiz auf eine kleine Gruppe von Ärzten zu. Unsere Therapeutinnen sind keine Ärzte mit FMH-Titel, sondern eidgenössisch diplomierte Naturheilpraktikerinnen mit Fachrichtung TCM. Das ist eine völlig andere Berufskategorie, fachlich oft mit deutlich mehr TCM-Stunden, aber abrechnungstechnisch nicht über Grundversicherung.</p>\r\n\r\n  <h2>Was deine Zusatzversicherung wahrscheinlich zahlt.</h2>\r\n  <p>Hier wird es relevant. Die meisten grossen Schweizer Krankenkassen bieten Zusatzversicherungen für Komplementärmedizin an. Die Konditionen variieren, aber das Grundmuster sieht so aus:</p>\r\n\r\n  <h3>Concordia (Natura, Diversa)</h3>\r\n  <p>Übernimmt 75 Prozent der Kosten pro Sitzung, bis CHF 3'000 pro Jahr je nach Modell. Voraussetzung: EMR- oder ASCA-Anerkennung der Therapeutin. Wir sind in beiden Registern eingetragen.</p>\r\n\r\n  <h3>Helsana (Completa, Sana)</h3>\r\n  <p>Übernimmt 75 Prozent, bis CHF 3'000 jährlich bei Completa, weniger bei Sana. Akzeptiert EMR. Eine der unkompliziertesten Kassen in der Abrechnung.</p>\r\n\r\n  <h3>Swica (Optima, Completa Praeventa)</h3>\r\n  <p>Bei Optima 90 Prozent, bis CHF 2'000 jährlich. Bei Completa Praeventa höhere Limiten. Verlangt EMR-Anerkennung.</p>\r\n\r\n  <h3>Sanitas (Classic, Jump, Vital Privat)</h3>\r\n  <p>Je nach Modell 75 bis 90 Prozent, mit Jahreslimiten zwischen CHF 1'000 und CHF 5'000. EMR und ASCA werden akzeptiert.</p>\r\n\r\n  <h3>CSS (myFlex, Alternativ, Premium)</h3>\r\n  <p>Beim Modell Alternativ üblicherweise 90 Prozent, hohe Jahreslimiten. Bei myFlex modular gestaltbar, also abhängig davon, was du gewählt hast.</p>\r\n\r\n  <h3>Visana, KPT, Sympany, Atupri, ÖKK</h3>\r\n  <p>Alle bieten Komplementärmedizin-Zusätze. Konditionen ähnlich wie oben, meist zwischen 70 und 90 Prozent Rückerstattung. Wir empfehlen: <a href=\"/wissen\">unsere Krankenkassen-Übersicht</a> oder direkt bei deiner Kasse anrufen.</p>\r\n\r\n  <div class=\"wa-pullquote\">\"Der häufigste Fehler ist nicht, dass Patientinnen keine Zusatzversicherung haben. Sondern dass sie eine haben, und sie nicht nutzen, weil sie denken, TCM sei nicht abgedeckt.\"</div>\r\n\r\n  <h2>EMR und ASCA, was diese Zeichen bedeuten.</h2>\r\n  <p>Wenn du auf der Webseite einer TCM-Praxis „EMR\" oder „ASCA\" liest, sind das die zwei wichtigsten Qualitätssiegel der Schweizer Komplementärmedizin. Sie bedeuten:</p>\r\n  <ul>\r\n    <li><strong>EMR (Erfahrungsmedizinisches Register)</strong>, strenge Kriterien für Ausbildung, Praxis, Hygiene, Weiterbildung. Wird von praktisch allen Schweizer Zusatzversicherungen akzeptiert.</li>\r\n    <li><strong>ASCA (Schweizerische Stiftung für Komplementärmedizin)</strong>, vergleichbar in den Anforderungen, leicht andere Schwerpunkte. Ebenfalls breit akzeptiert.</li>\r\n  </ul>\r\n  <p>Ohne mindestens eines dieser Siegel zahlt deine Zusatzversicherung in der Regel nicht. Wenn dir eine Praxis sagt „das ist nicht so wichtig\", ist das ein Warnsignal. Es ist sehr wichtig.</p>\r\n  <p>Wir bei TCM.ch sind bei beiden Registern aktiv, bei jeder Therapeutin in jeder Praxis. Das ist nicht selbstverständlich, sondern erfordert kontinuierliche Weiterbildung und Audits.</p>\r\n\r\n  <h2>Konkrete Beispielrechnung aus unserer Praxis.</h2>\r\n  <p>Ein typischer Behandlungszyklus für chronische Rückenschmerzen, 10 Sitzungen bei uns in St. Gallen:</p>\r\n  <ul>\r\n    <li>Erstanamnese 60 Min: <strong>CHF 160</strong></li>\r\n    <li>9 Folgesitzungen à 45 Min: <strong>9 × CHF 130 = CHF 1'170</strong></li>\r\n    <li>Total brutto: <strong>CHF 1'330</strong></li>\r\n  </ul>\r\n  <p>Mit Helsana Completa (75 Prozent Rückerstattung): du zahlst netto <strong>CHF 333</strong>, die Kasse erstattet CHF 997.</p>\r\n  <p>Mit Swica Optima (90 Prozent): du zahlst netto <strong>CHF 133</strong>, die Kasse erstattet CHF 1'197.</p>\r\n  <p>Ohne Zusatzversicherung: du zahlst die vollen CHF 1'330 selbst.</p>\r\n  <p>Wichtig: das ist eine Modellrechnung. Selbstbehalt und Franchise greifen bei Zusatzversicherungen meist nicht, aber Jahreslimiten schon. Wer im selben Jahr bereits Physiotherapie und Homöopathie über Komplementärmedizin abgerechnet hat, kann ans Limit kommen.</p>\r\n\r\n  <h2>Wie die Abrechnung bei uns konkret abläuft.</h2>\r\n  <p>Wir machen das so unkompliziert wie möglich:</p>\r\n  <ul>\r\n    <li><strong>Du bezahlst nach jeder Sitzung</strong>, bei uns per TWINT, Karte oder Rechnung.</li>\r\n    <li><strong>Du bekommst eine Quittung mit Tarmed-konformer Aufstellung</strong> inklusive EMR-/ASCA-Nummer, Therapie-Code, ZSR-Nummer.</li>\r\n    <li><strong>Du reichst die Quittung bei deiner Kasse ein</strong>, meist online über die App oder das Kundenportal.</li>\r\n    <li><strong>Die Kasse erstattet dir direkt zurück</strong>, typisch innerhalb von 2 bis 4 Wochen.</li>\r\n  </ul>\r\n  <p>Wir machen keine direkte Verrechnung mit der Kasse, weil das im VVG-Bereich selten möglich und für dich oft sogar nachteilig ist. Du behältst die Kontrolle.</p>\r\n\r\n  <h2>Die fünf häufigsten Missverständnisse, die wir hören.</h2>\r\n\r\n  <h3>1. „Mein Hausarzt hat gesagt, das wird übernommen.\"</h3>\r\n  <p>Manchmal. Aber bitte nie ungeprüft. Ruf vor der ersten Sitzung kurz bei deiner Kasse an oder schau in deine Police. „Komplementärmedizin\" muss explizit drinstehen.</p>\r\n\r\n  <h3>2. „Akupunktur ist doch jetzt offiziell anerkannt.\"</h3>\r\n  <p>Ja und nein. Ärztliche Akupunktur ist seit 2017 in der Grundversicherung, aber nur, wenn ein Arzt mit FMH-Titel und Fähigkeitsausweis sie durchführt. Das betrifft etwa zwei Prozent der Akupunktur-Behandlungen in der Schweiz. Die anderen 98 Prozent laufen weiter über Zusatz.</p>\r\n\r\n  <h3>3. „Ich habe doch eine Zusatzversicherung.\"</h3>\r\n  <p>Nicht jede Zusatzversicherung deckt Komplementärmedizin. Spital-Zusätze (allgemein/halbprivat/privat) decken in der Regel keine ambulante Akupunktur. Du brauchst spezifisch eine Komplementärmedizin- oder Alternativmedizin-Zusatzversicherung.</p>\r\n\r\n  <h3>4. „Die Sitzungen sind teuer.\"</h3>\r\n  <p>Mit Zusatzversicherung zahlst du oft weniger Selbstbehalt für eine Akupunktursitzung als für einen Restaurantbesuch. Ohne, ja, dann ist es ein bewusster Entscheid. Wir sagen das vorher, nie nachher.</p>\r\n\r\n  <h3>5. „Ich wechsle einfach kurz die Zusatzversicherung.\"</h3>\r\n  <p>Ein Wechsel der Zusatzversicherung ist schwieriger als der Grundversicherungswechsel. Mit Gesundheitsfragen, möglichen Vorbehalten, Wartefristen. Wer mit 45 erstmals eine Komplementärmedizin-Zusatzversicherung abschliessen will, bekommt sie nicht immer. Falls du eine hast und sie nutzt, sehr gut. Falls du keine hast, die Entscheidung sollte aus einer Gesamtperspektive heraus getroffen werden, nicht wegen einer Akupunktur-Serie.</p>\r\n\r\n  <h2>Wann sich TCM auch ohne Zusatzversicherung lohnt.</h2>\r\n  <p>Wir sehen regelmässig Patientinnen, die selbst zahlen. Meist in einer dieser Situationen:</p>\r\n  <ul>\r\n    <li>Akuter Behandlungsbedarf, der nicht warten kann, z. B. starke Zyklusschmerzen vor einer wichtigen Lebensphase</li>\r\n    <li>Schmerzmittel-Reduktion bei chronischen Beschwerden, wo CHF 1'500 für 10 Sitzungen langfristig billiger sind als jahrelange Pharmakologie</li>\r\n    <li>Kinderwunsch-Begleitung, wo eine IVF-Runde CHF 8'000 kostet und ein paralleler Akupunktur-Zyklus für CHF 1'200 die Erfolgsquote messbar verbessern kann</li>\r\n  </ul>\r\n  <p>Wir helfen dir, ehrlich einzuschätzen, ob sich der Selbstzahler-Weg lohnt, oder ob du erst einen anderen Weg gehen solltest.</p>\r\n\r\n  <h2>Wenn du jetzt einen Termin willst.</h2>\r\n  <p>Schreib uns vorher, welche Kasse und welches Modell du hast. Wir sagen dir, ob es wahrscheinlich übernommen wird. Wir kennen die häufigsten Konstellationen auswendig und sparen dir den Anruf bei der Kasse, wenn die Antwort klar ist.</p>\r\n  <p>Termine in <a href=\"/wissen\">allen unseren Standorten</a> meist innerhalb von 7 bis 10 Tagen. Bei Fragen zur Abrechnung selbst hilft auch unsere <a href=\"/wissen\">Krankenkassen-Übersicht</a> auf der Webseite.</p>\r\n</div>",
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
    "slug": "akupunktur-in-meiner-naehe-schweiz",
    "title": "Akupunktur in meiner Nähe: Alle Standorte in der Deutschschweiz",
    "metaDesc": "TCM-Praxen von Zürich bis St. Gallen: welche Praxis zu welcher Beschwerde passt, was es kostet und wie schnell du einen Termin in deiner Nähe bekommst.",
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
    "bodyHtml": "<h2>„Akupunktur in meiner Nähe\", die häufigste Frage.</h2>\r\n  <p>Die häufigste Frage, die wir per WhatsApp bekommen: „Habt ihr eine Praxis bei mir in der Nähe?\" Hier ist die ehrliche Übersicht. Wir behandeln an elf Standorten in der Deutschschweiz. Wenn du in einer dieser Städte oder im Umkreis von etwa 20 Kilometern wohnst, gibt es eine Praxis, die für dich gut erreichbar ist.</p>\r\n\r\n  <div class=\"wa-callout\">\r\n    <div class=\"wa-callout-label\">In Kürze</div>\r\n    <p>Elf TCM.ch-Standorte: Zürich, Winterthur, Baden, Aarau, Luzern, Zug, St. Gallen, Frauenfeld, Kreuzlingen, Schaffhausen, Chur. Alle Therapeutinnen EMR/ASCA-zertifiziert. Sitzung CHF 130–160. Krankenkasse zahlt mit Zusatzversicherung meist 75–90%. Termin meist in 24–48 Stunden über WhatsApp.</p>\r\n  </div>\r\n\r\n  <h2>Standorte nach Region.</h2>\r\n\r\n  <h3>Region Zürich</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/zuerich\"><strong>Zürich</strong></a>, Stadt Zürich, alle Spezialgebiete, Mo–Sa, Abendtermine</li>\r\n    <li><a href=\"/standorte/winterthur-muenzgasse\"><strong>Winterthur</strong></a>, Westen Zürichs, Schwerpunkt Bürobeschwerden & Kinderwunsch</li>\r\n    <li><a href=\"/standorte/baden\"><strong>Baden</strong></a>, Aargau, gut erreichbar aus Limmattal und Brugg</li>\r\n  </ul>\r\n\r\n  <h3>Zentralschweiz</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/luzern\"><strong>Luzern</strong></a>, Stadt Luzern, alle Bereiche, Abendtermine</li>\r\n    <li><a href=\"/standorte/zug\"><strong>Zug</strong></a>, speziell für Berufstätige aus Banking, Crypto und Pharma</li>\r\n  </ul>\r\n\r\n  <h3>Aargau / Mittelland</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/aarau\"><strong>Aarau</strong></a>, Kanton Aargau, Schwerpunkt Schmerz und Stressmedizin</li>\r\n  </ul>\r\n\r\n  <h3>Ostschweiz</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/st-gallen\"><strong>St. Gallen</strong></a>, Stadt St. Gallen, breites Spektrum, HSG-Patientinnen</li>\r\n    <li><a href=\"/standorte/frauenfeld\"><strong>Frauenfeld</strong></a>, unsere Hauptpraxis, alle Bereiche, längste Öffnungszeiten</li>\r\n    <li><a href=\"/standorte/kreuzlingen\"><strong>Kreuzlingen</strong></a>, Bodensee, Schwerpunkt Frauengesundheit & Kinderwunsch</li>\r\n    <li><a href=\"/standorte/schaffhausen\"><strong>Schaffhausen</strong></a>, Region Schaffhausen, gut erreichbar aus dem Klettgau</li>\r\n  </ul>\r\n\r\n  <h3>Graubünden</h3>\r\n  <ul>\r\n    <li><a href=\"/standorte/chur\"><strong>Chur</strong></a>, Kanton Graubünden, einzige TCM-Praxis im Bündner Rheintal</li>\r\n  </ul>\r\n\r\n  <div class=\"wa-pullquote\">\"Wir sind bewusst nicht überall, sondern dort, wo wir Therapeutinnen mit echter Erfahrung haben. Eine Praxis ohne gute Therapeutin ist nur eine Adresse, kein Standort.\"</div>\r\n\r\n  <h2>Wie du den richtigen Standort findest.</h2>\r\n  <p>Drei einfache Regeln:</p>\r\n  <ul>\r\n    <li><strong>Wähle den Standort mit der kürzesten Strecke</strong>, nicht den prominentesten. Akupunktur funktioniert nur, wenn du regelmässig kommst. 30 Minuten Anfahrt mehr pro Sitzung bedeuten oft, dass nach drei Wochen Schluss ist.</li>\r\n    <li><strong>Wenn deine Beschwerde spezifisch ist, wähle nach Spezialgebiet.</strong> Kinderwunsch in Kreuzlingen, Migräne in St. Gallen, Stress in Zug oder Zürich, das macht einen Unterschied.</li>\r\n    <li><strong>Bei Unsicherheit: WhatsApp.</strong> Wir empfehlen ehrlich den passenden Standort, auch wenn das manchmal nicht der nächste ist.</li>\r\n  </ul>\r\n\r\n  <h2>Was an allen Standorten gleich ist.</h2>\r\n  <ul>\r\n    <li>Alle Therapeutinnen sind EMR- und ASCA-zertifiziert</li>\r\n    <li>Gleiche Preise: CHF 160 Erstanamnese (60 Min), CHF 130 Folgesitzung (45 Min)</li>\r\n    <li>Krankenkassen-Abrechnung über alle gängigen Zusatzversicherungen (Helsana, Swica, CSS, Sanitas, Concordia und andere)</li>\r\n    <li>Termine in der Regel 24–48 Stunden über WhatsApp</li>\r\n    <li>Akut-Slots täglich für Patientinnen mit Schmerzen, Migräne, Schlafstörungen</li>\r\n    <li>Ehrliche Zwischenbilanz nach 4 Sitzungen, wenn es nicht wirkt, sagen wir das</li>\r\n  </ul>\r\n\r\n  <h2>Standorte, an denen wir bewusst nicht sind, und warum.</h2>\r\n  <p>Wir haben uns lange überlegt, ob wir in Basel, Bern, Genf oder ins Tessin gehen. Bisher: nein. Der Grund ist einfach: wir hatten dort keine Therapeutin, die unserem Qualitätsanspruch genügt und die wir persönlich kennen. Lieber elf gute Standorte als zwanzig durchschnittliche.</p>\r\n  <p>Wenn du in Basel oder Bern wohnst und nach guter TCM suchst: ehrlicher Rat, frag bei der EMR-Therapeutendatenbank nach lokalen Empfehlungen. Wir können dort nicht für die Qualität bürgen.</p>\r\n\r\n  <h2>Was du bei der ersten Anfrage angeben solltest.</h2>\r\n  <ul>\r\n    <li>Deine Hauptbeschwerde (was bringt dich zu uns)</li>\r\n    <li>Wie lange das schon geht</li>\r\n    <li>Wo du wohnst (PLZ reicht)</li>\r\n    <li>Drei Tageszeiten, die für Termine passen würden</li>\r\n    <li>Falls relevant: bisherige Diagnosen oder Therapien</li>\r\n  </ul>\r\n  <p>Mit diesen Infos können wir dir innert ein bis zwei Stunden den passenden Standort, die passende Therapeutin und konkrete Slots vorschlagen.</p>\r\n\r\n  <p>Mehr zu unserer Methode auf der <a href=\"/therapien/akupunktur\">Akupunktur-Seite</a>. Wenn du nach Beschwerdebild suchst, hilft die <a href=\"/wissen\">Beschwerden-Übersicht</a>.</p>\r\n</div>",
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
  }
];
export const wissenBySlug = (slug: string): Wissen | undefined => wissen.find((w) => w.slug === slug);
