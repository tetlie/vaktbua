/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
      serif: ["Times New Roman", "Times", "serif"],
    },
    extend: {
      colors: {
        black: "#000",
        white: "white",
        // gray: "#F5F5F5"
        gray: "#D9D9D9",
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
