# TURN credentials Worker

Optional. Online play works without this on most networks. Set it up only if two devices cannot connect.

This small Cloudflare Worker gives the game short-lived Cloudflare TURN credentials. Your TURN key ID and API token are stored as encrypted Worker secrets, so they never appear in the page or in this repository.

## Set up

Run these from this folder. Each `secret put` command asks you to paste the value.

```bash
npx wrangler login
npx wrangler deploy
npx wrangler secret put TURN_KEY_ID
npx wrangler secret put TURN_API_TOKEN
```

`wrangler deploy` prints the Worker's address, like `https://insanechess-turn.<your-subdomain>.workers.dev`.

Then open `index.html` in the repository root, find the line that starts `const TURN_ENDPOINT =`, and put that address between the quotes. Commit and push.

## Notes

- The Worker only answers requests from `https://dahliajunus-netizen.github.io`. To allow another address, add it to `ALLOWED_ORIGINS` in `worker.js` and deploy again.
- If the Worker is unreachable, the game falls back to the connection library's default relay.
