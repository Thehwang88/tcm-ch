// Canonical host enforcement: www.tcm.ch -> tcm.ch (301), preserving path + query.
// Cloudflare Pages _redirects only matches on path, not hostname, so host->host
// redirects must run here. All non-www requests pass straight through to the normal
// routing (static assets + the scoped /beschwerden|/therapien|/wissen functions).
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'www.tcm.ch') {
    url.hostname = 'tcm.ch';
    return new Response(null, { status: 301, headers: { Location: url.toString() } });
  }
  // Legacy junk paths outside the scoped section doorways -> 410 Gone (same body as those).
  const GONE = new Set(['/SMS/online.html', '/Dhyana/Datenschutzerklaerung.pdf']);
  if (GONE.has(url.pathname)) {
    return new Response(
      "<!doctype html><meta charset=utf-8><title>Seite entfernt</title><p>Diese Seite existiert nicht mehr.",
      { status: 410, headers: { "content-type": "text/html; charset=utf-8" } }
    );
  }
  // Trailing-slash canonicalization: no-slash, extensionless paths -> 308 (permanent) to the
  // slash form. Replaces Cloudflare's default 307 so Google consolidates to the canonical.
  // Skip paths that _redirects already 301s (avoid a redirect chain); query string preserved.
  const REDIRECT_ROOTS = ['/krankenkasse', '/karriere', '/partnerpraxen', '/zuerich-longevity', '/standorte/winterthur'];
  const lastSeg = url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
  const isRedirectSrc = REDIRECT_ROOTS.some((r) => url.pathname === r || url.pathname.startsWith(r + '/'));
  if (!url.pathname.endsWith('/') && !lastSeg.includes('.') && !isRedirectSrc) {
    url.pathname += '/';
    return new Response(null, { status: 308, headers: { Location: url.toString() } });
  }
  return context.next();
}
