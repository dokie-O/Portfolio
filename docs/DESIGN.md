# Design Language

The visual style is inspired by League of Legends' client UI ("hextech") —
dark panels, gold trim, angular clipped corners, uppercase tracked type.
No game assets, icons, or logos are used — only the color/shape/type language.

## Tokens (`app/globals.css`)

| Token                      | Use                                                                  |
| -------------------------- | -------------------------------------------------------------------- |
| `--background`             | Page background (near-black navy)                                    |
| `--background-elevated`    | Panel/card background                                                |
| `--foreground`             | Primary text (parchment off-white)                                   |
| `--foreground-muted`       | Secondary/body text                                                  |
| `--gold` / `--gold-bright` | Accent text, borders, active states                                  |
| `--gold-dark`              | Subtle borders, dividers                                             |
| `--accent`                 | Teal highlight — contact form's success state, and the "Live" project links (card + modal), signaling an external live-site action distinct from gold's structural/primary use |

These map to Tailwind utilities via `@theme inline`, so use `text-gold`,
`border-gold-dark`, `bg-background-elevated`, etc. directly in class names.

## Fonts

- **Cinzel** (`font-display`) — headings, nav wordmark, section titles. Loaded via
  `next/font/google` in `app/layout.tsx`.
- **Geist Sans** (`font-sans`, default) — body copy.

## Shapes

- `.hex-panel` / `.hex-panel-sm` (in `globals.css`) clip the top-left and
  bottom-right corners of an element via `clip-path`, giving borders an angular,
  "UI plate" look instead of rounded corners. Used on cards and buttons.
- Section headers use a diamond (`rotate-45` square) divider ornament —
  see `components/ui/SectionHeading.tsx`.
- `body`'s background (`app/globals.css`) is currently just a soft radial gold glow
  over the base color — no texture/pattern. A diagonal-line lattice texture was
  tried and reverted (not settled on a background treatment yet); revisit before
  adding one back. Uses `background-attachment: fixed` so the gradient is sized
  against the viewport, not the full scrollable page — without it, the ellipse's
  percentage-based size/position are computed against body's full content height,
  which throws off the falloff and shows up as a hard edge partway down the page
  instead of a smooth glow.

## Typography

Two label tiers, one body-copy size, explicit title sizes. Don't invent new
font-size/tracking values ad hoc — reuse these:

| Role                     | Classes                                                     | Where                                                                            |
| ------------------------ | ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Label** (prominent)    | `text-xs font-semibold tracking-[0.2em] uppercase`          | `SectionHeading`, Hero eyebrow, Skills category heading, nav links, all buttons  |
| **Meta/tag** (secondary) | `text-xs tracking-wide uppercase`                           | Project tags, Experience role meta/location/skill tags, Footer                   |
| **Body copy**            | `text-base` (+ `text-foreground-muted`)                     | About bio, Experience role description, Project description                      |
| **Subtitle**             | `text-lg` (+ `text-foreground-muted`)                       | Hero tagline, Contact intro line — short single-sentence lines, not prose        |
| **Leaf title**           | `text-base font-semibold`                                   | Project card title (+ `font-display text-gold-bright`), Experience role title    |
| **Group-header title**   | `text-lg font-semibold` (+ `font-display text-gold-bright`) | Experience company name — one tier up from leaf title, since roles nest under it |
| **Display**              | `text-4xl sm:text-5xl font-display`                         | Hero `<h1>` only                                                                 |

The distinction between **Body copy** and **Subtitle** is prose vs. one-liner: a
multi-clause explanatory paragraph is Body copy (`text-base`); a short punchy
single sentence directly under a heading is a Subtitle (`text-lg`). Both are
`text-foreground-muted`.

## Shared primitives (`components/ui/`)

- `SectionHeading.tsx` — gold uppercase heading + gradient rule + diamond ornament.
- `HexPanel.tsx` — the clipped-corner card shell (used by Projects and Skills), with
  a hover lift plus a cursor-tracked 3D tilt (mousemove sets rotateX/rotateY via
  Framer Motion springs).
- `FadeIn.tsx` — scroll-triggered fade/rise entrance (Framer Motion), wraps section
  content. Pass `delay` to stagger items in a grid.
- `Logo.tsx` — inline SVG mark, `fill="currentColor"` so it's recolorable per usage.

Skill icons (`components/sections/skillIcons.ts`, from `react-icons/si`) render at
`text-gold` — real brand marks, but not brand colors. A grid of each tool's actual
logo color would fight the rest of the palette; staying monochrome keeps them
consistent with everything else on the page.

## Project screenshots

Project images come from other sites/apps with their own, unpredictable palettes —
a bright white screenshot next to a dark one would break the grid's cohesion. Card
thumbnails (`ProjectsGrid.tsx`) are tinted toward the theme by default —
`grayscale-55` plus a `bg-gold-dark/25 mix-blend-multiply` overlay, both fading out on
hover (`group-hover:`) to reveal the real screenshot. The detail modal always shows true
color (that's the point of clicking through) but gets a soft radial vignette so the
image's edges still blend into the dark frame regardless of how bright it is. Apply
the same tint treatment to any new place that shows a grid of external screenshots.

## Overlays (`ProjectModal.tsx`)

The project detail modal is the one overlay in the site so far — it reuses the same
vocabulary rather than introducing a new "modal style":

- The panel itself is a `.hex-panel` with the same border/background as `HexPanel`
  cards — an overlay is still a panel, not a different surface.
- The image slider's prev/next buttons and dot indicators are plain gold-bordered
  squares/diamonds (the dot indicator is the same `rotate-45` diamond used for
  `SectionHeading`'s ornament and Skills' bullet points) — no new shapes invented.
- Close (`✕`) and prev/next (`‹`/`›`) are plain text glyphs in bordered buttons,
  matching the mobile nav's hand-built hamburger icon — consistent with "no icon
  library" (see Reusing this in a new section, below).
- Backdrop: `bg-background/90 backdrop-blur`, same treatment as `Navbar`'s sticky
  header background, so the overlay reads as "more of the same UI," not a foreign
  browser-default dialog.

## Motion & interactivity

An earlier version of this site had a full-page animated particle background
(`EmberField`) — removed. Constant, ambient motion behind static content reads as
distracting rather than alive, especially on a single long-scroll page where it's
visible the whole time. The background is static now (see Shapes above); motion is
reserved for things a visitor actually does:

- **Hover/pointer**: `HexPanel`'s tilt (Projects/Skills cards) and button
  `hover:`/`disabled:cursor-*` states are the tactile, per-element feedback layer.
- **Navigation**: `Navbar` uses an `IntersectionObserver` to track which section is
  in view and renders a `motion.span layoutId="nav-underline"` under the active
  link — Framer Motion animates its position/width automatically when the active
  link changes, instead of it being redrawn from scratch.
- **Scroll**: `FadeIn` reveals section content once, on first scroll into view.
- **Click**: Project cards open `ProjectModal` (fade + scale in/out via `AnimatePresence`).
  Escape, a backdrop click, or the close button all dismiss it; arrow keys and the
  prev/next buttons move through `images`.

Rule of thumb: motion should reinforce state (what's active, what's hoverable) or
respond to something the visitor did (scroll, hover). Avoid anything that loops
indefinitely with no user input.

## Reusing this in a new section

Wrap content in `<FadeIn>`, start with `<SectionHeading>`, and use `HexPanel` for
any card-like content so new sections stay visually consistent with the rest of
the site.
