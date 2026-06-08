import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_SELECTED_REPOS_FOR_ORG_SECRET } from './agents-list-selected-repos-for-org-secret.token';
import type { AgentsListSelectedReposForOrgSecretResponse } from './agents-list-selected-repos-for-org-secret.token';

export function provideAgentsListSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListSelectedReposForOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_SELECTED_REPOS_FOR_ORG_SECRET,
    'AGENTS_LIST_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
  );
}
