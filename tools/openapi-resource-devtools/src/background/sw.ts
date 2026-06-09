// Map of inspected tabId → connected DevTools panel port.
const ports = new Map<number, chrome.runtime.Port>();

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
        const m = (window as unknown as Record<string, Record<string, { getState(): unknown }>>)
          .__openApiMocks__;
        if (!m) return;
        const keys = Object.keys(m);
        if (!keys.length) return;
        const states: Record<string, unknown> = {};
        for (const k of keys) states[k] = m[k].getState();
        document.dispatchEvent(
          new CustomEvent('__oarm_discovery__', { detail: { keys, states } }),
        );
      },
    })
    .catch(() => {
      // Tab may be a chrome:// page or may not have a content script yet — ignore.
    });
}

chrome.runtime.onConnect.addListener((port) => {
  const m = port.name.match(/^devtools-(\d+)$/);
  if (!m) return;
  const tabId = parseInt(m[1], 10);
  ports.set(tabId, port);

  // Relay: panel → content script (or handle locally if it requires MAIN-world access)
  port.onMessage.addListener((msg) => {
    if (msg.type === 'get-keys' || msg.type === 'get-state') {
      // These require reading window.__openApiMocks__ — inject into MAIN world directly.
      injectDiscovery(tabId);
      return;
    }
    chrome.tabs.sendMessage(tabId, msg).catch(() => {});
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
