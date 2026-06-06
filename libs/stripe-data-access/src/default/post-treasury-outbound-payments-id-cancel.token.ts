import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTreasuryOutboundPaymentsIdCancelBody = NonNullable<
  paths['/v1/treasury/outbound_payments/{id}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTreasuryOutboundPaymentsIdCancelResponse =
  paths['/v1/treasury/outbound_payments/{id}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_OUTBOUND_PAYMENTS_ID_CANCEL = new InjectionToken<
  (
    id: string,
    body:
      | PostTreasuryOutboundPaymentsIdCancelBody
      | Signal<PostTreasuryOutboundPaymentsIdCancelBody>,
  ) => ReturnType<
    typeof httpResource<PostTreasuryOutboundPaymentsIdCancelResponse>
  >
>('POST_TREASURY_OUTBOUND_PAYMENTS_ID_CANCEL');

export function providePostTreasuryOutboundPaymentsIdCancel(): FactoryProvider {
  return {
    provide: POST_TREASURY_OUTBOUND_PAYMENTS_ID_CANCEL,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostTreasuryOutboundPaymentsIdCancelBody
          | Signal<PostTreasuryOutboundPaymentsIdCancelBody>,
      ) =>
        httpResource<PostTreasuryOutboundPaymentsIdCancelResponse>(() => ({
          url: `${base}/v1/treasury/outbound_payments/${id}/cancel`,
          method: 'POST',
          body,
        }));
    },
  };
}
