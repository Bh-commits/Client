import { useEffect, useState } from 'react';
import { FaArrowUp, FaWhatsapp } from 'react-icons/fa';
import { ChatBotWidget } from '../ui/ChatBotWidget';

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 items-end">
      {visible ? (
        <button
          type="button"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-[#c68b59]/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(198,139,89,0.3)] hover:-translate-y-1"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <FaArrowUp className="text-white/70 transition-colors duration-300 group-hover:text-[#c68b59]" />
        </button>
      ) : null}
      {/* WhatsApp Button Component (Pill shaped to match ChatBot) */}
      <a
        href="https://wa.me/917067244561"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-[52px] items-center gap-3 overflow-hidden rounded-full bg-[#081F52] pl-1 pr-6 text-white shadow-lift focus-ring transition-all hover:bg-[#061840]"
        aria-label="Chat on WhatsApp"
      >
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#25D366] shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-6">
          <FaWhatsapp className="text-2xl" />
        </div>
        <span className="font-serif text-[17px] font-bold tracking-wide mt-0.5">WhatsApp</span>
      </a>

      <ChatBotWidget />
    </div>
  );
}






