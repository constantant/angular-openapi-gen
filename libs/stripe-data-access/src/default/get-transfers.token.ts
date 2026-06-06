import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTransfersParams =
  paths['/v1/transfers']['get']['parameters']['query'];

export type GetTransfersResponse =
  paths['/v1/transfers']['get']['responses']['200']['content']['application/json'];

export const GET_TRANSFERS = new InjectionToken<
  (
    params?: GetTransfersParams | (() => GetTransfersParams | undefined),
  ) => ReturnType<typeof httpResource<GetTransfersResponse>>
>('GET_TRANSFERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?: GetTransfersParams | (() => GetTransfersParams | undefined),
    ) =>
      httpResource<GetTransfersResponse>(() => ({
        url: `${base}/v1/transfers`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
