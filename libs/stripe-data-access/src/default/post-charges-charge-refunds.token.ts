import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostChargesChargeRefundsBody = NonNullable<
  paths['/v1/charges/{charge}/refunds']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostChargesChargeRefundsResponse =
  paths['/v1/charges/{charge}/refunds']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES_CHARGE_REFUNDS = new InjectionToken<
  (
    charge: string,
    body: PostChargesChargeRefundsBody | Signal<PostChargesChargeRefundsBody>,
  ) => ReturnType<typeof httpResource<PostChargesChargeRefundsResponse>>
>('POST_CHARGES_CHARGE_REFUNDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      charge: string,
      body: PostChargesChargeRefundsBody | Signal<PostChargesChargeRefundsBody>,
    ) =>
      httpResource<PostChargesChargeRefundsResponse>(() => ({
        url: `${base}/v1/charges/${charge}/refunds`,
        method: 'POST',
        body,
      }));
  },
});
