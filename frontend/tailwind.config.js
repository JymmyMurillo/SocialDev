// =====================================================
// Tailwind CSS Configuration
// =====================================================

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colores de SocialDev
        primary: {
          DEFAULT: "#4A90E2", // Azul
          hover: "#3A7BC8",
          light: "#6BA4EC",
        },
        secondary: {
          DEFAULT: "#9058D8", // Morado
          hover: "#7A42BE",
          light: "#A672E2",
        },
        accent: {
          DEFAULT: "#63D4B8", // Verde
          hover: "#4FC4A8",
          light: "#7FDEC4",
        },
        danger: {
          DEFAULT: "#E64980", // Rojo
          hover: "#D63366",
          light: "#EE6B9A",
        },
        dark: {
          DEFAULT: "#2D3748", // Dark Grey
          lighter: "#4A5568",
          light: "#718096",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};


