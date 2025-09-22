export type DateLike = string | number | Date;

export type TxDateSource = {
  createdAt?: DateLike;
  dated?: DateLike;
  created_at?: DateLike;
  date?: DateLike;
  updatedAt?: DateLike;
};
