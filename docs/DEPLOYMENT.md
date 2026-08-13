# Deployment

## Vercel (recommended)

Vercel is built by the Next.js team and requires no configuration for this project.

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. In the import screen (or later under Project Settings → Environment Variables), add
   `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` with your real Web3Forms key — see
   [docs/CONTENT_GUIDE.md#contact-form](CONTENT_GUIDE.md#contact-form). Without it the
   contact form renders but submissions fail.
4. Deploy — Vercel auto-detects Next.js at the repo root and runs `npm run build`.
5. After the first deploy, open the project on vercel.com and enable **Analytics** and
   **Speed Insights** from the project's tabs (both free on the Hobby plan). The
   `<Analytics />` / `<SpeedInsights />` components are already wired into
   `app/layout.tsx` — they just collect nothing until each is turned on for the project.

Every push to `main` redeploys automatically; pushes to other branches get preview URLs.

Analytics/Speed Insights only report data when the site is served from Vercel's
infrastructure — they render as no-ops during local dev and on other hosts.

## Other hosts

Any Node host that can run `npm run build && npm run start` works (Netlify, Render,
a VPS, etc.). Check `node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md`
for the current guidance for this Next.js version, since deployment output options
(e.g. standalone mode) can change between versions.

## Pre-deploy checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds locally
- [ ] `lib/data.ts` has real content (no placeholder text)
- [ ] `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set (locally in `.env.local`, and in the host's env vars)
- [ ] Metadata in `app/layout.tsx` (title, description) reflects the live site
- [x] Favicon: `app/icon.svg` (auto-detected by Next.js — no metadata wiring needed)
