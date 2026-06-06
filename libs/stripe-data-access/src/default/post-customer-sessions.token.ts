import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCustomerSessionsBody = NonNullable<
  paths['/v1/customer_sessions']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCustomerSessionsResponse =
  paths['/v1/customer_sessions']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMER_SESSIONS = new InjectionToken<
  (
    body: PostCustomerSessionsBody | Signal<PostCustomerSessionsBody>,
  ) => ReturnType<typeof httpResource<PostCustomerSessionsResponse>>
>('POST_CUSTOMER_SESSIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostCustomerSessionsBody | Signal<PostCustomerSessionsBody>,
    ) =>
      httpResource<PostCustomerSessionsResponse>(() => ({
        url: `${base}/v1/customer_sessions`,
        method: 'POST',
        body,
      }));
  },
});
