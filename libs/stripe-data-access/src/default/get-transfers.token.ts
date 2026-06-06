import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTransfersParams = paths['/v1/transfers']['get']['parameters']['query'];

type GetTransfersResponse =
  paths['/v1/transfers']['get']['responses']['200']['content']['application/json'];

export const GET_TRANSFERS = new InjectionToken<
  (
    params?: GetTransfersParams,
  ) => ReturnType<typeof httpResource<GetTransfersResponse>>
>('GET_TRANSFERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTransfersParams) =>
      httpResource<GetTransfersResponse>(() => ({
        url: `${base}/v1/transfers`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
