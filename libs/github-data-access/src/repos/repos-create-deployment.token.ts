import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateDeploymentBody = NonNullable<
  paths['/repos/{owner}/{repo}/deployments']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateDeploymentResponse =
  paths['/repos/{owner}/{repo}/deployments']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_DEPLOYMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateDeploymentBody | Signal<ReposCreateDeploymentBody>,
  ) => ReturnType<typeof httpResource<ReposCreateDeploymentResponse>>
>('REPOS_CREATE_DEPLOYMENT');

export function provideReposCreateDeployment(): FactoryProvider {
  return {
    provide: REPOS_CREATE_DEPLOYMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposCreateDeploymentBody | Signal<ReposCreateDeploymentBody>,
      ) =>
        httpResource<ReposCreateDeploymentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/deployments`,
          method: 'POST',
          body,
        }));
    },
  };
}
