import { useQuery } from "@tanstack/react-query";

import { createQueryKey } from "@/react-query/create-query-key";
import { getNfcShareFile } from "@/utils/share";

export function useNfc({
  wcUri,
  walletName,
}: {
  wcUri: string;
  walletName: string;
}) {
  return useQuery({
    queryKey: createQueryKey("nfc", wcUri),
    queryFn: () => getNfcShareFile({ wcUri, walletName }),
    enabled: !!wcUri && !!walletName,
  });
}
