"use client";
import React, { useEffect, useState } from "react";
import CvuAliasCard from "@/components/profile/CvuAliasCard";
import { getAccount } from "@/services/accountService";
import Cookies from "js-cookie";
import MobileCrumb from "@/components/generals/MobileCrumb";
import type { AccountType } from "@/types/account";

const BankPage = () => {
  const [account, setAccount] = useState<AccountType | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const token = Cookies.get("token") || "";
        if (!token) {
          console.warn("No auth token; redirigí al login si hace falta");
          return;
        }

        const acc = await getAccount();
        if (!mounted) return;
        setAccount(acc as AccountType);

        const userId = (acc as AccountType)?.user_id;
        if (userId == null) {
          console.error("userId faltante en account:", acc);
          return;
        }
      } catch (e) {
        console.error(e);
      } finally {
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="flex flex-col gap-6 p-6 md:p-10">
      <MobileCrumb />
      <CvuAliasCard cvu={account?.cvu ?? ""} alias={account?.alias ?? ""} />
    </section>
  );
};

export default BankPage;
