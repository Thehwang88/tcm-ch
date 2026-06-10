// Single source of truth for the Krankenkassen hub (Astro). Extracted from the SPA
// KRANKENKASSEN[] (29 insurers) + KK_PILLAR_FAQ. One hub page; no per-insurer routes.
export interface KkFaq { q: string; a: string }
export interface Krankenkasse {
  slug: string; name: string; produkte: string[]; register: string;
  deckung: string; verordnung: boolean; faq: KkFaq[];
}
export const krankenkassen: Krankenkasse[] = [
  {
    "slug": "css",
    "name": "CSS",
    "produkte": [
      "Alternativ-Versicherung myFlex (Economy/Balance/Premium)",
      "Gesundheitsversicherung Livo Smart/Top"
    ],
    "register": "EMR",
    "deckung": "Anteilige Rückerstattung bis CHF 10'000/Jahr je nach Tarif, nach CSS-Höchstpreis pro 5 Min.",
    "verordnung": false,
    "faq": [
      {
        "q": "Erstattet die CSS Akupunktur und TCM?",
        "a": "Ja. Über die CSS-Zusatzversicherung für Komplementärmedizin (z.B. myFlex Alternativ) wird Akupunktur und TCM bei EMR-anerkannten Therapeut:innen anteilig zurückerstattet. Der genaue Satz richtet sich nach deinem Tarif."
      },
      {
        "q": "Wie hoch ist die Rückerstattung bei der CSS?",
        "a": "Je nach Tarif erstattet die CSS anteilig bis zu CHF 10'000 pro Jahr, abgerechnet nach dem CSS-Höchstpreis pro 5 Minuten. Verbindlich ist deine Police."
      },
      {
        "q": "Brauche ich bei der CSS eine ärztliche Verordnung?",
        "a": "Für die Rückerstattung über die Zusatzversicherung ist bei der CSS in der Regel keine ärztliche Verordnung nötig. Kläre die Details vor dem Termin anhand deiner Police."
      }
    ]
  },
  {
    "slug": "helsana",
    "name": "Helsana",
    "produkte": [
      "SANA",
      "COMPLETA",
      "COMPLETA PLUS"
    ],
    "register": "both",
    "deckung": "75% der ambulanten Behandlungskosten; medizinische Notwendigkeit vorausgesetzt.",
    "verordnung": false
  },
  {
    "slug": "swica",
    "name": "SWICA",
    "produkte": [
      "Completa Top",
      "Completa Forte",
      "Optima"
    ],
    "register": "EMR",
    "deckung": "Completa Top bis CHF 80/Std., Completa Forte bis CHF 120/Std., Optima volle Kosten abzüglich Franchise + 10% Selbstbehalt.",
    "verordnung": false
  },
  {
    "slug": "sanitas",
    "name": "Sanitas",
    "produkte": [
      "Classic",
      "weitere ambulante Pakete"
    ],
    "register": "EMR",
    "deckung": "ca. 80% bis CHF 5'000/Jahr (tarifabhängig).",
    "verordnung": false
  },
  {
    "slug": "concordia",
    "name": "CONCORDIA",
    "produkte": [
      "NATURA"
    ],
    "register": "EMR",
    "deckung": "75% bis ca. CHF 1'500/Jahr (tarifabhängig).",
    "verordnung": false
  },
  {
    "slug": "visana",
    "name": "Visana",
    "produkte": [
      "Komplementär I",
      "Komplementär II",
      "Komplementär III"
    ],
    "register": "EMR",
    "deckung": "90%; Komplementär I begrenzt + Hausarztverordnung nötig, II/III höhere Jahreslimiten.",
    "verordnung": true
  },
  {
    "slug": "groupe-mutuel",
    "name": "Groupe Mutuel",
    "produkte": [
      "Bonus",
      "Global-Pakete"
    ],
    "register": "both",
    "deckung": "bis 90% (tarifabhängig), teils Franchise.",
    "verordnung": false
  },
  {
    "slug": "sympany",
    "name": "Sympany",
    "produkte": [
      "Plus",
      "Plus natura",
      "Premium",
      "Premium natura"
    ],
    "register": "EMR",
    "deckung": "50–80% bis CHF 3'000–10'000/Jahr je nach Tarif.",
    "verordnung": false
  },
  {
    "slug": "kpt",
    "name": "KPT",
    "produkte": [
      "Pulse Top",
      "Pulse Premium"
    ],
    "register": "both",
    "deckung": "Rückerstattung ohne ärztliche Verordnung; tarifabhängige Limiten.",
    "verordnung": false
  },
  {
    "slug": "axa",
    "name": "AXA",
    "produkte": [
      "ACTIF",
      "COMPLET"
    ],
    "register": "both",
    "deckung": "75%; ACTIF max CHF 1'000/Jahr, COMPLET max CHF 3'000/Jahr.",
    "verordnung": false
  },
  {
    "slug": "egk",
    "name": "EGK",
    "produkte": [
      "SUN (Stufen)"
    ],
    "register": "both",
    "deckung": "ca. 80% (tarifabhängig), teils Franchise.",
    "verordnung": false
  },
  {
    "slug": "atupri",
    "name": "Atupri",
    "produkte": [
      "Mivita / Diversa"
    ],
    "register": "EMR",
    "deckung": "tarifabhängige anteilige Rückerstattung — Police prüfen.",
    "verordnung": false
  },
  {
    "slug": "assura",
    "name": "Assura",
    "produkte": [
      "Komplementärmedizin-Zusatz (paketabhängig)"
    ],
    "register": "EMR",
    "deckung": "Eingeschränkte Deckung: nur über bestimmte Zusatzpakete und oft begrenzt. Tarif genau prüfen — viele Assura-Modelle decken Komplementärmedizin nur minimal. Wir helfen bei der Abklärung oder Tarifwahl.",
    "verordnung": false
  },
  {
    "slug": "oekk",
    "name": "ÖKK",
    "produkte": [
      "ambulante Komplementärmedizin-Zusatzversicherung"
    ],
    "register": "EMR",
    "deckung": "Anteilige Rückerstattung über die ambulante Zusatzversicherung; tarifabhängig — Police prüfen.",
    "verordnung": false
  },
  {
    "slug": "agrisano",
    "name": "Agrisano",
    "produkte": [
      "ambulante Zusatzversicherung Komplementärmedizin"
    ],
    "register": "EMR",
    "deckung": "Anteilige Rückerstattung tarifabhängig; Police prüfen.",
    "verordnung": false
  },
  {
    "slug": "aquilana",
    "name": "Aquilana",
    "produkte": [
      "ambulante Zusatzversicherung Komplementärmedizin"
    ],
    "register": "EMR",
    "deckung": "Anteilige Rückerstattung tarifabhängig; Police prüfen.",
    "verordnung": false
  },
  {
    "slug": "progres",
    "name": "Progrès",
    "produkte": [
      "Helsana-Gruppe: SANA / COMPLETA"
    ],
    "register": "both",
    "deckung": "Progrès gehört zur Helsana-Gruppe. Es gelten die Helsana-Bedingungen: 75% der ambulanten Behandlungskosten.",
    "verordnung": false
  },
  {
    "slug": "sansan",
    "name": "Sansan",
    "produkte": [
      "Helsana-Gruppe: SANA / COMPLETA"
    ],
    "register": "both",
    "deckung": "Sansan gehört zur Helsana-Gruppe. Es gelten die Helsana-Bedingungen: 75% der ambulanten Behandlungskosten.",
    "verordnung": false
  },
  {
    "slug": "avanex",
    "name": "Avanex",
    "produkte": [
      "Helsana-Gruppe: SANA / COMPLETA"
    ],
    "register": "both",
    "deckung": "Avanex gehört zur Helsana-Gruppe. Es gelten die Helsana-Bedingungen: 75% der ambulanten Behandlungskosten.",
    "verordnung": false
  },
  {
    "slug": "avenir",
    "name": "Avenir",
    "produkte": [
      "Groupe Mutuel: Bonus / Global"
    ],
    "register": "both",
    "deckung": "Avenir gehört zur Groupe Mutuel. Es gelten die Groupe-Mutuel-Bedingungen: bis 90% tarifabhängig.",
    "verordnung": false
  },
  {
    "slug": "easy-sana",
    "name": "Easy Sana",
    "produkte": [
      "Groupe Mutuel: Bonus / Global"
    ],
    "register": "both",
    "deckung": "Easy Sana gehört zur Groupe Mutuel. Es gelten die Groupe-Mutuel-Bedingungen: bis 90% tarifabhängig.",
    "verordnung": false
  },
  {
    "slug": "philos",
    "name": "Philos",
    "produkte": [
      "Groupe Mutuel: Bonus / Global"
    ],
    "register": "both",
    "deckung": "Philos gehört zur Groupe Mutuel. Es gelten die Groupe-Mutuel-Bedingungen: bis 90% tarifabhängig.",
    "verordnung": false
  },
  {
    "slug": "mutuel",
    "name": "Mutuel",
    "produkte": [
      "Groupe Mutuel: Bonus / Global"
    ],
    "register": "both",
    "deckung": "Mutuel gehört zur Groupe Mutuel. Es gelten die Groupe-Mutuel-Bedingungen: bis 90% tarifabhängig.",
    "verordnung": false
  },
  {
    "slug": "arcosana",
    "name": "Arcosana",
    "produkte": [
      "CSS-Gruppe: Alternativ-Versicherung myFlex"
    ],
    "register": "EMR",
    "deckung": "Arcosana gehört zur CSS-Gruppe. Es gelten die CSS-Bedingungen: anteilige Rückerstattung nach Höchstpreis, tarifabhängig.",
    "verordnung": false
  },
  {
    "slug": "intras",
    "name": "Intras",
    "produkte": [
      "CSS-Gruppe: Alternativ-Versicherung myFlex"
    ],
    "register": "EMR",
    "deckung": "Intras gehört zur CSS-Gruppe. Es gelten die CSS-Bedingungen: anteilige Rückerstattung nach Höchstpreis, tarifabhängig.",
    "verordnung": false
  },
  {
    "slug": "sanagate",
    "name": "Sanagate",
    "produkte": [
      "CSS-Gruppe (digital)"
    ],
    "register": "EMR",
    "deckung": "Sanagate gehört zur CSS-Gruppe. Komplementärmedizin nur über CSS-Zusatzversicherung möglich — Sanagate selbst ist ein reines Grundversicherungs-Digitalmodell. Deckung prüfen.",
    "verordnung": false
  },
  {
    "slug": "vivacare",
    "name": "vivacare",
    "produkte": [
      "Visana-Gruppe: Komplementär I–III"
    ],
    "register": "EMR",
    "deckung": "vivacare gehört zur Visana-Gruppe. Es gelten die Visana-Bedingungen: 90% tarifabhängig; tiefste Stufe mit Hausarztverordnung.",
    "verordnung": true
  },
  {
    "slug": "sana24",
    "name": "sana24",
    "produkte": [
      "Visana-Gruppe: Komplementär I–III"
    ],
    "register": "EMR",
    "deckung": "sana24 gehört zur Visana-Gruppe. Es gelten die Visana-Bedingungen: 90% tarifabhängig; tiefste Stufe mit Hausarztverordnung.",
    "verordnung": true
  },
  {
    "slug": "kolping",
    "name": "Kolping",
    "produkte": [
      "Sympany-Gruppe"
    ],
    "register": "EMR",
    "deckung": "Kolping gehört zur Sympany-Gruppe. Es gelten Sympany-ähnliche Bedingungen: 50–80% je nach Tarif. Police prüfen.",
    "verordnung": false
  }
];
export const pillarFaq: KkFaq[] = [
  0
];
