// Runs in the page's MAIN world at document start, on sites where the developer switched
// interception on in the panel. Installs the mock runtime (patched fetch / XMLHttpRequest) so a
// production build — which bundles no mock code — can be mocked. The runtime is shared with an
// app that bundles @constantant/openapi-resource-mocks itself: whichever runs first installs it.
import { installMockInterception } from '@constantant/openapi-resource-mocks/runtime';

/** Longest the first requests of a page wait for the endpoints to arrive from the service worker. */
const HOLD_MS = 1500;

const globals = window as unknown as { __oarmInjected__?: boolean };
if (!globals.__oarmInjected__) {
  globals.__oarmInjected__ = true;
  const runtime = installMockInterception();
  // Only a page that is still loading has requests worth parking; an app-bundled runtime of an
  // older version may not know `hold`.
  if (document.readyState === 'loading') runtime.hold?.(HOLD_MS);
  // Lets the panel suggest a base URL for a spec from the requests the page really makes.
  runtime.observeRequests?.();
  document.dispatchEvent(new CustomEvent('__oarm_runtime_ready__'));
}
