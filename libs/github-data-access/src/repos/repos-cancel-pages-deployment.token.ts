import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCancelPagesDeploymentError =
  paths['/repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel']['post']['responses']['404']['content']['application/json'];

export const REPOS_CANCEL_PAGES_DEPLOYMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    pagesDeploymentId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_CANCEL_PAGES_DEPLOYMENT');

export function provideReposCancelPagesDeployment(): FactoryProvider {
  return {
    provide: REPOS_CANCEL_PAGES_DEPLOYMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, pagesDeploymentId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/pages/deployments/${pagesDeploymentId}/cancel`,
          method: 'POST',
        }));
    },
  };
}
