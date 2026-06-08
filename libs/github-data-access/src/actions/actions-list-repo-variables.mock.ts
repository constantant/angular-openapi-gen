import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_REPO_VARIABLES } from './actions-list-repo-variables.token';
import type { ActionsListRepoVariablesResponse } from './actions-list-repo-variables.token';

export function provideActionsListRepoVariablesMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRepoVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_REPO_VARIABLES,
    'ACTIONS_LIST_REPO_VARIABLES',
    initialBehavior,
  );
}
