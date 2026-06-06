import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostChargesChargeRefundBody = NonNullable<
  paths['/v1/charges/{charge}/refund']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostChargesChargeRefundResponse =
  paths['/v1/charges/{charge}/refund']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES_CHARGE_REFUND = new InjectionToken<
  (
    charge: string,
    body: PostChargesChargeRefundBody | Signal<PostChargesChargeRefundBody>,
  ) => ReturnType<typeof httpResource<PostChargesChargeRefundResponse>>
>('POST_CHARGES_CHARGE_REFUND');

export function providePostChargesChargeRefund(): FactoryProvider {
  return {
    provide: POST_CHARGES_CHARGE_REFUND,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        charge: string,
        body: PostChargesChargeRefundBody | Signal<PostChargesChargeRefundBody>,
      ) =>
        httpResource<PostChargesChargeRefundResponse>(() => ({
          url: `${base}/v1/charges/${charge}/refund`,
          method: 'POST',
          body,
        }));
    },
  };
}
