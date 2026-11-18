// Same full public roster and ordering as the existing canonical team list.
// No clinic-specific sorting, grouping or staff-location status badges.
import { therapeuten, teamCardHtml, getPublicTherapistProfile } from '../data/therapeuten';

const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

export function locationTeamHtml(slug: string, city: string): string {
  const cards = therapeuten.map(t =>
    '<div class="tc-team-slide">' +
      // Horizontal slides must not inherit the vertical reveal animation:
      // off-screen slides can otherwise appear as empty white cards when swiped.
      teamCardHtml(getPublicTherapistProfile(t)).replace('class="tmc reveal"', 'class="tmc"') +
    '</div>'
  ).join('');
  return '<section class="section tc-team-section" id="team-' + esc(slug) + '" aria-labelledby="tc-team-head-' + esc(slug) + '">' +
    '<div class="wrap">' +
      '<div class="tc-team-top"><div><div class="section-label">Menschen statt Standardlösungen</div>' +
      '<h2 class="section-title" id="tc-team-head-' + esc(slug) + '">Unser <em>gesamtes Team</em></h2>' +
      '<p class="tc-team-description">' +
      'Lerne die Menschen hinter TCM.ch kennen – unser gesamtes Team auf einen Blick.' +
      '</p></div>' +
      '<div class="tc-team-buttons" aria-label="Team-Karussell steuern"><button type="button" class="tc-team-prev" aria-label="Vorherige Teammitglieder anzeigen">‹</button><button type="button" class="tc-team-next" aria-label="Weitere Teammitglieder anzeigen">›</button></div>' +
      '</div>' +
      '<div class="tc-team-track" role="region" aria-roledescription="Karussell" aria-label="TCM.ch Team – horizontal wischen" tabindex="0">' + cards + '</div>' +
      '<p class="tc-team-swipe">Wische, um weitere Teammitglieder zu sehen <span aria-hidden="true">↔</span></p>' +
    '</div></section>';
}
