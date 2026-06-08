import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ENVIRONMENT_SECRET } from './actions-get-environment-secret.token';
import type { ActionsGetEnvironmentSecretResponse } from './actions-get-environment-secret.token';

export function provideActionsGetEnvironmentSecretMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetEnvironmentSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ENVIRONMENT_SECRET,
    'ACTIONS_GET_ENVIRONMENT_SECRET',
    initialBehavior,
  );
}
