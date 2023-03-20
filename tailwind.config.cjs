/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#212737",
        primary: "#FF6B01",
        white: "#EAEDF3",
        text: "#64748b",
      },
      fontFamily: {
        sans: ["var(--font-inconsolata)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

module.exports = config;
