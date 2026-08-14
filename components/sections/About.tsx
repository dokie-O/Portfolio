import { profile } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-16">
      <FadeIn>
        <SectionHeading>About</SectionHeading>
        <p className="max-w-2xl text-base leading-relaxed text-foreground-muted">
          {profile.bio}
        </p>
      </FadeIn>
    </section>
  );
}
