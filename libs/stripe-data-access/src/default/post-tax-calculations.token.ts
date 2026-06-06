import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTaxCalculationsBody = NonNullable<
  paths['/v1/tax/calculations']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTaxCalculationsResponse =
  paths['/v1/tax/calculations']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_CALCULATIONS = new InjectionToken<
  (
    body: PostTaxCalculationsBody | Signal<PostTaxCalculationsBody>,
  ) => ReturnType<typeof httpResource<PostTaxCalculationsResponse>>
>('POST_TAX_CALCULATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostTaxCalculationsBody | Signal<PostTaxCalculationsBody>) =>
      httpResource<PostTaxCalculationsResponse>(() => ({
        url: `${base}/v1/tax/calculations`,
        method: 'POST',
        body,
      }));
  },
});
