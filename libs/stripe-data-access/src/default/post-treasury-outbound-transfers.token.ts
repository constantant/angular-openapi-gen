import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTreasuryOutboundTransfersBody = NonNullable<
  paths['/v1/treasury/outbound_transfers']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTreasuryOutboundTransfersResponse =
  paths['/v1/treasury/outbound_transfers']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_OUTBOUND_TRANSFERS = new InjectionToken<
  (
    body:
      | PostTreasuryOutboundTransfersBody
      | Signal<PostTreasuryOutboundTransfersBody>,
  ) => ReturnType<typeof httpResource<PostTreasuryOutboundTransfersResponse>>
>('POST_TREASURY_OUTBOUND_TRANSFERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTreasuryOutboundTransfersBody
        | Signal<PostTreasuryOutboundTransfersBody>,
    ) =>
      httpResource<PostTreasuryOutboundTransfersResponse>(() => ({
        url: `${base}/v1/treasury/outbound_transfers`,
        method: 'POST',
        body,
      }));
  },
});
