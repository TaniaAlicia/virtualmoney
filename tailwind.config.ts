import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
  'bg-bg-desktop',
  'bg-bg-tablet',
  'bg-bg-mobile',
  'xl:bg-bg-desktop',
  'lg:bg-bg-tablet',
  'md:bg-bg-mobile',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bgDesktop": "url('/images/bgDesktop.png')",
        "bg-tablet": "url('/images/bgTablet.png')",
        "bg-mobile": "url('/images/bgMobile.png')",
      },
      colors: {
        green: "#C1FD35", // Verde lima
        dark: "#201F22", // Fondo o texto oscuro principal
        dark2: "#3A393E", // Secundario oscuro
        light: "#FFFFFF", // Blanco
        grayish: "#D9D9D9", // Gris claro
        gray2: "#D9D9D9", // Gris claro 2
        error: "#EE3838", // Rojo error
        /*"dark-1": "#201F22",
        "dark-2": '#3A393E',
        "green-1": '#C1FD35',
        "gray-1": '#EEEAEA',
        "gray-2": '#D9D9D9',
        "error-1": "#DA0000",
        "error-2": "#EE3838",
        "select-1": "#D2FFEC",
        "button-1": "#CECECE",*/
      },
      fontFamily: {
        "open-sans": ["'Open Sans'", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
