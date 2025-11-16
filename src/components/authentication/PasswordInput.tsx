"use client";

import { useFormContext } from "react-hook-form";

type PasswordInputProps = {
  fieldName?: "password" | "confirmPassword";
};

export default function PasswordInput({
  fieldName = "password",
}: PasswordInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[fieldName]?.message as string | undefined;

  return (
    <div className="flex w-full flex-col">
      <input
        type="password"
        placeholder={
          fieldName === "password" ? "Contraseña*" : "Confirmar contraseña*"
        }
        {...register(fieldName)}
        className={`h-[64px] w-full rounded-[10px] border p-4 text-black ${
          error ? "border-red-500" : "border-transparent"
        }`}
      />
      {error && <p className="text-sm italic text-error">{error}</p>}
    </div>
  );
}
