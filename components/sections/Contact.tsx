import { socialLinks } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
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

        <ContactForm />

        <ul className="mt-8 flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="hex-panel-sm border border-gold-dark px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase transition-colors hover:border-gold hover:text-gold-bright"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
