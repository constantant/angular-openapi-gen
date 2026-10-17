/** The page URL relative request URLs and base URLs are resolved against. */
export function pageHref(): string {
  return typeof location !== 'undefined' && location.href ? location.href : 'http://localhost/';
}

/** Whether a `content-type` header announces JSON (`application/json`, `application/problem+json`, …). */
export function isJsonContentType(contentType: string | null | undefined): boolean {
  return /[/+]json\b/i.test(contentType ?? '');
}

/** Request headers as a plain object with lower-cased names, from any form `fetch` accepts. */
export function readRequestHeaders(...sources: Array<HeadersInit | undefined>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const source of sources) {
    if (!source) continue;
    try {
      new Headers(source).forEach((value, name) => (result[name.toLowerCase()] = value));
    } catch {
      // headers the platform refuses are not recorded
    }
  }
  return result;
}

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
