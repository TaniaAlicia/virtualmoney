"use client";

import BaseLayout from "@/components/generals/BaseLayout";
import { useForm, FormProvider } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/services/authService";
import PasswordInput from "@/components/authentication/PasswordInput";

type FormData = {
  password: string;
};

export default function PasswordPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [errorMsg, setErrorMsg] = useState("");

  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(email, data.password);
      localStorage.setItem("token", response.token);
      setErrorMsg("");
      router.push("/dashboard");
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string }; status?: number };
      };
      const msg = err.response?.data?.error;

      if (msg === "user not found") {
        setErrorMsg("Error: el usuario no existe en la base de datos");
      } else if (err.response?.status === 401) {
        setErrorMsg("Correo o contraseña inválidos");
      } else {
        setErrorMsg("Ocurrió un error. Intentalo más tarde.");
      }
    }
  };

  return (
    <BaseLayout variant="login">
      <main className="flex grow flex-col items-center justify-center px-4">
        <h2 className="mb-4 text-center font-bold">Ingresá tu contraseña</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-[360px]">
              <PasswordInput fieldName="password" />
            </div>

            <button
              type="submit"
              className="h-[64px] w-[360px] rounded-[10px] bg-green font-bold text-black transition hover:bg-lime-300"
            >
              Continuar
            </button>

            {errorMsg && (
              <p className="text-sm italic text-error">{errorMsg}</p>
            )}
          </form>
        </FormProvider>
      </main>
    </BaseLayout>
  );
}
