import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetForkPrContributorApprovalPermissionsOrganizationBody =
  NonNullable<
    paths['/orgs/{org}/actions/permissions/fork-pr-contributor-approval']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetForkPrContributorApprovalPermissionsOrganizationBody
        | Signal<ActionsSetForkPrContributorApprovalPermissionsOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetForkPrContributorApprovalPermissionsOrganizationBody
          | Signal<ActionsSetForkPrContributorApprovalPermissionsOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/fork-pr-contributor-approval`,
          method: 'PUT',
          body,
        }));
    },
  });
