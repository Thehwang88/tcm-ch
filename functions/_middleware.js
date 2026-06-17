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
  return context.next();
}
