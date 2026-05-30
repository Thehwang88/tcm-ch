// DIAGNOSTIC version — no Resend call, just echoes back.
export async function onRequestPost({ request, env }) {
  let d = {};
  try { d = await request.json(); } catch (e) {}
  return new Response(JSON.stringify({
    ok: true,
    debug: 'minimal',
    hasKey: !!(env && env.RESEND_API_KEY),
    got: d
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
