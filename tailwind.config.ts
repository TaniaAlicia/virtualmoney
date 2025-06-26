import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-desktop": "url('/images/MaskGroup.png')",
        "bg-mobile": "url('/images/bg-mobile.png')",
        "bg-tablet": "url('/images/bg-tablet.png')",
      },
      colors: {
        green: "#C1FD35",   // Verde lima
        dark: "#1E1E1E",    // Fondo o texto oscuro principal
        dark2: "#201F22",   // Secundario oscuro
        light: "#FFFFFF",   // Blanco
        grayish: "#F0EEEE", // Gris claro
        error: "#E81010",   // Rojo error
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
