import { MockRuntime } from './mock-runtime';
import { patchFetch } from './patch-fetch';
import { patchXhr } from './patch-xhr';

const RUNTIME_KEY = '__oarmRuntime__';
/** Called by generated `httpResource` tokens (their `mock-hook.ts`) with every resource they create. */
const TRACK_KEY = '__oarmTrack__';

interface Installed {
  runtime: MockRuntime;
  restore: () => void;
}

type Globals = Record<string, unknown> & { fetch?: typeof fetch; XMLHttpRequest?: typeof XMLHttpRequest };

/**
 * Patches `fetch` and `XMLHttpRequest` once per global and returns the shared runtime. Safe to call
 * from several places — the app bundle and a script injected by the DevTools extension end up on
 * the same runtime, whichever runs first.
 */
export function installMockInterception(): MockRuntime {
  const globals = globalThis as unknown as Globals;
  const existing = globals[RUNTIME_KEY] as Installed | undefined;
  if (existing) return existing.runtime;

  const runtime = new MockRuntime();
  const restores: Array<() => void> = [];
  if (typeof globals.fetch === 'function') {
    restores.push(patchFetch(globals as { fetch: typeof fetch }, runtime));
  }
  if (typeof globals.XMLHttpRequest === 'function') {
    restores.push(patchXhr(globals as { XMLHttpRequest: typeof XMLHttpRequest }, runtime));
  }
  globals[TRACK_KEY] = (key: string, ref: { reload(): boolean }): void => runtime.track(key, ref);
  const installed: Installed = { runtime, restore: () => restores.forEach((restore) => restore()) };
  globals[RUNTIME_KEY] = installed;
  return runtime;
}

/** Restores the native `fetch` / `XMLHttpRequest` and drops the runtime. Meant for test teardown. */
export function uninstallMockInterception(): void {
  const globals = globalThis as unknown as Globals;
  const existing = globals[RUNTIME_KEY] as Installed | undefined;
  if (!existing) return;
  existing.restore();
  existing.runtime.dispose();
  delete globals[RUNTIME_KEY];
  delete globals[TRACK_KEY];
  if (typeof window !== 'undefined') delete window.__openApiMocks__;
}
