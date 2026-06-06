import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListDeploymentStatusesParams =
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}/statuses']['get']['parameters']['query'];

type ReposListDeploymentStatusesResponse =
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}/statuses']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_DEPLOYMENT_STATUSES = new InjectionToken<
  (
    owner: string,
    repo: string,
    deployment_id: string,
    params?: ReposListDeploymentStatusesParams,
  ) => ReturnType<typeof httpResource<ReposListDeploymentStatusesResponse>>
>('REPOS_LIST_DEPLOYMENT_STATUSES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      deployment_id: string,
      params?: ReposListDeploymentStatusesParams,
    ) =>
      httpResource<ReposListDeploymentStatusesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/deployments/${deployment_id}/statuses`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
