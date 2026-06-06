import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostRadarPaymentEvaluationsBody = NonNullable<
  paths['/v1/radar/payment_evaluations']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostRadarPaymentEvaluationsResponse =
  paths['/v1/radar/payment_evaluations']['post']['responses']['200']['content']['application/json'];

export const POST_RADAR_PAYMENT_EVALUATIONS = new InjectionToken<
  (
    body:
      | PostRadarPaymentEvaluationsBody
      | Signal<PostRadarPaymentEvaluationsBody>,
  ) => ReturnType<typeof httpResource<PostRadarPaymentEvaluationsResponse>>
>('POST_RADAR_PAYMENT_EVALUATIONS');

export function providePostRadarPaymentEvaluations(): FactoryProvider {
  return {
    provide: POST_RADAR_PAYMENT_EVALUATIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostRadarPaymentEvaluationsBody
          | Signal<PostRadarPaymentEvaluationsBody>,
      ) =>
        httpResource<PostRadarPaymentEvaluationsResponse>(() => ({
          url: `${base}/v1/radar/payment_evaluations`,
          method: 'POST',
          body,
        }));
    },
  };
}
