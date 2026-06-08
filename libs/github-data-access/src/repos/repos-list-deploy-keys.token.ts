import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListDeployKeysParams =
  paths['/repos/{owner}/{repo}/keys']['get']['parameters']['query'];

export type ReposListDeployKeysResponse =
  paths['/repos/{owner}/{repo}/keys']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_DEPLOY_KEYS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListDeployKeysParams
      | (() => ReposListDeployKeysParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListDeployKeysResponse>>
>('REPOS_LIST_DEPLOY_KEYS');

export function provideReposListDeployKeys(): FactoryProvider {
  return {
    provide: REPOS_LIST_DEPLOY_KEYS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListDeployKeysParams
          | (() => ReposListDeployKeysParams | undefined),
      ) =>
        httpResource<ReposListDeployKeysResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/keys`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
