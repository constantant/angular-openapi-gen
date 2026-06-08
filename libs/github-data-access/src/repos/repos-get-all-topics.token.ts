import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetAllTopicsParams =
  paths['/repos/{owner}/{repo}/topics']['get']['parameters']['query'];

export type ReposGetAllTopicsResponse =
  paths['/repos/{owner}/{repo}/topics']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ALL_TOPICS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposGetAllTopicsParams
      | (() => ReposGetAllTopicsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetAllTopicsResponse>>
>('REPOS_GET_ALL_TOPICS');

export function provideReposGetAllTopics(): FactoryProvider {
  return {
    provide: REPOS_GET_ALL_TOPICS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposGetAllTopicsParams
          | (() => ReposGetAllTopicsParams | undefined),
      ) =>
        httpResource<ReposGetAllTopicsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/topics`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
