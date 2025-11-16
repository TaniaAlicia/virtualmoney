export type DepositType = {
  id: number;
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  origin: string;
  type: string;
  createdAt?: string;
  destinationCvu?: string;
};
