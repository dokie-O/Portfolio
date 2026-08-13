# Alfie Mamangun — Portfolio

**Live: [mamangunalfie.vercel.app](https://mamangunalfie.vercel.app/)**

Personal portfolio site built with Next.js (App Router), React, TypeScript, Tailwind CSS,
and Framer Motion. Visual style is a dark "hextech" theme (gold trim, angular clipped
panels) inspired by League of Legends' client UI — see [docs/DESIGN.md](docs/DESIGN.md).

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in your Web3Forms access key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally. The page hot-reloads as you edit files.

The contact form won't submit without a Web3Forms key in `.env.local` — see
[docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md#contact-form) for setup.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the local dev server   |
| `npm run build` | Build for production         |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Lint the project with ESLint |

## Project Structure

```
app/                  Routes, layout, and global styles (Next.js App Router)
components/           UI building blocks
  layout/             Navbar, Footer
  sections/           Hero, About, Projects, Skills, Contact, ContactForm
  ui/                 Shared primitives (SectionHeading, HexPanel, FadeIn)
lib/                  Portfolio content (projects, skills, links) and shared types
public/               Static assets (images, resume, favicon)
docs/                 Project documentation
```

See [docs/STRUCTURE.md](docs/STRUCTURE.md) for more detail.

## Editing Content

Almost all personal content — projects, skills, bio, and social links — lives in
[`lib/data.ts`](lib/data.ts). You generally don't need to touch component files to update
what's on the page. See [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md).

## Deployment

This project deploys cleanly to [Vercel](https://vercel.com/new). See
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for steps and other hosting options.

## Docs

- [docs/STRUCTURE.md](docs/STRUCTURE.md) — how the project is organized
- [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) — how to add/edit projects, skills, and bio
- [docs/DESIGN.md](docs/DESIGN.md) — the hextech design language: tokens, fonts, shapes
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — how to ship it
