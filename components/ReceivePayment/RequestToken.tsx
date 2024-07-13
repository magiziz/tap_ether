import Big from "big.js";
import { useState } from "react";
import { Alert } from "react-native";
import type { Address } from "viem";

import { Button } from "../Button/Button";
import { Box, Input, Text } from "../main";

import { usePayer } from "@/store/payer";
import { usePayment } from "@/store/payment";
import { useReceiver } from "@/store/receiver";
import type { Token } from "@/utils/tokens";
import { tokenAddresses } from "@/utils/tokens";

export function RequestToken() {
  const [amount, setAmount] = useState("");

  const { token, chainId } = usePayer();
  const { address: receiverAddress } = useReceiver();

  const {
    setAmount: setPaymentAmount,
    setSignatureMessage,
    setErc20ContractAddress,
    setDecimals,
    setSymbol,
  } = usePayment();

  const { balance = "0", symbol = "usdc" } = token ?? {};

  const onChangeText = (text: string) => {
    if (isNaN(Number(text))) {
      return;
    }

    const etherBalance = Big(balance)
      .div(
        Big(10)
          .pow(symbol === "usdc" ? 6 : 18)
          .toNumber()
      )
      .round(4)
      .toNumber();

    if (parseFloat(text) > etherBalance) {
      Alert.alert(
        "Error",
        `You can't exceed the limit of ${etherBalance} ${symbol}.`
      );
    } else {
      setAmount(text);
    }
  };

  return (
    <Box
      width="full"
      flexDirection="column"
      alignItems="center"
      gap="20px"
      maxWidth="384px"
    >
      <Input
        value={amount}
        onChangeText={onChangeText}
        placeholder="Enter Amount"
        color="white100"
        fontSize="16px"
        fontFamily="SF-Semibold"
        background="grey80"
        width="full"
        maxWidth="320px"
        padding="16px"
        borderRadius="18px"
        borderColor="grey70"
        borderWidth={1}
        placeholderTextColor="#78797F"
      />

      <Button
        boxProps={{
          background: "yellow10",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "80px",
          width: "120px",
          opacity: amount ? 1 : 0.5,
        }}
        onPress={() => {
          if (!amount) return;

          const message = `${receiverAddress} has requested you to send ${amount} ${symbol}. Please sign the message to confirm.`;

          setPaymentAmount(amount);
          setErc20ContractAddress(
            tokenAddresses[chainId as keyof typeof tokenAddresses][
              symbol as Token
            ] as Address
          );
          setSignatureMessage(message);
          setDecimals(symbol === "usdc" ? 6 : 18);
          setSymbol(symbol);
        }}
        withText={false}
      >
        <Text
          textAlign="center"
          color="black"
          fontFamily="SF-Bold"
        >{`Request`}</Text>
      </Button>
    </Box>
  );
}
