import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostRefundsBody = NonNullable<
  paths['/v1/refunds']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostRefundsResponse =
  paths['/v1/refunds']['post']['responses']['200']['content']['application/json'];

export const POST_REFUNDS = new InjectionToken<
  (
    body: PostRefundsBody | Signal<PostRefundsBody>,
  ) => ReturnType<typeof httpResource<PostRefundsResponse>>
>('POST_REFUNDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostRefundsBody | Signal<PostRefundsBody>) =>
      httpResource<PostRefundsResponse>(() => ({
        url: `${base}/v1/refunds`,
        method: 'POST',
        body,
      }));
  },
});
