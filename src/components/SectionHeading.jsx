export default function SectionHeading({
  label,
  title,
  accent,
  description,
  dark = false,
  align = 'left',
  compact = false,
}) {
  const centered = align === 'center';

  return (
    <header className={`max-w-[760px] font-content ${dark ? 'text-slate-50' : 'text-ink'} ${centered ? 'mx-auto mb-12 px-6 text-center' : ''}`}>
      <p className={`mb-5 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] sm:mb-6 sm:text-[11px] ${centered ? 'justify-center' : ''}`}>
        <span aria-hidden="true" className="size-[7px] shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_#3979ed12]" />
        {label}
      </p>
      <h2 className={`font-medium leading-[1.13] tracking-[-0.045em] ${compact ? 'text-[clamp(32px,3.1vw,44px)]' : 'text-4xl sm:text-[clamp(34px,4.1vw,60px)]'}`}>
        {title}
        {accent && <><br /><span className="text-accent">{accent}</span></>}
      </h2>
      {description && (
        <p className={`mt-5 max-w-[520px] text-[15px] leading-[1.75] tracking-[-0.015em] sm:mt-6 ${compact ? '' : 'sm:text-base'} ${dark ? 'text-slate-400' : 'text-ink-muted'} ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </header>
  );
}
