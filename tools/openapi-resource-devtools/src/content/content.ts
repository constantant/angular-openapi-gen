// ── Page → panel: relay live state-change events ────────────────────────────
// CustomEvent.detail is structured-cloned across the isolation boundary, so
// this listener receives the full event payload from the Angular app.
document.addEventListener('openapi-mock-event', (e: Event) => {
  const { key, event } = (e as CustomEvent<{ key: string; event: unknown }>).detail;
  chrome.runtime.sendMessage({ type: 'mock-event', key, event }).catch(() => {});
});

// ── MAIN-world injection results → panel ─────────────────────────────────────
// The SW injects a script into the page's MAIN world (window.__openApiMocks__
// is not visible from the isolated content-script world). The injected script
// dispatches this DOM event, which crosses the isolation boundary.
document.addEventListener('__oarm_discovery__', (e: Event) => {
  const { keys, states } = (
    e as CustomEvent<{ keys: string[]; states: Record<string, unknown> }>
  ).detail;
  chrome.runtime.sendMessage({ type: 'mock-keys', keys }).catch(() => {});
  for (const [key, state] of Object.entries(states)) {
    chrome.runtime.sendMessage({ type: 'mock-state', key, state }).catch(() => {});
  }
});

// ── Panel → page: relay control actions ──────────────────────────────────────
// DOM events dispatched by a content script ARE received by the page's own
// event listeners, so this correctly reaches MockResourceBus.
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'control') {
    document.dispatchEvent(
      new CustomEvent('openapi-mock-control', { detail: msg.detail }),
    );
  }
});

// ── Initial discovery ─────────────────────────────────────────────────────────
// Angular bootstraps asynchronously; ask the SW to inject discovery until mocks
// appear. The SW calls chrome.scripting.executeScript({ world: 'MAIN' }) which
// reads window.__openApiMocks__ and fires __oarm_discovery__ above.
let attempts = 0;
function tryDiscover(): void {
  chrome.runtime.sendMessage({ type: 'request-discovery' }).catch(() => {});
  if (++attempts < 20) setTimeout(tryDiscover, 300);
}
tryDiscover();
