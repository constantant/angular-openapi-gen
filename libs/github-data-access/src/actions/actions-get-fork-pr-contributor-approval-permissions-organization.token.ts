import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetForkPrContributorApprovalPermissionsOrganizationResponse =
  paths['/orgs/{org}/actions/permissions/fork-pr-contributor-approval']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetForkPrContributorApprovalPermissionsOrganizationResponse>
    >
  >('ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetForkPrContributorApprovalPermissionsOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/permissions/fork-pr-contributor-approval`,
          }),
        );
    },
  });
