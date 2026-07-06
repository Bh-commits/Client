/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:    '#050816',
        'navy-2':'#0B1120',
        royal:   '#3B82F6',
        accent:  '#c68b59',
        violet:  '#8B5CF6',
        cyan:    '#06B6D4',
        light:   '#F8FAFC',
        ink:     '#0F172A',
        muted:   '#94A3B8',
        dark:    '#020712',
        'dark-2':'#030A14',
        'dark-3':'#050816',
        glass:   'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        serif:   ['"Cormorant Garamond"', 'serif'],
        body:    ['Inter', 'sans-serif'],
        ui:      ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft:        '0 14px 40px rgba(15,23,42,0.08)',
        lift:        '0 18px 48px rgba(5,8,22,0.18)',
        glow:        '0 0 40px rgba(59,130,246,0.25)',
        'glow-gold': '0 0 40px rgba(198,139,89,0.35)',
        'glow-violet':'0 0 40px rgba(139,92,246,0.3)',
        'card-dark': '0 8px 32px rgba(0,0,0,0.5)',
        premium:     '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.08)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'float-delay':  'float 7s ease-in-out infinite 1.5s',
        'shimmer':      'shimmer 2.5s linear infinite',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
        'slide-up':     'slideUp 0.6s ease-out forwards',
        'spin-slow':    'spin 8s linear infinite',
        'border-glow':  'borderGlow 2s ease-in-out infinite',
        'text-flicker': 'textFlicker 4s ease-in-out infinite',
        'aurora':       'aurora 8s ease-in-out infinite',
        'twinkle':      'twinkle 3s ease-in-out infinite',
        'divider-sweep':'dividerSweep 4s linear infinite',
        'btn-shimmer':  'btnShimmer 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59,130,246,0.2)' },
          '50%':      { boxShadow: '0 0 50px rgba(59,130,246,0.5), 0 0 80px rgba(139,92,246,0.2)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(59,130,246,0.3)' },
          '50%':      { borderColor: 'rgba(139,92,246,0.6)' },
        },
        textFlicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '94%': { opacity: '0.8' },
          '96%': { opacity: '1' },
        },
        aurora: {
          '0%, 100%': {
            background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 70%)',
          },
          '33%': {
            background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.14) 0%, transparent 70%)',
          },
          '66%': {
            background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(198,139,89,0.10) 0%, transparent 70%)',
          },
        },
        twinkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%':      { opacity: '0.6', transform: 'scale(1)' },
        },
        dividerSweep: {
          '0%':   { left: '-100%' },
          '100%': { left: '100%' },
        },
        btnShimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    }
  },
  plugins: []
};
