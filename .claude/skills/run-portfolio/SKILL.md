---
name: run-portfolio
description: Launches the portfolio's Next.js dev server and drives it with Playwright to visually verify changes, including responsiveness at mobile/tablet/desktop breakpoints. Use whenever a UI/CSS/layout change needs verification before being called done.
---

# Running the portfolio

The app lives at the repo root. `chromium-cli` is not available in this environment —
use the `playwright` npm package directly instead. A Chromium binary is already cached
under `%LOCALAPPDATA%\ms-playwright`, so no browser download is needed.

## 1. Start the dev server

```bash
npm run dev > /tmp/dev.log 2>&1 &
disown
timeout 40 bash -c 'until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done'
```

Stop it when done (find the PID on Windows since `lsof`/`pkill -f` aren't reliable here):

```bash
netstat -ano | grep ':3000' | grep LISTENING   # note the PID in the last column
taskkill //PID <pid> //F
```

## 2. Get `playwright` available to a script

If a scratchpad `node_modules/playwright` isn't already set up:

```bash
cd <scratchpad dir>
npm init -y >/dev/null 2>&1
npm install playwright --no-save
```

## 3. Drive it and check responsiveness

Write a script (see below) and `node` it from the scratchpad directory. Always check at
least these three viewports — this project is mobile-heavy traffic, so mobile is not
optional:

| Breakpoint | Size     |
| ---------- | -------- |
| Mobile     | 375×812  |
| Tablet     | 768×1024 |
| Desktop    | 1280×900 |

For each viewport: navigate, wait for real content (not just `networkidle`), screenshot,
and assert no horizontal scroll:

```js
const { chromium } = require("playwright");

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
];

(async () => {
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForSelector("text=Alfie Mamangun");
    await page.screenshot({ path: `${vp.name}-top.png` });

    const hasHorizontalScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    console.log(
      vp.name,
      "horizontalScroll:",
      hasHorizontalScroll,
      "errors:",
      errors,
    );
    await page.close();
  }
  await browser.close();
})();
```

Read the resulting screenshots with the Read tool — don't just trust "no horizontal
scroll" as sufficient; clipped text, overlapping elements, and cramped touch targets
don't show up in that check.

## Known gotcha

The Navbar is a Client Component (`"use client"`, uses `useState` for the mobile menu
toggle). Below `sm` it hides the inline link list and shows a hamburger button instead —
if you add nav items or change this component, re-verify at 375px specifically, since
that's where it previously broke (links overflowed off-screen before the mobile menu was
added).
