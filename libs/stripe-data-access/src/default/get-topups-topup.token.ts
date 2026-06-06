import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTopupsTopupParams =
  paths['/v1/topups/{topup}']['get']['parameters']['query'];

export type GetTopupsTopupResponse =
  paths['/v1/topups/{topup}']['get']['responses']['200']['content']['application/json'];

export const GET_TOPUPS_TOPUP = new InjectionToken<
  (
    topup: string,
    params?: GetTopupsTopupParams | (() => GetTopupsTopupParams | undefined),
  ) => ReturnType<typeof httpResource<GetTopupsTopupResponse>>
>('GET_TOPUPS_TOPUP');

export function provideGetTopupsTopup(): FactoryProvider {
  return {
    provide: GET_TOPUPS_TOPUP,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        topup: string,
        params?:
          | GetTopupsTopupParams
          | (() => GetTopupsTopupParams | undefined),
      ) =>
        httpResource<GetTopupsTopupResponse>(() => ({
          url: `${base}/v1/topups/${topup}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
