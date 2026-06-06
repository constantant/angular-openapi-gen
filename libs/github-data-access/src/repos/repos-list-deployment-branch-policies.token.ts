import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListDeploymentBranchPoliciesParams =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies']['get']['parameters']['query'];

type ReposListDeploymentBranchPoliciesResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES = new InjectionToken<
  (
    owner: string,
    repo: string,
    environment_name: string,
    params?: ReposListDeploymentBranchPoliciesParams,
  ) => ReturnType<
    typeof httpResource<ReposListDeploymentBranchPoliciesResponse>
  >
>('REPOS_LIST_DEPLOYMENT_BRANCH_POLICIES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environment_name: string,
      params?: ReposListDeploymentBranchPoliciesParams,
    ) =>
      httpResource<ReposListDeploymentBranchPoliciesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environment_name}/deployment-branch-policies`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
