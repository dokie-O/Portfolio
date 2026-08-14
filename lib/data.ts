export type Project = {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ExperienceRole = {
  title: string;
  employmentType: string;
  dateRange: string;
  duration: string;
  skills: string[];
  description: string;
};

export type ExperienceEntry = {
  company: string;
  location: string;
  roles: ExperienceRole[];
};

export type EducationEntry = {
  institution: string;
  degree: string;
  dateRange: string;
  highlights: string[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export const profile = {
  name: "Alfie Mamangun",
  title: "Frontend Developer",
  tagline: "I build fast, accessible web apps end to end.",
  bio: "I am a Frontend Developer who prioritize responsiveness, scalable interfaces, reusable component, and seamless user experience.",
  resumeUrl: "/resume.pdf",
};

export const experience: ExperienceEntry[] = [
  {
    company: "SATEZO OPC",
    location: "Mabalacat, Central Luzon, Philippines · Hybrid",
    roles: [
      {
        title: "Frontend Developer",
        employmentType: "Contract",
        dateRange: "Apr 2026 - Present",
        duration: "5 mos",
        skills: ["TypeScript", "React.js", "Next.js", "Tailwind CSS"],
        description:
          "Building and maintaining responsive, accessible interfaces with React, Next.js, and TypeScript, turning designs into reusable components and shipping features end to end alongside the team.",
      },
      {
        title: "Web Developer",
        employmentType: "Internship",
        dateRange: "Mar 2026 - May 2026",
        duration: "3 mos",
        skills: ["React.js", "Tailwind CSS", "Next.js", "JavaScript"],
        description:
          "Contributed to web interfaces using React, Next.js, and Tailwind CSS, learning production development workflows and helping ship real features under the team's guidance.",
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    institution: "PAMPANGA STATE UNIVERSITY",
    degree: "Bachelor of Science in Information Technology",
    dateRange: "2022 - 2026",
    highlights: [
      "Ranked among the Top 25 students for two semesters",
      "Consistently recognized as a President's and Dean's Lister",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Satezo",
    description:
      "Frontend work on Satezo's public marketing site, an AI-powered systems and digital solutions agency.",
    longDescription:
      "Satezo's public marketing site, covering the AI agents/automation pitch, an About page, and a filterable project portfolio (Web Development, Apps, Software, SaaS, AI Agents, Marketing, IoT). Built with Next.js, TypeScript, and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    images: [
      "/projects/satezo/1-home.png",
      "/projects/satezo/2-about.png",
      "/projects/satezo/3-portfolio.png",
    ],
    liveUrl: "https://www.satezo.com/",
    repoUrl: undefined,
  },
  {
    title: "BJMP Reporting System",
    description:
      "Centralized reporting platform for BJMP Region III, real-time submission, monitoring, and consolidation of jail population and situational data, replacing manual reporting.",
    longDescription:
      "A secure, centralized web platform built for the Bureau of Jail Management and Penology Regional Office III (BJMPRO-III), enabling real-time submission, monitoring, and consolidation of jail population data, facility reports, and situational updates across the region. Includes automated data validation, facility/regional dashboards, role-based access control, and historical analytics. Developed in partnership with Pampanga State University's College of Computing Studies and Satezo Philippines.",
    tags: ["React.js", "Express.js", "Tailwind CSS"],
    images: [
      "/projects/bjmp_reporting/1.png",
      "/projects/bjmp_reporting/2.png",
      "/projects/bjmp_reporting/3.png",
    ],
    liveUrl: undefined,
    repoUrl: undefined,
  },
  {
    title: "Signor",
    description:
      "Capstone project, frontend work on Signor, a document management system for Pampanga State University with blockchain-backed e-signatures and an AI assistant.",
    longDescription:
      "A capstone project built with a team: a document management platform for Pampanga State University, letting students, faculty, and staff create, route, and sign academic documents (excuse letters, request letters, authorization forms, and more) from template. E-signatures run through the Twala API with tamper-proof, blockchain-backed verification, and an AI assistant helps guide document creation. Includes a dedicated PL/DL Requests flow for students to apply for President's Lister and Dean's Lister recognition, with GWA tracking and status review. Handled the frontend, built with React, Hono, Drizzle ORM, and Neon.",
    tags: ["React.js", "Tailwind CSS", "Hono", "Drizzle ORM", "Twala API"],
    images: [
      "/projects/signor/1.png",
      "/projects/signor/2.png",
      "/projects/signor/3.png",
    ],
    liveUrl: undefined,
    repoUrl: undefined,
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "SQL"],
  },
  { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "HTML", "CSS", ] },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Hono", "Drizzle ORM"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Figma", "Canva", "Postman"],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/dokie-O" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alfie-mamangun-094427360/",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
