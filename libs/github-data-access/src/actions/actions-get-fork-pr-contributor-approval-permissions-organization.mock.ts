import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION } from './actions-get-fork-pr-contributor-approval-permissions-organization.token';
import type { ActionsGetForkPrContributorApprovalPermissionsOrganizationResponse } from './actions-get-fork-pr-contributor-approval-permissions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/get-fork-pr-contributor-approval-permissions-organization',
  path: '/orgs/{org}/actions/permissions/fork-pr-contributor-approval',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetForkPrContributorApprovalPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetForkPrContributorApprovalPermissionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION,
    'ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
