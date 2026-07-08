import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';
import { FaCheckCircle, FaRocket, FaBolt, FaRobot, FaShieldAlt, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
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
    <div className="flex flex-col items-start justify-center select-none font-serif">
      {/* LINE 1 — Eyebrow */}
      <div className="flex flex-wrap items-center justify-start font-ui font-semibold uppercase tracking-[0.35em] text-white/95 mb-3 text-lg md:text-xl drop-shadow-md">
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
        className="tracking-normal flex items-center justify-start overflow-visible whitespace-nowrap"
        style={{ fontSize: 'clamp(3rem, 8.5vw, 8rem)', lineHeight: 1.05 }}
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
        className="mt-4 text-3xl md:text-4xl font-light tracking-wide text-white/95 font-serif"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 4.7 }}
      >
        <span>India </span>
        <span className="italic text-white">Private Limited</span>
      </motion.div>

      {/* Badge */}
      <motion.div
        className="mt-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 4.9 }}
        animate-loop={{ y: [0, -6, 0] }}
      >
        <motion.span
          className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-5 py-2.5 text-xs md:text-sm font-semibold font-ui tracking-wide text-white backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
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
  const [isMuted, setIsMuted] = useState(true);

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
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: '#050816' }}
    >
      {/* Immersive Full Screen Video Background */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          src="/home_hero_video.mp4"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark Vignette Overlay to maintain contrast for Navbar */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/50 via-transparent to-[#050816]" />
      </div>

      {/* Floating Mute/Unmute Control overlay for immersive video */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#050816]/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[#050816]/90 active:scale-95 shadow-xl"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
        </button>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,8,22,1))' }}
      />
    </section>
  );
}
