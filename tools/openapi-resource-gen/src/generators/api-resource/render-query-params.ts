/**
 * The shared `query-params.ts` emitted at the root of a generated lib whose endpoints take query
 * params. Optional params the caller leaves `undefined` must not reach the wire (HttpClient would
 * send `?status=undefined`). `withQueryString` adds `toQueryString`, which navigation tokens use to
 * build a URL themselves.
 */
export function renderQueryParamsFile(withQueryString = false): string {
  const lines = [
    '/** Returns `params` without the entries whose value is `undefined`. */',
    'export function dropUndefined<T extends object>(params: T | undefined): Partial<T> {',
    '  return Object.fromEntries(',
    '    Object.entries(params ?? {}).filter(([, value]) => value !== undefined),',
    '  ) as Partial<T>;',
    '}',
    '',
  ];
  if (withQueryString) {
    lines.push(
      '/** Serializes `params` as a `?a=1&b=2` query string (empty when there is nothing to send); arrays repeat the key. */',
      'export function toQueryString(params: object | undefined): string {',
      '  const query = new URLSearchParams();',
      '  for (const [key, value] of Object.entries(dropUndefined(params))) {',
      '    for (const item of Array.isArray(value) ? value : [value]) query.append(key, String(item));',
      '  }',
      '  const text = query.toString();',
      "  return text ? '?' + text : '';",
      '}',
      '',
    );
  }
  return lines.join('\n');
}
