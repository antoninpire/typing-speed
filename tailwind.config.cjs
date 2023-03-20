/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");
const { createThemes } = require("tw-colors");
const themes = require("./src/utils/themes.json");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inconsolata)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), createThemes(themes)],
};

module.exports = config;
