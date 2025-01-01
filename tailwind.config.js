/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "script.js"],
  theme: {
    extend: {
      screens: {
        mobileLarge: "425px",
        tablet: "768px",
        desktop: "1440px",
      },

      fontFamily: {
        jetbrains: ["JetBrains Mono", "sans-serif"],
      },

      fontSize: {
        base: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
      },

      colors: {
        midnightCharcoal: "#24232C",
        mutedLavenderGray: "#817D92",
        softMist: "#E6E5EA",
        eclipseBlack: "#18171F",
        mintGlow: "#A4FFAF",
        fieryRed: "#F64A4A",
        sunsetCoral: "#FB7C58",
        goldenAmber: "#F8CD65",
      },
    },
  },
  plugins: [],
};
