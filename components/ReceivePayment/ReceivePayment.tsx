import { useState } from "react";

import { Box } from "../main";

import { Introduction } from "./Introduction";
import { ChooseToken } from "./ChooseToken";
import { usePayer } from "@/store/payer";
import { RequestToken } from "./RequestToken";
import { usePayment } from "@/store/payment";
import { Confirmation } from "./Confirmation";

export function ReceivePayment() {
  const { token } = usePayer();
  const { amount, erc20ContractAddress, signatureMessage } = usePayment();

  const isPaymentReady =
    !!amount && !!erc20ContractAddress && !!signatureMessage;

  let content = <ChooseToken />;

  if (isPaymentReady) {
    content = <Confirmation />;
  } else if (token) {
    content = <RequestToken />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="26px"
      marginTop="16px"
    >
      <Introduction isPaymentReady={isPaymentReady} />
      {content}
    </Box>
  );
}
