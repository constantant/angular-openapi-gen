import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCreditNotesIdVoidBody = NonNullable<
  paths['/v1/credit_notes/{id}/void']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCreditNotesIdVoidResponse =
  paths['/v1/credit_notes/{id}/void']['post']['responses']['200']['content']['application/json'];

export const POST_CREDIT_NOTES_ID_VOID = new InjectionToken<
  (
    id: string,
    body: PostCreditNotesIdVoidBody | Signal<PostCreditNotesIdVoidBody>,
  ) => ReturnType<typeof httpResource<PostCreditNotesIdVoidResponse>>
>('POST_CREDIT_NOTES_ID_VOID');

export function providePostCreditNotesIdVoid(): FactoryProvider {
  return {
    provide: POST_CREDIT_NOTES_ID_VOID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body: PostCreditNotesIdVoidBody | Signal<PostCreditNotesIdVoidBody>,
      ) =>
        httpResource<PostCreditNotesIdVoidResponse>(() => ({
          url: `${base}/v1/credit_notes/${id}/void`,
          method: 'POST',
          body,
        }));
    },
  };
}
