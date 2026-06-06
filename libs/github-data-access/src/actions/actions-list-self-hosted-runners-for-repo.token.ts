import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListSelfHostedRunnersForRepoParams =
  paths['/repos/{owner}/{repo}/actions/runners']['get']['parameters']['query'];

export type ActionsListSelfHostedRunnersForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/runners']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActionsListSelfHostedRunnersForRepoParams
      | (() => ActionsListSelfHostedRunnersForRepoParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActionsListSelfHostedRunnersForRepoResponse>
  >
>('ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | ActionsListSelfHostedRunnersForRepoParams
        | (() => ActionsListSelfHostedRunnersForRepoParams | undefined),
    ) =>
      httpResource<ActionsListSelfHostedRunnersForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runners`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
