import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetPagesDeploymentResponse =
  paths['/repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_PAGES_DEPLOYMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    pages_deployment_id: string,
  ) => ReturnType<typeof httpResource<ReposGetPagesDeploymentResponse>>
>('REPOS_GET_PAGES_DEPLOYMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, pages_deployment_id: string) =>
      httpResource<ReposGetPagesDeploymentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pages/deployments/${pages_deployment_id}`,
      }));
  },
});
