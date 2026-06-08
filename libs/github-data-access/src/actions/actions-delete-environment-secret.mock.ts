import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ENVIRONMENT_SECRET } from './actions-delete-environment-secret.token';

export function provideActionsDeleteEnvironmentSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ENVIRONMENT_SECRET,
    'ACTIONS_DELETE_ENVIRONMENT_SECRET',
    initialBehavior,
  );
}
