// DIAGNOSTIC v3 — does ANY outbound fetch work? (fetch example.com, not Resend)
function J(obj) {
  return new Response(JSON.stringify(obj), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }) {
  let stage = 'before_fetch';
  try {
    stage = 'fetching';
    const res = await fetch('https://example.com', { method: 'GET' });
    stage = 'reading';
    const text = await res.text();
    return J({ stage: 'done', status: res.status, len: text.length });
  } catch (err) {
    return J({ stage, name: String(err && err.name), message: String((err && err.message) || err) });
  }
}
