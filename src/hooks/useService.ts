"use client";

import { useState, useEffect, ChangeEvent } from "react";
import type { ServiceType } from "@/types/service";

const useServices = (allServices: ServiceType[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<ServiceType[]>(allServices);

  // 🔹 Actualiza el término de búsqueda cuando el usuario escribe
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // 🔹 Filtra cada vez que cambia el término o la lista
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = allServices.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(allServices);
    }
  }, [searchTerm, allServices]);

  return { filteredServices, searchTerm, handleSearchChange };
};

export default useServices;
