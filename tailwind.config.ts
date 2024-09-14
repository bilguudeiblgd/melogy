import type { Config } from "tailwindcss";

import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [
    require('daisyui'),
    // require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      fontFamily: {
        "primary": ['var(--font-primary)'],
        "edgy": ['var(--font-edgy)']
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3d358b",
          "secondary": "#53a548",
          "base-100": "#ffffff",
          "my_red": "#de3e5b",
          "my_yellow": "#f8d24c",
          "my_green": "#53a548"
        }
      }
    ],
  }
};
export default config;
