import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_REPO');

export function provideActionsListSelfHostedRunnersForRepo(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActionsListSelfHostedRunnersForRepoParams
          | (() => ActionsListSelfHostedRunnersForRepoParams | undefined),
      ) =>
        httpResource<ActionsListSelfHostedRunnersForRepoResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/actions/runners`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
