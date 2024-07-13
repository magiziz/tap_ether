import "@walletconnect/react-native-compat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, optimism, base } from "@wagmi/core/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";
import type { ReactNode } from "react";
import Config from "react-native-config";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

const projectId = Config.PROJECT_ID!;

export const metadata = {
  name: "Web3Modal RN",
  description: "Web3Modal RN Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const chains = [mainnet, optimism, base] as const;

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  projectId,
  wagmiConfig,
  themeMode: "dark",
  defaultChain: mainnet,
  enableAnalytics: false,
  excludeWalletIds: [
    "6577b7c91453a7047f1c31c5897bd59087a8cca35181e069656079255542abb4",
    "d6fbaf5c2026e050920ed6e6ffbf96c8a6145b93a8b79d102def9653bedc9821",
    "a74882bc3c24d2f52e55fd9c9579275885177e92789586ae857208c839335306",
    "50cca6f943812d2852752b7e021f251d50d410878b54c18a81ad71bcaa439035",
    "eae2c4b9da3b33b72b20d929a6342830bf54b541665e54c3a46024118e9e0e81",
  ],
});

export default function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Web3Modal />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
