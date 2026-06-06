import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListPullRequestsAssociatedWithCommitParams =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/pulls']['get']['parameters']['query'];

type ReposListPullRequestsAssociatedWithCommitResponse =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/pulls']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      commit_sha: string,
      params?: ReposListPullRequestsAssociatedWithCommitParams,
    ) => ReturnType<
      typeof httpResource<ReposListPullRequestsAssociatedWithCommitResponse>
    >
  >('REPOS_LIST_PULL_REQUESTS_ASSOCIATED_WITH_COMMIT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        commit_sha: string,
        params?: ReposListPullRequestsAssociatedWithCommitParams,
      ) =>
        httpResource<ReposListPullRequestsAssociatedWithCommitResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/commits/${commit_sha}/pulls`,
          params: params as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  });
