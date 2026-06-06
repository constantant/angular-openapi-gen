import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetActionsCacheListParams =
  paths['/repos/{owner}/{repo}/actions/caches']['get']['parameters']['query'];

export type ActionsGetActionsCacheListResponse =
  paths['/repos/{owner}/{repo}/actions/caches']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ACTIONS_CACHE_LIST = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActionsGetActionsCacheListParams
      | (() => ActionsGetActionsCacheListParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsGetActionsCacheListResponse>>
>('ACTIONS_GET_ACTIONS_CACHE_LIST');

export function provideActionsGetActionsCacheList(): FactoryProvider {
  return {
    provide: ACTIONS_GET_ACTIONS_CACHE_LIST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActionsGetActionsCacheListParams
          | (() => ActionsGetActionsCacheListParams | undefined),
      ) =>
        httpResource<ActionsGetActionsCacheListResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/caches`,
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
