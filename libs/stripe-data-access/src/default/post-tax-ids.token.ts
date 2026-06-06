import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTaxIdsBody = NonNullable<
  paths['/v1/tax_ids']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTaxIdsResponse =
  paths['/v1/tax_ids']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_IDS = new InjectionToken<
  (
    body: PostTaxIdsBody | Signal<PostTaxIdsBody>,
  ) => ReturnType<typeof httpResource<PostTaxIdsResponse>>
>('POST_TAX_IDS');

export function providePostTaxIds(): FactoryProvider {
  return {
    provide: POST_TAX_IDS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostTaxIdsBody | Signal<PostTaxIdsBody>) =>
        httpResource<PostTaxIdsResponse>(() => ({
          url: `${base}/v1/tax_ids`,
          method: 'POST',
          body,
        }));
    },
  };
}
