// components/profile/EditIcon.tsx
"use client";
import clsx from "clsx";

type Props = { className?: string; onClick?: () => void; title?: string };

export default function EditIcon({ className, onClick, title = "Editar" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-label={title}
      role="img"
      // CHANGED: quité 'text-gray2 hover:text-gray-600' para que herede color del padre
      className={clsx("h-5 w-5 transition-colors", className)} 
      onClick={onClick}
      fill="currentColor" // mantiene el color actual (currentColor)
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
      <path d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42L18.37 3.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z" />
    </svg>
  );
}
