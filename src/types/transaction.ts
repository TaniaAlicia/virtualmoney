export type TransactionType = {
  id: number;
  accountId: number;
  amount: number;             // en pesos (ajusta si tu API usa centavos)
  type: "in" | "out";         // ó el enum que devuelva tu API
  description?: string;
  createdAt: string;          // ISO
  updatedAt?: string;
  // agrega campos que necesites según tu API: counterparty, status, etc.
};

export type NewTransactionType = {
  amount: number;
  description?: string;
  // completa con lo que requiera tu endpoint: toAccountId, type, etc.
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