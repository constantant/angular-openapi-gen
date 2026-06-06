import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY = new InjectionToken<
  (
    owner: string,
    repo: string,
    environment_name: string,
    branch_policy_id: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_DEPLOYMENT_BRANCH_POLICY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environment_name: string,
      branch_policy_id: string,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environment_name}/deployment-branch-policies/${branch_policy_id}`,
        method: 'DELETE',
      }));
  },
});
