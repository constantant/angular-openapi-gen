import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_ADD_SELECTED_REPO_TO_ORG_VARIABLE } from './actions-add-selected-repo-to-org-variable.token';

export function provideActionsAddSelectedRepoToOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ADD_SELECTED_REPO_TO_ORG_VARIABLE,
    'ACTIONS_ADD_SELECTED_REPO_TO_ORG_VARIABLE',
    initialBehavior,
  );
}
