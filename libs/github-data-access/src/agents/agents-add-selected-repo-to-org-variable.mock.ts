import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_ADD_SELECTED_REPO_TO_ORG_VARIABLE } from './agents-add-selected-repo-to-org-variable.token';

export function provideAgentsAddSelectedRepoToOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_ADD_SELECTED_REPO_TO_ORG_VARIABLE,
    'AGENTS_ADD_SELECTED_REPO_TO_ORG_VARIABLE',
    initialBehavior,
  );
}
