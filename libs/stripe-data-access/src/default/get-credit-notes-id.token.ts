import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCreditNotesIdParams =
  paths['/v1/credit_notes/{id}']['get']['parameters']['query'];

type GetCreditNotesIdResponse =
  paths['/v1/credit_notes/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_CREDIT_NOTES_ID = new InjectionToken<
  (
    id: string,
    params?: GetCreditNotesIdParams,
  ) => ReturnType<typeof httpResource<GetCreditNotesIdResponse>>
>('GET_CREDIT_NOTES_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetCreditNotesIdParams) =>
      httpResource<GetCreditNotesIdResponse>(() => ({
        url: `${base}/v1/credit_notes/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
