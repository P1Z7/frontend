import type { Config } from "tailwindcss";

const createPxEntries = (size: number) => {
  return {
    0: "0",
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i * 4}`]: `${(i * 4) / 10}rem` };
    }),
  };
};

const PX_ENTRIES = createPxEntries(100);

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      mobile: "360px",
      tablet: "768px",
      pc: "1200px",
    },
    zIndex: {
      base: "1",
      nav: "2",
      popup: "999",
      floating: "1000",
    },
    fontFamily: {
      sans: ["Pretendard", "Arial"],
    },
    fontSize: {
      12: "1.2rem",
      14: "1.4rem",
      16: "1.6rem",
      18: "1.8rem",
      24: "2.4rem",
      32: "3.2rem",
      64: "6.4rem",
    },
    fontWeight: {
      100: "100",
      200: "200",
      300: "300",
      400: "400",
      500: "500",
      600: "600",
      700: "700",
      800: "800",
      900: "900",
    },
    borderRadius: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      full: "9999px",
    },
    spacing: PX_ENTRIES,
  },

  plugins: [],
};
export default config;
