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
      heart: "2",
      nav: "3",
      popup: "999",
      floating: "1000",
    },
    colors: {
      transparent: "transparent",
      "white-black": "rgb(var(--white-black) / <alpha-value>)",
      "black-white": "rgb(var(--black-white) / <alpha-value>)",
      "white-white": "rgb(var(--white-white) / <alpha-value>)",
      gray: {
        50: "rgb(var(--gray-50) / <alpha-value>)",
        100: "rgb(var(--gray-100) / <alpha-value>)",
        200: "rgb(var(--gray-200) / <alpha-value>)",
        300: "rgb(var(--gray-300) / <alpha-value>)",
        400: "rgb(var(--gray-400) / <alpha-value>)",
        500: "rgb(var(--gray-500) / <alpha-value>)",
        600: "rgb(var(--gray-600) / <alpha-value>)",
        700: "rgb(var(--gray-700) / <alpha-value>)",
        800: "rgb(var(--gray-800) / <alpha-value>)",
        900: "rgb(var(--gray-900) / <alpha-value>)",
      },
      sub: {
        pink: { DEFAULT: "rgb(var(--sub-pink) / <alpha-value>)", bg: "rgb(var(--sub-pink) / 0.12)" },
        blue: { DEFAULT: "rgb(var(--sub-blue) / <alpha-value>)", bg: "rgb(var(--sub-blue) / 0.12)" },
        purple: { DEFAULT: "rgb(var(--sub-purple) / <alpha-value>)", bg: "rgb(var(--sub-purple) / 0.12)" },
        yellow: { DEFAULT: "rgb(var(--sub-yellow) / <alpha-value>)", bg: "rgb(var(--sub-yellow) / 0.12)" },
        skyblue: { DEFAULT: "rgb(var(--sub-skyblue) / <alpha-value>)", bg: "rgb(var(--sub-skyblue) / 0.12)" },
        scarlet: { DEFAULT: "rgb(var(--sub-scarlet) / <alpha-value>)", bg: "rgb(var(--sub-scarlet) / 0.12)" },
        green: { DEFAULT: "rgb(var(--sub-green) / <alpha-value>)", bg: "rgb(var(--sub-green) / 0.12)" },
        red: { DEFAULT: "rgb(var(--sub-red) / <alpha-value>)", bg: "rgb(var(--sub-red) / 0.12)" },
      },
      main: {
        pink: {
          50: "rgb(var(--main-pink) / 0.12)",
          300: "rgb(var(--main-pink) / 0.5)",
          500: "rgb(var(--main-pink) / <alpha-value>)",
          white: "rgb(var(--main-pink-white) / <alpha-value>)",
        },
      },
      red: "rgb(var(--red) / <alpha-value>)",
      blue: "rgb(var(--blue) / <alpha-value>)",
    },
    fontFamily: {
      sans: ["Pretendard", "Arial"],
    },
    fontSize: {
      12: "1.2rem",
      14: "1.4rem",
      16: "1.6rem",
      18: "1.8rem",
      20: "2.0rem",
    },
    fontWeight: {
      400: "400",
      500: "500",
      600: "600",
      700: "700",
    },
    borderRadius: {
      sm: "1.2rem",
      md: "1.6rem",
      lg: "2rem",
      full: "9999px",
    },
    spacing: PX_ENTRIES,
    extend: {
      keyframes: {
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(50%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        brrr: {
          "25%": { transform: "translateX(2%)" },
          "50%": { transform: "translateX(-2%)" },
          "75%": { transform: "translateX(2%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.1s ease-in-out",
        fadeIn: "fadeIn 0.15s ease-in-out",
        brrr: "brrr 0.2s",
      },
      boxShadow: {
        top: "0px -4px 16px 0px rgba(0, 0, 0, 0.04)",
        hero: "0px 4px 12px 0px rgba(0, 0, 0, 0.04)",
        postBox: "0px 4px 24px 0px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")({ nocompatible: true })],
};
export default config;
