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

// ── Panel-managed endpoints ───────────────────────────────────────────────────
// The panel persists the endpoints it manages (and what was last set on them) under this key; the
// SW serves them to config.js at document start, so they are mocked even with the panel closed.
const MANAGED_MOCKS_KEY = 'oarm_local_mocks';

interface StoredMock {
  meta?: { method: string; path: string };
  baseUrl?: string;
  catchMode?: boolean;
  override?: unknown;
}

async function configFor(tabId: number): Promise<{ endpoints: unknown[]; catchModes: Record<string, boolean> }> {
  const sessionKey = `oarm_catch_${tabId}`;
  const [local, session] = await Promise.all([
    chrome.storage.local.get(MANAGED_MOCKS_KEY),
    chrome.storage.session.get(sessionKey),
  ]);
  const catchModes: Record<string, boolean> = { ...((session[sessionKey] as Record<string, boolean> | undefined) ?? {}) };
  const endpoints: unknown[] = [];
  const stored = (local[MANAGED_MOCKS_KEY] ?? {}) as Record<string, StoredMock>;
  for (const [key, mock] of Object.entries(stored)) {
    // Without a base URL the endpoint cannot be matched against requests.
    if (!mock?.meta || typeof mock.baseUrl !== 'string') continue;
    endpoints.push({
      key,
      rule: { method: mock.meta.method, baseUrl: mock.baseUrl, path: mock.meta.path },
      meta: mock.meta,
      behavior: mock.override,
    });
    if (mock.catchMode) catchModes[key] = true;
  }
  return { endpoints, catchModes };
}

// ── Per-site interception ─────────────────────────────────────────────────────
// fetch / XMLHttpRequest are only patched on sites the developer opted in from the panel: the two
// document-start scripts are registered for that host and persist across browser sessions.
// Match patterns cannot carry a port, so a host is opted in on all of its ports.
function siteOf(url: string | undefined): { ids: [string, string]; match: string } | null {
  if (!url) return null;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
  const id = `oarm-site-${parsed.protocol.slice(0, -1)}-${parsed.hostname}`;
  return { ids: [`${id}-inject`, `${id}-config`], match: `${parsed.protocol}//${parsed.hostname}/*` };
}

async function isIntercepting(tabId: number): Promise<boolean> {
  const site = siteOf((await chrome.tabs.get(tabId)).url);
  if (!site) return false;
  const registered = await chrome.scripting.getRegisteredContentScripts({ ids: site.ids });
  return registered.length > 0;
}

async function setIntercepting(tabId: number, enabled: boolean): Promise<void> {
  const site = siteOf((await chrome.tabs.get(tabId)).url);
  if (!site) return;
  const registered = await chrome.scripting.getRegisteredContentScripts({ ids: site.ids });
  if (registered.length > 0) await chrome.scripting.unregisterContentScripts({ ids: registered.map((s) => s.id) });
  if (!enabled) return; // the page that is open keeps the patch until it reloads
  await chrome.scripting.registerContentScripts([
    { id: site.ids[0], js: ['inject.js'], matches: [site.match], runAt: 'document_start', world: 'MAIN', persistAcrossSessions: true },
    { id: site.ids[1], js: ['config.js'], matches: [site.match], runAt: 'document_start', persistAcrossSessions: true },
  ]);
  // The page that is open now: patch it in place, so no reload is needed to start mocking.
  await chrome.scripting.executeScript({ target: { tabId }, world: 'MAIN', files: ['inject.js'] });
  await chrome.scripting.executeScript({ target: { tabId }, files: ['config.js'] });
}

function postInterceptState(tabId: number, port: chrome.runtime.Port): void {
  isIntercepting(tabId)
    .then((enabled) => port.postMessage({ type: 'intercept-state', enabled }))
    .catch(() => { /* tab closed or port gone */ });
}

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

/**
 * Read the distinct requests the page made since interception started (method + URL without the
 * query) and post them to the panel, which suggests base URLs for its specs from them. Read on
 * demand; nothing is stored by the extension.
 */
function injectObserved(tabId: number, port: chrome.runtime.Port): void {
  chrome.scripting
    .executeScript({
      target: { tabId },
      world: 'MAIN',
      func: () => {
        const installed = (
          window as unknown as { __oarmRuntime__?: { runtime?: { observedRequests?: () => unknown[] } } }
        ).__oarmRuntime__;
        return installed?.runtime?.observedRequests?.() ?? [];
      },
    })
    .then((results) => {
      const requests = results?.[0]?.result;
      port.postMessage({ type: 'observed-requests', requests: Array.isArray(requests) ? requests : [] });
    })
    .catch(() => { /* chrome:// page, or the tab is gone */ });
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
    if (msg.type === 'get-observed') {
      injectObserved(tabId, port);
      return;
    }
    if (msg.type === 'get-intercept') {
      postInterceptState(tabId, port);
      return;
    }
    if (msg.type === 'set-intercept') {
      setIntercepting(tabId, !!msg.enabled)
        .catch(() => { /* chrome:// page, or the tab is gone */ })
        .finally(() => {
          postInterceptState(tabId, port);
          injectDiscovery(tabId);
        });
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
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // config.js asks for the panel-managed endpoints at document start.
  if (msg.type === 'get-config') {
    const tabId = sender.tab?.id;
    if (tabId == null) return;
    configFor(tabId).then(sendResponse, () => sendResponse({}));
    return true; // answered asynchronously
  }
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
