import { motion } from 'framer-motion';
import { PageHeader } from '../components/ui/PageHeader';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';

const sections = [
  {
    title: 'Information We Collect',
    content:
      'We collect information you voluntarily submit through our forms — including your name, phone number, email address, company name, business type, message, resume, and consultation requirements. We do not collect any sensitive personal data unless explicitly provided.',
  },
  {
    title: 'How We Use Your Information',
    content:
      'Your information is used solely to respond to enquiries, provide service proposals, manage job applications, send relevant service updates, and continuously improve our offerings. We do not use your data for unrelated marketing purposes.',
  },
  {
    title: 'Data Sharing',
    content:
      'We do not sell, rent, or trade personal data with third parties. We may share data with trusted infrastructure providers for hosting, email delivery, analytics, file storage, and operational workflows — all bound by confidentiality agreements.',
  },
  {
    title: 'Data Retention',
    content:
      'Enquiry and application data is retained for as long as necessary for business communication, compliance with applicable laws, and service improvement. You may request deletion of your personal data at any time by contacting us.',
  },
  {
    title: 'Your Rights',
    content:
      'You have the right to access, correct, or delete personal information we hold about you. You may also opt out of communications at any time. To exercise these rights, please contact us at operations@ideaclapindia.com.',
  },
  {
    title: 'Cookies & Analytics',
    content:
      'Our website may use cookies and third-party analytics tools (such as Google Analytics) to understand site usage and improve user experience. You can disable cookies in your browser settings at any time.',
  },
  {
    title: 'Contact Us',
    content:
      'For any privacy-related queries, data requests, or concerns, please reach out to us at operations@ideaclapindia.com or call us at +91 70672 44561. We aim to respond within 2 business days.',
  },
];

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <SEO
        title="Privacy Policy"
        path="/privacy-policy"
        description="Learn how IdeaClap India collects, uses, and protects your personal information."
      />

      {/* ── HERO ── */}
      <PageHeader
        eyebrow="Privacy Policy"
        title="How IdeaClap India handles your information."
        description="This policy explains what we collect, why we collect it, and how your business enquiry data is handled — transparently and responsibly."
      />

      {/* ── CONTENT ── */}
      <section
        className="relative bg-cover bg-center bg-no-repeat bg-fixed py-20 md:py-28 border-b border-gray-200"
        style={{ backgroundImage: "url('/careers_bg.png')" }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] pointer-events-none z-0" />
        <div className="relative z-10 container-page max-w-3xl">

          {/* Last updated */}
          <p className="text-xs font-bold font-ui uppercase tracking-[0.2em] text-[#c68b59] mb-10">
            Last updated: July 2026
          </p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-white/80 backdrop-blur-sm border border-[rgba(198,139,89,0.12)] rounded-2xl p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c68b59]/15 text-[#c68b59] text-xs font-bold font-ui">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-serif text-lg md:text-xl text-[#081F52] font-semibold leading-snug">
                    {section.title}
                  </h2>
                </div>
                <div className="w-12 h-[2px] rounded-full bg-[#c68b59]/40 mb-4" />
                <p className="text-sm font-light font-ui text-navy/70 leading-[1.85]">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
