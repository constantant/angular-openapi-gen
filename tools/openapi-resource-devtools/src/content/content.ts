type MocksWindow = Window & {
  __openApiMocks__?: Record<string, { getState(): unknown }>;
};

// Relay DOM events emitted by MockResourceBus → extension panel
document.addEventListener('openapi-mock-event', (e: Event) => {
  const { key, event } = (e as CustomEvent<{ key: string; event: unknown }>).detail;
  chrome.runtime.sendMessage({ type: 'mock-event', key, event }).catch(() => {});
});

// Handle messages from the panel (relayed via background SW)
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'get-keys') {
    reportAll();
  } else if (msg.type === 'get-state') {
    reportState(msg.key as string);
  } else if (msg.type === 'control') {
    document.dispatchEvent(
      new CustomEvent('openapi-mock-control', { detail: msg.detail }),
    );
  }
});

function reportState(key: string): void {
  const mocks = (window as MocksWindow).__openApiMocks__;
  const state = mocks?.[key]?.getState();
  if (state != null) {
    chrome.runtime.sendMessage({ type: 'mock-state', key, state }).catch(() => {});
  }
}

function reportAll(): void {
  const mocks = (window as MocksWindow).__openApiMocks__;
  if (!mocks) return;
  const keys = Object.keys(mocks);
  chrome.runtime.sendMessage({ type: 'mock-keys', keys }).catch(() => {});
  for (const key of keys) reportState(key);
}

// Angular bootstraps asynchronously; retry discovery until mocks appear.
let attempts = 0;
function tryDiscover(): void {
  const mocks = (window as MocksWindow).__openApiMocks__;
  if (mocks && Object.keys(mocks).length > 0) {
    reportAll();
    return;
  }
  if (++attempts < 20) setTimeout(tryDiscover, 300);
}

tryDiscover();
