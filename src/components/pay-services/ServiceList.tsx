"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ServiceType } from "@/types/service";
import { servicesData } from "@/data/service";
import { useSelectService } from "@/context/moneyContext";

type Props = {
  servicesList: ServiceType[];
  showServicePage: boolean;
};

export default function ServicesList({ servicesList, showServicePage }: Props) {
  const router = useRouter();
  const { setServiceId } = useSelectService();

  const handleSelectService = (service: ServiceType) => {
    setServiceId(service.id.toString());
    router.push("/dashboard/payments/account");
  };

  return (
    <section className="flex w-full flex-col items-center gap-5">
      <div className="mt-4 flex w-full flex-col rounded-[10px] bg-white p-5 shadow-md md:px-8 xl:px-12 xl:py-8">
        <h2 className="border-b border-gray-300 pb-5 text-base font-bold text-black md:text-lg">
          Más recientes
        </h2>

        {servicesList.length === 0 ? (
          <p className="mt-4 text-gray-500">
            No hay servicios disponibles en este momento.
          </p>
        ) : (
          <ul className="w-full">
            {servicesList.map((service) => (
              <li
                key={service.id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex h-[30px] w-[70px] shrink-0 items-center justify-center">
                    <Image
                      src={
                        servicesData[service.id]?.src ??
                        "/images/default-service.png"
                      }
                      alt={servicesData[service.id]?.alt ?? service.name}
                      width={70}
                      height={30}
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 text-center md:pl-28 md:text-left">
                    <span className="text-base font-medium text-black">
                      {service.name}
                    </span>
                  </div>

                  {showServicePage && (
                    <div className="w-fit flex-shrink-0">
                      <button
                        onClick={() => handleSelectService(service)}
                        className="hover:text-green-600 text-base font-bold text-[#004B32]"
                      >
                        Seleccionar
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
