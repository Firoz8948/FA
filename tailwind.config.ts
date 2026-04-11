import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          light:  '#FFE4E8',
          soft:   '#FFB6C1',
          base:   '#FF69B4',
          deep:   '#FF1493',
          rose:   '#E91E8C',
        },
        cream: '#FFF5F7',
      },
    },
  },
  plugins: [],
} satisfies Config;
