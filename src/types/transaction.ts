export type TransactionType = {
  id: number;
  accountId: number;
  amount: number;
  type: "in" | "out";
  description?: string;
  createdAt: string;
  updatedAt?: string;
  destination?: string;
  origin?: string;
  dated?: string;
};

export type NewTransactionType = {
  amount: number;
  description?: string;
};

export type TransactionIdType = {
  id: number;
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  origin: string;
  type: string;
};
