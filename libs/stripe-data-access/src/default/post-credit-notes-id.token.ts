import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostCreditNotesIdBody = NonNullable<
  paths['/v1/credit_notes/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostCreditNotesIdResponse =
  paths['/v1/credit_notes/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_CREDIT_NOTES_ID = new InjectionToken<
  (
    id: string,
    body: PostCreditNotesIdBody | Signal<PostCreditNotesIdBody>,
  ) => ReturnType<typeof httpResource<PostCreditNotesIdResponse>>
>('POST_CREDIT_NOTES_ID');

export function providePostCreditNotesId(): FactoryProvider {
  return {
    provide: POST_CREDIT_NOTES_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body: PostCreditNotesIdBody | Signal<PostCreditNotesIdBody>,
      ) =>
        httpResource<PostCreditNotesIdResponse>(() => ({
          url: `${base}/v1/credit_notes/${id}`,
          method: 'POST',
          body,
        }));
    },
  };
}
