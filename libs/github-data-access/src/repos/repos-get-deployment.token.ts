import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetDeploymentResponse =
  paths['/repos/{owner}/{repo}/deployments/{deployment_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_DEPLOYMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    deploymentId: string,
  ) => ReturnType<typeof httpResource<ReposGetDeploymentResponse>>
>('REPOS_GET_DEPLOYMENT');

export function provideReposGetDeployment(): FactoryProvider {
  return {
    provide: REPOS_GET_DEPLOYMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, deploymentId: string) =>
        httpResource<ReposGetDeploymentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/deployments/${deploymentId}`,
        }));
    },
  };
}
