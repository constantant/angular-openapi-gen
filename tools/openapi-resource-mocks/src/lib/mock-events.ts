export type MockEvent =
  | { type: 'request'; args: unknown[]; ts: number }
  | { type: 'caught'; args: unknown[]; requestId: string; ts: number }
  | { type: 'resolve'; value: unknown; ts: number }
  | { type: 'loading'; ts: number }
  | { type: 'error'; error: unknown; ts: number }
  | { type: 'reset'; ts: number }
  | { type: 'progress'; progressType: 'upload' | 'download'; loaded: number; total?: number; ts: number };

export interface MockProgress {
  type: 'upload' | 'download';
  loaded: number;
  total?: number;
}
