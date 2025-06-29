/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "whitesmoke": {
          "100": "#f9f9fa",
          "200": "#f6f6f6"
        },
        "white": "#fff",
        "tomato": "#ff4242",
        "black": "#000",
        "gray": "#282a39",
        "mediumspringgreen": "#22c55e",
        "crimson": "#e11d48",
        "orange": "#f59e0b"
      },
      fontFamily: {
        "inter": "Inter",
        "manrope": "Manrope",
        "poppins": "Poppins"
      }
    }
  },
  corePlugins: {
    preflight: false
  }
}