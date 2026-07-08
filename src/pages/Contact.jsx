import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp, FaLinkedin, FaArrowRight, FaPaperPlane } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';
import { publicApi } from '../services/publicApi';
import { getErrorMessage } from '../services/http';
import { useToast } from '../context/ToastContext';
import { siteConfig } from '../utils/content';

const businessTypes = ['Restaurant', 'Clinic', 'Hospital', 'Gym', 'Retail', 'Coaching', 'Hotel', 'Real Estate', 'Startup', 'Enterprise', 'Other'];

function PremiumField({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[11px] font-bold font-ui uppercase tracking-widest text-navy/50">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { pushToast } = useToast();
  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const submit = async (data) => {
    setLoading(true);
    try {
      await publicApi.submitContact(data);
      reset();
      pushToast('Thanks! Our team will contact you shortly.', 'success');
    } catch (error) {
      pushToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-navy/10 bg-white text-sm font-ui text-navy placeholder-navy/30 focus:outline-none focus:border-[#c68b59]/60 focus:ring-2 focus:ring-[#c68b59]/10 transition-all duration-200 shadow-sm";

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <PremiumField label="Full Name" error={errors.name?.message}>
          <input className={inputClass} {...register('name', { required: 'Name is required' })} placeholder="Your name" />
        </PremiumField>
        <PremiumField label="Phone Number" error={errors.phone?.message}>
          <input className={inputClass} {...register('phone', { required: 'Phone is required' })} placeholder="+91 98765 43210" />
        </PremiumField>
        <PremiumField label="Email Address" error={errors.email?.message}>
          <input type="email" className={inputClass} {...register('email', { required: 'Email is required' })} placeholder="you@company.com" />
        </PremiumField>
        <PremiumField label="Company Name" error={errors.company?.message}>
          <input className={inputClass} {...register('company')} placeholder="Your company" />
        </PremiumField>
        <PremiumField label="Business Type" error={errors.businessType?.message} className="sm:col-span-2">
          <select className={inputClass} {...register('businessType', { required: 'Business type is required' })} defaultValue="">
            <option value="" disabled>Select your business type</option>
            {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </PremiumField>
        <PremiumField label="Your Message" error={errors.message?.message} className="sm:col-span-2">
          <textarea rows={4} className={`${inputClass} resize-none`} {...register('message', { required: 'Message is required' })} placeholder="Tell us what you want to build, improve, or automate..." />
        </PremiumField>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="w-full flex items-center justify-center gap-2.5 rounded-full py-4 text-sm font-semibold font-ui bg-[#081F52] text-white shadow-[0_8px_24px_rgba(8,31,82,0.3)] hover:shadow-[0_14px_36px_rgba(8,31,82,0.45)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
      >
        <FaPaperPlane className="text-xs" />
        {loading ? 'Sending...' : 'Send Message'}
      </motion.button>
    </form>
  );
}

export default function Contact() {
  const contactItems = [
    { icon: FaEnvelope, label: 'Email Us', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: FaPhoneAlt, label: 'Call Us', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Virtual PAN India', href: null },
  ];

  return (
    <PageTransition>
      <SEO
        title="Contact IdeaClap India Private Limited"
        path="/contact"
        description="Contact IdeaClap India for custom websites, AI solutions, digital marketing, and business automation."
      />

      {/* ── HERO HEADER ── */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed border-b border-[rgba(198,139,89,0.12)] pt-28 pb-16" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="z-10 relative container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#c68b59] mb-6">
              Contact
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-navy font-bold leading-tight max-w-3xl">
              Tell Us What You Want<br />
              to <span className="italic text-[#c68b59]">Build, Improve,</span><br />
              or Automate.
            </h1>
            <p className="mt-6 text-base font-light font-ui text-navy/60 leading-[1.85] max-w-xl">
              Share your requirement and our team will reach out with the next best steps — usually within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTACT GRID ── */}
      <section className="bg-white py-0">
        <div className="container-page grid lg:grid-cols-[0.9fr_1.1fr] gap-0 min-h-[680px]">

          {/* LEFT — Dark Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="relative bg-[#081F52] rounded-none lg:rounded-bl-3xl lg:rounded-tl-none py-14 px-8 lg:px-12 flex flex-col justify-between overflow-hidden"
          >
            {/* Soft glow blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#c68b59]/8 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#0B2F78]/60 blur-[70px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-serif text-2xl md:text-3xl text-white font-bold mb-3 leading-snug">
                Let's Start a<br /><span className="italic text-[#c68b59]">Conversation.</span>
              </h2>
              <p className="text-sm font-light font-ui text-white/55 leading-[1.85] mb-10 max-w-xs">
                Whether you have a project in mind or just want to explore — we're happy to talk.
              </p>

              {/* Contact Cards */}
              <div className="space-y-5">
                {contactItems.map((item, i) => {
                  const Icon = item.icon;
                  const content = (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
                      whileHover={{ x: 4 }}
                      className="group flex items-center gap-4 cursor-default"
                    >
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#c68b59]/15 text-[#c68b59] text-base group-hover:bg-[#c68b59]/25 transition-colors duration-300">
                        <Icon />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold font-ui uppercase tracking-widest text-white/35 mb-0.5">{item.label}</p>
                        <p className="text-sm font-medium font-ui text-white/85 leading-snug">{item.value}</p>
                      </div>
                    </motion.div>
                  );
                  return item.href
                    ? <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{content}</a>
                    : <div key={item.label}>{content}</div>;
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex items-center gap-4">
              <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-white/30">Follow us</span>
              {[
                { icon: FaLinkedin, href: 'https://www.linkedin.com/company/ideaclap/', label: 'LinkedIn' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300">
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.15 }}
            className="bg-white py-14 px-8 lg:px-12 border border-[rgba(198,139,89,0.1)] lg:border-l-0 rounded-br-3xl"
          >
            <div className="mb-8">
              <h2 className="font-serif text-2xl md:text-3xl text-navy font-bold mb-2">
                Send Us Your <span className="italic text-[#c68b59]">Requirement.</span>
              </h2>
              <p className="text-sm font-light font-ui text-navy/50 leading-relaxed">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ QUICK LINKS ── */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed py-20 border-t border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { q: 'Need AI implementation?', desc: 'We build custom chatbots, voice bots, and AI automations for your business.', cta: 'View AI Solutions', href: '/ai-solutions' },
              { q: 'Looking for a custom website?', desc: 'Premium website design and development tailored to your brand and goals.', cta: 'See Our Services', href: '/services' },
              { q: 'Want to join IdeaClap India Private Limited?', desc: "We're always looking for talented people to join our growing team.", cta: 'View Openings', href: '/careers' },
            ].map((item, i) => (
              <motion.div key={i} custom={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-[#c68b59]/12 bg-white p-6 shadow-sm hover:shadow-lift hover:border-[#c68b59]/40 transition-all duration-300"
              >
                <h3 className="font-serif text-base font-semibold text-navy mb-2">{item.q}</h3>
                <p className="text-sm font-light font-ui text-navy/55 leading-relaxed mb-5">{item.desc}</p>
                <a href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold font-ui uppercase tracking-widest text-[#c68b59] group-hover:gap-3 transition-all duration-300">
                  {item.cta} <FaArrowRight className="text-[9px]" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
