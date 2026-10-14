import { EnvironmentProviders, makeEnvironmentProviders, type Provider } from '@angular/core';
import type { MockBehavior, MockRuntime } from './lib/interception/mock-runtime';
import type { WindowMockEntry } from './lib/window-mock-entry';
import { registerMockEndpoint, type MockEndpoint, type MockEndpointBehavior } from './lib/provide-mock-endpoint';

export { uninstallMockInterception } from './lib/interception/install';
export type { MockEndpoint, MockEndpointBehavior } from './lib/provide-mock-endpoint';

/** One step in a response sequence — same shape as a single behavior. */
export type MockSequenceEntry<T> = MockEndpointBehavior<T>;

/** Base URL the endpoint is mocked under when the test provides none of its own. */
export const MOCK_BASE_URL = 'http://mock.test';

/** Controls and assertions for an endpoint mocked with {@link mockEndpoint}. */
export interface MockEndpointHandle<T> {
  /**
   * What each request carried, as seen on the wire: the path parameters (strings, in template
   * order), then the body (parsed when it was JSON), then the query (an object of strings).
   */
  readonly calls: readonly unknown[][];
  /** Throws if the endpoint was never requested. */
  expectCalled(): void;
  /** Throws if no request matches all provided args (deep equality). */
  expectCalledWith(...args: unknown[]): void;
  /** Answer held requests and all later ones; re-runs live `httpResource`s so they show it. */
  resolve(value: T): void;
  /** Like `resolve`, with a failing response (`status` defaults to 500). */
  fail(error: unknown, status?: number): void;
  /** Hold every request open until `resolve` / `fail`. */
  setLoading(): void;
  /** Report transfer progress to the requests currently held open. */
  setProgress(type: 'upload' | 'download', loaded: number, total?: number): void;
  /** Drop what `resolve` / `fail` / `setLoading` set and go back to the configured behavior. */
  reset(): void;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const aKeys = Object.keys(a as object);
  const bKeys = Object.keys(b as object);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((k) =>
    deepEqual(
      (a as Record<string, unknown>)[k],
      (b as Record<string, unknown>)[k],
    ),
  );
}

/**
 * Mocks one endpoint for a unit test. The component under test uses the endpoint's real token and
 * the real `HttpClient` / `httpResource`; only the transport is replaced, so the test exercises
 * the same code as production. Drop the handle into `providers` next to `provideHttpClient()`:
 *
 * ```ts
 * const pets = mockEndpoint(FIND_PETS_BY_STATUS_MOCK, { value: [rex] });
 * TestBed.configureTestingModule({ providers: [provideHttpClient(), pets] });
 * const fixture = TestBed.createComponent(PetsPage);
 * await fixture.whenStable();
 * pets.expectCalledWith({ status: 'available' });
 * pets.resolve([luna]);                 // change mid-test: live resources reload and show it
 * ```
 *
 * The handle also provides the endpoint's real token (unless it is `providedIn: 'root'`) and a
 * default base URL ({@link MOCK_BASE_URL}); list your own base-URL provider after it to override.
 *
 * Responses are asynchronous, as in production: `await fixture.whenStable()` for an answered
 * request, or {@link flushMocks} to let a held one (`{ loading: true }`) reach the component.
 * Without a behavior every request is held, so nothing escapes to the network.
 *
 * **Response sequence** (each request consumes the next entry; the last repeats):
 * ```ts
 * mockEndpoint(FIND_PETS_BY_STATUS_MOCK, {
 *   sequence: [{ error: { message: 'timeout' }, status: 504 }, { value: pets }],
 * });
 * ```
 */
export function mockEndpoint<T>(
  endpoint: MockEndpoint<T>,
  behaviorOrOptions: MockEndpointBehavior<T> | { sequence: MockSequenceEntry<T>[] } = { loading: true },
): EnvironmentProviders & MockEndpointHandle<T> {
  const calls: unknown[][] = [];
  let controls: WindowMockEntry | undefined;

  let step = 0;
  const behavior =
    'sequence' in behaviorOrOptions
      ? (): MockBehavior => {
          const { sequence } = behaviorOrOptions;
          return sequence[Math.min(step++, sequence.length - 1)] as MockBehavior;
        }
      : (behaviorOrOptions as MockBehavior);

  const onRegistered = (runtime: MockRuntime): void => {
    controls = runtime.controls(endpoint.key);
    controls?.onEvent((event) => {
      if (event.type === 'request') calls.push(event.args);
    });
  };

  const use = (): WindowMockEntry => {
    if (!controls) {
      throw new Error(
        `[openapi-resource-mocks] "${endpoint.key}" is not registered yet. Add the handle to the ` +
          `TestBed providers and create the component (or inject something) first.`,
      );
    }
    return controls;
  };

  const providers: Array<Provider | EnvironmentProviders> = [
    ...(endpoint.provide ? [endpoint.provide()] : []),
    { provide: endpoint.baseUrl, useValue: MOCK_BASE_URL },
    registerMockEndpoint(endpoint as MockEndpoint<unknown>, behavior, onRegistered),
  ];

  const handle: MockEndpointHandle<T> = {
    calls,
    expectCalled() {
      if (calls.length === 0) {
        throw new Error(`Expected "${endpoint.key}" to have been requested at least once, but it never was.`);
      }
    },
    expectCalledWith(...expected) {
      const found = calls.some(
        (call) => call.length === expected.length && expected.every((arg, i) => deepEqual(arg, call[i])),
      );
      if (!found) {
        throw new Error(
          `Expected "${endpoint.key}" to have been requested with ${JSON.stringify(expected)}, ` +
            `but actual requests were: ${JSON.stringify(calls)}`,
        );
      }
    },
    resolve: (value) => use().resolve(value),
    fail: (error, status) => use().fail(error, status),
    setLoading: () => use().setLoading(),
    setProgress: (type, loaded, total) => use().setProgress(type, loaded, total),
    reset: () => use().reset(),
  };

  return Object.assign(makeEnvironmentProviders(providers), handle);
}

/**
 * Lets pending mock work reach the component: a held request delivering its progress events, or a
 * `resolve()` / `fail()` travelling back through `HttpClient`. Use `fixture.whenStable()` instead
 * when the request is answered — it also waits for the response.
 */
export async function flushMocks(): Promise<void> {
  for (let i = 0; i < 3; i++) await new Promise<void>((resolve) => setTimeout(resolve, 0));
}
