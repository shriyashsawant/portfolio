/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Orbitron"', 'system-ui', 'sans-serif'],
        body: ['"Rajdhani"', 'system-ui', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        void: {
          DEFAULT: '#0a0a0f',
          100: '#12121f',
          200: '#1a1a2e',
          300: '#22223a',
        },
        neon: {
          green: '#00ff88',
          cyan: '#00d4ff',
          magenta: '#ff00ff',
          pink: '#ff3388',
          yellow: '#ffdd00',
        },
        hud: {
          border: 'rgba(0, 255, 136, 0.15)',
          bg: 'rgba(10, 10, 15, 0.85)',
          card: 'rgba(18, 18, 31, 0.7)',
        },
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 255, 136, 0.3), 0 0 60px rgba(0, 255, 136, 0.1)',
        'neon-cyan': '0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)',
        'neon-magenta': '0 0 20px rgba(255, 0, 255, 0.3), 0 0 60px rgba(255, 0, 255, 0.1)',
        glow: '0 0 40px rgba(0, 255, 136, 0.15)',
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'glitch': 'glitch 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'bar-fill': 'barFill 1.5s ease-out forwards',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '2%': { transform: 'translate(2px, -1px)' },
          '4%': { transform: 'translate(-2px, 1px)' },
          '6%': { transform: 'translate(0)' },
          '100%': { transform: 'translate(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { top: '-5%' },
          '100%': { top: '105%' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        barFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--bar-width)' },
        },
      },
      screens: {
        mobile: '375px',
        tablet: '768px',
        desktop: '1024px',
      },
    },
  },
  plugins: [],
}