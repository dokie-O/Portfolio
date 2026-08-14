"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 480;

export default function ScrollToTop() {
  const [pastThreshold, setPastThreshold] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const visible = pastThreshold && !footerVisible;

  useEffect(() => {
    function onScroll() {
      setPastThreshold(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -1px 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  function handleClick() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`hex-panel-sm fixed right-6 bottom-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center border border-gold-dark/60 bg-background-elevated/90 text-lg text-gold backdrop-blur transition-all duration-300 hover:border-gold hover:text-gold-bright ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      ↑
    </button>
  );
}
