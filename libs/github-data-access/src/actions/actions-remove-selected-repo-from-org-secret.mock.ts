import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET } from './actions-remove-selected-repo-from-org-secret.token';

export function provideActionsRemoveSelectedRepoFromOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET,
    'ACTIONS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET',
    initialBehavior,
  );
}
