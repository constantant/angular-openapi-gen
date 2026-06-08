interface MockEntry {
  resolve(value: unknown): void;
  resolveAfter(ms: number, value: unknown): void;
  setLoading(): void;
  fail(error: unknown): void;
  reset(): void;
  getState(): { status: string; value: unknown; error: unknown; progress: unknown };
  getHistory(): Array<{ type: string; args: unknown[]; ts: number }>;
}

interface Window {
  __openApiMocks__: Record<string, MockEntry>;
  openApiMock: (key: string) => MockEntry;
}

declare function openApiMock(key: string): MockEntry;
