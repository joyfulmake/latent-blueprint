# Latent Blueprint
### The architecture of ideas, made visible

> *Every concept has a structure. Most people never see it.*

A Cloudflare Worker that proxies Groq's LLM to surface the latent structure of any idea — the hidden blueprint underneath what something appears to be. Fast, edge-deployed, key-protected.

**Worker →** https://late-limit-467b.workers.dev  
**Pages site →** https://latent-blueprint.pages.dev *(no active deployment)*

---

## What it does

Send a concept. Get back its architecture — the components, relationships, and assumptions that make it what it is. The Worker handles the API proxy so the GROQ key never touches the client.

```
Client → Worker (late-limit-467b) → Groq API → structured response
```

---

## Files

```
worker/
  proxy.js    ← the entire backend (Cloudflare Worker, source recovered)
```

That's it. No frontend, no build step, no dependencies. The proxy is deployed directly.

---

## Setup

The Worker requires one secret:

```bash
# Set the Groq API key
npx wrangler secret put GROQ_KEY --name late-limit-467b

# Deploy the Worker
npx wrangler deploy worker/proxy.js --name late-limit-467b
```

Get a Groq key at [console.groq.com/keys](https://console.groq.com/keys) — free tier is sufficient.

---

## Deploy

```bash
npx wrangler deploy worker/proxy.js --name late-limit-467b
```

---

## Working on this project

```bash
cd /home/kali/dev-workspace/worktrees/latent-blueprint
# worker/proxy.js is the entire project — fully editable
# ask Claude: "add streaming response support" or "add a new endpoint for concept comparison"
```
