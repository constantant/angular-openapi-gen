import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetMandatesMandateParams =
  paths['/v1/mandates/{mandate}']['get']['parameters']['query'];

export type GetMandatesMandateResponse =
  paths['/v1/mandates/{mandate}']['get']['responses']['200']['content']['application/json'];

export const GET_MANDATES_MANDATE = new InjectionToken<
  (
    mandate: string,
    params?:
      | GetMandatesMandateParams
      | (() => GetMandatesMandateParams | undefined),
  ) => ReturnType<typeof httpResource<GetMandatesMandateResponse>>
>('GET_MANDATES_MANDATE');

export function provideGetMandatesMandate(): FactoryProvider {
  return {
    provide: GET_MANDATES_MANDATE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        mandate: string,
        params?:
          | GetMandatesMandateParams
          | (() => GetMandatesMandateParams | undefined),
      ) =>
        httpResource<GetMandatesMandateResponse>(() => ({
          url: `${base}/v1/mandates/${mandate}`,
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
