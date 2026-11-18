// Public full-network roster on every clinic page. Local clinicians first,
// everyone else clearly labelled as network members (not falsely "at this clinic").
import { therapeuten, teamCardHtml, getPublicTherapistProfile } from '../data/therapeuten';

const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

export function locationTeamHtml(slug: string, city: string): string {
  const locals = therapeuten.filter(t => t.standorte?.includes(slug));
  const all = [...locals, ...therapeuten.filter(t => !t.standorte?.includes(slug))];
  if (new Set(all.map(t => t.slug)).size !== therapeuten.length)
    throw new Error('Clinic team list contains duplicates for '+slug);
  const cards = all.map(t =>
    '<div class="tc-team-slide"' + (t.standorte?.includes(slug) ? ' data-local-therapist="1"' : ' data-network-therapist="1"') + '>' +
      (t.standorte?.includes(slug) ? '<span class="tc-team-marker">An diesem Standort</span>' : '<span class="tc-team-marker tc-team-marker--network">TCM.ch Netzwerk</span>') +
      teamCardHtml(getPublicTherapistProfile(t), {nurBelegt:true}) +
    '</div>'
  ).join('');
  return '<section class="section tc-team-section" id="team-' + esc(slug) + '" aria-labelledby="tc-team-head-' + esc(slug) + '">' +
    '<div class="wrap">' +
      '<div class="tc-team-top"><div><div class="section-label">Menschen statt Standardlösungen</div>' +
      '<h2 class="section-title" id="tc-team-head-' + esc(slug) + '">Unser <em>gesamtes Team</em></h2>' +
      '<p class="tc-team-description">' +
      (locals.length ? 'Die Fachpersonen in '+esc(city)+' zuerst – danach lernst du unser standortübergreifendes Netzwerk kennen.' :
        'Lerne die Fachpersonen aus unserem TCM.ch Netzwerk kennen. Die konkrete Betreuung am Standort klären wir bei deiner Anfrage.') +
      '</p></div>' +
      '<div class="tc-team-buttons" aria-label="Team-Karussell steuern"><button type="button" class="tc-team-prev" aria-label="Vorherige Teammitglieder anzeigen">‹</button><button type="button" class="tc-team-next" aria-label="Weitere Teammitglieder anzeigen">›</button></div>' +
      '</div>' +
      '<div class="tc-team-track" role="region" aria-roledescription="Karussell" aria-label="TCM.ch Team – horizontal wischen" tabindex="0">' + cards + '</div>' +
      '<p class="tc-team-swipe">Wische, um weitere Teammitglieder zu sehen <span aria-hidden="true">↔</span></p>' +
    '</div></section>';
}
