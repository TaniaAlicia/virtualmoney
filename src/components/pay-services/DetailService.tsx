"use client";

import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
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

const fmtDate = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
};

export default function DetailService() {
  const { serviceId } = useSelectService();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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

  const title = loading ? "Cargando…" : (service?.name ?? "Servicio");
  const total = loading ? "—" : currency(service?.invoice_value);
  const fechaEmision = useMemo(() => fmtDate(service?.date), [service?.date]);

  return (
    <section className="rounded-[10px] bg-dark p-6 shadow-md md:p-8">
      <div className="mb-4 flex items-start justify-between md:items-center">
        <h2 className="text-xl font-bold text-green md:text-2xl">{title}</h2>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mt-1 text-left text-sm font-bold leading-none text-light underline decoration-white/50 underline-offset-2 hover:decoration-white/60 md:mt-0"
          aria-expanded={open}
        >
          Ver detalles del pago
        </button>
      </div>

      <hr className="border-white/8" />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-bold text-light md:text-xl">Total a pagar</p>
        <p className="text-2xl font-extrabold text-light md:text-3xl">
          {total}
        </p>
      </div>

      <div
        className={`grid transition-all duration-200 ${
          open
            ? "mt-5 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-[8px] border border-white/10 bg-black/10 p-4 md:p-5">
            <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Detail label="Servicio" value={service?.name ?? "—"} />
              <Detail label="Fecha de emisión" value={fechaEmision} />
              <Detail
                label="Importe"
                value={
                  service?.invoice_value != null
                    ? currency(service.invoice_value)
                    : "—"
                }
              />
              <Detail
                label="Identificador"
                value={service?.id ? `#${service.id}` : "—"}
              />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs text-light/70">{label}</dt>
      <dd className="text-sm font-semibold text-light">{value}</dd>
    </div>
  );
}
