import type {
  HttpResourceOptions,
  HttpResourceRef,
  HttpResourceRequest,
} from '@angular/common/http';

/**
 * Per-call request options, accepted as the last argument of a generated token function.
 *
 * Everything on `HttpResourceRequest` that the generator doesn't control: `context`,
 * `withCredentials`, `keepalive`, `cache`, `credentials`, `priority`, `mode`, `redirect`, … (the exact set
 * follows your Angular version). The URL, method, body, query params and `reportProgress` come from the
 * OpenAPI spec and cannot be overridden.
 */
export type RequestExtras = Partial<
  Omit<
    HttpResourceRequest,
    'url' | 'method' | 'body' | 'params' | 'headers' | 'reportProgress'
  >
>;

export interface CallOptions extends RequestExtras {
  /**
   * Extra headers. They are merged over the generated ones (spec header params, cookies and auth),
   * so a header you set here wins on a clash.
   */
  headers?: Record<string, string | string[]>;
}

/**
 * Call options for an `httpResource` token: the request options above plus the resource options
 * `defaultValue`, `equal`, `injector` and (on Angular versions that have it) `debugName`.
 * `parse` is not accepted: it is how `--validateResponses` is wired.
 */
export type ResourceCallOptions<T> = CallOptions &
  Partial<Omit<HttpResourceOptions<T, unknown>, 'parse'>>;

/**
 * The resource a token returns. When the call passes a `defaultValue` the value is never
 * `undefined`, so `value()` is typed as `T` instead of `T | undefined`.
 */
export type ResourceRefFor<T, O> = O extends { defaultValue: unknown }
  ? HttpResourceRef<T>
  : HttpResourceRef<T | undefined>;

const RESOURCE_KEYS: readonly string[] = [
  'defaultValue',
  'equal',
  'injector',
  'debugName',
];

// Fields the OpenAPI spec controls. The types already refuse them; dropping them here as well means a
// cast (or plain JavaScript) can't, say, turn a GET into a DELETE, which matters because the generated
// request does not set `method` for a GET at all.
const CONTROLLED_KEYS: readonly string[] = [
  'url',
  'method',
  'body',
  'params',
  'reportProgress',
];

/**
 * Splits call options into the `httpResource` options, the remaining request fields and the headers.
 * Fields are routed by name from a list, so a field that the installed Angular doesn't know about is
 * simply passed through. Options that are `undefined`, and the fields the spec controls, are dropped.
 */
export function splitCallOptions<T = unknown>(
  options?: ResourceCallOptions<T>,
): {
  resource: Omit<HttpResourceOptions<T, unknown>, 'parse'>;
  request: object;
  headers: Record<string, string | string[]> | undefined;
} {
  const resource: Record<string, unknown> = {};
  const request: Record<string, unknown> = {};
  let headers: Record<string, string | string[]> | undefined;
  for (const [key, value] of Object.entries(options ?? {})) {
    if (value === undefined || CONTROLLED_KEYS.includes(key)) continue;
    if (key === 'headers') headers = value as Record<string, string | string[]>;
    else if (RESOURCE_KEYS.includes(key)) resource[key] = value;
    else request[key] = value;
  }
  return {
    resource: resource as Omit<HttpResourceOptions<T, unknown>, 'parse'>,
    request,
    headers,
  };
}
