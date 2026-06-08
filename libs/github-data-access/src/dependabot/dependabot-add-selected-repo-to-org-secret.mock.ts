import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_ADD_SELECTED_REPO_TO_ORG_SECRET } from './dependabot-add-selected-repo-to-org-secret.token';

export function provideDependabotAddSelectedRepoToOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_ADD_SELECTED_REPO_TO_ORG_SECRET,
    'DEPENDABOT_ADD_SELECTED_REPO_TO_ORG_SECRET',
    initialBehavior,
  );
}
