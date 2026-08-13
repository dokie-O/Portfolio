import { education } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-16">
      <FadeIn>
        <SectionHeading>Education</SectionHeading>
      </FadeIn>
      <div className="flex flex-col gap-8">
        {education.map((entry, index) => (
          <FadeIn key={entry.institution} delay={index * 0.08}>
            <div>
              <h3 className="font-display text-lg font-semibold tracking-wide text-gold-bright">
                {entry.institution}
              </h3>
              <div className="mt-4">
                <h4 className="text-base font-semibold text-foreground">
                  {entry.degree}
                </h4>
                <p className="text-xs tracking-wide text-foreground-muted uppercase">
                  {entry.dateRange}
                </p>
                {entry.highlights.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-1.5 text-base text-foreground-muted">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 border border-gold bg-gold/20" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
