import { skills } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import HexPanel from "@/components/ui/HexPanel";
import FadeIn from "@/components/ui/FadeIn";
import { skillIcons } from "@/components/sections/skillIcons";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-16">
      <FadeIn>
        <SectionHeading>Skills</SectionHeading>
      </FadeIn>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, index) => (
          <FadeIn key={group.category} delay={index * 0.08}>
            <HexPanel className="h-full p-6">
              <h3 className="font-display text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-foreground-muted">
                {group.items.map((item) => {
                  const Icon = skillIcons[item];
                  return (
                    <li key={item} className="flex items-center gap-2.5">
                      {Icon ? (
                        <Icon className="h-4 w-4 shrink-0 text-gold" />
                      ) : (
                        <span className="h-1.5 w-1.5 shrink-0 rotate-45 border border-gold bg-gold/20" />
                      )}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </HexPanel>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
