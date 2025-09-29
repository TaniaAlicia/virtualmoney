"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { updateUser } from "@/services/userService";
import EditIcon from "@/components/profile/EditIcon";
import { registerSchema } from "@/schemas/registerSchema";
import { EyeIcon } from "@/components/generals/EyeIcon";
import { EyeOffIcon } from "@/components/generals/EyeOffIcon";

type FieldUnion =
  // ADDED: nuevo campo compuesto para editar nombre + apellido juntos
  | "fullName"
  | "firstName"
  | "lastName"
  | "phone"
  | "password";

type Props = {
  label: string;
  value: string;
  //field?: "firstName" | "lastName" | "phone" | "password";
   field?: FieldUnion;
  userId?: number;
  locked?: boolean;
 /*  onUpdate?: (
    field: "firstName" | "lastName" | "phone" | "password",
    value: string,
  ) => void; */
    onUpdate?: (field: Exclude<FieldUnion, "fullName">, value: string) => void;
};

// ADDED: helper para separar Nombre y Apellido
function splitFullName(raw: string) {
  const normalized = (raw ?? "").trim().replace(/\s+/g, " ");
  if (!normalized) return { first: "", last: "" };
  const parts = normalized.split(" ");
  const first = parts.shift() ?? "";
  const last = parts.join(" "); // puede quedar vacío y está bien
  return { first, last };
}


export default function ProfileRow({
  label,
  value,
  field,
  userId,
  locked,
  onUpdate,
}: Props) {
  const isPassword = field === "password"; // CHANGED
  const isFullName = field === "fullName"; // ADDED

  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Mantener sincronizado con el padre.
  useEffect(() => {
    // CHANGED: para password, cuando llega un nuevo value desde el padre
    // mantenemos el input vacío fuera de edición
    setInputValue(isPassword ? "" : value);
  }, [value, isPassword]); // CHANGED

   // ADDED: validación específica para fullName, respetando el schema existente
  const validateFullName = async (val: string) => {
    const { first, last } = splitFullName(val);
    try {
      await registerSchema.validateAt("firstName", { firstName: first });
      await registerSchema.validateAt("lastName", { lastName: last });
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Error de validación");
    }
  };

  // Validación en tiempo real
   const validateField = async (val: string) => {
    if (!field) return;
    if (isFullName) return validateFullName(val); // ADDED: delega
    try {
      await registerSchema.validateAt(field, { [field]: val });
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Error de validación');
      }
    }
  };

  // Guarda en el backend y avisa al padre para refrescar UI
  const save = async () => {
    if (!field || !userId || error) return;

    const token = Cookies.get("token");
    if (!token) return;

    // CHANGED: normalizo valor para comparar / validar
    const trimmed = (inputValue ?? "").trim();

    // CHANGED: si es password y no escribieron nada -> no guardamos
    if (field === "password" && trimmed === "") {
      setEditing(false);
      setShowPassword(false);
      setError(null);
      return; // 👈 no se hace request
    }

    // ADDED: lógica de guardado para fullName
    if (isFullName) {
      const current = (value ?? "").trim().replace(/\s+/g, " ");
      const next = trimmed.replace(/\s+/g, " ");
      if (current === next) {
        setEditing(false);
        return; // sin cambios
      }

      // validar ambos con el schema
      const { first, last } = splitFullName(next);
      try {
        await registerSchema.validateAt("firstName", { firstName: first });
        await registerSchema.validateAt("lastName", { lastName: last });
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else setError("Error de validación");
        return;
      }

      try {
        setLoading(true);
        const updated = await updateUser(
          userId,
          { firstName: first, lastName: last }, // backend espera estos nombres
          token
        );

        setEditing(false);

        // ADDED: notificar al padre por separado (dos updates)
        const newFirst =
          updated?.firstname ?? updated?.firstName ?? first ?? "";
        const newLast =
          updated?.lastname ?? updated?.lastName ?? last ?? "";

        onUpdate?.("firstName", newFirst);
        onUpdate?.("lastName", newLast);
      } catch (e) {
        console.error("Error al actualizar:", e);
      } finally {
        setLoading(false);
      }
      return;
    }

    // CHANGED: para campos de texto, si no cambió, no llamo al backend
    const current = (value ?? "").trim();
    if (field !== "password" && trimmed === current) {
      setEditing(false);
      return; // no se hace request
    }

    try {
      setLoading(true);

      // 1) mapear el nombre que espera el API
      const apiField =
        field === "firstName"
          ? "firstname"
          : field === "lastName"
            ? "lastname"
            : field; // phone | password

      const updated = await updateUser(
        userId,
        { [apiField]: inputValue },
        token,
      );

      setEditing(false);

      // 2) decidir qué valor mandar al padre para refrescar la UI
      let nextValue = inputValue;
      if (updated) {
        if (field === "firstName")
          nextValue = updated.firstname ?? updated.firstName ?? inputValue;
        else if (field === "lastName")
          nextValue = updated.lastname ?? updated.lastName ?? inputValue;
        else if (field === "phone") nextValue = updated.phone ?? inputValue;
        // password no se refleja
      }

      onUpdate?.(field, nextValue); // 👈 siempre notificamos con un valor válido
    } catch (e) {
      console.error("Error al actualizar:", e);
    } finally {
      setLoading(false);
    }
  };

  // CHANGED: el lápiz alterna entre "entrar a editar" y "guardar" si ya está editando
  const handleEditClick = async () => {
    if (loading || locked) return;

    if (!editing) {
      setEditing(true);
      if (field === "password") {
        setShowPassword(false);
        setInputValue(""); // mantenemos oculto
        setError(null);
      }
      return;
    }

    // Si ya está en edición:
    if (field === "password") {
      // CHANGED: si no escribió nada, tratamos como "cancelar"
      if ((inputValue ?? "").trim() === "") {
        setEditing(false);
        setShowPassword(false);
        setError(null);
        return; // 👈 no se guarda vacío
      }
      await validateField(inputValue);
      if (!error) await save();
      return;
    }

    await save();
  };

  return (
    <div className="grid grid-cols-[160px,1fr,28px] items-start py-2">
      {/* Label */}
      <span className="pt-2 text-sm text-dark">{label}</span>

      {/* Valor / Input */}
      <div className="relative w-full">
        {editing ? (
          <>
            <div className="relative flex items-center">
              <input
                type={isPassword && !showPassword ? "password" : "text"}
                className={`w-full rounded p-1 pr-9 text-sm outline-none
                    ${
                      error
                        ? "border border-error"
                        : // CHANGED: volvemos al borde gris y sin ring verde
                          "border border-gray2 focus:border-gray2 focus:ring-0"
                    }
                  `}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  validateField(e.target.value);
                }}
                onBlur={!isPassword ? save : undefined}
                disabled={loading}
                autoFocus
                placeholder={isFullName ? "Nombre Apellido" : undefined}
              />

              {/* Ojo (solo password) */}
              {isPassword && (
                <button
                  type="button"
                  className="absolute right-2 text-gray2 hover:text-dark disabled:opacity-50"
                  onMouseDown={(e) => e.preventDefault()} // CHANGED: evita blur y autosave accidental
                  onClick={() => setShowPassword((s) => !s)}
                  disabled={loading}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              )}
            </div>

            {error && (
              <p className="mt-1 text-xs font-medium text-error">{error}</p>
            )}
          </>
        ) : (
          <span className="truncate text-sm text-dark2/40">
            {/* CHANGED: fuera de edición, siempre asteriscos para password */}
            {isPassword ? "******" : value}
          </span>
        )}
      </div>

      {/* Ícono editar / guardar */}
      {!locked ? (
        <button
          type="button"
          onClick={handleEditClick} // CHANGED
          className={`justify-self-end ${editing ? "text-green" : "text-gray2 "}`} // CHANGED
          disabled={loading} // CHANGED
          aria-label={editing ? "Guardar" : `Editar ${label}`}
          title={editing ? "Guardar" : "Editar"}
        >
          <EditIcon />
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}
