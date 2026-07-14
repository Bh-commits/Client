import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaGlobe, FaRobot, FaBullhorn, FaCogs, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const services = [
  {
    id: '01',
    title: 'Website Development',
    icon: FaGlobe,
    description: 'Professional websites that build trust and bring more customers. We create fast, mobile-friendly, and modern business websites that showcase your brand, generate enquiries, and help your business grow online.',
    highlights: ['Business Websites', 'E-commerce Stores', 'Landing Pages', 'SEO-Friendly Design'],
    link: '/services',
    color: 'rgba(59,130,246,',
  },
  {
    id: '02',
    title: 'AI Chatbots & Business Automation',
    icon: FaRobot,
    description: 'Save time by automating customer support and daily business tasks. Our AI-powered chatbots and automation solutions answer customer queries, capture leads, schedule appointments, and streamline repetitive work 24×7.',
    highlights: ['AI Chatbots', 'WhatsApp Automation', 'Appointment Booking', 'Lead Management'],
    link: '/ai-solutions',
    color: 'rgba(139,92,246,',
  },
  {
    id: '03',
    title: 'Digital Marketing & Performance Marketing',
    icon: FaBullhorn,
    description: 'Reach the right customers and grow your business faster. We help your business get noticed through Google, Facebook, Instagram, SEO, and high-performing ad campaigns that generate quality leads and measurable results.',
    highlights: ['Google Ads', 'Facebook & Instagram Ads', 'SEO', 'Social Media Marketing'],
    link: '/services',
    color: 'rgba(198,139,89,',
  },
  {
    id: '04',
    title: 'Business Automation Solutions',
    icon: FaCogs,
    description: 'Work smarter with custom digital systems built for your business. From CRM and billing software to inventory management and workflow automation, we build solutions that improve efficiency, reduce manual work, and support long-term growth.',
    highlights: ['CRM Solutions', 'Billing & Inventory', 'Workflow Automation', 'Custom Business Software'],
    link: '/services',
    color: 'rgba(6,182,212,',
  }
];

/* ─────────────────────────────────────────
   3D Tilt Card
   ───────────────────────────────────────── */
function TiltCard({ service, index, isEven, isMobile, isHorizontal }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const Icon = service.icon;
  const c = service.color;

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) - 0.5);
    mouseY.set(((e.clientY - rect.top) / rect.height) - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={isMobile ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, y: 30 }}
      animate={isMobile ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={isMobile ? { once: true, amount: 0.05 } : { margin: '-80px', once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className={isHorizontal ? "w-full text-left h-full flex flex-col" : `w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 order-1 text-left' : 'md:pl-16 order-2 text-left'}`}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        className="relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 lg:p-10 shadow-lg transition-all duration-500 hover:border-[#c68b59]/40 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_rgba(198,139,89,0.15)] h-full"
      >
        {/* Animated gradient spotlight on mouse position */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(300px circle at ${glowX}% ${glowY}%, ${c}0.08) 0%, transparent 60%)`,
            opacity: 0.7,
          }}
        />

        {/* Animated border glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            border: `1px solid ${c}0.0)`,
          }}
          whileHover={{
            boxShadow: `0 0 30px ${c}0.2), inset 0 0 30px ${c}0.05)`,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Shimmer line sweep on hover */}
        <div className="card-shimmer-line absolute inset-0 rounded-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          {/* ID Number watermark */}
          <span className="absolute -top-6 -right-2 text-[6rem] font-serif font-black italic select-none transition-colors duration-500 opacity-20"
            style={{ color: `${c}0.2)` }}>
            {service.id}
          </span>

          {/* Icon with glow */}
          <motion.div
            className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: `${c}0.12)`, border: `1px solid ${c}0.2)` }}
            whileHover={{
              scale: 1.15,
              boxShadow: `0 0 20px ${c}0.4)`,
              rotate: 5,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Icon className="text-xl" style={{ color: `${c}0.9)` }} />
          </motion.div>

          <h3 className="font-serif text-2xl lg:text-3xl leading-tight font-medium text-white mb-4 transition-colors duration-300"
            style={{ transitionProperty: 'color' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = `${c}1)`; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; }}>
            {service.title}
          </h3>

          <p className="text-slate-300/90 text-[1.05rem] font-light leading-[1.8] mb-8">
            {service.description}
          </p>

          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c68b59] mb-3">Highlights:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.highlights.map((highlight, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-[0.9rem] font-normal text-slate-300/80"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: `${c}1)` }} />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-6">
            <Link
              to={service.link}
              className="group/link inline-flex items-center gap-2 text-[1rem] font-semibold text-white/80 hover:text-[#c68b59] transition-colors duration-300"
            >
              Explore {service.title.split(' ')[0]}
            <motion.span
              className="text-accent"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaArrowRight />
            </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function OurServices() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMobile = () => setIsMobile(mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener('change', updateMobile);

    return () => mediaQuery.removeEventListener('change', updateMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef
  });

  const xTranslation = useTransform(scrollYProgress, [0.1, 0.95], ["0%", "-52%"]);

  if (isMobile) {
    return (
      <section className="relative overflow-hidden py-24 bg-cover bg-center bg-no-repeat bg-fixed border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-[#0B1120]/85 backdrop-blur-[1px] pointer-events-none z-0" />
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)', backgroundSize: '28px 28px' }} />

        <div className="container-page relative z-10">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-400 uppercase">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Our Services
            </div>
            <h2 className="font-serif text-4xl leading-tight text-white">
              Everything Your Business Needs to <span className="italic text-[#c68b59]">Grow.</span>
            </h2>
            <p className="mt-6 text-base text-slate-300/70 font-light leading-relaxed">
              From professional websites to AI automation and result-driven marketing, IdeaClap India Private Limited provides complete digital solutions that help businesses attract more customers, increase productivity, and achieve sustainable growth.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {services.map((service, index) => (
              <div key={service.id} className="relative flex flex-col items-center justify-between group">
                <TiltCard service={service} index={index} isEven={index % 2 === 0} isMobile={true} isHorizontal={false} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop Horizontal Pinning Scroll Layout
  return (
    <section 
      ref={containerRef}
      className="relative h-[300vh] bg-cover bg-center bg-no-repeat bg-fixed border-b border-[rgba(198,139,89,0.12)]"
      style={{ backgroundImage: "url('/careers_bg.png')" }}
    >
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden z-10">
        
        {/* Background Visual Layers */}
        <div className="absolute inset-0 bg-[#0B1120]/85 backdrop-blur-[1px] pointer-events-none z-0" />
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)', backgroundSize: '28px 28px' }} />

        {/* Ambient Glowing Orbs */}
        <motion.div
          className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full z-0"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full z-0"
          style={{ background: 'radial-gradient(circle, rgba(198,139,89,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Horizontal Container sliding horizontally */}
        <motion.div 
          style={{ x: xTranslation }} 
          className="relative z-10 flex gap-12 items-stretch pl-[12vw] pr-[12vw] w-max"
        >
          {/* Column 1: Sticky Title Card */}
          <div className="flex flex-col justify-center min-w-[420px] max-w-[460px] mr-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-400 uppercase w-fit">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Our Services
            </div>
            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl leading-tight text-white mb-6">
              Everything Your Business Needs to <br />
              <span className="italic text-[#c68b59]">Grow.</span>
            </h2>
            <p className="text-base text-slate-300/60 font-light leading-[1.8] tracking-wide">
              From professional websites and custom software to AI-powered chatbots and performance marketing, IdeaClap India Private Limited helps businesses automate work, find clients, and expand.
            </p>
            <div className="mt-8 flex items-center gap-2.5 text-xs font-ui tracking-wider text-slate-400 uppercase">
              <span>Scroll down to explore</span>
              <motion.span 
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#c68b59] text-base font-bold"
              >
                →
              </motion.span>
            </div>
          </div>

          {/* Columns 2-5: Dynamic Tilt Cards */}
          {services.map((service, index) => (
            <div key={service.id} className="min-w-[420px] md:min-w-[460px] lg:min-w-[480px] h-full flex flex-col">
              <TiltCard service={service} index={index} isEven={index % 2 === 0} isMobile={false} isHorizontal={true} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
