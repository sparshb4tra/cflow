/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gumroad-inspired pink theme
        gumroad: {
          50: '#fef7ff',
          100: '#feeaff',
          200: '#fdd4ff',
          300: '#fcb3ff',
          400: '#fa83ff',
          500: '#f64dff',
          600: '#e524e5',
          700: '#c218c2',
          800: '#9f159f',
          900: '#831783',
        },
        primary: {
          50: '#fef7ff',
          100: '#feeaff',
          200: '#fdd4ff',
          300: '#fcb3ff',
          400: '#fa83ff',
          500: '#f64dff',
          600: '#e524e5',
          700: '#c218c2',
          800: '#9f159f',
          900: '#831783',
        },
        gray: {
          25: '#fefefe',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Authentic Gumroad colors from their design system
        'bright-pink': '#FF6EC7',
        'pastel-pink': '#F7C6D0',
        'light-yellow': '#FFD83D',
        'deep-yellow': '#FFB400',
        'bright-red': '#E53935',
        'teal-green': '#1BA39C',
        'sea-green': '#46C7C7',
        'sky-blue': '#9FA8DA',
        'dark-grey': '#2B2B2B',
        yellow: {
          400: '#FFD83D',
          500: '#FFB400',
        },
        teal: {
          500: '#1BA39C',
        },
        purple: {
          500: '#b23386',
          600: '#9FA8DA',
        },
        orange: {
          500: '#ff7051',
        },
        red: {
          500: '#E53935',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        sans: [
          'Söhne', // Gumroad's actual font
          'Inter', // Closest free alternative
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        display: ['Söhne', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'scroll': 'scroll 25s linear infinite',
        'scroll-reverse': 'scroll-reverse 25s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
