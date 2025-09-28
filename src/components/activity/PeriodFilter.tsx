"use client";
import { useState } from "react";
import clsx from "clsx";

const periods = [
  { label: "Hoy", value: "today" },
  { label: "Ayer", value: "yesterday" },
  { label: "Última semana", value: "week" },
  { label: "Últimos 15 días", value: "15days" },
  { label: "Último mes", value: "month" },
  { label: "Último año", value: "year" },
  { label: "Otro período", value: "custom" },
];

type Props = {
  onApply: (value: string) => void;
  onApplyCustom?: (fromISO: string, toISO: string) => void;
  onClear: () => void;
  onClose: () => void;
  selected?: string;
  className?: string;
};

export default function PeriodFilter({
  onApply,
  onApplyCustom,
  onClear,
  onClose,
  selected,
  className,
}: Props) {
  const [value, setValue] = useState<string>(selected ?? "");
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [fromStr, setFromStr] = useState<string>(""); //  YYYY-MM-DD
  const [toStr, setToStr] = useState<string>("");
  const [open, setOpen] = useState(true);

  const handleApply = () => {
    if (value === "custom" && onApplyCustom && fromStr && toStr) {
      onApplyCustom(fromStr, toStr);
      onClose();
      return;
    }
    if (value) {
      onApply(value);
      onClose();
    }
  };

  const handleClear = () => {
    setValue("");
    setFromStr("");
    setToStr("");
    setShowCustom(false);
    onClear();
    onClose();
  };

  return (
    <div
      className="absolute right-0 top-full z-50 mt-[24px] w-[300px] border border-white bg-gray1 shadow md:w-[320px]"
      role="dialog"
      aria-label="Filtrar por período"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-6 pb-3 pt-5">
        {/* 🆕 botón accesible que sólo colapsa/expande */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="period-options"
          className="flex items-center gap-2 text-left"
        >
          <h3 className="text-dark1 font-bold">Período</h3>
          <span
            aria-hidden
            className={`text-dark1 transition-transform ${open ? "rotate-0" : "rotate-180"}`}
          >
            <svg
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5.5 5L10 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>

        <button
          onClick={handleClear}
          className="text-dark1/60 text-sm hover:underline"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Línea separadora sólo si está abierto */}
      {open && <div className="h-px w-full bg-black" />}

      {/* Opciones */}
      {open && (
        <div className="flex flex-col gap-4 px-6 py-4">
          {periods.map((p) => (
            <label
              key={p.value}
              className={clsx(
                "flex cursor-pointer items-center justify-between",
                p.value === "custom" && "opacity-100", // visible, manejará subpanel
              )}
            >
              <span
                className={clsx("text-sm md:text-base", {
                  "text-dark1 font-bold": value === p.value,
                  "text-black/70": value !== p.value,
                })}
                onClick={() => {
                  setValue(p.value);
                  if (p.value === "custom") setShowCustom((s) => !s); // toggle subpanel
                }}
              >
                {p.label}
              </span>

              {p.value === "custom" ? (
                <button
                  type="button"
                  onClick={() => {
                    setValue("custom");
                    setShowCustom((s) => !s);
                  }}
                  aria-expanded={showCustom} 
                  aria-controls="custom-range" 
                  className="text-dark1/70 inline-flex h-4 w-4 items-center justify-center"
                  aria-label="Abrir rango personalizado"
                >
                  <svg
                    viewBox="0 0 11 7"
                    className={clsx(
                      "h-[7px] w-[11px] transition-transform", 
                      showCustom ? "rotate-0" : "-rotate-90", 
                    )}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5.5 5L10 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              ) : (
                <input
                  type="radio"
                  name="period"
                  value={p.value}
                  checked={value === p.value}
                  onChange={() => setValue(p.value)}
                  onMouseDown={(e) => e.preventDefault()}
                  className={clsx(
                    "border-dark1 relative h-4 w-4 cursor-pointer appearance-none rounded-full border",
                    "checked:border-dark2 checked:bg-green",
                    "checked:after:absolute checked:after:left-1/2 checked:after:top-1/2",
                    "checked:after:h-2 checked:after:w-2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
                    "checked:after:rounded-full checked:after:bg-dark",
                    "outline-none ring-0 focus:outline-none focus:ring-0",
                    "accent-dark",
                  )}
                />
              )}
            </label>
          ))}

          {/* Subpanel “Otro período” */}
          {showCustom && (
            <div className="mt-2 grid grid-cols-1 gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <span className="text-xs text-black/70">Desde</span>
                  <input
                    type="date"
                    value={fromStr}
                    onChange={(e) => setFromStr(e.target.value)}
                    className="text-dark1 rounded-md border border-[#D9D9D9] bg-white px-2 py-1 text-sm outline-none focus:border-dark"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-black/70">Hasta</span>
                  <input
                    type="date"
                    value={toStr}
                    onChange={(e) => setToStr(e.target.value)}
                    className="text-dark1 rounded-md border border-[#D9D9D9] bg-white px-2 py-1 text-sm outline-none focus:border-dark"
                  />
                </div>
              </div>
              <p className="text-[11px] text-black/60">Incluye ambas fechas.</p>
            </div>
          )}
        </div>
      )}

      {/* Acciones */}
      <div className="px-6 pb-5">
        <button
          onClick={handleApply}
          className="text-dark1 w-full rounded-lg bg-green py-2 text-sm font-bold shadow hover:opacity-90"
          disabled={value === "custom" ? !(fromStr && toStr) : !value}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
