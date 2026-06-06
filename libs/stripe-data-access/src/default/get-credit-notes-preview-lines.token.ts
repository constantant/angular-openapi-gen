import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCreditNotesPreviewLinesParams =
  paths['/v1/credit_notes/preview/lines']['get']['parameters']['query'];

export type GetCreditNotesPreviewLinesResponse =
  paths['/v1/credit_notes/preview/lines']['get']['responses']['200']['content']['application/json'];

export const GET_CREDIT_NOTES_PREVIEW_LINES = new InjectionToken<
  (
    params?:
      | GetCreditNotesPreviewLinesParams
      | (() => GetCreditNotesPreviewLinesParams | undefined),
  ) => ReturnType<typeof httpResource<GetCreditNotesPreviewLinesResponse>>
>('GET_CREDIT_NOTES_PREVIEW_LINES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetCreditNotesPreviewLinesParams
        | (() => GetCreditNotesPreviewLinesParams | undefined),
    ) =>
      httpResource<GetCreditNotesPreviewLinesResponse>(() => ({
        url: `${base}/v1/credit_notes/preview/lines`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
