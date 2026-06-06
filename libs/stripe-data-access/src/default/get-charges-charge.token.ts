import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetChargesChargeParams =
  paths['/v1/charges/{charge}']['get']['parameters']['query'];

export type GetChargesChargeResponse =
  paths['/v1/charges/{charge}']['get']['responses']['200']['content']['application/json'];

export const GET_CHARGES_CHARGE = new InjectionToken<
  (
    charge: string,
    params?:
      | GetChargesChargeParams
      | (() => GetChargesChargeParams | undefined),
  ) => ReturnType<typeof httpResource<GetChargesChargeResponse>>
>('GET_CHARGES_CHARGE');

export function provideGetChargesCharge(): FactoryProvider {
  return {
    provide: GET_CHARGES_CHARGE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        charge: string,
        params?:
          | GetChargesChargeParams
          | (() => GetChargesChargeParams | undefined),
      ) =>
        httpResource<GetChargesChargeResponse>(() => ({
          url: `${base}/v1/charges/${charge}`,
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
