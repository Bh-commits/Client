import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────
   CustomCursor
   - Outer ring (slow, large) + Inner dot (fast, small)
   - Cursor trail particles: 3 hardware-accelerated trail dots
   - Glow on hover over interactive elements
   - Auto-idling animation loop to maximize scroll performance
   - Hidden on touch/mobile
   - Does NOT block scroll events
───────────────────────────────────────── */

function isTouchDevice() {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
}

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trail1Ref = useRef(null);
  const trail2Ref = useRef(null);
  const trail3Ref = useRef(null);

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const visibleRef = useRef(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (
      isTouchDevice() ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    document.body.style.cursor = 'none';

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let t1X = 0, t1Y = 0;
    let t2X = 0, t2Y = 0;
    let t3X = 0, t3Y = 0;

    let animId;
    let isRunning = false;

    function lerp(a, b, n) {
      return a + (b - a) * n;
    }

    function onMouseMove(e) {
      dotX = e.clientX;
      dotY = e.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      // Start the animation loop only when the mouse moves
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(animate);
      }
    }

    function onMouseLeave() {
      visibleRef.current = false;
      setVisible(false);
    }

    function onMouseEnter() {
      visibleRef.current = true;
      setVisible(true);
    }

    function onClick() {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    }

    function onPointerOver(e) {
      const el = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, [tabindex]'
      );
      const isHovered = !!el;
      if (isHovered !== hoveredRef.current) {
        hoveredRef.current = isHovered;
        setHovered(isHovered);
      }
    }

    function animate() {
      // Lerp calculations for smooth lag
      ringX = lerp(ringX, dotX, 0.1);
      ringY = lerp(ringY, dotY, 0.1);

      t1X = lerp(t1X, dotX, 0.25);
      t1Y = lerp(t1Y, dotY, 0.25);

      t2X = lerp(t2X, t1X, 0.2);
      t2Y = lerp(t2Y, t1Y, 0.2);

      t3X = lerp(t3X, t2X, 0.15);
      t3Y = lerp(t3Y, t2Y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      }
      if (trail1Ref.current) {
        trail1Ref.current.style.transform = `translate3d(${t1X - 2}px, ${t1Y - 2}px, 0)`;
      }
      if (trail2Ref.current) {
        trail2Ref.current.style.transform = `translate3d(${t2X - 2}px, ${t2Y - 2}px, 0)`;
      }
      if (trail3Ref.current) {
        trail3Ref.current.style.transform = `translate3d(${t3X - 2}px, ${t3Y - 2}px, 0)`;
      }

      // Check if all positions have converged to mouse coordinates
      const ringDist = Math.hypot(ringX - dotX, ringY - dotY);
      const trailDist = Math.hypot(t3X - dotX, t3Y - dotY);

      if (ringDist < 0.15 && trailDist < 0.15) {
        // Snap to destination and pause the animation loop to save CPU/GPU cycles during scroll
        ringX = dotX; ringY = dotY;
        t1X = dotX; t1Y = dotY;
        t2X = dotX; t2Y = dotY;
        t3X = dotX; t3Y = dotY;
        isRunning = false;
      } else {
        animId = requestAnimationFrame(animate);
      }
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('click', onClick, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('click', onClick);
      document.removeEventListener('pointerover', onPointerOver);
      document.body.style.cursor = '';
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Inner dot */}
          <motion.div
            ref={dotRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: clicked ? 0.4 : hovered ? 0 : 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#ffffff',
              pointerEvents: 'none',
              zIndex: 99999,
              willChange: 'transform',
              mixBlendMode: 'difference',
            }}
          />

          {/* Trail Dot 1 */}
          <div
            ref={trail1Ref}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.4)',
              pointerEvents: 'none',
              zIndex: 99996,
              willChange: 'transform',
              mixBlendMode: 'difference',
            }}
          />

          {/* Trail Dot 2 */}
          <div
            ref={trail2Ref}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              pointerEvents: 'none',
              zIndex: 99995,
              willChange: 'transform',
              mixBlendMode: 'difference',
            }}
          />

          {/* Trail Dot 3 */}
          <div
            ref={trail3Ref}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              pointerEvents: 'none',
              zIndex: 99994,
              willChange: 'transform',
              mixBlendMode: 'difference',
            }}
          />

          {/* Outer ring */}
          <motion.div
            ref={ringRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: hovered ? 1 : 0.6,
              scale: clicked ? 0.7 : hovered ? 1.8 : 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1.5px solid rgba(255, 255, 255, 0.9)',
              pointerEvents: 'none',
              zIndex: 99998,
              willChange: 'transform',
              mixBlendMode: 'difference',
              boxShadow: hovered ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none',
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
