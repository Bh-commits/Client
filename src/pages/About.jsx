import { howItWorksSteps } from '../utils/content';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { PageHeader } from '../components/ui/PageHeader';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';
import { SectionHeader } from '../components/ui/SectionHeader';

export default function About() {
  return (
    <PageTransition>
      <SEO title="About Us" path="/about" description="Learn about IdeaClap India, a digital and AI solutions company." />
      <PageHeader
        eyebrow="About Us"
        title="A digital partner for businesses ready to modernize."
        description="IdeaClap India combines clean design, practical engineering, AI automation, and growth marketing into systems that win trust and generate leads."
      />
      
      {/* ── Our Belief Banner (Minimalist) ── */}
      <section className="bg-white pt-24 pb-20 border-b border-gray-200">
        <div className="container-page text-center">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c68b59] mb-6">Our Belief</p>
            <h2 className="font-serif text-4xl md:text-6xl text-ink leading-tight max-w-4xl mx-auto">
              Good technology should make business feel <span className="italic text-[#c68b59]">simpler.</span>
            </h2>
            <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              We build systems that help customers understand you quickly, contact you easily, and trust your brand
              before the first conversation starts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── How IdeaClap India Private Limited Works: Minimalist Timeline ── */}
      <section className="bg-white py-20 md:py-32 overflow-hidden">
        <div className="container-page">
          
          <AnimatedSection>
            <div className="mb-24 text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
                From Your Idea to Business Success
              </h2>
              <p className="mt-6 text-gray-500/80 text-base font-light leading-[1.85] tracking-wide">
                At IdeaClap India Private Limited, we follow a structured and transparent process to ensure every project is delivered with quality, efficiency, and measurable business impact.
              </p>
            </div>
          </AnimatedSection>

          <div className="relative mx-auto max-w-6xl">
            {/* The vertical timeline solid thin line */}
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-[rgba(198,139,89,0.15)] md:-translate-x-1/2 hidden sm:block z-0"></div>

            {howItWorksSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const stepNumber = String(index + 1).padStart(2, '0');

              return (
                <div key={step.title} className={`relative z-10 flex ${isEven ? 'flex-col' : 'flex-col-reverse'} md:flex-row items-center gap-8 md:gap-0 mb-20 md:mb-32 last:mb-0`}>
                  
                  {/* Center Node (Hollow Circle) */}
                  <div className="absolute left-[24px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden sm:flex h-3 w-3 rounded-full border-2 border-[#c68b59] bg-white z-20"></div>

                  {/* Left Column */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-24 text-center md:text-right relative">
                    {isEven ? (
                      <AnimatedSection delay={0.1} className="w-full flex justify-center md:justify-end">
                        <span className="font-serif text-[120px] md:text-[160px] leading-none text-gray-200/60 select-none">
                          {stepNumber}
                        </span>
                      </AnimatedSection>
                    ) : (
                      <AnimatedSection delay={0.2} className="w-full sm:pl-16 md:pl-0">
                        <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4">{step.title}</h3>
                        <p className="text-gray-500/80 text-sm font-light leading-[1.85] tracking-wide mb-4">{step.description}</p>
                        <p className="text-sm font-light italic leading-relaxed">
                          <span className="font-light not-italic uppercase tracking-[0.18em] text-[#c68b59] text-xs">Includes: </span>
                          <span className="text-gray-400">{step.items.join(', ')}</span>
                        </p>
                      </AnimatedSection>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-24 text-center md:text-left relative">
                    {!isEven ? (
                      <AnimatedSection delay={0.1} className="w-full flex justify-center md:justify-start">
                        <span className="font-serif text-[120px] md:text-[160px] leading-none text-gray-200/60 select-none">
                          {stepNumber}
                        </span>
                      </AnimatedSection>
                    ) : (
                      <AnimatedSection delay={0.2} className="w-full sm:pl-16 md:pl-0">
                        <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4">{step.title}</h3>
                        <p className="text-gray-500/80 text-sm font-light leading-[1.85] tracking-wide mb-4">{step.description}</p>
                        <p className="text-sm font-light italic leading-relaxed">
                          <span className="font-light not-italic uppercase tracking-[0.18em] text-[#c68b59] text-xs">Includes: </span>
                          <span className="text-gray-400">{step.items.join(', ')}</span>
                        </p>
                      </AnimatedSection>
                    )}
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 border-t border-[rgba(198,139,89,0.15)]">
        <div className="container-page text-center">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c68b59] mb-6">What We Optimize</p>
            <h2 className="font-serif text-3xl md:text-5xl text-ink leading-tight max-w-4xl mx-auto">
              Clarity, speed, conversion, automation, and long-term maintainability.
            </h2>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}







