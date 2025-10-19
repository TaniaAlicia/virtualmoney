"use client";

import React from "react";
import ServiceFilter from "@/components/pay-services/ServiceFilter";
import ServiceList from "@/components/pay-services/ServiceList";
import MobileCrumb from "@/components/generals/MobileCrumb";

export default function PaymentsPage() {
  return (
    <main className="flex flex-col gap-6 w-full p-4 md:p-6">
      <MobileCrumb />
      {/* Filtro de búsqueda */}
      <ServiceFilter />

      {/* Listado de servicios */}
      <ServiceList />
    </main>
  );
}
