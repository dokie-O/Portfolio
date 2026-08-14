import { socialLinks } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import HexPanel from "@/components/ui/HexPanel";
import FadeIn from "@/components/ui/FadeIn";
import ContactForm from "@/components/sections/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <FadeIn>
        <SectionHeading>Contact</SectionHeading>
        <p className="max-w-xl text-lg text-foreground-muted">
          Have a project in mind or just want to say hi? Send a message, or
          reach out directly.
        </p>
      </FadeIn>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
        <FadeIn delay={0.08} className="flex-1">
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.16} className="w-full lg:max-w-xs">
          <HexPanel className="flex flex-col gap-4 p-6">
            <h3 className="font-display text-lg font-semibold text-gold-bright">
              Elsewhere
            </h3>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-xs font-semibold tracking-[0.2em] text-gold uppercase transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </HexPanel>
        </FadeIn>
      </div>
    </section>
  );
}
