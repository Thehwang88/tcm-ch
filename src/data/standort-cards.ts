// Standort-Karten "Praxen in deiner Naehe" der Beschwerden-Leaves
// (Rebrand-Pilot). Der Block lag byte-identisch dupliziert in allen 116
// captured symptom-leaves; die Ausgabe wird hier zentralisiert, die
// duplizierten Legacy-Quellen in den Leaves bleiben vorerst bestehen
// (spaetere Bereinigung = optionales Backlog).
//
// Suchmuster und Ausgabe sind strikt getrennt:
//   - standort-cards-legacy.html  = UNVERAENDERLICHE Referenz zum Erkennen
//     des alten Blocks in den Leaves. NIE editieren.
//   - standort-cards.html         = kuenftig editierbares Ausgabe-Markup
//     (Erstausgabe byte-identisch zur Legacy-Referenz). Hyejin-Redesign
//     passiert ausschliesslich hier - die Erkennung bleibt davon unberuehrt.
// Keine Props, keine Datenanbindung in diesem Pilot (bewusst: Links/Texte/
// Inline-Styles/nav()-Hooks bleiben wortgleich, inkl. Bellevue).
import legacyHtml from './standort-cards-legacy.html?raw';
import cardsHtml from './standort-cards.html?raw';

/** Ersetzt den Legacy-Block exakt einmal durch die zentrale Ausgabe.
 *  Kein stiller Fallback: 0 oder >1 Treffer brechen den Build mit dem
 *  betroffenen Slug ab. */
export function replaceStandortCards(body: string, slug: string): string {
  const first = body.indexOf(legacyHtml);
  if (first < 0) {
    throw new Error(`standort-cards: Legacy-Block NICHT gefunden im Beschwerden-Leaf "${slug}" - Leaf geaendert? Referenz standort-cards-legacy.html darf nicht editiert werden.`);
  }
  if (body.indexOf(legacyHtml, first + 1) >= 0) {
    throw new Error(`standort-cards: Legacy-Block MEHRFACH im Beschwerden-Leaf "${slug}" gefunden - Ersetzung waere mehrdeutig.`);
  }
  return body.slice(0, first) + cardsHtml + body.slice(first + legacyHtml.length);
}
