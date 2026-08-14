import { projects } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-16">
      <FadeIn>
        <SectionHeading>Projects</SectionHeading>
      </FadeIn>
      <ProjectsGrid projects={projects} />
    </section>
  );
}
