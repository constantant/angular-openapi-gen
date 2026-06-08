import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_ADD_SELECTED_REPO_TO_ORG_SECRET } from './codespaces-add-selected-repo-to-org-secret.token';

export function provideCodespacesAddSelectedRepoToOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_ADD_SELECTED_REPO_TO_ORG_SECRET,
    'CODESPACES_ADD_SELECTED_REPO_TO_ORG_SECRET',
    initialBehavior,
  );
}
