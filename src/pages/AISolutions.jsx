import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView, useMotionValue } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { 
  FaRobot, FaPhone, FaBolt, FaUserCheck, FaShareAlt, FaBook, 
  FaChartLine, FaArrowRight, FaChevronDown, FaCheckCircle, FaLock, 
  FaTrophy, FaServer, FaCode, FaLaptopCode, FaCheck, FaRocket, FaAngleLeft, FaAngleRight,
  FaVolumeMute, FaVolumeUp
} from 'react-icons/fa';
import { SEO } from '../components/ui/SEO';
import { PageTransition } from '../components/ui/PageTransition';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/* ── Floating Glowing Particles ── */
function Particles({ count = 20 }) {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 2 + (i % 3),
    x: `${(i * 7.7) % 90 + 5}%`,
    y: `${(i * 11.3) % 90 + 5}%`,
    duration: 6 + (i % 5),
    delay: i * 0.3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent/30"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* ── Live Counter Component ── */
function Counter({ value, label, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const isNum = !isNaN(value);
    const end = isNum ? parseInt(value) : parseInt(value.replace(/[^0-9]/g, ''));
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  const displayVal = value.includes('%') ? `${count}%` : value.includes('x') ? `${count}x` : value;

  return (
    <div ref={ref} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:border-[#c68b59]/30 transition-all duration-300">
      <h3 className="text-4xl md:text-5xl font-serif text-accent font-semibold mb-2 drop-shadow-md">{displayVal}</h3>
      <p className="text-sm font-light font-ui tracking-wide text-muted/70">{label}</p>
    </div>
  );
}

/* ── FAQs Accordion Item ── */
function AccordionItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-[#c68b59]/15">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none"
      >
        <span className="text-lg font-light font-ui tracking-wide text-navy hover:text-accent transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-accent text-sm ml-4"
        >
          <FaChevronDown />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm font-light font-ui leading-relaxed text-navy/60">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AISolutions() {
  const [openFaq, setOpenFaq] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // 3D Card Hover Tilt values
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const tiltX = useSpring(useTransform(cardY, [-0.5, 0.5], [6, -6]), { stiffness: 100, damping: 20 });
  const tiltY = useSpring(useTransform(cardX, [-0.5, 0.5], [-6, 6]), { stiffness: 100, damping: 20 });

  const handleCardMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardX.set(x);
    cardY.set(y);
  };

  const handleCardMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  // Parallax values
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);

  // Timeline scroll track
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const faqs = [
    { question: "What is an AI chatbot?", answer: "An AI chatbot is an intelligent assistant trained on your data that interacts with customers, answers questions, and captures leads automatically 24/7." },
    { question: "Can AI integrate with my existing software?", answer: "Yes, we can seamlessly connect AI solutions with your CRM, ERP, WhatsApp Business API, email databases, and custom APIs." },
    { question: "Is AI suitable for small businesses?", answer: "Absolutely. AI helps small businesses scale by handling support and lead capture automatically, allowing small teams to achieve more." },
    { question: "Can AI automate WhatsApp conversations?", answer: "Yes, we build official WhatsApp Business API integrations that allow AI to answer queries, send reminders, and take orders." },
    { question: "How long does implementation take?", answer: "A custom AI solution typically takes between 2 to 4 weeks depending on prompt complexity, integrations, and training data." },
    { question: "Do you provide maintenance?", answer: "Yes, we continuously monitor performance, update datasets, refine prompts, and optimize integrations as your business grows." }
  ];

  const industries = [
    "Restaurants", "Clinics", "Hospitals", "Hotels", "Gyms", 
    "Retail Stores", "Real Estate", "Schools", "Manufacturing", "Professional Services"
  ];

  const technologies = [
    { name: "OpenAI", icon: FaRobot },
    { name: "Google Gemini", icon: FaRobot },
    { name: "Microsoft AI", icon: FaLaptopCode },
    { name: "Meta Llama", icon: FaCode },
    { name: "LangChain", icon: FaShareAlt },
    { name: "MongoDB", icon: FaServer },
    { name: "Node.js", icon: FaCode },
    { name: "React", icon: FaLaptopCode },
    { name: "AWS", icon: FaServer },
    { name: "Render", icon: FaServer }
  ];
  const topTechnologies = technologies.slice(0, 5);
  const bottomTechnologies = technologies.slice(5);

  const aiSolutions = [
    { number: "01", title: "AI Chatbots", desc: "Provide instant customer support, answer FAQs, qualify leads, and stay available 24/7 across your website and WhatsApp.", icon: FaRobot },
    { number: "02", title: "AI Voice Assistant", desc: "Automate inbound and outbound calls, appointment reminders, customer verification, and follow-ups with natural AI conversations.", icon: FaPhone },
    { number: "03", title: "Business Automation", desc: "Automate repetitive tasks such as lead assignment, approvals, reminders, invoices, reports, and internal workflows.", icon: FaBolt },
    { number: "04", title: "AI Sales Assistant", desc: "Capture leads, nurture prospects, qualify enquiries, and help your sales team close deals faster.", icon: FaUserCheck },
    { number: "05", title: "AI Workflow Integration", desc: "Connect your CRM, WhatsApp, Email, Google Workspace, Microsoft 365, payment gateways, and internal systems into one intelligent workflow.", icon: FaShareAlt },
    { number: "06", title: "AI Knowledge Assistant", desc: "Train AI on your company documents, products, policies, and FAQs so it provides accurate business-specific responses.", icon: FaBook },
    { number: "07", title: "AI Analytics", desc: "Monitor business performance through intelligent dashboards and receive recommendations powered by AI.", icon: FaChartLine }
  ];

  const whyChooseAI = [
    { title: "Custom AI Solutions", desc: "Every business is different. We build AI around your workflows.", icon: FaRobot },
    { title: "Fast Deployment", desc: "Launch AI solutions quickly without disrupting operations.", icon: FaBolt },
    { title: "Secure & Reliable", desc: "Enterprise-grade security with scalable infrastructure.", icon: FaLock },
    { title: "Continuous Support", desc: "Our team continuously improves your AI systems as your business grows.", icon: FaCheckCircle }
  ];

  const whyNeedAI = [
    { title: "Save Time", desc: "Automate repetitive tasks and reduce manual effort.", icon: FaBolt },
    { title: "Increase Revenue", desc: "Capture and convert more leads with AI-driven engagement.", icon: FaChartLine },
    { title: "Better Customer Experience", desc: "Provide instant support 24/7 across multiple channels.", icon: FaRobot },
    { title: "Make Smarter Decisions", desc: "Use AI-powered insights to improve business performance.", icon: FaTrophy }
  ];

  return (
    <PageTransition>
      <SEO
        title="AI Solutions"
        path="/ai-solutions"
        description="Transform your business with intelligent AI chatbots, custom voice assistants, and workflow automations by IdeaClap India."
      />

      {/* ── 1. HERO SECTION ── */}
      <section 
        ref={heroRef} 
        className="relative min-h-[92vh] flex items-center bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden pt-24"
        style={{ backgroundImage: "url('/careers_bg.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0B1120]/90 pointer-events-none z-0" />
        {/* Background Network Graphic Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(198,139,89,0.15)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <Particles count={25} />
        
        {/* Deep blue backdrop glow */}
        <div className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0B2F78]/40 blur-[130px] pointer-events-none z-0" />
        <div className="absolute -bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#c68b59]/10 blur-[120px] pointer-events-none z-0" />

        <div className="container-page relative z-10 grid gap-16 lg:grid-cols-2 items-center py-16">
          
          {/* Left panel: text reveal (one by one) */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
              }}
              className="inline-block px-4 py-1.5 rounded-full border border-[#c68b59]/25 bg-[#c68b59]/10 text-xs font-semibold uppercase tracking-[0.25em] text-[#c68b59] mb-6"
            >
              Artificial Intelligence Solutions
            </motion.span>
            
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
              }}
              className="font-serif text-5xl md:text-7xl font-bold leading-[1.08] text-white max-w-2xl mb-6"
            >
              Transform Your Business <br />
              with <span className="italic text-[#c68b59] drop-shadow-sm">Intelligent AI Solutions.</span>
            </motion.h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
              }}
              className="font-ui font-light text-base md:text-lg leading-[1.85] tracking-wide text-muted/70 max-w-xl mb-10"
            >
              AI is no longer the future—it's today's competitive advantage. From intelligent chatbots and workflow automation to AI-powered sales and customer support, IdeaClap India Private Limited helps businesses work smarter, respond faster, and grow without limits.
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
              }}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ y: -1, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <a
                  href="/free-consultation"
                  className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold bg-white text-[#081F52] shadow-soft hover:shadow-[0_12px_32px_rgba(255,255,255,0.2)] transition-shadow"
                >
                  Schedule Free AI Consultation
                </a>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ y: -1, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <a
                  href="#solutions"
                  className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  Explore AI Solutions
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right panel: Floating 3D Metric Dashboard Illustration replaced by Video */}
          <motion.div 
            style={{ y: yParallax }}
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="relative flex justify-center items-center w-full"
          >
            {/* Holographic grid ring background */}
            <div className="absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-white/[0.03] animate-spin-slow z-0" />
            <div className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-[#c68b59]/5 z-0" />
            
            {/* Ambient Background Glow behind the card */}
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-blue-500/25 to-[#c68b59]/15 blur-3xl opacity-60 z-0 pointer-events-none" />

            {/* Glowing 3D Glass Video Container */}
            <motion.div 
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative z-10 w-full max-w-none lg:max-w-[760px] xl:max-w-[850px] lg:-mr-12 xl:-mr-20 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-3.5 shadow-[0_32px_80px_rgba(0,0,0,0.8),_0_0_40px_rgba(59,130,246,0.15)] backdrop-blur-2xl cursor-default transition-all duration-300 hover:border-white/20"
            >
              {/* Metallic Accent corners to make card look extremely premium */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c68b59]/50 rounded-tl-[32px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/50 rounded-br-[32px] pointer-events-none" />

              <div className="relative overflow-hidden rounded-2xl shadow-inner border border-white/5" style={{ transform: 'translateZ(20px)' }}>
                <video
                  src="/ai_solutions_video.mp4"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full object-cover rounded-2xl"
                  style={{ aspectRatio: '16/9' }}
                />
                
                {/* Volume Overlay Control */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/80 active:scale-95 shadow-lg"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {isMuted ? <FaVolumeMute className="text-base" /> : <FaVolumeUp className="text-base" />}
                </button>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── 2. WHY BUSINESSES NEED AI ── */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 md:py-32 border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="container-page relative z-10">
          
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 mb-20 items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">
                Market Dynamics
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-navy leading-tight font-bold">
                Why Businesses Are <br />
                Adopting AI Faster <span className="italic text-[#c68b59]">Than Ever.</span>
              </h2>
            </div>
            <p className="font-ui font-light text-base md:text-lg leading-[1.85] tracking-wide text-navy/60">
              Customers expect instant responses, faster service, and personalized experiences. Traditional manual processes slow businesses down. AI helps automate routine work, improve customer engagement, reduce operational costs, and enable your team to focus on what matters most—growing your business.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyNeedAI.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-[#c68b59]/15 p-6 shadow-sm hover:shadow-lift hover:border-[#c68b59]/30 transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c68b59]/10 text-xl text-[#c68b59] group-hover:rotate-12 transition-transform duration-300 mb-6">
                    <Icon />
                  </div>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">{card.title}</h3>
                  <p className="text-sm font-light font-ui leading-relaxed text-navy/60">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 3. OUR AI SOLUTIONS (SLIDER LIKE REFERENCED IMAGE) ── */}
      <section id="solutions" className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 md:py-32 overflow-hidden border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-[#081F52]/80 backdrop-blur-[1px] pointer-events-none z-0" />
        {/* Background glow */}
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full bg-[#c68b59]/5 blur-[120px] pointer-events-none" />

        <div className="container-page relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">
                Core Portfolio
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight font-bold">
                AI Solutions <br />
                Designed for <span className="italic text-[#c68b59]">Modern Businesses.</span>
              </h2>
            </div>
            
          </div>

          <div className="relative">
            <button
              aria-label="Previous AI solution"
              className="swiper-btn-prev absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-lg border border-white/10 bg-white text-[#081F52] shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 hover:bg-[#c68b59] hover:text-white focus:outline-none md:-translate-x-6"
            >
              <FaAngleLeft className="text-lg" />
            </button>

            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: '.swiper-nav-pagination', bulletActiveClass: '!bg-[#c68b59]' }}
              navigation={{
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="w-full pb-12"
            >
              {aiSolutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <SwiperSlide key={solution.title} className="h-auto">
                    <div className="relative flex flex-col justify-between h-full min-h-[380px] rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-xl backdrop-blur-md overflow-hidden hover:border-[#c68b59]/30 group transition-all duration-300">
                      {/* Hover Glow Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#c68b59]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="relative z-10">
                        {/* Big Card Number */}
                        <span className="block font-serif text-5xl md:text-6xl font-light text-white/5 group-hover:text-[#c68b59]/15 select-none mb-6 transition-colors duration-300">
                          {solution.number}
                        </span>

                        <h3 className="font-serif text-2xl font-semibold text-white mb-4 group-hover:text-[#c68b59] transition-colors">
                          {solution.title}
                        </h3>
                        
                        <p className="text-sm font-light font-ui leading-relaxed text-muted/70">
                          {solution.desc}
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                        <span className="text-accent text-lg">
                          <Icon />
                        </span>
                        <a href="/free-consultation" className="text-xs font-semibold font-ui tracking-widest text-[#c68b59] hover:underline uppercase flex items-center gap-1.5">
                          Learn More <FaArrowRight className="text-[10px]" />
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <button
              aria-label="Next AI solution"
              className="swiper-btn-next absolute right-0 top-1/2 z-20 flex h-12 w-12 translate-x-3 -translate-y-1/2 items-center justify-center rounded-lg border border-white/10 bg-white text-[#081F52] shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 hover:bg-[#c68b59] hover:text-white focus:outline-none md:translate-x-6"
            >
              <FaAngleRight className="text-lg" />
            </button>
          </div>

          <div className="swiper-nav-pagination flex justify-center mt-6 gap-2" />

        </div>
      </section>

      {/* ── 4. HOW IDEACLAP AI WORKS ── */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 md:py-32 overflow-hidden border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="container-page relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">
              AI Pipeline
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-navy leading-tight font-bold">
              From Conversation <br className="hidden sm:block" />
              to <span className="italic text-[#c68b59]">Conversion.</span>
            </h2>
            <p className="mt-6 text-navy/60 text-base font-light font-ui leading-[1.85] tracking-wide max-w-xl mx-auto">
              Our automated systems interpret and qualify prospects instantly, creating a seamless bridge between visitor interest and closed deals.
            </p>
          </div>

          <div ref={timelineRef} className="relative max-w-4xl mx-auto pl-8 sm:pl-0">
            {/* Timeline Progress Bar */}
            <div className="absolute left-[8px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-navy/5 sm:-translate-x-1/2">
              <motion.div 
                className="w-full bg-[#c68b59]" 
                style={{ height: "100%", scaleY, originY: 0 }}
              />
            </div>

            {[{ title: "Customer Enquiry", desc: "A visitor starts a conversation on website, WhatsApp, or voice line." },
              { title: "AI Understands Intent", desc: "Our engine parses natural language query and context instantly." },
              { title: "Instant Response", desc: "AI answers complex questions matching exact brand voice." },
              { title: "Lead Qualification", desc: "AI queries critical details, checks budget, and routes interest." },
              { title: "Business Automation", desc: "Integrates with CRM, updating profiles and sending instant files." },
              { title: "Sales Follow-up", desc: "Routes meeting links or places outbound confirmation calls." },
              { title: "Customer Conversion", desc: "Lead is booked and closed with minimal sales team friction." }
            ].map((step, idx) => {
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
                      <p className="text-sm font-light font-ui text-[#081F52]/60 leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 5. AI SOLUTIONS FOR EVERY INDUSTRY ── */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 md:py-32" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="z-10 relative container-page text-center">
          
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">
            Cross-Sector Capabilities
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy leading-tight font-bold mb-12">
            Built for <span className="italic text-[#c68b59]">Every Industry.</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {industries.map((ind, idx) => (
              <motion.div
                key={ind}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -3 }}
                className="px-6 py-3 rounded-full border border-[#c68b59]/20 bg-white shadow-sm hover:border-[#c68b59] hover:shadow-soft text-[#081F52] text-sm font-medium font-ui tracking-wide cursor-default transition-all duration-300"
              >
                {ind}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. WHY CHOOSE IDEACLAP AI (COUNTERS) ── */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 md:py-32 overflow-hidden border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-[#081F52]/80 backdrop-blur-[1px] pointer-events-none z-0" />
        <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] rounded-full bg-[#0B2F78]/40 blur-[100px] pointer-events-none" />

        <div className="container-page relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">
              Value Proposition
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight font-bold">
              Technology That <br />
              Works for <span className="italic text-[#c68b59]">Your Business.</span>
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {whyChooseAI.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#c68b59]/20 transition-all duration-300">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c68b59]/10 text-lg text-[#c68b59] mb-5">
                      <Icon />
                    </div>
                    <h3 className="font-serif text-lg text-white font-semibold mb-2">{card.title}</h3>
                    <p className="text-xs font-light font-ui leading-relaxed text-muted/50">{card.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Counters Column */}
            <div className="grid gap-6 grid-cols-2 items-center">
              <Counter value="70%" label="Reduction in Manual Work" />
              <Counter value="24/7" label="Customer Availability" />
              <Counter value="3x" label="Faster Lead Response" />
              <Counter value="50%" label="Higher Team Productivity" />
            </div>
          </div>

        </div>
      </section>

      {/* ── 7. TECHNOLOGIES WE USE ── */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <style>{`
          @keyframes tech-scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          @keyframes tech-scroll-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }

          .tech-scroll-row:hover .tech-scroll-track {
            animation-play-state: paused;
          }
        `}</style>
        <div className="container-page text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">
            Tech Stack Integration
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight font-bold mb-16">
            Technologies We Integrate.
          </h2>

          <div className="mx-auto max-w-5xl space-y-6 overflow-hidden">
            <div className="tech-scroll-row overflow-hidden">
              <div className="tech-scroll-track flex w-max" style={{ animation: 'tech-scroll-left 28s linear infinite' }}>
                {[0, 1].map((group) => (
                  <div key={group} className="flex gap-6 pr-6">
                    {topTechnologies.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={`${tech.name}-${group}`}
                          whileHover={{ scale: 1.06, borderColor: 'rgba(198,139,89,0.5)' }}
                          className="flex h-28 w-40 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-[#c68b59]/15 bg-white p-6 shadow-sm cursor-default transition-all duration-300 sm:w-44"
                        >
                          <Icon className="text-3xl text-[#c68b59] mb-3" />
                          <span className="text-sm font-medium font-ui text-[#081F52] tracking-wide">{tech.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-scroll-row overflow-hidden">
              <div className="tech-scroll-track flex w-max" style={{ animation: 'tech-scroll-right 28s linear infinite' }}>
                {[0, 1].map((group) => (
                  <div key={group} className="flex gap-6 pr-6">
                    {bottomTechnologies.map((tech) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={`${tech.name}-${group}`}
                          whileHover={{ scale: 1.06, borderColor: 'rgba(198,139,89,0.5)' }}
                          className="flex h-28 w-40 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-[#c68b59]/15 bg-white p-6 shadow-sm cursor-default transition-all duration-300 sm:w-44"
                        >
                          <Icon className="text-3xl text-[#c68b59] mb-3" />
                          <span className="text-sm font-medium font-ui text-[#081F52] tracking-wide">{tech.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* ── 9. FINAL CTA SECTION ── */}
      <section 
        className="relative py-24 md:py-32 border-t border-white/5 text-center overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/careers_bg.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#050816]/95 pointer-events-none z-0" />
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B2F78]/25 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c68b59]/5 blur-[120px] pointer-events-none" />

        <div className="container-page relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#c68b59] mb-6">
            AI Implementation
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight mb-6">
            Ready to Build an <br />
            <span className="italic text-[#c68b59]">AI-Powered Business?</span>
          </h2>
          <p className="text-muted/70 text-base font-light font-ui leading-[1.85] tracking-wide mb-10 max-w-xl mx-auto">
            Whether you're looking to automate customer support, streamline operations, or increase sales, IdeaClap India Private Limited delivers practical AI solutions tailored to your business goals.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ y: -1, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <a
                href="/free-consultation"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold bg-white text-[#081F52] shadow-soft hover:shadow-[0_12px_32px_rgba(255,255,255,0.2)] transition-shadow"
              >
                Book Free AI Consultation
              </a>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ y: -1, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <a
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                Talk to Our Experts
              </a>
            </motion.div>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
