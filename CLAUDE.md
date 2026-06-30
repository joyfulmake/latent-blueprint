# Latent Blueprint Engine

Cloudflare Worker proxy for the Latent Blueprint app. No Pages frontend (https://latent-blueprint.pages.dev returns 404 — no active deployment). The app is served entirely through the Worker.

## Recovery status (as of 2026-06-30)

- `worker/proxy.js` — RECOVERED from Cloudflare Workers API (deployed as `late-limit-467b`)

## Stack

- Cloudflare Worker (`worker/proxy.js`) proxying requests to Groq API
- Requires secret: `GROQ_KEY` (set via Cloudflare dashboard or `wrangler secret put GROQ_KEY`)

## Deploy

```bash
# Deploy the Worker
npx wrangler deploy worker/proxy.js --name late-limit-467b

# Set the required secret (first time or after rotation)
npx wrangler secret put GROQ_KEY --name late-limit-467b
```

## Repo

github.com/joyfulmake/latent-blueprint
