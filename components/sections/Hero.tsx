import { profile } from "@/lib/data";
import FadeIn from "@/components/ui/FadeIn";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-6 py-24">
      <FadeIn className="flex flex-col gap-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          {profile.title}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-wide text-gold-bright sm:text-5xl">
          {profile.name}
        </h1>
        <p className="max-w-xl text-lg text-foreground-muted">
          {profile.tagline}
        </p>
        <div className="mt-4 flex gap-4">
          <a
            href="#projects"
            className="hex-panel-sm border border-gold bg-gold px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-background uppercase transition-colors hover:bg-gold-bright"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="hex-panel-sm border border-gold-dark px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase transition-colors hover:border-gold hover:text-gold-bright"
          >
            Get in touch
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
