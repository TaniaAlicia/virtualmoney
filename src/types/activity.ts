// Define el tipo (puede estar en el mismo archivo o en /types)
export type Activity = {
  id: string | number;
  date: string;            // o Date si ya lo parseas
  title: string;
  amount: number;
  kind: "in" | "out" | string; // ajusta a tu dominio real
};
