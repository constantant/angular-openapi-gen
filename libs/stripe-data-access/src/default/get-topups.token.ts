import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTopupsParams = paths['/v1/topups']['get']['parameters']['query'];

export type GetTopupsResponse =
  paths['/v1/topups']['get']['responses']['200']['content']['application/json'];

export const GET_TOPUPS = new InjectionToken<
  (
    params?: GetTopupsParams | (() => GetTopupsParams | undefined),
  ) => ReturnType<typeof httpResource<GetTopupsResponse>>
>('GET_TOPUPS');

export function provideGetTopups(): FactoryProvider {
  return {
    provide: GET_TOPUPS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (params?: GetTopupsParams | (() => GetTopupsParams | undefined)) =>
        httpResource<GetTopupsResponse>(() => ({
          url: `${base}/v1/topups`,
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
