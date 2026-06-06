import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCustomersBody = NonNullable<
  paths['/v1/customers']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCustomersResponse =
  paths['/v1/customers']['post']['responses']['200']['content']['application/json'];

export const POST_CUSTOMERS = new InjectionToken<
  (
    body: PostCustomersBody | Signal<PostCustomersBody>,
  ) => ReturnType<typeof httpResource<PostCustomersResponse>>
>('POST_CUSTOMERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostCustomersBody | Signal<PostCustomersBody>) =>
      httpResource<PostCustomersResponse>(() => ({
        url: `${base}/v1/customers`,
        method: 'POST',
        body,
      }));
  },
});
