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
          "primary": "#3d358b",
          "secondary": "#53a548",
          "base-100": "#ffffff",
          "my-red": "#de3e5b",
          "my-yellow": "#f8d24c",
          "my-green": "#53a548"
        }
      }
    ],
  }
};
export default config;
