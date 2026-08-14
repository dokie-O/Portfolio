import { experience } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-16">
      <FadeIn>
        <SectionHeading>Experience</SectionHeading>
      </FadeIn>
      <div className="flex flex-col gap-10">
        {experience.map((entry, entryIndex) => (
          <FadeIn key={entry.company} delay={entryIndex * 0.08}>
            <div>
              <h3 className="font-display text-lg font-semibold tracking-wide text-gold-bright">
                {entry.company}
              </h3>
              <p className="mt-1 text-xs tracking-wide text-foreground-muted uppercase">
                {entry.location}
              </p>

              <ol className="mt-6 flex flex-col gap-8 border-l border-gold-dark/50 pl-6">
                {entry.roles.map((role) => (
                  <li key={role.title} className="relative">
                    <span className="absolute top-1.5 -left-7 h-2 w-2 rotate-45 border border-gold bg-background" />
                    <h4 className="text-base font-semibold text-foreground">
                      {role.title}
                    </h4>
                    <p className="text-xs tracking-wide text-foreground-muted uppercase">
                      {role.employmentType} · {role.dateRange} · {role.duration}
                    </p>
                    <p className="mt-2 text-base text-foreground-muted">
                      {role.description}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <li
                          key={skill}
                          className="border border-gold-dark/60 px-2.5 py-1 text-xs tracking-wide text-gold uppercase"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
