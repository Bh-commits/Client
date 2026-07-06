import { motion } from 'framer-motion';

export function SectionHeader({ eyebrow, title, description, align = 'center', className = '', theme = 'dark' }) {
  const words = title.split(' ');
  const isDark = theme === 'dark';

  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium font-ui uppercase tracking-[0.22em] ${isDark ? 'border-[rgba(198,139,89,0.3)] bg-[rgba(198,139,89,0.08)] text-accent' : 'border-[rgba(198,139,89,0.3)] bg-[rgba(198,139,89,0.08)] text-[#c68b59]'}`}>
            <span className={`h-1.5 w-1.5 rounded-full animate-pulse bg-accent`} />
            {eyebrow}
          </span>
        </motion.div>
      ) : null}

      <h2 className={`mt-4 font-serif text-3xl leading-tight sm:text-4xl ${isDark ? 'text-white' : 'text-navy'}`}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {description ? (
        <motion.p
          className={`mx-auto mt-6 max-w-2xl text-base font-light font-ui leading-[1.85] tracking-wide ${isDark ? 'text-muted/70' : 'text-navy/60'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}







