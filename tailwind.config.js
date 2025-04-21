/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#f8f6fe",
          100: "#f0ebfd",
          200: "#e1d8fb",
          300: "#c7b7f6",
          400: "#a990f0",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
      },
      boxShadow: {
        card: "0 10px 25px -5px rgba(124, 58, 237, 0.05), 0 8px 10px -6px rgba(124, 58, 237, 0.01)",
        "card-hover": "0 20px 35px -10px rgba(124, 58, 237, 0.12), 0 10px 20px -5px rgba(124, 58, 237, 0.08)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
