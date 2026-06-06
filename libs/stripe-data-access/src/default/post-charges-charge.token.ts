import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostChargesChargeBody = NonNullable<
  paths['/v1/charges/{charge}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostChargesChargeResponse =
  paths['/v1/charges/{charge}']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES_CHARGE = new InjectionToken<
  (
    charge: string,
    body: PostChargesChargeBody | Signal<PostChargesChargeBody>,
  ) => ReturnType<typeof httpResource<PostChargesChargeResponse>>
>('POST_CHARGES_CHARGE', {
  providedIn: 'root',
  factory: () => {
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
});
