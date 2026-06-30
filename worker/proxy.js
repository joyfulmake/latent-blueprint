// ── Latent Blueprint Engine - Cloudflare Worker Proxy ─────────────────────
// Deploy this at dashboard.cloudflare.com → Workers & Pages → Create Worker
// Then add secret: Settings → Variables → GROQ_KEY = your Groq key

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();

      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_KEY}`,   // secret, never exposed
        },
        body: JSON.stringify(body),
      });

      const data = await groqRes.json();

      return new Response(JSON.stringify(data), {
        status: groqRes.status,
        headers: { 'Content-Type': 'application/json', ...CORS },
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: { message: err.message } }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }
  },
};