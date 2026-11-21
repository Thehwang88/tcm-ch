// Shared heritage gallery: genuine TCM.ch team/clinic photos and approved Wonnam Temple architecture photos.
// The historical architectural images are not portrayed as buildings owned by the Hwang family.
import { licensedArchitecturePhotos as architecture } from '../data/heritage-architecture-rights';
const esc = (v: string) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const tilePhoto = (src: string, alt: string, label: string, extra = '') =>
  `<figure class="heritage-tile ${extra}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" width="720" height="520"><figcaption>${esc(label)}</figcaption></figure>`;

const architectureTile = (photo: { originalReferenceUrl: string; alt: string; label: string }, extra = '') =>
  `<figure class="heritage-tile heritage-tile--licensed ${extra}"><img src="${esc(photo.originalReferenceUrl)}" alt="${esc(photo.alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" width="1000" height="750"><figcaption>${esc(photo.label)} · Wonnam-Tempel, Seoul</figcaption></figure>`;

// Original, publicly hosted photo from Praxis Hwang's own Kreuzlingen gallery.
const hwangReception = 'https://cdn.prod.website-files.com/67b0345c66f48f117fbcc562/685ba70fc3905327089d7168_tinywow_579A1800_81910170.webp';
// Original Wonnam Temple corridor photograph, also selected by the user.
const koreanCorridor = architecture.timberCorridor.originalReferenceUrl;

const pictureSet = (variant: 'home'|'about'|'location', localPhoto?: string, localAlt?: string) => {
  const group = variant === 'location' ? 'heritage-gallery heritage-gallery--compact' : 'heritage-gallery heritage-gallery--' + variant;
  // Do not duplicate crops or add decorative architecture the user has explicitly removed.
  const cards = variant === 'location'
    ? [architectureTile(architecture.hanokAndModern, 'heritage-tile--first'),
       tilePhoto(hwangReception, 'Empfang der Praxis Hwang in Kreuzlingen mit Holzverkleidung und Hwang-Logo', 'Praxis Hwang · Kreuzlingen', 'heritage-tile--hwang'),
       tilePhoto(localPhoto || '/images/team.webp?v=2', localAlt || 'Teamfoto des TCM.ch Netzwerks', localPhoto ? 'Die Praxis heute' : 'Unser Netzwerk')]
    : variant === 'home'
    ? [architectureTile(architecture.hanokAndModern, 'heritage-tile--first'),
       tilePhoto('/images/img-9ddc7d8df590.webp', 'Simon Stüve und Team beim TCM.ch Fotoshooting', 'Unsere Menschen', 'heritage-tile--people'),
       tilePhoto(hwangReception, 'Empfang der Praxis Hwang in Kreuzlingen mit Hwang-Logo', 'Praxis Hwang · 2012', 'heritage-tile--hwang'),
       tilePhoto(koreanCorridor, 'Lichtdurchfluteter Innenraum mit geschwungener Wand und Holzlamellen im Wonnam-Tempel Seoul', 'Tradition neu gedacht · Seoul', 'heritage-tile--corridor')]
    : [architectureTile(architecture.hanokAndModern, 'heritage-tile--first'),
       tilePhoto('/images/img-9ddc7d8df590.webp', 'Simon Stüve und Team beim TCM.ch Fotoshooting', 'Unsere Menschen', 'heritage-tile--people'),
       tilePhoto(hwangReception, 'Empfang der Praxis Hwang in Kreuzlingen mit Hwang-Logo', 'Praxis Hwang · Schweiz seit 2012', 'heritage-tile--hwang'),
       tilePhoto(koreanCorridor, 'Lichtdurchfluteter Innenraum im Wonnam-Tempel mit Holzlamellen und geschwungener Wand', 'Seoul · Moderne trifft Tradition', 'heritage-tile--corridor')];
  return `<div class="${group}" aria-label="Fotogalerie zu Korea, Praxis Hwang und TCM.ch">${cards.join('')}</div>`;
};
export const homeHeritageHtml = `<section class="heritage-story heritage-story--home" id="unsere-geschichte" aria-labelledby="heritage-home-title">
<div class="wrap heritage-story-inner"><div class="heritage-story-copy">
<p class="heritage-kicker">UNSERE GESCHICHTE <span>·</span> SEIT 2012 IN DER SCHWEIZ</p>
<h2 id="heritage-home-title">Vier Generationen.<br><em>Eine neue Ära der TCM.</em></h2>
<p>Unsere Wurzeln liegen in Korea. Mit der Praxis Hwang begann 2012 ein neues Kapitel in der Schweiz. TCM.ch führt diese Geschichte weiter: mit qualifizierten Fachpersonen, persönlicher Betreuung und einer neuen Generation von Praxen.</p>
<a class="heritage-story-link" href="/ueber-uns/" data-care-cta="home-heritage-story">Unsere Geschichte entdecken <span aria-hidden="true">→</span></a>
</div>${pictureSet('home')}</div></section>`;

export const aboutHeritageHtml = `<section class="heritage-story heritage-story--about" id="unsere-wurzeln" aria-labelledby="heritage-about-title">
<div class="wrap"><div class="heritage-about-heading"><p class="heritage-kicker">VON KOREA IN DIE SCHWEIZ</p><h2 id="heritage-about-title">Tradition bewahren.<br><em>Zukunft gestalten.</em></h2>
<p>Was über Generationen weitergegeben wird, soll nicht stehen bleiben. Unsere Familiengeschichte verbindet koreanische Wurzeln, die 2012 in Kreuzlingen gegründete Praxis Hwang und das heutige TCM.ch Netzwerk.</p></div>
${pictureSet('about')}
<ol class="heritage-timeline" aria-label="Meilensteine der TCM.ch Geschichte">
<li><span>01</span><h3>Korea</h3><p>Unsere familiären und kulturellen Wurzeln.</p></li>
<li><span>02</span><h3>Wissen weitergeben</h3><p>Über Generationen geprägte Werte: lernen, zuhören und Verantwortung übernehmen.</p></li>
<li><span>03</span><h3>2012 · Schweiz</h3><p>Praxis Hwang beginnt in Kreuzlingen ihr Schweizer Kapitel.</p></li>
<li><span>04</span><h3>TCM.ch heute</h3><p>Eine neue Generation von TCM-Praxen, Fachpersonen und Patientenbetreuung.</p></li>
</ol>
<div class="heritage-values"><div class="heritage-values-intro"><p class="heritage-kicker">WAS WIR WEITERTRAGEN</p><h2>Unsere Geschichte.<br><em>Unsere Verantwortung.</em></h2></div><div class="heritage-values-grid">
<article><span aria-hidden="true">01</span><h3>Tradition &amp; Herkunft</h3><p>Unsere Wurzeln geben uns Orientierung, nicht starre Regeln.</p></article>
<article><span aria-hidden="true">02</span><h3>Qualifizierte Fachpersonen</h3><p>Ausbildung, Anerkennung und Erfahrung zeigen wir transparent.</p></article>
<article><span aria-hidden="true">03</span><h3>Persönliche Betreuung</h3><p>Wir hören zu, bevor wir einen Behandlungsweg besprechen.</p></article>
<article><span aria-hidden="true">04</span><h3>Moderne Abläufe</h3><p>Einfacher Kontakt, klare Informationen und verlässliche Prozesse.</p></article>
</div></div></div></section>`;

export const locationHeritageHtml = (city: string, localPhoto?: string, localAlt?: string) => `<section class="heritage-story heritage-story--location" aria-label="Die Geschichte hinter TCM.ch">
<div class="wrap heritage-location-inner">${pictureSet('location',localPhoto,localAlt)}
<div class="heritage-story-copy"><p class="heritage-kicker">UNSERE WURZELN</p>
<h2>Vier Generationen Tradition.<br><em>Persönlich in ${esc(city)}.</em></h2>
<p>TCM.ch ist aus der Familientradition Hwang hervorgegangen. Seit 2012 in der Schweiz verwurzelt, führen wir diese Werte gemeinsam mit unseren Fachpersonen weiter – mit Zeit, Respekt und persönlicher Betreuung.</p>
<a class="heritage-story-link" href="/ueber-uns/" data-care-cta="location-heritage-story">Mehr über unsere Geschichte <span aria-hidden="true">→</span></a></div>
</div></section>`;
