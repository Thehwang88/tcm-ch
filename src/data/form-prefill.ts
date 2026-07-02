// Prefills the baked inline contact form on a rendered page body: fills the
// "Anliegen" textarea with the page topic (stays fully editable) and injects a
// hidden "quelle" field so the source page/topic reaches submit/CRM/tracking even
// after the user edits the text. No-op if the body has no anliegen textarea.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function prefillForm(body: string, anliegen: string, quelle: string): string {
  return body.replace(
    /(<textarea\b[^>]*name="anliegen"[^>]*>)<\/textarea>/,
    `$1${esc(anliegen)}</textarea><input type="hidden" name="quelle" value="${esc(quelle)}">`,
  );
}

// Pre-selects the matching option in the baked "standort" <select> on a rendered
// page body, so a standort page defaults to its own location. Matches an option
// whose text equals the location name or is a prefix of it ("Winterthur Marktgasse"
// -> "Winterthur"). No-op when nothing matches (e.g. partner standorte).
export function prefillStandort(body: string, standort: string): string {
  if (!standort) return body;
  let done = false;
  return body.replace(/<select\b[^>]*name="standort"[^>]*>[\s\S]*?<\/select>/, (sel) =>
    sel.replace(/<option\b([^>]*)>([\s\S]*?)<\/option>/g, (opt, attrs, text) => {
      const t = text.trim();
      if (done || !t || (standort !== t && !standort.startsWith(t))) return opt;
      done = true;
      return `<option${attrs} selected>${text}</option>`;
    }),
  );
}
