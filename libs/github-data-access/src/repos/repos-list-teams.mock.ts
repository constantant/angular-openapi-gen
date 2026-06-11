import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_TEAMS } from './repos-list-teams.token';
import type { ReposListTeamsResponse } from './repos-list-teams.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-teams',
  path: '/repos/{owner}/{repo}/teams',
  method: 'get',
  tag: 'repos',
};

export function provideReposListTeamsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListTeamsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_TEAMS,
    'REPOS_LIST_TEAMS',
    initialBehavior,
    _meta,
  );
}
