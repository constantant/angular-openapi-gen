import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_REMOVE_SELECTED_REPO_FROM_ORG_SECRET } from './codespaces-remove-selected-repo-from-org-secret.token';

export function provideCodespacesRemoveSelectedRepoFromOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_REMOVE_SELECTED_REPO_FROM_ORG_SECRET,
    'CODESPACES_REMOVE_SELECTED_REPO_FROM_ORG_SECRET',
    initialBehavior,
  );
}
