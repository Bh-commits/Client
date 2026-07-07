import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaEye } from 'react-icons/fa';

export function OurVision() {
  const containerRef = useRef(null);
  // Trigger when 40% of the section is visible in viewport. No 'once: true', so it reverses when scrolled out.
  const isInView = useInView(containerRef, { margin: '-30% 0px -30% 0px' });
  
  // The 'opened' state is exactly equal to whether the section is in view
  const opened = isInView;

  return (
    <section 
      ref={containerRef}
      className="relative flex min-h-[520px] w-full items-center justify-center overflow-hidden bg-[#081F52] py-20 md:min-h-[70vh] md:py-32"
    >
      {/* 
        ========================================
        1. THE HIDDEN VISION CONTENT (Background)
        ========================================
      */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/vision_bg.png" 
          alt="Vision Background" 
          className="h-full w-full object-cover opacity-40 mix-blend-screen"
        />
        {/* Gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081F52] via-[#081F52]/80 to-transparent" />
      </div>

      <div className="container-page relative z-10 flex flex-col items-center text-center">
        {/* Animated Content that reveals AFTER doors open */}
        <motion.div
          initial="hidden"
          animate={opened ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.8 } }
          }}
          className="max-w-3xl flex flex-col items-center"
        >
          {/* Icon appears */}
          <motion.div 
            variants={{
              hidden: { scale: 0, opacity: 0, rotate: -45 },
              visible: { scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } }
            }}
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#FFD96A] p-1 shadow-[0_0_40px_rgba(198,139,89,0.4)]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-navy">
              <FaEye className="text-3xl text-accent" />
            </div>
          </motion.div>

          {/* Title fades up */}
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Building the Future of <br className="hidden md:block"/>
            <span className="italic text-[#c68b59]">Smart Businesses.</span>
          </motion.h2>

          {/* Paragraph fades up */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="mt-8 text-base font-light leading-[1.85] tracking-wide text-blue-100/60 md:text-lg"
          >
            We envision a future where every business—large or small—can leverage technology and artificial intelligence to work smarter, serve customers better, and grow without limits.
          </motion.p>
        </motion.div>
      </div>

      {/* 
        ========================================
        2. THE SLIDING DOORS (Foreground)
        ========================================
      */}
      {/* Left Door */}
      <motion.div
        className="absolute left-0 top-0 z-50 hidden h-full w-1/2 items-center justify-end overflow-hidden border-r border-accent/20 bg-[#0B2F78] shadow-[20px_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl md:flex"
        initial={{ x: 0 }}
        animate={opened ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
      >
        {/* Glow effect on the edge */}
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-accent to-transparent opacity-50" />
        
        <h3 
          className="mr-4 font-heading font-black text-white/5 md:mr-8 lg:mr-12"
          style={{ fontSize: 'clamp(4rem, 12vw, 15rem)' }}
        >
          OUR
        </h3>
      </motion.div>

      {/* Right Door */}
      <motion.div
        className="absolute right-0 top-0 z-50 hidden h-full w-1/2 items-center justify-start overflow-hidden border-l border-accent/20 bg-[#0B2F78] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl md:flex"
        initial={{ x: 0 }}
        animate={opened ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
      >
        {/* Glow effect on the edge */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-accent to-transparent opacity-50" />
        
        <h3 
          className="ml-4 font-heading font-black text-white/5 md:ml-8 lg:ml-12"
          style={{ fontSize: 'clamp(4rem, 12vw, 15rem)' }}
        >
          VISION
        </h3>
      </motion.div>

    </section>
  );
}






