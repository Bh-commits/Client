import { motion } from 'framer-motion';
import { FaCheck, FaQuoteLeft } from 'react-icons/fa';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { ButtonLink } from '../components/ui/ButtonLink';
import { FAQ } from '../components/ui/FAQ';
import { HeroSection } from '../components/ui/HeroSection';
import { CompanyIntro } from '../components/ui/CompanyIntro';
import { OurVision } from '../components/ui/OurVision';
import { OurServices } from '../components/ui/OurServices';
import { WhyChoose } from '../components/ui/WhyChoose';
import { Industries } from '../components/ui/Industries';
import { Testimonials } from '../components/ui/Testimonials';
import { TrustMarquee } from '../components/ui/TrustMarquee';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StatCard } from '../components/ui/StatCard';
import {
  featuredServices,
  highlights,
  industries,
  siteConfig,
  stats,
  testimonials
} from '../utils/content';

/* ── Floating particle dots background ── */
function ParticleBg({ count = 18 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0
              ? 'rgba(59,130,246,0.6)'
              : 'rgba(198,139,89,0.5)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <SEO title={siteConfig.title} path="/" />

      <HeroSection />
      
      <CompanyIntro />
      
      <OurVision />
      
      <OurServices />

      {/* ── Why Choose ── */}
      <WhyChoose />

      <div className="section-divider" />

      {/* ── Stats ── */}
      <section
        className="relative py-20 overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed border-b border-[rgba(198,139,89,0.12)]"
        style={{ backgroundImage: "url('/careers_bg.png')" }}
      >
        <div className="absolute inset-0 bg-[#030F1F]/85 backdrop-blur-[1px] pointer-events-none z-0" />
        <ParticleBg count={12} />
        <div className="container-page relative z-10 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>



      {/* ── Trust Marquee ── */}
      <TrustMarquee />

      {/* ── Industries ── */}
      <Industries />

      <div className="section-divider" />

      {/* ── Testimonials ── */}
      <Testimonials />

      <div className="section-divider" />

      {/* ── FAQ ── */}
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat bg-fixed border-b border-[rgba(198,139,89,0.12)]"
        style={{ backgroundImage: "url('/careers_bg.png')" }}
      >
        <div className="absolute inset-0 bg-[#081F52]/85 backdrop-blur-[1px] pointer-events-none z-0" />
        <div className="container-page relative z-10">
          <SectionHeader eyebrow="FAQ" title="Answers before we start." />
          <div className="mt-12">
            <FAQ />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CTA Banner ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #081F52 0%, #030F1F 100%)' }}
      >
        <div className="container-page">
          <AnimatedSection direction="scale">
            <motion.div
              className="relative overflow-hidden rounded-2xl px-8 py-14 sm:px-12"
              style={{
                background: 'linear-gradient(135deg, rgba(10,46,115,0.9) 0%, rgba(6,22,41,0.95) 50%, rgba(10,46,115,0.9) 100%)',
                border: '1px solid rgba(59,130,246,0.3)',
              }}
              animate={{
                borderColor: ['rgba(59,130,246,0.3)', 'rgba(198,139,89,0.4)', 'rgba(59,130,246,0.3)'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Background glow */}
              <div className="glow-orb top-0 left-1/4 h-48 w-48 opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(198,139,89,0.4) 0%, transparent 70%)' }} />
              <div className="glow-orb bottom-0 right-1/4 h-48 w-48 opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)' }} />
              <ParticleBg count={14} />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <motion.p
                    className="text-sm font-bold uppercase tracking-[0.2em] text-accent"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Free Consultation
                  </motion.p>
                  <h2
                    className="mt-3 font-heading text-4xl font-bold"
                    style={{ color: '#F0F6FF' }}
                  >
                    Book Free Business Consultation
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7" style={{ color: 'rgba(240,246,255,0.7)' }}>
                    Share your business goal and we will suggest a clear digital, AI, or marketing roadmap.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {['Website growth plan', 'AI automation ideas', 'Lead funnel audit', 'Marketing next steps'].map((item, i) => (
                      <motion.span
                        key={item}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'rgba(240,246,255,0.8)' }}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                      >
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          <FaCheck className="text-accent" />
                        </motion.span>
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="glow-pulse rounded-xl"
                >
                  <ButtonLink href="/free-consultation">Book Now</ButtonLink>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}






