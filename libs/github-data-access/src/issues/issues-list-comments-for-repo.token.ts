import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListCommentsForRepoParams =
  paths['/repos/{owner}/{repo}/issues/comments']['get']['parameters']['query'];

export type IssuesListCommentsForRepoResponse =
  paths['/repos/{owner}/{repo}/issues/comments']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_COMMENTS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | IssuesListCommentsForRepoParams
      | (() => IssuesListCommentsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListCommentsForRepoResponse>>
>('ISSUES_LIST_COMMENTS_FOR_REPO');

export function provideIssuesListCommentsForRepo(): FactoryProvider {
  return {
    provide: ISSUES_LIST_COMMENTS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | IssuesListCommentsForRepoParams
          | (() => IssuesListCommentsForRepoParams | undefined),
      ) =>
        httpResource<IssuesListCommentsForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/comments`,
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
