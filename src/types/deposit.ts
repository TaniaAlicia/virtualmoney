

export type DepositType = {
  id: number;
  account_id: number;
  amount: number;
  dated: string;                // ✅ viene del backend
  description: string;
  destination: string;          // ✅ "Digital Money House"
  origin: string;               // ✅ "Cuenta propia"
  type: string;
  // 🧩 Campos opcionales añadidos para compatibilidad visual
  createdAt?: string;           // alias para SuccessPage
  destinationCvu?: string;      // para mostrar el CVU destino
};
