import { useState } from "react";
import { Image, Linking } from "react-native";
import type { Address } from "viem";

import { Button } from "../Button/Button";
import { Box, Text } from "../main";
import { Spinner } from "../Spinner/Spinner";

import {
  PaymentStep,
  useRequestWalletConnectPayment,
} from "@/hooks/wallet-connect";
import { chainImages } from "@/utils/chains";
import type { ChainId, Token } from "@/utils/tokens";
import { tokens } from "@/utils/tokens";
import { truncateAddress } from "@/utils/truncate";
import { getExplorer } from "@/viem/client";

interface ConfirmationParameters {
  symbol: Token;
  receiver: Address;
  account: Address;
  amount: string;
  chainId: ChainId;
  decimals: number;
  erc20ContractAddress: Address;
  signatureMessage: string;
}
export function Confirmation({
  symbol,
  receiver,
  account,
  amount,
  chainId,
  decimals,
  erc20ContractAddress,
  signatureMessage,
}: ConfirmationParameters) {
  const [paymentStep, setPaymentStep] = useState(PaymentStep.Processing);

  const {
    data: txHash,
    isError: isErrorRequestWalletConnectPayment,
    mutate: requestWalletConnectPayment,
    isPending: isPendingRequestWalletConnectPayment,
  } = useRequestWalletConnectPayment({
    onPaymentStepChange: setPaymentStep,
  });

  const getPaymentStepText = () => {
    switch (paymentStep) {
      case PaymentStep.Processing:
    }

    switch (paymentStep) {
      case PaymentStep.ChangeChain:
        return "Changing chain...";

      case PaymentStep.SignatureVerification:
        return "Requesting signature verification...";

      case PaymentStep.SigningTransaction:
        return "Signing transaction...";

      default:
        return "Processing...";
    }
  };

  if (txHash) {
    return (
      <Box
        flexDirection="column"
        alignItems="center"
        maxWidth="384px"
        gap="18px"
      >
        <Text
          color="grey90"
          fontFamily="SF-Bold"
          textAlign="center"
          fontSize="20px"
        >
          Transaction Successful 🎉
        </Text>

        <Text
          color="grey90"
          fontFamily="SF-Bold"
          textAlign="center"
          fontSize="12px"
          maxWidth="280px"
        >
          The funds have been successfully transferred to your account.
        </Text>

        <Button
          boxProps={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            background: "yellow10",
            width: "200px",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "80px",
            pointerEvents: "none",
          }}
          onPress={() => {
            Linking.openURL(`${getExplorer(chainId)}/tx/${txHash}`);
          }}
          withText={false}
        >
          <Text textAlign="center" color="black" fontFamily="SF-Bold">
            View on explorer
          </Text>
        </Button>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" alignItems="center" maxWidth="320px" gap="24px">
      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="20px"
      >
        {isErrorRequestWalletConnectPayment
          ? "Failed to request transaction"
          : isPendingRequestWalletConnectPayment
          ? getPaymentStepText()
          : "Transaction Details"}
      </Text>

      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="12px"
        maxWidth="280px"
      >
        Please review the details below before requesting the transaction.
      </Text>

      <Box
        background="grey60"
        width="320px"
        borderRadius="12px"
        borderColor="grey70"
        borderWidth={1}
        padding="16px"
        gap="20px"
      >
        <Box display="flex" flexDirection="row" gap="4px">
          <Text color="white100" fontFamily="SF-Bold">
            From:
          </Text>
          <Text color="white100" fontFamily="SF-Bold">
            {truncateAddress(account)}
          </Text>
        </Box>

        <Box display="flex" flexDirection="row" gap="4px">
          <Text color="white100" fontFamily="SF-Bold">
            To:
          </Text>
          <Text color="white100" fontFamily="SF-Bold">
            {truncateAddress(receiver)}
          </Text>
        </Box>

        <Box display="flex" flexDirection="row" alignItems="center" gap="4px">
          <Text color="white100" fontFamily="SF-Bold">
            Chain:
          </Text>

          <Image
            source={chainImages[chainId].src}
            style={{ height: 20, width: 20, borderRadius: 999 }}
          />
        </Box>

        <Box display="flex" flexDirection="row" alignItems="center" gap="4px">
          <Text color="white100" fontFamily="SF-Bold">
            Amount:
          </Text>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
            color="white100"
            fontFamily="SF-Bold"
            gap="8px"
          >
            <Text color="white100" fontFamily="SF-Bold">
              {amount}
            </Text>
            <Image
              source={tokens[symbol].src}
              style={{ height: 20, width: 20, borderRadius: 8 }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        style={{
          pointerEvents: isPendingRequestWalletConnectPayment ? "none" : "auto",
        }}
        opacity={isPendingRequestWalletConnectPayment ? 0.5 : 1}
      >
        <Button
          boxProps={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            background: "yellow10",
            width: "120px",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "80px",
            pointerEvents: "none",
          }}
          onPress={() => {
            requestWalletConnectPayment({
              account,
              receiver,
              amount,
              chainId,
              decimals,
              erc20ContractAddress,
              signatureMessage,
            });
          }}
          withText={false}
        >
          {isPendingRequestWalletConnectPayment ? (
            <Spinner
              color="#000000"
              height={15}
              width={15}
              style={{ marginRight: 8 }}
            />
          ) : (
            <Text textAlign="center" color="black" fontFamily="SF-Bold">
              {isErrorRequestWalletConnectPayment ? "Retry" : "Confirm"}
            </Text>
          )}
        </Button>
      </Box>
    </Box>
  );
}
