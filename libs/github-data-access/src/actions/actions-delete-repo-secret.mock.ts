import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_REPO_SECRET } from './actions-delete-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-repo-secret',
  path: '/repos/{owner}/{repo}/actions/secrets/{secret_name}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_REPO_SECRET,
    'ACTIONS_DELETE_REPO_SECRET',
    initialBehavior,
    _meta,
  );
}
