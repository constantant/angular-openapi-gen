import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListTagsParams =
  paths['/repos/{owner}/{repo}/tags']['get']['parameters']['query'];

export type ReposListTagsResponse =
  paths['/repos/{owner}/{repo}/tags']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_TAGS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListTagsParams | (() => ReposListTagsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListTagsResponse>>
>('REPOS_LIST_TAGS');

export function provideReposListTags(): FactoryProvider {
  return {
    provide: REPOS_LIST_TAGS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?: ReposListTagsParams | (() => ReposListTagsParams | undefined),
      ) =>
        httpResource<ReposListTagsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/tags`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
