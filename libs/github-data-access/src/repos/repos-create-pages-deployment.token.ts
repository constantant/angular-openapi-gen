import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreatePagesDeploymentBody = NonNullable<
  paths['/repos/{owner}/{repo}/pages/deployments']['post']['requestBody']
>['content']['application/json'];

export type ReposCreatePagesDeploymentResponse =
  paths['/repos/{owner}/{repo}/pages/deployments']['post']['responses']['200']['content']['application/json'];

export const REPOS_CREATE_PAGES_DEPLOYMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | ReposCreatePagesDeploymentBody
      | Signal<ReposCreatePagesDeploymentBody>,
  ) => ReturnType<typeof httpResource<ReposCreatePagesDeploymentResponse>>
>('REPOS_CREATE_PAGES_DEPLOYMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body:
        | ReposCreatePagesDeploymentBody
        | Signal<ReposCreatePagesDeploymentBody>,
    ) =>
      httpResource<ReposCreatePagesDeploymentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pages/deployments`,
        method: 'POST',
        body,
      }));
  },
});
