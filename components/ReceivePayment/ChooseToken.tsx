import Big from "big.js";
import React from "react";
import { Image } from "react-native";
import { type Address } from "viem";

import { Box, Text } from "../main";
import { Spinner } from "../Spinner/Spinner";
import { Touchable } from "../Touchable/Touchable";

import { getSupportedTokenBalances, useTokens } from "@/hooks/useTokens";
import { usePayer } from "@/store/payer";
import { chainImages } from "@/utils/chains";
import type { Token as Token_type } from "@/utils/tokens";
import { ChainId, tokens as tokens_internal } from "@/utils/tokens";

interface TokenProps {
  src: any;
  name: string;
  balance: string;
  onPress: () => void;
}

interface ChainProps {
  chainId: ChainId;
  currentChainId: ChainId;
  onPress: () => void;
}

function Token({ src, name, balance, onPress }: TokenProps) {
  const isDisabled = Big(balance).lte(0);

  const etherBalance = Big(balance)
    .div(
      Big(10)
        .pow(name === "USDC" ? 6 : 18)
        .toNumber()
    )
    .round(4)
    .toString();

  const content = (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="row"
      gap="8px"
      background="grey60"
      padding="8px"
      paddingRight="12px"
      paddingLeft="12px"
      borderRadius="12px"
      borderColor="grey70"
      borderWidth={1}
      minWidth="120px"
      opacity={isDisabled ? 0.5 : 1}
    >
      <Image source={src} style={{ height: 30, width: 30, borderRadius: 8 }} />

      <Box>
        <Text color="white100" fontFamily="SF-Bold" fontSize="16px">
          {name}
        </Text>

        {isDisabled ? (
          <Text
            color="white100"
            fontFamily="SF-Regular"
            fontSize="12px"
            marginTop="4px"
          >
            No balance
          </Text>
        ) : (
          <Text
            color="white100"
            fontFamily="SF-Regular"
            fontSize="12px"
            marginTop="4px"
          >
            {etherBalance}
          </Text>
        )}
      </Box>
    </Box>
  );

  if (isDisabled) {
    return content;
  }

  return (
    <Touchable
      active="shrink"
      hover="grow"
      touchableOpacityProps={{
        onPress,
      }}
    >
      {content}
    </Touchable>
  );
}

function Chain({ chainId, currentChainId, onPress }: ChainProps) {
  return (
    <Touchable
      active="shrink"
      hover="grow"
      touchableOpacityProps={{
        onPress,
      }}
    >
      <Image
        source={chainImages[chainId as keyof typeof chainImages].src}
        style={{
          height: 30,
          width: 30,
          borderRadius: 999,
          opacity: currentChainId === chainId ? 1 : 0.5,
        }}
      />
    </Touchable>
  );
}

export function ChooseToken() {
  const { address: payerAddress, chainId, setChainId, setToken } = usePayer();

  const { data: tokens = {}, isLoading: isTokensLoading } = useTokens({
    walletAddress: (payerAddress ?? "") as Address,
    chainId,
  });

  if (isTokensLoading) {
    return (
      <Spinner
        color="#95969B"
        height={50}
        width={50}
        style={{ marginTop: 12 }}
      />
    );
  }

  return (
    <Box width="full" flexDirection="column" gap="32px" maxWidth="384px">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap="20px"
      >
        {[ChainId.Mainnet, ChainId.Optimism, ChainId.Base].map((_chainId) => (
          <Chain
            key={_chainId}
            chainId={_chainId}
            currentChainId={chainId}
            onPress={() => setChainId(_chainId)}
          />
        ))}
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap="20px"
      >
        {Object.entries(tokens_internal).map(([symbol, token]) => {
          const balance = getSupportedTokenBalances({ chainId, tokens })[
            symbol as keyof typeof tokens_internal
          ];

          return (
            <Token
              key={token?.name}
              name={token?.name}
              src={token?.src}
              balance={balance}
              onPress={() =>
                setToken({ symbol: symbol as Token_type, balance })
              }
            />
          );
        })}
      </Box>
    </Box>
  );
}
