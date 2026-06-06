import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetChargesChargeRefundsParams =
  paths['/v1/charges/{charge}/refunds']['get']['parameters']['query'];

export type GetChargesChargeRefundsResponse =
  paths['/v1/charges/{charge}/refunds']['get']['responses']['200']['content']['application/json'];

export const GET_CHARGES_CHARGE_REFUNDS = new InjectionToken<
  (
    charge: string,
    params?:
      | GetChargesChargeRefundsParams
      | (() => GetChargesChargeRefundsParams | undefined),
  ) => ReturnType<typeof httpResource<GetChargesChargeRefundsResponse>>
>('GET_CHARGES_CHARGE_REFUNDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      charge: string,
      params?:
        | GetChargesChargeRefundsParams
        | (() => GetChargesChargeRefundsParams | undefined),
    ) =>
      httpResource<GetChargesChargeRefundsResponse>(() => ({
        url: `${base}/v1/charges/${charge}/refunds`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
