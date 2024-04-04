/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        violet: {
          50: "#f4f1ff",
          100: "#ebe6ff",
          200: "#dad0ff",
          300: "#bfaaff",
          400: "#a17aff",
          500: "#8445ff",
          600: "#781fff",
          700: "#6a0ef3",
          800: "#520abd",
          900: "#4a0ba7",
          950: "#2b0372",
        },
        elephant: {
          50: "#f1f8fa",
          100: "#dcedf1",
          200: "#bedce3",
          300: "#91c3cf",
          400: "#5ca1b4",
          500: "#418599",
          600: "#386d82",
          700: "#335a6b",
          800: "#304c5a",
          900: "#253741",
          950: "#192a33",
        },
      },
    },
  },
  plugins: [],
};
