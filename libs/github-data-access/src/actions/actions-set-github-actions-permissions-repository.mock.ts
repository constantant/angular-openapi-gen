import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY } from './actions-set-github-actions-permissions-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-github-actions-permissions-repository',
  path: '/repos/{owner}/{repo}/actions/permissions',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetGithubActionsPermissionsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY,
    'ACTIONS_SET_GITHUB_ACTIONS_PERMISSIONS_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
