/** What the registry records as the request body: parsed JSON when possible, otherwise the raw value. */
export function readRequestBody(body: unknown): unknown {
  if (body === null || body === undefined) return undefined;
  if (typeof body !== 'string') return body;
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}
