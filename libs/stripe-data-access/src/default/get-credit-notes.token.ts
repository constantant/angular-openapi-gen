import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCreditNotesParams =
  paths['/v1/credit_notes']['get']['parameters']['query'];

type GetCreditNotesResponse =
  paths['/v1/credit_notes']['get']['responses']['200']['content']['application/json'];

export const GET_CREDIT_NOTES = new InjectionToken<
  (
    params?: GetCreditNotesParams,
  ) => ReturnType<typeof httpResource<GetCreditNotesResponse>>
>('GET_CREDIT_NOTES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetCreditNotesParams) =>
      httpResource<GetCreditNotesResponse>(() => ({
        url: `${base}/v1/credit_notes`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
