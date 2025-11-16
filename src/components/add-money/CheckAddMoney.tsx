"use client";

import EditAmountIcon from "@/components/icons/EditIcon";
import { useSetAmount } from "@/context/moneyContext";
import { useRouter } from "next/navigation";
import { createDeposit } from "@/services/transferencesService";
import { useTransaction } from "@/context/transactionContext";
import type { DepositType } from "@/types/deposit";
import { AccountType } from "@/types/account";

type CheckAddMoneyProps = {
  accountData: AccountType;
  token: string;
};

const CheckAddMoney = ({ accountData, token }: CheckAddMoneyProps) => {
  const router = useRouter();
  const { amount } = useSetAmount();
  const { setTransaction } = useTransaction();

  const handleEditAmount = () => {
    router.push("/dashboard/add-money/card/amount");
  };

  const handleSuccessAddMoney = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    try {
      const body = {
        amount: Number(amount),
        dated: new Date().toISOString(),
        destination: "Digital Money House",
        origin: "Cuenta propia",
      };

      const deposit: DepositType = await createDeposit(accountData.id, body, token);
      setTransaction(deposit); 

      router.push("/dashboard/add-money/card/amount/checked/success");
    } catch (error) {
      console.error("❌ Error al crear depósito:", error);
      router.push("/dashboard/add-money/card/amount/checked/error");
    }
  };

  return (
    <section className="mt-4 flex flex-col gap-5 md:mt-6">
      <div className="flex flex-col gap-3 rounded-[10px] bg-dark p-6 shadow-sm md:px-8 md:py-10">
        <h2 className="pb-3 text-xl font-bold text-green md:ml-6 md:text-2xl">
          Revisá que está todo bien
        </h2>

        <div className="border-b border-gray1 md:hidden"></div>

        <div className="mb-4 mt-2 flex flex-col gap-6 text-light md:ml-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <p className="text-base">Vas a transferir</p>
              <EditAmountIcon
                className="h-4 w-4 cursor-pointer text-green"
                onClick={handleEditAmount}
              />
            </div>
            <p className="text-base font-bold">
              {amount.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs">Para</p>
            <p className="text-lg font-bold">Cuenta propia</p>
          </div>

          <div className="flex flex-col gap-1">
            <p>Digital Money House</p>
            <p className="text-xs">CVU {accountData.cvu}</p>
          </div>
        </div>

        <div className="mt-4 hidden md:flex md:justify-end">
          <button
            onClick={handleSuccessAddMoney}
            className="text-dark1 rounded-[10px] bg-green p-5 text-center font-bold shadow hover:brightness-110 md:w-full xl:w-[233px]"
          >
            Continuar
          </button>
        </div>
      </div>

      <div className="flex h-[50px] w-full justify-end md:hidden">
        <button
          onClick={handleSuccessAddMoney}
          className="w-1/2 rounded-[10px] bg-green py-3 font-bold text-dark shadow hover:brightness-110"
        >
          Continuar
        </button>
      </div>
    </section>
  );
};

export default CheckAddMoney;
