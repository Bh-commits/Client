import { motion } from 'framer-motion';

const directionVariants = {
  up:    { hidden: { opacity: 0, y: 40 },    visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 },   visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -50 },   visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 },    visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
};

export function AnimatedSection({ children, className = '', delay = 0, direction = 'up', once = true }) {
  const variants = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}






