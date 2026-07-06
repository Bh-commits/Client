import { PageHeader } from '../components/ui/PageHeader';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <SEO title="Privacy Policy" path="/privacy-policy" />
      <PageHeader
        eyebrow="Privacy Policy"
        title="How IdeaClap India handles your information."
        description="This policy explains what we collect, why we collect it, and how business enquiries are handled."
      />
      <LegalContent>
        <h2>Information We Collect</h2>
        <p>We collect information you submit through forms, including name, phone, email, company, business type, message, resume, and consultation requirements.</p>
        <h2>How We Use It</h2>
        <p>We use your information to respond to enquiries, provide proposals, manage applications, send relevant updates, and improve our services.</p>
        <h2>Data Sharing</h2>
        <p>We do not sell personal data. We may use trusted infrastructure providers for hosting, email, analytics, file storage, and operational workflows.</p>
        <h2>Retention</h2>
        <p>We retain enquiry and application data for as long as needed for business communication, compliance, and service improvement.</p>
        <h2>Contact</h2>
        <p>For privacy requests, contact hello@ideaclapindia.com.</p>
      </LegalContent>
    </PageTransition>
  );
}

function LegalContent({ children }) {
  return (
    <section className="bg-light py-16">
      <div className="container-page">
        <div className="surface prose prose-slate max-w-none rounded-lg p-6 leading-8">{children}</div>
      </div>
    </section>
  );
}







