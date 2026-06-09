export type ResourceStatus = 'idle' | 'loading' | 'reloading' | 'resolved' | 'error' | 'local';

export interface MockState {
  status: ResourceStatus;
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

export type PanelMessage =
  | { type: 'mock-keys'; keys: string[] }
  | { type: 'mock-state'; key: string; state: MockState }
  | { type: 'mock-event'; key: string; event: { type: string; value?: unknown; error?: unknown; ts: number } };

export function blankEntry(key: string): MockEntry {
  return {
    key,
    state: { status: 'idle', value: undefined, error: undefined, progress: undefined },
    lastEventType: null,
    lastEventTs: null,
  };
}

export function applyEvent(
  entry: MockEntry,
  ev: { type: string; value?: unknown; error?: unknown; ts: number },
): MockEntry {
  const next: MockEntry = { ...entry, lastEventType: ev.type, lastEventTs: ev.ts };
  switch (ev.type) {
    case 'resolve':   next.state = { ...entry.state, status: 'resolved', value: ev.value }; break;
    case 'loading':   next.state = { ...entry.state, status: 'loading' }; break;
    case 'reloading': next.state = { ...entry.state, status: 'reloading' }; break;
    case 'error':     next.state = { ...entry.state, status: 'error', error: ev.error }; break;
    case 'reset':     next.state = { status: 'idle', value: undefined, error: undefined, progress: undefined }; break;
  }
  return next;
}
