import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTreasuryOutboundPaymentsBody = NonNullable<
  paths['/v1/treasury/outbound_payments']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTreasuryOutboundPaymentsResponse =
  paths['/v1/treasury/outbound_payments']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_OUTBOUND_PAYMENTS = new InjectionToken<
  (
    body:
      | PostTreasuryOutboundPaymentsBody
      | Signal<PostTreasuryOutboundPaymentsBody>,
  ) => ReturnType<typeof httpResource<PostTreasuryOutboundPaymentsResponse>>
>('POST_TREASURY_OUTBOUND_PAYMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTreasuryOutboundPaymentsBody
        | Signal<PostTreasuryOutboundPaymentsBody>,
    ) =>
      httpResource<PostTreasuryOutboundPaymentsResponse>(() => ({
        url: `${base}/v1/treasury/outbound_payments`,
        method: 'POST',
        body,
      }));
  },
});
