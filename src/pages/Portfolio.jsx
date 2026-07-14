import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaLaptopCode, FaRobot, FaBolt, FaMobileAlt, FaBullhorn, 
  FaRegLightbulb, FaNodeJs, FaReact, FaAws
} from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';
import { PageHeader } from '../components/ui/PageHeader';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';

export default function Portfolio() {
  const projectsScrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: projectsScrollRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projectTrackX = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "-62%"]);

  const projects = [
    {
      number: "01",
      title: "Business Website",
      category: "Websites & Apps",
      desc: "Modern, responsive websites designed to build trust and generate leads for your business.",
      icon: FaLaptopCode,
      metric: "+180% Enquiries",
    },
    {
      number: "02",
      title: "AI Chatbot",
      category: "AI & Automation",
      desc: "Intelligent customer support assistant that works 24/7, answering queries and capturing leads automatically.",
      icon: FaRobot,
      metric: "98% Auto-Handled",
    },
    {
      number: "03",
      title: "Business Automation",
      category: "AI & Automation",
      desc: "Automating daily operations like follow-ups, reminders, invoices, and reports for better team productivity.",
      icon: FaBolt,
      metric: "35+ Hours Saved/Wk",
    },
    {
      number: "04",
      title: "Mobile Application",
      category: "Websites & Apps",
      desc: "Scalable, performant mobile apps built for modern businesses across Android and iOS platforms.",
      icon: FaMobileAlt,
      metric: "4.9 App Rating",
    },
    {
      number: "05",
      title: "Digital Marketing",
      category: "Marketing",
      desc: "ROI-driven campaigns that increase online visibility, attract quality leads, and drive revenue growth.",
      icon: FaBullhorn,
      metric: "3.8x ROI Boost",
    },
    {
      number: "06",
      title: "Custom Software",
      category: "Websites & Apps",
      desc: "Tailor-made software solutions designed entirely around your business workflows and goals.",
      icon: FaRegLightbulb,
      metric: "100% Custom Build",
    }
  ];

  const technologies = [
    { name: "React", icon: FaReact },
    { name: "Node.js", icon: FaNodeJs },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Express", icon: SiExpress },
    { name: "OpenAI", icon: FaRobot },
    { name: "Gemini AI", icon: FaRobot },
    { name: "AWS", icon: FaAws }
  ];

  return (
    <PageTransition>
      <SEO
        title="Our Portfolio"
        path="/portfolio"
        description="Explore IdeaClap India's past work — websites, AI chatbots, automations, mobile apps, digital marketing campaigns, and custom software."
      />

      {/* ── 1. HERO SECTION ── */}
      <PageHeader
        eyebrow="OUR PORTFOLIO"
        title="Building Digital Experiences That Deliver Results."
        description="Real Projects. Real Innovation. Real Business Growth."
        primaryCta="Explore Our Work"
      />

      {/* ── 2. FEATURED PROJECTS SCROLL SECTION ── */}
      <section ref={projectsScrollRef} className="relative h-auto md:h-[320vh] bg-cover bg-center bg-no-repeat bg-fixed border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="z-10 relative md:sticky md:top-0 flex h-auto md:h-screen items-center md:overflow-hidden py-16 md:py-20">
          <div className="container-page w-full overflow-x-auto hide-scrollbar">

            {/* Section header row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="mb-12"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">
                Case Studies
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-navy leading-tight font-bold">
                Featured <span className="italic text-[#c68b59]">Projects.</span>
              </h2>
            </motion.div>

            <motion.div
              style={{ x: projectTrackX }}
              className="flex w-max gap-6 pb-6 md:pb-0 px-4 md:px-0"
            >
              {projects.map((proj) => {
                const Icon = proj.icon;
                return (
                  <motion.div
                    key={proj.title}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative flex min-h-[400px] w-[82vw] max-w-[420px] flex-shrink-0 flex-col justify-between rounded-3xl border border-[rgba(8,31,82,0.1)] bg-white/90 backdrop-blur-sm overflow-hidden shadow-[0_2px_24px_rgba(8,31,82,0.06)] hover:shadow-[0_12px_40px_rgba(8,31,82,0.14)] hover:border-[#c68b59]/40 transition-all duration-400 sm:w-[360px] lg:w-[420px]"
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c68b59]/0 via-[#c68b59] to-[#c68b59]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      {/* Large ghost number + category inline */}
                      <div className="flex items-start justify-between mb-6">
                        <span className="font-serif text-[5rem] leading-none font-bold text-navy/[0.04] select-none group-hover:text-[#c68b59]/10 transition-colors duration-500">
                          {proj.number}
                        </span>
                        {/* Floating icon */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c68b59]/10 text-[#c68b59] text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon />
                        </div>
                      </div>

                      {/* Category + Title */}
                      <span className="text-[10px] font-bold font-ui uppercase tracking-[0.2em] text-[#c68b59] mb-2">
                        {proj.category}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-semibold text-navy leading-tight mb-4">
                        {proj.title}
                      </h3>

                      {/* Short blue accent underline */}
                      <div className="w-8 h-[3px] rounded-full bg-[#081F52]/20 group-hover:w-16 group-hover:bg-[#c68b59] transition-all duration-500 mb-5" />

                      {/* Description */}
                      <p className="text-sm font-light font-ui leading-[1.85] text-navy/60 flex-1">
                        {proj.desc}
                      </p>
                    </div>

                    {/* Bottom row */}
                    <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                      <span className="inline-flex items-center rounded-full bg-navy/[0.04] px-3 py-1.5 text-[10px] font-semibold font-ui uppercase tracking-widest text-navy/50 border border-navy/[0.06]">
                        {proj.metric}
                      </span>
                      <a
                        href="/contact"
                        className="text-xs font-semibold font-ui tracking-widest uppercase text-[#c68b59] hover:text-[#c68b59]/70 transition-colors"
                      >
                        Get Similar Project →
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. TECHNOLOGIES WE USE ── */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed py-20 border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="z-10 relative container-page text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">
              Domain Technologies
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight font-bold mb-16">
              Technologies We Integrate.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto"
          >
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="flex flex-col items-center justify-center w-24 h-24 border border-[#c68b59]/15 hover:border-[#c68b59]/60 rounded-2xl bg-white shadow-sm cursor-default transition-all duration-300 grayscale hover:grayscale-0"
                >
                  <Icon className="text-3xl text-[#c68b59] mb-2" />
                  <span className="text-[11px] font-medium font-ui tracking-wider text-navy/70">{tech.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 4. FINAL CTA SECTION ── */}
      <section 
        className="relative py-24 md:py-32 text-center overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/careers_bg.png')" }}
      >
        <div className="absolute inset-0 bg-[#050816]/95 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c68b59]/5 blur-[120px] pointer-events-none z-0" />

        <div className="container-page relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#c68b59] mb-6">
              Partnership
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight mb-10">
              Let's Build Your <br />
              <span className="italic text-[#c68b59]">Next Success Story.</span>
            </h2>

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
                  Start Your Project
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
