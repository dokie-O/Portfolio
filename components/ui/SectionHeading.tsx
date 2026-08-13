export default function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <h2 className="whitespace-nowrap font-display text-xs font-semibold tracking-[0.2em] text-gold uppercase">
        {children}
      </h2>
      <span className="h-px flex-1 bg-linear-to-r from-gold-dark to-transparent" />
      <span className="h-2 w-2 rotate-45 border border-gold-dark bg-background" />
    </div>
  );
}
