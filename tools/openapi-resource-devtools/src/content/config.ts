// Runs in the ISOLATED world at document start, next to inject.ts. Fetches the panel-managed
// endpoints (and what was last set on them) from the service worker and hands them to the runtime
// in the page, which parks the page's first requests until they arrive.
let config: unknown;

function deliver(): void {
  if (config === undefined) return;
  document.dispatchEvent(
    new CustomEvent('openapi-mock-control', { detail: { key: '', action: 'configure', config } }),
  );
}

// inject.ts announces itself; the two scripts start in no guaranteed order, so deliver both when
// the answer arrives (runtime already there) and when the runtime shows up (answer already there).
document.addEventListener('__oarm_runtime_ready__', deliver);

chrome.runtime
  .sendMessage({ type: 'get-config' })
  .then((answer) => {
    config = answer ?? {};
  })
  .catch(() => {
    config = {}; // service worker unavailable — release the page's requests to the real API
  })
  .finally(deliver);
