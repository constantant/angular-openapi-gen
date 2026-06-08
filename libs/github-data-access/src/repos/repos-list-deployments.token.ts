import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListDeploymentsParams =
  paths['/repos/{owner}/{repo}/deployments']['get']['parameters']['query'];

export type ReposListDeploymentsResponse =
  paths['/repos/{owner}/{repo}/deployments']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_DEPLOYMENTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListDeploymentsParams
      | (() => ReposListDeploymentsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListDeploymentsResponse>>
>('REPOS_LIST_DEPLOYMENTS');

export function provideReposListDeployments(): FactoryProvider {
  return {
    provide: REPOS_LIST_DEPLOYMENTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListDeploymentsParams
          | (() => ReposListDeploymentsParams | undefined),
      ) =>
        httpResource<ReposListDeploymentsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/deployments`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
