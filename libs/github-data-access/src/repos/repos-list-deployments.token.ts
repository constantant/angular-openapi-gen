import { InjectionToken, inject } from '@angular/core';
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
>('REPOS_LIST_DEPLOYMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | ReposListDeploymentsParams
        | (() => ReposListDeploymentsParams | undefined),
    ) =>
      httpResource<ReposListDeploymentsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/deployments`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
