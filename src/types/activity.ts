export type Activity = {
  id: string | number;
  date: string;           
  title: string;
  amount: number;
  kind: "in" | "out" | string; 
};
