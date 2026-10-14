/**
 * The shared `mock-hook.ts` emitted at the root of a generated lib with `mockHooks`.
 *
 * It has no dependency on the mocks package: it only calls a global function when a mocking tool
 * (`@constantant/openapi-resource-mocks`, or the DevTools extension on a production build) has
 * installed one, so without such a tool it costs one property lookup per created resource.
 */
export function renderMockHookFile(): string {
  return `/**
 * Hands a live \`httpResource\` to the mocking tool, if one is installed in the page, so that editing
 * the mock of \`key\` can re-run the resource. Does nothing otherwise.
 */
export function trackResource<T extends { reload(): boolean }>(key: string, ref: T): T {
  (globalThis as { __oarmTrack__?: (key: string, ref: { reload(): boolean }) => void }).__oarmTrack__?.(key, ref);
  return ref;
}
`;
}
