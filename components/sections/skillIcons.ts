import type { IconType } from "react-icons";
import {
  SiCss,
  SiDrizzle,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHono,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaDatabase, FaPaintbrush } from "react-icons/fa6";

// Keyed by the exact skill label used in lib/data.ts's `skills` array. Not
// every tool has an official brand icon available (Canva, generic "SQL")
// — those fall back to a generic icon rather than a missing brand mark.
export const skillIcons: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  SQL: FaDatabase,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  Hono: SiHono,
  "Drizzle ORM": SiDrizzle,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
  Canva: FaPaintbrush,
  Postman: SiPostman,
};
