import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    branchPolicyId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY');

export function provideReposDeleteDeploymentBranchPolicy(): FactoryProvider {
  return {
    provide: REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        environmentName: string,
        branchPolicyId: string,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment-branch-policies/${branchPolicyId}`,
          method: 'DELETE',
        }));
    },
  };
}
