import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

/* ─────────────────────────────────────────
   ButtonLink — Premium button
   - Shimmer sweep on hover
   - Ripple click effect
   - Glow shadow on hover
   - Gradient fill
───────────────────────────────────────── */

export function ButtonLink({ href, children, className = '', showIcon = true, variant = 'primary', ...props }) {
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };

  const isPrimary = variant === 'primary';

  return (
    <Link
      ref={btnRef}
      to={href}
      onClick={handleClick}
      className={`btn-premium relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-ui text-sm font-semibold transition-all duration-300 ${className}`}
      style={
        isPrimary
          ? {
            background: 'linear-gradient(135deg, #1d4ed8 0%, #3B82F6 50%, #2563eb 100%)',
            color: '#ffffff',
            boxShadow: '0 0 0 0 rgba(59,130,246,0)',
            border: '1px solid rgba(59,130,246,0.3)',
          }
          : {
            background: 'rgba(255,255,255,0.05)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.2)',
          }
      }
      onMouseEnter={(e) => {
        if (isPrimary) {
          e.currentTarget.style.boxShadow =
            '0 0 30px rgba(59,130,246,0.5), 0 8px 24px rgba(59,130,246,0.3)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 0 rgba(59,130,246,0)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      {...props}
    >
      {/* Shimmer sweep */}
      <span
        className="btn-shimmer pointer-events-none absolute inset-0 rounded-full"
        aria-hidden
      />

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: r.x,
              top: r.y,
              translateX: '-50%',
              translateY: '-50%',
              background: 'rgba(255,255,255,0.25)',
              width: 4,
              height: 4,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 40, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      <span className="relative z-10">{children}</span>
      {showIcon && (
        <motion.span
          className="relative z-10"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <FaArrowRight className="text-xs" />
        </motion.span>
      )}
    </Link>
  );
}
