import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_SET_SELECTED_REPOS_FOR_ORG_SECRET } from './agents-set-selected-repos-for-org-secret.token';

export function provideAgentsSetSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_SET_SELECTED_REPOS_FOR_ORG_SECRET,
    'AGENTS_SET_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
  );
}
