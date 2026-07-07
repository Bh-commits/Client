import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Autoplay, EffectCreative, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaLaptopCode, FaRegLightbulb } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

export function CompanyIntro() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );
  const images = [
    '/company_intro.png',
    '/company_intro_strategy.png',
    '/company_intro_dev.png'
  ];

  // Mouse Parallax for the image container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const rotateX = useTransform(springY, [-1, 1], [5, -5]);
  const rotateY = useTransform(springX, [-1, 1], [-5, 5]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMobile = () => setIsMobile(mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener('change', updateMobile);

    return () => mediaQuery.removeEventListener('change', updateMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 60, damping: 15 }
    }
  };
  const sectionViewport = isMobile ? { once: true, amount: 0.05 } : { margin: '-100px' };

  if (isMobile) {
    return (
      <section
        className="relative overflow-hidden py-16"
        style={{ background: 'linear-gradient(180deg, #081F52 0%, #0B2F78 52%, #081F52 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="container-page relative z-10 flex flex-col gap-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#061634]/80 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <img
              src={images[0]}
              alt="Digital Solutions"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081F52]/90 via-[#081F52]/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent">
                  <FaRegLightbulb className="text-lg" />
                </div>
                <div>
                  <p className="text-sm font-normal text-white">Innovation First</p>
                  <p className="text-xs font-light tracking-wide text-blue-100/60">Driving Business Value</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            <div className="space-y-5">
              <p className="text-xs font-light uppercase tracking-[0.22em] text-[#c68b59]">
                Who We Are
              </p>
              <h2 className="font-serif text-4xl leading-[1.15] text-white">
                Digital Solutions Built Around{' '}
                <span className="italic text-[#c68b59]">Your Business.</span>
              </h2>

              <div className="relative pl-5">
                <div className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-[#c68b59] to-blue-600" />
                <p className="text-base font-light leading-[1.8] tracking-wide text-blue-100/70">
                  Technology should simplify your businessâ€”not complicate it.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="relative z-10 flex gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                    <FaLaptopCode />
                  </div>
                  <p className="text-sm font-light leading-[1.8] tracking-wide text-blue-100/75">
                    At IdeaClap India Private Limited, we create digital solutions that solve real business challenges. Whether you're launching a startup, modernizing an established company, or embracing AI automation, our team builds solutions that deliver measurable business value.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="relative z-10 flex gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <FaRegLightbulb />
                  </div>
                  <p className="text-sm font-light leading-[1.8] tracking-wide text-blue-100/75">
                    From strategy and design to development and long-term support, we become your technology partnerâ€”not just your service provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative overflow-hidden py-20 md:py-32"
      style={{ background: 'linear-gradient(to bottom, #081F52 0%, #0B2F78 50%, #081F52 100%)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Premium Dotted Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Deep Space Glowing Orbs */}
      <motion.div
        className="pointer-events-none absolute left-0 top-1/4 h-[800px] w-[800px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 60%)', filter: 'blur(80px)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 bottom-1/4 h-[600px] w-[600px] translate-x-1/3 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(198,139,89,0.05) 0%, transparent 60%)', filter: 'blur(80px)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="container-page relative z-10 grid items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24">
        
        {/* LEFT: 3D Hover Parallax Image Slider */}
        <motion.div
          initial={isMobile ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={isMobile ? { opacity: 1, scale: 1, rotateY: 0 } : undefined}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={sectionViewport}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative perspective-[2000px]"
        >
          <motion.div 
            style={{ rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY, transformStyle: 'preserve-3d' }}
            className="relative rounded-3xl p-1"
          >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/40 via-blue-600/10 to-accent/40 opacity-50 blur-md" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />
            
            <div className="relative overflow-hidden rounded-[22px] bg-navy/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-xl">
              <Swiper
                modules={[Autoplay, EffectCreative, Pagination]}
                effect={isMobile ? 'slide' : 'creative'}
                creativeEffect={{
                  prev: { shadow: true, translate: ['-20%', 0, -1], opacity: 0 },
                  next: { translate: ['100%', 0, 0] },
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                loop={true}
                className="w-full"
                style={{ aspectRatio: '4/3' }}
              >
                {images.map((src, i) => (
                  <SwiperSlide key={i} className="overflow-hidden">
                    <motion.img
                      src={src}
                      alt="Digital Solutions"
                      className="h-full w-full object-cover"
                      animate={{ scale: [1, 1.1] }}
                      transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081F52]/90 via-[#081F52]/20 to-transparent pointer-events-none" />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Floating Glass Badge over image */}
              <div 
                className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-2xl"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <FaRegLightbulb className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-normal text-white">Innovation First</p>
                    <p className="text-xs font-light tracking-wide text-blue-200/50">Driving Business Value</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Staggered Content with Glass Cards */}
        <motion.div
          variants={containerVariants}
          initial={isMobile ? "visible" : "hidden"}
          animate={isMobile ? "visible" : undefined}
          whileInView="visible"
          viewport={sectionViewport}
          className="flex flex-col gap-10"
        >
          <div className="space-y-6">
            <motion.p variants={itemVariants} className="text-xs font-light uppercase tracking-[0.22em] text-[#c68b59]">
              Who We Are
            </motion.p>
            <motion.h2 
              variants={itemVariants}
              className="font-serif text-4xl leading-[1.15] text-white lg:text-[2.75rem]"
            >
              Digital Solutions Built Around{' '}
              <span className="italic text-[#c68b59]">Your Business.</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="relative pl-6">
              <div className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-[#c68b59] to-blue-600" />
              <p className="text-base font-light leading-[1.85] tracking-wide text-blue-100/60">
                Technology should simplify your business—not complicate it.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Glass Card 1 */}
            <motion.div 
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-accent/0 transition-all duration-500 group-hover:from-blue-600/5 group-hover:to-accent/5" />
              <div className="relative z-10 flex gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 group-hover:text-blue-300 transition-colors">
                  <FaLaptopCode />
                </div>
                <p className="text-base font-light leading-[1.85] text-blue-100/60 group-hover:text-blue-100/80 transition-colors tracking-wide">
                  At IdeaClap India Private Limited, we create digital solutions that solve real business challenges. Whether you're launching a startup, modernizing an established company, or embracing AI automation, our team builds solutions that deliver measurable business value.
                </p>
              </div>
            </motion.div>
            
            {/* Glass Card 2 */}
            <motion.div 
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-accent/0 transition-all duration-500 group-hover:from-accent/5 group-hover:to-blue-600/5" />
              <div className="relative z-10 flex gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                  <FaRegLightbulb />
                </div>
                <p className="text-base font-light leading-[1.85] text-blue-100/60 group-hover:text-blue-100/80 transition-colors tracking-wide">
                  From strategy and design to development and long-term support, we become your technology partner—not just your service provider.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}






