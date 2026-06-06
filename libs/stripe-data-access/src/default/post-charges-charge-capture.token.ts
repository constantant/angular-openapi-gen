import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostChargesChargeCaptureBody = NonNullable<
  paths['/v1/charges/{charge}/capture']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostChargesChargeCaptureResponse =
  paths['/v1/charges/{charge}/capture']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES_CHARGE_CAPTURE = new InjectionToken<
  (
    charge: string,
    body: PostChargesChargeCaptureBody | Signal<PostChargesChargeCaptureBody>,
  ) => ReturnType<typeof httpResource<PostChargesChargeCaptureResponse>>
>('POST_CHARGES_CHARGE_CAPTURE');

export function providePostChargesChargeCapture(): FactoryProvider {
  return {
    provide: POST_CHARGES_CHARGE_CAPTURE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        charge: string,
        body:
          | PostChargesChargeCaptureBody
          | Signal<PostChargesChargeCaptureBody>,
      ) =>
        httpResource<PostChargesChargeCaptureResponse>(() => ({
          url: `${base}/v1/charges/${charge}/capture`,
          method: 'POST',
          body,
        }));
    },
  };
}
