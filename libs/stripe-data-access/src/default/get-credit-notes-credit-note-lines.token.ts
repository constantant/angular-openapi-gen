import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetCreditNotesCreditNoteLinesParams =
  paths['/v1/credit_notes/{credit_note}/lines']['get']['parameters']['query'];

export type GetCreditNotesCreditNoteLinesResponse =
  paths['/v1/credit_notes/{credit_note}/lines']['get']['responses']['200']['content']['application/json'];

export const GET_CREDIT_NOTES_CREDIT_NOTE_LINES = new InjectionToken<
  (
    creditNote: string,
    params?:
      | GetCreditNotesCreditNoteLinesParams
      | (() => GetCreditNotesCreditNoteLinesParams | undefined),
  ) => ReturnType<typeof httpResource<GetCreditNotesCreditNoteLinesResponse>>
>('GET_CREDIT_NOTES_CREDIT_NOTE_LINES');

export function provideGetCreditNotesCreditNoteLines(): FactoryProvider {
  return {
    provide: GET_CREDIT_NOTES_CREDIT_NOTE_LINES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        creditNote: string,
        params?:
          | GetCreditNotesCreditNoteLinesParams
          | (() => GetCreditNotesCreditNoteLinesParams | undefined),
      ) =>
        httpResource<GetCreditNotesCreditNoteLinesResponse>(() => ({
          url: `${base}/v1/credit_notes/${creditNote}/lines`,
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
