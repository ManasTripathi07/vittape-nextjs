/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: { 50: '#eef9ff', 100: '#d9f1ff', 200: '#bcE7ff', 300: '#8ed9ff', 400: '#58c3ff', 500: '#32a6ff', 600: '#1a88f5', 700: '#136fe1', 800: '#165ab6', 900: '#194d8f' },
        surface: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 700: '#1e293b', 800: '#0f172a', 900: '#020617' },
        accent: { green: '#10b981', red: '#ef4444', amber: '#f59e0b', violet: '#8b5cf6' },
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'slide-in': { '0%': { opacity: 0, transform: 'translateX(-12px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'slide-in': 'slide-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
