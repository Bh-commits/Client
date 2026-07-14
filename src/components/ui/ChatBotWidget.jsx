import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaEnvelope } from 'react-icons/fa';
import { publicApi } from '../../services/publicApi';

export function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailCaptured, setIsEmailCaptured] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! I'm Clap AI. I can tell you about IdeaClap India Private Limited's services, AI solutions, careers, or help you contact us. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (isEmailCaptured) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isEmailCaptured]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setIsSubmittingEmail(true);
    try {
      await publicApi.subscribe({ email: emailInput.trim(), source: 'chatbot' });
      setIsEmailCaptured(true);
    } catch (error) {
      console.error('Failed to capture email:', error);
      // Proceed anyway to not block the user, or show error. We'll proceed.
      setIsEmailCaptured(true);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI thinking and responding
    setTimeout(() => {
      const response = generateBotResponse(userMessage.text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: response,
        },
      ]);
    }, 600);
  };

  const generateBotResponse = (input) => {
    const text = input.toLowerCase();
    
    if (text.includes('service') || text.includes('what do you do')) {
      return "We offer a wide range of services including Custom Web & App Development, AI & Machine Learning integration, UI/UX Design, and Digital Transformation consulting. Check out our Services page!";
    }
    if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('machine learning')) {
      return "IdeaClap India Private Limited is an AI-first company! We build predictive models, NLP chatbots, computer vision systems, and automated workflows to supercharge businesses.";
    }
    if (text.includes('price') || text.includes('cost') || text.includes('quote')) {
      return "Our pricing is highly tailored to the scope and complexity of your project. Please click the 'Free Consultation' button at the top to discuss your needs and get a custom quote!";
    }
    if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('reach')) {
      return "You can email us at operations@ideaclapindia.com or call/WhatsApp us at +91 70672 44561. You can also visit our Contact page to send us a direct message!";
    }
    if (text.includes('career') || text.includes('job') || text.includes('intern') || text.includes('hiring')) {
      return "We're always looking for creative brains to join us! Head over to our Careers page to see open internship and full-time roles in Tech, Sales, HR, and Research.";
    }
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return "Hello there! How can I assist you with IdeaClap India Private Limited today?";
    }
    if (text.includes('thank')) {
      return "You're very welcome! Let me know if you need anything else.";
    }

    return "That's an interesting question! I'm a simple assistant and still learning. For a detailed answer, please book a Free Consultation with our team or visit our Contact page.";
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[480px] max-h-[75vh] w-[350px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_rgba(8,31,82,0.2)] border border-navy/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#081F52] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c68b59]">
                  <FaRobot className="text-xl" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold leading-tight">Clap AI</h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/70 font-ui">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            {!isEmailCaptured ? (
              /* Email Capture View */
              <div className="flex flex-1 flex-col items-center justify-center bg-gray-50/50 p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#081F52]/10 text-[#081F52]">
                  <FaEnvelope className="text-2xl" />
                </div>
                <h4 className="mb-2 font-serif text-xl font-bold text-navy">Welcome to Clap AI</h4>
                <p className="mb-6 text-sm text-gray-500">
                  Please enter your email address to start the conversation.
                </p>
                <form onSubmit={handleEmailSubmit} className="w-full">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    className="mb-3 w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-sm text-navy outline-none placeholder:text-navy/40 focus:border-[#c68b59] focus:ring-2 focus:ring-[#c68b59]/20"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingEmail || !emailInput.trim()}
                    className="w-full rounded-lg bg-[#081F52] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a2666] disabled:opacity-70"
                  >
                    {isSubmittingEmail ? 'Starting...' : 'Start Chat'}
                  </button>
                </form>
              </div>
            ) : (
              /* Chat Interface View */
              <>
                <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 scrollbar-thin scrollbar-thumb-gray-300">
                  <div className="flex flex-col gap-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs shadow-sm ${
                            msg.sender === 'user' ? 'bg-[#081F52] text-white' : 'bg-[#c68b59] text-white'
                          }`}
                        >
                          {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
                        </div>
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm font-ui leading-relaxed shadow-sm ${
                            msg.sender === 'user'
                              ? 'rounded-tr-sm bg-[#081F52] text-white'
                              : 'rounded-tl-sm bg-white text-navy border border-navy/5'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-navy/10 bg-white p-3">
                  <form
                    onSubmit={handleSend}
                    className="flex items-center gap-2 rounded-full border border-navy/15 bg-gray-50 p-1 pl-4 focus-within:border-[#c68b59] focus-within:ring-2 focus-within:ring-[#c68b59]/20 transition-all"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-transparent text-sm font-ui text-navy outline-none placeholder:text-navy/40"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#c68b59] text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      aria-label="Send message"
                    >
                      <FaPaperPlane className="text-sm -ml-0.5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Component (Pill shaped) */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex h-[52px] items-center gap-3 overflow-hidden rounded-full bg-[#081F52] pl-1 pr-6 text-white shadow-lift focus-ring"
        aria-label="Toggle Chat"
      >
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#c68b59] shadow-inner transition-transform group-hover:rotate-12">
          <FaRobot className="text-xl" />
        </div>
        <span className="font-serif text-[17px] font-bold tracking-wide mt-0.5">Clap AI</span>
      </motion.button>
    </>
  );
}
