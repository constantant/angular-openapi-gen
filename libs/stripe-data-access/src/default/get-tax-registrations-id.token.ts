import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTaxRegistrationsIdParams =
  paths['/v1/tax/registrations/{id}']['get']['parameters']['query'];

export type GetTaxRegistrationsIdResponse =
  paths['/v1/tax/registrations/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_REGISTRATIONS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetTaxRegistrationsIdParams
      | (() => GetTaxRegistrationsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetTaxRegistrationsIdResponse>>
>('GET_TAX_REGISTRATIONS_ID');

export function provideGetTaxRegistrationsId(): FactoryProvider {
  return {
    provide: GET_TAX_REGISTRATIONS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetTaxRegistrationsIdParams
          | (() => GetTaxRegistrationsIdParams | undefined),
      ) =>
        httpResource<GetTaxRegistrationsIdResponse>(() => ({
          url: `${base}/v1/tax/registrations/${id}`,
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
