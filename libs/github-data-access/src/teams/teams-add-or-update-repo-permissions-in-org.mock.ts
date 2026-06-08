import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_IN_ORG } from './teams-add-or-update-repo-permissions-in-org.token';

export function provideTeamsAddOrUpdateRepoPermissionsInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_IN_ORG,
    'TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_IN_ORG',
    initialBehavior,
  );
}
