import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCreditNotesPreviewParams =
  paths['/v1/credit_notes/preview']['get']['parameters']['query'];

export type GetCreditNotesPreviewResponse =
  paths['/v1/credit_notes/preview']['get']['responses']['200']['content']['application/json'];

export const GET_CREDIT_NOTES_PREVIEW = new InjectionToken<
  (
    params?:
      | GetCreditNotesPreviewParams
      | (() => GetCreditNotesPreviewParams | undefined),
  ) => ReturnType<typeof httpResource<GetCreditNotesPreviewResponse>>
>('GET_CREDIT_NOTES_PREVIEW', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetCreditNotesPreviewParams
        | (() => GetCreditNotesPreviewParams | undefined),
    ) =>
      httpResource<GetCreditNotesPreviewResponse>(() => ({
        url: `${base}/v1/credit_notes/preview`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
