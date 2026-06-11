import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_ENVIRONMENT_SECRETS } from './actions-list-environment-secrets.token';
import type { ActionsListEnvironmentSecretsResponse } from './actions-list-environment-secrets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-environment-secrets',
  path: '/repos/{owner}/{repo}/environments/{environment_name}/secrets',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListEnvironmentSecretsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListEnvironmentSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_ENVIRONMENT_SECRETS,
    'ACTIONS_LIST_ENVIRONMENT_SECRETS',
    initialBehavior,
    _meta,
  );
}
