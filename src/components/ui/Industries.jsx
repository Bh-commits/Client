import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { industries } from '../../utils/content';

export function Industries() {
  const scrollRef = useRef(null);
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 420;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMobile = () => setIsMobile(mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener('change', updateMobile);

    return () => mediaQuery.removeEventListener('change', updateMobile);
  }, []);

  return (
    <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed py-24 lg:py-32 border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
      <div className="absolute inset-0 bg-[#050B14]/85 backdrop-blur-[1px] pointer-events-none z-0" />
      {/* Background Deep Glows */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#c68b59]/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="container-page relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={isMobile ? { once: true, amount: 0.05 } : { once: false, margin: '-50px' }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c68b59]/20 bg-[#c68b59]/10 px-4 py-1.5 text-xs font-light tracking-[0.22em] text-[#c68b59] uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#c68b59] animate-pulse" />
            Industries We Serve
          </motion.div>
          <motion.h2
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={isMobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={isMobile ? { once: true, amount: 0.05 } : { once: false, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl leading-tight text-white md:text-5xl"
          >
            Purpose-built solutions for <br/>
            <span className="italic text-[#c68b59]">local and scaling businesses.</span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="relative mx-auto max-w-[1400px] pl-4 md:pl-8 lg:pl-12 group">
          
          {/* Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-4 top-[40%] -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md transition-all hover:bg-[#c68b59] hover:border-[#c68b59] shadow-lg opacity-100"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="mr-0.5 text-sm md:text-base" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-8 top-[40%] -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md transition-all hover:bg-[#c68b59] hover:border-[#c68b59] shadow-lg opacity-100"
            aria-label="Scroll right"
          >
            <FaChevronRight className="ml-0.5 text-sm md:text-base" />
          </button>

          <div 
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pr-8 hide-scrollbar scroll-smooth"
          >
            {industries.map((industry, index) => {
              const Icon = industry.icon;

              return (
                <motion.div
                  key={industry.title}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  animate={isMobile ? { opacity: 1, y: 0 } : undefined}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={isMobile ? { once: true, amount: 0.05 } : { once: false, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
                  className="w-[85vw] sm:w-[350px] md:w-[400px] shrink-0 snap-start group relative overflow-hidden flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#c68b59]/40 hover:bg-white/[0.05] hover:shadow-[0_12px_40px_rgba(198,139,89,0.15)]"
                >
                  {/* Subtle Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c68b59]/0 via-transparent to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:from-[#c68b59]/10 group-hover:to-blue-500/5 group-hover:opacity-100 pointer-events-none" />
                  
                  <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                    <div className="flex items-start justify-between">
                      <motion.div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-2xl text-blue-400 shadow-inner border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#c68b59]/20 group-hover:text-[#c68b59] group-hover:border-[#c68b59]/30"
                      >
                        <Icon />
                      </motion.div>
                      
                      <div className="opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <svg className="w-5 h-5 text-[#c68b59]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="mb-2 font-serif text-xl text-white group-hover:text-[#c68b59] transition-colors duration-300">
                        {industry.title}
                      </h3>
                      <p className="text-sm font-light leading-[1.85] tracking-wide text-blue-100/55 group-hover:text-blue-100/75 transition-colors duration-300">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}






