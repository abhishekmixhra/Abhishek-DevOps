/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'blink': 'blink 1s infinite',
        'fill-bar': 'fillBar 2s ease forwards',
        'particle-float': 'particleFloat 15s linear infinite',
      },
    },
  },
  plugins: [],
};
