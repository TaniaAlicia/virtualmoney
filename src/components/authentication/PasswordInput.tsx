'use client'

import { useFormContext } from "react-hook-form"

type PasswordInputProps = {
  fieldName?: "password" | "confirmPassword"
}

export default function PasswordInput({ fieldName = "password" }: PasswordInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext()

  const error = errors[fieldName]?.message as string | undefined

  const validationRules =
    fieldName === "confirmPassword"
      ? {
          required: "La confirmación es obligatoria",
          validate: (value: string) =>
            value === watch("password") || "Las contraseñas no coinciden",
        }
      : {
          required: "La contraseña es obligatoria",
          minLength: { value: 6, message: "Mínimo 6 caracteres" },
          maxLength: { value: 20, message: "Máximo 20 caracteres" },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,20}$/,
            message: "Debe tener mayúscula, número y carácter especial",
          },
        }

  return (
    <div className="w-full flex flex-col">
      <input
        type="password"
        placeholder={fieldName === "password" ? "Contraseña*" : "Confirmar contraseña*"}
        {...register(fieldName, validationRules)}
        className={`h-[64px] w-full rounded-[10px] p-4 text-black ${
          error ? "border border-red-500" : ""
        }`}
      />
      {error && <p className="text-sm italic text-error">{error}</p>}
    </div>
  )
}
