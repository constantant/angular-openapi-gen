import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION } from './actions-get-fork-pr-contributor-approval-permissions-organization.token';
import type { ActionsGetForkPrContributorApprovalPermissionsOrganizationResponse } from './actions-get-fork-pr-contributor-approval-permissions-organization.token';

export function provideActionsGetForkPrContributorApprovalPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetForkPrContributorApprovalPermissionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION,
    'ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION',
    initialBehavior,
  );
}
