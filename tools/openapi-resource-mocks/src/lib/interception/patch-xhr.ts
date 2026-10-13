import type { Interception, MockResponse, MockRuntime } from './mock-runtime';
import { readRequestBody } from './transport-utils';

const text = (body: MockResponse['body']): string => (typeof body === 'string' ? body : '');

const STATUS_TEXT: Record<number, string> = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

/**
 * Replaces `target.XMLHttpRequest` with a subclass that asks `runtime` on `send()`. A mocked
 * request never reaches the native implementation: the subclass reports the mocked status, headers
 * and body itself and fires `readystatechange` / `load` / `loadend`. Returns a restore function.
 */
export function patchXhr(target: { XMLHttpRequest: typeof XMLHttpRequest }, runtime: MockRuntime): () => void {
  const Native = target.XMLHttpRequest;

  class MockedXMLHttpRequest extends Native {
    private _request?: { method: string; url: string };
    private _interception?: Interception;
    private _mock?: MockResponse;

    override open(method: string, url: string | URL, async?: boolean, username?: string | null, password?: string | null): void {
      this._request = { method, url: String(url) };
      this._interception?.cancel();
      this._interception = undefined;
      this._mock = undefined;
      if (async === undefined) super.open(method, url);
      else super.open(method, url, async, username, password);
    }

    override send(body?: Document | XMLHttpRequestBodyInit | null): void {
      const interception = this._request
        ? runtime.intercept({ ...this._request, body: readRequestBody(body) })
        : undefined;
      if (!interception) return this._sendReal(body);

      this._interception = interception;
      interception.onProgress((progress) => {
        const init = { lengthComputable: progress.total !== undefined, loaded: progress.loaded, total: progress.total ?? 0 };
        (progress.type === 'upload' ? this.upload : this).dispatchEvent(new ProgressEvent('progress', init));
      });
      void interception.result.then((result) => {
        if (this._interception !== interception) return; // aborted or re-opened meanwhile
        this._interception = undefined;
        if (result === 'passthrough') return this._sendReal(body);
        this._mock = result;
        const size = typeof result.body === 'string' ? result.body.length : 0;
        this.dispatchEvent(new Event('readystatechange'));
        this.dispatchEvent(new ProgressEvent('load', { lengthComputable: true, loaded: size, total: size }));
        this.dispatchEvent(new ProgressEvent('loadend', { lengthComputable: true, loaded: size, total: size }));
      });
    }

    /** Performs the real request and shows its response to the runtime. */
    private _sendReal(body?: Document | XMLHttpRequestBodyInit | null): void {
      const request = this._request;
      if (request && runtime.wantsRealResponse(request.method, request.url)) {
        this.addEventListener(
          'load',
          () => {
            try {
              const type = this.responseType;
              if (type !== '' && type !== 'text' && type !== 'json') return;
              const read = (): string => (type === 'json' ? JSON.stringify(super.response) : super.responseText);
              void runtime.realResponse({
                ...request,
                status: super.status,
                contentType: super.getResponseHeader('content-type'),
                text: read,
              });
            } catch {
              // never let bookkeeping break the app's request
            }
          },
          { once: true },
        );
      }
      super.send(body);
    }

    override abort(): void {
      if (this._interception) {
        this._interception.cancel();
        this._interception = undefined;
        this.dispatchEvent(new ProgressEvent('abort'));
        this.dispatchEvent(new ProgressEvent('loadend'));
      }
      super.abort();
    }

    override get readyState(): number {
      return this._mock ? 4 : super.readyState;
    }

    override get status(): number {
      return this._mock ? this._mock.status : super.status;
    }

    override get statusText(): string {
      return this._mock ? (STATUS_TEXT[this._mock.status] ?? '') : super.statusText;
    }

    override get responseURL(): string {
      if (!this._mock || !this._request) return super.responseURL;
      return typeof location !== 'undefined' ? new URL(this._request.url, location.href).href : this._request.url;
    }

    override get responseText(): string {
      return this._mock ? text(this._mock.body) : super.responseText;
    }

    override get response(): unknown {
      if (!this._mock) return super.response;
      const body = this._mock.body;
      switch (this.responseType) {
        case 'json':
          try {
            return JSON.parse(text(body));
          } catch {
            return null;
          }
        case 'blob':
          return body instanceof Blob ? body : new Blob([body ?? ''], { type: this._mock.headers['content-type'] ?? '' });
        case 'arraybuffer':
          return body instanceof ArrayBuffer ? body : new TextEncoder().encode(text(body)).buffer;
        default:
          return text(body);
      }
    }

    override getAllResponseHeaders(): string {
      if (!this._mock) return super.getAllResponseHeaders();
      return Object.entries(this._mock.headers)
        .map(([name, value]) => `${name}: ${value}\r\n`)
        .join('');
    }

    override getResponseHeader(name: string): string | null {
      if (!this._mock) return super.getResponseHeader(name);
      return this._mock.headers[name.toLowerCase()] ?? null;
    }
  }

  target.XMLHttpRequest = MockedXMLHttpRequest;
  return () => {
    if (target.XMLHttpRequest === MockedXMLHttpRequest) target.XMLHttpRequest = Native;
  };
}
