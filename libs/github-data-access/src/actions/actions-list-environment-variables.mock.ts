import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_ENVIRONMENT_VARIABLES } from './actions-list-environment-variables.token';
import type { ActionsListEnvironmentVariablesResponse } from './actions-list-environment-variables.token';

export function provideActionsListEnvironmentVariablesMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListEnvironmentVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_ENVIRONMENT_VARIABLES,
    'ACTIONS_LIST_ENVIRONMENT_VARIABLES',
    initialBehavior,
  );
}
