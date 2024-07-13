import Config from "react-native-config";
import { createPublicClient, http } from "viem";
import { base, mainnet, optimism } from "viem/chains";

import { ChainId } from "@/utils/tokens";

export const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(Config.MAINNET_HTTP),
});

export const optimismClient = createPublicClient({
  chain: optimism,
  transport: http(Config.OPTIMISM_HTTP),
});

export const baseClient = createPublicClient({
  chain: base,
  transport: http(Config.BASE_HTTP),
});

export function getClient(chainId: ChainId) {
  switch (chainId) {
    case ChainId.Mainnet:
      return mainnetClient;
    case ChainId.Optimism:
      return optimismClient;
    case ChainId.Base:
      return baseClient;
    default:
      throw new Error("Unsupported chain (getClient)");
  }
}

export function getChain(chainId: ChainId) {
  switch (chainId) {
    case ChainId.Mainnet:
      return mainnet;
    case ChainId.Optimism:
      return optimism;
    case ChainId.Base:
      return base;
    default:
      throw new Error(`Chain not found ${chainId} (getChain)`);
  }
}

export function getExplorer(chainId: ChainId) {
  switch (chainId) {
    case ChainId.Mainnet:
      return "https://etherscan.io";
    case ChainId.Optimism:
      return "https://optimistic.etherscan.io";
    case ChainId.Base:
      return "https://basescan.org";
    default:
      throw new Error(`No explorer found ${chainId} (getExplorer)`);
  }
}
