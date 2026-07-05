// Extracts the Q&A from a captured leaf's VISIBLE FAQ accordion so the FAQPage
// schema is sourced from exactly what Google sees on the page (no separate copy).
// Handles the three FAQ markups used across the leaves:
//   1. beschwerden:  <button class="cp-faq-q">Q</button><div class="cp-faq-a">A</div>
//   2. therapien:    <details class="faq-item"><summary>Q</summary><div>A</div></details>
//   3. plain:        <h2>Häufige Fragen</h2><h3>Q</h3><p>A</p> …
export interface Faq { q: string; a: string }

const strip = (s: string) =>
  s
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<span[\s\S]*?<\/span>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function parseLeafFaqs(html: string): Faq[] {
  const out: Faq[] = [];
  let m: RegExpExecArray | null;

  const rc = /<button class="cp-faq-q"[^>]*>([\s\S]*?)<\/button>\s*<div class="cp-faq-a"[^>]*>([\s\S]*?)<\/div>/g;
  while ((m = rc.exec(html))) out.push({ q: strip(m[1]), a: strip(m[2]) });
  if (out.length) return out;

  const rd = /<summary[^>]*>([\s\S]*?)<\/summary>\s*<div[^>]*>([\s\S]*?)<\/div>\s*<\/details>/g;
  while ((m = rd.exec(html))) out.push({ q: strip(m[1]), a: strip(m[2]) });
  if (out.length) return out;

  const hi = html.indexOf('Häufige Fragen');
  if (hi < 0) return out;
  let end = html.indexOf('cp-reviews', hi);
  if (end < 0) end = html.indexOf('contact-section', hi);
  if (end < 0) end = hi + 5000;
  const region = html.slice(hi, end);
  const rp = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  while ((m = rp.exec(region))) out.push({ q: strip(m[1]), a: strip(m[2]) });
  return out;
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
