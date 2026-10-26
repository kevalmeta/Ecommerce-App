/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
   theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B1A", // saffron orange
          light: "#FF8C42",
          dark: "#E55A00",
        },
        background: {
          DEFAULT: "#0D1117", // deep navy dark
          light: "#161B22",
          lighter: "#21262D",
        },
        surface: {
          DEFAULT: "#21262D",
          light: "#30363D",
        },
        text: {
          primary: "#F0F6FC",
          secondary: "#8B949E",
          tertiary: "#484F58",
        },
        accent: {
          DEFAULT: "#FF6B1A",
          blue: "#1F6FEB",
          red: "#F85149",
          yellow: "#D29922",
          green: "#3FB950",
        },
      },
    },
  },
  plugins: [],
}