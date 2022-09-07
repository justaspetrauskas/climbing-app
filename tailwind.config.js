/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        urban_white: "#F3F3F3",
        urban_black: "#121b22",
        urban_blue: "#1A3949",
        urban_lightBlue: "#72A1CD",
        urban_red: "#9D352A",
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      gridTemplateColumns: {
        navigation: `auto 1fr 3rem auto`,
      },
      keyframes: {
        gradeTick: {
          "0%": { transform: "translateY(-0.7rem)" },
          "100%": { transform: "translateY(-0.25rem)" },
        },
      },
    },
  },
  plugins: [],
};
