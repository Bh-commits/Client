import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/* ─────────────────────────────────────────
   ScrollProgress
   Thin gradient line at the very top of the viewport
   that fills left→right as the user scrolls down.
───────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        transformOrigin: '0%',
        background:
          'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #c68b59 100%)',
        zIndex: 99997,
        pointerEvents: 'none',
        boxShadow: '0 0 8px rgba(139,92,246,0.5)',
      }}
    />
  );
}
