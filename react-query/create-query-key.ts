export function createQueryKey<TArgs>(key: string, args: TArgs) {
  return [key, args] as const;
}
