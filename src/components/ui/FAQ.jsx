import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { faqs } from '../../utils/content';

export function FAQ({ items = faqs }) {
  const [open, setOpen] = useState(0);

  return (
    <>
      <div className="faq-scroll-container mx-auto max-w-3xl divide-y rounded-xl overflow-y-auto overflow-x-hidden max-h-[600px]"
        style={{ border: '1px solid rgba(255,255,255,0.08)', divideColor: 'rgba(255,255,255,0.06)' }}>
      {items.map((item, index) => (
        <motion.div
          key={item.question}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-20px' }}
          transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            type="button"
            className="focus-ring flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold transition-colors"
            style={{
              color: open === index ? '#c68b59' : '#F0F6FF',
              background: open === index ? 'rgba(198,139,89,0.05)' : 'transparent',
            }}
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
          >
            <span>{item.question}</span>
            <motion.span
              animate={{ rotate: open === index ? 180 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <FaChevronDown className="shrink-0 text-sm text-royal" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="px-6 pb-5 text-sm leading-7" style={{ color: 'rgba(240,246,255,0.65)' }}>
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      </div>
      <style>{`
        .faq-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .faq-scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }
        .faq-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(253, 184, 19, 0.4);
          border-radius: 8px;
        }
        .faq-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(253, 184, 19, 0.8);
        }
      `}</style>
    </>
  );
}






