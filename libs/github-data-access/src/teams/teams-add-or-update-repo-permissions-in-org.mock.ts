import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_IN_ORG } from './teams-add-or-update-repo-permissions-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/add-or-update-repo-permissions-in-org',
  path: '/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}',
  method: 'put',
  tag: 'teams',
};

export function provideTeamsAddOrUpdateRepoPermissionsInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_IN_ORG,
    'TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_IN_ORG',
    initialBehavior,
    _meta,
  );
}
