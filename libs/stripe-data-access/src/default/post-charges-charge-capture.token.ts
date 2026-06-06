import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostChargesChargeCaptureBody = NonNullable<
  paths['/v1/charges/{charge}/capture']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostChargesChargeCaptureResponse =
  paths['/v1/charges/{charge}/capture']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES_CHARGE_CAPTURE = new InjectionToken<
  (
    charge: string,
    body: PostChargesChargeCaptureBody | Signal<PostChargesChargeCaptureBody>,
  ) => ReturnType<typeof httpResource<PostChargesChargeCaptureResponse>>
>('POST_CHARGES_CHARGE_CAPTURE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      charge: string,
      body: PostChargesChargeCaptureBody | Signal<PostChargesChargeCaptureBody>,
    ) =>
      httpResource<PostChargesChargeCaptureResponse>(() => ({
        url: `${base}/v1/charges/${charge}/capture`,
        method: 'POST',
        body,
      }));
  },
});
