import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTerminalReadersReaderParams =
  paths['/v1/terminal/readers/{reader}']['get']['parameters']['query'];

export type GetTerminalReadersReaderResponse =
  paths['/v1/terminal/readers/{reader}']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_READERS_READER = new InjectionToken<
  (
    reader: string,
    params?:
      | GetTerminalReadersReaderParams
      | (() => GetTerminalReadersReaderParams | undefined),
  ) => ReturnType<typeof httpResource<GetTerminalReadersReaderResponse>>
>('GET_TERMINAL_READERS_READER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      reader: string,
      params?:
        | GetTerminalReadersReaderParams
        | (() => GetTerminalReadersReaderParams | undefined),
    ) =>
      httpResource<GetTerminalReadersReaderResponse>(() => ({
        url: `${base}/v1/terminal/readers/${reader}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
