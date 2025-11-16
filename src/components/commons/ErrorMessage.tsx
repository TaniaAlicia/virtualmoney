"use client";

import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  buttonText?: string; 
  onClick?: () => void; 
  className?: string;
};

const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <circle cx="32" cy="32" r="24" stroke="#ff3b3b" strokeWidth="4" />
    <path d="M24 24l16 16M40 24L24 40" stroke="#ff3b3b" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export default function ErrorMessage({
  title,
  description,
  buttonText = "Revisar dato",
  onClick,
  className,
}: Props) {
  const router = useRouter();
  const handle = onClick ?? (() => router.back());

  return (
    <section className={["flex flex-col gap-5", className].filter(Boolean).join(" ")}>
      <div className="rounded-[10px] bg-dark p-7 md:px-12 md:py-10 flex flex-col items-center gap-4 md:gap-5">
        <ErrorIcon className="h-[41px] w-[41px] md:h-[65px] md:w-[65px]" />
        <h1 className="text-center text-xl font-bold md:text-2xl">{title}</h1>
        <div className="my-1 h-px w-full border-b border-white/20 md:my-2" />
        <p className="text-center text-sm text-white/70 md:text-base md:px-5 xl:px-10">
          {description}
        </p>
      </div>

      <div className="flex h-[50px] w-full justify-end md:h-[64px]">
        <button
          onClick={handle}
          className="h-[50px] w-[165px] rounded-[10px] bg-green font-bold text-dark shadow md:h-[64px] md:w-full xl:w-[233px]"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}
