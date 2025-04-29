/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['e-Ukraine', 'sans-serif'],
      },
      colors: {
        brand: '#6366F1',
        brandYellow: '#FACC15',
      }
    },
  },
  plugins: [],
};

