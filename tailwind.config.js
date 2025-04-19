/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: "#000000", // Pure Black
          light: "#1a1a1a", // Slightly lighter black
          accent: "#333333", // Dark gray
        },
        // Secondary Colors
        secondary: {
          DEFAULT: "#1e3a8a", // Blue-900
          light: "#2563eb", // Blue-600
          dark: "#0f172a", // Very dark blue
        },
        // Accent Colors
        accent: {
          DEFAULT: "#6d28d9", // Purple
          success: "#059669", // Green
          warning: "#d97706", // Orange
          danger: "#dc2626", // Red
          teal: "#0d9488", // Teal
        },
        // Text Colors
        text: {
          DEFAULT: "#1e293b", // Dark slate
          light: "#64748b", // Slate-500
          dark: "#0f172a", // Slate-900
          white: "#FFFFFF", // Pure white
        },
        neutral: {
          white: "#FFFFFF", // Pure white
          light: "#f8fafc", // Very light gray
          gray: "#94a3b8", // Medium gray
          dark: "#1e293b", // Dark slate
        },
        accent: {
          purple: "#6d28d9", // Purple
          teal: "#0d9488", // Teal
        },
        // Button Colors
        btn: {
          primary: "#2563eb", // Blue-600
          secondary: "#6d28d9", // Purple
        },
        // Border Colors
        border: {
          DEFAULT: "#e2e8f0", // Slate-200
          default: "#e2e8f0", // Slate-200
        },
        // Success Colors
        success: {
          DEFAULT: "#059669", // Green-600
          bg: "#ecfdf5", // Green-50
          text: "#059669", // Green-600
        },
      },
      borderWidth: {
        thin: "0.5px",
      },
      boxShadow: {
        thin: "0 0 0 0.5px rgba(255, 255, 255, 0.1)",
        "thin-dark": "0 0 0 0.5px rgba(0, 0, 0, 0.1)",
        glow: "0 0 15px rgba(109, 40, 217, 0.3)",
        "glow-sm": "0 0 10px rgba(109, 40, 217, 0.2)",
        "inner-glow": "inset 0 0 10px rgba(109, 40, 217, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
      },
      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
        DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.3)",
        lg: "0 4px 8px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        ripple: "ripple 0.6s linear",
        stagger: "stagger 0.5s ease-out",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        stagger: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      opacity: {
        15: "0.15",
        35: "0.35",
        65: "0.65",
        85: "0.85",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: {
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      backgroundImage: {
        main: "linear-gradient(to bottom, var(--tw-gradient-stops))",
        "main-dark": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        main: "var(--bg-main)",
        "main-light": "var(--bg-main-light)",
        "main-dark": "var(--bg-main-dark)",
        surface: "var(--bg-surface)",
        "surface-light": "var(--bg-surface-light)",
        "surface-dark": "var(--bg-surface-dark)",
      },
    },
  },
  plugins: [],
};
