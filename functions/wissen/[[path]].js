// Catch-all prune for /wissen/* on Cloudflare Pages.
//
//   /wissen                  -> hub, kept (falls through to SPA, 200)
//   /wissen/<slug>           -> 410 if <slug> is a city-variant doorway (WISSEN_KILL)
//                               else falls through (Astro static article or SPA)
//
// WISSEN_KILL is the single source of truth in public/wissen-kill.js.
import "../../public/wissen-kill.js";

const KILL = new Set(globalThis.WISSEN_KILL);

function gone() {
  return new Response(
    "<!doctype html><meta charset=utf-8><title>Seite entfernt</title><p>Diese Seite existiert nicht mehr.",
    { status: 410, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export async function onRequest(context) {
  const raw = context.params.path;
  const segments = Array.isArray(raw) ? raw : (raw ? [raw] : []);
  if (segments.length === 0) return context.next(); // /wissen hub
  const slug = decodeURIComponent(segments[0]).toLowerCase();
  return KILL.has(slug) ? gone() : context.next();
}
