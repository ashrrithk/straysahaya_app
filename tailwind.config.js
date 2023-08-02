/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundColor: theme => ({
      'primary': '#F7F0E4',
      'secondary': '#F2F2F2',
      'danger': '#e3342f',
      'text': '#000000',
     })
  },
  plugins: [],
}

