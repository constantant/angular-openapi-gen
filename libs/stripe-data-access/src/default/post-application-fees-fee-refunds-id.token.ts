import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostApplicationFeesFeeRefundsIdBody = NonNullable<
  paths['/v1/application_fees/{fee}/refunds/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostApplicationFeesFeeRefundsIdResponse =
  paths['/v1/application_fees/{fee}/refunds/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_APPLICATION_FEES_FEE_REFUNDS_ID = new InjectionToken<
  (
    fee: string,
    id: string,
    body:
      | PostApplicationFeesFeeRefundsIdBody
      | Signal<PostApplicationFeesFeeRefundsIdBody>,
  ) => ReturnType<typeof httpResource<PostApplicationFeesFeeRefundsIdResponse>>
>('POST_APPLICATION_FEES_FEE_REFUNDS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      fee: string,
      id: string,
      body:
        | PostApplicationFeesFeeRefundsIdBody
        | Signal<PostApplicationFeesFeeRefundsIdBody>,
    ) =>
      httpResource<PostApplicationFeesFeeRefundsIdResponse>(() => ({
        url: `${base}/v1/application_fees/${fee}/refunds/${id}`,
        method: 'POST',
        body,
      }));
  },
});
