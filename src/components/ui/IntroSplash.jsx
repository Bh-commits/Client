import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/* ─────────────────────────────────────────
   IntroSplash — Premium loading screen
   - Animated progress percentage
   - Gradient progress bar
   - Logo reveal with particles
   - Fade-to-blur page transition
───────────────────────────────────────── */

function LoadingParticles() {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: `${10 + (i * 5.6) % 80}%`,
    y: `${10 + (i * 7.3) % 80}%`,
    size: 1.5 + (i % 3),
    duration: 3 + (i % 4),
    delay: (i * 0.25) % 3,
    color: i % 2 === 0 ? 'rgba(59,130,246,0.6)' : 'rgba(198,139,89,0.5)',
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y, background: p.color }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}

export function IntroSplash() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setShow(false);
      return;
    }

    // Animate progress 0 → 100 over ~3.2 seconds
    const duration = 3200;
    const startTime = performance.now();

    function updateProgress() {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(updateProgress);
      }
    }
    requestAnimationFrame(updateProgress);

    const timer = setTimeout(() => setShow(false), 3500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#050816' }}
        >
          {/* Animated Grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Aurora Background */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)',
                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)',
                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(198,139,89,0.1) 0%, transparent 70%)',
                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <LoadingParticles />

          {/* Background Text zoom */}
          <motion.div
            initial={{ scale: 1, opacity: 0, filter: 'blur(20px)' }}
            animate={{
              scale: [1, 1, 30],
              opacity: [0, 0.3, 0],
              filter: ['blur(20px)', 'blur(4px)', 'blur(10px)'],
            }}
            transition={{
              duration: 3.5,
              times: [0, 0.4, 1],
              ease: [0.6, 0.01, 0.05, 0.95],
            }}
            className="absolute flex items-center justify-center font-heading font-extrabold tracking-tight text-white pointer-events-none"
            style={{ fontSize: '15vw', whiteSpace: 'nowrap' }}
          >
            IDEACLAP
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            {/* Logo circle */}
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-[#0A2E73] to-[#081F52] shadow-[0_0_60px_rgba(198,139,89,0.3)] ring-1 ring-white/10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 to-transparent blur-md" />
              <img
                src="/logo-new.png"
                alt="IdeaClap Logo"
                className="relative z-10 w-full h-full object-cover rounded-full drop-shadow-2xl"
              />
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex w-56 flex-col items-center gap-2"
            >
              {/* Bar track */}
              <div
                className="h-[2px] w-full overflow-hidden rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #c68b59 100%)',
                    boxShadow: '0 0 8px rgba(139,92,246,0.6)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>

              {/* Percentage text */}
              <span
                className="font-ui text-xs font-medium tabular-nums"
                style={{ color: 'rgba(240,246,255,0.4)' }}
              >
                {progress}%
              </span>
            </motion.div>

            {/* Shimmer line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '120px' }}
              transition={{ duration: 1.5, delay: 1.2, ease: 'easeInOut' }}
              className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
