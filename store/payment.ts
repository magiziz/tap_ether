import type { Address } from "viem";
import { create } from "zustand";

interface PaymentState {
  amount: string | null;
  erc20ContractAddress: Address | null;
  signatureMessage: string | null;
  setAmount: (amount: string) => void;
  setErc20ContractAddress: (address: Address) => void;
  setSignatureMessage: (signatureMessage: string) => void;
}

export const usePayment = create<PaymentState>((set) => ({
  amount: null,
  erc20ContractAddress: null,
  signatureMessage: null,
  setAmount: (amount: string) => set(() => ({ amount })),
  setErc20ContractAddress: (erc20ContractAddress: Address) =>
    set(() => ({ erc20ContractAddress })),
  setSignatureMessage: (signatureMessage: string) =>
    set(() => ({ signatureMessage })),
}));
