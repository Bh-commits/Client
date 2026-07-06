import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaBlog,
  FaChartPie,
  FaCommentDots,
  FaEnvelopeOpenText,
  FaFileAlt,
  FaFolderOpen,
  FaServicestack,
  FaSignOutAlt,
  FaSuitcase,
  FaUsers
} from 'react-icons/fa';

const links = [
  { label: 'Dashboard', href: '/admin', icon: FaChartPie },
  { label: 'Services', href: '/admin/services', icon: FaServicestack },
  { label: 'Portfolio', href: '/admin/portfolio', icon: FaFolderOpen },
  { label: 'Leads', href: '/admin/leads', icon: FaEnvelopeOpenText },
  { label: 'Blogs', href: '/admin/blogs', icon: FaBlog },
  { label: 'Careers', href: '/admin/careers', icon: FaSuitcase },
  { label: 'Testimonials', href: '/admin/testimonials', icon: FaCommentDots },
  { label: 'Subscribers', href: '/admin/subscribers', icon: FaUsers },
  { label: 'Applications', href: '/admin/applications', icon: FaFileAlt }
];

export function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('ideaclap_admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-light">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 lg:block">
        <div className="flex items-center gap-3">
          <img className="h-16 w-16 rounded-lg object-contain" src="/logo.svg" alt="" />
          <span className="font-heading text-xl font-bold text-navy">Admin</span>
        </div>
        <nav className="mt-8 grid gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.href}
                end={link.href === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold ${
                    isActive ? 'bg-navy text-white' : 'text-slate-700 hover:bg-navy/5'
                  }`
                }
                to={link.href}
              >
                <Icon />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
        <button
          type="button"
          className="focus-ring mt-8 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <FaSignOutAlt />
          Sign out
        </button>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur lg:hidden">
          <div className="container-page flex min-h-16 items-center justify-between">
            <span className="font-heading text-xl font-bold text-navy">IdeaClap Admin</span>
            <button className="text-sm font-semibold text-red-600" type="button" onClick={logout}>
              Sign out
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}






