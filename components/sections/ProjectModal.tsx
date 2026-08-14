"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/data";

function SlideImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        sizes="(min-width: 672px) 672px, 100vw"
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-dark/40 border-t-gold" />
        </div>
      )}
    </>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasImages = project.images.length > 0;
  const imageCount = project.images.length;

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && imageCount > 1) {
        setIndex((i) => (i + 1) % imageCount);
      }
      if (event.key === "ArrowLeft" && imageCount > 1) {
        setIndex((i) => (i - 1 + imageCount) % imageCount);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, imageCount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="hex-panel max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-gold-dark/60 bg-background-elevated"
      >
        {hasImages && (
          <div className="relative aspect-video border-b border-gold-dark/40 bg-background">
            <SlideImage
              key={index}
              src={project.images[index]}
              alt={`${project.title} screenshot ${index + 1} of ${imageCount}`}
              priority={index === 0}
            />
            {/* Soft vignette so the screenshot's edges blend into the dark
                frame regardless of how bright the source image is — the
                image itself stays true color here, unlike the card thumbnail. */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--background)_120%)] opacity-60" />
            {imageCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setIndex((i) => (i - 1 + imageCount) % imageCount)
                  }
                  aria-label="Previous image"
                  className="absolute top-1/2 left-3 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center border border-gold-dark/60 bg-background/70 text-gold transition-colors hover:border-gold hover:text-gold-bright"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % imageCount)}
                  aria-label="Next image"
                  className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center border border-gold-dark/60 bg-background/70 text-gold transition-colors hover:border-gold hover:text-gold-bright"
                >
                  ›
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Show image ${i + 1}`}
                      className={`h-2 w-2 shrink-0 rotate-45 cursor-pointer border border-gold transition-colors ${
                        i === index ? "bg-gold" : "bg-background/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-semibold tracking-wide text-gold-bright">
              {project.title}
            </h3>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center border border-gold-dark/60 text-gold transition-colors hover:border-gold hover:text-gold-bright"
            >
              ✕
            </button>
          </div>

          <p className="text-base text-foreground-muted">
            {project.longDescription ?? project.description}
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

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-2 flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hex-panel-sm border border-accent bg-accent px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-80"
                >
                  Live site
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hex-panel-sm border border-gold-dark px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase transition-colors hover:border-gold hover:text-gold-bright"
                >
                  View code
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
