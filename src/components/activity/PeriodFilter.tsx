"use client";
import { useEffect, useId, useState } from "react";
import clsx from "clsx";

const periods = [
  { label: "Hoy", value: "today" },
  { label: "Ayer", value: "yesterday" },
  { label: "Última semana", value: "week" },
  { label: "Últimos 15 días", value: "15days" },
  { label: "Último mes", value: "month" },
  { label: "Últimos 3 meses", value: "3months" },
  /* { label: "Último año", value: "year" }, */
  { label: "Otro período", value: "custom" },
];

// 🔹 Tipos de operación (nuevo bloque)
const operationTypes = [
  { label: "Todos", value: "all" },
  { label: "Ingresos", value: "ingresos" },
  { label: "Egresos", value: "egresos" },
];

type Props = {
  onApply: (value: string, type?: string) => void;
  onApplyCustom?: (fromISO: string, toISO: string, type?: string) => void;
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
}: Props) {
  const [value, setValue] = useState<string>(selected ?? "");
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [fromStr, setFromStr] = useState<string>("");
  const [toStr, setToStr] = useState<string>("");
  const [open, setOpen] = useState(true);

  // ✅ nuevo estado para tipo de operación
  const [operationType, setOperationType] = useState<string>("all");

  const uid = useId();

  useEffect(() => {
    setValue(selected ?? "");
    const isCustom = (selected ?? "") === "custom";
    setShowCustom(isCustom);
    if (!isCustom) {
      setFromStr("");
      setToStr("");
    }
  }, [selected]);

  const handleApply = () => {
    if (value === "custom" && onApplyCustom && fromStr && toStr) {
      onApplyCustom(fromStr, toStr, operationType);
      onClose();
      return;
    }

    // ✅ Siempre permitir aplicar, incluso si no hay período
    onApply(value || "", operationType);
    onClose();
  };

  const handleClear = () => {
    setValue("");
    setFromStr("");
    setToStr("");
    setShowCustom(false);
    setOperationType("all"); // ✅ resetea tipo
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

      {open && <div className="h-px w-full bg-black" />}

      {/* Opciones */}
      {open && (
        <div className="flex flex-col gap-4 px-6 py-4">
          {periods.map((p) => (
            <label
              key={p.value}
              className={clsx(
                "flex cursor-pointer items-center justify-between",
                p.value === "custom" && "opacity-100",
              )}
              onClick={() => {
                setValue(p.value);
                if (p.value === "custom") setShowCustom((s) => !s);
              }}
            >
              <span
                className={clsx("text-sm md:text-base", {
                  "text-dark1 font-bold": value === p.value,
                  "text-black/70": value !== p.value,
                })}
              >
                {p.label}
              </span>

              {/* Custom radio sin input */}
              <span
                className={clsx(
                  "relative flex h-5 w-5 items-center justify-center rounded-full border border-dark transition-all duration-150",
                  "hover:brightness-110",
                  value === p.value && "bg-[#C1FD35]",
                )}
              >
                {value === p.value && (
                  <span className="absolute h-3 w-3 rounded-full bg-dark" />
                )}
              </span>
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

      {/* 🔽 NUEVO BLOQUE: Tipo de operación (alineado con períodos) */}
      <div className="mt-4 border-t border-black/20 px-6 pt-4">
        <h4 className="text-dark1 mb-3 text-sm font-bold">Tipo de operación</h4>
        <div className="flex flex-col gap-4">
          {operationTypes.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setOperationType(opt.value)}
            >
              <span
                className={clsx("text-sm md:text-base", {
                  "text-dark1 font-bold": operationType === opt.value,
                  "text-black/70": operationType !== opt.value,
                })}
              >
                {opt.label}
              </span>
              <span
                className={clsx(
                  "relative flex h-5 w-5 items-center justify-center rounded-full border border-dark transition-all duration-150",
                  "hover:brightness-110",
                  operationType === opt.value && "bg-[#C1FD35]",
                )}
              >
                {operationType === opt.value && (
                  <span className="absolute h-3 w-3 rounded-full bg-dark" />
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-4 px-6 pb-5">
        <button
          onClick={handleApply}
          className="text-dark1 w-full rounded-lg bg-green py-2 text-sm font-bold shadow hover:opacity-90"
          disabled={value === "custom" ? !(fromStr && toStr) : false}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
