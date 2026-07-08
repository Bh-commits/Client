import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

/* ─────────────────────────────────────────
   SmoothScrollProvider
   Wraps the app with Lenis butter-smooth scroll.
   Respects prefers-reduced-motion.
   Integrates with Framer Motion useScroll.
───────────────────────────────────────── */
export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Expose lenis globally so GSAP ScrollTrigger can use it
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return children;
}
