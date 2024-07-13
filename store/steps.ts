import { create } from "zustand";

export enum Step {
  ConnectWallet = "CONNECT_WALLET",
  ChooseToken = "CHOOSE_TOKEN",
  RequestPayment = "REQUEST_PAYMENT",
}

interface StepState {
  step: Step;
  setStep: (step: Step) => void;
}

export const useStep = create<StepState>((set) => ({
  step: Step.ConnectWallet,
  setStep: (step) => set(() => ({ step })),
}));
