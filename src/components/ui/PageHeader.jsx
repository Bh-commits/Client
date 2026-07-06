import { ButtonLink } from './ButtonLink';

export function PageHeader({ eyebrow, title, description, primaryCta = 'Book Free Consultation', theme = 'light' }) {
  const isDark = theme === 'dark';
  return (
    <section className={`${isDark ? 'bg-transparent pt-0' : 'bg-white border-b border-[rgba(198,139,89,0.12)] pt-28'}`}>
      <div className={`container-page grid gap-10 ${isDark ? 'py-0' : 'py-16'} lg:grid-cols-[1.1fr_0.9fr] lg:items-end`}>
        <div>
          {eyebrow ? (
            <p className={`mb-4 text-xs font-medium uppercase tracking-[0.25em] font-ui ${isDark ? 'text-accent' : 'text-[#c68b59]'}`}>{eyebrow}</p>
          ) : null}
          <h1 className={`max-w-4xl font-serif text-4xl leading-tight ${isDark ? 'text-white' : 'text-navy'} sm:text-5xl md:text-6xl`}>
            {title}
          </h1>
          <p className={`mt-6 max-w-2xl text-base font-light leading-[1.85] tracking-wide font-ui ${isDark ? 'text-slate-300/70' : 'text-navy/60'}`}>{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ButtonLink href="/free-consultation">{primaryCta}</ButtonLink>
          <ButtonLink
            href="/contact"
            variant={isDark ? 'outline' : 'outline-light'}
          >
            Talk to Sales
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}









