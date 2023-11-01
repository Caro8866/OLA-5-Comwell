import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        earth: {
          100: "#677169",
          80: "#808B82",
          60: "#A0ABA3",
          40: "#C0C8C2",
          20: "#E3E6E3",
          10: "#EEEFEE",
        },
        sand: {
          100: "#AA8D65",
          80: "#BEA179",
          60: "#D7C9B9",
          40: "#EDE3D8",
          20: "#F0EAE2",
          10: "#F9F6F2",
        },
        sea: {
          100: "#182B39",
          80: "#273A48",
          60: "#9696A1",
          40: "#C5C5CB",
          20: "#E1E1E5",
          10: "#F3F3F5",
        },
        charcoal: {
          100: "#161D20",
          80: "#252C2F",
          60: "#9F9898",
          40: "#D3D1D1",
          20: "#EAE9E7",
          10: "#F6F4F3",
        },
        errorRed: "#EB0026",
        successGreen: "#2ECC71",
        warningYellow: "#F1C40F",
      },
      fontFamily: {
        /* How to use: Class name: .font-{name} */

        sans: ["Fellix", "sans-serif"],
      },
      fontSize: {
        /* How to use: Class name: .text-{size} */
        "heading-huge-desktop": ["4.125rem", "90%"],
        "heading-xlarge-desktop": ["2.875rem", "95%"],
        "heading-large-desktop": ["2.25rem", "90%"],
        "heading-medium-desktop": ["1.75rem", "95%"],
        "heading-small-desktop": ["1.375rem", "95%"],
        "heading-xsmall-desktop": ["1.125rem", "95%"],
        "heading-mini-desktop": ["1rem", "95%"],

        "heading-huge-mobile": ["2.125rem", "90%"],
        "heading-xlarge-mobile": ["2.125rem", "90%"],
        "heading-large-mobile": ["1.75rem", "95%"],
        "heading-medium-mobile": ["1.75rem", "95%"],
        "heading-small-mobile": ["1.25rem", "100%"],
        "heading-xsmall-mobile": ["1rem", "100%"],
        "heading-mini-mobile": ["1rem", "100%"],

        ".body-small": ["0.8125rem", "125%"],
        ".body-large": ["0.9375rem", "150%"],
        ".body-large-bold": ["0.9375rem", "150%"],
        ".inline-link": ["0.9375rem", "150%"],

        "trumpet-desktop": ["0.875rem", "100%"],
        "trumpet-mobile": ["0.8125rem", "100%"],

        "stat-desktop": ["4.625rem", "90%"],
        "quote-desktop": ["1.75rem", "95%"],
        "navigation-bar-desktop": ["0.9375rem", "100%"],
        "link-desktop": ["1rem", "110%"],
        "label-desktop": ["0.6875rem", "90%"],
        "tab-desktop": ["0.75rem", "100%"],
        "input-label-desktop": ["0.75rem", "95%"],
        "input-text-desktop": ["0.9375rem", "95%"],
        "rating-desktop": ["0.9375rem", "100%"],

        "stat-mobile": ["3.5rem", "90%"],
        "quote-mobile": ["1.5rem", "95%"],
        "navigation-bar-mobile": ["0.9375rem", "100%"],
        "link-mobile": ["0.875rem", "110%"],
        "label-mobile": ["0.6875rem", "90%"],
        "tab-mobile": ["0.75rem", "100%"],
        "input-label-mobile": ["1.125rem", "95%"],
        "input-text-mobile": ["0.9375rem", "95%"],
        "rating-mobile": ["0.9375rem", "100%"],
      },
      fontWeight: {
        /* How to use: Class name: .font-{weight} */
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};
export default config;
