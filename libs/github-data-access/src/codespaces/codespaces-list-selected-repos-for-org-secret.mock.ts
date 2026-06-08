import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_SELECTED_REPOS_FOR_ORG_SECRET } from './codespaces-list-selected-repos-for-org-secret.token';
import type { CodespacesListSelectedReposForOrgSecretResponse } from './codespaces-list-selected-repos-for-org-secret.token';

export function provideCodespacesListSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListSelectedReposForOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_SELECTED_REPOS_FOR_ORG_SECRET,
    'CODESPACES_LIST_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
  );
}
