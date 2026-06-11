import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ENVIRONMENT_PUBLIC_KEY } from './actions-get-environment-public-key.token';
import type { ActionsGetEnvironmentPublicKeyResponse } from './actions-get-environment-public-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-environment-public-key',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetEnvironmentPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetEnvironmentPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ENVIRONMENT_PUBLIC_KEY,
    'ACTIONS_GET_ENVIRONMENT_PUBLIC_KEY',
    initialBehavior,
    _meta,
  );
}
