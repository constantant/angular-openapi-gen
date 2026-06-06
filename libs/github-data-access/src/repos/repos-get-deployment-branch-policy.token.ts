import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetDeploymentBranchPolicyResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_DEPLOYMENT_BRANCH_POLICY = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    branchPolicyId: string,
  ) => ReturnType<typeof httpResource<ReposGetDeploymentBranchPolicyResponse>>
>('REPOS_GET_DEPLOYMENT_BRANCH_POLICY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environmentName: string,
      branchPolicyId: string,
    ) =>
      httpResource<ReposGetDeploymentBranchPolicyResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/deployment-branch-policies/${branchPolicyId}`,
      }));
  },
});
