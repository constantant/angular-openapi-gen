import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SearchCommitsParams =
  paths['/search/commits']['get']['parameters']['query'];

export type SearchCommitsResponse =
  paths['/search/commits']['get']['responses']['200']['content']['application/json'];

export const SEARCH_COMMITS = new InjectionToken<
  (
    params?: SearchCommitsParams | (() => SearchCommitsParams | undefined),
  ) => ReturnType<typeof httpResource<SearchCommitsResponse>>
>('SEARCH_COMMITS');

export function provideSearchCommits(): FactoryProvider {
  return {
    provide: SEARCH_COMMITS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?: SearchCommitsParams | (() => SearchCommitsParams | undefined),
      ) =>
        httpResource<SearchCommitsResponse>(() => ({
          url: `${base}/search/commits`,
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
