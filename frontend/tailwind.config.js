/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-600': '#2563eb',
        'blue-700': '#1d4ed8',
        'purple-600': '#9333ea',
        'purple-400': '#c084fc',
      }
    },
  },
  plugins: [],
}
