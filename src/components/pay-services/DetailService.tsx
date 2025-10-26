"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSelectService } from "@/context/moneyContext";
import { getServiceId } from "@/services/servicesService";

type ServiceDetail = {
  id: number;
  name: string;
  date: string;
  invoice_value?: number;
};

const currency = (n?: number) =>
  (n ?? 0).toLocaleString("es-AR", { style: "currency", currency: "ARS" });

export default function DetailService() {
  const { serviceId } = useSelectService();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (!serviceId) return;
        const token = Cookies.get("token") ?? "";
        const data = await getServiceId(String(serviceId), token);
        if (active) setService(data);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [serviceId]);

  return (
    <section className="rounded-[10px] bg-dark p-6 shadow-md md:p-8">
      {/* En mobile alineamos arriba; en md+ volvemos al centro */}
      <div className="mb-4 flex justify-between items-start md:items-center">
        <h2 className="text-xl font-bold text-green md:text-2xl">
          {loading ? "Cargando…" : service?.name ?? "Servicio"}
        </h2>

        <Link
          href="#"
           className="text-sm font-bold text-light underline decoration-white/50 hover:decoration-white/60 decoration-1 underline-offset-2 leading-none -mt-1 md:mt-0"
        >
          Ver detalles del pago
        </Link>
      </div>

      {/* línea un poco más clarita */}
      <hr className="border-white/8" />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-bold text-light md:text-xl">Total a pagar</p>
        <p className="text-2xl font-extrabold text-light md:text-3xl">
          {loading ? "—" : currency(service?.invoice_value)}
        </p>
      </div>
    </section>
  );
}
