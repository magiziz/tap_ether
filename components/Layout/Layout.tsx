import React from "react";
import { SafeAreaView } from "react-native";

import { ConnectWallet } from "../ConnectWallet/ConnectWallet";

import { Box } from "@/components/main";
import { Step, useStep } from "@/store/steps";

export function Layout() {
  const { step } = useStep();

  let content = null;

  switch (step) {
    case Step.ConnectWallet:
      content = <ConnectWallet />;
      break;

    default:
      throw new Error(`Unknown step: ${step}`);
  }

  return (
    <Box height="full" background="green100">
      <SafeAreaView>{content}</SafeAreaView>
    </Box>
  );
}
