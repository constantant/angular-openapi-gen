import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY } from './actions-get-fork-pr-contributor-approval-permissions-repository.token';
import type { ActionsGetForkPrContributorApprovalPermissionsRepositoryResponse } from './actions-get-fork-pr-contributor-approval-permissions-repository.token';

export function provideActionsGetForkPrContributorApprovalPermissionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetForkPrContributorApprovalPermissionsRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY,
    'ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY',
    initialBehavior,
  );
}
