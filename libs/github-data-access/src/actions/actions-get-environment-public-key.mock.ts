import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ENVIRONMENT_PUBLIC_KEY } from './actions-get-environment-public-key.token';
import type { ActionsGetEnvironmentPublicKeyResponse } from './actions-get-environment-public-key.token';

export function provideActionsGetEnvironmentPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetEnvironmentPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ENVIRONMENT_PUBLIC_KEY,
    'ACTIONS_GET_ENVIRONMENT_PUBLIC_KEY',
    initialBehavior,
  );
}
