export type MockEvent =
  | { type: 'request'; args: unknown[]; ts: number }
  | { type: 'resolve'; value: unknown; ts: number }
  | { type: 'loading'; ts: number }
  | { type: 'error'; error: unknown; ts: number }
  | { type: 'reset'; ts: number };
