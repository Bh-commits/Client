import { useCountUp } from '../../hooks/useCountUp';
import { motion } from 'framer-motion';

export function StatCard({ label, value, suffix }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.06,
        y: -6,
        borderColor: 'rgba(59,130,246,0.3)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.1)',
      }}
    >
      {/* Glow ring on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-4 right-4 h-[1px] rounded-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.6) 50%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Number */}
      <p
        className="font-heading text-4xl font-extrabold relative z-10"
        style={{
          background: 'linear-gradient(135deg, #c68b59 0%, #F0F6FF 55%, #93C5FD 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {count}{suffix}
      </p>

      {/* Label */}
      <p className="mt-2 text-sm font-medium relative z-10" style={{ color: 'rgba(240,246,255,0.55)' }}>
        {label}
      </p>

      {/* Bottom particle */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: 3, height: 3, background: 'rgba(198,139,89,0.5)' }}
        animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
