import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ENVIRONMENT_SECRET } from './actions-delete-environment-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-environment-secret',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteEnvironmentSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ENVIRONMENT_SECRET,
    'ACTIONS_DELETE_ENVIRONMENT_SECRET',
    initialBehavior,
    _meta,
  );
}
