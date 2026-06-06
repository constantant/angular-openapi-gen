import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCreditNotesCreditNoteLinesParams =
  paths['/v1/credit_notes/{credit_note}/lines']['get']['parameters']['query'];

type GetCreditNotesCreditNoteLinesResponse =
  paths['/v1/credit_notes/{credit_note}/lines']['get']['responses']['200']['content']['application/json'];

export const GET_CREDIT_NOTES_CREDIT_NOTE_LINES = new InjectionToken<
  (
    credit_note: string,
    params?: GetCreditNotesCreditNoteLinesParams,
  ) => ReturnType<typeof httpResource<GetCreditNotesCreditNoteLinesResponse>>
>('GET_CREDIT_NOTES_CREDIT_NOTE_LINES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      credit_note: string,
      params?: GetCreditNotesCreditNoteLinesParams,
    ) =>
      httpResource<GetCreditNotesCreditNoteLinesResponse>(() => ({
        url: `${base}/v1/credit_notes/${credit_note}/lines`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
