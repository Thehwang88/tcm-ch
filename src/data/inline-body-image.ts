// Therapy layout fix: the captured leaves render the body image as a sticky side
// column (.therapie-img-wrap) which floats orphaned with dead space on desktop.
// This moves that image into the text flow right after the intro paragraph, as a
// full-width inline figure (.therapie-inline-img). No-op if the structure is absent.
export function inlineBodyImage(html: string): string {
  const m = html.match(/<div class="therapie-img-wrap"[^>]*>\s*(<img[^>]*>)\s*<\/div>/);
  if (!m) return html;
  const img = m[1]
    .replace(/\sid="[^"]*"/, '')
    .replace(/\sstyle="[^"]*"/, '')
    .replace(/\sloading="[^"]*"/, '')
    .replace(/\swidth="[^"]*"/, '')
    .replace(/\sheight="[^"]*"/, '')
    .replace(/^<img/, '<img loading="lazy" width="1120" height="746"');
  const figure = `<figure class="therapie-inline-img">${img}</figure>`;
  let out = html.replace(m[0], '');
  const ti = out.indexOf('<div class="therapie-text">');
  if (ti < 0) return out;
  const pEnd = out.indexOf('</p>', ti);
  if (pEnd < 0) return out;
  const at = pEnd + 4;
  return out.slice(0, at) + figure + out.slice(at);
}
