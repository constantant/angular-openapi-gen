import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetChargesChargeDisputeParams =
  paths['/v1/charges/{charge}/dispute']['get']['parameters']['query'];

type GetChargesChargeDisputeResponse =
  paths['/v1/charges/{charge}/dispute']['get']['responses']['200']['content']['application/json'];

export const GET_CHARGES_CHARGE_DISPUTE = new InjectionToken<
  (
    charge: string,
    params?: GetChargesChargeDisputeParams,
  ) => ReturnType<typeof httpResource<GetChargesChargeDisputeResponse>>
>('GET_CHARGES_CHARGE_DISPUTE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (charge: string, params?: GetChargesChargeDisputeParams) =>
      httpResource<GetChargesChargeDisputeResponse>(() => ({
        url: `${base}/v1/charges/${charge}/dispute`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
