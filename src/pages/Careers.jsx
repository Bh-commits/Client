import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import {
  FaRocket, FaGlobe, FaRobot, FaDollarSign, FaBook, FaHeart,
  FaLaptopCode, FaChartLine, FaTrophy, FaUsers, FaArrowRight,
  FaTimes, FaMapMarkerAlt, FaBriefcase, FaClock, FaCheckCircle,
  FaSearch, FaPaperPlane, FaAngleDown
} from 'react-icons/fa';
import { PageTransition } from '../components/ui/PageTransition';
import { SEO } from '../components/ui/SEO';
import { publicApi } from '../services/publicApi';
import { getErrorMessage } from '../services/http';
import { useToast } from '../context/ToastContext';

/* ── Animated Counter ── */
function Counter({ end, suffix = '', label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const numeric = parseInt(end, 10);
    const duration = 2000;
    const step = numeric / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-5xl md:text-6xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-ui font-light text-white/60 uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ── Floating Particles ── */
function Particles() {
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i, x: `${(i * 7.3) % 90 + 5}%`, y: `${(i * 11.7) % 90 + 5}%`,
    size: 2 + (i % 3), duration: 5 + (i % 5), delay: i * 0.4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <motion.div key={p.id}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          className="absolute rounded-full bg-[#c68b59]"
        />
      ))}
    </div>
  );
}

const ALL_JOBS = [
  {
    id: 1,
    title: 'Business Development Intern',
    dept: 'Sales',
    type: 'Internship',
    mode: 'Remote',
    location: 'PAN India',
    skills: ['Lead Generation', 'Client Communication', 'Research', 'CRM Basics'],
    stipend: 'Stipend Provided',
    duration: '3 Months'
  },
  {
    id: 2,
    title: 'HR Intern',
    dept: 'HR',
    type: 'Internship',
    mode: 'Remote',
    location: 'PAN India',
    skills: ['Recruitment', 'Screening', 'Communication', 'HR Tools'],
    stipend: 'Stipend Provided',
    duration: '3 Months'
  },
  {
    id: 3,
    title: 'Tech Intern (MERN / Python / AI)',
    dept: 'Engineering',
    type: 'Internship',
    mode: 'Remote',
    location: 'PAN India',
    skills: ['React', 'Node.js', 'Python', 'MongoDB'],
    stipend: 'Stipend Provided',
    duration: '3 Months'
  },
  {
    id: 4,
    title: 'Research Associate Intern',
    dept: 'Research',
    type: 'Internship',
    mode: 'Remote',
    location: 'PAN India',
    skills: ['Market Research', 'Data Analysis', 'Reporting', 'Excel'],
    stipend: 'Stipend Provided',
    duration: '3 Months'
  },
];


const TYPE_FILTERS = ['All', 'Engineering', 'Sales', 'HR', 'Research'];
const DEPT_COLORS = {
  Engineering: '#4f7cff', Sales: '#c68b59', Marketing: '#2ecc71',
  Design: '#e91e8c', HR: '#ff6b6b', Content: '#9b59b6', Research: '#f39c12'
};

const WHY_CARDS = [
  { icon: FaRocket, title: 'Fast Growth', desc: 'Move fast, take ownership, and grow quickly in a lean startup environment.' },
  { icon: FaGlobe, title: 'Remote Opportunities', desc: 'Work from anywhere across India with full flexibility and trust.' },
  { icon: FaRobot, title: 'AI First Company', desc: 'Work on real-world AI projects and tools at the cutting edge of technology.' },
  { icon: FaDollarSign, title: 'Performance Rewards', desc: 'Earn bonuses tied directly to your impact and contribution.' },
  { icon: FaBook, title: 'Learning Culture', desc: 'Access courses, mentors, and resources to continuously level up your skills.' },
  { icon: FaHeart, title: 'Friendly Team', desc: 'Collaborate with a diverse, supportive, and driven team that cares.' },
];

const BENEFITS = [
  { icon: FaLaptopCode, title: 'Latest AI Tools', desc: 'Use the latest AI and cloud tools in your day-to-day work.' },
  { icon: FaGlobe, title: 'Remote Friendly', desc: 'Work from any location across India without restrictions.' },
  { icon: FaBook, title: 'Learning Budget', desc: 'Get access to courses and certifications that enhance your growth.' },
  { icon: FaTrophy, title: 'Performance Bonuses', desc: 'Earn increments and bonuses tied to your contribution to the team.' },
  { icon: FaUsers, title: 'Supportive Team', desc: 'Work with a positive, collaborative, and growth-oriented team.' },
  { icon: FaChartLine, title: 'Career Growth', desc: 'Get promoted based on merit and grow into leadership roles quickly.' },
];

const PROCESS = [
  'Application', 'Resume Review', 'Initial Interview',
  'Technical / Practical Round', 'Final Discussion', 'Offer Letter'
];

export default function Careers() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeJob, setActiveJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', portfolio: '', resume: null, message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pushToast } = useToast();

  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start center', 'end center'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const filteredJobs = ALL_JOBS.filter(j => {
    const matchDept = filter === 'All' || j.dept === filter;
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.dept.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullName', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('linkedin', form.linkedin || '');
    formData.append('portfolio', form.portfolio || '');
    formData.append('coverMessage', form.message || '');

    if (form.resume) {
      formData.append('resume', form.resume);
    } else {
      pushToast('Please select a resume file to upload.', 'error');
      setLoading(false);
      return;
    }

    // fallback target job ID or generic application
    const jobId = activeJob?.id || 'general';

    try {
      await publicApi.applyForJob(jobId, formData);
      setSubmitted(true);
      pushToast('Application submitted successfully!', 'success');
      setTimeout(() => {
        setSubmitted(false);
        setActiveJob(null);
        setForm({ name: '', email: '', phone: '', linkedin: '', portfolio: '', resume: null, message: '' });
      }, 3000);
    } catch (err) {
      pushToast(getErrorMessage(err), 'error');
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: i * 0.06 } })
  };

  return (
    <PageTransition>
      <SEO
        title="Careers at IdeaClap India Private Limited"
        path="/careers"
        description="Join IdeaClap India — build the future with AI, technology, and creativity. Explore open roles in engineering, marketing, sales, design, and more."
      />

      {/* ══════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center bg-[#081F52] overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-10 z-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(198,139,89,0.2) 10%, transparent 11%)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#c68b59]/8 blur-[140px] pointer-events-none z-0" />
        <div className="absolute -bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0B2F78]/50 blur-[120px] pointer-events-none z-0" />
        <Particles />

        <div className="container-page relative z-10 text-center max-w-4xl mx-auto py-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#c68b59] mb-8"
          >
            Join IdeaClap India Private Limited
          </motion.span>

          {/* Word-by-word headline reveal */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] text-white mb-8">
            {['Build', 'the', 'Future', 'with'].map((word, i) => (
              <motion.span key={word} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }} className="inline-block mr-[0.3em]">
                {word}
              </motion.span>
            ))}
            <br />
            {['AI', '&', 'Technology.'].map((word, i) => (
              <motion.span key={word} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.12 }}
                className={`inline-block mr-[0.3em] ${word !== '&' && word !== 'AI' ? 'italic text-[#c68b59]' : ''}`}>
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="font-ui font-light text-lg leading-[1.85] text-white/60 max-w-xl mx-auto mb-12"
          >
            IdeaClap India Private Limited is a fast-growing AI & digital agency. Join our team and work on cutting-edge technology, real business problems, and ambitious goals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a href="#openings" whileHover={{ y: -5 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold bg-white text-[#081F52] shadow-soft hover:shadow-[0_12px_32px_rgba(255,255,255,0.2)] transition-shadow">
              Explore Open Roles <FaArrowRight className="text-xs" />
            </motion.a>
            <motion.a href="#life" whileHover={{ y: -5 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/50 transition-all">
              Life at IdeaClap India Private Limited
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. WHY WORK WITH IDEACLAP
      ══════════════════════════════════════════ */}
      <section id="life" className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 md:py-32 border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="container-page relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">Why IdeaClap India Private Limited</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navy font-bold">
              Why Work <span className="italic text-[#c68b59]">With Us?</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.title} custom={i} variants={cardVariants}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  className="group relative rounded-3xl border border-[rgba(8,31,82,0.06)] bg-white/80 backdrop-blur-sm p-8 shadow-[0_4px_24px_rgba(8,31,82,0.02)] hover:shadow-[0_24px_48px_rgba(8,31,82,0.08)] hover:border-[#c68b59]/40 transition-colors duration-500 overflow-hidden cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c68b59]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c68b59]/10 text-[#c68b59] text-2xl mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
                    <Icon />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-navy mb-3">{card.title}</h3>
                  <p className="text-sm font-light font-ui leading-[1.85] text-navy/60">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. STATS
      ══════════════════════════════════════════ */}
      <section className="bg-[#081F52] py-20 border-b border-white/5">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-10">
          <Counter end="40" suffix="+" label="Team Members" />
          <Counter end="25" suffix="+" label="Open Roles" />
          <Counter end="150" suffix="+" label="Projects" />
          <Counter end="98" suffix="%" label="Employee Satisfaction" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. CURRENT OPENINGS
      ══════════════════════════════════════════ */}
      <section id="openings" className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 md:py-32 border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="container-page relative z-10">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">Current Openings</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navy font-bold">
              Find Your <span className="italic text-[#c68b59]">Perfect Role.</span>
            </h2>
          </motion.div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10 max-w-4xl mx-auto">
            <div className="relative w-full sm:max-w-sm">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30 text-sm" />
              <input
                type="text" placeholder="Search roles..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-navy/15 bg-white text-sm font-ui text-navy placeholder-navy/40 focus:outline-none focus:border-[#c68b59]/50 transition-colors shadow-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {TYPE_FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold font-ui uppercase tracking-widest border transition-all duration-300 ${filter === f ? 'bg-[#081F52] text-white border-[#081F52]' : 'border-navy/15 text-navy/60 hover:border-[#c68b59]/50 bg-white'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredJobs.map((job, i) => (
                <motion.div
                  layout key={job.id} custom={i} variants={cardVariants}
                  initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  className="group relative flex flex-col justify-between rounded-3xl border border-[rgba(8,31,82,0.06)] bg-white/80 backdrop-blur-sm p-6 shadow-[0_4px_24px_rgba(8,31,82,0.02)] hover:shadow-[0_24px_48px_rgba(8,31,82,0.08)] hover:border-[#c68b59]/40 transition-colors duration-500 overflow-hidden cursor-pointer"
                  onClick={() => setActiveJob(job)}
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${DEPT_COLORS[job.dept] || '#c68b59'}, transparent)` }} />

                  <div className="mb-6">
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <span className="inline-block text-[10px] font-bold font-ui uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors duration-500"
                        style={{ color: DEPT_COLORS[job.dept] || '#c68b59', borderColor: `${DEPT_COLORS[job.dept]}25` || '#c68b5925', background: `${DEPT_COLORS[job.dept]}12` || '#c68b5912' }}>
                        {job.dept}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-navy leading-snug mb-4 group-hover:text-[#c68b59] transition-colors duration-500">{job.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-ui font-semibold uppercase tracking-widest text-navy/40">
                        <FaBriefcase className="text-[10px]" /> {job.type}
                      </span>
                      <span className="text-navy/20">•</span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-ui font-semibold uppercase tracking-widest text-navy/40">
                        <FaMapMarkerAlt className="text-[10px]" /> {job.mode}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 inline-flex items-center justify-between w-full gap-1 text-xs font-semibold font-ui uppercase tracking-widest text-navy/40 group-hover:text-[#c68b59] border-t border-[rgba(8,31,82,0.05)] pt-5 group-hover:border-[#c68b59]/20 group-hover:gap-3 transition-all duration-500">
                    Apply Now
                    <FaArrowRight className="text-[10px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredJobs.length === 0 && (
            <p className="text-center text-navy/40 font-ui font-light py-16">No roles match your search. Try a different filter.</p>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. HIRING PROCESS TIMELINE
      ══════════════════════════════════════════ */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 md:py-32 border-b border-[rgba(198,139,89,0.12)] overflow-hidden" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="container-page relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">How We Hire</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navy font-bold">
              Our Hiring <span className="italic text-[#c68b59]">Process.</span>
            </h2>
          </motion.div>

          <div ref={timelineRef} className="relative max-w-2xl mx-auto">
            {/* Glowing scroll-track line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-navy/5 -translate-x-1/2">
              <motion.div className="w-full bg-[#c68b59] rounded-full" style={{ height: '100%', scaleY, originY: 0 }}
                animate={{ boxShadow: ['0 0 0px #c68b59', '0 0 16px #c68b59', '0 0 0px #c68b59'] }}
                transition={{ duration: 2, repeat: Infinity }} />
            </div>

            {PROCESS.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={idx} className="relative z-10 flex items-center mb-16 last:mb-0">
                  {/* Node circle */}
                  <motion.div
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                    viewport={{ once: true }} transition={{ type: 'spring', delay: idx * 0.1 }}
                    className="absolute left-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-2 border-[#c68b59] bg-white z-20 shadow-[0_0_12px_rgba(198,139,89,0.4)]"
                  />
                  {/* Step number */}
                  <div className="absolute left-1/2 -translate-x-1/2 mt-[30px] text-[10px] font-bold font-ui text-[#c68b59] z-20">{String(idx + 1).padStart(2, '0')}</div>

                  {/* Content left */}
                  <div className="w-1/2 pr-10 text-right hidden sm:block">
                    {isLeft && (
                      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
                        <h3 className="font-serif text-xl font-semibold text-navy">{step}</h3>
                      </motion.div>
                    )}
                  </div>

                  {/* Content right */}
                  <div className="w-1/2 pl-10 text-left hidden sm:block">
                    {!isLeft && (
                      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
                        <h3 className="font-serif text-xl font-semibold text-navy">{step}</h3>
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="w-full pl-[60%] text-left block sm:hidden">
                    <h3 className="font-serif text-base font-semibold text-navy">{step}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. BENEFITS
      ══════════════════════════════════════════ */}
      <section className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 md:py-32 border-b border-[rgba(198,139,89,0.12)]" style={{ backgroundImage: "url('/careers_bg.png')" }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none z-0"></div>
        <div className="container-page relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c68b59] mb-4">Perks & Culture</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navy font-bold">
              Employee <span className="italic text-[#c68b59]">Benefits.</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} custom={i} variants={cardVariants}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  className="group relative rounded-3xl border border-[rgba(8,31,82,0.06)] bg-white/80 backdrop-blur-sm p-8 shadow-[0_4px_24px_rgba(8,31,82,0.02)] hover:shadow-[0_24px_48px_rgba(8,31,82,0.08)] hover:border-[#c68b59]/40 transition-colors duration-500 overflow-hidden cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#c68b59]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c68b59]/10 text-[#c68b59] text-2xl mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
                    <Icon />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-navy mb-3">{b.title}</h3>
                  <p className="text-sm font-light font-ui leading-[1.85] text-navy/60">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. CTA
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#081F52] py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c68b59]/5 blur-[120px] pointer-events-none z-0" />
        <div className="container-page relative z-10 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ type: 'spring', stiffness: 80, damping: 18 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c68b59]/30 bg-[#c68b59]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#c68b59] mb-6">Open Application</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight mb-4">
              Didn't Find a <br /><span className="italic text-[#c68b59]">Suitable Role?</span>
            </h2>
            <p className="text-muted/70 text-base font-light font-ui leading-[1.85] mb-10 max-w-sm mx-auto">
              We're always looking for talented people. Send us your resume and we'll reach out.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                onClick={() => setActiveJob({ id: 'general', title: 'General Application', dept: 'General', type: 'Full-time', mode: 'Remote', duration: 'Permanent', location: 'Virtual PAN India', stipend: 'Competitive Salary', skills: ['Self Motivation', 'Growth Mindset'] })}
                whileHover={{ y: -6, scale: 1.03 }} whileTap={{ y: -1, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold bg-white text-[#081F52] shadow-soft hover:shadow-[0_12px_32px_rgba(255,255,255,0.25)] transition-all duration-300">
                <FaPaperPlane className="text-xs" /> Upload Resume
              </motion.button>
            </div>
            <p className="mt-6 text-white/40 text-xs font-ui tracking-widest">operations@ideaclapindia.com</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CENTER APPLICATION POPUP
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {activeJob && (
          <>
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveJob(null)}
              className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-[90]" />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="fixed inset-x-4 top-[5vh] bottom-[5vh] z-[100] mx-auto w-auto max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl sm:inset-x-6"
            >
              {/* Popup Header */}
              <div className="sticky top-0 bg-white border-b border-navy/8 px-5 py-5 flex items-start justify-between z-10 sm:px-7">
                <div>
                  <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-[#c68b59] block mb-1">
                    {activeJob.dept}
                  </span>
                  <h2 className="font-serif text-2xl font-semibold text-navy">{activeJob.title}</h2>
                </div>
                <button onClick={() => setActiveJob(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 text-navy/50 hover:bg-navy hover:text-white transition-all duration-200 mt-1 flex-shrink-0">
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* Job Details */}
              <div className="px-5 py-6 border-b border-navy/8 sm:px-7">
                <div className="grid grid-cols-1 gap-3 mb-5 sm:grid-cols-2">
                  {[
                    { icon: FaBriefcase, label: activeJob.type },
                    { icon: FaGlobe, label: activeJob.mode },
                    { icon: FaClock, label: activeJob.duration },
                    { icon: FaMapMarkerAlt, label: activeJob.location },
                    { icon: FaDollarSign, label: activeJob.stipend },
                  ].map(({ label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm text-navy/70 font-ui">
                      <FaCheckCircle className="text-[#c68b59] flex-shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold font-ui uppercase tracking-widest text-navy/40 mb-2">Skills Required</p>
                  <div className="flex flex-wrap gap-2">
                    {activeJob.skills.map(s => (
                      <span key={s} className="px-3 py-1 rounded-full text-xs font-semibold font-ui bg-[#c68b59]/10 text-[#c68b59] border border-[#c68b59]/20">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="px-5 py-6 sm:px-7">
                <h3 className="font-serif text-xl font-semibold text-navy mb-6">Apply Now</h3>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16">
                    <FaCheckCircle className="text-5xl text-[#c68b59] mx-auto mb-4" />
                    <h4 className="font-serif text-2xl font-semibold text-navy mb-2">Application Sent!</h4>
                    <p className="text-sm font-ui text-navy/60">We'll review your profile and get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { key: 'name', label: 'Full Name', type: 'text', required: true },
                      { key: 'email', label: 'Email Address', type: 'email', required: true },
                      { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
                      { key: 'linkedin', label: 'LinkedIn Profile URL', type: 'url', required: false },
                      { key: 'portfolio', label: 'Portfolio / GitHub (optional)', type: 'url', required: false },
                      { key: 'resume', label: 'Upload Resume (PDF, DOC, DOCX)', type: 'file', required: true },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="block text-xs font-semibold font-ui uppercase tracking-widest text-navy/50 mb-1.5">{field.label}</label>
                        {field.type === 'file' ? (
                          <input
                            type="file"
                            required={field.required}
                            accept=".pdf,.doc,.docx"
                            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.files[0] }))}
                            className="w-full px-4 py-3 rounded-xl border border-navy/12 bg-white text-sm font-ui text-navy focus:outline-none focus:border-[#c68b59]/60 transition-colors"
                          />
                        ) : (
                          <input
                            type={field.type}
                            required={field.required}
                            value={form[field.key] || ''}
                            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-navy/12 bg-white text-sm font-ui text-navy placeholder-navy/30 focus:outline-none focus:border-[#c68b59]/60 transition-colors"
                            placeholder={field.label}
                          />
                        )}
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-semibold font-ui uppercase tracking-widest text-navy/50 mb-1.5">Cover Message</label>
                      <textarea rows={4} value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-navy/12 bg-white text-sm font-ui text-navy placeholder-navy/30 focus:outline-none focus:border-[#c68b59]/60 transition-colors resize-none"
                        placeholder="Tell us why you're a great fit..." />
                    </div>
                    <motion.button type="submit"
                      disabled={loading}
                      whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="w-full rounded-full py-4 text-sm font-semibold font-ui bg-[#081F52] text-white shadow-[0_8px_24px_rgba(8,31,82,0.3)] hover:shadow-[0_14px_36px_rgba(8,31,82,0.45)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? 'Submitting Application...' : 'Submit Application →'}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
