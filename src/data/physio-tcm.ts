// Integriertes Entscheidungsmodul "Physiotherapie oder TCM?" für muskuloskelettale
// Beschwerde-Seiten und die Physiotherapie-Seite.
//
// Positionierung: TCM.ch besetzt den integrierten Intent (Behandlungswahl, Kombination),
// physio.ch bleibt die dedizierte Plattform für reine Physiotherapie/Domizilbehandlung.
// Sprache bewusst vorsichtig ("kann ergänzend", "je nach Beschwerdebild"), keine
// Wirksamkeits-Versprechen. Kein Modul auf jeder Beschwerde: kuratierte Slug-Liste.

const CARD = (title: string, text: string, href: string, cta: string) =>
  `<a href="${href}" style="display:flex;flex-direction:column;background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px 22px;text-decoration:none;transition:border-color .18s ease">` +
  `<div style="font-family:var(--font-sans);font-weight:800;font-size:16.5px;color:var(--black);margin-bottom:6px">${title}</div>` +
  `<div style="font-size:14.5px;color:var(--mid);line-height:1.55;flex:1">${text}</div>` +
  `<span style="margin-top:12px;color:var(--blue);font-family:var(--font-sans);font-weight:700;font-size:13.5px">${cta} →</span>` +
  `</a>`;

/** Drei-Karten-Modul: Physio / Akupunktur / Kombiniert. Ehrliche Wahl, kein Upselling. */
export function physioTcmHtml(): string {
  return (
    `<section class="section cl-related" style="background:var(--surface);padding:40px 0">` +
    `<div class="wrap reveal">` +
    `<div class="section-label">Behandlungswahl</div>` +
    `<h2 class="section-title">Physiotherapie oder TCM?</h2>` +
    `<p style="font-size:15.5px;color:var(--mid);line-height:1.6;max-width:72ch;margin:0 0 18px">Je nach Beschwerdebild können sich Physiotherapie und Akupunktur sinnvoll ergänzen. Was im Einzelfall passt, klärt das Erstgespräch, in Absprache mit dem behandelnden Team.</p>` +
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px">` +
    CARD('Physiotherapie', 'Im Vordergrund stehen Bewegung, Kraft und Funktion: Rehabilitation nach Verletzung oder Operation, eingeschränkte Beweglichkeit, gezielter Übungsaufbau. Mit ärztlicher Verordnung über die Grundversicherung.', '/therapien/physiotherapie/', 'Zur Physiotherapie') +
    CARD('Akupunktur & TCM', 'Kann ergänzend eingesetzt werden, wenn Schmerz und Muskelspannung im Vordergrund stehen, Beschwerden chronisch oder wiederkehrend sind oder Schlaf und Stress mitspielen. Über die Zusatzversicherung.', '/therapien/akupunktur/', 'Zur Akupunktur') +
    CARD('Kombiniert', 'Wo beides verfügbar ist, lassen sich Funktion und Beschwerdelast koordiniert angehen: getrennte Abrechnung, ein abgestimmter Plan. Physiotherapie gibt es an ausgewählten Standorten.', '/standorte/', 'Behandlungsmöglichkeiten ansehen') +
    `</div></div></section>`
  );
}

/** Beschwerden mit starkem muskuloskelettalem Physio/TCM-Entscheidungs-Intent. */
export const PHYSIO_TCM_BESCHWERDEN = new Set([
  'rueckenschmerzen',
  'bandscheibenvorfall',
  'ischias',
  'nackenschmerzen',
  'schulterschmerzen',
  'knieschmerzen',
  'arthrose',
]);
