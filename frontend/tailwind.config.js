/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "linear-gradient(to left, #0575e6, #021b79)",
        hover: "linear-gradient(to left,#021b79, #0575e6 )",
      },
    },
    container: {
      padding: "8.5rem",
    },
  },
  plugins: [],
};
