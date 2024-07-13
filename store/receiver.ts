import type { Address } from "viem";
import { create } from "zustand";

interface ReceiverState {
  address: Address | null;
  setAddress: (address: Address) => void;
}

export const useReceiver = create<ReceiverState>((set) => ({
  address: null,
  setAddress: (address) => set(() => ({ address })),
}));
