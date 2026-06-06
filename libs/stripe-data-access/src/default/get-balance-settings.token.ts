import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBalanceSettingsParams =
  paths['/v1/balance_settings']['get']['parameters']['query'];

export type GetBalanceSettingsResponse =
  paths['/v1/balance_settings']['get']['responses']['200']['content']['application/json'];

export const GET_BALANCE_SETTINGS = new InjectionToken<
  (
    params?:
      | GetBalanceSettingsParams
      | (() => GetBalanceSettingsParams | undefined),
  ) => ReturnType<typeof httpResource<GetBalanceSettingsResponse>>
>('GET_BALANCE_SETTINGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetBalanceSettingsParams
        | (() => GetBalanceSettingsParams | undefined),
    ) =>
      httpResource<GetBalanceSettingsResponse>(() => ({
        url: `${base}/v1/balance_settings`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
