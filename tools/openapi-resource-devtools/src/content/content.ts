// Guard every chrome.runtime call: when the extension reloads, the old content
// script becomes orphaned (context invalidated) but its DOM listeners survive.
// send() detects this and tears down the listeners so no further errors fire.
function send(msg: unknown): void {
  try {
    chrome.runtime.sendMessage(msg).catch(() => { /* swallow — panel may be closed */ });
  } catch {
    // Context invalidated — remove all listeners and stop discovery.
    document.removeEventListener('openapi-mock-event', onMockEvent);
    document.removeEventListener('__oarm_discovery__', onDiscovery);
    document.removeEventListener('openapi-mock-observed', onObserved);
    attempts = MAX_ATTEMPTS; // stop tryDiscover loop
  }
}

// This script runs at document start, so the listeners below are in place before the app makes
// its first request: a request caught during bootstrap reaches the panel like any later one.

// ── Page → panel: relay live state-change events ─────────────────────────────
function onMockEvent(e: Event): void {
  // detail is null when args contain a type that can't be structured-cloned across
  // Chrome Extension worlds (e.g. FormData, File, Blob).
  const detail = (e as CustomEvent<{ key: string; event: unknown } | null>).detail;
  if (!detail) return;
  const { key, event } = detail;
  send({ type: 'mock-event', key, event });
}
document.addEventListener('openapi-mock-event', onMockEvent);

// ── Page → panel: a request the page made for the first time (intercepted sites only) ────────
function onObserved(e: Event): void {
  const request = (e as CustomEvent<{ method: string; url: string } | null>).detail;
  if (request) send({ type: 'observed-request', request });
}
document.addEventListener('openapi-mock-observed', onObserved);

// ── MAIN-world injection results → panel ─────────────────────────────────────
function onDiscovery(e: Event): void {
  const { keys, states, metas } = (
    e as CustomEvent<{ keys: string[]; states: Record<string, unknown>; metas: Record<string, unknown> }>
  ).detail;
  send({ type: 'mock-keys', keys, metas });
  for (const [key, state] of Object.entries(states)) {
    send({ type: 'mock-state', key, state });
  }
}
document.addEventListener('__oarm_discovery__', onDiscovery);

// ── Panel → page: relay control actions ──────────────────────────────────────
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'control') {
    document.dispatchEvent(
      new CustomEvent('openapi-mock-control', { detail: msg.detail }),
    );
  }
});

// ── Initial discovery ─────────────────────────────────────────────────────────
// Polled for a while because the app registers its endpoints whenever it bootstraps.
const MAX_ATTEMPTS = 30;
let attempts = 0;
function tryDiscover(): void {
  send({ type: 'request-discovery' });
  if (++attempts < MAX_ATTEMPTS) setTimeout(tryDiscover, 300);
}
tryDiscover();
