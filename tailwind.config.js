/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
        },
        // Light theme
        canvas: '#F5F7FB',
        // Dark theme
        night: {
          bg: '#0F172A',
          card: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        xl2: '20px',
      },
      maxWidth: {
        phone: '420px',
      },
    },
  },
  plugins: [],
}
