import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCreateDeploymentStatusBody = NonNullable<
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}/statuses']['post']['requestBody']
>['content']['application/json'];

type ReposCreateDeploymentStatusResponse =
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}/statuses']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_DEPLOYMENT_STATUS = new InjectionToken<
  (
    owner: string,
    repo: string,
    deployment_id: string,
    body:
      | ReposCreateDeploymentStatusBody
      | Signal<ReposCreateDeploymentStatusBody>,
  ) => ReturnType<typeof httpResource<ReposCreateDeploymentStatusResponse>>
>('REPOS_CREATE_DEPLOYMENT_STATUS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      deployment_id: string,
      body:
        | ReposCreateDeploymentStatusBody
        | Signal<ReposCreateDeploymentStatusBody>,
    ) =>
      httpResource<ReposCreateDeploymentStatusResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/deployments/${deployment_id}/statuses`,
        method: 'POST',
        body,
      }));
  },
});
