import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListPullRequestsAssociatedWithCommitParams =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/pulls']['get']['parameters']['query'];

export type ReposListPullRequestsAssociatedWithCommitResponse =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/pulls']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      commitSha: string,
      params?:
        | ReposListPullRequestsAssociatedWithCommitParams
        | (() => ReposListPullRequestsAssociatedWithCommitParams | undefined),
    ) => ReturnType<
      typeof httpResource<ReposListPullRequestsAssociatedWithCommitResponse>
    >
  >('REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT');

export function provideReposListPullRequestsAssociatedWithCommit(): FactoryProvider {
  return {
    provide: REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        commitSha: string,
        params?:
          | ReposListPullRequestsAssociatedWithCommitParams
          | (() => ReposListPullRequestsAssociatedWithCommitParams | undefined),
      ) =>
        httpResource<ReposListPullRequestsAssociatedWithCommitResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/commits/${commitSha}/pulls`,
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
