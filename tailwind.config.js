/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)", // Primary brand color
        secondary: "var(--secondary-color)", // Secondary brand color
        accent: "var(--accent-color)", // Accent or highlight color
        background: "var(--background-color)", // Background
        text: "var(--text-color)", // Primary text
        secondary_text: "var(--text-secondary-color)", // Secondary text
        border: "var(--border-color)",
      },
      screens: {
        xs: "480px", // 3x large screens
      },
    },
  },
  plugins: [],
};
