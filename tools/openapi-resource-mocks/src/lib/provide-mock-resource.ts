import { InjectionToken, inject, effect, untracked, FactoryProvider } from '@angular/core';
import { HttpEventType, HttpResponse, httpResource, type HttpEvent } from '@angular/common/http';
import { Observable, type Subscriber } from 'rxjs';
import { MockResourceBus } from './mock-resource-bus';
import { createMockResourceRef, type MockResourceRef, type MockResourceRefInternal } from './mock-resource-ref';
import type { MockResourceMeta } from './mock-resource-meta';

export type DeepPartial<T> = T extends Array<infer E>
  ? DeepPartial<E>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export type ProviderInitialBehavior<T> =
  | { value: DeepPartial<T>; delay?: number }
  | { loading: true }
  | { error: unknown; delay?: number };

export interface MockProviderOptions {
  /** Called inside the injection context to produce a suffix appended to the bus key as `key:suffix`. */
  keyDiscriminator?: () => string;
}

function applyBehavior<T>(ref: MockResourceRef<T>, behavior: ProviderInitialBehavior<T>): void {
  if ('value' in behavior) {
    if (behavior.delay) {
      ref.resolveAfter(behavior.delay, behavior.value as T);
    } else {
      ref.resolve(behavior.value as T);
    }
  } else if ('error' in behavior) {
    if (behavior.delay) {
      ref.setLoading();
      setTimeout(() => ref.fail(behavior.error), behavior.delay);
    } else {
      ref.fail(behavior.error);
    }
  } else {
    ref.setLoading();
  }
}

export function provideMockResource<T>(
  token: InjectionToken<(...args: unknown[]) => ReturnType<typeof httpResource<T>>>,
  key: string,
  initialBehavior?: ProviderInitialBehavior<T>,
  meta?: MockResourceMeta,
  options?: MockProviderOptions,
): FactoryProvider {
  return {
    provide: token,
    useFactory: () => {
      const bus = inject(MockResourceBus);
      const discriminator = options?.keyDiscriminator;
      return (...args: unknown[]): ReturnType<typeof httpResource<T>> => {
        const effectiveKey = discriminator ? `${key}:${discriminator()}` : key;
        const ref = createMockResourceRef<T>();
        bus.register(effectiveKey, ref, meta);
        const internal = ref as MockResourceRefInternal<T>;
        // Honour the per-call `defaultValue` option (`--callOptions`) like the real resource. Only the
        // argument named `options` counts, so a body that merely has a `defaultValue` field is not mistaken for it.
        const optionsIndex = meta?.args?.indexOf('options') ?? -1;
        const callOptions = optionsIndex >= 0 ? (args[optionsIndex] as { defaultValue?: T } | undefined) : undefined;
        if (callOptions && typeof callOptions === 'object' && callOptions.defaultValue !== undefined) {
          internal._setDefaultValue(callOptions.defaultValue);
        }

        if (initialBehavior) {
          // Re-apply on every request (initial, param change, reload) unless catch mode
          // is intercepting. The bus's onRequest listener (registered in bus.register)
          // runs first, so isCatchMode reflects whether this request was just caught.
          ref.onRequest(() => {
            if (!bus.isCatchMode(effectiveKey)) applyBehavior(ref, initialBehavior);
          });
        }

        // untracked() prevents thunk signal-reads from leaking into the outer reactive
        // context — component field initializers run during Angular change detection.
        untracked(() => { internal._notifyRequest(args); });

        // When any arg is a reactive thunk, track signal changes so each new set of
        // params fires a new request event (mirroring how httpResource re-fires on
        // reactive lambda changes). effect() is valid here because this function is
        // always called from a component constructor / field-initializer context.
        if (args.some((a) => typeof a === 'function')) {
          let first = true;
          effect(() => {
            // Resolve thunks inside the effect body so their signals are tracked.
            const resolved = args.map((a) => (typeof a === 'function' ? (a as () => unknown)() : a));
            untracked(() => {
              if (first) { first = false; return; } // first run already handled by _notifyRequest above
              internal._notifyRequest(resolved);
            });
          });
        }

        return ref as unknown as ReturnType<typeof httpResource<T>>;
      };
    },
  };
}

type Outcome<T> = { value: T } | { error: unknown };

/**
 * Mock provider for tokens generated with `clientType: 'httpClient'` — the token's function
 * returns a cold `Observable<T>` instead of an httpResource.
 *
 * Each call of the injected function registers a ref on the bus under `key` (so the DevTools
 * panel sees it immediately); each **subscription** counts as a request. The observable emits
 * once and completes when the ref resolves, or errors when it fails — so the same panel
 * controls (resolve / fail / catch mode / delay) drive both kinds of mock.
 *
 * Like a real `HttpClient` call, an observable is finished once it has emitted. A `resolve` /
 * `fail` that arrives while nothing is pending (e.g. from the DevTools Respond tab after the
 * page has loaded) is therefore remembered per key and replayed by the **next** request, taking
 * precedence over `initialBehavior`. Use it together with the app's reload / refetch.
 */
export function provideMockObservable<T>(
  token: InjectionToken<(...args: unknown[]) => Observable<T>>,
  key: string,
  initialBehavior?: ProviderInitialBehavior<T>,
  meta?: MockResourceMeta,
  options?: MockProviderOptions,
): FactoryProvider {
  return createObservableProvider<T>(token, key, initialBehavior, meta, options, false);
}

/**
 * Like {@link provideMockObservable}, for tokens generated with `reportProgress` whose function
 * returns `Observable<HttpEvent<T>>` (file uploads / blob downloads over `httpClient`).
 *
 * It emits what a real `HttpClient` call with `reportProgress: true` emits: a `Sent` event on
 * subscribe, `UploadProgress` / `DownloadProgress` events for every `setProgress()` /
 * `simulateProgress()` step (from DevTools, e2e or unit tests), and finally a `Response` event
 * carrying the resolved value, then completes. `fail()` errors the observable. `initialBehavior`
 * and the replay of panel edits work as for `provideMockObservable`.
 */
export function provideMockHttpEvents<T>(
  token: InjectionToken<(...args: unknown[]) => Observable<HttpEvent<T>>>,
  key: string,
  initialBehavior?: ProviderInitialBehavior<T>,
  meta?: MockResourceMeta,
  options?: MockProviderOptions,
): FactoryProvider {
  return createObservableProvider<T>(token, key, initialBehavior, meta, options, true);
}

function createObservableProvider<T>(
  token: InjectionToken<unknown>,
  key: string,
  initialBehavior: ProviderInitialBehavior<T> | undefined,
  meta: MockResourceMeta | undefined,
  options: MockProviderOptions | undefined,
  asEvents: boolean,
): FactoryProvider {
  return {
    provide: token,
    useFactory: () => {
      const bus = inject(MockResourceBus);
      const discriminator = options?.keyDiscriminator;
      // Panel-set responses, per effective key. Lives in the factory (not per call) because
      // every call of the token function creates a fresh ref.
      const overrides = new Map<string, Outcome<T>>();

      return (...args: unknown[]): Observable<unknown> => {
        const effectiveKey = discriminator ? `${key}:${discriminator()}` : key;
        const ref = createMockResourceRef<T>();
        bus.register(effectiveKey, ref, meta);
        const internal = ref as MockResourceRefInternal<T>;

        const subscribers = new Set<Subscriber<unknown>>();
        const deliver = (outcome: Outcome<T>): void => {
          for (const sub of [...subscribers]) {
            subscribers.delete(sub);
            if ('error' in outcome) {
              sub.error(outcome.error);
            } else {
              sub.next(asEvents ? new HttpResponse<T>({ body: outcome.value, status: 200 }) : outcome.value);
              sub.complete();
            }
          }
        };

        // A settle with a subscriber waiting answers that request. With none waiting it can
        // only be a panel edit (the mock's own initial behavior / replay always runs while a
        // subscriber is registered), so remember it for the next request.
        internal._onSettle((outcome) => {
          if (subscribers.size === 0) overrides.set(effectiveKey, outcome);
          deliver(outcome);
        });

        if (asEvents) {
          internal._onProgress((p) => {
            const event = {
              type: p.type === 'upload' ? HttpEventType.UploadProgress : HttpEventType.DownloadProgress,
              loaded: p.loaded,
              total: p.total,
            };
            for (const sub of subscribers) sub.next(event);
          });
        }

        // Applies `behavior` to the ref. Returns a canceller for a pending delay.
        const apply = (behavior: ProviderInitialBehavior<T> | Outcome<T>): (() => void) | undefined => {
          if ('loading' in behavior) {
            ref.setLoading();
            return undefined;
          }
          const settle = (): void =>
            'error' in behavior ? ref.fail(behavior.error) : ref.resolve(behavior.value as T);
          const delay = 'delay' in behavior ? behavior.delay : undefined;
          if (!delay) {
            settle();
            return undefined;
          }
          ref.setLoading();
          const timer = setTimeout(settle, delay);
          return () => clearTimeout(timer);
        };

        return new Observable<unknown>((subscriber) => {
          subscribers.add(subscriber);
          if (asEvents) subscriber.next({ type: HttpEventType.Sent });
          // Notify first: the bus listener records the request and, in catch mode, holds it.
          internal._notifyRequest(args);

          let cancel: (() => void) | undefined;
          if (!bus.isCatchMode(effectiveKey)) {
            const override = overrides.get(effectiveKey);
            if (override) cancel = apply(override);
            else if (initialBehavior) cancel = apply(initialBehavior);
          }
          return () => {
            subscribers.delete(subscriber);
            cancel?.();
          };
        });
      };
    },
  };
}
