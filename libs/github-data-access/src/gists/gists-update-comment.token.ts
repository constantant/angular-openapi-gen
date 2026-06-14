import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsUpdateCommentBody = NonNullable<
  paths['/gists/{gist_id}/comments/{comment_id}']['patch']['requestBody']
>['content']['application/json'];

export type GistsUpdateCommentResponse =
  paths['/gists/{gist_id}/comments/{comment_id}']['patch']['responses']['200']['content']['application/json'];

export const GISTS_UPDATE_COMMENT = new InjectionToken<
  (
    gistId: string,
    commentId: string,
    body: GistsUpdateCommentBody | Signal<GistsUpdateCommentBody>,
  ) => ReturnType<typeof httpResource<GistsUpdateCommentResponse>>
>('GISTS_UPDATE_COMMENT');

export function provideGistsUpdateComment(): FactoryProvider {
  return {
    provide: GISTS_UPDATE_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        gistId: string,
        commentId: string,
        body: GistsUpdateCommentBody | Signal<GistsUpdateCommentBody>,
      ) =>
        httpResource<GistsUpdateCommentResponse>(() => ({
          url: `${base}/gists/${gistId}/comments/${commentId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
