import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { navLinks } from '../../utils/content';
import { ButtonLink } from '../ui/ButtonLink';

/* ─────────────────────────────────────────
   Navbar — Premium dark glass
   - Scroll-down: hides  |  Scroll-up: reappears
   - Glassmorphism dark backdrop on scroll
   - Animated active indicator (layoutId)
   - Logo pulse on mount
   - Shimmer CTA button
───────────────────────────────────────── */

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      setScrolled(y > 40);

      // Hide on scroll down (>50px), show on scroll up
      if (delta > 6 && y > 120) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: 'rgba(5,8,22,0.88)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(59,130,246,0.12)',
              boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
            }
          : {
              background: 'rgba(5,8,22,0.6)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }
      }
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: hidden ? '-100%' : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.4) 30%, rgba(139,92,246,0.4) 60%, rgba(198,139,89,0.3) 85%, transparent 100%)',
        }}
      />

      <div className="container-page flex min-h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          className="focus-ring flex items-center gap-3 rounded-lg"
          to="/"
          aria-label="IdeaClap home"
        >
          <motion.img
            className="h-20 w-20 object-contain"
            src="/logo-new.png"
            alt="IdeaClap Logo"
            style={{ filter: 'drop-shadow(0 0 12px rgba(198,139,89,0.35))' }}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 200 }}
            whileHover={{
              scale: 1.1,
              filter: 'drop-shadow(0 0 22px rgba(198,139,89,0.7))',
              rotate: 5,
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `relative rounded-lg px-3 py-2 text-sm font-medium font-ui tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/55 hover:text-white/90'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label === 'Home' ? (
                    <FaHome className="text-xl -mt-0.5" />
                  ) : (
                    link.label
                  )}
                  {/* Hover underline */}
                  <motion.span
                    className="absolute inset-x-1 -bottom-0.5 h-[1px] rounded-full"
                    style={{
                      background: isActive
                        ? 'linear-gradient(90deg, #3B82F6, #c68b59)'
                        : 'transparent',
                    }}
                    layoutId={isActive ? 'active-nav' : undefined}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(59,130,246,0.08)' }}
                      layoutId="nav-bg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <ButtonLink href="/free-consultation" className="px-4 py-2" showIcon={false}>
              Free Consultation
            </ButtonLink>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg border text-white/80 hover:text-white lg:hidden transition-colors"
          style={{
            borderColor: 'rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
          }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <FaTimes /> : <FaBars />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(5,8,22,0.97)',
              backdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(59,130,246,0.1)',
              overflow: 'hidden',
            }}
          >
            <div className="container-page grid gap-1 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? 'bg-royal/15 text-white'
                          : 'text-white/65 hover:bg-white/5 hover:text-white'
                      }`
                    }
                    to={link.href}
                  >
                    <div className="flex items-center gap-2">
                      {link.label === 'Home' && <FaHome className="text-lg" />}
                      {link.label !== 'Home' ? link.label : 'Home'}
                    </div>
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                className="mt-2"
              >
                <ButtonLink href="/free-consultation" showIcon={false}>
                  Free Consultation
                </ButtonLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
