import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { featuredServices, navLinks, siteConfig } from '../../utils/content';
import { NewsletterForm } from '../ui/NewsletterForm';

/* ─────────────────────────────────────────
   Footer — Premium animated
   - Animated gradient wave at top
   - Staggered column reveal
   - Icon hover glow
   - Gradient footer glow sweep
───────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const colVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 70, damping: 15 },
  },
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#050816' }}>
      {/* Animated gradient wave at top */}
      <div className="relative h-[2px] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #3B82F6 20%, #8B5CF6 50%, #c68b59 80%, transparent 100%)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Background */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url(/hero_bg_blur.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0 bg-[#050816]/80" />

      {/* Grid dots */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Footer glow orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full z-0"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full z-0"
        style={{ background: 'radial-gradient(circle, rgba(198,139,89,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Main Grid */}
      <motion.div
        className="container-page relative z-10 grid gap-10 py-16 lg:grid-cols-[1.1fr_0.7fr_1.5fr_1.1fr]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Brand col */}
        <motion.div variants={colVariants}>
          <Link className="focus-ring inline-flex items-center gap-3 rounded-lg" to="/">
            <motion.img
              className="h-20 w-20 object-contain"
              src="/logo-new.png"
              alt="IdeaClap Logo"
              style={{ filter: 'drop-shadow(0 0 10px rgba(198,139,89,0.3))' }}
              whileHover={{ filter: 'drop-shadow(0 0 20px rgba(198,139,89,0.7))', scale: 1.08, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7" style={{ color: 'rgba(240,246,255,0.55)' }}>
            Empowering Businesses Through Smart Digital Solutions, AI Innovation & Business Automation.
          </p>
          <div className="mt-5 grid gap-3 text-sm" style={{ color: 'rgba(240,246,255,0.65)' }}>
            <motion.a
              className="focus-ring flex items-center gap-3 rounded-lg transition-colors hover:text-accent group"
              href={`mailto:${siteConfig.email}`}
              whileHover={{ x: 5 }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                <FaEnvelope className="text-blue-400 text-xs" />
              </span>
              {siteConfig.email}
            </motion.a>
            <motion.a
              className="focus-ring flex items-center gap-3 rounded-lg transition-colors hover:text-accent group"
              href={`tel:${siteConfig.phone}`}
              whileHover={{ x: 5 }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                <FaPhoneAlt className="text-accent text-xs" />
              </span>
              {siteConfig.phone}
            </motion.a>
            <span className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                <FaMapMarkerAlt className="text-purple-400 text-xs" />
              </span>
              {siteConfig.address}
            </span>
          </div>
        </motion.div>

        {/* Company links */}
        <motion.div variants={colVariants}>
          <h2 className="font-heading text-xl font-bold" style={{ color: '#F0F6FF' }}>Company</h2>
          <div className="mt-4 grid gap-3">
            {navLinks.slice(0, 8).map((link) => (
              <motion.div key={link.href} whileHover={{ x: 5 }} transition={{ duration: 0.15 }}>
                <Link
                  className="focus-ring group rounded-lg text-sm transition-colors hover:text-white flex items-center gap-1"
                  style={{ color: 'rgba(240,246,255,0.5)' }}
                  to={link.href}
                >
                  <span
                    className="h-1 w-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-3"
                    style={{ background: 'rgba(198,139,89,0.6)' }}
                  />
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services links */}
        <motion.div variants={colVariants}>
          <h2 className="font-heading text-xl font-bold" style={{ color: '#F0F6FF' }}>Services</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {featuredServices.map((service) => (
              <motion.div key={service.title} whileHover={{ x: 5 }} transition={{ duration: 0.15 }}>
                <Link
                  className="focus-ring group rounded-lg text-sm transition-colors hover:text-white flex items-center gap-1"
                  style={{ color: 'rgba(240,246,255,0.5)' }}
                  to={service.href}
                >
                  <span
                    className="h-1 w-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-3"
                    style={{ background: 'rgba(59,130,246,0.6)' }}
                  />
                  {service.title}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={colVariants}>
          <h2 className="font-heading text-xl font-bold" style={{ color: '#F0F6FF' }}>Growth Notes</h2>
          <p className="mt-4 text-sm leading-7" style={{ color: 'rgba(240,246,255,0.55)' }}>
            Get practical ideas on websites, AI, and lead generation.
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="relative z-10">
        <motion.div
          className="container-page flex flex-col gap-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between"
          style={{ color: 'rgba(240,246,255,0.5)' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p>© {new Date().getFullYear()} IdeaClap India. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'rgba(240,246,255,0.3)' }}>
            Built with ❤️ for Business Growth
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
