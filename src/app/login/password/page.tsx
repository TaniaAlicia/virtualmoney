import { Suspense } from "react";
import PasswordPageClient from "../../../components/authentication/PasswordPageClient";

export default function PasswordPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PasswordPageClient />
    </Suspense>
  );
}
