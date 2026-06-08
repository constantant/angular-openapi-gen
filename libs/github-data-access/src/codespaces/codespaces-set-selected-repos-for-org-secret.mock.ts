import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_SET_SELECTED_REPOS_FOR_ORG_SECRET } from './codespaces-set-selected-repos-for-org-secret.token';

export function provideCodespacesSetSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_SET_SELECTED_REPOS_FOR_ORG_SECRET,
    'CODESPACES_SET_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
  );
}
