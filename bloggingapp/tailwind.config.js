/** @type {import('tailwindcss').Config} */
export default {

  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },

  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

