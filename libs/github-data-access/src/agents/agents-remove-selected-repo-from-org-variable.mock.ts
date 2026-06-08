import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE } from './agents-remove-selected-repo-from-org-variable.token';

export function provideAgentsRemoveSelectedRepoFromOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE,
    'AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE',
    initialBehavior,
  );
}
