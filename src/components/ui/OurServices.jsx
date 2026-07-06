import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
function TiltCard({ service, index, isEven }) {
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
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ margin: '-80px', once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 order-1 text-left' : 'md:pl-16 order-2 text-left'}`}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0B1120]/90 backdrop-blur-md p-8 shadow-xl transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
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

        <div className="relative z-10">
          {/* ID Number watermark */}
          <span className="absolute -top-4 -right-2 text-6xl font-black select-none transition-colors duration-500"
            style={{ color: `${c}0.06)` }}>
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

          <h3 className="font-serif text-2xl text-white mb-4 transition-colors duration-300"
            style={{ transitionProperty: 'color' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = `${c}1)`; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; }}>
            {service.title}
          </h3>

          <p className="text-slate-300/75 text-base font-light leading-[1.85] tracking-wide mb-6">
            {service.description}
          </p>

          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c68b59] mb-3">Highlights:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.highlights.map((highlight, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2 text-sm font-light text-slate-300/65"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: `${c}0.8)` }} />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>

          <Link
            to={service.link}
            className="group/link inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors duration-300"
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
      </motion.div>
    </motion.div>
  );
}

export function OurServices() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: '#0B1120' }}>
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'url(/hero_bg_blur.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0 bg-[#0B1120]/70" />

      {/* Grid dots */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Background Glows */}
      <motion.div
        className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full z-0"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 translate-x-1/3 rounded-full z-0"
        style={{ background: 'radial-gradient(circle, rgba(198,139,89,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="container-page relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: '-100px', once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-400 uppercase"
          >
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            Our Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-100px', once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Everything Your Business Needs to{' '}
            <span className="italic text-[#c68b59]">Grow.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-100px', once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-slate-300/70 font-light leading-relaxed"
          >
            From professional websites to AI automation and result-driven marketing, IdeaClap India Private Limited provides complete digital solutions that help businesses attract more customers, increase productivity, and achieve sustainable growth.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative mx-auto max-w-5xl">
          {/* Central Vertical Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0) 0%, rgba(59,130,246,0.4) 20%, rgba(139,92,246,0.4) 50%, rgba(198,139,89,0.4) 80%, rgba(198,139,89,0) 100%)' }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          <div className="flex flex-col gap-12 md:gap-24">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const Icon = service.icon;
              const c = service.color;

              return (
                <div key={service.id} className="relative flex flex-col md:flex-row items-center justify-between group">

                  {/* Timeline Node / Icon */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ margin: '-100px', once: true }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="absolute left-4 md:left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: '#0B1120',
                      border: `2px solid ${c}0.3)`,
                      boxShadow: `0 8px 16px ${c}0.15)`,
                    }}
                    whileHover={{
                      scale: 1.2,
                      boxShadow: `0 12px 24px ${c}0.35), 0 0 30px ${c}0.2)`,
                    }}
                  >
                    <Icon className="text-xl transition-colors duration-300" style={{ color: `${c}0.85)` }} />
                  </motion.div>

                  {/* Empty space for alternating layout on Desktop */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'order-2' : 'order-1'}`} />

                  {/* 3D Tilt Card */}
                  <TiltCard service={service} index={index} isEven={isEven} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
