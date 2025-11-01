export type CardType = {
  id: number | string;
  account_id?: number;
  number_id?: number;         
  first_last_name?: string;
  expiration_date?: string;
  cod?: number;
  last4?: string;              
  brand?: string;
  createdAt?: string;
};
export type CardBodyType = {
  number_id: number;        // solo dígitos
  first_last_name: string;
  expiration_date: string;  // "YYYY-MM"
  cod: number;              // CVV
  brand?: string;
};

export type CardFormData = {
  numberCard: string;
  nameTitular: string;
  expirationDate: string; // MM/YY
  securityCode: string;
};