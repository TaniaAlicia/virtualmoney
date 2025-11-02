export type AccountType = {
  id: number;
  user_id?: number;
  balance?: number; // centavos o pesos, según tu API (aquí asumimos pesos)
  alias?: string;
  cvu?: string;
  createdAt?: string;
  updatedAt?: string;
  available_amount?: number;
};
/* export type Account = {
  id: number;
  user_id?: number;
  userId?: number;
  cvu?: string;
  alias?: string;
  balance?: number;
}; */
