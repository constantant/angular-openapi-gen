import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_SELECTED_REPOS_FOR_ORG_SECRET } from './actions-set-selected-repos-for-org-secret.token';

export function provideActionsSetSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_SELECTED_REPOS_FOR_ORG_SECRET,
    'ACTIONS_SET_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
  );
}
