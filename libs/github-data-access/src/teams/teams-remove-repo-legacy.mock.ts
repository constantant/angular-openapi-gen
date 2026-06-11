import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_REMOVE_REPO_LEGACY } from './teams-remove-repo-legacy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/remove-repo-legacy',
  path: '/teams/{team_id}/repos/{owner}/{repo}',
  method: 'delete',
  tag: 'teams',
};

export function provideTeamsRemoveRepoLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_REMOVE_REPO_LEGACY,
    'TEAMS_REMOVE_REPO_LEGACY',
    initialBehavior,
    _meta,
  );
}
