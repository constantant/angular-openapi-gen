import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListDeploymentBranchPoliciesParams =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies']['get']['parameters']['query'];

export type ReposListDeploymentBranchPoliciesResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    params?:
      | ReposListDeploymentBranchPoliciesParams
      | (() => ReposListDeploymentBranchPoliciesParams | undefined),
  ) => ReturnType<
    typeof httpResource<ReposListDeploymentBranchPoliciesResponse>
  >
>('REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES');

export function provideReposListDeploymentBranchPolicies(): FactoryProvider {
  return {
    provide: REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        environmentName: string,
        params?:
          | ReposListDeploymentBranchPoliciesParams
          | (() => ReposListDeploymentBranchPoliciesParams | undefined),
      ) =>
        httpResource<ReposListDeploymentBranchPoliciesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment-branch-policies`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
