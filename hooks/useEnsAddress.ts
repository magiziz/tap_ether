import { useQuery } from "@tanstack/react-query";

import { createQueryKey } from "@/react-query/create-query-key";
import { mainnetClient } from "@/viem/client";

interface UseEnsParameters {
  name: string;
}

function isENSAddressFormat(name: string) {
  return name.endsWith(".eth");
}

export function useEnsAddress({ name }: UseEnsParameters) {
  return useQuery({
    queryKey: createQueryKey("ensName", { name }),
    queryFn: () => mainnetClient.getEnsAddress({ name }),
    enabled: isENSAddressFormat(name),
  });
}
