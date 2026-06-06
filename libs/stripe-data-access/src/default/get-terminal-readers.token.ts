import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTerminalReadersParams =
  paths['/v1/terminal/readers']['get']['parameters']['query'];

type GetTerminalReadersResponse =
  paths['/v1/terminal/readers']['get']['responses']['200']['content']['application/json'];

export const GET_TERMINAL_READERS = new InjectionToken<
  (
    params?: GetTerminalReadersParams,
  ) => ReturnType<typeof httpResource<GetTerminalReadersResponse>>
>('GET_TERMINAL_READERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTerminalReadersParams) =>
      httpResource<GetTerminalReadersResponse>(() => ({
        url: `${base}/v1/terminal/readers`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
