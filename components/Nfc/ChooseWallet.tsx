import { useState } from "react";
import { Image } from "react-native";

import { Box, Text } from "../main";
import { Spinner } from "../Spinner/Spinner";
import { Touchable } from "../Touchable/Touchable";

import { useNfc } from "@/hooks/useNfc";
import { useFetchWalletConnectUri } from "@/hooks/wallet-connect";
import { usePayer } from "@/store/payer";
import { Step, useStep } from "@/store/steps";
import type { Wallet as Wallet_internal } from "@/utils/wallets";
import { wallets } from "@/utils/wallets";

interface WalletProps extends Wallet_internal {
  onPress: (wallet: Wallet_internal) => void;
}

function Wallet({ src, name, mobileLink, onPress }: WalletProps) {
  return (
    <Touchable
      active="shrink"
      hover="grow"
      touchableOpacityProps={{
        onPress: () => onPress({ src, name, mobileLink }),
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        gap="8px"
        background="grey60"
        padding="8px"
        borderRadius="12px"
        borderColor="grey70"
        borderWidth={1}
      >
        <Image
          source={src}
          key={name}
          style={{ height: 30, width: 30, borderRadius: 8 }}
        />

        <Text color="white100" fontFamily="SF-Bold" fontSize="16px">
          {name}
        </Text>
      </Box>
    </Touchable>
  );
}

export function ChooseWallet() {
  const [wallet, setWallet] = useState<Wallet_internal>();

  const { setAddress } = usePayer();
  const { setStep } = useStep();

  const {
    mutate: fetchWalletConnectUri,
    data: walletConnectUri,
    isPending: isPendingWalletConnectUri,
  } = useFetchWalletConnectUri({
    onConnect: ({ address }) => {
      setAddress(address);
      setStep(Step.ReceivePayment);
    },
  });
  console.log({ walletConnectUri, isPendingWalletConnectUri });

  const { isLoading: isLoadingNfc } = useNfc({
    wcUri: walletConnectUri!,
    walletName: wallet?.name!,
  });

  if (isLoadingNfc || isPendingWalletConnectUri) {
    return (
      <Box
        flexDirection="column"
        alignItems="center"
        width="full"
        maxWidth="320px"
      >
        <Spinner
          color="#fff"
          height={50}
          width={50}
          style={{ marginTop: 12 }}
        />
      </Box>
    );
  }

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      width="full"
      maxWidth="384px"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        flexWrap="wrap"
        gap="20px"
        justifyContent="center"
        marginTop="12px"
      >
        {wallets.map(({ name, src, mobileLink }) => (
          <Wallet
            key={name}
            src={src}
            name={name}
            mobileLink={mobileLink}
            onPress={(wallet) => {
              setWallet(wallet);
              fetchWalletConnectUri({ mobileLink: wallet.mobileLink });
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
