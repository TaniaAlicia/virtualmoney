export type TransactionType = {
  id: number;
  accountId: number;
  amount: number;             // en pesos (ajusta si tu API usa centavos)
  type: "in" | "out";         // ó el enum que devuelva tu API
  description?: string;
  createdAt: string;          // ISO
  updatedAt?: string;
  destination?: string;
  origin?: string;
  dated?: string;             // Fecha de la transacción ISO
  
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

/* export type TransactionType = {
  id: number;
  accountId: number;
  amount: number;             // en pesos (negativo o positivo)
  type?: "in" | "out";        // opcional, depende del backend
  description?: string;
  origin?: string;
  destination?: string;
  dated?: string;             // 🔹 Fecha de creación ISO (nuevo campo)
  destinationCvu?: string;    // 🔹 CVU destino opcional
  createdAt?: string;         // 🔹 Por compatibilidad
  updatedAt?: string;
}; */