/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily : {
        rubik : "Rubik"
      },
      boxShadow: {
        'neuphormism': '-5px -5px 15px #d9dde0, 5px 5px 15px #ffffff',
      },
      colors: {
        'ungutua': '#140040',
      },
      
    },
  },
  plugins: [],
}
