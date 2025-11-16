import { create } from "zustand";
import type { DepositType } from "@/types/deposit"; 

type TransactionStore = {
  transaction: DepositType | null;
  setTransaction: (tx:DepositType) => void;
  clearTransaction: () => void;
};

export const useTransaction = create<TransactionStore>((set) => ({
  transaction: null,
  setTransaction: (tx) => set({ transaction: tx }),
  clearTransaction: () => set({ transaction: null }),
}));
