import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter var'", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          DEFAULT: "#22d3ee",
          dark: "#0e7490"
        }
      },
      backgroundImage: {
        "night-sky": "linear-gradient(to bottom, #020617, #0f172a, #020617)"
      }
    }
  },
  plugins: []
};

export default config;
