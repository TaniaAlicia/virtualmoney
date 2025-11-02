"use client";

import React, { useEffect, useMemo, useState } from "react";
import ServiceFilter from "@/components/pay-services/ServiceFilter";
import { normalizeText } from "@/utils/normalizeText";
import ServicesList from "@/components/pay-services/ServiceList";
import MobileCrumb from "@/components/generals/MobileCrumb";
import { getAllServices } from "@/services/servicesService";
import type { ServiceType } from "@/types/service";
import Cookies from "js-cookie";

export default function PaymentsPage() {
  const [servicesList, setServicesList] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = Cookies.get("token") ?? ""; // ✅ mismo método que en ActivityDetailPage
        if (!token) {
          setError(
            "No se encontró el token de sesión. Iniciá sesión nuevamente.",
          );
          setLoading(false);
          return;
        }

        const data = await getAllServices(); // ✅ pasamos el token
        setServicesList(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error al obtener servicios:", err.message);
          setError(err.message);
        } else {
          setError("Error desconocido al obtener servicios.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return servicesList;
    return servicesList.filter((s) => normalizeText(s.name).includes(q));
  }, [query, servicesList]);

  if (loading) {
    return (
      <main className="flex h-full flex-col items-center justify-center text-gray-500">
        Cargando servicios...
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex h-full flex-col items-center justify-center text-red-600">
        {error}
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col gap-6 p-4 md:p-6">
      <MobileCrumb />

      {/* 🔍 Filtro superior */}
      <ServiceFilter
        debounceMs={250}
        onDebouncedChange={setQuery}
        placeholder="Buscá entre más de 5.000 empresas"
      />

      {/* 📋 Listado de servicios */}
      <ServicesList servicesList={filteredServices} showServicePage={true} />
    </main>
  );
}
