// Ersetzt die früheren "Erfahrungen"-Blöcke (Sterne, 4.9-Badge, Patientenzitate) auf den
// Standortseiten. Rendert ausschliesslich prüfbare Angaben:
//   - Therapeut:innen, die in src/data/therapeuten.ts diesem Standort zugeordnet sind, mit
//     öffentlichem Registereintrag (nur status 'anerkannt' mit bestätigter profileUrl),
//   - Abrechnung nach Tarif 590 / Zusatzversicherung (netzwerkweit dokumentiert),
//   - den Ablauf des Erstgesprächs und die unverbindliche Anfrage (4. Karte füllt das 4er-UspGrid).
// Keine Bewertungen, keine Patientenzahlen, keine Verfügbarkeitsversprechen.
import { therapeuten, getPublicTherapistProfile } from './therapeuten';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function registerLinks(slug: string): string {
  const items = therapeuten
    .filter((t) => t.standorte?.includes(slug))
    .map((t) => getPublicTherapistProfile(t))
    .flatMap((t) => (t.registrierungen ?? [])
      .filter((r) => r.status === 'anerkannt' && r.profileUrl && !r.bereich)
      .map((r) => `<li><a href="/team/${t.slug}/">${esc(t.name)}</a> · <a href="${esc(r.profileUrl!)}" target="_blank" rel="noopener">${esc(r.organisation)} ↗</a></li>`));
  return items.length ? `<ul style="list-style:none;margin:10px 0 0;padding:0;display:grid;gap:6px">${items.join('')}</ul>` : '';
}

const ICON = {
  reg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 11 11 13 15 9"></polyline>',
  tarif: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line>',
  talk: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><polyline points="3 7 12 13 21 7"></polyline>',
};
// Markup = freigegebenes UspGrid-Muster (src/components/standort/UspGrid.astro): gleiche Klassen,
// gleiche Icon-Fläche; keine eigenen Farben/Radien.
const card = (icon: string, title: string, body: string) =>
  `<div class="usp-card"><div class="usp-icon" style="background:rgba(26,226,136,.14)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#020B10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg></div><div class="usp-title">${title}</div><div class="usp-sub content-body">${body}</div></div>`;

/** Transparenz-Sektion für eine Standortseite. `planned` = Standort noch nicht eröffnet. */
export function transparenzHtml(slug: string, planned = false): string {
  const regs = planned ? '' : registerLinks(slug);
  const reg = card(ICON.reg, 'Registrierung prüfbar', regs
    ? `Öffentlicher Registereintrag der Therapeut:innen an diesem Standort:${regs}`
    : `Zu jeder Fachperson mit Profil im <a href="/ueber-uns/#ueber-uns-team">Team</a> verlinken wir den öffentlichen Registereintrag.`);
  const kosten = card(ICON.tarif, 'Kosten vorab klar', `Abrechnung nach Tarif 590. Was deine Zusatzversicherung übernimmt, hängt von deiner Police ab: <a href="/krankenkassen/">Krankenkasse &amp; Kosten</a>.`);
  const ablauf = card(ICON.talk, 'Ehrliche Einschätzung', `Im Erstgespräch klären wir, ob TCM für dein Anliegen sinnvoll ist. Gehört etwas zuerst ärztlich abgeklärt, sagen wir dir das.`);
  const anfrage = planned
    ? card(ICON.mail, 'Vormerken ohne Verpflichtung', `Wir melden uns, sobald an diesem Standort Termine möglich sind. Bis dahin nennen wir dir gern eine bestehende Praxis.`)
    : card(ICON.mail, 'Unverbindlich anfragen', `Deine Anfrage verpflichtet dich zu nichts. Wir melden uns persönlich und klären Termin und offene Fragen mit dir.`);
  return `<section class="section" id="transparenz"><div class="wrap reveal"><div class="section-label">Transparenz</div><h2 class="section-title" style="margin-bottom:24px">Was du ${planned ? '<em>schon vor der Eröffnung</em>' : '<em>vorab</em>'} prüfen kannst.</h2><div class="usp-grid">${reg}${kosten}${ablauf}${anfrage}</div></div></section>`;
}
