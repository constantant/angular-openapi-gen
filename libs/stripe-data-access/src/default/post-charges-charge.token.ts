import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostChargesChargeBody = NonNullable<
  paths['/v1/charges/{charge}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostChargesChargeResponse =
  paths['/v1/charges/{charge}']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES_CHARGE = new InjectionToken<
  (
    charge: string,
    body: PostChargesChargeBody | Signal<PostChargesChargeBody>,
  ) => ReturnType<typeof httpResource<PostChargesChargeResponse>>
>('POST_CHARGES_CHARGE');

export function providePostChargesCharge(): FactoryProvider {
  return {
    provide: POST_CHARGES_CHARGE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        charge: string,
        body: PostChargesChargeBody | Signal<PostChargesChargeBody>,
      ) =>
        httpResource<PostChargesChargeResponse>(() => ({
          url: `${base}/v1/charges/${charge}`,
          method: 'POST',
          body,
        }));
    },
  };
}
