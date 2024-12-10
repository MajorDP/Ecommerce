/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideFromLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideUpModal: {
          "0%": {
            transform: "translateY(100%) translateX(-50%)",
          },
          "100%": {
            transform: "translateY(-50%) translateX(-50%)",
          },
        },
      },
      animation: {
        slideDown: "slideDown 1s ease-out",
        slideUp: "slideUp 1.2s ease-out",
        slideFromLeft: "slideFromLeft 1.2s ease-out",
        slideFromLeftSlow: "slideFromLeft 1.5s ease-out",
        slideUpModal: "slideUpModal 0.5s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  //Allows Tailwind CSS to work with scrollbars, npm i tailwild-scrollbar
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
