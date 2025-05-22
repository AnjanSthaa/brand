/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'custom-880': '880px',
      },
      fontFamily: {
        poppins: ['Poppins', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: ['tailwind-scrollbar'],
}
