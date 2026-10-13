import type { MockResourceMeta } from '@constantant/openapi-resource-mocks';

export type { MockResourceMeta };

export type ResourceStatus = 'idle' | 'loading' | 'reloading' | 'resolved' | 'error' | 'local';

export interface MockState {
  status: ResourceStatus;
  value: unknown;
  error: unknown;
  progress: { type: string; loaded: number; total?: number } | undefined;
  requestCount?: number;
}

export interface HistoryEvent {
  id: number;
  ts: number;
  type: string;
  value?: unknown;
  error?: unknown;
  args?: unknown[];
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
  meta: MockResourceMeta | null;
  /**
   * Created in the panel rather than by the app: the panel persists it and the extension registers
   * it in the page on every load. Its status is `'local'` until the page reports it.
   */
  managed: boolean;
  /** Base URL a managed endpoint is matched under; without one it cannot be registered. */
  baseUrl?: string;
}

export type PanelMessage =
  | { type: 'mock-keys'; keys: string[]; metas?: Record<string, MockResourceMeta | null> }
  | { type: 'mock-state'; key: string; state: MockState }
  | { type: 'intercept-state'; enabled: boolean }
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
    meta: null,
    managed: false,
  };
}

export function applyEvent(
  entry: MockEntry,
  ev: { type: string; value?: unknown; error?: unknown; args?: unknown[]; requestId?: string; ts: number },
): MockEntry {
  const histEvent: HistoryEvent = { id: ++_histId, ts: ev.ts, type: ev.type };
  if (ev.value !== undefined) histEvent.value = ev.value;
  if (ev.error !== undefined) histEvent.error = ev.error;
  if (ev.args?.length) histEvent.args = ev.args;

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
      next.state = { ...entry.state, status: 'reloading', error: undefined };
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
