import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPayoutsBody = NonNullable<
  paths['/v1/payouts']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPayoutsResponse =
  paths['/v1/payouts']['post']['responses']['200']['content']['application/json'];

export const POST_PAYOUTS = new InjectionToken<
  (
    body: PostPayoutsBody | Signal<PostPayoutsBody>,
  ) => ReturnType<typeof httpResource<PostPayoutsResponse>>
>('POST_PAYOUTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostPayoutsBody | Signal<PostPayoutsBody>) =>
      httpResource<PostPayoutsResponse>(() => ({
        url: `${base}/v1/payouts`,
        method: 'POST',
        body,
      }));
  },
});
