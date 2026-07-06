import Marquee from 'react-fast-marquee';
import { FaRocket, FaRobot, FaBolt, FaStar, FaShieldAlt, FaChartLine, FaCheckCircle, FaCode } from 'react-icons/fa';

/* ─────────────────────────────────────────
   TrustMarquee
   A fast-marquee trust strip between sections.
   Glassmorphism dark background, gold accent icons.
───────────────────────────────────────── */

const items = [
  { icon: FaStar,       text: '4.9 / 5 Client Rating' },
  { icon: FaRocket,     text: '100+ Businesses Empowered' },
  { icon: FaRobot,      text: 'AI-Powered Solutions' },
  { icon: FaBolt,       text: '24 × 7 Dedicated Support' },
  { icon: FaChartLine,  text: '98% Client Satisfaction' },
  { icon: FaShieldAlt,  text: 'Enterprise-Grade Security' },
  { icon: FaCode,       text: 'Custom Digital Solutions' },
  { icon: FaCheckCircle,text: 'Results-Driven Approach' },
  { icon: FaStar,       text: '50+ Projects Delivered' },
  { icon: FaRocket,     text: 'Scalable Architecture' },
];

function MarqueeItem({ icon: Icon, text }) {
  return (
    <span className="mx-8 inline-flex items-center gap-3 whitespace-nowrap">
      <Icon
        className="shrink-0 text-sm"
        style={{ color: '#c68b59' }}
      />
      <span
        className="text-sm font-medium tracking-wide"
        style={{ color: 'rgba(240,246,255,0.75)' }}
      >
        {text}
      </span>
      {/* Separator dot */}
      <span
        className="ml-8 h-1 w-1 rounded-full"
        style={{ background: 'rgba(198,139,89,0.4)' }}
      />
    </span>
  );
}

export function TrustMarquee() {
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        background:
          'linear-gradient(90deg, rgba(8,31,82,0.0) 0%, rgba(8,31,82,0.95) 5%, rgba(11,47,120,0.9) 50%, rgba(8,31,82,0.95) 95%, rgba(8,31,82,0.0) 100%)',
        borderTop: '1px solid rgba(59,130,246,0.12)',
        borderBottom: '1px solid rgba(198,139,89,0.12)',
      }}
    >
      {/* Edge fade masks */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
        style={{
          background:
            'linear-gradient(90deg, #030F1F 0%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
        style={{
          background:
            'linear-gradient(270deg, #030F1F 0%, transparent 100%)',
        }}
      />

      <Marquee
        gradient={false}
        speed={38}
        pauseOnHover
        direction="left"
      >
        {items.map((item, i) => (
          <MarqueeItem key={i} {...item} />
        ))}
      </Marquee>
    </div>
  );
}
