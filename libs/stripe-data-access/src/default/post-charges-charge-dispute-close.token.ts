import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostChargesChargeDisputeCloseBody = NonNullable<
  paths['/v1/charges/{charge}/dispute/close']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostChargesChargeDisputeCloseResponse =
  paths['/v1/charges/{charge}/dispute/close']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES_CHARGE_DISPUTE_CLOSE = new InjectionToken<
  (
    charge: string,
    body:
      | PostChargesChargeDisputeCloseBody
      | Signal<PostChargesChargeDisputeCloseBody>,
  ) => ReturnType<typeof httpResource<PostChargesChargeDisputeCloseResponse>>
>('POST_CHARGES_CHARGE_DISPUTE_CLOSE');

export function providePostChargesChargeDisputeClose(): FactoryProvider {
  return {
    provide: POST_CHARGES_CHARGE_DISPUTE_CLOSE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        charge: string,
        body:
          | PostChargesChargeDisputeCloseBody
          | Signal<PostChargesChargeDisputeCloseBody>,
      ) =>
        httpResource<PostChargesChargeDisputeCloseResponse>(() => ({
          url: `${base}/v1/charges/${charge}/dispute/close`,
          method: 'POST',
          body,
        }));
    },
  };
}
