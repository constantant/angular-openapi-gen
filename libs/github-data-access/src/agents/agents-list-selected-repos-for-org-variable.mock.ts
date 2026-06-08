import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE } from './agents-list-selected-repos-for-org-variable.token';
import type { AgentsListSelectedReposForOrgVariableResponse } from './agents-list-selected-repos-for-org-variable.token';

export function provideAgentsListSelectedReposForOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListSelectedReposForOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE,
    'AGENTS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE',
    initialBehavior,
  );
}
