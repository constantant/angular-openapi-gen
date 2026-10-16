/**
 * The shared `query-params.ts` emitted at the root of a generated lib whose endpoints take query
 * params. Optional params the caller leaves `undefined` must not reach the wire (HttpClient would
 * send `?status=undefined`).
 */
export function renderQueryParamsFile(): string {
  return `/** Returns \`params\` without the entries whose value is \`undefined\`. */
export function dropUndefined<T extends object>(params: T | undefined): Partial<T> {
  return Object.fromEntries(
    Object.entries(params ?? {}).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}
`;
}
