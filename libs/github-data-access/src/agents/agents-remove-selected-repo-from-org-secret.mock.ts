import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET } from './agents-remove-selected-repo-from-org-secret.token';

export function provideAgentsRemoveSelectedRepoFromOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET,
    'AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET',
    initialBehavior,
  );
}
