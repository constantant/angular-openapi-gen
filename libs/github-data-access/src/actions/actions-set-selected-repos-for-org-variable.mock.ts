import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE } from './actions-set-selected-repos-for-org-variable.token';

export function provideActionsSetSelectedReposForOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE,
    'ACTIONS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE',
    initialBehavior,
  );
}
