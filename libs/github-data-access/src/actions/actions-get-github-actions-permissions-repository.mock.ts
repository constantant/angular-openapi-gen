import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY } from './actions-get-github-actions-permissions-repository.token';
import type { ActionsGetGithubActionsPermissionsRepositoryResponse } from './actions-get-github-actions-permissions-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-github-actions-permissions-repository',
  path: '/repos/{owner}/{repo}/actions/permissions',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetGithubActionsPermissionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetGithubActionsPermissionsRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY,
    'ACTIONS_GET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
