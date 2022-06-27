/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./cart.html",
    "./src/**/*.{html, js}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '01': 'repeat(1, 275px)',
        '02': 'repeat(1, 360px)',
        '03': 'repeat(3, 223px)',
        '04': 'repeat(4, 223px)',
      },
      width: {
        '15rem': '15rem',
      }
    },
  },
  plugins: [],
}
