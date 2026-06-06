import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTerminalReadersParams =
  paths['/v1/terminal/readers']['get']['parameters']['query'];

export type GetTerminalReadersResponse =
  paths['/v1/terminal/readers']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_READERS = new InjectionToken<
  (
    params?:
      | GetTerminalReadersParams
      | (() => GetTerminalReadersParams | undefined),
  ) => ReturnType<typeof httpResource<GetTerminalReadersResponse>>
>('GET_TERMINAL_READERS');

export function provideGetTerminalReaders(): FactoryProvider {
  return {
    provide: GET_TERMINAL_READERS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetTerminalReadersParams
          | (() => GetTerminalReadersParams | undefined),
      ) =>
        httpResource<GetTerminalReadersResponse>(() => ({
          url: `${base}/v1/terminal/readers`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
