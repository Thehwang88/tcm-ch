// ── Single source of truth for migrated Beschwerden (Astro static pages). ──
// Route: /beschwerden/<slug> via getStaticPaths (src/pages/beschwerden/[slug].astro).
// Phase 2 pilot: ONLY 'kinderwunsch' (content from repo-root kinderwunsch.md).
// The other 24 KEEP slugs are added here later; until then the DE SPA still
// serves them (the [[path]].js 410 gate falls through to the SPA for KEEP slugs
// that have no Astro page yet).
//
// Lean target (agreed): hero → article (what it is / how TCM helps / evidence /
// red flags) → FAQ → CTA → lean internal links → light EMR/ASCA trust. No reviews
// wall, no big trust strip, no redundant recommended-therapies block.
// Sie-form is NOT used; patient Du-form, honest, no cure claims, no Qi/Yin-Yang.

export interface BeschwerdeFaq { q: string; a: string }
export interface BeschwerdeSection { h: string; p: string[]; list?: string[] }
export interface BeschwerdeLink { slug: string; label: string }

export interface Beschwerde {
  slug: string;             // /beschwerden/<slug>
  name: string;             // display name, breadcrumb
  title: string;            // SEO <title> (｜ TCM.ch appended by the layout)
  metaDesc: string;
  conditionName: string;    // schema MedicalCondition name
  lead: string;             // hero lead paragraph
  intro: string[];          // body intro paragraphs (before first section)
  sections: BeschwerdeSection[];
  redFlags: string[];       // "Wann ärztlich abklären"
  faqs: BeschwerdeFaq[];
  related: BeschwerdeLink[]; // related Beschwerden (KEEP slugs)
  therapies: BeschwerdeLink[]; // relevant Therapien (SPA /therapien/<slug>)
}

export const REVIEWED_DATE = '2026-06-09';

export const beschwerden: Beschwerde[] = [
  {
    slug: 'kinderwunsch',
    name: 'Kinderwunsch',
    title: 'Akupunktur bei Kinderwunsch | Begleitung bei IVF & natürlichem Zyklus',
    metaDesc:
      'Akupunktur als ruhige Begleitung auf dem Weg zum Wunschkind. Was die Forschung zeigt, wie eine Behandlung abläuft und wann eine ärztliche Abklärung wichtig ist.',
    conditionName: 'Unerfüllter Kinderwunsch',
    lead:
      'Ein unerfüllter Kinderwunsch zehrt. Akupunktur kann den medizinischen Weg als ruhiger, körpernaher Baustein begleiten — ehrlich eingeordnet, ohne grosse Versprechen.',
    intro: [
      'Ein unerfüllter Kinderwunsch zehrt. Jeder Zyklus wird zur Geduldsprobe, und zwischen Terminen, Tests und Hormonwerten bleibt oft wenig Raum, um durchzuatmen. Viele Frauen und Paare suchen deshalb nach einer Begleitung, die den medizinischen Weg ergänzt, ohne ihn zu ersetzen.',
      'Wichtig vorab, ehrlich gesagt: Akupunktur ist keine Fruchtbarkeitsbehandlung und kein Ersatz für eine ärztliche Abklärung. Sie macht aus medizinischen Gründen ausbleibende Schwangerschaften nicht möglich. Was sie kann, ordnen wir unten anhand der Studienlage offen ein.',
    ],
    sections: [
      {
        h: 'Was Akupunktur in dieser Phase leisten kann',
        p: [
          'Der am besten belegte Beitrag von Akupunktur beim Kinderwunsch liegt im Bereich Stress, Anspannung und Schlaf. Eine Kinderwunsch-Behandlung, besonders eine künstliche Befruchtung, ist psychisch fordernd. Viele Patientinnen beschreiben Akupunktur als die eine Stunde, in der sie zur Ruhe kommen.',
          'Darüber hinaus wird Akupunktur in der Reproduktionsmedizin häufig begleitend zur In-vitro-Fertilisation eingesetzt, etwa rund um den Embryotransfer. Ob sie die Chancen messbar erhöht, ist wissenschaftlich umstritten. Wir versprechen dir deshalb keine höheren Erfolgsraten, sondern eine fundierte, schonende Begleitung, deren Grenzen wir klar benennen.',
        ],
      },
      {
        h: 'Wann Frauen und Paare zu uns kommen',
        p: ['Typische Situationen, in denen Akupunktur als Begleitung sinnvoll sein kann:'],
        list: [
          'Begleitend zu einer IVF- oder IUI-Behandlung, oft in Absprache mit dem Kinderwunschzentrum',
          'Bei unerfülltem Kinderwunsch ohne klaren medizinischen Befund, zusätzlich zur ärztlichen Abklärung',
          'Bei starkem Stress, Schlafproblemen oder innerer Anspannung während der Kinderwunschzeit',
          'Bei Zyklusbeschwerden, die parallel ärztlich abgeklärt werden',
        ],
      },
      {
        h: 'Wie eine Behandlung bei uns abläuft',
        p: [
          'Beim ersten Termin nehmen wir uns Zeit für deine Geschichte: bisherige Behandlungen, Zyklus, Befunde, Belastung. Daraus entsteht ein individueller Plan. Eine Behandlung dauert rund 45 bis 60 Minuten.',
          'Wenn du dich in reproduktionsmedizinischer Behandlung befindest, stimmen wir die Termine auf deinen Zyklus und deine IVF-Schritte ab. Viele kommen über mehrere Wochen ein- bis zweimal pro Woche. Die Frequenz besprechen wir gemeinsam und passen sie laufend an.',
        ],
      },
      {
        h: 'Was die Forschung zeigt',
        p: [
          'Hier bleiben wir bewusst nüchtern. Die Datenlage zu Akupunktur und künstlicher Befruchtung ist gemischt und wird unter Fachleuten weiter diskutiert.',
          'Eine grosse, hochwertige randomisierte Studie, 2018 im Fachjournal JAMA veröffentlicht, fand keinen Unterschied bei der Lebendgeburtenrate zwischen echter und scheinbarer Akupunktur. Mehrere Meta-Analysen kommen zum Schluss, dass sich kein klarer Vorteil für die Lebendgeburtenrate ableiten lässt. Andere Übersichtsarbeiten berichten von verbesserten klinischen Schwangerschaftsraten rund um Eizellentnahme und Embryotransfer, stufen diese Evidenz aber als niedriger Qualität ein.',
          'Das bedeutet konkret: Ein gesicherter, messbarer Effekt auf die Geburtenrate ist nicht belegt. Belegt und unstrittig ist die gute Verträglichkeit. Wer Akupunktur als unterstützende Begleitung versteht, trifft eine vertretbare Wahl.',
        ],
      },
      {
        h: 'Kosten und Krankenkasse',
        p: [
          'Akupunktur durch anerkannte Therapeutinnen wird in der Schweiz in der Regel über die Zusatzversicherung für Komplementärmedizin abgedeckt. Ob und in welcher Höhe deine Kasse zahlt, hängt von deinem Vertrag ab. Kläre die Deckung vor Behandlungsbeginn direkt mit deiner Versicherung ab.',
        ],
      },
    ],
    redFlags: [
      'Ihr habt seit zwölf Monaten ungeschützten Geschlechtsverkehr, ohne dass eine Schwangerschaft eintritt (ab 35 Jahren bereits nach sechs Monaten)',
      'Starke Unterbauchschmerzen, ungewöhnliche Blutungen oder eine ausbleibende Periode',
      'Bekannte Erkrankungen wie Endometriose, PCOS oder Schilddrüsenstörungen',
      'Nach mehreren Behandlungszyklen tritt weiterhin kein Erfolg ein',
    ],
    faqs: [
      { q: 'Erhöht Akupunktur meine Chance auf eine Schwangerschaft?', a: 'Ein klar messbarer Effekt auf die Lebendgeburtenrate ist wissenschaftlich nicht belegt. Wir versprechen keine höheren Erfolgsraten. Gut belegt ist hingegen, dass viele Patientinnen Stress und Anspannung während der Kinderwunschzeit als geringer erleben. So verstehen wir Akupunktur: als verträgliche Begleitung.' },
      { q: 'Ab wann sollte ich mit der Akupunktur beginnen?', a: 'Es gibt kein festes Schema. Manche starten früh in der Kinderwunschphase, andere begleitend zu einer geplanten IVF. Wenn eine künstliche Befruchtung ansteht, beginnen viele einige Wochen vorher. Den passenden Zeitpunkt legen wir gemeinsam fest.' },
      { q: 'Kann ich Akupunktur und IVF gleichzeitig machen?', a: 'Ja, das ist der häufigste Fall. Akupunktur ersetzt die reproduktionsmedizinische Behandlung nicht, sondern begleitet sie. Wir stimmen die Termine auf deinen Zyklus und deine IVF-Schritte ab und arbeiten bei Bedarf mit deinem Kinderwunschzentrum zusammen.' },
      { q: 'Tut Akupunktur weh?', a: 'Die verwendeten Nadeln sind sehr fein, deutlich dünner als bei einer Blutentnahme. Die meisten spüren beim Setzen höchstens ein kurzes Ziehen oder Kribbeln. Ernsthafte Nebenwirkungen sind bei fachgerechter Durchführung selten.' },
      { q: 'Übernimmt die Krankenkasse die Kosten?', a: 'Über eine Zusatzversicherung für Komplementärmedizin meist anteilig, da wir EMR- und ASCA-anerkannt sind. Den genauen Anteil regelt dein Tarif.' },
    ],
    related: [
      { slug: 'menstruationsbeschwerden', label: 'Menstruationsbeschwerden' },
      { slug: 'pms', label: 'PMS' },
      { slug: 'wechseljahre', label: 'Wechseljahre' },
    ],
    therapies: [
      { slug: 'akupunktur', label: 'Akupunktur' },
      { slug: 'moxibustion', label: 'Moxibustion' },
      { slug: 'kraeutertherapie', label: 'Kräutertherapie' },
    ],
  },
];

export const beschwerdeBySlug = (slug: string): Beschwerde | undefined =>
  beschwerden.find((b) => b.slug === slug);
