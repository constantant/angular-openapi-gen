import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY } from './actions-set-fork-pr-contributor-approval-permissions-repository.token';

export function provideActionsSetForkPrContributorApprovalPermissionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY,
    'ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY',
    initialBehavior,
  );
}
