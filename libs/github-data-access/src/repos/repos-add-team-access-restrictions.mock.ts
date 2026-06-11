import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_ADD_TEAM_ACCESS_RESTRICTIONS } from './repos-add-team-access-restrictions.token';
import type { ReposAddTeamAccessRestrictionsResponse } from './repos-add-team-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/add-team-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams',
  method: 'post',
  tag: 'repos',
};

export function provideReposAddTeamAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposAddTeamAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ADD_TEAM_ACCESS_RESTRICTIONS,
    'REPOS_ADD_TEAM_ACCESS_RESTRICTIONS',
    initialBehavior,
    _meta,
  );
}
