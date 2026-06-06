import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxSettingsParams =
  paths['/v1/tax/settings']['get']['parameters']['query'];

type GetTaxSettingsResponse =
  paths['/v1/tax/settings']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_SETTINGS = new InjectionToken<
  (
    params?: GetTaxSettingsParams,
  ) => ReturnType<typeof httpResource<GetTaxSettingsResponse>>
>('GET_TAX_SETTINGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTaxSettingsParams) =>
      httpResource<GetTaxSettingsResponse>(() => ({
        url: `${base}/v1/tax/settings`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
