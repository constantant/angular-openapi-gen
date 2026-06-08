import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SearchReposParams =
  paths['/search/repositories']['get']['parameters']['query'];

export type SearchReposResponse =
  paths['/search/repositories']['get']['responses']['200']['content']['application/json'];

export const SEARCH_REPOS = new InjectionToken<
  (
    params?: SearchReposParams | (() => SearchReposParams | undefined),
  ) => ReturnType<typeof httpResource<SearchReposResponse>>
>('SEARCH_REPOS');

export function provideSearchRepos(): FactoryProvider {
  return {
    provide: SEARCH_REPOS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?: SearchReposParams | (() => SearchReposParams | undefined),
      ) =>
        httpResource<SearchReposResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/search/repositories`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
