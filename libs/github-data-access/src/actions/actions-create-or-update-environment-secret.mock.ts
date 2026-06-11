import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_OR_UPDATE_ENVIRONMENT_SECRET } from './actions-create-or-update-environment-secret.token';
import type { ActionsCreateOrUpdateEnvironmentSecretResponse } from './actions-create-or-update-environment-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/create-or-update-environment-secret',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}',
  method: 'put',
  tag: 'actions',
};

export function provideActionsCreateOrUpdateEnvironmentSecretMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateOrUpdateEnvironmentSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_OR_UPDATE_ENVIRONMENT_SECRET,
    'ACTIONS_CREATE_OR_UPDATE_ENVIRONMENT_SECRET',
    initialBehavior,
    _meta,
  );
}
