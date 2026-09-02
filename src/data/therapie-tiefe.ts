// Zusatzinhalt für bestehende Therapie-Seiten.
//
// Warum: Gua Sha (3.600/Mt, KD 18), Tuina (1.300, KD 11) und Hijama (1.000, KD 12) haben
// niedrige Konkurrenz und trotzdem Positionen zwischen 39 und 75 (GSC Q3 2026). Zum
// Vergleich steht Schröpfen mit KD 40 bereits auf 23,4. Das ist kein Autoritäts-, sondern
// ein Tiefenproblem: die gecapturten SPA-Leaves erklären die Methode, beantworten aber die
// Fragen nicht, mit denen Leute tatsächlich suchen (Ablauf, Nebenwirkungen, Abgrenzung,
// Kosten).
//
// Statt die Captures umzuschreiben — fehleranfällig und schwer zu pflegen — hängen wir
// einen strukturierten Block an den Body, so wie es die Seiten mit faqBlock, relatedBlock
// und selbsttestBlock schon tun. Markup nutzt die bestehenden Klassen.

export interface TiefeSection { h: string; p: string[] }
export interface TiefeFaq { q: string; a: string }
export interface TiefeBlock {
  label: string;
  title: string;      // enthält <em>
  sub: string;
  sections: TiefeSection[];
  faqs: TiefeFaq[];
}

export const therapieTiefe: Record<string, TiefeBlock> = {
  // ───────────────────────────────────────────────────────────── GUA SHA
  'gua-sha': {
    label: 'Gua Sha im Detail',
    title: 'Was beim Schaben wirklich <em>passiert.</em>',
    sub: 'Die Fragen, die uns vor der ersten Behandlung am häufigsten gestellt werden.',
    sections: [
      {
        h: 'Wie eine Behandlung abläuft',
        p: [
          'Nach dem Gespräch über deine Beschwerden wird die Haut geölt, damit das Schabewerkzeug gleiten kann und nicht zieht. Verwendet wird ein abgerundeter Schaber aus Jade, Horn oder Edelstahl. Die Therapeutin führt ihn in kurzen, gleichmässigen Zügen über die betroffene Region, meist Nacken, Schultern oder oberer Rücken.',
          'Der Druck wird während der Behandlung angepasst. Es soll deutlich spürbar sein, aber nicht wehtun. Eine Sitzung dauert selten länger als 15 bis 20 Minuten für eine Region, oft ist Gua Sha Teil einer längeren Behandlung mit Massage oder Akupunktur.',
        ],
      },
      {
        h: 'Die roten Flecken: was sie sind und was nicht',
        p: [
          'Während der Behandlung entstehen rötliche bis violette Punkte auf der Haut, im Chinesischen "Sha" genannt. Das sind keine blauen Flecken im Sinne einer Verletzung, sondern kleine Einblutungen aus oberflächlichen Kapillaren. Sie tun in der Regel nicht weh und verschwinden nach zwei bis fünf Tagen.',
          'Wie stark die Verfärbung ausfällt, hängt weniger vom Druck ab als vom Zustand des Gewebes. Bei stark verspannten Regionen zeigt sie sich deutlicher. Wer am nächsten Tag ein schulterfreies Kleid tragen will, sollte das vorher sagen, dann behandeln wir zurückhaltender oder verschieben.',
        ],
      },
      {
        h: 'Wann Gua Sha nicht in Frage kommt',
        p: [
          'Nicht behandelt wird über offenen Wunden, frischen Narben, Sonnenbrand, Hautinfektionen oder ausgeprägten Krampfadern. Wer blutverdünnende Medikamente nimmt oder an einer Gerinnungsstörung leidet, sollte das vorher ansprechen — dann arbeiten wir deutlich sanfter oder wählen eine andere Technik.',
          'Auch bei Fieber, in der Frühschwangerschaft und direkt nach einer Operation im behandelten Gebiet warten wir ab. Das sind Standardgrenzen, keine Formalitäten.',
        ],
      },
      {
        h: 'Gua Sha, Schröpfen oder Massage?',
        p: [
          'Die drei überschneiden sich, arbeiten aber unterschiedlich. Gua Sha wirkt flächig und oberflächennah, gut bei verspannter Nacken- und Schultermuskulatur. <a href="/therapien/schroepfen/">Schröpfen</a> zieht das Gewebe punktuell nach oben statt es zu schieben, spürbar tiefer. Die <a href="/therapien/massage/medizinische-massage/">medizinische Massage</a> arbeitet mit den Händen und lässt sich am feinsten dosieren.',
          'Was für dich passt, entscheiden wir nach dem Befund, nicht nach Vorliebe. Oft kombinieren wir zwei davon in einer Sitzung.',
        ],
      },
      {
        h: 'Gua Sha im Gesicht ist etwas anderes',
        p: [
          'Das kosmetische Gesichts-Gua-Sha, das man aus Social Media kennt, arbeitet mit sehr leichtem Druck und erzeugt bewusst keine Verfärbung. Ziel ist Lymphfluss und Hautbild, nicht die Behandlung von Verspannungen. Wir behandeln beides, verwechseln sollte man es aber nicht — dazu haben wir eine eigene Seite zu <a href="/therapien/gua-sha/gesichts-gua-sha/">Gesichts-Gua-Sha</a>.',
        ],
      },
    ],
    faqs: [
      { q: 'Tut Gua Sha weh?', a: 'Es ist deutlich spürbar, soll aber nicht schmerzen. Der Druck wird während der Behandlung angepasst. Sag einfach, wenn es zu viel wird.' },
      { q: 'Wie lange bleiben die roten Flecken?', a: 'In der Regel zwei bis fünf Tage. Sie verblassen von selbst und brauchen keine Nachbehandlung.' },
      { q: 'Wie oft kann man Gua Sha machen?', a: 'Erst wenn die Verfärbung abgeklungen ist, also meist im Abstand von einer Woche. Häufiger bringt keinen Zusatznutzen.' },
      { q: 'Zahlt die Krankenkasse Gua Sha?', a: 'Als Teil einer Behandlung bei EMR- oder ASCA-anerkannten Therapeut:innen beteiligt sich die Zusatzversicherung in der Regel. Die Grundversicherung nicht.' },
      { q: 'Was mache ich nach der Behandlung?', a: 'Viel trinken, die Region warm halten und an dem Tag auf Sauna, Alkohol und intensives Training verzichten. Mehr braucht es nicht.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────── TUINA
  tuina: {
    label: 'Tuina im Detail',
    title: 'Was Tuina von einer Massage <em>unterscheidet.</em>',
    sub: 'Die manuelle Therapie der chinesischen Medizin, ohne Mystik erklärt.',
    sections: [
      {
        h: 'Kein Öl, keine Liege im Halbdunkeln',
        p: [
          'Tuina wird meist am bekleideten Körper behandelt, ohne Öl und ohne die Atmosphäre einer Wellness-Massage. Der Name beschreibt zwei Grundbewegungen: schieben und greifen. Dazu kommen Drücken, Kneten, Rollen, Reiben und Dehnen, insgesamt ein knappes Dutzend definierter Griffe.',
          'Der Unterschied zur klassischen Massage liegt weniger im Gefühl als in der Zielsetzung. Eine <a href="/therapien/massage/klassische-massage/">klassische Massage</a> arbeitet flächig an der Muskulatur. Tuina arbeitet an definierten Punkten und Bahnen und bezieht Gelenkmobilisation mit ein.',
        ],
      },
      {
        h: 'Wie eine Sitzung abläuft',
        p: [
          'Am Anfang steht ein Gespräch und eine kurze Untersuchung: Wo tut es weh, wann, wobei, und was schränkt dich konkret ein. Danach wird gezielt gearbeitet, häufig 20 bis 30 Minuten an einer Region, nicht am ganzen Körper.',
          'Tuina ist kräftiger dosiert als eine Entspannungsmassage. Es kann während der Behandlung an einzelnen Punkten deutlich ziehen. Am Tag danach ist ein Muskelkatergefühl normal und kein schlechtes Zeichen.',
        ],
      },
      {
        h: 'Wobei wir Tuina einsetzen',
        p: [
          'Am häufigsten bei Nacken- und Schulterbeschwerden, verspanntem oberem Rücken, eingeschränkter Beweglichkeit nach längerer Schonung und bei Spannungskopfschmerzen, die vom Nacken ausgehen. Auch bei <a href="/beschwerden/rueckenschmerzen/">Rückenschmerzen</a> ist Tuina oft Teil des Plans.',
          'Was Tuina nicht leistet: strukturelle Probleme reparieren. Ein Bandscheibenvorfall bleibt ein Bandscheibenvorfall. Was sich beeinflussen lässt, ist die Muskulatur drumherum, und das ist bei Schmerzen oft mehr als die halbe Miete.',
        ],
      },
      {
        h: 'Grenzen und Vorsicht',
        p: [
          'Nicht behandelt wird über Entzündungen, frischen Verletzungen, offenen Wunden und bei akutem Fieber. Bei Osteoporose, unter Blutverdünnung und in der Schwangerschaft arbeiten wir deutlich zurückhaltender und lassen bestimmte Griffe weg. Sag uns solche Dinge vorher, auch wenn du sie für unwichtig hältst.',
        ],
      },
      {
        h: 'Kombination mit anderen Behandlungen',
        p: [
          'Tuina lässt sich gut mit <a href="/therapien/akupunktur/">Akupunktur</a> in derselben Sitzung verbinden: erst die Nadeln, dann die manuelle Arbeit, oder umgekehrt. Auch <a href="/therapien/schroepfen/">Schröpfen</a> und <a href="/therapien/moxibustion/">Moxibustion</a> werden häufig kombiniert. Was sinnvoll ist, hängt vom Befund ab, nicht vom Wunsch nach mehr Programm.',
        ],
      },
    ],
    faqs: [
      { q: 'Was ist der Unterschied zwischen Tuina und einer normalen Massage?', a: 'Tuina arbeitet an definierten Punkten und Bahnen, bezieht Gelenkmobilisation ein und wird meist am bekleideten Körper ohne Öl durchgeführt. Eine klassische Massage arbeitet flächiger an der Muskulatur und zielt stärker auf Entspannung.' },
      { q: 'Tut Tuina weh?', a: 'Es ist kräftiger dosiert als eine Entspannungsmassage und kann an einzelnen Punkten deutlich ziehen. Schmerzen im eigentlichen Sinn soll es nicht verursachen.' },
      { q: 'Muss ich mich ausziehen?', a: 'Meist nicht. Tuina wird in der Regel am bekleideten Körper behandelt, bequeme Kleidung genügt.' },
      { q: 'Wie viele Sitzungen brauche ich?', a: 'Bei akuten Verspannungen oft schon nach zwei bis drei Sitzungen eine spürbare Veränderung. Bei länger bestehenden Beschwerden planen wir eher in Serien und schauen nach vier Terminen gemeinsam, ob es sich lohnt weiterzumachen.' },
      { q: 'Zahlt die Krankenkasse Tuina?', a: 'Bei EMR- oder ASCA-anerkannten Therapeut:innen beteiligt sich die Zusatzversicherung für Komplementärmedizin in der Regel. Die Grundversicherung übernimmt Tuina nicht.' },
    ],
  },

  // ────────────────────────────────────────────────────────────── HIJAMA
  hijama: {
    label: 'Hijama im Detail',
    title: 'Hijama in der Praxis, <em>ehrlich erklärt.</em>',
    sub: 'Ablauf, Hygiene, Grenzen und was wir seriös nicht versprechen können.',
    sections: [
      {
        h: 'Was Hijama ist',
        p: [
          'Hijama bezeichnet das blutige Schröpfen: Auf die vorbereitete Hautstelle wird ein Schröpfglas gesetzt, dann werden mit einer sterilen Einwegklinge oberflächliche Ritzungen gemacht und das Glas erneut aufgesetzt, sodass eine kleine Menge Blut austritt. Die Methode ist in der islamischen Tradition verankert und wird gleichzeitig in der chinesischen Medizin seit Jahrhunderten verwendet.',
          'Bei uns ist Hijama eine Behandlung, keine religiöse Handlung. Wir machen sie fachgerecht und hygienisch, und wir sagen dir ehrlich, wo die Belege dünn sind.',
        ],
      },
      {
        h: 'Ablauf und Hygiene',
        p: [
          'Zuerst wird trocken geschröpft, damit die Region durchblutet ist. Dann wird die Haut desinfiziert, mit einer sterilen Einwegklinge werden mehrere sehr oberflächliche Ritzungen gesetzt, und das Glas kommt für wenige Minuten zurück. Danach wird gereinigt, desinfiziert und abgedeckt.',
          'Alles, was mit Blut in Kontakt kommt, ist Einwegmaterial und wird nach der Behandlung fachgerecht entsorgt. Das ist der Punkt, an dem sich seriöse von unseriöser Praxis unterscheidet — frag bei jeder Praxis danach, nicht nur bei uns.',
        ],
      },
      {
        h: 'Danach: was normal ist und was nicht',
        p: [
          'Runde Male an den Schröpfstellen sind normal und verblassen über etwa eine Woche. Die Ritzungen sind oberflächlich und verheilen in wenigen Tagen. Am Behandlungstag solltest du auf Sauna, Schwimmbad, intensives Training und Alkohol verzichten und die Stellen 24 Stunden sauber und trocken halten.',
          'Nicht normal sind zunehmende Rötung, Schwellung, Wärme oder Eiter. Das wären Zeichen einer Infektion — dann meldest du dich, und zwar am selben Tag.',
        ],
      },
      {
        h: 'Wann wir nicht behandeln',
        p: [
          'Nicht bei Gerinnungsstörungen, unter Blutverdünnung, bei Anämie, in der Schwangerschaft, bei schlecht eingestelltem Diabetes, bei akuten Infekten und bei Hauterkrankungen im Behandlungsgebiet. Auch nach einer Blutspende warten wir. Diese Liste ist nicht verhandelbar, egal wie sehr du dir die Behandlung wünschst.',
          'Wenn Hijama für dich nicht in Frage kommt, ist trockenes <a href="/therapien/schroepfen/">Schröpfen</a> fast immer eine Alternative, die einen grossen Teil der Wirkung ohne die Risiken bringt.',
        ],
      },
      {
        h: 'Was wir nicht versprechen',
        p: [
          'Zur Wirksamkeit von blutigem Schröpfen gibt es Studien, die kurzfristige Effekte auf Schmerzen zeigen, insbesondere bei Nacken- und Rückenbeschwerden. Die Studienqualität ist überwiegend schwach, und belastbare Aussagen zu Langzeitwirkungen fehlen. Behauptungen über "Entgiftung" oder die Behandlung schwerer Erkrankungen halten wir für unseriös und machen sie nicht.',
          'Was wir sagen können: Viele Patient:innen empfinden die Behandlung als deutliche Entlastung bei muskulären Beschwerden. Das ist ein guter Grund, es zu probieren, und kein Grund, eine ärztliche Abklärung zu ersetzen.',
        ],
      },
    ],
    faqs: [
      { q: 'Tut Hijama weh?', a: 'Das Schröpfen zieht spürbar, die Ritzungen sind kurz zu spüren und werden meist als weniger unangenehm beschrieben als erwartet. Wehtun soll es nicht.' },
      { q: 'Wie oft kann man Hijama machen?', a: 'Üblich sind Abstände von vier bis sechs Wochen. Häufiger ist weder nötig noch sinnvoll, der Körper braucht die Zeit.' },
      { q: 'Wie lange bleiben die Male sichtbar?', a: 'In der Regel etwa eine Woche. Sie verblassen von selbst.' },
      { q: 'Ist Hijama hygienisch sicher?', a: 'Wenn ausschliesslich steriles Einwegmaterial verwendet und fachgerecht entsorgt wird, ja. Frag in jeder Praxis danach, bevor du dich hinlegst.' },
      { q: 'Zahlt die Krankenkasse Hijama?', a: 'Als Teil einer Schröpfbehandlung bei EMR- oder ASCA-anerkannten Therapeut:innen beteiligt sich die Zusatzversicherung je nach Police. Die Grundversicherung nicht. Details stehen unter Krankenkassen.' },
      { q: 'Kann ich Hijama während des Fastens machen?', a: 'Das solltest du mit uns vorher besprechen. Bei Flüssigkeitsmangel und leerem Magen steigt das Risiko für Kreislaufreaktionen deutlich, deshalb legen wir den Termin dann lieber anders.' },
    ],
  },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Eigenes, minimal gehaltenes CSS statt massage-city.css: der Block hängt an Seiten, die
// diese Datei sonst nicht laden, und 5 KB Massage-CSS auf jeder Therapie-Seite wären
// Ballast. Klassen mit tf- Präfix, damit nichts mit bestehenden Regeln kollidiert.
const TIEFE_CSS = `<style>
.tf-wrap{max-width:820px}
.tf-prose h3{font-size:20px;font-weight:800;color:var(--black);margin:28px 0 10px;letter-spacing:-.01em}
.tf-prose p{font-size:16.5px;line-height:1.7;color:var(--mid);margin:0 0 14px}
.tf-prose a{color:var(--green-dark,var(--blue-dark));font-weight:600;text-decoration:none}
.tf-prose a:hover{text-decoration:underline}
.tf-faq{margin-top:32px}
.tf-faq details{border:1px solid var(--border);border-radius:12px;padding:2px 18px;margin:0 0 10px;background:#fff}
.tf-faq summary{font-weight:700;font-size:16px;color:var(--black);cursor:pointer;padding:15px 0;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px}
.tf-faq summary::-webkit-details-marker{display:none}
.tf-faq summary::after{content:'+';font-size:20px;font-weight:700;color:var(--green,var(--blue));flex-shrink:0}
.tf-faq details[open] summary::after{content:'\\2013'}
.tf-faq .tf-a{margin:0 0 16px;font-size:15.5px;line-height:1.7;color:var(--mid)}
</style>`;

/** Rendert den Tiefen-Block als HTML-String zum Anhängen an einen SpaPage-Body. */
export function therapieTiefeHtml(slug: string): string {
  const b = therapieTiefe[slug];
  if (!b) return '';
  const sections = b.sections
    .map((s) => `<h3>${esc(s.h)}</h3>${s.p.map((p) => `<p>${p}</p>`).join('')}`)
    .join('');
  const faqs = b.faqs
    .map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p class="tf-a">${f.a}</p></details>`)
    .join('');
  return (
    TIEFE_CSS +
    `<section class="section" style="background:var(--surface);border-top:1px solid var(--border)">` +
    `<div class="wrap reveal tf-wrap">` +
    `<div class="section-label">${esc(b.label)}</div>` +
    `<h2 class="section-title">${b.title}</h2>` +
    `<p class="section-sub" style="margin-bottom:4px">${esc(b.sub)}</p>` +
    `<div class="tf-prose">${sections}</div>` +
    `<div class="tf-faq">${faqs}</div>` +
    `</div></section>`
  );
}

/** FAQ-Einträge für das Schema der jeweiligen Seite. */
export const therapieTiefeFaqs = (slug: string): TiefeFaq[] => therapieTiefe[slug]?.faqs ?? [];
