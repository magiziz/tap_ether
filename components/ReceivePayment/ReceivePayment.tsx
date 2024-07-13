import { Box } from "../main";

import { ChooseToken } from "./ChooseToken";
import { Confirmation } from "./Confirmation";
import { Introduction } from "./Introduction";
import { RequestToken } from "./RequestToken";

import { usePayer } from "@/store/payer";
import { usePayment } from "@/store/payment";
import { useReceiver } from "@/store/receiver";

export function ReceivePayment() {
  const { address: payerAddress, token, chainId } = usePayer();
  const { address: receiverAddress } = useReceiver();
  const { symbol, amount, erc20ContractAddress, signatureMessage, decimals } =
    usePayment();

  const isPaymentReady =
    !!amount &&
    !!erc20ContractAddress &&
    !!signatureMessage &&
    !!symbol &&
    typeof decimals === "number";

  let content = <ChooseToken />;

  if (isPaymentReady) {
    content = (
      <Confirmation
        chainId={chainId}
        account={payerAddress!}
        receiver={receiverAddress!}
        amount={amount}
        decimals={decimals}
        erc20ContractAddress={erc20ContractAddress}
        signatureMessage={signatureMessage}
        symbol={symbol}
      />
    );
  } else if (token) {
    content = <RequestToken />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="26px"
      marginTop="60px"
    >
      {!isPaymentReady && <Introduction />}
      {content}
    </Box>
  );
}
