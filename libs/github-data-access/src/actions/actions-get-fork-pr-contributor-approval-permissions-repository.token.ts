import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetForkPrContributorApprovalPermissionsRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetForkPrContributorApprovalPermissionsRepositoryResponse>
    >
  >('ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetForkPrContributorApprovalPermissionsRepositoryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/permissions/fork-pr-contributor-approval`,
          }),
        );
    },
  });
