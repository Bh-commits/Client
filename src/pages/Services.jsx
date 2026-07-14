import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ButtonLink } from '../components/ui/ButtonLink';
import { PageHeader } from '../components/ui/PageHeader';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';
import { SectionHeader } from '../components/ui/SectionHeader';
import { comprehensiveServices } from '../utils/content';

function StackedCard({ group, index, total }) {
  const Icon = group.icon;
  const containerRef = useRef(null);
  
  // Track the scroll progress of this specific card's container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when the top of the container hits the top of the viewport
    // End tracking when the bottom of the container hits the top of the viewport
    offset: ["start start", "end start"]
  });

  // As we scroll past the sticky point, scale the card down and fade it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div 
      ref={containerRef}
      className="sticky w-full max-w-5xl mx-auto"
      style={{
        // All cards stick at the exact same top position so they fully cover each other
        // instead of forming a layered deck of lips.
        top: '120px',
        // We use zIndex so later cards overlap earlier ones
        zIndex: index + 10,
        // Huge bottom margin ensures you have to scroll to bring the next card up.
        // The last card gets 0 margin, so the parent's spacer div takes over, preventing a massive blank gap.
        marginBottom: index === total - 1 ? '0' : '50vh'
      }}
    >
      <motion.div 
        style={{ scale, opacity }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="w-full h-[650px] md:h-[480px] rounded-[2rem] bg-[#0B1E3D]/95 backdrop-blur-xl border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden origin-top flex flex-col"
      >
        {/* Subtle top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
        
        <div className="flex flex-col md:flex-row p-6 md:p-12 gap-8 md:gap-10 h-full">
          
          {/* Left/Right Text Section */}
          <div className="w-full md:w-[45%] flex flex-col justify-center">
            <span className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-2xl md:text-3xl text-white shadow-lg shadow-blue-500/20 mb-6 shrink-0">
              <Icon />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-4 leading-tight">
              {group.title}
            </h2>
            <p className="text-slate-300/75 text-sm md:text-base font-light leading-[1.85] tracking-wide">
              {group.description}
            </p>
          </div>

          {/* Sub-services Grid */}
          <div className="w-full md:w-[55%] h-full min-h-0">
            <div className="h-full rounded-2xl bg-[#06101D] border border-white/5 p-6 flex flex-col">
              <h3 className="text-xs font-light uppercase tracking-[0.22em] text-[#c68b59] mb-4 shrink-0">
                Included Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pb-2">
                  {group.items.map((item, i) => (
                    <motion.div 
                      key={item} 
                      className="flex items-start gap-3 group"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <span className="mt-1 flex-shrink-0 text-[#c68b59]/70 transition-colors group-hover:text-[#c68b59]">
                        <FaCheck size={12} />
                      </span>
                      <span className="text-sm font-light tracking-wide text-slate-300/70 transition-colors group-hover:text-slate-100 leading-snug">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  return (
    <PageTransition>
      <SEO
        title="Services"
        path="/services"
        description="Website development, AI solutions, digital marketing, custom software, and mobile app development services by IdeaClap India."
      />
      
      {/* ── Page Header ── */}
      <PageHeader
        eyebrow="Comprehensive Services"
        title="Everything your business needs to scale."
        description="From robust enterprise software to AI-driven automation, explore our full spectrum of digital solutions designed for modern growth."
      />

      {/* ── Sticky Stacked Cards Section ── */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat bg-fixed pt-12 pb-48 px-4 sm:px-6 border-b border-[rgba(198,139,89,0.12)]"
        style={{ backgroundImage: "url('/careers_bg.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0B1120]/90 pointer-events-none z-0" />
        
        {/* Subtle background glows for the cards section, wrapped to prevent horizontal scroll */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute right-0 bottom-1/4 h-96 w-96 translate-x-1/3 rounded-full bg-accent/5 blur-[120px]" />
        </div>

        <div className="relative">
          {comprehensiveServices.map((group, index) => (
            <StackedCard 
              key={group.title} 
              group={group} 
              index={index} 
              total={comprehensiveServices.length} 
            />
          ))}
          {/* Spacer to allow the very last card to stick for a while before the next section arrives */}
          <div className="h-[50vh] pointer-events-none" />
        </div>
      </section>

      {/* ── Delivery / CTA Section ── */}
      {/* Added z-50 here so this section slides OVER the last sticky card, completing the stack effect */}
      <section 
        className="relative z-50 py-24 overflow-hidden border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/careers_bg.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#050816]/95 pointer-events-none z-0" />
        <div className="absolute inset-0 z-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)', backgroundSize: '28px 28px' }} />
        <div className="container-page relative z-10 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
              Every service includes <span className="italic text-[#c68b59]">strategy, execution,</span><br className="hidden md:block" /> analytics, and support.
            </h2>
            <p className="text-slate-300/70 text-base font-light leading-[1.85] tracking-wide mb-10">
              We plan the journey, build the experience, connect the data, and keep improving after launch.
            </p>
            <div className="flex justify-center">
              <ButtonLink href="/free-consultation" className="px-8 py-4 text-lg">
                Get Service Recommendation
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}






