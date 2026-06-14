import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_REPO_PUBLIC_KEY } from './actions-get-repo-public-key.token';
import type { ActionsGetRepoPublicKeyResponse } from './actions-get-repo-public-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-repo-public-key',
  path: '/repos/{owner}/{repo}/actions/secrets/public-key',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetRepoPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetRepoPublicKeyResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_REPO_PUBLIC_KEY,
    'ACTIONS_GET_REPO_PUBLIC_KEY',
    initialBehavior,
    _meta,
    options,
  );
}
