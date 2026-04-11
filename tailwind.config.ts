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
          light:  '#e2e8f0',
          soft:   '#64748b',
          base:   '#be123c',
          deep:   '#0f172a',
          rose:   '#334155',
        },
        cream: '#f5f5f4',
      },
    },
  },
  plugins: [],
} satisfies Config;
