import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_REPO_SECRET } from './actions-get-repo-secret.token';
import type { ActionsGetRepoSecretResponse } from './actions-get-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-repo-secret',
  path: '/repos/{owner}/{repo}/actions/secrets/{secret_name}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_REPO_SECRET,
    'ACTIONS_GET_REPO_SECRET',
    initialBehavior,
    _meta,
  );
}
