import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCombinedStatusForRefParams =
  paths['/repos/{owner}/{repo}/commits/{ref}/status']['get']['parameters']['query'];

export type ReposGetCombinedStatusForRefResponse =
  paths['/repos/{owner}/{repo}/commits/{ref}/status']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_COMBINED_STATUS_FOR_REF = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
    params?:
      | ReposGetCombinedStatusForRefParams
      | (() => ReposGetCombinedStatusForRefParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetCombinedStatusForRefResponse>>
>('REPOS_GET_COMBINED_STATUS_FOR_REF');

export function provideReposGetCombinedStatusForRef(): FactoryProvider {
  return {
    provide: REPOS_GET_COMBINED_STATUS_FOR_REF,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        ref: string,
        params?:
          | ReposGetCombinedStatusForRefParams
          | (() => ReposGetCombinedStatusForRefParams | undefined),
      ) =>
        httpResource<ReposGetCombinedStatusForRefResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/commits/${ref}/status`,
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
