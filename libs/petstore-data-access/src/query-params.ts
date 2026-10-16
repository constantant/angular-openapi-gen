/** Returns `params` without the entries whose value is `undefined`. */
export function dropUndefined<T extends object>(
  params: T | undefined,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(params ?? {}).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}
