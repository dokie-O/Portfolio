"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks, profile } from "@/lib/data";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Ratio/band-based IntersectionObserver logic can't reliably handle the
    // last section: if there isn't enough page content below it (just the
    // footer here), it can never scroll far enough to dominate any
    // mid-or-top viewport band. A plain scroll-position check is simpler and
    // handles that case explicitly instead of fighting the geometry.
    const TRIGGER_OFFSET = 96; // px below viewport top, clear of the sticky nav

    function updateActive() {
      const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (scrolledToBottom) {
        setActive(navLinks[navLinks.length - 1].href);
        return;
      }
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= TRIGGER_OFFSET) {
          current = section;
        }
      }
      setActive(`#${current.id}`);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    }

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gold-dark/50 bg-background/90 backdrop-blur">
      <div className="h-px bg-linear-to-r from-transparent via-gold to-transparent" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="#"
          className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-[0.2em] text-gold-bright uppercase"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-6 w-6 text-gold" />
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-8 text-xs tracking-[0.2em] uppercase sm:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href} className="relative py-1">
                <a
                  href={link.href}
                  className={`transition-colors ${
                    isActive
                      ? "text-gold"
                      : "text-foreground-muted hover:text-gold"
                  }`}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1.5 border border-gold-dark/60 sm:hidden"
        >
          <span
            className={`h-px w-4 bg-gold transition-transform ${open ? "translate-y-0.75 rotate-45" : ""}`}
          />
          <span
            className={`h-px w-4 bg-gold transition-transform ${open ? "-translate-y-0.75 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col border-t border-gold-dark/50 bg-background px-6 py-4 text-xs tracking-[0.2em] uppercase sm:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-3 transition-colors ${
                  active === link.href
                    ? "text-gold"
                    : "text-foreground-muted hover:text-gold"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
