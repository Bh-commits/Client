import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
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
          className="focus-ring flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white shadow-lift"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      ) : null}
      
      <ChatBotWidget />
    </div>
  );
}






