/**
 * Framework-free entry point: the transport-level mock runtime without the Angular providers.
 * For tools that install it from outside the app — the DevTools extension injects it into the
 * page, a Playwright test can load it with `addInitScript` — or for apps not built with Angular.
 */
export { installMockInterception, uninstallMockInterception } from './lib/interception/install';
export { MockRuntime } from './lib/interception/mock-runtime';
export type {
  MockBehavior,
  MockResponse,
  MockResult,
  MockRegistration,
  MockRuntimeConfig,
  ConfiguredEndpoint,
  InterceptedRequest,
  ObservedRequest,
  RealResponse,
  Interception,
} from './lib/interception/mock-runtime';
export type { EndpointRule } from './lib/interception/url-matcher';
export type { WindowMockEntry } from './lib/window-mock-entry';
export type { MockResourceMeta } from './lib/mock-resource-meta';
export type { MockEvent, MockProgress } from './lib/mock-events';
