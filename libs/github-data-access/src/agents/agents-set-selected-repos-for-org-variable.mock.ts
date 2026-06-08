import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE } from './agents-set-selected-repos-for-org-variable.token';

export function provideAgentsSetSelectedReposForOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE,
    'AGENTS_SET_SELECTED_REPOS_FOR_ORG_VARIABLE',
    initialBehavior,
  );
}
