import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_CHECK_PERMISSIONS_FOR_REPO_LEGACY } from './teams-check-permissions-for-repo-legacy.token';
import type { TeamsCheckPermissionsForRepoLegacyResponse } from './teams-check-permissions-for-repo-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/check-permissions-for-repo-legacy',
  path: '/teams/{team_id}/repos/{owner}/{repo}',
  method: 'get',
  tag: 'teams',
};

export function provideTeamsCheckPermissionsForRepoLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsCheckPermissionsForRepoLegacyResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    TEAMS_CHECK_PERMISSIONS_FOR_REPO_LEGACY,
    'TEAMS_CHECK_PERMISSIONS_FOR_REPO_LEGACY',
    initialBehavior,
    _meta,
    options,
  );
}
