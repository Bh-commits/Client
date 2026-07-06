import { ButtonLink } from '../components/ui/ButtonLink';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';

export default function NotFound() {
  return (
    <PageTransition>
      <SEO title="404" path="/404" />
      <section className="flex min-h-screen items-center bg-light pt-20">
        <div className="container-page text-center">
          <p className="font-heading text-8xl font-extrabold text-accent">404</p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-ink">Page not found</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">The page you are looking for may have moved or no longer exists.</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/">Back to Home</ButtonLink>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}







