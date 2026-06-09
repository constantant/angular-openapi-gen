export type ResourceStatus = 'idle' | 'loading' | 'reloading' | 'resolved' | 'error' | 'local';

export interface MockState {
  status: ResourceStatus;
  value: unknown;
  error: unknown;
  progress: { type: string; loaded: number; total?: number } | undefined;
}

export interface HistoryEvent {
  id: number;
  ts: number;
  type: string;
  value?: unknown;
  error?: unknown;
}

export interface PendingRequest {
  requestId: string;
  args: unknown[];
  ts: number;
}

export interface MockEntry {
  key: string;
  state: MockState;
  lastEventType: string | null;
  lastEventTs: number | null;
  history: HistoryEvent[];
  catchMode: boolean;
  pendingRequest: PendingRequest | null;
}

export type PanelMessage =
  | { type: 'mock-keys'; keys: string[] }
  | { type: 'mock-state'; key: string; state: MockState }
  | { type: 'mock-event'; key: string; event: { type: string; value?: unknown; error?: unknown; args?: unknown[]; requestId?: string; ts: number } };

let _histId = 0;
const MAX_HISTORY = 200;

export function blankEntry(key: string): MockEntry {
  return {
    key,
    state: { status: 'idle', value: undefined, error: undefined, progress: undefined },
    lastEventType: null,
    lastEventTs: null,
    history: [],
    catchMode: false,
    pendingRequest: null,
  };
}

export function applyEvent(
  entry: MockEntry,
  ev: { type: string; value?: unknown; error?: unknown; args?: unknown[]; requestId?: string; ts: number },
): MockEntry {
  const histEvent: HistoryEvent = { id: ++_histId, ts: ev.ts, type: ev.type };
  if (ev.value !== undefined) histEvent.value = ev.value;
  if (ev.error !== undefined) histEvent.error = ev.error;

  const history = [histEvent, ...entry.history].slice(0, MAX_HISTORY);
  const next: MockEntry = { ...entry, lastEventType: ev.type, lastEventTs: ev.ts, history };

  switch (ev.type) {
    case 'caught':
      next.pendingRequest = { requestId: ev.requestId ?? '', args: ev.args ?? [], ts: ev.ts };
      next.state = { ...entry.state, status: 'loading' };
      break;
    case 'resolve':
      next.pendingRequest = null;
      next.state = { ...entry.state, status: 'resolved', value: ev.value };
      break;
    case 'loading':
      next.state = { ...entry.state, status: 'loading' };
      break;
    case 'reloading':
      next.state = { ...entry.state, status: 'reloading' };
      break;
    case 'error':
      next.pendingRequest = null;
      next.state = { ...entry.state, status: 'error', error: ev.error };
      break;
    case 'reset':
      next.pendingRequest = null;
      next.state = { status: 'idle', value: undefined, error: undefined, progress: undefined };
      break;
  }
  return next;
}
