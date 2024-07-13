import type { Address } from "viem";
import { create } from "zustand";

interface PayerState {
  address: Address | null;
  setAddress: (address: Address) => void;
}

export const usePayer = create<PayerState>((set) => ({
  address: null,
  setAddress: (address) => set(() => ({ address })),
}));
