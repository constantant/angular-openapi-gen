import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSigmaSavedQueriesIdBody = NonNullable<
  paths['/v1/sigma/saved_queries/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSigmaSavedQueriesIdResponse =
  paths['/v1/sigma/saved_queries/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_SIGMA_SAVED_QUERIES_ID = new InjectionToken<
  (
    id: string,
    body: PostSigmaSavedQueriesIdBody | Signal<PostSigmaSavedQueriesIdBody>,
  ) => ReturnType<typeof httpResource<PostSigmaSavedQueriesIdResponse>>
>('POST_SIGMA_SAVED_QUERIES_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body: PostSigmaSavedQueriesIdBody | Signal<PostSigmaSavedQueriesIdBody>,
    ) =>
      httpResource<PostSigmaSavedQueriesIdResponse>(() => ({
        url: `${base}/v1/sigma/saved_queries/${id}`,
        method: 'POST',
        body,
      }));
  },
});
