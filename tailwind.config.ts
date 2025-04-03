import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Raleway"
        ],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
