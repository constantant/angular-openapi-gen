import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REACTIONS_DELETE_FOR_PULL_REQUEST_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
    reactionId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REACTIONS_DELETE_FOR_PULL_REQUEST_COMMENT');

export function provideReactionsDeleteForPullRequestComment(): FactoryProvider {
  return {
    provide: REACTIONS_DELETE_FOR_PULL_REQUEST_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        commentId: string,
        reactionId: string,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions/${reactionId}`,
          method: 'DELETE',
        }));
    },
  };
}
