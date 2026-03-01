// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f172a', // Premium dark blue/gray
        primary: '#3b82f6', // Modern blue
        accent: '#8b5cf6', // Purple accent
      }
    },
  },
  plugins: [],
}
