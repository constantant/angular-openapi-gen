import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_CHECK_PERMISSIONS_FOR_REPO_IN_ORG } from './teams-check-permissions-for-repo-in-org.token';
import type { TeamsCheckPermissionsForRepoInOrgResponse } from './teams-check-permissions-for-repo-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/check-permissions-for-repo-in-org',
  path: '/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsCheckPermissionsForRepoInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsCheckPermissionsForRepoInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_CHECK_PERMISSIONS_FOR_REPO_IN_ORG,
    'TEAMS_CHECK_PERMISSIONS_FOR_REPO_IN_ORG',
    initialBehavior,
    _meta,
  );
}
