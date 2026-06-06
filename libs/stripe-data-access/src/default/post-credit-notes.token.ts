import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostCreditNotesBody = NonNullable<
  paths['/v1/credit_notes']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostCreditNotesResponse =
  paths['/v1/credit_notes']['post']['responses']['200']['content']['application/json'];

export const POST_CREDIT_NOTES = new InjectionToken<
  (
    body: PostCreditNotesBody | Signal<PostCreditNotesBody>,
  ) => ReturnType<typeof httpResource<PostCreditNotesResponse>>
>('POST_CREDIT_NOTES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostCreditNotesBody | Signal<PostCreditNotesBody>) =>
      httpResource<PostCreditNotesResponse>(() => ({
        url: `${base}/v1/credit_notes`,
        method: 'POST',
        body,
      }));
  },
});
