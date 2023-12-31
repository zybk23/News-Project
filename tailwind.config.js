/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#052C54",
      },
      spacing: {
        100: "100px",
      },
    },
  },
  plugins: [],
};
