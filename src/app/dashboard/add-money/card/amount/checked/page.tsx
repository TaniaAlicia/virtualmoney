"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CheckAddMoney from "@/components/add-money/CheckAddMoney";
import { getAccount } from "@/services/accountService";
import MobileCrumb from "@/components/generals/MobileCrumb";
import CustomToaster from "@/components/generals/CustomToaster";

export default function AddMoneyCheckedPage() {
  const [token, setToken] = useState<string | null>(null);
  const [accountData, setAccountData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const storedToken = Cookies.get("token");
        if (!storedToken) {
          console.error("No se encontró el token en las cookies");
          return;
        }

        setToken(storedToken);
        const account = await getAccount();
        setAccountData(account);
      } catch (error) {
        console.error("Error al obtener la cuenta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  if (loading) {
    return (
      <main className="max-w-8xl mx-auto flex-1 bg-gray1 px-6 py-10 text-center text-dark">
        Cargando datos de la cuenta...
      </main>
    );
  }

  if (!token || !accountData) {
    return (
      <main className="max-w-8xl mx-auto flex-1 bg-gray1 px-6 py-10 text-center text-dark">
        No se pudieron cargar los datos de la cuenta.
      </main>
    );
  }

 return (
  <main className="max-w-8xl mx-auto flex-1 bg-gray1 px-6 pb-6 pt-0 text-dark">
    <CustomToaster />
    <MobileCrumb />

    {/* Margen superior para separar del crumb */}
    <div className="mt-6 md:mt-6">
      <CheckAddMoney accountData={accountData} token={token} />
    </div>
  </main>
);

}
