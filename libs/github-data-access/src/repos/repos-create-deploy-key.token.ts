import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateDeployKeyBody = NonNullable<
  paths['/repos/{owner}/{repo}/keys']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateDeployKeyResponse =
  paths['/repos/{owner}/{repo}/keys']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_DEPLOY_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateDeployKeyBody | Signal<ReposCreateDeployKeyBody>,
  ) => ReturnType<typeof httpResource<ReposCreateDeployKeyResponse>>
>('REPOS_CREATE_DEPLOY_KEY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ReposCreateDeployKeyBody | Signal<ReposCreateDeployKeyBody>,
    ) =>
      httpResource<ReposCreateDeployKeyResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/keys`,
        method: 'POST',
        body,
      }));
  },
});
