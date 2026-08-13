"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/data";
import HexPanel from "@/components/ui/HexPanel";
import FadeIn from "@/components/ui/FadeIn";
import ProjectModal from "@/components/sections/ProjectModal";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <FadeIn key={project.title} delay={index * 0.08}>
            <HexPanel
              onClick={() => setSelected(project)}
              className="group flex h-full flex-col gap-3 p-6"
            >
              {project.images[0] && (
                <div className="relative isolate -mx-6 -mt-6 mb-1 aspect-video overflow-hidden border-b border-gold-dark/40 bg-background">
                  <Image
                    src={project.images[0]}
                    alt=""
                    fill
                    className="object-cover grayscale-55 brightness-90 contrast-105 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                  {/* Screenshots come from other sites with their own palettes —
                      this tint keeps the grid visually cohesive with the theme
                      regardless of source colors. Fades out on hover to reveal
                      the real screenshot; the modal always shows true color. */}
                  <div className="pointer-events-none absolute inset-0 bg-gold-dark/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background-elevated from-0% via-transparent via-25% to-transparent to-100%" />
                </div>
              )}
              <h3 className="font-display text-base font-semibold tracking-wide text-gold-bright">
                {project.title}
              </h3>
              <p className="text-base text-foreground-muted">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-gold-dark/60 px-2.5 py-1 text-xs tracking-wide text-gold uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex gap-4 pt-2 text-xs font-semibold tracking-wide uppercase">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="text-gold transition-colors hover:text-gold-bright"
                  >
                    Live
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="text-gold transition-colors hover:text-gold-bright"
                  >
                    Code
                  </a>
                )}
              </div>
            </HexPanel>
          </FadeIn>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
