"use client";

import BaseLayout from "@/components/generals/BaseLayout";
import { CheckCircle } from "lucide-react"; // o tu ícono personalizado
import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <BaseLayout variant="register">
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold">Registro Exitoso</h1>

        <CheckCircle className="mb-4 h-16 w-16 text-green" />

        <p className="mb-6 max-w-md text-center text-sm text-white">
          Hemos enviado un correo de confirmación para validar tu email, por
          favor revísalo para iniciar sesión.
        </p>

        <Link
          href="/login"
          className="w-72 w-full rounded-[10px] bg-green p-3 text-center text-base font-bold text-black focus:outline-2 focus:outline-black md:w-[360px] md:p-5"
        >
          Continuar
        </Link>
      </main>
    </BaseLayout>
  );
}
