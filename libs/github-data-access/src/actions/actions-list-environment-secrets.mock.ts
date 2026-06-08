import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_ENVIRONMENT_SECRETS } from './actions-list-environment-secrets.token';
import type { ActionsListEnvironmentSecretsResponse } from './actions-list-environment-secrets.token';

export function provideActionsListEnvironmentSecretsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListEnvironmentSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_ENVIRONMENT_SECRETS,
    'ACTIONS_LIST_ENVIRONMENT_SECRETS',
    initialBehavior,
  );
}
