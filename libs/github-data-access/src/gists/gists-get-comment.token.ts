import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsGetCommentResponse =
  paths['/gists/{gist_id}/comments/{comment_id}']['get']['responses']['200']['content']['application/json'];

export const GISTS_GET_COMMENT = new InjectionToken<
  (
    gistId: string,
    commentId: string,
  ) => ReturnType<typeof httpResource<GistsGetCommentResponse>>
>('GISTS_GET_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (gistId: string, commentId: string) =>
      httpResource<GistsGetCommentResponse>(() => ({
        url: `${base}/gists/${gistId}/comments/${commentId}`,
      }));
  },
});
