import { FaCheckCircle } from 'react-icons/fa';
import { LeadForm } from '../components/ui/LeadForm';
import { PageHeader } from '../components/ui/PageHeader';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';

const benefits = [
  'Website and lead-flow audit',
  'AI automation opportunities',
  'Digital marketing next steps',
  'Clear scope and timeline recommendation'
];

export default function FreeConsultation() {
  return (
    <PageTransition>
      <SEO
        title="Free Consultation"
        path="/free-consultation"
        description="Book a free business consultation with IdeaClap India."
      />
      <PageHeader
        eyebrow="Free Consultation"
        title="Get a clear digital growth plan before you spend."
        description="Use this call to understand what your business needs first: website, AI automation, ads, SEO, app, or internal software."
      />
      <section className="bg-light py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg bg-navy p-7 text-white shadow-lift">
            <h2 className="font-heading text-3xl font-bold">What you will get</h2>
            <div className="mt-6 grid gap-4">
              {benefits.map((benefit) => (
                <span key={benefit} className="flex items-center gap-3 text-sm text-white/85">
                  <FaCheckCircle className="text-accent" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
          <LeadForm type="consultation" title="Book your free consultation" />
        </div>
      </section>
    </PageTransition>
  );
}







