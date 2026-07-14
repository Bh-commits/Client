import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const slides = [
  { 
    id: 1,
    image: '/why_ai.png', 
    title: 'AI-Powered Innovation', 
    desc: 'Smart solutions built using modern AI technologies.', 
    tag: 'AI INNOVATION' 
  },
  { 
    id: 2,
    image: '/why_custom.png', 
    title: 'Custom Solutions', 
    desc: 'Every project is designed specifically for your business.', 
    tag: 'TAILORED FIT' 
  },
  { 
    id: 3,
    image: '/why_fast.png', 
    title: 'Fast Delivery', 
    desc: 'Efficient development with transparent communication.', 
    tag: 'SPEED' 
  },
  { 
    id: 4,
    image: '/why_support.png', 
    title: 'Dedicated Support', 
    desc: "We're with you before, during, and after launch.", 
    tag: '24/7 SUPPORT' 
  },
  { 
    id: 5,
    image: '/why_pricing.png', 
    title: 'Affordable Pricing', 
    desc: 'Enterprise-quality solutions at competitive prices.', 
    tag: 'VALUE' 
  },
  { 
    id: 6,
    image: '/why_future.png', 
    title: 'Future Ready', 
    desc: 'Scalable architecture built for tomorrow.', 
    tag: 'SCALABILITY' 
  }
];

export function WhyChoose() {
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
      {/* Dark overlay preserving navy theme */}
      <div className="absolute inset-0 bg-[#081F52]/80 backdrop-blur-[1px] pointer-events-none z-0" />
      {/* Background Deep Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[120px]" />
      
      <div className="container-page relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={isMobile ? { once: true, amount: 0.05 } : { margin: '-50px' }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-400 uppercase"
          >
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            Why Choose IdeaClap India Private Limited
          </motion.div>
          <motion.h2
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={isMobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={isMobile ? { once: true, amount: 0.05 } : { margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
          >
            More Than a Service Provider.<br/>
            <span className="italic text-[#c68b59]">Your Technology Partner.</span>
          </motion.h2>
        </div>

        {/* 3D Coverflow Slider */}
        <motion.div 
          initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={isMobile ? { opacity: 1, scale: 1 } : undefined}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={isMobile ? { once: true, amount: 0.05 } : { margin: '-50px' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[1400px] mx-auto px-4"
        >
          <Swiper
            effect={isMobile ? 'slide' : 'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 250,
              modifier: 1.5,
              slideShadows: false,
            }}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="why-choose-swiper py-10"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="relative transition-all duration-500">
                {({ isActive }) => (
                  <div 
                    className={`relative mx-auto flex h-[450px] w-full max-w-[340px] flex-col justify-end overflow-hidden rounded-[2rem] border transition-all duration-500 ${
                      isActive 
                        ? 'border-purple-500/50 bg-navy/80 shadow-[0_0_40px_rgba(168,85,247,0.3)]' 
                        : 'border-white/10 bg-navy/40 blur-[2px] opacity-70 scale-95 hover:blur-none hover:opacity-100'
                    }`}
                  >
                    {/* Background Image (Zoomed to crop out built-in image text) */}
                    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="h-full w-full object-cover object-bottom mix-blend-screen opacity-55 transition-transform duration-1000"
                        style={{ transform: isActive ? 'scale(1.45)' : 'scale(1.35)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081F52] via-[#081F52]/60 to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className={`relative z-10 flex flex-col items-center p-8 text-center transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-50'}`}>
                      <h3 className="mb-2 font-serif text-2xl text-white drop-shadow-md">
                        {slide.title}
                      </h3>
                      <div className="mb-4 inline-flex items-center rounded-full bg-[#c68b59]/10 px-3 py-1 text-[10px] font-light tracking-[0.18em] text-[#c68b59] border border-[#c68b59]/20 uppercase">
                        {slide.tag}
                      </div>
                      <p className="text-sm font-normal leading-[1.85] tracking-wide text-white/95 drop-shadow-md">
                        {slide.desc}
                      </p>
                    </div>

                    {/* Glowing effect inside active card */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-purple-500/20 pointer-events-none" />
                    )}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      
      <style>{`
        .why-choose-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        .why-choose-swiper .swiper-pagination-bullet-active {
          background: #A855F7; /* Purple to match reference */
          width: 24px;
          border-radius: 12px;
        }
      `}</style>
    </section>
  );
}






