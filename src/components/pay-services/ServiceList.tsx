"use client";
import Image from "next/image";

export default function ServicesList() {
  const mockServices = [
    { id: 1, name: "Netflix", src: "/images/netflix.png" },
    { id: 2, name: "Amazon Prime Video", src: "/images/prime.png" },
    { id: 3, name: "Hulu", src: "/images/hulu.png" },
  ];

  return (
    <div className="w-full flex flex-col p-5 bg-white rounded-[10px] shadow">
      <h2 className="text-base md:text-lg font-bold border-b border-dark1/30 pb-4">
        Más recientes
      </h2>

      <ul>
        {mockServices.map((service) => (
          <li
            key={service.id}
            className="flex items-center justify-between border-b border-gray-200 py-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={service.src}
                alt={service.name}
                width={60}
                height={30}
                className="object-contain"
              />
              <span className="text-dark1">{service.name}</span>
            </div>
            <button className="text-sm font-bold text-green-700">
              Seleccionar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
