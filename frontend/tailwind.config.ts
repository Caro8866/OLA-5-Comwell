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
    },
  },
  plugins: [],
};
export default config;
