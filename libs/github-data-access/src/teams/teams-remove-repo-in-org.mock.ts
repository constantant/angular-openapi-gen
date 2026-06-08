import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_REMOVE_REPO_IN_ORG } from './teams-remove-repo-in-org.token';

export function provideTeamsRemoveRepoInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_REMOVE_REPO_IN_ORG,
    'TEAMS_REMOVE_REPO_IN_ORG',
    initialBehavior,
  );
}
