import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE } from './actions-list-selected-repos-for-org-variable.token';
import type { ActionsListSelectedReposForOrgVariableResponse } from './actions-list-selected-repos-for-org-variable.token';

export function provideActionsListSelectedReposForOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelectedReposForOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE,
    'ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE',
    initialBehavior,
  );
}
