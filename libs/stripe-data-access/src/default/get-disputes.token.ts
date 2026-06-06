import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetDisputesParams = paths['/v1/disputes']['get']['parameters']['query'];

type GetDisputesResponse =
  paths['/v1/disputes']['get']['responses']['200']['content']['application/json'];

export const GET_DISPUTES = new InjectionToken<
  (
    params?: GetDisputesParams,
  ) => ReturnType<typeof httpResource<GetDisputesResponse>>
>('GET_DISPUTES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetDisputesParams) =>
      httpResource<GetDisputesResponse>(() => ({
        url: `${base}/v1/disputes`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
