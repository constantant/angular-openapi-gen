import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateDeploymentStatusBody = NonNullable<
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}/statuses']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateDeploymentStatusResponse =
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}/statuses']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_DEPLOYMENT_STATUS = new InjectionToken<
  (
    owner: string,
    repo: string,
    deploymentId: string,
    body:
      | ReposCreateDeploymentStatusBody
      | Signal<ReposCreateDeploymentStatusBody>,
  ) => ReturnType<typeof httpResource<ReposCreateDeploymentStatusResponse>>
>('REPOS_CREATE_DEPLOYMENT_STATUS');

export function provideReposCreateDeploymentStatus(): FactoryProvider {
  return {
    provide: REPOS_CREATE_DEPLOYMENT_STATUS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        deploymentId: string,
        body:
          | ReposCreateDeploymentStatusBody
          | Signal<ReposCreateDeploymentStatusBody>,
      ) =>
        httpResource<ReposCreateDeploymentStatusResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/deployments/${deploymentId}/statuses`,
          method: 'POST',
          body,
        }));
    },
  };
}
