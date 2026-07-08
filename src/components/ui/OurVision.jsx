import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaEye, FaCheckCircle, FaRocket, FaBolt, FaRobot, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const flipWords = [
  'Websites',
  'AI Solutions',
  'Automation',
  'Digital Brands',
  'Business Growth',
  'Marketing Systems',
  'Enterprise Software',
];

function WordFlip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % flipWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-flex items-center overflow-hidden" style={{ minWidth: '12ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block italic text-[#c68b59]"
        >
          {flipWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function OurVision() {
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

  // Trigger when 40% of the section is visible in viewport. No 'once: true', so it reverses when scrolled out.
  const isInView = useInView(containerRef, { margin: '-30% 0px -30% 0px' });
  
  // The 'opened' state is exactly equal to whether the section is in view
  const opened = isMobile || isInView;

  return (
    <section 
      ref={containerRef}
      className="relative flex min-h-[680px] w-full items-center justify-center overflow-hidden bg-[#081F52] py-20 md:min-h-[85vh] md:py-28"
    >
      {/* 
        ========================================
        1. THE HIDDEN VISION CONTENT (Background)
        ========================================
      */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/vision_bg.png" 
          alt="Vision Background" 
          className="h-full w-full object-cover opacity-40 mix-blend-screen"
        />
        {/* Gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081F52] via-[#081F52]/80 to-transparent" />
      </div>

      <div className="container-page relative z-10 flex flex-col items-center text-center">
        {/* Animated Content that reveals AFTER doors open */}
        <motion.div
          initial="hidden"
          animate={opened ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.6 } }
          }}
          className="max-w-4xl flex flex-col items-center gap-6 lg:gap-7"
        >
          {/* Icon appears */}
          <motion.div 
            variants={{
              hidden: { scale: 0, opacity: 0, rotate: -45 },
              visible: { scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } }
            }}
            className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#FFD96A] p-1 shadow-[0_0_30px_rgba(198,139,89,0.3)]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-navy">
              <FaEye className="text-2xl text-accent" />
            </div>
          </motion.div>

          {/* Heading lines (from referenced image 2) */}
          <div className="space-y-2 overflow-hidden text-center">
            {[
              { words: [{ text: 'Empowering ', hl: false, it: false }, { text: 'Businesses', hl: true, it: true }], delay: 0.8 },
              { words: [{ text: 'Through', hl: false, it: false }], delay: 1.1 },
              { words: [{ text: 'Technology ', hl: true, it: true }, { text: '& ', hl: false, it: false }, { text: 'Innovation', hl: true, it: true }], delay: 1.4 },
            ].map((line, li) => (
              <div key={li} style={{ overflow: 'hidden', lineHeight: 1.15 }}>
                <motion.p
                  className="font-serif whitespace-nowrap"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3.8rem)', lineHeight: 1.15 }}
                  initial={{ y: '110%', opacity: 0, skewY: 4 }}
                  animate={opened ? { y: '0%', opacity: 1, skewY: 0 } : { y: '110%', opacity: 0, skewY: 4 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    delay: line.delay,
                    opacity: { duration: 0.25, delay: line.delay }
                  }}
                >
                  {line.words.map((w, wi) => (
                    <motion.span
                      key={wi}
                      initial={{ opacity: 0 }}
                      animate={opened ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3, delay: line.delay + 0.2 }}
                      className={w.it ? 'italic' : ''}
                      style={w.hl ? { color: '#c68b59' } : { color: '#F0F6FF' }}
                    >
                      {w.text}
                    </motion.span>
                  ))}
                </motion.p>
              </div>
            ))}
          </div>

          {/* Word Flip line */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)' }}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.7 } }
            }}
          >
            <span className="font-serif text-white/70 italic">We Build</span>
            <WordFlip />
          </motion.div>

          {/* Paragraph description */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 2.0 } }
            }}
            className="text-base font-light leading-[1.85] tracking-wide text-blue-100/70 max-w-2xl md:text-lg"
          >
            From intelligent websites and AI-powered automation to custom software and digital marketing, IdeaClap India Private Limited helps businesses attract more customers, streamline operations, and scale with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 2.3 } }
            }}
          >
            {/* Primary Button */}
            <motion.div
              whileHover={{ y: -5, scale: 1.04 }}
              whileTap={{ y: -2, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Link
                to="/free-consultation"
                className="btn-premium relative inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-full px-8 py-3 font-ui text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #3B82F6 60%, #2563eb 100%)',
                  border: '1px solid rgba(59,130,246,0.4)',
                  boxShadow: '0 8px 24px rgba(59,130,246,0.25)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.6), 0 12px 32px rgba(59,130,246,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.25)'; }}
              >
                <span className="btn-shimmer pointer-events-none absolute inset-0 rounded-full" aria-hidden />
                <span className="relative z-10">Schedule Free Consultation →</span>
              </Link>
            </motion.div>

            {/* Secondary Button */}
            <motion.div
              whileHover={{ y: -5, scale: 1.04 }}
              whileTap={{ y: -2, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Link
                to="/services"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border px-8 py-3 font-ui text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}
              >
                Explore Services →
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 2.6 } }
            }}
          >
            {[
              { label: 'AI Powered', icon: FaRobot },
              { label: '24×7 Support', icon: FaBolt },
              { label: 'Custom Solutions', icon: FaRocket },
              { label: 'Trusted Technology', icon: FaShieldAlt },
            ].map(({ label, icon: Icon }, i) => (
              <motion.span
                key={label}
                className="flex items-center gap-1.5 text-xs font-light tracking-wide"
                style={{ color: 'rgba(240,246,255,0.6)' }}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <FaCheckCircle className="text-[#c68b59] text-xs shrink-0" />
                {label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 
        ========================================
        2. THE SLIDING DOORS (Foreground)
        ========================================
      */}
      {/* Left Door */}
      <motion.div
        className="absolute left-0 top-0 z-50 hidden h-full w-1/2 items-center justify-end overflow-hidden border-r border-accent/20 bg-[#0B2F78] shadow-[20px_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl md:flex"
        initial={{ x: 0 }}
        animate={opened ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
      >
        {/* Glow effect on the edge */}
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-accent to-transparent opacity-50" />
        
        <h3 
          className="mr-4 font-heading font-black text-white/5 md:mr-8 lg:mr-12"
          style={{ fontSize: 'clamp(4rem, 12vw, 15rem)' }}
        >
          OUR
        </h3>
      </motion.div>

      {/* Right Door */}
      <motion.div
        className="absolute right-0 top-0 z-50 hidden h-full w-1/2 items-center justify-start overflow-hidden border-l border-accent/20 bg-[#0B2F78] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl md:flex"
        initial={{ x: 0 }}
        animate={opened ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
      >
        {/* Glow effect on the edge */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-accent to-transparent opacity-50" />
        
        <h3 
          className="ml-4 font-heading font-black text-white/5 md:ml-8 lg:ml-12"
          style={{ fontSize: 'clamp(4rem, 12vw, 15rem)' }}
        >
          VISION
        </h3>
      </motion.div>

    </section>
  );
}
