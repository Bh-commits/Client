import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Autoplay, Pagination, EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { testimonials } from '../../utils/content';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

export function Testimonials() {
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
    <section 
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed py-24 lg:py-32 border-b border-[rgba(198,139,89,0.12)]"
      style={{ backgroundImage: "url('/careers_bg.png')" }}
    >
      <div className="absolute inset-0 bg-[#0B1120]/90" />
      {/* Background Deep Glows */}
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-accent/5 blur-[100px]" />

      <div className="container-page relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Header & Context */}
        <motion.div 
          className="w-full lg:w-5/12"
          initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          animate={isMobile ? { opacity: 1, x: 0 } : undefined}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={isMobile ? { once: true, amount: 0.05 } : { once: false, margin: '-50px' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-400 uppercase">
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            Client Success
          </div>
          <h2 className="mb-6 font-serif text-4xl leading-tight text-white md:text-5xl">
            Trusted by businesses that value <span className="italic text-[#c68b59]">practical growth.</span>
          </h2>
          <p className="mb-8 text-base font-light leading-[1.85] tracking-wide text-blue-100/60">
            Don't just take our word for it. See how our digital solutions have transformed local and scaling businesses into highly efficient, customer-generating machines.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-10 w-10 rounded-full border-2 border-[#030A14] flex items-center justify-center font-bold text-white text-xs ${['bg-blue-600', 'bg-purple-600', 'bg-accent', 'bg-emerald-500'][i-1]}`}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 text-accent text-sm">
                {[1, 2, 3, 4, 5].map((i) => <FaStar key={i} />)}
              </div>
              <span className="text-sm font-semibold text-white mt-1">4.9/5 from 150+ reviews</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: 3D Cards Slider */}
        <motion.div 
          className="w-full lg:w-7/12"
          initial={isMobile ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 50 }}
          animate={isMobile ? { opacity: 1, scale: 1, x: 0 } : undefined}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={isMobile ? { once: true, amount: 0.05 } : { once: false, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Swiper
            effect={isMobile ? 'slide' : 'cards'}
            grabCursor={true}
            modules={[EffectCards, Autoplay, Pagination]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="w-full max-w-[500px] lg:max-w-full pb-14"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.name} className="flex">
                <div className="relative flex h-full w-full flex-col justify-between rounded-3xl border border-white/10 bg-[#0B1E3D]/90 p-8 shadow-2xl backdrop-blur-xl md:p-10">
                  {/* Decorative Quote Icon */}
                  <div className="absolute top-8 right-8 text-6xl text-white/[0.03] pointer-events-none">
                    <FaQuoteLeft />
                  </div>
                  
                  <div className="relative z-10">
                    <FaQuoteLeft className="mb-6 text-2xl text-[#c68b59]/60" />
                    <p className="font-serif italic text-lg leading-[1.85] text-blue-50/80 md:text-xl">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="mt-10 flex items-center gap-4 relative z-10">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-heading text-xl font-bold text-white shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm font-light tracking-wide text-[#c68b59]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 to-blue-500/0 opacity-0 transition-opacity duration-500 hover:from-accent/5 hover:to-blue-500/5 hover:opacity-100 pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style>{`
        .swiper-pagination-bullet { background: rgba(255, 255, 255, 0.3); transition: all 0.3s; }
        .swiper-pagination-bullet-active { background: #c68b59; width: 24px; border-radius: 12px; }
      `}</style>
    </section>
  );
}






