import { Suspense } from "react";
import ActivityDetailPage from "./ActivityDetailPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ActivityDetailPage />
    </Suspense>
  );
}