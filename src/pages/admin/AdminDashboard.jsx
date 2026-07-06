import { useEffect, useState } from 'react';
import { FaBlog, FaBriefcase, FaEnvelopeOpenText, FaFolderOpen, FaServicestack, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/ui/SEO';
import { adminApi } from '../../services/adminApi';

const cards = [
  { label: 'Leads', key: 'leads', icon: FaEnvelopeOpenText, href: '/admin/leads' },
  { label: 'Blogs', key: 'blogs', icon: FaBlog, href: '/admin/blogs' },
  { label: 'Careers', key: 'careers', icon: FaBriefcase, href: '/admin/careers' },
  { label: 'Portfolio', key: 'portfolio', icon: FaFolderOpen, href: '/admin/portfolio' },
  { label: 'Services', key: 'services', icon: FaServicestack, href: '/admin/services' },
  { label: 'Subscribers', key: 'subscribers', icon: FaUsers, href: '/admin/subscribers' }
];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    adminApi
      .analytics()
      .then(({ data }) => setAnalytics(data))
      .catch(() => setAnalytics({}));
  }, []);

  return (
    <main className="container-page py-8 lg:py-10">
      <SEO title="Admin Dashboard" path="/admin" />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-royal">Analytics</p>
          <h1 className="font-heading text-4xl font-bold text-ink">Dashboard</h1>
        </div>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.key} className="surface rounded-lg p-6 transition hover:-translate-y-1 hover:shadow-lift" to={card.href}>
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-navy">
                <Icon />
              </span>
              <p className="mt-5 text-sm font-semibold text-muted">{card.label}</p>
              <p className="mt-1 font-heading text-4xl font-bold text-navy">{analytics[card.key] ?? 0}</p>
            </Link>
          );
        })}
      </div>
      <div className="surface mt-8 rounded-lg p-6">
        <h2 className="font-heading text-2xl font-bold text-ink">Quick view</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Metric label="Contact Requests" value={analytics.contactLeads ?? 0} />
          <Metric label="Consultation Requests" value={analytics.consultationLeads ?? 0} />
          <Metric label="Newsletter Subscribers" value={analytics.subscribers ?? 0} />
        </div>
      </div>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-light p-4">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="mt-2 font-heading text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}







