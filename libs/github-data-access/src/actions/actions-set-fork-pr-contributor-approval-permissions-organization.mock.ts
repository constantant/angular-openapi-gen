import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION } from './actions-set-fork-pr-contributor-approval-permissions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/set-fork-pr-contributor-approval-permissions-organization',
  path: '/orgs/{org}/actions/permissions/fork-pr-contributor-approval',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetForkPrContributorApprovalPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION,
    'ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
