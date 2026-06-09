// Guard every chrome.runtime call: when the extension reloads, the old content
// script becomes orphaned (context invalidated) but its DOM listeners survive.
// send() detects this and tears down the listeners so no further errors fire.
function send(msg: unknown): void {
  try {
    chrome.runtime.sendMessage(msg).catch(() => {});
  } catch {
    // Context invalidated — remove all listeners and stop discovery.
    document.removeEventListener('openapi-mock-event', onMockEvent);
    document.removeEventListener('__oarm_discovery__', onDiscovery);
    attempts = 20; // stop tryDiscover loop
  }
}

// ── Page → panel: relay live state-change events ─────────────────────────────
function onMockEvent(e: Event): void {
  const { key, event } = (e as CustomEvent<{ key: string; event: unknown }>).detail;
  send({ type: 'mock-event', key, event });
}
document.addEventListener('openapi-mock-event', onMockEvent);

// ── MAIN-world injection results → panel ─────────────────────────────────────
function onDiscovery(e: Event): void {
  const { keys, states } = (
    e as CustomEvent<{ keys: string[]; states: Record<string, unknown> }>
  ).detail;
  send({ type: 'mock-keys', keys });
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
let attempts = 0;
function tryDiscover(): void {
  send({ type: 'request-discovery' });
  if (++attempts < 20) setTimeout(tryDiscover, 300);
}
tryDiscover();
