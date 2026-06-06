import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetDeploymentStatusResponse =
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_DEPLOYMENT_STATUS = new InjectionToken<
  (
    owner: string,
    repo: string,
    deploymentId: string,
    statusId: string,
  ) => ReturnType<typeof httpResource<ReposGetDeploymentStatusResponse>>
>('REPOS_GET_DEPLOYMENT_STATUS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      deploymentId: string,
      statusId: string,
    ) =>
      httpResource<ReposGetDeploymentStatusResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/deployments/${deploymentId}/statuses/${statusId}`,
      }));
  },
});
