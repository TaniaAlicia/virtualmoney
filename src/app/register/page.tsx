"use client";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/registerSchema";
import { useRouter } from "next/navigation";
import BaseLayout from "@/components/generals/BaseLayout";
import { RegisterFormData } from "@/types/RegisterFormData";
import { registerUser } from "@/services/userService";
import { useState } from "react";
import EmailInput from "@/components/authentication/EmailInput";
import PasswordInput from "@/components/authentication/PasswordInput";

export default function RegisterPage() {
  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const payload = {
        ...data,
        dni: Number(data.dni),
      };

      await registerUser(payload);
      setErrorMsg("");
      router.push("/register/success");
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { status?: number } }).response ===
          "object" &&
        (error as { response?: { status?: number } }).response?.status === 400
      ) {
        setErrorMsg("El correo ya está registrado");
      } else {
        setErrorMsg("Ocurrió un error. Intentalo más tarde.");
      }
    }
  };

  return (
    <BaseLayout variant="register">
      <main className="flex grow flex-col items-center justify-center px-4 py-10">
        <h2 className="mb-6 text-center text-xl font-bold">Crear cuenta</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full max-w-[720px] grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-2"
          >
            {/* Nombre */}
            <div className="flex flex-col">
              <input
                placeholder="Nombre*"
                {...register("firstName")}
                className={`h-[64px] rounded-[10px] p-4 text-black ${
                  errors.firstName ? "border border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm italic text-error">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Apellido */}
            <div className="flex flex-col">
              <input
                placeholder="Apellido*"
                {...register("lastName")}
                className={`h-[64px] rounded-[10px] p-4 text-black ${
                  errors.lastName ? "border border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm italic text-error">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* DNI */}
            <div className="flex flex-col">
              <input
                placeholder="DNI*"
                {...register("dni")}
                className={`h-[64px] rounded-[10px] p-4 text-black ${
                  errors.dni ? "border border-red-500" : ""
                }`}
              />
              {errors.dni && (
                <p className="text-sm italic text-error">
                  {errors.dni.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <EmailInput />
            </div>

            {/* Nota sobre contraseña */}
            <p className="text-sm text-white sm:col-span-1 md:col-span-2 xl:col-span-2">
              Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter
              especial, una mayúscula y un número)
            </p>

            {/* Contraseña */}
            <div className="flex flex-col">
              <PasswordInput fieldName="password" />
            </div>

            {/* Confirmar contraseña */}
            <PasswordInput fieldName="confirmPassword" />

            {/* Teléfono */}
            <div className="flex flex-col">
              <input
                placeholder="Teléfono*"
                {...register("phone")}
                className={`h-[64px] rounded-[10px] p-4 text-black ${
                  errors.phone ? "border border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-sm italic text-error">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="h-[64px] w-full rounded-[10px] bg-green font-bold text-black transition hover:bg-lime-300 md:col-span-2"
            >
              Crear cuenta
            </button>
          </form>
        </FormProvider>

        {/* Error general */}
        {(Object.keys(errors).length > 0 || errorMsg) && (
          <p className="mt-4 text-sm italic text-error">
            {errorMsg ||
              (Object.values(errors).some((e) => e.type === "required")
                ? "Completá los campos requeridos"
                : "")}
          </p>
        )}
      </main>
    </BaseLayout>
  );
}
