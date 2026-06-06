import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTaxRegistrationsParams =
  paths['/v1/tax/registrations']['get']['parameters']['query'];

type GetTaxRegistrationsResponse =
  paths['/v1/tax/registrations']['get']['responses']['200']['content']['application/json'];

export const GET_TAX_REGISTRATIONS = new InjectionToken<
  (
    params?: GetTaxRegistrationsParams,
  ) => ReturnType<typeof httpResource<GetTaxRegistrationsResponse>>
>('GET_TAX_REGISTRATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTaxRegistrationsParams) =>
      httpResource<GetTaxRegistrationsResponse>(() => ({
        url: `${base}/v1/tax/registrations`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
