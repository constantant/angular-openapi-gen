import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_LEGACY } from './teams-add-or-update-repo-permissions-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/add-or-update-repo-permissions-legacy',
  path: '/teams/{team_id}/repos/{owner}/{repo}',
  method: 'put',
  tag: 'teams',
};

export function provideTeamsAddOrUpdateRepoPermissionsLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_LEGACY,
    'TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_LEGACY',
    initialBehavior,
    _meta,
  );
}
