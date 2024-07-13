import type { Address } from "viem";
import { create } from "zustand";

import type { Token } from "@/utils/tokens";
import { ChainId } from "@/utils/tokens";

interface PayerState {
  address: Address | null;
  chainId: ChainId;
  token: { symbol: Token; balance: string };
  setChainId: (chainId: ChainId) => void;
  setAddress: (address: Address) => void;
  setToken: ({ symbol, balance }: { symbol: Token; balance: string }) => void;
}

export const usePayer = create<PayerState>((set) => ({
  chainId: ChainId.Mainnet,
  address: "0xc0DEAF6bD3F0c6574a6a625EF2F22f62A5150EAB",
  token: { symbol: "usdc", balance: "1000000000000" },
  setChainId: (chainId) => set(() => ({ chainId })),
  setAddress: (address) => set(() => ({ address })),
  setToken: ({ symbol, balance }) =>
    set(() => ({ token: { symbol, balance } })),
}));
