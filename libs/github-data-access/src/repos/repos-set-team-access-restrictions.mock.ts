import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_SET_TEAM_ACCESS_RESTRICTIONS } from './repos-set-team-access-restrictions.token';
import type { ReposSetTeamAccessRestrictionsResponse } from './repos-set-team-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/set-team-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams',
  method: 'put',
  tag: 'repos',
};

export function provideReposSetTeamAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposSetTeamAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_SET_TEAM_ACCESS_RESTRICTIONS,
    'REPOS_SET_TEAM_ACCESS_RESTRICTIONS',
    initialBehavior,
    _meta,
  );
}
