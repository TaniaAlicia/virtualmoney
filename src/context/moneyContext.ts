import { create } from "zustand";

type UseSelectCard = {
  cardId: string | number | null;
  setCardId: (cardId: string | number | null) => void;

  last4: string | null; 
  setCardLast4: (last4: string | null) => void; 

   brand: string | null;                     
  setCardBrand: (brand: string | null) => void; 
};

export const useSelectCard = create<UseSelectCard>((set) => ({
  cardId: null,
  setCardId: (cardId) => set({ cardId }),
  last4: null, 
  setCardLast4: (last4) => set({ last4 }), 
  brand: null,                              
  setCardBrand: (brand) => set({ brand }),  
}));

// Guarda el monto ingresado (cuando se carga dinero)
type UseSetAmount = {
  amount: number;
  setAmount: (amount: number) => void;
};

export const useSetAmount = create<UseSetAmount>((set) => ({
  amount: 0,
  setAmount: (amount) => set({ amount }),
}));

// Guarda el servicio seleccionado (cuando se paga un servicio)
type UseSelectService = {
  serviceId: string;
  setServiceId: (serviceId: string) => void;
};

export const useSelectService = create<UseSelectService>((set) => ({
  serviceId: "",
  setServiceId: (serviceId) => set({ serviceId }),
}));
