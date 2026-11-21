// Shared heritage gallery: genuine TCM.ch team/clinic photos and approved Wonnam Temple architecture photos.
// The historical architectural images are not portrayed as buildings owned by the Hwang family.
import { licensedArchitecturePhotos as architecture } from '../data/heritage-architecture-rights';
const esc = (v: string) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const tilePhoto = (src: string, alt: string, label: string, extra = '') => {
  // Width/height track each source orientation for responsive browser layout.
  const portrait = extra.includes('heritage-tile--corridor');
  const reception = extra.includes('heritage-tile--hwang');
  const width = portrait ? 667 : reception ? 1200 : 720;
  const height = portrait ? 1000 : reception ? 800 : 520;
  return `<figure class="heritage-tile ${extra}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" width="${width}" height="${height}"><figcaption>${esc(label)}</figcaption></figure>`;
};

const architectureTile = (photo: { originalReferenceUrl: string; alt: string; label: string }, extra = '') =>
  `<figure class="heritage-tile heritage-tile--licensed ${extra}"><img src="${esc(photo.originalReferenceUrl)}" alt="${esc(photo.alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" width="1000" height="750"><figcaption>Won-Buddhismus · Wonnam-Tempel, Seoul</figcaption></figure>`;

// Original, publicly hosted photo from Praxis Hwang's own Kreuzlingen gallery.
const hwangReception = 'https://cdn.prod.website-files.com/67b0345c66f48f117fbcc562/685ba70fc3905327089d7168_tinywow_579A1800_81910170.webp';
// Original Wonnam Temple corridor photograph, also selected by the user.
const koreanCorridor = architecture.timberCorridor.originalReferenceUrl;

const pictureSet = (variant: 'home'|'about'|'location', localPhoto?: string, localAlt?: string) => {
  const group = variant === 'location' ? 'heritage-gallery heritage-gallery--compact' : 'heritage-gallery heritage-gallery--' + variant;
  // Do not duplicate crops or add decorative architecture the user has explicitly removed.
  const cards = variant === 'location'
    ? [architectureTile(architecture.hanokAndModern, 'heritage-tile--first'),
       tilePhoto(hwangReception, 'Empfang der Praxis Hwang in Kreuzlingen mit Holzverkleidung und Hwang-Logo', 'Praxis Hwang · Kreuzlingen seit 2012', 'heritage-tile--hwang'),
       tilePhoto(localPhoto || '/images/team.webp?v=2', localAlt || 'Teamfoto des TCM.ch Netzwerks', localPhoto ? 'Die Praxis heute' : 'Unser Netzwerk')]
    : variant === 'home'
    ? [architectureTile(architecture.hanokAndModern, 'heritage-tile--first'),
       tilePhoto('/images/img-9ddc7d8df590.webp', 'Simon Stüve und Team beim TCM.ch Fotoshooting', 'Die nächste Generation · TCM.ch', 'heritage-tile--people'),
       tilePhoto(hwangReception, 'Empfang der Praxis Hwang in Kreuzlingen mit Hwang-Logo', 'Praxis Hwang · seit 2012', 'heritage-tile--hwang'),
       tilePhoto(koreanCorridor, 'Lichtdurchfluteter Innenraum mit geschwungener Wand und Holzlamellen im Wonnam-Tempel Seoul', 'Won-Buddhismus · Architektur in Seoul', 'heritage-tile--corridor')]
    : [architectureTile(architecture.hanokAndModern, 'heritage-tile--first'),
       tilePhoto('/images/img-9ddc7d8df590.webp', 'Simon Stüve und Team beim TCM.ch Fotoshooting', 'Die nächste Generation · TCM.ch', 'heritage-tile--people'),
       tilePhoto(hwangReception, 'Empfang der Praxis Hwang in Kreuzlingen mit Hwang-Logo', 'Praxis Hwang · seit 2012 in der Schweiz', 'heritage-tile--hwang'),
       tilePhoto(koreanCorridor, 'Lichtdurchfluteter Innenraum im Wonnam-Tempel mit Holzlamellen und geschwungener Wand', 'Won-Buddhismus · Tradition trifft Moderne', 'heritage-tile--corridor')];
  return `<div class="${group}" aria-label="Fotogalerie zu Korea, Praxis Hwang und TCM.ch">${cards.join('')}</div>`;
};
export const homeHeritageHtml = `<section class="heritage-story heritage-story--home" id="unsere-geschichte" aria-labelledby="heritage-home-title">
<div class="wrap heritage-story-inner"><div class="heritage-story-copy">
<p class="heritage-kicker">UNSERE GESCHICHTE <span>·</span> SEIT 2012 IN DER SCHWEIZ</p>
<h2 id="heritage-home-title">Vier Generationen.<br><em>Eine neue Ära der TCM.</em></h2>
<p>Unsere Familiengeschichte reicht vier Generationen nach Korea zurück und ist eng mit dem Won-Buddhismus verbunden. Der Geistliche Jangsan Hwang Jikpyeong prägte diese Tradition. 2012 gründeten wir die Praxis Hwang in Kreuzlingen. Heute führt TCM.ch dieses Erbe weiter – mit qualifizierten Fachpersonen, persönlicher Betreuung und modernen Abläufen.</p>
<a class="heritage-story-link" href="/ueber-uns/" data-care-cta="home-heritage-story">Unsere Geschichte entdecken <span aria-hidden="true">→</span></a>
</div>${pictureSet('home')}</div></section>`;

export const aboutHeritageHtml = `<section class="heritage-story heritage-story--about" id="unsere-wurzeln" aria-labelledby="heritage-about-title">
<div class="wrap"><div class="heritage-about-heading"><p class="heritage-kicker">VON KOREA IN DIE SCHWEIZ</p><h2 id="heritage-about-title">Tradition bewahren.<br><em>Zukunft gestalten.</em></h2>
<p>Unsere Geschichte beginnt nicht erst mit einer Schweizer Praxis. Sie führt zurück nach Korea, in eine Familie, in deren Geschichte der Won-Buddhismus eine besondere Rolle spielt. Der hochrangige Geistliche Jangsan Hwang Jikpyeong (1932–2019) steht für eine Haltung, die uns wichtig ist: Wissen weitergeben, Verantwortung übernehmen und für andere da sein.</p><p>2012 begann mit der Praxis Hwang in Kreuzlingen das Schweizer Kapitel. Heute tragen wir diese Werte mit TCM.ch weiter – als neue Generation mit qualifizierten Fachpersonen, transparenten Abläufen und persönlicher Patientenbetreuung.</p></div>
${pictureSet('about')}
<div class="heritage-photo-context"><strong>Was zeigen diese Bilder?</strong><p>Die Architekturaufnahmen stammen vom Wonnam-Tempel in Seoul – einem zeitgenössischen Ort des Won-Buddhismus. Die Verbindung von traditionellem Hanok und moderner Architektur steht für unsere Idee: Herkunft bewahren und weiterdenken. Der Tempel ist ein Symbol dieser Wurzeln, kein ehemaliger Praxis- oder Familiensitz.</p></div>
<ol class="heritage-timeline" aria-label="Meilensteine der TCM.ch Geschichte">
<li><span>01</span><h3>Korea &amp; Won-Buddhismus</h3><p>Vier Generationen Familiengeschichte. Unsere Wurzeln sind mit einer koreanischen Tradition verbunden, die Mitgefühl, Bildung und Verantwortung im Alltag betont.</p></li>
<li><span>02</span><h3>Jangsan Hwang Jikpyeong</h3><p>Der hochrangige Won-buddhistische Geistliche (1932–2019) ist Teil unserer Familiengeschichte. Seine Lebenshaltung steht sinnbildlich für das Weitergeben von Wissen und Fürsorge.</p></li>
<li><span>03</span><h3>2012 · Praxis Hwang</h3><p>In Kreuzlingen beginnt unser Schweizer Praxis-Kapitel: persönliche Behandlung und die Weiterentwicklung unserer Familientradition im Alltag.</p></li>
<li><span>04</span><h3>TCM.ch · die nächste Generation</h3><p>Was in einer Familie begann, wächst zu einem Netzwerk: moderne Organisation, anerkannte Fachpersonen und persönliche Betreuung in der Schweiz.</p></li>
</ol>
<div class="heritage-family-bridge"><div><p class="heritage-kicker">VON UNSERER HERKUNFT ZUR BETREUUNG HEUTE</p><h3>Was hat das mit TCM.ch zu tun?</h3></div><p>Der Won-Buddhismus ist Teil unserer Familiengeschichte, kein medizinischer Wirksamkeitsnachweis. Was wir daraus mitnehmen, ist eine Haltung: zuhören, lernen und Verantwortung übernehmen. Bei TCM.ch sollst du das konkret erleben – durch qualifizierte Therapeutinnen und Therapeuten, klare Informationen und einen einfachen Weg zur Behandlung.</p></div>
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
<p>Unsere Geschichte verbindet vier Generationen koreanischer Familienwurzeln – geprägt auch vom Won-Buddhismus – mit der 2012 in Kreuzlingen gegründeten Praxis Hwang. Heute führt unser Team diese Werte in ${esc(city)} weiter: persönlich, qualifiziert und mit klaren Abläufen.</p>
<a class="heritage-story-link" href="/ueber-uns/" data-care-cta="location-heritage-story">Mehr über unsere Geschichte <span aria-hidden="true">→</span></a></div>
</div></section>`;
