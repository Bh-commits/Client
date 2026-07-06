import { motion } from 'framer-motion';
import { industries } from '../../utils/content';

export function Industries() {
  return (
    <section className="relative overflow-hidden bg-[#050B14] py-24 lg:py-32">
      {/* Background Deep Glows */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="container-page relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c68b59]/20 bg-[#c68b59]/10 px-4 py-1.5 text-xs font-light tracking-[0.22em] text-[#c68b59] uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#c68b59] animate-pulse" />
            Industries We Serve
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl leading-tight text-white md:text-5xl"
          >
            Purpose-built solutions for <br/>
            <span className="italic text-[#c68b59]">local and scaling businesses.</span>
          </motion.h2>
        </div>

        {/* Bento Box Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              // Make every 4th and 5th item span 2 columns on large screens for a bento-box feel
              const isLarge = index === 0 || index === 3 || index === 6;

              return (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-purple-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] ${
                    isLarge ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  {/* Subtle Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:from-purple-500/10 group-hover:to-blue-500/10 group-hover:opacity-100 pointer-events-none" />
                  
                  <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                    <div className="flex items-start justify-between">
                      <motion.div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-2xl text-purple-400 shadow-inner border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/30"
                      >
                        <Icon />
                      </motion.div>
                      
                      {/* Decorative arrow icon appearing on hover */}
                      <div className="opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <svg className="w-5 h-5 text-purple-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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






