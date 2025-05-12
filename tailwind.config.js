/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a1f2e",
          light: "#2a3142",
          dark: "#0f1218",
          accent: "#2d3748",
        },
        secondary: {
          DEFAULT: "#2d3748",
          light: "#4a5568",
          dark: "#1a202c",
        },
        accent: {
          teal: "#38b2ac",
          purple: "#805ad5",
          danger: "#e53e3e",
          success: "#48bb78",
          warning: "#ed8936",
        },
        neutral: {
          white: "#ffffff",
          black: "#000000",
          gray: {
            50: "#f7fafc",
            100: "#edf2f7",
            200: "#e2e8f0",
            300: "#cbd5e0",
            400: "#a0aec0",
            500: "#718096",
            600: "#4a5568",
            700: "#2d3748",
            800: "#1a202c",
            900: "#171923",
          },
        },
      },
     
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-in-out",
        slide: "slide 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
