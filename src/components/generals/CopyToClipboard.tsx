"use client";
import { toast } from "sonner";
import clsx from "clsx";
import CopyIcon from "@/components/profile/CopyIcon";

type Props = { text: string; className?: string };

export default function CopyToClipboard({ text, className }: Props) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copiado al portapapeles");
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  return (
    <CopyIcon
      onClick={copy}
      className={clsx("text-green hover:opacity-80", className)}
    />
  );
}
