import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';
import { FaCheckCircle, FaRocket, FaBolt, FaRobot, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────
   Word Flip — cycles a list of words
───────────────────────────────────────── */
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
          className="inline-block italic"
          style={{ color: '#c68b59' }}
        >
          {flipWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─────────────────────────────────────────
   Floating AI Particles
───────────────────────────────────────── */
function Particles({ count = 22 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: 2 + (i % 4),
      x: `${5 + (i * 4.3) % 90}%`,
      top: `${5 + (i * 7.1) % 90}%`,
      duration: 5 + (i % 6),
      delay: (i * 0.4) % 4,
      color: i % 3 === 0 ? 'rgba(198,139,89,0.6)' : i % 3 === 1 ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.25)',
    })), []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: p.x, top: p.top, background: p.color }}
          animate={{ y: [0, -28, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Stars Sparkle
───────────────────────────────────────── */
function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: `${(i * 2.7) % 100}%`,
      y: `${(i * 3.1) % 100}%`,
      size: 0.8 + (i % 2) * 0.8,
      duration: 2 + (i % 3),
      delay: (i * 0.3) % 4,
    })), []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ width: s.size, height: s.size, left: s.x, top: s.y }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Scatter → Assemble Left Panel
───────────────────────────────────────── */
function ScatterLogo() {
  const line1 = "Innovate with";
  const line2 = "IdeaClap";
  const line1Chars = Array.from(line1);
  const line2Chars = Array.from(line2);

  const scatterPositions = useMemo(() => {
    const allChars = [...line1Chars, ...line2Chars];
    return allChars.map((_, i) => {
      const angle = ((i * 137.508 + 42) % 360) * (Math.PI / 180);
      const radius = 280 + (i * 53 % 350);
      return {
        x: Math.cos(angle) * radius * (i % 2 === 0 ? 1 : -0.8),
        y: Math.sin(angle) * radius * (i % 3 === 0 ? -1 : 0.7),
        rotate: (i * 47) % 360 - 180,
        scale: 0.1 + (i % 5) * 0.15,
      };
    });
  }, []);

  const makeLetterVariant = (index) => ({
    hidden: {
      x: scatterPositions[index].x,
      y: scatterPositions[index].y,
      rotate: scatterPositions[index].rotate,
      scale: scatterPositions[index].scale,
      opacity: 0,
      filter: 'blur(8px)',
    },
    visible: {
      x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 55, damping: 11, delay: 3.5 + index * 0.04 },
    },
  });

  return (
    <div className="flex flex-col items-center justify-center select-none font-serif text-center relative z-10 w-full max-w-7xl mx-auto px-4 mt-[-10vh]">
      {/* LINE 1 — Eyebrow */}
      <div className="flex flex-wrap items-center justify-center font-ui font-semibold uppercase tracking-[0.35em] text-white/95 mb-4 text-xl md:text-2xl drop-shadow-md">
        {line1Chars.map((letter, i) => (
          <motion.span
            key={`l1-${i}`}
            className="inline-block"
            style={{ marginRight: letter === ' ' ? '0.55em' : '0.02em' }}
            initial="hidden"
            animate="visible"
            variants={makeLetterVariant(i)}
            whileHover={{ scale: 1.15, y: -2, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>

      {/* LINE 2 — "IdeaClap" */}
      <h1
        className="tracking-normal flex items-center justify-center overflow-visible whitespace-nowrap mt-2"
        style={{ fontSize: 'clamp(5rem, 14vw, 13rem)', lineHeight: 1.1 }}
      >
        {line2Chars.map((letter, i) => {
          const globalIndex = line1Chars.length + i;
          return (
            <motion.span
              key={`l2-${i}`}
              className="inline-block cursor-default font-serif font-bold text-white"
              style={{
                filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.35))',
                padding: '0 2px',
              }}
              initial="hidden"
              animate="visible"
              variants={makeLetterVariant(globalIndex)}
              whileHover={{
                scale: 1.1,
                y: -6,
                color: '#c68b59',
                filter: 'drop-shadow(0 0 16px rgba(198,139,89,0.6))',
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </h1>

      {/* Line 3 — Full company name */}
      <motion.div
        className="mt-6 text-3xl md:text-5xl font-light tracking-wide text-white/95 font-serif"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 4.7 }}
      >
        <span>India </span>
        <span className="italic text-white">Private Limited</span>
      </motion.div>

      {/* Badge */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 4.9 }}
        animate-loop={{ y: [0, -6, 0] }}
      >
        <motion.span
          className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/8 px-8 py-4 text-sm md:text-base font-semibold font-ui tracking-wide text-white backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 5.5 }}
        >
          <FaRocket className="text-sm text-[#c68b59]" />
          AI-Powered Digital Transformation Partner
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Right Panel — Hero Content with Word Flip
───────────────────────────────────────── */
function HeroContent({ ctaPulse }) {
  const trustItems = [
    { label: 'AI Powered', icon: FaRobot },
    { label: '24×7 Support', icon: FaBolt },
    { label: 'Custom Solutions', icon: FaRocket },
    { label: 'Trusted Technology', icon: FaShieldAlt },
  ];

  return (
    <div className="flex flex-col justify-center gap-6 lg:gap-7">
      {/* Eyebrow */}
      <motion.p
        className="font-ui text-xs font-medium uppercase tracking-[0.25em] text-[#c68b59]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 3.8 }}
      >
        Enterprise Solutions
      </motion.p>

      {/* Heading lines */}
      <div className="space-y-2 overflow-hidden">
        {[
          { words: [{ text: 'Empowering ', hl: false, it: false }, { text: 'Businesses', hl: true, it: true }], delay: 4.2 },
          { words: [{ text: 'Through', hl: false, it: false }], delay: 4.85 },
          { words: [{ text: 'Technology ', hl: true, it: true }, { text: '& ', hl: false, it: false }, { text: 'Innovation', hl: true, it: true }], delay: 5.5 },
        ].map((line, li) => (
          <div key={li} style={{ overflow: 'hidden', lineHeight: 1.15 }}>
            <motion.p
              className="font-serif whitespace-nowrap"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.6rem)', lineHeight: 1.15 }}
              initial={{ y: '110%', opacity: 0, skewY: 4 }}
              animate={{ y: '0%', opacity: 1, skewY: 0 }}
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
                  animate={{ opacity: 1 }}
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
        className="flex flex-wrap items-center gap-2"
        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 6.0 }}
      >
        <span className="font-serif text-white/70 italic">We Build</span>
        <WordFlip />
      </motion.div>

      {/* Subheading */}
      <motion.p
        className="font-ui font-light tracking-wide max-w-lg flex flex-wrap gap-x-[0.35em]"
        style={{ color: 'rgba(240,246,255,0.75)', fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)', lineHeight: 1.85 }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: 4.85 }
          }
        }}
      >
        {"From intelligent websites and AI-powered automation to custom software and digital marketing, IdeaClap India Private Limited helps businesses attract more customers, streamline operations, and scale with confidence.".split(' ').map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4 } }
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap items-center gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 5.0 } }
        }}
      >
        {/* Primary */}
        <motion.div
          className="relative"
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.8 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 12 } }
          }}
          whileHover={{ y: -6, scale: 1.04 }}
          whileTap={{ y: -2, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <Link
            to="/free-consultation"
            className="btn-premium relative inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-full px-7 py-3 font-ui text-sm font-semibold text-white transition-all duration-300"
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
          {ctaPulse && (
            <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-20 pointer-events-none" />
          )}
        </motion.div>

        {/* Secondary */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.8 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 12 } }
          }}
          whileHover={{ y: -6, scale: 1.04 }}
          whileTap={{ y: -2, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <Link
            to="/services"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border px-7 py-3 font-ui text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}
          >
            Explore Services →
          </Link>
        </motion.div>
      </motion.div>

      {/* Trust Row */}
      <motion.div
        className="flex flex-wrap items-center gap-x-5 gap-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 5.2 }}
      >
        {trustItems.map(({ label, icon: Icon }, i) => (
          <motion.span
            key={label}
            className="flex items-center gap-1.5 text-xs font-light tracking-wide"
            style={{ color: 'rgba(240,246,255,0.55)' }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 5.25 + i * 0.08 }}
          >
            <FaCheckCircle className="text-[#c68b59] text-xs shrink-0" />
            {label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Aurora Background Effect
───────────────────────────────────────── */
function AuroraBackground() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(ellipse 120% 40% at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 60%)',
            'radial-gradient(ellipse 120% 40% at 50% -10%, rgba(139,92,246,0.14) 0%, transparent 60%)',
            'radial-gradient(ellipse 120% 40% at 50% -10%, rgba(198,139,89,0.1) 0%, transparent 60%)',
            'radial-gradient(ellipse 120% 40% at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Floating orbs */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: '10%',
          left: '-15%',
          background: 'radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          bottom: '20%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(198,139,89,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          top: '40%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
    </>
  );
}

/* ─────────────────────────────────────────
   Main Hero Section
───────────────────────────────────────── */
export function HeroSection() {

  /* Mouse parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const px = useTransform(springX, [-1, 1], [-10, 10]);
  const py = useTransform(springY, [-1, 1], [-10, 10]);
  const tiltX = useTransform(springY, [-1, 1], [6, -6]);
  const tiltY = useTransform(springX, [-1, 1], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  /* CTA pulse */
  const [ctaPulse, setCtaPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setCtaPulse(true);
      setTimeout(() => setCtaPulse(false), 800);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/careers_bg.png')" }}
    >
      <div className="absolute inset-0 bg-[#0B1120]/90" />
      
      {/* Animated dark gradient mesh background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated glow orb 1 */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 700, height: 700, top: '-20%', left: '-15%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)', filter: 'blur(40px)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Animated glow orb 2 */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 600, height: 600, bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(255,184,0,0.08) 0%, transparent 65%)', filter: 'blur(50px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Top fade for navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/80 via-transparent to-[#0B1120]/40" />
      </div>

      {/* Main Content matching Screenshot */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full text-center px-4">
        
        {/* Eyebrow */}
        <motion.div 
          className="mb-6 tracking-[0.45em] text-[#c68b59] font-ui text-sm md:text-base lg:text-lg font-medium uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          INNOVATE WITH
        </motion.div>

        {/* Main Logo Text */}
        <motion.h1 
          className="font-serif font-bold leading-none tracking-tight flex items-center justify-center flex-wrap" 
          style={{ fontSize: 'clamp(5rem, 13vw, 12rem)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 45 }}
        >
          <span className="text-white drop-shadow-[0_4px_16px_rgba(255,255,255,0.15)]">Idea</span>
          <span className="text-[#c68b59] drop-shadow-[0_4px_16px_rgba(198,139,89,0.3)]">Clap</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div 
          className="mt-6 text-2xl md:text-4xl lg:text-5xl text-white/95 font-serif font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          India <span className="italic text-[#c68b59]">Private Limited</span>
        </motion.div>

        {/* Ultra-Premium Animated Badge */}
        <motion.div 
          className="mt-14 group relative inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(198,139,89,0.15)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          {/* Animated Gradient Border Layer */}
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(198,139,89,0.8)_33%,rgba(255,255,255,0.6)_66%,transparent_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Inner Badge Content */}
          <span className="relative flex h-full w-full items-center gap-3.5 rounded-full bg-[#050816]/95 px-5 py-3 md:px-7 md:py-4 backdrop-blur-2xl">
            <span className="text-[#c68b59] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M501.6 4.186c-7.594-5.156-17.41-5.594-25.44-1.26l-368 200c-7.719 4.188-12.28 12.69-11.75 21.44s5.969 16.53 14.16 19.34l93.19 32.19c11.03 3.812 23.34 2.125 32.88-4.469l207.6-143.1l-153.2 173.8c-7.906 8.938-10.72 21.62-7.531 33.31l33.88 124.2c2.719 9.969 11.22 17.06 21.5 17.75c.594.031 1.219.063 1.813.063c9.625 0 18.5-5.156 23.25-13.62l144-256C511.4 34.03 509.2 16.44 501.6 4.186zM88.76 295.3c-14.88-5.125-30.84 2.375-36.41 17.38L2.008 403.4c-5.813 15.69 2.125 33.31 17.81 39.12s33.31-2.125 39.13-17.81L109.3 334.1C115.1 318.4 107.2 300.8 88.76 295.3zM189.6 405.3l-19.19 72.31c-3.969 14.94 4.875 30.25 19.81 34.25c2.375.625 4.813.938 7.188.938c12.56 0 24.06-8.313 27.06-20.75l17.81-74.88L189.6 405.3z"></path></svg>
            </span>
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white/95 font-ui">
              Empowering Businesses Through AI & Innovation
            </span>
          </span>
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to bottom, transparent, #0B1120)' }}
      />
    </section>
  );
}
