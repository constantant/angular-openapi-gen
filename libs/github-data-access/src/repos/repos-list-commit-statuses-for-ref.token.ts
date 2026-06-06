import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListCommitStatusesForRefParams =
  paths['/repos/{owner}/{repo}/commits/{ref}/statuses']['get']['parameters']['query'];

type ReposListCommitStatusesForRefResponse =
  paths['/repos/{owner}/{repo}/commits/{ref}/statuses']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_COMMIT_STATUSES_FOR_REF = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
    params?: ReposListCommitStatusesForRefParams,
  ) => ReturnType<typeof httpResource<ReposListCommitStatusesForRefResponse>>
>('REPOS_LIST_COMMIT_STATUSES_FOR_REF', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      ref: string,
      params?: ReposListCommitStatusesForRefParams,
    ) =>
      httpResource<ReposListCommitStatusesForRefResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/commits/${ref}/statuses`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
