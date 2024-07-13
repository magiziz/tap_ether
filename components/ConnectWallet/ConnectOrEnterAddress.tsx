import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi-react-native";
import React, { useEffect, useState } from "react";
import { useAccountEffect, useDisconnect } from "wagmi";

import { Button } from "../Button/Button";
import { Box, Input, Text } from "../main";
import { Touchable } from "../Touchable/Touchable";

import { useReceiver } from "@/store/receiver";
import { useEnsAddress } from "@/hooks/useEnsAddress";
import { isAddress } from "viem";
import { toCheckSumAddress } from "@/utils/toChecksumAddress";
import { Step, useStep } from "@/store/steps";
import { Spinner } from "../Spinner/Spinner";

export function ConnectOrEnterAddress() {
  const { open: openWeb3Modal } = useWeb3Modal();
  const { open: isWeb3ModalOpen } = useWeb3ModalState();

  const { disconnect } = useDisconnect();

  useEffect(() => {
    try {
      disconnect();
    } catch {
      /* ignore */
    }
  }, []);

  const { setStep } = useStep();

  const [addressOrEns, setAddressOrEns] = React.useState("");

  const [shouldEnterWalletAddress, setShouldEnterWalletAddress] =
    useState(false);

  const { setAddress } = useReceiver();

  const { data: ensAddress, isLoading: isLoadingEnsAddress } = useEnsAddress({
    name: addressOrEns.toLowerCase(),
  });

  const address =
    ensAddress ??
    (isAddress(addressOrEns) ? toCheckSumAddress(addressOrEns) : undefined);

  useAccountEffect({
    onConnect: ({ address }) => {
      setAddress(toCheckSumAddress(address));
      disconnect();
      setStep(Step.Nfc);
    },
  });

  if (shouldEnterWalletAddress) {
    return (
      <Box flexDirection="column" alignItems="center" gap="14px" width="full">
        <Input
          value={addressOrEns}
          onChangeText={(text) => setAddressOrEns(text)}
          placeholder="Wallet Address or ENS..."
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
          editable={!isLoadingEnsAddress}
          opacity={isLoadingEnsAddress ? 0.5 : 1}
        />

        <Touchable
          active="shrink"
          hover="grow"
          viewStyle={{ marginRight: "auto", marginLeft: 58 }}
          touchableOpacityProps={{
            onPress: () => {
              setShouldEnterWalletAddress(false);
            },
          }}
        >
          <Text
            textAlign="left"
            color="grey90"
            fontFamily="SF-Bold"
            fontSize="12px"
          >
            Connect Wallet
          </Text>
        </Touchable>

        {address && (
          <Button
            boxProps={{
              background: "yellow10",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "12px",
            }}
            textProps={{
              textAlign: "center",
              color: "black",
              fontFamily: "SF-Bold",
            }}
            onPress={() => {
              setAddress(toCheckSumAddress(address));
              setStep(Step.Nfc);
            }}
          >
            {`Confirm`}
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box flexDirection="column" alignItems="center" gap="14px" width="full">
      <Button
        boxProps={{
          display: "flex",
          flexDirection: "row",
          background: "yellow10",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "80px",
        }}
        onPress={openWeb3Modal}
        withText={false}
      >
        {isWeb3ModalOpen && (
          <Spinner
            color="#000000"
            height={15}
            width={15}
            style={{ marginRight: 8 }}
          />
        )}

        <Text
          textAlign="center"
          color="black"
          fontFamily="SF-Bold"
        >{`Connect Wallet`}</Text>
      </Button>

      <Text color="grey90" fontFamily="SF-Bold">
        Or
      </Text>

      <Button
        boxProps={{
          background: "green90",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "80px",
        }}
        textProps={{
          textAlign: "center",
          color: "yellow10",
          fontFamily: "SF-Bold",
        }}
        onPress={() => {
          setShouldEnterWalletAddress(true);
        }}
      >
        {`Enter Wallet Address`}
      </Button>
    </Box>
  );
}
