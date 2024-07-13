import { create } from "zustand";

export enum Step {
  ConnectWallet = "CONNECT_WALLET",
  Nfc = "NFC",
  ReceivePayment = "RECEIVE_PAYMENT",
}

interface StepState {
  step: Step;
  setStep: (step: Step) => void;
}

export const useStep = create<StepState>((set) => ({
  step: Step.ConnectWallet,
  setStep: (step) => set(() => ({ step })),
}));
