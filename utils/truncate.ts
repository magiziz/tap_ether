import type { Address } from "viem";

export function truncateAddress(address?: Address) {
  if (!address) return "";
  return `${address?.slice(0, 6)}…${address?.slice(-4)}`;
}
