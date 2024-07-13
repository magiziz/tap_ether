import type { Address } from "viem";
import { create } from "zustand";

import type { Token } from "@/utils/tokens";
import { ChainId } from "@/utils/tokens";

interface PayerState {
  address: Address | null;
  chainId: ChainId;
  token: { symbol: Token; balance: string } | null;
  setChainId: (chainId: ChainId) => void;
  setAddress: (address: Address) => void;
  setToken: ({ symbol, balance }: { symbol: Token; balance: string }) => void;
}

export const usePayer = create<PayerState>((set) => ({
  chainId: ChainId.Mainnet,
  address: null,
  token: null,
  setChainId: (chainId) => set(() => ({ chainId })),
  setAddress: (address) => set(() => ({ address })),
  setToken: ({ symbol, balance }) =>
    set(() => ({ token: { symbol, balance } })),
}));
