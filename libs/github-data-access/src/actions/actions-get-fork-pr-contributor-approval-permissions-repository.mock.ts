import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY } from './actions-get-fork-pr-contributor-approval-permissions-repository.token';
import type { ActionsGetForkPrContributorApprovalPermissionsRepositoryResponse } from './actions-get-fork-pr-contributor-approval-permissions-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/get-fork-pr-contributor-approval-permissions-repository',
  path: '/repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetForkPrContributorApprovalPermissionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetForkPrContributorApprovalPermissionsRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY,
    'ACTIONS_GET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
