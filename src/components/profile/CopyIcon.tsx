"use client";
import clsx from "clsx";

type Props = { className?: string; onClick?: () => void; title?: string };

export default function CopyIcon({ className, onClick, title = "Copiar" }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-label={title}
      role="img"
      className={clsx("h-6 w-6 cursor-pointer", className)}
      onClick={onClick}
      fill="none"
    >
      <path
        d="M28.4375 10V28H10.4375V10H28.4375Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4.4375 18V4H18.4375"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
