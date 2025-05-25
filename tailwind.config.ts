import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      fontFamily: {
        "primary": ['var(--font-primary)'],
        "edgy": ['var(--font-edgy)']
      },
      backgroundColor: {
        "my-red": "#de3e5b",
        "my-yellow": "#f8d24c",
        "my-green": "#53a548"
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#18195A",
          "secondary": "#FF7F4F",
          "accent": "E6FF1A",
          neutral: "#1D1D1D",
          "base-100": "#ffffff",

          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        }
      }
    ],
  }
};
export default config;
