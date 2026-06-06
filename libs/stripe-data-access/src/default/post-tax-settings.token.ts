import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTaxSettingsBody = NonNullable<
  paths['/v1/tax/settings']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTaxSettingsResponse =
  paths['/v1/tax/settings']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_SETTINGS = new InjectionToken<
  (
    body: PostTaxSettingsBody | Signal<PostTaxSettingsBody>,
  ) => ReturnType<typeof httpResource<PostTaxSettingsResponse>>
>('POST_TAX_SETTINGS');

export function providePostTaxSettings(): FactoryProvider {
  return {
    provide: POST_TAX_SETTINGS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostTaxSettingsBody | Signal<PostTaxSettingsBody>) =>
        httpResource<PostTaxSettingsResponse>(() => ({
          url: `${base}/v1/tax/settings`,
          method: 'POST',
          body,
        }));
    },
  };
}
