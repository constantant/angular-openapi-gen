import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_REPO_VARIABLE } from './actions-get-repo-variable.token';
import type { ActionsGetRepoVariableResponse } from './actions-get-repo-variable.token';

export function provideActionsGetRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetRepoVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_REPO_VARIABLE,
    'ACTIONS_GET_REPO_VARIABLE',
    initialBehavior,
  );
}
