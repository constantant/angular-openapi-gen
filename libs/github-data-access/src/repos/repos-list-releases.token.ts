import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListReleasesParams =
  paths['/repos/{owner}/{repo}/releases']['get']['parameters']['query'];

export type ReposListReleasesResponse =
  paths['/repos/{owner}/{repo}/releases']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_RELEASES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListReleasesParams
      | (() => ReposListReleasesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListReleasesResponse>>
>('REPOS_LIST_RELEASES');

export function provideReposListReleases(): FactoryProvider {
  return {
    provide: REPOS_LIST_RELEASES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListReleasesParams
          | (() => ReposListReleasesParams | undefined),
      ) =>
        httpResource<ReposListReleasesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/releases`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
