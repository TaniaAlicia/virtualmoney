// components/generals/CustomToaster.tsx
"use client";
import { Toaster } from "sonner";

export default function CustomToaster() {
  return (
    <Toaster
      position="bottom-right"
      expand
      toastOptions={{
        duration: 1800,
        // util para border/sombra/redondeo
        className: "rounded-xl border border-dark/20 shadow-md font-medium",
        // esto pisa el fondo y color del theme por defecto
        style: {
          background: "#C1FD35", // verde corporativo
          color: "#201F22",      // dark
        },
      }}
    />
  );
}
