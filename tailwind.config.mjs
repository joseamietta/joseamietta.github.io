/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#60a5fa",
        },
      },
      fontFamily: {
        onest: ["Onest Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
