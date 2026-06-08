import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_SET_SELECTED_REPOS_FOR_ORG_SECRET } from './dependabot-set-selected-repos-for-org-secret.token';

export function provideDependabotSetSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_SET_SELECTED_REPOS_FOR_ORG_SECRET,
    'DEPENDABOT_SET_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
  );
}
