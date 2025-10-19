"use client";

import React, { useEffect, useState } from "react";
import ServiceFilter from "@/components/pay-services/ServiceFilter";
import ServicesList from "@/components/pay-services/ServiceList";
import MobileCrumb from "@/components/generals/MobileCrumb";
import { getAllServices } from "@/services/servicesService";
import type { ServiceType } from "@/types/service";
import Cookies from "js-cookie";

export default function PaymentsPage() {
  const [servicesList, setServicesList] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = Cookies.get("token") ?? ""; // ✅ mismo método que en ActivityDetailPage
        if (!token) {
          setError("No se encontró el token de sesión. Iniciá sesión nuevamente.");
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

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center h-full text-gray-500">
        Cargando servicios...
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col items-center justify-center h-full text-red-600">
        {error}
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 w-full p-4 md:p-6">
      <MobileCrumb />

      {/* 🔍 Filtro superior */}
      <ServiceFilter />

      {/* 📋 Listado de servicios */}
      <ServicesList servicesList={servicesList} showServicePage={true} />
    </main>
  );
}
