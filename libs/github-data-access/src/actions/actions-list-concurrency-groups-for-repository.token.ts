import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListConcurrencyGroupsForRepositoryParams =
  paths['/repos/{owner}/{repo}/actions/concurrency_groups']['get']['parameters']['query'];

export type ActionsListConcurrencyGroupsForRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/concurrency_groups']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      params?:
        | ActionsListConcurrencyGroupsForRepositoryParams
        | (() => ActionsListConcurrencyGroupsForRepositoryParams | undefined),
    ) => ReturnType<
      typeof httpResource<ActionsListConcurrencyGroupsForRepositoryResponse>
    >
  >('ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_REPOSITORY');

export function provideActionsListConcurrencyGroupsForRepository(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_CONCURRENCY_GROUPS_FOR_REPOSITORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActionsListConcurrencyGroupsForRepositoryParams
          | (() => ActionsListConcurrencyGroupsForRepositoryParams | undefined),
      ) =>
        httpResource<ActionsListConcurrencyGroupsForRepositoryResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/concurrency_groups`,
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
