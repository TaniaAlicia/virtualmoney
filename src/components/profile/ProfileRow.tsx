"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { updateUser } from "@/services/userService";
import EditIcon from "@/components/profile/EditIcon";
import { registerSchema } from "@/schemas/registerSchema";
import { EyeIcon } from "@/components/generals/EyeIcon";
import { EyeOffIcon } from "@/components/generals/EyeOffIcon";

import { toast } from "sonner";

type FieldUnion = "fullName" | "firstName" | "lastName" | "phone" | "password";

type Props = {
  label: string;
  value: string;
  field?: FieldUnion;
  userId?: number;
  locked?: boolean;
  onUpdate?: (field: Exclude<FieldUnion, "fullName">, value: string) => void;
};

function splitFullName(raw: string) {
  const normalized = (raw ?? "").trim().replace(/\s+/g, " ");
  if (!normalized) return { first: "", last: "" };
  const parts = normalized.split(" ");
  const first = parts.shift() ?? "";
  const last = parts.join(" ");
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
  const isPassword = field === "password";
  const isFullName = field === "fullName";

  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setInputValue(isPassword ? "" : value);
  }, [value, isPassword]);

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

  const validateField = async (val: string) => {
    if (!field) return;
    if (isFullName) return validateFullName(val);
    try {
      await registerSchema.validateAt(field, { [field]: val });
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Error de validación");
      }
    }
  };

  const save = async () => {
    if (!field || !userId || error) return;

    const token = Cookies.get("token");
    if (!token) return;

    const trimmed = (inputValue ?? "").trim();

    if (field === "password" && trimmed === "") {
      setEditing(false);
      setShowPassword(false);
      setError(null);
      return;
    }

    if (isFullName) {
      const current = (value ?? "").trim().replace(/\s+/g, " ");
      const next = trimmed.replace(/\s+/g, " ");
      if (current === next) {
        setEditing(false);
        return;
      }

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
          { firstName: first, lastName: last },
          token,
        );

        setEditing(false);
        toast.success("Datos actualizados correctamente");

        const newFirst =
          updated?.firstname ?? updated?.firstName ?? first ?? "";
        const newLast = updated?.lastname ?? updated?.lastName ?? last ?? "";

        onUpdate?.("firstName", newFirst);
        onUpdate?.("lastName", newLast);
      } catch (e) {
        console.error("Error al actualizar:", e);
        toast.error("No se pudieron actualizar los datos");
      } finally {
        setLoading(false);
      }
      return;
    }

    const current = (value ?? "").trim();
    if (field !== "password" && trimmed === current) {
      setEditing(false);
      return;
    }

    try {
      setLoading(true);

      // 1) mapear el nombre que espera el API
      const apiField =
        field === "firstName"
          ? "firstname"
          : field === "lastName"
            ? "lastname"
            : field;

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
      }

      onUpdate?.(field, nextValue);
    } catch (e) {
      console.error("Error al actualizar:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async () => {
    if (loading || locked) return;

    if (!editing) {
      setEditing(true);
      if (field === "password") {
        setShowPassword(false);
        setInputValue("");
        setError(null);
      }
      return;
    }

    if (field === "password") {
      if ((inputValue ?? "").trim() === "") {
        setEditing(false);
        setShowPassword(false);
        setError(null);
        return;
      }
      await validateField(inputValue);
      if (!error) await save();
      return;
    }

    await save();
  };

  return (
    <div className="grid grid-cols-[160px,1fr,28px] items-start py-2">
      <span className="pt-2 text-sm text-dark">{label}</span>

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
                        : "border border-gray2 focus:border-gray2 focus:ring-0"
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

              {isPassword && (
                <button
                  type="button"
                  className="absolute right-2 text-gray2 hover:text-dark disabled:opacity-50"
                  onMouseDown={(e) => e.preventDefault()}
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
            {isPassword ? "******" : value}
          </span>
        )}
      </div>

      {!locked ? (
        <button
          type="button"
          onClick={handleEditClick}
          className={`justify-self-end ${editing ? "text-green" : "text-gray2 "}`}
          disabled={loading}
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
