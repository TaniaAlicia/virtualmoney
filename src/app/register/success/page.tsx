'use client';

import PublicLayout from "@/components/PublicLayout";
import { CheckCircle } from "lucide-react"; // o tu ícono personalizado
import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <PublicLayout variant="register">
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold">Registro Exitoso</h1>

        <CheckCircle className="mb-4 h-16 w-16 text-green" />

        <p className="mb-6 text-sm text-white max-w-md">
          Hemos enviado un correo de confirmación para validar tu email,
          por favor revísalo para iniciar sesión.
        </p>

        <Link
          href="/login"
          className="h-[64px] w-[200px] rounded-[10px] bg-green font-bold text-black transition hover:bg-lime-300 flex items-center justify-center"
        >
          Continuar
        </Link>
      </main>
    </PublicLayout>
  );
}
