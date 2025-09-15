/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-manrope)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "var(--font-merriweather)",
          "serif",
        ],
      },
      colors: {
        primary: {
          100: "#e6f0fa",
          200: "#b3d4f6",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
        },
        accent: {
          DEFAULT: "#f4f0e0",
        },
        "text-main": "#0d0c06",
      },
    },
  },
  plugins: [],
};
