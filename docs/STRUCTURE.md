# Project Structure

```
app/
  layout.tsx          Root layout — fonts, <html>/<body>, global metadata, Navbar/Footer
  page.tsx             Home page — composes the section components in order
  globals.css          Tailwind import + hextech design tokens (see docs/DESIGN.md)

components/
  layout/
    Navbar.tsx          Sticky top nav with in-page section links
    Footer.tsx           Bottom bar with social links + copyright
  sections/
    Hero.tsx             Name, title, one-line pitch, CTA buttons
    About.tsx             Short bio
    Experience.tsx          Work history timeline (grouped by company), sourced from lib/data.ts
    Education.tsx            Degree(s) + highlights, sourced from lib/data.ts
    Projects.tsx           Server wrapper — heading + <ProjectsGrid>
    ProjectsGrid.tsx         Card grid + selected-project state (client component)
    ProjectModal.tsx           Detail overlay: image slider, description, tags, links (client component)
    Skills.tsx              Skill categories, sourced from lib/data.ts
    skillIcons.ts             Maps a skill label (lib/data.ts) to a react-icons component
    Contact.tsx               Heading, contact form, and social link buttons
    ContactForm.tsx             Web3Forms contact form (client component — see docs/CONTENT_GUIDE.md#contact-form)
  ui/
    SectionHeading.tsx    Shared gold section title + divider
    HexPanel.tsx           Clipped-corner card shell with hover lift + tilt (client component).
                          Accepts an optional `onClick` — when passed, renders as a
                          keyboard-accessible button (role="button", Enter/Space handling).
    FadeIn.tsx              Scroll-triggered entrance animation (Framer Motion, client component)

lib/
  data.ts              Single source of truth for portfolio content: profile info,
                        experience, education, projects, skills, social links, and
                        navLinks. Also defines the TS types (Project, SkillGroup,
                        SocialLink, ExperienceEntry, ExperienceRole, EducationEntry)
                        used across sections.

public/
  (static assets — resume PDF, favicon, etc.)
  projects/<slug>/     Project screenshots, referenced by lib/data.ts's images array
```

## Conventions

- **Content vs. markup are separated.** Section components read from `lib/data.ts`
  rather than hardcoding text, so editing content never requires touching JSX.
- **Sections are plain Tailwind components**, no component library. Shared visual
  pieces (headings, cards, animation) live in `components/ui/` — reuse those instead
  of re-styling one-off elements. See docs/DESIGN.md for the design tokens and rationale.
- **`components/ui/HexPanel.tsx`, `FadeIn.tsx`, `components/layout/Navbar.tsx`,
  `components/sections/ContactForm.tsx`, `ProjectsGrid.tsx`, and `ProjectModal.tsx`
  are Client Components** (Framer Motion, the mobile menu's/modal's `useState`, and
  the form's `fetch`/state all need the browser). Everything else stays a Server
  Component by default — don't add `"use client"` elsewhere unless a component needs
  state, effects, or a browser-only API. `Projects.tsx` itself stays a Server
  Component and just passes `projects` as props into the client `ProjectsGrid` — this
  is the pattern to follow when a section needs interactivity: keep the outer section
  (heading, data fetch) server-rendered and push the interactive part into a small
  client child, rather than making the whole section `"use client"`.
- **Single page for now.** All sections render on `/` in one scroll. Not every section
  has a nav link — `navLinks` (`lib/data.ts`) intentionally only lists About, Projects,
  Skills, and Contact; Experience and Education render between About and Projects
  without their own nav entry, since they're considered part of the "About" group
  (scroll-spy keeps About highlighted through that whole stretch as a result — see
  `components/layout/Navbar.tsx`). Don't add a nav entry for every new section by
  default; ask whether it belongs in an existing group first. If the site grows (e.g. a
  `/projects/[slug]` case-study page, a `/blog`), add new route folders under `app/` —
  see the Next.js routing docs in `node_modules/next/dist/docs/01-app/01-getting-started/`
  for current conventions for this Next.js version before adding new route types.
- **Path alias**: `@/*` resolves to the project root (`tsconfig.json`), so imports read
  as `import { projects } from "@/lib/data"`.
