// Catch-all prune for /therapien/* on Cloudflare Pages.
//
//   /therapien                 -> hub, kept (falls through to SPA, 200)
//   /therapien/<slug>          -> kept (Astro static therapy page, else SPA)
//   /therapien/<slug>/<stadt>  -> ALWAYS 410 (therapy x city doorway combos)
//   except ALLOW-listed real sub-pages (e.g. schroepfen/blutiges-schroepfen)
//
// Same doorway logic as the beschwerden nested-combo prune.

// Real nested therapy sub-pages that must stay live (not doorway combos).
const ALLOW = new Set(["schroepfen/blutiges-schroepfen", "schroepfen/hijama"]);

function gone() {
  return new Response(
    "<!doctype html><meta charset=utf-8><title>Seite entfernt</title><p>Diese Seite existiert nicht mehr.",
    { status: 410, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export async function onRequest(context) {
  const raw = context.params.path;
  const segments = Array.isArray(raw) ? raw : (raw ? [raw] : []);
  if (segments.length >= 2) {
    if (ALLOW.has(segments.join("/"))) return context.next(); // real nested sub-page
    if (segments[0] === "massage") return context.next();     // real /therapien/massage/* sub-pages (Astro static)
    return gone();                                            // /therapien/<t>/<stadt>(/...) -> gone
  }
  return context.next();                                      // hub + single therapy pages
}
