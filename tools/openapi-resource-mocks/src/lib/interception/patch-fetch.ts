import type { MockResponse, MockRuntime } from './mock-runtime';
import { readRequestBody } from './transport-utils';

const NULL_BODY_STATUS = new Set([101, 204, 205, 304]);

function toFetchResponse(mock: MockResponse, url: string): Response {
  const payload = mock.body === undefined || NULL_BODY_STATUS.has(mock.status) ? null : mock.body;
  const response = new Response(payload, { status: mock.status, headers: mock.headers });
  // A constructed Response has an empty `url`; real ones carry the request URL.
  Object.defineProperty(response, 'url', { value: url });
  return response;
}

function abortError(signal: AbortSignal): unknown {
  return signal.reason ?? new DOMException('The operation was aborted.', 'AbortError');
}

/** Replaces `target.fetch` with a version that asks `runtime` first. Returns a restore function. */
export function patchFetch(target: { fetch: typeof fetch }, runtime: MockRuntime): () => void {
  const native = target.fetch;

  const patched: typeof fetch = (input, init) => {
    const isRequest = typeof Request !== 'undefined' && input instanceof Request;
    const url = isRequest ? input.url : String(input);
    const method = init?.method ?? (isRequest ? input.method : 'GET');
    const signal = init?.signal ?? (isRequest ? input.signal : undefined);

    const interception = runtime.intercept({ method, url, body: readRequestBody(init?.body) });
    if (!interception) return native.call(target, input, init);

    return new Promise<Response>((resolve, reject) => {
      const onAbort = (): void => {
        interception.cancel();
        reject(abortError(signal as AbortSignal));
      };
      if (signal?.aborted) return onAbort();
      signal?.addEventListener('abort', onAbort, { once: true });

      void interception.result.then((result) => {
        signal?.removeEventListener('abort', onAbort);
        if (result === 'passthrough') native.call(target, input, init).then(resolve, reject);
        else resolve(toFetchResponse(result, url));
      });
    });
  };

  target.fetch = patched;
  return () => {
    if (target.fetch === patched) target.fetch = native;
  };
}
