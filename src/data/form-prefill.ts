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
