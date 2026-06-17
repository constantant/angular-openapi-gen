// Map of inspected tabId → connected DevTools panel port.
const ports = new Map<number, chrome.runtime.Port>();

// ── Catch-mode persistence ────────────────────────────────────────────────────
// Tracks which keys have catch mode enabled per tab so they can be pre-injected
// into the MAIN world before Angular bootstraps on the next page load.
// In-memory for speed; mirrored to chrome.storage.session to survive SW sleep.
const tabCatchModes = new Map<number, Record<string, boolean>>();

// Restore from storage when the SW wakes up after being suspended.
chrome.storage.session.get(null, (all) => {
  for (const [k, v] of Object.entries(all)) {
    if (k.startsWith('oarm_catch_') && typeof v === 'object' && v !== null) {
      const tabId = parseInt(k.slice('oarm_catch_'.length), 10);
      if (!isNaN(tabId)) tabCatchModes.set(tabId, v as Record<string, boolean>);
    }
  }
});

function setCatchForTab(tabId: number, key: string, enabled: boolean): void {
  const modes = tabCatchModes.get(tabId) ?? {};
  if (enabled) modes[key] = true; else delete modes[key];
  tabCatchModes.set(tabId, modes);
  chrome.storage.session.set({ [`oarm_catch_${tabId}`]: modes });
}

// Pre-inject active catch modes before Angular bootstraps on the next page load.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status !== 'loading') return;
  const modes = tabCatchModes.get(tabId);
  if (!modes) return;
  const active: Record<string, boolean> = {};
  for (const [k, v] of Object.entries(modes)) if (v) active[k] = true;
  if (Object.keys(active).length === 0) return;
  chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    injectImmediately: true,
    func: (catchModes: Record<string, boolean>) => {
      (window as unknown as Record<string, unknown>)['__oarmPendingCatch__'] = catchModes;
    },
    args: [active],
  }).catch(() => { /* tab may be a chrome:// page */ });
});

/**
 * Inject a self-contained function into the page's MAIN world via the scripting
 * API. This bypasses both content-script isolation and the page's CSP.
 * The injected function reads window.__openApiMocks__ and dispatches a
 * __oarm_discovery__ DOM event that the content script can receive.
 */
function injectDiscovery(tabId: number): void {
  chrome.scripting
    .executeScript({
      target: { tabId },
      world: 'MAIN',
      func: () => {
        const m = (window as unknown as Record<string, Record<string, { getState(): unknown; getMeta(): unknown }>>)
          .__openApiMocks__;
        if (!m) return;
        const keys = Object.keys(m);
        if (!keys.length) return;
        const states: Record<string, unknown> = {};
        const metas: Record<string, unknown> = {};
        for (const k of keys) {
          states[k] = m[k].getState();
          metas[k] = m[k].getMeta() ?? null;
        }
        document.dispatchEvent(
          new CustomEvent('__oarm_discovery__', { detail: { keys, states, metas } }),
        );
      },
    })
    .catch(() => {
      // Tab may be a chrome:// page or may not have a content script yet — ignore.
    });
}

/**
 * Read the state of a single mock key by injecting a function into the MAIN world
 * and posting the result directly to the panel port — no `mock-keys` broadcast,
 * no re-watch side-effects.
 */
function injectStateOnly(tabId: number, key: string, port: chrome.runtime.Port): void {
  chrome.scripting
    .executeScript({
      target: { tabId },
      world: 'MAIN',
      func: (k: string) => {
        const m = (window as unknown as { __openApiMocks__?: Record<string, { getState(): unknown }> })
          .__openApiMocks__;
        return m?.[k]?.getState() ?? null;
      },
      args: [key],
    })
    .then((results) => {
      const state = results?.[0]?.result;
      if (state) port.postMessage({ type: 'mock-state', key, state });
    })
    .catch(() => { /* tab may have navigated */ });
}

chrome.runtime.onConnect.addListener((port) => {
  const m = port.name.match(/^devtools-(\d+)$/);
  if (!m) return;
  const tabId = parseInt(m[1], 10);
  ports.set(tabId, port);

  // Relay: panel → content script (or handle locally if it requires MAIN-world access)
  port.onMessage.addListener((msg) => {
    if (msg.type === 'get-keys') {
      injectDiscovery(tabId);
      return;
    }
    if (msg.type === 'get-state') {
      // Targeted single-key state read — avoids triggering mock-keys and the
      // watch-list re-enable logic in the panel for every sendControl call.
      injectStateOnly(tabId, msg.key, port);
      return;
    }
    if (msg.type === 'control' && msg.detail?.key) {
      const { key, action } = msg.detail as { key: string; action: string };
      if (action === 'setCatchMode') setCatchForTab(tabId, key, true);
      else if (action === 'clearCatchMode') setCatchForTab(tabId, key, false);
    }
    chrome.tabs.sendMessage(tabId, msg).catch(() => { /* swallow — tab may have navigated */ });
  });

  port.onDisconnect.addListener(() => ports.delete(tabId));
});

// Relay: content script → panel
chrome.runtime.onMessage.addListener((msg, sender) => {
  // Content script asks the SW to run discovery on its behalf (for the retry loop).
  if (msg.type === 'request-discovery') {
    const tabId = sender.tab?.id;
    if (tabId != null) injectDiscovery(tabId);
    return;
  }
  const tabId = sender.tab?.id;
  if (tabId == null) return;
  ports.get(tabId)?.postMessage(msg);
});
