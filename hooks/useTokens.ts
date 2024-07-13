import { useQuery } from "@tanstack/react-query";
import Config from "react-native-config";
import type { Address } from "viem";
import { isAddress } from "viem";

import { createQueryKey } from "@/react-query/create-query-key";
import { http } from "@/utils/http";
import { toCheckSumAddress } from "@/utils/toChecksumAddress";
import type { ChainId } from "@/utils/tokens";
import { tokenAddresses } from "@/utils/tokens";

const oneInchApiKey = Config.ONEINCH_API_KEY!;

const headers = {
  Authorization: oneInchApiKey!,
};

interface FetchTokensParameters {
  chainId: ChainId;
  walletAddress: Address;
}

interface UseTokensParameters {
  chainId: ChainId;
  walletAddress: Address;
}

type Tokens = {
  [key in Address]: string;
};

interface GetSupportedTokensParameters {
  tokens: Tokens;
  chainId: ChainId;
}

async function fetchTokens({
  chainId,
  walletAddress,
}: FetchTokensParameters): Promise<Tokens> {
  const tokens = await http.get({
    url: `https://api.1inch.dev/balance/v1.2/${chainId}/balances/${walletAddress}`,
    opts: {
      headers,
    },
  });

  return tokens;
}

export function getSupportedTokenBalances({
  tokens,
  chainId,
}: GetSupportedTokensParameters) {
  const usdc =
    tokens[
      tokenAddresses[chainId]?.usdc.toLowerCase() as keyof typeof tokens
    ] ?? "0";
  const dai =
    tokens[tokenAddresses[chainId]?.dai as keyof typeof tokens] ?? "0";
  const weth =
    tokens[tokenAddresses[chainId]?.weth as keyof typeof tokens] ?? "0";

  return { usdc, dai, weth };
}

export function useTokens({ walletAddress, chainId }: UseTokensParameters) {
  const checkSumAddress = toCheckSumAddress(walletAddress);

  return useQuery({
    queryKey: createQueryKey("tokens", { checkSumAddress, chainId }),
    queryFn: () => fetchTokens({ walletAddress: checkSumAddress, chainId }),
    enabled: isAddress(checkSumAddress),
  });
}
