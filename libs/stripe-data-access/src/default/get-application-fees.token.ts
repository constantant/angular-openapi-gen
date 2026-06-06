import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetApplicationFeesParams =
  paths['/v1/application_fees']['get']['parameters']['query'];

export type GetApplicationFeesResponse =
  paths['/v1/application_fees']['get']['responses']['200']['content']['application/json'];

export const GET_APPLICATION_FEES = new InjectionToken<
  (
    params?:
      | GetApplicationFeesParams
      | (() => GetApplicationFeesParams | undefined),
  ) => ReturnType<typeof httpResource<GetApplicationFeesResponse>>
>('GET_APPLICATION_FEES');

export function provideGetApplicationFees(): FactoryProvider {
  return {
    provide: GET_APPLICATION_FEES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetApplicationFeesParams
          | (() => GetApplicationFeesParams | undefined),
      ) =>
        httpResource<GetApplicationFeesResponse>(() => ({
          url: `${base}/v1/application_fees`,
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
