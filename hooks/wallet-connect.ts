import { useMutation } from "@tanstack/react-query";
import { mainnet, polygon, arbitrum, optimism, base } from "@wagmi/core/chains";
import Config from "react-native-config";
import type { Address, WalletClient } from "viem";
import {
  createWalletClient,
  custom,
  erc20Abi,
  parseUnits,
  verifyMessage,
} from "viem";
import { createConfig, http, type Connector } from "wagmi";
import { walletConnect } from "wagmi/connectors";

import { chains, metadata } from "@/components/AppKitProvider/AppKitProvider";
import type { ChainId } from "@/utils/tokens";
import { getChain, getClient } from "@/viem/client";

interface UseWalletConnectUriParameters {
  onConnect: ({ address }: { address: Address }) => void;
}

export enum PaymentStep {
  Processing = "PROCESSING",
  ChangeChain = "CHAIN_CHAIN",
  SignatureVerification = "SIGNATURE_VERIFICATION",
  SigningTransaction = "SIGNING_TRANSACTION",
}

interface RequestWalletConnectPaymentParameters {
  receiver: Address;
  account: Address;
  amount: string;
  chainId: ChainId;
  decimals: number;
  erc20ContractAddress: Address;
  signatureMessage: string;
}

interface UseRequestWalletConnectPaymentParameters {
  onPaymentStepChange: (paymentStep: PaymentStep) => void;
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
        // eslint-disable-next-line no-console
        console.log(`❌ WalletConnect didn't return address`);
      }
    });

    provider.on("display_uri", (uri: string) => {
      if (uri) resolve(`${mobileLink}?uri=${encodeURIComponent(uri)}`);
    });
    connector.connect().catch(() => null);
  });
}

async function requestWalletConnectPayment(
  {
    receiver,
    account,
    amount,
    chainId,
    erc20ContractAddress,
    decimals,
    signatureMessage,
  }: RequestWalletConnectPaymentParameters,
  onPaymentStepChange: (paymentStep: PaymentStep) => void
) {
  try {
    if (!walletClient) {
      throw new Error(`walletClient not initialized`);
    }

    const connectedChainId = (await walletClient.getChainId()) as ChainId;

    if (chainId !== connectedChainId) {
      onPaymentStepChange(PaymentStep.ChangeChain);
      await walletClient.switchChain({ id: chainId });
    }

    onPaymentStepChange(PaymentStep.SignatureVerification);
    const signature = await walletClient.signMessage({
      account,
      message: signatureMessage,
    });

    const valid = await verifyMessage({
      address: account,
      message: signatureMessage,
      signature,
    });

    if (!valid) {
      throw new Error(`Invalid signature`);
    }

    const client = getClient(chainId);

    const { request } = await client.simulateContract({
      account,
      address: erc20ContractAddress,
      abi: erc20Abi,
      functionName: "transfer",
      chain: getChain(chainId),
      args: [receiver, parseUnits(amount, decimals)],
    });

    onPaymentStepChange(PaymentStep.Processing);
    const transactionHash = await walletClient.writeContract(request);

    return transactionHash;
  } catch (err) {
    onPaymentStepChange(PaymentStep.Processing);
    throw err;
  }
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

export function useRequestWalletConnectPayment({
  onPaymentStepChange,
}: UseRequestWalletConnectPaymentParameters) {
  return useMutation({
    mutationKey: ["requestWalletConnectPayment"],
    mutationFn: (
      requestWalletConnectPaymentParameters: RequestWalletConnectPaymentParameters
    ) =>
      requestWalletConnectPayment(
        requestWalletConnectPaymentParameters,
        onPaymentStepChange
      ),
  });
}
