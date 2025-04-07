/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#000000',    // Pure Black
          light: '#1a1a1a',      // Slightly lighter black
          accent: '#333333',     // Dark gray
        },
        secondary: {
          DEFAULT: '#1e3a8a',    // Blue-900
          dark: '#0f172a',       // Very dark blue
        },
        neutral: {
          white: '#FFFFFF',      // Pure white
          light: '#f8fafc',      // Very light gray
          gray: '#94a3b8',       // Medium gray
          dark: '#1e293b',       // Dark slate
        },
        accent: {
          success: '#059669',    // Green
          warning: '#d97706',    // Orange
          danger: '#dc2626',     // Red
          purple: '#6d28d9',     // Purple
          teal: '#0d9488',       // Teal
        }
      }
    },
  },
  plugins: [],
};