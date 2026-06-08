import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ENVIRONMENT_VARIABLE } from './actions-get-environment-variable.token';
import type { ActionsGetEnvironmentVariableResponse } from './actions-get-environment-variable.token';

export function provideActionsGetEnvironmentVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetEnvironmentVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ENVIRONMENT_VARIABLE,
    'ACTIONS_GET_ENVIRONMENT_VARIABLE',
    initialBehavior,
  );
}
