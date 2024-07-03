/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      normalShadowLength: {"box-shadow": "1px 1px 10px"}
    },
    colors: {
      mainBgColor: "var(--main-bg-color)",
      secondaryBgColor: "var(--secondary-bg-color)",
      mainColor: "var(--main-color)",
      secondaryColor: "var(--secondary-color)",
      thirdColor: "var(--third-color)",
      shadowColor: "var(--shadow-color)",
      hoverColor: "var(--hover-color)",
      backgroundTransparentGray: "var(--background-transparent-gray)",
      warningColor: "var(--warning-color)",
      warningHoverColor: "var(--warning-hover-color)",
      white: 'var(--white)',
      ocre: 'var(--ocre)',
    }
  },
  plugins: [],
};
