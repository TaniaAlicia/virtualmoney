"use client";
import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";

type Props = {
  value?: string;
  onChange?: (v: string) => void;
  onDebouncedChange?: (v: string) => void;
  debounceMs?: number;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
};

export default function ServiceFilter({
  value = "",
  onChange,
  onDebouncedChange,
  debounceMs = 300,
  onClear,
  placeholder = "Buscá entre más de 5.000 empresas",
  className = "",
}: Props) {
  const [text, setText] = useState(value);

  useEffect(() => setText(value), [value]);

  useEffect(() => {
    if (!onDebouncedChange) return;
    const t = setTimeout(() => onDebouncedChange(text), debounceMs);
    return () => clearTimeout(t);
  }, [text, debounceMs, onDebouncedChange]);

  const showClear = useMemo(() => text.length > 0, [text]);

  return (
    <div
      className={[
        "flex h-[64px] w-full items-center gap-4 rounded-[10px] border border-gray1",
        "bg-white px-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]",
        "focus-within:outline-none focus-within:ring-0",
        className,
      ].join(" ")}
    >
      <SearchIcon />
      <input
        value={text}
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          onChange?.(v);
        }}
        type="text"
        spellCheck={false}
        placeholder={placeholder}
        aria-label="Buscar servicio"
        className="
    w-full appearance-none border-0 bg-transparent
    text-base
    text-dark outline-none ring-0 placeholder:text-gray-500
    focus:border-0 focus:outline-none focus:ring-0
  "
      />

      {showClear && (
        <button
          type="button"
          onClick={() => {
            setText("");
            onClear?.();
            onChange?.("");
            onDebouncedChange?.("");
          }}
          className="
            text-sm font-bold text-dark2 underline decoration-dark2/40
            outline-none hover:decoration-dark2 focus:outline-none focus:ring-0
          "
        >
          Limpiar
        </button>
      )}
    </div>
  );
}
