# Content Guide

All personal content lives in [`lib/data.ts`](../lib/data.ts). Edit that file to update
the site — you shouldn't need to touch component JSX for routine changes.

## Add or edit a project

Open `lib/data.ts` and edit the `projects` array:

```ts
{
  title: "Project Name",
  description: "One or two sentences on what it does and your role.", // shown on the card
  longDescription: "A longer write-up for the detail modal.", // optional — falls back to description if omitted
  tags: ["Next.js", "TypeScript"],
  images: ["/projects/project-name/1.png", "/projects/project-name/2.png"], // first = card thumbnail
  liveUrl: "https://example.com",   // optional
  repoUrl: "https://github.com/you/repo", // optional
}
```

Order in the array is render order. Put your strongest / most recent work first.

Clicking a card opens a modal (`components/sections/ProjectModal.tsx`) with an image
slider through all of `images`, the full description, tags, and links. `images` can be
`[]` — the card and modal both skip the image area entirely rather than showing a
broken image. Aim for 3-5 screenshots per project: one cover shot (used as the card
thumbnail too), plus a couple more showing a key feature or a mobile view — more than
that has diminishing returns unless the project genuinely has several distinct flows
worth showing. Drop the files in `public/projects/<project-slug>/` and reference them
with the absolute path (see "Adding a resume, screenshots..." below).

## Add or edit work experience

Edit the `experience` array — grouped by company, each with one or more `roles`
(matches how LinkedIn groups multiple roles at the same company under one timeline):

```ts
{
  company: "Company Name",
  location: "City, Country · Remote/Hybrid/Onsite",
  roles: [
    {
      title: "Job Title",
      employmentType: "Full-time", // or Contract, Internship, etc.
      dateRange: "Jan 2026 - Present",
      duration: "8 mos",
      skills: ["TypeScript", "React.js"],
      description: "What you actually did — features shipped, problems solved, impact.",
    },
  ],
}
```

New entries go at the top of the array (most recent company first); within a company,
list roles most-recent-first too.

## Add or edit education

Edit the `education` array:

```ts
{
  institution: "School Name",
  degree: "Degree, Major",
  dateRange: "2022 - 2026",
  highlights: ["Notable achievement", "Another one"], // optional, [] to omit
}
```

## Add or edit a skill category

Edit the `skills` array:

```ts
{
  category: "Frontend",
  items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
}
```

## Update your bio / headline

Edit the `profile` object at the top of `lib/data.ts` (`name`, `title`, `tagline`,
`bio`, `resumeUrl`).

## Update social / contact links

Edit the `socialLinks` array (used by both the Navbar CTA and the Footer):

```ts
{ label: "GitHub", href: "https://github.com/you" }
```

## Contact form

The Contact section (`components/sections/ContactForm.tsx`) posts directly to
[Web3Forms](https://web3forms.com) from the browser — there's no backend/API route.

1. Get a free access key at [web3forms.com](https://web3forms.com) (just an email, no
   account needed).
2. Copy `.env.example` to `.env.local` and set:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-real-key
   ```
3. Restart `npm run dev` (env vars are only read at server start).

It's a `NEXT_PUBLIC_*` var on purpose — Web3Forms access keys are meant to be used
client-side; spam/domain restriction is configured on their dashboard, not by hiding
the key. Without a key set, the form still renders but shows "Form not configured yet"
on submit instead of erroring.

For production (Vercel or otherwise), set the same env var in the host's project
settings — see [DEPLOYMENT.md](DEPLOYMENT.md).

## Adding a resume, screenshots, or other static files

Drop files in `public/`. Reference them with an absolute path from the root, e.g. a
file at `public/resume.pdf` is linked as `/resume.pdf`.

## Adding a brand-new section

1. Create `components/sections/YourSection.tsx`.
2. Add any content it needs to `lib/data.ts` (with a type, if it's structured data).
3. Import and render it from `app/page.tsx` in the position you want.
4. Decide if it needs its own nav link. Not every section does — Experience and
   Education, for example, deliberately have no `navLinks` entry because they're
   considered part of the "About" group (see docs/STRUCTURE.md). If it does need one,
   add it to the `navLinks` array in `lib/data.ts`, not `components/layout/Navbar.tsx`
   (the Navbar reads from that array; it doesn't hardcode links).
