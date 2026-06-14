import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitGetTreeParams =
  paths['/repos/{owner}/{repo}/git/trees/{tree_sha}']['get']['parameters']['query'];

export type GitGetTreeResponse =
  paths['/repos/{owner}/{repo}/git/trees/{tree_sha}']['get']['responses']['200']['content']['application/json'];

export const GIT_GET_TREE = new InjectionToken<
  (
    owner: string,
    repo: string,
    treeSha: string,
    params?: GitGetTreeParams | (() => GitGetTreeParams | undefined),
  ) => ReturnType<typeof httpResource<GitGetTreeResponse>>
>('GIT_GET_TREE');

export function provideGitGetTree(): FactoryProvider {
  return {
    provide: GIT_GET_TREE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        treeSha: string,
        params?: GitGetTreeParams | (() => GitGetTreeParams | undefined),
      ) =>
        httpResource<GitGetTreeResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/git/trees/${treeSha}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
