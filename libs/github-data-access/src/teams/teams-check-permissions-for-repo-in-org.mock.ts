import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_CHECK_PERMISSIONS_FOR_REPO_IN_ORG } from './teams-check-permissions-for-repo-in-org.token';
import type { TeamsCheckPermissionsForRepoInOrgResponse } from './teams-check-permissions-for-repo-in-org.token';

export function provideTeamsCheckPermissionsForRepoInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsCheckPermissionsForRepoInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_CHECK_PERMISSIONS_FOR_REPO_IN_ORG,
    'TEAMS_CHECK_PERMISSIONS_FOR_REPO_IN_ORG',
    initialBehavior,
  );
}
