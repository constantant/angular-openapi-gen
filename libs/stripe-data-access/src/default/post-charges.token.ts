import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostChargesBody = NonNullable<
  paths['/v1/charges']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostChargesResponse =
  paths['/v1/charges']['post']['responses']['200']['content']['application/json'];

export const POST_CHARGES = new InjectionToken<
  (
    body: PostChargesBody | Signal<PostChargesBody>,
  ) => ReturnType<typeof httpResource<PostChargesResponse>>
>('POST_CHARGES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostChargesBody | Signal<PostChargesBody>) =>
      httpResource<PostChargesResponse>(() => ({
        url: `${base}/v1/charges`,
        method: 'POST',
        body,
      }));
  },
});
