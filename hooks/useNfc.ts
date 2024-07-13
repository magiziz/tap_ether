import { useQuery } from "@tanstack/react-query";

import { getNfcShareFile } from "@/utils/share";

export function useNfc({
  wcUri,
  walletName,
}: {
  wcUri: string;
  walletName: string;
}) {
  return useQuery({
    queryKey: ["nfc", wcUri],
    queryFn: () => getNfcShareFile({ wcUri, walletName }),
    enabled: !!wcUri && !!walletName,
  });
}
