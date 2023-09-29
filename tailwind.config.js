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
        grey: "#7A7A7A",
        "gray-light": "#d3dce6",
        white: "#ffffff",
      },
      fontFamily: {
        default: ["Manrope"],
        title: ["Anton"],
      },
      fontSize: {
        "4.5xl": "2.75rem",
      },
      maxHeight: {
        640: "160rem",
      },
      backgroundImage: {
        banner: "url('/assets/images/banner.png')",
      },
    },
  },
  plugins: [],
};
