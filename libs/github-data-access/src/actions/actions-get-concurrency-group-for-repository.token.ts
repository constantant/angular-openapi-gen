import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetConcurrencyGroupForRepositoryParams =
  paths['/repos/{owner}/{repo}/actions/concurrency_groups/{concurrency_group_name}']['get']['parameters']['query'];

export type ActionsGetConcurrencyGroupForRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/concurrency_groups/{concurrency_group_name}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_CONCURRENCY_GROUP_FOR_REPOSITORY = new InjectionToken<
  (
    owner: string,
    repo: string,
    concurrencyGroupName: string,
    params?:
      | ActionsGetConcurrencyGroupForRepositoryParams
      | (() => ActionsGetConcurrencyGroupForRepositoryParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActionsGetConcurrencyGroupForRepositoryResponse>
  >
>('ACTIONS_GET_CONCURRENCY_GROUP_FOR_REPOSITORY');

export function provideActionsGetConcurrencyGroupForRepository(): FactoryProvider {
  return {
    provide: ACTIONS_GET_CONCURRENCY_GROUP_FOR_REPOSITORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        concurrencyGroupName: string,
        params?:
          | ActionsGetConcurrencyGroupForRepositoryParams
          | (() => ActionsGetConcurrencyGroupForRepositoryParams | undefined),
      ) =>
        httpResource<ActionsGetConcurrencyGroupForRepositoryResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/actions/concurrency_groups/${concurrencyGroupName}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
