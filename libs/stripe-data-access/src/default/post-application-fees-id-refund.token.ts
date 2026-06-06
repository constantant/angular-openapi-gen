import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostApplicationFeesIdRefundBody = NonNullable<
  paths['/v1/application_fees/{id}/refund']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostApplicationFeesIdRefundResponse =
  paths['/v1/application_fees/{id}/refund']['post']['responses']['200']['content']['application/json'];

export const POST_APPLICATION_FEES_ID_REFUND = new InjectionToken<
  (
    id: string,
    body:
      | PostApplicationFeesIdRefundBody
      | Signal<PostApplicationFeesIdRefundBody>,
  ) => ReturnType<typeof httpResource<PostApplicationFeesIdRefundResponse>>
>('POST_APPLICATION_FEES_ID_REFUND', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostApplicationFeesIdRefundBody
        | Signal<PostApplicationFeesIdRefundBody>,
    ) =>
      httpResource<PostApplicationFeesIdRefundResponse>(() => ({
        url: `${base}/v1/application_fees/${id}/refund`,
        method: 'POST',
        body,
      }));
  },
});
