"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import PublicLayout from "@/components/PublicLayout";
import { RegisterFormData } from "@/types/RegisterFormData";
import { registerUser } from "@/services/userService";
import { useState } from "react";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    try {
      // Convertir DNI a número explícitamente
      const payload = {
        ...data,
        dni: Number(data.dni),
      };

      await registerUser(payload);
      setErrorMsg("");
      router.push("/register/success");
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrorMsg("El correo ya está registrado");
      } else {
        setErrorMsg("Ocurrió un error. Intentalo más tarde.");
      }
    }
  };

  return (
    <PublicLayout variant="register">
      <main className="flex grow flex-col items-center justify-center px-4 py-10">
        <h2 className="mb-6 text-center text-xl font-bold">Crear cuenta</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full max-w-[720px] grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
        >
          <input
            placeholder="Nombre*"
            {...register("firstName", { required: true })}
            className={`h-[64px] rounded-[10px] p-4 text-black ${errors.firstName ? "border border-red-500" : ""}`}
          />
          <input
            placeholder="Apellido*"
            {...register("lastName", { required: true })}
            className={`h-[64px] rounded-[10px] p-4 text-black ${errors.lastName ? "border border-red-500" : ""}`}
          />

          <input
            placeholder="DNI*"
            {...register("dni", { required: true })}
            className={`h-[64px] rounded-[10px] p-4 text-black ${errors.dni ? "border border-red-500" : ""}`}
          />
          <input
            placeholder="Correo electrónico*"
            type="email"
            {...register("email", { required: true })}
            className={`h-[64px] rounded-[10px] p-4 text-black ${errors.email ? "border border-red-500" : ""}`}
          />

          <p className="col-span-2 text-sm text-white">
            Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter
            especial, una mayúscula y un número)
          </p>

          <input
            placeholder="Contraseña*"
            type="password"
            {...register("password", { required: true })}
            className={`h-[64px] rounded-[10px] p-4 text-black ${errors.password ? "border border-red-500" : ""}`}
          />
          <input
            placeholder="Confirmar contraseña*"
            type="password"
            {...register("confirmPassword", { required: true })}
            className={`h-[64px] rounded-[10px] p-4 text-black ${errors.confirmPassword ? "border border-red-500" : ""}`}
          />

          <input
            placeholder="Teléfono*"
            {...register("phone", { required: true })}
            className={`h-[64px] rounded-[10px] p-4 text-black ${errors.phone ? "border border-red-500" : ""}`}
          />

          <button
            type="submit"
            className="h-[64px] w-full rounded-[10px] bg-green font-bold text-black transition hover:bg-lime-300 sm:col-start-2"
          >
            Crear cuenta
          </button>
        </form>

        {(Object.keys(errors).length > 0 || errorMsg) && (
          <p className="mt-4 text-sm italic text-error">
            {errorMsg || "Completá los campos requeridos"}
          </p>
        )}
      </main>
    </PublicLayout>
  );
}
