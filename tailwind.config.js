/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#FFD15B",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
        white: "#ffffff",
      },
      fontFamily: {
        default: ["Manrope"],
        title: ["Anton"],
      },
    },
  },
  plugins: [],
};
