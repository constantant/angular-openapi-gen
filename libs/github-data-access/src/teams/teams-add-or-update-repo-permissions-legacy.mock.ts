import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_LEGACY } from './teams-add-or-update-repo-permissions-legacy.token';

export function provideTeamsAddOrUpdateRepoPermissionsLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_LEGACY,
    'TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_LEGACY',
    initialBehavior,
  );
}
