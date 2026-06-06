import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetDeploymentResponse =
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_DEPLOYMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    deployment_id: string,
  ) => ReturnType<typeof httpResource<ReposGetDeploymentResponse>>
>('REPOS_GET_DEPLOYMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, deployment_id: string) =>
      httpResource<ReposGetDeploymentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/deployments/${deployment_id}`,
      }));
  },
});
