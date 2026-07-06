import { PageHeader } from '../components/ui/PageHeader';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';

export default function TermsConditions() {
  return (
    <PageTransition>
      <SEO title="Terms & Conditions" path="/terms-and-conditions" />
      <PageHeader
        eyebrow="Terms & Conditions"
        title="Terms for using IdeaClap India services and website."
        description="These terms outline general expectations for enquiries, proposals, project delivery, payments, and website usage."
      />
      <section className="bg-light py-16">
        <div className="container-page">
          <div className="surface prose prose-slate max-w-none rounded-lg p-6 leading-8">
            <h2>Website Use</h2>
            <p>Use this website lawfully and avoid attempting to disrupt, misuse, or access protected systems.</p>
            <h2>Project Scope</h2>
            <p>Project timelines, pricing, deliverables, revisions, and support terms are confirmed through written proposals or agreements.</p>
            <h2>Payments</h2>
            <p>Payments, milestones, refunds, and renewals are governed by the agreed project or service terms.</p>
            <h2>Third-Party Services</h2>
            <p>Some projects may rely on hosting, email, analytics, ads, Cloudinary, MongoDB Atlas, payment gateways, or other third-party platforms.</p>
            <h2>Contact</h2>
            <p>For terms-related questions, contact hello@ideaclapindia.com.</p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}







