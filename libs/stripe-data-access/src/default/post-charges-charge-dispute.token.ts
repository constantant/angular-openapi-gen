import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostChargesChargeDisputeBody = NonNullable<
  paths['/v1/charges/{charge}/dispute']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostChargesChargeDisputeResponse =
  paths['/v1/charges/{charge}/dispute']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES_CHARGE_DISPUTE = new InjectionToken<
  (
    charge: string,
    body: PostChargesChargeDisputeBody | Signal<PostChargesChargeDisputeBody>,
  ) => ReturnType<typeof httpResource<PostChargesChargeDisputeResponse>>
>('POST_CHARGES_CHARGE_DISPUTE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      charge: string,
      body: PostChargesChargeDisputeBody | Signal<PostChargesChargeDisputeBody>,
    ) =>
      httpResource<PostChargesChargeDisputeResponse>(() => ({
        url: `${base}/v1/charges/${charge}/dispute`,
        method: 'POST',
        body,
      }));
  },
});
