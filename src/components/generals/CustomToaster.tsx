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
        className: "rounded-xl border border-dark/20 shadow-md font-medium",
        
        style: {
          background: "#C1FD35", 
          color: "#201F22",      
        },
      }}
    />
  );
}
