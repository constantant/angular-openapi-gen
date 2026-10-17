export { provideMockEndpoint } from './lib/provide-mock-endpoint';
export type { MockEndpoint, MockEndpointBehavior } from './lib/provide-mock-endpoint';
export { installMockInterception, uninstallMockInterception } from './lib/interception/install';
export { MockRuntime, UNMATCHED_STATUS } from './lib/interception/mock-runtime';
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
  UnmatchedRequest,
  MockCases,
  MockRequestMatch,
  MockBehaviorOrCases,
} from './lib/interception/mock-runtime';
export type { EndpointRule } from './lib/interception/url-matcher';
export type { WindowMockEntry } from './lib/window-mock-entry';
export type { MockResourceMeta } from './lib/mock-resource-meta';
export type { MockEvent, MockProgress, MockRequestInfo } from './lib/mock-events';
