// GET /api/sg-next-slot → { slot, label, labelEn, fetchedAt } | { slot: null }
// Nächster freier «Kostenloser TCM-Check-in» (St. Gallen, Corinna Reinhart) aus dem öffentlichen OneDoc-Widget-Endpunkt
// (src/lib/sg-next-slot.mjs). Serverseitig, Cache 10 Minuten (Cloudflare Cache API + Cache-Control), nur Datum/Uhrzeit,
// keine Patientendaten, kein Token. Fehler → slot null (nie ein erfundener Slot), kurz gecacht.
import { findNextSlot } from '../../src/lib/sg-next-slot.mjs';

const J = (obj, status = 200, maxAge = 600) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}` } });

export async function onRequestGet({ request }) {
  const cacheKey = new Request(new URL('/api/sg-next-slot', request.url).toString(), { method: 'GET' });
  const cache = typeof caches !== 'undefined' ? caches.default : null;
  if (cache) { const hit = await cache.match(cacheKey); if (hit) return hit; }
  let res;
  try {
    const r = await findNextSlot(fetch, new Date());
    res = J({ ...r, fetchedAt: new Date().toISOString() }, 200, 600);
  } catch (e) {
    res = J({ slot: null, error: 'unavailable' }, 200, 60);
  }
  if (cache) { try { await cache.put(cacheKey, res.clone()); } catch (e) {} }
  return res;
}
