import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsCreateCommentBody = NonNullable<
  paths['/gists/{gist_id}/comments']['post']['requestBody']
>['content']['application/json'];

export type GistsCreateCommentResponse =
  paths['/gists/{gist_id}/comments']['post']['responses']['201']['content']['application/json'];

export const GISTS_CREATE_COMMENT = new InjectionToken<
  (
    gistId: string,
    body: GistsCreateCommentBody | Signal<GistsCreateCommentBody>,
  ) => ReturnType<typeof httpResource<GistsCreateCommentResponse>>
>('GISTS_CREATE_COMMENT');

export function provideGistsCreateComment(): FactoryProvider {
  return {
    provide: GISTS_CREATE_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        gistId: string,
        body: GistsCreateCommentBody | Signal<GistsCreateCommentBody>,
      ) =>
        httpResource<GistsCreateCommentResponse>(() => ({
          url: `${base}/gists/${gistId}/comments`,
          method: 'POST',
          body,
        }));
    },
  };
}
