import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostApplicationFeesIdRefundsBody = NonNullable<
  paths['/v1/application_fees/{id}/refunds']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostApplicationFeesIdRefundsResponse =
  paths['/v1/application_fees/{id}/refunds']['post']['responses']['200']['content']['application/json'];

export const POST_APPLICATION_FEES_ID_REFUNDS = new InjectionToken<
  (
    id: string,
    body:
      | PostApplicationFeesIdRefundsBody
      | Signal<PostApplicationFeesIdRefundsBody>,
  ) => ReturnType<typeof httpResource<PostApplicationFeesIdRefundsResponse>>
>('POST_APPLICATION_FEES_ID_REFUNDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostApplicationFeesIdRefundsBody
        | Signal<PostApplicationFeesIdRefundsBody>,
    ) =>
      httpResource<PostApplicationFeesIdRefundsResponse>(() => ({
        url: `${base}/v1/application_fees/${id}/refunds`,
        method: 'POST',
        body,
      }));
  },
});
