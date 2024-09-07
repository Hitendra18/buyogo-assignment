/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        secondaryHard: "#DAE9F6",
        secondaryLight: "#E4ECEE",
        primary: "#0069D1",
      },
      boxShadow: {
        "custom-black": "0 0 12px 4px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
