import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg-bgDesktop",
    "bg-bg-tablet",
    "bg-bg-mobile",
    "xl:bg-bgDesktop",
    "lg:bg-bg-tablet",
    "md:bg-bg-mobile",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bgDesktop: "url('/images/bgDesktop.png')",
        "bg-tablet": "url('/images/bgTablet.png')",
        "bg-mobile": "url('/images/bgMobile.png')",
      },
      colors: {
        green: "#C1FD35", // Verde lima
        dark: "#201F22", // Fondo o texto oscuro principal
        dark2: "#3A393E", // Secundario oscuro
        light: "#FFFFFF", // Blanco
        gray1: "#EEEAEA", // Gris claro
        gray2: "#D9D9D9", // Gris claro 2
        error: "#EE3838", // Rojo error
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
