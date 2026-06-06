import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxSettingsParams =
  paths['/v1/tax/settings']['get']['parameters']['query'];

export type GetTaxSettingsResponse =
  paths['/v1/tax/settings']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_SETTINGS = new InjectionToken<
  (
    params?: GetTaxSettingsParams | (() => GetTaxSettingsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxSettingsResponse>>
>('GET_TAX_SETTINGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?: GetTaxSettingsParams | (() => GetTaxSettingsParams | undefined),
    ) =>
      httpResource<GetTaxSettingsResponse>(() => ({
        url: `${base}/v1/tax/settings`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
