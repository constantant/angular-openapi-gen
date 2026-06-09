// Map of inspected tabId → connected DevTools panel port.
// The port keeps this service worker alive while the DevTools panel is open.
const ports = new Map<number, chrome.runtime.Port>();

chrome.runtime.onConnect.addListener((port) => {
  const m = port.name.match(/^devtools-(\d+)$/);
  if (!m) return;
  const tabId = parseInt(m[1], 10);
  ports.set(tabId, port);

  // Relay: panel → content script
  port.onMessage.addListener((msg) => {
    chrome.tabs.sendMessage(tabId, msg).catch(() => {
      // Tab may not have a content script (e.g. chrome:// pages) — swallow.
    });
  });

  port.onDisconnect.addListener(() => {
    ports.delete(tabId);
  });
});

// Relay: content script → panel
chrome.runtime.onMessage.addListener((msg, sender) => {
  const tabId = sender.tab?.id;
  if (tabId == null) return;
  ports.get(tabId)?.postMessage(msg);
});
