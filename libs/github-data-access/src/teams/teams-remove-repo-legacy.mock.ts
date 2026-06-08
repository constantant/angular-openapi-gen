import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_REMOVE_REPO_LEGACY } from './teams-remove-repo-legacy.token';

export function provideTeamsRemoveRepoLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_REMOVE_REPO_LEGACY,
    'TEAMS_REMOVE_REPO_LEGACY',
    initialBehavior,
  );
}
