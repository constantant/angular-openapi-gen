import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTaxSettingsBody = NonNullable<
  paths['/v1/tax/settings']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTaxSettingsResponse =
  paths['/v1/tax/settings']['post']['responses']['200']['content']['application/json'];

export const POST_TAX_SETTINGS = new InjectionToken<
  (
    body: PostTaxSettingsBody | Signal<PostTaxSettingsBody>,
  ) => ReturnType<typeof httpResource<PostTaxSettingsResponse>>
>('POST_TAX_SETTINGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostTaxSettingsBody | Signal<PostTaxSettingsBody>) =>
      httpResource<PostTaxSettingsResponse>(() => ({
        url: `${base}/v1/tax/settings`,
        method: 'POST',
        body,
      }));
  },
});
