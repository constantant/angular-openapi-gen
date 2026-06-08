import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListDeploymentStatusesParams =
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}/statuses']['get']['parameters']['query'];

export type ReposListDeploymentStatusesResponse =
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}/statuses']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_DEPLOYMENT_STATUSES = new InjectionToken<
  (
    owner: string,
    repo: string,
    deploymentId: string,
    params?:
      | ReposListDeploymentStatusesParams
      | (() => ReposListDeploymentStatusesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListDeploymentStatusesResponse>>
>('REPOS_LIST_DEPLOYMENT_STATUSES');

export function provideReposListDeploymentStatuses(): FactoryProvider {
  return {
    provide: REPOS_LIST_DEPLOYMENT_STATUSES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        deploymentId: string,
        params?:
          | ReposListDeploymentStatusesParams
          | (() => ReposListDeploymentStatusesParams | undefined),
      ) =>
        httpResource<ReposListDeploymentStatusesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/deployments/${deploymentId}/statuses`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
