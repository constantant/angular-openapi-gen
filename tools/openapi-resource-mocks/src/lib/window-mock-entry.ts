import type { MockEvent } from './mock-events';
import type { MockResourceMeta } from './mock-resource-meta';

/** The controls of one mocked endpoint, published as `window.__openApiMocks__[key]` / `openApiMock(key)`. */
export interface WindowMockEntry {
  resolve(value: unknown): void;
  resolveAfter(delayMs: number, value: unknown): void;
  setLoading(): void;
  /** `status` is the HTTP status of the failing response (default 500). */
  fail(error: unknown, status?: number): void;
  reset(): void;
  reload(): boolean;
  setProgress(type: 'upload' | 'download', loaded: number, total?: number): void;
  simulateProgress(
    type: 'upload' | 'download',
    totalBytes: number,
    durationMs: number,
    finalValue: unknown,
    steps?: number,
  ): void;
  setCatchMode(enabled: boolean): void;
  /** `caught` is the request catch mode is holding open at the moment, if any. */
  getState(): {
    status: string;
    value: unknown;
    error: unknown;
    progress: unknown;
    requestCount: number;
    caught?: { requestId: string; args: unknown[]; ts: number };
  };
  getMeta(): MockResourceMeta | undefined;
  getHistory(): MockEvent[];
  clearHistory(): void;
  onEvent(cb: (event: MockEvent) => void): () => void;
}

declare global {
  interface Window {
    __openApiMocks__?: Record<string, WindowMockEntry>;
    openApiMock?: (key: string) => WindowMockEntry;
  }
}
