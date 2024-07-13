import type { Address } from "viem";
import { checksumAddress } from "viem";

export function toCheckSumAddress(address: string) {
  return checksumAddress(address.toLowerCase() as Address);
}
