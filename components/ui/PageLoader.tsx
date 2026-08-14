"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HexCrystalScene = dynamic(
  () => import("@/components/ui/HexCrystalScene"),
  { ssr: false },
);

// Safety net in case the WebGL scene never fires onComplete (context lost,
// slow device, etc.) — the loader must never permanently block the page.
const MAX_LOADER_MS = 3200;
const FADE_MS = 500;

export default function PageLoader() {
  const [ready, setReady] = useState(false);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const completedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setFading(true);
    window.setTimeout(() => setHidden(true), FADE_MS);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setHidden(true);
      } else {
        setReady(true);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const fallback = window.setTimeout(handleComplete, MAX_LOADER_MS);
    return () => window.clearTimeout(fallback);
  }, [ready, handleComplete]);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-500 motion-reduce:hidden ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="h-40 w-40 sm:h-56 sm:w-56">
        {ready && <HexCrystalScene onComplete={handleComplete} />}
      </div>
    </div>
  );
}
