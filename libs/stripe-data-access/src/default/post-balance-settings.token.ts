import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostBalanceSettingsBody = NonNullable<
  paths['/v1/balance_settings']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostBalanceSettingsResponse =
  paths['/v1/balance_settings']['post']['responses']['200']['content']['application/json'];

export const POST_BALANCE_SETTINGS = new InjectionToken<
  (
    body: PostBalanceSettingsBody | Signal<PostBalanceSettingsBody>,
  ) => ReturnType<typeof httpResource<PostBalanceSettingsResponse>>
>('POST_BALANCE_SETTINGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostBalanceSettingsBody | Signal<PostBalanceSettingsBody>) =>
      httpResource<PostBalanceSettingsResponse>(() => ({
        url: `${base}/v1/balance_settings`,
        method: 'POST',
        body,
      }));
  },
});
