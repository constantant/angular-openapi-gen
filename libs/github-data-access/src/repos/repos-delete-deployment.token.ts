import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposDeleteDeploymentError =
  | paths['/repos/{owner}/{repo}/deployments/{deployment_id}']['delete']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/deployments/{deployment_id}']['delete']['responses']['422']['content']['application/json'];

export const REPOS_DELETE_DEPLOYMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    deploymentId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_DEPLOYMENT');

export function provideReposDeleteDeployment(): FactoryProvider {
  return {
    provide: REPOS_DELETE_DEPLOYMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, deploymentId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/deployments/${deploymentId}`,
          method: 'DELETE',
        }));
    },
  };
}
