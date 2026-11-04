/** What a request carried, besides its args: the method, the URL as requested and the headers set by the app. */
export interface MockRequestInfo {
  /** Upper-case HTTP method. */
  method?: string;
  url?: string;
  /** Lower-cased names. Headers the browser adds itself (cookies, user agent) are not seen. */
  headers?: Record<string, string>;
  /** The body as sent, when it was text (a JSON body included): `"en"` and `en` parse alike, the wire does not. */
  raw?: string;
}

export type MockEvent =
  | ({ type: 'request'; args: unknown[]; ts: number } & MockRequestInfo)
  | ({ type: 'caught'; args: unknown[]; requestId: string; ts: number } & MockRequestInfo)
  /** A mocked response was sent (not for requests that went to the real API). */
  | { type: 'respond'; status: number; ts: number }
  | { type: 'resolve'; value: unknown; ts: number }
  /** The real API answered a request of the endpoint that was not mocked (JSON bodies only). */
  | { type: 'real'; status: number; value: unknown; ts: number }
  | { type: 'loading'; ts: number }
  | { type: 'reloading'; ts: number }
  | { type: 'error'; error: unknown; ts: number }
  | { type: 'reset'; ts: number }
  | { type: 'progress'; progressType: 'upload' | 'download'; loaded: number; total?: number; ts: number };

export interface MockProgress {
  type: 'upload' | 'download';
  loaded: number;
  total?: number;
}
