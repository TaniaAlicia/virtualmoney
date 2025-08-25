export type AccountType = {
  id: number;
  userId: number;
  balance: number;       // centavos o pesos, según tu API (aquí asumimos pesos)
  alias?: string;
  cvu?: string;
  createdAt?: string;
  updatedAt?: string;
};
