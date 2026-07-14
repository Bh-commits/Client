import { motion } from 'framer-motion';
import { PageHeader } from '../components/ui/PageHeader';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';

const sections = [
  {
    title: 'Website Use',
    content:
      'By accessing and using this website, you agree to use it lawfully and in accordance with applicable Indian laws. You must not attempt to disrupt, misuse, reverse-engineer, or gain unauthorized access to any protected systems, data, or infrastructure associated with IdeaClap India.',
  },
  {
    title: 'Project Scope & Deliverables',
    content:
      'All project timelines, pricing, deliverables, revision rounds, and post-delivery support terms are confirmed exclusively through written proposals, work orders, or signed agreements. Verbal commitments not documented in writing are not binding.',
  },
  {
    title: 'Payments & Refunds',
    content:
      'Payment schedules, milestone-based billing, refund eligibility, and renewal terms are governed by the project-specific agreement. Generally, advance payments made for completed milestones are non-refundable unless stated otherwise in writing.',
  },
  {
    title: 'Intellectual Property',
    content:
      'Upon full payment, the client receives ownership of the final deliverables as agreed. IdeaClap India retains rights to frameworks, tools, libraries, and internal methodologies developed independently. We may display completed work in our portfolio unless confidentiality is requested in writing.',
  },
  {
    title: 'Third-Party Services',
    content:
      'Some projects may depend on third-party platforms including hosting providers, email delivery services, analytics tools, payment gateways, cloud infrastructure (e.g., AWS, MongoDB Atlas), AI APIs, and ad platforms. IdeaClap India is not liable for downtime, policy changes, or service disruptions caused by these providers.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'IdeaClap India is not liable for indirect, incidental, or consequential damages arising from the use or inability to use our services. Our total liability in any circumstance is limited to the amount paid for the relevant service.',
  },
  {
    title: 'Governing Law',
    content:
      'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh, India.',
  },
  {
    title: 'Contact Us',
    content:
      'For any questions regarding these Terms & Conditions, please contact us at operations@ideaclapindia.com or call +91 70672 44561. We aim to respond within 2 business days.',
  },
];

export default function TermsConditions() {
  return (
    <PageTransition>
      <SEO
        title="Terms & Conditions"
        path="/terms-and-conditions"
        description="Terms and conditions for using IdeaClap India's services, website, and project deliverables."
      />

      {/* ── HERO ── */}
      <PageHeader
        eyebrow="Terms & Conditions"
        title="Terms for using IdeaClap India services and website."
        description="These terms outline the general expectations for enquiries, proposals, project delivery, payments, and website usage. Please read them carefully."
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

          {/* Agreement notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 rounded-2xl border border-[#c68b59]/25 bg-[#c68b59]/5 p-6 text-center"
          >
            <p className="text-sm font-ui text-navy/60 leading-relaxed">
              By using this website or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
