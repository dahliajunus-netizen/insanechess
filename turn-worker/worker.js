// Hands out short-lived Cloudflare TURN credentials to the Insane Chess page.
// The TURN key ID and API token live in Worker secrets, never in the page.

const ALLOWED_ORIGINS = ['https://dahliajunus-netizen.github.io'];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin);
    const cors = { 'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0], 'Vary': 'Origin' };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'GET' } });
    }
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: cors });
    if (!allowed) return new Response('Forbidden', { status: 403, headers: cors });
    if (!env.TURN_KEY_ID || !env.TURN_API_TOKEN) {
      return new Response('TURN secrets are not set', { status: 500, headers: cors });
    }

    const reply = await fetch(
      `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate-ice-servers`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.TURN_API_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ttl: 14400 }),   // four hours: longer than a game
      }
    );
    if (!reply.ok) return new Response('Could not get TURN credentials', { status: 502, headers: cors });

    const data = await reply.json();
    // Browsers block port 53, so those addresses only cause timeouts.
    const iceServers = [].concat(data.iceServers || []).map(server => ({
      ...server,
      urls: [].concat(server.urls || []).filter(url => !/:53(\?|$)/.test(url)),
    })).filter(server => server.urls.length);

    return Response.json({ iceServers }, { headers: { ...cors, 'Cache-Control': 'no-store' } });
  },
};
