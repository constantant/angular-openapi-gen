import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetApplicationFeesIdRefundsParams =
  paths['/v1/application_fees/{id}/refunds']['get']['parameters']['query'];

export type GetApplicationFeesIdRefundsResponse =
  paths['/v1/application_fees/{id}/refunds']['get']['responses']['200']['content']['application/json'];

export const GET_APPLICATION_FEES_ID_REFUNDS = new InjectionToken<
  (
    id: string,
    params?:
      | GetApplicationFeesIdRefundsParams
      | (() => GetApplicationFeesIdRefundsParams | undefined),
  ) => ReturnType<typeof httpResource<GetApplicationFeesIdRefundsResponse>>
>('GET_APPLICATION_FEES_ID_REFUNDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      params?:
        | GetApplicationFeesIdRefundsParams
        | (() => GetApplicationFeesIdRefundsParams | undefined),
    ) =>
      httpResource<GetApplicationFeesIdRefundsResponse>(() => ({
        url: `${base}/v1/application_fees/${id}/refunds`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
