/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a8a', // blue-900
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f97316', // orange-500
          foreground: '#ffffff',
        },
        background: '#f3f4f6', // gray-100
      },
    },
  },
  plugins: [],
};
