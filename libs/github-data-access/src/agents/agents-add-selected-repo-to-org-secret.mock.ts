import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_ADD_SELECTED_REPO_TO_ORG_SECRET } from './agents-add-selected-repo-to-org-secret.token';

export function provideAgentsAddSelectedRepoToOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_ADD_SELECTED_REPO_TO_ORG_SECRET,
    'AGENTS_ADD_SELECTED_REPO_TO_ORG_SECRET',
    initialBehavior,
  );
}
