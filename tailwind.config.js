/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        commonColor: "rgba(var(--commonColor))",
        commonBackground: "rgba(var(--commonBackground))",
        branchBackground: "rgba(var(--branchBackground))",
      },
      screens:{
        // mobi
        'mb': {'max': '639px'},
      }
    },
  },
  plugins: [],
}

