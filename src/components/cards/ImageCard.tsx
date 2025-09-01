
"use client";
import dynamic from "next/dynamic";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const Cards = dynamic(() => import("react-credit-cards-2"), { ssr: false });

interface ImageCardProps {
  number: string;
  expiry: string; // MM/YY
  cvc: string;
  name: string;
  focused?: "number" | "name" | "expiry" | "cvc";
}

export default function ImageCard({ number, expiry, cvc, name, focused }: ImageCardProps) {
  return (
    <div className="shadow-md rounded-[15px]">
      <Cards number={number} expiry={expiry} cvc={cvc} name={name} focused={focused} />
    </div>
  );
}

