import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ENVIRONMENT_VARIABLE } from './actions-delete-environment-variable.token';

export function provideActionsDeleteEnvironmentVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ENVIRONMENT_VARIABLE,
    'ACTIONS_DELETE_ENVIRONMENT_VARIABLE',
    initialBehavior,
  );
}
