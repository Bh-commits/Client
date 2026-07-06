import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  FaUtensils, FaStethoscope, FaHotel, FaDumbbell, 
  FaBuilding, FaShoppingCart, FaGraduationCap, FaIndustry,
  FaCheckCircle
} from 'react-icons/fa';
import { SEO } from '../components/ui/SEO';
import { PageHeader } from '../components/ui/PageHeader';
import { PageTransition } from '../components/ui/PageTransition';
import { SectionHeader } from '../components/ui/SectionHeader';

export default function Industries() {
  const timelineRef = useRef(null);
  
  // Track scroll position to draw timeline progress line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const industryCards = [
    { title: "Restaurants", desc: "Websites • Online Ordering • AI Chatbots", icon: FaUtensils },
    { title: "Clinics", desc: "Appointments • Patient Communication • Automation", icon: FaStethoscope },
    { title: "Hotels", desc: "Bookings • Guest Experience • Digital Presence", icon: FaHotel },
    { title: "Gyms", desc: "Membership Management • Lead Generation", icon: FaDumbbell },
    { title: "Real Estate", desc: "Property Websites • CRM • Lead Automation", icon: FaBuilding },
    { title: "Retail Stores", desc: "E-Commerce • Inventory • Marketing", icon: FaShoppingCart },
    { title: "Coaching Institutes", desc: "Admissions • Student Portal • Online Learning", icon: FaGraduationCap },
    { title: "Manufacturing", desc: "Business Automation • ERP • Dashboards", icon: FaIndustry }
  ];

  const approachSteps = [
    { title: "Understand", desc: "We learn how your business operates." },
    { title: "Customize", desc: "We design solutions specifically for your industry." },
    { title: "Grow", desc: "We continuously optimize for better results." }
  ];

  // Animation variants for one-by-one sequential scroll reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Industries We Serve"
        path="/industries"
        description="Explore custom digital solutions for restaurants, clinics, hotels, gyms, real estate, retail, coaching institutes, and manufacturing."
      />

      {/* ── 1. HERO SECTION ── */}
      <PageHeader
        eyebrow="INDUSTRIES"
        title="Technology That Understands Your Industry."
        description="Every business is unique. We create industry-focused digital solutions that solve real challenges and help businesses grow with confidence."
        primaryCta="Explore Your Industry"
      />

      {/* ── 2. INDUSTRIES WE WORK WITH ── */}
      <section className="bg-white py-24 md:py-32 border-b border-[rgba(198,139,89,0.12)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Industry Domain"
            title="Industries We Work With."
            description="Instead of generic one-size-fits-all platforms, we adapt our software, websites, and AI assistants to matching workflows."
            theme="light"
            className="mb-16"
          />

          {/* Cards Grid with sequential scroll animation */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {industryCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-[#c68b59]/15 p-6 shadow-sm hover:shadow-lift hover:border-[#c68b59] transition-all duration-300"
                >
                  {/* Left Side Accent Ring */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c68b59] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Rotating Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c68b59]/10 text-xl text-[#c68b59] group-hover:rotate-12 transition-transform duration-300 mb-6">
                    <Icon />
                  </div>
                  
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">{card.title}</h3>
                  <p className="text-sm font-light font-ui leading-relaxed text-navy/60">{card.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 3. WHY INDUSTRY-FOCUSED SOLUTIONS ── */}
      <section className="bg-white py-24 border-b border-[rgba(198,139,89,0.12)]">
        <div className="container-page max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">
              Value Focus
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-navy leading-tight font-bold mb-6">
              Why Industry-Focused <span className="italic text-[#c68b59]">Solutions?</span>
            </h2>
            <p className="text-xl md:text-2xl font-serif font-light leading-relaxed text-navy/85 max-w-2xl mx-auto mb-6">
              Every industry has different customers, workflows, and goals.
            </p>
            <p className="text-base font-light font-ui leading-[1.85] tracking-wide text-navy/60 max-w-xl mx-auto">
              That's why we don't deliver one-size-fits-all solutions—we understand your business first and then build technology around it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4. OUR APPROACH TIMELINE ── */}
      <section className="bg-white py-24 md:py-32 overflow-hidden border-b border-[rgba(198,139,89,0.12)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Methodology"
            title="Our Approach."
            description="A structured workflow to guarantee aligned designs and measurable growth."
            theme="light"
            className="mb-20"
          />

          <div ref={timelineRef} className="relative max-w-4xl mx-auto pl-8 sm:pl-0">
            {/* Scroll-linked Timeline Line */}
            <div className="absolute left-[8px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-navy/5 sm:-translate-x-1/2">
              <motion.div 
                className="w-full bg-[#c68b59]" 
                style={{ height: "100%", scaleY, originY: 0 }}
              />
            </div>

            {approachSteps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={idx} className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center mb-24 last:mb-0">
                  {/* Central Node Indicator */}
                  <div className="absolute left-[8px] sm:left-1/2 top-1.5 sm:top-1/2 -translate-y-1/2 sm:-translate-x-1/2 h-5.5 w-5.5 rounded-full border-2 border-[#c68b59] bg-white z-20" />

                  {/* Left Side Content (Desktop: even steps slide from left) */}
                  <div className="w-full sm:w-1/2 sm:pr-12 text-left sm:text-right hidden sm:block">
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      >
                        <h3 className="font-serif text-2xl font-semibold text-navy mb-2">{step.title}</h3>
                        <p className="text-sm font-light font-ui text-navy/60 leading-[1.8] max-w-sm sm:ml-auto">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side Content (Desktop: odd steps slide from right) */}
                  <div className="w-full sm:w-1/2 sm:pl-12 text-left hidden sm:block">
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      >
                        <h3 className="font-serif text-2xl font-semibold text-navy mb-2">{step.title}</h3>
                        <p className="text-sm font-light font-ui text-navy/60 leading-[1.8] max-w-sm">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile Content (all steps on right side, sliding from right) */}
                  <div className="w-full pl-8 text-left block sm:hidden">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                      <h3 className="font-serif text-xl font-semibold text-navy mb-1.5">{step.title}</h3>
                      <p className="text-sm font-light font-ui text-navy/60 leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. FINAL CTA SECTION ── */}
      <section className="relative bg-[#081F52] py-24 md:py-32 border-t border-white/5 text-center overflow-hidden">


        <div className="container-page relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#c68b59] mb-6">
            Custom Build
          </span>
          
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight mb-6">
            Let's Build Something <br />
            <span className="italic text-[#c68b59]">That Fits Your Business.</span>
          </h2>
          
          <p className="text-muted/70 text-base font-light font-ui leading-[1.85] tracking-wide mb-10 max-w-xl mx-auto">
            Whether you're a startup, local business, or growing enterprise, IdeaClap India Private Limited builds technology designed around your industry—not the other way around.
          </p>

          <div className="flex justify-center">
            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ y: -1, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <a
                href="/free-consultation"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold bg-white text-[#081F52] shadow-soft hover:shadow-[0_12px_32px_rgba(255,255,255,0.25)] transition-all duration-300"
              >
                Book Free Consultation
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
