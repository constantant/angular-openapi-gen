import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetChargesChargeParams =
  paths['/v1/charges/{charge}']['get']['parameters']['query'];

type GetChargesChargeResponse =
  paths['/v1/charges/{charge}']['get']['responses']['200']['content']['application/json'];

export const GET_CHARGES_CHARGE = new InjectionToken<
  (
    charge: string,
    params?: GetChargesChargeParams,
  ) => ReturnType<typeof httpResource<GetChargesChargeResponse>>
>('GET_CHARGES_CHARGE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (charge: string, params?: GetChargesChargeParams) =>
      httpResource<GetChargesChargeResponse>(() => ({
        url: `${base}/v1/charges/${charge}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
