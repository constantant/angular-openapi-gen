import {
  DestroyRef,
  EnvironmentProviders,
  InjectionToken,
  Provider,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { installMockInterception } from './interception/install';
import type { MockBehavior, MockRuntime } from './interception/mock-runtime';
import type { MockResourceMeta } from './mock-resource-meta';

/**
 * How a mocked endpoint answers. The response travels through the app's real `HttpClient` /
 * `httpResource`, so `status` and `headers` are observable by interceptors, an `error` arrives as an
 * `HttpErrorResponse` (`status` defaults to 500), and a `value` is validated like a real response
 * when the lib was generated with `--validateResponses` — so it has to be complete.
 */
export type MockEndpointBehavior<T> = MockBehavior<T>;

/**
 * Describes one endpoint to the mocking layer. Generated `*.mock.ts` files export one per endpoint
 * (`FIND_PETS_BY_STATUS_MOCK`), typed with the endpoint's response.
 */
export interface MockEndpoint<T = unknown> {
  /** The key the endpoint is listed under in `window.__openApiMocks__` and the DevTools panel. */
  readonly key: string;
  readonly baseUrl: InjectionToken<string>;
  readonly meta: MockResourceMeta;
  /** Provider of the endpoint's real token; absent when the token is `providedIn: 'root'`. */
  readonly provide?: () => Provider;
  /** Type carrier only — never set. */
  readonly _response?: T;
}

/** Registers `endpoint` on the shared runtime for the lifetime of the injector. Internal. */
export function registerMockEndpoint(
  endpoint: MockEndpoint<unknown>,
  behavior: MockBehavior | (() => MockBehavior | undefined) | undefined,
  onRegistered?: (runtime: MockRuntime) => void,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const runtime = installMockInterception();
      const { meta } = endpoint;
      const unregister = runtime.register(
        endpoint.key,
        { method: meta.method, baseUrl: inject(endpoint.baseUrl), path: meta.path },
        { meta, behavior },
      );
      inject(DestroyRef).onDestroy(unregister);
      onRegistered?.(runtime);
    }),
  ]);
}

/**
 * Mocks one endpoint at the transport layer: requests for its method + path under the API's base
 * URL are answered in the page and never reach the network. Every other request — and this
 * endpoint too, while it has neither a behavior nor catch mode — goes to the real API.
 *
 * The endpoint's real token stays provided as usual; this only adds a filter next to it. Use it in
 * `ApplicationConfig.providers` or in a route's `providers`.
 */
export function provideMockEndpoint<T>(
  endpoint: MockEndpoint<T>,
  initialBehavior?: MockEndpointBehavior<T>,
): EnvironmentProviders {
  return registerMockEndpoint(endpoint, initialBehavior);
}
