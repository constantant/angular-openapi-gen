import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_UPDATE_ENVIRONMENT_VARIABLE } from './actions-update-environment-variable.token';

export function provideActionsUpdateEnvironmentVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_UPDATE_ENVIRONMENT_VARIABLE,
    'ACTIONS_UPDATE_ENVIRONMENT_VARIABLE',
    initialBehavior,
  );
}
