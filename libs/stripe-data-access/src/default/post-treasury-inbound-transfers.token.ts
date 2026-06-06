import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTreasuryInboundTransfersBody = NonNullable<
  paths['/v1/treasury/inbound_transfers']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTreasuryInboundTransfersResponse =
  paths['/v1/treasury/inbound_transfers']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_INBOUND_TRANSFERS = new InjectionToken<
  (
    body:
      | PostTreasuryInboundTransfersBody
      | Signal<PostTreasuryInboundTransfersBody>,
  ) => ReturnType<typeof httpResource<PostTreasuryInboundTransfersResponse>>
>('POST_TREASURY_INBOUND_TRANSFERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTreasuryInboundTransfersBody
        | Signal<PostTreasuryInboundTransfersBody>,
    ) =>
      httpResource<PostTreasuryInboundTransfersResponse>(() => ({
        url: `${base}/v1/treasury/inbound_transfers`,
        method: 'POST',
        body,
      }));
  },
});
