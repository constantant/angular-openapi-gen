import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListPagesBuildsParams =
  paths['/repos/{owner}/{repo}/pages/builds']['get']['parameters']['query'];

export type ReposListPagesBuildsResponse =
  paths['/repos/{owner}/{repo}/pages/builds']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_PAGES_BUILDS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListPagesBuildsParams
      | (() => ReposListPagesBuildsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListPagesBuildsResponse>>
>('REPOS_LIST_PAGES_BUILDS');

export function provideReposListPagesBuilds(): FactoryProvider {
  return {
    provide: REPOS_LIST_PAGES_BUILDS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListPagesBuildsParams
          | (() => ReposListPagesBuildsParams | undefined),
      ) =>
        httpResource<ReposListPagesBuildsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/pages/builds`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
