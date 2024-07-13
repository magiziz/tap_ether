import type { Address } from "viem";
import { create } from "zustand";

import type { Token } from "@/utils/tokens";

interface PaymentState {
  amount: string | null;
  erc20ContractAddress: Address | null;
  decimals: number | null;
  signatureMessage: string | null;
  symbol: Token | null;
  setAmount: (amount: string) => void;
  setErc20ContractAddress: (address: Address) => void;
  setSignatureMessage: (signatureMessage: string) => void;
  setDecimals: (decimals: number) => void;
  setSymbol: (decimals: Token) => void;
}

export const usePayment = create<PaymentState>((set) => ({
  amount: '123',
  symbol: 'usdc',
  erc20ContractAddress: '0x',
  decimals: 8,
  signatureMessage: null,
  setAmount: (amount: string) => set(() => ({ amount })),
  setErc20ContractAddress: (erc20ContractAddress: Address) =>
    set(() => ({ erc20ContractAddress })),
  setSignatureMessage: (signatureMessage: string) =>
    set(() => ({ signatureMessage })),
  setDecimals: (decimals: number) => set(() => ({ decimals })),
  setSymbol: (symbol: Token) => set(() => ({ symbol })),
}));
