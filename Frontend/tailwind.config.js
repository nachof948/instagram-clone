/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    colors:{
      black: "#000000",
      "light-blue":"rgb(0,149,246)",
      "hover-signup":"rgb(0,125,250)",
      "link-blue":"rgb(0, 55, 107)",
      "grey":"rgb(115, 115, 115)",
      "light-grey":"rgb(219, 219, 219)",
      "light-grey-hover":"rgb(240, 240, 240)",
      "grey-input":"rgb(250, 250, 250)",
      "white":"rgb(255, 255, 255)"
    },
  },
  plugins: [require("tailwindcss-animate")],
}