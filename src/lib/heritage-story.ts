// Shared visual storytelling modules for homepage, About and clinic pages.
// No invented archival family photography or third-party architecture rights.
// Photo assets are already used elsewhere on tcm.ch; Korean architecture is an original SVG illustration.
const esc = (v: string) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const tilePhoto = (src: string, alt: string, label: string, extra = '') =>
  `<figure class="heritage-tile ${extra}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" width="720" height="520"><figcaption>${esc(label)}</figcaption></figure>`;

// Original illustrative motif (not a photograph of a historical family property).
const koreaTile = (extra = '') => `<figure class="heritage-tile heritage-tile--art heritage-tile--korea ${extra}">
<svg viewBox="0 0 600 420" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
  <defs><linearGradient id="heritage-roof-gradient" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#e5dbcd"/><stop offset="1" stop-color="#c8af92"/></linearGradient></defs>
  <circle cx="474" cy="95" r="63" fill="#f4e4c7" opacity=".65"/>
  <path d="M0 285 Q100 224 205 265 T410 252 T600 255 V420 H0Z" fill="#c6b5a0" opacity=".38"/>
  <path d="M45 243 Q175 238 290 172 Q405 238 555 243 L528 263 Q395 250 290 201 Q184 254 68 263Z" fill="#304c50"/>
  <path d="M95 268 H495 V385 H95Z" fill="url(#heritage-roof-gradient)"/>
  <path d="M144 267 V388 M235 267 V388 M344 267 V388 M436 267 V388" stroke="#6c5d4c" stroke-width="13"/>
  <path d="M95 310 H495 M95 368 H495" stroke="#6c5d4c" stroke-width="8" opacity=".55"/>
  <path d="M274 312 V389 M312 312 V389" stroke="#6c5d4c" stroke-width="6"/>
  <path d="M18 398 H582" stroke="#786f61" stroke-width="12"/>
</svg><span class="heritage-tile-art-label">KOREA <span aria-hidden="true">·</span> UNSERE WURZELN</span>
<figcaption>Koreanische Architektur als Illustration unserer kulturellen Wurzeln</figcaption></figure>`;

const bridgeTile = (extra = '') => `<figure class="heritage-tile heritage-tile--art heritage-tile--bridge ${extra}">
<div class="heritage-bridge-art" aria-hidden="true"><span>SEOUL</span><i></i><span>SCHWEIZ</span></div>
<p>Tradition<br><em>weitergedacht.</em></p>
<figcaption>Gestaltungsmotiv: Von Korea in die Schweiz</figcaption></figure>`;

const pictureSet = (variant: 'home'|'about'|'location', localPhoto?: string, localAlt?: string) => {
  const group = variant === 'location' ? 'heritage-gallery heritage-gallery--compact' : 'heritage-gallery heritage-gallery--' + variant;
  const cards = variant === 'location'
    ? [koreaTile('heritage-tile--first'),
       tilePhoto('/images/img-9ddc7d8df590.webp', 'Simon Stüve mit dem Team bei einem TCM.ch Fotoshooting', 'Menschen hinter TCM.ch'),
       tilePhoto(localPhoto || '/images/team.webp?v=2', localAlt || 'Teamfoto des TCM.ch Netzwerks', localPhoto ? 'Die Praxis heute' : 'Unser Netzwerk')]
    : variant === 'home'
    ? [koreaTile('heritage-tile--first'),
       tilePhoto('/images/img-9ddc7d8df590.webp', 'Simon Stüve und das TCM.ch Team beim Fotoshooting', 'Die Menschen'),
       bridgeTile(),
       tilePhoto('/images/standort-stgallen.webp', 'Einblick in die TCM.ch Praxis in St. Gallen', 'Die Praxis heute'),
       tilePhoto('/images/team.webp?v=2', 'Gemeinschaftliches Teamfoto von TCM.ch', 'Unser Netzwerk')]
    : [koreaTile('heritage-tile--first'),
       tilePhoto('/images/img-9ddc7d8df590.webp', 'Simon Stüve und Team beim TCM.ch Fotoshooting', 'Die Menschen'),
       bridgeTile(),
       tilePhoto('/images/team.webp?v=2', 'Teamfoto von TCM.ch', 'Unser Team'),
       tilePhoto('/images/standort-stgallen.webp', 'Empfangsbereich der TCM.ch Praxis St. Gallen', 'Unsere Praxen'),
       tilePhoto('/images/team-hero.jpg', 'TCM.ch Team im gemeinsamen Gespräch', 'Die nächste Generation')];
  return `<div class="${group}" aria-label="Bilder und Illustrationen zur Geschichte von TCM.ch">${cards.join('')}</div>`;
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
