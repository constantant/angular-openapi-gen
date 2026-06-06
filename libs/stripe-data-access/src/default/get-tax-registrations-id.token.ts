import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxRegistrationsIdParams =
  paths['/v1/tax/registrations/{id}']['get']['parameters']['query'];

type GetTaxRegistrationsIdResponse =
  paths['/v1/tax/registrations/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_REGISTRATIONS_ID = new InjectionToken<
  (
    id: string,
    params?: GetTaxRegistrationsIdParams,
  ) => ReturnType<typeof httpResource<GetTaxRegistrationsIdResponse>>
>('GET_TAX_REGISTRATIONS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetTaxRegistrationsIdParams) =>
      httpResource<GetTaxRegistrationsIdResponse>(() => ({
        url: `${base}/v1/tax/registrations/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
