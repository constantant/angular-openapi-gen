export interface MockState {
  status: string;
  value: unknown;
  error: unknown;
  progress: { type: string; loaded: number; total?: number } | undefined;
}

export interface MockEntry {
  key: string;
  state: MockState;
  lastEventType: string | null;
  lastEventTs: number | null;
}

/** Messages sent from the content script → background → panel. */
export type PanelMessage =
  | { type: 'mock-keys'; keys: string[] }
  | { type: 'mock-state'; key: string; state: MockState }
  | { type: 'mock-event'; key: string; event: { type: string; value?: unknown; error?: unknown; ts: number } };

/** Messages sent from the panel → background → content script. */
export type ContentMessage =
  | { type: 'get-keys' }
  | { type: 'get-state'; key: string }
  | { type: 'control'; detail: { key: string; action: string; [k: string]: unknown } };
