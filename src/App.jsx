import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { PublicLayout } from './components/layout/PublicLayout';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { GoogleAnalytics } from './components/ui/GoogleAnalytics';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { IntroSplash } from './components/ui/IntroSplash';
import { SmoothScrollProvider } from './components/ui/SmoothScrollProvider';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const AISolutions = lazy(() => import('./pages/AISolutions'));
const Industries = lazy(() => import('./pages/Industries'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const FreeConsultation = lazy(() => import('./pages/FreeConsultation'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminResource = lazy(() => import('./pages/admin/AdminResource'));

export default function App() {
  return (
    <ErrorBoundary>
      <SmoothScrollProvider>
        <CustomCursor />
        <ScrollProgress />
        <IntroSplash />
        <GoogleAnalytics />
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="ai-solutions" element={<AISolutions />} />
              <Route path="industries" element={<Industries />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="about" element={<About />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact" element={<Contact />} />
              <Route path="free-consultation" element={<FreeConsultation />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<TermsConditions />} />
              <Route path="404" element={<NotFound />} />
            </Route>

            <Route path="admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path=":resource" element={<AdminResource />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </SmoothScrollProvider>
    </ErrorBoundary>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
