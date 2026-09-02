// Themenseiten unter /krankenkassen/<slug>.
//
// Warum es diese Seiten gibt: Der Hub /krankenkassen/ deckt Grundversicherung,
// Zusatzversicherung, 29 Kassen und alle Methoden auf einer Seite ab — und rankt deshalb
// für seine eigenen Kernbegriffe auf Position 45 bis 78 (GSC, Q3 2026). Zum Vergleich:
// "massage krankenkasse" wird von einem blossen Abschnitt auf /therapien/massage/
// bedient und steht auf Position 20,5. Ein Abschnitt schlägt den Hub um 25 Plätze.
// Deshalb pro Suchintention eine eigene Seite; der Hub bleibt die Übersicht.
//
// Fachliche Grundlage für die Grundversicherungs-Aussagen: BAG, "Ärztliche
// Komplementärmedizin" — die OKP übernimmt Akupunktur nur bei Ärztinnen und Ärzten mit
// Facharzttitel und komplementärmedizinischer Weiterbildung. Leistungen nicht-ärztlicher
// Therapeut:innen laufen über die Zusatzversicherung.
// https://www.bag.admin.ch/de/arztliche-komplementaermedizin

export interface KkCard { title: string; text: string; href?: string }
export interface KkPill { label: string; href: string }
export interface KkFrage { q: string; a: string }

export interface KkThema {
  slug: string;
  crumb: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;          // enthält <em> für die Akzentfarbe
  lead: string;
  trust: string[];     // drei kurze Häkchen-Punkte im Hero
  introLabel: string;
  introTitle: string;  // enthält <em>
  intro: string[];     // Absätze, HTML erlaubt
  cardsLabel: string;
  cardsTitle: string;
  cardsSub: string;
  cards: KkCard[];
  kkTitle: string;
  kkProse: string[];
  kkFacts: string[];
  pillsTitle: string;
  pillsSub: string;
  pills: KkPill[];
  faqs: KkFrage[];
  ctaTitle: string;
  ctaText: string;
  waText: string;
}

export const kkThemen: KkThema[] = [
  // ────────────────────────────────────────────────────────────── MASSAGE
  {
    slug: 'massage',
    crumb: 'Massage',
    metaTitle: 'Massage & Krankenkasse: was die Zusatzversicherung zahlt | TCM.ch',
    metaDesc: 'Medizinische Massage über die Krankenkasse: was anerkannt ist, wie viel zurückkommt, warum die Grundversicherung nicht zahlt und ob du eine ärztliche Verordnung brauchst.',
    h1: 'Massage und <em>Krankenkasse.</em>',
    lead: 'Die Grundversicherung zahlt keine Massagen. Die Zusatzversicherung für Komplementärmedizin schon, wenn die Behandlung bei einer anerkannten Fachperson stattfindet. Was das konkret heisst, wie viel zurückkommt und wo die Grenze zwischen Behandlung und Wellness verläuft.',
    trust: ['EMR &amp; ASCA anerkannt', 'Keine ärztliche Verordnung nötig', 'Meist 50 bis 90% Rückerstattung'],
    introLabel: 'Der Unterschied',
    introTitle: 'Behandlung wird gezahlt, <em>Wohlfühlen nicht.</em>',
    intro: [
      'Die entscheidende Trennlinie verläuft nicht zwischen teuer und günstig, sondern zwischen medizinischer Massage und Wellness. Eine <a href="/therapien/massage/medizinische-massage/">medizinische Massage</a> arbeitet an einem konkreten Befund: verspannte Nackenmuskulatur, ein überlasteter unterer Rücken, eine Schulter, die nach dem Sturz nicht mehr richtig mitmacht. Sie wird geplant, dokumentiert und über die Zusatzversicherung abgerechnet.',
      'Eine Entspannungsmassage tut genauso gut, ist aber keine Behandlung im Sinne der Versicherung. Die zahlst du selbst. Das ist keine Willkür der Kassen, sondern die Logik dahinter: erstattet wird, was auf ein medizinisches Problem zielt.',
      'Bei uns arbeiten medizinische Masseur:innen und TCM-Therapeut:innen unter anerkannter ZSR-Nummer, eingetragen bei EMR und ASCA. Genau dieser Eintrag ist die Voraussetzung dafür, dass deine Zusatzversicherung mitzahlt — nicht der Praxisname und nicht die Technik.',
    ],
    cardsLabel: 'Wer zahlt was',
    cardsTitle: 'Drei Töpfe, klar <em>getrennt.</em>',
    cardsSub: 'Wo deine Massage landet, entscheidet sich vor der ersten Sitzung, nicht bei der Rechnung.',
    cards: [
      { title: 'Grundversicherung', text: 'Zahlt Massage nicht. Weder klassisch noch medizinisch, unabhängig von der Kasse. Ausnahme sind ärztlich verordnete Physiotherapie-Leistungen, das ist etwas anderes.' },
      { title: 'Zusatzversicherung', text: 'Übernimmt medizinische Massage bei EMR- oder ASCA-anerkannten Therapeut:innen, meist 50 bis 90 Prozent pro Sitzung bis zu einem Jahresmaximum.' },
      { title: 'Selbstzahler', text: 'Reine Entspannungs- und Wellness-Massagen. Auch die machen wir, wir sagen dir dann aber vorher, dass die Rechnung bei dir bleibt.' },
    ],
    kkTitle: 'Was du <em>zurückbekommst.</em>',
    kkProse: [
      'Wie viel deine Kasse übernimmt, steht in deiner Zusatzversicherung für Komplementärmedizin, nicht im Gesetz. Übliche Bandbreite in der Schweiz: 50 bis 90 Prozent pro Sitzung, gedeckelt durch ein jährliches Maximum. Manche Policen rechnen zusätzlich nach einem Höchstpreis pro Zeiteinheit ab.',
      'Eine ärztliche Verordnung brauchst du für diesen Weg nicht. Du kannst direkt einen Termin anfragen. Was die einzelnen Kassen konkret vorsehen, haben wir im <a href="/krankenkassen/">Krankenkassen-Vergleich</a> für 29 Anbieter zusammengetragen.',
      'Praktischer Rat: Frag deine Kasse vor der ersten Sitzung nach dem Jahresmaximum, nicht nach dem Prozentsatz. Der Deckel ist es, an dem die meisten im Herbst hängen bleiben.',
    ],
    kkFacts: [
      'Zusatzversicherung statt Grundversicherung',
      'Keine ärztliche Verordnung nötig',
      'EMR- und ASCA-anerkannte Therapeut:innen',
      'Meist 50 bis 90% pro Sitzung',
      'Jahresmaximum beachten',
    ],
    pillsTitle: 'Welche Massage ist <em>abrechenbar?</em>',
    pillsSub: 'Die häufigsten medizinischen Techniken bei uns. Jede Seite erklärt Wirkung, Ablauf und Grenzen.',
    pills: [
      { label: 'Medizinische Massage', href: '/therapien/massage/medizinische-massage/' },
      { label: 'Lymphdrainage', href: '/therapien/massage/lymphdrainage/' },
      { label: 'Triggerpunktmassage', href: '/therapien/massage/triggerpunktmassage/' },
      { label: 'Sportmassage', href: '/therapien/massage/sportmassage/' },
      { label: 'Deep-Tissue-Massage', href: '/therapien/massage/deep-tissue-massage/' },
      { label: 'Alle Massagearten', href: '/therapien/massage/' },
    ],
    faqs: [
      { q: 'Zahlt die Krankenkasse eine Massage?', a: 'Die Zusatzversicherung für Komplementärmedizin übernimmt medizinische Massagen bei EMR- oder ASCA-anerkannten Therapeut:innen, in der Regel 50 bis 90 Prozent pro Sitzung. Die Grundversicherung zahlt keine Massagen.' },
      { q: 'Welche Massage ist krankenkassenanerkannt?', a: 'Anerkannt ist nicht die Technik, sondern die Fachperson. Entscheidend ist, ob deine Therapeutin oder dein Therapeut unter einer anerkannten ZSR-Nummer arbeitet und im EMR- oder ASCA-Register für die Methode eingetragen ist. Medizinische Massage, Lymphdrainage oder Triggerpunktarbeit sind dann abrechenbar, eine reine Wellness-Massage nicht.' },
      { q: 'Brauche ich eine ärztliche Verordnung für die Massage?', a: 'Für die Abrechnung über die Zusatzversicherung nicht. Du kannst direkt einen Termin anfragen. Nur bei ärztlich verordneter Physiotherapie über die Grundversicherung braucht es eine Verordnung, das ist ein anderer Weg.' },
      { q: 'Wie viel zahlt die Zusatzversicherung pro Sitzung?', a: 'Je nach Police meist 50 bis 90 Prozent, oft bis zu einem jährlichen Maximum. Einige Kassen rechnen zusätzlich nach einem Höchstpreis pro Zeiteinheit ab. Verbindlich ist immer deine Police.' },
      { q: 'Ist eine Massage bei Rückenschmerzen abrechenbar?', a: 'Ja, wenn sie als medizinische Massage bei einer anerkannten Fachperson stattfindet. Rücken- und Nackenbeschwerden sind der häufigste Grund, aus dem Patient:innen zu uns kommen.' },
      { q: 'Was ist eine ZSR-Nummer?', a: 'Die Zahlstellenregister-Nummer weist eine Fachperson gegenüber den Krankenversicherern als abrechnungsberechtigt aus. Ohne sie kann die Kasse eine Rechnung nicht erstatten, egal wie gut die Behandlung war.' },
    ],
    ctaTitle: 'Deckung vorher <em>klären.</em>',
    ctaText: 'Sag uns, wie du versichert bist. Wir schauen mit dir an, was deine Police hergibt, bevor du dich für einen Termin entscheidest.',
    waText: 'Hallo, ich möchte wissen, ob meine Krankenkasse die Massage übernimmt.',
  },

  // ─────────────────────────────────────────────────────────── AKUPUNKTUR
  {
    slug: 'akupunktur',
    crumb: 'Akupunktur',
    metaTitle: 'Akupunktur & Krankenkasse: Grundversicherung oder Zusatz? | TCM.ch',
    metaDesc: 'Akupunktur und Krankenkasse in der Schweiz: Wann die Grundversicherung zahlt, wann die Zusatzversicherung, wie viel zurückkommt und warum die ZSR-Nummer entscheidet.',
    h1: 'Akupunktur und <em>Krankenkasse.</em>',
    lead: 'Beide Wege gibt es: Die Grundversicherung übernimmt Akupunktur, aber nur bei Ärztinnen und Ärzten mit entsprechender Weiterbildung. Bei nicht-ärztlichen Therapeut:innen wie bei uns läuft es über die Zusatzversicherung für Komplementärmedizin. Der Unterschied ist wichtig, weil er über Betrag und Ablauf entscheidet.',
    trust: ['EMR &amp; ASCA anerkannt', 'Keine ärztliche Verordnung nötig', '29 Kassen im Vergleich'],
    introLabel: 'Zwei Wege',
    introTitle: 'Grundversicherung oder <em>Zusatzversicherung?</em>',
    intro: [
      'Akupunktur gehört seit 2017 zu den fünf komplementärmedizinischen Methoden, die von der obligatorischen Krankenpflegeversicherung übernommen werden. Der Haken steht im Kleingedruckten des Bundesamts für Gesundheit: Abrechnen dürfen ausschliesslich Ärztinnen und Ärzte, die einen Facharzttitel und eine komplementärmedizinische Weiterbildung mitbringen. Leistungen nicht-ärztlicher Therapeut:innen laufen nicht über die Grundversicherung.',
      'Das ist der Grund, warum du bei uns nicht über die Grundversicherung abrechnest. Unsere Therapeut:innen sind ausgebildete TCM-Fachpersonen, EMR- und ASCA-anerkannt, aber keine Ärzt:innen. Der Weg führt deshalb über deine Zusatzversicherung für Komplementärmedizin.',
      'In der Praxis ist das selten ein Nachteil. Zusatzversicherungen decken Akupunktur meist grosszügig, verlangen keine ärztliche Verordnung und lassen dir die freie Wahl der Praxis. Was die einzelnen Anbieter vorsehen, findest du im <a href="/krankenkassen/">Vergleich der 29 Kassen</a>.',
    ],
    cardsLabel: 'Wer zahlt was',
    cardsTitle: 'Der Unterschied in <em>drei Sätzen.</em>',
    cardsSub: 'Wer behandelt, entscheidet über den Topf. Nicht die Methode.',
    cards: [
      { title: 'Grundversicherung', text: 'Übernimmt Akupunktur nur bei Ärztinnen und Ärzten mit Facharzttitel und komplementärmedizinischer Weiterbildung. Franchise und Selbstbehalt gelten wie bei jeder ärztlichen Leistung.' },
      { title: 'Zusatzversicherung', text: 'Der Weg für nicht-ärztliche Therapeut:innen mit EMR- oder ASCA-Anerkennung. Meist 70 bis 90 Prozent pro Sitzung bis zu einem Jahresmaximum, ohne Verordnung.' },
      { title: 'Beides zusammen', text: 'Möglich, aber selten nötig. Wenn du beim Arzt und in einer TCM-Praxis behandelt wirst, laufen die Rechnungen getrennt über den jeweils passenden Topf.' },
    ],
    kkTitle: 'Was du <em>zurückbekommst.</em>',
    kkProse: [
      'Über die Zusatzversicherung liegt die Rückerstattung für Akupunktur je nach Police meist zwischen 70 und 90 Prozent pro Sitzung, gedeckelt durch ein jährliches Maximum. Einige Kassen rechnen nach einem Höchstpreis pro Zeiteinheit ab, andere pauschal pro Behandlung.',
      'Eine ärztliche Verordnung ist für diesen Weg nicht nötig. Wichtig ist die ZSR-Nummer der behandelnden Fachperson und ihr Eintrag im EMR- oder ASCA-Register. Beides bringen unsere Therapeut:innen mit, du musst da nichts prüfen.',
      'Wenn du ohnehin über einen Kassenwechsel nachdenkst: Der Unterschied zwischen einer guten und einer schwachen Komplementärmedizin-Deckung ist bei regelmässiger Akupunktur schnell vierstellig im Jahr. Der <a href="/krankenkassen/">Kassenvergleich</a> zeigt, wer was vorsieht.',
    ],
    kkFacts: [
      'Grundversicherung nur bei Ärzt:innen mit Weiterbildung',
      'Bei uns: Zusatzversicherung, keine Verordnung',
      'Meist 70 bis 90% pro Sitzung',
      'ZSR-Nummer und EMR/ASCA entscheiden',
      'Jahresmaximum beachten',
    ],
    pillsTitle: 'Häufige Gründe für <em>Akupunktur.</em>',
    pillsSub: 'Die Beschwerden, mit denen Patient:innen am häufigsten zu uns kommen.',
    pills: [
      { label: 'Rückenschmerzen', href: '/beschwerden/rueckenschmerzen/' },
      { label: 'Nackenschmerzen', href: '/beschwerden/nackenschmerzen/' },
      { label: 'Migräne', href: '/beschwerden/migraene/' },
      { label: 'Schlafprobleme', href: '/beschwerden/schlafprobleme/' },
      { label: 'Kinderwunsch', href: '/beschwerden/kinderwunsch/' },
      { label: 'Akupunktur im Detail', href: '/therapien/akupunktur/' },
    ],
    faqs: [
      { q: 'Zahlt die Grundversicherung Akupunktur?', a: 'Ja, aber nur wenn die Behandlung von einer Ärztin oder einem Arzt mit Facharzttitel und komplementärmedizinischer Weiterbildung durchgeführt wird. Behandlungen bei nicht-ärztlichen TCM-Therapeut:innen laufen über die Zusatzversicherung.' },
      { q: 'Zahlt die Krankenkasse Akupunktur bei TCM.ch?', a: 'Über deine Zusatzversicherung für Komplementärmedizin ja. Unsere Therapeut:innen sind EMR- und ASCA-anerkannt und arbeiten unter anerkannter ZSR-Nummer. Je nach Police kommen meist 70 bis 90 Prozent pro Sitzung zurück.' },
      { q: 'Brauche ich eine ärztliche Verordnung?', a: 'Für die Abrechnung über die Zusatzversicherung nicht. Du kannst direkt einen Termin anfragen, ohne vorher zum Arzt zu gehen.' },
      { q: 'Was kostet eine Sitzung, wenn ich selbst zahle?', a: 'Das hängt von Dauer und Behandlungsumfang ab. Sag uns vor dem Termin, dass du selbst zahlst, dann bekommst du die Kosten vorher genannt und nicht erst auf der Rechnung.' },
      { q: 'Was ist der Unterschied zwischen EMR und ASCA?', a: 'Beides sind Register, über die Krankenversicherer die Qualifikation von Therapeut:innen prüfen. Welches Register eine Kasse akzeptiert, steht in ihren Bedingungen. Unsere Therapeut:innen sind in beiden anerkannt, damit die Frage für dich keine Rolle spielt.' },
      { q: 'Gilt die Franchise bei Akupunktur?', a: 'Über die Grundversicherung ja, dort greifen Franchise und Selbstbehalt wie bei jeder ärztlichen Leistung. Über die Zusatzversicherung nicht, dort gelten die Bedingungen deiner Police.' },
    ],
    ctaTitle: 'Deckung vorher <em>klären.</em>',
    ctaText: 'Sag uns, wie du versichert bist. Wir schauen mit dir an, was deine Police hergibt, bevor du dich für einen Termin entscheidest.',
    waText: 'Hallo, ich möchte wissen, ob meine Krankenkasse die Akupunktur übernimmt.',
  },

  // ────────────────────────────────────────────────────────────── SHIATSU
  {
    slug: 'shiatsu',
    crumb: 'Shiatsu',
    metaTitle: 'Shiatsu & Krankenkasse: anerkannt oder nicht? | TCM.ch',
    metaDesc: 'Shiatsu und Krankenkasse in der Schweiz: Warum die Grundversicherung nicht zahlt, was die Zusatzversicherung übernimmt und woran du erkennst, ob deine Police Shiatsu einschliesst.',
    h1: 'Shiatsu und <em>Krankenkasse.</em>',
    lead: 'Shiatsu ist eine Komplementärtherapie, keine ärztliche Leistung. Die Grundversicherung zahlt deshalb nicht. Viele Zusatzversicherungen schon — allerdings nicht alle, und nicht alle im selben Umfang. Woran du erkennst, ob deine Police dazugehört.',
    trust: ['EMR &amp; ASCA anerkannt', 'Keine ärztliche Verordnung nötig', 'Deckung vorab prüfbar'],
    introLabel: 'Der Status',
    introTitle: 'Anerkannt heisst nicht <em>automatisch gedeckt.</em>',
    intro: [
      'Shiatsu zählt in der Schweiz zu den Methoden der Komplementärtherapie. Es ist keine ärztliche Leistung und gehört damit nicht zu den fünf komplementärmedizinischen Verfahren, die von der Grundversicherung übernommen werden. Wer Shiatsu über die Grundversicherung abrechnen will, wird das nirgends können.',
      'Der Weg führt über die Zusatzversicherung für Komplementärmedizin. Und hier liegt der Punkt, den viele übersehen: Die Kassen führen Listen anerkannter Methoden, und Shiatsu steht nicht in jeder. Bei manchen Anbietern ist es voll dabei, bei anderen gar nicht, bei wieder anderen nur im höheren Tarif.',
      'Was in jedem Fall gilt: Die Fachperson muss im EMR- oder ASCA-Register für Shiatsu eingetragen sein und unter anerkannter ZSR-Nummer arbeiten. Erst dann stellt sich die Frage nach der Police überhaupt.',
    ],
    cardsLabel: 'Wer zahlt was',
    cardsTitle: 'Kurz und <em>unromantisch.</em>',
    cardsSub: 'Bei Shiatsu lohnt sich der Blick in die Police mehr als bei jeder anderen Methode.',
    cards: [
      { title: 'Grundversicherung', text: 'Zahlt nicht. Shiatsu ist keine ärztliche Leistung und gehört nicht zu den fünf Methoden der ärztlichen Komplementärmedizin.' },
      { title: 'Zusatzversicherung', text: 'Übernimmt Shiatsu, wenn die Methode in deiner Police als anerkannt geführt wird und die Fachperson registriert ist. Üblich sind 70 bis 90 Prozent bis zu einem Jahresmaximum.' },
      { title: 'Wenn nicht gedeckt', text: 'Dann bleibt die Rechnung bei dir. Oft ist eine verwandte, gedeckte Methode wie Tuina die praktischere Wahl, das klären wir vorher mit dir.' },
    ],
    kkTitle: 'So prüfst du deine <em>Police.</em>',
    kkProse: [
      'Such in deinen Versicherungsbedingungen nach der Liste anerkannter Methoden und schau nach, ob Shiatsu darin auftaucht. Steht dort nur ein allgemeiner Begriff wie Komplementärtherapie, ruf kurz an und frag nach der Methodenliste. Der Anruf dauert fünf Minuten und erspart dir eine Überraschung nach der dritten Sitzung.',
      'Zweiter Punkt: Frag nach dem Jahresmaximum, nicht nur nach dem Prozentsatz. Bei regelmässigen Behandlungen ist der Deckel die relevante Zahl.',
      'Wenn deine Police Shiatsu nicht führt, heisst das nicht, dass du auf manuelle Behandlung verzichten musst. <a href="/therapien/tuina/">Tuina</a> ist die manuelle Therapie der chinesischen Medizin und in mehr Policen enthalten. Was wir dir empfehlen, hängt aber von deinem Anliegen ab, nicht von der Abrechnung.',
    ],
    kkFacts: [
      'Grundversicherung: nein',
      'Zusatzversicherung: je nach Methodenliste',
      'EMR/ASCA-Eintrag für Shiatsu nötig',
      'Meist 70 bis 90% pro Sitzung',
      'Methodenliste der Kasse vorher prüfen',
    ],
    pillsTitle: 'Shiatsu und <em>verwandte Methoden.</em>',
    pillsSub: 'Wenn deine Police Shiatsu nicht führt, gibt es fast immer eine gedeckte Alternative.',
    pills: [
      { label: 'Shiatsu', href: '/therapien/shiatsu/' },
      { label: 'Tuina', href: '/therapien/tuina/' },
      { label: 'Akupressur', href: '/therapien/akupressur/' },
      { label: 'Medizinische Massage', href: '/therapien/massage/medizinische-massage/' },
      { label: 'Alle Therapien', href: '/therapien/' },
    ],
    faqs: [
      { q: 'Ist Shiatsu krankenkassenanerkannt?', a: 'Über die Zusatzversicherung für Komplementärmedizin ja, sofern deine Police Shiatsu in ihrer Methodenliste führt und die Fachperson im EMR- oder ASCA-Register für Shiatsu eingetragen ist. Die Grundversicherung übernimmt Shiatsu nicht.' },
      { q: 'Welche Krankenkassen zahlen Shiatsu?', a: 'Das lässt sich nicht pauschal beantworten, weil es innerhalb derselben Kasse vom Tarif abhängt. Such in deinen Bedingungen die Liste anerkannter Methoden oder frag telefonisch nach. Einen Überblick über die Deckung der 29 grössten Kassen findest du in unserem Krankenkassen-Vergleich.' },
      { q: 'Warum zahlt die Grundversicherung Shiatsu nicht?', a: 'Weil die Grundversicherung im Bereich Komplementärmedizin nur ärztliche Leistungen übernimmt, und zwar fünf definierte Methoden. Shiatsu ist eine Komplementärtherapie und wird nicht ärztlich erbracht.' },
      { q: 'Brauche ich eine ärztliche Verordnung für Shiatsu?', a: 'Nein. Für die Abrechnung über die Zusatzversicherung genügt die Behandlung bei einer anerkannten Fachperson.' },
      { q: 'Was ist der Unterschied zwischen Shiatsu und Tuina?', a: 'Beides sind manuelle Methoden mit gemeinsamen Wurzeln. Shiatsu kommt aus Japan und arbeitet flächiger, oft am bekleideten Körper am Boden. Tuina gehört zur chinesischen Medizin und arbeitet mit gezielteren Druck-, Schiebe- und Dehngriffen. Welche für dich passt, klären wir vor der Behandlung.' },
    ],
    ctaTitle: 'Deckung vorher <em>klären.</em>',
    ctaText: 'Sag uns, wie du versichert bist. Wir schauen mit dir an, ob Shiatsu in deiner Police steht, bevor du dich für einen Termin entscheidest.',
    waText: 'Hallo, ich möchte wissen, ob meine Krankenkasse Shiatsu übernimmt.',
  },
];

export const kkThemaBySlug = (slug: string) => kkThemen.find((t) => t.slug === slug);
