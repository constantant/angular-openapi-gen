import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_REMOVE_REPO_IN_ORG } from './teams-remove-repo-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/remove-repo-in-org',
  path: '/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}',
  method: 'delete',
  tag: 'teams',
};

export function provideTeamsRemoveRepoInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    TEAMS_REMOVE_REPO_IN_ORG,
    'TEAMS_REMOVE_REPO_IN_ORG',
    initialBehavior,
    _meta,
    options,
  );
}
