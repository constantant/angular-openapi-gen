import type { MockResourceMeta } from '@constantant/openapi-resource-mocks';

export type { MockResourceMeta };

export type ResourceStatus = 'idle' | 'loading' | 'reloading' | 'resolved' | 'error' | 'local';

export interface MockState {
  status: ResourceStatus;
  value: unknown;
  error: unknown;
  progress: { type: string; loaded: number; total?: number } | undefined;
  requestCount?: number;
  /** The request catch mode is holding in the page right now, as reported with the state. */
  caught?: PendingRequest;
}

/** A request the inspected page made (method + URL without the query), reported while intercepting. */
export interface ObservedRequest {
  method: string;
  url: string;
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
  /**
   * The last successful response known for the endpoint — usually the real API's. Kept by the
   * panel across page reloads (the page forgets it), as the starting point for a mock.
   */
  example?: unknown;
}

export type PanelMessage =
  | { type: 'mock-keys'; keys: string[]; metas?: Record<string, MockResourceMeta | null> }
  | { type: 'mock-state'; key: string; state: MockState }
  | { type: 'intercept-state'; enabled: boolean }
  | { type: 'observed-requests'; requests: ObservedRequest[] }
  | { type: 'observed-request'; request: ObservedRequest }
  | { type: 'mock-event'; key: string; event: { type: string; value?: unknown; error?: unknown; args?: unknown[]; requestId?: string; status?: number; ts: number } };

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
  ev: { type: string; value?: unknown; error?: unknown; args?: unknown[]; requestId?: string; status?: number; ts: number },
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
    case 'real':
      // The real API answered: shown as the endpoint's state unless a held request is waiting.
      if (!entry.pendingRequest) {
        const failed = (ev.status ?? 200) >= 400;
        next.state = failed
          ? { ...entry.state, status: 'error', error: ev.value }
          : { ...entry.state, status: 'resolved', value: ev.value, error: undefined };
      }
      if ((ev.status ?? 200) < 400 && ev.value !== undefined) next.example = ev.value;
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
