import { profile, socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-gold-dark/50">
      <div className="h-px bg-linear-to-r from-transparent via-gold to-transparent" />
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-8 text-xs tracking-wide text-foreground-muted uppercase sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex gap-6">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-gold"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
