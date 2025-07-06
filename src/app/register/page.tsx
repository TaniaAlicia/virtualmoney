'use client'

import { useForm, FormProvider } from "react-hook-form"
import { useRouter } from "next/navigation"
import BaseLayout from "@/components/generals/BaseLayout"
import { RegisterFormData } from "@/types/RegisterFormData"
import { registerUser } from "@/services/userService"
import { useState } from "react"
import EmailInput from "@/components/authentication/EmailInput"
import PasswordInput from "@/components/authentication/PasswordInput"

export default function RegisterPage() {
  const methods = useForm<RegisterFormData>()
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods

  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState("")

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden")
      return
    }

    try {
      const payload = {
        ...data,
        dni: Number(data.dni),
      }

      await registerUser(payload)
      setErrorMsg("")
      router.push("/register/success")
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrorMsg("El correo ya está registrado")
      } else {
        setErrorMsg("Ocurrió un error. Intentalo más tarde.")
      }
    }
  }

  return (
    <BaseLayout variant="register">
      <main className="flex grow flex-col items-center justify-center px-4 py-10">
        <h2 className="mb-6 text-center text-xl font-bold">Crear cuenta</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full max-w-[720px] grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
          >
            {/* Nombre */}
            <div className="flex flex-col">
              <input
                placeholder="Nombre*"
                {...methods.register("firstName", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/,
                    message: "Solo letras y espacios",
                  },
                })}
                className={`h-[64px] rounded-[10px] p-4 text-black ${errors.firstName ? "border border-red-500" : ""}`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm italic text-error">{errors.firstName.message}</p>
              )}
            </div>

            {/* Apellido */}
            <div className="flex flex-col">
              <input
                placeholder="Apellido*"
                {...methods.register("lastName", {
                  required: "El apellido es obligatorio",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/,
                    message: "Solo letras y espacios",
                  },
                })}
                className={`h-[64px] rounded-[10px] p-4 text-black ${errors.lastName ? "border border-red-500" : ""}`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm italic text-error">{errors.lastName.message}</p>
              )}
            </div>

            {/* DNI */}
            <div className="flex flex-col">
              <input
                placeholder="DNI*"
                {...methods.register("dni", {
                  required: "El DNI es obligatorio",
                  pattern: {
                    value: /^\d{6,15}$/,
                    message: "Debe contener solo números (6-15 dígitos)",
                  },
                })}
                className={`h-[64px] rounded-[10px] p-4 text-black ${errors.dni ? "border border-red-500" : ""}`}
              />
              {errors.dni && (
                <p className="text-sm italic text-error">{errors.dni.message}</p>
              )}
            </div>

            {/* Email */}
            <EmailInput />

            {/* Nota sobre contraseña */}
            <p className="col-span-2 text-sm text-white">
              Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter especial, una mayúscula y un número)
            </p>

            {/* Contraseña */}
            <PasswordInput fieldName="password" />

            {/* Confirmar contraseña */}
            <PasswordInput fieldName="confirmPassword" />

            {/* Teléfono */}
            <div className="flex flex-col">
              <input
                placeholder="Teléfono*"
                {...methods.register("phone", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^\d{6,15}$/,
                    message: "Debe contener solo números (6-15 dígitos)",
                  },
                })}
                className={`h-[64px] rounded-[10px] p-4 text-black ${errors.phone ? "border border-red-500" : ""}`}
              />
              {errors.phone && (
                <p className="text-sm italic text-error">{errors.phone.message}</p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="h-[64px] w-full rounded-[10px] bg-green font-bold text-black transition hover:bg-lime-300 sm:col-start-2"
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
  )
}
