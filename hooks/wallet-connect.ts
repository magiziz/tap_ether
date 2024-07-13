import { useMutation } from "@tanstack/react-query";
import { mainnet, polygon, arbitrum, optimism, base } from "@wagmi/core/chains";
import Config from "react-native-config";
import type { Address, WalletClient } from "viem";
import { createWalletClient, custom } from "viem";
import { createConfig, http, type Connector } from "wagmi";
import { walletConnect } from "wagmi/connectors";

import { chains, metadata } from "@/components/AppKitProvider/AppKitProvider";

interface UseWalletConnectUriParameters {
  onConnect: ({ address }: { address: Address }) => void;
}

let walletConnectConnector: Connector;
let walletClient: WalletClient;

const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  ssr: false,
  multiInjectedProviderDiscovery: false,
});

async function getWalletConnectUri({
  mobileLink,
  onConnect,
}: {
  mobileLink: string;
  onConnect?: ({ address }: { address: Address }) => void;
}) {
  const connector =
    walletConnectConnector ??
    (walletConnectConnector = wagmiConfig._internal.connectors.setup(
      walletConnect({
        projectId: Config.PROJECT_ID!,
        showQrModal: false,
        metadata,
      })
    ));

  const provider = (await connector.getProvider()) as any;

  return new Promise((resolve) => {
    provider.on("connect", async () => {
      const client =
        walletClient ??
        (walletClient = createWalletClient({
          chain: mainnet,
          transport: custom(provider),
        }));

      const [address] = (await client.getAddresses()) as [Address];

      if (address) {
        onConnect?.({ address });
      } else {
        console.log(`❌ WalletConnect didn't return address`);
      }
    });

    provider.on("display_uri", (uri: string) => {
      if (uri) resolve(`${mobileLink}?uri=${encodeURIComponent(uri)}`);
    });
    connector.connect().catch(() => null);
  });
}

export function useFetchWalletConnectUri({
  onConnect,
}: UseWalletConnectUriParameters) {
  return useMutation({
    mutationKey: ["fetchWalletConnectUri"],
    mutationFn: ({ mobileLink }: { mobileLink: string }) =>
      getWalletConnectUri({ mobileLink, onConnect }).then(
        (qrUri) => qrUri as string
      ),
  });
}
