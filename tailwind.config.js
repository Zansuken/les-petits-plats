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
        "bg-grey": "#EDEDED",
        "gray-light": "#C6C6C6",
        white: "#ffffff",
      },
      fontFamily: {
        default: ["Manrope"],
        title: ["Anton"],
      },
      fontSize: {
        counter: "21px",
        "4.5xl": "2.75rem",
      },
      maxHeight: {
        640: "160rem",
      },
      backgroundImage: {
        banner: "url('/assets/images/banner.webp')",
      },
      transitionProperty: {
        height: "height",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 300ms ease-in-out",
      },
    },
  },
  plugins: [],
};
