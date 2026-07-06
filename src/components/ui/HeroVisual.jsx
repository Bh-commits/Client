import { motion } from 'framer-motion';
import { FaBolt, FaChartLine, FaMobileAlt, FaRobot } from 'react-icons/fa';

export function HeroVisual() {
  const bars = ['h-20', 'h-28', 'h-16', 'h-32', 'h-24', 'h-36'];

  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-navy p-4 shadow-lift">
      <div className="absolute inset-0 device-grid opacity-70" />
      <div className="relative grid h-full grid-cols-[1fr_0.42fr] gap-4">
        <motion.div
          className="rounded-lg border border-white/15 bg-white p-4 shadow-soft"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">AI Growth Dashboard</p>
              <h3 className="mt-1 font-heading text-2xl font-bold text-ink">Lead engine</h3>
            </div>
            <span className="rounded-lg bg-accent px-3 py-2 text-xs font-bold text-navy">+42%</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              ['Visitors', '28.4k'],
              ['Leads', '1,248'],
              ['Revenue', '₹8.2L']
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-light p-3">
                <p className="text-xs text-muted">{label}</p>
                <p className="mt-1 font-heading text-xl font-bold text-navy">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex items-end gap-3 rounded-lg bg-light px-4 pt-5">
            {bars.map((height, index) => (
              <span
                key={height + index}
                className={`${height} flex-1 rounded-t-lg ${index % 2 ? 'bg-royal' : 'bg-accent'}`}
              />
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-100 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <FaRobot className="text-royal" />
                AI chatbot
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">Qualifies new enquiries in seconds.</p>
            </div>
            <div className="rounded-lg border border-slate-100 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <FaChartLine className="text-royal" />
                Sales flow
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">Routes prospects to your team.</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            className="rounded-lg border border-white/15 bg-white/95 p-4 shadow-soft"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="mx-auto h-52 max-w-[150px] rounded-[24px] border-[8px] border-ink bg-light p-3 shadow-soft">
              <div className="h-full rounded-lg bg-white p-3">
                <div className="h-2 w-12 rounded-full bg-slate-200" />
                <div className="mt-5 grid gap-2">
                  <span className="h-8 rounded-lg bg-accent" />
                  <span className="h-12 rounded-lg bg-royal" />
                  <span className="h-8 rounded-lg bg-slate-200" />
                </div>
              </div>
            </div>
          </motion.div>
          <div className="rounded-lg border border-white/15 bg-white/95 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-navy">
                <FaBolt />
              </span>
              <div>
                <p className="text-xs text-muted">Automation</p>
                <p className="font-heading text-xl font-bold text-ink">24/7</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/95 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-royal text-white">
                <FaMobileAlt />
              </span>
              <div>
                <p className="text-xs text-muted">Mobile ready</p>
                <p className="font-heading text-xl font-bold text-ink">Apps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






